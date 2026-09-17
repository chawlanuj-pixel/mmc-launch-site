"""Round 2 education landing page, desktop 1440."""
from base import page, NAV, footer, ARROW, page_hero

S = lambda t, c="#1D4ED8": '<span class="S" style="color:' + c + ';font-weight:600;">' + t + '</span>'
SEGMENTS = ["K-12 schools", "Colleges &amp; universities", "Coaching &amp; test prep", "Skilling &amp; vocational", "Study abroad", "Selling to schools"]


def hero():
    funnel = [("Enquiries", "3,240", 100), ("Counselling calls", "1,610", 50), ("Campus visits", "486", 15), ("Applications", "262", 8), ("Admissions", "118", 3.6)]
    card = ('<aside style="background:rgba(255,255,255,0.94);border:1px solid rgba(255,255,255,0.2);border-radius:16px;padding:24px;box-shadow:0 18px 44px -18px rgba(6,14,44,0.55);color:#0E1626;">'
            '<div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:18px;border-bottom:1px solid rgba(29,78,216,0.10);margin-bottom:18px;">'
            '<div><div class="D" style="font-weight:700;font-size:19px;letter-spacing:-0.01em;">Admission season tracker</div><div style="font-size:11px;font-weight:600;letter-spacing:0.08em;color:#4F5A6B;margin-top:3px;">B.Tech intake &#183; week 14</div></div><span class="sample" style="color:#4F5A6B;border-color:rgba(20,47,91,0.3);">Sample</span></div>'
            '<div style="display:flex;flex-direction:column;gap:14px;">'
            + ''.join('<div style="display:grid;grid-template-columns:118px minmax(0,1fr) 54px;gap:12px;align-items:center;">'
                      '<span style="font-size:10.5px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#4F5A6B;">' + l + '</span>'
                      '<span style="height:10px;border-radius:6px;background:#EEF2FB;overflow:hidden;display:block;"><span style="display:block;height:100%;width:' + str(w) + '%;border-radius:6px;background:' + ('#FFC528' if l == "Admissions" else '#1D4ED8') + ';"></span></span>'
                      '<span class="D" style="font-weight:700;font-size:14.5px;text-align:right;">' + v + '</span></div>' for l, v, w in funnel)
            + '</div><div style="display:flex;justify-content:space-between;align-items:baseline;margin:20px 0 18px;padding-top:16px;border-top:1px solid rgba(29,78,216,0.10);">'
            '<span style="font-size:10.5px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4F5A6B;">Cost per admission</span><span class="D" style="font-weight:800;font-size:22px;color:#16329E;">&#8377;11,400</span></div>'
            '<div style="display:flex;align-items:center;justify-content:center;gap:12px;padding:12px 18px;background:#1D4ED8;color:#FFFFFF;border-radius:10px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">How we report' + ARROW + '</div></aside>')
    return page_hero("Education", ["Home", "Education"], "&#9679; For schools, colleges, coaching &amp; skilling institutes",
                     'Every seat, filled with<br>the ' + S('right', '#FFC528') + ' student.',
                     "Admissions campaigns, enquiry-first websites and WhatsApp follow-up, run by one senior team and reported in enquiries, visits and admissions.",
                     '<span class="btn btn-y">Plan my admission season' + ARROW + '</span><span class="lnk">See education work' + ARROW + '</span>', card)


def segments():
    pills = ''.join('<span style="display:flex;flex-direction:column;gap:6px;padding:20px 22px;border-radius:16px;' + ('background:#0F1E5E;color:#FFFFFF;' if i == 1 else 'background:#FFFFFF;border:1px solid rgba(20,47,91,0.12);color:#0E1626;') + '">'
                    '<span class="D" style="font-weight:700;font-size:17px;letter-spacing:-0.01em;">' + s + '</span>'
                    '<span style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:' + ('#FFC528' if i == 1 else '#4F5A6B') + ';">' + ('Viewing' if i == 1 else 'Playbook') + '</span></span>' for i, s in enumerate(SEGMENTS))
    return ('<section style="padding:40px 80px 104px;background:#FBFAF6;">'
            '<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:20px;"><span class="eyebrow">Choose your institute</span><span style="font-size:15px;color:#4F5A6B;">Each playbook has its own calendar, channels and scorecard.</span></div>'
            '<div style="display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:12px;">' + pills + '</div></section>')


def journey():
    stages = [("Ad", "Reaches families outside your catchment, or for the wrong course."),
              ("Landing page", "Fees, eligibility and placements missing, so visitors leave."),
              ("First reply", "The enquiry waits hours for a reply while others call first."),
              ("Counsellor call", "One call, no follow-up plan, no notes on what the family asked."),
              ("Campus visit", "Booked, but never confirmed, reminded or followed up."),
              ("Fee paid", "Applications stall at documents and fees without a nudge.")]
    nodes = ''.join('<div style="display:flex;flex-direction:column;gap:16px;position:relative;">'
                    '<span style="width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;position:relative;z-index:2;'
                    + ('background:#FFC528;color:#16329E;' if i == 5 else 'background:#FFFFFF;color:#1D4ED8;border:1.5px solid #1D4ED8;') + '">'
                    '<span class="D" style="font-weight:800;font-size:17px;">' + str(i + 1) + '</span></span>'
                    '<span class="D" style="font-weight:700;font-size:22px;letter-spacing:-0.02em;color:#0E1626;">' + t + '</span>'
                    '<span style="display:flex;gap:10px;font-size:15px;line-height:1.55;color:#4F5A6B;"><span style="width:8px;height:8px;border-radius:50%;background:#E4572E;margin-top:8px;flex:none;"></span>' + d + '</span></div>' for i, (t, d) in enumerate(stages))
    return ('<section style="padding:120px 80px;background:#FFFFFF;">'
            '<div style="display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:80px;align-items:end;margin-bottom:72px;">'
            '<div style="display:flex;flex-direction:column;gap:22px;"><span class="eyebrow">The admissions journey</span>'
            '<h2 class="D" style="margin:0;font-weight:800;font-size:68px;line-height:0.98;letter-spacing:-0.04em;color:#0E1626;">Most seats are lost ' + S('after') + ' the enquiry.</h2></div>'
            '<p style="margin:0;font-size:18px;line-height:1.6;color:#4F5A6B;">Institutes spend on ads and then lose families in the gaps between teams. We run the whole path, from the first ad to the fee receipt, and report every stage.</p></div>'
            '<div style="position:relative;display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:32px;">'
            '<span style="position:absolute;left:26px;right:40px;top:25px;height:1.5px;background:linear-gradient(90deg,#1D4ED8,#1D4ED8 80%,#FFC528);"></span>' + nodes + '</div>'
            '<div style="display:flex;align-items:center;gap:14px;margin-top:56px;padding-top:26px;border-top:1px solid rgba(20,47,91,0.12);font-size:14px;color:#4F5A6B;">'
            '<span style="width:8px;height:8px;border-radius:50%;background:#E4572E;"></span>Where families usually drop out, and what our weekly report tracks.</div></section>')


def calendar():
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    bands = [("Brand &amp; reputation", 0, 12, "rgba(29,78,216,0.14)", "#16329E", "Always on"),
             ("Enquiry push", 0, 4, "#1D4ED8", "#FFFFFF", "Jan to Apr"),
             ("Entrance exams &amp; results", 3, 6, "#FFC528", "#16329E", "Apr to Jun"),
             ("Counselling &amp; applications", 5, 8, "#0F1E5E", "#FFFFFF", "Jun to Aug"),
             ("Late deciders", 7, 9, "rgba(255,197,40,0.4)", "#16329E", "Aug to Sep")]
    rows = ''.join('<span class="D" style="font-weight:700;font-size:16px;color:#0E1626;padding:16px 0;border-top:1px solid rgba(20,47,91,0.08);">' + n + '</span>'
                   '<span style="grid-column:span 12;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));align-items:center;padding:12px 0;border-top:1px solid rgba(20,47,91,0.08);">'
                   + ('<span style="grid-column:span ' + str(s) + ';"></span>' if s else '')
                   + '<span style="grid-column:span ' + str(e - s) + ';height:34px;border-radius:999px;background:' + bg + ';color:' + fg + ';font-size:12px;font-weight:800;letter-spacing:0.06em;display:flex;align-items:center;padding:0 16px;">' + lab + '</span></span>'
                   for n, s, e, bg, fg, lab in bands)
    return ('<section style="padding:120px 80px;background:#FBFAF6;">'
            '<div style="display:flex;justify-content:space-between;align-items:flex-end;gap:60px;margin-bottom:48px;">'
            '<div style="display:flex;flex-direction:column;gap:22px;"><span class="eyebrow">Admissions calendar</span>'
            '<h2 class="D" style="margin:0;font-weight:800;font-size:64px;line-height:1;letter-spacing:-0.04em;color:#0E1626;">Spend when families ' + S('decide.') + '</h2></div>'
            '<div style="display:flex;gap:14px;align-items:center;"><span class="sample">Sample: undergraduate intake</span><span class="btn btn-i">Build my calendar' + ARROW + '</span></div></div>'
            '<div style="background:#FFFFFF;border-radius:24px;border:1px solid rgba(20,47,91,0.1);padding:30px 36px 36px;">'
            '<div style="display:grid;grid-template-columns:240px repeat(12,minmax(0,1fr));align-items:center;">'
            '<span></span>' + ''.join('<span class="cap" style="text-align:center;padding-bottom:14px;' + ('color:#1D4ED8;' if m == "Sep" else '') + '">' + m + '</span>' for m in months)
            + rows + '</div></div></section>')


def workstreams():
    icon = lambda d: '<svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#FFC528" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>'
    items = [(icon('<path d="M4 20l6-6 4 4 10-10"/><path d="M17 8h7v7"/>'), "Admissions campaigns", "Google Search, Meta, YouTube and education portals, planned course by course and city by city."),
             (icon('<rect x="4" y="5" width="20" height="16" rx="2"/><path d="M4 10h20M9 24h10"/>'), "Websites &amp; landing pages", "Fast program pages with fees, eligibility and placements, and one clear enquiry form."),
             (icon('<path d="M6 20.5L4 24l3.8-1.2A10 10 0 1 0 6 20.5z"/><path d="M10 12h8M10 16h5"/>'), "WhatsApp &amp; CRM follow-up", "Instant replies, counsellor assignment, visit reminders and document nudges."),
             (icon('<rect x="4" y="7" width="15" height="14" rx="2"/><path d="M19 12l5-3v10l-5-3"/>'), "Campus films &amp; creative", "Student stories, faculty reels and campus films made for each stage of the decision."),
             (icon('<circle cx="12" cy="12" r="7"/><path d="M17 17l6 6"/>'), "Search &amp; reputation", "Google Business Profiles, reviews and course pages that rank in your city."),
             (icon('<circle cx="10" cy="10" r="4"/><path d="M3 23c1-4 4-6 7-6s6 2 7 6"/><path d="M19 8h6M19 12h6M19 16h4"/>'), "Counsellor enablement", "Call scripts, WhatsApp templates and a weekly lead-quality review with your team.")]
    return ('<section class="ink on-dark" style="padding:120px 80px;">'
            '<div style="display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:96px;">'
            '<div style="display:flex;flex-direction:column;gap:24px;"><span class="eyebrow">What we run</span>'
            '<h2 class="D" style="margin:0;font-weight:800;font-size:56px;line-height:1;letter-spacing:-0.04em;color:#FFFFFF;">Six workstreams. One ' + S('admissions', '#FFC528') + ' engine.</h2>'
            '<p style="margin:0;font-size:17px;line-height:1.6;color:rgba(255,255,255,0.7);">Take all six, or only the part of the journey that is leaking. The same senior team plans and runs each one.</p></div>'
            '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 56px;">'
            + ''.join('<div style="display:grid;grid-template-columns:44px minmax(0,1fr);gap:18px;padding:30px 0 34px;border-top:1px solid rgba(255,255,255,0.14);">' + ic +
                      '<div style="display:flex;flex-direction:column;gap:8px;"><span class="D" style="font-weight:700;font-size:23px;letter-spacing:-0.02em;color:#FFFFFF;">' + t + '</span><span style="font-size:15.5px;line-height:1.6;color:rgba(255,255,255,0.68);">' + d + '</span></div></div>' for ic, t, d in items)
            + '</div></div></section>')


def selling_to_schools():
    return ('<section style="padding:120px 80px;background:#FBFAF6;">'
            '<div style="display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:88px;align-items:center;">'
            '<div style="position:relative;height:620px;">'
            '<span style="position:absolute;left:0;top:0;width:78%;height:470px;border-radius:24px;overflow:hidden;box-shadow:0 60px 110px -60px rgba(7,14,42,0.55);"><img src="cs-sprouts.jpg" alt="Sprouts Edu Tours website" class="cover"></span>'
            '<span style="position:absolute;right:0;bottom:30px;width:46%;padding:30px;border-radius:20px;background:#FFFFFF;box-shadow:0 50px 90px -40px rgba(7,14,42,0.45);display:flex;flex-direction:column;gap:18px;"><span class="cap">Built for</span><img src="logo-sprouts.png" alt="Sprouts Edu Tours" style="height:56px;width:auto;align-self:flex-start;"><span style="font-size:15px;line-height:1.55;color:#4F5A6B;">School trips sold to principals, with enquiry pages and creative for each destination.</span></span></div>'
            '<div style="display:flex;flex-direction:column;gap:26px;"><span class="eyebrow">Selling to schools</span>'
            '<h2 class="D" style="margin:0;font-weight:800;font-size:56px;line-height:1;letter-spacing:-0.04em;color:#0E1626;">When the ' + S('school') + ' is your customer.</h2>'
            '<p style="margin:0;font-size:18px;line-height:1.6;color:#4F5A6B;">Educational travel, edtech and school-supply companies sell to principals and trustees, not parents. We build the websites, lead generation and creative for that longer, relationship-led sale.</p>'
            '<div style="display:flex;flex-direction:column;border-bottom:1px solid rgba(20,47,91,0.14);">'
            + ''.join('<div style="display:flex;justify-content:space-between;align-items:center;gap:20px;padding:18px 0;border-top:1px solid rgba(20,47,91,0.14);"><img src="logo-' + l + '.png" alt="' + n + '" style="height:42px;width:auto;"><span style="font-size:14px;color:#4F5A6B;">Website &#183; Lead generation &#183; Creative &#183; Social</span></div>' for l, n in [("sprouts", "Sprouts Edu Tours"), ("bloom", "Bloom Edutours")])
            + '</div></div></div></section>')


def work():
    return ('<section style="padding:120px 80px;background:#FFFFFF;">'
            '<div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:56px;">'
            '<div style="display:flex;flex-direction:column;gap:22px;"><span class="eyebrow">Education work</span>'
            '<h2 class="D" style="margin:0;font-weight:800;font-size:64px;line-height:1;letter-spacing:-0.04em;color:#0E1626;">Built for the families who ' + S('choose.') + '</h2></div>'
            '<span class="lnk">All work' + ARROW + '</span></div>'
            '<div style="display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:24px;">'
            '<a href="#" style="display:flex;flex-direction:column;gap:20px;color:#0E1626;"><span style="display:block;height:560px;border-radius:24px;overflow:hidden;"><img src="cs-mvj.jpg" alt="MVJ College of Engineering" class="cover"></span>'
            '<span style="display:flex;justify-content:space-between;align-items:flex-end;gap:20px;"><span style="display:flex;flex-direction:column;gap:8px;"><span class="cap" style="color:#1D4ED8;">College</span><span class="D" style="font-weight:700;font-size:32px;letter-spacing:-0.025em;">MVJ College of Engineering</span><span style="font-size:15.5px;color:#4F5A6B;">Website, lead generation, creative and social</span></span><span class="lnk">View' + ARROW + '</span></span></a>'
            '<div style="display:grid;grid-template-rows:repeat(2,minmax(0,1fr));gap:24px;">'
            + ''.join('<a href="#" style="position:relative;display:block;border-radius:24px;overflow:hidden;color:#FFFFFF;"><img src="' + im + '" alt="' + n + '" class="cover" style="position:absolute;inset:0;">'
                      '<span style="position:absolute;inset:0;background:linear-gradient(to top,rgba(7,14,42,0.92),rgba(7,14,42,0) 60%);"></span>'
                      '<span style="position:absolute;left:28px;right:28px;bottom:24px;display:flex;justify-content:space-between;align-items:flex-end;"><span style="display:flex;flex-direction:column;gap:6px;"><span class="cap" style="color:#FFC528;">' + seg + '</span><span class="D" style="font-weight:700;font-size:26px;">' + n + '</span></span><span class="arrow" style="color:#FFC528;"></span></span></a>'
                      for im, n, seg in [("work-sprouts.jpg", "Sprouts Edu Tours", "Educational travel"), ("work-bloom.jpg", "Bloom Edutours", "Educational travel")])
            + '</div></div></section>')


def calculator():
    inputs = [("Season ad budget", "&#8377;18,00,000"), ("Expected enquiries", "3,000"), ("Enquiry to visit", "14%"), ("Visit to admission", "30%"), ("Counsellors on the team", "6"), ("Calls per counsellor a day", "45")]
    return ('<section class="ink on-dark" style="padding:120px 80px;">'
            '<div style="display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:96px;align-items:center;">'
            '<div style="display:flex;flex-direction:column;gap:26px;"><span class="eyebrow">Free tool</span>'
            '<h2 class="D" style="margin:0;font-weight:800;font-size:60px;line-height:1;letter-spacing:-0.04em;color:#FFFFFF;">What does one admission ' + S('really', '#FFC528') + ' cost you?</h2>'
            '<p style="margin:0;font-size:18px;line-height:1.6;color:rgba(255,255,255,0.7);">Put in your budget and funnel. See cost per enquiry and per admission, and whether your counsellors can keep up with the volume.</p>'
            '<span class="lnk" style="align-self:flex-start;">Open the calculator' + ARROW + '</span></div>'
            '<div style="background:#FFFFFF;border-radius:26px;padding:40px;color:#0E1626;box-shadow:0 60px 120px -50px rgba(0,0,0,0.9);display:flex;flex-direction:column;gap:24px;">'
            '<div style="display:flex;justify-content:space-between;align-items:center;"><span class="D" style="font-weight:700;font-size:26px;letter-spacing:-0.02em;">Cost per admission</span><span class="sample">Sample inputs</span></div>'
            '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px 18px;">'
            + ''.join('<div style="display:flex;flex-direction:column;gap:8px;"><span style="font-size:12.5px;font-weight:700;color:#4F5A6B;">' + a + '</span><span style="height:52px;border-radius:12px;border:1px solid rgba(20,47,91,0.16);display:flex;align-items:center;padding:0 14px;font-weight:700;font-size:16px;">' + b + '</span></div>' for a, b in inputs)
            + '</div><div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;">'
            '<div style="padding:20px;border-radius:16px;background:#F1F4FA;display:flex;flex-direction:column;gap:6px;"><span class="cap">Cost per enquiry</span><span class="D" style="font-weight:800;font-size:34px;letter-spacing:-0.03em;">&#8377;600</span></div>'
            '<div style="padding:20px;border-radius:16px;background:#F1F4FA;display:flex;flex-direction:column;gap:6px;"><span class="cap">Admissions</span><span class="D" style="font-weight:800;font-size:34px;letter-spacing:-0.03em;">126</span></div>'
            '<div style="padding:20px;border-radius:16px;background:#0F1E5E;color:#FFFFFF;display:flex;flex-direction:column;gap:6px;"><span class="cap" style="color:rgba(255,255,255,0.6);">Cost per admission</span><span class="D" style="font-weight:800;font-size:34px;letter-spacing:-0.03em;color:#FFC528;">&#8377;14,286</span></div></div>'
            '<div style="display:flex;gap:12px;padding:14px 18px;border-radius:12px;background:#FFF4D6;font-size:14.5px;line-height:1.5;"><b style="color:#16329E;">Capacity check</b><span>Six counsellors can make about 270 calls a day, enough for 3,000 enquiries across the season.</span></div>'
            '</div></div></section>')


def voice_and_rules():
    rules = [("Consent on every form", "DPDP-ready consent on forms and WhatsApp opt-ins, with a clear note on how data is used."),
             ("Calls families welcome", "Counsellor calls inside permitted hours, with opt-outs honoured on the first ask."),
             ("Claims you can defend", "Placement, ranking and fee claims checked against ASCI guidelines before an ad goes live.")]
    return ('<section style="padding:120px 80px;background:#FBFAF6;">'
            '<div style="display:grid;grid-template-columns:420px minmax(0,1fr);gap:96px;align-items:center;">'
            '<div style="position:relative;height:480px;border-radius:26px;overflow:hidden;background:linear-gradient(160deg,#2B5CE0 0%,#16329E 55%,#0F1E5E 100%);display:flex;align-items:center;justify-content:center;">'
            '<span style="position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,0.16) 1px,transparent 1px);background-size:26px 26px;"></span>'
            '<span style="position:relative;width:96px;height:96px;border-radius:50%;background:#FFC528;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 14px rgba(255,197,40,0.18);"><span style="width:0;height:0;border-top:14px solid transparent;border-bottom:14px solid transparent;border-left:22px solid #16329E;margin-left:6px;"></span></span>'
            '<span style="position:absolute;left:28px;bottom:26px;font-size:11px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.8);">[Principal or trustee video]</span></div>'
            '<div style="display:flex;flex-direction:column;gap:30px;"><span class="eyebrow">From an institute head</span>'
            '<p class="S" style="margin:0;font-size:50px;line-height:1.12;color:#0E1626;">&#8220;[Quote from a principal or trustee on what changed this admission season.]&#8221;</p>'
            '<div style="display:flex;flex-direction:column;gap:4px;padding-top:24px;border-top:1px solid rgba(20,47,91,0.14);"><span class="D" style="font-weight:700;font-size:18px;color:#0E1626;">[Name]</span><span style="font-size:15px;color:#4F5A6B;">[Role], [Institute], [City]</span></div></div></div>'
            '<div style="display:grid;grid-template-columns:minmax(0,3fr) repeat(3,minmax(0,3fr));gap:40px;margin-top:112px;padding-top:40px;border-top:2px solid #0E1626;">'
            '<span class="D" style="font-weight:800;font-size:34px;line-height:1.05;letter-spacing:-0.03em;color:#0E1626;">Compliant by ' + S('default.') + '</span>'
            + ''.join('<div style="display:flex;flex-direction:column;gap:10px;"><span class="D" style="font-weight:700;font-size:19px;color:#0E1626;">' + t + '</span><span style="font-size:15px;line-height:1.6;color:#4F5A6B;">' + d + '</span></div>' for t, d in rules)
            + '</div></section>')


def faq():
    qs = ["How do you count an enquiry, a visit and an admission?", "What if enquiries come in but admissions don&#8217;t?", "Do you work inside our CRM, such as Meritto or LeadSquared?", "Can you run campaigns in regional languages?"]
    return ('<section style="padding:120px 80px;background:#FFFFFF;">'
            '<div style="display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:96px;">'
            '<div style="display:flex;flex-direction:column;gap:22px;"><span class="eyebrow">Questions institutes ask</span>'
            '<h2 class="D" style="margin:0;font-weight:800;font-size:52px;line-height:1;letter-spacing:-0.04em;color:#0E1626;">Before the ' + S('season') + ' starts.</h2></div>'
            '<div style="border-bottom:1px solid rgba(20,47,91,0.14);">'
            '<div style="padding:28px 0;border-top:1px solid rgba(20,47,91,0.14);display:flex;flex-direction:column;gap:14px;">'
            '<div style="display:flex;justify-content:space-between;align-items:center;gap:24px;"><span class="D" style="font-weight:700;font-size:23px;letter-spacing:-0.015em;color:#1D4ED8;">How early before admission season should we start?</span><span style="width:40px;height:40px;border-radius:50%;background:#1D4ED8;color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-size:22px;flex:none;">&#8722;</span></div>'
            '<p style="margin:0;font-size:17px;line-height:1.65;color:#4F5A6B;max-width:62ch;">Ideally four to six months before applications open. That leaves time to fix the website and follow-up, build brand searches, and go into the enquiry push with tested creative.</p></div>'
            + ''.join('<div style="padding:28px 0;border-top:1px solid rgba(20,47,91,0.14);display:flex;justify-content:space-between;align-items:center;gap:24px;"><span class="D" style="font-weight:700;font-size:23px;letter-spacing:-0.015em;color:#0E1626;">' + q + '</span><span style="width:40px;height:40px;border-radius:50%;border:1px solid rgba(20,47,91,0.18);color:#1D4ED8;display:flex;align-items:center;justify-content:center;font-size:22px;flex:none;">+</span></div>' for q in qs)
            + '</div></div></section>')


def enquiry():
    roles = ["Chairman or trustee", "Principal or director", "Admissions head", "Marketing head"]
    field = lambda l, v: '<div style="display:flex;flex-direction:column;gap:8px;"><span style="font-size:12.5px;font-weight:700;color:#4F5A6B;">' + l + '</span><span style="height:54px;border-radius:12px;border:1px solid rgba(20,47,91,0.16);display:flex;align-items:center;padding:0 16px;font-size:15.5px;color:#8A94A6;">' + v + '</span></div>'
    return ('<section style="padding:120px 80px;background:#FFC528;">'
            '<div style="display:grid;grid-template-columns:minmax(0,6fr) minmax(0,6fr);gap:80px;align-items:center;">'
            '<div style="display:flex;flex-direction:column;gap:28px;">'
            '<h2 class="D" style="margin:0;font-weight:800;font-size:90px;line-height:0.94;letter-spacing:-0.045em;color:#0E1626;">Let&#8217;s fill next year&#8217;s <span class="S" style="font-weight:600;">seats.</span></h2>'
            '<p style="margin:0;font-size:19px;line-height:1.6;color:rgba(14,22,38,0.74);max-width:46ch;">Tell us about your institute. A senior strategist maps your calendar, funnel and budget, and shows where next year&#8217;s admissions will come from.</p>'
            '<div style="display:flex;gap:28px;align-items:center;"><span class="lnk" style="color:#0E1626;border-bottom-color:rgba(14,22,38,0.4);">WhatsApp us' + ARROW + '</span><span class="lnk" style="color:#0E1626;border-bottom-color:rgba(14,22,38,0.4);">+91 766 630 9102' + ARROW + '</span></div></div>'
            '<div style="background:#FFFFFF;border-radius:26px;padding:38px;display:flex;flex-direction:column;gap:20px;box-shadow:0 60px 110px -60px rgba(14,22,38,0.5);">'
            '<span style="font-size:12.5px;font-weight:700;color:#4F5A6B;">I am the</span>'
            '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:-8px;">'
            + ''.join('<span style="padding:14px 16px;border-radius:12px;font-size:14.5px;font-weight:700;' + ('background:#0F1E5E;color:#FFFFFF;' if i == 2 else 'border:1px solid rgba(20,47,91,0.14);color:#2E3849;') + '">' + r + '</span>' for i, r in enumerate(roles))
            + '</div><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;">' + field("Institute", "Institute name") + field("City", "City") + field("Segment", "College or university") + field("Seats to fill", "Choose a range") + '</div>'
            + field("Phone (WhatsApp)", "+91") +
            '<span class="btn btn-i" style="padding:19px 30px;margin-top:4px;">Plan my admission season' + ARROW + '</span>'
            '<span style="font-size:12.5px;line-height:1.5;color:#4F5A6B;">We use these details only to reply to your enquiry.</span></div></div></section>')


def build():
    body = ('<div style="position:relative;">' + NAV + '</div>' + hero() + segments() + journey() + calendar() + workstreams() + selling_to_schools() + work() + calculator() + voice_and_rules() + faq() + enquiry() + footer())
    return page(body, 1440)
