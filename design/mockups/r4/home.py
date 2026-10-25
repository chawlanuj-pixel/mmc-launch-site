"""Round 4 homepage, desktop 1440."""
from base import (page, NAV, footer, ARR_SVG, SUN, BLUE, ON_DARK_2, icon, acc, dot, btn, link, grey, head, arrows, tabs, work_card,
                  faq_list, stats_band, quote_card, video_card, contact, chat_icon)
import approved

LABEL = "Book a strategy call"

NEEDS_D2C = [("chart", "More sales", "Meta, Google and marketplaces"), ("play", "Creative that sells", "Statics, reels and UGC, tested weekly"),
             ("repeat", "Repeat customers", "Email and WhatsApp flows"), ("cart", "A store that converts", "Shopify builds and CRO")]


def selector(open_seg=None):
    """'What are you growing?' pill: two plain questions and a go button."""
    is_open = open_seg is not None
    seg = lambda label, value, filled, active: (
        '<div style="flex:1;align-self:stretch;display:flex;flex-direction:column;justify-content:center;gap:2px;padding:0 24px 0 32px;border-radius:var(--r-pill);'
        + ('background:#FFFFFF;box-shadow:var(--sh-float);' if active else '') + '">'
        '<span class="t-micro">' + label + '</span><span style="font-size:16px;color:' + ('var(--text)' if filled else 'var(--muted)') + ';white-space:nowrap;">' + value + '</span></div>')
    go = ('<span class="rd" style="height:48px;margin:0 8px;background:#FFC528;color:#0F1E5E;gap:8px;' + ('padding:0 18px 0 20px;' if is_open else 'width:48px;') + '">'
          + ('<span style="font-size:14px;font-weight:600;letter-spacing:.02em;text-transform:uppercase;">Show me</span>' if is_open else '') + ARR_SVG + '</span>')
    pill = ('<div style="position:relative;width:620px;height:64px;border-radius:var(--r-pill);display:flex;align-items:center;color:var(--text);background:' + ('rgba(255,255,255,.85)' if is_open else '#FFFFFF') + ';">'
            + seg("I run a", "D2C brand" if is_open else "D2C brand or institute", is_open, open_seg == 1)
            + ('<span style="width:1px;height:32px;background:var(--line);"></span>' if not is_open else '')
            + seg("I need", "More sales, admissions, a site" if not is_open else "Choose what to grow", False, open_seg == 2) + go)
    panel = ''
    if open_seg == 2:
        panel = ('<div style="position:absolute;left:260px;top:76px;width:360px;padding:16px;border-radius:var(--r-sheet);background:#FFFFFF;box-shadow:var(--sh-float);z-index:20;">'
                 + ''.join('<div style="display:flex;align-items:center;gap:16px;height:64px;padding:0 8px;border-radius:var(--r-ctl);' + ('background:var(--tint);' if i == 0 else '') + '">'
                           '<span class="rd" style="width:48px;height:48px;border-radius:var(--r-ctl);background:rgba(29,78,216,.08);color:#1D4ED8;">' + icon(ic) + '</span>'
                           '<div style="display:flex;flex-direction:column;"><span style="font-size:16px;font-weight:600;color:var(--text);">' + t + '</span><span class="t-small muted" style="font-weight:400;">' + s + '</span></div></div>'
                           for i, (ic, t, s) in enumerate(NEEDS_D2C)) + '</div>')
    return '<div style="position:relative;">' + pill + panel + '</div>'


def hero(open_seg=None):
    tiles = ''.join('<span style="position:absolute;left:' + str(x) + 'px;top:' + str(y) + 'px;width:260px;height:480px;border-radius:var(--r-media);overflow:hidden;background:rgba(255,255,255,.08);"><img src="' + im + '" alt="" class="cover"></span>'
                    for im, x, y in [("reel-tgg-4.jpg", 848, 140), ("reel-wa-4.jpg", 1132, 180)])
    return ('<section style="position:relative;height:760px;' + ('' if open_seg else 'overflow:hidden;') + 'background:linear-gradient(180deg,#0F1E5E 0%,#0A1440 100%);color:#FFFFFF;">'
            + tiles + NAV +
            '<div style="position:absolute;left:48px;top:212px;width:720px;display:flex;flex-direction:column;align-items:flex-start;gap:24px;">'
            '<h1 class="t-h1" style="color:#FFFFFF;">Performance marketing that survives the ' + acc('P&amp;L.', SUN) + '</h1>'
            '<p class="t-lead" style="color:' + ON_DARK_2 + ';max-width:540px;">One senior team growing D2C brands and educational institutes, measured on margin and admissions.</p>'
            '<div style="margin-top:8px;">' + selector(open_seg) + '</div>'
            '<span class="t-small" style="color:' + ON_DARK_2 + ';">Rather talk? <span class="link4" style="color:#FFFFFF;font-size:14px;">' + LABEL + '</span></span></div></section>')


def work():
    cards = [("cs-oosh.jpg", ["Website", "Ads"], "OOsh", "D2C", "A storefront and ad engine for a growing personal-care brand.", "Website &#183; Ads &#183; Creative"),
             ("cs-mvj.jpg", ["Website", "Leads"], "MVJ College of Engineering", "Education", "An admissions-first website and campaigns for an engineering college.", "Website &#183; Leads &#183; Social"),
             ("cs-giraffe.jpg", ["CRO", "Quick commerce"], "The Growing Giraffe", "D2C", "Kids&#8217; snacks scaled across the store, Amazon and quick commerce.", "CRO &#183; Ads &#183; Marketplaces"),
             ("cs-sprouts.jpg", ["Website", "Leads"], "Sprouts Edu Tours", "Education", "School trips sold to principals, with a page for every destination.", "Website &#183; Leads &#183; Creative")]
    return ('<section style="padding:128px 48px 0;">' + head("Case studies", 'Our Work' + dot(), "Brands and institutes we have built, launched and grown.")
            + '<div style="margin:32px 0 0 324px;">' + tabs(["All", "D2C brands", "Educational institutes"]) + '</div>'
            '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:48px 24px;margin-top:48px;">'
            + ''.join(work_card(*c, hover=(i == 0)) for i, c in enumerate(cards)) + '</div>'
            '<div style="margin-top:48px;display:flex;justify-content:center;">' + grey("View all projects") + '</div></section>')


def voices():
    return ('<section style="padding:128px 48px 0;">' + head("Reviews", 'Testimonials' + dot(), "In the words of the founders and principals we work with.", right=arrows())
            + '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:48px;">'
            + quote_card("[Founder quote on what changed after MMC took over growth, and why they stayed.]", "[Name]", "[Role], The Growing Giraffe", height=400)
            + quote_card("[Principal quote on this admission season: enquiries, visits and the follow-up.]", "[Name]", "[Role], MVJ College of Engineering", height=400)
            + video_card("reel-tgg-2.jpg", "Creative by MMC", "The Growing Giraffe founder film") + '</div></section>')


def numbers():
    return ('<section style="padding:128px 48px 0;">'
            + stats_band([("&#8377;248", "Cr+", "Revenue compounded"), ("8.7", "&#215;", "Median blended ROAS"), ("14/14", "", "Clients renewed"), ("27", "mo", "Median client tenure")]) + '</section>')


def insights():
    posts = [("work-giraffe.jpg", "D2C", "Break-even ROAS for Indian D2C, with COD and RTO counted"), ("cs-sprouts.jpg", "Education", "The Indian admissions calendar, segment by segment"),
             ("svc-performance.jpg", "Pricing", "What a performance marketing agency costs in India")]
    return ('<section style="padding:128px 48px 0;">' + head("Guides", 'Latest insights' + dot(), "Straight answers for Indian brands and institutes.", right=arrows())
            + '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:48px;">'
            + ''.join('<div style="display:flex;flex-direction:column;gap:12px;"><div style="height:288px;border-radius:var(--r-media);overflow:hidden;background:var(--placeholder);"><img src="' + im + '" alt="" class="cover"></div>'
                      '<span class="t-micro t-up" style="color:#1D4ED8;">' + cat + '</span><span class="t-h3">' + t + '</span></div>' for im, cat, t in posts)
            + '</div></section>')


def questions():
    qs = ["What makes MMC different from other agencies?", "Which services can MMC run for us?", "Do you work on Amazon and quick commerce?",
          "Can you run admissions campaigns for colleges?", "How quickly can we go live?"]
    return ('<section style="padding:128px 48px 0;"><div style="display:grid;grid-template-columns:minmax(0,1fr) 675px;gap:40px;">'
            '<div style="display:flex;flex-direction:column;gap:20px;"><h2 class="t-display">FAQ' + dot() + '</h2><p class="t-lead muted" style="max-width:34ch;">Everything you need to know about working with MMC.</p></div>'
            + faq_list(qs, "We work with two kinds of organisation only, D2C brands and educational institutes, and we are measured on contribution margin and admissions rather than clicks. The strategist you meet on the first call runs your account.")
            + '</div></section>')


def build():
    body = (hero() + approved.logo_wall() + work() + approved.capabilities() + voices() + numbers() + insights() + questions()
            + contact(LABEL) + footer() + chat_icon(680))
    return page(body, 1440)


def selector_state():
    """Hero with the growth selector's second question open."""
    return page(hero(open_seg=2) + '<div style="height:120px;"></div>', 1440)
