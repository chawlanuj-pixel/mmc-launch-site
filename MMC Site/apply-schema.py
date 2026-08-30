#!/usr/bin/env python3
"""Write structured data from content/schema.json into each page's <head>.

Same reasoning as apply-seo.py: JSON-LD has to be in the delivered HTML, so the
data is edited elsewhere and stamped in here.

Everything this writes goes between a pair of markers, so a re-run replaces the
previous block rather than stacking a second copy. Hand-written JSON-LD that
predates this script is left completely alone, which matters because the tool
pages already carry WebApplication and DefinedTermSet blocks that were written
by hand and are correct.

  content/schema.json
    { "Performance Marketing.html": [ {...}, {...} ], "_report": {...} }

USAGE
    python3 apply-schema.py
    python3 apply-schema.py --check
    python3 apply-schema.py "Performance Marketing.html"
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(ROOT, "content", "schema.json")
OPEN = "<!--schema-->"
CLOSE = "<!--/schema-->"

BLOCK = re.compile(re.escape(OPEN) + r".*?" + re.escape(CLOSE), re.S)

# Claims nobody has published. Emitting any of these would be fabrication, and
# a fabricated rating is the kind of thing that earns a manual penalty.
BANNED = ("aggregateRating", "ratingValue", "reviewCount", "review",
          "price", "priceRange", "award", "Rating")


def validate(objs, page):
    problems = []
    blob = json.dumps(objs)
    for word in BANNED:
        if f'"{word}"' in blob:
            problems.append(f"contains {word}")
    for o in objs:
        if not isinstance(o, dict):
            problems.append("non-object entry")
            continue
        if "@context" not in o:
            problems.append(f'{o.get("@type","?")} missing @context')
        if "@type" not in o:
            problems.append("entry missing @type")
    return problems


def sync_titles(page, objs):
    """Keep a WebPage node's name and description equal to the page's own.

    These were generated once from a snapshot and then apply-seo.py rewrote
    every title beneath them, so the markup contradicted the head it sat next
    to on all 26 pages. Deriving them here means step 2 of the build can never
    disagree with step 1 again, whatever order the data files were written in.
    """
    seo_path = os.path.join(ROOT, "content", "seo.json")
    if not os.path.exists(seo_path):
        return objs
    try:
        seo = json.load(open(seo_path, encoding="utf-8")).get(page) or {}
    except Exception:
        return objs
    title, desc = seo.get("title"), seo.get("description")
    for o in objs:
        if o.get("@type") in ("WebPage", "CollectionPage", "ContactPage"):
            if title:
                o["name"] = title
            if desc:
                o["description"] = desc
    return objs


def apply(page, objs, check=False):
    objs = sync_titles(page, objs)
    path = os.path.join(ROOT, page)
    if not os.path.exists(path):
        return None, "file not found"
    problems = validate(objs, page)
    if problems:
        return None, "; ".join(problems)

    src = open(path, encoding="utf-8").read()
    scripts = "\n".join(
        '<script type="application/ld+json">\n'
        + json.dumps(o, ensure_ascii=False, indent=2)
        + "\n</script>" for o in objs)
    block = f"{OPEN}\n{scripts}\n{CLOSE}"

    if BLOCK.search(src):
        out = BLOCK.sub(lambda _: block, src, count=1)
    elif "</head>" in src:
        out = src.replace("</head>", block + "\n</head>", 1)
    else:
        return None, "no </head>"

    if out == src:
        return 0, None
    if not check:
        open(path, "w", encoding="utf-8").write(out)
    return len(objs), None


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    check = "--check" in sys.argv
    if not os.path.exists(DATA):
        print(f"no {os.path.relpath(DATA, ROOT)}")
        return 1
    data = json.load(open(DATA, encoding="utf-8"))
    pages = args or [k for k in data if not k.startswith("_")]

    ok = failed = 0
    types_seen = {}
    for p in sorted(pages):
        objs = data.get(p)
        if not objs:
            continue
        if isinstance(objs, dict):
            objs = [objs]
        n, err = apply(p, objs, check)
        if err:
            print(f"  FAIL {p:34s} {err}")
            failed += 1
            continue
        ts = [o.get("@type") for o in objs]
        for t in ts:
            types_seen[t] = types_seen.get(t, 0) + 1
        print(("  would " if check else "  ok   ") + f"{p:34s} {', '.join(str(t) for t in ts)}")
        ok += 1
    print(f"\n{ok} pages stamped, {failed} failed")
    if types_seen:
        print("  types: " + ", ".join(f"{k} x{v}" for k, v in sorted(types_seen.items())))
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
