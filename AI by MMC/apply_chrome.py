"""Idempotently apply the shared header/footer/CTA fixes to built pages. Usage: python3 apply_chrome.py <dir> [<dir>...]"""
import re, sys, glob, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import chrome
for d in sys.argv[1:]:
    for f in sorted(glob.glob(os.path.join(d, "*.html"))):
        s = open(f, encoding="utf-8").read()
        s = re.sub(r'<header class="nav".*?</header>(<div class="sheet".*?</div></div>)?', lambda m: chrome.header(), s, count=1, flags=re.S)
        s = re.sub(r'<footer class="foot">.*?</footer>', lambda m: chrome.footer_block(), s, count=1, flags=re.S)
        s = s.replace('href="#" data-magnet', 'href="/contact/" data-magnet')
        s = s.replace('href="/ai-by-mmc/"', 'href="index.html"')
        if 'ai-nav.css' not in s:
            s = s.replace('</head>', chrome.HEAD_EXTRA + '</head>', 1)
        if 'ai-nav.js' not in s:
            s = s.replace('</body>', chrome.SCRIPT + '</body>', 1)
        open(f, "w", encoding="utf-8").write(s)
        print("ok", f)
