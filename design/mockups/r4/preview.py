"""Render a round-4 artboard as a plain page in the local Chrome and save a scaled, chunked screenshot."""
import base64, json, os, subprocess, sys, time, urllib.request
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, "/Users/anuj-mmc/Documents/MMC Aug Launch site/MMC Site")
import cdp
HERE = os.path.dirname(os.path.abspath(__file__))
IMG = os.path.abspath(os.path.join(HERE, "..", "img"))
mod, fn, width, name = sys.argv[1], sys.argv[2], int(sys.argv[3]), sys.argv[4]
html = getattr(__import__(mod), fn)()
open(os.path.join(HERE, "out", name + ".dc.html"), "w").write(html)
plain = (html.replace('<script src="./support.js"></script>', '<base href="file://' + IMG + '/">')
             .replace("<x-dc>", "").replace("</x-dc>", "").replace("<helmet>", "").replace("</helmet>", ""))
prev = os.path.join(HERE, "preview", name + ".html"); open(prev, "w").write(plain)
t = json.load(urllib.request.urlopen(urllib.request.Request(cdp.DEVTOOLS + "/json/new?about:blank", method="PUT"), timeout=5))
ws = cdp.WS(t["webSocketDebuggerUrl"]); ws.sock.settimeout(90)
ws.call("Page.enable"); ws.call("Runtime.enable")
ws.call("Emulation.setDeviceMetricsOverride", {"width": width, "height": 900, "deviceScaleFactor": 1, "mobile": width < 500})
ws.call("Page.navigate", {"url": "file://" + prev}); time.sleep(5)
h = ws.call("Runtime.evaluate", {"expression": "document.body.scrollHeight", "returnByValue": True})["result"]["value"]
chunk = 3000 if width > 500 else 1700
scale = 0.5 if width > 500 else 1
for i, y in enumerate(range(0, h, chunk)):
    out = os.path.join(HERE, "preview", f"{name}-{i+1}.jpg")
    data = ws.call("Page.captureScreenshot", {"format": "jpeg", "quality": 72, "captureBeyondViewport": True,
                   "clip": {"x": 0, "y": y, "width": width, "height": min(chunk, h - y), "scale": scale}})["data"]
    open(out, "wb").write(base64.b64decode(data))
    print(out)
urllib.request.urlopen(cdp.DEVTOOLS + "/json/close/" + t["id"], timeout=5)
print(name, "height", h)
