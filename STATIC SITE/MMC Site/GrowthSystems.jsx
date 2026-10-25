/* GrowthSystems.jsx, "Growth Systems Built For Modern Brands"
   Six service categories from the sitemap, in a 3x2 grid of cards.
   Each card: roman number, glyph, category, sub-services, growth metric. */

function GrowthSystems({ onAudit }) {
  const [industry, setIndustry] = React.useState("all");

  const industries = [
    { id: "all",    label: "All industries" },
    { id: "d2c",    label: "D2C" },
    { id: "health", label: "Healthcare" },
    { id: "real",   label: "Real Estate" },
    { id: "edu",    label: "Education" },
    { id: "saas",   label: "SaaS" },
    { id: "hosp",   label: "Hospitality" },
    { id: "start",  label: "Startups" },
  ];

  // For each industry, the 3 most strategic systems in priority order.
  const priorityMap = {
    d2c:    ["revenue",   "content",   "tech"],
    health: ["organic",   "tech",      "revenue"],
    real:   ["revenue",   "brand",     "organic"],
    edu:    ["organic",   "content",   "tech"],
    saas:   ["organic",   "revenue",   "tech"],
    hosp:   ["revenue",   "content",   "brand"],
    start:  ["brand",     "tech",      "revenue"],
  };
  const priorities = priorityMap[industry] || [];
  const activeName = industries.find((i) => i.id === industry)?.label;

  const systems = [
    {
      n: "I", id: "revenue", label: "Revenue Accelerators",
      desc: "Performance media that compounds, not just spends.",
      items: ["Performance Marketing · D2C", "Lead Generation · B2B", "Meta · Google · Amazon Ads"],
      metric: "8.7×", metricLbl: "Median blended ROAS",
      glyph: (
        <svg viewBox="0 0 60 60" width="48" height="48" aria-hidden="true">
          <path d="M 6 50 L 22 36 L 32 42 L 54 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 44 14 L 54 14 L 54 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="22" cy="36" r="2.5" fill="currentColor"/>
          <circle cx="32" cy="42" r="2.5" fill="currentColor"/>
        </svg>
      )
    },
    {
      n: "II", id: "organic", label: "Organic Growth Engines",
      desc: "Search authority + on-site conversion architecture.",
      items: ["SEO Strategy", "CRO for Website"],
      metric: "+412%", metricLbl: "Avg. organic traffic · 12mo",
      glyph: (
        <svg viewBox="0 0 60 60" width="48" height="48" aria-hidden="true">
          <circle cx="24" cy="24" r="14" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M 35 35 L 50 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M 18 24 L 30 24 M 24 18 L 24 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      n: "III", id: "brand", label: "Brand Foundation Builders",
      desc: "Identity, UX, and product systems that earn memory.",
      items: ["Logo & Brand Identity", "UI/UX Systems", "Packaging · Strategy"],
      metric: "100%", metricLbl: "In-house design studio",
      glyph: (
        <svg viewBox="0 0 60 60" width="48" height="48" aria-hidden="true">
          <rect x="10" y="10" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M 10 30 L 50 30 M 30 10 L 30 50" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
          <circle cx="30" cy="30" r="8" fill="currentColor"/>
        </svg>
      )
    },
    {
      n: "IV", id: "tech", label: "Technology Drivers",
      desc: "Storefronts and apps that load fast and convert harder.",
      items: ["Shopify · Ecommerce Development", "Website Development", "Mobile App Development"],
      metric: "1.4s", metricLbl: "Avg. LCP · production",
      glyph: (
        <svg viewBox="0 0 60 60" width="48" height="48" aria-hidden="true">
          <rect x="8" y="14" width="44" height="32" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M 8 22 L 52 22" stroke="currentColor" strokeWidth="2"/>
          <circle cx="14" cy="18" r="1.2" fill="currentColor"/>
          <circle cx="18" cy="18" r="1.2" fill="currentColor"/>
          <path d="M 18 32 L 24 38 L 18 44 M 30 44 L 42 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      )
    },
    {
      n: "V", id: "content", label: "Content Magnets",
      desc: "UGC, video, and creator systems for modern distribution.",
      items: ["UGC Content · Video Production", "Social Media Creatives", "Influencer Marketing"],
      metric: "240+", metricLbl: "Creative units shipped / mo",
      glyph: (
        <svg viewBox="0 0 60 60" width="48" height="48" aria-hidden="true">
          <rect x="10" y="14" width="40" height="32" rx="3" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M 26 22 L 26 38 L 40 30 Z" fill="currentColor"/>
        </svg>
      )
    },
  ];

  return (
    <section id="services" className="gs" data-screen-label="03 Growth Systems">
      <div className="container">
        <header className="gs__head">
          <div className="eyebrow">Growth systems · 05 surfaces</div>
          <h2 className="gs__h">
            Five systems. <span className="em-serif" style={{color:"var(--mmc-blue)"}}>One engine.</span>
            <br/>
            Built for brands that mean to compound.
          </h2>
          <p className="gs__lead">
            Modern growth isn't a channel mix, it's an operating system.
            We design, ship, and run all six layers so each one feeds the next.
          </p>
        </header>

        {/* Industry filter, unified site-wide chip style */}
        <div className="gs__filter">
          <div className="gs__filter-group">
            <span className="gs__filter-label">Industry</span>
            <div className="gs__chips">
              {industries.map((ind) => (
                <button
                  key={ind.id}
                  className={"gs__chip " + (industry === ind.id ? "is-on" : "")}
                  onClick={() => setIndustry(ind.id)}>
                  {ind.label}
                </button>
              ))}
            </div>
          </div>
          {industry !== "all" && (
            <div className="gs__filter-active">
              Priority systems for <strong>{activeName}</strong>
            </div>
          )}
        </div>

        <ol className="gs__grid">
          {systems.map((s, i) => {
            const priorityRank = priorities.indexOf(s.id);
            const isPriority = priorityRank >= 0;
            const isFiltered = industry !== "all";
            return (
              <li className={
                "gs__card " +
                (isFiltered && isPriority ? "is-priority " : "") +
                (isFiltered && !isPriority ? "is-dim" : "")
              } key={s.id} style={{ "--i": i }}>
                <a href={"#" + s.id} className="gs__card-inner">
                  <div className="gs__card-top">
                    <span className="gs__card-n">{s.n}</span>
                    {isFiltered && isPriority && (
                      <span className="gs__card-priority">
                        Priority {priorityRank + 1} for {activeName}
                      </span>
                    )}
                    {!isFiltered && (
                      <span className="gs__card-arrow" aria-hidden="true">
                        <svg viewBox="0 0 22 22" width="20" height="20">
                          <path d="M 6 16 L 16 6 M 8 6 H 16 V 14"
                                fill="none" stroke="currentColor" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    )}
                  </div>
                  <div className="gs__card-glyph">{s.glyph}</div>
                  <h3 className="gs__card-h">{s.label}</h3>
                  <p className="gs__card-desc">{s.desc}</p>
                  <ul className="gs__card-list">
                    {s.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                  <div className="gs__card-metric">
                    <span className="gs__card-metric-num"><window.Num value={s.metric} /></span>
                    <span className="gs__card-metric-lbl">{s.metricLbl}</span>
                  </div>
                </a>
              </li>
            );
          })}
        </ol>

        <div className="gs__cta">
          <span className="gs__cta-line"></span>
          <button className="btn btn--primary glow-btn" onClick={onAudit}>
            <span className="glow-btn__glow" aria-hidden="true"></span>
            <span className="glow-btn__inner">
              See where your engine leaks
              <span className="arrow"></span>
            </span>
          </button>
          <span className="gs__cta-line"></span>
        </div>
      </div>

      <style>{`
        .gs {
          position: relative;
          z-index: 1;
          padding: clamp(56px, 7vw, 96px) 0;
        }
        .gs__head {
          max-width: 900px;
          margin-bottom: clamp(48px, 6vw, 80px);
        }
        .gs__h {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(34px, 4.6vw, 64px);
          line-height: 1.04;
          letter-spacing: -0.03em;
          margin: 18px 0 22px;
          color: var(--fg-1);
        }
        .gs__lead {
          font-family: var(--font-body);
          font-size: clamp(16px, 1.2vw, 19px);
          line-height: 1.55;
          color: var(--fg-2);
          max-width: 620px;
          margin: 0;
        }

        /* ---- Industry filter, unified site-wide chip style ---- */
        .gs__filter {
          display: flex; flex-direction: column; gap: 14px;
          margin: clamp(36px, 4.5vw, 56px) 0 clamp(24px, 3vw, 36px);
          padding: 18px 20px;
          background: rgba(255,255,255,0.6);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          border-radius: 14px;
          backdrop-filter: blur(8px);
        }
        .gs__filter-group { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
        .gs__filter-label {
          font-family: var(--font-body); font-size: 10px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase; color: var(--mmc-yellow);
          min-width: 92px;
        }
        .gs__filter-active {
          font-family: var(--font-body); font-size: 11.5px; color: var(--fg-3);
          padding-left: 106px;
          animation: gsFade 320ms var(--ease-out);
        }
        .gs__filter-active strong { color: var(--mmc-blue); font-weight: 700; }
        @keyframes gsFade {
          from { opacity: 0; transform: translateX(-6px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .gs__chips { display: flex; gap: 6px; flex-wrap: wrap; }
        .gs__chip {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-body); font-size: 12px; font-weight: 600;
          padding: 8px 14px; border-radius: 999px;
          background: #fff;
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.16);
          color: var(--fg-1); cursor: pointer;
          transition: all var(--dur-base) var(--ease-out);
        }
        .gs__chip:hover { border-color: var(--mmc-blue); color: var(--mmc-blue); }
        .gs__chip.is-on {
          background: var(--mmc-yellow);
          color: var(--mmc-blue-700);
          border-color: var(--mmc-yellow);
          box-shadow: 0 6px 18px -8px rgba(var(--mmc-yellow-rgb), 0.55);
          font-weight: 700;
        }
        @media (max-width: 720px) {
          .gs__filter-active { padding-left: 0; }
        }

        .gs__grid {
          list-style: none;
          margin: 0; padding: 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 1.8vw, 28px);
        }
        .gs__card {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(14px) saturate(140%);
          -webkit-backdrop-filter: blur(14px) saturate(140%);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.12);
          border-radius: 16px;
          overflow: hidden;
          transition: transform var(--dur-base) var(--ease-out),
                      box-shadow var(--dur-base) var(--ease-out),
                      border-color var(--dur-base) var(--ease-out),
                      background var(--dur-base) var(--ease-out);
          position: relative;
        }
        .gs__card::before {
          content: "";
          position: absolute;
          left: 0; top: 0;
          height: 2px; width: 0;
          background: var(--mmc-yellow);
          transition: width var(--dur-slow) var(--ease-out);
        }
        .gs__card:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.92);
          border-color: rgba(var(--mmc-blue-rgb), 0.18);
          box-shadow: var(--shadow-3);
          position: relative; z-index: 2;
        }
        .gs__card:hover::before { width: 100%; }
        .gs__card:hover .gs__card-arrow { transform: translate(4px, -4px); color: var(--mmc-blue); }
        .gs__card:hover .gs__card-glyph { color: var(--mmc-blue); }

        .gs__card.is-priority {
          background: rgba(255, 255, 255, 0.96);
          border-color: var(--mmc-yellow);
          box-shadow: var(--shadow-2), 0 0 0 2px rgba(var(--mmc-yellow-rgb), 0.16);
        }
        .gs__card.is-priority::before { width: 100%; }
        .gs__card.is-dim {
          opacity: 0.42;
          filter: grayscale(20%);
        }
        .gs__card.is-dim:hover {
          opacity: 1;
          filter: none;
        }
        .gs__card-priority {
          font-family: var(--font-body);
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--mmc-blue-700);
          background: var(--mmc-yellow);
          padding: 5px 10px;
          border-radius: 999px;
          line-height: 1;
        }

        .gs__card-inner {
          display: flex;
          flex-direction: column;
          padding: 28px 26px 24px;
          color: var(--fg-1);
          height: 100%;
          gap: 16px;
        }
        .gs__card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }
        .gs__card-n {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.18em;
          color: var(--mmc-yellow);
        }
        .gs__card-arrow {
          color: rgba(var(--mmc-blue-rgb), 0.4);
          transition: transform var(--dur-base) var(--ease-out),
                      color var(--dur-base) var(--ease-out);
        }
        .gs__card-glyph {
          color: var(--mmc-blue-700);
          transition: color var(--dur-base) var(--ease-out);
          margin-bottom: 4px;
        }
        .gs__card-h {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(22px, 1.9vw, 28px);
          letter-spacing: -0.02em;
          line-height: 1.12;
          color: var(--fg-1);
          margin: 0;
        }
        .gs__card-desc {
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.5;
          color: var(--fg-2);
          margin: 0;
        }
        .gs__card-list {
          list-style: none;
          margin: 4px 0 auto;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .gs__card-list li {
          font-family: var(--font-body);
          font-size: 12.5px;
          color: var(--fg-3);
          letter-spacing: 0.01em;
          padding-left: 14px;
          position: relative;
        }
        .gs__card-list li::before {
          content: "";
          position: absolute;
          left: 0; top: 9px;
          width: 6px; height: 1px;
          background: var(--mmc-blue);
          opacity: 0.4;
        }
        .gs__card-metric {
          display: flex;
          align-items: baseline;
          gap: 10px;
          padding-top: 16px;
          margin-top: 4px;
          border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
        }
        .gs__card-metric-num {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 22px;
          letter-spacing: -0.02em;
          color: var(--mmc-blue);
          font-variant-numeric: tabular-nums;
        }
        .gs__card-metric-lbl {
          font-family: var(--font-body);
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--fg-3);
        }

        .gs__cta {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-top: clamp(48px, 6vw, 80px);
        }
        .gs__cta-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(var(--mmc-blue-rgb), 0.18), transparent);
        }

        @media (max-width: 880px) {
          .gs__grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .gs__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

window.GrowthSystems = GrowthSystems;
