"""Shared header, footer and head additions for every AI by MMC page.
build.py imports this; apply_chrome.py applies the same markup to already-built pages
(source folder and the Astro public copy). Main-site links are absolute ('/'), AI links are relative."""
MAIN = [("Services", "/services/"), ("Our Work", "/work/"), ("About", "/about/"), ("Contact", "/contact/")]
AI = [("ai-photoshoot.html", "AI Photoshoot"), ("ai-video-generation.html", "AI Video Generation"),
      ("ai-ugc.html", "AI UGC"), ("ai-spokesperson-video.html", "AI Spokesperson Video"),
      ("ai-sales-agent.html", "AI Sales Agent"), ("ai-landing-page-builder.html", "AI Landing Page Builder")]
FOOT_MAIN = [("Home", "/"), ("Services", "/services/"), ("Our Work", "/work/"), ("About", "/about/"),
             ("Contact", "/contact/"), ("Privacy", "/privacy/"), ("Terms", "/terms/")]
LOGO = '<img src="assets/img/logo-blue-tight.png" alt="Monday Marketing Company" width="1726" height="602">'
HEAD_EXTRA = ('<link rel="icon" type="image/png" href="assets/img/logo-mark.png">'
              '<link rel="stylesheet" href="assets/ai-nav.css">')
SCRIPT = '<script src="assets/ai-nav.js"></script>'

def header():
    main = "".join(f'<a href="{h}">{t}</a>' for t, h in MAIN)
    ai = "".join(f'<a href="{h}">{t}</a>' for h, t in AI)
    sheet_main = "".join(f'<a href="{h}">{t}</a>' for t, h in [("Home", "/")] + MAIN)
    return (
f'<header class="nav" data-ainav><a class="nav__logo" href="/" aria-label="Monday Marketing Company, main website home">{LOGO}</a>'
f'<nav class="nav__links" aria-label="Main website">{main}'
f'<span class="nav__dd"><button type="button" class="nav__ddbtn" aria-expanded="false" aria-controls="ai-dd">AI services<i aria-hidden="true"></i></button>'
f'<div class="nav__ddpanel" id="ai-dd" hidden><a href="index.html">AI by MMC overview</a>{ai}</div></span>'
f'<a class="pill" href="index.html" aria-label="AI by MMC home">AI by MMC</a></nav>'
f'<button type="button" class="nav__burger" aria-expanded="false" aria-controls="ai-sheet" aria-label="Open menu"><span></span><span></span><span></span></button></header>'
f'<div class="sheet" id="ai-sheet" hidden data-lenis-prevent><div class="sheet__in">'
f'<a class="sheet__back" href="/">&larr; Back to main website</a>'
f'<p class="sheet__h">Monday Marketing Company</p><nav aria-label="Main website, mobile">{sheet_main}</nav>'
f'<p class="sheet__h">AI by MMC</p><nav aria-label="AI by MMC pages, mobile"><a href="index.html">AI by MMC overview</a>{ai}</nav>'
f'<a class="btn btn--sun sheet__cta" href="/contact/">Book a call</a></div></div>')

def footer_block():
    fm = "".join(f'<a href="{h}">{t}</a>' for t, h in FOOT_MAIN)
    fa = "".join(f'<a href="{h}">{t}</a>' for h, t in AI)
    return (
'<footer class="foot"><div class="wrap foot__grid">'
'<div class="foot__brand"><a href="/" aria-label="Monday Marketing Company, main website home"><img src="assets/img/logo-wy-tight.png" alt="Monday Marketing Company" width="1726" height="602"></a>'
'<p>AI by MMC is part of Monday Marketing Company.</p><a class="foot__back" href="/">&larr; Back to main website</a></div>'
f'<nav aria-label="Main website footer"><h2 class="foot__h">Monday Marketing Company</h2>{fm}</nav>'
f'<nav aria-label="AI by MMC footer"><h2 class="foot__h">AI by MMC</h2><a href="index.html">AI by MMC overview</a>{fa}</nav>'
'</div><div class="wrap foot__legal"><span>© 2026 Monday Marketing Company</span></div></footer>')
