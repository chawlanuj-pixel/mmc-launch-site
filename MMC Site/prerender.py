#!/usr/bin/env python3
"""Bake each page's rendered DOM back into its .html file.

WHY THIS EXISTS
Every page in this project is `<div id="root"></div>` plus scripts; the content
only appears after @babel/standalone transpiles the JSX in the visitor's
browser. Googlebot renders JavaScript, so it copes. Most answer engines do not:
ChatGPT, Perplexity and Claude fetch the raw HTML and would see an empty body.
That makes the site invisible to exactly the surfaces that are becoming the
front door for "which D2C agency should I use" style questions.

This walks every page in a headless Chrome, waits for React, settles the
scroll-triggered reveals, and writes the finished markup back inside #root.
React still boots on top of it in a real browser and replaces the tree, so
behaviour is unchanged; the difference is only visible to something that never
runs the script.

USAGE
    python3 prerender.py            # all pages
    python3 prerender.py index.html Services.html
    python3 prerender.py --check    # report staleness, write nothing

RE-RUN THIS BEFORE EVERY DEPLOY, after any content change. It is idempotent:
previously baked markup is replaced, not nested.

Requires the local dev server on :8080 and Chrome on :9222 (see serve.py).
"""
import base64, json, os, re, sys, time, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.abspath(__file__))
ORIGIN = "http://localhost:8080"
DEVTOOLS = "http://127.0.0.1:9222"

SKIP = {"admin/index.html"}          # noindex tool, nothing to gain
MARK_OPEN = "<!--prerender-->"
MARK_CLOSE = "<!--/prerender-->"

# cdp.py sits next to this file. It used to be imported from a scratch
# directory, which was cleared and took the whole build step with it.
sys.path.insert(0, ROOT)
import cdp                                                    # noqa: E402
from cdp import attach, settle                                # noqa: E402

# Reveal animations leave elements at opacity 0 mid-flight. Baking that in would
# hand a non-JS reader a page of invisible text, so they are forced to their end
# state and GSAP's inline residue is stripped before the DOM is read.
SETTLE_JS = r"""
(() => {
  document.querySelectorAll('.reveal, .n-rise, .clip-reveal, [class*="rise"]')
    .forEach(e => e.classList.add('in', 'is-in', 'is-on'));
  document.querySelectorAll('[style]').forEach(e => {
    const s = e.style;
    ['opacity','transform','visibility','translate','rotate','scale',
     'clip-path','y','x'].forEach(p => s.removeProperty(p));
    if (!e.getAttribute('style')) e.removeAttribute('style');
  });
  // Counters that animate from 0 must show their target, not the start frame.
  document.querySelectorAll('[data-count-to]').forEach(e => {
    e.textContent = e.getAttribute('data-count-to');
  });
  return document.getElementById('root') ? 1 : 0;
})()
"""


def pages():
    out = []
    for f in sorted(os.listdir(ROOT)):
        if f.endswith(".html") and f not in SKIP and not f.startswith("_"):
            out.append(f)
    return out


CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"


def launch_chrome():
    """Bring Chrome back up on the debug port.

    A long bake reliably kills the browser after a handful of heavy pages, and
    losing the socket used to abandon every remaining page. Reconnecting here
    means one flaky renderer no longer costs a whole build.
    """
    import subprocess, shutil, tempfile
    subprocess.run(["pkill", "-f", "remote-debugging-port"],
                   capture_output=True)
    time.sleep(2)
    profile = os.path.join(tempfile.gettempdir(), "mmc-chrome-profile")
    subprocess.Popen(
        [CHROME, "--remote-debugging-port=9222", "--user-data-dir=" + profile,
         "--no-first-run", "--no-default-browser-check", "--disable-extensions",
         "--disable-background-timer-throttling", "--disable-renderer-backgrounding",
         "--disable-backgrounding-occluded-windows",
         "--disable-features=CalculateNativeWinOcclusion,Translate,MediaRouter",
         ORIGIN + "/"],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    for _ in range(50):
        try:
            urllib.request.urlopen(DEVTOOLS + "/json/version", timeout=2)
            time.sleep(3)
            return True
        except Exception:
            time.sleep(0.5)
    return False


def reconnect():
    """Re-attach, relaunching the browser first if it is gone."""
    try:
        urllib.request.urlopen(DEVTOOLS + "/json/version", timeout=2)
    except Exception:
        if not launch_chrome():
            raise RuntimeError("could not restart Chrome")
    ws = attach()
    ws.call("Page.enable")
    ws.call("Runtime.enable")
    ws.call("Emulation.setDeviceMetricsOverride", {
        "width": 1440, "height": 900, "deviceScaleFactor": 1, "mobile": False})
    return ws


def evaluate(ws, expr, await_promise=False):
    r = ws.call("Runtime.evaluate", {
        "expression": expr, "returnByValue": True, "awaitPromise": await_promise})
    if "exceptionDetails" in r:
        raise RuntimeError(json.dumps(r["exceptionDetails"])[:400])
    return r["result"].get("value")


def render(ws, page):
    url = ORIGIN + "/" + urllib.parse.quote(page)
    cdp.EVENTS.clear()
    ws.call("Page.navigate", {"url": url})
    settle(ws, 20)
    time.sleep(1.4)
    # Walk the page so IntersectionObserver fires for every band, then return.
    evaluate(ws, "window.scrollTo(0, document.body.scrollHeight)")
    time.sleep(1.0)
    evaluate(ws, "window.scrollTo(0, 0)")
    time.sleep(0.5)
    evaluate(ws, SETTLE_JS)
    html = evaluate(ws, "document.getElementById('root').innerHTML")
    errs = []
    for e in cdp.EVENTS:
        if e.get("method") == "Runtime.exceptionThrown":
            d = e["params"]["exceptionDetails"]
            t = (d.get("exception", {}).get("description") or d.get("text", ""))[:160]
            if "Babel" not in t:
                errs.append(t)
    return html, sorted(set(errs))


ROOT_RE = re.compile(
    r'(<div id="root">)(?:\s*' + re.escape(MARK_OPEN) + r'.*?' +
    re.escape(MARK_CLOSE) + r'\s*)?(</div>)', re.S)


def bake(page, html):
    path = os.path.join(ROOT, page)
    src = open(path, encoding="utf-8").read()
    if not ROOT_RE.search(src):
        return None, "no #root container found"
    baked = f'\\1\n{MARK_OPEN}\n{html}\n{MARK_CLOSE}\n\\2'
    out = ROOT_RE.sub(lambda m: m.group(1) + "\n" + MARK_OPEN + "\n" + html +
                      "\n" + MARK_CLOSE + "\n" + m.group(2), src, count=1)
    if out == src:
        return 0, None
    open(path, "w", encoding="utf-8").write(out)
    return len(html), None


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    check = "--check" in sys.argv
    targets = args or pages()
    # reconnect() rather than attach(): it launches Chrome if the port is dead,
    # so a bake never fails simply because the browser was not already up.
    ws = reconnect()

    ok = failed = 0
    for p in targets:
        html = errs = None
        for attempt in (1, 2, 3):
            try:
                html, errs = render(ws, p)
                break
            except Exception as e:                              # noqa: BLE001
                if attempt == 3:
                    print(f"  FAIL {p:34s} render error: {str(e)[:80]}")
                    break
                print(f"       {p:34s} renderer died, restarting ({attempt}/2)")
                try:
                    ws = reconnect()
                except Exception as e2:                          # noqa: BLE001
                    print(f"  FAIL {p:34s} {str(e2)[:70]}")
                    break
        if html is None:
            failed += 1
            continue
        text = re.sub(r"<[^>]+>", " ", html)
        words = len(text.split())
        h1 = html.count("<h1")
        if words < 80:
            print(f"  FAIL {p:34s} only {words} words rendered, refusing to bake")
            failed += 1
            continue
        if check:
            print(f"  {p:34s} {words:>5} words, {h1} h1, {len(html)//1024:>4}KB"
                  + (f"  ERR {errs}" if errs else ""))
            ok += 1
            continue
        n, err = bake(p, html)
        if err:
            print(f"  FAIL {p:34s} {err}")
            failed += 1
            continue
        print(f"  ok   {p:34s} {words:>5} words, {h1} h1, {n//1024:>4}KB baked"
              + (f"  ERR {errs}" if errs else ""))
        ok += 1
    print(f"\n{ok} rendered, {failed} failed")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
