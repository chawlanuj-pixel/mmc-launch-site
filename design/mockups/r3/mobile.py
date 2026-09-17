"""Round 3 mobile artboards (390px): homepage and education landing page."""
from base import page, NAV_M, footer, ARR_SVG, em, tags, chat_bubble, faq, SUN

MUTED_D = "rgba(255,255,255,0.72)"


def mbtn(label, kind="ink"):
    return '<span class="x-btn x-btn-' + kind + '" style="width:100%;justify-content:space-between;">' + label + '<span class="sq">' + ARR_SVG + '</span></span>'


def mline(label, dark_ground=True):
    return '<span class="x-btn ' + ('x-btn-line' if dark_ground else 'x-btn-line-dark') + '" style="width:100%;justify-content:center;">' + label + '</span>'


def mhead(label, title, sub="", dark=False, size=58):
    c = "#FFFFFF" if dark else "#0E1626"
    return ('<div class="x" style="display:flex;flex-direction:column;gap:14px;">'
            + ('<span style="font-size:14px;font-weight:500;letter-spacing:-0.03em;color:' + ("rgba(255,255,255,0.75)" if dark else "#4F5A6B") + ';">' + label + '</span>' if label else '')
            + '<h2 style="margin:0;font-weight:600;font-size:' + str(size) + 'px;line-height:0.95;letter-spacing:-0.075em;color:' + c + ';">' + title + '</h2>'
            + ('<p style="margin:0;font-size:16px;font-weight:500;line-height:1.4;letter-spacing:-0.03em;color:' + c + ';">' + sub + '</p>' if sub else '') + '</div>')


def m_hero(pill, h1, sub, cta, cta2, tiles, card):
    tile_html = ''.join('<span style="position:absolute;left:' + str(x) + 'px;top:' + str(y) + 'px;width:170px;height:290px;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,0.12);box-shadow:0 30px 60px -30px rgba(0,0,0,0.9);"><img src="' + im + '" alt="" class="cover"></span>'
                        for im, x, y in zip(tiles, [0, 188], [0, 34]))
    return ('<section class="x" style="position:relative;padding:112px 16px 40px;overflow:hidden;background:linear-gradient(180deg,#0F1E5E 0%,#0A1440 60%,#070E2A 100%);color:#FFFFFF;">' + NAV_M
            + '<div style="display:flex;flex-direction:column;align-items:flex-start;">'
            '<span style="display:inline-flex;align-items:center;height:22px;padding:0 10px;border-radius:20px;background:rgba(255,255,255,0.15);font-size:10px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;">' + pill + '</span>'
            '<h1 style="margin:16px 0 0;font-weight:600;font-size:44px;line-height:1.02;letter-spacing:-0.055em;">' + h1 + '</h1>'
            '<p style="margin:18px 0 0;font-size:15px;line-height:1.5;color:rgba(250,250,250,0.82);">' + sub + '</p>'
            '<div style="display:flex;flex-direction:column;gap:10px;width:100%;margin-top:26px;">' + mbtn(cta, "white") + mline(cta2) + '</div></div>'
            '<div style="position:relative;height:430px;margin-top:36px;">' + tile_html + card + '</div></section>')


def m_services(label, sub, rows):
    out = ''.join('<div class="x" style="padding:28px 0;border-top:1px solid rgba(255,255,255,0.14);display:flex;flex-direction:column;gap:12px;">'
                  '<div style="display:flex;justify-content:space-between;align-items:center;"><span style="display:flex;align-items:baseline;gap:14px;"><span style="font-size:14px;font-weight:500;color:rgba(255,255,255,0.8);">0' + str(i + 1) + '</span>'
                  '<span class="x-em" style="font-size:32px;line-height:1;color:#FFC528;">' + m + '</span></span><span class="x-round" style="width:40px;height:40px;border:1px solid rgba(255,255,255,0.35);color:#FFFFFF;">' + ARR_SVG + '</span></div>'
                  '<span style="font-size:24px;font-weight:500;line-height:1.2;letter-spacing:-0.04em;color:#FFFFFF;">' + t + '</span>'
                  '<span style="font-size:15px;font-weight:500;line-height:1.45;letter-spacing:-0.03em;color:' + MUTED_D + ';">' + d + '</span>'
                  '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:4px;">' + ''.join('<span class="x-chip">' + c + '</span>' for c in chips) + '</div></div>' for i, (m, t, d, chips) in enumerate(rows))
    return ('<section style="padding:80px 8px 0;"><div class="x-panel" style="padding:56px 16px 12px;border-radius:16px;"><div class="x-grid"></div>'
            + mhead(label, 'Services' + em('.', SUN), sub, dark=True) + '<div style="margin-top:36px;">' + out + '</div></div></section>')


def m_work_card(img, tg, desc, aud, ran):
    return ('<div class="x" style="display:flex;flex-direction:column;gap:14px;"><div style="position:relative;height:250px;border-radius:14px;overflow:hidden;"><img src="' + img + '" alt="" class="cover">'
            '<div style="position:absolute;left:10px;top:10px;right:10px;">' + tags(tg) + '</div></div>'
            '<p style="margin:0;font-size:18px;font-weight:500;line-height:1.3;letter-spacing:-0.035em;color:#0E1626;">' + desc + '</p>'
            '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;"><div style="display:flex;flex-direction:column;gap:3px;"><span style="font-size:12px;color:#4F5A6B;">Audience</span><span style="font-size:16px;font-weight:600;letter-spacing:-0.03em;color:#0E1626;">' + aud + '</span></div>'
            '<div style="display:flex;flex-direction:column;gap:3px;"><span style="font-size:12px;color:#4F5A6B;">What we ran</span><span style="font-size:16px;font-weight:600;letter-spacing:-0.03em;color:#0E1626;">' + ran + '</span></div></div>'
            '<span style="display:flex;align-items:center;justify-content:center;height:42px;border-radius:4px;background:#0F1E5E;color:#FFFFFF;font-size:12px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;">View project</span></div>')


def m_stats(items):
    return ('<section style="padding:80px 16px 0;"><div class="x-panel" style="padding:44px 16px 48px;border-radius:16px;"><div class="x-grid"></div>'
            '<div class="x" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:36px 10px;text-align:center;">'
            + ''.join('<div style="display:flex;flex-direction:column;align-items:center;gap:10px;"><span style="font-weight:600;font-size:50px;line-height:1;letter-spacing:-0.05em;color:#FFFFFF;">' + n + '<span style="color:#FFC528;font-size:0.5em;margin-left:2px;">' + s + '</span></span>'
                      '<span style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;line-height:1.35;color:rgba(255,255,255,0.7);">' + l + '</span></div>' for n, s, l in items)
            + '</div></div></section>')


def m_faq(qs, answer, sub, cta):
    return ('<section class="x" style="padding:80px 16px 0;display:flex;flex-direction:column;gap:28px;">' + mhead("", 'FAQ' + em('.', SUN), sub)
            + faq(qs, answer) + '<div style="display:flex;flex-direction:column;gap:12px;"><span style="font-size:15px;font-weight:500;color:#0E1626;">Still unsure?</span>' + mbtn(cta, "ink") + '</div></section>')


def m_field(label, ph):
    return ('<div style="display:flex;flex-direction:column;gap:10px;padding-bottom:12px;border-bottom:1px solid rgba(15,30,94,0.25);">'
            '<span style="font-size:13px;font-weight:500;letter-spacing:-0.03em;color:#0E1626;">' + label + '</span><span style="font-size:16px;font-weight:500;letter-spacing:-0.03em;color:#9AA3B2;">' + ph + '</span></div>')


def m_video(img, kicker, title):
    return ('<div style="position:relative;height:400px;border-radius:14px;overflow:hidden;color:#FFFFFF;"><img src="' + img + '" alt="" class="cover" style="position:absolute;inset:0;">'
            '<div style="position:absolute;inset:0;background:linear-gradient(0deg,rgba(7,14,42,0.92),rgba(7,14,42,0.1) 60%);"></div>'
            '<span class="x-round" style="position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);width:68px;height:68px;background:#FFC528;"><span style="width:0;height:0;border-top:10px solid transparent;border-bottom:10px solid transparent;border-left:16px solid #0F1E5E;margin-left:4px;"></span></span>'
            '<div class="x" style="position:absolute;left:20px;right:20px;bottom:20px;display:flex;flex-direction:column;gap:4px;"><span style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#FFC528;">' + kicker + '</span><span style="font-size:19px;font-weight:600;letter-spacing:-0.03em;">' + title + '</span></div></div>')


def m_quote(quote, who, role, logos):
    return ('<div class="x-card x" style="padding:26px 22px;display:flex;flex-direction:column;gap:18px;">'
            '<span class="x-em" style="font-size:72px;line-height:0.5;color:#FFC528;height:28px;">&#8220;</span>'
            '<p style="margin:0;font-size:24px;font-weight:500;line-height:1.22;letter-spacing:-0.045em;color:#0E1626;">' + quote + '</p>'
            '<div style="display:flex;justify-content:space-between;align-items:end;gap:12px;padding-top:18px;border-top:1px solid rgba(15,30,94,0.08);"><div><div style="font-size:17px;font-weight:600;letter-spacing:-0.04em;">' + who + '</div><div style="font-size:12.5px;color:#4F5A6B;">' + role + '</div></div>'
            '<div style="display:flex;gap:12px;align-items:center;">' + ''.join('<img src="logo-' + n + '.png" alt="" style="height:24px;width:auto;">' for n in logos) + '</div></div></div>')


# ── Homepage ────────────────────────────────────────────────────────────────
def home():
    card = ('<div class="x" style="position:absolute;left:44px;top:236px;width:250px;padding:16px 16px 14px;border-radius:12px;border:1px solid rgba(255,255,255,0.28);background:linear-gradient(160deg,rgba(29,78,216,0.97),rgba(15,30,94,0.97));box-shadow:0 30px 60px -24px rgba(0,0,0,0.85);">'
            '<div style="display:flex;align-items:center;gap:8px;font-size:10.5px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:rgba(255,255,255,0.75);"><img src="mmc-mark.png" alt="" style="width:16px;height:16px;object-fit:contain;filter:brightness(0) invert(1);">Across the client book</div>'
            '<div style="margin-top:10px;font-weight:600;font-size:46px;line-height:1;letter-spacing:-0.05em;">&#8377;248<span style="color:#FFC528;font-size:0.55em;">Cr+</span></div>'
            '<div style="margin-top:8px;font-size:13px;line-height:1.45;color:rgba(255,255,255,0.8);">revenue compounded for clients since 2019. <span style="color:#FFC528;border-bottom:1px solid #FFC528;font-weight:600;">Explore the work</span></div></div>')
    hero = m_hero("Profit-first growth studio", 'Performance marketing that survives the ' + em('P&amp;L.', SUN),
                  "We grow D2C brands and educational institutes through performance media, creative, retention and technology, run by one senior team and measured on margin and admissions.",
                  "Book a strategy call", "See our work", ["reel-tgg-4.jpg", "reel-wa-4.jpg"], card)

    names = ["giraffe", "oosh", "lepure", "mvj", "notic", "sprnt", "mbb", "vagakids"]
    logos = ('<section class="x" style="padding:36px 16px 0;"><div style="display:flex;flex-direction:column;gap:4px;"><span style="font-size:13px;color:#4F5A6B;">Selected work</span><span style="font-size:20px;font-weight:600;letter-spacing:-0.04em;color:#0E1626;">Impact created for</span></div>'
             '<div style="display:flex;gap:34px;align-items:center;margin-top:18px;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,#000 80%,transparent);mask-image:linear-gradient(90deg,#000 80%,transparent);">'
             + ''.join('<img src="logo-' + n + '.png" alt="' + n + '" style="height:34px;width:auto;flex:none;">' for n in names) + '</div></section>')

    work = ('<section style="padding:72px 16px 0;display:flex;flex-direction:column;gap:36px;">' + mhead("", 'Our Work' + em('.', SUN), "Brands and institutes we have built, launched and grown.")
            + m_work_card("cs-oosh.jpg", ["Website", "Performance ads", "Creative"], "An e-commerce storefront and performance engine for a growing personal-care brand.", "D2C brand", "Website &#183; Ads &#183; Creative")
            + m_work_card("cs-mvj.jpg", ["Website", "Lead generation", "Social"], "An admissions-first website and campaigns for an autonomous engineering college.", "Institute", "Website &#183; Leads &#183; Social")
            + m_work_card("cs-giraffe.jpg", ["CRO", "Performance ads", "Quick commerce"], "Kids&#8217; snacks scaled across the brand store, Amazon and quick commerce.", "D2C brand", "CRO &#183; Ads &#183; Marketplaces")
            + mline("View all projects", dark_ground=False) + '</section>')

    services = m_services("What we do", "One senior team. The entire growth lifecycle.", [
        ("Media", "Performance media", "Meta, Google, YouTube, Amazon and quick commerce, budgeted on contribution margin.", ["Meta Ads", "Google Ads", "Amazon Ads", "Quick commerce"]),
        ("Creative", "Creative &amp; UGC", "Statics, reels, creator content and packaging, produced and tested every week.", ["Performance creative", "UGC", "Reels"]),
        ("Retention", "Retention &amp; follow-up", "Email and WhatsApp journeys that bring customers back and turn enquiries into visits.", ["Email flows", "WhatsApp", "CRM"]),
        ("Tech", "Conversion &amp; technology", "Shopify storefronts, landing pages, CRO and tracking that make every rupee count.", ["Shopify", "Landing pages", "CRO"]),
        ("Admissions", "Admissions marketing", "Enquiry-first websites, campaigns and counsellor follow-up for educational institutes.", ["Lead generation", "Websites", "Counselling"])])

    def panel(img, eyebrow, title, chips, cta):
        return ('<div style="position:relative;height:470px;border-radius:14px;overflow:hidden;color:#FFFFFF;"><img src="' + img + '" alt="" class="cover" style="position:absolute;inset:0;">'
                '<div style="position:absolute;inset:0;background:linear-gradient(0deg,rgba(7,14,42,0.97) 0%,rgba(7,14,42,0.9) 50%,rgba(7,14,42,0.1) 82%);"></div>'
                '<div class="x" style="position:absolute;left:18px;right:18px;bottom:18px;display:flex;flex-direction:column;gap:14px;">'
                '<span style="align-self:flex-start;display:inline-flex;height:22px;align-items:center;padding:0 10px;border-radius:20px;background:rgba(255,255,255,0.16);font-size:10px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;">' + eyebrow + '</span>'
                '<span style="font-size:34px;font-weight:600;line-height:1.02;letter-spacing:-0.05em;">' + title + '</span>'
                '<div style="display:flex;flex-wrap:wrap;gap:8px;">' + ''.join('<span class="x-chip">' + c + '</span>' for c in chips) + '</div>' + mbtn(cta, "white") + '</div></div>')
    focus = ('<section style="padding:80px 16px 0;display:flex;flex-direction:column;gap:14px;"><div style="margin-bottom:22px;">' + mhead("Who we grow", 'Focus' + em('.', SUN), "D2C brands and educational institutes. Nothing else.") + '</div>'
             + panel("cs-mbb.jpg", "For D2C brands", 'Grow the brand, keep the ' + em('margin.', SUN), ["Meta &amp; Google", "Amazon", "Shopify", "Retention"], "Explore D2C growth")
             + panel("cs-mvj.jpg", "For educational institutes", 'Fill every seat with the ' + em('right', SUN) + ' student.', ["Admissions", "Websites", "WhatsApp"], "Explore admissions") + '</section>')

    stats = m_stats([("&#8377;248", "Cr+", "Revenue compounded"), ("8.7", "&#215;", "Median blended ROAS"), ("14/14", "", "Clients renewed"), ("27", "mo", "Median client tenure")])

    days = [("Mon", "13"), ("Tue", "14"), ("Wed", "15"), ("Thu", "16"), ("Fri", "17")]
    talk = ('<section class="x" style="padding:80px 16px 0;display:flex;flex-direction:column;gap:24px;">'
            '<h2 style="margin:0;font-size:38px;font-weight:600;line-height:1.08;letter-spacing:-0.04em;color:#0E1626;">Your numbers. Our senior team. <span style="color:#1D4ED8;">Let&#8217;s talk.</span></h2>'
            '<p style="margin:-8px 0 0;font-size:15px;font-weight:500;color:#0E1626;">Book a free 30-minute strategy call today.</p>'
            '<div class="x-card" style="padding:20px 16px;border:1px solid rgba(15,30,94,0.08);box-shadow:0 30px 70px -40px rgba(7,14,42,0.35);display:flex;flex-direction:column;gap:16px;">'
            '<div style="display:flex;justify-content:space-between;align-items:center;"><span style="font-size:16px;font-weight:600;letter-spacing:-0.03em;">October 2026</span><span style="display:flex;gap:6px;"><span class="x-round" style="width:30px;height:30px;color:#4F5A6B;transform:scaleX(-1);">' + ARR_SVG + '</span><span class="x-round" style="width:30px;height:30px;background:#E3EAFC;color:#1D4ED8;">' + ARR_SVG + '</span></span></div>'
            '<div style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px;">'
            + ''.join('<span style="display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 0;border-radius:10px;' + ('background:#1D4ED8;color:#FFFFFF;' if n == "16" else 'border:1px solid rgba(15,30,94,0.12);color:#0E1626;') + '"><span style="font-size:11px;font-weight:600;letter-spacing:0.04em;opacity:0.75;">' + d + '</span><span style="font-size:18px;font-weight:600;">' + n + '</span></span>' for d, n in days)
            + '</div><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;">'
            + ''.join('<span style="height:42px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;' + ('background:#0F1E5E;color:#FFFFFF;' if t == "15:30" else 'border:1px solid rgba(15,30,94,0.2);color:#0E1626;') + '">' + t + '</span>' for t in ["10:30", "12:00", "15:30", "17:00"])
            + '</div>' + mbtn("Schedule consultation", "ink") + '</div></section>')

    voices = ('<section style="padding:80px 16px 0;display:flex;flex-direction:column;gap:14px;"><div style="margin-bottom:22px;">' + mhead("Reviews", 'Testimonials' + em('.', SUN), "In the words of the founders and principals we work with.", size=46) + '</div>'
              + m_quote("[Client quote about working with MMC: what changed, and why they stayed.]", "[Name]", "[Role], The Growing Giraffe", ["giraffe"])
              + m_video("reel-tgg-2.jpg", "Creative by MMC", "The Growing Giraffe founder film") + '</section>')

    questions = m_faq(["What makes MMC different from other performance agencies?", "Which services can MMC run for us?", "Do you work on Amazon and quick commerce?", "Can you run admissions campaigns?", "How quickly can we go live?"],
                      "We work with two kinds of organisation only, D2C brands and educational institutes, and we are measured on contribution margin and admissions rather than clicks.",
                      "Everything you need to know about working with MMC.", "Let us know")

    contact = ('<section class="x" style="padding:80px 16px 72px;display:flex;flex-direction:column;gap:30px;">' + mhead("", 'Get in<br>touch' + em('.', SUN), "Your brand is unique. So is your growth plan.")
               + '<div style="display:flex;gap:22px;align-items:flex-end;"><div style="display:flex;flex-direction:column;gap:4px;"><span style="font-size:11px;color:#4F5A6B;">Let&#8217;s talk</span><span style="font-size:24px;font-weight:600;letter-spacing:-0.05em;padding-bottom:8px;border-bottom:3px solid #1D4ED8;">project</span></div>'
               '<div style="display:flex;flex-direction:column;gap:4px;"><span style="font-size:11px;color:#9AA3B2;">Schedule a</span><span style="font-size:24px;font-weight:600;letter-spacing:-0.05em;color:#B6BCC8;padding-bottom:11px;">strategy call &#8599;</span></div></div>'
               '<div style="display:flex;flex-direction:column;gap:26px;">' + m_field("Full name *", "Your full name") + m_field("Mobile number *", "+91") + m_field("You are a *", "D2C brand or educational institute") + m_field("Tell us about your goals *", "What should the next two quarters look like?") + '</div>'
               + mbtn("Submit request", "ink") + '</section>')

    body = hero + logos + work + services + focus + stats + talk + voices + questions + contact + footer(mobile=True) + chat_bubble(596, 16, label=False)
    return page(body, 390)


# ── Education ───────────────────────────────────────────────────────────────
def education():
    funnel = [("Enquiries", "3,240", 100), ("Counselling calls", "1,610", 50), ("Campus visits", "486", 15), ("Applications", "262", 8), ("Admissions", "118", 3.6)]
    card = ('<div class="x" style="position:absolute;left:22px;top:150px;width:314px;padding:16px;border-radius:12px;background:#FFFFFF;color:#0E1626;box-shadow:0 40px 80px -30px rgba(0,0,0,0.8);">'
            '<div style="display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:10px;border-bottom:1px solid rgba(15,30,94,0.1);"><div><div style="font-size:15px;font-weight:600;letter-spacing:-0.03em;">Admission season tracker</div><div style="font-size:11px;color:#4F5A6B;margin-top:2px;">B.Tech intake &#183; week 14</div></div>'
            '<span style="font-size:9px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4F5A6B;border:1px dashed rgba(15,30,94,0.3);border-radius:20px;padding:2px 7px;">Sample</span></div>'
            '<div style="display:flex;flex-direction:column;gap:10px;padding:12px 0 10px;">'
            + ''.join('<div style="display:grid;grid-template-columns:104px minmax(0,1fr) 40px;gap:8px;align-items:center;"><span style="font-size:11.5px;color:#4F5A6B;">' + l + '</span>'
                      '<span style="height:7px;border-radius:6px;background:#EEF2FB;overflow:hidden;display:block;"><span style="display:block;height:100%;width:' + str(max(w, 4)) + '%;border-radius:6px;background:' + ('#FFC528' if l == "Admissions" else '#1D4ED8') + ';"></span></span>'
                      '<span style="font-size:12.5px;font-weight:600;text-align:right;">' + v + '</span></div>' for l, v, w in funnel)
            + '</div><div style="display:flex;justify-content:space-between;align-items:baseline;padding-top:10px;border-top:1px solid rgba(15,30,94,0.1);"><span style="font-size:12px;color:#4F5A6B;">Cost per admission</span><span style="font-size:20px;font-weight:600;letter-spacing:-0.04em;">&#8377;11,400</span></div></div>')
    hero = m_hero("For schools, colleges &amp; coaching", 'Every seat, filled with the right ' + em('student.', SUN),
                  "Admissions campaigns, enquiry-first websites and WhatsApp follow-up, run by one senior team and reported in enquiries, visits and admissions.",
                  "Plan my admission season", "See education work", ["work-mvj.jpg", "work-sprouts.jpg"], card)

    segs = ["Colleges &amp; universities", "K-12 schools", "Coaching &amp; test prep", "Skilling &amp; vocational", "Study abroad", "Selling to schools"]
    segments = ('<section class="x" style="padding:32px 16px 0;"><span style="font-size:13px;color:#4F5A6B;">Choose your institute</span>'
                '<div style="display:flex;gap:8px;margin:12px -16px 0 0;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,#000 78%,transparent);mask-image:linear-gradient(90deg,#000 78%,transparent);">'
                + ''.join('<span style="flex:none;display:inline-flex;align-items:center;height:40px;padding:0 16px;border-radius:50px;font-size:14px;font-weight:600;letter-spacing:-0.03em;white-space:nowrap;' + ('background:#0F1E5E;color:#FFFFFF;' if i == 0 else 'background:#FFFFFF;color:#0E1626;border:1px solid rgba(15,30,94,0.12);') + '">' + s + '</span>' for i, s in enumerate(segs))
                + '</div></section>')

    steps = [("Ad", "Reaches families outside your catchment, or for the wrong course.", "Cost per enquiry"), ("Landing page", "Fees, eligibility and placements missing, so visitors leave.", "Enquiry rate"),
             ("First reply", "The enquiry waits hours for a reply while others call first.", "Time to first reply"), ("Counsellor call", "One call, no follow-up plan, no notes on what the family asked.", "Calls connected"),
             ("Campus visit", "Booked, but never confirmed, reminded or followed up.", "Visits confirmed"), ("Fee paid", "Applications stall at documents and fees without a nudge.", "Admissions")]
    journey = ('<section style="padding:72px 16px 0;">' + mhead("The admissions journey", 'Journey' + em('.', SUN), "Most seats are lost after the enquiry. We run the whole path.")
               + '<div style="position:relative;margin-top:30px;"><div style="position:absolute;left:16px;top:18px;bottom:40px;width:2px;background:linear-gradient(180deg,#1D4ED8,#FFC528);"></div>'
               + ''.join('<div class="x" style="position:relative;display:grid;grid-template-columns:34px minmax(0,1fr);gap:14px;padding-bottom:14px;">'
                         '<span style="width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;' + ('background:#FFC528;color:#0F1E5E;' if i == 5 else 'background:#0F1E5E;color:#FFFFFF;') + '">' + str(i + 1) + '</span>'
                         '<div class="x-card" style="padding:16px 18px;display:flex;flex-direction:column;gap:6px;"><span style="font-size:20px;font-weight:600;letter-spacing:-0.045em;color:#0E1626;">' + t + '</span><span style="font-size:14.5px;line-height:1.5;color:#4F5A6B;">' + d + '</span>'
                         '<span style="font-size:13px;font-weight:600;color:#1D4ED8;">We track: ' + m + '</span></div></div>' for i, (t, d, m) in enumerate(steps))
               + '</div></section>')

    services = m_services("What we run", "Six workstreams. One admissions engine.", [
        ("Campaigns", "Admissions campaigns", "Google Search, Meta, YouTube and education portals, planned course by course.", ["Google Search", "Meta", "YouTube"]),
        ("Websites", "Websites &amp; landing pages", "Fast program pages with fees, eligibility and placements, and one clear enquiry form.", ["Program pages", "Enquiry forms"]),
        ("Follow-up", "WhatsApp &amp; CRM follow-up", "Instant replies, counsellor assignment, visit reminders and document nudges.", ["WhatsApp", "Meritto", "LeadSquared"]),
        ("Creative", "Campus films &amp; creative", "Student stories, faculty reels and campus films for each stage of the decision.", ["Student stories", "Campus films"]),
        ("Search", "Search &amp; reputation", "Google Business Profiles, reviews and course pages that rank in your city.", ["Business Profile", "Reviews"]),
        ("Counsellors", "Counsellor enablement", "Call scripts, WhatsApp templates and a weekly lead-quality review with your team.", ["Call scripts", "Templates"])])

    schools = ('<div class="x-panel x" style="border-radius:14px;"><div class="x-grid"></div><div style="height:220px;position:relative;"><img src="work-bloom.jpg" alt="" class="cover" style="position:absolute;inset:0;"></div>'
               '<div style="padding:24px 18px 20px;display:flex;flex-direction:column;gap:14px;">'
               '<span style="align-self:flex-start;display:inline-flex;height:22px;align-items:center;padding:0 10px;border-radius:20px;background:rgba(255,255,255,0.16);font-size:10px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;">Selling to schools</span>'
               '<span style="font-size:32px;font-weight:600;line-height:1.04;letter-spacing:-0.05em;">When the school is your ' + em('customer.', SUN) + '</span>'
               '<span style="font-size:15px;line-height:1.55;color:' + MUTED_D + ';">Educational travel, edtech and school-supply companies sell to principals and trustees. We build for that longer, relationship-led sale.</span>'
               + mbtn("Explore school sales", "white") + '</div></div>')
    work = ('<section style="padding:72px 16px 0;display:flex;flex-direction:column;gap:36px;">' + mhead("Education work", 'Our Work' + em('.', SUN), "Built for the families who choose, and the schools that buy.")
            + m_work_card("cs-mvj.jpg", ["Website", "Lead generation", "Social"], "An admissions-first website and campaigns for an autonomous engineering college.", "College", "Website &#183; Leads &#183; Social")
            + m_work_card("cs-sprouts.jpg", ["Website", "Lead generation", "Creative"], "Educational trips sold to principals, with an enquiry page for every destination.", "Schools", "Website &#183; Leads &#183; Creative")
            + schools + '</section>')

    stats = m_stats([("&lt;5", "min", "First reply to an enquiry"), ("6", "", "Institute playbooks"), ("12", "mo", "Admissions calendar"), ("1", "", "Team, first ad to fee receipt")])

    rows = [("Brand &amp; reputation", "Always on", 1, 12, "rgba(29,78,216,0.16)", "#1D4ED8"), ("Enquiry push", "Jan to Apr", 1, 4, "#1D4ED8", "#FFFFFF"), ("Exams &amp; results", "Apr to Jun", 4, 6, "#0F1E5E", "#FFFFFF"),
            ("Counselling &amp; applications", "Jun to Aug", 6, 8, "#FFC528", "#0F1E5E"), ("Late deciders", "Aug to Sep", 8, 9, "#8FB0F5", "#0F1E5E")]
    track = 'display:grid;grid-template-columns:repeat(12,minmax(0,1fr));'
    calendar = ('<section style="padding:80px 8px 0;"><div class="x-card x" style="border-radius:16px;padding:40px 16px 24px;">' + mhead("Admissions calendar", 'Calendar' + em('.', SUN), "Spend when families decide. Sample: undergraduate intake.", size=52)
                + '<div style="' + track + 'margin-top:28px;padding-bottom:8px;">' + ''.join('<span style="font-size:11px;font-weight:600;color:#4F5A6B;text-align:center;">' + m + '</span>' for m in "JFMAMJJASOND") + '</div>'
                + ''.join('<div style="padding:12px 0;border-top:1px solid rgba(15,30,94,0.08);display:flex;flex-direction:column;gap:8px;"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;"><span style="font-size:14.5px;font-weight:600;letter-spacing:-0.03em;color:#0E1626;">' + n + '</span><span style="font-size:12px;font-weight:500;color:#4F5A6B;white-space:nowrap;">' + span + '</span></div>'
                          '<div style="' + track + 'height:14px;"><span style="grid-column:' + str(a) + ' / ' + str(b + 1) + ';display:block;border-radius:4px;background:' + bg + ';"></span></div></div>' for n, span, a, b, bg, fg in rows)
                + '<div style="margin-top:16px;">' + mbtn("Build my calendar", "ink") + '</div></div></section>')

    inputs = [("Season ad budget", "&#8377;18,00,000"), ("Expected enquiries", "3,000"), ("Enquiry to visit", "14%"), ("Visit to admission", "30%")]
    calc = ('<section class="x" style="padding:80px 16px 0;display:flex;flex-direction:column;gap:18px;"><span style="font-size:14px;font-weight:500;color:#1D4ED8;">Free tool</span>'
            '<h2 style="margin:0;font-size:38px;font-weight:600;line-height:1.08;letter-spacing:-0.04em;color:#0E1626;">What does one admission <span style="color:#1D4ED8;">really cost you?</span></h2>'
            '<div class="x-card" style="padding:20px 16px;border:1px solid rgba(15,30,94,0.08);box-shadow:0 30px 70px -40px rgba(7,14,42,0.35);">'
            '<div style="display:flex;justify-content:space-between;align-items:center;"><span style="font-size:17px;font-weight:600;letter-spacing:-0.04em;">Cost per admission</span><span style="font-size:9.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4F5A6B;border:1px dashed rgba(15,30,94,0.3);border-radius:20px;padding:2px 8px;">Sample</span></div>'
            '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px 16px;margin-top:18px;">'
            + ''.join('<div style="display:flex;flex-direction:column;gap:6px;padding-bottom:8px;border-bottom:1px solid rgba(15,30,94,0.25);"><span style="font-size:12px;color:#4F5A6B;">' + l + '</span><span style="font-size:16px;font-weight:600;">' + v + '</span></div>' for l, v in inputs)
            + '</div><div class="x-panel" style="margin-top:18px;border-radius:10px;padding:16px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;">'
            + ''.join('<div style="display:flex;flex-direction:column;gap:4px;"><span style="font-size:9.5px;letter-spacing:0.06em;text-transform:uppercase;color:rgba(255,255,255,0.66);">' + l + '</span><span style="font-size:20px;font-weight:600;letter-spacing:-0.045em;color:' + c + ';">' + v + '</span></div>'
                      for l, v, c in [("Per enquiry", "&#8377;600", "#FFFFFF"), ("Admissions", "126", "#FFFFFF"), ("Per admission", "&#8377;14,286", "#FFC528")])
            + '</div><div style="margin-top:16px;">' + mbtn("Open the calculator", "ink") + '</div></div></section>')

    voices = ('<section style="padding:80px 16px 0;display:flex;flex-direction:column;gap:14px;"><div style="margin-bottom:22px;">' + mhead("Reviews", 'Testimonials' + em('.', SUN), "In the words of the principals and trustees we work with.", size=46) + '</div>'
              + m_video("cs-mvj.jpg", "From an institute head", "[Principal or trustee video]")
              + m_quote("[Quote from a principal or trustee on what changed this admission season.]", "[Name]", "[Role], [Institute], [City]", ["mvj", "sprouts"]) + '</section>')

    comp = [("Consent on every form", "DPDP-ready consent on forms and WhatsApp opt-ins."), ("Calls families welcome", "Counsellor calls inside permitted hours, opt-outs honoured on the first ask."), ("Claims you can defend", "Placement, ranking and fee claims checked against ASCI guidelines.")]
    compliance = ('<section style="padding:80px 16px 0;display:flex;flex-direction:column;gap:12px;"><div style="margin-bottom:22px;">' + mhead("Compliance", 'Compliant' + em('.', SUN), "Handled before anything goes live.") + '</div>'
                  + ''.join('<div class="x-card x" style="padding:20px 18px;display:grid;grid-template-columns:36px minmax(0,1fr);gap:14px;align-items:start;"><span class="x-round" style="width:36px;height:36px;background:#E3EAFC;color:#1D4ED8;"><svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M4 9.5l3.2 3L14 5.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'
                            '<div style="display:flex;flex-direction:column;gap:6px;"><span style="font-size:19px;font-weight:600;letter-spacing:-0.04em;color:#0E1626;">' + t + '</span><span style="font-size:14.5px;line-height:1.5;color:#4F5A6B;">' + d + '</span></div></div>' for t, d in comp)
                  + '</section>')

    questions = m_faq(["How early before admission season should we start?", "How do you count an enquiry, a visit and an admission?", "What if enquiries come in but admissions don&#8217;t?", "Do you work inside our CRM?"],
                      "Ideally four to six months before applications open, so the website, follow-up and creative are tested before the enquiry push.",
                      "What institutes ask before the season starts.", "Ask us on WhatsApp")

    roles = ["Chairman or trustee", "Principal or director", "Admissions head", "Marketing head"]
    contact = ('<section class="x" style="padding:80px 16px 72px;display:flex;flex-direction:column;gap:28px;">' + mhead("", 'Fill next year&#8217;s seats' + em('.', SUN), "A senior strategist maps your calendar, funnel and budget.", size=50)
               + '<div style="display:flex;flex-direction:column;gap:10px;"><span style="font-size:12px;color:#4F5A6B;">I am the</span><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;">'
               + ''.join('<span style="display:flex;align-items:center;justify-content:center;text-align:center;min-height:44px;padding:6px 10px;border-radius:50px;font-size:13.5px;font-weight:600;letter-spacing:-0.03em;' + ('background:#0F1E5E;color:#FFFFFF;' if i == 1 else 'border:1px solid rgba(15,30,94,0.2);color:#0E1626;') + '">' + r + '</span>' for i, r in enumerate(roles))
               + '</div></div><div style="display:flex;flex-direction:column;gap:26px;">' + m_field("Institute and city *", "Institute, city") + m_field("Segment *", "College or university") + m_field("Phone (WhatsApp) *", "+91") + '</div>'
               + mbtn("Plan my admission season", "ink") + '<span style="font-size:12.5px;color:#4F5A6B;margin-top:-14px;">We use these details only to reply to your enquiry.</span></section>')

    body = hero + segments + journey + services + work + stats + calendar + calc + voices + compliance + questions + contact + footer(mobile=True) + chat_bubble(596, 16, label=False)
    return page(body, 390)
