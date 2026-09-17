"""Round 4 service page template (Meta Ads), desktop 1440. Nav and hero are the live site's, unchanged."""
from base import (page, NAV, footer, sd_hero, ARR_SVG, dot, btn, link, head, work_card, icon, avatar, plans, faq_section)

LABEL = "Get my Meta audit"


def col_head(title_html, sub):
    return '<div style="display:flex;flex-direction:column;gap:16px;"><h2 class="t-display">' + title_html + '</h2><p class="t-lead">' + sub + '</p></div>'


def fit():
    yes = ["You sell D2C on your own site, and Meta is your largest channel", "You spend &#8377;3L or more a month on Meta, or plan to this quarter",
           "You want margin to grow, not just revenue", "You can share COGS, shipping and RTO data with us"]
    no = ["You need a one-off campaign rather than an always-on engine.", "Your product is not ready for paid scale yet."]
    return ('<div>' + col_head('Fit' + dot(), "Built for brands where Meta is the engine.")
            + '<div style="margin-top:40px;">' + ''.join('<div style="display:flex;gap:14px;align-items:center;padding:16px 0;border-top:1px solid var(--line);"><span style="color:#1D4ED8;">' + icon("check", 20, 2.2) + '</span><span class="t-body">' + t + '</span></div>' for t in yes)
            + '</div><div style="margin-top:20px;display:flex;flex-direction:column;gap:6px;"><span class="t-small">Probably not yet if</span>'
            + ''.join('<span class="t-body muted">' + t + '</span>' for t in no) + '</div></div>')


def pillars():
    rows = [("Account structure", "Full-funnel campaigns and budget rules tied to contribution margin.", ["Advantage+", "Catalogue"]),
            ("Creative engine", "New angles researched, produced and tested every week.", ["Statics", "Reels", "UGC"]),
            ("Measurement", "Conversions API and verified events, so every rupee is counted once.", ["CAPI", "Cohorts", "MER"]),
            ("Reporting", "A weekly scorecard in margin and CAC payback, with a shared test log.", ["Scorecard", "Test log"])]
    return ('<div class="panel4" style="padding:48px 32px 16px;"><div style="display:flex;flex-direction:column;gap:16px;"><span class="t-small" style="color:rgba(255,255,255,.72);">What is included</span>'
            '<h2 class="t-display" style="color:#FFFFFF;">Pillars' + dot() + '</h2><p class="t-lead" style="color:#FFFFFF;">Four pillars on every account. No tiers of attention.</p></div>'
            '<div style="margin-top:40px;">'
            + ''.join('<div style="display:grid;grid-template-columns:240px minmax(0,1fr) 200px;gap:24px;align-items:center;padding:24px 0;border-top:1px solid rgba(255,255,255,.14);">'
                      '<div style="display:flex;flex-direction:column;gap:4px;"><span class="t-micro" style="color:rgba(255,255,255,.6);">0' + str(i + 1) + '</span><span class="t-h3" style="color:#FFFFFF;">' + t + '</span></div>'
                      '<p class="t-body" style="color:rgba(255,255,255,.72);">' + d + '</p>'
                      '<div style="display:flex;flex-wrap:wrap;gap:8px;">' + ''.join('<span class="chip4">' + c + '</span>' for c in chips[:3]) + '</div></div>' for i, (t, d, chips) in enumerate(rows))
            + '</div></div>')


def work():
    cards = [("cs-sprnt.jpg", ["Website", "Ads"], "Sprnt", "Activewear", "Activewear with a store and ads scaled together.", "Website &#183; Ads &#183; Creative"),
             ("cs-notic.jpg", ["Website", "Social"], "Notic", "Car fragrance", "A car-fragrance label with a performance-first store.", "Website &#183; Ads &#183; Social")]
    return ('<div>' + col_head('Our Work' + dot(), "Ads that earn the scroll.")
            + '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px;margin-top:40px;">'
            + ''.join(work_card(*c, img_h=321, hover=(i == 0)) for i, c in enumerate(cards)) + '</div></div>')


def month_one():
    weeks = [("Audit", "Account, pixel, catalogue and unit economics reviewed. Margin targets agreed."), ("Structure &amp; tracking", "Campaigns rebuilt. Conversions API and every key event verified."),
             ("Creative sprint", "The first batch of new angles goes live against a test plan you sign off."), ("Scale rules", "Budget rules tied to margin. The weekly scorecard begins.")]
    return ('<div>' + col_head('Month one' + dot(), "Four weeks to a working engine.")
            + '<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px;margin-top:40px;">'
            + ''.join('<div style="display:flex;flex-direction:column;gap:8px;padding-top:16px;border-top:1px solid var(--line);"><span class="t-micro t-up muted">Week ' + str(i + 1) + '</span>'
                      '<span class="t-h3">' + t + '</span><span class="t-body muted">' + d + '</span></div>' for i, (t, d) in enumerate(weeks))
            + '</div></div>')


def audit_card():
    """Airbnb's reservation card, as a free audit. Sticky from below the hero to the end of the column."""
    facts = ["For D2C brands on Meta", "Live in 14 days", "Plans from &#8377;3L a month"]
    return ('<aside class="card4" style="position:sticky;top:96px;padding:24px;border:1px solid var(--line);box-shadow:var(--sh-float);display:flex;flex-direction:column;gap:20px;">'
            '<div style="display:flex;flex-direction:column;gap:8px;"><span class="t-h2" style="font-size:32px;">Free Meta audit</span>'
            + ''.join('<span class="t-small muted" style="display:flex;gap:8px;align-items:center;"><span style="color:#1D4ED8;">' + icon("check", 16, 2.2) + '</span>' + f + '</span>' for f in facts) + '</div>'
            '<div style="border:1px solid var(--line);border-radius:var(--r-ctl);">'
            '<div style="height:64px;padding:10px 16px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--line);"><div style="display:flex;flex-direction:column;gap:2px;"><span class="t-micro t-up">Monthly Meta spend</span><span class="t-body muted">Choose a range</span></div><span class="muted">' + icon("down", 20, 2) + '</span></div>'
            '<div style="height:64px;padding:10px 16px;display:flex;flex-direction:column;justify-content:center;gap:2px;"><span class="t-micro t-up">Website</span><span class="t-body muted">yourbrand.com</span></div></div>'
            + btn(LABEL, "ink", full=True)
            + '<span class="t-micro muted" style="text-align:center;font-weight:500;">Reply within one working day. No retainer to start.</span>'
            '<div style="display:flex;align-items:center;gap:12px;padding-top:20px;border-top:1px solid var(--line);">' + avatar() + '<div style="display:flex;flex-direction:column;"><span class="t-small">[Name], runs your account</span><span class="t-micro muted" style="font-weight:500;">Head of Performance, MMC</span></div></div>'
            '<div class="t-small muted" style="display:flex;flex-wrap:wrap;gap:6px 14px;">' + ''.join('<span style="text-decoration:underline;text-underline-offset:3px;">' + a + '</span>' for a in ["Pillars", "Work", "Month one", "Plans", "FAQ"]) + '</div>'
            '</aside>')


def compare():
    rows = [("Who runs the account", "A senior strategist and a creative lead", "Whoever you can hire and keep", "Often a junior after onboarding"),
            ("New creative every month", "30 to 120+, tested weekly", "Depends on team size", "A handful of variations"),
            ("What success means", "Contribution margin and CAC payback", "Varies by team", "Platform ROAS"),
            ("Time to a working setup", "Four weeks", "Months of hiring", "Varies")]
    cols = 'display:grid;grid-template-columns:300px repeat(3,minmax(0,1fr));gap:24px;align-items:center;'
    return ('<section style="padding:64px 48px 0;"><div style="' + cols + 'padding-bottom:12px;">'
            + ''.join('<span class="t-small ' + ('' if i == 1 else 'muted') + '" style="' + ('color:#1D4ED8;font-weight:600;' if i == 1 else '') + '">' + h + '</span>' for i, h in enumerate(["How we compare", "MMC", "In-house team", "Typical agency"]))
            + '</div>'
            + ''.join('<div style="' + cols + 'padding:18px 0;border-top:1px solid var(--line);"><span class="t-body" style="font-weight:500;">' + a + '</span>'
                      '<span class="t-body" style="display:flex;gap:10px;align-items:center;font-weight:500;"><span style="color:#1D4ED8;">' + icon("check", 18, 2.2) + '</span>' + b + '</span>'
                      '<span class="t-body muted">' + c + '</span><span class="t-body muted">' + d + '</span></div>' for a, b, c, d in rows)
            + '</section>')


def related():
    items = [("svc-performance.jpg", "Google &amp; YouTube Ads", "Search, Performance Max and YouTube, on the same margin rules."),
             ("svc-creative.jpg", "Creative &amp; UGC", "Statics, reels and creator content, produced every week."),
             ("svc-retention.jpg", "Retention on WhatsApp", "COD confirmation, replenishment and win-back flows.")]
    return ('<section style="padding:128px 48px 128px;">' + head("Keep exploring", 'Related' + dot(), "Services that usually run alongside Meta.")
            + '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:48px;">'
            + ''.join('<div style="display:flex;flex-direction:column;gap:12px;"><div style="height:288px;border-radius:var(--r-media);overflow:hidden;background:var(--placeholder);"><img src="' + im + '" alt="" class="cover"></div>'
                      '<span class="t-h3">' + t + '</span><span class="t-body muted">' + d + '</span></div>' for im, t, d in items)
            + '</div></section>')


def build():
    tiers = [("Spark", "&#8377;3L", "Up to &#8377;10L monthly Meta spend", ["30 new creatives a month", "Weekly scorecard", "Monthly strategy review"], False),
             ("Compound", "&#8377;6L", "&#8377;10L to &#8377;50L monthly Meta spend", ["60 to 80 creatives a month", "Scorecard and test log", "Fortnightly strategy call", "Landing page advice"], True),
             ("Scale", "&#8377;12L+", "&#8377;50L+ monthly Meta spend", ["120+ creatives a month", "A dedicated senior pod", "Weekly strategy call"], False)]
    qs = ["Who owns the ad account, pixel and creative?", "Is creative production included in the fee?", "What ROAS do we need to break even?",
          "Can you work with our in-house team?", "How soon will we see results?"]
    two_col = ('<section style="padding:64px 48px 0;"><div style="display:grid;grid-template-columns:880px 400px;gap:64px;align-items:start;">'
               '<div style="display:flex;flex-direction:column;gap:128px;">' + fit() + pillars() + work() + month_one() + '</div>'
               + audit_card() + '</div></section>')
    body = ('<div style="position:relative;">' + NAV + '</div>' + sd_hero() + two_col
            + plans("Packages", "Pick by ad spend. You pay Meta directly, and every plan includes all four pillars.", tiers, LABEL)
            + compare()
            + faq_section(qs, "You do. We work inside the ad account and pixel registered to your business, and every creative we make is yours.", "Meta Ads, answered.")
            + related() + footer())
    return page(body, 1440)
