/* service-detail/SdHow.jsx, How we approach Meta */

function SdHow() {
  const pillars = [
    {
      n: "01", title: "Full-funnel structure",
      desc: "Three campaign objectives. Audiences pre-mapped to intent. Budgets balanced for cohort acquisition, not just last-click conversions.",
      points: ["Prospecting · 60–70% of spend", "Mid-funnel retargeting · 15–20%", "Conversion + brand search · 10–15%"]
    },
    {
      n: "02", title: "Creative as the lever",
      desc: "We ship 60–80 new creatives per month per brand. Hooks tested in the first 3 seconds. Winning formats turned into evergreen modules.",
      points: ["UGC · 50% of volume", "Static + motion · 30%", "Iterations of winners · 20%"]
    },
    {
      n: "03", title: "Cohort-led optimization",
      desc: "We optimize against 90-day LTV by acquisition cohort, not 7-day ROAS. Every campaign carries a cohort tag through GA4 and Shopify.",
      points: ["D7, D30, D90 cohort views", "Channel-attributed LTV", "Cohort CAC ceiling per channel"]
    },
    {
      n: "04", title: "Measurement integrity",
      desc: "Server-side Conversion API. Triangulated against GA4 and your platform of record. Weekly modeled vs. measured drift report.",
      points: ["CAPI · server-side events", "GA4 + platform triangulation", "Weekly drift report"]
    },
  ];

  return (
    <section className="sdh">
      <div className="container">
        <header className="sdh__head">
          <div className="eyebrow">How we run Meta</div>
          <h2 className="sdh__h">
            Four pillars.{" "}
            <span className="em-serif" style={{color:"var(--mmc-blue)"}}>Every one</span>{" "}
            of them, on every brand.
          </h2>
          <p className="sdh__lead">
            Most agencies sell creative or media or measurement. We run all three as one
            interconnected system because Meta's algorithm rewards exactly that.
          </p>
        </header>

        <ol className="sdh__grid">
          {pillars.map((p) => (
            <li key={p.n} className="sdh__pillar">
              <div className="sdh__pillar-head">
                <span className="sdh__pillar-n">{p.n}</span>
                <h3 className="sdh__pillar-title">{p.title}</h3>
              </div>
              <p className="sdh__pillar-desc">{p.desc}</p>
              <ul className="sdh__pillar-points">
                {p.points.map((pt) => <li key={pt}>{pt}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      </div>

      <style>{`
        .sdh { position: relative; z-index: 1; padding: clamp(56px, 8vw, 112px) 0; }
        .sdh__head { max-width: 880px; margin-bottom: clamp(40px, 5vw, 64px); }
        .sdh__h {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(30px, 3.8vw, 52px); letter-spacing: -0.025em; line-height: 1.06;
          margin: 18px 0 14px;
        }
        .sdh__lead { font-family: var(--font-body); font-size: 17px; line-height: 1.55; color: var(--fg-2); margin: 0; max-width: 580px; }

        .sdh__grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: clamp(16px, 1.8vw, 24px); }
        .sdh__pillar {
          background: rgba(255,255,255,0.78); backdrop-filter: blur(14px);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          border-radius: 14px;
          padding: clamp(24px, 2.6vw, 32px);
          display: flex; flex-direction: column; gap: 14px;
          position: relative; overflow: hidden;
          transition: transform var(--dur-base) var(--ease-out),
                      box-shadow var(--dur-base) var(--ease-out),
                      border-color var(--dur-base) var(--ease-out),
                      background var(--dur-base) var(--ease-out);
        }
        .sdh__pillar::before {
          content: "";
          position: absolute; left: 0; top: 0;
          width: 0; height: 2px;
          background: var(--mmc-yellow);
          transition: width 600ms var(--ease-out);
        }
        .sdh__pillar:hover {
          transform: translateY(-3px);
          background: rgba(255,255,255,0.96);
          border-color: rgba(var(--mmc-blue-rgb), 0.22);
          box-shadow: var(--shadow-2);
          position: relative; z-index: 2;
        }
        .sdh__pillar:hover::before { width: 100%; }
        .sdh__pillar:hover .sdh__pillar-title { color: var(--mmc-blue); }
        .sdh__pillar:hover .sdh__pillar-n { transform: translateX(4px); }
        .sdh__pillar-head { display: flex; align-items: center; gap: 14px; padding-bottom: 14px; border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.10); }
        .sdh__pillar-n { font-family: var(--font-display); font-weight: 700; font-size: 13px; letter-spacing: 0.18em; color: var(--mmc-yellow); transition: transform var(--dur-base) var(--ease-out); }
        .sdh__pillar-title { font-family: var(--font-display); font-weight: 700; font-size: clamp(22px, 2vw, 28px); letter-spacing: -0.025em; color: var(--fg-1); margin: 0; line-height: 1.1; transition: color var(--dur-base) var(--ease-out); }
        .sdh__pillar-desc { font-family: var(--font-body); font-size: 14.5px; line-height: 1.6; color: var(--fg-2); margin: 0; }
        .sdh__pillar-points { list-style: none; margin: 4px 0 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
        .sdh__pillar-points li {
          font-family: var(--font-body); font-size: 13px; color: var(--fg-2); font-weight: 500;
          padding-left: 18px; position: relative;
        }
        .sdh__pillar-points li::before {
          content: "";
          position: absolute; left: 0; top: 8px;
          width: 10px; height: 1px;
          background: var(--mmc-yellow);
        }

        @media (max-width: 720px) { .sdh__grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

window.SdHow = SdHow;
