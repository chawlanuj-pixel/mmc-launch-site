#!/usr/bin/env python3
"""Score every public page on the things that decide whether it gets found.

WHY THIS EXISTS
The CMS Pages tab in admin/ reads the file this writes, content/page-audit.json,
and renders one row per page: word count, heading shape, title and description
lengths, schema, links, images, and a plain list of what is wrong. Nobody should
have to open twenty five files in a text editor to answer "which pages are thin,
which are missing structured data, which titles will get truncated in search".
This answers that in one pass and leaves the answer on disk as JSON.

It is a read-only scan. It never edits a page. The only file it writes is
content/page-audit.json, so it is safe to run at any point, including while
someone else has a page open.

WHAT IT LOOKS AT
Every .html at the repo root. admin/ is skipped because it is a noindex internal
tool, and files starting with _ are skipped as partials or drafts. Counts come
from the body, which is real HTML rather than an empty React shell because
prerender.py bakes the rendered DOM back into each page between <!--prerender-->
markers. A page whose markers are missing or empty is reported as not
prerendered, which matters: answer engines like ChatGPT and Perplexity read the
raw HTML and would see nothing at all.

USAGE
    python3 audit-pages.py                       # scan, print, write the JSON
    python3 audit-pages.py --now                 # stamp it with the current UTC time
    python3 audit-pages.py --generated=2026-08-23T09:00:00Z
    python3 audit-pages.py --out=/tmp/audit.json # write somewhere else

The "generated" key is omitted unless you ask for it. That keeps the output
byte-identical between runs when nothing on the site changed, so re-running this
never produces a diff that has to be reviewed.

RUN IT AFTER prerender.py, not before, or every page reads as not prerendered.
Standard library only. No pip, no build step, nothing to install.
"""
import html as htmllib
import json
import os
import re
import sys
import urllib.parse
from datetime import datetime, timezone

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, "content", "page-audit.json")

MARK_OPEN = "<!--prerender-->"
MARK_CLOSE = "<!--/prerender-->"

# Absolute links back to our own domain are internal, not external. Anything
# ending in one of these hosts counts as ours, so www and apex both match.
SITE_HOSTS = ("mondaymarketing.company",)

# Thresholds. Titles past 60 and descriptions past 155 get truncated in search
# results; under 300 words a page rarely ranks for anything on its own.
TITLE_MAX = 60
DESC_MAX = 155
MIN_WORDS = 300

# A tag plus its attributes, where a quoted attribute value is allowed to
# contain the > that would otherwise end the tag. Each alternative starts on a
# different character, so there is no backtracking to worry about.
INNARDS = r'((?:[^>"\']|"[^"]*"|\'[^\']*\')*)'
ATTR_RE = re.compile(
    r'([a-zA-Z_:][-\w:.]*)(?:\s*=\s*(?:"([^"]*)"|\'([^\']*)\'|([^\s"\'>=`]+)))?')
SCRIPT_RE = re.compile(r"<script\b[^>]*>.*?</script\s*>", re.I | re.S)
STYLE_RE = re.compile(r"<style\b[^>]*>.*?</style\s*>", re.I | re.S)
COMMENT_RE = re.compile(r"<!--.*?-->", re.S)
TAG_RE = re.compile(r"<[^>]+>", re.S)
BODY_RE = re.compile(r"<body\b[^>]*>", re.I)
TITLE_RE = re.compile(r"<title\b[^>]*>(.*?)</title\s*>", re.I | re.S)
LDJSON_RE = re.compile(
    r'<script\b[^>]*\btype\s*=\s*["\']?application/ld\+json["\']?[^>]*>(.*?)</script\s*>',
    re.I | re.S)


def tags(src, name):
    """Every <name ...> in src, as a list of lowercased attribute dicts."""
    out = []
    for m in re.finditer(r"<" + name + r"\b" + INNARDS + r">", src, re.I):
        attrs = {}
        for key, dq, sq, bare in ATTR_RE.findall(m.group(1)):
            attrs[key.lower()] = htmllib.unescape(dq or sq or bare or "")
        out.append(attrs)
    return out


def split_head_body(src):
    """Everything before <body> is the head, the rest is the body.

    The split matters. The head carries a Meta Pixel tracking image and several
    analytics scripts that would pollute an image or word count, and the body of
    a page can carry a <title> of its own inside an inline SVG icon. Metadata is
    only ever read from the head, content is only ever counted from the body.
    """
    m = BODY_RE.search(src)
    if not m:
        return "", src
    return src[:m.start()], src[m.end():]


def visible_text(body):
    """Body text with script, style, comments and tags removed."""
    text = SCRIPT_RE.sub(" ", body)
    text = STYLE_RE.sub(" ", text)
    text = COMMENT_RE.sub(" ", text)
    # Tags become a space rather than nothing, so <span>a</span><span>b</span>
    # reads as two words instead of one.
    text = TAG_RE.sub(" ", text)
    return htmllib.unescape(text)


def count_words(text):
    """Words a reader would actually count.

    A token has to contain at least one letter or digit to qualify, which drops
    the bullets, arrows and lone punctuation the layout uses as separators.
    """
    return sum(1 for t in text.split() if any(c.isalnum() for c in t))


def schema_types(src):
    """Top level @type values across every JSON-LD block on the page.

    Handles the three shapes that turn up in the wild: a single object, an array
    of objects, and a wrapper whose real content sits under @graph. Types nested
    deeper than that (the PostalAddress inside an Organization, the Service
    inside an Offer) are deliberately not collected: they describe a property of
    a thing, not a thing the page is claiming to be.

    Returns (sorted unique types, number of blocks that failed to parse).
    """
    found, broken = [], 0
    for block in LDJSON_RE.findall(src):
        raw = block.strip()
        if not raw:
            continue
        try:
            data = json.loads(raw)
        except (ValueError, TypeError):
            broken += 1
            continue
        queue = data if isinstance(data, list) else [data]
        while queue:
            node = queue.pop(0)
            if not isinstance(node, dict):
                continue
            graph = node.get("@graph")
            if isinstance(graph, list):
                queue.extend(graph)
            elif isinstance(graph, dict):
                queue.append(graph)
            t = node.get("@type")
            if isinstance(t, str):
                found.append(t)
            elif isinstance(t, list):
                found.extend(x for x in t if isinstance(x, str))
    return sorted(set(found)), broken


def link_counts(body):
    """Internal versus external anchors.

    In page links, mailto:, tel: and javascript: are counted as neither. They
    are not navigation and lumping them in either bucket makes both numbers lie.
    """
    internal = external = 0
    for a in tags(body, "a"):
        href = (a.get("href") or "").strip()
        if not href or href.startswith(("#", "mailto:", "tel:", "sms:",
                                        "javascript:", "data:")):
            continue
        if href.startswith("//"):
            href = "https:" + href
        if re.match(r"^https?://", href, re.I):
            host = urllib.parse.urlsplit(href).hostname or ""
            host = host.lower()
            if any(host == h or host.endswith("." + h) for h in SITE_HOSTS):
                internal += 1
            else:
                external += 1
        elif re.match(r"^[a-z][a-z0-9+.-]*:", href, re.I):
            continue                      # some other scheme, not navigation
        else:
            internal += 1                 # relative path
    return internal, external


def image_counts(body):
    """Images, and how many have no alt attribute at all.

    alt="" is not counted as missing. It is the correct, deliberate way to mark
    a decorative image so a screen reader skips it, and flagging it would hand
    the CMS a list of warnings nobody can act on.
    """
    imgs = tags(body, "img")
    missing = sum(1 for i in imgs if "alt" not in i)
    return len(imgs), missing


def flatten(value):
    """Collapse whitespace runs the way a browser renders them.

    A title or description written across several source lines is a single
    spaced line to a search engine, so measuring the raw text would count the
    indentation against the character budget.
    """
    return " ".join(value.split())


def meta_value(head, **match):
    """First <meta> in the head whose attributes match, returning its content."""
    for m in tags(head, "meta"):
        if all(m.get(k, "").lower() == v for k, v in match.items()):
            return flatten(m.get("content") or "")
    return ""


def is_prerendered(src):
    """True when the bake actually left content between the markers."""
    start = src.find(MARK_OPEN)
    if start == -1:
        return False
    end = src.find(MARK_CLOSE, start)
    if end == -1:
        return False
    return bool(src[start + len(MARK_OPEN):end].strip())


def find_issues(rec, broken_schema):
    """Human readable problems, as (kind, message). Only messages reach the JSON.

    The kind is used to roll the same problem up across pages in the printed
    summary, so "no structured data" is reported once with a count rather than
    twenty five times.
    """
    out = []
    if not rec["title"]:
        out.append(("no-title", "no title tag"))
    elif rec["titleLen"] > TITLE_MAX:
        out.append(("title-long",
                    "title is %d chars, over the %d that fit in search results"
                    % (rec["titleLen"], TITLE_MAX)))
    if not rec["description"]:
        out.append(("no-description", "no meta description"))
    elif rec["descLen"] > DESC_MAX:
        out.append(("desc-long",
                    "meta description is %d chars, over the %d that fit in "
                    "search results" % (rec["descLen"], DESC_MAX)))
    if rec["h1"] == 0:
        out.append(("h1", "no h1"))
    elif rec["h1"] > 1:
        out.append(("h1", "%d h1 tags, expected exactly one" % rec["h1"]))
    if rec["words"] < MIN_WORDS:
        out.append(("thin", "thin content: %d words, under %d"
                    % (rec["words"], MIN_WORDS)))
    if not rec["schemaTypes"]:
        out.append(("no-schema", "no structured data"))
    if broken_schema:
        out.append(("bad-schema", "%d JSON-LD block%s will not parse"
                    % (broken_schema, "" if broken_schema == 1 else "s")))
    if rec["imagesMissingAlt"]:
        out.append(("alt", "%d image%s missing alt text"
                    % (rec["imagesMissingAlt"],
                       "" if rec["imagesMissingAlt"] == 1 else "s")))
    if not rec["canonical"]:
        out.append(("no-canonical", "no canonical link"))
    if not rec["prerendered"]:
        out.append(("not-prerendered",
                    "not prerendered: the raw HTML has no baked content, so "
                    "answer engines see an empty page"))
    return out


def audit(path):
    src = open(path, encoding="utf-8", errors="replace").read()
    head, body = split_head_body(src)

    title_m = TITLE_RE.search(head)
    title = flatten(htmllib.unescape(title_m.group(1))) if title_m else ""
    desc = meta_value(head, name="description")
    canonical = ""
    for link in tags(head, "link"):
        # rel can hold several space separated tokens, so match on the token.
        if "canonical" in link.get("rel", "").lower().split():
            canonical = (link.get("href") or "").strip()
            break

    types, broken = schema_types(src)
    internal, external = link_counts(body)
    images, missing_alt = image_counts(body)
    text = visible_text(body)

    rec = {
        "words": count_words(text),
        "h1": len(re.findall(r"<h1\b", body, re.I)),
        "h2": len(re.findall(r"<h2\b", body, re.I)),
        "title": title,
        "titleLen": len(title),
        "description": desc,
        "descLen": len(desc),
        "canonical": canonical,
        "schemaTypes": types,
        "internalLinks": internal,
        "externalLinks": external,
        "images": images,
        "imagesMissingAlt": missing_alt,
        "hasOgImage": bool(meta_value(head, property="og:image")),
        "prerendered": is_prerendered(src),
        "issues": [],
    }
    found = find_issues(rec, broken)
    rec["issues"] = [msg for _, msg in found]
    return rec, [kind for kind, _ in found]


def page_files():
    """Root .html pages, homepage first, then case insensitive alphabetical.

    admin/ never appears here because only the root directory is listed, and an
    underscore prefix marks a partial or a draft that is not a page.
    """
    names = [f for f in os.listdir(ROOT)
             if f.lower().endswith(".html")
             and not f.startswith("_")
             and os.path.isfile(os.path.join(ROOT, f))]
    return sorted(names, key=lambda f: (f != "index.html", f.lower()))


COLUMNS = [
    ("page", 34, "<"), ("words", 6, ">"), ("h1", 3, ">"), ("h2", 3, ">"),
    ("title", 6, ">"), ("desc", 5, ">"), ("int", 4, ">"), ("ext", 4, ">"),
    ("img", 4, ">"), ("alt?", 5, ">"), ("schema", 7, ">"), ("pre", 4, ">"),
    ("issues", 7, ">"),
]


def print_table(pages, kinds):
    header = "  ".join("%-*s" % (w, h) if a == "<" else "%*s" % (w, h)
                       for h, w, a in COLUMNS)
    print(header)
    print("-" * len(header))
    for name, rec in pages.items():
        cells = [
            name[:34], rec["words"], rec["h1"], rec["h2"], rec["titleLen"],
            rec["descLen"], rec["internalLinks"], rec["externalLinks"],
            rec["images"], rec["imagesMissingAlt"] or "", len(rec["schemaTypes"]),
            "yes" if rec["prerendered"] else "NO",
            len(rec["issues"]) or "",
        ]
        print("  ".join("%-*s" % (w, c) if a == "<" else "%*s" % (w, c)
                        for c, (_, w, a) in zip(cells, COLUMNS)))
    print("-" * len(header))

    flagged = [n for n, r in pages.items() if r["issues"]]
    total_words = sum(r["words"] for r in pages.values())
    print("%d pages, %s words, %d clean, %d with issues"
          % (len(pages), format(total_words, ","),
             len(pages) - len(flagged), len(flagged)))

    if kinds:
        print("\nMOST COMMON")
        rollup = {}
        for k in kinds:
            rollup[k] = rollup.get(k, 0) + 1
        for kind, n in sorted(rollup.items(), key=lambda kv: (-kv[1], kv[0])):
            print("  %-18s %d page%s" % (kind, n, "" if n == 1 else "s"))

    if flagged:
        print("\nDETAIL")
        for name in flagged:
            print("  %s" % name)
            for msg in pages[name]["issues"]:
                print("      %s" % msg)


def main():
    args = sys.argv[1:]
    out_path = OUT
    generated = None
    for a in args:
        if a == "--now":
            generated = datetime.now(timezone.utc).replace(
                microsecond=0).isoformat().replace("+00:00", "Z")
        elif a.startswith("--generated="):
            generated = a.split("=", 1)[1].strip()
        elif a.startswith("--out="):
            out_path = os.path.abspath(os.path.expanduser(a.split("=", 1)[1]))
        elif a in ("-h", "--help"):
            print(__doc__.strip())
            return 0
        else:
            print("unknown argument: %s (try --help)" % a)
            return 2

    pages, kinds, failed = {}, [], 0
    for name in page_files():
        try:
            rec, found = audit(os.path.join(ROOT, name))
        except Exception as e:                                    # noqa: BLE001
            print("  FAIL %-34s %s" % (name[:34], str(e)[:90]))
            failed += 1
            continue
        pages[name] = rec
        kinds.extend(found)

    payload = {}
    if generated:
        payload["generated"] = generated
    payload["pages"] = pages

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as fh:
        json.dump(payload, fh, indent=2, ensure_ascii=False)
        fh.write("\n")

    print_table(pages, kinds)
    shown = os.path.relpath(out_path, ROOT)
    print("\nwrote %s" % (out_path if shown.startswith("..") else shown))
    if failed:
        print("%d page%s could not be read" % (failed, "" if failed == 1 else "s"))
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
