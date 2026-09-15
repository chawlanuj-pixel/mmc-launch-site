/* clients-strip.jsx, Cross-scrolling client strip.
   The twenty-five brands MMC actually runs, taken from content/clients.json.
   Names are set as wordmarks in the site's own display type rather than
   hand-drawn imitations of anyone's logo artwork, the same approach
   home26/partners.jsx uses for platform names. Nothing but the name and the
   business type is shown against a brand: MMC supplied a service mix and no
   performance figures, so none appear here. */

/* The client book. `type` is the only per-brand attribute on show, and it is
   the one MMC actually supplied. Keep the spelling exactly as clients.json
   has it, lowercase names and all. */
const CS_CLIENTS = [
  { id: "bloom",     name: "Bloom Edutours",       type: "B2B"  },
  { id: "sprouts",   name: "Sprouts Edu Tours",    type: "B2B"  },
  { id: "nmc",       name: "NM Consultings",       type: "B2B"  },
  { id: "skyfling",  name: "Skyfling Technologies",type: "B2B"  },
  { id: "lepure",    name: "Lepure",               type: "D2C"  },
  { id: "giraffe",   name: "The Growing Giraffe",  type: "D2C"  },
  { id: "mittiy",    name: "Mittiy Made",          type: "D2C"  },
  { id: "awwbaby",   name: "AwwBaby",              type: "D2C"  },
  { id: "sprnt",     name: "Sprnt",                type: "D2C"  },
  { id: "vagakids",  name: "Vaga Kids",            type: "D2C"  },
  { id: "mbb",       name: "MyBrownButters",       type: "D2C"  },
  { id: "notic",     name: "Notic",                type: "D2C"  },
  { id: "oosh",      name: "OOsh",                 type: "D2C"  },
  { id: "pandacabs", name: "Panda Cabs",           type: "B2C"  },
  { id: "mvj",       name: "MVJ College of Engineering", type: "B2C" },
  { id: "anchor",     name: "Anchor by Panasonic",          type: "B2C"  },
  { id: "flomate",    name: "Flomate",                      type: "B2B"  },
  { id: "greenhermitage",  name: "Green Hermitage",              type: "B2C"  },
  { id: "housing",    name: "Housing.com",                  type: "B2C"  },
  { id: "jsw",        name: "JSW",                          type: "B2B"  },
  { id: "learningmate",  name: "LearningMate",                 type: "B2B"  },
  { id: "rustomjee",  name: "Rustomjee",                    type: "B2C"  },
  { id: "saintgobain",  name: "Saint-Gobain",                 type: "B2B"  },
  { id: "gyproc",     name: "Gyproc",                       type: "B2B"  },
  { id: "clubmahindra", name: "Club Mahindra",           type: "B2C"  },
];

/* Wordmarks have to sit inside fixed-size cards, and the names vary from three
   characters to twenty-one. csFit returns a scale factor so the widest line a
   name can produce still fits its card: the longest single word, or half the
   name if it will wrap onto two lines, whichever is wider. */
function csFit(name) {
  const words = name.split(" ");
  const longestWord = words.reduce((m, w) => Math.max(m, w.length), 0);
  const halfName = Math.ceil(name.length / 2);
  const widest = Math.max(longestWord, words.length > 1 ? halfName : 0);
  return Math.round(Math.min(1, 10.5 / widest) * 1000) / 1000;
}

/* The wordmark is the fallback, not the target. Drop a real logo at
   assets/clients/<id>.png (or .svg) and it takes over on load; until then the
   name renders in the site's own display type, which reads as a deliberate
   treatment rather than a missing image. onError keeps the wordmark when the
   file is absent, which is the normal case today.

   The <img> is always mounted rather than conditionally rendered, because a
   conditional would need to know in advance which files exist. */
function CsWordmark({ name, id }) {
  const [got, setGot] = React.useState(false);
  return (
    <span className="cs-logo">
      <span className={"cs-wm" + (got ? " is-off" : "")}
            style={{ "--cs-wm-k": csFit(name) }}>{name}</span>
      {id && (
        <img className={"cs-logo__img" + (got ? " is-on" : "")}
             src={"assets/clients/" + id + ".png"}
             alt={name} loading="lazy" decoding="async"
             onLoad={() => setGot(true)} onError={() => setGot(false)} />
      )}
    </span>
  );
}

/* One entry per brand, shared by the marquee, the homepage grid and
   home26's NClients. `w` stays a render-ready node and `cat` stays the filter
   key so every existing consumer keeps working unchanged. */
const CS_LOGOS = CS_CLIENTS.map((c) => ({
  id: c.id,
  name: c.name,
  cat: c.type,
  type: c.type,
  w: <CsWordmark name={c.name} id={c.id} />,
}));

/* Both rows carry the whole book, row B phase-shifted, so neither row runs out
   of cards on a wide screen. */
const CS_ROW_A = CS_LOGOS;
const CS_ROW_B = CS_LOGOS.slice(7).concat(CS_LOGOS.slice(0, 7));

window.MMC_CLIENT_LOGOS = CS_LOGOS;

/* One logo slot for the whole site. Anything showing a client name calls this
   instead of printing the string, so dropping a file into assets/clients/
   updates every surface at once: the marquee, the grid, the trust rows on the
   service pages and home26's NClients.

   Pass a name; the id is looked up so callers that only have the name still
   get the image. */
const CS_BY_NAME = {};
CS_CLIENTS.forEach((c) => { CS_BY_NAME[c.name.toLowerCase()] = c.id; });

window.MMCLogo = function MMCLogo({ name, id, className }) {
  const key = id || CS_BY_NAME[String(name || "").toLowerCase()];
  return (
    <span className={"cs-logo-wrap " + (className || "")}>
      <CsWordmark name={name} id={key} />
    </span>
  );
};
window.MMC_CLIENT_ID = (name) => CS_BY_NAME[String(name || "").toLowerCase()] || null;

/* Wordmark CSS is injected globally rather than scoped to ClientsStrip,
   because the same nodes render inside home26's .n-chip and inside
   ClientsLogoGrid, neither of which mounts the marquee. */
(function () {
  if (document.getElementById("cs-wordmark-style")) return;
  const s = document.createElement("style");
  s.id = "cs-wordmark-style";
  s.textContent = `
    .cs-wm {
      display: block;
      width: 100%;
      text-align: center;
      font-family: var(--font-display);
      font-weight: 700;
      font-size: calc(var(--cs-wm-size, 15px) * var(--cs-wm-k, 1));
      line-height: 1.08;
      letter-spacing: -0.01em;
      color: var(--fg-1, #142F5B);
      overflow-wrap: break-word;
      hyphens: none;
      transition: color 200ms ease;
    }
    .n-chip .cs-wm { --cs-wm-size: 17px; }
    .cs-strip__card-logo .cs-wm { --cs-wm-size: clamp(13px, 1.08vw, 17px); }
    .clg__cell .cs-wm { --cs-wm-size: 12px; }

    /* The logo slot. The image sits over the wordmark and cross-fades in, so a
       card never collapses or jumps when a real logo arrives. */
    .cs-logo {
      position: relative;
      display: flex; align-items: center; justify-content: center;
      width: 100%; height: 100%; min-height: inherit;
    }
    .cs-logo .cs-wm { transition: opacity 220ms ease; }
    .cs-logo .cs-wm.is-off { opacity: 0; }
    .cs-logo__img {
      position: absolute; inset: 0; margin: auto;
      max-width: 100%; max-height: 100%;
      width: auto; height: auto;
      object-fit: contain;
      opacity: 0; transition: opacity 220ms ease;
    }
    .cs-logo__img.is-on { opacity: 1; }
  `;
  document.head.appendChild(s);
})();

function ClientsStrip() {
  const rowA = CS_ROW_A, rowB = CS_ROW_B;
  return (
    <section id="clients" className="cs-strip" data-screen-label="02 Client logos">
      <div className="container">
        <header className="cs-strip__head">
          <div className="eyebrow">The client book</div>
          <h2 className="cs-strip__h">
            Twenty-five brands across B2B, B2C{" "}
            <span className="em-serif" style={{ color: "var(--mmc-blue)" }}>&amp; D2C.</span>
          </h2>
        </header>
      </div>

      <div className="cs-strip__rows" aria-hidden="true">
        <div className="cs-strip__row cs-strip__row--l">
          <div className="cs-strip__track cs-strip__track--l">
            {[...rowA, ...rowA].map((c, i) => (
              <span key={i} className="cs-strip__card">
                <span className="cs-strip__card-logo">{c.w}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="cs-strip__row cs-strip__row--r">
          <div className="cs-strip__track cs-strip__track--r">
            {[...rowB, ...rowB].map((c, i) => (
              <span key={i} className="cs-strip__card">
                <span className="cs-strip__card-logo">{c.w}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="cs-strip__fade cs-strip__fade--l"></div>
        <div className="cs-strip__fade cs-strip__fade--r"></div>
      </div>

      <style>{`
        .cs-strip { position: relative; z-index: 1; padding: clamp(48px, 6vw, 88px) 0 clamp(28px, 4vw, 52px); }
        .cs-strip__head {
          text-align: center;
          max-width: 820px;
          margin: 0 auto clamp(28px, 3.4vw, 44px);
        }
        .cs-strip__head .eyebrow { justify-content: center; }
        .cs-strip__head .eyebrow::before { display: none; }
        .cs-strip__h {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(28px, 3.4vw, 48px); letter-spacing: -0.025em;
          line-height: 1.08; margin: 14px 0 0; color: var(--fg-1);
        }

        .cs-strip__rows {
          position: relative;
          display: flex; flex-direction: column;
          gap: 14px;
          padding: 4px 0;
          overflow: hidden;
        }
        .cs-strip__row {
          position: relative;
          overflow: hidden;
        }
        .cs-strip__track {
          display: flex;
          gap: 14px;
          width: max-content;
        }
        .cs-strip__track--l { animation: csStripLeft 70s linear infinite; }
        .cs-strip__track--r {
          animation: csStripRight 70s linear infinite;
          transform: translate3d(-50%, 0, 0);
        }
        .cs-strip__rows:hover .cs-strip__track { animation-play-state: paused; }
        @keyframes csStripLeft {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes csStripRight {
          from { transform: translate3d(-50%, 0, 0); }
          to   { transform: translate3d(0, 0, 0); }
        }

        .cs-strip__card {
          flex: 0 0 auto;
          display: inline-flex; align-items: center; justify-content: center;
          width: clamp(150px, 12vw, 184px);
          height: clamp(64px, 5.6vw, 76px);
          padding: 12px 20px;
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(29, 78, 216, 0.08);
          border-radius: 12px;
          box-shadow: 0 4px 12px -8px rgba(20,47,91,0.14);
          transition: transform var(--dur-base) var(--ease-out),
                      border-color var(--dur-base) var(--ease-out);
        }
        .cs-strip__card:hover {
          transform: translateY(-2px);
          border-color: rgba(29, 78, 216, 0.18);
          position: relative; z-index: 2;
        }
        .cs-strip__card:hover .cs-wm { color: var(--mmc-blue); }
        .cs-strip__card-logo {
          display: flex; align-items: center; justify-content: center;
          width: 100%; height: 100%;
        }

        .cs-strip__fade {
          position: absolute; top: 0; bottom: 0;
          width: clamp(40px, 6vw, 80px);
          pointer-events: none; z-index: 2;
        }
        .cs-strip__fade--l { left: 0;  background: linear-gradient(90deg,  var(--bg-1, #FBFAF6) 0%, transparent 100%); }
        .cs-strip__fade--r { right: 0; background: linear-gradient(270deg, var(--bg-1, #FBFAF6) 0%, transparent 100%); }
      `}</style>
    </section>
  );
}
window.ClientsStrip = ClientsStrip;


/* ClientsLogoGrid: the same twenty-five brands as the marquee above, rendered as
   a filterable grid. Used inside the homepage proof section so a visitor can
   check we've handled their kind of business. The filter runs on the business
   type MMC supplied for each brand, one source of truth for both renderings. */
function ClientsLogoGrid({ limit = 14 }) {
  const all = window.MMC_CLIENT_LOGOS || [];
  const cats = ["All"].concat(
    Array.from(new Set(all.map((c) => c.cat).filter(Boolean)))
  );
  const [filter, setFilter] = React.useState("All");
  const shown = (filter === "All" ? all : all.filter((c) => c.cat === filter)).slice(0, limit);

  return (
    <div className="clg">
      <div className="clg__chips" role="group" aria-label="Filter clients by business type">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            className={"clg__chip" + (filter === c ? " is-on" : "")}
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
          >{c}</button>
        ))}
      </div>
      <div className="clg__grid">
        {shown.map((c) => (
          <span className="clg__cell" key={c.id} title={c.cat}>{c.w}</span>
        ))}
      </div>

      <style>{`
        .clg__chips { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
        .clg__chip {
          font-family: var(--font-body); font-size: 10px; font-weight: 800;
          letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer;
          padding: 6px 11px; border-radius: 999px;
          border: 1.5px solid rgba(29,78,216,0.20); background: rgba(255,255,255,0.7);
          color: var(--fg-3); transition: border-color 200ms ease, color 200ms ease, background 200ms ease;
        }
        .clg__chip:hover { border-color: var(--mmc-blue); color: var(--mmc-blue); }
        .clg__chip.is-on { background: var(--mmc-blue); border-color: var(--mmc-blue); color: #fff; }
        .clg__chip:focus-visible { outline: 2px solid var(--mmc-blue); outline-offset: 2px; }
        .clg__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
        @media (max-width: 720px) { .clg__grid { grid-template-columns: repeat(3, 1fr); } }
        .clg__cell {
          display: flex; align-items: center; justify-content: center;
          min-height: 46px; padding: 6px 8px;
          border: 1.5px solid rgba(29,78,216,0.13); border-radius: 10px;
          background: rgba(255,255,255,0.78);
          transition: border-color 200ms ease, transform 200ms ease;
        }
        /* The lift makes the card overlap its neighbours, and without a
           stacking order the next cells in the DOM paint their background over
           its border, so the blue outline came out truncated along the top and
           the leading edge. */
        .clg__cell:hover {
          border-color: var(--mmc-blue);
          transform: translateY(-2px);
          position: relative;
          z-index: 2;
        }
        .clg__cell:hover .cs-wm { color: var(--mmc-blue); }
      `}</style>
    </div>
  );
}

window.ClientsLogoGrid = ClientsLogoGrid;
