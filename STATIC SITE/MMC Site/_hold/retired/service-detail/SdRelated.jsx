/* service-detail/SdRelated.jsx, Related services */

function SdRelated() {
  const related = [
    { name: "Google Ads", desc: "Pair with search + Performance Max for full-funnel.", color: "#1E73E8", mono: "G" },
    { name: "Amazon Ads", desc: "If you're on Amazon, this is the second highest leverage.", color: "#FF9900", mono: "A" },
    { name: "Klaviyo Retention", desc: "Capture the revenue Meta sends you.", color: "#1F4D2C", mono: "K" },
    { name: "UGC Production", desc: "Feeds Meta's creative engine at scale.", color: "#D04D4D", mono: "U" },
  ];
  return (
    <section className="sdr">
      <div className="container">
        <header className="sdr__head">
          <div className="eyebrow">Goes well with</div>
          <h2 className="sdr__h">
            Meta is{" "}
            <span className="em-serif" style={{color:"var(--mmc-blue)"}}>strongest</span>{" "}
            when it's not alone.
          </h2>
        </header>

        <div className="sdr__grid">
          {related.map((r) => (
            <a key={r.name} href="Contact.html" className="sdr__card">
              <div className="sdr__card-top">
                <span className="sdr__card-mark" style={{background: r.color}}>
                  <span>{r.mono}</span>
                </span>
                <span className="sdr__card-arrow" aria-hidden="true">↗</span>
              </div>
              <h3 className="sdr__card-name">{r.name}</h3>
              <p className="sdr__card-desc">{r.desc}</p>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .sdr { position: relative; z-index: 1; padding: clamp(56px, 8vw, 112px) 0; }
        .sdr__head { max-width: 720px; margin-bottom: clamp(36px, 5vw, 48px); }
        .sdr__h { font-family: var(--font-display); font-weight: 600; font-size: clamp(28px, 3.4vw, 44px); letter-spacing: -0.025em; line-height: 1.06; margin: 18px 0 0; }
        .sdr__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(14px, 1.6vw, 22px); }
        .sdr__card {
          background: rgba(255,255,255,0.78); backdrop-filter: blur(14px);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          border-radius: 14px; padding: 22px;
          color: var(--fg-1);
          display: flex; flex-direction: column; gap: 14px;
          transition: transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out);
        }
        .sdr__card:hover { transform: translateY(-3px); box-shadow: var(--shadow-2); border-color: rgba(var(--mmc-blue-rgb), 0.22);
          position: relative; z-index: 2;
        }
        .sdr__card-top { display: flex; justify-content: space-between; align-items: center; }
        .sdr__card-mark { width: 32px; height: 32px; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; box-shadow: inset 0 1px 2px rgba(255,255,255,0.25); }
        .sdr__card-mark span { font-family: var(--font-display); font-weight: 800; font-size: 15px; color: #fff; }
        .sdr__card-arrow { color: var(--mmc-yellow); font-size: 16px; }
        .sdr__card-name { font-family: var(--font-display); font-weight: 700; font-size: 19px; letter-spacing: -0.015em; color: var(--fg-1); margin: 0; }
        .sdr__card-desc { font-family: var(--font-body); font-size: 13px; line-height: 1.5; color: var(--fg-2); margin: 0; }
        @media (max-width: 880px) { .sdr__grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 520px) { .sdr__grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
window.SdRelated = SdRelated;
