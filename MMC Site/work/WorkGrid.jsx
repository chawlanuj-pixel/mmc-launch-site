/* work/WorkGrid.jsx, the client book with a business-type filter.

   The 25 brands below mirror content/clients.json, which is the single source
   of truth. MMC supplied a business type and a service mix per brand and
   nothing else: no revenue, no ROAS, no lift, no timeframes. Nothing numeric
   is shown against a brand name here, and nothing may be added to a card
   unless it comes from that file.

   Artwork is the one thing a card takes from outside clients.json. Drop a
   1280x720 JPEG at assets/clients/<id>-work.jpg, add the id to MMC_WORK_ART in
   clients-strip.jsx, and that brand's card shows the work instead of its
   gradient; the same file is what the homepage client wall reveals on hover,
   so one image serves both surfaces. See assets/clients/README.md for the spec.
*/

/* The art panel. A brand shows its gradient and its mark until real work lands
   at assets/clients/<id>-work.jpg, at which point the shot takes the panel and
   the mark steps aside.

   Only brands listed in window.MMC_WORK_ART (clients-strip.jsx) mount the
   <img>. Mounting one for every brand and letting onError sort it out fired a
   404 per brand without artwork on every visit. The load event still gates the
   swap, so a listed file that fails to load leaves the gradient alone. */
function WgArt({ c }) {
  const [shot, setShot] = React.useState(false);
  return (
    <div className={"wg__art wg__art--" + c.art + (shot ? " has-shot" : "")} aria-hidden="true">
      <span className="wg__art-grain"></span>
      <span className="wg__art-mark">
        {window.MMCLogo
          ? <window.MMCLogo name={c.brand} className="wg__art-logo" />
          : c.mark}
      </span>
      {(window.MMC_WORK_ART || []).includes(c.id) && (
        <img className="wg__art-shot"
             src={"assets/clients/" + c.id + "-work.jpg"}
             alt="" loading="lazy" decoding="async"
             onLoad={() => setShot(true)} onError={() => setShot(false)} />
      )}
      <span className="wg__art-tag">{c.type}</span>
    </div>
  );
}

function WorkGrid() {
  // Readable service labels, verbatim from the _services map in clients.json.
  const SERVICE = {
    web: "Website redesign and development",
    cro: "Conversion rate optimisation",
    leadgen: "Lead generation",
    perf: "Performance ads, D2C",
    creative: "Performance creative",
    social: "Social media",
    amazon: "Amazon",
    quickcom: "Quick commerce",
  };

  const slug = (b) => b.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  // `art` and `mark` are presentation only. `brand`, `type` and `services`
  // are the supplied record and must not be embellished.
  const cases = [
    { brand: "Bloom Edutours",        id: "bloom",    type: "B2B",  art: "ochre",    mark: "BE",  services: ["web", "leadgen", "creative", "social"] },
    { brand: "Sprouts Edu Tours",     id: "sprouts",  type: "B2B",  art: "sage",     mark: "SE",  services: ["web", "leadgen", "creative", "social"] },
    { brand: "NM Consultings",        id: "nmc",      type: "B2B",  art: "graphite", mark: "NM",  services: ["web", "leadgen", "creative"] },
    { brand: "Skyfling Technologies", id: "skyfling", type: "B2B",  art: "violet",   mark: "SK",  services: ["web", "leadgen", "creative"] },
    { brand: "Lepure",                id: "lepure",   type: "D2C",  art: "blush",    mark: "LE",  services: ["web", "perf", "creative", "social"] },
    { brand: "The Growing Giraffe",   id: "giraffe",  type: "D2C",  art: "sage",     mark: "GG",  services: ["cro", "perf", "creative", "amazon", "quickcom"] },
    { brand: "Mittiy Made",           id: "mittiy",   type: "D2C",  art: "ochre",    mark: "MM",  services: ["cro", "perf", "creative"] },
    { brand: "AwwBaby",               id: "awwbaby",  type: "D2C",  art: "blush",    mark: "AB",  services: ["web", "perf", "creative"] },
    { brand: "Sprnt",                 id: "sprnt",    type: "D2C",  art: "graphite", mark: "SP",  services: ["web", "perf", "creative", "social"] },
    { brand: "Vaga Kids",             id: "vagakids", type: "D2C",  art: "violet",   mark: "VK",  services: ["web", "perf", "creative"] },
    { brand: "MyBrownButters",        id: "mbb",      type: "D2C",  art: "azure",    mark: "MB",  services: ["web", "perf", "creative"] },
    { brand: "Notic",                 id: "notic",    type: "D2C",  art: "wine",     mark: "NT",  services: ["web", "perf", "creative", "social"] },
    { brand: "OOsh",                  id: "oosh",     type: "D2C",  art: "blush",    mark: "OO",  services: ["web", "perf", "creative"] },
    { brand: "Panda Cabs",            id: "pandacabs",type: "B2C",  art: "azure",    mark: "PC",  services: ["web", "leadgen", "creative", "social"] },
    { brand: "MVJ College of Engineering", id: "mvj", type: "B2C",  art: "wine",     mark: "MVJ", services: ["web", "leadgen", "creative", "social"] },
    { brand: "Anchor by Panasonic",          id: "anchor",         type: "B2C",  art: "blush",      mark: "AN",    services: [] },
    { brand: "Flomate",                      id: "flomate",        type: "B2B",  art: "azure",      mark: "FL",    services: [] },
    { brand: "Green Hermitage",              id: "greenhermitage",  type: "B2C",  art: "sage",       mark: "GH",    services: [] },
    { brand: "Housing.com",                  id: "housing",        type: "B2C",  art: "ochre",      mark: "HC",    services: [] },
    { brand: "JSW",                          id: "jsw",            type: "B2B",  art: "wine",       mark: "JSW",   services: [] },
    { brand: "LearningMate",                 id: "learningmate",   type: "B2B",  art: "sage",       mark: "LM",    services: [] },
    { brand: "Rustomjee",                    id: "rustomjee",      type: "B2C",  art: "graphite",   mark: "RJ",    services: [] },
    { brand: "Saint-Gobain",                 id: "saintgobain",    type: "B2B",  art: "violet",     mark: "SG",    services: [] },
    { brand: "Gyproc",                       id: "gyproc",         type: "B2B",  art: "azure",      mark: "GY",    services: [] },
    { brand: "Club Mahindra",                 id: "clubmahindra",   type: "B2C",  art: "sage",       mark: "CM",    services: [] },
  ];

  // Exactly the types present in clients.json, in book order. Nothing else may
  // be offered as a chip; B2C arrived with Panda Cabs and MVJ College, which
  // are neither D2C product brands nor B2B, and SaaS left with qid.
  const types = ["All", "B2B", "D2C", "B2C"];
  const [filter, setFilter] = React.useState("All");

  const filtered = filter === "All" ? cases : cases.filter((c) => c.type === filter);
  /* Most-opened brand leads within whatever the filter left. */
  const shown = window.MMCPop
    ? window.MMCPop.rankAfterMount(filtered, (c) => c.brand)
    : filtered;

  // Arriving from a card elsewhere on the site: clear any type filter that
  // would hide the brand, then bring it into view and mark it so the click has
  // an answer. There are no written case studies, so every card anchors to
  // itself and this is the whole of the destination.
  React.useEffect(() => {
    const id = decodeURIComponent((window.location.hash || "").slice(1));
    if (!id) return;
    const hit = cases.find((c) => slug(c.brand) === id);
    if (!hit) return;
    setFilter("All");
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ block: "center", behavior: "smooth" });
      el.classList.add("is-landed");
      setTimeout(() => el.classList.remove("is-landed"), 2400);
    }, 220);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="all-work" className="wg">
      <div className="container">
        <header className="wg__head">
          <div className="eyebrow">The client book</div>
          <h2 className="wg__h">
            Every brand we run.{" "}
            <span className="em-serif" style={{color:"var(--mmc-blue)"}}>Filter</span>{" "}
            by business type.
          </h2>
        </header>

        <div className="wg__filter">
          <span className="wg__filter-label">Business type</span>
          <div className="wg__chips">
            {types.map((t) => {
              return (
                <button key={t} className={"wg__chip " + (filter === t ? "is-on" : "")} onClick={() => setFilter(t)}>
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        <div className="wg__grid">
          {shown.map((c) => (
            <a key={c.brand} id={slug(c.brand)}
               href={"Our Work.html#" + slug(c.brand)}
               className="wg__card"
               onClick={() => window.MMCPop && window.MMCPop.record(c.brand, c.brand)}>
              <WgArt c={c} />
              <div className="wg__body">
                <h3 className="wg__brand">{c.brand}</h3>
                {/* A brand whose service mix has not been supplied yet shows
                    no service row at all. An empty one reads as a rendering
                    fault, and inventing chips to fill it is the one thing this
                    file must never do. */}
                {c.services.length > 0 && (
                  <div className="wg__services">
                    {c.services.map((s) => <span key={s}>{SERVICE[s]}</span>)}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .wg { position: relative; z-index: 1; padding: clamp(56px, 8vw, 112px) 0; }
        .wg__head { max-width: 760px; margin-bottom: clamp(32px, 4vw, 48px); }
        .wg__h { font-family: var(--font-display); font-weight: 600; font-size: clamp(30px, 3.8vw, 52px); letter-spacing: -0.025em; line-height: 1.06; margin: 18px 0 0; }
        .wg__filter {
          display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
          margin-bottom: 36px;
          padding: 18px 20px;
          background: rgba(255,255,255,0.6);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          border-radius: 14px;
          backdrop-filter: blur(8px);
        }
        .wg__filter-label {
          font-family: var(--font-body); font-size: 10px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase; color: var(--mmc-yellow);
          min-width: 92px;
        }
        .wg__chips { display: flex; gap: 6px; flex-wrap: wrap; }
        .wg__chip {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-body); font-size: 12px; font-weight: 600;
          padding: 8px 14px; border-radius: 999px;
          background: #fff; border: 1px solid rgba(var(--mmc-blue-rgb), 0.16);
          color: var(--fg-1); cursor: pointer;
          transition: all var(--dur-base) var(--ease-out);
        }
        .wg__chip:hover { border-color: var(--mmc-blue); color: var(--mmc-blue); }
        .wg__chip.is-on {
          background: var(--mmc-yellow);
          color: var(--mmc-blue-700);
          border-color: var(--mmc-yellow);
          box-shadow: 0 6px 18px -8px rgba(var(--mmc-yellow-rgb), 0.55);
          font-weight: 700;
        }
        .wg__chip.is-on .wg__chip-n { color: var(--mmc-blue-700); opacity: 0.55; }
        .wg__chip-n { font-family: var(--font-display); font-size: 10px; opacity: 0.6; font-variant-numeric: tabular-nums; color: var(--mmc-blue); }

        .wg__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(16px, 1.8vw, 24px); }
        /* The art panel doubles as the logo slot: drop a file in and it
           replaces the initials without changing the card's shape. */
        .wg__art-logo {
          display: flex; align-items: center; justify-content: center;
          width: min(62%, 210px); height: 56%;
        }
        .wg__card {
          background: rgba(255,255,255,0.82); backdrop-filter: blur(14px);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          border-radius: 14px; overflow: hidden;
          color: var(--fg-1);
          display: flex; flex-direction: column;
          transition: transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out);
        }
        .wg__card:hover { transform: translateY(-3px); box-shadow: var(--shadow-2); border-color: rgba(var(--mmc-blue-rgb), 0.22); color: var(--fg-1);
          position: relative; z-index: 2;
        }

        /* 16:9, which is what assets/clients/README.md asks work images to be
           authored at. A gradient card is indifferent to the ratio, so the
           artwork gets to set it and nothing needs cropping to fit. */
        .wg__art { position: relative; aspect-ratio: 16 / 9; padding: 18px; overflow: hidden; isolation: isolate; }
        .wg__art-grain { position: absolute; inset: 0; opacity: 0.16; transition: opacity var(--dur-base) var(--ease-out); mix-blend-mode: multiply; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"); pointer-events: none; }
        .wg__art--blush { background: radial-gradient(ellipse 80% 60% at 30% 30%, rgba(255,255,255,0.55), transparent 60%), linear-gradient(135deg, #F6CDB4, #DC8E73); }
        .wg__art--azure { background: radial-gradient(ellipse 70% 50% at 70% 20%, rgba(255,255,255,0.32), transparent 60%), linear-gradient(135deg, var(--mmc-blue), #356CC9); }
        .wg__art--ochre { background: radial-gradient(ellipse 80% 60% at 30% 70%, rgba(255,255,255,0.42), transparent 60%), linear-gradient(135deg, #E8C778, #C49230); }
        .wg__art--sage { background: radial-gradient(ellipse 80% 60% at 60% 30%, rgba(255,255,255,0.35), transparent 60%), linear-gradient(135deg, #C9D3B8, #7F9A6A); }
        .wg__art--graphite { background: radial-gradient(ellipse 70% 50% at 20% 20%, rgba(255,255,255,0.16), transparent 60%), linear-gradient(135deg, #2D3748, #1A1F2C); color: #fff; }
        .wg__art--wine { background: radial-gradient(ellipse 80% 60% at 80% 30%, rgba(255,255,255,0.18), transparent 60%), linear-gradient(135deg, #7A2A3A, #4A1721); color: #fff; }
        .wg__art--violet { background: radial-gradient(ellipse 80% 60% at 30% 30%, rgba(255,255,255,0.32), transparent 60%), linear-gradient(135deg, #D5C5E8, #7E63A8); }

        /* The shot sits over the gradient and under the type chip. It is
           painted only once onLoad has fired, so a missing file never shows
           as a flash of empty box. */
        .wg__art-shot {
          position: absolute; inset: 0; z-index: 1;
          width: 100%; height: 100%; object-fit: cover; object-position: center;
          opacity: 0;
          transition: opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out);
        }
        .wg__art.has-shot .wg__art-shot { opacity: 1; }
        .wg__card:hover .wg__art.has-shot .wg__art-shot { transform: scale(1.04); }
        /* Both of these are stand-ins for the artwork, so they leave once it
           arrives rather than sitting on top of it. */
        .wg__art.has-shot .wg__art-mark,
        .wg__art.has-shot .wg__art-grain { opacity: 0; }
        /* Over a gradient the chip can be a light wash, because the panel
           behind it is a known colour. Over artwork it cannot: the work
           images run from OOsh's cream to Notic's near-black, so the chip
           carries its own opaque ground and a hairline to sit on both. */
        .wg__art.has-shot .wg__art-tag {
          background: rgba(255,255,255,0.92);
          color: var(--mmc-blue-700);
          box-shadow: 0 1px 3px rgba(0,0,0,0.16), 0 0 0 1px rgba(var(--mmc-blue-rgb), 0.08);
        }

        .wg__art-mark { position: absolute; bottom: 12px; right: 16px; font-family: var(--font-display); font-weight: 800; font-size: 92px; line-height: 0.82; letter-spacing: -0.06em; color: rgba(255,255,255,0.5); z-index: 1; transition: opacity var(--dur-base) var(--ease-out); }
        .wg__art--graphite .wg__art-mark, .wg__art--wine .wg__art-mark { color: rgba(255,255,255,0.18); }
        /* Type is set unaltered, so SaaS keeps its casing rather than shouting SAAS. */
        .wg__art-tag { position: relative; z-index: 2; display: inline-block; font-family: var(--font-body); font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: none; padding: 5px 10px; background: rgba(255,255,255,0.55); border-radius: 999px; backdrop-filter: blur(8px); color: var(--mmc-blue-700); }
        .wg__art--graphite .wg__art-tag, .wg__art--wine .wg__art-tag { background: rgba(255,255,255,0.18); color: #fff; }

        .wg__body { padding: 20px 22px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
        .wg__brand { font-family: var(--font-display); font-weight: 700; font-size: 21px; letter-spacing: -0.02em; color: var(--fg-1); margin: 0; }
        /* The service mix is the whole of the card body now. No brand carries a
           number, so these chips are what a reader came for: give them room. */
        .wg__services { display: flex; flex-wrap: wrap; gap: 6px; padding-top: 12px; border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.08); }
        .wg__services span { font-family: var(--font-body); font-size: 11px; font-weight: 600; line-height: 1.35; letter-spacing: 0.01em; padding: 4px 9px; background: rgba(var(--mmc-blue-rgb), 0.06); color: var(--mmc-blue-700); border-radius: 999px; }

        @media (max-width: 880px) { .wg__grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .wg__grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
window.WorkGrid = WorkGrid;
