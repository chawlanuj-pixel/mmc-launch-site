"""Round 2 shared layer: MMC tokens, and the three components that must not change
(Nav pill, service page hero, footer), rebuilt from Nav.jsx, SdHero.jsx +
assets/page-hero.css and Footer.jsx with values resolved at 1440px and 390px."""

FONTS = ('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Raleway:wght@500;600;700;800'
         '&amp;family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,400'
         '&amp;family=Cormorant+Garamond:ital,wght@1,500;1,600&amp;display=swap">')

CSS = """
*{box-sizing:border-box;}
body{margin:0;background:#070E2A;font-family:"Nunito","Helvetica Neue",Arial,sans-serif;font-size:17px;line-height:1.55;color:#2E3849;-webkit-font-smoothing:antialiased;}
a{color:#1D4ED8;text-decoration:none;} a:hover{color:#16329E;}
img{max-width:100%;display:block;}
.D{font-family:"Raleway","Helvetica Neue",Arial,sans-serif;}
.S{font-family:"Cormorant Garamond",Georgia,"Times New Roman",serif;font-style:italic;font-weight:500;letter-spacing:-0.005em;}
.eyebrow{font-size:11.5px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#1D4ED8;display:inline-flex;align-items:center;gap:14px;}
.eyebrow::before{content:"";width:28px;height:1.5px;background:#FFC528;flex:none;}
.on-dark .eyebrow{color:rgba(255,255,255,0.72);}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:14px;font-weight:700;font-size:13.5px;letter-spacing:0.06em;text-transform:uppercase;padding:16px 26px;border-radius:999px;border:1px solid transparent;white-space:nowrap;}
.btn-y{background:#FFC528;color:#16329E;} .btn-y:hover{color:#16329E;background:#FFD75C;}
.btn-b{background:#1D4ED8;color:#FFFFFF;} .btn-b:hover{color:#FFFFFF;background:#16329E;}
.btn-i{background:#0F1E5E;color:#FFFFFF;} .btn-i:hover{color:#FFFFFF;background:#1D4ED8;}
.btn-o{border-color:rgba(29,78,216,0.24);color:#1D4ED8;} .on-dark .btn-o{border-color:rgba(255,255,255,0.4);color:#FFFFFF;}
.lnk{display:inline-flex;align-items:center;gap:14px;padding:8px 0;font-weight:700;font-size:13.5px;letter-spacing:0.06em;text-transform:uppercase;color:#1D4ED8;border-bottom:1px solid rgba(29,78,216,0.3);}
.on-dark .lnk{color:rgba(255,255,255,0.86);border-bottom-color:rgba(255,255,255,0.34);}
.arrow{position:relative;display:inline-block;width:18px;height:1.5px;background:currentColor;flex:none;}
.arrow::after{content:"";position:absolute;right:-1px;top:-4px;width:8px;height:8px;border-top:1.5px solid currentColor;border-right:1.5px solid currentColor;transform:rotate(45deg);}
.cap{font-size:11px;font-weight:700;letter-spacing:0.13em;text-transform:uppercase;color:#4F5A6B;}
.on-dark .cap{color:rgba(255,255,255,0.58);}
.ink{background:linear-gradient(to bottom,#16329E 0%,#0F1E5E 48%,#0A1440 78%,#070E2A 100%);color:#FFFFFF;position:relative;isolation:isolate;overflow:hidden;}
.hair{border-top:1px solid rgba(20,47,91,0.14);}
.on-dark .hair{border-top-color:rgba(255,255,255,0.14);}
.sample{display:inline-flex;align-items:center;font-size:10px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:#4F5A6B;border:1px dashed rgba(20,47,91,0.3);border-radius:999px;padding:3px 9px;}
.on-dark .sample{color:rgba(255,255,255,0.62);border-color:rgba(255,255,255,0.32);}
.ph{background:repeating-linear-gradient(135deg,rgba(20,47,91,0.05) 0 12px,rgba(20,47,91,0.09) 12px 24px);color:#4F5A6B;display:flex;align-items:center;justify-content:center;text-align:center;font-size:11px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;}
.cover{width:100%;height:100%;object-fit:cover;}
"""


def page(body, width):
    return ('<!doctype html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <script src="./support.js"></script>\n</head>\n<body>\n<x-dc>\n<helmet>\n  '
            + FONTS + '\n  <style>' + CSS + '</style>\n</helmet>\n<div style="position:relative;width:' + str(width)
            + 'px;background:#FBFAF6;overflow:hidden;">\n' + body + '\n</div>\n</x-dc>\n</body>\n</html>\n')


ARROW = '<span class="arrow"></span>'

# ── Nav.jsx, desktop (1440: gutter 40px, inner padding-left 40px) ─────────────
NAV = (
    '<div style="position:absolute;top:20px;left:40px;right:40px;z-index:80;display:flex;align-items:center;gap:20px;'
    'padding:8px 8px 8px 40px;border-radius:999px;background:rgba(255,255,255,0.82);border:1px solid rgba(0,0,0,0.08);'
    'box-shadow:0 18px 48px -20px rgba(17,24,39,0.14);">'
    '<a href="#" style="display:inline-flex;align-items:center;gap:12px;color:#1D4ED8;flex:none;">'
    '<img src="mmc-mark.png" alt="MMC" style="width:38px;height:38px;object-fit:contain;">'
    '<span style="display:flex;flex-direction:column;line-height:1.15;">'
    '<span class="D" style="font-weight:700;font-size:14px;letter-spacing:-0.01em;color:#1D4ED8;">Monday Marketing Company</span>'
    '<span style="font-weight:600;font-size:9.5px;color:#4F5A6B;letter-spacing:0.1em;text-transform:uppercase;margin-top:3px;">Design &#215; Marketing &#215; Technology &#215; Content &#215; AI</span></span></a>'
    '<div style="margin-left:auto;font-size:11.5px;font-weight:600;letter-spacing:0.08em;color:#4F5A6B;display:inline-flex;align-items:center;gap:10px;text-transform:uppercase;">'
    '<span style="width:7px;height:7px;border-radius:50%;background:#2BB573;box-shadow:0 0 0 4px rgba(43,181,115,0.18);"></span>'
    '<span>Onboarding &#183; Clients &#183; Hires &#183; 14:36 IST</span></div>'
    '<div style="display:inline-flex;align-items:center;gap:8px;margin-left:auto;flex:none;">'
    '<span style="display:inline-flex;align-items:center;gap:10px;padding:10px 16px 10px 18px;border-radius:999px;color:#1D4ED8;border:1px solid rgba(29,78,216,0.18);font-weight:700;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;line-height:1.55;">Book a call'
    '<span style="position:relative;display:inline-block;width:14px;height:1.5px;background:currentColor;"><span style="position:absolute;right:-1px;top:-3px;width:7px;height:7px;border-top:1.5px solid currentColor;border-right:1.5px solid currentColor;transform:rotate(45deg);"></span></span></span>'
    '<span style="display:inline-flex;align-items:center;gap:12px;padding:10px 16px 10px 18px;border-radius:999px;background:#1D4ED8;color:#FFFFFF;font-weight:700;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;line-height:1.55;">'
    '<span style="display:inline-block;height:14px;line-height:14px;">Menu</span>'
    '<span style="width:16px;height:14px;display:inline-flex;flex-direction:column;justify-content:space-between;">'
    '<span style="display:block;height:1.5px;width:16px;background:currentColor;border-radius:1px;"></span>'
    '<span style="display:block;height:1.5px;width:11px;align-self:flex-end;background:currentColor;border-radius:1px;"></span>'
    '<span style="display:block;height:1.5px;width:16px;background:currentColor;border-radius:1px;"></span></span></span></div></div>')

# ── Nav.jsx, mobile (390: gutter 16px; meta, tag and Book a call hidden) ─────
NAV_M = (
    '<div style="position:absolute;top:20px;left:16px;right:16px;z-index:80;display:flex;align-items:center;gap:10px;'
    'padding:8px 6px 8px 14px;border-radius:999px;background:rgba(255,255,255,0.82);border:1px solid rgba(0,0,0,0.08);box-shadow:0 18px 48px -20px rgba(17,24,39,0.14);">'
    '<a href="#" style="display:inline-flex;align-items:center;gap:12px;min-width:0;">'
    '<img src="mmc-mark.png" alt="MMC" style="width:32px;height:32px;object-fit:contain;">'
    '<span class="D" style="font-weight:700;font-size:13px;letter-spacing:-0.01em;color:#1D4ED8;white-space:nowrap;">Monday Marketing Company</span></a>'
    '<span style="margin-left:auto;display:inline-flex;align-items:center;gap:12px;padding:10px 16px 10px 18px;border-radius:999px;background:#1D4ED8;color:#FFFFFF;font-weight:700;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;line-height:1.55;">'
    '<span style="display:inline-block;height:14px;line-height:14px;">Menu</span>'
    '<span style="width:16px;height:14px;display:inline-flex;flex-direction:column;justify-content:space-between;">'
    '<span style="display:block;height:1.5px;width:16px;background:currentColor;"></span><span style="display:block;height:1.5px;width:11px;align-self:flex-end;background:currentColor;"></span><span style="display:block;height:1.5px;width:16px;background:currentColor;"></span></span></span></div>')


# ── Footer.jsx ───────────────────────────────────────────────────────────────
FT_COLS = [("Company", ["About MMC", "Our Work", "Insights", "Careers", "Contact"]),
           ("What we do", ["Case studies", "Free tools"]),
           ("Calculators", ["Unit Economics", "Growth Trajectory", "CAC Runway", "Funnel ROAS", "Break-even ROAS", "LTV : CAC"]),
           ("Reference", ["D2C Marketing Glossary", "Privacy Policy", "Terms &amp; Conditions"])]


def footer(mobile=False):
    pad = 32 if mobile else 80
    grid_bg = ('<div style="position:absolute;inset:0;z-index:-1;opacity:0.16;pointer-events:none;'
               'background-image:linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px);'
               'background-size:26px 26px;-webkit-mask-image:radial-gradient(70% 60% at 50% 12%,#000,transparent);mask-image:radial-gradient(70% 60% at 50% 12%,#000,transparent);"></div>')
    brand = ('<a href="#" style="display:flex;flex-direction:' + ('column;align-items:flex-start;gap:14px;' if mobile else 'row;align-items:center;gap:20px;') + 'color:#FFFFFF;">'
             '<img src="mmc-logo-white-yellow.png" alt="MMC, Monday Marketing Company" style="width:158px;height:127px;object-fit:contain;">'
             '<span style="font-size:12px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.78);max-width:' + ('100%' if mobile else '40ch') + ';line-height:1.5;">Design &#215; Marketing &#215; Technology &#215; Content &#215; AI</span></a>')
    cta = ('<div style="display:flex;flex-direction:column;align-items:' + ('flex-start' if mobile else 'flex-end') + ';gap:12px;">'
           '<span style="display:inline-flex;align-items:center;gap:14px;padding:14px 24px;background:#FFC528;color:#16329E;border-radius:999px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">Book a call' + ARROW + '</span>'
           '<span style="font-size:12px;font-weight:600;letter-spacing:0.02em;color:rgba(255,255,255,0.6);border-bottom:1px solid rgba(255,255,255,0.26);padding-bottom:2px;">Not ready for a call? Send a brief instead</span></div>')
    cols = ''.join('<div style="display:flex;flex-direction:column;gap:14px;"><div class="D" style="font-weight:700;font-size:14px;letter-spacing:-0.005em;color:#FFC528;padding-bottom:8px;border-bottom:1px solid rgba(255,197,40,0.22);">' + t + '</div>'
                   '<div style="display:flex;flex-direction:column;gap:8px;">' + ''.join('<span style="font-size:13px;line-height:26px;color:rgba(255,255,255,0.78);letter-spacing:0.005em;">' + i + '</span>' for i in items) + '</div></div>' for t, items in FT_COLS)
    base_a = 'font-size:13.5px;font-weight:600;color:rgba(255,255,255,0.78);'
    base = ('<div style="display:flex;justify-content:space-between;align-items:' + ('flex-start;flex-direction:column;' if mobile else 'center;') + 'flex-wrap:wrap;gap:14px 28px;padding:28px 0;border-top:1px solid rgba(255,255,255,0.12);">'
            '<div style="display:flex;align-items:center;flex-wrap:wrap;gap:10px 22px;"><span style="' + base_a + '">+91 766 630 9102</span><span style="width:3px;height:3px;border-radius:50%;background:rgba(255,255,255,0.34);"></span><span style="' + base_a + '">Thane &#183; Mumbai &#183; Maharashtra</span></div>'
            '<div style="display:flex;align-items:center;flex-wrap:wrap;gap:10px 22px;"><span style="' + base_a + '">Instagram</span><span style="' + base_a + '">LinkedIn</span><span style="' + base_a + '">Cookies</span></div></div>')
    legal = ('<div style="border-top:1px solid rgba(255,255,255,0.12);display:flex;justify-content:space-between;align-items:' + ('flex-start;flex-direction:column;' if mobile else 'center;') + 'gap:14px;padding-top:22px;font-size:11.5px;color:rgba(255,255,255,0.55);">'
             '<span>&#169; 2026 Monday Marketing Company</span><span class="S" style="color:rgba(255,255,255,0.55);font-size:13px;">Quietly outperforming, since 2019.</span></div>')
    return ('<footer class="ink" style="padding:' + ('34px' if mobile else '46px') + ' 0 18px;color:rgba(255,255,255,0.9);">' + grid_bg
            + '<div style="padding:0 ' + str(pad) + 'px;">'
            '<div style="display:flex;justify-content:space-between;align-items:' + ('flex-start;flex-direction:column;' if mobile else 'center;') + 'gap:28px;flex-wrap:wrap;padding-bottom:30px;border-bottom:1px solid rgba(255,255,255,0.12);">' + brand + cta + '</div>'
            '<div style="display:grid;grid-template-columns:' + ('minmax(0,1fr)' if mobile else 'repeat(4,minmax(0,1fr))') + ';gap:' + ('20px' if mobile else '37px') + ';padding:' + ('30px' if mobile else '44px') + ' 0;">' + cols + '</div>'
            + base + legal + '</div></footer>')


# ── service-detail/SdHero.jsx on assets/page-hero.css (desktop 1440) ────────
def sd_hero():
    crumb_a = 'color:rgba(255,255,255,0.66);'
    sep = '<span style="margin:0 10px;color:rgba(255,255,255,0.34);">&#183;</span>'
    quick = [("8.7", "&#215;", "Median ROAS"), ("240", "+", "Creatives shipped / mo"), ("14", "days", "Onboarding"), ("&#8377;3L", "+", "Monthly retainer")]
    card_rows = [("Best for", "D2C brands &#183; &#8377;3Cr &#8211; &#8377;150Cr"), ("Tracked KPIs", "ROAS &#183; CAC &#183; MER &#183; iROAS"),
                 ("Time to live", "14 days from kickoff"), ("Reporting", "Daily &#183; Slack + weekly call"), ("Engagement", "12-month retainer")]
    return (
        '<section style="position:relative;z-index:1;isolation:isolate;margin:108px 40px 50px;padding:63px 40px 58px;border-radius:29px;min-height:414px;overflow:hidden;color:#FFFFFF;'
        'background:linear-gradient(to bottom,#2B5CE0 0%,#1D4ED8 26%,#16329E 62%,#0F1E5E 100%);">'
        '<div style="position:absolute;inset:0;pointer-events:none;z-index:-1;background-image:radial-gradient(rgba(255,255,255,0.16) 1px,transparent 1px);background-size:26px 26px;'
        '-webkit-mask-image:radial-gradient(ellipse 62% 68% at 88% 6%,#000 0%,transparent 72%);mask-image:radial-gradient(ellipse 62% 68% at 88% 6%,#000 0%,transparent 72%);"></div>'
        '<span class="D" style="position:absolute;left:58px;bottom:-42px;z-index:-1;font-weight:800;font-size:302px;line-height:0.74;letter-spacing:-0.045em;white-space:nowrap;color:rgba(255,255,255,0.05);">Services</span>'
        '<div style="position:relative;z-index:2;padding-top:28px;">'
        '<div style="font-size:11.5px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-bottom:36px;">'
        '<span style="' + crumb_a + '">Home</span>' + sep + '<span style="' + crumb_a + '">Services</span>' + sep + '<span style="' + crumb_a + '">Revenue Accelerators</span>' + sep + '<span style="color:rgba(255,255,255,0.86);">Meta Ads</span></div>'
        '<div style="display:grid;grid-template-columns:1.6fr 1fr;gap:72px;align-items:start;">'
        '<div>'
        '<div class="eyebrow" style="color:rgba(255,255,255,0.72);"><span>&#9679; Meta Ads &#183; I/V services in Revenue Accelerators</span></div>'
        '<h1 class="D" style="font-weight:700;font-size:60px;line-height:0.96;letter-spacing:-0.035em;color:#FFFFFF;margin:20px 0 24px;">Meta Ads<br>that <span class="S" style="color:#FFC528;">compound</span>,<br>not just convert.</h1>'
        '<p style="font-size:19.4px;line-height:1.5;color:rgba(255,255,255,0.76);max-width:62ch;margin:0;">We run Meta as a system: full-funnel structure, daily creative iteration, cohort-driven optimization. ROAS is the by-product, not the goal.</p>'
        '<div style="display:inline-flex;align-items:center;gap:22px;flex-wrap:wrap;margin-top:2px;margin-bottom:56px;">'
        '<span class="btn btn-y" style="padding:16px 26px;">Audit my Meta account' + ARROW + '</span>'
        '<span class="lnk" style="color:rgba(255,255,255,0.86);border-bottom-color:rgba(255,255,255,0.34);letter-spacing:0.04em;">See the work' + ARROW + '</span></div>'
        '<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:35px;margin-top:62px;padding-top:34px;border-top:1px solid rgba(255,255,255,0.16);">'
        + ''.join('<div style="display:flex;flex-direction:column;gap:4px;"><span class="D" style="display:block;font-weight:800;font-size:38px;line-height:1.05;letter-spacing:-0.03em;color:#FFC528;">' + n + '<i style="font-style:normal;font-size:0.62em;margin-left:2px;">' + s + '</i></span>'
                  '<span style="display:block;margin-top:7px;font-size:11px;font-weight:700;letter-spacing:0.13em;text-transform:uppercase;line-height:1.35;color:rgba(255,255,255,0.58);">' + l + '</span></div>' for n, s, l in quick)
        + '</div></div>'
        '<aside style="background:rgba(255,255,255,0.94);border:1px solid rgba(255,255,255,0.2);border-radius:16px;padding:24px;box-shadow:0 18px 44px -18px rgba(6,14,44,0.55);color:#0E1626;margin-top:11px;">'
        '<div style="display:flex;align-items:center;gap:14px;padding-bottom:18px;border-bottom:1px solid rgba(29,78,216,0.10);margin-bottom:18px;">'
        '<span style="width:44px;height:44px;border-radius:12px;background:#0866FF;display:flex;align-items:center;justify-content:center;flex:none;"><span class="D" style="font-weight:800;font-size:22px;color:#FFFFFF;">M</span></span>'
        '<div><div class="D" style="font-weight:700;font-size:19px;letter-spacing:-0.01em;color:#0E1626;">Meta Ads</div><div style="font-size:11px;font-weight:600;letter-spacing:0.08em;color:#4F5A6B;margin-top:3px;">Instagram &#183; Facebook &#183; Audience Network</div></div></div>'
        '<div style="display:flex;flex-direction:column;gap:12px;margin-bottom:18px;">'
        + ''.join('<div style="display:flex;justify-content:space-between;align-items:baseline;gap:14px;"><span style="font-size:10.5px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4F5A6B;">' + a + '</span><span class="D" style="font-weight:600;font-size:13.5px;color:#0E1626;text-align:right;">' + b + '</span></div>' for a, b in card_rows)
        + '</div><div style="display:flex;align-items:center;justify-content:center;gap:12px;padding:12px 18px;background:#1D4ED8;color:#FFFFFF;border-radius:10px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">See packages' + ARROW + '</div>'
        '</aside></div></div></section>')


# ── Secondary page hero (assets/page-hero.css), reused for hub pages ─────────
def page_hero(wm, crumbs, eyebrow, h1_html, sub, actions_html, right_html, stats=None):
    crumb_a = 'color:rgba(255,255,255,0.66);'
    sep = '<span style="margin:0 10px;color:rgba(255,255,255,0.34);">&#183;</span>'
    crumb = sep.join('<span style="' + (crumb_a if i < len(crumbs) - 1 else 'color:rgba(255,255,255,0.86);') + '">' + c + '</span>' for i, c in enumerate(crumbs))
    stat_row = ''
    if stats:
        stat_row = ('<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:35px;margin-top:56px;padding-top:34px;border-top:1px solid rgba(255,255,255,0.16);">'
                    + ''.join('<div><span class="D" style="display:block;font-weight:800;font-size:38px;line-height:1.05;letter-spacing:-0.03em;color:#FFC528;">' + n + '<i style="font-style:normal;font-size:0.62em;margin-left:2px;">' + s + '</i></span>'
                              '<span style="display:block;margin-top:7px;font-size:11px;font-weight:700;letter-spacing:0.13em;text-transform:uppercase;line-height:1.35;color:rgba(255,255,255,0.58);">' + l + '</span></div>' for n, s, l in stats)
                    + '</div>')
    return (
        '<section class="on-dark" style="position:relative;z-index:1;isolation:isolate;margin:108px 40px 50px;padding:63px 40px 58px;border-radius:29px;min-height:414px;overflow:hidden;color:#FFFFFF;'
        'background:linear-gradient(to bottom,#2B5CE0 0%,#1D4ED8 26%,#16329E 62%,#0F1E5E 100%);">'
        '<div style="position:absolute;inset:0;pointer-events:none;z-index:-1;background-image:radial-gradient(rgba(255,255,255,0.16) 1px,transparent 1px);background-size:26px 26px;'
        '-webkit-mask-image:radial-gradient(ellipse 62% 68% at 88% 6%,#000 0%,transparent 72%);mask-image:radial-gradient(ellipse 62% 68% at 88% 6%,#000 0%,transparent 72%);"></div>'
        '<span class="D" style="position:absolute;left:58px;bottom:-42px;z-index:-1;font-weight:800;font-size:302px;line-height:0.74;letter-spacing:-0.045em;white-space:nowrap;color:rgba(255,255,255,0.05);">' + wm + '</span>'
        '<div style="position:relative;z-index:2;padding-top:28px;">'
        '<div style="font-size:11.5px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-bottom:36px;">' + crumb + '</div>'
        '<div style="display:grid;grid-template-columns:1.6fr 1fr;gap:72px;align-items:start;">'
        '<div><div class="eyebrow" style="color:rgba(255,255,255,0.72);"><span>' + eyebrow + '</span></div>'
        '<h1 class="D" style="font-weight:700;font-size:60px;line-height:0.96;letter-spacing:-0.035em;color:#FFFFFF;margin:20px 0 24px;">' + h1_html + '</h1>'
        '<p style="font-size:19.4px;line-height:1.5;color:rgba(255,255,255,0.76);max-width:58ch;margin:0;">' + sub + '</p>'
        '<div style="display:flex;align-items:center;gap:22px;flex-wrap:wrap;margin-top:32px;">' + actions_html + '</div>'
        + stat_row + '</div>'
        '<div style="margin-top:11px;">' + right_html + '</div></div></div></section>')
