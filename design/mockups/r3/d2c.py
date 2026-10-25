"""Round 3 D2C hub, desktop 1440."""
from base import page, NAV, footer, ARR_SVG, em, btn, btn_line, head, tags, stats_band, chat_bubble, faq, SUN
import home


def hero():
    rows = [("Contribution margin", "&#8377;41.2L", "+9.4%"), ("Blended ROAS", "2.6&#215;", "+0.3"), ("CAC payback", "38 days", "&#8722;6"), ("Repeat revenue", "31%", "+2.1 pts")]
    card = ('<div class="x" style="position:absolute;left:600px;top:430px;width:300px;padding:20px;border-radius:12px;background:#FFFFFF;color:#0E1626;box-shadow:0 40px 80px -30px rgba(0,0,0,0.8);z-index:5;">'
            '<div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:12px;border-bottom:1px solid rgba(15,30,94,0.1);"><span style="font-size:16px;font-weight:600;letter-spacing:-0.03em;">Monday scorecard</span>'
            '<span style="font-size:9.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4F5A6B;border:1px dashed rgba(15,30,94,0.3);border-radius:20px;padding:2px 8px;">Sample</span></div>'
            + ''.join('<div style="display:grid;grid-template-columns:minmax(0,1fr) auto 62px;gap:10px;align-items:baseline;padding:9px 0;border-bottom:1px solid rgba(15,30,94,0.06);"><span style="font-size:12.5px;color:#4F5A6B;">' + a + '</span><span style="font-size:15px;font-weight:600;">' + b + '</span><span style="font-size:12px;font-weight:700;color:#15803D;text-align:right;">' + c + '</span></div>' for a, b, c in rows)
            + '</div>')
    reels = ''.join('<span style="position:absolute;left:' + str(x) + 'px;top:' + str(y) + 'px;width:260px;height:460px;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.12);box-shadow:0 40px 80px -40px rgba(0,0,0,0.9);"><img src="' + im + '" alt="" class="cover"></span>'
                    for im, x, y in [("work-sprnt.jpg", 0, 30), ("work-mbb.jpg", 280, 0)])
    return ('<section class="x" style="position:relative;height:740px;overflow:hidden;background:linear-gradient(180deg,#0F1E5E 0%,#0A1440 60%,#070E2A 100%);color:#FFFFFF;">'
            '<div style="position:absolute;inset:0;background:radial-gradient(40% 50% at 80% 45%,rgba(29,78,216,0.45),rgba(29,78,216,0) 70%);"></div>'
            '<div style="position:absolute;left:880px;top:150px;width:560px;height:520px;">' + reels + '</div>' + NAV + card +
            '<div style="position:absolute;left:73px;top:210px;width:560px;display:flex;flex-direction:column;align-items:flex-start;">'
            '<span style="font-size:13px;color:rgba(255,255,255,0.6);">Home &#8250; D2C brands</span>'
            '<span style="margin-top:24px;display:inline-flex;align-items:center;height:22px;padding:0 10px;border-radius:20px;background:rgba(255,255,255,0.15);font-size:10px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;">For D2C brands &#183; &#8377;3Cr to &#8377;150Cr a year</span>'
            '<h1 style="margin:18px 0 0;font-weight:600;font-size:60px;line-height:1.02;letter-spacing:-0.055em;">Grow the brand. Keep the ' + em('margin.', SUN) + '</h1>'
            '<p style="margin:24px 0 0;font-size:16px;line-height:24px;color:rgba(250,250,250,0.82);max-width:470px;">Meta, Google, Amazon and quick commerce, creative that is tested every week, and a Shopify store that converts, all run by one senior team against contribution margin.</p>'
            '<div style="display:flex;gap:16px;margin-top:32px;">' + btn("Audit my brand", "white") + btn_line("See D2C work") + '</div></div></section>')


def leaks():
    items = [("ROAS looks healthy. Margin doesn&#8217;t.", "We budget on contribution after COGS, shipping, COD fees and returns, not on platform ROAS."),
             ("Creative burns out in a fortnight.", "A weekly sprint of statics, reels and creator ads, with every test logged."),
             ("RTO quietly eats the profit.", "Prepaid nudges, pincode rules and WhatsApp COD confirmation on every order."),
             ("Second orders never arrive.", "Email and WhatsApp flows for replenishment, cross-sell and win-back."),
             ("The store undersells the ad.", "Landing pages that keep each ad&#8217;s promise, and a CRO roadmap tested every fortnight."),
             ("Marketplaces run on autopilot.", "Amazon, Blinkit, Zepto and Instamart held to the same margin rules as your site.")]
    return ('<section style="padding:110px 48px 0;">' + head("Where growth leaks", 'Leaks' + em('.', SUN), "Six places D2C growth quietly stalls, and what we change.")
            + '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:56px;">'
            + ''.join('<div class="x-card x" style="padding:30px;display:flex;flex-direction:column;gap:14px;min-height:230px;"><span style="font-size:14px;font-weight:600;color:#1D4ED8;">0' + str(i + 1) + '</span>'
                      '<span style="font-size:24px;font-weight:600;line-height:1.15;letter-spacing:-0.045em;color:#0E1626;">' + t + '</span><span style="font-size:15.5px;line-height:1.55;color:#4F5A6B;">' + d + '</span></div>' for i, (t, d) in enumerate(items))
            + '</div></section>')


def services():
    rows = [("Media", "Meta &amp; Google Ads", "Full-funnel structure, daily creative iteration and bids tied to contribution margin.", ["Meta Ads", "Google Ads", "YouTube", "Performance Max"]),
            ("Shelves", "Amazon &amp; quick commerce", "Listings, ads and ratings on Amazon, Blinkit, Zepto and Instamart, held to margin.", ["Amazon Ads", "Blinkit", "Zepto", "Instamart"]),
            ("Creative", "Creative &amp; UGC", "Statics, reels and creator content produced and tested every week.", ["Statics", "Reels", "UGC", "Packaging"]),
            ("Retention", "Email &amp; WhatsApp", "COD confirmation, replenishment, cross-sell and win-back flows that lift second orders.", ["Klaviyo", "WhatsApp", "COD confirmation", "Win-back"]),
            ("Tech", "Shopify &amp; CRO", "Storefronts, landing pages and a fortnightly test roadmap that make every rupee count.", ["Shopify", "Landing pages", "CRO", "Analytics"])]
    out = ''.join('<div class="x" style="display:grid;grid-template-columns:130px 260px minmax(0,440px) minmax(0,1fr) 44px;gap:0 24px;align-items:start;padding:36px 0;border-top:1px solid rgba(255,255,255,0.14);">'
                  '<span style="font-size:16px;font-weight:500;color:rgba(255,255,255,0.85);padding-top:6px;">0' + str(i + 1) + '</span>'
                  '<span class="x-em" style="font-size:40px;line-height:1;color:#FFC528;">' + m + '</span>'
                  '<div style="display:flex;flex-direction:column;gap:14px;"><span style="font-size:30px;font-weight:500;line-height:36px;letter-spacing:-0.04em;color:#FFFFFF;">' + t + '</span><span style="font-size:16px;font-weight:500;line-height:22px;letter-spacing:-0.04em;color:rgba(255,255,255,0.72);">' + d + '</span></div>'
                  '<div style="display:flex;flex-direction:column;gap:10px;"><span style="font-size:12px;font-weight:500;color:rgba(255,255,255,0.7);">Categories</span><div style="display:flex;flex-wrap:wrap;gap:8px;">' + ''.join('<span class="x-chip">' + c + '</span>' for c in chips) + '</div></div>'
                  '<span class="x-round" style="border:1px solid rgba(255,255,255,0.35);color:#FFFFFF;margin-top:40px;">' + ARR_SVG + '</span></div>' for i, (m, t, d, chips) in enumerate(rows))
    return ('<section style="padding:120px 40px 0;"><div class="x-panel" style="padding:90px 40px 40px;"><div class="x-grid"></div>'
            + head("What we run", 'Services' + em('.', SUN), "Every system a brand needs to compound.", dark=True, left=260) + '<div style="margin-top:56px;">' + out + '</div></div></section>')


def work():
    cards = [("cs-oosh.jpg", ["Website", "Performance ads", "Creative"], "An e-commerce storefront and performance engine for a growing personal-care brand.", "Website &#183; Ads &#183; Creative"),
             ("cs-giraffe.jpg", ["CRO", "Amazon", "Quick commerce"], "Kids&#8217; snacks scaled across the brand store, Amazon and quick commerce.", "CRO &#183; Ads &#183; Marketplaces"),
             ("cs-notic.jpg", ["Website", "Performance ads", "Social media"], "A premium car-fragrance label launched with a performance-first store.", "Website &#183; Ads &#183; Social"),
             ("cs-mittiy.jpg", ["CRO", "Performance ads", "Creative"], "Handmade home goods, with a store tuned to convert the traffic ads create.", "CRO &#183; Ads &#183; Creative")]
    return ('<section style="padding:130px 48px 0;">' + head("D2C work", 'Our Work' + em('.', SUN), "Brands we build, run and renew with.")
            + '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:56px 24px;margin-top:56px;">'
            + ''.join('<div class="x" style="display:flex;flex-direction:column;gap:18px;"><div style="position:relative;height:430px;border-radius:16px;overflow:hidden;"><img src="' + im + '" alt="" class="cover"><div style="position:absolute;left:14px;top:14px;">' + tags(tg) + '</div></div>'
                      '<p style="margin:0;font-size:20px;font-weight:500;line-height:1.3;letter-spacing:-0.035em;color:#0E1626;max-width:34ch;">' + d + '</p>'
                      '<div style="display:flex;justify-content:space-between;align-items:end;gap:24px;"><div style="display:flex;flex-direction:column;gap:4px;"><span style="font-size:12px;color:#4F5A6B;">What we ran</span><span style="font-size:18px;font-weight:600;letter-spacing:-0.03em;color:#0E1626;">' + ran + '</span></div>'
                      '<span style="display:inline-flex;align-items:center;height:36px;padding:0 14px;border-radius:4px;background:#0F1E5E;color:#FFFFFF;font-size:12px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;">View project</span></div></div>' for im, tg, d, ran in cards)
            + '</div></section>')


def scorecard():
    defs = [("Contribution margin", "Revenue left after product, shipping, payment fees, returns and ads."), ("CAC payback", "Days of margin needed to earn back what a new customer cost."),
            ("Blended ROAS and MER", "All revenue over all marketing spend, so no channel gets credit twice."), ("Repeat revenue", "Share of revenue from second and later orders, by cohort.")]
    table = [("Net revenue", "&#8377;1.82Cr", "&#8377;1.71Cr", "+6.4%"), ("Marketing spend", "&#8377;38.4L", "&#8377;37.9L", "+1.3%"), ("Contribution margin", "&#8377;41.2L", "&#8377;37.6L", "+9.4%"), ("New customers", "4,120", "3,960", "+4.0%"), ("CAC payback", "38 days", "44 days", "&#8722;6 days")]
    cell = 'padding:14px 0;border-top:1px solid rgba(15,30,94,0.08);'
    return ('<section style="padding:120px 24px 0;"><div class="x-card x" style="border-radius:20px;padding:49px 24px 48px;">'
            + head("How we report", 'Scorecard' + em('.', SUN), "The four numbers on your desk every Monday.")
            + '<div style="display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:60px;margin-top:56px;align-items:start;">'
            '<div>' + ''.join('<div style="padding:20px 0;border-top:1px solid rgba(15,30,94,0.1);display:flex;flex-direction:column;gap:6px;"><span style="font-size:20px;font-weight:600;letter-spacing:-0.04em;color:#0E1626;">' + t + '</span><span style="font-size:15px;line-height:1.55;color:#4F5A6B;">' + d + '</span></div>' for t, d in defs) + '</div>'
            '<div style="border-radius:14px;background:#FBFAF6;padding:28px 30px;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;"><span style="font-size:22px;font-weight:600;letter-spacing:-0.04em;">Week 36</span><span style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4F5A6B;border:1px dashed rgba(15,30,94,0.3);border-radius:20px;padding:3px 9px;">Sample brand</span></div>'
            '<div style="display:grid;grid-template-columns:minmax(0,1.6fr) repeat(3,minmax(0,1fr));font-size:14.5px;">'
            + ''.join('<span style="font-size:12px;color:#4F5A6B;padding-bottom:10px;' + ('text-align:right;' if i else '') + '">' + h + '</span>' for i, h in enumerate(["Metric", "This week", "Last week", "Change"]))
            + ''.join('<span style="' + cell + 'font-weight:600;">' + a + '</span><span style="' + cell + 'text-align:right;font-weight:600;">' + b + '</span><span style="' + cell + 'text-align:right;color:#4F5A6B;">' + c + '</span><span style="' + cell + 'text-align:right;font-weight:700;color:#15803D;">' + d + '</span>' for a, b, c, d in table)
            + '</div><div style="display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:8px;align-items:end;height:110px;margin-top:20px;">'
            + ''.join('<span style="display:block;height:' + str(v) + '%;border-radius:4px 4px 2px 2px;background:' + ('#1D4ED8' if i == 11 else 'rgba(29,78,216,0.2)') + ';"></span>' for i, v in enumerate([42, 48, 45, 52, 55, 51, 60, 63, 66, 71, 78, 86]))
            + '</div></div></div></div></section>')


def plans():
    tiers = [("Spark", "&#8377;3L", "Up to &#8377;10L monthly ad spend", ["Meta Ads management", "30 new creatives a month", "Weekly scorecard"], False),
             ("Compound", "&#8377;6L", "&#8377;10L to &#8377;50L monthly ad spend", ["Meta and Google Ads", "60 to 80 new creatives a month", "Email and WhatsApp retention", "Fortnightly CRO tests"], True),
             ("Scale", "&#8377;12L+", "&#8377;50L+ monthly ad spend", ["Full funnel, incl. Amazon and quick commerce", "120+ new creatives a month", "A dedicated senior pod"], False)]
    col = ''
    for n, p, band, feats, hi in tiers:
        fg, fg2 = ("#FFFFFF", "rgba(255,255,255,0.74)") if hi else ("#0E1626", "#4F5A6B")
        col += ('<div class="x' + (' x-panel' if hi else ' x-card') + '" style="padding:36px 32px;display:flex;flex-direction:column;gap:20px;border-radius:16px;">' + ('<div class="x-grid"></div>' if hi else '')
                + '<div style="display:flex;justify-content:space-between;align-items:center;"><span style="font-size:22px;font-weight:600;letter-spacing:-0.04em;color:' + fg + ';">' + n + '</span>'
                + ('<span style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:4px 10px;border-radius:20px;background:#FFC528;color:#0F1E5E;">Most chosen</span>' if hi else '') + '</div>'
                '<div style="display:flex;align-items:baseline;gap:8px;"><span style="font-size:64px;font-weight:600;line-height:1;letter-spacing:-0.06em;color:' + fg + ';">' + p + '</span><span style="font-size:13px;color:' + fg2 + ';">per month + GST</span></div>'
                '<span style="font-size:14px;font-weight:600;color:' + ('#FFC528' if hi else '#1D4ED8') + ';">' + band + '</span>'
                '<div style="display:flex;flex-direction:column;gap:12px;padding-top:20px;border-top:1px solid ' + ('rgba(255,255,255,0.16)' if hi else 'rgba(15,30,94,0.1)') + ';">'
                + ''.join('<span style="display:flex;gap:10px;font-size:15px;line-height:1.45;color:' + fg2 + ';"><span style="width:6px;height:6px;border-radius:50%;background:#FFC528;margin-top:8px;flex:none;"></span>' + f + '</span>' for f in feats)
                + '</div><div style="margin-top:auto;padding-top:8px;">' + btn("Talk to us", "white" if hi else "ink") + '</div></div>')
    return ('<section style="padding:130px 48px 0;">' + head("Engagements", 'Plans' + em('.', SUN), "Flat monthly fees by ad-spend band. You pay the platforms directly and keep every account.")
            + '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:56px;">' + col + '</div></section>')


def questions():
    qs = ["Who owns the ad accounts, pixels and creative?", "Is there a minimum ad spend or contract length?", "How quickly do campaigns go live?", "Do you run Amazon and quick commerce as well?", "Can you work alongside our in-house team?"]
    return ('<section class="x" style="padding:130px 48px 120px;"><div style="display:grid;grid-template-columns:minmax(0,1fr) 675px;gap:40px;">'
            '<div style="display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;flex-direction:column;gap:26px;"><h2 class="x-title">FAQ' + em('.', SUN) + '</h2><p style="margin:0;font-size:16px;line-height:1.5;color:#4F5A6B;max-width:36ch;">What founders ask before they sign.</p></div>'
            '<div style="display:flex;flex-direction:column;gap:14px;align-items:flex-start;"><span style="font-size:16px;font-weight:500;color:#0E1626;">Still unsure?</span>' + btn("Ask us on WhatsApp", "ink") + '</div></div>'
            + faq(qs, "You do. Accounts stay registered to your business, and every creative we make is yours to keep, whether or not we keep working together.") + '</div></section>')


def build():
    body = (hero() + leaks() + services() + work() + '<section style="padding:120px 48px 0;">' + stats_band([("8.7", "&#215;", "Median blended ROAS"), ("&#8377;248", "Cr+", "Revenue compounded"), ("14/14", "", "Clients renewed"), ("27", "mo", "Median tenure")]) + '</section>'
            + scorecard() + plans() + home.talk() + questions() + footer() + chat_bubble(664))
    return page(body, 1440)
