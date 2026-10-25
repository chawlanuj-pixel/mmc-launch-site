"""Round 3: write every artboard to r3/out/ plus canvas.json and the image list.

Artboard heights are measured in the local Chrome (serve.sh's :9222), so frames never clip.

    python3 build.py
"""
import json, os, re, sys, time, urllib.request
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
sys.path.insert(0, "/Users/anuj-mmc/Documents/MMC Aug Launch site/MMC Site")
import cdp
import home, d2c, edu, service, mobile

ARTBOARDS = [
    ("Main.dc.html", home.build, 1440, "Homepage · Desktop"),
    ("D2CHub.dc.html", d2c.build, 1440, "D2C brands · Desktop"),
    ("Education.dc.html", edu.build, 1440, "Education · Desktop"),
    ("ServiceMetaAds.dc.html", service.build, 1440, "Service page: Meta Ads · Desktop"),
    ("HomeMobile.dc.html", mobile.home, 390, "Homepage · Mobile"),
    ("EducationMobile.dc.html", mobile.education, 390, "Education · Mobile"),
]

IMG = os.path.abspath(os.path.join(HERE, "..", "img"))


def measure(html, width):
    plain = (html.replace('<script src="./support.js"></script>', '<base href="file://' + IMG + '/">')
                 .replace("<x-dc>", "").replace("</x-dc>", "").replace("<helmet>", "").replace("</helmet>", ""))
    path = os.path.join(HERE, "preview", "_measure.html")
    open(path, "w").write(plain)
    t = json.load(urllib.request.urlopen(urllib.request.Request(cdp.DEVTOOLS + "/json/new?about:blank", method="PUT"), timeout=5))
    ws = cdp.WS(t["webSocketDebuggerUrl"]); ws.sock.settimeout(90)
    ws.call("Page.enable"); ws.call("Runtime.enable")
    ws.call("Emulation.setDeviceMetricsOverride", {"width": width, "height": 900, "deviceScaleFactor": 1, "mobile": width < 500})
    ws.call("Page.navigate", {"url": "file://" + path}); time.sleep(4)
    h = ws.call("Runtime.evaluate", {"expression": "document.body.scrollHeight", "returnByValue": True})["result"]["value"]
    urllib.request.urlopen(cdp.DEVTOOLS + "/json/close/" + t["id"], timeout=5)
    return h


out = os.path.join(HERE, "out")
os.makedirs(out, exist_ok=True)
for f in os.listdir(out):
    if f.endswith(".dc.html") and f not in {a[0] for a in ARTBOARDS}:
        os.remove(os.path.join(out, f))
used, boards, x = set(), [], 0
for name, fn, w, title in ARTBOARDS:
    html = fn()
    open(os.path.join(out, name), "w", encoding="utf-8").write(html)
    used |= set(re.findall(r'src="([^"]+)"', html)) - {"./support.js"}
    h = measure(html, w) + 20
    boards.append({"file": name, "x": x, "y": 0, "w": w, "h": h, "title": title})
    print(name, w, "x", h)
    x += w + 160

missing = sorted(u for u in used if not os.path.exists(os.path.join(IMG, u)))
if missing:
    raise SystemExit("missing images: " + ", ".join(missing))
open(os.path.join(out, "used-images.txt"), "w").write("\n".join(sorted(used)) + "\n")

canvas = {
    "artboards": boards,
    "annotations": [{"id": "round-3-notes", "x": 0, "y": -320, "w": 820,
                     "text": "Round 3. Layout, sections and presentation follow 3mindsdigital.com. Colours, the Cormorant Garamond accent and the brand stay MMC's, with DM Sans as the primary typeface.\n"
                             "Navigation, service page hero and footer are unchanged from the live site (Nav.jsx, SdHero.jsx, Footer.jsx).\n"
                             "Bracketed text marks client quotes, names, photos and videos still to supply. Figures marked Sample are illustrative."}],
    "launch": {"view": "canvas"},
}
json.dump(canvas, open(os.path.join(out, "canvas.json"), "w"), indent=2, ensure_ascii=False)
print("built", len(boards), "artboards,", len(used), "images")
