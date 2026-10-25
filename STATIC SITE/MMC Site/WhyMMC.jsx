/* WhyMMC.jsx, Design AND Revenue. Not one or the other.
   Editorial manifesto + 5 proof-driven reasons.
   Layouts vary across the 5 cards so the section has rhythm, not repetition. */

function WhyMMC() {
  const reasons = [
    {
      n: "01",
      layout: "hero",
      hook: "Design as the revenue lever.",
      proof: { num: "+34%", lbl: "Avg. lift on landing-page conversion after a brand rebuild" },
      title: "Design is not decoration.",
      desc: "Most agencies treat design as a slide at the end of the deck. We start there. Every creative, page, and email is a buying decision in disguise, and we design it to convert.",
      tag: "Design × Revenue",
      glyph: (
        <svg viewBox="0 0 80 80" width="64" height="64" aria-hidden="true">
          <rect x="14" y="14" width="52" height="52" fill="none" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M 14 40 L 66 40 M 40 14 L 40 66" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
          <circle cx="40" cy="40" r="12" fill="var(--mmc-yellow)"/>
          <path d="M 32 56 L 48 56" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      n: "02",
      layout: "split",
      hook: "Senior taste. Not junior teams.",
      proof: { num: "1 : 4", lbl: "Senior to executor ratio · industry avg 1:18" },
      title: "The strategist owns the work.",
      desc: "Your account is run by a senior who's shipped this exact playbook before. No agency intern reading from a template, no rotating junior: taste sits in every Slack thread.",
      tag: "Tenure"
    },
    {
      n: "03",
      layout: "icon",
      hook: "Six disciplines. One Slack thread.",
      proof: { num: "0", lbl: "Handoffs between performance, brand, retention, tech" },
      title: "We're a pod, not a process diagram.",
      desc: "Performance, creative, brand, retention, technology, and AI sit at the same table. Briefs are written once. Iterations ship daily.",
      tag: "Integration",
      glyph: (
        <svg viewBox="0 0 64 64" width="52" height="52" aria-hidden="true">
          <circle cx="32" cy="32" r="6" fill="var(--mmc-yellow)"/>
          {[0,1,2,3,4,5].map(i => {
            const a = (i*60 - 30) * Math.PI/180;
            const x = 32 + Math.cos(a) * 20;
            const y = 32 + Math.sin(a) * 20;
            return <g key={i}>
              <line x1="32" y1="32" x2={x} y2={y} stroke="currentColor" strokeWidth="1.2" opacity="0.4"/>
              <circle cx={x} cy={y} r="4" fill="currentColor"/>
            </g>;
          })}
        </svg>
      )
    },
    {
      n: "04",
      layout: "editorial",
      hook: "Live media in 14 days.",
      proof: { num: "4×", lbl: "Faster than the 60-day industry standard" },
      title: "Onboarding is a sprint, not a phase.",
      desc: "Most agencies disappear for 60 days to write a plan. We finish discovery in week one, ship creative in week two, and your first paid media goes live in week three.",
      tag: "Speed"
    },
    {
      n: "05",
      layout: "stat",
      hook: "Clients stay with us.",
      proof: { num: "27 mo", lbl: "Median client tenure" },
      title: "Accountability is staying.",
      desc: "Growth that compounds takes time. The reason we keep clients isn't a creative quarterly review: it's that the math kept working. We say no to brands we can't help.",
      tag: "Compounding"
    },
  ];

  return (
    <section id="why" className="why" data-screen-label="07 Why MMC">
      <div className="container">
        <header className="why__head">
          <div className="eyebrow">Why brands choose MMC</div>
          <h2 className="why__h">
            <span className="why__h-line">Design.</span>
            <span className="why__h-line">And <span className="em-serif" style={{color:"var(--mmc-blue)"}}>revenue.</span></span>
            <span className="why__h-line why__h-line--small">
              <span className="em-serif" style={{color:"var(--mmc-yellow)"}}>Not</span> one or the other.
            </span>
          </h2>
        </header>

        {/* Manifesto */}
        <div className="why__manifesto">
          <div className="why__manifesto-mark" aria-hidden="true">"</div>
          <p className="why__manifesto-text">
            Most agencies pick a side. Design studios make beautiful brands that don't grow.
            Performance agencies move money but flatten the brand on the way through.
            We built MMC because that trade-off is a fiction. <span className="em-serif" style={{color:"var(--mmc-blue)"}}>Design is what makes revenue compound.</span>
            Revenue is the proof your design is working.
          </p>
          <div className="why__manifesto-sig">
            <span className="why__manifesto-sig-name">Founders, MMC</span>
            <span className="why__manifesto-sig-meta">Thane · Est. 2019</span>
          </div>
        </div>

        {/* Reasons, mixed-rhythm bento grid */}
        <div className="why__reasons" role="list">
          {reasons.map((r) => (
            <article className={"why__r why__r--" + r.layout} key={r.n} role="listitem">
              <div className="why__r-top">
                <span className="why__r-n">{r.n}</span>
                <span className="why__r-tag">{r.tag}</span>
              </div>

              {r.layout === "hero" && (
                <>
                  <div className="why__r-hero-body">
                    <p className="why__r-hook why__r-hook--lg">{r.hook}</p>
                    <h3 className="why__r-title">{r.title}</h3>
                    <p className="why__r-desc">{r.desc}</p>
                  </div>
                  <div className="why__r-hero-side">
                    <div className="why__r-glyph">{r.glyph}</div>
                    <div className="why__r-proof why__r-proof--lg">
                      <span className="why__r-proof-num"><window.Num value={r.proof.num} /></span>
                      <span className="why__r-proof-lbl">{r.proof.lbl}</span>
                    </div>
                  </div>
                </>
              )}

              {r.layout === "split" && (
                <div className="why__r-split">
                  <div className="why__r-split-l">
                    <p className="why__r-hook">{r.hook}</p>
                    <h3 className="why__r-title">{r.title}</h3>
                    <p className="why__r-desc">{r.desc}</p>
                  </div>
                  <div className="why__r-split-r">
                    <span className="why__r-proof-num"><window.Num value={r.proof.num} /></span>
                    <span className="why__r-proof-lbl">{r.proof.lbl}</span>
                  </div>
                </div>
              )}

              {r.layout === "icon" && (
                <div className="why__r-icon-stack">
                  <div className="why__r-glyph why__r-glyph--inline">{r.glyph}</div>
                  <p className="why__r-hook">{r.hook}</p>
                  <div className="why__r-proof">
                    <span className="why__r-proof-num"><window.Num value={r.proof.num} /></span>
                    <span className="why__r-proof-lbl">{r.proof.lbl}</span>
                  </div>
                  <h3 className="why__r-title">{r.title}</h3>
                  <p className="why__r-desc">{r.desc}</p>
                </div>
              )}

              {r.layout === "editorial" && (
                <>
                  <p className="why__r-hook why__r-hook--editorial">{r.hook}</p>
                  <div className="why__r-edit-rule"></div>
                  <h3 className="why__r-title">{r.title}</h3>
                  <p className="why__r-desc">{r.desc}</p>
                  <div className="why__r-edit-foot">
                    <span className="why__r-proof-num why__r-proof-num--sm"><window.Num value={r.proof.num} /></span>
                    <span className="why__r-proof-lbl">{r.proof.lbl}</span>
                  </div>
                </>
              )}

              {r.layout === "stat" && (
                <div className="why__r-stat-wrap">
                  <span className="why__r-proof-num why__r-proof-num--xl"><window.Num value={r.proof.num} /></span>
                  <div className="why__r-stat-body">
                    <p className="why__r-hook">{r.hook}</p>
                    <h3 className="why__r-title">{r.title}</h3>
                    <p className="why__r-desc">{r.desc}</p>
                  </div>
                  <span className="why__r-proof-lbl why__r-stat-lbl">{r.proof.lbl}</span>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .why {
          position: relative;
          z-index: 1;
          padding: clamp(56px, 7vw, 96px) 0;
        }
        .why__head { margin-bottom: clamp(28px, 4vw, 40px); }
        .why__h {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(48px, 7.5vw, 124px);
          line-height: 0.94;
          letter-spacing: -0.045em;
          color: var(--fg-1);
          margin: 18px 0 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .why__h-line { display: block; }
        .why__h-line--small {
          font-size: 0.55em;
          font-weight: 600;
          letter-spacing: -0.03em;
          margin-top: 14px;
          color: var(--fg-2);
        }

        /* ---- Manifesto ---- */
        .why__manifesto {
          position: relative;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          border-left: 4px solid var(--mmc-yellow);
          border-radius: 14px;
          padding: clamp(24px, 3vw, 40px) clamp(28px, 3.4vw, 44px);
          margin-bottom: clamp(48px, 6vw, 72px);
          max-width: 1000px;
        }
        .why__manifesto-mark {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: clamp(80px, 9vw, 140px);
          line-height: 0.6;
          color: var(--mmc-yellow);
          position: absolute;
          top: 18px;
          left: clamp(24px, 3vw, 40px);
          opacity: 0.5;
          pointer-events: none;
        }
        .why__manifesto-text {
          font-family: var(--font-display);
          font-weight: 500;
          font-size: clamp(20px, 2vw, 28px);
          line-height: 1.35;
          letter-spacing: -0.018em;
          color: var(--fg-1);
          margin: 0 0 24px;
          padding-left: clamp(28px, 3.4vw, 56px);
          padding-top: 8px;
          max-width: 820px;
        }
        .why__manifesto-sig {
          display: flex;
          align-items: baseline;
          gap: 14px;
          flex-wrap: wrap;
          padding-left: clamp(28px, 3.4vw, 56px);
          padding-top: 18px;
          border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
        }
        .why__manifesto-sig-name { font-family: var(--font-display); font-weight: 700; font-size: 14px; letter-spacing: -0.005em; color: var(--mmc-blue); }
        .why__manifesto-sig-meta { font-family: var(--font-body); font-size: 11px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--fg-3); }

        /* ---- Bento reasons grid ---- */
        .why__reasons {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          grid-auto-rows: minmax(220px, auto);
          gap: clamp(14px, 1.6vw, 22px);
        }
        .why__r {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(14px) saturate(140%);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.12);
          border-radius: 16px;
          padding: clamp(22px, 2.4vw, 32px);
          display: flex;
          flex-direction: column;
          gap: 14px;
          position: relative;
          overflow: hidden;
          transition: transform var(--dur-base) var(--ease-out),
                      box-shadow var(--dur-base) var(--ease-out),
                      border-color var(--dur-base) var(--ease-out);
        }
        .why__r::before {
          content: "";
          position: absolute;
          left: 0; bottom: 0;
          width: 0; height: 2px;
          background: var(--mmc-yellow);
          transition: width 700ms var(--ease-out);
        }
        .why__r:hover {
          transform: translateY(-3px);
          border-color: rgba(var(--mmc-blue-rgb), 0.22);
          box-shadow: var(--shadow-3);
          position: relative; z-index: 2;
        }
        .why__r:hover::before { width: 100%; }

        /* Layout-specific grid spans */
        .why__r--hero      { grid-column: span 6; flex-direction: row; gap: clamp(24px, 3vw, 48px); align-items: stretch; background: var(--mmc-blue); color: #fff; border-color: transparent; padding: clamp(28px, 3.4vw, 44px); }
        .why__r--split     { grid-column: span 3; }
        .why__r--icon      { grid-column: span 3; }
        .why__r--editorial { grid-column: span 4; background: rgba(255,252,244,0.92); border-color: rgba(var(--mmc-yellow-rgb), 0.30); }
        .why__r--stat      { grid-column: span 2; padding: 0; }

        .why__r-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .why__r-n {
          font-family: var(--font-display); font-weight: 700; font-size: 13px;
          letter-spacing: 0.18em; color: var(--mmc-yellow);
        }
        .why__r-tag {
          font-family: var(--font-body); font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--fg-3); padding: 4px 10px;
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.12); border-radius: 999px;
        }
        .why__r--hero .why__r-tag {
          color: var(--mmc-yellow); border-color: rgba(var(--mmc-yellow-rgb), 0.4); background: rgba(var(--mmc-yellow-rgb), 0.16);
        }

        .why__r-hook {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(18px, 1.65vw, 22px); line-height: 1.18;
          letter-spacing: -0.02em; color: var(--fg-1);
          margin: 4px 0 0;
        }
        .why__r--hero .why__r-hook { color: #fff; }
        .why__r-hook--lg { font-size: clamp(24px, 2.4vw, 32px); line-height: 1.12; }
        .why__r-hook--editorial {
          font-family: var(--font-serif); font-style: italic; font-weight: 500;
          font-size: clamp(22px, 2.2vw, 30px); line-height: 1.22;
          color: var(--mmc-blue);
        }

        .why__r-title {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(17px, 1.5vw, 21px); letter-spacing: -0.018em;
          line-height: 1.22; color: var(--mmc-blue); margin: 4px 0 0;
        }
        .why__r--hero .why__r-title { color: var(--mmc-yellow); font-size: clamp(20px, 1.8vw, 26px); }
        .why__r-desc {
          font-family: var(--font-body); font-size: 13.5px; line-height: 1.6;
          color: var(--fg-2); margin: 0;
        }
        .why__r--hero .why__r-desc { color: rgba(255,255,255,0.82); font-size: 14.5px; max-width: 480px; }

        .why__r-proof {
          display: flex; flex-direction: column; gap: 4px;
          padding: 14px 0;
          border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
        }
        .why__r-proof-num {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(36px, 4vw, 52px); line-height: 0.95;
          letter-spacing: -0.035em; color: var(--mmc-blue);
          font-variant-numeric: tabular-nums;
        }
        .why__r-proof-num--sm { font-size: clamp(28px, 2.6vw, 36px); }
        .why__r-proof-num--xl { font-size: clamp(68px, 9vw, 120px); line-height: 0.88; }
        .why__r-proof-lbl {
          font-family: var(--font-body); font-size: 11px; font-weight: 600;
          letter-spacing: 0.08em; color: var(--fg-3); line-height: 1.45;
        }

        /* Hero layout */
        .why__r-hero-body { flex: 1.5; display: flex; flex-direction: column; gap: 14px; min-width: 0; }
        .why__r-hero-side { flex: 1; display: flex; flex-direction: column; gap: 20px; justify-content: space-between; min-width: 200px; padding-left: clamp(20px, 2vw, 32px); border-left: 1px solid rgba(255,255,255,0.18); }
        .why__r--hero .why__r-top { position: absolute; top: clamp(28px, 3.4vw, 44px); left: clamp(28px, 3.4vw, 44px); right: clamp(28px, 3.4vw, 44px); }
        .why__r--hero .why__r-hero-body { margin-top: 38px; }
        .why__r-glyph { color: var(--mmc-yellow); display: inline-flex; }
        .why__r--hero .why__r-proof { border-color: rgba(255,255,255,0.18); }
        .why__r--hero .why__r-proof-num { color: var(--mmc-yellow); }
        .why__r--hero .why__r-proof-lbl { color: rgba(255,255,255,0.7); }
        .why__r-proof--lg .why__r-proof-num { font-size: clamp(48px, 5.4vw, 72px); }

        /* Split layout */
        .why__r-split { display: grid; grid-template-columns: 1.4fr 1fr; gap: clamp(18px, 2vw, 28px); align-items: stretch; flex: 1; }
        .why__r-split-l { display: flex; flex-direction: column; gap: 12px; }
        .why__r-split-r {
          display: flex; flex-direction: column; gap: 6px;
          justify-content: center; padding-left: clamp(16px, 1.6vw, 22px);
          border-left: 1px solid rgba(var(--mmc-blue-rgb), 0.12);
        }
        .why__r-split-r .why__r-proof-num { font-size: clamp(40px, 4.2vw, 56px); color: var(--mmc-blue); }

        /* Icon layout */
        .why__r-icon-stack { display: flex; flex-direction: column; gap: 12px; flex: 1; }
        .why__r-glyph--inline { color: var(--mmc-blue); margin-bottom: 4px; }

        /* Editorial layout */
        .why__r-edit-rule { width: 56px; height: 2px; background: var(--mmc-yellow); margin: 4px 0; }
        .why__r-edit-foot { display: flex; align-items: baseline; gap: 14px; margin-top: auto; padding-top: 14px; border-top: 1px dashed rgba(var(--mmc-blue-rgb), 0.22); flex-wrap: wrap; }

        /* Stat layout, number-led card */
        .why__r--stat { background: var(--mmc-yellow); color: var(--mmc-blue-700); }
        .why__r--stat .why__r-top, .why__r--stat .why__r-stat-body, .why__r--stat .why__r-stat-lbl { padding: 0 clamp(22px, 2.4vw, 32px); }
        .why__r--stat .why__r-top { padding-top: clamp(22px, 2.4vw, 32px); }
        .why__r--stat .why__r-tag { color: var(--mmc-blue-700); border-color: rgba(var(--mmc-blue-rgb), 0.25); background: rgba(255,255,255,0.4); }
        .why__r--stat .why__r-n { color: var(--mmc-blue-700); }
        .why__r-stat-wrap { display: flex; flex-direction: column; gap: 12px; flex: 1; padding-bottom: clamp(22px, 2.4vw, 32px); }
        .why__r--stat .why__r-proof-num--xl { padding: 4px clamp(22px, 2.4vw, 32px); margin: -4px 0; color: var(--mmc-blue-700); font-size: clamp(76px, 11vw, 140px); }
        .why__r-stat-body { display: flex; flex-direction: column; gap: 8px; }
        .why__r--stat .why__r-hook { color: var(--mmc-blue-700); }
        .why__r--stat .why__r-title { color: var(--mmc-blue-700); }
        .why__r--stat .why__r-desc { color: rgba(var(--mmc-ink-rgb), 0.7); }
        .why__r-stat-lbl { color: var(--mmc-blue-700); opacity: 0.7; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; font-size: 10px; }

        @media (max-width: 980px) {
          .why__reasons { grid-template-columns: repeat(4, 1fr); }
          .why__r--hero      { grid-column: span 4; flex-direction: column; }
          .why__r--hero .why__r-hero-side { border-left: 0; border-top: 1px solid rgba(255,255,255,0.18); padding-left: 0; padding-top: 20px; flex-direction: row; align-items: center; justify-content: space-between; }
          .why__r--split     { grid-column: span 4; }
          .why__r--icon      { grid-column: span 2; }
          .why__r--editorial { grid-column: span 2; }
          .why__r--stat      { grid-column: span 4; }
          .why__r-stat-wrap  { flex-direction: row; align-items: center; gap: 20px; padding-bottom: 0; }
          .why__r--stat .why__r-proof-num--xl { padding: clamp(22px, 2.4vw, 32px) clamp(22px, 2.4vw, 32px); }
        }
        @media (max-width: 720px) {
          .why__reasons { grid-template-columns: 1fr; }
          .why__r--hero, .why__r--split, .why__r--icon, .why__r--editorial, .why__r--stat { grid-column: span 1; }
          .why__r-split { grid-template-columns: 1fr; }
          .why__r-split-r { border-left: 0; border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.12); padding-left: 0; padding-top: 14px; flex-direction: row; align-items: baseline; gap: 14px; }
          .why__r--hero .why__r-hero-side { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </section>
  );
}

window.WhyMMC = WhyMMC;
