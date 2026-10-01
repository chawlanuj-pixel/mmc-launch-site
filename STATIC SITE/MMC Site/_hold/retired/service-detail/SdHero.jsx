/* service-detail/SdHero.jsx, Single service hero */

function SdHero({ onAudit }) {
  const [enter, setEnter] = React.useState(false);
  React.useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setEnter(true)));
  }, []);
  const clip = (extra = "") => "clip-reveal " + (enter ? "in " : "") + extra;
  const reveal = (extra = "") => "reveal " + (enter ? "in " : "") + extra;

  return (
    <section className="page-hero sd-hero" id="top" data-wm="Services">
      <span className="page-hero__wm" aria-hidden="true">Services</span>
      <div className="container sd-hero__inner">
        {/* Breadcrumb */}
        <nav className={"sd-hero__crumb " + (enter ? "in" : "")} aria-label="Breadcrumb">
          <a href="index.html">Home</a>
          <span className="sep">·</span>
          <a href="Contact.html">Services</a>
          <span className="sep">·</span>
          <a href="Contact.html">Revenue Accelerators</a>
          <span className="sep">·</span>
          <span className="current">Meta Ads</span>
        </nav>

        <div className="sd-hero__grid">
          <div className="sd-hero__l">
            <div className={"eyebrow " + (enter ? "in" : "")}>
              <span>● Meta Ads · I/V services in Revenue Accelerators</span>
            </div>

            <h1 className="sd-hero__h">
              <span className={clip("d1")}><span>Meta Ads</span></span>
              <span className={clip("d2")}><span>that <span className="em-serif">compound</span>,</span></span>
              <span className={clip("d3")}><span>not just convert.</span></span>
            </h1>

            <p className={reveal("d4 sd-hero__sub")}>
              We run Meta as a system: full-funnel structure, daily creative iteration,
              cohort-driven optimization. ROAS is the by-product, not the goal.
            </p>

            <div className={reveal("d5 sd-hero__actions")}>
              <button className="btn btn--primary glow-btn" onClick={onAudit}>
                <span className="glow-btn__glow" aria-hidden="true"></span>
                <span className="glow-btn__inner">
                  Audit my Meta account
                  <span className="arrow"></span>
                </span>
              </button>
              <a className="btn btn--link" href="#case">
                See the work
                <span className="arrow"></span>
              </a>
            </div>

            <div className={reveal("d6 sd-hero__quick")}>
              <div className="sd-hero__quick-item">
                <span className="num">8.7<i>×</i></span>
                <span className="lbl">Median ROAS</span>
              </div>
              <div className="sd-hero__quick-item">
                <span className="num">240<i>+</i></span>
                <span className="lbl">Creatives shipped / mo</span>
              </div>
              <div className="sd-hero__quick-item">
                <span className="num">14<i>days</i></span>
                <span className="lbl">Onboarding</span>
              </div>
              <div className="sd-hero__quick-item">
                <span className="num">₹3L<i>+</i></span>
                <span className="lbl">Monthly retainer</span>
              </div>
            </div>
          </div>

          {/* Right, service summary card */}
          <aside className={"sd-hero__r " + (enter ? "in" : "")}>
            <div className="sd-hero__card">
              <div className="sd-hero__card-head">
                <span className="sd-hero__platform-mark" style={{background: "#0866FF"}}>
                  <span>M</span>
                </span>
                <div>
                  <div className="sd-hero__card-name">Meta Ads</div>
                  <div className="sd-hero__card-meta">Instagram · Facebook · Audience Network</div>
                </div>
              </div>

              <dl className="sd-hero__card-list">
                <div><dt>Best for</dt><dd>D2C brands · ₹3Cr – ₹150Cr</dd></div>
                <div><dt>Tracked KPIs</dt><dd>ROAS · CAC · MER · iROAS</dd></div>
                <div><dt>Time to live</dt><dd>14 days from kickoff</dd></div>
                <div><dt>Reporting</dt><dd>Daily · Slack + weekly call</dd></div>
                <div><dt>Engagement</dt><dd>12-month retainer</dd></div>
              </dl>

              <a className="sd-hero__card-cta" href="#packages">
                See packages
                <span className="arrow"></span>
              </a>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .sd-hero { position: relative; z-index: 1; padding: 140px 0 clamp(56px, 7vw, 96px); }
        .sd-hero__inner { position: relative; z-index: 2; }
        .sd-hero__crumb {
          font-family: var(--font-body); font-size: 11.5px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--fg-3);
          margin-bottom: 36px;
          opacity: 0; transition: opacity 700ms var(--ease-out);
        }
        .sd-hero__crumb.in { opacity: 1; }
        .sd-hero__crumb a { color: var(--fg-3); transition: color var(--dur-base) var(--ease-out); }
        .sd-hero__crumb a:hover { color: var(--mmc-blue); }
        .sd-hero__crumb .sep { margin: 0 10px; color: rgba(75,85,99,0.4); }
        .sd-hero__crumb .current { color: var(--mmc-blue); }

        .sd-hero__grid { display: grid; grid-template-columns: 1.6fr 1fr; gap: clamp(40px, 5vw, 80px); align-items: start; }
        .sd-hero__h {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(48px, 6.4vw, 104px); line-height: 0.96; letter-spacing: -0.035em;
          color: var(--fg-1); margin: 18px 0 28px;
        }
        .sd-hero__h .clip-reveal { display: block; }
        .sd-hero__sub {
          font-family: var(--font-body); font-size: clamp(17px, 1.3vw, 21px); line-height: 1.5;
          color: var(--fg-2); max-width: 580px; margin: 0 0 36px;
        }
        .sd-hero__actions { display: inline-flex; align-items: center; gap: 22px; flex-wrap: wrap; margin-bottom: clamp(36px, 5vw, 56px); }
        .sd-hero__quick {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(14px, 1.8vw, 28px);
          padding-top: 24px; border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.18);
        }
        .sd-hero__quick-item { display: flex; flex-direction: column; gap: 4px; }
        .sd-hero__quick-item .num {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(24px, 2.4vw, 32px); letter-spacing: -0.025em;
          color: var(--mmc-blue); font-variant-numeric: tabular-nums;
        }
        .sd-hero__quick-item .num i {
          font-style: normal; color: var(--mmc-yellow);
          font-size: 0.55em; margin-left: 3px;
        }
        .sd-hero__quick-item .lbl {
          font-family: var(--font-body); font-size: 10px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--fg-3);
        }

        /* Right card */
        .sd-hero__r {
          opacity: 0; transform: translateY(8px);
          transition: opacity 800ms var(--ease-out) 0.3s, transform 800ms var(--ease-out) 0.3s;
          position: sticky;
          top: 110px;
        }
        .sd-hero__r.in { opacity: 1; transform: translateY(0); }
        .sd-hero__card {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          border-radius: 16px;
          padding: 24px;
          box-shadow: var(--shadow-3);
        }
        .sd-hero__card-head { display: flex; align-items: center; gap: 14px; padding-bottom: 18px; border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.10); margin-bottom: 18px; }
        .sd-hero__platform-mark {
          width: 44px; height: 44px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: inset 0 1px 2px rgba(255,255,255,0.25), 0 2px 6px rgba(0,0,0,0.08);
          flex-shrink: 0;
        }
        .sd-hero__platform-mark span {
          font-family: var(--font-display); font-weight: 800;
          font-size: 22px; color: #fff;
        }
        .sd-hero__card-name { font-family: var(--font-display); font-weight: 700; font-size: 19px; letter-spacing: -0.01em; color: var(--mmc-text); }
        .sd-hero__card-meta { font-family: var(--font-body); font-size: 11px; font-weight: 600; letter-spacing: 0.08em; color: var(--fg-3); margin-top: 3px; }
        .sd-hero__card-list { margin: 0 0 18px; padding: 0; display: flex; flex-direction: column; gap: 12px; }
        .sd-hero__card-list > div { display: flex; justify-content: space-between; align-items: baseline; gap: 14px; }
        .sd-hero__card-list dt { font-family: var(--font-body); font-size: 10.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--fg-3); margin: 0; }
        .sd-hero__card-list dd { font-family: var(--font-display); font-weight: 600; font-size: 13.5px; color: var(--fg-1); margin: 0; text-align: right; }
        .sd-hero__card-cta { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 12px 18px; background: var(--mmc-blue); color: #fff; border-radius: 10px; font-family: var(--font-body); font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; transition: background var(--dur-base) var(--ease-out); }
        .sd-hero__card-cta:hover { background: var(--mmc-blue-700); color: #fff; }
        .sd-hero__card-cta .arrow { width: 18px; height: 1.5px; background: currentColor; position: relative; transition: width var(--dur-base) var(--ease-out); }
        .sd-hero__card-cta .arrow::after { content: ""; position: absolute; right: -1px; top: -4px; width: 8px; height: 8px; border-top: 1.5px solid currentColor; border-right: 1.5px solid currentColor; transform: rotate(45deg); }
        .sd-hero__card-cta:hover .arrow { width: 28px; }

        @media (max-width: 900px) {
          .sd-hero__grid { grid-template-columns: 1fr; }
          .sd-hero__r { position: static; }
          .sd-hero__quick { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </section>
  );
}

window.SdHero = SdHero;
