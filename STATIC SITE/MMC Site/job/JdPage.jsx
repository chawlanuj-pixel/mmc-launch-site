/* job/JdPage.jsx, Job Detail page with application form */

function JdPage({ onAudit }) {
  // Read role from URL ?role= or default to senior-meta-buyer
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("role") || "senior-meta-buyer";

  const roles = {
    "senior-meta-buyer": {
      title: "Senior Meta Buyer",
      dept: "Performance",
      location: "Mumbai · Bengaluru",
      city: "Mumbai", region: "MH", country: "IN",
      type: "Full-time",
      empType: "FULL_TIME",
      workMode: "HYBRID",   // ONSITE | REMOTE | HYBRID
      industry: "Marketing & Advertising",
      band: "Senior · 5–9 years",
      salary: "₹24L – ₹38L · OTE",
      salaryMin: 2400000, salaryMax: 3800000, salaryUnit: "YEAR",
      hint: "Run ₹50L+/month in Meta spend across 3 D2C accounts.",
      summary: "You'll own daily ops on our biggest Meta accounts. Three D2C brands, ₹50L+ monthly spend, full creative collaboration, weekly reporting to founders. You're the senior we don't have to manage.",
      responsibilities: [
        "Own the full Meta account architecture across 3 D2C accounts",
        "Daily campaign optimisation, weekly cohort reviews, monthly board-ready reporting",
        "Collaborate with creative pod on 60+ creatives/month per brand",
        "Server-side CAPI implementation + measurement triangulation",
        "Mentor 1–2 mid-level buyers; review their work weekly",
        "Run the brief on quarterly strategy resets",
      ],
      youAre: [
        "5–9 years running Meta at brands or agencies: D2C preferred",
        "Personally spent ₹50Cr+ across your career",
        "Comfortable owning a P&L and explaining it to founders",
        "Treat creative as the lever, not the bottleneck",
        "Read data daily, optimise weekly, never overreact",
      ],
      bonus: [
        "Klaviyo / WebEngage operating familiarity",
        "Shopify Plus tagging experience",
        "Experience with cohort modeling tools (Triple Whale / Northbeam)",
      ],
      datePosted: "2026-05-01",
      validThrough: "2026-08-01",
    },
    "google-amazon-specialist": {
      title: "Google + Amazon Specialist", dept: "Performance",
      location: "Mumbai", city: "Mumbai", region: "MH", country: "IN",
      type: "Full-time", empType: "FULL_TIME", workMode: "ONSITE",
      industry: "Marketing & Advertising",
      band: "Mid-Senior · 4–7 years",
      salary: "₹18L – ₹32L · OTE",
      salaryMin: 1800000, salaryMax: 3200000, salaryUnit: "YEAR",
      hint: "Search, Performance Max, and Amazon Ads across our D2C book.",
      summary: "Run Google + Amazon as one connected stack across 6–8 brands. Search, PMax, Shopping, Demand Gen on Google. Sponsored Products + DSP on Amazon.",
      responsibilities: [
        "Daily campaign management across Google + Amazon for 6–8 brands",
        "PMax structure, asset feeds, and budget allocation",
        "Amazon Ads strategy: SP, SB, SD, DSP",
        "Cross-channel reporting and attribution triangulation",
        "Weekly creative briefs to the studio",
      ],
      youAre: [
        "4–7 years running Google + Amazon Ads at agencies or brands",
        "₹15Cr+ personal lifetime spend on Google",
        "Amazon Ads experience across India + US a strong plus",
      ],
      bonus: ["Looker / GA4 advanced reporting", "Amazon DSP"],
      datePosted: "2026-04-22", validThrough: "2026-07-22",
    },
    "senior-art-director": {
      title: "Senior Art Director", dept: "Creative",
      location: "Mumbai · Remote", city: "Mumbai", region: "MH", country: "IN",
      type: "Full-time", empType: "FULL_TIME", workMode: "HYBRID",
      industry: "Design",
      band: "Senior · 6+ years",
      salary: "₹22L – ₹34L",
      salaryMin: 2200000, salaryMax: 3400000, salaryUnit: "YEAR",
      hint: "Lead brand identity + performance creative across the D2C book.",
      summary: "Direct identity systems, packaging, and performance creative for 4–6 brands. You own visual standards across every touchpoint.",
      responsibilities: [
        "Brand identity rebuilds + design systems",
        "Direct UGC, motion, and static for performance",
        "Packaging direction with manufacturing partners",
        "Mentor 2–3 mid-level designers",
      ],
      youAre: [
        "6+ years in brand or D2C creative",
        "Portfolio with shipped identity systems",
        "Comfortable directing photo + video shoots",
      ],
      bonus: ["Motion / After Effects fluency", "Type design background"],
      datePosted: "2026-04-18", validThrough: "2026-07-18",
    },
    "performance-copywriter": {
      title: "Performance Copywriter", dept: "Creative",
      location: "Remote · India", city: "Remote (India)", region: "", country: "IN",
      type: "Full-time", empType: "FULL_TIME", workMode: "REMOTE",
      industry: "Marketing & Advertising",
      band: "Mid-Senior · 3–6 years",
      salary: "₹14L – ₹24L",
      salaryMin: 1400000, salaryMax: 2400000, salaryUnit: "YEAR",
      hint: "Write hooks that work in 3 seconds. Headlines, scripts, emails.",
      summary: "Write the words that move the math. Ad scripts, hooks, landing-page copy, email flows. 60–80 pieces a month across 4 D2C brands.",
      responsibilities: [
        "Write hooks + scripts for UGC and direct-response",
        "Landing-page copy systems",
        "Email + WhatsApp lifecycle copy",
        "Pair daily with art directors and buyers",
      ],
      youAre: [
        "3–6 years writing direct-response copy",
        "Have published your own writing",
        "Speak both 'brand' and 'performance'",
      ],
      bonus: ["Personal newsletter or substack", "Beauty / Food category fluency"],
      datePosted: "2026-04-30", validThrough: "2026-07-30",
    },
    "growth-strategist": {
      title: "Growth Strategist · D2C", dept: "Strategy",
      location: "Mumbai", city: "Mumbai", region: "MH", country: "IN",
      type: "Full-time", empType: "FULL_TIME", workMode: "ONSITE",
      industry: "Marketing & Advertising",
      band: "Senior · 5–9 years",
      salary: "₹26L – ₹42L · OTE",
      salaryMin: 2600000, salaryMax: 4200000, salaryUnit: "YEAR",
      hint: "Own a P&L. Lead a pod. Run quarterly strategy across 3 brands.",
      summary: "You own 3 D2C accounts end-to-end. Strategy, P&L, hiring on the pod, founder relationship. The senior we trust with the brand.",
      responsibilities: [
        "P&L ownership across 3 D2C accounts",
        "Lead the pod: buyer, creative, retention, tech",
        "Weekly founder calls and quarterly board reads",
        "Drive the 90-day roadmap on each account",
      ],
      youAre: [
        "5–9 years in growth strategy or as a founder",
        "Read a P&L the way most read a tweet",
        "Can write a one-page thesis without a deck",
      ],
      bonus: ["D2C founder experience", "Ex-consulting background"],
      datePosted: "2026-05-05", validThrough: "2026-08-05",
    },
    "shopify-engineer": {
      title: "Shopify Plus Engineer", dept: "Technology",
      location: "Remote", city: "Remote (Worldwide)", region: "", country: "IN",
      type: "Contract", empType: "CONTRACTOR", workMode: "REMOTE",
      industry: "Software Development",
      band: "Senior · 4+ years Shopify Plus",
      salary: "₹5L – ₹10L / month · retainer",
      salaryMin: 500000, salaryMax: 1000000, salaryUnit: "MONTH",
      hint: "Shopify Plus + Headless. Speed, AOV, retention.",
      summary: "Run our Shopify Plus engineering across 4–6 brands. Theme architecture, headless storefronts, app integrations, speed.",
      responsibilities: [
        "Theme + headless storefront builds",
        "Speed optimisation: sub-2s LCP",
        "Klaviyo, Razorpay, GA4 integrations",
        "Liquid + React + JS proficiency",
      ],
      youAre: [
        "4+ years on Shopify Plus",
        "Have shipped headless on a real brand",
        "Comfortable with CI/CD + GitHub",
      ],
      bonus: ["Hydrogen / Oxygen", "Next.js commerce"],
      datePosted: "2026-04-12", validThrough: "2026-07-12",
    },
  };

  // A missing slug used to silently fall back to the Meta Buyer posting, so an
  // applicant clicking "AI Workflow Engineer" read a different job and applied
  // to it by mistake. An unknown role now says so.
  const role = roles[slug];
  if (!role) {
    return (
      <section className="page-hero jd-hero" id="top" data-wm="Careers">
        <span className="page-hero__wm" aria-hidden="true">Careers</span>
        <div className="container">
          <nav className={"jd-hero__crumb in"} aria-label="Breadcrumb">
            <a href="index.html">Home</a><span className="sep">·</span>
            <a href="Careers.html">Careers</a><span className="sep">·</span>
            <span className="current">Role not found</span>
          </nav>
          <h1 className="jd-hero__h">This role isn't open.</h1>
          <p className="jd-hero__sub">
            It may have been filled or the link may be out of date. Every role we are
            hiring for right now is on the careers page.
          </p>
          <div className="page-hero__actions">
            <a className="page-hero__cta" href="Careers.html">
              See open roles<span className="page-hero__cta-arr" aria-hidden="true" />
            </a>
            <button className="page-hero__alt" onClick={() => window.mmcOpenBrief()}>
              Or pitch us your own role
            </button>
          </div>
        </div>
      </section>
    );
  }

  // JSON-LD JobPosting schema, Google reads this for Job search results
  const schema = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": role.title,
    "description": role.summary + " Responsibilities: " + role.responsibilities.join(". ") + ". Requirements: " + role.youAre.join(". "),
    "datePosted": role.datePosted,
    "validThrough": role.validThrough,
    "employmentType": role.empType,
    "industry": role.industry,
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Monday Marketing Company",
      "sameAs": "https://mondaymarketing.company",
      "logo": "https://mondaymarketing.company/assets/logo-blue.png"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "WeWork, Zenia Building, Hiranandani Business Park",
        "addressLocality": role.city || "Thane",
        "addressRegion": role.region || "MH",
        "postalCode": "400607",
        "addressCountry": role.country || "IN"
      }
    },
    "jobLocationType": role.workMode === "REMOTE" ? "TELECOMMUTE" : undefined,
    "applicantLocationRequirements": role.workMode === "REMOTE"
      ? { "@type": "Country", "name": "India" }
      : undefined,
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": {
        "@type": "QuantitativeValue",
        "minValue": role.salaryMin,
        "maxValue": role.salaryMax,
        "unitText": role.salaryUnit || "YEAR"
      }
    },
    "workHours": role.empType === "FULL_TIME" ? "40 hours per week" : undefined,
    "directApply": true
  };

  // Inject schema once on mount
  React.useEffect(() => {
    const id = "jd-jobposting-schema";
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = id;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema, null, 2);
    return () => {
      const e = document.getElementById(id);
      if (e) e.remove();
    };
  }, [slug]);

  const [step, setStep] = React.useState(1); // 1=basics, 2=screening, 3=done
  const [form, setForm] = React.useState({
    name: "", email: "", phone: "", linkedin: "",
    currentCtc: "", expectedCtc: "", notice: "",
    mode: "Hybrid", cv: null, cvUrl: "", why: "", note: ""
  });
  const [screening, setScreening] = React.useState({
    q1: "", q2: "", q3: "", q4: ""
  });
  const update = (k) => (e) => setForm((f) => ({...f, [k]: e.target.value}));
  const updateScreen = (k) => (e) => setScreening((s) => ({...s, [k]: e.target.value}));
  const MAX_CV_MB = 4;
  const [cvError, setCvError] = React.useState("");
  const handleFile = (e) => {
    const f = e.target.files && e.target.files[0];
    setCvError("");
    if (f && f.size > MAX_CV_MB * 1024 * 1024) {
      setCvError("That file is over " + MAX_CV_MB + "MB. Paste a link to it instead.");
      e.target.value = "";
      return;
    }
    setForm((old) => ({ ...old, cv: f || null }));
  };

  /* The site is static, so there is no server to receive a multipart upload.
     The file is read here and travels inside the JSON payload as base64, which
     the receiving webhook decodes and stores. Anything over a few MB will be
     rejected by most webhook endpoints, hence the cap and the link field. */
  const readCv = (file) => new Promise((resolve) => {
    if (!file) return resolve(null);
    const r = new FileReader();
    r.onload = () => resolve({
      cvName: file.name,
      cvType: file.type || "application/octet-stream",
      cvSize: file.size,
      cvBase64: String(r.result).split(",").pop()
    });
    r.onerror = () => resolve({ cvName: file.name, cvError: "could not read file" });
    r.readAsDataURL(file);
  });

  // Per-role screening questions. Falls back to generic deep-dive prompts.
  const screeningQuestions = {
    "senior-meta-buyer": [
      { id: "q1", q: "Walk us through the largest Meta account you've personally managed.", hint: "Monthly spend, ROAS, account structure." },
      { id: "q2", q: "Describe a creative test that meaningfully moved CPM or hook-rate.", hint: "What changed, what you measured, what you learned." },
      { id: "q3", q: "How do you split BAU optimisation vs. weekly creative refresh?", hint: "Cadence, decision rules, who you collaborate with." },
      { id: "q4", q: "A brand of yours just blew through the daily budget on a single campaign. First three things you do.", hint: "60 seconds, then a paragraph." },
    ],
    "google-amazon-specialist": [
      { id: "q1", q: "Describe your most successful PMax structure to date.", hint: "Asset groups, audience signals, exclusions, outcome." },
      { id: "q2", q: "How do you decide between Sponsored Products vs. Sponsored Brand budget on Amazon?", hint: "Heuristics, lifecycle, category." },
      { id: "q3", q: "Walk us through cross-channel attribution between Google Ads and Amazon for a multi-marketplace brand.", hint: "Tools, model, gotchas." },
      { id: "q4", q: "How would you triage a brand whose Google CAC has 2x'd in a quarter?", hint: "Diagnostic + first ship." },
    ],
    "senior-art-director": [
      { id: "q1", q: "Walk us through a brand identity system you've shipped end-to-end.", hint: "From positioning to packaging to performance creative." },
      { id: "q2", q: "How do you direct a UGC shoot for a brand the audience has never heard of?", hint: "Casting, scripting, on-set choices." },
      { id: "q3", q: "Describe the brief you'd write for a 60-asset performance creative sprint.", hint: "Constraints, format mix, success criteria." },
      { id: "q4", q: "Pick one of your projects and explain a design choice that was hard to defend.", hint: "Be honest about the trade-off." },
    ],
    "performance-copywriter": [
      { id: "q1", q: "Paste the best three-second hook you've written. Then tell us why it worked.", hint: "Brand, format, the data you saw." },
      { id: "q2", q: "How do you write copy differently for cold acquisition vs. warm retention?", hint: "Specifics on tone, frame, payoff." },
      { id: "q3", q: "Describe your weekly volume cadence on your last role.", hint: "Scripts, headlines, emails: with realistic numbers." },
      { id: "q4", q: "A founder pushes back on copy you believe in. How do you respond?", hint: "What you ask, what you concede, what you hold." },
    ],
    "growth-strategist": [
      { id: "q1", q: "Walk us through a P&L you've owned and the levers you pulled.", hint: "Revenue, margin, CAC payback period." },
      { id: "q2", q: "Write the one-page growth thesis you'd hand a founder on day one.", hint: "Diagnose first, then 90-day moves." },
      { id: "q3", q: "Describe the pod structure you'd build around a ₹5Cr/year retainer.", hint: "Roles, ratios, weekly cadence." },
      { id: "q4", q: "Tell us about a brand you said no to (or would say no to). Why.", hint: "Be specific. We respect this." },
    ],
    "shopify-engineer": [
      { id: "q1", q: "Describe the largest Shopify Plus build you've shipped.", hint: "Architecture, integrations, performance numbers." },
      { id: "q2", q: "How do you approach LCP / Core Web Vitals on a heavy product page?", hint: "Concrete techniques, not theory." },
      { id: "q3", q: "Walk us through a headless migration you've led.", hint: "Why headless, what broke, what you'd do differently." },
      { id: "q4", q: "Show us a piece of Liquid or JS you're proud of.", hint: "Paste or link. Tell us why." },
    ],
  };
  const questions = screeningQuestions[slug] || [
    { id: "q1", q: "What's the single piece of work that best represents how you operate?", hint: "Why you picked it." },
    { id: "q2", q: "Walk us through how you make a hard trade-off at work.", hint: "Specific situation, not theory." },
    { id: "q3", q: "What's the kind of project you'd quietly hope to be assigned in your first 90 days?", hint: "Be specific." },
    { id: "q4", q: "Anything else we should know about how you want to work?", hint: "" },
  ];

  return (
    <>
      <section className="page-hero jd-hero" id="top" data-wm="Careers">
        <span className="page-hero__wm" aria-hidden="true">Careers</span>
        <div className="container jd-hero__inner">
          <nav className="jd-hero__crumb" aria-label="Breadcrumb">
            <a href="index.html">Home</a>
            <span className="sep">·</span>
            <a href="Careers.html">Careers</a>
            <span className="sep">·</span>
            <span className="current">{role.title}</span>
          </nav>

          <div className="jd-hero__tags">
            <span className="jd-hero__tag jd-hero__tag--dept">{role.dept}</span>
            <span>{role.location}</span>
            <span>{role.type}</span>
            <span>{role.band}</span>
          </div>

          <h1 className="jd-hero__h">{role.title}</h1>
          <p className="jd-hero__sub">{role.hint}</p>

          <div className="jd-hero__meta">
            <div className="jd-hero__meta-item">
              <span className="lbl">Compensation band</span>
              <span className="val">{role.salary}</span>
            </div>
            <div className="jd-hero__meta-item">
              <span className="lbl">Reports to</span>
              <span className="val">Head of Performance</span>
            </div>
            <div className="jd-hero__meta-item">
              <span className="lbl">Apply window</span>
              <span className="val">Rolling · open now</span>
            </div>
          </div>
        </div>
      </section>

      <section className="jd-body">
        <div className="container jd-body__container">
          <div className="jd-body__grid">
            {/* Left, description */}
            <article className="jd-desc">
              <div className="jd-section">
                <div className="eyebrow">The role</div>
                <p className="jd-summary">{role.summary}</p>
              </div>

              <div className="jd-section">
                <div className="eyebrow">What you'll own</div>
                <ol className="jd-list">
                  {role.responsibilities.map((r, i) => (
                    <li key={i}>
                      <span className="jd-n">{String(i + 1).padStart(2, "0")}</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="jd-section">
                <div className="eyebrow">You probably</div>
                <ul className="jd-bullets">
                  {role.youAre.map((y, i) => (
                    <li key={i}>{y}</li>
                  ))}
                </ul>
              </div>

              <div className="jd-section">
                <div className="eyebrow">Bonus</div>
                <ul className="jd-bullets">
                  {role.bonus.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

              <div className="jd-section">
                <div className="eyebrow">Hiring process</div>
                <ol className="jd-process">
                  {[
                    "30-min screening call with the Head of Performance",
                    "A 90-minute case study you complete on your own time",
                    "Final round: 2hr panel with founders + the team you'd work with",
                    "Reference checks + offer within 7 days",
                  ].map((p, i) => (
                    <li key={i}>
                      <span className="jd-proc-n">{String(i + 1).padStart(2, "0")}</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </article>

            {/* Right, application form */}
            <aside className="jd-apply" id="jd-apply">
              <div className="jd-apply__card">
                {/* Step indicator */}
                {step !== 3 && (
                  <div className="jd-steps" role="list" aria-label="Application progress">
                    <div className={"jd-steps__item " + (step === 1 ? "is-on" : (step > 1 ? "is-done" : ""))} role="listitem">
                      <span className="jd-steps__dot">{step > 1 ? "✓" : 1}</span>
                      <span className="jd-steps__label">Basics</span>
                    </div>
                    <span className="jd-steps__rule" aria-hidden="true"><span style={{ width: step > 1 ? "100%" : "0%" }}></span></span>
                    <div className={"jd-steps__item " + (step === 2 ? "is-on" : "")} role="listitem">
                      <span className="jd-steps__dot">2</span>
                      <span className="jd-steps__label">Screening</span>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <form className="jd-form"
                        onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                    <div className="jd-form__head">
                      <div className="eyebrow">Step 1 · Basics</div>
                      <h2 className="jd-form__h">Tell us who you are.</h2>
                      <p className="jd-form__sub">
                        After this you'll answer four short questions about the role.
                        We read every application.
                      </p>
                    </div>

                    <label className="jd-field">
                      <span>Your full name <i>*</i></span>
                      <input type="text" value={form.name} onChange={update("name")} required placeholder="Aanya Sharma" />
                    </label>

                    <label className="jd-field">
                      <span>Email <i>*</i></span>
                      <input type="email" value={form.email} onChange={update("email")} required placeholder="aanya@gmail.com" />
                    </label>

                    <div className="jd-field-row">
                      <label className="jd-field">
                        <span>Phone</span>
                        <input type="tel" value={form.phone} onChange={update("phone")} placeholder="+91 …" />
                      </label>
                      <label className="jd-field">
                        <span>LinkedIn</span>
                        <input type="text" value={form.linkedin} onChange={update("linkedin")} placeholder="linkedin.com/in/…" />
                      </label>
                    </div>

                    <div className="jd-field-row">
                      <label className="jd-field">
                        <span>Current CTC <i>*</i></span>
                        <input type="text" value={form.currentCtc} onChange={update("currentCtc")} required placeholder="₹18L / annum" />
                      </label>
                      <label className="jd-field">
                        <span>Expected CTC <i>*</i></span>
                        <input type="text" value={form.expectedCtc} onChange={update("expectedCtc")} required placeholder="₹28L · negotiable" />
                      </label>
                    </div>

                    <label className="jd-field">
                      <span>Notice period</span>
                      <input type="text" value={form.notice} onChange={update("notice")} placeholder="30 days / 60 days / immediate" />
                    </label>

                    {/* CV upload. `required` is conditional: a link is an equally
                        valid way to send us a CV, and large files cannot travel
                        inside a webhook payload at all. */}
                    <label className="jd-field jd-upload">
                      <span>Resume / CV <i>*</i></span>
                      <div className={"jd-upload__box " + (form.cv ? "is-filled" : "")}>
                        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFile}
                               required={!form.cvUrl} />
                        {form.cv ? (
                          <span className="jd-upload__msg">
                            <span className="jd-upload__check" aria-hidden="true">
                              <svg viewBox="0 0 16 16" width="14" height="14">
                                <path d="M 3 8 L 7 12 L 13 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                            {form.cv.name}
                            <span className="jd-upload__change">change</span>
                          </span>
                        ) : (
                          <span className="jd-upload__msg jd-upload__msg--empty">
                            <span className="jd-upload__icon" aria-hidden="true">
                              <svg viewBox="0 0 20 20" width="18" height="18">
                                <path d="M 10 14 L 10 4 M 6 8 L 10 4 L 14 8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M 4 16 L 16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                              </svg>
                            </span>
                            <span className="jd-upload__txt">
                              <strong>Drop your CV here</strong>
                              <em>PDF or Word · max 8MB</em>
                            </span>
                          </span>
                        )}
                      </div>
                    </label>

                    {cvError && <p className="jd-cv-error">{cvError}</p>}

                    <label className="jd-field">
                      <span>Or paste a link to your CV</span>
                      <input type="url" value={form.cvUrl} onChange={update("cvUrl")}
                             placeholder="https://drive.google.com/..." />
                      <span className="jd-field__hint">
                        Use this if your CV is over 4MB, or if you would rather share a live link.
                      </span>
                    </label>

                    {/* Work mode */}
                    <div className="jd-field jd-radio">
                      <span className="jd-radio__legend">How do you want to work? <i>*</i></span>
                      <div className="jd-radio__options">
                        {[
                          { v: "Onsite",   d: "Five days at the Thane studio" },
                          { v: "Hybrid",   d: "3 in Office, 2 from home" },
                          { v: "Remote",   d: "Work from home (Worldwide)" },
                        ].map((opt) => (
                          <label key={opt.v} className={"jd-radio__opt " + (form.mode === opt.v ? "is-on" : "")}>
                            <input type="radio" name="mode" value={opt.v}
                                   checked={form.mode === opt.v}
                                   onChange={() => setForm(f => ({...f, mode: opt.v}))}/>
                            <span className="jd-radio__opt-head">
                              <span className="jd-radio__dot" aria-hidden="true"></span>
                              <span className="jd-radio__name">{opt.v}</span>
                            </span>
                            <span className="jd-radio__desc">{opt.d}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="jd-form__foot">
                      <button type="submit" className="btn btn--primary glow-btn">
                        <span className="glow-btn__glow" aria-hidden="true"></span>
                        <span className="glow-btn__inner">
                          Proceed to screening
                          <span className="arrow"></span>
                        </span>
                      </button>
                      <span className="jd-form__fine">4 short role-specific questions.</span>
                    </div>
                  </form>
                )}

                {step === 2 && (
                  <form className="jd-form"
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const cv = await readCv(form.cv);
                          if (window.MMCForms) {
                            const { cv: _file, ...rest } = form;
                            window.MMCForms.submitLead(
                              {
                                role: role.title,
                                roleSlug: slug,
                                ...rest,
                                ...(cv || {}),
                                cvUrl: form.cvUrl || "",
                                ...screening
                              },
                              { subject: "Application, " + role.title + " - " + (form.name || "candidate") }
                            );
                          }
                          setStep(3);
                        }}>
                    <div className="jd-form__head">
                      <div className="eyebrow">Step 2 · Screening</div>
                      <h2 className="jd-form__h">Four questions about the role.</h2>
                      <p className="jd-form__sub">
                        Short, specific answers. Aim for one paragraph each. We're looking for
                        how you think, not perfect prose.
                      </p>
                    </div>

                    <div className="jd-screen-applied">
                      <span className="jd-screen-applied-lbl">Applying for</span>
                      <span className="jd-screen-applied-val">{role.title}</span>
                    </div>

                    {questions.map((q, i) => (
                      <label key={q.id} className="jd-field jd-screen-q">
                        <span className="jd-screen-n">{String(i + 1).padStart(2, "0")}</span>
                        <span className="jd-screen-prompt">
                          <span className="jd-screen-q-text">{q.q}{i < 2 && <i> *</i>}</span>
                          {q.hint && <span className="jd-screen-hint">{q.hint}</span>}
                        </span>
                        <textarea rows={i < 2 ? 5 : 4}
                                  value={screening[q.id]}
                                  onChange={updateScreen(q.id)}
                                  required={i < 2}
                                  placeholder=""></textarea>
                      </label>
                    ))}

                    <label className="jd-consent">
                      <input type="checkbox" required />
                      <span>I agree to MMC using my details and CV to assess this application, as described in the <a href="Privacy.html" target="_blank" rel="noreferrer">privacy policy</a>.</span>
                    </label>

                    <div className="jd-form__foot jd-form__foot--split">
                      <button type="button"
                              className="btn btn--ghost"
                              onClick={() => setStep(1)}>
                        <span className="arrow arrow--back"></span>
                        Back
                      </button>
                      <button type="submit" className="btn btn--primary glow-btn">
                        <span className="glow-btn__glow" aria-hidden="true"></span>
                        <span className="glow-btn__inner">
                          Submit application
                          <span className="arrow"></span>
                        </span>
                      </button>
                    </div>
                  </form>
                )}

                {step === 3 && (
                  <div className="jd-thanks">
                    <div className="jd-thanks__ring" aria-hidden="true">
                      <svg viewBox="0 0 80 80" width="80" height="80">
                        <circle cx="40" cy="40" r="36" fill="none" stroke="var(--mmc-yellow)" strokeWidth="2"/>
                        <path d="M 26 41 L 36 51 L 56 31" fill="none" stroke="var(--mmc-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="jd-thanks__tag">Application received</span>
                    <h2>Thanks, {form.name.split(" ")[0] || "friend"}.</h2>
                    <p>
                      Your application for <span className="em-serif" style={{color:"var(--mmc-blue)"}}>{role.title}</span>{" "}
                      is in. A senior on the hiring team will read it within one working day and
                      come back with next steps, or a kind, honest no.
                    </p>
                    <ul className="jd-thanks__next">
                      <li><span>01</span>We read every application within one working day.</li>
                      <li><span>02</span>If we move forward, you'll hear from <strong>hr@mondaymarketing.company</strong>.</li>
                      <li><span>03</span>The hiring process is described in the role page on your left.</li>
                    </ul>
                    <a href="Careers.html" className="btn btn--ghost">
                      Back to careers
                      <span className="arrow"></span>
                    </a>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <style>{`
        /* ---- Hero ---- */
        .jd-hero { position: relative; z-index: 1; padding: 140px 0 clamp(40px, 5vw, 64px); }
        .jd-hero__inner { max-width: none; }
        .jd-hero__crumb {
          font-family: var(--font-body); font-size: 11.5px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--fg-3);
          margin-bottom: 24px;
        }
        .jd-hero__crumb a { color: var(--fg-3); }
        .jd-hero__crumb a:hover { color: var(--mmc-blue); }
        .jd-hero__crumb .sep { margin: 0 10px; color: rgba(75,85,99,0.4); }
        .jd-hero__crumb .current { color: var(--mmc-blue); }

        .jd-hero__tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 22px; }
        .jd-hero__tags span {
          font-family: var(--font-body); font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 6px 12px; background: rgba(255,255,255,0.7);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.12); border-radius: 999px;
          color: var(--mmc-blue-700); backdrop-filter: blur(8px);
        }
        .jd-hero__tag--dept { background: var(--mmc-blue); color: var(--mmc-yellow); border-color: var(--mmc-blue); }

        .jd-hero__h {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(44px, 6vw, 92px);
          line-height: 0.98; letter-spacing: -0.035em;
          color: var(--fg-1); margin: 0 0 18px;
        }
        .jd-hero__sub {
          font-family: var(--font-serif); font-style: italic; font-weight: 500;
          font-size: clamp(18px, 1.8vw, 24px);
          line-height: 1.4;
          margin: 0 0 36px; max-width: 720px;
        }
        .jd-hero__meta {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 2vw, 32px);
          padding-top: 28px; border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.18);
        }
        .jd-hero__meta-item { display: flex; flex-direction: column; gap: 4px; }
        .jd-hero__meta-item .lbl {
          font-family: var(--font-body); font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--fg-3);
        }
        .jd-hero__meta-item .val {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(17px, 1.5vw, 21px); letter-spacing: -0.01em;
          color: var(--mmc-blue);
        }

        /* ---- On the shared blue card (assets/page-hero.css) ----------------
           This block loads after page-hero.css, so each override carries an
           element to beat section.page-hero (0,1,1). Everything the shared
           sheet already handles here (the crumb, h1, the lead paragraph, .lbl,
           the meta rule) is left to it. */
        /* The dept pill's ground is --mmc-blue, the same royal the card ramps
           through, so the pill dissolved into it. It becomes the yellow pill
           the shared sheet uses elsewhere and keeps ink type on that ground. */
        section.page-hero .jd-hero__tag--dept {
          background: var(--mmc-yellow); border-color: var(--mmc-yellow); color: #12204A;
        }
        /* Three meta items, not the shared stat row's four. */
        section.page-hero .jd-hero__meta { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        /* The shared sheet lightens .lbl, but it knows nothing about .val,
           which was still setting royal blue type on the royal card. */
        section.page-hero .jd-hero__meta-item .val { color: var(--mmc-yellow); }

        /* ---- Body ---- */
        .jd-body { position: relative; z-index: 1; padding: clamp(40px, 5vw, 64px) 0 clamp(56px, 8vw, 112px); }
        .jd-body__container { max-width: none; }
        .jd-body__grid {
          display: grid; grid-template-columns: 1.4fr 1fr;
          gap: clamp(28px, 4vw, 64px);
          align-items: start;
        }

        .jd-desc { display: flex; flex-direction: column; gap: clamp(28px, 3.4vw, 48px); }
        .jd-section { display: flex; flex-direction: column; gap: 16px; }
        .jd-summary {
          font-family: var(--font-display); font-weight: 500;
          font-size: clamp(18px, 1.7vw, 23px);
          line-height: 1.4; letter-spacing: -0.015em;
          color: var(--fg-1); margin: 0;
        }

        .jd-list { list-style: none; margin: 0; padding: 0; }
        .jd-list li {
          display: grid; grid-template-columns: 36px 1fr; gap: 14px;
          padding: 14px 0; border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          font-family: var(--font-body); font-size: 15px; line-height: 1.55; color: var(--fg-1);
        }
        .jd-list li:last-child { border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.10); }
        .jd-n {
          font-family: var(--font-display); font-weight: 700; font-size: 12px;
          letter-spacing: 0.18em; color: var(--mmc-yellow); padding-top: 2px;
        }

        .jd-bullets { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
        .jd-bullets li {
          padding-left: 22px; position: relative;
          font-family: var(--font-body); font-size: 14.5px; line-height: 1.6; color: var(--fg-1);
        }
        .jd-bullets li::before {
          content: ""; position: absolute; left: 0; top: 10px;
          width: 12px; height: 1.5px; background: var(--mmc-yellow);
        }

        .jd-process { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0; }
        .jd-process li {
          display: grid; grid-template-columns: 50px 1fr; gap: 16px;
          padding: 16px 0; border-top: 1px dashed rgba(var(--mmc-blue-rgb), 0.18);
          font-family: var(--font-body); font-size: 14.5px; color: var(--fg-1); line-height: 1.55;
        }
        .jd-process li:last-child { border-bottom: 1px dashed rgba(var(--mmc-blue-rgb), 0.18); }
        .jd-proc-n {
          font-family: var(--font-display); font-weight: 700; font-size: 13px;
          letter-spacing: 0.18em; color: var(--mmc-blue); padding-top: 2px;
        }

        /* ---- Application card (sticky) ---- */
        .jd-apply { position: sticky; top: 100px; }
        .jd-apply__card {
          background: rgba(255,255,255,0.94);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.12);
          border-radius: 18px;
          padding: clamp(24px, 3vw, 36px);
          box-shadow: var(--shadow-3);
        }

        .jd-form { display: flex; flex-direction: column; gap: 16px; }
        .jd-form__head { display: flex; flex-direction: column; gap: 6px; margin-bottom: 6px; }
        .jd-form__h { font-family: var(--font-display); font-weight: 700; font-size: 24px; letter-spacing: -0.02em; color: var(--fg-1); margin: 8px 0 0; line-height: 1.15; }
        .jd-form__sub { font-family: var(--font-body); font-size: 13px; color: var(--fg-2); line-height: 1.5; margin: 0; }

        /* Step indicator */
        .jd-steps {
          display: flex; align-items: center; gap: 10px;
          padding: 0 0 18px;
          margin: 0 0 12px;
          border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
        }
        .jd-steps__item { display: inline-flex; align-items: center; gap: 8px; color: var(--fg-3); }
        .jd-steps__dot {
          width: 24px; height: 24px;
          border-radius: 50%;
          background: rgba(var(--mmc-blue-rgb), 0.08);
          border: 1.5px solid rgba(var(--mmc-blue-rgb), 0.2);
          color: var(--fg-3);
          font-family: var(--font-display); font-weight: 700; font-size: 11px;
          display: inline-flex; align-items: center; justify-content: center;
          line-height: 1;
          transition: all var(--dur-base) var(--ease-out);
        }
        .jd-steps__label {
          font-family: var(--font-body); font-size: 11px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          transition: color var(--dur-base) var(--ease-out);
        }
        .jd-steps__rule {
          flex: 1; height: 2px;
          background: rgba(var(--mmc-blue-rgb), 0.12);
          border-radius: 999px;
          overflow: hidden;
        }
        .jd-steps__rule > span {
          display: block; height: 100%;
          background: var(--mmc-yellow);
          border-radius: 999px;
          transition: width 480ms var(--ease-out);
        }
        .jd-steps__item.is-on .jd-steps__dot {
          background: var(--mmc-blue);
          border-color: var(--mmc-blue);
          color: var(--mmc-yellow);
        }
        .jd-steps__item.is-on .jd-steps__label { color: var(--mmc-blue); }
        .jd-steps__item.is-done .jd-steps__dot {
          background: var(--mmc-yellow);
          border-color: var(--mmc-yellow);
          color: var(--mmc-blue-700);
        }
        .jd-steps__item.is-done .jd-steps__label { color: var(--mmc-blue); }

        .jd-field { display: flex; flex-direction: column; gap: 6px; }
        .jd-field > span { font-family: var(--font-body); font-size: 10.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--fg-3); }
        .jd-field > span i { font-style: normal; color: var(--mmc-yellow); margin-left: 3px; }
        .jd-field input, .jd-field textarea {
          font-family: var(--font-body); font-size: 14px; color: var(--mmc-text);
          background: #fff; border: 1px solid var(--mmc-border);
          border-radius: 8px; padding: 11px 14px; font-weight: 500;
          transition: border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
        }
        .jd-field input::placeholder, .jd-field textarea::placeholder { color: rgba(75, 85, 99, 0.45); }
        .jd-field input:focus, .jd-field textarea:focus {
          outline: none; border-color: var(--mmc-blue);
          box-shadow: 0 0 0 3px rgba(var(--mmc-blue-rgb), 0.12);
        }
        .jd-field textarea { resize: vertical; min-height: 70px; }

        .jd-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        /* Upload */
        .jd-upload__box {
          position: relative;
          border: 1.5px dashed rgba(var(--mmc-blue-rgb), 0.3); border-radius: 10px;
          padding: 18px 16px; background: #fff;
          transition: border-color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out);
          cursor: pointer;
        }
        .jd-upload__box:hover { border-color: var(--mmc-blue); background: rgba(var(--mmc-blue-rgb), 0.03); }
        .jd-upload__box.is-filled { border-style: solid; border-color: var(--mmc-blue); background: rgba(var(--mmc-blue-rgb), 0.04); }
        .jd-cv-error {
          margin: -6px 0 0; font-family: var(--font-body); font-size: 13px;
          font-weight: 600; color: #96590F;
        }
        .jd-field__hint {
          display: block; margin-top: 6px; font-family: var(--font-body);
          font-size: 12px; font-weight: 500; color: var(--fg-3); letter-spacing: 0;
          text-transform: none;
        }
        .jd-upload__box input[type=file] {
          position: absolute; inset: 0; opacity: 0; cursor: pointer;
        }
        .jd-upload__msg {
          display: flex; align-items: center; gap: 12px;
          font-family: var(--font-body); font-size: 13.5px;
          color: var(--mmc-blue-700); font-weight: 600;
        }
        .jd-upload__msg--empty { color: var(--fg-2); align-items: center; }
        .jd-upload__icon { color: var(--mmc-blue); display: inline-flex; }
        .jd-upload__txt { display: flex; flex-direction: column; gap: 2px; }
        .jd-upload__txt strong { font-family: var(--font-display); font-weight: 700; font-size: 14px; color: var(--mmc-blue-700); }
        .jd-upload__txt em { font-style: normal; font-size: 11px; color: var(--fg-3); letter-spacing: 0.04em; }
        .jd-upload__check { color: var(--mmc-yellow); display: inline-flex; }
        .jd-upload__change { font-size: 10.5px; color: var(--mmc-blue); margin-left: auto; padding: 4px 8px; background: rgba(var(--mmc-blue-rgb), 0.08); border-radius: 999px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }

        /* Radio for work mode */
        .jd-radio__legend { font-family: var(--font-body); font-size: 10.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--fg-3); display: block; margin-bottom: 8px; }
        .jd-radio__legend i { font-style: normal; color: var(--mmc-yellow); margin-left: 3px; }
        .jd-radio__options { display: grid; gap: 8px; }
        .jd-radio__opt {
          display: flex; flex-direction: column; gap: 4px;
          padding: 12px 16px; border: 1px solid var(--mmc-border);
          border-radius: 10px; cursor: pointer; background: #fff;
          transition: border-color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out);
        }
        .jd-radio__opt:hover { border-color: var(--mmc-blue); }
        .jd-radio__opt.is-on {
          background: var(--mmc-blue);
          color: #fff;
          border-color: var(--mmc-blue);
        }
        .jd-radio__opt.is-on .jd-radio__name { color: #fff; }
        .jd-radio__opt.is-on .jd-radio__desc { color: rgba(255,255,255,0.75); }
        .jd-radio__opt input { position: absolute; opacity: 0; pointer-events: none; }
        .jd-radio__opt-head { display: inline-flex; align-items: center; gap: 10px; }
        .jd-radio__dot {
          width: 14px; height: 14px; border-radius: 50%;
          border: 1.5px solid var(--mmc-blue); background: transparent;
          flex-shrink: 0; transition: background var(--dur-base) var(--ease-out);
        }
        .jd-radio__opt.is-on .jd-radio__dot { background: var(--mmc-yellow); border-color: var(--mmc-yellow); }
        .jd-radio__name { font-family: var(--font-display); font-weight: 700; font-size: 14px; letter-spacing: -0.01em; color: var(--fg-1); }
        .jd-radio__desc { font-family: var(--font-body); font-size: 12px; color: var(--fg-3); padding-left: 24px; }

        .jd-consent { display: flex; gap: 10px; align-items: flex-start; margin: 4px 0 16px; font: 500 14px/1.45 var(--font-body); color: var(--fg-2); cursor: pointer; }
        .jd-consent input { width: 20px; height: 20px; margin-top: 1px; flex: none; accent-color: var(--mmc-blue); }
        .jd-consent a { color: var(--mmc-blue); border-bottom: 1px solid currentColor; }
        .jd-form__foot { display: flex; align-items: center; gap: 14px; padding-top: 8px; flex-wrap: wrap; }
        .jd-form__foot--split { justify-content: space-between; }
        .jd-form__foot--split .btn--ghost {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 12px 16px;
          background: transparent; border: 1px solid rgba(var(--mmc-blue-rgb), 0.2);
          border-radius: 10px; cursor: pointer;
          font-family: var(--font-body); font-size: 12px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--mmc-blue);
          transition: all var(--dur-base) var(--ease-out);
        }
        .jd-form__foot--split .btn--ghost:hover {
          background: rgba(var(--mmc-blue-rgb), 0.06);
          border-color: var(--mmc-blue);
        }
        .arrow--back {
          display: inline-block; width: 18px; height: 1.5px;
          background: currentColor; position: relative;
        }
        .arrow--back::before {
          content: ""; position: absolute; left: -1px; top: -4px;
          width: 8px; height: 8px;
          border-top: 1.5px solid currentColor; border-left: 1.5px solid currentColor;
          transform: rotate(-45deg);
        }
        .jd-form__fine { font-family: var(--font-body); font-size: 11px; color: var(--fg-3); font-style: italic; }

        /* Screening step */
        .jd-screen-applied {
          display: flex; flex-direction: column; gap: 4px;
          padding: 14px 16px;
          background: rgba(var(--mmc-yellow-rgb), 0.10);
          border: 1px solid rgba(var(--mmc-yellow-rgb), 0.32);
          border-radius: 10px;
          margin: 0 0 4px;
        }
        .jd-screen-applied-lbl {
          font-family: var(--font-body); font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase; color: var(--fg-3);
        }
        .jd-screen-applied-val {
          font-family: var(--font-display); font-weight: 700; font-size: 15px;
          letter-spacing: -0.01em; color: var(--mmc-blue);
        }
        .jd-screen-q {
          display: grid;
          grid-template-columns: 32px 1fr;
          column-gap: 12px;
          row-gap: 8px;
        }
        .jd-screen-q textarea { grid-column: 2 / -1; }
        .jd-screen-n {
          grid-row: 1 / span 2;
          font-family: var(--font-display); font-weight: 700; font-size: 13px;
          letter-spacing: 0.16em; color: var(--mmc-yellow);
          padding-top: 2px;
        }
        .jd-screen-prompt { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
        .jd-screen-q-text {
          font-family: var(--font-display); font-weight: 700; font-size: 14.5px;
          letter-spacing: -0.01em; line-height: 1.35; color: var(--fg-1);
        }
        .jd-screen-q-text i { font-style: normal; color: var(--mmc-yellow); margin-left: 2px; }
        .jd-screen-hint {
          font-family: var(--font-body); font-size: 11.5px; color: var(--fg-3);
          font-style: italic; line-height: 1.45;
        }

        /* Thanks step */
        .jd-thanks__tag {
          font-family: var(--font-body); font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--mmc-blue-700); background: var(--mmc-yellow);
          padding: 5px 12px; border-radius: 999px; align-self: flex-start;
        }
        .jd-thanks__next {
          list-style: none; margin: 8px 0 14px; padding: 0;
          display: flex; flex-direction: column; gap: 10px;
        }
        .jd-thanks__next li {
          display: grid; grid-template-columns: 28px 1fr; gap: 12px; align-items: baseline;
          font-family: var(--font-body); font-size: 13.5px; line-height: 1.55; color: var(--fg-2);
          padding: 10px 0; border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
        }
        .jd-thanks__next li:first-child { border-top: 0; padding-top: 0; }
        .jd-thanks__next li > span {
          font-family: var(--font-display); font-weight: 700; font-size: 11px;
          letter-spacing: 0.18em; color: var(--mmc-yellow);
        }
        .jd-thanks__next strong { color: var(--mmc-blue); font-weight: 700; }

        .jd-thanks { display: flex; flex-direction: column; gap: 16px; padding: 20px 0; }
        .jd-thanks h2 { font-family: var(--font-display); font-weight: 700; font-size: 28px; letter-spacing: -0.025em; color: var(--fg-1); margin: 0; }
        .jd-thanks p { font-family: var(--font-body); font-size: 15px; line-height: 1.55; color: var(--fg-2); margin: 0; }
        .jd-thanks .btn { margin-top: 8px; align-self: flex-start; }

        @media (max-width: 980px) {
          .jd-body__grid { grid-template-columns: 1fr; }
          .jd-apply { position: static; }
          section.page-hero .jd-hero__meta { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .jd-field-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
window.JdPage = JdPage;
