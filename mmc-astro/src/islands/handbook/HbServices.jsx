import React from "react";

/* handbook/HbServices.jsx, Services we used + Next case */

function HbServices() {
  const used = [
    { name: "Meta Ads",          desc: "Full-funnel rebuild, daily ops", color: "#0866FF", mono: "M", url: "/services/performance-marketing/meta-ads/" },
    { name: "Google Ads",        desc: "Search + Performance Max",        color: "#1E73E8", mono: "G", url: "/contact/" },
    { name: "Klaviyo Retention", desc: "All 14 flows + lifecycle",        color: "#1F4D2C", mono: "K", url: "/contact/" },
    { name: "UGC Production",    desc: "60 units/mo, India + US",         color: "#D04D4D", mono: "U", url: "/contact/" },
    { name: "Brand Voice",       desc: "Three pillars, 30 examples",      color: "#5C3F8C", mono: "B", url: "/contact/" },
    { name: "Shopify",           desc: "Speed + AOV rebuild",             color: "#5C8A3A", mono: "S", url: "/contact/" },
  ];

  return (
    <section className="hbs">
      <div className="container">
        <header className="hbs__head">
          <div className="eyebrow">Systems we ran</div>
          <h2 className="hbs__h">
            Six systems.{" "}
            <span className="em-serif" style={{color:"var(--mmc-blue)"}}>One pod.</span>{" "}
            One Slack thread.
          </h2>
        </header>

        <div className="hbs__grid">
          {used.map((u) => (
            <a key={u.name} href={u.url} className="hbs__card">
              <div className="hbs__card-top">
                <span className="hbs__mark" style={{background: u.color}}>
                  <span>{u.mono}</span>
                </span>
                <span className="hbs__arrow" aria-hidden="true">↗</span>
              </div>
              <h3 className="hbs__name">{u.name}</h3>
              <p className="hbs__desc">{u.desc}</p>
            </a>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hbs { position: relative; z-index: 1; padding: clamp(56px, 8vw, 96px) 0; }
        .hbs__head { max-width: 760px; margin-bottom: clamp(32px, 4vw, 48px); }
        .hbs__h { font-family: var(--font-display); font-weight: 600; font-size: clamp(28px, 3.4vw, 44px); letter-spacing: -0.025em; line-height: 1.06; margin: 18px 0 0; }
        .hbs__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(14px, 1.6vw, 22px); }
        .hbs__card { background: rgba(255,255,255,0.82); backdrop-filter: blur(14px); border: 1px solid rgba(var(--mmc-blue-rgb), 0.10); border-radius: 14px; padding: 22px; color: var(--fg-1); display: flex; flex-direction: column; gap: 14px; transition: transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out); }
        .hbs__card:hover { transform: translateY(-3px); box-shadow: var(--shadow-2); color: var(--fg-1);
          position: relative; z-index: 2;
        }
        .hbs__card-top { display: flex; justify-content: space-between; align-items: center; }
        .hbs__mark { width: 32px; height: 32px; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; }
        .hbs__mark span { font-family: var(--font-display); font-weight: 800; font-size: 15px; color: #fff; }
        .hbs__arrow { color: var(--mmc-yellow); font-size: 16px; }
        .hbs__name { font-family: var(--font-display); font-weight: 700; font-size: 19px; letter-spacing: -0.015em; color: var(--fg-1); margin: 0; }
        .hbs__desc { font-family: var(--font-body); font-size: 13px; line-height: 1.5; color: var(--fg-2); margin: 0; }
        @media (max-width: 880px) { .hbs__grid { grid-template-columns: 1fr 1fr; } }
      ` }} />
    </section>
  );
}

export { HbServices };
