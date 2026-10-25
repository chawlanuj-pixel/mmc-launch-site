"""Round 4 education landing page, desktop 1440."""
from base import (page, footer, SUN, acc, dot, btn, link, head, arrows, work_card, quote_card, video_card, chat_icon, sub_hero, service_panel,
                  faq_section, field, seg_toggle, gantt, GANTT_ROWS, avatar)

LABEL = "Plan my season"
SEGMENTS = ["All institutes", "K-12 schools", "Colleges", "Coaching", "Skilling", "Study abroad"]


def hero():
    return sub_hero("Home &#8250; Education", 'Every seat, filled with the right ' + acc('student.', SUN),
                    "Admissions campaigns, enquiry-first websites and WhatsApp follow-up, reported in admissions.",
                    btn(LABEL, "white") + link("See education work", dark=True), ["work-mvj.jpg", "work-sprouts.jpg"])


def segment_bar(active=0):
    """Sticky category bar under the nav: choosing a segment tailors work, services and the calendar."""
    return ('<div style="position:sticky;top:88px;z-index:40;height:64px;padding:0 48px;background:#FFFFFF;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;gap:24px;">'
            '<div style="display:flex;gap:8px;">'
            + ''.join('<span class="t-small" style="display:inline-flex;align-items:center;height:40px;padding:0 16px;border-radius:var(--r-pill);font-weight:600;'
                      + ('background:#0F1E5E;color:#FFFFFF;' if i == active else 'background:#FFFFFF;color:var(--text);border:1px solid var(--line);') + '">' + s + '</span>' for i, s in enumerate(SEGMENTS))
            + '</div><span class="t-small muted">Pick your institute to tailor this page</span></div>')


def work():
    cards = [("cs-mvj.jpg", ["Website", "Leads"], "MVJ College of Engineering", "College", "Admissions-first website and campaigns for a college.", "Website &#183; Leads &#183; Social"),
             ("cs-sprouts.jpg", ["Website", "Leads"], "Sprouts Edu Tours", "Educational travel", "School trips with an enquiry page for every destination.", "Website &#183; Leads &#183; Creative"),
             ("work-bloom.jpg", ["Selling to schools"], "Bloom Edutours", "Selling to schools", "Educational tours sold to principals and trustees.", "Website &#183; Leads &#183; Creative")]
    return ('<section style="padding:128px 48px 0;">' + head("Education work", 'Our Work' + dot(), "Built for the families who choose, and for the schools that buy.")
            + '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:48px;">'
            + ''.join(work_card(*c, img_h=324, hover=(i == 0)) for i, c in enumerate(cards)) + '</div></section>')


def services():
    rows = [("Ad", "Admissions campaigns", "Google Search, Meta, YouTube and portals, planned course by course and city by city.", ["We track: Cost per enquiry"]),
            ("Landing page", "Websites &amp; program pages", "Fast program pages with fees, eligibility and placements, and one clear form.", ["We track: Enquiry rate"]),
            ("First reply", "WhatsApp &amp; CRM follow-up", "Instant replies, counsellor assignment and reminders inside Meritto or LeadSquared.", ["We track: Time to first reply"]),
            ("Counsellor call", "Counsellor enablement", "Call scripts, WhatsApp templates and a weekly lead-quality review with your team.", ["We track: Calls connected"]),
            ("Campus visit", "Campus films &amp; creative", "Student stories, faculty reels and campus films that turn a visit into a decision.", ["We track: Visits confirmed"]),
            ("Fee paid", "Search &amp; reputation", "Business Profiles, reviews and course pages that reassure families before they pay.", ["We track: Admissions"])]
    return service_panel("What we run", 'Services' + dot(), "Six workstreams, in the order a family decides.", rows)


def plan():
    return ('<section style="padding:128px 48px 0;"><div class="card4" style="padding:32px;">'
            + head("Admissions planning", 'Plan' + dot(), "Spend when families decide, and know what each admission costs.")
            + '<div style="margin:40px 0 32px 324px;display:flex;justify-content:space-between;align-items:center;">' + seg_toggle(["Season calendar", "Cost per admission"])
            + '<span class="t-small muted">Sample: undergraduate intake</span></div>' + gantt(GANTT_ROWS) + '</div></section>')


def voices():
    return ('<section style="padding:128px 48px 0;">' + head("Reviews", 'Testimonials' + dot(), "In the words of the principals and trustees we work with.", right=arrows())
            + '<div style="display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:24px;margin-top:48px;">'
            + video_card("cs-mvj.jpg", "From an institute head", "[Principal or trustee video]")
            + quote_card("[Quote from a principal or trustee on what changed this admission season, in their words.]", "[Name]", "[Role], [Institute], [City]", height=400, pad=40)
            + '</div></section>')


def contact():
    roles = ''.join('<span class="t-small" style="display:inline-flex;align-items:center;height:40px;padding:0 16px;border-radius:var(--r-pill);font-weight:600;'
                    + ('background:#0F1E5E;color:#FFFFFF;' if i == 1 else 'border:1px solid var(--line);color:var(--text);') + '">' + r + '</span>'
                    for i, r in enumerate(["Chairman or trustee", "Principal or director", "Admissions head", "Marketing head"]))
    return ('<section style="padding:128px 48px 128px;"><div style="display:grid;grid-template-columns:520px minmax(0,1fr);gap:40px;">'
            '<div style="display:flex;flex-direction:column;gap:24px;"><h2 class="t-display">Fill next year&#8217;s seats' + dot() + '</h2>'
            '<p class="t-lead">A senior strategist maps your calendar, funnel and budget.</p>'
            '<div style="display:flex;align-items:center;gap:12px;">' + avatar() + '<span class="t-small muted">[Name], education lead. Reply within one working day.</span></div></div>'
            '<div class="card4" style="padding:32px;display:flex;flex-direction:column;gap:32px;align-self:start;">'
            '<div style="display:flex;flex-direction:column;gap:12px;"><span class="t-small muted">I am the</span><div style="display:flex;flex-wrap:wrap;gap:8px;">' + roles + '</div></div>'
            '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:32px;">' + field("Institute and city", "Institute, city") + field("Segment", "College or university")
            + field("Phone (WhatsApp)", "+91") + field("Email", "you@institute.edu") + '</div>'
            '<div style="display:flex;align-items:center;gap:20px;">' + btn(LABEL, "ink") + '<span class="t-small muted">We use these details only to reply.</span></div></div></div></section>')


def build():
    qs = ["How do you handle consent, calling hours and claims?", "How early before admission season should we start?", "How do you count an enquiry, a visit and an admission?",
          "Do you work inside our CRM, such as Meritto?", "Can you run campaigns in regional languages?"]
    body = (hero() + segment_bar() + work() + services() + plan() + voices()
            + faq_section(qs, "Every form carries DPDP-ready consent, counsellors call inside permitted hours and honour opt-outs on the first ask, and placement, ranking and fee claims are checked against ASCI guidelines before an ad goes live.",
                          "What institutes ask before the season starts.")
            + contact() + footer() + chat_icon(652))
    return page(body, 1440)
