"""Round 4 shared layer.

Round 3's 3 Minds presentation in MMC colours, Cormorant accent and DM Sans, tightened with the
habits measured on airbnb.co.in (scratchpad/analysis/airbnb-uiux.md): closed token lists (five
radii, three shadows, eight type sizes, three weights), one filled button per screen, photo-led
cards with no chrome, and actions that follow the reader. Nav, service hero and footer are the
live site's, imported unchanged through round 3 and round 2.
"""
import importlib.util, os
_r3_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "r3", "base.py")
_spec = importlib.util.spec_from_file_location("r3base", _r3_path)
r3 = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(r3)

NAV, NAV_M, footer, sd_hero, ARR_SVG = r3.NAV, r3.NAV_M, r3.footer, r3.sd_hero, r3.ARR_SVG
INK, BLUE, SUN, PAPER = "#0F1E5E", "#1D4ED8", "#FFC528", "#FBFAF6"
ON_DARK_2 = "rgba(255,255,255,0.72)"

CSS = r3.CSS + """
:root{
 --r-btn:4px;--r-ctl:12px;--r-media:20px;--r-sheet:32px;--r-pill:999px;
 --sh-lift:0 0 0 1px rgba(15,30,94,.04),0 2px 6px rgba(15,30,94,.06),0 4px 8px rgba(15,30,94,.10);
 --sh-float:0 0 0 1px rgba(15,30,94,.04),0 8px 24px rgba(15,30,94,.12);
 --sh-overlay:0 8px 28px rgba(7,14,42,.28);
 --scrim:rgba(15,30,94,.40);
 --text:#0E1626;--muted:#4F5A6B;--line:rgba(15,30,94,.12);--tint:rgba(15,30,94,.05);--placeholder:rgba(15,30,94,.08);
}
.f4{font-family:"DM Sans","Helvetica Neue",Arial,sans-serif;color:var(--text);}
.f4 *{box-sizing:border-box;}
.t-display{font-weight:600;font-size:100px;line-height:.92;letter-spacing:-0.08em;margin:0;}
.t-stat{font-weight:600;font-size:90px;line-height:1;letter-spacing:-0.045em;}
.t-h1{font-weight:600;font-size:60px;line-height:1.02;letter-spacing:-0.04em;margin:0;}
.t-h2{font-weight:600;font-size:32px;line-height:1.12;letter-spacing:-0.02em;margin:0;}
.t-h3{font-weight:600;font-size:20px;line-height:1.3;letter-spacing:-0.01em;margin:0;}
.t-lead{font-weight:400;font-size:20px;line-height:1.35;margin:0;}
.t-body{font-weight:400;font-size:16px;line-height:1.5;margin:0;}
.t-small{font-weight:500;font-size:14px;line-height:1.45;}
.t-micro{font-weight:600;font-size:12px;line-height:1.35;}
.t-up{text-transform:uppercase;letter-spacing:.06em;}
.muted{color:var(--muted);}
.mob .t-display{font-size:56px;line-height:.95;}
.mob .t-stat{font-size:50px;}
.mob .t-h1{font-size:44px;line-height:1.04;}
.mob .t-h2{font-size:28px;line-height:1.14;}
.mob .t-h3{font-size:18px;}
.mob .t-lead{font-size:16px;line-height:1.5;}
.acc{font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-weight:600;letter-spacing:-0.02em;}
.btn4{display:inline-flex;align-items:center;justify-content:space-between;gap:14px;height:52px;padding:2px 2px 2px 18px;border-radius:var(--r-btn);font-family:"DM Sans",sans-serif;font-size:14px;font-weight:600;letter-spacing:.02em;text-transform:uppercase;white-space:nowrap;}
.btn4 .sq{width:48px;height:48px;border-radius:var(--r-btn);display:flex;align-items:center;justify-content:center;background:#FFC528;color:#0F1E5E;flex:none;}
.btn4.ink{background:#0F1E5E;color:#FFFFFF;}
.btn4.white{background:#FFFFFF;color:#0F1E5E;}
.link4{display:inline-flex;align-items:center;gap:8px;font-size:16px;font-weight:500;text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:1px;white-space:nowrap;}
.grey4{display:inline-flex;align-items:center;justify-content:center;height:48px;padding:0 24px;border-radius:var(--r-ctl);background:var(--tint);font-size:16px;font-weight:500;color:var(--text);white-space:nowrap;}
.tag4{display:inline-flex;align-items:center;height:26px;padding:0 10px;border-radius:var(--r-pill);background:rgba(255,255,255,.85);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.5);box-shadow:var(--sh-lift);font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--text);white-space:nowrap;}
.chip4{display:inline-flex;align-items:center;height:32px;padding:0 12px;border-radius:var(--r-pill);font-size:14px;font-weight:500;background:#FFFFFF;color:var(--text);white-space:nowrap;}
.panel4{background:linear-gradient(180deg,#16329E 0%,#0F1E5E 100%);color:#FFFFFF;border-radius:var(--r-media);position:relative;overflow:hidden;}
.card4{background:#FFFFFF;border-radius:var(--r-media);}
.ph{background:var(--placeholder);}
.rd{display:flex;align-items:center;justify-content:center;border-radius:var(--r-pill);flex:none;}
"""

FONTS = r3.FONTS
ICON_PATHS = {
    "chart": '<path d="M4 19h16"/><path d="M6 15l4-4 3 3 5-6"/><path d="M15 8h3v3"/>',
    "play": '<rect x="3.5" y="5" width="17" height="14" rx="3"/><path d="M10.5 9.5v5l4-2.5z"/>',
    "repeat": '<path d="M17 3l3 3-3 3"/><path d="M4 11V9a3 3 0 0 1 3-3h13"/><path d="M7 21l-3-3 3-3"/><path d="M20 13v2a3 3 0 0 1-3 3H4"/>',
    "cart": '<path d="M3.5 5h2.2l2 10h10.3l2-7H6.6"/><circle cx="10" cy="19.2" r="1.2"/><circle cx="17" cy="19.2" r="1.2"/>',
    "cap": '<path d="M2.5 9.5L12 5l9.5 4.5L12 14z"/><path d="M6.5 11.5v4c0 1.6 2.5 3 5.5 3s5.5-1.4 5.5-3v-4"/>',
    "bag": '<path d="M5.5 8h13l-1 12h-11z"/><path d="M9 8a3 3 0 0 1 6 0"/>',
    "chev": '<path d="M9 6l6 6-6 6"/>',
    "down": '<path d="M6 9l6 6 6-6"/>',
    "close": '<path d="M6 6l12 12M18 6L6 18"/>',
    "check": '<path d="M5 12.5l4.2 4L19 7"/>',
    "wa": '<path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2z"/><path d="M9.2 8.7c.3-.6.6-.6.9-.6h.5c.2 0 .4.1.5.4l.8 1.8c.1.3 0 .5-.1.7l-.5.6c-.1.2-.1.4 0 .6.6 1 1.4 1.8 2.4 2.4.2.1.4.1.6 0l.6-.5c.2-.2.5-.2.7-.1l1.8.8c.3.1.4.3.4.5v.5c0 .3 0 .6-.6.9-.6.3-1.6.6-3.2-.1-1.5-.7-3-2.1-3.9-3.5-.9-1.5-.8-2.6-.3-3.3z"/>',
}


def icon(name, size=24, stroke=1.7):
    return ('<svg width="' + str(size) + '" height="' + str(size) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + str(stroke)
            + '" stroke-linecap="round" stroke-linejoin="round" style="display:block;flex:none;">' + ICON_PATHS[name] + '</svg>')


def page(body, width, mobile=False):
    return ('<!doctype html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <script src="./support.js"></script>\n</head>\n<body>\n<x-dc>\n<helmet>\n  '
            + FONTS + '\n  <style>' + CSS + '</style>\n</helmet>\n<div class="f4' + (' mob' if mobile else '') + '" style="position:relative;display:flow-root;width:' + str(width)
            + 'px;background:#FBFAF6;overflow:hidden;">\n' + body + '\n</div>\n</x-dc>\n</body>\n</html>\n')


def acc(t, color=BLUE):
    return '<span class="acc" style="color:' + color + ';">' + t + '</span>'


def dot(color=SUN):
    return acc('.', color)


def btn(label, kind="ink", full=False):
    return '<span class="btn4 ' + kind + '"' + (' style="width:100%;"' if full else '') + '>' + label + '<span class="sq">' + ARR_SVG + '</span></span>'


def link(label, dark=False):
    return '<span class="link4" style="color:' + ('#FFFFFF' if dark else 'var(--text)') + ';">' + label + ARR_SVG + '</span>'


def grey(label, full=False):
    return '<span class="grey4"' + (' style="width:100%;"' if full else '') + '>' + label + '</span>'


def head(label, title_html, sub="", dark=False, right="", mobile=False):
    c = "#FFFFFF" if dark else "var(--text)"
    lc = ON_DARK_2 if dark else "var(--muted)"
    if mobile:
        return ('<div style="display:flex;flex-direction:column;gap:12px;">' + ('<span class="t-small" style="color:' + lc + ';">' + label + '</span>' if label else '')
                + '<h2 class="t-display" style="color:' + c + ';">' + title_html + '</h2>'
                + ('<p class="t-lead" style="color:' + c + ';margin-top:4px;">' + sub + '</p>' if sub else '') + '</div>')
    return ('<div style="display:grid;grid-template-columns:300px minmax(0,1fr) auto;column-gap:24px;align-items:end;">'
            '<span class="t-small" style="align-self:start;padding-top:12px;color:' + lc + ';">' + label + '</span>'
            '<div style="display:flex;flex-direction:column;gap:20px;"><h2 class="t-display" style="color:' + c + ';">' + title_html + '</h2>'
            + ('<p class="t-lead" style="color:' + c + ';">' + sub + '</p>' if sub else '') + '</div>'
            + ('<div style="padding-bottom:4px;">' + right + '</div>' if right else '<span></span>') + '</div>')


def arrows():
    a = lambda flip, off: ('<span class="rd" style="width:28px;height:28px;background:var(--tint);color:var(--text);' + ('opacity:.4;' if off else '') + '">'
                           '<span style="display:block;width:14px;height:14px;' + ('transform:scaleX(-1);' if flip else '') + '"><svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span></span>')
    return '<div style="display:flex;gap:8px;">' + a(True, True) + a(False, False) + '</div>'


def tabs(items, active=0, size="small", gap=24):
    fs = "14px" if size == "small" else "32px"
    return ('<div style="display:flex;gap:' + str(gap) + 'px;border-bottom:1px solid var(--line);">'
            + ''.join('<span style="display:flex;align-items:center;height:48px;font-size:' + fs + ';font-weight:' + ('600' if size != "small" else '500') + ';'
                      + ('letter-spacing:-0.02em;' if size != "small" else '') + 'margin-bottom:-1px;'
                      + ('color:var(--text);border-bottom:2px solid var(--text);' if i == active else 'color:var(--muted);border-bottom:2px solid transparent;') + '">' + t + '</span>'
                      for i, t in enumerate(items)) + '</div>')


def tags(items):
    return ''.join('<span class="tag4">/' + t + '</span>' for t in items[:2])


def dots(n=5, active=0):
    sizes = [1, 1, 1, 0.83, 0.67]
    return ('<div style="position:absolute;left:0;right:0;bottom:12px;display:flex;justify-content:center;align-items:center;gap:6px;">'
            + ''.join('<span style="width:6px;height:6px;border-radius:50%;transform:scale(' + str(sizes[i]) + ');background:' + ('#FFFFFF' if i == active else 'rgba(255,255,255,.6)') + ';"></span>' for i in range(n))
            + '</div>')


def work_card(img, tg, brand, aud, line2, line3="", img_h=495, width=None, hover=False):
    return ('<div style="display:flex;flex-direction:column;gap:12px;' + ('width:' + str(width) + 'px;flex:none;' if width else 'min-width:0;') + '">'
            '<div style="position:relative;height:' + str(img_h) + 'px;border-radius:var(--r-media);overflow:hidden;background:var(--placeholder);"><img src="' + img + '" alt="" class="cover">'
            '<div style="position:absolute;left:12px;top:12px;display:flex;gap:6px;">' + tags(tg) + '</div>' + dots()
            + ('<span class="rd" style="position:absolute;right:12px;top:50%;margin-top:-16px;width:32px;height:32px;background:rgba(255,255,255,.9);box-shadow:var(--sh-lift);color:var(--text);">'
               '<svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M7 4l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' if hover else '')
            + '</div>'
            '<div style="display:flex;flex-direction:column;gap:2px;"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:16px;"><span class="t-h3" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + brand + '</span>'
            '<span class="t-small muted" style="white-space:nowrap;">' + aud + '</span></div>'
            '<span class="t-body muted" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + line2 + '</span>'
            + ('<span class="t-small muted">' + line3 + '</span>' if line3 else '') + '</div></div>')


def faq_list(qs, answer, open_first=True):
    rows = ''
    for i, q in enumerate(qs):
        is_open = open_first and i == 0
        rows += ('<div style="background:#FFFFFF;border-radius:var(--r-ctl);padding:18px 20px 18px 24px;display:flex;flex-direction:column;gap:10px;">'
                 '<div style="display:flex;justify-content:space-between;align-items:center;gap:20px;"><span class="t-h3">' + q + '</span>'
                 '<span class="rd" style="width:28px;height:28px;background:var(--tint);font-size:18px;font-weight:500;line-height:1;">' + ('&#8722;' if is_open else '+') + '</span></div>'
                 + ('<p class="t-body muted" style="max-width:640px;">' + answer + '</p>' if is_open else '') + '</div>')
    return '<div style="display:flex;flex-direction:column;gap:8px;">' + rows + '</div>'


def stats_band(items, mobile=False):
    return ('<div class="panel4" style="padding:' + ('48px 16px' if mobile else '72px 24px') + ';">'
            '<div style="display:grid;grid-template-columns:repeat(' + ('2' if mobile else str(len(items))) + ',minmax(0,1fr));gap:' + ('40px 8px' if mobile else '24px') + ';text-align:center;">'
            + ''.join('<div style="display:flex;flex-direction:column;align-items:center;gap:12px;"><span class="t-stat" style="color:#FFFFFF;">' + n
                      + '<span style="color:#FFC528;font-size:.52em;letter-spacing:-0.02em;margin-left:2px;">' + s + '</span></span>'
                      '<span class="t-' + ('micro' if mobile else 'small') + ' t-up" style="color:' + ON_DARK_2 + ';">' + l + '</span></div>' for n, s, l in items)
            + '</div></div>')


def avatar(size=40):
    return '<span class="ph" style="display:block;width:' + str(size) + 'px;height:' + str(size) + 'px;border-radius:50%;flex:none;"></span>'


def quote_card(quote, name, role, height=None, pad=32):
    return ('<div class="card4" style="padding:' + str(pad) + 'px;display:flex;flex-direction:column;justify-content:space-between;gap:24px;' + ('height:' + str(height) + 'px;' if height else '') + '">'
            '<p class="t-h3" style="font-weight:500;">' + quote + '</p>'
            '<div style="display:flex;align-items:center;gap:12px;">' + avatar() + '<div style="display:flex;flex-direction:column;"><span class="t-h3" style="font-size:16px;">' + name + '</span><span class="t-small muted">' + role + '</span></div></div></div>')


def video_card(img, kicker, title, height=400):
    return ('<div style="position:relative;height:' + str(height) + 'px;border-radius:var(--r-media);overflow:hidden;color:#FFFFFF;background:var(--placeholder);"><img src="' + img + '" alt="" class="cover" style="position:absolute;inset:0;">'
            '<div style="position:absolute;inset:0;background:linear-gradient(0deg,rgba(7,14,42,.85),rgba(7,14,42,0) 55%);"></div>'
            '<span class="rd" style="position:absolute;left:24px;top:24px;width:56px;height:56px;background:#FFC528;"><span style="width:0;height:0;border-top:9px solid transparent;border-bottom:9px solid transparent;border-left:14px solid #0F1E5E;margin-left:4px;"></span></span>'
            '<div style="position:absolute;left:24px;right:24px;bottom:24px;display:flex;flex-direction:column;gap:4px;"><span class="t-micro t-up" style="color:#FFC528;">' + kicker + '</span><span class="t-h3" style="color:#FFFFFF;">' + title + '</span></div></div>')


def calendar_card(button_label, mobile=False):
    """Booking card: October 2026 starts on a Thursday."""
    avail = {13, 14, 15, 16, 20, 21, 22, 23, 27, 28, 29}
    cells = '<span></span>' * 3 + ''.join(
        '<span style="height:' + ('40' if mobile else '44') + 'px;display:flex;align-items:center;justify-content:center;border-radius:50%;font-size:14px;'
        + ('background:#0F1E5E;color:#FFFFFF;font-weight:600;' if d == 16 else ('color:var(--text);font-weight:600;' if d in avail else 'color:var(--muted);opacity:.55;')) + '">' + str(d) + '</span>' for d in range(1, 32))
    days = ('<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;"><span class="t-h3" style="font-size:16px;">October 2026</span>'
            '<div style="display:flex;gap:8px;"><span class="rd" style="width:32px;height:32px;border:1px solid var(--line);color:var(--muted);transform:scaleX(-1);">' + icon("chev", 16, 2) + '</span>'
            '<span class="rd" style="width:32px;height:32px;border:1px solid var(--line);color:var(--text);">' + icon("chev", 16, 2) + '</span></div></div>'
            '<div style="display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:2px;">'
            + ''.join('<span class="t-micro muted" style="text-align:center;padding-bottom:8px;">' + d + '</span>' for d in ["M", "T", "W", "T", "F", "S", "S"]) + cells + '</div>')
    slots = ''.join('<span style="height:48px;border-radius:var(--r-ctl);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:500;'
                    + ('background:#0F1E5E;color:#FFFFFF;' if t == "15:30" else 'border:1px solid var(--line);color:var(--text);') + '">' + t + '</span>' for t in ["10:30", "12:00", "15:30", "17:00"])
    side = ('<div style="display:flex;flex-direction:column;gap:12px;"><div style="display:flex;flex-direction:column;"><span class="t-h3" style="font-size:16px;">Friday, 16 October</span>'
            '<span class="t-small muted">30-minute strategy call &#183; IST</span></div>'
            '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;">' + slots + '</div>'
            '<div style="margin-top:4px;">' + btn(button_label, "ink", full=True) + '</div></div>')
    if mobile:
        return '<div class="card4" style="padding:24px 20px;display:flex;flex-direction:column;gap:24px;box-shadow:var(--sh-float);">' + days + side + '</div>'
    return ('<div class="card4" style="padding:32px;display:grid;grid-template-columns:minmax(0,1fr) 280px;gap:40px;box-shadow:var(--sh-float);">'
            '<div>' + days + '</div>' + side + '</div>')


def contact(button_label, title_html=None, sub="Your brand is unique. So is your growth plan.", mobile=False, active=0):
    title_html = title_html or ('Get in<br>touch' + dot())
    tab_items = ["Book a call", "Send a brief", "Careers &#8599;"]
    founders = ('<div style="display:flex;align-items:center;gap:12px;"><div style="display:flex;">' + avatar() + '<span style="margin-left:-10px;display:block;border:2px solid #FBFAF6;border-radius:50%;">' + avatar(40) + '</span></div>'
                '<span class="t-small muted">[Name] and [Name], founders. Reply within one working day.</span></div>')
    if mobile:
        return ('<section style="padding:72px 24px 72px;display:flex;flex-direction:column;gap:24px;">' + head("", title_html, sub, mobile=True) + founders
                + tabs(tab_items, active, gap=20) + calendar_card(button_label, mobile=True) + '</section>')
    return ('<section style="padding:128px 48px 128px;"><div style="display:grid;grid-template-columns:470px minmax(0,1fr);gap:40px;">'
            '<div style="display:flex;flex-direction:column;gap:24px;"><h2 class="t-display">' + title_html + '</h2><p class="t-lead">' + sub + '</p>' + founders + '</div>'
            '<div style="display:flex;flex-direction:column;gap:32px;">' + tabs(tab_items, active, size="large", gap=40) + calendar_card(button_label) + '</div></div></section>')


def chat_icon(top, right=48):
    return ('<span class="rd" style="position:absolute;right:' + str(right) + 'px;top:' + str(top) + 'px;z-index:90;width:56px;height:56px;background:#1D4ED8;box-shadow:var(--sh-float);">'
            '<img src="mmc-mark.png" alt="Chat with MMC" style="width:30px;height:30px;object-fit:contain;filter:brightness(0) invert(1);">'
            '<span style="position:absolute;right:2px;bottom:2px;width:13px;height:13px;border-radius:50%;background:#25D366;border:2px solid #FFFFFF;"></span></span>')


def sticky_bar(label, top):
    """Mobile bottom action bar; replaces the chat bubble."""
    return ('<div style="position:absolute;left:0;right:0;top:' + str(top) + 'px;z-index:95;height:76px;padding:12px 24px;background:#FFFFFF;border-top:1px solid var(--line);display:flex;gap:12px;align-items:center;">'
            '<span class="rd" style="width:48px;height:48px;border:1px solid var(--line);color:var(--text);">' + icon("wa", 22, 1.6) + '</span>'
            '<div style="flex:1;">' + btn(label, "ink", full=True) + '</div></div>')


def sub_hero(crumb, h1_html, sub, action_html, tiles):
    """Hub page hero: breadcrumb, H1, one sentence, one button and a link, two photos at the right."""
    t = ''.join('<span style="position:absolute;left:' + str(x) + 'px;top:' + str(y) + 'px;width:260px;height:460px;border-radius:var(--r-media);overflow:hidden;background:rgba(255,255,255,.08);"><img src="' + im + '" alt="" class="cover"></span>'
                for im, x, y in zip(tiles, [848, 1132], [130, 170]))
    return ('<section style="position:relative;height:720px;overflow:hidden;background:linear-gradient(180deg,#0F1E5E 0%,#0A1440 100%);color:#FFFFFF;">' + t + NAV +
            '<div style="position:absolute;left:48px;top:196px;width:700px;display:flex;flex-direction:column;align-items:flex-start;gap:24px;">'
            '<span class="t-small" style="color:' + ON_DARK_2 + ';">' + crumb + '</span>'
            '<h1 class="t-h1" style="color:#FFFFFF;">' + h1_html + '</h1>'
            '<p class="t-lead" style="color:' + ON_DARK_2 + ';max-width:540px;">' + sub + '</p>'
            '<div style="display:flex;align-items:center;gap:28px;margin-top:8px;">' + action_html + '</div></div></section>')


def service_panel(label, title_html, sub, rows, mobile=False):
    """Dark numbered services panel. rows: (muted line, title, description, chips)."""
    if mobile:
        out = ''.join('<div style="display:grid;grid-template-columns:36px minmax(0,1fr) 24px;align-items:center;min-height:72px;border-top:1px solid rgba(255,255,255,.14);">'
                      '<span class="t-micro" style="color:' + ON_DARK_2 + ';">0' + str(i + 1) + '</span>'
                      '<div style="display:flex;flex-direction:column;padding:14px 0;"><span class="t-micro" style="color:rgba(255,255,255,.6);font-weight:500;">' + m + '</span><span class="t-h3" style="color:#FFFFFF;">' + t + '</span></div>'
                      '<span style="color:#FFFFFF;">' + icon("chev", 20, 2) + '</span></div>' for i, (m, t, d, chips) in enumerate(rows))
        return ('<section style="padding:72px 12px 0;"><div class="panel4" style="padding:40px 20px 8px;">' + head(label, title_html, sub, dark=True, mobile=True)
                + '<div style="margin-top:28px;">' + out + '</div></div></section>')
    out = ''.join('<div style="display:grid;grid-template-columns:56px 420px minmax(0,1fr) 280px 44px;gap:24px;align-items:center;padding:32px 0;border-top:1px solid rgba(255,255,255,.14);">'
                  '<span class="t-small" style="color:' + ON_DARK_2 + ';align-self:start;padding-top:4px;">0' + str(i + 1) + '</span>'
                  '<div style="display:flex;flex-direction:column;gap:6px;"><span class="t-small" style="color:rgba(255,255,255,.6);">' + m + '</span><span class="t-h2" style="color:#FFFFFF;">' + t + '</span></div>'
                  '<p class="t-body" style="color:' + ON_DARK_2 + ';">' + d + '</p>'
                  '<div style="display:flex;flex-wrap:wrap;gap:8px;">' + ''.join('<span class="chip4">' + c + '</span>' for c in chips[:3]) + '</div>'
                  '<span class="rd" style="width:44px;height:44px;border:1px solid rgba(255,255,255,.35);color:#FFFFFF;">' + ARR_SVG + '</span></div>' for i, (m, t, d, chips) in enumerate(rows))
    return ('<section style="padding:128px 48px 0;"><div class="panel4" style="padding:72px 48px 24px;">' + head(label, title_html, sub, dark=True)
            + '<div style="margin-top:48px;">' + out + '</div></div></section>')


def plans(label, sub, tiers, cta):
    """tiers: (name, price, band, features, highlighted). Only the highlighted tier carries a button."""
    col = ''
    for n, p, band, feats, hi in tiers:
        fg2 = ON_DARK_2 if hi else "var(--muted)"
        col += ('<div class="' + ('panel4' if hi else 'card4') + '" style="padding:32px;display:flex;flex-direction:column;gap:20px;">'
                '<div style="display:flex;justify-content:space-between;align-items:center;"><span class="t-h3" style="color:' + ('#FFFFFF' if hi else 'var(--text)') + ';">' + n + '</span>'
                + ('<span class="t-micro t-up" style="padding:5px 10px;border-radius:var(--r-pill);background:#FFC528;color:#0F1E5E;">Most chosen</span>' if hi else '') + '</div>'
                '<div style="display:flex;align-items:baseline;gap:8px;"><span class="t-h1" style="color:' + ('#FFFFFF' if hi else 'var(--text)') + ';">' + p + '</span><span class="t-small" style="color:' + fg2 + ';">per month + GST</span></div>'
                '<span class="t-small" style="color:' + ('#FFC528' if hi else '#1D4ED8') + ';">' + band + '</span>'
                '<div style="display:flex;flex-direction:column;gap:12px;padding-top:20px;border-top:1px solid ' + ('rgba(255,255,255,.16)' if hi else 'var(--line)') + ';">'
                + ''.join('<span class="t-body" style="display:flex;gap:10px;align-items:center;color:' + ('#FFFFFF' if hi else 'var(--text)') + ';"><span style="color:' + ('#FFC528' if hi else '#1D4ED8') + ';">' + icon("check", 18, 2.2) + '</span>' + f + '</span>' for f in feats[:4])
                + '</div><div style="margin-top:auto;padding-top:8px;">' + (btn(cta, "white", full=True) if hi else link('Choose ' + n)) + '</div></div>')
    return ('<section style="padding:128px 48px 0;">' + head(label, 'Plans' + dot(), sub)
            + '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:48px;">' + col + '</div></section>')


def faq_section(qs, answer, sub):
    return ('<section style="padding:128px 48px 0;"><div style="display:grid;grid-template-columns:minmax(0,1fr) 675px;gap:40px;">'
            '<div style="display:flex;flex-direction:column;gap:20px;"><h2 class="t-display">FAQ' + dot() + '</h2><p class="t-lead muted" style="max-width:34ch;">' + sub + '</p></div>'
            + faq_list(qs, answer) + '</div></section>')


def field(label, ph):
    return ('<div style="display:flex;flex-direction:column;gap:10px;padding-bottom:12px;border-bottom:1px solid rgba(15,30,94,.25);">'
            '<span class="t-small">' + label + '</span><span class="t-body muted" style="opacity:.7;">' + ph + '</span></div>')


def sample_badge(text="Sample"):
    return '<span class="t-micro t-up muted" style="display:inline-flex;align-items:center;height:26px;padding:0 10px;border-radius:var(--r-pill);border:1px dashed rgba(15,30,94,.3);">' + text + '</span>'


def seg_toggle(items, active=0, width=180):
    """Airbnb's Dates / Flexible toggle: white selected pill in a tinted track."""
    return ('<div style="display:inline-flex;padding:4px;border-radius:var(--r-pill);background:var(--tint);">'
            + ''.join('<span class="t-small" style="display:flex;align-items:center;justify-content:center;height:36px;width:' + str(width) + 'px;border-radius:var(--r-pill);'
                      + ('background:#FFFFFF;box-shadow:var(--sh-lift);color:var(--text);' if i == active else 'color:var(--muted);') + '">' + t + '</span>' for i, t in enumerate(items)) + '</div>')


def gantt(rows, mobile=False):
    """Admissions calendar. rows: (phase, span, start month, end month, fill, text colour)."""
    track = 'display:grid;grid-template-columns:repeat(12,minmax(0,1fr));'
    if mobile:
        return ''.join('<div style="padding:14px 0;border-top:1px solid var(--line);display:flex;flex-direction:column;gap:8px;">'
                       '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;"><span class="t-h3" style="font-size:16px;">' + n + '</span><span class="t-small muted" style="white-space:nowrap;">' + span + '</span></div>'
                       '<div style="' + track + 'height:8px;border-radius:var(--r-pill);background:var(--tint);"><span style="grid-column:' + str(a) + ' / ' + str(b + 1) + ';border-radius:var(--r-pill);background:' + bg + ';"></span></div></div>'
                       for n, span, a, b, bg, fg in rows)
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return ('<div style="display:grid;grid-template-columns:260px minmax(0,1fr);padding-bottom:10px;"><span></span><div style="' + track + '">'
            + ''.join('<span class="t-micro muted" style="text-align:center;">' + m + '</span>' for m in months) + '</div></div>'
            + ''.join('<div style="display:grid;grid-template-columns:260px minmax(0,1fr);align-items:center;padding:12px 0;border-top:1px solid var(--line);"><span class="t-h3" style="font-size:16px;">' + n + '</span>'
                      '<div style="' + track + 'height:40px;"><span class="t-small" style="grid-column:' + str(a) + ' / ' + str(b + 1) + ';display:flex;align-items:center;padding:0 14px;border-radius:var(--r-ctl);background:' + bg + ';color:' + fg + ';white-space:nowrap;overflow:hidden;">' + span + '</span></div></div>'
                      for n, span, a, b, bg, fg in rows))


GANTT_ROWS = [("Brand &amp; reputation", "Always on", 1, 12, "rgba(29,78,216,.12)", "#1D4ED8"), ("Enquiry push", "Jan to Apr", 1, 4, "#1D4ED8", "#FFFFFF"),
              ("Entrance exams &amp; results", "Apr to Jun", 4, 6, "#0F1E5E", "#FFFFFF"), ("Counselling &amp; applications", "Jun to Aug", 6, 8, "#FFC528", "#0F1E5E"),
              ("Late deciders", "Aug to Sep", 8, 9, "rgba(29,78,216,.4)", "#0F1E5E")]
