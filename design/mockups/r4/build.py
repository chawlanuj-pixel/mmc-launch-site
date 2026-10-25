"""Round 4: write every artboard to r4/out/ plus canvas.json and the image list.

Artboard heights are measured in the local Chrome (serve.sh's :9222), so frames never clip.

    python3 build.py
"""
import json, os, re, sys, time, urllib.request
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
sys.path.insert(0, "/Users/anuj-mmc/Documents/MMC Aug Launch site/MMC Site")
import cdp
import home, d2c, edu, service, mobile

# (file, builder, width, title, row): row 0 holds the pages, row 1 the interaction states.
ARTBOARDS = [
    ("Main.dc.html", home.build, 1440, "Homepage · Desktop", 0),
    ("D2CHub.dc.html", d2c.build, 1440, "D2C brands · Desktop", 0),
    ("Education.dc.html", edu.build, 1440, "Education · Desktop", 0),
    ("ServiceMetaAds.dc.html", service.build, 1440, "Service page: Meta Ads · Desktop", 0),
    ("HomeMobile.dc.html", mobile.home, 390, "Homepage · Mobile", 0),
    ("EducationMobile.dc.html", mobile.education, 390, "Education · Mobile", 0),
    ("HomeSelector.dc.html", home.selector_state, 1440, "State: growth selector open", 1),
    ("BookingSheet.dc.html", mobile.booking_sheet, 390, "State: book a call sheet · Mobile", 1),
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
used, boards, x, row_y = set(), [], [0, 0], [0, None]
tallest = 0
for name, fn, w, title, row in ARTBOARDS:
    html = fn()
    open(os.path.join(out, name), "w", encoding="utf-8").write(html)
    used |= set(re.findall(r'src="([^"]+)"', html)) - {"./support.js"}
    h = measure(html, w) + 20
    boards.append({"file": name, "x": x[row], "y": row, "w": w, "h": h, "title": title})
    if row == 0:
        tallest = max(tallest, h)
    print(name, w, "x", h)
    x[row] += w + 160
for b in boards:
    b["y"] = 0 if b["y"] == 0 else tallest + 240

missing = sorted(u for u in used if not os.path.exists(os.path.join(IMG, u)))
if missing:
    raise SystemExit("missing images: " + ", ".join(missing))
open(os.path.join(out, "used-images.txt"), "w").write("\n".join(sorted(used)) + "\n")

canvas = {
    "artboards": boards,
    "annotations": [{"id": "round-4-notes", "x": 0, "y": -360, "w": 900,
                     "text": "Round 4. 3 Minds structure, MMC colours, Cormorant accent and DM Sans as before, now simplified with habits measured on airbnb.co.in: five corner radii, three shadows, eight type sizes, one filled button per screen, photo-led work cards, and actions that follow the reader (hero growth selector, sticky Meta audit card, mobile bottom bar and sheets).\n"
                             "The homepage logo wall and the services list with the hover photo are the live site's approved sections, carried over as built (type set in DM Sans). Navigation, service page hero and footer are unchanged.\n"
                             "Second row shows interaction states. Bracketed text and grey blocks mark quotes, names, photos and videos still to supply. Figures marked Sample are illustrative."}],
    "launch": {"view": "canvas"},
}
json.dump(canvas, open(os.path.join(out, "canvas.json"), "w"), indent=2, ensure_ascii=False)
print("built", len(boards), "artboards,", len(used), "images")
