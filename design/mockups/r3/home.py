"""Round 3 homepage, desktop 1440: 3 Minds presentation, MMC colours and accent font, DM Sans."""
from base import page, NAV, footer, ARROW, ARR_SVG, em, btn, btn_line, head, tags, stats_band, chat_bubble, faq, SUN, BLUE, INK

W = 1440


def hero():
    reels = [("reel-tgg-4.jpg", 0, 40), ("reel-wa-4.jpg", 300, 0)]
    wall = ''.join('<span style="position:absolute;left:' + str(x) + 'px;top:' + str(y) + 'px;width:280px;height:500px;border-radius:16px;overflow:hidden;box-shadow:0 40px 80px -40px rgba(0,0,0,0.9);border:1px solid rgba(255,255,255,0.12);">'
                   '<img src="' + im + '" alt="" class="cover"></span>' for im, x, y in reels)
    return (
        '<section class="x" style="position:relative;height:800px;overflow:hidden;background:linear-gradient(180deg,#0F1E5E 0%,#0A1440 60%,#070E2A 100%);color:#FFFFFF;">'
        '<div style="position:absolute;inset:0;background:radial-gradient(40% 50% at 78% 45%,rgba(29,78,216,0.45),rgba(29,78,216,0) 70%);"></div>'
        '<div style="position:absolute;left:840px;top:170px;width:600px;height:560px;">' + wall + '</div>'
        + NAV +
        '<div style="position:absolute;left:73px;top:236px;width:600px;display:flex;flex-direction:column;align-items:flex-start;">'
        '<span style="display:inline-flex;align-items:center;height:22px;padding:0 10px;border-radius:20px;background:rgba(255,255,255,0.15);font-size:10px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;">Profit-first growth studio</span>'
        '<h1 style="margin:18px 0 0;font-weight:600;font-size:60px;line-height:1.02;letter-spacing:-0.055em;color:#FAFAFA;">Performance marketing that survives the ' + em('P&amp;L.', SUN) + '</h1>'
        '<p style="margin:24px 0 0;font-size:16px;line-height:24px;color:rgba(250,250,250,0.82);max-width:500px;">We grow D2C brands and educational institutes through performance media, creative, retention and technology, run by one senior team and measured on margin and admissions. Trusted by The Growing Giraffe, OOsh, Lepure, MVJ College and more.</p>'
        '<div style="display:flex;gap:16px;margin-top:32px;">' + btn("Book a strategy call", "white") + btn_line("See our work") + '</div></div>'
        '<div style="position:absolute;left:640px;top:520px;width:240px;padding:18px 18px 16px;border-radius:12px;border:1px solid rgba(255,255,255,0.28);background:linear-gradient(160deg,rgba(29,78,216,0.97),rgba(15,30,94,0.97));box-shadow:0 30px 60px -24px rgba(0,0,0,0.85);z-index:5;">'
        '<div style="display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:rgba(255,255,255,0.75);"><img src="mmc-mark.png" alt="" style="width:18px;height:18px;object-fit:contain;filter:brightness(0) invert(1);">Across the client book</div>'
        '<div style="margin-top:12px;font-weight:600;font-size:52px;line-height:1;letter-spacing:-0.05em;">&#8377;248<span style="color:#FFC528;font-size:0.55em;">Cr+</span></div>'
        '<div style="margin-top:8px;font-size:13px;line-height:1.45;color:rgba(255,255,255,0.8);">revenue compounded for clients since 2019. <span style="color:#FFC528;border-bottom:1px solid #FFC528;font-weight:600;">Explore the work</span></div></div>'
        '</section>')


def logos():
    names = ["giraffe", "oosh", "lepure", "mvj", "notic", "sprnt", "mbb", "vagakids", "sprouts", "awwbaby", "mittiy", "bloom"]
    return ('<section class="x" style="padding:40px 48px 0;">'
            '<div style="display:grid;grid-template-columns:300px 150px minmax(0,1fr);align-items:center;">'
            '<span class="x-label">Selected work</span><span style="font-size:18px;font-weight:600;letter-spacing:-0.04em;color:#0E1626;">Impact created for</span>'
            '<div style="display:flex;align-items:center;gap:52px;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 6%,#000 90%,transparent);mask-image:linear-gradient(90deg,transparent,#000 6%,#000 90%,transparent);">'
            + ''.join('<img src="logo-' + n + '.png" alt="' + n + '" style="height:40px;width:auto;flex:none;opacity:0.9;">' for n in names)
            + '</div></div></section>')


def work():
    cards = [("cs-oosh.jpg", ["Website", "Performance ads", "Creative"], "An e-commerce storefront and performance engine for a growing personal-care brand.", "D2C brand", "Website &#183; Ads &#183; Creative"),
             ("cs-mvj.jpg", ["Website", "Lead generation", "Social media"], "An admissions-first website and campaigns for an autonomous engineering college.", "Educational institute", "Website &#183; Leads &#183; Social"),
             ("cs-giraffe.jpg", ["CRO", "Performance ads", "Quick commerce"], "Kids&#8217; snacks scaled across the brand store, Amazon and quick commerce.", "D2C brand", "CRO &#183; Ads &#183; Marketplaces"),
             ("cs-sprouts.jpg", ["Website", "Lead generation", "Creative"], "Educational trips sold to schools, with an enquiry page for every destination.", "Educational travel", "Website &#183; Leads &#183; Creative"),
             ("cs-notic.jpg", ["Website", "Performance ads", "Social media"], "A premium car-fragrance label, launched online with a performance-first store.", "D2C brand", "Website &#183; Ads &#183; Social"),
             ("cs-vagakids.jpg", ["Website", "Performance ads", "Creative"], "Festive campaigns and a storefront for a playful kids&#8217; footwear brand.", "D2C brand", "Website &#183; Ads &#183; Creative")]
    grid = ''.join(
        '<div style="display:flex;flex-direction:column;gap:18px;">'
        '<div style="position:relative;height:430px;border-radius:16px;overflow:hidden;"><img src="' + img + '" alt="" class="cover">'
        '<div style="position:absolute;left:14px;top:14px;">' + tags(tg) + '</div></div>'
        '<p class="x" style="margin:0;font-size:20px;font-weight:500;line-height:1.3;letter-spacing:-0.035em;color:#0E1626;max-width:34ch;">' + desc + '</p>'
        '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr)) auto;gap:24px;align-items:end;">'
        '<div style="display:flex;flex-direction:column;gap:4px;"><span class="x" style="font-size:12px;color:#4F5A6B;">Audience</span><span class="x" style="font-size:18px;font-weight:600;letter-spacing:-0.03em;color:#0E1626;">' + aud + '</span></div>'
        '<div style="display:flex;flex-direction:column;gap:4px;"><span class="x" style="font-size:12px;color:#4F5A6B;">What we ran</span><span class="x" style="font-size:18px;font-weight:600;letter-spacing:-0.03em;color:#0E1626;">' + ran + '</span></div>'
        '<span class="x" style="display:inline-flex;align-items:center;height:36px;padding:0 14px;border-radius:4px;background:#0F1E5E;color:#FFFFFF;font-size:12px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;">View project</span></div></div>'
        for img, tg, desc, aud, ran in cards)
    return ('<section style="padding:90px 48px 0;">'
            + head("", 'Our Work' + em('.', SUN), "Brands and institutes we have built, launched and grown. A few of our latest projects.")
            + '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:56px 24px;margin-top:56px;">' + grid + '</div>'
            '<div style="display:flex;justify-content:center;margin-top:64px;"><span class="x" style="display:inline-flex;align-items:center;gap:10px;height:48px;padding:0 26px;border-radius:4px;background:#0F1E5E;color:#FFFFFF;font-size:13px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;">View all projects<span style="width:6px;height:6px;border-radius:50%;background:#FFC528;"></span></span></div></section>')


def services():
    rows = [("Media", "Performance media", "Meta, Google, YouTube, Amazon and quick commerce, budgeted on contribution margin.", ["Meta Ads", "Google Ads", "Amazon Ads", "Quick commerce", "YouTube"], "2+"),
            ("Creative", "Creative &amp; UGC", "Statics, reels, creator content and packaging, produced and tested every week.", ["Performance creative", "UGC", "Reels", "Packaging"], "1+"),
            ("Retention", "Retention &amp; follow-up", "Email and WhatsApp journeys that bring customers back and turn enquiries into visits.", ["Email flows", "WhatsApp", "CRM", "COD confirmation"], None),
            ("Tech", "Conversion &amp; technology", "Shopify storefronts, landing pages, CRO and tracking that make every rupee count.", ["Shopify", "Landing pages", "CRO", "Analytics"], "2+"),
            ("Admissions", "Admissions marketing", "Enquiry-first websites, campaigns and counsellor follow-up for educational institutes.", ["Lead generation", "Websites", "Counselling journeys", "Reputation"], None)]
    out = ''
    for i, (mark, title, desc, chips, more) in enumerate(rows):
        out += ('<div class="x" style="display:grid;grid-template-columns:130px 260px minmax(0,440px) minmax(0,1fr) 44px;gap:0 24px;align-items:start;padding:40px 0;border-top:1px solid rgba(255,255,255,0.14);">'
                '<span style="font-size:16px;font-weight:500;letter-spacing:-0.04em;color:rgba(255,255,255,0.85);padding-top:6px;">0' + str(i + 1) + '</span>'
                '<span class="x-em" style="font-size:40px;line-height:1;color:#FFC528;">' + mark + '</span>'
                '<div style="display:flex;flex-direction:column;gap:14px;"><span style="font-size:30px;font-weight:500;line-height:36px;letter-spacing:-0.04em;color:#FFFFFF;">' + title + '</span>'
                '<span style="font-size:16px;font-weight:500;line-height:22px;letter-spacing:-0.04em;color:rgba(255,255,255,0.72);">' + desc + '</span></div>'
                '<div style="display:flex;flex-direction:column;gap:10px;"><span style="font-size:12px;font-weight:500;color:rgba(255,255,255,0.7);">Categories</span>'
                '<div style="display:flex;flex-wrap:wrap;gap:8px;">' + ''.join('<span class="x-chip">' + c + '</span>' for c in chips)
                + ('<span class="x-chip" style="background:rgba(255,255,255,0.14);color:#FFFFFF;">' + more + '</span>' if more else '') + '</div></div>'
                '<span class="x-round" style="border:1px solid rgba(255,255,255,0.35);color:#FFFFFF;margin-top:40px;">' + ARR_SVG + '</span></div>')
    return ('<section style="padding:120px 40px 0;"><div class="x-panel" style="padding:90px 40px 40px;"><div class="x-grid"></div>'
            + head("What we do", 'Services' + em('.', SUN), "One senior team. The entire growth lifecycle.", dark=True, left=260)
            + '<div style="margin-top:56px;">' + out + '</div></div></section>')


def focus():
    def panel(img, eyebrow, title, lines, cta):
        return ('<div style="position:relative;height:600px;border-radius:16px;overflow:hidden;color:#FFFFFF;"><img src="' + img + '" alt="" class="cover" style="position:absolute;inset:0;">'
                '<div style="position:absolute;inset:0;background:linear-gradient(0deg,rgba(7,14,42,0.97) 0%,rgba(7,14,42,0.9) 42%,rgba(7,14,42,0.15) 76%);"></div>'
                '<div class="x" style="position:absolute;left:36px;right:36px;bottom:36px;display:flex;flex-direction:column;gap:18px;">'
                '<span style="align-self:flex-start;display:inline-flex;height:22px;align-items:center;padding:0 10px;border-radius:20px;background:rgba(255,255,255,0.16);font-size:10px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;">' + eyebrow + '</span>'
                '<span style="font-size:46px;font-weight:600;line-height:1.02;letter-spacing:-0.05em;max-width:14ch;">' + title + '</span>'
                '<div style="display:flex;flex-wrap:wrap;gap:8px;">' + ''.join('<span class="x-chip">' + l + '</span>' for l in lines) + '</div>'
                '<div style="margin-top:6px;">' + btn(cta, "white") + '</div></div></div>')
    return ('<section style="padding:130px 48px 0;">'
            + head("Who we grow", 'Focus' + em('.', SUN), "D2C brands and educational institutes. Nothing else, so we never learn on your budget.")
            + '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px;margin-top:56px;">'
            + panel("cs-mbb.jpg", "For D2C brands", 'Grow the brand, keep the ' + em('margin.', SUN), ["Meta &amp; Google", "Amazon", "Quick commerce", "Shopify", "Retention"], "Explore D2C growth")
            + panel("cs-mvj.jpg", "For educational institutes", 'Fill every seat with the ' + em('right', SUN) + ' student.', ["Admissions campaigns", "Websites", "WhatsApp follow-up", "Counselling"], "Explore admissions")
            + '</div></section>')


def numbers():
    return ('<section style="padding:120px 48px 0;">'
            + stats_band([("&#8377;248", "Cr+", "Revenue compounded"), ("8.7", "&#215;", "Median blended ROAS"), ("14/14", "", "Clients renewed"), ("27", "mo", "Median client tenure")]) + '</section>')


def talk():
    days = list(range(1, 32))
    grid = ''.join('<span style="height:40px;display:flex;align-items:center;justify-content:center;border-radius:50%;font-size:14px;'
                   + ('background:#1D4ED8;color:#FFFFFF;font-weight:700;' if d == 16 else ('color:#0E1626;font-weight:600;' if d in (13, 14, 15, 17, 20, 21, 22, 23, 24, 27, 28) else 'color:#B6BCC8;')) + '">' + str(d) + '</span>' for d in days)
    return ('<section class="x" style="padding:120px 48px 0;"><div style="display:grid;grid-template-columns:minmax(0,1fr) 520px;gap:60px;align-items:center;padding:0 90px;">'
            '<div style="display:flex;flex-direction:column;gap:18px;"><h2 style="margin:0;font-size:56px;font-weight:600;line-height:1.1;letter-spacing:-0.03em;color:#0E1626;">Your numbers. Our senior team. <span style="color:#1D4ED8;">Let&#8217;s talk.</span></h2>'
            '<p style="margin:0;font-size:16px;font-weight:500;color:#0E1626;">Book a free 30-minute strategy call today.</p></div>'
            '<div class="x-card" style="padding:28px 30px;box-shadow:0 30px 70px -40px rgba(7,14,42,0.35);border:1px solid rgba(15,30,94,0.08);display:flex;flex-direction:column;gap:18px;">'
            '<span style="font-size:18px;font-weight:600;letter-spacing:-0.03em;text-align:center;color:#0E1626;">Select a date &amp; time</span>'
            '<div style="display:flex;justify-content:space-between;align-items:center;"><span class="x-round" style="width:34px;height:34px;color:#4F5A6B;transform:scaleX(-1);">' + ARR_SVG + '</span><span style="font-size:15px;font-weight:600;">October 2026</span><span class="x-round" style="width:34px;height:34px;background:#E3EAFC;color:#1D4ED8;">' + ARR_SVG + '</span></div>'
            '<div style="display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:4px;">'
            + ''.join('<span style="text-align:center;font-size:11px;font-weight:600;letter-spacing:0.06em;color:#4F5A6B;">' + d + '</span>' for d in ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"])
            + '<span></span><span></span><span></span>' + grid + '</div>'
            '<div style="display:flex;gap:8px;">' + ''.join('<span style="flex:1;height:40px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;' + ('background:#0F1E5E;color:#FFFFFF;' if t == "15:30" else 'border:1px solid rgba(15,30,94,0.2);color:#0E1626;') + '">' + t + '</span>' for t in ["10:30", "12:00", "15:30", "17:00"]) + '</div>'
            '<div style="display:flex;justify-content:center;">' + btn("Schedule consultation", "ink") + '</div></div></div></section>')


def voices():
    cards = ''.join('<div class="x-card x" style="padding:30px;display:flex;flex-direction:column;gap:22px;min-height:400px;">'
                    '<div style="display:flex;align-items:center;gap:14px;padding-bottom:20px;border-bottom:1px solid rgba(15,30,94,0.08);"><span style="width:48px;height:48px;border-radius:8px;border:1px solid rgba(15,30,94,0.1);display:flex;align-items:center;justify-content:center;padding:6px;"><img src="logo-' + lg + '.png" alt="" style="max-width:100%;max-height:100%;"></span>'
                    '<div><div style="font-size:18px;font-weight:600;letter-spacing:-0.04em;color:#0E1626;">[Name]</div><div style="font-size:13px;color:#4F5A6B;">[Role], ' + brand + '</div></div></div>'
                    '<span class="x-em" style="font-size:54px;line-height:0.4;color:#FFC528;height:22px;">&#8220;</span>'
                    '<p style="margin:0;font-size:20px;font-weight:500;line-height:26px;letter-spacing:-0.04em;color:#0E1626;">[Client quote about working with MMC: what changed, and why they stayed.]</p></div>'
                    for lg, brand in [("giraffe", "The Growing Giraffe"), ("mvj", "MVJ College"), ("oosh", "OOsh")])
    video = ('<div style="position:relative;min-height:400px;border-radius:12px;overflow:hidden;color:#FFFFFF;"><img src="reel-tgg-2.jpg" alt="" class="cover" style="position:absolute;inset:0;">'
             '<div style="position:absolute;inset:0;background:linear-gradient(0deg,rgba(7,14,42,0.9),rgba(7,14,42,0) 55%);"></div>'
             '<span class="x-round" style="position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);width:72px;height:72px;background:#FFC528;"><span style="width:0;height:0;border-top:11px solid transparent;border-bottom:11px solid transparent;border-left:17px solid #0F1E5E;margin-left:5px;"></span></span>'
             '<div class="x" style="position:absolute;left:24px;right:24px;bottom:22px;display:flex;flex-direction:column;gap:4px;"><span style="font-size:12px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#FFC528;">Creative by MMC</span><span style="font-size:20px;font-weight:600;letter-spacing:-0.03em;">The Growing Giraffe founder film</span></div></div>')
    return ('<section style="padding:130px 48px 0;">' + head("Reviews", 'Testimonials' + em('.', SUN), "In the words of the founders and principals we work with.")
            + '<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin-top:56px;">' + cards + video + '</div></section>')


def questions():
    qs = ["What makes MMC different from other performance agencies?", "Which services can MMC run for us?", "Do you work with brands on Amazon and quick commerce?",
          "Can you run admissions campaigns for schools and colleges?", "How quickly can we go live?", "How do I get started with MMC?"]
    return ('<section class="x" style="padding:130px 48px 0;"><div style="display:grid;grid-template-columns:minmax(0,1fr) 675px;gap:40px;">'
            '<div style="display:flex;flex-direction:column;justify-content:space-between;">'
            '<div style="display:flex;flex-direction:column;gap:26px;"><h2 class="x-title">FAQ' + em('.', SUN) + '</h2><p style="margin:0;font-size:16px;line-height:1.5;color:#4F5A6B;max-width:36ch;">Got questions? We have answers. Everything you need to know about working with MMC.</p></div>'
            '<div style="display:flex;flex-direction:column;gap:14px;align-items:flex-start;"><span style="font-size:16px;font-weight:500;color:#0E1626;">Have more questions?</span>' + btn("Let us know", "ink") + '</div></div>'
            + faq(qs, "We work with two kinds of organisation only, D2C brands and educational institutes, and we are measured on contribution margin and admissions rather than clicks. The strategist you meet on the first call runs your account.")
            + '</div></section>')


def insights():
    posts = [("work-giraffe.jpg", "D2C", "Break-even ROAS for Indian D2C, with COD and RTO counted", "Most break-even maths ignores returns and cash on delivery. Here is the version that doesn&#8217;t."),
             ("cs-sprouts.jpg", "Education", "The Indian admissions calendar, segment by segment", "When families actually decide, and where your budget should sit each month."),
             ("svc-performance.jpg", "Pricing", "What a performance marketing agency costs in India", "Retainers, percentage of spend and hybrid models, explained plainly.")]
    return ('<section style="padding:120px 6px 0;"><div class="x-card" style="border-radius:20px;padding:49px 42px 44px;">'
            + head("Guides", 'Latest insights' + em('.', SUN), "Straight answers for Indian brands and institutes.", left=258)
            + '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:56px;">'
            + ''.join('<div class="x" style="display:flex;flex-direction:column;gap:14px;"><div style="height:300px;border-radius:12px;overflow:hidden;"><img src="' + im + '" alt="" class="cover"></div>'
                      '<span style="font-size:13px;font-weight:500;color:#1D4ED8;">' + cat + '</span><span style="font-size:26px;font-weight:600;line-height:33.8px;letter-spacing:-0.04em;color:#0E1626;">' + t + '</span>'
                      '<span style="font-size:14px;line-height:1.5;color:#4F5A6B;">' + ex + '</span><span style="align-self:flex-start;display:inline-flex;align-items:center;height:30px;padding:0 14px;border-radius:50px;border:1px solid rgba(15,30,94,0.25);font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#0E1626;">Read more</span></div>' for im, cat, t, ex in posts)
            + '</div></div></section>')


def contact():
    field = lambda label, ph, full=False: ('<div style="display:flex;flex-direction:column;gap:12px;padding-bottom:14px;border-bottom:1px solid rgba(15,30,94,0.25);' + ('grid-column:span 2;' if full else '') + '">'
                                          '<span style="font-size:14px;font-weight:500;letter-spacing:-0.04em;color:#0E1626;">' + label + '</span><span style="font-size:16px;font-weight:500;letter-spacing:-0.04em;color:#9AA3B2;">' + ph + '</span></div>')
    founders = ''.join('<div style="width:150px;padding:18px 12px;border-radius:12px;background:#FFFFFF;display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center;">'
                       '<span style="width:96px;height:96px;border-radius:50%;background:linear-gradient(160deg,#2B5CE0,#0F1E5E);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;letter-spacing:0.08em;color:rgba(255,255,255,0.8);">[PHOTO]</span>'
                       '<span style="font-size:15px;font-weight:600;color:#0E1626;">[Name]</span><span style="font-size:12px;font-weight:600;color:#1D4ED8;">' + r + '</span></div>' for r in ["Founder", "Co-founder"])
    return ('<section class="x" style="padding:130px 48px 0;"><div style="display:grid;grid-template-columns:470px minmax(0,1fr);gap:40px;">'
            '<div style="display:flex;flex-direction:column;gap:30px;"><h2 class="x-title">Get in<br>touch' + em('.', SUN) + '</h2><p style="margin:0;font-size:20px;font-weight:500;letter-spacing:-0.03em;color:#0E1626;">Your brand is unique. So is your growth plan.</p>'
            '<div style="display:flex;flex-direction:column;gap:14px;margin-top:20px;"><span style="font-size:14px;color:#4F5A6B;">Connect with the founders</span><div style="display:flex;gap:14px;">' + founders + '</div></div></div>'
            '<div style="display:flex;flex-direction:column;gap:40px;">'
            '<div style="display:flex;gap:40px;align-items:flex-end;">'
            '<div style="display:flex;flex-direction:column;gap:6px;"><span style="font-size:11px;color:#4F5A6B;">Let&#8217;s talk</span><span style="font-size:32px;font-weight:600;letter-spacing:-0.05em;color:#0E1626;padding-bottom:10px;border-bottom:3px solid #1D4ED8;">project</span></div>'
            '<div style="display:flex;flex-direction:column;gap:6px;"><span style="font-size:11px;color:#9AA3B2;">Schedule a</span><span style="font-size:32px;font-weight:600;letter-spacing:-0.05em;color:#B6BCC8;padding-bottom:13px;">free strategy call &#8599;</span></div>'
            '<div style="display:flex;flex-direction:column;gap:6px;"><span style="font-size:11px;color:#9AA3B2;">Explore</span><span style="font-size:32px;font-weight:600;letter-spacing:-0.05em;color:#B6BCC8;padding-bottom:13px;">careers &#8599;</span></div></div>'
            '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:34px 32px;">'
            + field("Full name *", "Your full name") + field("Email *", "you@brand.com") + field("Mobile number *", "+91") + field("You are a *", "D2C brand or educational institute")
            + field("Interested in *", "Select services") + field("Monthly marketing budget", "Select a range") + field("Tell us about your goals *", "What should the next two quarters look like?", True)
            + '</div><div>' + btn("Submit request", "ink") + '</div></div></div></section>')


def approach():
    return ('<section class="x" style="padding:120px 48px 110px;"><div style="display:grid;grid-template-columns:300px minmax(0,1fr);gap:40px;padding:0 0 0 8px;">'
            '<div style="display:flex;flex-direction:column;gap:12px;"><img src="mmc-mark.png" alt="MMC" style="width:48px;height:48px;object-fit:contain;"><span style="font-size:13px;line-height:1.5;color:#4F5A6B;max-width:22ch;">Every engagement is built for long-term, compounding growth.</span></div>'
            '<div style="display:flex;flex-direction:column;gap:22px;max-width:880px;">'
            '<p style="margin:0;font-size:30px;font-weight:500;line-height:1.3;letter-spacing:-0.035em;color:#4F5A6B;">Our approach is simple: <span style="color:#0E1626;">we run growth the way your CFO would. Every campaign, creative and page is judged on what it adds to the P&amp;L.</span></p>'
            '<p style="margin:0;font-size:14px;line-height:1.7;color:#4F5A6B;">Monday Marketing Company is a growth studio for D2C brands and educational institutes in India. We run performance marketing on Meta, Google, YouTube, Amazon and quick commerce, produce creative and UGC, build Shopify storefronts and admission-ready websites, and set up the email, WhatsApp and CRM journeys that turn attention into revenue and enquiries into admissions.</p></div></div></section>')


def build():
    body = (hero() + logos() + work() + services() + focus() + numbers() + talk() + voices() + questions() + insights() + contact() + approach() + footer()
            + chat_bubble(728))
    return page(body, W)
