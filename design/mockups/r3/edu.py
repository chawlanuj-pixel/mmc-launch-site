"""Round 3 education landing page, desktop 1440."""
from base import page, NAV, footer, ARR_SVG, em, btn, btn_line, head, tags, stats_band, chat_bubble, faq, SUN

SEGMENTS = ["K-12 schools", "Colleges &amp; universities", "Coaching &amp; test prep", "Skilling &amp; vocational", "Study abroad", "Selling to schools"]


def hero():
    funnel = [("Enquiries", "3,240", 100), ("Counselling calls", "1,610", 50), ("Campus visits", "486", 15), ("Applications", "262", 8), ("Admissions", "118", 3.6)]
    card = ('<div class="x" style="position:absolute;left:600px;top:420px;width:320px;padding:20px;border-radius:12px;background:#FFFFFF;color:#0E1626;box-shadow:0 40px 80px -30px rgba(0,0,0,0.8);z-index:5;">'
            '<div style="display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:12px;border-bottom:1px solid rgba(15,30,94,0.1);"><div><div style="font-size:16px;font-weight:600;letter-spacing:-0.03em;">Admission season tracker</div><div style="font-size:11.5px;color:#4F5A6B;margin-top:2px;">B.Tech intake &#183; week 14</div></div>'
            '<span style="font-size:9.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4F5A6B;border:1px dashed rgba(15,30,94,0.3);border-radius:20px;padding:2px 8px;">Sample</span></div>'
            '<div style="display:flex;flex-direction:column;gap:11px;padding:14px 0 12px;">'
            + ''.join('<div style="display:grid;grid-template-columns:110px minmax(0,1fr) 44px;gap:10px;align-items:center;"><span style="font-size:12px;color:#4F5A6B;">' + l + '</span>'
                      '<span style="height:8px;border-radius:6px;background:#EEF2FB;overflow:hidden;display:block;"><span style="display:block;height:100%;width:' + str(max(w, 4)) + '%;border-radius:6px;background:' + ('#FFC528' if l == "Admissions" else '#1D4ED8') + ';"></span></span>'
                      '<span style="font-size:13px;font-weight:600;text-align:right;">' + v + '</span></div>' for l, v, w in funnel)
            + '</div><div style="display:flex;justify-content:space-between;align-items:baseline;padding-top:12px;border-top:1px solid rgba(15,30,94,0.1);"><span style="font-size:12.5px;color:#4F5A6B;">Cost per admission</span><span style="font-size:22px;font-weight:600;letter-spacing:-0.04em;">&#8377;11,400</span></div></div>')
    tiles = ''.join('<span style="position:absolute;left:' + str(x) + 'px;top:' + str(y) + 'px;width:260px;height:460px;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.12);box-shadow:0 40px 80px -40px rgba(0,0,0,0.9);"><img src="' + im + '" alt="" class="cover"></span>'
                    for im, x, y in [("work-mvj.jpg", 0, 30), ("work-sprouts.jpg", 280, 0)])
    return ('<section class="x" style="position:relative;height:800px;overflow:hidden;background:linear-gradient(180deg,#0F1E5E 0%,#0A1440 60%,#070E2A 100%);color:#FFFFFF;">'
            '<div style="position:absolute;inset:0;background:radial-gradient(40% 50% at 80% 45%,rgba(29,78,216,0.45),rgba(29,78,216,0) 70%);"></div>'
            '<div style="position:absolute;left:880px;top:170px;width:560px;height:520px;">' + tiles + '</div>' + NAV + card +
            '<div style="position:absolute;left:73px;top:220px;width:560px;display:flex;flex-direction:column;align-items:flex-start;">'
            '<span style="font-size:13px;color:rgba(255,255,255,0.6);">Home &#8250; Education</span>'
            '<span style="margin-top:24px;display:inline-flex;align-items:center;height:22px;padding:0 10px;border-radius:20px;background:rgba(255,255,255,0.15);font-size:10px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;">For schools, colleges, coaching &amp; skilling institutes</span>'
            '<h1 style="margin:18px 0 0;font-weight:600;font-size:60px;line-height:1.02;letter-spacing:-0.055em;">Every seat, filled with the right ' + em('student.', SUN) + '</h1>'
            '<p style="margin:24px 0 0;font-size:16px;line-height:24px;color:rgba(250,250,250,0.82);max-width:480px;">Admissions campaigns, enquiry-first websites and WhatsApp follow-up, run by one senior team and reported in enquiries, visits and admissions.</p>'
            '<div style="display:flex;gap:16px;margin-top:32px;">' + btn("Plan my admission season", "white") + btn_line("See education work") + '</div></div></section>')


def segments():
    pills = ''.join('<span style="display:inline-flex;align-items:center;height:44px;padding:0 18px;border-radius:50px;font-size:15px;font-weight:600;letter-spacing:-0.03em;'
                    + ('background:#0F1E5E;color:#FFFFFF;' if i == 1 else 'background:#FFFFFF;color:#0E1626;border:1px solid rgba(15,30,94,0.12);') + '">' + s + '</span>' for i, s in enumerate(SEGMENTS))
    return ('<section class="x" style="padding:40px 48px 0;"><div style="display:grid;grid-template-columns:300px minmax(0,1fr);align-items:center;">'
            '<div style="display:flex;flex-direction:column;gap:4px;"><span class="x-label">Choose your institute</span><span style="font-size:13px;color:#4F5A6B;max-width:26ch;">Each playbook has its own calendar, channels and scorecard.</span></div>'
            '<div style="display:flex;flex-wrap:wrap;gap:10px;">' + pills + '</div></div></section>')


def journey():
    steps = [("Ad", "Reaches families outside your catchment, or for the wrong course.", "Cost per enquiry"),
             ("Landing page", "Fees, eligibility and placements missing, so visitors leave.", "Enquiry rate"),
             ("First reply", "The enquiry waits hours for a reply while others call first.", "Time to first reply"),
             ("Counsellor call", "One call, no follow-up plan, no notes on what the family asked.", "Calls connected"),
             ("Campus visit", "Booked, but never confirmed, reminded or followed up.", "Visits confirmed"),
             ("Fee paid", "Applications stall at documents and fees without a nudge.", "Admissions")]
    cards = ''.join('<div class="x-card x" style="padding:26px 22px 22px;display:flex;flex-direction:column;gap:12px;min-height:300px;position:relative;">'
                    '<span style="width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;' + ('background:#FFC528;color:#0F1E5E;' if i == 5 else 'background:#0F1E5E;color:#FFFFFF;') + '">' + str(i + 1) + '</span>'
                    '<span style="font-size:24px;font-weight:600;letter-spacing:-0.045em;color:#0E1626;margin-top:6px;">' + t + '</span>'
                    '<span style="font-size:15px;line-height:1.5;color:#4F5A6B;">' + d + '</span>'
                    '<div style="margin-top:auto;padding-top:14px;border-top:1px solid rgba(15,30,94,0.08);display:flex;flex-direction:column;gap:2px;"><span style="font-size:11px;color:#4F5A6B;">We track</span><span style="font-size:14px;font-weight:600;color:#1D4ED8;">' + m + '</span></div></div>'
                    for i, (t, d, m) in enumerate(steps))
    rail = ('<div style="position:relative;height:2px;margin:56px 0 20px;background:rgba(15,30,94,0.12);"><span style="position:absolute;left:0;top:0;height:2px;width:100%;background:linear-gradient(90deg,#1D4ED8,#FFC528);"></span></div>')
    return ('<section style="padding:120px 48px 0;">' + head("The admissions journey", 'Journey' + em('.', SUN), "Most seats are lost after the enquiry. We run the whole path, from the first ad to the fee receipt.")
            + rail + '<div style="display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:12px;">' + cards + '</div></section>')


def services():
    rows = [("Campaigns", "Admissions campaigns", "Google Search, Meta, YouTube and education portals, planned course by course and city by city.", ["Google Search", "Meta", "YouTube", "Education portals"]),
            ("Websites", "Websites &amp; landing pages", "Fast program pages with fees, eligibility and placements, and one clear enquiry form.", ["Program pages", "Fees &amp; eligibility", "Enquiry forms"]),
            ("Follow-up", "WhatsApp &amp; CRM follow-up", "Instant replies, counsellor assignment, visit reminders and document nudges.", ["WhatsApp", "Meritto", "LeadSquared", "Visit reminders"]),
            ("Creative", "Campus films &amp; creative", "Student stories, faculty reels and campus films made for each stage of the decision.", ["Student stories", "Faculty reels", "Campus films"]),
            ("Search", "Search &amp; reputation", "Google Business Profiles, reviews and course pages that rank in your city.", ["Business Profile", "Reviews", "Course pages"]),
            ("Counsellors", "Counsellor enablement", "Call scripts, WhatsApp templates and a weekly lead-quality review with your team.", ["Call scripts", "Templates", "Lead-quality review"])]
    out = ''.join('<div class="x" style="display:grid;grid-template-columns:130px 260px minmax(0,440px) minmax(0,1fr) 44px;gap:0 24px;align-items:start;padding:34px 0;border-top:1px solid rgba(255,255,255,0.14);">'
                  '<span style="font-size:16px;font-weight:500;color:rgba(255,255,255,0.85);padding-top:6px;">0' + str(i + 1) + '</span>'
                  '<span class="x-em" style="font-size:40px;line-height:1;color:#FFC528;">' + m + '</span>'
                  '<div style="display:flex;flex-direction:column;gap:14px;"><span style="font-size:30px;font-weight:500;line-height:36px;letter-spacing:-0.04em;color:#FFFFFF;">' + t + '</span><span style="font-size:16px;font-weight:500;line-height:22px;letter-spacing:-0.04em;color:rgba(255,255,255,0.72);">' + d + '</span></div>'
                  '<div style="display:flex;flex-direction:column;gap:10px;"><span style="font-size:12px;font-weight:500;color:rgba(255,255,255,0.7);">Categories</span><div style="display:flex;flex-wrap:wrap;gap:8px;">' + ''.join('<span class="x-chip">' + c + '</span>' for c in chips) + '</div></div>'
                  '<span class="x-round" style="border:1px solid rgba(255,255,255,0.35);color:#FFFFFF;margin-top:40px;">' + ARR_SVG + '</span></div>' for i, (m, t, d, chips) in enumerate(rows))
    return ('<section style="padding:120px 40px 0;"><div class="x-panel" style="padding:90px 40px 40px;"><div class="x-grid"></div>'
            + head("What we run", 'Services' + em('.', SUN), "Six workstreams. One admissions engine. Take all six, or only the part that is leaking.", dark=True, left=260)
            + '<div style="margin-top:56px;">' + out + '</div></div></section>')


def work():
    cards = [("cs-mvj.jpg", ["Website", "Lead generation", "Social media"], "An admissions-first website and campaigns for an autonomous engineering college.", "College", "Website &#183; Leads &#183; Social"),
             ("cs-sprouts.jpg", ["Website", "Lead generation", "Creative"], "Educational trips sold to principals, with an enquiry page for every destination.", "Selling to schools", "Website &#183; Leads &#183; Creative")]
    grid = ''.join('<div class="x" style="display:flex;flex-direction:column;gap:18px;"><div style="position:relative;height:430px;border-radius:16px;overflow:hidden;"><img src="' + im + '" alt="" class="cover"><div style="position:absolute;left:14px;top:14px;">' + tags(tg) + '</div></div>'
                   '<p style="margin:0;font-size:20px;font-weight:500;line-height:1.3;letter-spacing:-0.035em;color:#0E1626;max-width:34ch;">' + d + '</p>'
                   '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr)) auto;gap:24px;align-items:end;"><div style="display:flex;flex-direction:column;gap:4px;"><span style="font-size:12px;color:#4F5A6B;">Audience</span><span style="font-size:18px;font-weight:600;letter-spacing:-0.03em;color:#0E1626;">' + aud + '</span></div>'
                   '<div style="display:flex;flex-direction:column;gap:4px;"><span style="font-size:12px;color:#4F5A6B;">What we ran</span><span style="font-size:18px;font-weight:600;letter-spacing:-0.03em;color:#0E1626;">' + ran + '</span></div>'
                   '<span style="display:inline-flex;align-items:center;height:36px;padding:0 14px;border-radius:4px;background:#0F1E5E;color:#FFFFFF;font-size:12px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;">View project</span></div></div>' for im, tg, d, aud, ran in cards)
    schools = ('<div class="x-panel x" style="display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:0;margin-top:56px;border-radius:16px;"><div class="x-grid"></div>'
               '<div style="padding:48px 44px;display:flex;flex-direction:column;gap:18px;justify-content:center;">'
               '<span style="align-self:flex-start;display:inline-flex;height:22px;align-items:center;padding:0 10px;border-radius:20px;background:rgba(255,255,255,0.16);font-size:10px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;">Selling to schools</span>'
               '<span style="font-size:46px;font-weight:600;line-height:1.02;letter-spacing:-0.05em;">When the school is your ' + em('customer.', SUN) + '</span>'
               '<span style="font-size:16px;line-height:1.55;color:rgba(255,255,255,0.76);max-width:44ch;">Educational travel, edtech and school-supply companies sell to principals and trustees, not parents. We build the websites, lead generation and creative for that longer, relationship-led sale.</span>'
               '<div style="display:flex;gap:10px;align-items:center;margin-top:6px;"><img src="logo-sprouts.png" alt="Sprouts" style="height:34px;background:#FFFFFF;border-radius:6px;padding:4px 8px;"><img src="logo-bloom.png" alt="Bloom" style="height:34px;background:#FFFFFF;border-radius:6px;padding:4px 8px;"><img src="logo-learningmate.png" alt="LearningMate" style="height:34px;background:#FFFFFF;border-radius:6px;padding:4px 8px;"></div>'
               '<div style="margin-top:8px;">' + btn("Explore school sales", "white") + '</div></div>'
               '<div style="position:relative;min-height:440px;"><img src="work-bloom.jpg" alt="" class="cover" style="position:absolute;inset:0;"></div></div>')
    return ('<section style="padding:130px 48px 0;">' + head("Education work", 'Our Work' + em('.', SUN), "Built for the families who choose, and for the schools that buy.")
            + '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px;margin-top:56px;">' + grid + '</div>' + schools + '</section>')


def calendar():
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    rows = [("Brand &amp; reputation", "Always on", 1, 12, "rgba(29,78,216,0.16)", "#1D4ED8"), ("Enquiry push", "Jan to Apr", 1, 4, "#1D4ED8", "#FFFFFF"),
            ("Entrance exams &amp; results", "Apr to Jun", 4, 6, "#0F1E5E", "#FFFFFF"), ("Counselling &amp; applications", "Jun to Aug", 6, 8, "#FFC528", "#0F1E5E"), ("Late deciders", "Aug to Sep", 8, 9, "#8FB0F5", "#0F1E5E")]
    track = 'display:grid;grid-template-columns:repeat(12,minmax(0,1fr));'
    body = ''.join('<div style="display:grid;grid-template-columns:260px minmax(0,1fr);align-items:center;padding:14px 0;border-top:1px solid rgba(15,30,94,0.08);"><span style="font-size:17px;font-weight:600;letter-spacing:-0.03em;color:#0E1626;">' + n + '</span>'
                   '<div style="' + track + 'height:40px;"><span style="grid-column:' + str(a) + ' / ' + str(b + 1) + ';display:flex;align-items:center;padding:0 14px;border-radius:8px;background:' + bg + ';color:' + fg + ';font-size:13px;font-weight:600;">' + span + '</span></div></div>'
                   for n, span, a, b, bg, fg in rows)
    return ('<section style="padding:120px 24px 0;"><div class="x-card x" style="border-radius:20px;padding:49px 24px 48px;">'
            + head("Admissions calendar", 'Calendar' + em('.', SUN), "Spend when families decide. Sample: undergraduate intake.")
            + '<div style="margin-top:56px;"><div style="display:grid;grid-template-columns:260px minmax(0,1fr);padding-bottom:10px;"><span></span><div style="' + track + '">'
            + ''.join('<span style="font-size:12px;font-weight:600;color:#4F5A6B;text-align:center;">' + m + '</span>' for m in months) + '</div></div>' + body
            + '</div><div style="margin-top:32px;display:flex;justify-content:space-between;align-items:center;"><span style="font-size:14px;color:#4F5A6B;">Every segment runs on its own calendar. We build yours in the first week.</span>' + btn("Build my calendar", "ink") + '</div></div></section>')


def calculator():
    inputs = [("Season ad budget", "&#8377;18,00,000"), ("Expected enquiries", "3,000"), ("Enquiry to visit", "14%"), ("Visit to admission", "30%"), ("Counsellors on the team", "6"), ("Calls per counsellor a day", "45")]
    return ('<section class="x" style="padding:120px 48px 0;"><div style="display:grid;grid-template-columns:minmax(0,1fr) 580px;gap:60px;align-items:center;padding:0 0 0 40px;">'
            '<div style="display:flex;flex-direction:column;gap:18px;"><span class="x-label" style="color:#1D4ED8;">Free tool</span>'
            '<h2 style="margin:0;font-size:56px;font-weight:600;line-height:1.1;letter-spacing:-0.03em;color:#0E1626;">What does one admission <span style="color:#1D4ED8;">really cost you?</span></h2>'
            '<p style="margin:0;font-size:16px;line-height:1.55;color:#4F5A6B;max-width:44ch;">Put in your budget and funnel. See cost per enquiry and per admission, and whether your counsellors can keep up with the volume.</p>'
            '<div style="margin-top:8px;">' + btn("Open the calculator", "ink") + '</div></div>'
            '<div class="x-card" style="padding:30px;box-shadow:0 30px 70px -40px rgba(7,14,42,0.35);border:1px solid rgba(15,30,94,0.08);">'
            '<div style="display:flex;justify-content:space-between;align-items:center;"><span style="font-size:20px;font-weight:600;letter-spacing:-0.04em;">Cost per admission</span><span style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4F5A6B;border:1px dashed rgba(15,30,94,0.3);border-radius:20px;padding:3px 9px;">Sample inputs</span></div>'
            '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px 28px;margin-top:22px;">'
            + ''.join('<div style="display:flex;flex-direction:column;gap:8px;padding-bottom:10px;border-bottom:1px solid rgba(15,30,94,0.25);"><span style="font-size:12.5px;color:#4F5A6B;">' + l + '</span><span style="font-size:18px;font-weight:600;letter-spacing:-0.03em;">' + v + '</span></div>' for l, v in inputs)
            + '</div><div class="x-panel" style="margin-top:24px;border-radius:12px;padding:20px 22px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;">'
            + ''.join('<div style="display:flex;flex-direction:column;gap:4px;"><span style="font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:rgba(255,255,255,0.66);">' + l + '</span><span style="font-size:30px;font-weight:600;letter-spacing:-0.045em;color:' + c + ';">' + v + '</span></div>'
                      for l, v, c in [("Cost per enquiry", "&#8377;600", "#FFFFFF"), ("Admissions", "126", "#FFFFFF"), ("Per admission", "&#8377;14,286", "#FFC528")])
            + '</div><p style="margin:16px 0 0;font-size:13.5px;line-height:1.5;color:#4F5A6B;"><span style="color:#15803D;font-weight:700;">Capacity check:</span> six counsellors can make about 270 calls a day, enough for 3,000 enquiries across the season.</p></div></div></section>')


def voices():
    video = ('<div style="position:relative;min-height:460px;border-radius:16px;overflow:hidden;color:#FFFFFF;"><img src="cs-mvj.jpg" alt="" class="cover" style="position:absolute;inset:0;">'
             '<div style="position:absolute;inset:0;background:linear-gradient(0deg,rgba(7,14,42,0.92),rgba(7,14,42,0.25) 60%);"></div>'
             '<span class="x-round" style="position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);width:80px;height:80px;background:#FFC528;"><span style="width:0;height:0;border-top:12px solid transparent;border-bottom:12px solid transparent;border-left:19px solid #0F1E5E;margin-left:5px;"></span></span>'
             '<div class="x" style="position:absolute;left:28px;right:28px;bottom:26px;display:flex;flex-direction:column;gap:4px;"><span style="font-size:12px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#FFC528;">From an institute head</span><span style="font-size:22px;font-weight:600;letter-spacing:-0.03em;">[Principal or trustee video]</span></div></div>')
    quote = ('<div class="x-card x" style="padding:40px;display:flex;flex-direction:column;gap:26px;">'
             '<span class="x-em" style="font-size:90px;line-height:0.5;color:#FFC528;height:40px;">&#8220;</span>'
             '<p style="margin:0;font-size:34px;font-weight:500;line-height:1.2;letter-spacing:-0.045em;color:#0E1626;">[Quote from a principal or trustee on what changed this admission season.]</p>'
             '<div style="margin-top:auto;display:flex;justify-content:space-between;align-items:end;gap:20px;padding-top:24px;border-top:1px solid rgba(15,30,94,0.08);"><div><div style="font-size:18px;font-weight:600;letter-spacing:-0.04em;">[Name]</div><div style="font-size:13px;color:#4F5A6B;">[Role], [Institute], [City]</div></div>'
             '<div style="display:flex;gap:18px;align-items:center;">' + ''.join('<img src="logo-' + n + '.png" alt="" style="height:30px;width:auto;">' for n in ["mvj", "sprouts", "bloom"]) + '</div></div></div>')
    return ('<section style="padding:130px 48px 0;">' + head("Reviews", 'Testimonials' + em('.', SUN), "In the words of the principals and trustees we work with.")
            + '<div style="display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:16px;margin-top:56px;">' + video + quote + '</div></section>')


def compliance():
    items = [("Consent on every form", "DPDP-ready consent on forms and WhatsApp opt-ins, with a clear note on how data is used."),
             ("Calls families welcome", "Counsellor calls inside permitted hours, with opt-outs honoured on the first ask."),
             ("Claims you can defend", "Placement, ranking and fee claims checked against ASCI guidelines before an ad goes live.")]
    return ('<section style="padding:130px 48px 0;">' + head("Compliance", 'Compliant' + em('.', SUN), "Consent, calling hours and claims, handled before anything goes live.")
            + '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:56px;">'
            + ''.join('<div class="x-card x" style="padding:30px;display:flex;flex-direction:column;gap:14px;"><span class="x-round" style="width:40px;height:40px;background:#E3EAFC;color:#1D4ED8;"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 9.5l3.2 3L14 5.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'
                      '<span style="font-size:24px;font-weight:600;letter-spacing:-0.045em;color:#0E1626;">' + t + '</span><span style="font-size:15.5px;line-height:1.55;color:#4F5A6B;">' + d + '</span></div>' for t, d in items)
            + '</div></section>')


def questions():
    qs = ["How early before admission season should we start?", "How do you count an enquiry, a visit and an admission?", "What if enquiries come in but admissions don&#8217;t?",
          "Do you work inside our CRM, such as Meritto or LeadSquared?", "Can you run campaigns in regional languages?"]
    return ('<section class="x" style="padding:130px 48px 0;"><div style="display:grid;grid-template-columns:minmax(0,1fr) 675px;gap:40px;">'
            '<div style="display:flex;flex-direction:column;justify-content:space-between;"><div style="display:flex;flex-direction:column;gap:26px;"><h2 class="x-title">FAQ' + em('.', SUN) + '</h2><p style="margin:0;font-size:16px;line-height:1.5;color:#4F5A6B;max-width:36ch;">What institutes ask before the season starts.</p></div>'
            '<div style="display:flex;flex-direction:column;gap:14px;align-items:flex-start;"><span style="font-size:16px;font-weight:500;color:#0E1626;">Still unsure?</span>' + btn("Ask us on WhatsApp", "ink") + '</div></div>'
            + faq(qs, "Ideally four to six months before applications open. That leaves time to fix the website and follow-up, build brand searches, and go into the enquiry push with tested creative.") + '</div></section>')


def contact():
    field = lambda label, ph: ('<div style="display:flex;flex-direction:column;gap:12px;padding-bottom:14px;border-bottom:1px solid rgba(15,30,94,0.25);">'
                               '<span style="font-size:14px;font-weight:500;letter-spacing:-0.04em;color:#0E1626;">' + label + '</span><span style="font-size:16px;font-weight:500;letter-spacing:-0.04em;color:#9AA3B2;">' + ph + '</span></div>')
    roles = ''.join('<span style="display:inline-flex;align-items:center;height:40px;padding:0 16px;border-radius:50px;font-size:14px;font-weight:600;letter-spacing:-0.03em;' + ('background:#0F1E5E;color:#FFFFFF;' if i == 1 else 'border:1px solid rgba(15,30,94,0.2);color:#0E1626;') + '">' + r + '</span>'
                    for i, r in enumerate(["Chairman or trustee", "Principal or director", "Admissions head", "Marketing head"]))
    return ('<section class="x" style="padding:130px 48px 120px;"><div style="display:grid;grid-template-columns:520px minmax(0,1fr);gap:40px;">'
            '<div style="display:flex;flex-direction:column;gap:30px;"><h2 class="x-title" style="font-size:88px;">Fill next year&#8217;s seats' + em('.', SUN) + '</h2>'
            '<p style="margin:0;font-size:20px;font-weight:500;line-height:1.35;letter-spacing:-0.03em;color:#0E1626;max-width:28ch;">A senior strategist maps your calendar, funnel and budget, and shows where next year&#8217;s admissions will come from.</p>'
            '<div style="display:flex;align-items:center;gap:14px;margin-top:10px;"><span class="x-round" style="width:52px;height:52px;background:#25D366;color:#FFFFFF;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg></span>'
            '<div><div style="font-size:13px;color:#4F5A6B;">WhatsApp us</div><div style="font-size:20px;font-weight:600;letter-spacing:-0.03em;">+91 766 630 9102</div></div></div></div>'
            '<div style="display:flex;flex-direction:column;gap:36px;">'
            '<div style="display:flex;flex-direction:column;gap:14px;"><span style="font-size:11px;color:#4F5A6B;">I am the</span><div style="display:flex;flex-wrap:wrap;gap:10px;">' + roles + '</div></div>'
            '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:34px 32px;">'
            + field("Institute *", "Institute name") + field("City *", "City") + field("Segment *", "College or university") + field("Seats to fill", "Choose a range") + field("Phone (WhatsApp) *", "+91") + field("Email", "you@institute.edu")
            + '</div><div style="display:flex;align-items:center;gap:20px;">' + btn("Plan my admission season", "ink") + '<span style="font-size:13px;color:#4F5A6B;">We use these details only to reply to your enquiry.</span></div></div></div></section>')


def build():
    body = (hero() + segments() + journey() + services() + work()
            + '<section style="padding:120px 48px 0;">' + stats_band([("&lt;5", "min", "First reply to an enquiry"), ("6", "", "Institute playbooks"), ("12", "mo", "Admissions calendar"), ("1", "", "Team, first ad to fee receipt")]) + '</section>'
            + calendar() + calculator() + voices() + compliance() + questions() + contact() + footer() + chat_bubble(728))
    return page(body, 1440)
