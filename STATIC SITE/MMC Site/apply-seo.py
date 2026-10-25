#!/usr/bin/env python3
"""Write staged SEO metadata from content/seo.json into each page's <head>.

WHY A SCRIPT AND NOT THE CMS
Titles, descriptions and Open Graph tags have to be in the HTML that a crawler
receives. A browser-side dashboard cannot put them there. So the SEO tab in
admin/ edits the data, this writes the data into the files, and prerender.py
bakes the body. The CMS is the source of truth; these files are the artefact.

  content/seo.json
    {
      "index.html": {
        "title": "...",
        "description": "...",
        "ogTitle": "...",          # optional, falls back to title
        "ogDescription": "...",    # optional, falls back to description
        "canonical": "...",        # optional, existing value kept if absent
        "noindex": false           # optional
      },
      "_report": { ... }           # ignored
    }

USAGE
    python3 apply-seo.py              # apply everything
    python3 apply-seo.py --check      # report differences, write nothing
    python3 apply-seo.py index.html   # one page

Safe to run repeatedly: it rewrites the tags in place rather than appending.
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(ROOT, "content", "seo.json")
ORIGIN = "https://www.mondaymarketing.company/"

# The site deliberately contains no em dashes; refuse to reintroduce one.
EM_DASH = "—"


def esc(s):
    return (s.replace("&", "&amp;").replace('"', "&quot;")
             .replace("<", "&lt;").replace(">", "&gt;"))


def set_tag(html, pattern, replacement, insert_after=None):
    """Replace the first match, or insert if the tag is absent."""
    if re.search(pattern, html, re.I):
        return re.sub(pattern, lambda _: replacement, html, count=1)
    if insert_after and re.search(insert_after, html, re.I):
        return re.sub(insert_after, lambda m: m.group(0) + "\n" + replacement,
                      html, count=1)
    return html.replace("</head>", replacement + "\n</head>", 1)


def apply(page, meta, check=False):
    path = os.path.join(ROOT, page)
    if not os.path.exists(path):
        return None, "file not found"
    src = open(path, encoding="utf-8").read()
    out = src

    title = meta.get("title")
    desc = meta.get("description")
    if not title or not desc:
        return None, "missing title or description"
    for field, value in (("title", title), ("description", desc),
                         ("ogTitle", meta.get("ogTitle") or ""),
                         ("ogDescription", meta.get("ogDescription") or "")):
        if EM_DASH in value:
            return None, f"em dash in {field}"

    og_t = meta.get("ogTitle") or title
    og_d = meta.get("ogDescription") or desc
    canon = meta.get("canonical") or ORIGIN + page.replace(" ", "%20")

    out = set_tag(out, r"<title>.*?</title>", f"<title>{esc(title)}</title>")
    out = set_tag(out, r'<meta\s+name="description"[^>]*>',
                  f'<meta name="description" content="{esc(desc)}">',
                  insert_after=r"<title>.*?</title>")
    out = set_tag(out, r'<meta\s+property="og:title"[^>]*>',
                  f'<meta property="og:title" content="{esc(og_t)}">')
    out = set_tag(out, r'<meta\s+property="og:description"[^>]*>',
                  f'<meta property="og:description" content="{esc(og_d)}">')
    out = set_tag(out, r'<meta\s+name="twitter:title"[^>]*>',
                  f'<meta name="twitter:title" content="{esc(og_t)}">')
    out = set_tag(out, r'<meta\s+name="twitter:description"[^>]*>',
                  f'<meta name="twitter:description" content="{esc(og_d)}">')
    out = set_tag(out, r'<link\s+rel="canonical"[^>]*>',
                  f'<link rel="canonical" href="{esc(canon)}">')

    # noindex is a deliberate, reversible switch rather than a deletion.
    robots = '<meta name="robots" content="noindex, nofollow">'
    has_robots = re.search(r'<meta\s+name="robots"[^>]*>', out, re.I)
    if meta.get("noindex"):
        out = set_tag(out, r'<meta\s+name="robots"[^>]*>', robots)
    elif has_robots and "noindex" in has_robots.group(0):
        out = re.sub(r'\s*<meta\s+name="robots"[^>]*noindex[^>]*>', "", out,
                     count=1, flags=re.I)

    if out == src:
        return 0, None
    if not check:
        open(path, "w", encoding="utf-8").write(out)
    return len(title), None


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    check = "--check" in sys.argv
    if not os.path.exists(DATA):
        print(f"no {os.path.relpath(DATA, ROOT)}; export it from the SEO tab in admin/")
        return 1
    data = json.load(open(DATA, encoding="utf-8"))
    pages = args or [k for k in data if not k.startswith("_")]

    ok = skipped = failed = 0
    for p in sorted(pages):
        meta = data.get(p)
        if not meta:
            print(f"  --   {p:34s} no entry in seo.json")
            skipped += 1
            continue
        n, err = apply(p, meta, check)
        if err:
            print(f"  FAIL {p:34s} {err}")
            failed += 1
        elif n == 0:
            print(f"  --   {p:34s} already current")
            skipped += 1
        else:
            t, d = len(meta["title"]), len(meta["description"])
            flag = ""
            if t > 60: flag += f"  title {t} chars"
            if d > 155: flag += f"  desc {d} chars"
            print(("  would " if check else "  ok   ") + f"{p:34s} title {t}, desc {d}{flag}")
            ok += 1
    print(f"\n{ok} written, {skipped} unchanged, {failed} failed")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
