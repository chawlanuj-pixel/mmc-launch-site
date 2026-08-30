/* careers/CrPage.jsx, Careers page */

/* The roles shown when the Jobs table is empty or unreachable. Editing a job
   in the dashboard replaces this list at runtime; it is the floor, not the
   source of truth. */
const FALLBACK_ROLES = [
    { dept: "Marketing",  title: "Senior Meta Buyer",          location: "Mumbai · Bengaluru", type: "Full-time", workMode: "Hybrid",  url: "Job Detail.html?role=senior-meta-buyer" },
    { dept: "Marketing",  title: "Google + Amazon Specialist", location: "Mumbai",             type: "Full-time", workMode: "Onsite",  url: "Job Detail.html?role=google-amazon-specialist" },
    { dept: "Design",     title: "Senior Art Director",        location: "Mumbai · Remote",    type: "Full-time", workMode: "Hybrid",  url: "Job Detail.html?role=senior-art-director" },
    { dept: "Content",    title: "Performance Copywriter",     location: "Remote · India",     type: "Full-time", workMode: "Remote",  url: "Job Detail.html?role=performance-copywriter" },
    { dept: "Marketing",  title: "Growth Strategist · D2C",    location: "Mumbai",             type: "Full-time", workMode: "Onsite",  url: "Job Detail.html?role=growth-strategist" },
    { dept: "Technology", title: "Shopify Plus Engineer",      location: "Remote",             type: "Contract",  workMode: "Remote",  url: "Job Detail.html?role=shopify-engineer" },
    { dept: "AI",         title: "AI Workflow Engineer",       location: "Remote",             type: "Full-time", workMode: "Remote",  url: "Job Detail.html?role=ai-workflow-engineer" },
    { dept: "Management", title: "Account Director · Growth",  location: "Mumbai",             type: "Full-time", workMode: "Onsite",  url: "Job Detail.html?role=account-director" },
  ];

function CrPage({ onAudit }) {
  const [dept, setDept] = React.useState("All");
  const [mode, setMode] = React.useState("All");
  /* Jobs come from the CMS when the Jobs table has open roles, and from the
     list below when it does not. Same contract as the homepage content: the
     page renders identically whether or not Airtable answers, so a slow or
     empty base never blanks the careers page. */
  const [roles, setRoles] = React.useState(FALLBACK_ROLES);
  React.useEffect(() => {
    const D = window.MMCData;
    if (!D || !D.listJobs) return;
    let live = true;
    D.listJobs()
      .then((rows) => {
        if (!live || !Array.isArray(rows)) return;
        const open = rows
          .filter((r) => (r.status || "Open") === "Open" && r.title && r.slug)
          .map((r) => ({
            dept: r.department || "Team",
            title: r.title,
            location: r.location || "India",
            type: r.type || "Full-time",
            workMode: r.workMode || "Hybrid",
            url: "Job Detail.html?role=" + r.slug
          }));
        if (open.length) setRoles(open);
      })
      .catch(() => {});
    return () => { live = false; };
  }, []);

  const principles = [
    { n: "01", h: "Senior pay. Senior expectations.", d: "We hire at the top of the market and expect ownership from day one. No layered approvals, no junior cycles." },
    { n: "02", h: "No account-manager layer.",        d: "The person doing the work talks to the client. Strategists own the relationship." },
    { n: "03", h: "Five days in studio. Two from home.", d: "We're an in-person studio for the work that matters. We're flexible about the rest." },
    { n: "04", h: "Own a vertical, not a task.",      d: "We don't hand out projects. We hand out P&Ls. You own outcomes, not deliverables." },
    { n: "05", h: "Write your own brief.",            d: "Every senior here has shipped a brief unprompted in their first 90 days. That's the bar." },
    { n: "06", h: "Stay long. Compound deep.",        d: "Tenure averages 4.2 years. We invest accordingly: internal capital, equity slices, sabbaticals." },
  ];

  const benefits = [
    "Senior-band salaries", "Profit-share + equity options", "₹2L learning budget · yearly",
    "Mental health support", "Sabbatical · every 4 years", "12 weeks parental leave",
    "Quarterly off-sites", "Macbook + setup budget", "Annual book budget"
  ];

  return (
    <>
      <section className="page-hero cr-hero" id="top" data-wm="Careers">
        <span className="page-hero__wm" aria-hidden="true">Careers</span>
        <div>
          <div className="eyebrow">Careers · {roles.length} open roles · 28 people</div>
          <h1 className="cr-hero__h">
            People who write{" "}
            <span className="em-serif">their own</span>{" "}
            briefs.
          </h1>
          <p className="cr-hero__sub">
            We hire senior, train into ownership, and pay for the work, not the title.{" "}
            {roles.length} open roles, all senior bands. Apply with a single page, no resume required.
          </p>
          <div className="page-hero__actions">
            <a className="page-hero__cta" href="#roles">
              View {roles.length} open roles<span className="page-hero__cta-arr" aria-hidden="true" />
            </a>
            <button className="page-hero__alt" onClick={() => window.mmcOpenBrief()}>
              Or pitch us your own role
            </button>
          </div>
          {/* Every figure below is stated elsewhere on this page: tenure in the
              principles list, the senior band and the missing account-manager
              layer in the same list, and the five-plus-two week in principle 03. */}
          <div className="page-hero__stats">
            <div>
              <span className="page-hero__stat-n">4.2 <i>yrs</i></span>
              <span className="page-hero__stat-l">Average tenure</span>
            </div>
            <div>
              <span className="page-hero__stat-n">Senior</span>
              <span className="page-hero__stat-l">Every band, top of market</span>
            </div>
            <div>
              <span className="page-hero__stat-n">Zero</span>
              <span className="page-hero__stat-l">Account-manager layers</span>
            </div>
            <div>
              <span className="page-hero__stat-n">5 <i>+</i> 2</span>
              <span className="page-hero__stat-l">Studio + home days</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats removed per spec */}

      {/* Principles */}
      <section className="cr-principles">
        <div className="container">
          <header className="cr-prin-head">
            <div className="eyebrow">How we work</div>
            <h2 className="cr-prin-h">
              Six things you'll{" "}
              <span className="em-serif" style={{color:"var(--mmc-blue)"}}>feel</span>{" "}
              in your first month.
            </h2>
          </header>
          <ol className="cr-prin-list">
            {principles.map((p) => (
              <li key={p.n} className="cr-prin-item">
                <span className="cr-prin-n">{p.n}</span>
                <h3 className="cr-prin-h3">{p.h}</h3>
                <p className="cr-prin-d">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
        <style>{`
          .cr-principles { position: relative; z-index: 1; padding: clamp(56px, 7vw, 96px) 0; }
          .cr-prin-head { max-width: 760px; margin-bottom: clamp(36px, 5vw, 48px); }
          .cr-prin-h { font-family: var(--font-display); font-weight: 600; font-size: clamp(30px, 3.8vw, 52px); letter-spacing: -0.025em; line-height: 1.06; margin: 18px 0 0; }
          .cr-prin-list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.18); }
          .cr-prin-item {
            padding: clamp(24px, 3vw, 36px) clamp(20px, 2.4vw, 28px);
            border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.18);
            border-right: 1px solid rgba(var(--mmc-blue-rgb), 0.18);
            position: relative;
            transition: background var(--dur-base) var(--ease-out);
            cursor: default;
          }
          .cr-prin-item::before {
            content: "";
            position: absolute; left: 0; top: 0;
            width: 0; height: 2px;
            background: var(--mmc-yellow);
            transition: width 600ms var(--ease-out);
          }
          .cr-prin-item:hover { background: rgba(255,255,255,0.55); }
          .cr-prin-item:hover::before { width: 100%; }
          .cr-prin-item:hover .cr-prin-h3 { color: var(--mmc-blue); }
          .cr-prin-item:hover .cr-prin-n { transform: translateX(4px); }
          .cr-prin-list > .cr-prin-item:nth-child(3n) { border-right: 0; }
          .cr-prin-list > .cr-prin-item:nth-last-child(-n+3) { border-bottom: 0; }
          .cr-prin-n { font-family: var(--font-display); font-weight: 700; font-size: 13px; letter-spacing: 0.18em; color: var(--mmc-yellow); display: inline-block; margin-bottom: 14px; transition: transform var(--dur-base) var(--ease-out); }
          .cr-prin-h3 { font-family: var(--font-display); font-weight: 700; font-size: clamp(20px, 1.8vw, 24px); letter-spacing: -0.02em; line-height: 1.15; color: var(--fg-1); margin: 0 0 10px; transition: color var(--dur-base) var(--ease-out); }
          .cr-prin-d { font-family: var(--font-body); font-size: 14px; line-height: 1.6; color: var(--fg-2); margin: 0; }
          @media (max-width: 880px) {
            .cr-prin-list { grid-template-columns: 1fr 1fr; }
            .cr-prin-list > .cr-prin-item:nth-child(3n) { border-right: 1px solid rgba(var(--mmc-blue-rgb), 0.18); }
            .cr-prin-list > .cr-prin-item:nth-child(2n) { border-right: 0; }
            .cr-prin-list > .cr-prin-item:nth-last-child(-n+3) { border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.18); }
            .cr-prin-list > .cr-prin-item:nth-last-child(-n+2) { border-bottom: 0; }
          }
          @media (max-width: 520px) {
            .cr-prin-list { grid-template-columns: 1fr; }
            .cr-prin-item { border-right: 0; }
            .cr-prin-list > .cr-prin-item:nth-last-child(-n+2) { border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.18); }
            .cr-prin-list > .cr-prin-item:last-child { border-bottom: 0; }
          }
        `}</style>
      </section>

      {/* Open roles */}
      <section id="roles" className="cr-roles">
        <div className="container">
          <header className="cr-roles-head">
            <div className="eyebrow">Open roles · {String(roles.length).padStart(2, "0")} live</div>
            <h2 className="cr-roles-h">
              Find your{" "}
              <span className="em-serif" style={{color:"var(--mmc-blue)"}}>seat</span>.
            </h2>
          </header>

          {/* Filters, department + work mode */}
          <div className="cr-filters">
            <div className="cr-filter-group">
              <span className="cr-filter-label">Department</span>
              <div className="cr-chips">
                {["All", "Design", "Marketing", "Technology", "Content", "AI", "Management"].map((d) => {
                  const count = d === "All" ? roles.length : roles.filter(r => r.dept === d).length;
                  return (
                    <button key={d}
                            className={"cr-chip " + (dept === d ? "is-on" : "")}
                            onClick={() => setDept(d)}>
                      {d}
                      <span className="cr-chip-n">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="cr-filter-group">
              <span className="cr-filter-label">Work mode</span>
              <div className="cr-chips">
                {["All", "Onsite", "Hybrid", "Remote"].map((m) => {
                  const count = m === "All" ? roles.length : roles.filter(r => r.workMode === m).length;
                  return (
                    <button key={m}
                            className={"cr-chip " + (mode === m ? "is-on" : "")}
                            onClick={() => setMode(m)}>
                      {m}
                      <span className="cr-chip-n">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <ol className="cr-roles-list">
            {roles.filter((r) => (dept === "All" || r.dept === dept) && (mode === "All" || r.workMode === mode)).map((r, i) => (
              <li key={r.title}>
                <a href={r.url} className="cr-role">
                  <span className="cr-role-n">{String(i + 1).padStart(2, "0")}</span>
                  <div className="cr-role-body">
                    <div className="cr-role-dept">{r.dept} · {r.workMode}</div>
                    <div className="cr-role-title">{r.title}</div>
                  </div>
                  <div className="cr-role-meta">
                    <span className="cr-role-loc">{r.location}</span>
                    <span className="cr-role-type">{r.type}</span>
                  </div>
                  <span className="cr-role-arrow" aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ol>
          <p className="cr-roles-foot">
            Don't see your role?{" "}
            <a href="mailto:hr@mondaymarketing.company">Write to us</a>{" "}
            anyway. We hire opportunistically when the right senior shows up.
          </p>
        </div>
        <style>{`
          .cr-roles { position: relative; z-index: 1; padding: clamp(56px, 7vw, 96px) 0; }
          .cr-roles-head { max-width: 760px; margin-bottom: clamp(24px, 3vw, 36px); }
          .cr-roles-h { font-family: var(--font-display); font-weight: 600; font-size: clamp(30px, 3.8vw, 52px); letter-spacing: -0.025em; line-height: 1.06; margin: 18px 0 0; }

          .cr-filters { display: flex; flex-direction: column; gap: 14px; margin-bottom: 32px; padding: 18px 20px; background: rgba(255,255,255,0.6); border: 1px solid rgba(var(--mmc-blue-rgb), 0.10); border-radius: 14px; backdrop-filter: blur(8px); }
          .cr-filter-group { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
          .cr-filter-label {
            font-family: var(--font-body); font-size: 10px; font-weight: 700;
            letter-spacing: 0.18em; text-transform: uppercase; color: var(--mmc-yellow);
            min-width: 92px;
          }
          .cr-chips { display: flex; gap: 6px; flex-wrap: wrap; }
          .cr-chip {
            display: inline-flex; align-items: center; gap: 8px;
            font-family: var(--font-body); font-size: 12px; font-weight: 600;
            padding: 8px 14px; border-radius: 999px;
            background: #fff;
            border: 1px solid rgba(var(--mmc-blue-rgb), 0.16);
            color: var(--fg-1); cursor: pointer;
            transition: all var(--dur-base) var(--ease-out);
          }
          .cr-chip:hover { border-color: var(--mmc-blue); color: var(--mmc-blue); }
          .cr-chip.is-on {
            background: var(--mmc-yellow);
            color: var(--mmc-blue-700);
            border-color: var(--mmc-yellow);
            box-shadow: 0 6px 18px -8px rgba(var(--mmc-yellow-rgb), 0.55);
            font-weight: 700;
          }
          .cr-chip.is-on .cr-chip-n { color: var(--mmc-blue-700); opacity: 0.55; }
          .cr-chip-n { font-family: var(--font-display); font-size: 10px; opacity: 0.6; font-variant-numeric: tabular-nums; color: var(--mmc-blue); }
          .cr-roles-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.18); }
          .cr-role { display: grid; grid-template-columns: 60px 1fr 280px 32px; gap: 20px; align-items: center; padding: clamp(22px, 2.6vw, 32px) 4px; border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.10); color: var(--fg-1); transition: padding var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out); }
          .cr-role:hover { padding-left: 14px; background: rgba(255,255,255,0.5); color: var(--fg-1); }
          .cr-role-n { font-family: var(--font-display); font-weight: 700; font-size: 13px; letter-spacing: 0.18em; color: var(--mmc-yellow); }
          .cr-role-dept { font-family: var(--font-body); font-size: 10.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--mmc-blue); margin-bottom: 4px; }
          .cr-role-title { font-family: var(--font-display); font-weight: 600; font-size: clamp(22px, 2vw, 28px); letter-spacing: -0.02em; line-height: 1.12; color: var(--fg-1); }
          .cr-role-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
          .cr-role-loc { font-family: var(--font-body); font-size: 13px; font-weight: 600; color: var(--fg-1); }
          .cr-role-type { font-family: var(--font-body); font-size: 10.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--fg-3); }
          .cr-role-arrow { font-family: var(--font-display); font-weight: 700; font-size: 22px; color: var(--mmc-yellow); transition: transform var(--dur-base) var(--ease-out); }
          .cr-role:hover .cr-role-arrow { transform: translateX(6px); }
          .cr-roles-foot { margin: 32px 0 0; font-family: var(--font-body); font-size: 14px; color: var(--fg-3); font-style: italic; }
          .cr-roles-foot a { color: var(--mmc-blue); border-bottom: 1px solid currentColor; }
          @media (max-width: 720px) {
            .cr-role { grid-template-columns: 50px 1fr 28px; gap: 14px; }
            .cr-role-meta { display: none; }
          }
        `}</style>
      </section>

      {/* Benefits */}
      <section className="cr-bens">
        <div className="container">
          <header className="cr-bens-head">
            <div className="eyebrow">Beyond the salary</div>
            <h2 className="cr-bens-h">
              We invest in{" "}
              <span className="em-serif" style={{color:"var(--mmc-blue)"}}>tenure</span>.
            </h2>
          </header>
          <div className="cr-bens-grid">
            {benefits.map((b) => (
              <div key={b} className="cr-ben">
                <span className="check" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="14" height="14">
                    <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.4"/>
                    <path d="M 5 8.5 L 7 10.5 L 11 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                </span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .cr-bens { position: relative; z-index: 1; padding: clamp(56px, 7vw, 96px) 0; }
          .cr-bens-head { max-width: 720px; margin-bottom: clamp(36px, 5vw, 48px); }
          .cr-bens-h { font-family: var(--font-display); font-weight: 600; font-size: clamp(28px, 3.4vw, 44px); letter-spacing: -0.025em; line-height: 1.06; margin: 18px 0 0; }
          .cr-bens-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
          .cr-ben { display: flex; align-items: center; gap: 12px; padding: 18px 22px; background: rgba(255,255,255,0.78); border: 1px solid rgba(var(--mmc-blue-rgb), 0.10); border-radius: 10px; font-family: var(--font-body); font-size: 14.5px; font-weight: 500; color: var(--fg-1); }
          .cr-ben .check { color: var(--mmc-blue); flex-shrink: 0; }
          @media (max-width: 720px) { .cr-bens-grid { grid-template-columns: 1fr 1fr; } }
          @media (max-width: 460px) { .cr-bens-grid { grid-template-columns: 1fr; } }
        `}</style>
      </section>

      {/* Apply CTA banner removed per spec */}
    </>
  );
}
window.CrPage = CrPage;
