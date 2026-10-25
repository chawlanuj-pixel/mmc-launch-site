"""Round 4 D2C hub, desktop 1440."""
from base import (page, footer, SUN, acc, dot, btn, link, grey, head, arrows, tabs, work_card, quote_card, video_card, contact, chat_icon,
                  sub_hero, service_panel, plans, faq_section, sample_badge)

LABEL = "Audit my brand"


def hero():
    return sub_hero("Home &#8250; D2C brands", 'Grow the brand. Keep the ' + acc('margin.', SUN),
                    "Meta, Google, Amazon and quick commerce, run by one senior team against contribution margin.",
                    btn(LABEL, "white") + link("See D2C work", dark=True), ["work-sprnt.jpg", "work-mbb.jpg"])


def work():
    cards = [("cs-oosh.jpg", ["Website", "Ads"], "OOsh", "Personal care", "A storefront and ad engine for a growing personal-care brand.", "Website &#183; Ads &#183; Creative"),
             ("cs-giraffe.jpg", ["Amazon", "Quick commerce"], "The Growing Giraffe", "Kids&#8217; food", "Kids&#8217; snacks scaled across the store, Amazon and quick commerce.", "CRO &#183; Ads &#183; Marketplaces"),
             ("cs-notic.jpg", ["Website", "Social"], "Notic", "Car fragrance", "A premium car-fragrance label launched with a performance-first store.", "Website &#183; Ads &#183; Social"),
             ("cs-mittiy.jpg", ["CRO", "Ads"], "Mittiy Made", "Home goods", "Handmade home goods, with a store tuned to convert ad traffic.", "CRO &#183; Ads &#183; Creative")]
    return ('<section style="padding:128px 48px 0;">' + head("D2C work", 'Our Work' + dot(), "Brands we build, run and renew with.")
            + '<div style="margin:32px 0 0 324px;">' + tabs(["All", "Meta", "Amazon &amp; quick commerce", "Shopify"]) + '</div>'
            '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:48px 24px;margin-top:48px;">'
            + ''.join(work_card(*c, hover=(i == 1)) for i, c in enumerate(cards)) + '</div>'
            '<div style="margin-top:48px;display:flex;justify-content:center;">' + grey("View all D2C projects") + '</div></section>')


def services():
    rows = [("ROAS looks healthy. Margin doesn&#8217;t.", "Meta &amp; Google Ads", "Full-funnel structure, weekly creative and bids tied to contribution margin.", ["Meta Ads", "Google Ads", "YouTube"]),
            ("Marketplaces run on autopilot.", "Amazon &amp; quick commerce", "Listings, ads and ratings on Amazon, Blinkit, Zepto and Instamart, held to margin.", ["Amazon Ads", "Blinkit", "Zepto"]),
            ("Creative burns out in a fortnight.", "Creative &amp; UGC", "Statics, reels and creator ads produced and tested every week.", ["Statics", "Reels", "UGC"]),
            ("Second orders never arrive.", "Email &amp; WhatsApp", "COD confirmation, replenishment and win-back flows that lift repeat orders.", ["Klaviyo", "WhatsApp", "COD confirmation"]),
            ("The store undersells the ad.", "Shopify &amp; CRO", "Landing pages that keep each ad&#8217;s promise, and CRO tests every fortnight.", ["Shopify", "Landing pages", "CRO"])]
    return service_panel("What we run", 'Services' + dot(), "Where D2C growth leaks, and the system that fixes each leak.", rows)


def scorecard():
    defs = [("Contribution margin", "Revenue left after product, shipping, payment fees, returns and ads."), ("CAC payback", "Days of margin needed to earn back what a new customer cost."),
            ("Blended ROAS and MER", "All revenue over all marketing spend, so no channel gets credit twice."), ("Repeat revenue", "Share of revenue from second and later orders, by cohort.")]
    table = [("Net revenue", "&#8377;1.82Cr", "&#8377;1.71Cr", "+6.4%"), ("Marketing spend", "&#8377;38.4L", "&#8377;37.9L", "+1.3%"), ("Contribution margin", "&#8377;41.2L", "&#8377;37.6L", "+9.4%"),
             ("New customers", "4,120", "3,960", "+4.0%"), ("CAC payback", "38 days", "44 days", "&#8722;6 days")]
    cell = 'padding:14px 0;border-top:1px solid var(--line);font-size:16px;'
    return ('<section style="padding:128px 48px 0;"><div class="card4" style="padding:32px;">'
            + head("How we report", 'Scorecard' + dot(), "The four numbers on your desk every Monday.")
            + '<div style="display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:64px;margin-top:48px;align-items:start;">'
            '<div>' + ''.join('<div style="padding:16px 0;border-top:1px solid var(--line);display:flex;flex-direction:column;gap:4px;"><span class="t-h3">' + t + '</span><span class="t-body muted">' + d + '</span></div>' for t, d in defs) + '</div>'
            '<div style="border-radius:var(--r-ctl);background:var(--tint);padding:24px 28px;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;"><span class="t-h3">Week 36</span>' + sample_badge("Sample brand") + '</div>'
            '<div style="display:grid;grid-template-columns:minmax(0,1.6fr) repeat(3,minmax(0,1fr));">'
            + ''.join('<span class="t-small muted" style="padding:8px 0;' + ('text-align:right;' if i else '') + '">' + h + '</span>' for i, h in enumerate(["Metric", "This week", "Last week", "Change"]))
            + ''.join('<span style="' + cell + 'font-weight:500;">' + a + '</span><span style="' + cell + 'text-align:right;font-weight:600;">' + b + '</span><span style="' + cell + 'text-align:right;color:var(--muted);">' + c + '</span><span style="' + cell + 'text-align:right;font-weight:600;color:#15803D;">' + d + '</span>' for a, b, c, d in table)
            + '</div></div></div></div></section>')


def voices():
    return ('<section style="padding:128px 48px 0;">' + head("Reviews", 'Testimonials' + dot(), "What founders say once the numbers settle.", right=arrows())
            + '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:48px;">'
            + quote_card("[Founder quote on margin, creative pace and what changed in the first quarter.]", "[Name]", "[Role], OOsh", height=400)
            + quote_card("[Founder quote on growing Amazon and quick commerce with MMC.]", "[Name]", "[Role], The Growing Giraffe", height=400)
            + video_card("reel-tgg-1.jpg", "Creative by MMC", "Founder-led ads for The Growing Giraffe") + '</div></section>')


def build():
    tiers = [("Spark", "&#8377;3L", "Up to &#8377;10L monthly ad spend", ["Meta Ads management", "30 new creatives a month", "Weekly scorecard"], False),
             ("Compound", "&#8377;6L", "&#8377;10L to &#8377;50L monthly ad spend", ["Meta and Google Ads", "60 to 80 creatives a month", "Email and WhatsApp retention", "Fortnightly CRO tests"], True),
             ("Scale", "&#8377;12L+", "&#8377;50L+ monthly ad spend", ["Full funnel with marketplaces", "120+ creatives a month", "A dedicated senior pod"], False)]
    qs = ["Who owns the ad accounts, pixels and creative?", "Is there a minimum ad spend or contract length?", "Which brands are the best fit?",
          "Do you run Amazon and quick commerce as well?", "Can you work alongside our in-house team?"]
    body = (hero() + work() + services() + scorecard()
            + plans("Engagements", "Flat monthly fees by ad-spend band. You pay the platforms directly.", tiers, LABEL)
            + voices()
            + faq_section(qs, "You do. Accounts stay registered to your business, and every creative we make is yours to keep, whether or not we keep working together.", "What founders ask before they sign.")
            + contact(LABEL) + footer() + chat_icon(652))
    return page(body, 1440)
