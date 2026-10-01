#!/usr/bin/env python3
"""One-off: turn the standalone AI by MMC pages into Astro content fragments.
Reads ../AI by MMC/*.html (read-only), writes src/components/ai/content/<slug>.html and src/data/ai/pages.json.
Strips the stand-in header/footer, slot captions and image slots flagged for wrong currency; rewrites links to clean URLs,
assets to absolute /ai-by-mmc/assets/..., and 'Book a call' links to booking-modal buttons."""
import re, json, os, glob
SRC = os.path.abspath("../../AI by MMC")
OUT = os.path.abspath("src/components/ai/content"); os.makedirs(OUT, exist_ok=True)
DATA = os.path.abspath("src/data/ai"); os.makedirs(DATA, exist_ok=True)
SITE = "https://www.mondaymarketing.company"
SLUGS = {"index.html": "", "ai-photoshoot.html": "photoshoot", "ai-video-generation.html": "video-generation", "ai-sales-agent.html": "sales-agent",
         "ai-ugc.html": "ugc", "ai-landing-page-builder.html": "landing-page-builder", "ai-spokesperson-video.html": "spokesperson-video"}
DROP_IMG = {"lp-scrub-2.jpg"}  # shows a fee in pounds; the site sells in rupees
RELATED = {
  "": [("Services", "/services/"), ("Our work", "/work/"), ("About MMC", "/about/")],
  "photoshoot": [("Social media creatives", "/services/social-media/"), ("Branding", "/services/branding/")],
  "video-generation": [("UGC and video", "/services/ugc-and-video/"), ("Social media creatives", "/services/social-media/")],
  "sales-agent": [("Lead generation", "/services/lead-generation/"), ("Conversion rate optimisation", "/services/cro/")],
  "ugc": [("UGC and video", "/services/ugc-and-video/"), ("Influencer marketing", "/services/influencer-marketing/")],
  "landing-page-builder": [("Web development", "/services/web-development/"), ("Conversion rate optimisation", "/services/cro/")],
  "spokesperson-video": [("UGC and video", "/services/ugc-and-video/"), ("Social media creatives", "/services/social-media/")],
}
def clean_url(h):
    h = h.replace(SITE + "/ai.html", SITE + "/ai-by-mmc/")
    return re.sub(r"https://www\.mondaymarketing\.company/ai-([a-z-]+)\.html", lambda m: f"{SITE}/ai-by-mmc/{m.group(1).replace('ugc','ugc')}/" , h)
def slug_of(name): return SLUGS[name]
def link(h):
    if h == "index.html": return "/ai-by-mmc/"
    if h in SLUGS: return f"/ai-by-mmc/{SLUGS[h]}/"
    return h
pages = {}
for fn, slug in SLUGS.items():
    s = open(os.path.join(SRC, fn)).read()
    title = re.search(r"<title>(.*?)</title>", s).group(1)
    desc = re.search(r'<meta name="description" content="(.*?)">', s).group(1)
    ld = [json.loads(b) for b in re.findall(r'<script type="application/ld\+json">(.*?)</script>', s)]
    m = s[s.index("<main>") + 6:s.index("</main>")]
    src = slug or "hub"
    # captions, dropped slots
    m = re.sub(r'<figcaption class="slot__brief">.*?</figcaption>', "", m, flags=re.S)
    for img in DROP_IMG:
        m = re.sub(r'<div class="bframe__p"><figure class="slot slot--w"><img src="assets/img/%s".*?</figure></div>' % re.escape(img), "", m, flags=re.S)
        assert img not in m, img
    m = re.sub(r"[^<>]*Live build: replace names with official logos\.[^<>]*", "", m)
    # asset paths -> absolute
    m = re.sub(r'(src|data-video|poster)="assets/', r'\1="/ai-by-mmc/assets/', m)
    # page links
    m = re.sub(r'href="(index\.html|ai-[a-z-]+\.html)"', lambda x: f'href="{link(x.group(1))}"', m)
    # book-a-call anchors -> modal buttons
    n = [0]
    def btn(x):
        cls, rest, label = x.group(1), x.group(2), x.group(3)
        n[0] += 1
        magnet = " data-magnet" if "data-magnet" in rest else ""
        srcid = f"ai-{src}" if n[0] == 1 else f"ai-{src}-final"
        return f'<button type="button" class="{cls}"{magnet} onclick="window.mmcBookCall(\'{srcid}\', event)">Book a strategy call {x.group(4)}</button>'
    m = re.sub(r'<a class="(btn [^"]*)"([^>]*)>Book a call( ?)(.*?)</a>', lambda x: btn(type("X", (), {"group": lambda self, i: [None, x.group(1), x.group(2), x.group(3), x.group(4)][i]})()), m)
    assert "Book a call" not in m, fn
    assert 'href="/contact/"' not in m, fn
    # the site wash behind every <section> must not paint over these bands
    m = m.replace('<section class="', '<section class="no-section-bg ')
    # breadcrumb inside hero text
    name = title.split(" | ")[0].split(":")[0] if slug else "AI by MMC"
    h1svc = re.search(r'"@type": "ListItem", "position": 3, "name": "([^"]+)"', json.dumps(ld[0]).replace('"name":', '"name":')) if False else None
    crumb_name = None
    for b in ld:
        if b.get("@type") == "BreadcrumbList" and len(b["itemListElement"]) > 2: crumb_name = b["itemListElement"][2]["name"]
    trail = '<nav class="ai-crumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span>' + (
        '<a href="/ai-by-mmc/">AI by MMC</a><span aria-hidden="true">/</span><span aria-current="page">%s</span>' % crumb_name if slug else '<span aria-current="page">AI by MMC</span>') + "</nav>"
    i = m.index('<span class="badge')
    m = m[:i] + trail + m[i:]
    assert "—" not in m
    # JSON-LD
    lds = []
    for b in ld:
        t = json.dumps(b); t = clean_url(t)
        b = json.loads(t)
        if b.get("@type") == "Service":
            b["provider"] = {"@type": "Organization", "@id": SITE + "/#organization", "name": "Monday Marketing Company", "url": SITE + "/"}
        if b.get("@type") == "BreadcrumbList":
            for it in b["itemListElement"]:
                if it["item"].endswith("/ai.html"): it["item"] = SITE + "/ai-by-mmc/"
        lds.append(b)
    path = "/ai-by-mmc/" + (slug + "/" if slug else "")
    lds.insert(0, {"@context": "https://schema.org", "@type": "WebPage", "@id": SITE + path + "#webpage", "url": SITE + path, "name": title, "description": desc,
                   "isPartOf": {"@id": SITE + "/#website"}, "publisher": {"@id": SITE + "/#organization"}, "inLanguage": "en"})
    open(f"{OUT}/{slug or 'index'}.html", "w").write(m.strip() + "\n")
    pages[slug or "index"] = {"title": title, "description": desc, "path": path, "jsonld": lds, "related": RELATED[slug], "crumb": crumb_name or "AI by MMC"}
json.dump(pages, open(f"{DATA}/pages.json", "w"), indent=1, ensure_ascii=False)
print({k: v["title"] for k, v in pages.items()})
