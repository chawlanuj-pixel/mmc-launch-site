/* service-detail/SdPackages.jsx, Pricing/packages */

function SdPackages({ onAudit }) {
  const tiers = [
    {
      n: "01", name: "Spark",
      price: "₹3L", unit: "/ month", min: "Up to ₹10L ad spend",
      desc: "For brands at the launch end of the curve. One Meta account, lean creative cadence.",
      includes: [
        "1 senior buyer, 1 strategist",
        "30 creatives / month",
        "Weekly reporting",
        "Klaviyo integration",
        "12-month minimum"
      ],
      cta: "Start small"
    },
    {
      n: "02", name: "Compound",
      price: "₹6L", unit: "/ month", min: "₹10L – ₹50L ad spend",
      desc: "Our most common Meta retainer. Full pod, daily ops, weekly creative drops.",
      includes: [
        "Full senior pod (2 buyers, 1 strategist, 2 creatives)",
        "60–80 creatives / month",
        "Daily Slack + weekly call",
        "Server-side CAPI",
        "Cohort dashboards",
        "Quarterly strategy reset"
      ],
      cta: "Most common",
      featured: true
    },
    {
      n: "03", name: "Scale",
      price: "₹12L+", unit: "/ month", min: "₹50L+ ad spend",
      desc: "For brands running ₹50L+ in monthly Meta spend across multiple regions or brands.",
      includes: [
        "Senior leadership embed",
        "120+ creatives / month",
        "Multi-region / multi-brand ops",
        "Daily reporting cadence",
        "Custom dashboards",
        "Direct line to founders"
      ],
      cta: "For scale"
    },
  ];

  return (
    <section id="packages" className="sdpk">
      <div className="container">
        <header className="sdpk__head">
          <div className="eyebrow">Packages</div>
          <h2 className="sdpk__h">
            Three tiers.{" "}
            <span className="em-serif" style={{color:"var(--mmc-blue)"}}>Pick by</span>{" "}
            ad spend, not by features.
          </h2>
          <p className="sdpk__lead">
            All three include the same operating model. The only variable is
            how much creative and headcount you need to support the spend.
          </p>
        </header>

        <div className="sdpk__grid">
          {tiers.map((t) => (
            <div key={t.n} className={"sdpk__card " + (t.featured ? "is-featured" : "")}>
              {t.featured && <span className="sdpk__featured">Most common</span>}
              <div className="sdpk__top">
                <span className="sdpk__n">{t.n}</span>
                <h3 className="sdpk__name">{t.name}</h3>
                <div className="sdpk__price">
                  <span className="num">{t.price}</span>
                  <span className="unit">{t.unit}</span>
                </div>
                <div className="sdpk__min">{t.min}</div>
              </div>
              <p className="sdpk__desc">{t.desc}</p>
              <ul className="sdpk__inc">
                {t.includes.map((inc) => (
                  <li key={inc}>
                    <span className="check" aria-hidden="true">
                      <svg viewBox="0 0 16 16" width="12" height="12">
                        <path d="M 3 8 L 7 12 L 13 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {inc}
                  </li>
                ))}
              </ul>
              <button className="sdpk__cta" onClick={onAudit}>
                {t.cta}
                <span className="arrow"></span>
              </button>
            </div>
          ))}
        </div>

        <p className="sdpk__foot">
          All packages include a 30-day exit clause. Ad spend billed separately,
          directly to your card or by invoice. No platform markups.
        </p>
      </div>

      <style>{`
        .sdpk { position: relative; z-index: 1; padding: clamp(56px, 8vw, 112px) 0; }
        .sdpk__head { max-width: 880px; margin-bottom: clamp(40px, 5vw, 56px); }
        .sdpk__h {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(30px, 3.8vw, 52px); letter-spacing: -0.025em; line-height: 1.06;
          margin: 18px 0 14px;
        }
        .sdpk__lead { font-family: var(--font-body); font-size: 17px; line-height: 1.55; color: var(--fg-2); margin: 0; max-width: 580px; }

        .sdpk__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(16px, 1.8vw, 24px); }
        .sdpk__card {
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          border-radius: 16px;
          padding: clamp(28px, 3vw, 36px);
          display: flex; flex-direction: column; gap: 18px;
          position: relative;
        }
        .sdpk__card.is-featured {
          background: var(--mmc-blue); color: #fff;
          border-color: transparent;
        }
        .sdpk__card.is-featured .sdpk__n, 
        .sdpk__card.is-featured .sdpk__name, 
        .sdpk__card.is-featured .sdpk__price .num,
        .sdpk__card.is-featured .sdpk__desc, 
        .sdpk__card.is-featured .sdpk__inc li { color: #fff; }
        .sdpk__card.is-featured .sdpk__price .unit, 
        .sdpk__card.is-featured .sdpk__min { color: rgba(255,255,255,0.6); }
        .sdpk__card.is-featured .sdpk__inc .check { color: var(--mmc-yellow); }
        .sdpk__card.is-featured .sdpk__cta { background: var(--mmc-yellow); color: var(--mmc-blue-700); }
        .sdpk__card.is-featured .sdpk__cta:hover { background: #F8A800; }
        .sdpk__featured {
          position: absolute; top: -10px; right: 20px;
          font-family: var(--font-body); font-size: 10px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          background: var(--mmc-yellow); color: var(--mmc-blue-700);
          padding: 5px 12px; border-radius: 999px;
        }
        .sdpk__top { display: flex; flex-direction: column; gap: 8px; padding-bottom: 18px; border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.10); }
        .sdpk__card.is-featured .sdpk__top { border-color: rgba(255,255,255,0.18); }
        .sdpk__n { font-family: var(--font-display); font-weight: 700; font-size: 13px; letter-spacing: 0.18em; color: var(--mmc-yellow); }
        .sdpk__name { font-family: var(--font-display); font-weight: 700; font-size: clamp(28px, 2.6vw, 34px); letter-spacing: -0.025em; color: var(--fg-1); margin: 0; }
        .sdpk__price { display: inline-flex; align-items: baseline; gap: 8px; margin-top: 4px; }
        .sdpk__price .num { font-family: var(--font-display); font-weight: 700; font-size: clamp(36px, 3.6vw, 48px); letter-spacing: -0.03em; color: var(--mmc-blue); line-height: 1; }
        .sdpk__price .unit { font-family: var(--font-body); font-size: 14px; color: var(--fg-3); font-weight: 500; }
        .sdpk__min { font-family: var(--font-body); font-size: 11.5px; font-weight: 600; letter-spacing: 0.04em; color: var(--fg-3); font-style: italic; }
        .sdpk__desc { font-family: var(--font-body); font-size: 14px; line-height: 1.55; color: var(--fg-2); margin: 0; }
        .sdpk__inc { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; flex: 1; }
        .sdpk__inc li { display: flex; align-items: flex-start; gap: 10px; font-family: var(--font-body); font-size: 13.5px; line-height: 1.45; color: var(--fg-1); }
        .sdpk__inc .check { color: var(--mmc-blue); display: inline-flex; align-items: center; padding-top: 4px; flex-shrink: 0; }
        .sdpk__cta {
          display: inline-flex; align-items: center; justify-content: center; gap: 12px;
          padding: 14px 22px; background: var(--mmc-blue); color: #fff;
          border-radius: 10px; font-family: var(--font-body); font-size: 12px;
          font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          transition: background var(--dur-base) var(--ease-out);
          cursor: pointer;
        }
        .sdpk__cta:hover { background: var(--mmc-blue-700); }
        .sdpk__cta .arrow { width: 18px; height: 1.5px; background: currentColor; position: relative; transition: width var(--dur-base) var(--ease-out); }
        .sdpk__cta .arrow::after { content: ""; position: absolute; right: -1px; top: -4px; width: 8px; height: 8px; border-top: 1.5px solid currentColor; border-right: 1.5px solid currentColor; transform: rotate(45deg); }
        .sdpk__cta:hover .arrow { width: 28px; }

        .sdpk__foot {
          margin: clamp(32px, 4vw, 56px) auto 0;
          max-width: 580px; text-align: center;
          font-family: var(--font-body); font-size: 12.5px;
          color: var(--fg-3); font-style: italic;
        }

        @media (max-width: 880px) { .sdpk__grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

window.SdPackages = SdPackages;
