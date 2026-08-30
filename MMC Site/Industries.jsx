/* Industries.jsx, Industries we build for.
   Left preview is a visual art panel: gradient surface per industry,
   the services we run in that world, stat overlay.

   The panel used to list client names. It no longer does: the service labels
   come from content/clients.json (_services), and no client name sits next to
   an industry figure. */

function Industries() {
  const list = [
    {
      n: "01", name: "D2C Brands",
      detail: "Beauty · Food · Apparel · Home · Wellness",
      stat: { num: "₹148Cr+", lbl: "Compounded D2C revenue" },
      art: "blush",
      mix: ["Performance ads, D2C", "Performance creative", "Amazon", "Quick commerce"],
      mark: "DC"
    },
    {
      n: "02", name: "Healthcare",
      detail: "Diagnostics · Clinics · Dental · DTC pharma",
      stat: { num: "8,400+", lbl: "Monthly bookings driven" },
      art: "azure",
      mix: ["Lead generation", "Website redesign and development", "Performance creative"],
      mark: "HL"
    },
    {
      n: "03", name: "Real Estate",
      detail: "Premium residential · Branded retail · Holiday homes",
      stat: { num: "₹62Cr", lbl: "Inventory moved · 12mo" },
      art: "ochre",
      mix: ["Lead generation", "Performance creative", "Social media"],
      mark: "RE"
    },
    {
      n: "04", name: "Education",
      detail: "K-12 · Higher ed · Educational travel · Skilling",
      stat: { num: "92k", lbl: "Qualified leads · last year" },
      art: "sage",
      mix: ["Website redesign and development", "Lead generation", "Social media"],
      mark: "ED"
    },
    {
      n: "05", name: "SaaS",
      detail: "Vertical SaaS · Devtools · Productivity",
      stat: { num: "3.8×", lbl: "Avg. trial → paid lift" },
      art: "graphite",
      mix: ["Website redesign and development", "Lead generation", "Performance creative", "Social media"],
      mark: "SA"
    },
    {
      n: "06", name: "Hospitality",
      detail: "Hotels · F&B · Bars · Boutique stays",
      stat: { num: "+62%", lbl: "Direct bookings · YoY" },
      art: "wine",
      mix: ["Social media", "Performance creative", "Lead generation"],
      mark: "HO"
    },
    {
      n: "07", name: "Startups",
      detail: "Pre-PMF · Series A · Bootstrapped consumer",
      stat: { num: "0→1", lbl: "Brand, site, system" },
      art: "violet",
      mix: ["Website redesign and development", "Performance creative", "Social media"],
      mark: "ST"
    },
  ];

  const [active, setActive] = React.useState(0);
  const [stage, setStage] = React.useState("all");
  const current = list[active];

  const stages = [
    {
      id: "01",  key: "01",
      label: "0 → 1",
      tag: "Launching",
      desc: "Brand identity, storefront, first creatives, first ad. We build the engine before there's a road.",
      stat: "6 weeks",
      statLbl: "Brand to live media",
      range: "Pre-revenue · ₹10L–₹3Cr"
    },
    {
      id: "110",  key: "110",
      label: "1 → 10",
      tag: "Growing",
      desc: "Performance scaling, creative volume, retention layer. The moment growth stops being a guess.",
      stat: "8.7×",
      statLbl: "Median blended ROAS",
      range: "₹3Cr – ₹30Cr"
    },
    {
      id: "10100", key: "10100",
      label: "10 → 100",
      tag: "Scaling",
      desc: "New channels, geos, SKUs. Internal teams. The system runs while you compound.",
      stat: "₹148Cr+",
      statLbl: "Compounded D2C revenue",
      range: "₹30Cr+"
    },
  ];

  return (
    <section id="industries" className="ind" data-screen-label="06 Industries">
      <div className="container">
        <div className="ind__head">
          <div className="eyebrow">Industries · 07 worlds · 03 stages</div>
          <h2 className="ind__h">
            Built for brands that{" "}
            <span className="em-serif" style={{color:"var(--mmc-blue)"}}>sell something</span>{" "}
            to someone.
          </h2>
          <p className="ind__lead">
            We don't claim to know every industry. We know commerce, the physics of
            how someone moves from never-heard-of-you to buying again. That logic
            translates across the worlds below, and across every stage of the climb.
          </p>
        </div>

        {/* Stages strip, 0→1 / 1→10 / 10→100 */}
        <div className="ind__stages">
          <div className="ind__stages-head">
            <span className="ind__stages-eyebrow">From zero to one hundred</span>
            <span className="ind__stages-line"></span>
            <span className="ind__stages-meta">Pick your stage</span>
          </div>
          <div className="ind__stages-row">
            {stages.map((s) => (
              <button key={s.key}
                      className={"ind__stage " + (stage === s.key ? "is-active" : "")}
                      onMouseEnter={() => setStage(s.key)}
                      onClick={() => setStage(s.key)}>
                <div className="ind__stage-head">
                  <span className="ind__stage-label">{s.label}</span>
                  <span className="ind__stage-tag">{s.tag}</span>
                </div>
                <p className="ind__stage-desc">{s.desc}</p>
                <div className="ind__stage-foot">
                  <div className="ind__stage-stat">
                    <span className="num">{s.stat}</span>
                    <span className="lbl">{s.statLbl}</span>
                  </div>
                  <div className="ind__stage-range">{s.range}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="ind__grid">
          {/* Left, visual panel */}
          <div className="ind__panel">
            <div className={"ind__art ind__art--" + current.art} key={current.name}>
              <span className="ind__art-grain" aria-hidden="true"></span>

              {/* Top, meta */}
              <div className="ind__art-top">
                <span className="ind__art-n">{current.n}</span>
                <span className="ind__art-live">
                  <span className="dot"></span>
                  Now showing
                </span>
              </div>

              {/* Center, giant mark + brand name */}
              <div className="ind__art-center">
                <div className="ind__art-mark" aria-hidden="true">{current.mark}</div>
                <div className="ind__art-title">{current.name}</div>
                <div className="ind__art-detail">{current.detail}</div>
              </div>

              {/* Bottom, the services we run in this world */}
              <div className="ind__art-brands">
                <div className="ind__art-brands-label">What we run</div>
                <div className="ind__art-brands-row">
                  {current.mix.map((b, i) => (
                    <React.Fragment key={b}>
                      <span className="ind__art-brand">{b}</span>
                      {i < current.mix.length - 1 && <span className="ind__art-brand-sep"></span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Stat bar below art */}
            <div className="ind__stat">
              <div className="ind__stat-num">{current.stat.num}</div>
              <div className="ind__stat-lbl">{current.stat.lbl}</div>
            </div>
          </div>

          {/* Right, list */}
          <ol className="ind__list">
            {list.map((it, i) => (
              <li
                key={it.name}
                className={"ind__item " + (active === i ? "is-active" : "")}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <a href={"#ind-" + it.n}>
                  <span className="ind__item-n">{it.n}</span>
                  <span className="ind__item-body">
                    <span className="ind__item-name">{it.name}</span>
                    <span className="ind__item-detail">{it.detail}</span>
                  </span>
                  <span className="ind__item-arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22">
                      <path d="M 7 12 L 17 12 M 13 7 L 18 12 L 13 17"
                            fill="none" stroke="currentColor" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <style>{`
        .ind {
          position: relative;
          z-index: 1;
          padding: clamp(56px, 7vw, 96px) 0;
        }
        .ind__head {
          max-width: 880px;
          margin-bottom: clamp(40px, 5vw, 56px);
        }

        /* ---- Stages strip ---- */
        .ind__stages {
          margin-bottom: clamp(48px, 6vw, 80px);
          padding-bottom: clamp(40px, 5vw, 56px);
          border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.18);
        }
        .ind__stages-head {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 22px;
        }
        .ind__stages-eyebrow {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--mmc-yellow);
        }
        .ind__stages-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(var(--mmc-blue-rgb), 0.18), transparent);
        }
        .ind__stages-meta {
          font-family: var(--font-body);
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--fg-3);
        }
        .ind__stages-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(12px, 1.4vw, 18px);
        }
        .ind__stage {
          text-align: left;
          padding: clamp(20px, 2.4vw, 28px);
          background: rgba(255,255,255,0.86);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          color: var(--fg-1);
          cursor: pointer;
          font: inherit;
          backdrop-filter: blur(12px);
          transition: transform var(--dur-base) var(--ease-out),
                      border-color var(--dur-base) var(--ease-out),
                      background var(--dur-base) var(--ease-out),
                      box-shadow var(--dur-base) var(--ease-out);
          position: relative;
          overflow: hidden;
        }
        .ind__stage::before {
          content: "";
          position: absolute;
          left: 0; top: 0;
          width: 0; height: 2px;
          background: var(--mmc-yellow);
          transition: width 600ms var(--ease-out);
        }
        .ind__stage:hover, .ind__stage.is-active {
          background: rgba(255,255,255,0.94);
          border-color: rgba(var(--mmc-blue-rgb), 0.22);
          transform: translateY(-2px);
          box-shadow: var(--shadow-2);
        }
        .ind__stage.is-active::before { width: 100%; }
        .ind__stage-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 12px;
        }
        .ind__stage-label {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(28px, 3.4vw, 42px);
          letter-spacing: -0.03em;
          line-height: 1;
          color: var(--mmc-blue);
        }
        .ind__stage-tag {
          font-family: var(--font-body);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--fg-3);
        }
        .ind__stage-desc {
          font-family: var(--font-body);
          font-size: 13.5px;
          line-height: 1.5;
          color: var(--fg-2);
          margin: 0;
          flex: 1;
        }
        .ind__stage-foot {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 14px;
          padding-top: 14px;
          border-top: 1px dashed rgba(var(--mmc-blue-rgb), 0.18);
        }
        .ind__stage-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .ind__stage-stat .num {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(20px, 2vw, 26px);
          letter-spacing: -0.025em;
          color: var(--mmc-blue);
          font-variant-numeric: tabular-nums;
          line-height: 1;
        }
        .ind__stage-stat .lbl {
          font-family: var(--font-body);
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--fg-3);
        }
        .ind__stage-range {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--fg-3);
          text-align: right;
        }
        .ind__h {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(34px, 4.4vw, 60px);
          line-height: 1.04;
          letter-spacing: -0.03em;
          margin: 18px 0 22px;
          color: var(--fg-1);
        }
        .ind__lead {
          font-family: var(--font-body);
          font-size: clamp(16px, 1.2vw, 19px);
          line-height: 1.55;
          color: var(--fg-2);
          max-width: 620px;
          margin: 0;
        }

        .ind__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(28px, 4vw, 64px);
          align-items: start;
        }

        /* ---- Left visual panel ---- */
        .ind__panel {
          position: sticky;
          top: 100px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .ind__art {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          isolation: isolate;
          aspect-ratio: 4 / 5;
          padding: clamp(24px, 3vw, 36px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          animation: indArtFade 580ms var(--ease-out) both;
        }
        @keyframes indArtFade {
          from { opacity: 0; transform: translateY(8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .ind__art-grain {
          position: absolute; inset: 0;
          opacity: 0.16;
          mix-blend-mode: multiply;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          pointer-events: none;
        }
        /* Industry-specific surfaces */
        .ind__art--blush {
          background:
            radial-gradient(ellipse 80% 60% at 30% 30%, rgba(255,255,255,0.55), transparent 60%),
            linear-gradient(135deg, #F6CDB4, #DC8E73);
          color: var(--mmc-blue-700);
        }
        .ind__art--azure {
          background:
            radial-gradient(ellipse 70% 50% at 70% 20%, rgba(255,255,255,0.32), transparent 60%),
            linear-gradient(135deg, var(--mmc-blue), #356CC9);
          color: #fff;
        }
        .ind__art--ochre {
          background:
            radial-gradient(ellipse 80% 60% at 30% 70%, rgba(255,255,255,0.42), transparent 60%),
            linear-gradient(135deg, #E8C778, #C49230);
          color: var(--mmc-blue-700);
        }
        .ind__art--sage {
          background:
            radial-gradient(ellipse 80% 60% at 60% 30%, rgba(255,255,255,0.35), transparent 60%),
            linear-gradient(135deg, #C9D3B8, #7F9A6A);
          color: var(--mmc-blue-700);
        }
        .ind__art--graphite {
          background:
            radial-gradient(ellipse 70% 50% at 20% 20%, rgba(255,255,255,0.16), transparent 60%),
            linear-gradient(135deg, #2D3748, #1A1F2C);
          color: #fff;
        }
        .ind__art--wine {
          background:
            radial-gradient(ellipse 80% 60% at 80% 30%, rgba(255,255,255,0.18), transparent 60%),
            linear-gradient(135deg, #7A2A3A, #4A1721);
          color: #fff;
        }
        .ind__art--violet {
          background:
            radial-gradient(ellipse 80% 60% at 30% 30%, rgba(255,255,255,0.32), transparent 60%),
            linear-gradient(135deg, #D5C5E8, #7E63A8);
          color: var(--mmc-blue-700);
        }

        .ind__art-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        .ind__art-n {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.18em;
          color: currentColor;
          opacity: 0.7;
        }
        .ind__art-live {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 5px 10px 5px 8px;
          border-radius: 999px;
          background: rgba(255,255,255,0.22);
          backdrop-filter: blur(6px);
          color: currentColor;
        }
        .ind__art-live .dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--mmc-yellow);
          box-shadow: 0 0 0 3px rgba(var(--mmc-yellow-rgb), 0.25);
        }

        .ind__art-center {
          position: relative;
          z-index: 1;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: 4px;
          padding: 16px 0;
        }
        .ind__art-mark {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(120px, 18vw, 240px);
          line-height: 0.82;
          letter-spacing: -0.06em;
          color: currentColor;
          opacity: 0.92;
          margin-bottom: 14px;
        }
        .ind__art-title {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(22px, 2.4vw, 32px);
          letter-spacing: -0.02em;
          color: currentColor;
        }
        .ind__art-detail {
          font-family: var(--font-body);
          font-style: italic;
          font-size: 14px;
          opacity: 0.78;
        }

        .ind__art-brands {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.22);
        }
        .ind__art--blush .ind__art-brands,
        .ind__art--ochre .ind__art-brands,
        .ind__art--sage .ind__art-brands,
        .ind__art--violet .ind__art-brands {
          border-top-color: rgba(20, 55, 105, 0.22);
        }
        .ind__art-brands-label {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          opacity: 0.7;
        }
        .ind__art-brands-row {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 0;
          row-gap: 8px;
        }
        .ind__art-brand {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 13px;
          letter-spacing: -0.005em;
          padding: 0 12px;
          opacity: 0.92;
        }
        .ind__art-brand:first-child { padding-left: 0; }
        .ind__art-brand-sep {
          display: inline-block;
          width: 1px;
          height: 12px;
          background: currentColor;
          opacity: 0.3;
        }

        .ind__stat {
          display: flex;
          align-items: baseline;
          gap: 16px;
          padding: 18px 22px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          border-radius: 12px;
        }
        .ind__stat-num {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(32px, 3.6vw, 48px);
          line-height: 0.95;
          letter-spacing: -0.03em;
          color: var(--mmc-blue);
          font-variant-numeric: tabular-nums;
        }
        .ind__stat-lbl {
          font-family: var(--font-body);
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--fg-3);
          max-width: 200px;
          line-height: 1.4;
        }

        /* ---- Right list ---- */
        .ind__list {
          list-style: none;
          margin: 0; padding: 0;
        }
        .ind__item {
          border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.18);
          cursor: pointer;
        }
        .ind__item:last-child {
          border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.18);
        }
        .ind__item a {
          display: grid;
          grid-template-columns: 44px 1fr auto;
          gap: 18px;
          align-items: center;
          padding: clamp(20px, 2.4vw, 28px) 4px;
          color: var(--fg-1);
          transition: padding var(--dur-base) var(--ease-out);
          position: relative;
        }
        .ind__item:hover a,
        .ind__item.is-active a { padding-left: 20px; }
        .ind__item.is-active {
          background: rgba(var(--mmc-blue-rgb), 0.04);
        }
        .ind__item-n {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.18em;
          color: var(--mmc-yellow);
        }
        .ind__item-body {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .ind__item-name {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(22px, 2.4vw, 32px);
          letter-spacing: -0.025em;
          line-height: 1.05;
          color: var(--fg-1);
          transition: color var(--dur-base) var(--ease-out);
        }
        .ind__item.is-active .ind__item-name,
        .ind__item:hover .ind__item-name { color: var(--mmc-blue); }
        .ind__item-detail {
          font-family: var(--font-body);
          font-size: 12.5px;
          color: var(--fg-3);
        }
        .ind__item-arrow {
          color: rgba(var(--mmc-blue-rgb), 0.3);
          transition: transform var(--dur-base) var(--ease-out),
                      color var(--dur-base) var(--ease-out);
        }
        .ind__item.is-active .ind__item-arrow,
        .ind__item:hover .ind__item-arrow {
          transform: translateX(6px);
          color: var(--mmc-blue);
        }

        @media (max-width: 900px) {
          .ind__grid { grid-template-columns: 1fr; gap: 32px; }
          .ind__panel { position: static; }
          .ind__art { aspect-ratio: 5 / 4; }
          .ind__stages-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

window.Industries = Industries;
