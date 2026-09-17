"""Round 3 shared layer.

Presentation system measured from 3mindsdigital.com (layout, sections, type scale,
component shapes), expressed in MMC's own colours and accent font, with DM Sans as
the primary face. Nav, service hero and footer are imported unchanged from round 2.
"""
import importlib.util, os
_r2_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "r2", "base.py")
_spec = importlib.util.spec_from_file_location("r2base", _r2_path)
r2 = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(r2)

NAV, NAV_M, footer, sd_hero, page_hero = r2.NAV, r2.NAV_M, r2.footer, r2.sd_hero, r2.page_hero

FONTS = ('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700'
         '&amp;family=Raleway:wght@500;600;700;800&amp;family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,400'
         '&amp;family=Cormorant+Garamond:ital,wght@1,500;1,600&amp;display=swap">')

INK, BLUE, SUN, PAPER, TEXT, MUTED = "#0F1E5E", "#1D4ED8", "#FFC528", "#FBFAF6", "#0E1626", "#4F5A6B"

CSS = r2.CSS + """
.x{font-family:"DM Sans","Helvetica Neue",Arial,sans-serif;}
.x-label{font-family:"DM Sans",sans-serif;font-size:16px;font-weight:500;letter-spacing:-0.04em;color:#0E1626;}
.x-title{font-family:"DM Sans",sans-serif;font-weight:600;font-size:100px;line-height:1;letter-spacing:-0.08em;color:#0E1626;margin:0;}
.x-sub{font-family:"DM Sans",sans-serif;font-size:20px;font-weight:500;letter-spacing:-0.03em;color:#0E1626;margin:0;}
.x-dark .x-label,.x-dark .x-title,.x-dark .x-sub{color:#FFFFFF;}
.x-em{font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-weight:600;letter-spacing:-0.02em;}
.x-btn{display:inline-flex;align-items:center;gap:14px;height:52px;padding:2px 2px 2px 18px;border-radius:4px;font-family:"DM Sans",sans-serif;font-size:14px;font-weight:600;letter-spacing:0.02em;text-transform:uppercase;white-space:nowrap;}
.x-btn .sq{width:48px;height:48px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex:none;background:#FFC528;color:#0F1E5E;}
.x-btn-ink{background:#0F1E5E;color:#FFFFFF;} .x-btn-ink:hover{color:#FFFFFF;}
.x-btn-white{background:#FFFFFF;color:#0F1E5E;} .x-btn-white:hover{color:#0F1E5E;}
.x-btn-line{padding:2px 20px;border:1px solid rgba(255,255,255,0.55);color:#FFFFFF;}
.x-btn-line-dark{padding:2px 20px;border:1px solid rgba(15,30,94,0.35);color:#0F1E5E;}
.x-tag{display:inline-flex;align-items:center;height:28px;padding:0 10px;border-radius:6px;background:#FFFFFF;color:#0E1626;font-family:"DM Sans",sans-serif;font-size:12px;font-weight:600;letter-spacing:-0.01em;text-transform:uppercase;}
.x-chip{display:inline-flex;align-items:center;height:30px;padding:0 12px;border-radius:50px;background:#FFFFFF;color:#0E1626;font-family:"DM Sans",sans-serif;font-size:12px;font-weight:600;letter-spacing:-0.04em;}
.x-card{background:#FFFFFF;border-radius:14px;}
.x-panel{background:linear-gradient(180deg,#16329E 0%,#0F1E5E 42%,#0A1440 100%);color:#FFFFFF;border-radius:20px;position:relative;overflow:hidden;isolation:isolate;}
.x-grid{position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:0.18;background-image:linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px);background-size:26px 26px;-webkit-mask-image:radial-gradient(80% 70% at 70% 0%,#000,transparent);mask-image:radial-gradient(80% 70% at 70% 0%,#000,transparent);}
.x-round{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex:none;}
"""

ARROW = r2.ARROW
ARR_SVG = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'


def page(body, width):
    return ('<!doctype html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <script src="./support.js"></script>\n</head>\n<body>\n<x-dc>\n<helmet>\n  '
            + FONTS + '\n  <style>' + CSS + '</style>\n</helmet>\n<div style="position:relative;display:flow-root;width:' + str(width)
            + 'px;background:#FBFAF6;overflow:hidden;">\n' + body + '\n</div>\n</x-dc>\n</body>\n</html>\n')


def em(t, color=BLUE):
    return '<span class="x-em" style="color:' + color + ';">' + t + '</span>'


def btn(label, kind="ink"):
    """3 Minds button shape: 4px box with a 48px arrow square, MMC colours."""
    return '<span class="x-btn x-btn-' + kind + '">' + label + '<span class="sq">' + ARR_SVG + '</span></span>'


def btn_line(label, dark_ground=True):
    return '<span class="x-btn ' + ('x-btn-line' if dark_ground else 'x-btn-line-dark') + '">' + label + '</span>'


def head(label, title_html, sub="", dark=False, title_size=100, left=300):
    """Label in a narrow left column, giant full-stop title in the next column."""
    return ('<div class="' + ('x-dark' if dark else '') + '" style="display:grid;grid-template-columns:' + str(left) + 'px minmax(0,1fr);align-items:start;">'
            '<span class="x-label" style="padding-top:14px;">' + label + '</span>'
            '<div style="display:flex;flex-direction:column;gap:22px;"><h2 class="x-title" style="font-size:' + str(title_size) + 'px;">' + title_html + '</h2>'
            + ('<p class="x-sub">' + sub + '</p>' if sub else '') + '</div></div>')


def tags(items):
    return '<div style="display:flex;flex-wrap:wrap;gap:6px;">' + ''.join('<span class="x-tag">/' + t + '</span>' for t in items) + '</div>'


def stats_band(items, pad="70px 24px 96px"):
    return ('<div class="x-panel" style="padding:' + pad + ';"><div class="x-grid"></div>'
            '<div style="display:grid;grid-template-columns:repeat(' + str(len(items)) + ',minmax(0,1fr));text-align:center;">'
            + ''.join('<div style="display:flex;flex-direction:column;align-items:center;gap:14px;"><span class="x" style="font-weight:600;font-size:90px;line-height:1;letter-spacing:-0.045em;color:#FFFFFF;">' + n
                      + '<span style="color:#FFC528;font-size:0.52em;letter-spacing:-0.02em;margin-left:2px;">' + s + '</span></span>'
                      '<span class="x" style="font-size:15px;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.7);">' + l + '</span></div>' for n, s, l in items)
            + '</div></div>')


def chat_bubble(top, right=24, label=True):
    return ('<div style="position:absolute;right:' + str(right) + 'px;top:' + str(top) + 'px;z-index:90;display:flex;align-items:flex-end;gap:10px;">'
            + ('<span class="x" style="padding:12px 16px;border-radius:14px 14px 4px 14px;background:#FFFFFF;font-size:15px;font-weight:500;color:#0E1626;box-shadow:0 14px 34px -14px rgba(7,14,42,0.35);">Ready to grow? Say hi</span>' if label else '') +
            '<span style="position:relative;width:56px;height:56px;border-radius:50%;background:#1D4ED8;display:flex;align-items:center;justify-content:center;box-shadow:0 14px 30px -10px rgba(29,78,216,0.6);">'
            '<img src="mmc-mark.png" alt="" style="width:30px;height:30px;object-fit:contain;filter:brightness(0) invert(1);">'
            '<span style="position:absolute;right:2px;bottom:2px;width:13px;height:13px;border-radius:50%;background:#25D366;border:2px solid #FFFFFF;"></span></span></div>')


def faq(items, open_answer):
    first, rest = items[0], items[1:]
    return ('<div style="display:flex;flex-direction:column;gap:12px;">'
            '<article class="x-card" style="padding:26px 28px;display:flex;flex-direction:column;gap:14px;">'
            '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:24px;"><span class="x" style="font-size:18px;font-weight:600;letter-spacing:-0.04em;color:#0E1626;">' + first + '</span>'
            '<span class="x-round" style="width:26px;height:26px;background:#0F1E5E;color:#FFFFFF;font-size:16px;">&#8722;</span></div>'
            '<p class="x" style="margin:0;font-size:15.5px;line-height:1.6;color:#4F5A6B;">' + open_answer + '</p></article>'
            + ''.join('<article class="x-card" style="padding:24px 28px;display:flex;justify-content:space-between;align-items:center;gap:24px;"><span class="x" style="font-size:18px;font-weight:500;letter-spacing:-0.04em;color:#0E1626;">' + q + '</span>'
                      '<span class="x-round" style="width:26px;height:26px;background:#0F1E5E;color:#FFFFFF;font-size:16px;">+</span></article>' for q in rest)
            + '</div>')
