"""Round 2 homepage, desktop 1440."""
from base import page, NAV, footer, ARROW

W = 1440


def hero():
    col = lambda items, offset: (
        '<div style="display:flex;flex-direction:column;gap:18px;margin-top:' + str(offset) + 'px;">'
        + ''.join('<figure style="margin:0;position:relative;height:' + str(h) + 'px;border-radius:18px;overflow:hidden;box-shadow:0 40px 80px -40px rgba(0,0,0,0.8);">'
                  '<img src="' + img + '" alt="' + name + '" class="cover">'
                  '<figcaption style="position:absolute;left:14px;bottom:14px;display:inline-flex;gap:8px;align-items:center;padding:7px 12px;border-radius:999px;background:rgba(7,14,42,0.72);color:#FFFFFF;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">'
                  '<span style="width:6px;height:6px;border-radius:50%;background:#FFC528;"></span>' + name + '</figcaption></figure>' for img, name, h in items) + '</div>')
    figures = [("&#8377;248", "Cr+", "Revenue compounded for clients"), ("8.7", "&#215;", "Median blended ROAS"), ("14/14", "", "Clients renewed"), ("27", " mo", "Median client tenure")]
    return (
        '<section class="ink on-dark" style="height:1000px;">'
        '<div style="position:absolute;inset:-30% -10% auto -10%;height:130%;z-index:-1;background:radial-gradient(46% 40% at 18% 30%,rgba(29,78,216,0.42) 0%,rgba(29,78,216,0) 70%),radial-gradient(40% 38% at 82% 22%,rgba(255,197,40,0.18) 0%,rgba(255,197,40,0) 72%);"></div>'
        + NAV +
        '<div style="position:absolute;left:80px;top:190px;width:760px;display:flex;flex-direction:column;gap:30px;">'
        '<span class="eyebrow">Growth studio for D2C brands &amp; educational institutes</span>'
        '<h1 class="D" style="margin:0;font-weight:800;font-size:100px;line-height:0.93;letter-spacing:-0.045em;color:#FFFFFF;">Performance marketing that survives the <span class="S" style="color:#FFC528;font-weight:600;">P&amp;L.</span></h1>'
        '<p style="margin:0;font-size:20px;line-height:1.55;color:rgba(255,255,255,0.72);max-width:50ch;">One senior team runs your media, creative, retention and technology, and answers for the number that matters: margin for brands, admissions for institutes.</p>'
        '<div style="display:flex;align-items:center;gap:30px;margin-top:4px;"><span class="btn btn-y" style="padding:19px 32px;">Book a strategy call' + ARROW + '</span><span class="lnk">See the work' + ARROW + '</span></div></div>'
        # work wall, bleeding off the right edge and fading into the ground
        '<div style="position:absolute;right:-60px;top:96px;width:580px;height:780px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;transform:rotate(-7deg);'
        '-webkit-mask-image:linear-gradient(to bottom,transparent 0%,#000 12%,#000 66%,transparent 92%);mask-image:linear-gradient(to bottom,transparent 0%,#000 12%,#000 66%,transparent 92%);">'
        + col([("work-giraffe.jpg", "The Growing Giraffe", 250), ("work-mvj.jpg", "MVJ College", 250), ("work-mbb.jpg", "MyBrownButters", 250), ("work-oosh.jpg", "OOsh", 250)], 60)
        + col([("work-sprouts.jpg", "Sprouts Edu Tours", 250), ("work-notic.jpg", "Notic", 250), ("work-lepure.jpg", "Lepure", 250), ("work-awwbaby.jpg", "AwwBaby", 250)], -60)
        + '</div>'
        '<div style="position:absolute;left:80px;right:80px;bottom:56px;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:40px;padding-top:30px;border-top:1px solid rgba(255,255,255,0.16);">'
        + ''.join('<div style="display:flex;flex-direction:column;gap:10px;"><span class="D" style="font-weight:800;font-size:54px;line-height:1;letter-spacing:-0.035em;color:#FFFFFF;">' + n + '<span style="color:#FFC528;font-size:0.5em;margin-left:3px;letter-spacing:-0.01em;">' + s + '</span></span><span class="cap">' + l + '</span></div>' for n, s, l in figures)
        + '</div></section>')


def paths():
    def panel(img, eyebrow, title, body, line):
        return (
            '<a href="#" style="position:relative;display:block;height:700px;border-radius:28px;overflow:hidden;color:#FFFFFF;">'
            '<img src="' + img + '" alt="" class="cover" style="position:absolute;inset:0;">'
            '<div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(7,14,42,0.98) 0%,rgba(7,14,42,0.92) 46%,rgba(7,14,42,0.35) 70%,rgba(7,14,42,0.05) 88%);"></div>'
            '<div class="on-dark" style="position:absolute;left:48px;right:48px;bottom:48px;display:flex;flex-direction:column;gap:20px;">'
            '<span class="eyebrow">' + eyebrow + '</span>'
            '<h3 class="D" style="margin:0;font-weight:800;font-size:54px;line-height:0.98;letter-spacing:-0.04em;color:#FFFFFF;max-width:13ch;">' + title + '</h3>'
            '<p style="margin:0;font-size:17px;line-height:1.55;color:rgba(255,255,255,0.74);max-width:44ch;">' + body + '</p>'
            '<div style="display:flex;justify-content:space-between;align-items:center;gap:20px;padding-top:22px;border-top:1px solid rgba(255,255,255,0.18);">'
            '<span style="font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.64);">' + line + '</span>'
            '<span style="width:64px;height:64px;border-radius:50%;background:#FFC528;color:#16329E;display:flex;align-items:center;justify-content:center;flex:none;">' + ARROW + '</span></div></div></a>')
    return (
        '<section style="padding:128px 40px 40px;background:#FBFAF6;">'
        '<div style="display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:80px;align-items:end;padding:0 40px 64px;">'
        '<h2 class="D" style="margin:0;font-weight:800;font-size:72px;line-height:0.98;letter-spacing:-0.04em;color:#0E1626;">We grow two kinds of organisation, <span class="S" style="color:#1D4ED8;font-weight:600;">and nothing else.</span></h2>'
        '<p style="margin:0;font-size:19px;line-height:1.6;color:#2E3849;">Focus is the product. Every playbook, calculator and hire at MMC is built for D2C brands or for educational institutes, so you never pay for us to learn your business.</p></div>'
        '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px;">'
        + panel("cs-mbb.jpg", "For D2C brands", 'Build a brand that pays for its own <span class="S" style="color:#FFC528;font-weight:600;">growth.</span>',
                "Media, creative, retention and Shopify, run against contribution margin, so scale never costs you the P&amp;L.", "Meta &#183; Google &#183; Amazon &#183; Quick commerce &#183; Shopify")
        + panel("cs-mvj.jpg", "For educational institutes", 'Fill every seat with the <span class="S" style="color:#FFC528;font-weight:600;">right</span> student.',
                "Admissions campaigns, enquiry-first websites and WhatsApp follow-up for schools, colleges, coaching and skilling institutes.", "Schools &#183; Colleges &#183; Coaching &#183; Skilling")
        + '</div></section>')


def logos():
    names = ["lepure", "giraffe", "mittiy", "awwbaby", "sprnt", "vagakids", "mbb", "notic", "oosh", "mvj", "sprouts", "bloom", "learningmate", None]
    cells = ''.join(
        '<div style="height:120px;display:flex;align-items:center;justify-content:center;padding:26px 30px;border-right:1px solid rgba(20,47,91,0.1);border-bottom:1px solid rgba(20,47,91,0.1);">'
        + ('<img src="logo-' + n + '.png" alt="' + n + '" style="max-height:48px;max-width:100%;width:auto;opacity:0.86;">' if n else
           '<span class="lnk" style="font-size:12px;">All clients' + ARROW + '</span>') + '</div>' for n in names)
    return ('<section style="padding:64px 80px 120px;background:#FBFAF6;">'
            '<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:28px;"><span class="eyebrow">Brands and institutes that grow with us</span><span style="font-size:15px;color:#4F5A6B;">14 of 14 renewed last cycle</span></div>'
            '<div style="display:grid;grid-template-columns:repeat(7,minmax(0,1fr));border-top:1px solid rgba(20,47,91,0.1);border-left:1px solid rgba(20,47,91,0.1);background:#FFFFFF;border-radius:4px;">' + cells + '</div></section>')


def promise():
    items = [("Senior hands only", "The strategist on your first call runs your account. No hand-off to a junior after the pitch."),
             ("One honest scorecard", "Margin and CAC payback for brands. Enquiries, visits and admissions for institutes. Every Monday."),
             ("Live in four weeks", "Audit, tracking, account structure and the first creative sprint, shipped inside a month."),
             ("Free to leave", "A 30-day exit clause. We keep clients with results, not paperwork.")]
    return (
        '<section style="padding:120px 80px;background:#FFFFFF;">'
        '<span class="eyebrow">Our promise</span>'
        '<p class="D" style="margin:36px 0 88px;font-weight:700;font-size:62px;line-height:1.06;letter-spacing:-0.035em;color:#0E1626;max-width:23ch;">'
        'Most agencies are paid to spend your money. We are paid to <span class="S" style="color:#1D4ED8;font-weight:600;">earn it back</span>, '
        '<span style="color:#94A0B4;">with a clear answer for every rupee in between.</span></p>'
        '<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:40px;">'
        + ''.join('<div style="display:flex;flex-direction:column;gap:14px;padding-top:26px;border-top:2px solid ' + ('#FFC528' if i == 0 else '#0E1626') + ';">'
                  '<h3 class="D" style="margin:0;font-weight:700;font-size:23px;letter-spacing:-0.02em;color:#0E1626;">' + t + '</h3>'
                  '<p style="margin:0;font-size:16px;line-height:1.6;color:#4F5A6B;">' + d + '</p></div>' for i, (t, d) in enumerate(items))
        + '</div></section>')


def work():
    def card(img, name, audience, what, w, h):
        return ('<a href="#" style="flex:none;width:' + str(w) + 'px;display:flex;flex-direction:column;gap:22px;color:#FFFFFF;">'
                '<div style="height:' + str(h) + 'px;border-radius:22px;overflow:hidden;box-shadow:0 50px 90px -50px rgba(0,0,0,0.9);"><img src="' + img + '" alt="' + name + '" class="cover"></div>'
                '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:24px;">'
                '<div style="display:flex;flex-direction:column;gap:8px;"><span class="cap" style="color:#FFC528;">' + audience + '</span>'
                '<span class="D" style="font-weight:700;font-size:30px;letter-spacing:-0.025em;">' + name + '</span>'
                '<span style="font-size:15.5px;color:rgba(255,255,255,0.66);">' + what + '</span></div>'
                '<span class="lnk" style="flex:none;">View' + ARROW + '</span></div></a>')
    return (
        '<section class="ink on-dark" style="padding:120px 0 120px 80px;">'
        '<div style="display:flex;justify-content:space-between;align-items:flex-end;padding-right:80px;margin-bottom:56px;">'
        '<div style="display:flex;flex-direction:column;gap:22px;"><span class="eyebrow">Selected work</span>'
        '<h2 class="D" style="margin:0;font-weight:800;font-size:72px;line-height:0.98;letter-spacing:-0.04em;color:#FFFFFF;">Work that is still <span class="S" style="color:#FFC528;font-weight:600;">running.</span></h2></div>'
        '<div style="display:flex;align-items:center;gap:36px;">'
        '<div style="display:flex;gap:24px;font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;"><span style="color:#FFFFFF;border-bottom:2px solid #FFC528;padding-bottom:6px;">All</span><span style="color:rgba(255,255,255,0.5);">D2C</span><span style="color:rgba(255,255,255,0.5);">Education</span></div>'
        '<span style="font-size:13px;font-weight:700;letter-spacing:0.1em;color:rgba(255,255,255,0.6);">01 / 06</span>'
        '<div style="display:flex;gap:10px;"><span style="width:56px;height:56px;border-radius:50%;border:1px solid rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center;transform:scaleX(-1);">' + ARROW + '</span>'
        '<span style="width:56px;height:56px;border-radius:50%;background:#FFC528;color:#16329E;display:flex;align-items:center;justify-content:center;">' + ARROW + '</span></div></div></div>'
        '<div style="display:flex;gap:32px;align-items:flex-start;">'
        + card("cs-oosh.jpg", "OOsh", "D2C brand", "Website, performance ads and creative", 820, 500)
        + card("cs-mvj.jpg", "MVJ College of Engineering", "Educational institute", "Website, lead generation, creative and social", 560, 380)
        + card("cs-giraffe.jpg", "The Growing Giraffe", "D2C brand", "CRO, performance ads, Amazon and quick commerce", 560, 380)
        + '</div></section>')


def services():
    rows = [("Performance media", "Meta, Google, YouTube, Amazon and quick commerce, budgeted on margin or cost per admission.", "D2C &#183; Education", "svc-performance.jpg"),
            ("Creative &amp; UGC", "Statics, reels and creator content, produced and tested every week.", "D2C &#183; Education", None),
            ("Retention &amp; follow-up", "Email and WhatsApp journeys for second orders, and for enquiries that need a nudge.", "D2C &#183; Education", None),
            ("Conversion &amp; technology", "Shopify storefronts, landing pages, CRO and CRM wiring that turn visits into revenue.", "D2C &#183; Education", None),
            ("Brand &amp; packaging", "Identity, packaging and brand systems that make every performance rupee work harder.", "D2C", None)]
    out = ''
    for i, (name, desc, aud, img) in enumerate(rows):
        active = i == 0
        out += ('<a href="#" style="display:grid;grid-template-columns:minmax(0,5fr) minmax(0,6fr) 200px;gap:32px;align-items:' + ('start' if active else 'center') + ';padding:' + ('34px 0' if not active else '34px 0 38px') + ';border-top:1px solid rgba(20,47,91,0.14);color:#0E1626;position:relative;">'
                '<span class="D" style="font-weight:700;font-size:40px;letter-spacing:-0.03em;line-height:1.05;color:' + ('#1D4ED8' if active else '#0E1626') + ';">' + name + '</span>'
                '<span style="display:flex;flex-direction:column;gap:18px;"><span style="font-size:16px;line-height:1.55;color:#4F5A6B;">' + desc + '</span>'
                + ('<span style="display:block;height:200px;border-radius:14px;overflow:hidden;box-shadow:0 26px 50px -30px rgba(7,14,42,0.55);"><img src="' + img + '" alt="" class="cover"></span>' if img else '') + '</span>'
                '<span style="display:flex;justify-content:flex-end;align-items:center;gap:16px;"><span class="cap">' + aud + '</span>'
                '<span style="width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex:none;' + ('background:#1D4ED8;color:#FFFFFF;' if active else 'border:1px solid rgba(20,47,91,0.18);color:#1D4ED8;') + '">' + ARROW + '</span></span>'
                + '</a>')
    return ('<section style="padding:120px 80px;background:#FBFAF6;">'
            '<div style="display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:80px;">'
            '<div style="display:flex;flex-direction:column;gap:24px;"><span class="eyebrow">What we run</span>'
            '<h2 class="D" style="margin:0;font-weight:800;font-size:58px;line-height:1;letter-spacing:-0.04em;color:#0E1626;">Five systems. One accountable <span class="S" style="color:#1D4ED8;font-weight:600;">team.</span></h2>'
            '<p style="margin:0;font-size:17px;line-height:1.6;color:#4F5A6B;">You get the whole engine or the part that is broken. Either way, the people who plan it are the people who run it.</p>'
            '<span class="lnk" style="align-self:flex-start;margin-top:8px;">All services' + ARROW + '</span></div>'
            '<div style="border-bottom:1px solid rgba(20,47,91,0.14);margin-top:90px;">' + out + '</div></div></section>')


def process():
    steps = [("Week 1", "Audit", "We read your P&amp;L, ad accounts and funnel, and show you exactly where money or enquiries leak."),
             ("Week 2", "Build", "Tracking, account structure, landing pages and a creative plan, set up and signed off."),
             ("Weeks 3 to 4", "Launch", "Campaigns go live with weekly creative tests and one scorecard everyone agrees on."),
             ("Month 2 onward", "Compound", "Monthly reviews move budget to whatever earns margin or admissions.")]
    return ('<section style="padding:120px 80px;background:#FFFFFF;">'
            '<div style="display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:96px;">'
            '<div style="display:flex;flex-direction:column;gap:26px;"><span class="eyebrow">How we start</span>'
            '<h2 class="D" style="margin:0;font-weight:800;font-size:62px;line-height:1;letter-spacing:-0.04em;color:#0E1626;">From first call to a working engine in <span class="S" style="color:#1D4ED8;font-weight:600;">four weeks.</span></h2>'
            '<span class="btn btn-b" style="align-self:flex-start;margin-top:12px;">Book a strategy call' + ARROW + '</span></div>'
            '<div>' + ''.join(
                '<div style="display:grid;grid-template-columns:96px 140px minmax(0,1fr);gap:24px;align-items:baseline;padding:30px 0;border-top:1px solid rgba(20,47,91,0.14);">'
                '<span class="D" style="font-weight:800;font-size:44px;letter-spacing:-0.03em;line-height:1;color:transparent;-webkit-text-stroke:1.2px #1D4ED8;">0' + str(i + 1) + '</span>'
                '<span class="cap" style="color:#1D4ED8;">' + wk + '</span>'
                '<div style="display:flex;flex-direction:column;gap:8px;"><span class="D" style="font-weight:700;font-size:26px;letter-spacing:-0.02em;color:#0E1626;">' + t + '</span><span style="font-size:16px;line-height:1.6;color:#4F5A6B;">' + d + '</span></div></div>'
                for i, (wk, t, d) in enumerate(steps)) + '</div></div></section>')


def tools():
    d2c = ["Break-even ROAS", "LTV : CAC", "CAC runway", "Funnel ROAS", "Unit economics", "Growth trajectory"]
    fields = [("Average order value", "&#8377;1,450"), ("Product cost", "32%"), ("Shipping &amp; packing", "&#8377;120"), ("Payment &amp; COD fees", "3%"), ("RTO rate", "18%"), ("Average discount", "5%")]
    return (
        '<section class="ink on-dark" style="padding:120px 80px;">'
        '<div style="display:grid;grid-template-columns:minmax(0,5fr) minmax(0,6fr);gap:96px;align-items:center;">'
        '<div style="display:flex;flex-direction:column;gap:26px;"><span class="eyebrow">Free tools</span>'
        '<h2 class="D" style="margin:0;font-weight:800;font-size:62px;line-height:1;letter-spacing:-0.04em;color:#FFFFFF;">Know your numbers before you talk to <span class="S" style="color:#FFC528;font-weight:600;">anyone.</span></h2>'
        '<p style="margin:0;font-size:18px;line-height:1.6;color:rgba(255,255,255,0.7);max-width:46ch;">The calculators our strategists open in every audit. No sign-up, no sales call required.</p>'
        '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 32px;margin-top:10px;">'
        + ''.join('<span style="display:flex;justify-content:space-between;align-items:center;padding:15px 0;border-top:1px solid rgba(255,255,255,0.14);font-size:16px;font-weight:700;color:#FFFFFF;">' + n + '<span class="arrow" style="color:#FFC528;"></span></span>' for n in d2c)
        + '<span style="display:flex;justify-content:space-between;align-items:center;padding:15px 0;border-top:1px solid rgba(255,255,255,0.14);font-size:16px;font-weight:700;color:#FFFFFF;">Cost per admission <span style="font-size:10px;font-weight:800;letter-spacing:0.12em;padding:3px 8px;border-radius:999px;background:#FFC528;color:#16329E;">NEW</span></span>'
        '<span style="border-top:1px solid rgba(255,255,255,0.14);"></span></div></div>'
        '<div style="background:#FFFFFF;border-radius:26px;padding:40px;color:#0E1626;box-shadow:0 60px 120px -50px rgba(0,0,0,0.9);display:flex;flex-direction:column;gap:26px;">'
        '<div style="display:flex;justify-content:space-between;align-items:center;"><div style="display:flex;flex-direction:column;gap:6px;"><span class="cap">Calculator</span><span class="D" style="font-weight:700;font-size:28px;letter-spacing:-0.02em;">Break-even ROAS</span></div><span class="sample">Sample inputs</span></div>'
        '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px 20px;">'
        + ''.join('<div style="display:flex;flex-direction:column;gap:8px;"><span style="font-size:12.5px;font-weight:700;color:#4F5A6B;">' + a + '</span>'
                  '<span style="height:54px;border-radius:12px;border:1px solid rgba(20,47,91,0.16);display:flex;align-items:center;padding:0 16px;font-weight:700;font-size:17px;color:#0E1626;">' + b + '</span></div>' for a, b in fields)
        + '</div><div style="display:flex;justify-content:space-between;align-items:flex-end;padding:28px 30px;border-radius:18px;background:#0F1E5E;color:#FFFFFF;">'
        '<div style="display:flex;flex-direction:column;gap:6px;"><span class="cap" style="color:rgba(255,255,255,0.6);">You break even at</span><span class="D" style="font-weight:800;font-size:64px;line-height:1;letter-spacing:-0.04em;">2.02<span style="color:#FFC528;font-size:0.5em;">&#215;</span></span></div>'
        '<div style="display:flex;flex-direction:column;align-items:flex-end;gap:12px;"><span style="font-size:14px;color:rgba(255,255,255,0.7);">Contribution per order &#8377;718</span><span class="btn btn-y" style="padding:13px 20px;font-size:12px;">Email me the breakdown' + ARROW + '</span></div></div>'
        '</div></div></section>')


def voices():
    return ('<section style="padding:120px 80px;background:#FBFAF6;">'
            '<div style="display:grid;grid-template-columns:420px minmax(0,1fr);gap:96px;align-items:center;">'
            '<div style="position:relative;height:500px;border-radius:26px;overflow:hidden;background:linear-gradient(160deg,#2B5CE0 0%,#16329E 55%,#0F1E5E 100%);display:flex;align-items:center;justify-content:center;">'
            '<span style="position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,0.16) 1px,transparent 1px);background-size:26px 26px;"></span>'
            '<span style="position:relative;width:96px;height:96px;border-radius:50%;background:#FFC528;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 14px rgba(255,197,40,0.18);"><span style="width:0;height:0;border-top:14px solid transparent;border-bottom:14px solid transparent;border-left:22px solid #16329E;margin-left:6px;"></span></span>'
            '<span style="position:absolute;left:28px;bottom:26px;font-size:11px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.8);">[Client video, 60 seconds]</span></div>'
            '<div style="display:flex;flex-direction:column;gap:34px;"><span class="eyebrow">In their words</span>'
            '<p class="S" style="margin:0;font-size:56px;line-height:1.1;color:#0E1626;">&#8220;[Client quote in their own words: what changed in the numbers, and why they renewed.]&#8221;</p>'
            '<div style="display:flex;justify-content:space-between;align-items:center;gap:24px;padding-top:26px;border-top:1px solid rgba(20,47,91,0.14);">'
            '<div style="display:flex;flex-direction:column;gap:4px;"><span class="D" style="font-weight:700;font-size:18px;color:#0E1626;">[Name]</span><span style="font-size:15px;color:#4F5A6B;">[Founder or principal], [Brand or institute]</span></div>'
            '<div style="display:flex;gap:10px;"><span style="width:52px;height:52px;border-radius:50%;border:1px solid rgba(20,47,91,0.18);color:#1D4ED8;display:flex;align-items:center;justify-content:center;transform:scaleX(-1);">' + ARROW + '</span>'
            '<span style="width:52px;height:52px;border-radius:50%;background:#1D4ED8;color:#FFFFFF;display:flex;align-items:center;justify-content:center;">' + ARROW + '</span></div></div></div></div></section>')


def closing():
    nxt = [("Book", "Pick a 30-minute slot, or send a brief if you prefer to write."), ("Talk", "A senior strategist walks through your numbers with you."), ("Decide", "You leave with a written view of where growth is leaking.")]
    return ('<section style="padding:120px 80px;background:#FFC528;">'
            '<div style="display:grid;grid-template-columns:minmax(0,7fr) minmax(0,4fr);gap:96px;align-items:end;">'
            '<div style="display:flex;flex-direction:column;gap:30px;">'
            '<h2 class="D" style="margin:0;font-weight:800;font-size:96px;line-height:0.94;letter-spacing:-0.045em;color:#0E1626;">Your next quarter starts with <span class="S" style="font-weight:600;">one call.</span></h2>'
            '<p style="margin:0;font-size:19px;line-height:1.6;color:rgba(14,22,38,0.74);max-width:50ch;">Thirty minutes with a senior strategist. Useful whether or not we end up working together.</p>'
            '<div style="display:flex;gap:12px;align-items:center;margin-top:6px;"><span class="btn btn-i" style="padding:19px 32px;">Book a strategy call' + ARROW + '</span>'
            '<span class="btn" style="padding:19px 28px;border-color:rgba(14,22,38,0.4);color:#0E1626;">WhatsApp us</span></div></div>'
            '<div>' + ''.join('<div style="display:grid;grid-template-columns:40px minmax(0,1fr);gap:16px;padding:20px 0;border-top:1px solid rgba(14,22,38,0.24);">'
                              '<span class="D" style="font-weight:800;font-size:15px;color:#16329E;">0' + str(i + 1) + '</span>'
                              '<div style="display:flex;flex-direction:column;gap:4px;"><span class="D" style="font-weight:700;font-size:20px;color:#0E1626;">' + t + '</span><span style="font-size:15px;line-height:1.55;color:rgba(14,22,38,0.72);">' + d + '</span></div></div>' for i, (t, d) in enumerate(nxt))
            + '</div></div></section>')


def build():
    return page(hero() + paths() + logos() + promise() + work() + services() + process() + tools() + voices() + closing() + footer(), W)
