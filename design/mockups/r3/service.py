"""Round 3 service page template (Meta Ads), desktop 1440. Nav and hero are the live site's, unchanged."""
from base import page, NAV, footer, sd_hero, ARR_SVG, em, btn, btn_line, head, tags, chat_bubble, faq, SUN

CHECK = '<svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M4 9.5l3.2 3L14 5.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
CROSS = '<svg width="12" height="12" viewBox="0 0 18 18" fill="none"><path d="M4.5 4.5l9 9M13.5 4.5l-9 9" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>'


def fit():
    yes = ["You sell D2C on your own site, and Meta is your largest channel", "You spend &#8377;3L or more a month on Meta, or plan to this quarter", "You want margin to grow, not just revenue", "You can share COGS, shipping and RTO data with us"]
    no = ["You need a one-off campaign rather than an always-on engine", "Your product is not yet ready for paid scale", "You want vanity metrics reported instead of contribution"]
    row = lambda t, ic, bg, fg, col: ('<div style="display:grid;grid-template-columns:30px minmax(0,1fr);gap:14px;align-items:start;padding:18px 0;border-top:1px solid ' + col + ';">'
                                      '<span class="x-round" style="width:28px;height:28px;background:' + bg + ';color:' + fg + ';">' + ic + '</span><span style="font-size:19px;font-weight:500;line-height:1.35;letter-spacing:-0.035em;">' + t + '</span></div>')
    return ('<section style="padding:70px 48px 0;">' + head("Who it is for", 'Fit' + em('.', SUN), "Built for brands where Meta is the engine.")
            + '<div class="x" style="display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:16px;margin-top:56px;">'
            '<div class="x-card" style="padding:34px 36px 20px;color:#0E1626;"><span style="font-size:14px;font-weight:600;color:#15803D;">A strong fit if</span><div style="margin-top:16px;">'
            + ''.join(row(t, CHECK, "#DCF3E4", "#15803D", "rgba(15,30,94,0.08)") for t in yes) + '</div></div>'
            '<div style="padding:34px 36px 20px;border-radius:14px;border:1px solid rgba(15,30,94,0.14);color:#4F5A6B;"><span style="font-size:14px;font-weight:600;color:#4F5A6B;">Probably not yet if</span><div style="margin-top:16px;">'
            + ''.join(row(t, CROSS, "rgba(15,30,94,0.07)", "#4F5A6B", "rgba(15,30,94,0.1)") for t in no) + '</div></div></div></section>')


def pillars():
    rows = [("Structure", "Account structure", "Full-funnel campaigns, consolidated ad sets and budget rules tied to contribution margin.", ["Prospecting", "Retargeting", "Advantage+", "Catalogue"]),
            ("Creative", "Creative engine", "New angles researched, produced and tested every week, so winners are ready before the current ones tire.", ["Statics", "Reels", "UGC", "Hook tests"]),
            ("Measurement", "Measurement", "Conversions API, verified events and cohort views, so every rupee is counted once.", ["Conversions API", "Events", "Cohorts", "MER"]),
            ("Reporting", "Reporting", "A weekly scorecard in margin and CAC payback, with a shared test log and a strategy call.", ["Weekly scorecard", "Test log", "Slack", "Strategy call"])]
    out = ''.join('<div class="x" style="display:grid;grid-template-columns:130px 260px minmax(0,440px) minmax(0,1fr) 44px;gap:0 24px;align-items:start;padding:36px 0;border-top:1px solid rgba(255,255,255,0.14);">'
                  '<span style="font-size:16px;font-weight:500;color:rgba(255,255,255,0.85);padding-top:6px;">0' + str(i + 1) + '</span>'
                  '<span class="x-em" style="font-size:40px;line-height:1;color:#FFC528;">' + m + '</span>'
                  '<div style="display:flex;flex-direction:column;gap:14px;"><span style="font-size:30px;font-weight:500;line-height:36px;letter-spacing:-0.04em;color:#FFFFFF;">' + t + '</span><span style="font-size:16px;font-weight:500;line-height:22px;letter-spacing:-0.04em;color:rgba(255,255,255,0.72);">' + d + '</span></div>'
                  '<div style="display:flex;flex-direction:column;gap:10px;"><span style="font-size:12px;font-weight:500;color:rgba(255,255,255,0.7);">Included</span><div style="display:flex;flex-wrap:wrap;gap:8px;">' + ''.join('<span class="x-chip">' + c + '</span>' for c in chips) + '</div></div>'
                  '<span class="x-round" style="border:1px solid rgba(255,255,255,0.35);color:#FFFFFF;margin-top:40px;">' + ARR_SVG + '</span></div>' for i, (m, t, d, chips) in enumerate(rows))
    return ('<section style="padding:120px 40px 0;"><div class="x-panel" style="padding:90px 40px 40px;"><div class="x-grid"></div>'
            + head("What is included", 'Pillars' + em('.', SUN), "Four pillars on every account. No tiers of attention.", dark=True, left=260)
            + '<div style="margin-top:56px;">' + out + '</div></div></section>')


def creative():
    tiles = ''.join('<span style="position:absolute;left:' + str(x) + 'px;top:' + str(y) + 'px;width:200px;height:356px;border-radius:14px;overflow:hidden;box-shadow:0 30px 60px -30px rgba(7,14,42,0.55);"><img src="' + im + '" alt="" class="cover"></span>'
                    for im, x, y in [("reel-tgg-1.jpg", 0, 60), ("reel-wa-1.jpg", 216, 0), ("reel-tgg-3.jpg", 432, 90)])
    stamp = ('<div class="x" style="position:absolute;left:330px;top:390px;padding:14px 16px;border-radius:12px;background:#FFFFFF;box-shadow:0 24px 50px -24px rgba(7,14,42,0.5);display:flex;flex-direction:column;gap:6px;width:230px;">'
             '<span style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#4F5A6B;">Test log &#183; week 36</span>'
             + ''.join('<div style="display:flex;justify-content:space-between;font-size:13px;"><span style="color:#0E1626;">' + a + '</span><span style="font-weight:700;color:' + c + ';">' + b + '</span></div>' for a, b, c in [("Founder hook", "Winner", "#15803D"), ("Price-led static", "Iterate", "#B45309"), ("UGC unboxing", "Winner", "#15803D")])
             + '</div>')
    points = ["New angles researched from reviews, comments and competitor ads", "Statics, reels and UGC produced in weekly batches", "Hook, format and offer tests logged in one shared library", "Winners rolled into evergreen campaigns within days"]
    return ('<section class="x" style="padding:130px 48px 0;"><div style="display:grid;grid-template-columns:640px minmax(0,1fr);gap:70px;align-items:center;">'
            '<div style="position:relative;height:500px;">' + tiles + stamp + '</div>'
            '<div style="display:flex;flex-direction:column;gap:20px;"><span class="x-label" style="color:#1D4ED8;">Creative engine</span>'
            '<h2 style="margin:0;font-size:56px;font-weight:600;line-height:1.05;letter-spacing:-0.04em;color:#0E1626;">A creative engine that never waits for a <span class="x-em" style="color:#1D4ED8;">brief.</span></h2>'
            '<p style="margin:0;font-size:17px;line-height:1.55;color:#4F5A6B;max-width:46ch;">Creative is where Meta is won. We research, produce and test in a weekly rhythm, so fresh winners are ready before the current ones fatigue.</p>'
            '<div style="display:flex;flex-direction:column;margin-top:6px;">'
            + ''.join('<div style="display:grid;grid-template-columns:44px minmax(0,1fr);align-items:center;padding:14px 0;border-top:1px solid rgba(15,30,94,0.1);"><span style="font-size:14px;font-weight:600;color:#1D4ED8;">0' + str(i + 1) + '</span><span style="font-size:17px;font-weight:500;letter-spacing:-0.03em;color:#0E1626;">' + p + '</span></div>' for i, p in enumerate(points))
            + '</div><div style="margin-top:8px;">' + btn("See the creative work", "ink") + '</div></div></div></section>')


def month_one():
    weeks = [("Audit", "Account, pixel, catalogue and unit economics reviewed. Margin targets agreed in writing."), ("Structure &amp; tracking", "Campaign architecture rebuilt. Conversions API and every key event verified."),
             ("Creative sprint", "The first batch of new angles goes live against a test plan you sign off."), ("Scale rules", "Budget rules tied to contribution margin. The weekly scorecard begins.")]
    return ('<section style="padding:130px 48px 0;">' + head("Your first month", 'Month one' + em('.', SUN), "Four weeks to a working engine. No three-month discovery phase.")
            + '<div style="position:relative;margin-top:56px;"><div style="position:absolute;left:0;right:0;top:27px;height:2px;background:linear-gradient(90deg,#1D4ED8,#FFC528);"></div>'
            '<div style="position:relative;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;">'
            + ''.join('<div class="x" style="display:flex;flex-direction:column;gap:18px;"><span style="align-self:flex-start;display:inline-flex;align-items:center;height:56px;padding:0 22px;border-radius:50px;font-size:16px;font-weight:600;letter-spacing:-0.02em;' + ('background:#FFC528;color:#0F1E5E;' if i == 3 else 'background:#0F1E5E;color:#FFFFFF;') + '">Week ' + str(i + 1) + '</span>'
                      '<div class="x-card" style="padding:28px;display:flex;flex-direction:column;gap:12px;min-height:200px;"><span style="font-size:26px;font-weight:600;letter-spacing:-0.045em;color:#0E1626;">' + t + '</span><span style="font-size:15.5px;line-height:1.55;color:#4F5A6B;">' + d + '</span></div></div>' for i, (t, d) in enumerate(weeks))
            + '</div></div></section>')


def lead():
    return ('<section class="x" style="padding:120px 48px 0;"><div class="x-card" style="display:grid;grid-template-columns:260px minmax(0,1fr);gap:48px;align-items:center;padding:40px 48px;border-radius:20px;">'
            '<span style="width:220px;height:260px;border-radius:14px;background:linear-gradient(160deg,#2B5CE0,#0F1E5E);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;letter-spacing:0.08em;color:rgba(255,255,255,0.8);">[PHOTO]</span>'
            '<div style="display:flex;flex-direction:column;gap:22px;"><span class="x-em" style="font-size:90px;line-height:0.5;color:#FFC528;height:36px;">&#8220;</span>'
            '<p style="margin:0;font-size:36px;font-weight:500;line-height:1.2;letter-spacing:-0.045em;color:#0E1626;">[A line from the MMC lead who runs Meta accounts, on how every account is run.]</p>'
            '<div style="display:flex;justify-content:space-between;align-items:end;"><div><div style="font-size:18px;font-weight:600;letter-spacing:-0.04em;">[Name]</div><div style="font-size:13px;color:#4F5A6B;">Head of Performance, MMC</div></div>'
            + btn_line("Meet the team", dark_ground=False) + '</div></div></div></section>')


def work():
    cards = [("cs-sprnt.jpg", ["Website", "Performance ads", "Creative"], "Activewear built for Indian summers, with a store and ad engine that scale together.", "Website &#183; Ads &#183; Creative &#183; Social"),
             ("cs-notic.jpg", ["Website", "Performance ads", "Social media"], "A premium car-fragrance label launched with a performance-first store.", "Website &#183; Ads &#183; Social")]
    return ('<section style="padding:130px 48px 0;"><div style="display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:end;">' + head("Meta work", 'Our Work' + em('.', SUN), "Ads that earn the scroll.")
            + '<div style="padding-bottom:4px;">' + btn("All D2C work", "ink") + '</div></div>'
            '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px;margin-top:56px;">'
            + ''.join('<div class="x" style="display:flex;flex-direction:column;gap:18px;"><div style="position:relative;height:430px;border-radius:16px;overflow:hidden;"><img src="' + im + '" alt="" class="cover"><div style="position:absolute;left:14px;top:14px;">' + tags(tg) + '</div></div>'
                      '<p style="margin:0;font-size:20px;font-weight:500;line-height:1.3;letter-spacing:-0.035em;color:#0E1626;max-width:34ch;">' + d + '</p>'
                      '<div style="display:flex;justify-content:space-between;align-items:end;gap:24px;"><div style="display:flex;flex-direction:column;gap:4px;"><span style="font-size:12px;color:#4F5A6B;">What we ran</span><span style="font-size:18px;font-weight:600;letter-spacing:-0.03em;color:#0E1626;">' + ran + '</span></div>'
                      '<span style="display:inline-flex;align-items:center;height:36px;padding:0 14px;border-radius:4px;background:#0F1E5E;color:#FFFFFF;font-size:12px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;">View project</span></div></div>' for im, tg, d, ran in cards)
            + '</div></section>')


def packages():
    tiers = [("Spark", "&#8377;3L", "Up to &#8377;10L monthly Meta spend", ["30 new creatives a month", "Weekly scorecard", "Monthly strategy review"], False, "Start with Spark"),
             ("Compound", "&#8377;6L", "&#8377;10L to &#8377;50L monthly Meta spend", ["60 to 80 new creatives a month", "Weekly scorecard and test log", "Fortnightly strategy call", "Landing page recommendations"], True, "Start with Compound"),
             ("Scale", "&#8377;12L+", "&#8377;50L+ monthly Meta spend", ["120+ new creatives a month", "A dedicated senior pod", "Weekly strategy call"], False, "Start with Scale")]
    col = ''
    for n, p, band, feats, hi, cta in tiers:
        fg, fg2 = ("#FFFFFF", "rgba(255,255,255,0.74)") if hi else ("#0E1626", "#4F5A6B")
        col += ('<div class="x' + (' x-panel' if hi else ' x-card') + '" style="padding:36px 32px;display:flex;flex-direction:column;gap:20px;border-radius:16px;">' + ('<div class="x-grid"></div>' if hi else '')
                + '<div style="display:flex;justify-content:space-between;align-items:center;"><span style="font-size:22px;font-weight:600;letter-spacing:-0.04em;color:' + fg + ';">' + n + '</span>'
                + ('<span style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:4px 10px;border-radius:20px;background:#FFC528;color:#0F1E5E;">Most chosen</span>' if hi else '') + '</div>'
                '<div style="display:flex;align-items:baseline;gap:8px;"><span style="font-size:64px;font-weight:600;line-height:1;letter-spacing:-0.06em;color:' + fg + ';">' + p + '</span><span style="font-size:13px;color:' + fg2 + ';">per month + GST</span></div>'
                '<span style="font-size:14px;font-weight:600;color:' + ('#FFC528' if hi else '#1D4ED8') + ';">' + band + '</span>'
                '<div style="display:flex;flex-direction:column;gap:12px;padding-top:20px;border-top:1px solid ' + ('rgba(255,255,255,0.16)' if hi else 'rgba(15,30,94,0.1)') + ';">'
                + ''.join('<span style="display:flex;gap:10px;font-size:15px;line-height:1.45;color:' + fg2 + ';"><span style="width:6px;height:6px;border-radius:50%;background:#FFC528;margin-top:8px;flex:none;"></span>' + f + '</span>' for f in feats)
                + '</div><div style="margin-top:auto;padding-top:8px;">' + btn(cta, "white" if hi else "ink") + '</div></div>')
    return ('<section style="padding:130px 48px 0;">' + head("Packages", 'Plans' + em('.', SUN), "Pick by ad spend, not by features. You pay Meta directly, and every plan includes all four pillars.")
            + '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:56px;">' + col + '</div></section>')


def compare():
    rows = [("Who runs the account", "A senior strategist and a creative lead", "Whoever you can hire and keep", "Often a junior after onboarding"),
            ("New creative every month", "30 to 120+, tested weekly", "Depends on team size", "A handful of variations"),
            ("What success means", "Contribution margin and CAC payback", "Varies by team", "Platform ROAS"),
            ("Time to a working setup", "Four weeks", "Months of hiring", "Varies")]
    cols = 'display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1.2fr) minmax(0,1fr) minmax(0,1fr);'
    return ('<section style="padding:120px 24px 0;"><div class="x-card x" style="border-radius:20px;padding:49px 24px 40px;">'
            + head("How we compare", 'Compare' + em('.', SUN), "MMC, an in-house team, or another agency?")
            + '<div style="margin-top:56px;position:relative;"><div style="position:absolute;top:-14px;bottom:-14px;left:calc((100% - 0px) * 1.1 / 4.3);width:calc(100% * 1.2 / 4.3);border-radius:14px;background:linear-gradient(180deg,#16329E,#0F1E5E);"></div>'
            '<div style="position:relative;' + cols + 'padding:10px 0 18px;">'
            + ''.join('<span style="padding:0 24px;font-size:' + ('20px;font-weight:600;color:#FFFFFF;' if i == 1 else '16px;font-weight:600;color:#4F5A6B;') + 'letter-spacing:-0.03em;">' + h + '</span>' for i, h in enumerate(["", "MMC", "In-house team", "Typical agency"]))
            + '</div>'
            + ''.join('<div style="position:relative;' + cols + 'align-items:center;border-top:1px solid rgba(15,30,94,0.08);">'
                      '<span style="padding:22px 24px 22px 0;font-size:17px;font-weight:600;letter-spacing:-0.03em;color:#0E1626;">' + a + '</span>'
                      '<span style="padding:22px 24px;font-size:16px;font-weight:600;letter-spacing:-0.02em;color:#FFFFFF;border-top:1px solid rgba(255,255,255,0.12);margin-top:-1px;">' + b + '</span>'
                      '<span style="padding:22px 24px;font-size:15.5px;color:#4F5A6B;">' + c + '</span><span style="padding:22px 24px;font-size:15.5px;color:#4F5A6B;">' + d + '</span></div>' for a, b, c, d in rows)
            + '</div></div></section>')


def questions():
    qs = ["Who owns the ad account, pixel and creative?", "Is creative production included in the fee?", "How do you calculate contribution margin?", "Can you work with our in-house performance team?", "How soon will we see results?"]
    return ('<section class="x" style="padding:130px 48px 0;"><div style="display:grid;grid-template-columns:minmax(0,1fr) 675px;gap:40px;">'
            '<div style="display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;flex-direction:column;gap:26px;"><h2 class="x-title">FAQ' + em('.', SUN) + '</h2><p style="margin:0;font-size:16px;line-height:1.5;color:#4F5A6B;max-width:36ch;">Meta Ads, answered.</p></div>'
            '<div style="display:flex;flex-direction:column;gap:14px;align-items:flex-start;"><span style="font-size:16px;font-weight:500;color:#0E1626;">Have more questions?</span>' + btn("Let us know", "ink") + '</div></div>'
            + faq(qs, "You do. We work inside the ad account and pixel registered to your business, and every creative we make is yours.") + '</div></section>')


def related():
    items = [("svc-performance.jpg", "Service", "Google &amp; YouTube Ads"), ("svc-creative.jpg", "Service", "Creative &amp; UGC"), ("svc-retention.jpg", "Service", "Retention on WhatsApp")]
    return ('<section style="padding:130px 48px 0;">' + head("Keep exploring", 'Related' + em('.', SUN), "Services that usually run alongside Meta.")
            + '<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin-top:56px;">'
            + ''.join('<div class="x" style="display:flex;flex-direction:column;gap:14px;"><div style="height:240px;border-radius:12px;overflow:hidden;"><img src="' + im + '" alt="" class="cover"></div>'
                      '<span style="font-size:13px;font-weight:500;color:#1D4ED8;">' + k + '</span><div style="display:flex;justify-content:space-between;align-items:center;gap:12px;"><span style="font-size:24px;font-weight:600;letter-spacing:-0.045em;color:#0E1626;">' + t + '</span>'
                      '<span class="x-round" style="border:1px solid rgba(15,30,94,0.25);color:#0F1E5E;">' + ARR_SVG + '</span></div></div>' for im, k, t in items)
            + '<div class="x-panel x" style="padding:30px;display:flex;flex-direction:column;gap:14px;border-radius:12px;"><div class="x-grid"></div><span style="font-size:13px;font-weight:600;color:#FFC528;">Free tool</span>'
            '<span style="font-size:30px;font-weight:600;line-height:1.1;letter-spacing:-0.045em;">What ROAS do you need to break even?</span>'
            '<span style="font-size:14px;line-height:1.5;color:rgba(255,255,255,0.72);">Put in price, COGS, shipping and returns. Get the ROAS that keeps you profitable.</span>'
            '<div style="margin-top:auto;">' + btn("Open calculator", "white") + '</div></div></div></section>')


def closing():
    return ('<section style="padding:130px 40px 120px;"><div class="x-panel x" style="padding:90px 60px;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:40px;align-items:end;"><div class="x-grid"></div>'
            '<div style="display:flex;flex-direction:column;gap:22px;"><span class="x-label" style="color:rgba(255,255,255,0.8);">Free Meta audit</span>'
            '<h2 style="margin:0;font-size:84px;font-weight:600;line-height:0.98;letter-spacing:-0.06em;">Let&#8217;s look inside your Meta ' + em('account.', SUN) + '</h2>'
            '<p style="margin:0;font-size:18px;line-height:1.5;color:rgba(255,255,255,0.76);max-width:52ch;">We review structure, creative and unit economics, and send you the three changes we would make first.</p></div>'
            '<div style="display:flex;flex-direction:column;gap:12px;align-items:stretch;">' + btn("Audit my Meta account", "white") + btn_line("See packages") + '</div></div></section>')


def build():
    body = ('<div style="position:relative;">' + NAV + '</div>' + sd_hero() + fit() + pillars() + creative() + month_one() + lead() + work() + packages() + compare()
            + questions() + related() + closing() + footer() + chat_bubble(900))
    return page(body, 1440)
