import React from "react";

/* work/WorkByIndustry.jsx, the book broken down by service and business type.

   The old table had Revenue, Median ROAS and In-market-since columns against
   industries that are not in the book. None of that was supplied by MMC, so
   the columns are gone rather than refilled: the component structurally needed
   a number per row, and the only numbers that exist here are counts of brands.

   Everything below is computed from the list, which mirrors
   content/clients.json. Component and class names are unchanged so the page's
   script tag and stylesheet keep matching.
*/

function WorkByIndustry() {
  const clients = [
    { type: "B2B",  services: ["web", "leadgen", "creative", "social"] },                     // Bloom Edutours
    { type: "B2B",  services: ["web", "leadgen", "creative", "social"] },                     // Sprouts Edu Tours
    { type: "B2B",  services: ["web", "leadgen", "creative"] },                               // NM Consultings
    { type: "B2B",  services: ["web", "leadgen", "creative"] },                               // Skyfling Technologies
    { type: "D2C",  services: ["web", "perf", "creative", "social"] },                        // Lepure
    { type: "D2C",  services: ["cro", "perf", "creative", "amazon", "quickcom"] },            // The Growing Giraffe
    { type: "D2C",  services: ["cro", "perf", "creative"] },                                  // Mittiy Made
    { type: "D2C",  services: ["web", "perf", "creative"] },                                  // AwwBaby
    { type: "D2C",  services: ["web", "perf", "creative", "social"] },                        // Sprnt
    { type: "D2C",  services: ["web", "perf", "creative"] },                                  // Vaga Kids
    { type: "D2C",  services: ["web", "perf", "creative"] },                                  // MyBrownButters
    { type: "D2C",  services: ["web", "perf", "creative", "social"] },                        // Notic
    { type: "D2C",  services: ["web", "perf", "creative"] },                                  // OOsh
    { type: "B2C",  services: ["web", "leadgen", "creative", "social"] },                     // Panda Cabs
    { type: "B2C",  services: ["web", "leadgen", "creative", "social"] },                     // MVJ College of Engineering
    { type: "B2C",  services: [] },                                                                  // Anchor by Panasonic
    { type: "B2B",  services: [] },                                                                  // Flomate
    { type: "B2C",  services: [] },                                                                  // Green Hermitage
    { type: "B2C",  services: [] },                                                                  // Housing.com
    { type: "B2B",  services: [] },                                                                  // JSW
    { type: "B2B",  services: [] },                                                                  // LearningMate
    { type: "B2C",  services: [] },                                                                  // Rustomjee
    { type: "B2B",  services: [] },                                                                  // Saint-Gobain
    { type: "B2B",  services: [] },                                                                  // Gyproc
    { type: "B2C",  services: [] },                                                                  // Club Mahindra
  ];

  // Order and wording of the labels follow the _services map in clients.json.
  const services = [
    ["web",      "Website redesign and development"],
    ["cro",      "Conversion rate optimisation"],
    ["leadgen",  "Lead generation"],
    ["perf",     "Performance ads, D2C"],
    ["creative", "Performance creative"],
    ["social",   "Social media"],
    ["amazon",   "Amazon"],
    ["quickcom", "Quick commerce"],
  ];

  const types = ["B2B", "D2C", "B2C"];
  const count = (key, type) =>
    clients.filter((c) => c.services.includes(key) && (!type || c.type === type)).length;

  const cell = (n) => (n ? n : <span className="is-zero">-</span>);

  return (
    <section className="wbi">
      <div className="container">
        <header className="wbi__head">
          <div className="eyebrow">By service</div>
          <h2 className="wbi__h">
            What we{" "}
            <span className="em-serif" style={{color:"var(--mmc-blue)"}}>actually</span>{" "}
            run, and across how many brands.
          </h2>
        </header>

        <div className="wbi__table">
          <div className="wbi__row wbi__row--head">
            <div>Service</div>
            <div>Brands</div>
            {types.map((t) => <div key={t}>{t}</div>)}
          </div>
          {services.map(([key, label]) => (
            <div key={key} className="wbi__row">
              <div className="wbi__svc">{label}</div>
              <div className="wbi__n wbi__n--total">{count(key)}</div>
              {types.map((t) => <div key={t} className="wbi__n">{cell(count(key, t))}</div>)}
            </div>
          ))}
        </div>

        <p className="wbi__foot">
          Counts are of live engagements across the {clients.length} brands in the book.
          MMC publishes no per-client performance figures.
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .wbi { position: relative; z-index: 1; padding: clamp(56px, 8vw, 112px) 0; }
        .wbi__head { max-width: 760px; margin-bottom: clamp(32px, 4vw, 48px); }
        .wbi__h { font-family: var(--font-display); font-weight: 600; font-size: clamp(30px, 3.8vw, 52px); letter-spacing: -0.025em; line-height: 1.06; margin: 18px 0 0; }
        .wbi__table { background: rgba(255,255,255,0.82); backdrop-filter: blur(14px); border: 1px solid rgba(var(--mmc-blue-rgb), 0.10); border-radius: 14px; overflow: hidden; }
        .wbi__row { display: grid; grid-template-columns: 2.2fr 1fr 0.9fr 0.9fr 0.9fr; padding: 18px 22px; border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.08); align-items: center; }
        .wbi__row:first-child { border-top: 0; }
        .wbi__row--head { background: rgba(var(--mmc-blue-rgb), 0.04); font-family: var(--font-body); font-size: 10.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--fg-3); padding-top: 16px; padding-bottom: 16px; }
        .wbi__row:not(.wbi__row--head) { font-family: var(--font-body); font-size: 14.5px; color: var(--fg-1); }
        .wbi__svc { font-family: var(--font-display); font-weight: 600; font-size: 17px; letter-spacing: -0.015em; line-height: 1.2; color: var(--mmc-blue); padding-right: 16px; }
        .wbi__n { font-family: var(--font-display); font-weight: 700; font-variant-numeric: tabular-nums; color: var(--fg-1); }
        .wbi__n--total { color: var(--mmc-blue-700); }
        .wbi__n .is-zero { color: var(--fg-3); opacity: 0.45; font-weight: 500; }
        .wbi__foot { font-family: var(--font-body); font-size: 12.5px; line-height: 1.5; color: var(--fg-3); margin: 14px 0 0; max-width: 560px; }
        @media (max-width: 720px) {
          .wbi__row { grid-template-columns: 1.8fr 0.6fr; gap: 8px; font-size: 12.5px; }
          .wbi__row--head { font-size: 9.5px; }
          .wbi__svc { font-size: 14px; }
          .wbi__row > div:nth-child(n+3) { display: none; }
        }
      ` }} />
    </section>
  );
}

export { WorkByIndustry };
