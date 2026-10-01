import React from "react";

/* work/WorkBlueprints.jsx, the service patterns that repeat across the book.

   The old version named playbooks after revenue ramps and listed brands that
   do not exist. Rebuilt to describe what the patterns actually are: the
   combinations of services MMC runs, and how many brands each one covers.

   The brand counts are computed from the list below rather than typed in, so
   they cannot drift. That list mirrors content/clients.json; nothing here is
   a result, and no brand is named against any figure.
*/

function WorkBlueprints() {
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

  const runs = (c, ...keys) => keys.every((k) => c.services.includes(k));

  const blueprints = [
    { n: "01", name: "B2B and B2C · Site, lead gen, creative",
      desc: "A website rebuild first, then lead generation and the creative to feed it. Runs across consulting, recruitment, education and consumer services.",
      /* Requires the services the pattern is named after, not just the business
         type. A brand whose mix has not been recorded yet counts toward no
         blueprint rather than being swept into this one. */
      match: (c) => c.type !== "D2C" && runs(c, "web", "leadgen", "creative") },
    { n: "02", name: "D2C · Site and performance",
      desc: "Store rebuild, performance ads and enough creative volume to keep the ad account testing rather than repeating.",
      match: (c) => c.type === "D2C" && runs(c, "web", "perf") },
    { n: "03", name: "D2C · Conversion-led",
      desc: "Conversion work on the store the brand already has, with performance ads and creative built on top of it.",
      match: (c) => runs(c, "cro", "perf") },
    { n: "04", name: "Marketplace and quick commerce",
      desc: "Amazon and quick commerce run alongside the brand's own store, on the same creative and the same calendar.",
      match: (c) => runs(c, "amazon") || runs(c, "quickcom") },
    { n: "05", name: "Social as a standing channel",
      desc: "Social media managed month to month next to whatever else we run for the brand, not as a one-off campaign.",
      match: (c) => runs(c, "social") },
  ];

  return (
    <section className="wb">
      <div className="container">
        <header className="wb__head">
          <div className="eyebrow">Service patterns</div>
          <h2 className="wb__h">
            Pattern-recognition.{" "}
            <span className="em-serif" style={{color:"var(--mmc-blue)"}}>Reused</span>{" "}
            across brands in the same world.
          </h2>
          <p className="wb__lead">
            Same shape of engagement, different brand. We have shipped each of these enough
            times that week-1 is a template, not a discovery sprint.
          </p>
        </header>
        <ol className="wb__list">
          {blueprints.map((b) => {
            const n = clients.filter(b.match).length;
            return (
              <li key={b.n} className="wb__item">
                <span className="wb__n">{b.n}</span>
                <div className="wb__body">
                  <h3 className="wb__name">{b.name}</h3>
                  <p className="wb__desc">{b.desc}</p>
                </div>
                <span className="wb__brands">{n} {n === 1 ? "brand" : "brands"}</span>
              </li>
            );
          })}
        </ol>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .wb { position: relative; z-index: 1; padding: clamp(56px, 8vw, 112px) 0; }
        .wb__head { max-width: 820px; margin-bottom: clamp(36px, 5vw, 48px); }
        .wb__h { font-family: var(--font-display); font-weight: 600; font-size: clamp(30px, 3.8vw, 52px); letter-spacing: -0.025em; line-height: 1.06; margin: 18px 0 14px; }
        .wb__lead { font-family: var(--font-body); font-size: 17px; line-height: 1.55; color: var(--fg-2); margin: 0; max-width: 560px; }
        .wb__list { list-style: none; margin: 0; padding: 0; border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.18); }
        /* Rows are not links, so they no longer wear a pointer cursor or a
           trailing arrow promising a page that does not exist. */
        .wb__item { display: grid; grid-template-columns: 60px 1fr 140px; gap: 18px; align-items: center; padding: 26px 4px; border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.10); }
        .wb__n { font-family: var(--font-display); font-weight: 700; font-size: 13px; letter-spacing: 0.18em; color: var(--mmc-yellow); }
        .wb__body { display: flex; flex-direction: column; gap: 4px; }
        .wb__name { font-family: var(--font-display); font-weight: 600; font-size: clamp(20px, 1.8vw, 26px); letter-spacing: -0.02em; line-height: 1.15; color: var(--fg-1); margin: 0; }
        .wb__desc { font-family: var(--font-body); font-size: 13.5px; line-height: 1.55; color: var(--fg-2); margin: 0; }
        .wb__brands { font-family: var(--font-body); font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--mmc-blue); text-align: right; }
        @media (max-width: 720px) { .wb__item { grid-template-columns: 50px 1fr; } .wb__brands { grid-column: 2; text-align: left; } }
      ` }} />
    </section>
  );
}

export { WorkBlueprints };
