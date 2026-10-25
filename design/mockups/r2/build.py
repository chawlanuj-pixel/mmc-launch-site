"""Round 2: write every artboard to r2/out/ plus canvas.json and the image list.

    python3 build.py
"""
import json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import home, d2c, edu, service, mobile

ARTBOARDS = [
    ("Main.dc.html", home.build, 1440, 9950, "Homepage · Desktop"),
    ("D2CHub.dc.html", d2c.build, 1440, 9050, "D2C brands · Desktop"),
    ("Education.dc.html", edu.build, 1440, 9950, "Education · Desktop"),
    ("ServiceMetaAds.dc.html", service.build, 1440, 9000, "Service page: Meta Ads · Desktop"),
    ("HomeMobile.dc.html", mobile.home, 390, 9400, "Homepage · Mobile"),
    ("EducationMobile.dc.html", mobile.education, 390, 8400, "Education · Mobile"),
]

out = os.path.join(HERE, "out")
os.makedirs(out, exist_ok=True)
used, boards, x = set(), [], 0
for name, fn, w, h, title in ARTBOARDS:
    html = fn()
    open(os.path.join(out, name), "w", encoding="utf-8").write(html)
    used |= set(re.findall(r'src="([^"]+)"', html)) - {"./support.js"}
    boards.append({"file": name, "x": x, "y": 0, "w": w, "h": h, "title": title})
    x += w + 160

img_dir = os.path.abspath(os.path.join(HERE, "..", "img"))
missing = sorted(u for u in used if not os.path.exists(os.path.join(img_dir, u)))
if missing:
    raise SystemExit("missing images: " + ", ".join(missing))
open(os.path.join(out, "used-images.txt"), "w").write("\n".join(sorted(used)) + "\n")

canvas = {
    "artboards": boards,
    "annotations": [{"id": "round-2-notes", "x": 0, "y": -320, "w": 820,
                     "text": "Round 2. Navigation, service page hero and footer are rebuilt exactly from the live site (Nav.jsx, SdHero.jsx, Footer.jsx). Everything else is redesigned for D2C brands and educational institutes.\n"
                             "Bracketed text marks client quotes, names, photos and videos still to supply. Figures marked Sample are illustrative dashboard and calculator values.\n"
                             "Mobile shown for Homepage and Education; the other pages follow the same patterns."}],
    "launch": {"view": "canvas"},
}
json.dump(canvas, open(os.path.join(out, "canvas.json"), "w"), indent=2, ensure_ascii=False)
print("built", len(boards), "artboards,", len(used), "images")
