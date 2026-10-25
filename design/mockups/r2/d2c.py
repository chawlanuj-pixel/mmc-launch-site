"""Round 2 D2C hub, desktop 1440."""
from base import page, NAV, footer, ARROW, page_hero

S = lambda t, c="#1D4ED8": '<span class="S" style="color:' + c + ';font-weight:600;">' + t + '</span>'


def hero():
    rows = [("Contribution margin", "&#8377;41.2L", "+9.4%"), ("Blended ROAS", "2.6&#215;", "+0.3"), ("CAC payback", "38 days", "&#8722;6"), ("Repeat revenue", "31%", "+2.1 pts"), ("RTO rate", "12%", "&#8722;3 pts")]
    card = ('<aside style="background:rgba(255,255,255,0.94);border:1px solid rgba(255,255,255,0.2);border-radius:16px;padding:24px;box-shadow:0 18px 44px -18px rgba(6,14,44,0.55);color:#0E1626;">'
            '<div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:18px;border-bottom:1px solid rgba(29,78,216,0.10);margin-bottom:16px;">'
            '<div><div class="D" style="font-weight:700;font-size:19px;letter-spacing:-0.01em;">Monday scorecard</div><div style="font-size:11px;font-weight:600;letter-spacing:0.08em;color:#4F5A6B;margin-top:3px;">Week 36 &#183; vs last week</div></div><span class="sample" style="color:#4F5A6B;border-color:rgba(20,47,91,0.3);">Sample</span></div>'
            + ''.join('<div style="display:grid;grid-template-columns:minmax(0,1fr) auto 70px;gap:14px;align-items:baseline;padding:9px 0;">'
                      '<span style="font-size:10.5px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4F5A6B;">' + a + '</span>'
                      '<span class="D" style="font-weight:700;font-size:15px;">' + b + '</span>'
                      '<span style="font-size:12px;font-weight:800;color:#15803D;text-align:right;">' + c + '</span></div>' for a, b, c in rows)
            + '<svg width="100%" height="54" viewBox="0 0 320 54" preserveAspectRatio="none" style="display:block;margin:10px 0 16px;"><path d="M0 44 L40 42 L80 38 L120 40 L160 30 L200 27 L240 20 L280 16 L320 9 L320 54 L0 54 Z" fill="rgba(29,78,216,0.10)"/><path d="M0 44 L40 42 L80 38 L120 40 L160 30 L200 27 L240 20 L280 16 L320 9" stroke="#1D4ED8" stroke-width="2.2" fill="none"/></svg>'
            '<div style="display:flex;align-items:center;justify-content:center;gap:12px;padding:12px 18px;background:#1D4ED8;color:#FFFFFF;border-radius:10px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">How we report' + ARROW + '</div></aside>')
    return page_hero("D2C", ["Home", "D2C brands"], "&#9679; For D2C brands &#183; &#8377;3Cr to &#8377;150Cr a year",
                     'Scale the brand.<br>Keep the ' + S('margin.', '#FFC528'),
                     "Media, creative, retention and Shopify, run by one senior team against contribution margin, so every rupee of growth still shows up on the P&amp;L.",
                     '<span class="btn btn-y">Audit my brand' + ARROW + '</span><span class="lnk">See D2C work' + ARROW + '</span>',
                     card, [("8.7", "&#215;", "Median blended ROAS"), ("&#8377;248", "Cr+", "Revenue compounded"), ("14/14", "", "Clients renewed"), ("27", "mo", "Median tenure")])


def leaks():
    items = [("ROAS looks healthy. Margin doesn&#8217;t.", "We budget on contribution after COGS, shipping, COD fees and returns, not on platform ROAS."),
             ("Creative burns out in a fortnight.", "A weekly sprint of statics, reels and creator ads, with every hook and format test logged."),
             ("RTO quietly eats the profit.", "Prepaid nudges, pincode rules and WhatsApp COD confirmation on every order."),
             ("Second orders never arrive.", "Email and WhatsApp flows for replenishment, cross-sell and win-back, measured by cohort."),
             ("The store undersells the ad.", "Landing pages that keep each ad&#8217;s promise, and a CRO roadmap tested every fortnight."),
             ("Marketplaces run on autopilot.", "Amazon, Blinkit, Zepto and Instamart held to the same margin rules as your own site.")]
    return ('<section style="padding:72px 80px 120px;background:#FBFAF6;">'
            '<div style="display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:96px;">'
            '<div style="display:flex;flex-direction:column;gap:24px;"><span class="eyebrow">Where growth leaks</span>'
            '<h2 class="D" style="margin:0;font-weight:800;font-size:56px;line-height:1;letter-spacing:-0.04em;color:#0E1626;">Six places D2C growth quietly ' + S('leaks.') + '</h2>'
            '<p style="margin:0;font-size:17px;line-height:1.6;color:#4F5A6B;">If two or more of these sound familiar, the problem is rarely the channel. It is how the whole engine is run.</p></div>'
            '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 56px;">'
            + ''.join('<div style="display:flex;flex-direction:column;gap:12px;padding:30px 0 34px;border-top:1px solid rgba(20,47,91,0.16);">'
                      '<span style="width:10px;height:10px;background:#FFC528;border-radius:2px;"></span>'
                      '<h3 class="D" style="margin:0;font-weight:700;font-size:25px;line-height:1.15;letter-spacing:-0.02em;color:#0E1626;">' + t + '</h3>'
                      '<p style="margin:0;font-size:16px;line-height:1.6;color:#4F5A6B;">' + d + '</p></div>' for t, d in items)
            + '</div></div></section>')


def bento():
    def tile(style, inner):
        return '<a href="#" style="position:relative;border-radius:24px;overflow:hidden;color:#0E1626;' + style + '">' + inner + '</a>'

    def label(name, text, dark=False):
        c1, c2 = ("#FFFFFF", "rgba(255,255,255,0.72)") if dark else ("#0E1626", "#4F5A6B")
        return ('<div style="position:absolute;left:32px;right:32px;bottom:30px;display:flex;justify-content:space-between;align-items:flex-end;gap:20px;">'
                '<div style="display:flex;flex-direction:column;gap:8px;"><span class="D" style="font-weight:700;font-size:28px;letter-spacing:-0.025em;color:' + c1 + ';">' + name + '</span>'
                '<span style="font-size:15.5px;line-height:1.5;color:' + c2 + ';max-width:36ch;">' + text + '</span></div>'
                '<span style="width:48px;height:48px;border-radius:50%;flex:none;display:flex;align-items:center;justify-content:center;background:' + ('#FFC528;color:#16329E' if dark else '#1D4ED8;color:#FFFFFF') + ';">' + ARROW + '</span></div>')
    shade = '<div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(7,14,42,0.95) 0%,rgba(7,14,42,0.6) 40%,rgba(7,14,42,0) 70%);"></div>'
    bubbles = ('<div style="position:absolute;left:32px;right:32px;top:30px;display:flex;flex-direction:column;gap:10px;">'
               '<span style="align-self:flex-start;max-width:78%;padding:12px 16px;border-radius:16px 16px 16px 4px;background:#FFFFFF;font-size:14px;line-height:1.45;box-shadow:0 10px 24px -16px rgba(7,14,42,0.4);">Your order is confirmed. Pay now with UPI and get it a day sooner?</span>'
               '<span style="align-self:flex-end;padding:10px 16px;border-radius:16px 16px 4px 16px;background:#DCF8C6;font-size:14px;">Pay with UPI</span>'
               '<span style="align-self:flex-start;max-width:78%;padding:12px 16px;border-radius:16px 16px 16px 4px;background:#FFFFFF;font-size:14px;line-height:1.45;box-shadow:0 10px 24px -16px rgba(7,14,42,0.4);">Running low on your serum? Here is 10% off your refill.</span></div>')
    return ('<section style="padding:120px 80px;background:#FFFFFF;">'
            '<div style="display:flex;justify-content:space-between;align-items:flex-end;gap:60px;margin-bottom:56px;">'
            '<div style="display:flex;flex-direction:column;gap:22px;"><span class="eyebrow">What we run for brands</span>'
            '<h2 class="D" style="margin:0;font-weight:800;font-size:64px;line-height:1;letter-spacing:-0.04em;color:#0E1626;">Every system a brand needs to ' + S('compound.') + '</h2></div>'
            '<span class="lnk" style="flex:none;">Compare plans' + ARROW + '</span></div>'
            '<div style="display:grid;grid-template-columns:repeat(12,minmax(0,1fr));grid-template-rows:380px 380px 300px;gap:20px;">'
            + tile('grid-column:span 7;grid-row:span 1;', '<img src="svc-performance.jpg" alt="" class="cover" style="position:absolute;inset:0;">' + shade + label("Meta &amp; Google Ads", "Full-funnel structure, daily creative iteration and bids tied to contribution margin.", True))
            + tile('grid-column:span 5;grid-row:span 2;background:#0F1E5E;',
                   '<div style="position:absolute;inset:28px 28px 150px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;">'
                   + ''.join('<span style="border-radius:14px;overflow:hidden;display:block;' + ('margin-top:40px;' if i % 2 else '') + '"><img src="' + im + '" alt="" class="cover"></span>' for i, im in enumerate(["work-sprnt.jpg", "work-mbb.jpg", "work-awwbaby.jpg", "work-mittiy.jpg"]))
                   + '</div>' + label("Creative &amp; UGC", "Statics, reels and creator content, produced and tested every week.", True))
            + tile('grid-column:span 7;grid-row:span 1;background:#EAF1FF;', bubbles + label("Retention on email &amp; WhatsApp", "COD confirmation, replenishment, cross-sell and win-back flows that lift second orders."))
            + tile('grid-column:span 4;background:#FBFAF6;border:1px solid rgba(20,47,91,0.1);', '<img src="pf-shopify.svg" alt="" style="position:absolute;left:32px;top:30px;height:36px;width:auto;">' + label("Shopify &amp; CRO", "Storefronts and a fortnightly test roadmap."))
            + tile('grid-column:span 4;background:#FBFAF6;border:1px solid rgba(20,47,91,0.1);', '<span style="position:absolute;left:32px;right:32px;top:30px;display:flex;flex-wrap:wrap;gap:8px;">' + ''.join('<span style="font-size:12px;font-weight:700;padding:6px 11px;border-radius:999px;background:#FFFFFF;border:1px solid rgba(20,47,91,0.12);color:#2E3849;">' + m + '</span>' for m in ['Amazon', 'Blinkit', 'Zepto', 'Instamart']) + '</span>' + label("Amazon &amp; quick commerce", "Listings, ads and ratings on every shelf."))
            + tile('grid-column:span 4;background:#FFC528;', '<span class="D" style="position:absolute;left:32px;top:24px;font-weight:800;font-size:56px;letter-spacing:-0.04em;color:rgba(14,22,38,0.14);">Aa</span>' + label("Brand &amp; packaging", "Identity and packs built to sell on a thumb-sized screen."))
            + '</div></section>')


def work():
    brands = [("cs-oosh.jpg", "OOsh", "Website &#183; Performance ads &#183; Creative", "span 7", 440), ("cs-giraffe.jpg", "The Growing Giraffe", "CRO &#183; Performance ads &#183; Amazon &#183; Quick commerce", "span 5", 440),
              ("cs-notic.jpg", "Notic", "Website &#183; Performance ads &#183; Creative &#183; Social", "span 4", 300), ("cs-mittiy.jpg", "Mittiy Made", "CRO &#183; Performance ads &#183; Creative", "span 4", 300),
              ("cs-vagakids.jpg", "Vaga Kids", "Website &#183; Performance ads &#183; Creative", "span 4", 300)]
    return ('<section class="ink on-dark" style="padding:120px 80px;">'
            '<div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:56px;">'
            '<div style="display:flex;flex-direction:column;gap:22px;"><span class="eyebrow">D2C work</span>'
            '<h2 class="D" style="margin:0;font-weight:800;font-size:64px;line-height:1;letter-spacing:-0.04em;color:#FFFFFF;">Brands we build, run and ' + S('renew', '#FFC528') + ' with.</h2></div>'
            '<span class="lnk">All D2C work' + ARROW + '</span></div>'
            '<div style="display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:48px 24px;">'
            + ''.join('<a href="#" style="grid-column:' + span + ';display:flex;flex-direction:column;gap:18px;color:#FFFFFF;">'
                      '<span style="display:block;height:' + str(h) + 'px;border-radius:20px;overflow:hidden;box-shadow:0 50px 90px -50px rgba(0,0,0,0.9);"><img src="' + img + '" alt="' + name + '" class="cover"></span>'
                      '<span style="display:flex;justify-content:space-between;align-items:baseline;gap:16px;"><span class="D" style="font-weight:700;font-size:26px;letter-spacing:-0.02em;">' + name + '</span><span class="arrow" style="color:#FFC528;"></span></span>'
                      '<span style="font-size:14.5px;color:rgba(255,255,255,0.62);margin-top:-8px;">' + what + '</span></a>' for img, name, what, span, h in brands)
            + '</div></section>')


def scorecard():
    defs = [("Contribution margin", "Revenue left after product, shipping, payment fees, returns and ads. The number we are paid to grow."),
            ("CAC payback", "How many days of margin it takes to earn back what a new customer cost."),
            ("Blended ROAS and MER", "All revenue over all marketing spend, so no channel gets credit twice."),
            ("Repeat revenue", "The share of revenue from second and later orders, tracked by monthly cohort.")]
    table = [("Net revenue", "&#8377;1.82Cr", "&#8377;1.71Cr", "+6.4%"), ("Marketing spend", "&#8377;38.4L", "&#8377;37.9L", "+1.3%"), ("Contribution margin", "&#8377;41.2L", "&#8377;37.6L", "+9.4%"),
             ("New customers", "4,120", "3,960", "+4.0%"), ("CAC payback", "38 days", "44 days", "&#8722;6 days")]
    return ('<section style="padding:120px 80px;background:#FBFAF6;">'
            '<div style="display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:96px;align-items:center;">'
            '<div style="display:flex;flex-direction:column;gap:24px;"><span class="eyebrow">How we report</span>'
            '<h2 class="D" style="margin:0;font-weight:800;font-size:56px;line-height:1;letter-spacing:-0.04em;color:#0E1626;">The four numbers on your desk every ' + S('Monday.') + '</h2>'
            '<div style="margin-top:12px;">' + ''.join('<div style="padding:20px 0;border-top:1px solid rgba(20,47,91,0.14);display:flex;flex-direction:column;gap:6px;"><span class="D" style="font-weight:700;font-size:20px;color:#0E1626;">' + t + '</span><span style="font-size:15.5px;line-height:1.55;color:#4F5A6B;">' + d + '</span></div>' for t, d in defs) + '</div></div>'
            '<div style="background:#FFFFFF;border-radius:24px;border:1px solid rgba(20,47,91,0.10);box-shadow:0 60px 110px -60px rgba(7,14,42,0.45);padding:36px;display:flex;flex-direction:column;gap:26px;">'
            '<div style="display:flex;justify-content:space-between;align-items:center;"><div style="display:flex;flex-direction:column;gap:4px;"><span class="cap">Weekly scorecard</span><span class="D" style="font-weight:700;font-size:24px;letter-spacing:-0.02em;color:#0E1626;">Week 36</span></div><span class="sample">Sample brand</span></div>'
            '<div style="display:grid;grid-template-columns:minmax(0,1.6fr) repeat(3,minmax(0,1fr));font-size:14.5px;">'
            '<span class="cap" style="padding:0 0 12px;">Metric</span><span class="cap" style="padding:0 0 12px;text-align:right;">This week</span><span class="cap" style="padding:0 0 12px;text-align:right;">Last week</span><span class="cap" style="padding:0 0 12px;text-align:right;">Change</span>'
            + ''.join('<span style="padding:14px 0;border-top:1px solid rgba(20,47,91,0.10);font-weight:700;color:#0E1626;">' + a + '</span><span style="padding:14px 0;border-top:1px solid rgba(20,47,91,0.10);text-align:right;font-weight:700;color:#0E1626;font-variant-numeric:tabular-nums;">' + b + '</span>'
                      '<span style="padding:14px 0;border-top:1px solid rgba(20,47,91,0.10);text-align:right;color:#4F5A6B;font-variant-numeric:tabular-nums;">' + c + '</span><span style="padding:14px 0;border-top:1px solid rgba(20,47,91,0.10);text-align:right;font-weight:800;color:#15803D;">' + d + '</span>' for a, b, c, d in table)
            + '</div><div style="display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:8px;align-items:end;height:120px;padding-top:12px;border-top:1px solid rgba(20,47,91,0.10);">'
            + ''.join('<span style="display:block;height:' + str(v) + '%;border-radius:6px 6px 2px 2px;background:' + ('#1D4ED8' if i == 11 else 'rgba(29,78,216,0.2)') + ';"></span>' for i, v in enumerate([42, 48, 45, 52, 55, 51, 60, 63, 66, 71, 78, 86]))
            + '</div><span style="font-size:12.5px;color:#4F5A6B;margin-top:-14px;">Contribution margin, last 12 weeks</span></div></div></section>')


def stack():
    svgs = ["meta", "google", "youtube", "amazon", "shopify", "klaviyo", "whatsapp", "razorpay"]
    pngs = ["gokwik", "shopflo", "moengage"]
    cells = ''.join('<span style="height:96px;display:flex;align-items:center;justify-content:center;padding:28px;border-left:1px solid rgba(20,47,91,0.1);"><img src="pf-' + p + '.svg" alt="' + p + '" style="max-height:30px;max-width:100%;width:auto;"></span>' for p in svgs)
    cells += ''.join('<span style="height:96px;display:flex;align-items:center;justify-content:center;padding:28px;border-left:1px solid rgba(20,47,91,0.1);"><img src="pf-' + p + '.png" alt="' + p + '" style="max-height:30px;max-width:100%;width:auto;"></span>' for p in pngs)
    return ('<section style="padding:64px 80px;background:#FFFFFF;border-top:1px solid rgba(20,47,91,0.08);border-bottom:1px solid rgba(20,47,91,0.08);">'
            '<div style="display:grid;grid-template-columns:260px minmax(0,1fr);align-items:center;gap:40px;">'
            '<span class="D" style="font-weight:700;font-size:22px;line-height:1.25;letter-spacing:-0.02em;color:#0E1626;">Fluent in the Indian D2C ' + S('stack.') + '</span>'
            '<div style="display:grid;grid-template-columns:repeat(11,minmax(0,1fr));border-right:1px solid rgba(20,47,91,0.1);">' + cells + '</div></div></section>')


def plans():
    tiers = [("Spark", "&#8377;3L", "Up to &#8377;10L monthly ad spend", ["Meta Ads management", "30 new creatives a month", "Weekly scorecard"], False),
             ("Compound", "&#8377;6L", "&#8377;10L to &#8377;50L monthly ad spend", ["Meta and Google Ads", "60 to 80 new creatives a month", "Email and WhatsApp retention", "Fortnightly CRO tests"], True),
             ("Scale", "&#8377;12L+", "&#8377;50L+ monthly ad spend", ["Full funnel, incl. Amazon and quick commerce", "120+ new creatives a month", "A dedicated senior pod"], False)]
    col = ''
    for n, p, band, feats, hi in tiers:
        fg, fg2, line = ("#FFFFFF", "rgba(255,255,255,0.72)", "rgba(255,255,255,0.16)") if hi else ("#0E1626", "#4F5A6B", "rgba(20,47,91,0.12)")
        col += ('<div style="display:flex;flex-direction:column;gap:22px;padding:40px 36px;border-radius:24px;' + ('background:#0F1E5E;box-shadow:0 60px 100px -50px rgba(15,30,94,0.7);transform:translateY(-16px);' if hi else 'background:#FFFFFF;border:1px solid rgba(20,47,91,0.1);') + '">'
                '<div style="display:flex;justify-content:space-between;align-items:center;"><span class="D" style="font-weight:700;font-size:24px;color:' + fg + ';">' + n + '</span>'
                + ('<span style="font-size:10.5px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;padding:5px 10px;border-radius:999px;background:#FFC528;color:#16329E;">Most chosen</span>' if hi else '') + '</div>'
                '<div style="display:flex;align-items:baseline;gap:8px;"><span class="D" style="font-weight:800;font-size:64px;line-height:1;letter-spacing:-0.045em;color:' + fg + ';">' + p + '</span><span style="font-size:14px;color:' + fg2 + ';">per month + GST</span></div>'
                '<span style="font-size:14px;font-weight:700;color:' + ('#FFC528' if hi else '#1D4ED8') + ';padding-bottom:22px;border-bottom:1px solid ' + line + ';">' + band + '</span>'
                '<div style="display:flex;flex-direction:column;gap:13px;">' + ''.join('<span style="display:flex;gap:12px;font-size:15.5px;line-height:1.45;color:' + fg2 + ';"><span style="width:6px;height:6px;border-radius:50%;background:#FFC528;margin-top:9px;flex:none;"></span>' + f + '</span>' for f in feats) + '</div>'
                '<span class="btn ' + ('btn-y' if hi else 'btn-i') + '" style="margin-top:auto;">Talk to us' + ARROW + '</span></div>')
    return ('<section style="padding:120px 80px 128px;background:#FBFAF6;">'
            '<div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:22px;margin-bottom:72px;"><span class="eyebrow">Plans</span>'
            '<h2 class="D" style="margin:0;font-weight:800;font-size:64px;line-height:1;letter-spacing:-0.04em;color:#0E1626;">Priced by spend band, ' + S('not by features.') + '</h2>'
            '<p style="margin:0;font-size:18px;line-height:1.6;color:#4F5A6B;max-width:60ch;">Flat monthly fees. You pay the platforms directly, keep every account, and can leave with 30 days&#8217; notice.</p></div>'
            '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;align-items:stretch;">' + col + '</div></section>')


def faq():
    qs = ["Is there a minimum ad spend or contract length?", "How quickly do campaigns go live?", "Do you run Amazon and quick commerce as well?", "Can you work alongside our in-house team?"]
    return ('<section style="padding:120px 80px;background:#FFFFFF;">'
            '<div style="display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:96px;">'
            '<div style="display:flex;flex-direction:column;gap:22px;"><span class="eyebrow">Questions founders ask</span>'
            '<h2 class="D" style="margin:0;font-weight:800;font-size:52px;line-height:1;letter-spacing:-0.04em;color:#0E1626;">Before you ' + S('sign.') + '</h2>'
            '<span class="lnk" style="align-self:flex-start;">Ask us on WhatsApp' + ARROW + '</span></div>'
            '<div style="border-bottom:1px solid rgba(20,47,91,0.14);">'
            '<div style="padding:28px 0;border-top:1px solid rgba(20,47,91,0.14);display:flex;flex-direction:column;gap:14px;">'
            '<div style="display:flex;justify-content:space-between;align-items:center;gap:24px;"><span class="D" style="font-weight:700;font-size:23px;letter-spacing:-0.015em;color:#1D4ED8;">Who owns the ad accounts, pixels and creative?</span><span style="width:40px;height:40px;border-radius:50%;background:#1D4ED8;color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-size:22px;flex:none;">&#8722;</span></div>'
            '<p style="margin:0;font-size:17px;line-height:1.65;color:#4F5A6B;max-width:62ch;">You do. Accounts stay registered to your business, and every creative we make is yours to keep, whether or not we keep working together.</p></div>'
            + ''.join('<div style="padding:28px 0;border-top:1px solid rgba(20,47,91,0.14);display:flex;justify-content:space-between;align-items:center;gap:24px;"><span class="D" style="font-weight:700;font-size:23px;letter-spacing:-0.015em;color:#0E1626;">' + q + '</span><span style="width:40px;height:40px;border-radius:50%;border:1px solid rgba(20,47,91,0.18);color:#1D4ED8;display:flex;align-items:center;justify-content:center;font-size:22px;flex:none;">+</span></div>' for q in qs)
            + '</div></div></section>')


def closing():
    return ('<section style="padding:120px 80px;background:#FFC528;">'
            '<div style="display:grid;grid-template-columns:minmax(0,8fr) minmax(0,4fr);gap:80px;align-items:end;">'
            '<h2 class="D" style="margin:0;font-weight:800;font-size:92px;line-height:0.94;letter-spacing:-0.045em;color:#0E1626;">Show us your numbers. We&#8217;ll show you the <span class="S" style="font-weight:600;">leak.</span></h2>'
            '<div style="display:flex;flex-direction:column;gap:16px;"><p style="margin:0;font-size:18px;line-height:1.6;color:rgba(14,22,38,0.74);">Share your store and spend band. A senior strategist sends back where margin is leaking and what we would test first.</p>'
            '<span class="btn btn-i" style="padding:19px 30px;">Audit my brand' + ARROW + '</span>'
            '<span class="btn" style="padding:18px 30px;border-color:rgba(14,22,38,0.4);color:#0E1626;">WhatsApp us</span></div></div></section>')


def build():
    body = ('<div style="position:relative;">' + NAV + '</div>' + hero() + leaks() + bento() + work() + scorecard() + stack() + plans() + faq() + closing() + footer())
    return page(body, 1440)
