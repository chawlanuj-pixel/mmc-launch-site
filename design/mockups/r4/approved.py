"""Round 4: the two homepage sections the user approved, carried over from the live site.

Layout, proportions and the hover-to-reveal behaviour follow MMC Site/home26/sections.jsx
(NClients, NCapabilities) and home26.css. Only the typeface changes, Raleway and Nunito to
DM Sans, to match the round. A static mockup can show one state: the services list at rest
(first row active with its photo showing, as the live page does) and the logo wall with one
tile hovered. Touch screens have no hover, so the mobile versions show the resting state.
"""
from base import page

FG, FG2, FG3 = "#0B1020", "#47506A", "#7C8598"
LINE, LINE2 = "rgba(11,16,32,0.10)", "rgba(11,16,32,0.18)"
BLUE = "#1D4ED8"
GO_PATH = "M2 10.3 H12.1 V5 L22.2 12 L12.1 19 V13.7 H2 Z"

CAPS = [
    ("performance", "Performance media", "Meta, Google, Amazon and quick-commerce run as one account structure, budgeted against contribution rather than platform ROAS.", "8.7&#215; blended", ["Meta", "Google", "Amazon", "Quick commerce"]),
    ("creative", "Creative &amp; UGC", "240+ assets a month against a single brand thesis: creator content, performance edits, statics and landing-page copy.", "240+ / month", ["UGC", "Performance edits", "Creators", "Statics"]),
    ("retention", "Retention &amp; lifecycle", "Email, WhatsApp and loyalty built on the reason people come back, not a flow bolted onto a product nobody reorders.", "D60 in a quarter", ["Klaviyo", "WhatsApp", "Loyalty", "Cohorts"]),
    ("conversion", "Conversion &amp; technology", "Shopify builds, checkout, speed and CRO: the highest-leverage ad you own is the page the ad lands on.", "1.4s median LCP", ["Shopify Plus", "CRO", "Checkout", "Speed"]),
    ("brand", "Brand &amp; packaging", "Identity, packaging and design systems that make paid media cheaper by making the brand easier to remember.", "In-house studio", ["Identity", "Packaging", "UI/UX", "Systems"]),
]

# clients-strip.jsx CS_CLIENTS order; NClients splits it into two rows.
CLIENTS = [("bloom", "Bloom Edutours"), ("sprouts", "Sprouts Edu Tours"), ("nmc", "NM Consultings"), ("skyfling", "Skyfling Technologies"),
           ("lepure", "Lepure"), ("giraffe", "The Growing Giraffe"), ("mittiy", "Mittiy Made"), ("awwbaby", "AwwBaby"), ("sprnt", "Sprnt"),
           ("vagakids", "Vaga Kids"), ("mbb", "MyBrownButters"), ("notic", "Notic"), ("oosh", "OOsh"), ("pandacabs", "Panda Cabs"),
           ("mvj", "MVJ College of Engineering"), ("anchor", "Anchor by Panasonic"), ("flomate", "Flomate"), ("greenhermitage", "Green Hermitage"),
           ("housing", "Housing.com"), ("jsw", "JSW"), ("learningmate", "LearningMate"), ("rustomjee", "Rustomjee"), ("saintgobain", "Saint-Gobain"),
           ("gyproc", "Gyproc"), ("clubmahindra", "Club Mahindra")]
WORK_ART = {"bloom", "sprouts", "nmc", "skyfling", "lepure", "giraffe", "mittiy", "awwbaby", "sprnt", "vagakids", "mbb", "notic", "oosh", "pandacabs", "mvj"}


def n_tilt(key):
    """Port of nTilt(): a fixed 5 to 7 degree lean per cell, either direction."""
    h = 0
    for ch in key:
        h = (h * 31 + ord(ch)) & 0xFFFFFFFF
        if h >= 2 ** 31:
            h -= 2 ** 32
    h = abs(h)
    return ("-" if (h >> 5) % 2 else "") + "%.1f" % (5 + (h % 21) / 10) + "deg"


def serif(t):
    return '<span style="font-family:\'Cormorant Garamond\',Georgia,serif;font-style:italic;font-weight:600;letter-spacing:-0.01em;color:' + BLUE + ';">' + t + '</span>'


def _head(eyebrow, h2_html, lede, mobile):
    return ('<div class="x" style="display:grid;grid-template-columns:' + ('minmax(0,1fr)' if mobile else 'minmax(0,1.15fr) minmax(0,0.85fr)') + ';gap:' + ('20px' if mobile else '40px')
            + ';align-items:' + ('start' if mobile else 'end') + ';">'
            '<div style="display:flex;flex-direction:column;gap:18px;">'
            '<span style="display:inline-flex;align-items:center;gap:10px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:' + FG3 + ';"><span style="width:26px;height:1.5px;background:currentColor;"></span>' + eyebrow + '</span>'
            '<h2 style="margin:0;font-weight:700;font-size:' + ('30px' if mobile else '66px') + ';line-height:1.0;letter-spacing:-0.038em;color:' + FG + ';text-wrap:balance;">' + h2_html + '</h2></div>'
            '<p style="margin:0;font-size:' + ('15px' if mobile else '19px') + ';line-height:1.6;color:' + FG2 + ';max-width:58ch;">' + lede + '</p></div>')


def capabilities(mobile=False, active=0):
    pad, band = (32, 64) if mobile else (80, 115)
    row_h = 196
    rows = ''
    for i, (k, t, d, m, tg) in enumerate(CAPS):
        on = i == active
        arrow_t = 'rotate(0deg) translateX(4px)' if on else ('rotate(0deg)' if mobile else 'rotate(-45deg)')
        rows += ('<div class="x" style="position:relative;box-sizing:border-box;display:grid;grid-template-columns:' + ('minmax(0,1fr) 40px' if mobile else 'minmax(0,1fr) minmax(0,1fr) 197px 44px')
                 + ';gap:' + ('14px 16px' if mobile else '29px') + ';align-items:center;padding:' + ('22px' if mobile else '32px') + ' 0;min-height:' + str(row_h) + 'px;'
                 'border-bottom:1px solid ' + (BLUE if on else LINE) + ';' + ('transform:translateX(' + ('10px' if mobile else '17px') + ');' if on else '') + '">'
                 '<span style="display:flex;flex-direction:column;gap:8px;"><b style="font-weight:700;font-size:' + ('21px' if mobile else '36px') + ';letter-spacing:-0.032em;line-height:1.04;color:' + FG + ';">' + t + '</b>'
                 '<span style="display:flex;flex-wrap:wrap;gap:6px;">' + ''.join('<span style="font-size:10.5px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:4px 10px;border-radius:999px;color:' + (BLUE if on else FG3) + ';border:1px solid ' + (BLUE if on else LINE2) + ';">' + x + '</span>' for x in tg) + '</span></span>'
                 '<span style="font-size:14.5px;line-height:1.6;color:' + FG2 + ';' + ('grid-column:1 / -1;grid-row:2;' if mobile else '') + '">' + d + '<br>'
                 '<span style="display:inline-block;margin-top:8px;font-weight:700;font-size:' + ('15px' if mobile else '19px') + ';letter-spacing:-0.02em;color:' + BLUE + ';white-space:nowrap;">' + m + '</span></span>'
                 '<span style="justify-self:end;width:34px;height:34px;display:flex;align-items:center;justify-content:center;color:' + (BLUE if on else FG3) + ';transform:' + arrow_t + ';' + ('grid-column:2;grid-row:1;' if mobile else 'grid-column:4;') + '">'
                 '<svg width="26" height="26" viewBox="0 0 24 24" style="overflow:visible;"><path d="' + GO_PATH + '" fill="' + ('currentColor' if on else 'transparent') + '" stroke="currentColor" stroke-width="' + ('0' if on else '1.3') + '" stroke-linejoin="round"/></svg></span></div>')
    peek = '' if mobile else ('<span style="position:absolute;right:73px;top:' + str(active * row_h + row_h // 2 - 74) + 'px;z-index:4;width:197px;height:148px;border-radius:12px;overflow:hidden;background:' + LINE + ';'
                               'box-shadow:0 18px 40px -18px rgba(20,47,91,0.4);transform:rotate(-3deg);transform-origin:50% 60%;"><img src="svc-' + CAPS[active][0] + '.jpg" alt="" class="cover"></span>')
    return ('<section style="background:#FFFFFF;padding:' + str(band) + 'px 0;"><div style="padding:0 ' + str(pad) + 'px;">'
            + _head("What we run", 'Five systems, ' + serif('one team.'), "Most brands buy these from five vendors and spend their week translating between them. Here they share a strategist, a thesis and a P&amp;L.", mobile)
            + '<div style="position:relative;margin-top:' + ('36px' if mobile else '68px') + ';border-top:1px solid ' + LINE + ';">' + peek + rows + '</div></div></section>')


def logo_wall(mobile=False, hovered="mittiy"):
    w = 196 if mobile else 245
    h, gap, cpad, fade, band, pad = (round(w * 9 / 16), 10, 14, 40, 64, 32) if mobile else (round(w * 9 / 16), 17, 23, 115, 115, 80)
    halves = [CLIENTS[:13], CLIENTS[13:]]
    starts = [(4, 16), (9, -60)] if mobile else [(4, 15), (9, -45)]

    def cell(cid, name, i):
        hov = (not mobile) and cid == hovered and i < 13 and cid in WORK_ART
        style = ('flex:0 0 auto;position:relative;box-sizing:border-box;width:' + str(w) + 'px;height:' + str(h) + 'px;display:flex;align-items:center;justify-content:center;padding:' + str(cpad) + 'px;'
                 'border-radius:12px;overflow:hidden;background:#FFFFFF;border:1px solid ' + (LINE2 if hov else LINE) + ';')
        if hov:
            style += ('z-index:5;transform:translateY(-8px) scale(1.12) rotate(' + n_tilt(cid + str(i)) + ');'
                      'box-shadow:0 18px 40px rgba(11,16,32,0.18),0 2px 6px rgba(11,16,32,0.10);')
        return ('<span title="' + name + '" style="' + style + '">'
                '<span style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;opacity:' + ('0' if hov else ('0.8' if mobile else '0.82')) + ';">'
                '<img src="logo-' + cid + '.png" alt="' + name + '" style="max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;"></span>'
                + ('<img src="work-' + cid + '.jpg" alt="" style="position:absolute;inset:0;z-index:2;width:100%;height:100%;object-fit:cover;">' if hov else '') + '</span>')

    rows = ''
    for r, items in enumerate(halves):
        doubled = items + items
        start, off = starts[r]
        left = off - start * (w + gap)
        rows += ('<div style="position:relative;height:' + str(h) + 'px;' + ('margin-top:' + str(gap) + 'px;' if r else '') + '">'
                 '<div style="position:absolute;top:0;left:' + str(left) + 'px;display:flex;gap:' + str(gap) + 'px;width:max-content;">'
                 + ''.join(cell(cid, name, i) for i, (cid, name) in enumerate(doubled)) + '</div>'
                 '<span style="position:absolute;top:0;bottom:0;left:0;width:' + str(fade) + 'px;z-index:2;pointer-events:none;background:linear-gradient(90deg,#FFFFFF,rgba(255,255,255,0));"></span>'
                 '<span style="position:absolute;top:0;bottom:0;right:0;width:' + str(fade) + 'px;z-index:2;pointer-events:none;background:linear-gradient(270deg,#FFFFFF,rgba(255,255,255,0));"></span></div>')
    return ('<section style="background:#FFFFFF;padding:' + str(band) + 'px 0;"><div style="padding:0 ' + str(pad) + 'px;">'
            + _head("Trusted by 25 brands", 'We are not for everyone.<br>' + serif('Just for the ones who ship.'), "Twenty-five brands across B2B, B2C and D2C. Hover any one to see the work.", mobile)
            + '</div><div style="margin-top:' + ('34px' if mobile else '72px') + ';">' + rows + '</div></section>')


def demo():
    return page(logo_wall() + capabilities(), 1440)


def demo_mobile():
    return page(logo_wall(True) + capabilities(True), 390)
