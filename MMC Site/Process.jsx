/* Process.jsx, "How We Build Momentum"
   Compact, interactive 7-stage timeline. One stage active at a time;
   horizontal stepper on top, detail panel below. Fits in one screen height. */

function Process() {
  const stages = [
    {
      n: "01", phase: "Week 1",
      title: "Discovery",
      desc: "We map the brand, the buyer, the market, and the math. No assumptions.",
      out: ["Brand context doc", "Buyer journey map", "Market read"],
      glyph: (
        <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
          <circle cx="32" cy="28" r="14" fill="none" stroke="currentColor" strokeWidth="1.6"/>
          <circle cx="32" cy="28" r="6" fill="currentColor" opacity="0.18"/>
          <path d="M 32 8 L 32 14 M 32 42 L 32 48 M 12 28 L 18 28 M 46 28 L 52 28"
                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          <path d="M 24 56 L 40 56 M 28 60 L 36 60" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      n: "02", phase: "Week 2",
      title: "Audit",
      desc: "Funnel, retention, creative, and architecture: diagnosed line by line.",
      out: ["Funnel diagnostic", "Retention forensic", "Creative + brand read"],
      glyph: (
        <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
          <rect x="10" y="14" width="44" height="36" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M 16 24 L 48 24 M 16 32 L 38 32 M 16 40 L 42 40" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          <path d="M 18 24 L 28 24" stroke="var(--mmc-yellow)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 18 32 L 32 32" stroke="var(--mmc-yellow)" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      n: "03", phase: "Week 3",
      title: "Strategy",
      desc: "One-page growth thesis. What we'll fix, in what order, with what math.",
      out: ["Growth thesis", "90-day roadmap", "Revenue model"],
      glyph: (
        <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
          <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M 32 32 L 44 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M 32 32 L 22 42" stroke="var(--mmc-yellow)" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="32" cy="32" r="3" fill="currentColor"/>
          <path d="M 32 6 L 32 12 M 32 52 L 32 58 M 6 32 L 12 32 M 52 32 L 58 32" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      n: "04", phase: "Week 4",
      title: "Content & Creative",
      pull: "The single biggest lever. Where we spend most of our time.",
      desc: "Creative is the multiplier on every other system. We produce 240+ assets a month: UGC, video, static, landing-page copy, email flows, narrative - all on a single brand thesis.",
      out: ["UGC + video production", "Performance creatives", "Landing-page copy", "Lifecycle narrative"],
      featured: true,
      glyph: (
        <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
          <rect x="8"  y="18" width="32" height="28" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.45"/>
          <rect x="14" y="14" width="32" height="28" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.7"/>
          <rect x="20" y="10" width="32" height="28" rx="2" fill="var(--mmc-yellow)" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M 28 24 L 28 32 L 36 28 Z" fill="currentColor"/>
          <path d="M 18 50 L 46 50 M 22 55 L 42 55" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.6"/>
        </svg>
      )
    },
    {
      n: "05", phase: "Day 30+",
      title: "Execution",
      desc: "Cross-functional pod ships. Performance, creative, retention, tech, together.",
      out: ["Media activation", "CRM + flows", "Web + tech rollout"],
      glyph: (
        <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
          <path d="M 8 50 L 24 34 L 36 42 L 56 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 46 14 L 56 14 L 56 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="24" cy="34" r="3" fill="var(--mmc-yellow)"/>
          <circle cx="36" cy="42" r="3" fill="var(--mmc-yellow)"/>
          <circle cx="56" cy="14" r="3" fill="currentColor"/>
        </svg>
      )
    },
    {
      n: "06", phase: "Weekly",
      title: "Optimization",
      desc: "We read the data daily, optimize weekly, re-strategize quarterly.",
      out: ["Daily monitoring", "Weekly experiments", "Cohort reviews"],
      glyph: (
        <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
          <rect x="10" y="38" width="8" height="14" fill="currentColor" opacity="0.18"/>
          <rect x="22" y="28" width="8" height="24" fill="currentColor" opacity="0.32"/>
          <rect x="34" y="20" width="8" height="32" fill="currentColor" opacity="0.5"/>
          <rect x="46" y="10" width="8" height="42" fill="var(--mmc-yellow)"/>
          <path d="M 10 52 L 54 52" stroke="currentColor" strokeWidth="1.4"/>
        </svg>
      )
    },
    {
      n: "07", phase: "Q2 +",
      title: "Scale",
      desc: "When the system is compounding, we lean in: channels, geos, and SKUs.",
      out: ["New channel layer", "Geo expansion", "Category extension"],
      glyph: (
        <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
          <circle cx="32" cy="32" r="6" fill="var(--mmc-yellow)"/>
          <circle cx="32" cy="32" r="14" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.7"/>
          <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.4"/>
          <circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.2"/>
        </svg>
      )
    },
  ];

  // The Content & Creative stage starts active, it's the featured lever.
  const [active, setActive] = React.useState(3);
  const current = stages[active];

  // Keyboard nav
  const onKey = (e) => {
    if (e.key === "ArrowRight") setActive((i) => Math.min(stages.length - 1, i + 1));
    if (e.key === "ArrowLeft")  setActive((i) => Math.max(0, i - 1));
  };

  return (
    <section id="process" className="proc" data-screen-label="05 Process" onKeyDown={onKey} tabIndex={-1}>
      <div className="container">
        <header className="proc__head">
          <div className="proc__head-grid">
            <div className="proc__head-l">
              <div className="eyebrow">How we build momentum</div>
              <h2 className="proc__h">
                Seven stages.{" "}
                <span className="em-serif" style={{color:"var(--mmc-blue)"}}>One repeatable</span>{" "}
                engine.
              </h2>
              <p className="proc__lead">
                We don't run campaigns. We install a growth operating system. Same seven stages,
                adapted to where your brand actually is. Click a stage to see what we ship.
              </p>
            </div>

            <div className="proc__head-r">
              <div className="proc__head-stat">
                <span className="num"><window.Num value="14" /><i>days</i></span>
                <span className="lbl">Kickoff → live media</span>
              </div>
              <div className="proc__head-stat">
                <span className="num"><window.Num value="240" /><i>+</i></span>
                <span className="lbl">Creative assets / month</span>
              </div>
              <div className="proc__head-stat">
                <span className="num"><window.Num value="27" /><i>mo</i></span>
                <span className="lbl">Median client tenure</span>
              </div>
            </div>
          </div>
        </header>

        {/* Horizontal stepper */}
        <div className="proc__stepper" role="tablist">
          <span className="proc__stepper-rail" aria-hidden="true">
            <span className="proc__stepper-progress"
                  style={{ width: ((active / (stages.length - 1)) * 100) + "%" }}></span>
          </span>
          {stages.map((s, i) => (
            <button
              key={s.n}
              role="tab"
              aria-selected={active === i}
              className={"proc__step " + (active === i ? "is-on " : "") + (s.featured ? "is-featured" : "")}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}>
              <span className="proc__step-dot" aria-hidden="true">
                {s.featured && <span className="proc__step-dot-star">★</span>}
              </span>
              <span className="proc__step-n">{s.n}</span>
              <span className="proc__step-t">{s.title}</span>
              <span className="proc__step-phase">{s.phase}</span>
            </button>
          ))}
        </div>

        {/* Active stage panel */}
        <div className="proc__panel" key={current.n}>
          <div className="proc__panel-l">
            <div className={"proc__panel-glyph " + (current.featured ? "is-featured" : "")}>
              {current.glyph}
            </div>
            <div className="proc__panel-meta">
              <span className="proc__panel-phase-tag">{current.phase}</span>
              {current.featured && <span className="proc__panel-flag">Single biggest lever</span>}
            </div>
          </div>

          <div className="proc__panel-body">
            <div className="proc__panel-num">
              <span className="proc__panel-num-big">{current.n}</span>
              <span className="proc__panel-num-of">of {String(stages.length).padStart(2, "0")}</span>
            </div>
            <h3 className="proc__panel-title">{current.title}</h3>
            {current.pull && <p className="proc__panel-pull">{current.pull}</p>}
            <p className="proc__panel-desc">{current.desc}</p>
            <ul className="proc__panel-out">
              {current.out.map((o) => <li key={o}>{o}</li>)}
            </ul>
          </div>

          <div className="proc__panel-nav">
            <button className="proc__nav-btn"
                    disabled={active === 0}
                    onClick={() => setActive((i) => Math.max(0, i - 1))}
                    aria-label="Previous stage">
              <svg viewBox="0 0 22 22" width="20" height="20">
                <path d="M 14 5 L 7 11 L 14 17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <span className="proc__nav-pos">{String(active + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}</span>
            <button className="proc__nav-btn"
                    disabled={active === stages.length - 1}
                    onClick={() => setActive((i) => Math.min(stages.length - 1, i + 1))}
                    aria-label="Next stage">
              <svg viewBox="0 0 22 22" width="20" height="20">
                <path d="M 8 5 L 15 11 L 8 17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .proc {
          position: relative;
          z-index: 1;
          padding: clamp(56px, 7vw, 96px) 0;
          outline: none;
        }
        .proc__head { margin-bottom: clamp(36px, 5vw, 56px); }
        .proc__head-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: clamp(28px, 4vw, 80px);
          align-items: end;
        }
        .proc__head-l { max-width: 720px; }
        .proc__h {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(34px, 4.6vw, 64px);
          line-height: 1.04;
          letter-spacing: -0.03em;
          margin: 18px 0 22px;
          color: var(--fg-1);
        }
        .proc__lead {
          font-family: var(--font-body);
          font-size: clamp(16px, 1.2vw, 19px);
          line-height: 1.55;
          color: var(--fg-2);
          max-width: 580px;
          margin: 0;
        }
        .proc__head-r {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(12px, 1.6vw, 24px);
          padding-top: 8px;
        }
        .proc__head-stat {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 16px 0 0;
          border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.18);
        }
        .proc__head-stat .num {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(28px, 2.8vw, 38px);
          line-height: 0.95;
          letter-spacing: -0.025em;
          color: var(--mmc-blue);
          font-variant-numeric: tabular-nums;
        }
        .proc__head-stat .num i {
          font-style: normal;
          color: var(--mmc-yellow);
          font-size: 0.55em;
          margin-left: 4px;
        }
        .proc__head-stat .lbl {
          font-family: var(--font-body);
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--fg-3);
        }

        /* ---- Horizontal stepper ---- */
        .proc__stepper {
          position: relative;
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0;
          margin-bottom: clamp(28px, 3.4vw, 44px);
          padding: 0 4px;
        }
        .proc__stepper-rail {
          position: absolute;
          left: calc(100% / 14);
          right: calc(100% / 14);
          top: 14px;
          height: 2px;
          background: rgba(var(--mmc-blue-rgb), 0.12);
          border-radius: 999px;
        }
        .proc__stepper-progress {
          display: block;
          height: 100%;
          background: linear-gradient(90deg, var(--mmc-blue), var(--mmc-yellow));
          border-radius: 999px;
          transition: width 600ms var(--ease-out);
        }
        .proc__step {
          background: transparent;
          border: 0;
          padding: 0 4px;
          cursor: pointer;
          font: inherit;
          color: var(--fg-3);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          position: relative;
          transition: color var(--dur-base) var(--ease-out);
        }
        .proc__step-dot {
          width: 30px; height: 30px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid rgba(var(--mmc-blue-rgb), 0.18);
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 11px; line-height: 1; color: var(--mmc-yellow);
          font-weight: 700;
          transition: all var(--dur-base) var(--ease-out);
          position: relative;
          z-index: 1;
        }
        .proc__step-n {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.16em;
          color: var(--mmc-yellow);
        }
        .proc__step-t {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 13.5px;
          letter-spacing: -0.01em;
          color: var(--fg-2);
          text-align: center;
          line-height: 1.15;
          transition: color var(--dur-base) var(--ease-out);
        }
        .proc__step-phase {
          font-family: var(--font-body);
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--fg-3);
          opacity: 0.7;
        }
        .proc__step:hover .proc__step-dot { border-color: var(--mmc-blue); transform: scale(1.06); }
        .proc__step:hover .proc__step-t   { color: var(--mmc-blue); }
        .proc__step.is-on .proc__step-dot {
          background: var(--mmc-blue);
          border-color: var(--mmc-blue);
          box-shadow: 0 6px 18px -6px rgba(var(--mmc-blue-rgb), 0.45);
        }
        .proc__step.is-on .proc__step-t   { color: var(--mmc-blue); font-weight: 700; }
        .proc__step.is-on .proc__step-phase { opacity: 1; color: var(--mmc-yellow); }
        .proc__step.is-featured .proc__step-dot { border-color: var(--mmc-yellow); }
        .proc__step.is-featured.is-on .proc__step-dot {
          background: var(--mmc-yellow);
          color: var(--mmc-blue-700);
          box-shadow: 0 8px 24px -6px rgba(var(--mmc-yellow-rgb), 0.6);
        }
        .proc__step-dot-star { font-size: 10px; }
        .proc__step.is-on.is-featured .proc__step-dot-star { color: var(--mmc-blue-700); }

        /* ---- Detail panel ---- */
        .proc__panel {
          display: grid;
          grid-template-columns: 220px 1fr 100px;
          gap: clamp(20px, 2.8vw, 40px);
          align-items: stretch;
          padding: clamp(28px, 3.4vw, 44px) clamp(28px, 3.2vw, 40px);
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.12);
          border-radius: 18px;
          box-shadow: var(--shadow-2);
          animation: procPanelFade 380ms var(--ease-out);
        }
        @keyframes procPanelFade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .proc__panel-l {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-right: clamp(16px, 2vw, 28px);
          border-right: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
        }
        .proc__panel-glyph {
          width: 92px; height: 92px;
          border-radius: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(var(--mmc-blue-rgb), 0.06);
          color: var(--mmc-blue-700);
        }
        .proc__panel-glyph.is-featured {
          background: var(--mmc-yellow);
          color: var(--mmc-blue-700);
        }
        .proc__panel-meta { display: flex; flex-direction: column; gap: 8px; align-items: flex-start; }
        .proc__panel-phase-tag {
          font-family: var(--font-body);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--fg-3);
        }
        .proc__panel-flag {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--mmc-blue-700);
          background: var(--mmc-yellow);
          padding: 5px 10px;
          border-radius: 999px;
        }

        .proc__panel-body { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
        .proc__panel-num {
          display: inline-flex;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 4px;
        }
        .proc__panel-num-big {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(38px, 4vw, 56px);
          line-height: 0.9;
          letter-spacing: -0.035em;
          color: var(--mmc-blue);
          font-variant-numeric: tabular-nums;
          display: inline-block;
          animation: procNumPop 380ms var(--ease-out);
        }
        @keyframes procNumPop {
          from { opacity: 0; transform: translateY(-8px); letter-spacing: -0.02em; }
          to   { opacity: 1; transform: translateY(0); letter-spacing: -0.035em; }
        }
        .proc__panel-num-of {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--fg-3);
        }
        .proc__panel-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(26px, 3vw, 40px);
          letter-spacing: -0.025em;
          line-height: 1.06;
          color: var(--fg-1);
          margin: 0;
        }
        .proc__panel-pull {
          font-family: var(--font-serif);
          font-style: italic;
          font-weight: 500;
          font-size: clamp(17px, 1.6vw, 21px);
          line-height: 1.32;
          color: var(--mmc-blue);
          margin: 6px 0 0;
        }
        .proc__panel-desc {
          font-family: var(--font-body);
          font-size: clamp(14px, 1.1vw, 16.5px);
          line-height: 1.55;
          color: var(--fg-2);
          margin: 4px 0 0;
          max-width: 620px;
        }
        .proc__panel-out {
          list-style: none;
          margin: 14px 0 0;
          padding: 0;
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .proc__panel-out li {
          font-family: var(--font-body);
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--mmc-blue);
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.94);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.14);
        }

        .proc__panel-nav {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
        }
        .proc__nav-btn {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: #fff;
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.18);
          color: var(--mmc-blue);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all var(--dur-base) var(--ease-out);
        }
        .proc__nav-btn:hover:not(:disabled) {
          background: var(--mmc-blue); color: var(--mmc-yellow); border-color: var(--mmc-blue);
          transform: translateY(-1px);
        }
        .proc__nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .proc__nav-pos {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.18em;
          color: var(--fg-3);
          font-variant-numeric: tabular-nums;
        }

        @media (max-width: 980px) {
          .proc__head-grid { grid-template-columns: 1fr; gap: 32px; }
          .proc__panel { grid-template-columns: 1fr; }
          .proc__panel-l { flex-direction: row; padding-right: 0; border-right: 0; padding-bottom: 16px; border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.10); align-items: center; }
          .proc__panel-nav { flex-direction: row; padding-top: 8px; }
        }
        @media (max-width: 720px) {
          .proc__stepper { grid-template-columns: repeat(7, minmax(72px, 1fr)); overflow-x: auto; padding-bottom: 8px; scrollbar-width: thin; }
          .proc__step-t   { font-size: 11px; }
          .proc__step-phase { display: none; }
        }
      `}</style>
    </section>
  );
}

window.Process = Process;
