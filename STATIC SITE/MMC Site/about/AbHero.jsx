/* about/AbHero.jsx, Editorial hero · "Built for the way modern brands actually grow" */

function AbHero({ onAudit }) {
  const [enter, setEnter] = React.useState(false);
  React.useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setEnter(true)));
  }, []);
  const clip = (e = "") => "clip-reveal " + (enter ? "in " : "") + e;
  const reveal = (e = "") => "reveal " + (enter ? "in " : "") + e;

  return (
    <section className="page-hero ab-hero" id="top" data-screen-label="01 About · Hero" data-wm="About">
        <span className="page-hero__wm" aria-hidden="true">About</span>
      {/* Architectural sunrise, concentric thin arcs + a single directional yellow line */}
      <svg className="ab-hero__sun" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <defs>
          <radialGradient id="abHeroWash" cx="50%" cy="100%" r="70%">
            <stop offset="0%" stopColor="rgba(251,247,241,0.85)"/>
            <stop offset="100%" stopColor="rgba(251,247,241,0)"/>
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="1600" height="900" fill="url(#abHeroWash)"/>
        <g fill="none" stroke="var(--mmc-blue)" strokeWidth="1" opacity="0.10">
          <circle cx="800" cy="980" r="240"/>
          <circle cx="800" cy="980" r="380"/>
          <circle cx="800" cy="980" r="540"/>
          <circle cx="800" cy="980" r="720"/>
          <circle cx="800" cy="980" r="920"/>
        </g>
        <path className="ab-hero__ray"
              d="M 80 760 C 420 660, 900 460, 1540 200"
              fill="none" stroke="var(--mmc-yellow)" strokeWidth="1.6"
              strokeLinecap="round" opacity="0.55"/>
      </svg>

      <div className="container">
        <nav className={"ab-hero__crumb " + (enter ? "in" : "")} aria-label="Breadcrumb">
          <a href="index.html">Home</a>
          <span className="sep">·</span>
          <span className="current">About</span>
        </nav>

        <div className="ab-hero__grid">
          <div className="ab-hero__l">
            <div className={"eyebrow " + (enter ? "in" : "")}>About · Monday Marketing Company</div>

            <h1 className="ab-hero__h">
              <span className={clip("d1")}><span>Built for the way</span></span>
              <span className={clip("d2")}><span>modern brands actually</span></span>
              <span className={clip("d3")}><span><span className="em-serif">grow.</span></span></span>
            </h1>

            <p className={reveal("d4 ab-hero__sub")}>
              MMC started with a simple belief.<br/>
              Modern businesses don't fail because they lack products.<br/>
              They fail because growth itself has changed, and most teams haven't.
            </p>

            <p className={reveal("d5 ab-hero__sub ab-hero__sub--quiet")}>
              We're not building another agency. We're building a modern growth company
              shaped around how digital behaviour actually works today.
            </p>

            <div className={reveal("d6 ab-hero__actions")}>
              <button className="btn btn--primary glow-btn" onClick={onAudit}>
                <span className="glow-btn__glow" aria-hidden="true"></span>
                <span className="glow-btn__inner">
                  Start the conversation
                  <span className="arrow"></span>
                </span>
              </button>
              <a className="btn btn--link" href="#beliefs">
                What we believe
                <span className="arrow"></span>
              </a>
            </div>
          </div>

          {/* Right side, a quiet editorial card. "Field notes" not infographic. */}
          <aside className={"ab-hero__r " + (enter ? "in" : "")}>
            <div className="ab-hero__card">
              <span className="ab-hero__card-eyebrow">Field notes · No. 01</span>

              <p className="ab-hero__card-q">
                What kind of company is MMC?
              </p>

              <p className="ab-hero__card-a">
                Ambitious. Creative. Sharp. Modern.<br/>
                Adaptable. Execution-heavy. Founder-led.<br/>
                <span className="em-serif">Growth-obsessed.</span>
              </p>

              <span className="ab-hero__card-rule"></span>

              <p className="ab-hero__card-q">
                What kind of company we're not.
              </p>

              <p className="ab-hero__card-a ab-hero__card-a--mute">
                Not a traditional agency.<br/>
                Not a template factory.<br/>
                Not in the business of looking busy.
              </p>

              <span className="ab-hero__card-sig">The MMC team</span>
            </div>
          </aside>
        </div>

        <div className={reveal("d6 ab-hero__principles")}>
          <span className="ab-hero__principles-label">Five things we'd put on the wall</span>
          <ol className="ab-hero__principles-list">
            <li><span className="n">01</span><span>Ideas matter more than designations.</span></li>
            <li><span className="n">02</span><span>Execution matters more than noise.</span></li>
            <li><span className="n">03</span><span>Speed beats hierarchy.</span></li>
            <li><span className="n">04</span><span>Honesty over polish.</span></li>
            <li><span className="n">05</span><span>Build for the next ten years.</span></li>
          </ol>
        </div>
      </div>

      <style>{`
        .ab-hero { position: relative; z-index: 1; padding: 140px 0 clamp(56px, 7vw, 96px); overflow: hidden; }
        .ab-hero__sun {
          position: absolute; inset: 0; width: 100%; height: 100%;
          pointer-events: none; z-index: 0;
        }
        .ab-hero__ray {
          stroke-dasharray: 2400; stroke-dashoffset: 2400;
          animation: abHeroDraw 2600ms 500ms var(--ease-out) forwards;
        }
        @keyframes abHeroDraw { to { stroke-dashoffset: 0; } }

        .ab-hero__crumb {
          font-family: var(--font-body); font-size: 11.5px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--fg-2);
          margin-bottom: 36px;
          opacity: 0; transition: opacity 700ms var(--ease-out);
          position: relative; z-index: 2;
        }
        .ab-hero__crumb.in { opacity: 1; }
        .ab-hero__crumb a { color: var(--fg-2); transition: color var(--dur-base) var(--ease-out); }
        .ab-hero__crumb a:hover { color: var(--mmc-blue); }
        .ab-hero__crumb .sep { margin: 0 10px; color: rgba(75,85,99,0.4); }
        .ab-hero__crumb .current { color: var(--mmc-blue); }

        .ab-hero__grid {
          display: grid; grid-template-columns: 1.45fr 1fr;
          gap: clamp(40px, 5vw, 96px); align-items: start;
          position: relative; z-index: 2;
        }

        .ab-hero__h {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(48px, 7.5vw, 112px);
          line-height: 0.94; letter-spacing: -0.04em;
          color: var(--fg-1); margin: 22px 0 32px;
        }
        .ab-hero__h .clip-reveal { display: block; }
        .ab-hero__sub {
          font-family: var(--font-body); font-size: clamp(17px, 1.35vw, 21px);
          line-height: 1.6; color: var(--fg-1);
          max-width: 620px; margin: 0 0 22px;
        }
        .ab-hero__sub--quiet { color: var(--fg-2); font-size: clamp(15px, 1.15vw, 18px); }
        .ab-hero__actions {
          display: inline-flex; align-items: center; gap: 22px; flex-wrap: wrap;
          margin-top: 16px;
        }

        /* ---- Right card: editorial field notes ---- */
        .ab-hero__r { opacity: 0; transform: translateY(8px);
          transition: opacity 900ms var(--ease-out) 0.3s, transform 900ms var(--ease-out) 0.3s; }
        .ab-hero__r.in { opacity: 1; transform: translateY(0); }

        .ab-hero__card {
          position: relative;
          padding: clamp(28px, 3vw, 40px);
          background: rgba(255,255,255,0.78);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          border-radius: 20px;
          backdrop-filter: blur(12px) saturate(140%);
          box-shadow: 0 24px 60px -32px rgba(var(--mmc-blue-rgb), 0.30);
          display: flex; flex-direction: column; gap: 12px;
        }
        .ab-hero__card::before {
          content: ""; position: absolute; top: 18px; right: 18px;
          width: 32px; height: 32px;
          background: radial-gradient(circle, var(--mmc-yellow) 0%, var(--mmc-yellow) 30%, transparent 70%);
          opacity: 0.18; border-radius: 50%;
        }
        .ab-hero__card-eyebrow {
          font-family: var(--font-body); font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--mmc-yellow);
        }
        .ab-hero__card-q {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(15px, 1.1vw, 17px); letter-spacing: -0.005em;
          color: var(--mmc-blue); margin: 4px 0 -2px;
        }
        .ab-hero__card-a {
          font-family: var(--font-display); font-weight: 500;
          font-size: clamp(18px, 1.5vw, 22px); line-height: 1.4;
          letter-spacing: -0.02em; color: var(--fg-1);
          margin: 0;
        }
        .ab-hero__card-a--mute { color: var(--fg-2); }
        .ab-hero__card-rule {
          display: block; height: 1px; background: rgba(var(--mmc-blue-rgb), 0.12);
          margin: 14px 0 6px;
        }
        .ab-hero__card-sig {
          margin-top: 8px;
          font-family: var(--font-serif); font-style: italic;
          font-size: 14px; color: var(--fg-3);
        }

        /* ---- Five things on the wall ---- */
        .ab-hero__principles {
          margin-top: clamp(48px, 6vw, 84px);
          padding-top: 28px;
          border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.14);
          position: relative; z-index: 2;
        }
        .ab-hero__principles-label {
          display: block;
          font-family: var(--font-body); font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--mmc-yellow); margin-bottom: 22px;
        }
        .ab-hero__principles-list {
          list-style: none; margin: 0; padding: 0;
          display: grid; grid-template-columns: repeat(5, 1fr);
          gap: clamp(16px, 2vw, 32px);
        }
        .ab-hero__principles-list li {
          display: flex; flex-direction: column; gap: 8px;
          padding-top: 12px;
          border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.18);
        }
        .ab-hero__principles-list .n {
          font-family: var(--font-display); font-weight: 800;
          font-size: 12px; letter-spacing: 0.18em;
          color: var(--mmc-yellow); font-variant-numeric: tabular-nums;
        }
        .ab-hero__principles-list li > span:last-child {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(15px, 1.15vw, 18px); letter-spacing: -0.015em;
          line-height: 1.3; color: var(--fg-1);
          text-wrap: balance;
        }

        @media (max-width: 980px) {
          .ab-hero__grid { grid-template-columns: 1fr; }
          .ab-hero__r { max-width: 520px; }
          .ab-hero__principles-list { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .ab-hero__principles-list { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
window.AbHero = AbHero;
