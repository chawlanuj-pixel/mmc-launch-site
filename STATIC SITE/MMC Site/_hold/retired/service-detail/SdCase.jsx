/* service-detail/SdCase.jsx, A featured engagement for this service.

   Brand, type and service mix come from content/clients.json. MMC has supplied
   no per-client performance figures, so this card shows scope, not results. */

function SdCase() {
  const services = [
    "Website redesign and development",
    "Performance ads, D2C",
    "Performance creative",
    "Social media",
  ];

  return (
    <section id="case" className="sdc">
      <div className="container">
        <header className="sdc__head">
          <div className="eyebrow">Featured engagement · D2C</div>
          <h2 className="sdc__h">
            Lepure.{" "}
            <span className="em-serif" style={{color:"var(--mmc-blue)"}}>Four</span>{" "}
            workstreams,{" "}
            <span className="em-serif" style={{color:"var(--mmc-yellow)"}}>one</span>{" "}
            pod.
          </h2>
        </header>

        <div className="sdc__grid">
          {/* Visual */}
          <div className="sdc__visual">
            <div className="sdc__visual-bg" aria-hidden="true">
              <span className="sdc__visual-grain"></span>
            </div>
            <div className="sdc__visual-tag">D2C</div>
            <div className="sdc__visual-mark">LP</div>

            <div className="sdc__visual-stat">
              <div className="lbl">Workstreams live</div>
              <div className="bar">
                <span className="val">{String(services.length).padStart(2, "0")}</span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="sdc__body">
            <div className="sdc__lines">
              <p><span className="lbl">The mix</span>
                MMC runs four workstreams for Lepure: the website, D2C performance ads,
                performance creative, and social media.
              </p>
              <p><span className="lbl">Where Meta sits</span>
                Inside that mix, not beside it. The pod that ships the creative also runs the
                buying, and the storefront the ads point at is ours to change in the same week.
              </p>
              <p><span className="lbl">What gets reported</span>
                A daily dashboard, a weekly call, and one blended view of spend and revenue.
                Account-level numbers belong to the client, so we don't publish them here.
              </p>
            </div>

            <div className="sdc__svcs">
              <div className="sdc__svcs-label">What we run</div>
              <ul>
                {services.map((sv) => <li key={sv}>{sv}</li>)}
              </ul>
            </div>

            <a className="sdc__read" href="Our Work.html">
              See the client book
              <span className="arrow"></span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .sdc { position: relative; z-index: 1; padding: clamp(56px, 8vw, 112px) 0; }
        .sdc__head { max-width: 1000px; margin-bottom: clamp(40px, 5vw, 56px); }
        .sdc__h {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(34px, 4.4vw, 60px); letter-spacing: -0.03em; line-height: 1.05;
          margin: 18px 0 0;
        }

        .sdc__grid { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 0; background: rgba(255,255,255,0.92); backdrop-filter: blur(14px); border: 1px solid rgba(var(--mmc-blue-rgb), 0.12); border-radius: 18px; overflow: hidden; box-shadow: var(--shadow-3); }

        .sdc__visual {
          position: relative; min-height: 520px; padding: 28px;
          background: radial-gradient(ellipse 80% 60% at 30% 30%, rgba(255,255,255,0.55), transparent 60%), linear-gradient(135deg, #F6CDB4, #DC8E73);
          display: flex; flex-direction: column; justify-content: space-between;
          color: var(--mmc-blue-700);
        }
        .sdc__visual-grain { position: absolute; inset: 0; opacity: 0.16; mix-blend-mode: multiply; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"); pointer-events: none; }
        .sdc__visual-tag { position: relative; z-index: 2; align-self: flex-start; font-family: var(--font-body); font-size: 10.5px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; padding: 6px 10px; background: rgba(255,255,255,0.55); border-radius: 999px; backdrop-filter: blur(8px); }
        .sdc__visual-mark { position: absolute; top: 28px; right: 32px; font-family: var(--font-display); font-weight: 800; font-size: 180px; line-height: 0.82; letter-spacing: -0.06em; color: rgba(255,255,255,0.65); z-index: 1; }
        .sdc__visual-stat { position: relative; z-index: 2; padding: 18px 22px; background: rgba(255,255,255,0.92); backdrop-filter: blur(12px); border-radius: 12px; max-width: 90%; }
        .sdc__visual-stat .lbl { font-family: var(--font-body); font-size: 10.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--fg-3); }
        .sdc__visual-stat .bar { display: inline-flex; align-items: baseline; gap: 12px; margin-top: 4px; font-family: var(--font-display); font-weight: 700; font-variant-numeric: tabular-nums; }
        .sdc__visual-stat .val { font-size: 48px; color: var(--mmc-blue); letter-spacing: -0.03em; line-height: 1; }

        .sdc__body { padding: clamp(28px, 3vw, 44px); display: flex; flex-direction: column; gap: 18px; }
        .sdc__lines { display: flex; flex-direction: column; gap: 14px; }
        .sdc__lines p { font-family: var(--font-body); font-size: 14.5px; line-height: 1.6; color: var(--fg-2); margin: 0; }
        .sdc__lines p .lbl {
          font-family: var(--font-body); font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--mmc-blue);
          display: inline-block; margin-right: 10px; padding-right: 10px;
          border-right: 1px solid rgba(var(--mmc-blue-rgb), 0.18);
        }
        .sdc__svcs { display: flex; flex-direction: column; gap: 10px; padding: 18px 0; border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.10); border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.10); margin: 4px 0; }
        .sdc__svcs-label { font-family: var(--font-body); font-size: 10.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--mmc-yellow); }
        .sdc__svcs ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px; }
        .sdc__svcs li { font-family: var(--font-body); font-size: 11.5px; font-weight: 600; letter-spacing: 0.04em; color: var(--mmc-blue-700); padding: 5px 10px; background: rgba(var(--mmc-blue-rgb), 0.06); border-radius: 999px; }
        .sdc__read { display: inline-flex; align-items: center; gap: 12px; margin-top: auto; padding-top: 10px; font-family: var(--font-body); font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--mmc-blue); }
        .sdc__read .arrow { width: 18px; height: 1.5px; background: currentColor; position: relative; transition: width var(--dur-base) var(--ease-out); }
        .sdc__read .arrow::after { content: ""; position: absolute; right: -1px; top: -4px; width: 8px; height: 8px; border-top: 1.5px solid currentColor; border-right: 1.5px solid currentColor; transform: rotate(45deg); }
        .sdc__read:hover .arrow { width: 28px; }

        @media (max-width: 880px) {
          .sdc__grid { grid-template-columns: 1fr; }
          .sdc__visual { min-height: 320px; }
          .sdc__visual-mark { font-size: 110px; }
        }
      `}</style>
    </section>
  );
}

window.SdCase = SdCase;
