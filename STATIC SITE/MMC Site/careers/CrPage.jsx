/* careers/CrPage.jsx, Careers page */

/* The roles shown when the Jobs table is empty or unreachable. Editing a job
   in the dashboard replaces this list at runtime; it is the floor, not the
   source of truth. */
/* No fabricated roles. MMC hires across every discipline at every level, so the
   page leads with the disciplines and shows named vacancies only when the CMS
   (admin dashboard, Jobs table) actually holds one. An empty default means the
   page never invents a seat. */
const FALLBACK_ROLES = [];

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

  /* The disciplines MMC hires into, mirroring the service mix in
     content/clients.json. Every one is open at every level: at four people
     the shape of a hire is decided by the person, not by a headcount plan. */
  const DISCIPLINES = [
    { n: "Performance media",   img: "performance", d: "Meta, Google, Amazon and quick commerce, structured against a CAC ceiling rather than platform ROAS." },
    { n: "Performance creative", img: "creative",   d: "Briefing, shooting and shipping the volume the auction actually needs, every week." },
    { n: "Lead generation",     art: "ochre",       d: "For the brands where the sale happens after the click. Forms, qualification, and the CRM handoff that decides whether a lead was worth buying." },
    { n: "Web and CRO",         img: "conversion",  d: "Store builds, checkout and the conversion work that decides whether the media was worth buying." },
    { n: "Content and social",  img: "brand",       d: "The organic surface the paid one borrows its credibility from." },
    { n: "Data and measurement", img: "retention",  d: "Server-side events, cohort reporting and the contribution model every account is judged on." },
    { n: "Client and strategy", art: "azure",       d: "Owning the relationship and the P&L. The person doing the work talks to the client." },
  ];

  /* The work a candidate would actually touch, drawn from the same files the
     Our Work grid uses. Nothing here is a claim about results: brand and
     service mix only, exactly as content/clients.json records them. */
  const WORK = [
    { id: "awwbaby",   b: "AwwBaby",             s: "Website · Performance ads · Creative" },
    { id: "notic",     b: "Notic",               s: "Website · Performance ads · Social" },
    { id: "giraffe",   b: "The Growing Giraffe", s: "CRO · Amazon · Quick commerce" },
    { id: "vagakids",  b: "Vaga Kids",           s: "Website · Performance ads · Creative" },
    { id: "lepure",    b: "Lepure",              s: "Website · Performance ads · Social" },
    { id: "mbb",       b: "MyBrownButters",      s: "Website · Performance ads · Creative" },
    { id: "oosh",      b: "OOsh",                s: "Website · Performance ads · Creative" },
    { id: "pandacabs", b: "Panda Cabs",          s: "Website · Lead generation · Social" },
    { id: "nmc",       b: "NM Consultings",      s: "Website · Lead generation · Creative" },
    { id: "skyfling",  b: "Skyfling Technologies", s: "Website · Lead generation · Creative" },
    { id: "sprouts",   b: "Sprouts Edu Tours",   s: "Website · Lead generation · Social" },
    { id: "mittiy",    b: "Mittiy Made",         s: "CRO · Performance ads · Creative" },
  ];



  /* A real sequence, so the numbers carry information rather than decoration. */
  const HIRING = [
    { n: "01", h: "One page",      d: "What you'd own, what you'd change in ninety days, what you need from us. No resume, no portal." },
    { n: "02", h: "A conversation", d: "Forty-five minutes with whoever runs the discipline. Mostly you asking us things." },
    { n: "03", h: "A real problem", d: "One paid piece of actual work from a live account, scoped to a day. We pay for it either way." },
    { n: "04", h: "The other three", d: "You meet everyone before anyone decides. Four people means four yeses." },
  ];

  const NOT_FOR = [
    { h: "You want a defined lane", d: "At four people the lane changes monthly. Some weeks you'll do work that isn't yours." },
    { h: "You need a manager to unblock you", d: "There isn't one. You'll have to decide, ship, and tell us afterwards." },
    { h: "You want a big-company benefits sheet", d: "We don't have one yet, and we'd rather say so than list things we can't back." },
    { h: "You're waiting for process to arrive", d: "You'd be the person writing it. That's the job, not a phase before the job." },
  ];

  const GOOD_FIT = [
    { h: "You've done the work yourself", d: "Not managed someone doing it. At this size the person with the plan also builds it." },
    { h: "You want the client in the room", d: "You'll be on the call, owning the number, without anyone translating for you." },
    { h: "You'd rather own an outcome than a task", d: "We hand out P&Ls. You'll carry several, and all of the result." },
    { h: "You want a say in what this becomes", d: "Joining at four means the shape of the company is still an open question." },
  ];

  const principles = [
    { n: "01", h: "Senior pay. Senior expectations.", d: "We hire at the top of the market and expect ownership from day one. No layered approvals, no junior cycles." },
    { n: "02", h: "No account-manager layer.",        d: "The person doing the work talks to the client. Strategists own the relationship." },
    { n: "03", h: "Five days in studio. Two from home.", d: "We're an in-person studio for the work that matters. We're flexible about the rest." },
    { n: "04", h: "Own verticals, not tasks.",        d: "We don't hand out projects, we hand out P&Ls. At four people you will own several, and all of the outcome." },
    { n: "05", h: "Write your own brief.",            d: "Every senior here has shipped a brief unprompted in their first 90 days. That's the bar." },
    { n: "06", h: "Early enough to shape it.",        d: "There are four of us. The person who joins next helps decide how this place works, not just what it ships." },
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
          <div className="eyebrow">Careers · A team of four · Hiring across every discipline</div>
          <h1 className="cr-hero__h">
            People who write{" "}
            <span className="em-serif">their own</span>{" "}
            briefs.
          </h1>
          <p className="cr-hero__sub">
            We hire senior, train into ownership, and pay for the work, not the title.{" "}
            We're four people, and we're hiring across every discipline and every level.
            Apply with a single page, no resume required.
          </p>
          <div className="page-hero__actions">
            <a className="page-hero__cta" href="#roles">
              See where we're hiring<span className="page-hero__cta-arr" aria-hidden="true" />
            </a>
            <button className="page-hero__alt" onClick={() => window.mmcOpenBrief()}>
              Or pitch us your own role
            </button>
          </div>
          {/* Every figure below is stated elsewhere on this page: the senior band
              and the missing account-manager layer in the principles list, and
              the five-plus-two week in principle 03. Average tenure was removed:
              at four people it read as an HR statistic rather than a fact. */}
          <div className="page-hero__stats">
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
      {/* ── What you'd work on ──────────────────────────────────
          The page used to open on six abstract principles. A candidate
          decides on the work, so the work now leads: real client output,
          the same files the Our Work grid and the client wall use. */}
      <section className="cr-work no-section-bg">
        <div className="container">
          <header className="cr-work__head">
            <div className="eyebrow">What you'd work on</div>
            <h2 className="cr-work__h">
              Not a deck about the work.{" "}
              <span className="em-serif">The work.</span>
            </h2>
            <p className="cr-work__lead">
              Brands across B2B, B2C and D2C, run by four people. Whatever you join
              to do, you will touch several of these in your first quarter.
            </p>
          </header>
        </div>

        <div className="cr-work__strip">
          {WORK.map((w) => (
            <figure className="cr-shot" key={w.id}>
              <img src={"assets/clients/" + w.id + "-work.jpg"} alt={w.b + " campaign work"}
                   loading="lazy" decoding="async" />
              <figcaption>
                <span className="cr-shot__b">{w.b}</span>
                <span className="cr-shot__s">{w.s}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="container">
          <p className="cr-work__foot">
            <a href="Our Work.html">See the whole book<span aria-hidden="true"> →</span></a>
          </p>
        </div>

        <style>{`
          .cr-work { position: relative; z-index: 1; padding: clamp(56px, 7vw, 96px) 0 clamp(44px, 5vw, 72px); background: var(--mmc-paper); overflow: hidden; }
          .cr-work__head { max-width: 780px; margin-bottom: clamp(30px, 3.8vw, 44px); }
          .cr-work__h { font-family: var(--font-display); font-weight: 600; font-size: clamp(30px, 4vw, 54px); letter-spacing: -0.028em; line-height: 1.04; margin: 18px 0 0; }
          .cr-work__h .em-serif { color: var(--mmc-blue); }
          .cr-work__lead { font-family: var(--font-body); font-size: 16px; line-height: 1.6; color: var(--fg-2); margin: 18px 0 0; max-width: 60ch; }

          /* A wide, scrollable band rather than a boxed grid: it reads as a
             reel of work, and on a narrow screen it stays one gesture. */
          .cr-work__strip {
            display: grid; grid-auto-flow: column; grid-auto-columns: clamp(280px, 30vw, 420px);
            gap: clamp(12px, 1.6vw, 20px); overflow-x: auto; overscroll-behavior-x: contain;
            padding: 4px clamp(20px, 5vw, 64px) 22px; scroll-snap-type: x mandatory;
            scrollbar-width: thin;
          }
          .cr-shot { margin: 0; scroll-snap-align: start; }
          .cr-shot img {
            display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover;
            border-radius: 14px; border: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
            transition: transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
          }
          .cr-shot:hover img { transform: translateY(-4px); box-shadow: 0 22px 48px -26px rgba(11,16,32,0.42); }
          .cr-shot figcaption { display: flex; flex-direction: column; gap: 2px; padding: 12px 2px 0; }
          .cr-shot__b { font-family: var(--font-display); font-weight: 700; font-size: 15px; letter-spacing: -0.02em; color: var(--fg-1); }
          .cr-shot__s { font-family: var(--font-body); font-size: 12px; font-weight: 600; color: var(--fg-3); }
          .cr-work__foot { margin: 0; padding-top: 6px; }
          .cr-work__foot a { font-family: var(--font-body); font-size: 13px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: var(--mmc-blue); text-decoration: none; }
          .cr-work__foot a:hover { text-decoration: underline; }
        `}</style>
      </section>

      {/* ── How we work ─────────────────────────────────────────
          Was a flat 3x2 of equal cards. Restaged as an editorial list so
          the type carries it: an oversized numeral against a rule, one
          idea per row, reading like a manifesto rather than a spec sheet. */}
      <section className="cr-prin">
        <div className="container">
          <header className="cr-prin__head">
            <div className="eyebrow">How we work</div>
            <h2 className="cr-prin__h">
              Six things you'd feel{" "}
              <span className="em-serif" style={{color:"var(--mmc-blue)"}}>in your first month.</span>
            </h2>
          </header>
          <ol className="cr-prin__list">
            {principles.map((p) => (
              <li key={p.n} className="cr-prin__row">
                <span className="cr-prin__n">{p.n}</span>
                <h3 className="cr-prin__t">{p.h}</h3>
                <p className="cr-prin__d">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
        <style>{`
          .cr-prin { position: relative; z-index: 1; padding: clamp(56px, 7vw, 96px) 0; }
          .cr-prin__head { max-width: 820px; margin-bottom: clamp(28px, 3.4vw, 40px); }
          .cr-prin__h { font-family: var(--font-display); font-weight: 600; font-size: clamp(30px, 4vw, 54px); letter-spacing: -0.028em; line-height: 1.04; margin: 18px 0 0; }
          .cr-prin__list { list-style: none; margin: 0; padding: 0; }
          .cr-prin__row {
            display: grid; grid-template-columns: clamp(64px, 8vw, 118px) minmax(0, 1fr) minmax(0, 1.35fr);
            gap: clamp(14px, 2.4vw, 40px); align-items: baseline;
            padding: clamp(20px, 2.4vw, 30px) 0; border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.14);
            transition: background var(--dur-base) var(--ease-out);
          }
          .cr-prin__row:last-child { border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.14); }
          .cr-prin__row:hover { background: rgba(var(--mmc-blue-rgb), 0.028); }
          @media (max-width: 820px) { .cr-prin__row { grid-template-columns: 52px 1fr; } .cr-prin__d { grid-column: 2 / -1; } }
          .cr-prin__n { font-family: var(--font-display); font-weight: 800; font-size: clamp(30px, 4.6vw, 64px);
            line-height: 0.8; letter-spacing: -0.06em; color: rgba(var(--mmc-blue-rgb), 0.20); font-variant-numeric: tabular-nums; }
          .cr-prin__t { font-family: var(--font-display); font-weight: 700; font-size: clamp(17px, 1.7vw, 22px); letter-spacing: -0.022em; margin: 0; color: var(--fg-1); }
          .cr-prin__d { font-family: var(--font-body); font-size: 15px; line-height: 1.6; color: var(--fg-2); margin: 0; }
        `}</style>
      </section>

      {/* ── Where we're hiring ──────────────────────────────────
          Disciplines carried on the studio's own photography rather than
          on glyphs. Every one is open at every level. */}
      <section id="roles" className="cr-open no-section-bg">
        <div className="container">
          <header className="cr-open__head">
            <div className="eyebrow">Where we're hiring</div>
            <h2 className="cr-open__h">
              Every discipline.{" "}
              <span className="em-serif" style={{color:"var(--mmc-yellow)"}}>Every level.</span>
            </h2>
            <p className="cr-open__lead">
              We're four people building the fifth seat, and the sixth. Tell us which of these
              you'd own and at what level. We'll take it from there.
            </p>
          </header>

          <div className="cr-open__grid">
            {DISCIPLINES.map((d) => (
              <article className="cr-disc" key={d.n}>
                <span className="cr-disc__i">
                  {d.img
                    ? <img src={"assets/services/" + d.img + ".jpg"} alt="" loading="lazy" decoding="async" />
                    : <span className={"cr-disc__art cr-disc__art--" + d.art}></span>}
                  <span className="cr-disc__lv">Junior → Lead</span>
                </span>
                <h3 className="cr-disc__n">{d.n}</h3>
                <p className="cr-disc__d">{d.d}</p>
              </article>
            ))}
          </div>

          {roles.length > 0 && (
            <div className="cr-open__live">
              <div className="eyebrow" style={{marginBottom:"14px"}}>Specifically open right now</div>
              <ul className="cr-open__roles">
                {roles.map((r) => (
                  <li key={r.title}><a href={r.url}>
                    <span className="cr-open__rt">{r.title}</span>
                    <span className="cr-open__rm">{r.dept} · {r.location} · {r.type}</span>
                    <span className="cr-open__ra" aria-hidden="true">→</span>
                  </a></li>
                ))}
              </ul>
            </div>
          )}

          <div className="cr-open__cta">
            <div>
              <h3 className="cr-open__ctah">Don't see the thing you're best at?</h3>
              <p className="cr-open__ctad">
                Write the role yourself. One page: what you'd own, what you'd change in the first
                ninety days, and what you'd need from us. No resume, no cover letter, no portal.
              </p>
            </div>
            <button className="cr-open__btn" onClick={() => window.mmcOpenBrief()}>
              Pitch us your role<span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <style>{`
          .cr-open { position: relative; z-index: 1; padding: clamp(56px, 7vw, 96px) 0; background: var(--mmc-blue-900); color: rgba(255,255,255,0.94); }
          .cr-open .eyebrow { color: var(--mmc-yellow); }
          .cr-open__head { max-width: 780px; margin-bottom: clamp(32px, 4vw, 48px); }
          .cr-open__h { font-family: var(--font-display); font-weight: 600; font-size: clamp(30px, 4vw, 54px); letter-spacing: -0.028em; line-height: 1.04; margin: 18px 0 0; color: #fff; }
          .cr-open__lead { font-family: var(--font-body); font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.62); margin: 18px 0 0; max-width: 60ch; }

          .cr-open__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(14px, 1.8vw, 22px); }
          @media (max-width: 940px) { .cr-open__grid { grid-template-columns: 1fr 1fr; } }
          @media (max-width: 560px) { .cr-open__grid { grid-template-columns: 1fr; } }
          .cr-disc { display: flex; flex-direction: column; gap: 9px; }
          .cr-disc__i { position: relative; display: block; aspect-ratio: 3 / 2; border-radius: 14px; overflow: hidden;
            border: 1px solid rgba(255,255,255,0.14); margin-bottom: 4px; }
          .cr-disc__i img { width: 100%; height: 100%; object-fit: cover; display: block;
            transition: transform var(--dur-slow) var(--ease-out); }
          .cr-disc:hover .cr-disc__i img { transform: scale(1.05); }
          .cr-disc__art { position: absolute; inset: 0; }
          .cr-disc__art--azure { background: linear-gradient(135deg, var(--mmc-blue), #356CC9); }
          .cr-disc__art--wine  { background: linear-gradient(135deg, #7A2A3A, #4A1721); }
          .cr-disc__lv { position: absolute; left: 12px; bottom: 12px; z-index: 2;
            font-family: var(--font-body); font-size: 10px; font-weight: 800; letter-spacing: 0.12em;
            text-transform: uppercase; color: #0B1020; background: var(--mmc-yellow);
            padding: 5px 10px; border-radius: 999px; }
          .cr-disc__n { font-family: var(--font-display); font-weight: 700; font-size: 18px; letter-spacing: -0.02em; margin: 0; color: #fff; }
          .cr-disc__d { font-family: var(--font-body); font-size: 14px; line-height: 1.55; color: rgba(255,255,255,0.6); margin: 0; }

          .cr-open__live { margin-top: clamp(26px, 3.2vw, 38px); }
          .cr-open__roles { list-style: none; margin: 0; padding: 0; }
          .cr-open__roles li { border-top: 1px solid rgba(255,255,255,0.14); }
          .cr-open__roles li:last-child { border-bottom: 1px solid rgba(255,255,255,0.14); }
          .cr-open__roles a { display: grid; grid-template-columns: 1fr auto 26px; gap: 16px; align-items: center;
            padding: 17px 4px; text-decoration: none; color: inherit; transition: padding var(--dur-base) var(--ease-out); }
          .cr-open__roles a:hover { padding-left: 12px; }
          .cr-open__rt { font-family: var(--font-display); font-weight: 700; font-size: 18px; color: #fff; }
          .cr-open__rm { font-family: var(--font-body); font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.5); }
          .cr-open__ra { color: var(--mmc-yellow); }

          .cr-open__cta { margin-top: clamp(28px, 3.4vw, 42px); padding: clamp(24px, 3vw, 34px);
            border: 1.5px dashed rgba(255,197,40,0.4); border-radius: 16px; background: rgba(255,197,40,0.05);
            display: flex; flex-wrap: wrap; gap: 22px; align-items: center; justify-content: space-between; }
          .cr-open__ctah { font-family: var(--font-display); font-weight: 700; font-size: 21px; letter-spacing: -0.022em; margin: 0 0 8px; color: #fff; }
          .cr-open__ctad { font-family: var(--font-body); font-size: 14.5px; line-height: 1.6; color: rgba(255,255,255,0.62); margin: 0; max-width: 58ch; }
          .cr-open__btn { flex: none; display: inline-flex; align-items: center; gap: 10px; cursor: pointer;
            font-family: var(--font-body); font-size: 12.5px; font-weight: 800; letter-spacing: 0.1em;
            text-transform: uppercase; padding: 16px 28px; border-radius: 999px; border: 0;
            background: var(--mmc-yellow); color: #0B1020;
            transition: transform var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out); }
          .cr-open__btn:hover { transform: translateY(-2px); background: #FFD75C; }
        `}</style>
      </section>

      {/* ── How we hire ─────────────────────────────────────────
          A real sequence, so the numerals carry information. */}
      <section className="cr-hire no-section-bg">
        <div className="container">
          <header className="cr-hire__head">
            <div className="eyebrow">How we hire</div>
            <h2 className="cr-hire__h">
              Four steps.{" "}
              <span className="em-serif" style={{color:"var(--mmc-blue-700)"}}>Two weeks.</span>
            </h2>
            <p className="cr-hire__lead">
              You'd meet every person here before anyone makes a decision. That isn't a courtesy,
              it's arithmetic.
            </p>
          </header>
          <ol className="cr-hire__list">
            {HIRING.map((h) => (
              <li key={h.n} className="cr-hire__step">
                <span className="cr-hire__n">{h.n}</span>
                <div>
                  <h3 className="cr-hire__sh">{h.h}</h3>
                  <p className="cr-hire__sd">{h.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <style>{`
          .cr-hire { position: relative; z-index: 1; padding: clamp(56px, 7vw, 96px) 0; background: var(--mmc-yellow); color: #0B1020; }
          .cr-hire .eyebrow { color: rgba(11,16,32,0.62); }
          .cr-hire__head { max-width: 760px; margin-bottom: clamp(30px, 3.8vw, 44px); }
          .cr-hire__h { font-family: var(--font-display); font-weight: 600; font-size: clamp(30px, 4vw, 54px); letter-spacing: -0.028em; line-height: 1.04; margin: 18px 0 0; }
          .cr-hire__lead { font-family: var(--font-body); font-size: 16px; line-height: 1.6; color: rgba(11,16,32,0.72); margin: 18px 0 0; max-width: 58ch; }
          .cr-hire__list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(16px, 2vw, 26px); }
          @media (max-width: 900px) { .cr-hire__list { grid-template-columns: 1fr 1fr; } }
          @media (max-width: 520px) { .cr-hire__list { grid-template-columns: 1fr; } }
          .cr-hire__step { display: flex; flex-direction: column; gap: 12px; padding-top: 18px; border-top: 2px solid rgba(11,16,32,0.24); }
          .cr-hire__n { font-family: var(--font-display); font-weight: 800; font-size: clamp(34px, 4vw, 54px); line-height: 0.86; letter-spacing: -0.055em; color: rgba(11,16,32,0.26); font-variant-numeric: tabular-nums; }
          .cr-hire__sh { font-family: var(--font-display); font-weight: 700; font-size: 17px; letter-spacing: -0.02em; margin: 0 0 6px; }
          .cr-hire__sd { font-family: var(--font-body); font-size: 14px; line-height: 1.55; color: rgba(11,16,32,0.7); margin: 0; }
        `}</style>
      </section>

      {/* ── Before you apply ────────────────────────────────────
          At four people a wrong hire is a quarter of the company, so the
          page self-selects in public. */}
      <section className="cr-fit">
        <div className="container">
          <header className="cr-fit__head">
            <div className="eyebrow">Before you apply</div>
            <h2 className="cr-fit__h">
              Small is the job,{" "}
              <span className="em-serif">not a phase we're passing through.</span>
            </h2>
          </header>
          <div className="cr-fit__cols">
            <div className="cr-fit__col cr-fit__col--no">
              <span className="cr-fit__tag">This will frustrate you if</span>
              <ul>{NOT_FOR.map((t) => (
                <li key={t.h}><span className="cr-fit__x" aria-hidden="true">✕</span>
                  <span><b>{t.h}</b>{t.d}</span></li>))}</ul>
            </div>
            <div className="cr-fit__col cr-fit__col--yes">
              <span className="cr-fit__tag">You'd do well here if</span>
              <ul>{GOOD_FIT.map((t) => (
                <li key={t.h}><span className="cr-fit__c" aria-hidden="true">✓</span>
                  <span><b>{t.h}</b>{t.d}</span></li>))}</ul>
            </div>
          </div>
        </div>
        <style>{`
          .cr-fit { position: relative; z-index: 1; padding: clamp(56px, 7vw, 96px) 0; }
          .cr-fit__head { max-width: 820px; margin-bottom: clamp(30px, 3.8vw, 44px); }
          .cr-fit__h { font-family: var(--font-display); font-weight: 600; font-size: clamp(28px, 3.6vw, 48px); letter-spacing: -0.026em; line-height: 1.06; margin: 18px 0 0; }
          .cr-fit__h .em-serif { color: var(--mmc-blue); }
          .cr-fit__cols { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(14px, 2vw, 24px); }
          @media (max-width: 860px) { .cr-fit__cols { grid-template-columns: 1fr; } }
          .cr-fit__col { background: rgba(255,255,255,0.72); border: 1px solid rgba(var(--mmc-blue-rgb), 0.10); border-radius: 16px; padding: clamp(22px, 2.6vw, 30px); }
          .cr-fit__col--no { border-top: 3px solid #C0392B; }
          .cr-fit__col--yes { border-top: 3px solid var(--mmc-blue); }
          .cr-fit__tag { display: inline-block; font-family: var(--font-body); font-size: 10.5px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; padding: 5px 12px; border-radius: 999px; margin-bottom: 16px; }
          .cr-fit__col--no .cr-fit__tag { background: rgba(192,57,43,0.10); color: #C0392B; }
          .cr-fit__col--yes .cr-fit__tag { background: rgba(var(--mmc-blue-rgb), 0.10); color: var(--mmc-blue); }
          .cr-fit__col ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 14px; }
          .cr-fit__col li { display: flex; gap: 12px; align-items: flex-start; }
          .cr-fit__col li b { display: block; font-family: var(--font-display); font-weight: 700; font-size: 15px; letter-spacing: -0.015em; color: var(--fg-1); margin-bottom: 3px; }
          .cr-fit__col li span:last-child { font-family: var(--font-body); font-size: 14px; line-height: 1.55; color: var(--fg-2); }
          .cr-fit__x, .cr-fit__c { flex: none; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; margin-top: 2px; }
          .cr-fit__x { background: rgba(192,57,43,0.12); color: #C0392B; }
          .cr-fit__c { background: rgba(var(--mmc-blue-rgb), 0.12); color: var(--mmc-blue); }
        `}</style>
      </section>

      {/* Apply CTA banner removed per spec */}
    </>
  );
}
window.CrPage = CrPage;
