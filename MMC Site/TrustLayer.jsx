/* TrustLayer.jsx, "Trusted By Fast-Growing Brands"
   Marquee of client names + three big metrics + industries strip. */

function TrustLayer() {
  /* Source of truth: content/clients.json. Names only, no per-brand numbers. */
  const clients = [
    "Bloom Edutours", "Sprouts Edu Tours", "NM Consultings",
    "Skyfling Technologies", "Lepure", "The Growing Giraffe",
    "Mittiy Made", "AwwBaby", "Sprnt", "Vaga Kids",
    "MyBrownButters", "Notic", "OOsh", "Panda Cabs",
    "MVJ College of Engineering",
    "Anchor by Panasonic", "Flomate", "Green Hermitage", "Housing.com", "JSW", "LearningMate", "Rustomjee", "Saint-Gobain", "Gyproc"
  ];
  const stats = [
    { num: "₹248", suffix: "Cr+", lbl: "Revenue compounded since 2019" },
    { num: "8.7", suffix: "×",   lbl: "Median blended ROAS · last 12 months" },
    { num: "14",  suffix: "/14", lbl: "Brands renewed last year" },
    { num: "4",   suffix: "",    lbl: "Countries · India · UAE · UK · US" },
  ];

  return (
    <section id="trust" className="trust" data-screen-label="02 Trust Layer">
      <div className="container">
        <div className="trust__head">
          <div className="eyebrow">Trusted by fast-growing brands</div>
          <h2 className="trust__h">
            24 brands. <span className="em-serif" style={{color:"var(--mmc-blue)"}}>One thesis.</span>{" "}
            Revenue that compounds.
          </h2>
        </div>

        {/* Client marquee */}
        <div className="trust__marquee" aria-label="Client logos">
          <div className="trust__marquee-track">
            {[...clients, ...clients].map((c, i) => (
              <span className="trust__client" key={c + i}>
                <span className="trust__client-mark" aria-hidden="true"></span>
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Big metrics */}
        <div className="trust__stats">
          {stats.map((s) => (
            <div className="trust__stat" key={s.lbl}>
              <div className="trust__stat-num">
                <window.Num value={s.num} />{s.suffix && <i>{s.suffix}</i>}
              </div>
              <div className="trust__stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .trust {
          position: relative;
          z-index: 1;
          padding: clamp(56px, 8vw, 112px) 0 clamp(40px, 5vw, 72px);
        }
        .trust__head {
          max-width: 760px;
          margin-bottom: clamp(40px, 5vw, 64px);
        }
        .trust__h {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(32px, 4.2vw, 60px);
          line-height: 1.05;
          letter-spacing: -0.025em;
          margin: 18px 0 0;
          color: var(--fg-1);
        }

        .trust__marquee {
          overflow: hidden;
          position: relative;
          margin: clamp(36px, 5vw, 64px) calc(var(--gutter) * -1);
          padding: 22px 0;
          border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(8px);
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);
                  mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);
        }
        .trust__marquee-track {
          display: inline-flex;
          gap: 56px;
          animation: trustScroll 56s linear infinite;
          white-space: nowrap;
          padding-left: 56px;
          will-change: transform;
        }
        @keyframes trustScroll {
          to { transform: translateX(-50%); }
        }
        .trust__client {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(17px, 1.4vw, 22px);
          letter-spacing: -0.015em;
          color: var(--mmc-blue-700);
          opacity: 0.78;
          transition: opacity var(--dur-base) var(--ease-out);
        }
        .trust__client:hover { opacity: 1; }
        .trust__client-mark {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--mmc-yellow);
          box-shadow: 0 0 0 3px rgba(var(--mmc-yellow-rgb), 0.18);
          flex-shrink: 0;
        }

        .trust__stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(20px, 3vw, 48px);
          padding-top: clamp(40px, 5vw, 72px);
        }
        .trust__stat {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-top: 18px;
          border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.18);
        }
        .trust__stat-num {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(40px, 5vw, 72px);
          line-height: 0.95;
          letter-spacing: -0.035em;
          color: var(--mmc-blue);
          font-variant-numeric: tabular-nums;
        }
        .trust__stat-num i {
          font-style: normal;
          color: var(--mmc-yellow);
          font-size: 0.55em;
          margin-left: 2px;
          font-weight: 700;
        }
        .trust__stat-lbl {
          font-family: var(--font-body);
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--fg-3);
          line-height: 1.55;
          max-width: 220px;
        }

        @media (max-width: 880px) {
          .trust__stats { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 500px) {
          .trust__stats { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

window.TrustLayer = TrustLayer;
