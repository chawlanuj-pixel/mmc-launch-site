"""Builds the MMC website redesign mockups as design-canvas artboards.

Run from this folder:  python3 build.py
Writes Main.dc.html (homepage desktop), D2CHub, Education, ServiceMetaAds,
HomeMobile, EducationMobile and canvas.json. Shared pieces (tokens, nav,
footer, buttons) live here once so every artboard stays on one system.
"""
import json

FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Raleway:wght@700;800&amp;family=Nunito:wght@400;600;700;800&amp;family=Cormorant+Garamond:ital,wght@1,500;1,600&amp;display=swap">'

CSS = """
:root{--void:#07090F;--ink:#0F1E5E;--blue:#1D4ED8;--blue-d:#16329E;--sun:#FFC528;--paper:#FBFAF6;--fg:#0B1020;--fg2:#47506A;--fg3:#7C8598;--line:rgba(11,16,32,0.10);--line2:rgba(11,16,32,0.18);--od:rgba(255,255,255,0.94);--od2:rgba(255,255,255,0.64);--od3:rgba(255,255,255,0.36);--display:"Raleway","Helvetica Neue",Arial,sans-serif;--body:"Nunito","Helvetica Neue",Arial,sans-serif;--serif:"Cormorant Garamond",Georgia,"Times New Roman",serif;}
*{box-sizing:border-box;}
body{margin:0;background:#070E2A;font-family:var(--body);color:var(--fg);-webkit-font-smoothing:antialiased;}
a{color:#1D4ED8;text-decoration:none;} a:hover{color:#16329E;}
img{max-width:100%;}
.eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:11px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;color:#7C8598;}
.eyebrow::before{content:"";width:26px;height:1.5px;background:currentColor;}
.dark .eyebrow{color:#FFC528;}
.sunband .eyebrow{color:rgba(11,16,32,0.62);}
.h1{font-family:var(--display);font-weight:800;line-height:0.94;letter-spacing:-0.045em;margin:0;text-wrap:balance;}
.h2{font-family:var(--display);font-weight:800;line-height:1.0;letter-spacing:-0.038em;margin:0;text-wrap:balance;}
.h3{font-family:var(--display);font-weight:800;line-height:1.15;letter-spacing:-0.024em;margin:0;}
.serif{font-family:var(--serif);font-style:italic;font-weight:600;letter-spacing:-0.01em;color:#1D4ED8;}
.dark .serif{color:#FFC528;}
.lede{font-size:19px;line-height:1.6;color:#47506A;margin:0;max-width:58ch;}
.dark .lede{color:rgba(255,255,255,0.66);}
.body{font-size:16px;line-height:1.6;color:#47506A;margin:0;}
.dark .body{color:rgba(255,255,255,0.66);}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:12px;font-family:var(--body);font-size:12.5px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;padding:17px 30px;border-radius:999px;border:1.5px solid transparent;white-space:nowrap;}
.btn-sun{background:#FFC528;color:#0B1020;}
.btn-sun:hover{color:#0B1020;background:#FFD75C;}
.btn-ink{background:#0F1E5E;color:#FFFFFF;}
.btn-ink:hover{color:#FFFFFF;background:#1D4ED8;}
.btn-blue{background:#1D4ED8;color:#FFFFFF;}
.btn-blue:hover{color:#FFFFFF;background:#16329E;}
.btn-ghost{background:transparent;color:inherit;border-color:currentColor;}
.dark .btn-ghost{color:#FFFFFF;border-color:rgba(255,255,255,0.5);}
.arr{width:20px;height:1.5px;background:currentColor;position:relative;display:inline-block;flex:none;}
.arr::after{content:"";position:absolute;right:-1px;top:-4px;width:9px;height:9px;border-top:1.5px solid currentColor;border-right:1.5px solid currentColor;transform:rotate(45deg);}
.dark{background:linear-gradient(to bottom,#16329E 0%,#0F1E5E 48%,#0A1440 78%,#070E2A 100%);color:rgba(255,255,255,0.94);position:relative;overflow:hidden;isolation:isolate;}
.gridbg{position:absolute;inset:0;pointer-events:none;opacity:0.5;z-index:-1;background-image:linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px);background-size:72px 72px;-webkit-mask-image:radial-gradient(70% 60% at 50% 40%,#000 0%,transparent 100%);mask-image:radial-gradient(70% 60% at 50% 40%,#000 0%,transparent 100%);}
.glow{position:absolute;inset:-30% -10% auto -10%;height:130%;pointer-events:none;z-index:-1;background:radial-gradient(46% 40% at 18% 30%,rgba(29,78,216,0.42) 0%,rgba(29,78,216,0) 70%),radial-gradient(40% 38% at 82% 22%,rgba(255,197,40,0.2) 0%,rgba(255,197,40,0) 72%),radial-gradient(60% 50% at 50% 100%,rgba(22,50,158,0.34) 0%,rgba(7,9,15,0) 72%);}
.tag{display:inline-flex;align-items:center;gap:10px;font-size:11.5px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.94);background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.16);padding:9px 16px;border-radius:999px;}
.dot{width:7px;height:7px;border-radius:50%;background:#FFC528;display:block;flex:none;}
.chip{display:inline-flex;align-items:center;gap:8px;font-size:12.5px;font-weight:700;padding:7px 13px;border-radius:999px;border:1px solid rgba(11,16,32,0.14);color:#47506A;background:#FFFFFF;white-space:nowrap;}
.dark .chip{background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.16);color:rgba(255,255,255,0.86);}
.chip-on{background:#0F1E5E;border-color:#0F1E5E;color:#FFFFFF;}
.dark .chip-on{background:#FFC528;border-color:#FFC528;color:#0B1020;}
.card{background:#FFFFFF;border:1px solid rgba(11,16,32,0.10);border-radius:18px;}
.shot{display:block;width:100%;height:100%;object-fit:cover;}
.frame{border-radius:14px;overflow:hidden;border:1px solid rgba(11,16,32,0.10);box-shadow:0 30px 60px -34px rgba(11,16,32,0.45);background:#FFFFFF;}
.dark .frame{border-color:rgba(255,255,255,0.14);box-shadow:0 44px 90px -40px rgba(0,0,0,0.75);}
.sample{display:inline-flex;font-size:10px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:#7C8598;border:1px dashed rgba(11,16,32,0.24);border-radius:999px;padding:3px 9px;}
.dark .sample{color:rgba(255,255,255,0.6);border-color:rgba(255,255,255,0.3);}
.ph{background:repeating-linear-gradient(135deg,#EEF1F7 0 10px,#E5E9F2 10px 20px);color:#7C8598;}
.label{font-size:11px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:#7C8598;}
.dark .label{color:rgba(255,255,255,0.5);}
.num{font-family:var(--display);font-weight:800;letter-spacing:-0.03em;font-variant-numeric:tabular-nums;}
.field{display:flex;flex-direction:column;gap:6px;}
.field span{font-size:12px;font-weight:700;color:#47506A;}
.input{height:52px;border-radius:12px;border:1px solid rgba(11,16,32,0.16);background:#FFFFFF;padding:0 16px;display:flex;align-items:center;font-size:15px;color:#7C8598;}
.tick{width:22px;height:22px;border-radius:50%;background:rgba(255,197,40,0.22);display:flex;align-items:center;justify-content:center;flex:none;margin-top:2px;}
.faq{display:flex;justify-content:space-between;align-items:center;gap:24px;padding:22px 0;border-bottom:1px solid rgba(11,16,32,0.12);font-family:var(--display);font-weight:700;font-size:19px;letter-spacing:-0.01em;color:#0B1020;}
.plus{width:32px;height:32px;border-radius:50%;border:1px solid rgba(11,16,32,0.18);display:flex;align-items:center;justify-content:center;flex:none;color:#1D4ED8;font-family:var(--body);font-size:18px;font-weight:700;}
"""

TICK = '<span class="tick"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6.2l2.2 2.2 4.8-5" stroke="#B07F00" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'
WA_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9 8.6c.3-.6.6-.6.9-.6h.6c.2 0 .4.1.5.4l.8 1.8c.1.3 0 .5-.1.7l-.5.6c-.1.2-.1.4 0 .6.6 1 1.4 1.8 2.4 2.4.2.1.4.1.6 0l.6-.5c.2-.2.5-.2.7-.1l1.8.8c.3.1.4.3.4.5v.6c0 .3 0 .6-.6.9-.6.3-1.6.6-3.2-.1-1.5-.7-3-2.1-3.9-3.5-.9-1.5-.8-2.6-.4-3.1z" fill="currentColor"/></svg>'
PHONE_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 4h3.2l1.6 4-2 1.3a11 11 0 0 0 5 5l1.3-2 4 1.6V17a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>'
CAL_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke="currentColor" stroke-width="1.7"/><path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>'


def page(body, width, bg):
    return ("<!doctype html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <script src=\"./support.js\"></script>\n</head>\n<body>\n<x-dc>\n<helmet>\n  "
            + FONTS + "\n  <style>" + CSS + "</style>\n</helmet>\n"
            + '<div style="width:' + str(width) + 'px;background:' + bg + ';overflow:hidden;">\n' + body + "\n</div>\n</x-dc>\n</body>\n</html>\n")


def nav(active=""):
    items = ["D2C brands", "Education", "Services", "Work", "Tools", "Pricing", "About"]
    links = ""
    for it in items:
        if it == active:
            links += '<a href="#" style="color:#0B1020;display:flex;flex-direction:column;align-items:center;gap:4px;">' + it + '<span style="width:18px;height:2px;border-radius:2px;background:#FFC528;"></span></a>'
        else:
            links += '<a href="#" style="color:#0B1020;">' + it + '</a>'
    return ('<div style="position:absolute;top:24px;left:40px;right:40px;z-index:10;display:flex;align-items:center;justify-content:space-between;gap:24px;padding:10px 10px 10px 20px;border-radius:999px;background:rgba(255,255,255,0.92);box-shadow:0 18px 44px -22px rgba(7,14,42,0.55);">'
            '<a href="#" style="display:flex;align-items:center;gap:12px;"><img src="mmc-mark.png" alt="MMC" style="width:34px;height:auto;display:block;">'
            '<span style="display:flex;flex-direction:column;gap:1px;"><span style="font-family:var(--display);font-weight:800;font-size:15.5px;color:#1D4ED8;letter-spacing:-0.01em;">Monday Marketing Company</span>'
            '<span style="font-size:9.5px;font-weight:800;letter-spacing:0.14em;color:#47506A;text-transform:uppercase;">Growth for D2C brands &amp; institutes</span></span></a>'
            '<div style="display:flex;align-items:center;gap:30px;font-size:14.5px;font-weight:700;">' + links + '</div>'
            '<div style="display:flex;gap:8px;align-items:center;"><a href="#" class="btn" style="padding:12px 18px;border-color:rgba(29,78,216,0.28);color:#1D4ED8;">' + WA_ICON + 'WhatsApp</a>'
            '<a href="#" class="btn btn-blue" style="padding:13px 22px;">Book a growth call <i class="arr"></i></a></div></div>')


def footer(width=1440):
    col = lambda title, rows: ('<div style="display:flex;flex-direction:column;gap:12px;"><span class="label" style="color:#FFC528;">' + title + '</span>'
                               + "".join('<a href="#" style="color:rgba(255,255,255,0.72);font-size:15px;">' + r + '</a>' for r in rows) + '</div>')
    return ('<div class="dark" style="padding:96px 80px 40px;background:#070E2A;"><div style="display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:40px;">'
            '<div style="grid-column:span 2;display:flex;flex-direction:column;gap:22px;"><img src="mmc-logo-white-yellow.png" alt="Monday Marketing Company" style="width:190px;height:auto;display:block;">'
            '<p class="h3" style="color:#FFFFFF;font-size:26px;max-width:18ch;">Performance marketing that survives the <span class="serif">P&amp;L.</span></p>'
            '<div style="display:flex;gap:10px;flex-wrap:wrap;"><span class="chip">Bengaluru</span><span class="chip">Mumbai</span></div></div>'
            + col("D2C brands", ["Meta Ads", "Google Ads", "Amazon &amp; quick commerce", "Creative &amp; UGC", "Retention", "Shopify &amp; CRO"])
            + col("Education", ["Admissions campaigns", "Websites &amp; landing pages", "WhatsApp &amp; CRM follow-up", "Cost per admission"])
            + col("Company", ["About", "Work", "Pricing", "Careers", "Insights", "Contact"])
            + col("Free tools", ["Break-even ROAS", "LTV : CAC", "CAC runway", "Funnel ROAS", "D2C glossary"])
            + '</div><div style="margin-top:72px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.12);display:flex;justify-content:space-between;font-size:13px;color:rgba(255,255,255,0.5);">'
            '<span>&#169; 2026 Monday Marketing Company</span><span style="display:flex;gap:24px;"><a href="#" style="color:rgba(255,255,255,0.5);">Privacy</a><a href="#" style="color:rgba(255,255,255,0.5);">Terms</a><a href="#" style="color:rgba(255,255,255,0.5);">Cookies</a></span></div></div>')


def figures():
    items = [("&#8377;248", "Cr+", "Revenue compounded for clients"), ("8.7", "&#215;", "Median blended ROAS"),
             ("14/14", "", "Clients renewed"), ("27", "mo", "Median client tenure")]
    cells = "".join('<div style="display:flex;flex-direction:column;gap:6px;"><span class="num" style="font-size:44px;color:#FFFFFF;">' + a
                    + '<span style="font-size:22px;color:#FFC528;margin-left:2px;">' + b + '</span></span><span class="label">' + c + '</span></div>' for a, b, c in items)
    return '<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:32px;padding-top:28px;border-top:1px solid rgba(255,255,255,0.14);">' + cells + '</div>'


def cta_band(title_html, lede, audience_first="D2C brand"):
    other = "Institute" if audience_first == "D2C brand" else "D2C brand"
    return ('<div class="dark" style="padding:120px 80px;"><div class="glow"></div><div class="gridbg"></div>'
            '<div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,560px);gap:80px;align-items:center;">'
            '<div style="display:flex;flex-direction:column;gap:26px;"><span class="eyebrow">Start here</span><h2 class="h2" style="color:#FFFFFF;font-size:76px;">' + title_html + '</h2>'
            '<p class="lede">' + lede + '</p>'
            '<div style="display:flex;flex-direction:column;gap:14px;margin-top:10px;">'
            + "".join('<div style="display:flex;gap:16px;align-items:center;"><span class="num" style="width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,0.24);display:flex;align-items:center;justify-content:center;font-size:15px;color:#FFC528;">' + n + '</span><span style="font-size:16px;color:rgba(255,255,255,0.84);">' + t + '</span></div>'
                      for n, t in [("1", "Share your brief or book a slot"), ("2", "30-minute call with a senior strategist"), ("3", "A written audit of where growth is leaking")])
            + '</div></div>'
            '<div style="background:#FFFFFF;border-radius:22px;padding:34px;display:flex;flex-direction:column;gap:18px;color:#0B1020;box-shadow:0 50px 100px -40px rgba(0,0,0,0.6);">'
            '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;padding:5px;border-radius:999px;background:#F1F3F8;">'
            '<span style="text-align:center;padding:11px 0;border-radius:999px;background:#0F1E5E;color:#FFFFFF;font-size:13px;font-weight:800;">I run a ' + audience_first + '</span>'
            '<span style="text-align:center;padding:11px 0;border-radius:999px;color:#47506A;font-size:13px;font-weight:800;">I run an ' + ("institute" if other == "Institute" else "D2C brand") + '</span></div>'
            '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;">'
            '<label class="field"><span>Your name</span><span class="input">Full name</span></label>'
            '<label class="field"><span>Phone (WhatsApp)</span><span class="input">+91</span></label></div>'
            '<label class="field"><span>' + ("Brand website" if audience_first == "D2C brand" else "Institute name") + '</span><span class="input">' + ("yourbrand.com" if audience_first == "D2C brand" else "Institute and city") + '</span></label>'
            '<label class="field"><span>' + ("Monthly ad spend" if audience_first == "D2C brand" else "Seats to fill this cycle") + '</span><span class="input" style="justify-content:space-between;">' + ("Choose a range" if audience_first == "D2C brand" else "Choose a range") + '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5l4 4 4-4" stroke="#47506A" stroke-width="1.6" stroke-linecap="round"/></svg></span></label>'
            '<a href="#" class="btn btn-sun" style="width:100%;margin-top:6px;">' + CAL_ICON + 'Book a growth call</a>'
            '<a href="#" class="btn" style="width:100%;border-color:rgba(11,16,32,0.18);color:#0B1020;">' + WA_ICON + 'Message us on WhatsApp</a></div></div></div>')


def section_head(eyebrow, title_html, lede="", size=64, dark=False, maxw="20ch", align="start"):
    color = "#FFFFFF" if dark else "#0B1020"
    return ('<div style="display:flex;flex-direction:column;gap:20px;align-items:' + ("center" if align == "center" else "flex-start") + ';text-align:' + ("center" if align == "center" else "left") + ';">'
            '<span class="eyebrow">' + eyebrow + '</span><h2 class="h2" style="font-size:' + str(size) + 'px;color:' + color + ';max-width:' + maxw + ';">' + title_html + '</h2>'
            + ('<p class="lede">' + lede + '</p>' if lede else '') + '</div>')


SERVICE_NAMES = {"web": "Website", "cro": "CRO", "leadgen": "Lead generation", "perf": "Performance ads", "creative": "Creative", "social": "Social", "amazon": "Amazon", "quickcom": "Quick commerce"}


def chips(keys, dark=False):
    return '<div style="display:flex;flex-wrap:wrap;gap:8px;">' + "".join('<span class="chip">' + SERVICE_NAMES[k] + '</span>' for k in keys) + '</div>'


# ─────────────────────────────── HOMEPAGE (desktop) ───────────────────────────────
def homepage():
    hero = ('<div class="dark" style="padding:180px 80px 72px;min-height:1000px;"><div class="glow"></div><div class="gridbg"></div>' + nav()
            + '<div style="display:grid;grid-template-columns:minmax(0,1fr) 560px;gap:40px;align-items:center;">'
            '<div style="display:flex;flex-direction:column;gap:30px;">'
            '<span class="tag" style="align-self:flex-start;"><i class="dot"></i>Growth studio for D2C brands &amp; educational institutes</span>'
            '<h1 class="h1" style="font-size:112px;color:#FFFFFF;max-width:11ch;">Performance marketing that survives the <span class="serif">P&amp;L.</span></h1>'
            '<p class="lede" style="font-size:20px;">One senior team runs media, creative, retention and technology. D2C brands see contribution margin grow. Institutes see seats fill with the right students.</p>'
            '<div style="display:flex;gap:12px;flex-wrap:wrap;"><a href="#" class="btn btn-sun">Book a growth call <i class="arr"></i></a><a href="#" class="btn btn-ghost">See the work <i class="arr"></i></a></div></div>'
            '<div style="position:relative;height:640px;">'
            '<div class="frame" style="position:absolute;right:-150px;top:0;width:560px;transform:rotate(3deg);"><img src="cs-giraffe.jpg" alt="The Growing Giraffe creative and storefront mockup" class="shot" style="height:auto;"></div>'
            '<div class="frame" style="position:absolute;left:-30px;top:200px;width:520px;transform:rotate(-4deg);"><img src="cs-oosh.jpg" alt="OOsh website mockup" class="shot" style="height:auto;"></div>'
            '<div class="frame" style="position:absolute;right:-60px;bottom:-10px;width:470px;transform:rotate(1.5deg);"><img src="cs-mvj.jpg" alt="MVJ College of Engineering website and admissions creative mockup" class="shot" style="height:auto;"></div>'
            '<span class="chip chip-on" style="position:absolute;left:10px;top:170px;box-shadow:0 12px 30px -12px rgba(0,0,0,0.5);">D2C &#183; OOsh</span>'
            '<span class="chip chip-on" style="position:absolute;right:40px;bottom:250px;box-shadow:0 12px 30px -12px rgba(0,0,0,0.5);">Education &#183; MVJ College</span>'
            '</div></div><div style="margin-top:80px;">' + figures() + '</div></div>')

    def audience(img, alt, eyebrow, title, points, cta, tags):
        return ('<a href="#" class="card" style="display:flex;flex-direction:column;overflow:hidden;color:#0B1020;box-shadow:0 30px 70px -44px rgba(11,16,32,0.4);">'
                '<div style="height:330px;overflow:hidden;background:#EEF1F7;"><img src="' + img + '" alt="' + alt + '" class="shot"></div>'
                '<div style="padding:38px 40px 40px;display:flex;flex-direction:column;gap:20px;"><span class="eyebrow">' + eyebrow + '</span>'
                '<h3 class="h3" style="font-size:38px;">' + title + '</h3>'
                '<div style="display:flex;flex-direction:column;gap:12px;">' + "".join('<div style="display:flex;gap:12px;font-size:16px;line-height:1.5;color:#47506A;">' + TICK + '<span>' + p + '</span></div>' for p in points) + '</div>'
                '<div style="display:flex;justify-content:space-between;align-items:center;gap:16px;margin-top:8px;"><div style="display:flex;gap:8px;flex-wrap:wrap;">' + "".join('<span class="chip">' + t + '</span>' for t in tags) + '</div>'
                '<span class="btn btn-ink" style="padding:15px 24px;">' + cta + ' <i class="arr"></i></span></div></div></a>')

    router = ('<div style="padding:120px 80px;background:#FBFAF6;">'
              + section_head("Two audiences, one standard", 'Built for the brands you buy from and the <span class="serif">institutes</span> you trust.', "Pick your path. Each has its own playbook, its own proof and its own tools.", size=64, maxw="22ch")
              + '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px;margin-top:56px;">'
              + audience("cs-mbb.jpg", "MyBrownButters D2C storefront mockup", "For D2C brands", 'Scale the brand without bleeding <span class="serif">margin.</span>',
                         ["Meta, Google, Amazon and quick commerce, budgeted against contribution margin", "Creative and UGC tested every week, so winners scale before they fatigue", "Shopify, checkout and retention flows that lift repeat orders"],
                         "Explore D2C growth", ["&#8377;3Cr to &#8377;150Cr brands"])
              + audience("cs-sprouts.jpg", "Sprouts Edu Tours website mockup", "For educational institutes", 'Fill seats with the <span class="serif">right</span> students, every season.',
                         ["Admissions campaigns on Google, Meta and YouTube", "Websites and landing pages built to turn visits into enquiries", "WhatsApp and CRM follow-up so no enquiry goes cold"],
                         "Explore admissions growth", ["Schools", "Colleges", "Coaching", "Skilling"])
              + '</div></div>')

    logos = ["lepure", "giraffe", "mittiy", "awwbaby", "sprnt", "vagakids", "mbb", "notic", "oosh", "mvj", "sprouts", "bloom", "learningmate"]
    wall = ('<div style="padding:80px 80px 96px;background:#FFFFFF;border-top:1px solid rgba(11,16,32,0.08);border-bottom:1px solid rgba(11,16,32,0.08);">'
            '<div style="display:flex;justify-content:space-between;align-items:end;gap:40px;margin-bottom:36px;"><span class="eyebrow">Brands and institutes we grow</span>'
            '<span style="font-size:15px;color:#47506A;">D2C &#183; Education &#183; Educational travel</span></div>'
            '<div style="display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:14px;">'
            + "".join('<div style="height:104px;border-radius:14px;border:1px solid rgba(11,16,32,0.08);background:#FBFAF6;display:flex;align-items:center;justify-content:center;padding:18px 22px;"><img src="logo-' + l + '.png" alt="' + l + ' logo" style="max-height:52px;max-width:100%;width:auto;display:block;"></div>' for l in logos)
            + '</div></div>')

    def svc(img, title, text, plat, span=""):
        return ('<a href="#" class="card" style="display:flex;flex-direction:column;overflow:hidden;color:#0B1020;' + span + '">'
                '<div style="flex:1;min-height:210px;overflow:hidden;background:#EEF1F7;"><img src="' + img + '" alt="' + title + '" class="shot"></div>'
                '<div style="padding:26px 28px 28px;display:flex;flex-direction:column;gap:12px;"><div style="display:flex;justify-content:space-between;align-items:center;gap:12px;"><h3 class="h3" style="font-size:26px;">' + title + '</h3><i class="arr" style="color:#1D4ED8;"></i></div>'
                '<p class="body" style="font-size:15.5px;">' + text + '</p><div style="display:flex;flex-wrap:wrap;gap:8px;">' + "".join('<span class="chip" style="font-size:12px;padding:5px 11px;">' + p + '</span>' for p in plat) + '</div></div></a>')

    services = ('<div style="padding:120px 80px;background:#FBFAF6;">'
                '<div style="display:flex;justify-content:space-between;align-items:end;gap:40px;">' + section_head("What we run", 'Five systems. <span class="serif">One</span> senior team.', "", size=72, maxw="14ch")
                + '<p class="lede" style="max-width:44ch;">Every engagement is built from the same five systems, run by the people who have shipped them for brands and institutes.</p></div>'
                '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-template-rows:auto auto;gap:24px;margin-top:56px;">'
                + svc("svc-performance.jpg", "Performance media", "Meta, Google, YouTube, Amazon and quick commerce, budgeted against contribution margin and cost per admission.", ["Meta", "Google", "Amazon", "Blinkit &amp; Zepto"], "grid-row:span 2;")
                + svc("svc-creative.jpg", "Creative &amp; UGC", "Ads, UGC and video produced and tested weekly, so winning angles scale before they fatigue.", ["Statics", "Reels", "UGC"])
                + svc("svc-retention.jpg", "Retention &amp; follow-up", "Email and WhatsApp flows that drive repeat orders, and journeys that turn enquiries into campus visits.", ["Klaviyo", "WhatsApp", "CRM"])
                + svc("svc-conversion.jpg", "Conversion &amp; technology", "Shopify builds and CRO for D2C. Enquiry-first websites and CRM wiring for institutes.", ["Shopify", "Landing pages", "CRO"])
                + svc("svc-brand.jpg", "Brand &amp; packaging", "Identity, packaging and brand systems that make every performance rupee work harder.", ["Identity", "Packaging"])
                + '</div></div>')

    def work(img, name, seg, keys, big=False):
        return ('<a href="#" style="display:flex;flex-direction:column;gap:16px;color:#FFFFFF;' + ("grid-column:span 2;" if big else "") + '">'
                '<div class="frame" style="height:' + ("430px" if big else "300px") + ';"><img src="' + img + '" alt="' + name + ' work" class="shot"></div>'
                '<div style="display:flex;justify-content:space-between;align-items:center;gap:16px;"><div style="display:flex;flex-direction:column;gap:6px;"><span class="label" style="color:#FFC528;">' + seg + '</span><span class="h3" style="font-size:' + ("30px" if big else "24px") + ';color:#FFFFFF;">' + name + '</span></div>'
                '<i class="arr" style="color:#FFFFFF;"></i></div>' + chips(keys) + '</a>')

    showcase = ('<div class="dark" style="padding:120px 80px;"><div class="glow"></div>'
                '<div style="display:flex;justify-content:space-between;align-items:end;gap:40px;">' + section_head("Selected work", 'Built, launched and still <span class="serif">running.</span>', "", size=72, dark=True, maxw="16ch")
                + '<div style="display:flex;gap:8px;"><span class="chip chip-on">All work</span><span class="chip">D2C brands</span><span class="chip">Education</span></div></div>'
                '<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:48px 28px;margin-top:56px;">'
                + work("cs-oosh.jpg", "OOsh", "D2C", ["web", "perf", "creative"], True)
                + work("cs-mvj.jpg", "MVJ College of Engineering", "Education", ["web", "leadgen", "creative", "social"], True)
                + work("cs-giraffe.jpg", "The Growing Giraffe", "D2C", ["cro", "perf", "amazon", "quickcom"])
                + work("cs-notic.jpg", "Notic", "D2C", ["web", "perf", "social"])
                + work("cs-sprouts.jpg", "Sprouts Edu Tours", "Educational travel", ["web", "leadgen", "creative"])
                + work("cs-vagakids.jpg", "Vaga Kids", "D2C", ["web", "perf", "creative"])
                + '</div><div style="display:flex;justify-content:center;margin-top:64px;"><a href="#" class="btn btn-ghost">See all work <i class="arr"></i></a></div></div>')

    commits = [("One senior team", "The people on your first call run your account. No hand-offs to juniors after the pitch."),
               ("Measured on the P&amp;L", "D2C brands see contribution margin and CAC payback. Institutes see enquiries, visits and admissions."),
               ("A working engine in four weeks", "Audit, tracking, account structure and the first creative sprint, live within a month."),
               ("Freedom to leave", "A 30-day exit clause. We keep clients with results, not contracts.")]
    commitment = ('<div class="sunband" style="padding:120px 80px;background:#FFC528;">'
                  '<div style="display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:80px;align-items:start;">'
                  + section_head("Our commitment", 'What you can hold us <span style="font-family:var(--serif);font-style:italic;font-weight:600;">to.</span>', "", size=80, maxw="10ch")
                  + '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0;border-top:1.5px solid rgba(11,16,32,0.9);">'
                  + "".join('<div style="padding:30px 28px 34px 0;border-bottom:1px solid rgba(11,16,32,0.22);display:flex;flex-direction:column;gap:12px;"><h3 class="h3" style="font-size:28px;">' + t + '</h3><p class="body" style="color:rgba(11,16,32,0.72);font-size:16.5px;">' + d + '</p></div>' for t, d in commits)
                  + '</div></div></div>')

    steps = [("Audit", "We read your P&amp;L, ad accounts and funnel, and show exactly where money or enquiries leak."),
             ("Build", "Tracking, account structure, landing pages and a creative plan, set up in two weeks."),
             ("Launch", "Campaigns go live with weekly creative tests and one scorecard everyone agrees on."),
             ("Compound", "Monthly reviews move budget to whatever earns margin or admissions.")]
    process = ('<div style="padding:120px 80px;background:#FFFFFF;">' + section_head("How we work", 'From audit to <span class="serif">compounding</span> in four steps.', "", size=64, maxw="18ch")
               + '<div style="position:relative;margin-top:64px;"><div style="position:absolute;left:0;right:0;top:27px;height:1.5px;background:linear-gradient(90deg,#1D4ED8,#FFC528);"></div>'
               '<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:32px;position:relative;">'
               + "".join('<div style="display:flex;flex-direction:column;gap:18px;"><span class="num" style="width:56px;height:56px;border-radius:50%;background:#0F1E5E;color:#FFC528;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 0 0 8px #FFFFFF;">0' + str(i + 1) + '</span>'
                         '<h3 class="h3" style="font-size:30px;">' + t + '</h3><p class="body">' + d + '</p></div>' for i, (t, d) in enumerate(steps))
               + '</div></div></div>')

    tool_rows = [("Break-even ROAS", "D2C"), ("LTV : CAC", "D2C"), ("CAC runway", "D2C"), ("Funnel ROAS", "D2C"), ("Unit economics", "D2C"), ("Cost per admission", "Education &#183; New")]
    tools = ('<div style="padding:120px 80px;background:#FBFAF6;"><div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,600px);gap:80px;align-items:center;">'
             '<div style="display:flex;flex-direction:column;gap:28px;">' + section_head("Free tools", 'Run the numbers <span class="serif">before</span> you call us.', "The same calculators our strategists use in every audit. No sign-up, and you can send the result to your team.", size=64, maxw="14ch")
             + '<div style="display:flex;flex-direction:column;border-top:1px solid rgba(11,16,32,0.12);">'
             + "".join('<a href="#" style="display:flex;justify-content:space-between;align-items:center;padding:17px 0;border-bottom:1px solid rgba(11,16,32,0.12);color:#0B1020;"><span style="font-family:var(--display);font-weight:700;font-size:19px;">' + n + '</span><span style="display:flex;gap:14px;align-items:center;"><span class="label">' + s + '</span><i class="arr" style="color:#1D4ED8;"></i></span></a>' for n, s in tool_rows)
             + '</div></div>'
             '<div class="card" style="padding:36px;display:flex;flex-direction:column;gap:22px;box-shadow:0 50px 90px -50px rgba(11,16,32,0.45);">'
             '<div style="display:flex;justify-content:space-between;align-items:center;"><span class="h3" style="font-size:24px;">Break-even ROAS</span><span class="sample">Sample inputs</span></div>'
             '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;">'
             + "".join('<label class="field"><span>' + a + '</span><span class="input" style="color:#0B1020;font-weight:700;">' + b + '</span></label>' for a, b in [("Average order value", "&#8377;1,450"), ("Product cost", "32%"), ("Shipping &amp; packing", "&#8377;120"), ("Payment &amp; COD fees", "3%"), ("RTO rate", "18%"), ("Discounts", "5%")])
             + '</div><div style="border-radius:16px;background:#0F1E5E;padding:26px 28px;display:flex;justify-content:space-between;align-items:center;gap:20px;">'
             '<div style="display:flex;flex-direction:column;gap:4px;"><span class="label" style="color:rgba(255,255,255,0.6);">You break even at</span><span class="num" style="font-size:56px;color:#FFFFFF;">2.02<span style="color:#FFC528;font-size:30px;">&#215;</span></span></div>'
             '<div style="display:flex;flex-direction:column;gap:10px;align-items:flex-end;"><span style="font-size:14px;color:rgba(255,255,255,0.7);">Contribution per order &#8377;718</span><a href="#" class="btn btn-sun" style="padding:13px 20px;">Email me this <i class="arr"></i></a></div></div></div>'
             '</div></div>')

    quote = ('<div style="padding:120px 80px;background:#FFFFFF;"><div style="display:grid;grid-template-columns:minmax(0,1fr) 380px;gap:80px;align-items:center;">'
             '<div style="display:flex;flex-direction:column;gap:30px;"><span class="eyebrow">In their words</span>'
             '<p style="font-family:var(--serif);font-style:italic;font-weight:500;font-size:52px;line-height:1.14;letter-spacing:-0.01em;color:#0B1020;margin:0;">&#8220;[Client quote: one or two sentences on what changed after working with MMC, in the client&#8217;s own words.]&#8221;</p>'
             '<div style="display:flex;gap:16px;align-items:center;"><span class="ph" style="width:56px;height:56px;border-radius:50%;display:block;"></span><div style="display:flex;flex-direction:column;"><span style="font-weight:800;font-size:16px;">[Founder or principal name]</span><span style="font-size:14px;color:#47506A;">[Role], [Brand or institute]</span></div></div>'
             '<div style="display:flex;gap:10px;"><span class="plus" style="width:44px;height:44px;">&#8592;</span><span class="plus" style="width:44px;height:44px;background:#0F1E5E;color:#FFC528;border-color:#0F1E5E;">&#8594;</span></div></div>'
             '<div class="ph" style="height:460px;border-radius:22px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;text-align:center;padding:20px;">[Client video testimonial]</div>'
             '</div></div>')

    guides = [("work-giraffe.jpg", "D2C", "Break-even ROAS for Indian D2C, with COD and RTO counted"),
              ("cs-mvj.jpg", "Education", "The Indian admissions calendar, segment by segment"),
              ("svc-performance.jpg", "Pricing", "What a performance marketing agency costs in India")]
    insights = ('<div style="padding:120px 80px;background:#FBFAF6;"><div style="display:flex;justify-content:space-between;align-items:end;gap:40px;">'
                + section_head("Guides", 'Answers written for how <span class="serif">India</span> buys.', "", size=64, maxw="16ch")
                + '<a href="#" class="btn btn-ghost" style="color:#0B1020;">All guides <i class="arr"></i></a></div>'
                '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px;margin-top:56px;">'
                + "".join('<a href="#" style="display:flex;flex-direction:column;gap:18px;color:#0B1020;"><div style="height:250px;border-radius:16px;overflow:hidden;background:#EEF1F7;"><img src="' + i + '" alt="" class="shot"></div>'
                          '<span class="label" style="color:#1D4ED8;">' + s + '</span><span class="h3" style="font-size:25px;">' + t + '</span></a>' for i, s, t in guides)
                + '</div></div>')

    body = hero + router + wall + services + showcase + commitment + process + tools + quote + insights + cta_band('Tell us where growth is <span class="serif">stuck.</span>', "Book a 30-minute call or send a brief. A senior strategist reads every one and replies with a plan, not a pitch.") + footer()
    return page(body, 1440, "#070E2A")


# ─────────────────────────────── D2C HUB (desktop) ───────────────────────────────
def d2c_hub():
    hero = ('<div class="dark" style="padding:180px 80px 100px;"><div class="glow"></div><div class="gridbg"></div>' + nav("D2C brands")
            + '<div style="display:grid;grid-template-columns:minmax(0,1fr) 600px;gap:60px;align-items:center;">'
            '<div style="display:flex;flex-direction:column;gap:28px;"><span class="tag" style="align-self:flex-start;"><i class="dot"></i>For D2C brands doing &#8377;3Cr to &#8377;150Cr a year</span>'
            '<h1 class="h1" style="font-size:104px;color:#FFFFFF;max-width:10ch;">Grow the brand. Keep the <span class="serif">margin.</span></h1>'
            '<p class="lede" style="font-size:20px;">Meta, Google, Amazon and quick commerce, creative that is tested every week, and a Shopify storefront that converts, all run by one senior team and judged on contribution margin.</p>'
            '<div style="display:flex;gap:10px;padding:8px;border-radius:999px;background:#FFFFFF;max-width:560px;"><span style="flex:1;display:flex;align-items:center;padding:0 18px;font-size:15px;color:#7C8598;">yourbrand.com</span><a href="#" class="btn btn-sun">Get a free account review <i class="arr"></i></a></div>'
            '<span style="font-size:14px;color:rgba(255,255,255,0.6);">A senior strategist reviews your ads, site and unit economics.</span></div>'
            '<div style="position:relative;height:620px;">'
            '<div class="frame" style="position:absolute;left:0;top:30px;width:250px;height:440px;transform:rotate(-5deg);"><img src="work-sprnt.jpg" alt="Sprnt ad creative" class="shot"></div>'
            '<div class="frame" style="position:absolute;left:190px;top:0;width:260px;height:470px;transform:rotate(1deg);z-index:2;"><img src="work-mbb.jpg" alt="MyBrownButters ad creative" class="shot"></div>'
            '<div class="frame" style="position:absolute;right:-20px;top:60px;width:250px;height:430px;transform:rotate(6deg);"><img src="work-awwbaby.jpg" alt="AwwBaby ad creative" class="shot"></div>'
            '<div style="position:absolute;left:60px;right:30px;bottom:0;z-index:3;background:#FFFFFF;border-radius:20px;padding:24px 26px;color:#0B1020;box-shadow:0 40px 80px -30px rgba(0,0,0,0.6);display:flex;flex-direction:column;gap:14px;">'
            '<div style="display:flex;justify-content:space-between;align-items:center;"><span class="label">Weekly scorecard</span><span class="sample">Sample</span></div>'
            '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;">'
            + "".join('<div style="display:flex;flex-direction:column;gap:4px;"><span class="num" style="font-size:28px;">' + v + '</span><span style="font-size:12.5px;color:#47506A;">' + l + '</span></div>' for v, l in [("&#8377;41.2L", "Contribution margin"), ("2.6&#215;", "Blended ROAS"), ("38 days", "CAC payback")])
            + '</div><div style="height:46px;border-radius:10px;background:linear-gradient(180deg,rgba(29,78,216,0.12),rgba(29,78,216,0));position:relative;overflow:hidden;"><svg width="100%" height="46" viewBox="0 0 400 46" preserveAspectRatio="none"><path d="M0 38 L50 34 L100 36 L150 28 L200 26 L250 20 L300 18 L350 11 L400 8" stroke="#1D4ED8" stroke-width="2.5" fill="none"/></svg></div></div>'
            '</div></div></div>')

    pains = [("ROAS looks fine. Margin doesn&#8217;t.", "We plan and bid on contribution margin after COGS, shipping, COD fees and RTO, not on platform ROAS."),
             ("Creative fatigues in two weeks", "A weekly creative sprint of statics, reels and UGC, with every test logged so winners scale fast."),
             ("RTO and COD eat the profit", "Prepaid nudges, pincode rules, COD confirmation on WhatsApp and checkout fixes that protect every order."),
             ("Repeat purchase is flat", "Email and WhatsApp flows for second orders, replenishment and win-back, measured on cohort revenue."),
             ("The site undersells the ad", "Landing pages that match each ad&#8217;s promise, plus a Shopify CRO roadmap tested every fortnight."),
             ("Marketplaces without a plan", "Amazon, Blinkit, Zepto and Instamart run with the same margin rules as your own site.")]
    stuck = ('<div style="padding:120px 80px;background:#FBFAF6;">' + section_head("Where growth gets stuck", 'Six problems we fix <span class="serif">every</span> week.', "", size=64, maxw="18ch")
             + '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:56px;">'
             + "".join('<div class="card" style="padding:32px;display:flex;flex-direction:column;gap:14px;"><span class="num" style="font-size:14px;color:#1D4ED8;letter-spacing:0.08em;">0' + str(i + 1) + '</span><h3 class="h3" style="font-size:25px;">' + t + '</h3><p class="body" style="font-size:15.5px;">' + d + '</p></div>' for i, (t, d) in enumerate(pains))
             + '</div></div>')

    svcs = [("svc-performance.jpg", "Meta Ads", "Full-funnel structure, daily creative iteration, cohort-driven optimisation."),
            ("work-giraffe.jpg", "Google &amp; YouTube Ads", "Search, Shopping, Performance Max and YouTube for intent you already created."),
            ("work-mittiy.jpg", "Amazon &amp; quick commerce", "Listings, ads and ratings on Amazon, Blinkit, Zepto and Instamart."),
            ("svc-creative.jpg", "Creative &amp; UGC", "Statics, reels and creator content produced and tested every week."),
            ("svc-retention.jpg", "Retention: email &amp; WhatsApp", "Flows for second orders, replenishment, COD confirmation and win-back."),
            ("svc-conversion.jpg", "Shopify &amp; CRO", "Storefront builds, landing pages and a fortnightly test roadmap.")]
    services = ('<div style="padding:120px 80px;background:#FFFFFF;"><div style="display:flex;justify-content:space-between;align-items:end;gap:40px;">'
                + section_head("Services for D2C", 'Everything a brand needs to <span class="serif">compound.</span>', "", size=64, maxw="16ch")
                + '<a href="#" class="btn btn-ghost" style="color:#0B1020;">Compare plans <i class="arr"></i></a></div>'
                '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:56px;">'
                + "".join('<a href="#" style="display:flex;flex-direction:column;border-radius:18px;overflow:hidden;background:#FBFAF6;border:1px solid rgba(11,16,32,0.08);color:#0B1020;"><div style="height:220px;overflow:hidden;"><img src="' + i + '" alt="" class="shot"></div>'
                          '<div style="padding:26px 28px 30px;display:flex;flex-direction:column;gap:10px;"><div style="display:flex;justify-content:space-between;align-items:center;"><h3 class="h3" style="font-size:25px;">' + t + '</h3><i class="arr" style="color:#1D4ED8;"></i></div><p class="body" style="font-size:15.5px;">' + d + '</p></div></a>' for i, t, d in svcs)
                + '</div></div>')

    brands = [("cs-awwbaby.jpg", "AwwBaby", ["web", "perf", "creative"]), ("cs-mittiy.jpg", "Mittiy Made", ["cro", "perf", "creative"]),
              ("cs-mbb.jpg", "MyBrownButters", ["web", "perf", "creative"]), ("cs-sprnt.jpg", "Sprnt", ["web", "perf", "creative", "social"]),
              ("cs-notic.jpg", "Notic", ["web", "perf", "creative", "social"]), ("cs-giraffe.jpg", "The Growing Giraffe", ["cro", "perf", "amazon", "quickcom"])]
    work = ('<div class="dark" style="padding:120px 80px;"><div class="glow"></div>'
            + section_head("D2C work", 'Brands we build, run and <span class="serif">renew</span> with.', "", size=64, dark=True, maxw="18ch")
            + '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:48px 28px;margin-top:56px;">'
            + "".join('<a href="#" style="display:flex;flex-direction:column;gap:14px;color:#FFFFFF;"><div class="frame" style="height:280px;"><img src="' + i + '" alt="' + n + ' work" class="shot"></div>'
                      '<div style="display:flex;justify-content:space-between;align-items:center;"><span class="h3" style="font-size:24px;color:#FFFFFF;">' + n + '</span><i class="arr"></i></div>' + chips(k) + '</a>' for i, n, k in brands)
            + '</div></div>')

    plats = ["meta", "google", "youtube", "amazon", "shopify", "klaviyo", "whatsapp", "razorpay"]
    plats_png = ["gokwik", "shopflo", "moengage"]
    stack = ('<div style="padding:96px 80px;background:#FFFFFF;border-bottom:1px solid rgba(11,16,32,0.08);"><div style="display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:60px;align-items:center;">'
             + section_head("The stack we operate", 'Fluent in the Indian D2C <span class="serif">stack.</span>', "", size=48, maxw="14ch")
             + '<div style="display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:14px;">'
             + "".join('<div style="height:88px;border-radius:14px;background:#FBFAF6;border:1px solid rgba(11,16,32,0.08);display:flex;align-items:center;justify-content:center;padding:20px;"><img src="pf-' + p + '.svg" alt="' + p + '" style="max-height:34px;max-width:100%;display:block;"></div>' for p in plats)
             + "".join('<div style="height:88px;border-radius:14px;background:#FBFAF6;border:1px solid rgba(11,16,32,0.08);display:flex;align-items:center;justify-content:center;padding:20px;"><img src="pf-' + p + '.png" alt="' + p + '" style="max-height:34px;max-width:100%;display:block;"></div>' for p in plats_png)
             + '<div style="height:88px;border-radius:14px;border:1px dashed rgba(11,16,32,0.2);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#47506A;">+ Blinkit, Zepto</div>'
             + '</div></div></div>')

    tiers = [("Spark", "&#8377;3L", "Up to &#8377;10L monthly ad spend", ["Meta Ads management", "30 new creatives a month", "Weekly scorecard"], False),
             ("Compound", "&#8377;6L", "&#8377;10L to &#8377;50L monthly ad spend", ["Meta and Google Ads", "60 to 80 new creatives a month", "Retention flows on email and WhatsApp", "Fortnightly CRO tests"], True),
             ("Scale", "&#8377;12L+", "&#8377;50L+ monthly ad spend", ["Full-funnel media incl. Amazon and quick commerce", "120+ new creatives a month", "Dedicated senior pod"], False)]
    pricing = ('<div style="padding:120px 80px;background:#FBFAF6;">' + section_head("Engagements", 'Plans that grow with your <span class="serif">spend.</span>', "Flat monthly fees by ad-spend band. You pay the platforms directly, and every plan carries a 30-day exit clause.", size=64, maxw="16ch", align="center")
               + '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:56px;align-items:stretch;">'
               + "".join('<div style="border-radius:22px;padding:38px 36px;display:flex;flex-direction:column;gap:20px;' + ('background:#0F1E5E;color:#FFFFFF;box-shadow:0 50px 90px -40px rgba(15,30,94,0.6);' if hi else 'background:#FFFFFF;border:1px solid rgba(11,16,32,0.10);') + '">'
                         '<div style="display:flex;justify-content:space-between;align-items:center;"><span class="h3" style="font-size:26px;color:' + ('#FFFFFF' if hi else '#0B1020') + ';">' + n + '</span>' + ('<span class="chip" style="background:#FFC528;border-color:#FFC528;color:#0B1020;">Most chosen</span>' if hi else '') + '</div>'
                         '<div><span class="num" style="font-size:60px;color:' + ('#FFFFFF' if hi else '#0B1020') + ';">' + p + '</span><span style="font-size:15px;color:' + ('rgba(255,255,255,0.6)' if hi else '#47506A') + ';"> / month + GST</span></div>'
                         '<span style="font-size:14px;font-weight:700;color:' + ('#FFC528' if hi else '#1D4ED8') + ';">' + b + '</span>'
                         '<div style="display:flex;flex-direction:column;gap:12px;padding-top:18px;border-top:1px solid ' + ('rgba(255,255,255,0.14)' if hi else 'rgba(11,16,32,0.10)') + ';">'
                         + "".join('<div style="display:flex;gap:12px;font-size:15.5px;line-height:1.45;color:' + ('rgba(255,255,255,0.84)' if hi else '#47506A') + ';">' + TICK + '<span>' + f + '</span></div>' for f in feats)
                         + '</div><a href="#" class="btn ' + ('btn-sun' if hi else 'btn-ink') + '" style="margin-top:auto;">Talk to us <i class="arr"></i></a></div>' for n, p, b, feats, hi in tiers)
               + '</div></div>')

    faqs = ["Who owns the ad accounts, pixels and creative?", "Is there a minimum ad spend or contract length?", "How quickly do campaigns go live?",
            "Do you work with brands selling on Amazon and quick commerce?", "What do the weekly and monthly reports show?", "Can you work alongside our in-house team?"]
    faq = ('<div style="padding:120px 80px;background:#FFFFFF;"><div style="display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:80px;">'
           + section_head("Questions founders ask", 'Before you <span class="serif">sign.</span>', "", size=64, maxw="10ch")
           + '<div style="border-top:1px solid rgba(11,16,32,0.12);">' + "".join('<div class="faq">' + q + '<span class="plus">+</span></div>' for q in faqs) + '</div></div></div>')

    body = hero + stuck + services + work + stack + pricing + faq + cta_band('Show us your <span class="serif">numbers.</span>', "Share your store and ad spend band. A senior strategist comes back with where margin is leaking and what we would test first.") + footer()
    return page(body, 1440, "#070E2A")


# ─────────────────────────────── EDUCATION (desktop) ───────────────────────────────
def education():
    segs = ["K-12 schools", "Colleges &amp; universities", "Coaching &amp; test prep", "Skilling &amp; vocational", "Study abroad", "Selling to schools"]
    funnel = [("Enquiries", "1,240", 100), ("Counselling calls", "612", 49), ("Campus visits", "184", 15), ("Applications", "96", 8), ("Admissions", "41", 3.3)]
    hero = ('<div class="dark" style="padding:180px 80px 100px;"><div class="glow"></div><div class="gridbg"></div>' + nav("Education")
            + '<div style="display:grid;grid-template-columns:minmax(0,1fr) 600px;gap:60px;align-items:center;">'
            '<div style="display:flex;flex-direction:column;gap:28px;"><span class="tag" style="align-self:flex-start;"><i class="dot"></i>Admissions marketing for educational institutes</span>'
            '<h1 class="h1" style="font-size:104px;color:#FFFFFF;max-width:11ch;">Fill every seat with the <span class="serif">right</span> students.</h1>'
            '<p class="lede" style="font-size:20px;">Campaigns, websites and follow-up systems for schools, colleges, coaching and skilling institutes, run by one senior team and reported in enquiries, visits and admissions.</p>'
            '<div style="display:flex;flex-wrap:wrap;gap:8px;">' + "".join('<span class="chip' + (' chip-on' if i == 1 else '') + '">' + s + '</span>' for i, s in enumerate(segs)) + '</div>'
            '<div style="display:flex;gap:12px;flex-wrap:wrap;"><a href="#" class="btn btn-sun">' + CAL_ICON + 'Plan my admission season</a><a href="#" class="btn btn-ghost">' + WA_ICON + 'WhatsApp us</a></div></div>'
            '<div style="position:relative;height:640px;">'
            '<div class="frame" style="position:absolute;right:-120px;top:0;width:560px;transform:rotate(3deg);"><img src="cs-mvj.jpg" alt="MVJ College of Engineering website mockup" class="shot" style="height:auto;"></div>'
            '<div class="frame" style="position:absolute;left:-10px;top:150px;width:470px;transform:rotate(-4deg);"><img src="cs-sprouts.jpg" alt="Sprouts Edu Tours website mockup" class="shot" style="height:auto;"></div>'
            '<div style="position:absolute;left:70px;right:10px;bottom:0;z-index:3;background:#FFFFFF;border-radius:20px;padding:24px 26px;color:#0B1020;box-shadow:0 40px 80px -30px rgba(0,0,0,0.6);display:flex;flex-direction:column;gap:12px;">'
            '<div style="display:flex;justify-content:space-between;align-items:center;"><span class="label">This admission cycle</span><span class="sample">Sample</span></div>'
            + "".join('<div style="display:grid;grid-template-columns:130px minmax(0,1fr) 56px;gap:12px;align-items:center;font-size:13.5px;"><span style="color:#47506A;font-weight:700;">' + l + '</span><span style="height:10px;border-radius:6px;background:#EEF1F7;overflow:hidden;display:block;"><span style="display:block;height:100%;width:' + str(w) + '%;background:' + ('#FFC528' if l == "Admissions" else '#1D4ED8') + ';border-radius:6px;"></span></span><span class="num" style="font-size:16px;text-align:right;">' + v + '</span></div>' for l, v, w in funnel)
            + '</div></div></div></div>')

    logos = ["mvj", "sprouts", "bloom", "learningmate"]
    trust = ('<div style="padding:56px 80px;background:#FFFFFF;border-bottom:1px solid rgba(11,16,32,0.08);display:flex;align-items:center;gap:48px;">'
             '<span class="eyebrow" style="flex:none;">Trusted by institutes and education brands</span><div style="display:flex;gap:18px;flex:1;">'
             + "".join('<div style="flex:1;height:92px;border-radius:14px;background:#FBFAF6;border:1px solid rgba(11,16,32,0.08);display:flex;align-items:center;justify-content:center;padding:18px 24px;"><img src="logo-' + l + '.png" alt="' + l + ' logo" style="max-height:48px;max-width:100%;display:block;"></div>' for l in logos)
             + '</div></div>')

    leaks = [("Ad", "Ads reach parents and students outside your catchment, or the wrong course."),
             ("Landing page", "The page doesn&#8217;t answer fees, eligibility or placements, so visitors leave."),
             ("First reply", "Enquiries wait hours for a WhatsApp reply while other institutes call first."),
             ("Counsellor call", "One call, no follow-up plan, no record of what the family asked."),
             ("Campus visit", "Visits are booked but not confirmed, reminded or followed up."),
             ("Fee paid", "Applications stall at documents and fees without a nudge sequence.")]
    leak = ('<div style="padding:120px 80px;background:#FBFAF6;">' + section_head("Where admissions leak", 'Most seats are lost <span class="serif">after</span> the enquiry.', "We fix the whole path, from the first ad to the fee receipt, and report every stage so you can see where each seat comes from.", size=64, maxw="18ch")
            + '<div style="display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:0;margin-top:60px;border-radius:22px;overflow:hidden;border:1px solid rgba(11,16,32,0.10);background:#FFFFFF;">'
            + "".join('<div style="padding:30px 24px 34px;display:flex;flex-direction:column;gap:14px;' + ('border-left:1px solid rgba(11,16,32,0.10);' if i else '') + '">'
                      '<div style="display:flex;align-items:center;gap:10px;"><span class="num" style="width:34px;height:34px;border-radius:50%;background:' + ('#FFC528' if i == 5 else '#0F1E5E') + ';color:' + ('#0B1020' if i == 5 else '#FFC528') + ';display:flex;align-items:center;justify-content:center;font-size:14px;">' + str(i + 1) + '</span>'
                      + ('' if i == 5 else '<span style="flex:1;height:1.5px;background:rgba(11,16,32,0.14);"></span>') + '</div>'
                      '<h3 class="h3" style="font-size:22px;">' + t + '</h3><p class="body" style="font-size:14.5px;">' + d + '</p></div>' for i, (t, d) in enumerate(leaks))
            + '</div></div>')

    tabs = ('<div style="padding:120px 80px;background:#FFFFFF;">' + section_head("By segment", 'One playbook per kind of <span class="serif">institute.</span>', "", size=64, maxw="18ch")
            + '<div style="display:flex;gap:8px;margin-top:40px;flex-wrap:wrap;">' + "".join('<span class="chip' + (' chip-on' if i == 1 else '') + '" style="padding:11px 18px;font-size:14px;">' + s + '</span>' for i, s in enumerate(segs)) + '</div>'
            '<div style="display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:0;margin-top:28px;border-radius:24px;overflow:hidden;background:#0F1E5E;color:#FFFFFF;">'
            '<div style="padding:56px;display:flex;flex-direction:column;gap:26px;"><span class="label" style="color:#FFC528;">Colleges &amp; universities</span>'
            '<h3 class="h3" style="font-size:40px;color:#FFFFFF;max-width:20ch;">Win the shortlist before results day, then convert it.</h3>'
            '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px 32px;">'
            + "".join('<div style="display:flex;flex-direction:column;gap:6px;"><span style="font-weight:800;font-size:16px;color:#FFFFFF;">' + a + '</span><span style="font-size:15px;line-height:1.55;color:rgba(255,255,255,0.7);">' + b + '</span></div>'
                      for a, b in [("What we run", "Course-level Google Search, Meta and YouTube, program landing pages, WhatsApp follow-up."),
                                   ("Who we speak to", "Students by course and city, and the parents who co-decide and pay."),
                                   ("Season focus", "Brand months, entrance-exam windows, results and counselling rounds."),
                                   ("What you see", "Enquiries, counselling calls, visits, applications and admissions by course.")])
            + '</div><a href="#" class="btn btn-sun" style="align-self:flex-start;">See the college playbook <i class="arr"></i></a></div>'
            '<div style="position:relative;min-height:520px;"><img src="work-mvj.jpg" alt="MVJ College admissions creative" class="shot" style="position:absolute;inset:0;"></div></div></div>')

    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    bands = [("Brand and reputation", 0, 12, "rgba(29,78,216,0.16)", "#16329E"), ("Enquiry push", 0, 4, "#1D4ED8", "#FFFFFF"),
             ("Entrance exams &amp; results", 3, 6, "#FFC528", "#0B1020"), ("Counselling &amp; applications", 5, 8, "#0F1E5E", "#FFFFFF"), ("Retargeting late deciders", 7, 9, "rgba(255,197,40,0.35)", "#0B1020")]
    calendar = ('<div style="padding:120px 80px;background:#FBFAF6;"><div style="display:flex;justify-content:space-between;align-items:end;gap:40px;">'
                + section_head("Admissions calendar", 'Spend when families <span class="serif">decide.</span>', "", size=64, maxw="14ch")
                + '<div style="display:flex;gap:10px;align-items:center;"><span class="sample">Sample: undergraduate intake</span><a href="#" class="btn btn-ink" style="padding:14px 22px;">Build my calendar <i class="arr"></i></a></div></div>'
                '<div class="card" style="margin-top:48px;padding:32px 36px 40px;">'
                '<div style="display:grid;grid-template-columns:220px repeat(12,minmax(0,1fr));gap:0;align-items:center;">'
                '<span></span>' + "".join('<span class="label" style="text-align:center;padding-bottom:16px;">' + m + '</span>' for m in months)
                + "".join('<span style="font-weight:800;font-size:15px;padding:12px 0;border-top:1px solid rgba(11,16,32,0.08);">' + n + '</span>'
                          '<span style="grid-column:span 12;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));padding:10px 0;border-top:1px solid rgba(11,16,32,0.08);">'
                          + ('<span style="grid-column:span ' + str(s) + ';"></span>' if s else '') + '<span style="grid-column:span ' + str(e - s) + ';height:30px;border-radius:999px;background:' + bg + ';color:' + fg + ';font-size:12px;font-weight:800;display:flex;align-items:center;padding:0 14px;">' + months[s] + ' to ' + months[e - 1] + '</span></span>' for n, s, e, bg, fg in bands)
                + '</div></div></div>')

    streams = [("Admissions campaigns", "Google Search, Meta, YouTube and education portals, planned course by course."),
               ("Websites &amp; landing pages", "Fast program pages with fees, eligibility, placements and one clear enquiry form."),
               ("WhatsApp &amp; CRM follow-up", "Instant replies, counsellor assignment, visit reminders and document nudges."),
               ("Creative &amp; video", "Campus films, student stories and faculty reels made for each stage of the decision."),
               ("Search &amp; reputation", "Google Business Profiles, reviews and course pages that rank in your city."),
               ("Counsellor enablement", "Call scripts, WhatsApp templates and a weekly lead-quality review with your team.")]
    workstreams = ('<div style="padding:120px 80px;background:#FFFFFF;">' + section_head("What we run", 'Six workstreams, one <span class="serif">admissions</span> engine.', "", size=64, maxw="18ch")
                   + '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:56px;">'
                   + "".join('<a href="#" class="card" style="padding:32px;display:flex;flex-direction:column;gap:14px;color:#0B1020;background:#FBFAF6;"><div style="display:flex;justify-content:space-between;align-items:center;"><h3 class="h3" style="font-size:24px;">' + t + '</h3><i class="arr" style="color:#1D4ED8;"></i></div><p class="body" style="font-size:15.5px;">' + d + '</p></a>' for t, d in streams)
                   + '</div></div>')

    b2b = ('<div class="dark" style="padding:120px 80px;"><div class="glow"></div><div style="display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:72px;align-items:center;">'
           '<div style="display:flex;flex-direction:column;gap:24px;">' + section_head("Selling to schools", 'When the <span class="serif">school</span> is your customer.', "", size=60, dark=True, maxw="14ch")
           + '<p class="lede">Educational travel, edtech and school-supply companies sell to principals and trustees, not parents. We build the websites, lead generation and creative for that longer, relationship-led sale.</p>'
           '<div style="display:flex;gap:12px;"><div style="flex:1;border-radius:16px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.14);padding:22px;display:flex;flex-direction:column;gap:10px;"><img src="logo-sprouts.png" alt="Sprouts Edu Tours" style="height:40px;width:auto;align-self:flex-start;background:#FFFFFF;border-radius:8px;padding:6px 10px;">' + chips(["web", "leadgen", "creative", "social"]) + '</div>'
           '<div style="flex:1;border-radius:16px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.14);padding:22px;display:flex;flex-direction:column;gap:10px;"><img src="logo-bloom.png" alt="Bloom Edutours" style="height:40px;width:auto;align-self:flex-start;background:#FFFFFF;border-radius:8px;padding:6px 10px;">' + chips(["web", "leadgen", "creative", "social"]) + '</div></div></div>'
           '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;"><div class="frame" style="height:470px;"><img src="work-sprouts.jpg" alt="Sprouts Edu Tours creative" class="shot"></div><div class="frame" style="height:470px;margin-top:60px;"><img src="work-bloom.jpg" alt="Bloom Edutours creative" class="shot"></div></div></div></div>')

    calc = ('<div style="padding:120px 80px;background:#FBFAF6;"><div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,640px);gap:80px;align-items:center;">'
            '<div style="display:flex;flex-direction:column;gap:26px;">' + section_head("Free tool", 'What does one <span class="serif">admission</span> really cost?', "Put in your budget and funnel, and see cost per enquiry, cost per admission and whether your counsellors can handle the volume.", size=60, maxw="15ch")
            + '<div style="display:flex;flex-direction:column;gap:12px;">' + "".join('<div style="display:flex;gap:12px;font-size:16px;color:#47506A;">' + TICK + '<span>' + p + '</span></div>' for p in ["Works for schools, colleges, coaching and skilling", "Shows the stage where improving conversion saves the most", "Send the result to your chairman or trustees"]) + '</div></div>'
            '<div class="card" style="padding:36px;display:flex;flex-direction:column;gap:20px;box-shadow:0 50px 90px -50px rgba(11,16,32,0.45);">'
            '<div style="display:flex;justify-content:space-between;align-items:center;"><span class="h3" style="font-size:24px;">Cost per admission</span><span class="sample">Sample inputs</span></div>'
            '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;">'
            + "".join('<label class="field"><span>' + a + '</span><span class="input" style="color:#0B1020;font-weight:700;">' + b + '</span></label>' for a, b in [("Season ad budget", "&#8377;18,00,000"), ("Enquiries expected", "3,000"), ("Enquiry to visit", "14%"), ("Visit to admission", "30%"), ("Counsellors", "6"), ("Calls per counsellor per day", "45")])
            + '</div><div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;">'
            + "".join('<div style="border-radius:14px;background:' + bg + ';padding:18px 18px 20px;display:flex;flex-direction:column;gap:4px;"><span class="label" style="color:' + lc + ';">' + l + '</span><span class="num" style="font-size:30px;color:' + vc + ';">' + v + '</span></div>'
                      for l, v, bg, lc, vc in [("Cost per enquiry", "&#8377;600", "#F1F3F8", "#7C8598", "#0B1020"), ("Admissions", "126", "#F1F3F8", "#7C8598", "#0B1020"), ("Cost per admission", "&#8377;14,286", "#0F1E5E", "rgba(255,255,255,0.6)", "#FFC528")])
            + '</div><div style="display:flex;gap:12px;align-items:flex-start;padding:14px 16px;border-radius:12px;background:rgba(255,197,40,0.18);font-size:14px;line-height:1.5;color:#0B1020;"><span style="font-weight:800;">Capacity check:</span><span>6 counsellors can make about 270 calls a day, enough for 3,000 enquiries over the season.</span></div>'
            '</div></div></div>')

    quote = ('<div style="padding:110px 80px;background:#FFFFFF;"><div style="display:grid;grid-template-columns:420px minmax(0,1fr);gap:80px;align-items:center;">'
             '<div class="ph" style="height:420px;border-radius:22px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;text-align:center;padding:20px;">[Principal or trustee video]</div>'
             '<div style="display:flex;flex-direction:column;gap:28px;"><span class="eyebrow">From an institute head</span>'
             '<p style="font-family:var(--serif);font-style:italic;font-weight:500;font-size:48px;line-height:1.15;color:#0B1020;margin:0;">&#8220;[Quote from a principal, director or trustee about the admission season with MMC.]&#8221;</p>'
             '<div style="display:flex;flex-direction:column;"><span style="font-weight:800;font-size:16px;">[Name]</span><span style="font-size:14px;color:#47506A;">[Role], [Institute], [City]</span></div></div></div></div>')

    comp = ('<div style="padding:64px 80px;background:#0F1E5E;display:grid;grid-template-columns:minmax(0,3fr) repeat(3,minmax(0,3fr));gap:40px;align-items:start;">'
            '<span class="h3" style="font-size:28px;color:#FFFFFF;">Compliant by <span class="serif" style="color:#FFC528;">default.</span></span>'
            + "".join('<div style="display:flex;flex-direction:column;gap:8px;"><span style="font-weight:800;font-size:16px;color:#FFFFFF;">' + a + '</span><span style="font-size:14.5px;line-height:1.55;color:rgba(255,255,255,0.7);">' + b + '</span></div>'
                      for a, b in [("DPDP consent", "Consent captured on every form and WhatsApp opt-in, with clear data use."), ("Calling etiquette", "Counsellor calls within permitted hours and with opt-out honoured."), ("Honest claims", "Placement, ranking and fee claims checked against ASCI guidelines before ads run.")])
            + '</div>')

    faqs = ["How early before admission season should we start?", "How do you count an enquiry, a visit and an admission?", "What happens if enquiries come in but admissions don&#8217;t?",
            "Do you work inside our CRM, such as Meritto or LeadSquared?", "Can you run campaigns in regional languages?", "What will our chairman see each month?"]
    faq = ('<div style="padding:120px 80px;background:#FBFAF6;"><div style="display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:80px;">'
           + section_head("Questions institutes ask", 'Before the <span class="serif">season</span> starts.', "", size=60, maxw="11ch")
           + '<div style="border-top:1px solid rgba(11,16,32,0.12);">' + "".join('<div class="faq">' + q + '<span class="plus">+</span></div>' for q in faqs) + '</div></div></div>')

    roles = ["Chairman or trustee", "Principal or director", "Admissions head", "Marketing head"]
    enquiry = ('<div class="dark" style="padding:120px 80px;"><div class="glow"></div><div class="gridbg"></div><div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,600px);gap:80px;align-items:center;">'
               '<div style="display:flex;flex-direction:column;gap:24px;"><span class="eyebrow">Plan your season</span><h2 class="h2" style="font-size:76px;color:#FFFFFF;">Let&#8217;s fill next year&#8217;s <span class="serif">seats.</span></h2>'
               '<p class="lede">Tell us about your institute. A senior strategist maps your admission calendar, funnel and budget, and shows where the next seats will come from.</p>'
               '<div style="display:flex;gap:12px;flex-wrap:wrap;"><a href="#" class="btn btn-ghost">' + WA_ICON + 'WhatsApp us</a><a href="#" class="btn btn-ghost">' + PHONE_ICON + 'Call now</a></div></div>'
               '<div style="background:#FFFFFF;border-radius:22px;padding:34px;display:flex;flex-direction:column;gap:18px;color:#0B1020;box-shadow:0 50px 100px -40px rgba(0,0,0,0.6);">'
               '<span class="field"><span>I am the</span></span><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:-10px;">'
               + "".join('<span style="padding:12px 14px;border-radius:12px;font-size:14px;font-weight:700;' + ('background:#0F1E5E;color:#FFFFFF;' if i == 2 else 'border:1px solid rgba(11,16,32,0.14);color:#47506A;') + '">' + r + '</span>' for i, r in enumerate(roles))
               + '</div><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;"><label class="field"><span>Institute name</span><span class="input">Institute</span></label><label class="field"><span>City</span><span class="input">City</span></label></div>'
               '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;"><label class="field"><span>Segment</span><span class="input">College or university</span></label><label class="field"><span>Seats to fill</span><span class="input">Choose a range</span></label></div>'
               '<label class="field"><span>Phone (WhatsApp)</span><span class="input">+91</span></label>'
               '<a href="#" class="btn btn-sun" style="width:100%;margin-top:4px;">' + CAL_ICON + 'Plan my admission season</a>'
               '<span style="font-size:12.5px;color:#7C8598;line-height:1.5;">By sending this you agree to be contacted about your enquiry. We never share your data.</span></div></div></div>')

    body = hero + trust + leak + tabs + calendar + workstreams + b2b + calc + quote + comp + faq + enquiry + footer()
    return page(body, 1440, "#070E2A")


# ─────────────────────────────── SERVICE: META ADS (desktop) ───────────────────────────────
def service_meta():
    hero = ('<div class="dark" style="padding:180px 80px 90px;"><div class="glow"></div><div class="gridbg"></div>' + nav("Services")
            + '<div style="display:flex;gap:10px;align-items:center;font-size:13px;font-weight:700;color:rgba(255,255,255,0.6);margin-bottom:34px;"><a href="#" style="color:rgba(255,255,255,0.6);">Home</a><span>/</span><a href="#" style="color:rgba(255,255,255,0.6);">D2C brands</a><span>/</span><a href="#" style="color:rgba(255,255,255,0.6);">Performance media</a><span>/</span><span style="color:#FFFFFF;">Meta Ads</span></div>'
            '<div style="display:grid;grid-template-columns:minmax(0,1fr) 560px;gap:60px;align-items:center;">'
            '<div style="display:flex;flex-direction:column;gap:28px;"><h1 class="h1" style="font-size:108px;color:#FFFFFF;max-width:10ch;">Meta Ads that <span class="serif">compound,</span> not just convert.</h1>'
            '<p class="lede" style="font-size:20px;">Meta Ads management, the MMC way: one account structure, a weekly creative engine and measurement tuned to contribution margin, for D2C brands spending &#8377;3L to &#8377;1Cr a month on Facebook and Instagram.</p>'
            '<div style="display:flex;gap:10px;padding:8px;border-radius:999px;background:#FFFFFF;max-width:560px;"><span style="flex:1;display:flex;align-items:center;padding:0 18px;font-size:15px;color:#7C8598;">yourbrand.com</span><a href="#" class="btn btn-sun">Review my account <i class="arr"></i></a></div></div>'
            '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;">'
            '<div class="frame" style="height:300px;transform:translateY(24px);"><img src="work-lepure.jpg" alt="Lepure Meta ad" class="shot"></div>'
            '<div class="frame" style="height:300px;"><img src="work-notic.jpg" alt="Notic Meta ad" class="shot"></div>'
            '<div class="frame" style="height:300px;transform:translateY(24px);"><img src="work-oosh.jpg" alt="OOsh Meta ad" class="shot"></div>'
            '<div class="frame" style="height:300px;"><img src="work-vagakids.jpg" alt="Vaga Kids Meta ad" class="shot"></div></div></div>'
            '<div style="margin-top:88px;">' + figures() + '</div></div>')

    fit = ('<div style="padding:110px 80px;background:#FBFAF6;"><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px;">'
           '<div class="card" style="padding:44px;display:flex;flex-direction:column;gap:18px;"><span class="eyebrow" style="color:#1D4ED8;">A good fit if</span>'
           + "".join('<div style="display:flex;gap:12px;font-size:17px;line-height:1.5;color:#0B1020;">' + TICK + '<span>' + p + '</span></div>' for p in ["You sell D2C on your own site, and Meta is your largest channel", "You spend &#8377;3L or more a month on Meta, or plan to within a quarter", "You want margin to grow, not just revenue", "You can share COGS, shipping and RTO data with us"])
           + '</div><div style="border-radius:18px;padding:44px;display:flex;flex-direction:column;gap:18px;border:1px dashed rgba(11,16,32,0.22);"><span class="eyebrow">Probably not a fit if</span>'
           + "".join('<div style="display:flex;gap:12px;font-size:17px;line-height:1.5;color:#47506A;"><span style="width:22px;height:22px;border-radius:50%;border:1.5px solid rgba(11,16,32,0.3);flex:none;margin-top:2px;"></span><span>' + p + '</span></div>' for p in ["You need a one-off campaign rather than an always-on engine", "Your product is not yet ready for paid scale", "You want vanity metrics reported instead of contribution"])
           + '</div></div></div>')

    tabs = ["Account structure", "Creative engine", "Measurement", "Reporting"]
    included = ('<div style="padding:120px 80px;background:#FFFFFF;">' + section_head("What&#8217;s included", 'Four pillars, on <span class="serif">every</span> account.', "", size=64, maxw="16ch")
                + '<div style="display:flex;gap:8px;margin-top:40px;">' + "".join('<span class="chip' + (' chip-on' if i == 1 else '') + '" style="padding:12px 20px;font-size:14px;">' + t + '</span>' for i, t in enumerate(tabs)) + '</div>'
                '<div style="display:grid;grid-template-columns:minmax(0,6fr) minmax(0,6fr);gap:56px;margin-top:28px;padding:48px;border-radius:24px;background:#FBFAF6;border:1px solid rgba(11,16,32,0.08);align-items:center;">'
                '<div style="display:flex;flex-direction:column;gap:22px;"><h3 class="h3" style="font-size:36px;">A weekly creative engine</h3>'
                '<p class="body" style="font-size:17px;">Angles are researched from reviews, comments and competitors, produced as statics, reels and UGC, and tested in a structured sprint every week.</p>'
                + "".join('<div style="display:flex;gap:12px;font-size:16px;line-height:1.5;color:#0B1020;">' + TICK + '<span>' + p + '</span></div>' for p in ["30, 60 to 80, or 120+ new creatives a month, by plan", "Hook, format and offer tests logged in one library", "Winners rolled into evergreen campaigns within days", "Creator briefs and usage rights handled for you"])
                + '</div><div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;">'
                + "".join('<div class="frame" style="height:250px;"><img src="' + i + '" alt="" class="shot"></div>' for i in ["work-sprnt.jpg", "work-giraffe.jpg", "work-awwbaby.jpg", "work-mbb.jpg", "work-mittiy.jpg", "work-oosh.jpg"])
                + '</div></div></div>')

    weeks = [("Week 1", "Audit", "Account, pixel, catalogue and unit economics review; margin targets agreed."),
             ("Week 2", "Structure &amp; tracking", "Campaign architecture rebuilt, conversions API and events verified."),
             ("Week 3", "Creative sprint", "First batch of new angles live, with a test plan everyone signs off."),
             ("Week 4", "Scale rules", "Budget rules tied to contribution margin; weekly scorecard starts.")]
    first30 = ('<div class="dark" style="padding:120px 80px;"><div class="glow"></div>' + section_head("Your first 30 days", 'Four weeks to a working <span class="serif">engine.</span>', "", size=64, dark=True, maxw="16ch")
               + '<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px;margin-top:56px;">'
               + "".join('<div style="border-radius:20px;padding:30px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.14);display:flex;flex-direction:column;gap:14px;"><span class="label" style="color:#FFC528;">' + w + '</span><h3 class="h3" style="font-size:26px;color:#FFFFFF;">' + t + '</h3><p class="body" style="font-size:15.5px;">' + d + '</p></div>' for w, t, d in weeks)
               + '</div><div style="margin-top:64px;display:grid;grid-template-columns:120px minmax(0,1fr);gap:32px;align-items:center;padding:36px;border-radius:22px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);">'
               '<span class="ph" style="width:120px;height:120px;border-radius:50%;display:block;"></span><div style="display:flex;flex-direction:column;gap:12px;"><p style="font-family:var(--serif);font-style:italic;font-size:34px;line-height:1.2;color:#FFFFFF;margin:0;">&#8220;[A line from the MMC lead who runs Meta Ads, on how they run accounts.]&#8221;</p><span style="font-size:14px;color:rgba(255,255,255,0.7);">[Name], [Head of Performance], MMC</span></div></div></div>')

    tiers = [("Spark", "&#8377;3L", "Up to &#8377;10L monthly ad spend", ["30 new creatives a month", "Weekly scorecard", "Monthly strategy review"], False),
             ("Compound", "&#8377;6L", "&#8377;10L to &#8377;50L monthly ad spend", ["60 to 80 new creatives a month", "Weekly scorecard and test log", "Fortnightly strategy call", "Landing page recommendations"], True),
             ("Scale", "&#8377;12L+", "&#8377;50L+ monthly ad spend", ["120+ new creatives a month", "Dedicated senior pod", "Weekly strategy call"], False)]
    pricing = ('<div style="padding:120px 80px;background:#FBFAF6;">' + section_head("Pricing", 'Priced by <span class="serif">spend band,</span> not by features.', "Flat monthly fee plus GST. You pay Meta directly, keep ownership of your ad account, and can leave with 30 days&#8217; notice.", size=64, maxw="18ch", align="center")
               + '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:56px;">'
               + "".join('<div style="border-radius:22px;padding:38px 36px;display:flex;flex-direction:column;gap:18px;' + ('background:#0F1E5E;color:#FFFFFF;' if hi else 'background:#FFFFFF;border:1px solid rgba(11,16,32,0.10);') + '">'
                         '<span class="h3" style="font-size:26px;color:' + ('#FFFFFF' if hi else '#0B1020') + ';">' + n + '</span><div><span class="num" style="font-size:60px;color:' + ('#FFFFFF' if hi else '#0B1020') + ';">' + p + '</span><span style="font-size:15px;color:' + ('rgba(255,255,255,0.6)' if hi else '#47506A') + ';"> / month + GST</span></div>'
                         '<span style="font-size:14px;font-weight:700;color:' + ('#FFC528' if hi else '#1D4ED8') + ';">' + b + '</span><div style="display:flex;flex-direction:column;gap:12px;padding-top:18px;border-top:1px solid ' + ('rgba(255,255,255,0.14)' if hi else 'rgba(11,16,32,0.10)') + ';">'
                         + "".join('<div style="display:flex;gap:12px;font-size:15.5px;color:' + ('rgba(255,255,255,0.84)' if hi else '#47506A') + ';">' + TICK + '<span>' + f + '</span></div>' for f in feats)
                         + '</div><a href="#" class="btn ' + ('btn-sun' if hi else 'btn-ink') + '" style="margin-top:auto;">Start with ' + n + ' <i class="arr"></i></a></div>' for n, p, b, feats, hi in tiers)
               + '</div></div>')

    rows = [("Who runs the account", "A senior strategist and creative lead", "Whoever you can hire", "Often a junior after onboarding"),
            ("New creative each month", "30 to 120+, tested weekly", "Depends on your team", "A handful of variations"),
            ("What success means", "Contribution margin and CAC payback", "Varies", "Platform ROAS"),
            ("Time to a working setup", "Four weeks", "Months of hiring", "Varies"),
            ("Exit terms", "30-day notice", "Notice periods and severance", "Often long lock-ins")]
    compare = ('<div style="padding:120px 80px;background:#FFFFFF;">' + section_head("How we compare", 'MMC, in-house or another <span class="serif">agency?</span>', "", size=60, maxw="18ch")
               + '<div style="margin-top:48px;border-radius:22px;overflow:hidden;border:1px solid rgba(11,16,32,0.10);">'
               '<div style="display:grid;grid-template-columns:minmax(0,3fr) repeat(3,minmax(0,3fr));background:#FBFAF6;font-size:12px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#7C8598;">'
               '<span style="padding:18px 24px;"></span><span style="padding:18px 24px;background:#0F1E5E;color:#FFC528;">MMC</span><span style="padding:18px 24px;">In-house team</span><span style="padding:18px 24px;">Typical agency</span></div>'
               + "".join('<div style="display:grid;grid-template-columns:minmax(0,3fr) repeat(3,minmax(0,3fr));border-top:1px solid rgba(11,16,32,0.08);font-size:15.5px;">'
                         '<span style="padding:20px 24px;font-weight:800;color:#0B1020;">' + a + '</span><span style="padding:20px 24px;background:rgba(15,30,94,0.05);font-weight:700;color:#0B1020;">' + b + '</span><span style="padding:20px 24px;color:#47506A;">' + c + '</span><span style="padding:20px 24px;color:#47506A;">' + d + '</span></div>' for a, b, c, d in rows)
               + '</div></div>')

    faqs = ["Who owns the ad account, pixel and creative?", "Is there a minimum contract?", "Is creative production included in the fee?",
            "How do you measure contribution margin?", "What if we already have an in-house performance team?", "How soon will we see results?"]
    faq = ('<div style="padding:120px 80px;background:#FBFAF6;"><div style="display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:80px;">'
           + section_head("FAQs", 'Meta Ads, <span class="serif">answered.</span>', "", size=60, maxw="10ch")
           + '<div style="border-top:1px solid rgba(11,16,32,0.12);">' + "".join('<div class="faq">' + q + '<span class="plus">+</span></div>' for q in faqs) + '</div></div></div>')

    related = [("Google &amp; YouTube Ads", "work-giraffe.jpg"), ("Creative &amp; UGC", "svc-creative.jpg"), ("Retention: email &amp; WhatsApp", "svc-retention.jpg")]
    rel = ('<div style="padding:110px 80px;background:#FFFFFF;"><div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px;">'
           + "".join('<a href="#" style="display:flex;flex-direction:column;border-radius:18px;overflow:hidden;background:#FBFAF6;border:1px solid rgba(11,16,32,0.08);color:#0B1020;"><div style="height:190px;overflow:hidden;"><img src="' + i + '" alt="" class="shot"></div><div style="padding:22px 24px;display:flex;justify-content:space-between;align-items:center;"><span class="h3" style="font-size:21px;">' + t + '</span><i class="arr" style="color:#1D4ED8;"></i></div></a>' for t, i in related)
           + '<a href="#" style="display:flex;flex-direction:column;justify-content:space-between;border-radius:18px;padding:28px;background:#FFC528;color:#0B1020;"><span class="label" style="color:rgba(11,16,32,0.6);">Free tool</span><span class="h3" style="font-size:30px;">What ROAS do you need to break even?</span><span class="btn btn-ink" style="align-self:flex-start;padding:13px 20px;">Open calculator <i class="arr"></i></span></a>'
           + '</div></div>')

    body = hero + fit + included + first30 + pricing + compare + faq + rel + cta_band('Let&#8217;s look at your <span class="serif">account.</span>', "Share your store and Meta spend band. We review structure, creative and unit economics, and send you what we would change first.") + footer()
    return page(body, 1440, "#070E2A")


# ─────────────────────────────── MOBILE shared ───────────────────────────────
def m_nav(dark=True):
    return ('<div style="position:absolute;top:14px;left:14px;right:14px;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:8px 8px 8px 14px;border-radius:999px;background:rgba(255,255,255,0.94);box-shadow:0 14px 30px -18px rgba(7,14,42,0.6);">'
            '<span style="display:flex;align-items:center;gap:10px;"><img src="mmc-mark.png" alt="MMC" style="width:28px;height:auto;display:block;"><span style="font-family:var(--display);font-weight:800;font-size:14px;color:#1D4ED8;">Monday Marketing Co.</span></span>'
            '<span class="btn btn-blue" style="padding:11px 16px;font-size:11.5px;">Menu <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 1h14M5 6h10M1 11h14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></span></div>')


def m_sticky(top, primary):
    return ('<div style="position:absolute;left:10px;right:10px;top:' + str(top) + 'px;z-index:20;display:grid;grid-template-columns:52px 52px minmax(0,1fr);gap:8px;padding:8px;border-radius:999px;background:#0B1020;box-shadow:0 20px 40px -14px rgba(0,0,0,0.55);">'
            '<span style="height:48px;border-radius:50%;background:#25D366;color:#FFFFFF;display:flex;align-items:center;justify-content:center;">' + WA_ICON + '</span>'
            '<span style="height:48px;border-radius:50%;background:rgba(255,255,255,0.12);color:#FFFFFF;display:flex;align-items:center;justify-content:center;">' + PHONE_ICON + '</span>'
            '<span class="btn btn-sun" style="height:48px;padding:0 16px;font-size:11.5px;">' + primary + '</span></div>')


def m_footer():
    return ('<div class="dark" style="padding:56px 20px 110px;background:#070E2A;display:flex;flex-direction:column;gap:28px;">'
            '<img src="mmc-logo-white-yellow.png" alt="Monday Marketing Company" style="width:150px;height:auto;display:block;">'
            '<p class="h3" style="color:#FFFFFF;font-size:22px;">Performance marketing that survives the <span class="serif">P&amp;L.</span></p>'
            '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px;">'
            + "".join('<div style="display:flex;flex-direction:column;gap:10px;"><span class="label" style="color:#FFC528;">' + t + '</span>' + "".join('<span style="color:rgba(255,255,255,0.72);font-size:14.5px;">' + r + '</span>' for r in rows) + '</div>'
                      for t, rows in [("D2C brands", ["Meta Ads", "Google Ads", "Creative &amp; UGC", "Shopify &amp; CRO"]), ("Education", ["Admissions", "Websites", "Follow-up", "Cost per admission"]), ("Company", ["About", "Work", "Pricing", "Contact"]), ("Tools", ["Break-even ROAS", "LTV : CAC", "Glossary"])])
            + '</div><span style="font-size:12.5px;color:rgba(255,255,255,0.5);">&#169; 2026 Monday Marketing Company &#183; Bengaluru &#183; Mumbai</span></div>')


def m_head(eyebrow, title, lede="", dark=False):
    return ('<div style="display:flex;flex-direction:column;gap:14px;"><span class="eyebrow">' + eyebrow + '</span><h2 class="h2" style="font-size:38px;color:' + ("#FFFFFF" if dark else "#0B1020") + ';">' + title + '</h2>'
            + ('<p class="lede" style="font-size:16px;">' + lede + '</p>' if lede else '') + '</div>')


def m_figures():
    items = [("&#8377;248", "Cr+", "Revenue compounded"), ("8.7", "&#215;", "Median blended ROAS"), ("14/14", "", "Clients renewed"), ("27", "mo", "Median tenure")]
    return ('<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px 16px;padding-top:22px;border-top:1px solid rgba(255,255,255,0.14);">'
            + "".join('<div style="display:flex;flex-direction:column;gap:4px;"><span class="num" style="font-size:34px;color:#FFFFFF;">' + a + '<span style="font-size:18px;color:#FFC528;">' + b + '</span></span><span class="label" style="font-size:10px;">' + c + '</span></div>' for a, b, c in items) + '</div>')


# ─────────────────────────────── HOMEPAGE (mobile) ───────────────────────────────
def home_mobile():
    hero = ('<div class="dark" style="padding:104px 20px 40px;"><div class="glow"></div><div class="gridbg"></div>' + m_nav()
            + '<div style="display:flex;flex-direction:column;gap:20px;"><span class="tag" style="align-self:flex-start;font-size:10px;padding:8px 12px;"><i class="dot"></i>For D2C brands &amp; institutes</span>'
            '<h1 class="h1" style="font-size:50px;color:#FFFFFF;">Performance marketing that survives the <span class="serif">P&amp;L.</span></h1>'
            '<p class="lede" style="font-size:16px;">One senior team runs media, creative, retention and technology. Brands grow margin. Institutes fill seats.</p>'
            '<div style="display:flex;flex-direction:column;gap:10px;"><a href="#" class="btn btn-sun" style="width:100%;">Book a growth call <i class="arr"></i></a><a href="#" class="btn btn-ghost" style="width:100%;">See the work <i class="arr"></i></a></div></div>'
            '<div style="position:relative;height:300px;margin:34px -20px 0;">'
            '<div class="frame" style="position:absolute;left:-30px;top:10px;width:300px;transform:rotate(-5deg);"><img src="cs-oosh.jpg" alt="OOsh website mockup" class="shot" style="height:auto;"></div>'
            '<div class="frame" style="position:absolute;right:-40px;top:80px;width:290px;transform:rotate(4deg);"><img src="cs-mvj.jpg" alt="MVJ College mockup" class="shot" style="height:auto;"></div></div>'
            '<div style="margin-top:30px;">' + m_figures() + '</div></div>')

    def aud(img, eyebrow, title, pts, cta):
        return ('<a href="#" class="card" style="display:flex;flex-direction:column;overflow:hidden;color:#0B1020;"><div style="height:190px;overflow:hidden;"><img src="' + img + '" alt="" class="shot"></div>'
                '<div style="padding:24px 22px 24px;display:flex;flex-direction:column;gap:14px;"><span class="eyebrow">' + eyebrow + '</span><h3 class="h3" style="font-size:27px;">' + title + '</h3>'
                + "".join('<div style="display:flex;gap:10px;font-size:14.5px;line-height:1.5;color:#47506A;">' + TICK + '<span>' + p + '</span></div>' for p in pts)
                + '<span class="btn btn-ink" style="width:100%;margin-top:6px;">' + cta + ' <i class="arr"></i></span></div></a>')

    router = ('<div style="padding:64px 20px;background:#FBFAF6;display:flex;flex-direction:column;gap:28px;">' + m_head("Two audiences", 'Pick your <span class="serif">path.</span>')
              + aud("cs-mbb.jpg", "For D2C brands", 'Scale without bleeding <span class="serif">margin.</span>', ["Media budgeted on contribution margin", "Creative tested every week", "Shopify and retention that lift repeat orders"], "Explore D2C growth")
              + aud("cs-sprouts.jpg", "For educational institutes", 'Fill seats with the <span class="serif">right</span> students.', ["Admissions campaigns on Google, Meta, YouTube", "Pages built to turn visits into enquiries", "WhatsApp follow-up so no enquiry goes cold"], "Explore admissions growth")
              + '</div>')

    logos = ["lepure", "giraffe", "mittiy", "awwbaby", "sprnt", "vagakids", "mbb", "notic", "oosh", "mvj", "sprouts", "bloom"]
    wall = ('<div style="padding:44px 20px;background:#FFFFFF;display:flex;flex-direction:column;gap:20px;"><span class="eyebrow">Brands and institutes we grow</span>'
            '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;">' + "".join('<div style="height:72px;border-radius:12px;background:#FBFAF6;border:1px solid rgba(11,16,32,0.08);display:flex;align-items:center;justify-content:center;padding:12px;"><img src="logo-' + l + '.png" alt="" style="max-height:34px;max-width:100%;display:block;"></div>' for l in logos) + '</div></div>')

    svcs = [("svc-performance.jpg", "Performance media", "Meta, Google, Amazon, quick commerce"), ("svc-creative.jpg", "Creative &amp; UGC", "Ads and video tested weekly"),
            ("svc-retention.jpg", "Retention &amp; follow-up", "Email, WhatsApp, CRM"), ("svc-conversion.jpg", "Conversion &amp; technology", "Shopify, landing pages, CRO"), ("svc-brand.jpg", "Brand &amp; packaging", "Identity and packaging systems")]
    services = ('<div style="padding:64px 20px;background:#FBFAF6;display:flex;flex-direction:column;gap:22px;">' + m_head("What we run", 'Five systems. <span class="serif">One</span> team.')
                + '<div style="display:flex;flex-direction:column;gap:12px;">'
                + "".join('<a href="#" class="card" style="display:grid;grid-template-columns:96px minmax(0,1fr) 24px;gap:14px;align-items:center;padding:10px 16px 10px 10px;color:#0B1020;"><span style="height:84px;border-radius:12px;overflow:hidden;display:block;"><img src="' + i + '" alt="" class="shot"></span><span style="display:flex;flex-direction:column;gap:4px;"><span class="h3" style="font-size:19px;">' + t + '</span><span style="font-size:13.5px;color:#47506A;">' + d + '</span></span><i class="arr" style="color:#1D4ED8;width:14px;"></i></a>' for i, t, d in svcs)
                + '</div></div>')

    work = ('<div class="dark" style="padding:64px 0 64px 20px;"><div class="glow"></div><div style="padding-right:20px;">' + m_head("Selected work", 'Built, launched, still <span class="serif">running.</span>', dark=True) + '</div>'
            '<div style="display:flex;gap:8px;margin:22px 0;"><span class="chip chip-on">All</span><span class="chip">D2C</span><span class="chip">Education</span></div>'
            '<div style="display:flex;gap:14px;overflow:hidden;">'
            + "".join('<div style="flex:none;width:292px;display:flex;flex-direction:column;gap:12px;"><div class="frame" style="height:210px;"><img src="' + i + '" alt="" class="shot"></div><span class="label" style="color:#FFC528;">' + s + '</span><span class="h3" style="font-size:21px;color:#FFFFFF;">' + n + '</span></div>' for i, s, n in [("cs-giraffe.jpg", "D2C", "The Growing Giraffe"), ("cs-mvj.jpg", "Education", "MVJ College of Engineering")])
            + '</div><div style="display:flex;gap:6px;margin-top:22px;"><span style="width:22px;height:4px;border-radius:4px;background:#FFC528;"></span><span style="width:8px;height:4px;border-radius:4px;background:rgba(255,255,255,0.3);"></span><span style="width:8px;height:4px;border-radius:4px;background:rgba(255,255,255,0.3);"></span><span style="width:8px;height:4px;border-radius:4px;background:rgba(255,255,255,0.3);"></span></div></div>')

    commits = [("One senior team", "The people on your first call run your account."), ("Measured on the P&amp;L", "Margin for brands. Admissions for institutes."),
               ("A working engine in four weeks", "Audit, tracking, structure and creative, live in a month."), ("Freedom to leave", "A 30-day exit clause. Results keep clients.")]
    commit = ('<div class="sunband" style="padding:64px 20px;background:#FFC528;display:flex;flex-direction:column;gap:22px;"><span class="eyebrow">Our commitment</span><h2 class="h2" style="font-size:42px;">What you can hold us to.</h2>'
              '<div style="border-top:1.5px solid #0B1020;">' + "".join('<div style="padding:18px 0;border-bottom:1px solid rgba(11,16,32,0.2);display:flex;flex-direction:column;gap:6px;"><span class="h3" style="font-size:21px;">' + t + '</span><span style="font-size:15px;color:rgba(11,16,32,0.72);">' + d + '</span></div>' for t, d in commits) + '</div></div>')

    tool = ('<div style="padding:64px 20px;background:#FFFFFF;display:flex;flex-direction:column;gap:22px;">' + m_head("Free tools", 'Run the numbers <span class="serif">first.</span>')
            + '<div class="card" style="padding:22px;display:flex;flex-direction:column;gap:14px;"><div style="display:flex;justify-content:space-between;align-items:center;"><span class="h3" style="font-size:19px;">Break-even ROAS</span><span class="sample">Sample</span></div>'
            '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;">' + "".join('<label class="field"><span>' + a + '</span><span class="input" style="height:46px;color:#0B1020;font-weight:700;">' + b + '</span></label>' for a, b in [("Order value", "&#8377;1,450"), ("Product cost", "32%"), ("Shipping", "&#8377;120"), ("RTO rate", "18%")]) + '</div>'
            '<div style="border-radius:14px;background:#0F1E5E;padding:18px 20px;display:flex;justify-content:space-between;align-items:center;"><span class="label" style="color:rgba(255,255,255,0.6);">Break even at</span><span class="num" style="font-size:40px;color:#FFFFFF;">2.02<span style="color:#FFC528;font-size:22px;">&#215;</span></span></div></div>'
            '<a href="#" class="btn btn-ghost" style="color:#0B1020;width:100%;">All 7 calculators <i class="arr"></i></a></div>')

    form = ('<div class="dark" style="padding:64px 20px;"><div class="glow"></div><div style="display:flex;flex-direction:column;gap:22px;">' + m_head("Start here", 'Tell us where growth is <span class="serif">stuck.</span>', dark=True)
            + '<div style="background:#FFFFFF;border-radius:20px;padding:20px;display:flex;flex-direction:column;gap:14px;color:#0B1020;">'
            '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px;padding:4px;border-radius:999px;background:#F1F3F8;"><span style="text-align:center;padding:10px 0;border-radius:999px;background:#0F1E5E;color:#FFFFFF;font-size:12px;font-weight:800;">D2C brand</span><span style="text-align:center;padding:10px 0;font-size:12px;font-weight:800;color:#47506A;">Institute</span></div>'
            '<label class="field"><span>Your name</span><span class="input">Full name</span></label><label class="field"><span>Phone (WhatsApp)</span><span class="input">+91</span></label><label class="field"><span>Brand website</span><span class="input">yourbrand.com</span></label>'
            '<a href="#" class="btn btn-sun" style="width:100%;">Book a growth call</a></div></div></div>')

    body = hero + router + wall + services + work + commit + tool + form + m_footer() + m_sticky(772, "Book a growth call")
    return page('<div style="position:relative;">' + body + '</div>', 390, "#070E2A")


# ─────────────────────────────── EDUCATION (mobile) ───────────────────────────────
def education_mobile():
    segs = ["K-12 schools", "Colleges", "Coaching", "Skilling", "Study abroad"]
    funnel = [("Enquiries", "1,240", 100), ("Calls", "612", 49), ("Visits", "184", 15), ("Applications", "96", 8), ("Admissions", "41", 3.3)]
    hero = ('<div class="dark" style="padding:104px 20px 44px;"><div class="glow"></div><div class="gridbg"></div>' + m_nav()
            + '<div style="display:flex;flex-direction:column;gap:20px;"><span class="tag" style="align-self:flex-start;font-size:10px;padding:8px 12px;"><i class="dot"></i>Admissions marketing</span>'
            '<h1 class="h1" style="font-size:50px;color:#FFFFFF;">Fill every seat with the <span class="serif">right</span> students.</h1>'
            '<p class="lede" style="font-size:16px;">Campaigns, websites and WhatsApp follow-up for schools, colleges, coaching and skilling institutes.</p>'
            '<div style="display:flex;gap:8px;overflow:hidden;margin-right:-20px;">' + "".join('<span class="chip' + (' chip-on' if i == 1 else '') + '">' + s + '</span>' for i, s in enumerate(segs)) + '</div>'
            '<a href="#" class="btn btn-sun" style="width:100%;">' + CAL_ICON + 'Plan my admission season</a></div>'
            '<div style="position:relative;height:250px;margin:30px -20px 0;"><div class="frame" style="position:absolute;left:10px;right:-30px;top:0;transform:rotate(3deg);"><img src="cs-mvj.jpg" alt="MVJ College mockup" class="shot" style="height:auto;"></div></div>'
            '<div style="background:#FFFFFF;border-radius:18px;padding:18px;color:#0B1020;display:flex;flex-direction:column;gap:10px;margin-top:-30px;position:relative;z-index:2;box-shadow:0 30px 60px -24px rgba(0,0,0,0.6);">'
            '<div style="display:flex;justify-content:space-between;align-items:center;"><span class="label" style="font-size:10px;">This admission cycle</span><span class="sample">Sample</span></div>'
            + "".join('<div style="display:grid;grid-template-columns:84px minmax(0,1fr) 44px;gap:10px;align-items:center;font-size:12.5px;"><span style="color:#47506A;font-weight:700;">' + l + '</span><span style="height:8px;border-radius:6px;background:#EEF1F7;display:block;overflow:hidden;"><span style="display:block;height:100%;width:' + str(w) + '%;background:' + ('#FFC528' if l == "Admissions" else '#1D4ED8') + ';"></span></span><span class="num" style="font-size:14px;text-align:right;">' + v + '</span></div>' for l, v, w in funnel)
            + '</div></div>')

    logos = ["mvj", "sprouts", "bloom", "learningmate"]
    trust = ('<div style="padding:32px 20px;background:#FFFFFF;display:flex;flex-direction:column;gap:16px;"><span class="eyebrow">Trusted by</span><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;">'
             + "".join('<div style="height:70px;border-radius:12px;background:#FBFAF6;border:1px solid rgba(11,16,32,0.08);display:flex;align-items:center;justify-content:center;padding:12px;"><img src="logo-' + l + '.png" alt="" style="max-height:34px;max-width:100%;display:block;"></div>' for l in logos) + '</div></div>')

    leaks = [("Ad", "Reaches families outside your catchment or the wrong course."), ("Landing page", "Fees, eligibility or placements missing, so visitors leave."),
             ("First reply", "Enquiries wait hours for a WhatsApp reply."), ("Counsellor call", "One call, no follow-up plan."), ("Campus visit", "Booked, but never confirmed or reminded."), ("Fee paid", "Applications stall at documents and fees.")]
    leak = ('<div style="padding:60px 20px;background:#FBFAF6;display:flex;flex-direction:column;gap:22px;">' + m_head("Where admissions leak", 'Most seats are lost <span class="serif">after</span> the enquiry.')
            + '<div style="display:flex;flex-direction:column;position:relative;"><span style="position:absolute;left:16px;top:20px;bottom:20px;width:1.5px;background:rgba(11,16,32,0.14);"></span>'
            + "".join('<div style="display:grid;grid-template-columns:34px minmax(0,1fr);gap:14px;padding:12px 0;position:relative;"><span class="num" style="width:34px;height:34px;border-radius:50%;background:' + ('#FFC528' if i == 5 else '#0F1E5E') + ';color:' + ('#0B1020' if i == 5 else '#FFC528') + ';display:flex;align-items:center;justify-content:center;font-size:13px;">' + str(i + 1) + '</span><span style="display:flex;flex-direction:column;gap:4px;"><span class="h3" style="font-size:19px;">' + t + '</span><span style="font-size:14.5px;line-height:1.5;color:#47506A;">' + d + '</span></span></div>' for i, (t, d) in enumerate(leaks))
            + '</div></div>')

    seg = ('<div style="padding:60px 20px;background:#FFFFFF;display:flex;flex-direction:column;gap:18px;">' + m_head("By segment", 'A playbook per <span class="serif">institute.</span>')
           + '<div style="display:flex;gap:8px;overflow:hidden;margin-right:-20px;">' + "".join('<span class="chip' + (' chip-on' if i == 1 else '') + '">' + s + '</span>' for i, s in enumerate(segs)) + '</div>'
           '<div style="border-radius:20px;overflow:hidden;background:#0F1E5E;color:#FFFFFF;"><div style="height:180px;"><img src="work-mvj.jpg" alt="" class="shot"></div><div style="padding:22px;display:flex;flex-direction:column;gap:14px;"><span class="label" style="color:#FFC528;">Colleges &amp; universities</span><span class="h3" style="font-size:24px;color:#FFFFFF;">Win the shortlist before results day, then convert it.</span>'
           + "".join('<div style="display:flex;flex-direction:column;gap:2px;"><span style="font-weight:800;font-size:14.5px;">' + a + '</span><span style="font-size:14px;line-height:1.5;color:rgba(255,255,255,0.7);">' + b + '</span></div>' for a, b in [("What we run", "Course-level Search, Meta, YouTube and WhatsApp follow-up."), ("What you see", "Enquiries, visits, applications and admissions by course.")])
           + '<span class="btn btn-sun" style="width:100%;">See the playbook</span></div></div></div>')

    cal_rows = [("Brand &amp; reputation", "All year", "rgba(29,78,216,0.16)", "#16329E"), ("Enquiry push", "Jan to Apr", "#1D4ED8", "#FFFFFF"), ("Exams &amp; results", "Apr to Jun", "#FFC528", "#0B1020"), ("Counselling", "Jun to Aug", "#0F1E5E", "#FFFFFF")]
    cal = ('<div style="padding:60px 20px;background:#FBFAF6;display:flex;flex-direction:column;gap:18px;">' + m_head("Admissions calendar", 'Spend when families <span class="serif">decide.</span>')
           + '<span class="sample" style="align-self:flex-start;">Sample: undergraduate intake</span><div class="card" style="padding:8px 18px;">'
           + "".join('<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:14px 0;' + ('border-top:1px solid rgba(11,16,32,0.08);' if i else '') + '"><span style="font-weight:800;font-size:15px;">' + n + '</span><span style="padding:7px 12px;border-radius:999px;background:' + bg + ';color:' + fg + ';font-size:12px;font-weight:800;white-space:nowrap;">' + r + '</span></div>' for i, (n, r, bg, fg) in enumerate(cal_rows))
           + '</div></div>')

    calc = ('<div style="padding:60px 20px;background:#FFFFFF;display:flex;flex-direction:column;gap:18px;">' + m_head("Free tool", 'What does one <span class="serif">admission</span> cost?')
            + '<div class="card" style="padding:20px;display:flex;flex-direction:column;gap:12px;"><div style="display:flex;justify-content:space-between;"><span class="h3" style="font-size:19px;">Cost per admission</span><span class="sample">Sample</span></div>'
            '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;">' + "".join('<label class="field"><span>' + a + '</span><span class="input" style="height:46px;color:#0B1020;font-weight:700;">' + b + '</span></label>' for a, b in [("Ad budget", "&#8377;18L"), ("Enquiries", "3,000"), ("To visit", "14%"), ("To admission", "30%")]) + '</div>'
            '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;"><div style="border-radius:12px;background:#F1F3F8;padding:14px;"><span class="label" style="font-size:10px;">Admissions</span><div class="num" style="font-size:26px;">126</div></div><div style="border-radius:12px;background:#0F1E5E;padding:14px;"><span class="label" style="font-size:10px;color:rgba(255,255,255,0.6);">Per admission</span><div class="num" style="font-size:26px;color:#FFC528;">&#8377;14,286</div></div></div></div></div>')

    roles = ["Chairman or trustee", "Principal or director", "Admissions head", "Marketing head"]
    form = ('<div class="dark" style="padding:60px 20px;"><div class="glow"></div><div style="display:flex;flex-direction:column;gap:20px;">' + m_head("Plan your season", 'Let&#8217;s fill next year&#8217;s <span class="serif">seats.</span>', dark=True)
            + '<div style="background:#FFFFFF;border-radius:20px;padding:20px;display:flex;flex-direction:column;gap:12px;color:#0B1020;"><span style="font-size:12px;font-weight:700;color:#47506A;">I am the</span>'
            '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;">' + "".join('<span style="padding:11px 12px;border-radius:12px;font-size:13px;font-weight:700;' + ('background:#0F1E5E;color:#FFFFFF;' if i == 2 else 'border:1px solid rgba(11,16,32,0.14);color:#47506A;') + '">' + r + '</span>' for i, r in enumerate(roles)) + '</div>'
            '<label class="field"><span>Institute and city</span><span class="input">Institute, city</span></label><label class="field"><span>Phone (WhatsApp)</span><span class="input">+91</span></label>'
            '<a href="#" class="btn btn-sun" style="width:100%;">Plan my admission season</a></div></div></div>')

    body = hero + trust + leak + seg + cal + calc + form + m_footer() + m_sticky(772, "Plan my season")
    return page('<div style="position:relative;">' + body + '</div>', 390, "#070E2A")


FILES = {
    "Main.dc.html": (homepage, 1440, 11200, "Homepage · Desktop"),
    "D2CHub.dc.html": (d2c_hub, 1440, 8800, "D2C hub · Desktop"),
    "Education.dc.html": (education, 1440, 10400, "Education landing page · Desktop"),
    "ServiceMetaAds.dc.html": (service_meta, 1440, 9200, "Service page: Meta Ads · Desktop"),
    "HomeMobile.dc.html": (home_mobile, 390, 7600, "Homepage · Mobile"),
    "EducationMobile.dc.html": (education_mobile, 390, 6200, "Education landing page · Mobile"),
}

if __name__ == "__main__":
    x = 0
    artboards = []
    for name, (fn, w, h, title) in FILES.items():
        open(name, "w", encoding="utf-8").write(fn())
        artboards.append({"file": name, "x": x, "y": 0, "w": w, "h": h, "title": title})
        x += w + 160
    canvas = {"artboards": artboards,
              "annotations": [{"id": "round-1-notes", "x": 0, "y": -300, "w": 760,
                               "text": "Round 1: evolves today's MMC look (royal blue, sun yellow, Raleway, Cormorant italic) for the two audiences, D2C brands and educational institutes.\nReal client work and logos throughout. Bracketed text marks quotes, names and video still to come; figures labelled Sample are illustrative calculator and dashboard values.\nMobile shown for Homepage and Education; D2C hub and service page follow the same patterns."}],
              "launch": {"view": "canvas"}}
    json.dump(canvas, open("canvas.json", "w"), indent=2, ensure_ascii=False)
    print("wrote", ", ".join(FILES), "and canvas.json")
