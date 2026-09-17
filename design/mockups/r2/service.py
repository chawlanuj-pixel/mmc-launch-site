"""Round 2 service page (Meta Ads), desktop 1440. Hero is the unchanged SdHero."""
from base import page, NAV, footer, ARROW, sd_hero

S = lambda t, c="#1D4ED8": '<span class="S" style="color:' + c + ';font-weight:600;">' + t + '</span>'


def fit():
    good = ["You sell D2C on your own site, and Meta is your largest channel", "You spend &#8377;3L or more a month on Meta, or plan to this quarter",
            "You want margin to grow, not just revenue", "You can share COGS, shipping and RTO data with us"]
    bad = ["You need a one-off campaign rather than an always-on engine", "Your product is not yet ready for paid scale", "You want vanity metrics reported instead of contribution"]
    li = lambda t, ok: ('<div style="display:grid;grid-template-columns:28px minmax(0,1fr);gap:14px;padding:20px 0;border-top:1px solid rgba(20,47,91,0.14);">'
                        '<span style="width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-top:1px;' + ('background:#1D4ED8;color:#FFFFFF;' if ok else 'border:1.5px solid rgba(20,47,91,0.3);color:#4F5A6B;') + 'font-size:13px;font-weight:800;">' + ('&#10003;' if ok else '&#215;') + '</span>'
                        '<span style="font-size:17px;line-height:1.5;color:' + ('#0E1626' if ok else '#4F5A6B') + ';">' + t + '</span></div>')
    return ('<section style="padding:72px 80px 120px;background:#FBFAF6;">'
            '<div style="display:grid;grid-template-columns:minmax(0,4fr) minmax(0,4fr) minmax(0,4fr);gap:56px;">'
            '<div style="display:flex;flex-direction:column;gap:22px;"><span class="eyebrow">Who it is for</span>'
            '<h2 class="D" style="margin:0;font-weight:800;font-size:52px;line-height:1;letter-spacing:-0.04em;color:#0E1626;">Built for brands where Meta is the ' + S('engine.') + '</h2></div>'
            '<div><span class="cap" style="color:#1D4ED8;display:block;margin-bottom:14px;">A strong fit if</span>' + ''.join(li(t, True) for t in good) + '</div>'
            '<div><span class="cap" style="display:block;margin-bottom:14px;">Probably not yet if</span>' + ''.join(li(t, False) for t in bad) + '</div></div></section>')


def included():
    tabs = ["Account structure", "Creative engine", "Measurement", "Reporting"]
    points = ["New angles researched from reviews, comments and competitor ads", "Statics, reels and UGC produced in weekly batches", "Hook, format and offer tests logged in one shared library", "Winners rolled into evergreen campaigns within days"]
    imgs = ["work-sprnt.jpg", "work-giraffe.jpg", "work-awwbaby.jpg", "work-mbb.jpg", "work-mittiy.jpg", "work-oosh.jpg"]
    return ('<section style="padding:120px 80px;background:#FFFFFF;">'
            '<div style="display:flex;justify-content:space-between;align-items:flex-end;gap:60px;margin-bottom:48px;">'
            '<div style="display:flex;flex-direction:column;gap:22px;"><span class="eyebrow">What is included</span>'
            '<h2 class="D" style="margin:0;font-weight:800;font-size:64px;line-height:1;letter-spacing:-0.04em;color:#0E1626;">Four pillars, on ' + S('every') + ' account.</h2></div>'
            '<p style="margin:0;font-size:17px;line-height:1.6;color:#4F5A6B;max-width:40ch;">No tiers of attention. Every plan runs all four, at a pace set by your spend.</p></div>'
            '<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-bottom:1px solid rgba(20,47,91,0.14);">'
            + ''.join('<span style="display:flex;align-items:center;gap:14px;padding:0 0 20px;' + ('border-bottom:3px solid #1D4ED8;margin-bottom:-2px;' if i == 1 else '') + '">'
                      '<span class="D" style="font-weight:800;font-size:14px;color:' + ('#1D4ED8' if i == 1 else '#8A94A6') + ';">0' + str(i + 1) + '</span>'
                      '<span class="D" style="font-weight:700;font-size:22px;letter-spacing:-0.02em;color:' + ('#0E1626' if i == 1 else '#8A94A6') + ';">' + t + '</span></span>' for i, t in enumerate(tabs))
            + '</div>'
            '<div style="display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:80px;align-items:center;margin-top:56px;">'
            '<div style="display:flex;flex-direction:column;gap:22px;"><h3 class="D" style="margin:0;font-weight:700;font-size:38px;line-height:1.08;letter-spacing:-0.03em;color:#0E1626;">A creative engine that never waits for a brief.</h3>'
            '<p style="margin:0;font-size:17px;line-height:1.65;color:#4F5A6B;">Creative is where Meta is won. We research, produce and test in a weekly rhythm, so fresh winners are ready before the current ones fatigue.</p>'
            '<div>' + ''.join('<div style="display:flex;gap:14px;padding:14px 0;border-top:1px solid rgba(20,47,91,0.12);font-size:16px;line-height:1.5;color:#0E1626;"><span style="width:8px;height:8px;border-radius:50%;background:#FFC528;margin-top:8px;flex:none;"></span>' + p + '</div>' for p in points) + '</div></div>'
            '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;">'
            + ''.join('<span style="display:block;height:260px;border-radius:16px;overflow:hidden;' + ('margin-top:44px;' if i % 3 == 1 else '') + 'box-shadow:0 30px 60px -40px rgba(7,14,42,0.6);"><img src="' + im + '" alt="" class="cover"></span>' for i, im in enumerate(imgs))
            + '</div></div></section>')


def first30():
    weeks = [("Week 1", "Audit", "Account, pixel, catalogue and unit economics reviewed. Margin targets agreed in writing."),
             ("Week 2", "Structure &amp; tracking", "Campaign architecture rebuilt. Conversions API and every key event verified."),
             ("Week 3", "Creative sprint", "The first batch of new angles goes live against a test plan you sign off."),
             ("Week 4", "Scale rules", "Budget rules tied to contribution margin. The weekly scorecard begins.")]
    return ('<section class="ink on-dark" style="padding:120px 80px;">'
            '<div style="display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:80px;align-items:end;margin-bottom:64px;">'
            '<div style="display:flex;flex-direction:column;gap:22px;"><span class="eyebrow">Your first month</span>'
            '<h2 class="D" style="margin:0;font-weight:800;font-size:64px;line-height:1;letter-spacing:-0.04em;color:#FFFFFF;">Four weeks to a working ' + S('engine.', '#FFC528') + '</h2></div>'
            '<p style="margin:0;font-size:18px;line-height:1.6;color:rgba(255,255,255,0.7);">No three-month discovery phase. You see structure, tracking and new creative live inside the first month.</p></div>'
            '<div style="position:relative;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px;">'
            '<span style="position:absolute;left:0;right:0;top:7px;height:1.5px;background:rgba(255,255,255,0.2);"></span>'
            + ''.join('<div style="position:relative;display:flex;flex-direction:column;gap:14px;padding-top:40px;">'
                      '<span style="position:absolute;left:0;top:0;width:16px;height:16px;border-radius:50%;background:' + ('#FFC528' if i == 3 else '#FFFFFF') + ';box-shadow:0 0 0 6px rgba(255,255,255,0.08);"></span>'
                      '<span class="cap" style="color:#FFC528;">' + w + '</span><span class="D" style="font-weight:700;font-size:28px;letter-spacing:-0.02em;color:#FFFFFF;">' + t + '</span>'
                      '<span style="font-size:16px;line-height:1.6;color:rgba(255,255,255,0.68);">' + d + '</span></div>' for i, (w, t, d) in enumerate(weeks))
            + '</div>'
            '<div style="display:grid;grid-template-columns:120px minmax(0,1fr);gap:36px;align-items:center;margin-top:88px;padding-top:48px;border-top:1px solid rgba(255,255,255,0.14);">'
            '<span style="width:120px;height:120px;border-radius:50%;background:linear-gradient(160deg,#2B5CE0,#0F1E5E);border:1px solid rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;letter-spacing:0.12em;color:rgba(255,255,255,0.7);">[PHOTO]</span>'
            '<div style="display:flex;flex-direction:column;gap:14px;"><p class="S" style="margin:0;font-size:38px;line-height:1.2;color:#FFFFFF;">&#8220;[A line from the MMC lead who runs Meta accounts, on how every account is run.]&#8221;</p>'
            '<span style="font-size:14px;color:rgba(255,255,255,0.66);">[Name], Head of Performance, MMC</span></div></div></section>')


def proof():
    cards = [("work-lepure.jpg", "Lepure", "Website &#183; Performance ads &#183; Creative &#183; Social"), ("work-sprnt.jpg", "Sprnt", "Website &#183; Performance ads &#183; Creative &#183; Social"), ("work-notic.jpg", "Notic", "Website &#183; Performance ads &#183; Creative &#183; Social")]
    return ('<section style="padding:120px 80px;background:#FBFAF6;">'
            '<div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:56px;">'
            '<div style="display:flex;flex-direction:column;gap:22px;"><span class="eyebrow">Meta work</span>'
            '<h2 class="D" style="margin:0;font-weight:800;font-size:64px;line-height:1;letter-spacing:-0.04em;color:#0E1626;">Ads that earn the ' + S('scroll.') + '</h2></div>'
            '<span class="lnk">All D2C work' + ARROW + '</span></div>'
            '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;">'
            + ''.join('<a href="#" style="display:flex;flex-direction:column;gap:18px;color:#0E1626;"><span style="display:block;height:420px;border-radius:22px;overflow:hidden;box-shadow:0 40px 80px -50px rgba(7,14,42,0.6);"><img src="' + im + '" alt="' + n + '" class="cover"></span>'
                      '<span style="display:flex;justify-content:space-between;align-items:baseline;"><span class="D" style="font-weight:700;font-size:26px;letter-spacing:-0.02em;">' + n + '</span><span class="arrow" style="color:#1D4ED8;"></span></span>'
                      '<span style="font-size:14.5px;color:#4F5A6B;margin-top:-8px;">' + w + '</span></a>' for im, n, w in cards)
            + '</div></section>')


def packages():
    tiers = [("Spark", "&#8377;3L", "Up to &#8377;10L monthly Meta spend", ["30 new creatives a month", "Weekly scorecard", "Monthly strategy review"], False),
             ("Compound", "&#8377;6L", "&#8377;10L to &#8377;50L monthly Meta spend", ["60 to 80 new creatives a month", "Weekly scorecard and test log", "Fortnightly strategy call", "Landing page recommendations"], True),
             ("Scale", "&#8377;12L+", "&#8377;50L+ monthly Meta spend", ["120+ new creatives a month", "A dedicated senior pod", "Weekly strategy call"], False)]
    out = ''
    for n, p, band, feats, hi in tiers:
        fg, fg2, line = ("#FFFFFF", "rgba(255,255,255,0.72)", "rgba(255,255,255,0.16)") if hi else ("#0E1626", "#4F5A6B", "rgba(20,47,91,0.12)")
        out += ('<div style="display:flex;flex-direction:column;gap:22px;padding:40px 36px;border-radius:24px;' + ('background:#0F1E5E;box-shadow:0 60px 100px -50px rgba(15,30,94,0.7);transform:translateY(-16px);' if hi else 'background:#FFFFFF;border:1px solid rgba(20,47,91,0.1);') + '">'
                '<div style="display:flex;justify-content:space-between;align-items:center;"><span class="D" style="font-weight:700;font-size:24px;color:' + fg + ';">' + n + '</span>'
                + ('<span style="font-size:10.5px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;padding:5px 10px;border-radius:999px;background:#FFC528;color:#16329E;">Most chosen</span>' if hi else '') + '</div>'
                '<div style="display:flex;align-items:baseline;gap:8px;"><span class="D" style="font-weight:800;font-size:64px;line-height:1;letter-spacing:-0.045em;color:' + fg + ';">' + p + '</span><span style="font-size:14px;color:' + fg2 + ';">per month + GST</span></div>'
                '<span style="font-size:14px;font-weight:700;color:' + ('#FFC528' if hi else '#1D4ED8') + ';padding-bottom:22px;border-bottom:1px solid ' + line + ';">' + band + '</span>'
                '<div style="display:flex;flex-direction:column;gap:13px;">' + ''.join('<span style="display:flex;gap:12px;font-size:15.5px;line-height:1.45;color:' + fg2 + ';"><span style="width:6px;height:6px;border-radius:50%;background:#FFC528;margin-top:9px;flex:none;"></span>' + f + '</span>' for f in feats) + '</div>'
                '<span class="btn ' + ('btn-y' if hi else 'btn-i') + '" style="margin-top:auto;">Start with ' + n + ARROW + '</span></div>')
    return ('<section style="padding:120px 80px 128px;background:#FFFFFF;">'
            '<div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:22px;margin-bottom:72px;"><span class="eyebrow">Packages</span>'
            '<h2 class="D" style="margin:0;font-weight:800;font-size:64px;line-height:1;letter-spacing:-0.04em;color:#0E1626;">Pick by ad spend, ' + S('not by features.') + '</h2>'
            '<p style="margin:0;font-size:18px;line-height:1.6;color:#4F5A6B;max-width:56ch;">A flat monthly fee. You pay Meta directly, and every plan includes all four pillars.</p></div>'
            '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;align-items:stretch;">' + out + '</div></section>')


def compare():
    rows = [("Who runs the account", "A senior strategist and a creative lead", "Whoever you can hire and keep", "Often a junior after onboarding"),
            ("New creative every month", "30 to 120+, tested weekly", "Depends on team size", "A handful of variations"),
            ("What success means", "Contribution margin and CAC payback", "Varies by team", "Platform ROAS"),
            ("Time to a working setup", "Four weeks", "Months of hiring", "Varies")]
    cell = 'padding:22px 26px;border-top:1px solid rgba(20,47,91,0.10);font-size:16px;line-height:1.5;'
    return ('<section style="padding:120px 80px;background:#FBFAF6;">'
            '<div style="display:flex;flex-direction:column;gap:22px;margin-bottom:48px;"><span class="eyebrow">How we compare</span>'
            '<h2 class="D" style="margin:0;font-weight:800;font-size:56px;line-height:1;letter-spacing:-0.04em;color:#0E1626;">MMC, an in-house team, or another ' + S('agency?') + '</h2></div>'
            '<div style="display:grid;grid-template-columns:minmax(0,3fr) repeat(3,minmax(0,3fr));border-radius:24px;overflow:hidden;background:#FFFFFF;border:1px solid rgba(20,47,91,0.10);">'
            '<span style="padding:20px 26px;"></span><span class="cap" style="padding:20px 26px;background:#0F1E5E;color:#FFC528;">MMC</span><span class="cap" style="padding:20px 26px;">In-house team</span><span class="cap" style="padding:20px 26px;">Typical agency</span>'
            + ''.join('<span class="D" style="' + cell + 'font-weight:700;color:#0E1626;">' + a + '</span><span style="' + cell + 'background:rgba(15,30,94,0.05);font-weight:700;color:#0E1626;">' + b + '</span><span style="' + cell + 'color:#4F5A6B;">' + c + '</span><span style="' + cell + 'color:#4F5A6B;">' + d + '</span>' for a, b, c, d in rows)
            + '</div></section>')


def faq_related():
    qs = ["Is creative production included in the fee?", "How do you calculate contribution margin?", "Can you work with our in-house performance team?", "How soon will we see results?"]
    rel = [("Google &amp; YouTube Ads", "work-giraffe.jpg"), ("Creative &amp; UGC", "svc-creative.jpg"), ("Retention on WhatsApp", "svc-retention.jpg")]
    return ('<section style="padding:120px 80px;background:#FFFFFF;">'
            '<div style="display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:96px;">'
            '<div style="display:flex;flex-direction:column;gap:22px;"><span class="eyebrow">FAQs</span>'
            '<h2 class="D" style="margin:0;font-weight:800;font-size:52px;line-height:1;letter-spacing:-0.04em;color:#0E1626;">Meta Ads, ' + S('answered.') + '</h2></div>'
            '<div style="border-bottom:1px solid rgba(20,47,91,0.14);">'
            '<div style="padding:28px 0;border-top:1px solid rgba(20,47,91,0.14);display:flex;flex-direction:column;gap:14px;">'
            '<div style="display:flex;justify-content:space-between;align-items:center;gap:24px;"><span class="D" style="font-weight:700;font-size:23px;letter-spacing:-0.015em;color:#1D4ED8;">Who owns the ad account, pixel and creative?</span><span style="width:40px;height:40px;border-radius:50%;background:#1D4ED8;color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-size:22px;flex:none;">&#8722;</span></div>'
            '<p style="margin:0;font-size:17px;line-height:1.65;color:#4F5A6B;max-width:62ch;">You do. We work inside the ad account and pixel registered to your business, and every creative we make is yours.</p></div>'
            + ''.join('<div style="padding:28px 0;border-top:1px solid rgba(20,47,91,0.14);display:flex;justify-content:space-between;align-items:center;gap:24px;"><span class="D" style="font-weight:700;font-size:23px;letter-spacing:-0.015em;color:#0E1626;">' + q + '</span><span style="width:40px;height:40px;border-radius:50%;border:1px solid rgba(20,47,91,0.18);color:#1D4ED8;display:flex;align-items:center;justify-content:center;font-size:22px;flex:none;">+</span></div>' for q in qs)
            + '</div></div>'
            '<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px;margin-top:112px;padding-top:48px;border-top:2px solid #0E1626;">'
            + ''.join('<a href="#" style="display:flex;flex-direction:column;gap:16px;color:#0E1626;"><span style="display:block;height:190px;border-radius:18px;overflow:hidden;"><img src="' + im + '" alt="" class="cover"></span><span style="display:flex;justify-content:space-between;align-items:baseline;"><span class="D" style="font-weight:700;font-size:21px;letter-spacing:-0.015em;">' + t + '</span><span class="arrow" style="color:#1D4ED8;"></span></span></a>' for t, im in rel)
            + '<a href="#" style="display:flex;flex-direction:column;justify-content:space-between;gap:16px;padding:26px;border-radius:18px;background:#0F1E5E;color:#FFFFFF;"><span class="cap" style="color:#FFC528;">Free tool</span><span class="D" style="font-weight:700;font-size:26px;line-height:1.15;letter-spacing:-0.02em;">What ROAS do you need to break even?</span><span class="lnk" style="color:#FFFFFF;border-bottom-color:rgba(255,255,255,0.34);align-self:flex-start;">Open calculator' + ARROW + '</span></a>'
            + '</div></section>')


def closing():
    return ('<section style="padding:120px 80px;background:#FFC528;">'
            '<div style="display:grid;grid-template-columns:minmax(0,8fr) minmax(0,4fr);gap:80px;align-items:end;">'
            '<h2 class="D" style="margin:0;font-weight:800;font-size:92px;line-height:0.94;letter-spacing:-0.045em;color:#0E1626;">Let&#8217;s look inside your Meta <span class="S" style="font-weight:600;">account.</span></h2>'
            '<div style="display:flex;flex-direction:column;gap:16px;"><p style="margin:0;font-size:18px;line-height:1.6;color:rgba(14,22,38,0.74);">We review structure, creative and unit economics, and send you the three changes we would make first.</p>'
            '<span class="btn btn-i" style="padding:19px 30px;">Audit my Meta account' + ARROW + '</span>'
            '<span class="btn" style="padding:18px 30px;border-color:rgba(14,22,38,0.4);color:#0E1626;">See packages</span></div></div></section>')


def build():
    body = '<div style="position:relative;">' + NAV + '</div>' + sd_hero() + fit() + included() + first30() + proof() + packages() + compare() + faq_related() + closing() + footer()
    return page(body, 1440)
