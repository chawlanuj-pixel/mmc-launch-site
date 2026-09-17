"""Round 4 mobile artboards (390px): homepage, education, and the booking bottom sheet."""
from base import (page, NAV_M, footer, ARR_SVG, SUN, ON_DARK_2, acc, dot, btn, link, grey, head, work_card, faq_list, stats_band, quote_card,
                  video_card, contact, sticky_bar, icon, avatar, service_panel, seg_toggle, gantt, GANTT_ROWS, field)
import approved


def m_hero(h1_html, sub, action_html, link_html, tiles):
    return ('<section style="position:relative;padding:108px 24px 32px;background:linear-gradient(180deg,#0F1E5E 0%,#0A1440 100%);color:#FFFFFF;">' + NAV_M
            + '<div style="display:flex;flex-direction:column;gap:16px;"><h1 class="t-h1" style="color:#FFFFFF;">' + h1_html + '</h1>'
            '<p class="t-lead" style="color:' + ON_DARK_2 + ';">' + sub + '</p>'
            '<div style="margin-top:8px;">' + action_html + '</div>' + link_html + '</div>'
            '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:32px;">'
            + ''.join('<span style="display:block;height:220px;border-radius:var(--r-media);overflow:hidden;background:rgba(255,255,255,.08);"><img src="' + im + '" alt="" class="cover"></span>' for im in tiles)
            + '</div></section>')


def m_selector():
    return ('<div style="display:flex;align-items:center;gap:12px;height:56px;padding:0 8px 0 24px;border-radius:var(--r-pill);background:#FFFFFF;color:var(--text);box-shadow:var(--sh-float);">'
            '<div style="flex:1;display:flex;flex-direction:column;"><span style="font-size:14px;font-weight:600;">What are you growing?</span><span class="t-micro muted" style="font-weight:500;">D2C brand or institute &#183; Your goal</span></div>'
            '<span class="rd" style="width:40px;height:40px;background:#FFC528;color:#0F1E5E;">' + ARR_SVG + '</span></div>')


def m_row(title_html, sub, items_html, after=""):
    return ('<section style="padding:72px 0 0;"><div style="padding:0 24px;">' + head("", title_html, sub, mobile=True) + '</div>'
            '<div style="display:flex;gap:12px;padding:32px 0 0 24px;overflow:hidden;">' + items_html + '</div>'
            + ('<div style="padding:24px 24px 0;">' + after + '</div>' if after else '') + '</section>')


def m_work(cards, title="Our Work", sub="Brands and institutes we have built, launched and grown."):
    return m_row(title + dot(), sub,
                 ''.join(work_card(img, tg, brand, aud, l2, img_h=225, width=300) for img, tg, brand, aud, l2 in cards), grey("View all projects", full=True))


def m_faq(qs, answer, sub):
    return ('<section style="padding:72px 24px 0;display:flex;flex-direction:column;gap:32px;">' + head("", 'FAQ' + dot(), sub, mobile=True)
            + faq_list(qs, answer, open_first=False) + '</section>')


def home():
    hero = m_hero('Performance marketing that survives the ' + acc('P&amp;L.', SUN),
                  "One senior team growing D2C brands and educational institutes, measured on margin and admissions.",
                  m_selector(), '<span class="t-small" style="color:' + ON_DARK_2 + ';">Rather talk? <span class="link4" style="color:#FFFFFF;font-size:14px;">Book a strategy call</span></span>',
                  ["reel-tgg-4.jpg", "reel-wa-4.jpg"])
    work = m_work([("cs-oosh.jpg", ["Website", "Ads"], "OOsh", "D2C", "Store and ads for personal care."),
                   ("cs-mvj.jpg", ["Website", "Leads"], "MVJ College", "Education", "Admissions-first site for a college."),
                   ("cs-giraffe.jpg", ["CRO", "Quick commerce"], "The Growing Giraffe", "D2C", "Snacks scaled into quick commerce."),
                   ("cs-sprouts.jpg", ["Website", "Leads"], "Sprouts Edu Tours", "Education", "School trips sold to principals.")])
    voices = m_row('<span style="font-size:44px;">Testimonials' + dot() + '</span>', "From the founders and principals we work with.",
                   '<div style="width:300px;flex:none;">' + quote_card("[Founder quote on what changed after MMC took over growth.]", "[Name]", "[Role], The Growing Giraffe", height=320, pad=24) + '</div>'
                   '<div style="width:300px;flex:none;">' + video_card("reel-tgg-2.jpg", "Creative by MMC", "The Growing Giraffe founder film", height=320) + '</div>')
    stats = '<section style="padding:72px 12px 0;">' + stats_band([("&#8377;248", "Cr+", "Revenue compounded"), ("8.7", "&#215;", "Median blended ROAS"), ("14/14", "", "Clients renewed"), ("27", "mo", "Median tenure")], mobile=True) + '</section>'
    posts = [("work-giraffe.jpg", "D2C", "Break-even ROAS for Indian D2C, with COD and RTO counted"), ("cs-sprouts.jpg", "Education", "The Indian admissions calendar, segment by segment"),
             ("svc-performance.jpg", "Pricing", "What a performance marketing agency costs in India")]
    insights = m_row('<span style="font-size:44px;">Latest insights' + dot() + '</span>', "Straight answers for Indian brands and institutes.",
                     ''.join('<div style="width:260px;flex:none;display:flex;flex-direction:column;gap:10px;"><span style="display:block;height:173px;border-radius:var(--r-media);overflow:hidden;background:var(--placeholder);"><img src="' + im + '" alt="" class="cover"></span>'
                             '<span class="t-micro t-up" style="color:#1D4ED8;">' + c + '</span><span class="t-h3">' + t + '</span></div>' for im, c, t in posts))
    faq = m_faq(["What makes MMC different from other agencies?", "Which services can MMC run for us?", "Do you work on Amazon and quick commerce?", "How quickly can we go live?"],
                "", "Everything you need to know about working with MMC.")
    body = (hero + approved.logo_wall(True) + work + approved.capabilities(True) + voices + stats + insights + faq
            + contact("Book a strategy call", mobile=True) + footer(mobile=True) + sticky_bar("Book a strategy call", 1612))
    return page(body, 390, mobile=True)


def education():
    hero = m_hero('Every seat, filled with the right ' + acc('student.', SUN),
                  "Admissions campaigns, enquiry-first websites and WhatsApp follow-up, reported in admissions.",
                  btn("Plan my season", "white", full=True), link("See education work", dark=True), ["work-mvj.jpg", "work-sprouts.jpg"])
    segs = ["All institutes", "K-12 schools", "Colleges", "Coaching", "Skilling", "Study abroad"]
    segment_bar = ('<div style="position:sticky;top:76px;z-index:40;height:64px;background:#FFFFFF;border-bottom:1px solid var(--line);display:flex;align-items:center;gap:8px;padding-left:24px;overflow:hidden;">'
                   + ''.join('<span class="t-small" style="flex:none;display:inline-flex;align-items:center;height:40px;padding:0 16px;border-radius:var(--r-pill);font-weight:600;'
                             + ('background:#0F1E5E;color:#FFFFFF;' if i == 0 else 'border:1px solid var(--line);color:var(--text);') + '">' + s + '</span>' for i, s in enumerate(segs)) + '</div>')
    work = m_work([("cs-mvj.jpg", ["Website", "Leads"], "MVJ College", "College", "Admissions-first site for a college."),
                   ("cs-sprouts.jpg", ["Website", "Leads"], "Sprouts Edu Tours", "Travel", "A page for every school trip."),
                   ("work-bloom.jpg", ["Selling to schools"], "Bloom Edutours", "Schools", "Tours sold to principals.")], sub="Built for the families who choose, and the schools that buy.")
    services = service_panel("What we run", 'Services' + dot(), "In the order a family decides.", [
        ("Ad", "Admissions campaigns", "", []), ("Landing page", "Websites &amp; program pages", "", []), ("First reply", "WhatsApp &amp; CRM follow-up", "", []),
        ("Counsellor call", "Counsellor enablement", "", []), ("Campus visit", "Campus films &amp; creative", "", []), ("Fee paid", "Search &amp; reputation", "", [])], mobile=True)
    plan = ('<section style="padding:72px 12px 0;"><div class="card4" style="padding:32px 20px 20px;">' + head("", 'Plan' + dot(), "Spend when families decide.", mobile=True)
            + '<div style="margin:24px 0 16px;">' + seg_toggle(["Season calendar", "Cost per admission"], width=154) + '</div>'
            + '<span class="t-small muted" style="display:block;margin-bottom:8px;">Sample: undergraduate intake</span>' + gantt(GANTT_ROWS, mobile=True) + '</div></section>')
    voices = m_row('<span style="font-size:44px;">Testimonials' + dot() + '</span>', "From the principals and trustees we work with.",
                   '<div style="width:300px;flex:none;">' + video_card("cs-mvj.jpg", "From an institute head", "[Principal or trustee video]", height=320) + '</div>'
                   '<div style="width:300px;flex:none;">' + quote_card("[Quote from a principal on what changed this admission season.]", "[Name]", "[Role], [Institute]", height=320, pad=24) + '</div>')
    faq = m_faq(["How do you handle consent, calling hours and claims?", "How early before admission season should we start?", "Do you work inside our CRM, such as Meritto?", "Can you run campaigns in regional languages?"],
                "", "What institutes ask before the season starts.")
    roles = ["Chairman or trustee", "Principal or director", "Admissions head", "Marketing head"]
    enquiry = ('<section style="padding:72px 24px 72px;display:flex;flex-direction:column;gap:24px;">' + head("", '<span style="font-size:50px;">Fill next year&#8217;s seats' + dot() + '</span>', "A senior strategist maps your calendar, funnel and budget.", mobile=True)
               + '<div style="display:flex;flex-direction:column;gap:10px;"><span class="t-small muted">I am the</span><div style="display:flex;flex-wrap:wrap;gap:8px;">'
               + ''.join('<span class="t-small" style="display:inline-flex;align-items:center;height:40px;padding:0 14px;border-radius:var(--r-pill);font-weight:600;' + ('background:#0F1E5E;color:#FFFFFF;' if i == 1 else 'border:1px solid var(--line);') + '">' + r + '</span>' for i, r in enumerate(roles))
               + '</div></div><div style="display:flex;flex-direction:column;gap:24px;">' + field("Institute and city", "Institute, city") + field("Segment", "College or university") + field("Phone (WhatsApp)", "+91") + field("Email", "you@institute.edu") + '</div>'
               + btn("Plan my season", "ink", full=True) + '</section>')
    body = (hero + segment_bar + work + services + plan + voices + faq + enquiry + footer(mobile=True) + sticky_bar("Plan my season", 1612))
    return page(body, 390, mobile=True)


def booking_sheet():
    """'Book a call' opened as a bottom sheet over the homepage."""
    days = [("Wed", "14"), ("Thu", "15"), ("Fri", "16"), ("Mon", "19"), ("Tue", "20")]
    under = m_hero('Performance marketing that survives the ' + acc('P&amp;L.', SUN), "One senior team growing D2C brands and educational institutes.", m_selector(), "", ["reel-tgg-4.jpg", "reel-wa-4.jpg"])
    sheet = ('<div style="position:absolute;left:0;right:0;bottom:0;border-radius:var(--r-sheet) var(--r-sheet) 0 0;background:#FFFFFF;box-shadow:var(--sh-overlay);z-index:100;">'
             '<div style="display:flex;justify-content:center;padding-top:8px;"><span style="width:40px;height:4px;border-radius:2px;background:var(--line);"></span></div>'
             '<div style="position:relative;height:56px;display:flex;align-items:center;justify-content:center;"><span style="font-size:16px;font-weight:600;">Book a strategy call</span>'
             '<span class="rd" style="position:absolute;left:24px;top:10px;width:36px;height:36px;border:1px solid var(--line);">' + icon("close", 16, 2) + '</span></div>'
             '<div style="padding:8px 24px 24px;display:flex;flex-direction:column;gap:20px;border-top:1px solid var(--line);">'
             '<div style="display:flex;justify-content:space-between;align-items:center;padding-top:12px;"><span class="t-h3" style="font-size:16px;">October 2026</span><span class="t-small muted">30 minutes &#183; IST</span></div>'
             '<div style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;">'
             + ''.join('<span style="display:flex;flex-direction:column;align-items:center;gap:2px;padding:10px 0;border-radius:var(--r-ctl);' + ('background:#0F1E5E;color:#FFFFFF;' if n == "16" else 'border:1px solid var(--line);') + '"><span class="t-micro" style="opacity:.7;">' + d + '</span><span style="font-size:18px;font-weight:600;">' + n + '</span></span>' for d, n in days)
             + '</div><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;">'
             + ''.join('<span style="height:48px;border-radius:var(--r-ctl);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:500;' + ('background:#0F1E5E;color:#FFFFFF;' if t == "15:30" else 'border:1px solid var(--line);') + '">' + t + '</span>' for t in ["10:30", "12:00", "15:30", "17:00"])
             + '</div>' + field("Mobile number", "+91") + '</div>'
             '<div style="height:76px;padding:12px 24px;border-top:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;gap:16px;">'
             '<span class="t-body" style="font-weight:500;text-decoration:underline;text-underline-offset:4px;">Clear</span>' + btn("Confirm 15:30", "ink") + '</div></div>')
    body = ('<div style="position:relative;height:844px;overflow:hidden;">' + under
            + '<div style="position:absolute;inset:0;background:var(--scrim);z-index:99;"></div>' + sheet + '</div>')
    return page(body, 390, mobile=True)
