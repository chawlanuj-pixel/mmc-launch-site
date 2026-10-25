"""Round 2 mobile artboards (390px): homepage and education landing page."""
from base import page, NAV_M, footer, ARROW

S = lambda t, c="#1D4ED8": '<span class="S" style="color:' + c + ';font-weight:600;">' + t + '</span>'
WA = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 8.6c.3-.6.6-.6.9-.6h.6c.2 0 .4.1.5.4l.8 1.8c.1.3 0 .5-.1.7l-.5.6c-.1.2-.1.4 0 .6.6 1 1.4 1.8 2.4 2.4.2.1.4.1.6 0l.6-.5c.2-.2.5-.2.7-.1l1.8.8c.3.1.4.3.4.5v.6c0 .3 0 .6-.6.9-.6.3-1.6.6-3.2-.1-1.5-.7-3-2.1-3.9-3.5-.9-1.5-.8-2.6-.4-3.1z" fill="currentColor"/></svg>'


def h2(t, dark=False, size=40):
    return '<h2 class="D" style="margin:0;font-weight:800;font-size:' + str(size) + 'px;line-height:1;letter-spacing:-0.04em;color:' + ('#FFFFFF' if dark else '#0E1626') + ';">' + t + '</h2>'


def sticky(label):
    return ('<div style="position:absolute;left:12px;right:12px;top:764px;z-index:90;display:grid;grid-template-columns:minmax(0,1fr) 56px;gap:8px;padding:8px;border-radius:999px;background:rgba(14,22,38,0.92);box-shadow:0 24px 48px -18px rgba(0,0,0,0.6);">'
            '<span class="btn btn-y" style="height:56px;padding:0 18px;font-size:12.5px;">' + label + ARROW + '</span>'
            '<span style="height:56px;border-radius:50%;background:#25D366;color:#FFFFFF;display:flex;align-items:center;justify-content:center;">' + WA + '</span></div>')


def faq_block(open_q, open_a, qs):
    return ('<div style="border-bottom:1px solid rgba(20,47,91,0.14);margin-top:26px;">'
            '<div style="padding:22px 0;border-top:1px solid rgba(20,47,91,0.14);display:flex;flex-direction:column;gap:12px;"><div style="display:flex;justify-content:space-between;gap:16px;"><span class="D" style="font-weight:700;font-size:19px;line-height:1.3;color:#1D4ED8;">' + open_q + '</span><span style="width:36px;height:36px;border-radius:50%;background:#1D4ED8;color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-size:20px;flex:none;">&#8722;</span></div>'
            '<p style="margin:0;font-size:16px;line-height:1.6;color:#4F5A6B;">' + open_a + '</p></div>'
            + ''.join('<div style="padding:22px 0;border-top:1px solid rgba(20,47,91,0.14);display:flex;justify-content:space-between;align-items:center;gap:16px;"><span class="D" style="font-weight:700;font-size:19px;line-height:1.3;color:#0E1626;">' + q + '</span><span style="width:36px;height:36px;border-radius:50%;border:1px solid rgba(20,47,91,0.18);color:#1D4ED8;display:flex;align-items:center;justify-content:center;font-size:20px;flex:none;">+</span></div>' for q in qs)
            + '</div>')


# ─────────────────────────────── HOMEPAGE ───────────────────────────────
def home():
    figures = [("&#8377;248", "Cr+", "Revenue compounded"), ("8.7", "&#215;", "Median blended ROAS"), ("14/14", "", "Clients renewed"), ("27", " mo", "Median tenure")]
    hero = ('<section class="ink on-dark" style="padding:124px 20px 44px;">' + NAV_M +
            '<div style="display:flex;flex-direction:column;gap:22px;"><span class="eyebrow" style="font-size:10.5px;letter-spacing:0.18em;">For D2C brands &amp; institutes</span>'
            '<h1 class="D" style="margin:0;font-weight:800;font-size:50px;line-height:0.94;letter-spacing:-0.045em;color:#FFFFFF;">Performance marketing that survives the ' + S('P&amp;L.', '#FFC528') + '</h1>'
            '<p style="margin:0;font-size:17px;line-height:1.55;color:rgba(255,255,255,0.72);">One senior team runs your media, creative, retention and technology, and answers for margin or admissions.</p>'
            '<span class="btn btn-y" style="height:60px;">Book a strategy call' + ARROW + '</span><span class="lnk" style="align-self:flex-start;">See the work' + ARROW + '</span></div>'
            '<div style="display:flex;gap:12px;margin:40px -60px 0 -20px;transform:rotate(-5deg);">'
            + ''.join('<span style="flex:none;width:170px;height:210px;border-radius:16px;overflow:hidden;box-shadow:0 30px 60px -30px rgba(0,0,0,0.8);' + ('margin-top:30px;' if i % 2 else '') + '"><img src="' + im + '" alt="" class="cover"></span>' for i, im in enumerate(["work-giraffe.jpg", "work-mvj.jpg", "work-oosh.jpg"]))
            + '</div><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:26px 18px;margin-top:44px;padding-top:26px;border-top:1px solid rgba(255,255,255,0.16);">'
            + ''.join('<div style="display:flex;flex-direction:column;gap:6px;"><span class="D" style="font-weight:800;font-size:38px;line-height:1;letter-spacing:-0.035em;color:#FFFFFF;">' + n + '<span style="color:#FFC528;font-size:0.5em;margin-left:2px;">' + s + '</span></span><span class="cap" style="font-size:10px;">' + l + '</span></div>' for n, s, l in figures)
            + '</div></section>')

    def panel(img, eyebrow, title, body):
        return ('<a href="#" style="position:relative;display:block;height:500px;border-radius:24px;overflow:hidden;color:#FFFFFF;"><img src="' + img + '" alt="" class="cover" style="position:absolute;inset:0;">'
                '<span style="position:absolute;inset:0;background:linear-gradient(to top,rgba(7,14,42,0.98) 0%,rgba(7,14,42,0.9) 48%,rgba(7,14,42,0.2) 78%);"></span>'
                '<span class="on-dark" style="position:absolute;left:24px;right:24px;bottom:24px;display:flex;flex-direction:column;gap:14px;"><span class="eyebrow" style="font-size:10.5px;">' + eyebrow + '</span>'
                '<span class="D" style="font-weight:800;font-size:36px;line-height:1;letter-spacing:-0.04em;">' + title + '</span><span style="font-size:15.5px;line-height:1.55;color:rgba(255,255,255,0.74);">' + body + '</span>'
                '<span style="display:flex;justify-content:space-between;align-items:center;padding-top:16px;border-top:1px solid rgba(255,255,255,0.18);"><span style="font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.7);">Explore</span><span style="width:52px;height:52px;border-radius:50%;background:#FFC528;color:#16329E;display:flex;align-items:center;justify-content:center;">' + ARROW + '</span></span></span></a>')
    paths = ('<section style="padding:72px 12px 16px;background:#FBFAF6;"><div style="padding:0 8px 32px;display:flex;flex-direction:column;gap:16px;">' + h2('We grow two kinds of organisation, ' + S('and nothing else.'))
             + '<p style="margin:0;font-size:16.5px;line-height:1.6;color:#2E3849;">Every playbook, calculator and hire is built for D2C brands or for educational institutes.</p></div>'
             '<div style="display:flex;flex-direction:column;gap:12px;">'
             + panel("cs-mbb.jpg", "For D2C brands", 'Build a brand that pays for its own ' + S('growth.', '#FFC528'), "Media, creative, retention and Shopify, run against contribution margin.")
             + panel("cs-mvj.jpg", "For educational institutes", 'Fill every seat with the ' + S('right', '#FFC528') + ' student.', "Admissions campaigns, enquiry-first websites and WhatsApp follow-up.")
             + '</div></section>')

    names = ["lepure", "giraffe", "mittiy", "awwbaby", "sprnt", "vagakids", "mbb", "notic", "oosh", "mvj", "sprouts", "bloom"]
    logos = ('<section style="padding:56px 20px 72px;background:#FBFAF6;"><span class="eyebrow" style="font-size:10.5px;">Brands and institutes that grow with us</span>'
             '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));margin-top:22px;border-top:1px solid rgba(20,47,91,0.1);border-left:1px solid rgba(20,47,91,0.1);background:#FFFFFF;">'
             + ''.join('<span style="height:84px;display:flex;align-items:center;justify-content:center;padding:18px;border-right:1px solid rgba(20,47,91,0.1);border-bottom:1px solid rgba(20,47,91,0.1);"><img src="logo-' + n + '.png" alt="' + n + '" style="max-height:36px;max-width:100%;width:auto;"></span>' for n in names)
             + '</div></section>')

    commits = [("Senior hands only", "The strategist on your first call runs your account."), ("One honest scorecard", "Margin for brands. Admissions for institutes. Every Monday."),
               ("Live in four weeks", "Audit, tracking, structure and creative, shipped inside a month."), ("Free to leave", "A 30-day exit clause. Results keep clients, not paperwork.")]
    promise = ('<section style="padding:72px 20px;background:#FFFFFF;"><span class="eyebrow" style="font-size:10.5px;">Our promise</span>'
               '<p class="D" style="margin:24px 0 40px;font-weight:700;font-size:34px;line-height:1.1;letter-spacing:-0.03em;color:#0E1626;">Most agencies are paid to spend your money. We are paid to ' + S('earn it back.') + '</p>'
               + ''.join('<div style="display:flex;flex-direction:column;gap:8px;padding:20px 0 24px;border-top:2px solid ' + ('#FFC528' if i == 0 else '#0E1626') + ';"><span class="D" style="font-weight:700;font-size:21px;color:#0E1626;">' + t + '</span><span style="font-size:15.5px;line-height:1.55;color:#4F5A6B;">' + d + '</span></div>' for i, (t, d) in enumerate(commits))
               + '</section>')

    work = ('<section class="ink on-dark" style="padding:72px 0 72px 20px;"><div style="padding-right:20px;display:flex;flex-direction:column;gap:18px;"><span class="eyebrow" style="font-size:10.5px;">Selected work</span>' + h2('Work that is still ' + S('running.', '#FFC528'), True)
            + '<div style="display:flex;gap:22px;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;"><span style="color:#FFFFFF;border-bottom:2px solid #FFC528;padding-bottom:6px;">All</span><span style="color:rgba(255,255,255,0.5);">D2C</span><span style="color:rgba(255,255,255,0.5);">Education</span></div></div>'
            '<div style="display:flex;gap:14px;margin-top:28px;">'
            + ''.join('<a href="#" style="flex:none;width:300px;display:flex;flex-direction:column;gap:14px;color:#FFFFFF;"><span style="display:block;height:230px;border-radius:18px;overflow:hidden;"><img src="' + im + '" alt="' + n + '" class="cover"></span><span class="cap" style="color:#FFC528;">' + a + '</span><span class="D" style="font-weight:700;font-size:23px;letter-spacing:-0.02em;">' + n + '</span><span style="font-size:14.5px;color:rgba(255,255,255,0.62);">' + w + '</span></a>'
                      for im, n, a, w in [("cs-oosh.jpg", "OOsh", "D2C brand", "Website, performance ads, creative"), ("cs-mvj.jpg", "MVJ College", "Institute", "Website, lead generation, creative")])
            + '</div><div style="display:flex;align-items:center;gap:14px;margin-top:28px;"><span style="width:52px;height:52px;border-radius:50%;border:1px solid rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center;transform:scaleX(-1);">' + ARROW + '</span><span style="width:52px;height:52px;border-radius:50%;background:#FFC528;color:#16329E;display:flex;align-items:center;justify-content:center;">' + ARROW + '</span><span style="font-size:12px;font-weight:700;letter-spacing:0.1em;color:rgba(255,255,255,0.6);">01 / 06</span></div></section>')

    svcs = ["Creative &amp; UGC", "Retention &amp; follow-up", "Conversion &amp; technology", "Brand &amp; packaging"]
    services = ('<section style="padding:72px 20px;background:#FBFAF6;"><span class="eyebrow" style="font-size:10.5px;">What we run</span><div style="margin-top:18px;">' + h2('Five systems. One accountable ' + S('team.')) + '</div>'
                '<div style="margin-top:30px;border-bottom:1px solid rgba(20,47,91,0.14);">'
                '<div style="padding:22px 0 24px;border-top:1px solid rgba(20,47,91,0.14);display:flex;flex-direction:column;gap:14px;"><div style="display:flex;justify-content:space-between;align-items:center;"><span class="D" style="font-weight:700;font-size:26px;letter-spacing:-0.025em;color:#1D4ED8;">Performance media</span><span style="width:44px;height:44px;border-radius:50%;background:#1D4ED8;color:#FFFFFF;display:flex;align-items:center;justify-content:center;">' + ARROW + '</span></div>'
                '<span style="font-size:15.5px;line-height:1.55;color:#4F5A6B;">Meta, Google, YouTube, Amazon and quick commerce, budgeted on margin or cost per admission.</span><span style="display:block;height:180px;border-radius:14px;overflow:hidden;"><img src="svc-performance.jpg" alt="" class="cover"></span></div>'
                + ''.join('<div style="padding:22px 0;border-top:1px solid rgba(20,47,91,0.14);display:flex;justify-content:space-between;align-items:center;"><span class="D" style="font-weight:700;font-size:24px;letter-spacing:-0.025em;color:#0E1626;">' + s + '</span><span style="width:44px;height:44px;border-radius:50%;border:1px solid rgba(20,47,91,0.18);color:#1D4ED8;display:flex;align-items:center;justify-content:center;">' + ARROW + '</span></div>' for s in svcs)
                + '</div></section>')

    steps = [("Week 1", "Audit"), ("Week 2", "Build"), ("Weeks 3 to 4", "Launch"), ("Month 2 onward", "Compound")]
    process = ('<section style="padding:72px 20px;background:#FFFFFF;"><span class="eyebrow" style="font-size:10.5px;">How we start</span><div style="margin-top:18px;">' + h2('A working engine in ' + S('four weeks.')) + '</div><div style="margin-top:28px;">'
               + ''.join('<div style="display:grid;grid-template-columns:64px minmax(0,1fr);gap:16px;align-items:baseline;padding:20px 0;border-top:1px solid rgba(20,47,91,0.14);"><span class="D" style="font-weight:800;font-size:34px;line-height:1;color:transparent;-webkit-text-stroke:1.2px #1D4ED8;">0' + str(i + 1) + '</span><span style="display:flex;flex-direction:column;gap:4px;"><span class="cap" style="color:#1D4ED8;">' + w + '</span><span class="D" style="font-weight:700;font-size:22px;color:#0E1626;">' + t + '</span></span></div>' for i, (w, t) in enumerate(steps))
               + '</div></section>')

    tools = ('<section class="ink on-dark" style="padding:72px 20px;"><span class="eyebrow" style="font-size:10.5px;">Free tools</span><div style="margin:18px 0 28px;">' + h2('Know your numbers before you talk to ' + S('anyone.', '#FFC528'), True) + '</div>'
             '<div style="background:#FFFFFF;border-radius:22px;padding:22px;color:#0E1626;display:flex;flex-direction:column;gap:16px;"><div style="display:flex;justify-content:space-between;align-items:center;"><span class="D" style="font-weight:700;font-size:20px;">Break-even ROAS</span><span class="sample" style="color:#4F5A6B;border-color:rgba(20,47,91,0.3);">Sample</span></div>'
             '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;">'
             + ''.join('<span style="display:flex;flex-direction:column;gap:6px;"><span style="font-size:12px;font-weight:700;color:#4F5A6B;">' + a + '</span><span style="height:50px;border-radius:12px;border:1px solid rgba(20,47,91,0.16);display:flex;align-items:center;padding:0 14px;font-weight:700;font-size:16px;">' + b + '</span></span>' for a, b in [("Order value", "&#8377;1,450"), ("Product cost", "32%"), ("Shipping", "&#8377;120"), ("RTO rate", "18%")])
             + '</div><div style="display:flex;justify-content:space-between;align-items:center;padding:18px 20px;border-radius:16px;background:#0F1E5E;color:#FFFFFF;"><span class="cap" style="color:rgba(255,255,255,0.6);">Break even at</span><span class="D" style="font-weight:800;font-size:44px;line-height:1;letter-spacing:-0.04em;">2.02<span style="color:#FFC528;font-size:0.5em;">&#215;</span></span></div></div>'
             '<span class="lnk" style="margin-top:24px;">All seven calculators' + ARROW + '</span></section>')

    closing = ('<section style="padding:72px 20px;background:#FFC528;display:flex;flex-direction:column;gap:22px;">'
               '<h2 class="D" style="margin:0;font-weight:800;font-size:54px;line-height:0.94;letter-spacing:-0.045em;color:#0E1626;">Your next quarter starts with <span class="S" style="font-weight:600;">one call.</span></h2>'
               '<p style="margin:0;font-size:17px;line-height:1.6;color:rgba(14,22,38,0.74);">Thirty minutes with a senior strategist. Useful whether or not we work together.</p>'
               '<span class="btn btn-i" style="height:60px;">Book a strategy call' + ARROW + '</span><span class="btn" style="height:56px;border-color:rgba(14,22,38,0.4);color:#0E1626;">WhatsApp us</span></section>')
    body = '<div style="position:relative;">' + hero + paths + logos + promise + work + services + process + tools + closing + footer(mobile=True) + sticky("Book a strategy call") + '</div>'
    return page(body, 390)


# ─────────────────────────────── EDUCATION ───────────────────────────────
def education():
    funnel = [("Enquiries", "3,240", 100), ("Calls", "1,610", 50), ("Visits", "486", 15), ("Applications", "262", 8), ("Admissions", "118", 3.6)]
    hero = ('<div style="position:relative;">' + NAV_M + '</div>'
            '<section class="on-dark" style="position:relative;isolation:isolate;margin:88px 12px 28px;padding:88px 16px 38px;border-radius:18px;overflow:hidden;color:#FFFFFF;background:linear-gradient(to bottom,#2B5CE0 0%,#1D4ED8 26%,#16329E 62%,#0F1E5E 100%);">'
            '<span style="position:absolute;inset:0;z-index:-1;background-image:radial-gradient(rgba(255,255,255,0.16) 1px,transparent 1px);background-size:26px 26px;-webkit-mask-image:radial-gradient(ellipse 62% 68% at 88% 6%,#000 0%,transparent 72%);mask-image:radial-gradient(ellipse 62% 68% at 88% 6%,#000 0%,transparent 72%);"></span>'
            '<span class="D" style="position:absolute;left:16px;bottom:-16px;z-index:-1;font-weight:800;font-size:132px;line-height:0.74;letter-spacing:-0.045em;color:rgba(255,255,255,0.05);white-space:nowrap;">Education</span>'
            '<div style="font-size:11.5px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.66);margin-bottom:36px;">Home <span style="margin:0 10px;color:rgba(255,255,255,0.34);">&#183;</span> <span style="color:rgba(255,255,255,0.86);">Education</span></div>'
            '<div class="eyebrow" style="color:rgba(255,255,255,0.72);font-size:10.5px;letter-spacing:0.16em;"><span>&#9679; Schools, colleges, coaching, skilling</span></div>'
            '<h1 class="D" style="font-weight:700;font-size:40px;line-height:0.98;letter-spacing:-0.035em;color:#FFFFFF;margin:18px 0 20px;">Every seat, filled with the ' + S('right', '#FFC528') + ' student.</h1>'
            '<p style="margin:0;font-size:16.5px;line-height:1.5;color:rgba(255,255,255,0.76);">Admissions campaigns, enquiry-first websites and WhatsApp follow-up, reported in enquiries, visits and admissions.</p>'
            '<div style="display:flex;flex-direction:column;gap:16px;margin-top:26px;"><span class="btn btn-y" style="height:58px;justify-content:space-between;">Plan my admission season' + ARROW + '</span><span class="lnk" style="align-self:flex-start;">See education work' + ARROW + '</span></div>'
            '<div style="margin-top:32px;background:rgba(255,255,255,0.94);border-radius:16px;padding:20px;color:#0E1626;box-shadow:0 18px 44px -18px rgba(6,14,44,0.55);">'
            '<div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:14px;border-bottom:1px solid rgba(29,78,216,0.10);margin-bottom:14px;"><span class="D" style="font-weight:700;font-size:17px;">Admission season tracker</span><span class="sample" style="color:#4F5A6B;border-color:rgba(20,47,91,0.3);">Sample</span></div>'
            + ''.join('<div style="display:grid;grid-template-columns:86px minmax(0,1fr) 48px;gap:10px;align-items:center;padding:6px 0;"><span style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4F5A6B;">' + l + '</span><span style="height:8px;border-radius:6px;background:#EEF2FB;display:block;overflow:hidden;"><span style="display:block;height:100%;width:' + str(w) + '%;background:' + ('#FFC528' if l == "Admissions" else '#1D4ED8') + ';"></span></span><span class="D" style="font-weight:700;font-size:14px;text-align:right;">' + v + '</span></div>' for l, v, w in funnel)
            + '</div></section>')

    segs = ["Colleges &amp; universities", "K-12 schools", "Coaching", "Skilling", "Study abroad"]
    seg = ('<section style="padding:8px 0 56px 20px;background:#FBFAF6;"><span class="eyebrow" style="font-size:10.5px;">Choose your institute</span><div style="display:flex;gap:10px;margin-top:16px;">'
           + ''.join('<span style="flex:none;padding:14px 18px;border-radius:14px;font-weight:700;font-size:15px;' + ('background:#0F1E5E;color:#FFFFFF;' if i == 0 else 'background:#FFFFFF;border:1px solid rgba(20,47,91,0.12);color:#0E1626;') + '">' + s + '</span>' for i, s in enumerate(segs)) + '</div></section>')

    stages = [("Ad", "Reaches families outside your catchment."), ("Landing page", "Fees, eligibility and placements missing."), ("First reply", "The enquiry waits hours for a reply."),
              ("Counsellor call", "One call, no follow-up plan."), ("Campus visit", "Booked, but never confirmed or reminded."), ("Fee paid", "Applications stall at documents and fees.")]
    journey = ('<section style="padding:72px 20px;background:#FFFFFF;"><span class="eyebrow" style="font-size:10.5px;">The admissions journey</span><div style="margin:18px 0 30px;">' + h2('Most seats are lost ' + S('after') + ' the enquiry.') + '</div>'
               '<div style="position:relative;"><span style="position:absolute;left:21px;top:22px;bottom:22px;width:1.5px;background:linear-gradient(#1D4ED8,#1D4ED8 80%,#FFC528);"></span>'
               + ''.join('<div style="position:relative;display:grid;grid-template-columns:44px minmax(0,1fr);gap:16px;padding:12px 0;"><span style="width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;' + ('background:#FFC528;color:#16329E;' if i == 5 else 'background:#FFFFFF;color:#1D4ED8;border:1.5px solid #1D4ED8;') + '"><span class="D" style="font-weight:800;font-size:15px;">' + str(i + 1) + '</span></span>'
                         '<span style="display:flex;flex-direction:column;gap:4px;padding-top:6px;"><span class="D" style="font-weight:700;font-size:20px;color:#0E1626;">' + t + '</span><span style="font-size:15px;line-height:1.5;color:#4F5A6B;">' + d + '</span></span></div>' for i, (t, d) in enumerate(stages))
               + '</div></section>')

    cal = [("Brand &amp; reputation", "Always on", "rgba(29,78,216,0.14)", "#16329E"), ("Enquiry push", "Jan to Apr", "#1D4ED8", "#FFFFFF"), ("Exams &amp; results", "Apr to Jun", "#FFC528", "#16329E"), ("Counselling", "Jun to Aug", "#0F1E5E", "#FFFFFF"), ("Late deciders", "Aug to Sep", "rgba(255,197,40,0.4)", "#16329E")]
    calendar = ('<section style="padding:72px 20px;background:#FBFAF6;"><span class="eyebrow" style="font-size:10.5px;">Admissions calendar</span><div style="margin:18px 0 14px;">' + h2('Spend when families ' + S('decide.')) + '</div>'
                '<span class="sample">Sample: undergraduate intake</span><div style="margin-top:20px;background:#FFFFFF;border-radius:18px;border:1px solid rgba(20,47,91,0.1);padding:6px 18px;">'
                + ''.join('<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:16px 0;' + ('border-top:1px solid rgba(20,47,91,0.08);' if i else '') + '"><span class="D" style="font-weight:700;font-size:16px;color:#0E1626;">' + n + '</span><span style="padding:8px 14px;border-radius:999px;background:' + bg + ';color:' + fg + ';font-size:12px;font-weight:800;white-space:nowrap;">' + r + '</span></div>' for i, (n, r, bg, fg) in enumerate(cal))
                + '</div></section>')

    streams = [("Admissions campaigns", "Search, Meta, YouTube and portals, course by course."), ("Websites &amp; landing pages", "Program pages with fees, eligibility and one enquiry form."),
               ("WhatsApp &amp; CRM follow-up", "Instant replies, visit reminders, document nudges."), ("Campus films &amp; creative", "Student stories and faculty reels for every stage."),
               ("Search &amp; reputation", "Business profiles, reviews and course pages that rank."), ("Counsellor enablement", "Scripts, templates and a weekly lead-quality review.")]
    work_s = ('<section class="ink on-dark" style="padding:72px 20px;"><span class="eyebrow" style="font-size:10.5px;">What we run</span><div style="margin:18px 0 26px;">' + h2('Six workstreams. One ' + S('admissions', '#FFC528') + ' engine.', True) + '</div>'
              + ''.join('<div style="display:flex;flex-direction:column;gap:6px;padding:18px 0;border-top:1px solid rgba(255,255,255,0.14);"><span class="D" style="font-weight:700;font-size:20px;color:#FFFFFF;">' + t + '</span><span style="font-size:15px;line-height:1.55;color:rgba(255,255,255,0.68);">' + d + '</span></div>' for t, d in streams)
              + '</section>')

    work = ('<section style="padding:72px 20px;background:#FFFFFF;"><span class="eyebrow" style="font-size:10.5px;">Education work</span><div style="margin:18px 0 26px;">' + h2('Built for the families who ' + S('choose.')) + '</div>'
            '<a href="#" style="display:flex;flex-direction:column;gap:14px;color:#0E1626;"><span style="display:block;height:250px;border-radius:18px;overflow:hidden;"><img src="cs-mvj.jpg" alt="MVJ College of Engineering" class="cover"></span><span class="cap" style="color:#1D4ED8;">College</span><span class="D" style="font-weight:700;font-size:24px;letter-spacing:-0.02em;">MVJ College of Engineering</span><span style="font-size:15px;color:#4F5A6B;">Website, lead generation, creative and social</span></a>'
            '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:28px;">'
            + ''.join('<a href="#" style="display:flex;flex-direction:column;gap:10px;color:#0E1626;"><span style="display:block;height:150px;border-radius:14px;overflow:hidden;"><img src="' + im + '" alt="' + n + '" class="cover"></span><span class="D" style="font-weight:700;font-size:17px;">' + n + '</span></a>' for im, n in [("work-sprouts.jpg", "Sprouts Edu Tours"), ("work-bloom.jpg", "Bloom Edutours")])
            + '</div></section>')

    calc = ('<section class="ink on-dark" style="padding:72px 20px;"><span class="eyebrow" style="font-size:10.5px;">Free tool</span><div style="margin:18px 0 26px;">' + h2('What does one admission ' + S('really', '#FFC528') + ' cost?', True) + '</div>'
            '<div style="background:#FFFFFF;border-radius:22px;padding:22px;color:#0E1626;display:flex;flex-direction:column;gap:14px;"><div style="display:flex;justify-content:space-between;align-items:center;"><span class="D" style="font-weight:700;font-size:20px;">Cost per admission</span><span class="sample" style="color:#4F5A6B;border-color:rgba(20,47,91,0.3);">Sample</span></div>'
            '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;">'
            + ''.join('<span style="display:flex;flex-direction:column;gap:6px;"><span style="font-size:12px;font-weight:700;color:#4F5A6B;">' + a + '</span><span style="height:50px;border-radius:12px;border:1px solid rgba(20,47,91,0.16);display:flex;align-items:center;padding:0 14px;font-weight:700;font-size:16px;">' + b + '</span></span>' for a, b in [("Ad budget", "&#8377;18L"), ("Enquiries", "3,000"), ("To visit", "14%"), ("To admission", "30%")])
            + '</div><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;"><span style="padding:16px;border-radius:14px;background:#F1F4FA;display:flex;flex-direction:column;gap:4px;"><span class="cap" style="font-size:10px;">Admissions</span><span class="D" style="font-weight:800;font-size:30px;">126</span></span>'
            '<span style="padding:16px;border-radius:14px;background:#0F1E5E;display:flex;flex-direction:column;gap:4px;"><span class="cap" style="font-size:10px;color:rgba(255,255,255,0.6);">Per admission</span><span class="D" style="font-weight:800;font-size:30px;color:#FFC528;">&#8377;14,286</span></span></div></div></section>')

    faq = ('<section style="padding:72px 20px;background:#FBFAF6;"><span class="eyebrow" style="font-size:10.5px;">Questions institutes ask</span><div style="margin-top:18px;">' + h2('Before the ' + S('season') + ' starts.') + '</div>'
           + faq_block("How early before admission season should we start?", "Ideally four to six months before applications open, so the website, follow-up and creative are tested before the enquiry push.",
                       ["How do you count an admission?", "Do you work inside our CRM?", "Can you run regional-language campaigns?"]) + '</section>')

    roles = ["Chairman or trustee", "Principal or director", "Admissions head", "Marketing head"]
    field = lambda l, v: '<span style="display:flex;flex-direction:column;gap:6px;"><span style="font-size:12.5px;font-weight:700;color:#4F5A6B;">' + l + '</span><span style="height:54px;border-radius:12px;border:1px solid rgba(20,47,91,0.16);display:flex;align-items:center;padding:0 16px;font-size:15.5px;color:#8A94A6;">' + v + '</span></span>'
    enquiry = ('<section style="padding:72px 20px;background:#FFC528;display:flex;flex-direction:column;gap:22px;">'
               '<h2 class="D" style="margin:0;font-weight:800;font-size:52px;line-height:0.94;letter-spacing:-0.045em;color:#0E1626;">Let&#8217;s fill next year&#8217;s <span class="S" style="font-weight:600;">seats.</span></h2>'
               '<div style="background:#FFFFFF;border-radius:22px;padding:22px;display:flex;flex-direction:column;gap:16px;"><span style="font-size:12.5px;font-weight:700;color:#4F5A6B;">I am the</span>'
               '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:-6px;">'
               + ''.join('<span style="min-height:52px;display:flex;align-items:center;padding:10px 12px;border-radius:12px;font-size:14px;font-weight:700;line-height:1.25;' + ('background:#0F1E5E;color:#FFFFFF;' if i == 2 else 'border:1px solid rgba(20,47,91,0.14);color:#2E3849;') + '">' + r + '</span>' for i, r in enumerate(roles))
               + '</div>' + field("Institute and city", "Institute, city") + field("Phone (WhatsApp)", "+91") +
               '<span class="btn btn-i" style="height:58px;">Plan my admission season</span></div></section>')

    body = '<div style="position:relative;display:flow-root;background:#FBFAF6;">' + hero + seg + journey + calendar + work_s + work + calc + faq + enquiry + footer(mobile=True) + sticky("Plan my admission season") + '</div>'
    return page(body, 390)
