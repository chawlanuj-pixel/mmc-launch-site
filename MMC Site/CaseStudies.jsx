/* CaseStudies.jsx, "Real brands. The systems we run for them."
   Sticky-stack treatment: cards pin at staggered offsets so they
   deal themselves onto the screen as the user scrolls.

   Data source: content/clients.json. Name, type and service mix only.
   MMC has supplied no per-client performance figures, so no card carries one. */

function CaseStudies() {
  const studies = [
    {
      brand: "The Growing Giraffe", type: "D2C",
      scope: "A full-stack D2C engagement: conversion work on the store, the media and creative over it, and the marketplace and quick-commerce shelves, run by one pod.",
      art: "blush", mark: "GG",
      services: [
        "Conversion rate optimisation",
        "Performance ads, D2C",
        "Performance creative",
        "Amazon",
        "Quick commerce",
      ]
    },
    {
      brand: "Panda Cabs", type: "B2C",
      scope: "A B2C booking funnel: the website first, then the lead generation running on top of it, with creative and social carrying it.",
      art: "azure", mark: "PC",
      services: [
        "Website redesign and development",
        "Lead generation",
        "Performance creative",
        "Social media",
      ]
    },
    {
      brand: "Bloom Edutours", type: "B2B",
      scope: "A B2B pipeline build: the website first, then lead generation, with creative and social carrying the story to the people who buy.",
      art: "ochre", mark: "BE",
      services: [
        "Website redesign and development",
        "Lead generation",
        "Performance creative",
        "Social media",
      ]
    },
  ];

  return (
    <section id="work" className="cs" data-screen-label="04 Case Studies">
      <div className="container">
        <header className="cs__head">
          <div className="cs__head-l">
            <div className="eyebrow">Real brands · Real scopes</div>
            <h2 className="cs__h">
              The work, <span className="em-serif" style={{color:"var(--mmc-blue)"}}>brand</span>{" "}
              by <span className="em-serif" style={{color:"var(--mmc-yellow)"}}>brand</span>.
            </h2>
            <p className="cs__lead">
              Three of the twenty-four. Scroll to deal them out.
              Each card stacks on the last, the way a client book builds.
            </p>
          </div>
          <a className="cs__head-link" href="Our Work.html">
            <span>All 24 brands</span>
            <span className="arrow"></span>
          </a>
        </header>

        <div className="cs__stack">
          {studies.map((s, i) => (
            <article
              key={s.brand}
              className="cs__card"
              style={{
                "--i": i,
                top: `${100 + i * 28}px`,
                zIndex: 10 + i,
              }}
            >
              {/* Art panel */}
              <div className={"cs__art cs__art--" + s.art} aria-hidden="true">
                <span className="cs__art-grain"></span>
                <span className="cs__art-tag">{s.type}</span>
                <span className="cs__art-mark">{s.mark}</span>

                {/* Scope overlay, counted from the service mix */}
                <div className="cs__art-hero">
                  <div className="cs__art-hero-lbl">Workstreams live</div>
                  <div className="cs__art-hero-bar">
                    <span className="cs__art-hero-val">{String(s.services.length).padStart(2, "0")}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="cs__body">
                <div className="cs__body-top">
                  <span className="cs__num">{String(i + 1).padStart(2, "0")} / 03</span>
                  <span className="cs__tag">{s.type}</span>
                </div>
                <h3 className="cs__brand">{s.brand}</h3>

                <div className="cs__lines">
                  <p className="cs__line">
                    <span className="cs__lbl">Scope</span>
                    {s.scope}
                  </p>
                </div>

                {/* The service mix MMC actually runs for this brand */}
                <div className="cs__services">
                  <div className="cs__services-label">What we run</div>
                  <ul>
                    {s.services.map((sv) => <li key={sv}>{sv}</li>)}
                  </ul>
                </div>

                <a className="cs__read" href="Our Work.html">
                  See the client book
                  <span className="arrow"></span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .cs {
          position: relative;
          z-index: 1;
          padding: clamp(56px, 7vw, 96px) 0;
        }
        .cs__head {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: clamp(48px, 6vw, 72px);
          flex-wrap: wrap;
        }
        .cs__head-l { max-width: 760px; }
        .cs__h {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(34px, 4.6vw, 64px);
          line-height: 1.04;
          letter-spacing: -0.03em;
          margin: 18px 0 18px;
          color: var(--fg-1);
        }
        .cs__lead {
          font-family: var(--font-body);
          font-size: clamp(15px, 1.15vw, 18px);
          line-height: 1.55;
          color: var(--fg-2);
          max-width: 540px;
          margin: 0;
        }
        .cs__head-link {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding-bottom: 4px;
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--mmc-blue);
          border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.25);
          transition: border-color var(--dur-base) var(--ease-out);
        }
        .cs__head-link:hover { border-color: var(--mmc-blue); }
        .cs__head-link .arrow {
          width: 18px; height: 1.5px; background: currentColor; position: relative;
          transition: width var(--dur-base) var(--ease-out);
        }
        .cs__head-link .arrow::after {
          content: ""; position: absolute; right: -1px; top: -4px;
          width: 8px; height: 8px;
          border-top: 1.5px solid currentColor; border-right: 1.5px solid currentColor;
          transform: rotate(45deg);
        }
        .cs__head-link:hover .arrow { width: 28px; }

        /* ---- The sticky stack ---- */
        .cs__stack {
          position: relative;
          /* Last card has no margin so the section can end clean */
        }
        .cs__card {
          position: sticky;
          /* top set inline via style */
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 0;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.12);
          border-radius: 18px;
          overflow: hidden;
          box-shadow:
            0 20px 60px -28px rgba(17, 24, 39, 0.25),
            0 4px 12px -6px rgba(17, 24, 39, 0.08);
          margin-bottom: clamp(48px, 10vh, 120px);
          transition: transform 400ms var(--ease-out);
        }
        .cs__card:last-child { margin-bottom: 0; }

        /* ---- Art panel ---- */
        .cs__art {
          position: relative;
          min-height: 540px;
          overflow: hidden;
          isolation: isolate;
          padding: 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .cs__art--blush {
          background:
            radial-gradient(ellipse 80% 60% at 30% 30%, rgba(255,255,255,0.55), transparent 60%),
            linear-gradient(135deg, #F6CDB4, #DC8E73);
          color: var(--mmc-blue-700);
        }
        .cs__art--azure {
          background:
            radial-gradient(ellipse 70% 50% at 70% 20%, rgba(255,255,255,0.32), transparent 60%),
            linear-gradient(135deg, var(--mmc-blue), #356CC9);
          color: #fff;
        }
        .cs__art--ochre {
          background:
            radial-gradient(ellipse 80% 60% at 30% 70%, rgba(255,255,255,0.42), transparent 60%),
            linear-gradient(135deg, #E8C778, #C49230);
          color: var(--mmc-blue-700);
        }
        .cs__art-grain {
          position: absolute; inset: 0;
          opacity: 0.16;
          mix-blend-mode: multiply;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          pointer-events: none;
        }
        .cs__art-tag {
          font-family: var(--font-body);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: currentColor;
          background: rgba(255,255,255,0.22);
          padding: 6px 10px;
          border-radius: 999px;
          backdrop-filter: blur(8px);
          align-self: flex-start;
          z-index: 2;
        }
        .cs__art--azure .cs__art-tag {
          background: rgba(255,255,255,0.18);
        }
        .cs__art-mark {
          position: absolute;
          top: 24px;
          right: 32px;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(120px, 16vw, 220px);
          line-height: 0.82;
          letter-spacing: -0.06em;
          color: rgba(255,255,255,0.36);
          z-index: 1;
        }
        .cs__art--azure .cs__art-mark { color: rgba(255,255,255,0.22); }

        /* Hero metric overlay */
        .cs__art-hero {
          position: relative;
          z-index: 2;
          align-self: flex-start;
          padding: 18px 22px;
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(12px);
          border-radius: 12px;
          color: var(--mmc-blue-700);
          display: flex;
          flex-direction: column;
          gap: 4px;
          max-width: 88%;
        }
        .cs__art-hero-lbl {
          font-family: var(--font-body);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--fg-3);
        }
        .cs__art-hero-bar {
          display: inline-flex;
          align-items: baseline;
          gap: 12px;
          font-family: var(--font-display);
          font-weight: 700;
          font-variant-numeric: tabular-nums;
        }
        .cs__art-hero-val {
          font-size: clamp(32px, 3.8vw, 48px);
          color: var(--mmc-blue);
          letter-spacing: -0.03em;
          line-height: 1;
        }

        /* ---- Body ---- */
        .cs__body {
          padding: clamp(28px, 3vw, 44px);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .cs__body-top {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 2px;
        }
        .cs__num {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.18em;
          color: var(--mmc-yellow);
        }
        .cs__tag {
          font-family: var(--font-body);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--fg-3);
          padding-left: 14px;
          border-left: 1px solid rgba(var(--mmc-blue-rgb), 0.18);
        }
        .cs__brand {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(26px, 2.6vw, 38px);
          letter-spacing: -0.025em;
          line-height: 1.08;
          color: var(--fg-1);
          margin: 0;
        }
        .cs__lines { display: flex; flex-direction: column; gap: 8px; margin-top: 4px; }
        .cs__line {
          font-family: var(--font-body);
          font-size: 14.5px;
          line-height: 1.55;
          color: var(--fg-2);
          margin: 0;
        }
        .cs__lbl {
          font-family: var(--font-body);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--mmc-blue);
          display: inline-block;
          margin-right: 10px;
          padding-right: 10px;
          border-right: 1px solid rgba(var(--mmc-blue-rgb), 0.18);
        }

        .cs__services {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .cs__services-label {
          font-family: var(--font-body);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--mmc-yellow);
        }
        .cs__services ul {
          list-style: none;
          margin: 0; padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .cs__services li {
          font-family: var(--font-body);
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--mmc-blue-700);
          padding: 5px 10px;
          background: rgba(var(--mmc-blue-rgb), 0.06);
          border-radius: 999px;
        }

        .cs__read {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-top: auto;
          padding-top: 10px;
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--mmc-blue);
        }
        .cs__read .arrow {
          width: 18px; height: 1.5px; background: currentColor; position: relative;
          transition: width var(--dur-base) var(--ease-out);
        }
        .cs__read .arrow::after {
          content: ""; position: absolute; right: -1px; top: -4px;
          width: 8px; height: 8px;
          border-top: 1.5px solid currentColor; border-right: 1.5px solid currentColor;
          transform: rotate(45deg);
        }
        .cs__read:hover .arrow { width: 28px; }

        @media (max-width: 880px) {
          .cs__card { grid-template-columns: 1fr; }
          .cs__art { min-height: 280px; }
          .cs__art-mark { font-size: 110px; }
        }
      `}</style>
    </section>
  );
}

window.CaseStudies = CaseStudies;
