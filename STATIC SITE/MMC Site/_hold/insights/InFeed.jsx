/* insights/InFeed.jsx, Articles feed with category filter + featured.

   House rule for this feed: no headline names a client, and no headline carries
   a client result. Pieces are about method, not about somebody's account. */

function InFeed() {
  const articles = [
    { kind: "Founder's Journal", featured: true, art: "blush", date: "Feb 14, 2026", read: "7 min",
      title: "Retention is the new acquisition.",
      ex: "We spent ₹4.2Cr last year acquiring customers we'd already paid to acquire once. The math behind why retention is the only growth lever that compounds at zero CAC, and the three creative levers we use to move it."
    },
    { kind: "Growth Breakdown",   art: "azure",  date: "Feb 02, 2026", read: "11 min",
      title: "What a 90-day performance rebuild actually involves.",
      ex: "The order we work in when an account has stopped responding to more budget: structure first, then creative, then offer, then retention. Why that sequence, and what we refuse to touch in week one." },
    { kind: "Team Playbook",       art: "ochre",  date: "Jan 28, 2026", read: "5 min",
      title: "The 14-day onboarding sprint, documented.",
      ex: "How we go from contract-signed to live media in two weeks. Day-by-day, what the pod ships, who owns what, and which questions we refuse to answer in week one." },
    { kind: "Expert Voices",       art: "sage",   date: "Jan 18, 2026", read: "9 min",
      title: "Why your iOS attribution is lying, and what to use instead.",
      ex: "The collapse of last-click attribution is well-documented. The triangulation model we've moved 12 brands onto is less so. Here's the spreadsheet." },
    { kind: "Founder's Journal",   art: "graphite", date: "Jan 10, 2026", read: "6 min",
      title: "Saying no is the highest-leverage thing we do.",
      ex: "We turned down ₹4.2Cr of retainer revenue last year. Why we keep doing that, what we've learned about the brands we're saying yes to, and the heuristic that filters them." },
    { kind: "Experiment",          art: "wine",   date: "Dec 28, 2025", read: "8 min",
      title: "We replaced our brief template. Cycle time dropped 32%.",
      ex: "Six months ago we threw out the agency brief and replaced it with a single-page hypothesis doc. The math on creative cycle time, and the unexpected impact on creative quality." },
    { kind: "Growth Breakdown",    art: "violet", date: "Dec 15, 2025", read: "12 min",
      title: "Building a lead engine when the sale happens offline.",
      ex: "Local search, WhatsApp follow-up and landing-page architecture for categories where nobody checks out on the website. What the stack looks like, and the order we assemble it in." },
    { kind: "Team Playbook",       art: "blush",  date: "Dec 03, 2025", read: "4 min",
      title: "How we structure a Meta account for compound growth.",
      ex: "Three campaign objectives, naming conventions for cohort tagging, and the eight ad sets we always run." },
  ];

  const featured = articles.find((a) => a.featured) || articles[0];
  const rest = articles.filter((a) => a !== featured);

  const categories = ["All", "Founder's Journal", "Growth Breakdown", "Team Playbook", "Expert Voices", "Experiment"];
  const [filter, setFilter] = React.useState("All");
  const filtered = filter === "All" ? rest : rest.filter((a) => a.kind === filter);

  return (
    <section className="inf">
      <div className="container">
        {/* Featured */}
        <a href="#article" className="inf__featured">
          <div className={"inf__feat-art inf__feat-art--" + featured.art} aria-hidden="true">
            <span className="inf__feat-grain"></span>
            <span className="inf__feat-kind">{featured.kind}</span>
          </div>
          <div className="inf__feat-body">
            <div className="inf__feat-meta">
              <span>{featured.date}</span>
              <span className="dot"></span>
              <span>{featured.read} read</span>
            </div>
            <h2 className="inf__feat-h">{featured.title}</h2>
            <p className="inf__feat-ex">{featured.ex}</p>
            <span className="inf__feat-cta">Read the essay <span className="arrow"></span></span>
          </div>
        </a>

        {/* Category filter */}
        <div className="inf__filter">
          <span className="inf__filter-label">Category</span>
          <div className="inf__chips">
            {categories.map((c) => {
              const count = c === "All" ? rest.length : rest.filter((a) => a.kind === c).length;
              return (
                <button key={c} className={"inf__chip " + (filter === c ? "is-on" : "")} onClick={() => setFilter(c)}>
                  {c}
                  <span className="inf__chip-n">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div className="inf__grid">
          {filtered.map((a, i) => (
            <a key={i} href="#article" className="inf__card">
              <div className={"inf__card-art inf__card-art--" + a.art} aria-hidden="true">
                <span className="inf__card-grain"></span>
                <span className="inf__card-kind">{a.kind}</span>
              </div>
              <div className="inf__card-body">
                <div className="inf__card-meta">
                  <span>{a.date}</span>
                  <span className="dot"></span>
                  <span>{a.read} read</span>
                </div>
                <h3 className="inf__card-h">{a.title}</h3>
                <p className="inf__card-ex">{a.ex}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Newsletter signup */}
        <div className="inf__newsletter">
          <div className="inf__news-l">
            <div className="eyebrow" style={{color: "var(--mmc-yellow)"}}>Subscribe</div>
            <h3 className="inf__news-h">One letter, every Monday morning.</h3>
            <p className="inf__news-sub">
              The one piece we shipped that week, plus what we learned. No promos, no upsells.
              2,400 readers across India, US, UK, and UAE.
            </p>
          </div>
          <form className="inf__news-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="you@brand.com" required />
            <button type="submit">
              Subscribe
              <span className="arrow"></span>
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .inf { position: relative; z-index: 1; padding: clamp(40px, 5vw, 64px) 0 clamp(56px, 8vw, 112px); }

        /* Featured */
        .inf__featured { display: grid; grid-template-columns: 1.1fr 1fr; gap: 0; background: rgba(255,255,255,0.94); border: 1px solid rgba(var(--mmc-blue-rgb), 0.12); border-radius: 20px; overflow: hidden; box-shadow: var(--shadow-3); color: var(--fg-1); margin-bottom: clamp(48px, 6vw, 80px); transition: transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out); }
        .inf__featured:hover { transform: translateY(-3px); color: var(--fg-1); box-shadow: 0 28px 80px -28px rgba(17,24,39,0.3);
          position: relative; z-index: 2;
        }
        .inf__feat-art { position: relative; min-height: 380px; padding: 28px; isolation: isolate; display: flex; align-items: flex-start; }
        .inf__feat-art--blush { background: radial-gradient(ellipse 80% 60% at 30% 30%, rgba(255,255,255,0.55), transparent 60%), linear-gradient(135deg, #F6CDB4, #DC8E73); color: var(--mmc-blue-700); }
        .inf__feat-grain { position: absolute; inset: 0; opacity: 0.14; mix-blend-mode: multiply; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"); pointer-events: none; }
        .inf__feat-kind { position: relative; z-index: 2; font-family: var(--font-body); font-size: 10.5px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; padding: 6px 12px; background: rgba(255,255,255,0.65); border-radius: 999px; backdrop-filter: blur(8px); }
        .inf__feat-body { padding: clamp(28px, 3.4vw, 48px); display: flex; flex-direction: column; gap: 16px; }
        .inf__feat-meta { display: inline-flex; gap: 10px; align-items: center; font-family: var(--font-body); font-size: 11.5px; font-weight: 600; letter-spacing: 0.08em; color: var(--fg-3); text-transform: uppercase; }
        .inf__feat-meta .dot { width: 3px; height: 3px; border-radius: 50%; background: var(--mmc-blue); }
        .inf__feat-h { font-family: var(--font-display); font-weight: 700; font-size: clamp(28px, 3.6vw, 48px); letter-spacing: -0.025em; line-height: 1.05; color: var(--fg-1); margin: 0; }
        .inf__feat-ex { font-family: var(--font-body); font-size: 15.5px; line-height: 1.6; color: var(--fg-2); margin: 0; }
        .inf__feat-cta { display: inline-flex; align-items: center; gap: 14px; margin-top: auto; padding-bottom: 4px; font-family: var(--font-body); font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--mmc-blue); border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.25); align-self: flex-start; }
        .inf__feat-cta .arrow { width: 18px; height: 1.5px; background: currentColor; position: relative; transition: width var(--dur-base) var(--ease-out); }
        .inf__feat-cta .arrow::after { content: ""; position: absolute; right: -1px; top: -4px; width: 8px; height: 8px; border-top: 1.5px solid currentColor; border-right: 1.5px solid currentColor; transform: rotate(45deg); }
        .inf__featured:hover .inf__feat-cta .arrow { width: 28px; }

        /* Filter, unified site-wide chip style */
        .inf__filter {
          display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
          margin-bottom: 32px;
          padding: 18px 20px;
          background: rgba(255,255,255,0.6);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          border-radius: 14px;
          backdrop-filter: blur(8px);
        }
        .inf__filter-label {
          font-family: var(--font-body); font-size: 10px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase; color: var(--mmc-yellow);
          min-width: 92px;
        }
        .inf__chips { display: flex; flex-wrap: wrap; gap: 6px; }
        .inf__chip {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-body); font-size: 12px; font-weight: 600;
          padding: 8px 14px; border-radius: 999px;
          background: #fff; border: 1px solid rgba(var(--mmc-blue-rgb), 0.16);
          color: var(--fg-1); cursor: pointer;
          transition: all var(--dur-base) var(--ease-out);
        }
        .inf__chip:hover { border-color: var(--mmc-blue); color: var(--mmc-blue); }
        .inf__chip.is-on {
          background: var(--mmc-yellow);
          color: var(--mmc-blue-700);
          border-color: var(--mmc-yellow);
          box-shadow: 0 6px 18px -8px rgba(var(--mmc-yellow-rgb), 0.55);
          font-weight: 700;
        }
        .inf__chip.is-on .inf__chip-n { color: var(--mmc-blue-700); opacity: 0.55; }
        .inf__chip-n { font-family: var(--font-display); font-size: 10px; opacity: 0.6; font-variant-numeric: tabular-nums; color: var(--mmc-blue); }

        /* Grid */
        .inf__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(16px, 1.8vw, 24px); margin-bottom: clamp(48px, 6vw, 72px); }
        .inf__card { background: rgba(255,255,255,0.82); backdrop-filter: blur(14px); border: 1px solid rgba(var(--mmc-blue-rgb), 0.10); border-radius: 14px; overflow: hidden; color: var(--fg-1); transition: transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out); display: flex; flex-direction: column; }
        .inf__card:hover { transform: translateY(-3px); color: var(--fg-1); box-shadow: var(--shadow-2);
          position: relative; z-index: 2;
        }
        .inf__card-art { position: relative; aspect-ratio: 16 / 10; padding: 16px; isolation: isolate; }
        .inf__card-art--blush { background: radial-gradient(ellipse 80% 60% at 30% 30%, rgba(255,255,255,0.55), transparent 60%), linear-gradient(135deg, #F6CDB4, #DC8E73); color: var(--mmc-blue-700); }
        .inf__card-art--azure { background: radial-gradient(ellipse 70% 50% at 70% 20%, rgba(255,255,255,0.32), transparent 60%), linear-gradient(135deg, var(--mmc-blue), #356CC9); color: #fff; }
        .inf__card-art--ochre { background: radial-gradient(ellipse 80% 60% at 30% 70%, rgba(255,255,255,0.42), transparent 60%), linear-gradient(135deg, #E8C778, #C49230); color: var(--mmc-blue-700); }
        .inf__card-art--sage { background: radial-gradient(ellipse 80% 60% at 60% 30%, rgba(255,255,255,0.35), transparent 60%), linear-gradient(135deg, #C9D3B8, #7F9A6A); color: var(--mmc-blue-700); }
        .inf__card-art--graphite { background: radial-gradient(ellipse 70% 50% at 20% 20%, rgba(255,255,255,0.16), transparent 60%), linear-gradient(135deg, #2D3748, #1A1F2C); color: #fff; }
        .inf__card-art--wine { background: radial-gradient(ellipse 80% 60% at 80% 30%, rgba(255,255,255,0.18), transparent 60%), linear-gradient(135deg, #7A2A3A, #4A1721); color: #fff; }
        .inf__card-art--violet { background: radial-gradient(ellipse 80% 60% at 30% 30%, rgba(255,255,255,0.32), transparent 60%), linear-gradient(135deg, #D5C5E8, #7E63A8); color: var(--mmc-blue-700); }
        .inf__card-grain { position: absolute; inset: 0; opacity: 0.16; mix-blend-mode: multiply; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"); pointer-events: none; }
        .inf__card-kind { font-family: var(--font-body); font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; padding: 5px 10px; background: rgba(255,255,255,0.55); border-radius: 999px; backdrop-filter: blur(8px); display: inline-block; }
        .inf__card-art--graphite .inf__card-kind, .inf__card-art--wine .inf__card-kind, .inf__card-art--azure .inf__card-kind { background: rgba(255,255,255,0.22); color: #fff; }
        .inf__card-body { padding: 18px 22px 22px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
        .inf__card-meta { display: inline-flex; gap: 10px; align-items: center; font-family: var(--font-body); font-size: 10.5px; font-weight: 600; letter-spacing: 0.08em; color: var(--fg-3); text-transform: uppercase; }
        .inf__card-meta .dot { width: 3px; height: 3px; border-radius: 50%; background: var(--mmc-blue); }
        .inf__card-h { font-family: var(--font-display); font-weight: 700; font-size: clamp(18px, 1.55vw, 21px); letter-spacing: -0.018em; line-height: 1.2; color: var(--fg-1); margin: 0; }
        .inf__card-ex { font-family: var(--font-body); font-size: 13.5px; line-height: 1.55; color: var(--fg-2); margin: 0; flex: 1; }

        /* Newsletter */
        .inf__newsletter { background: var(--mmc-blue); color: #fff; border-radius: 18px; padding: clamp(36px, 4.6vw, 56px); display: grid; grid-template-columns: 1.4fr 1fr; gap: 36px; align-items: center; position: relative; overflow: hidden; }
        .inf__newsletter::before { content: ""; position: absolute; right: -10%; top: -30%; width: 320px; height: 320px; border-radius: 50%; background: radial-gradient(circle, rgba(var(--mmc-yellow-rgb), 0.3), rgba(var(--mmc-yellow-rgb), 0) 60%); pointer-events: none; }
        .inf__news-l { position: relative; }
        .inf__news-l .eyebrow::before { background: var(--mmc-yellow); }
        .inf__news-h { font-family: var(--font-display); font-weight: 600; font-size: clamp(28px, 3.2vw, 40px); letter-spacing: -0.025em; line-height: 1.05; color: #fff; margin: 18px 0 14px; }
        .inf__news-sub { font-family: var(--font-body); font-size: 15px; line-height: 1.55; color: rgba(255,255,255,0.78); margin: 0; max-width: 520px; }
        .inf__news-form { display: flex; gap: 8px; position: relative; }
        .inf__news-form input { flex: 1; padding: 14px 18px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.22); background: rgba(255,255,255,0.06); color: #fff; font-family: var(--font-body); font-size: 14px; font-weight: 500; }
        .inf__news-form input::placeholder { color: rgba(255,255,255,0.5); }
        .inf__news-form input:focus { outline: none; border-color: var(--mmc-yellow); }
        .inf__news-form button { display: inline-flex; align-items: center; gap: 10px; padding: 14px 20px; background: var(--mmc-yellow); color: var(--mmc-blue-700); border-radius: 10px; font-family: var(--font-body); font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: background var(--dur-base) var(--ease-out); }
        .inf__news-form button:hover { background: #F8A800; }
        .inf__news-form button .arrow { width: 18px; height: 1.5px; background: currentColor; position: relative; }
        .inf__news-form button .arrow::after { content: ""; position: absolute; right: -1px; top: -4px; width: 8px; height: 8px; border-top: 1.5px solid currentColor; border-right: 1.5px solid currentColor; transform: rotate(45deg); }

        @media (max-width: 880px) {
          .inf__featured { grid-template-columns: 1fr; }
          .inf__feat-art { min-height: 220px; }
          .inf__grid { grid-template-columns: 1fr 1fr; }
          .inf__newsletter { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .inf__grid { grid-template-columns: 1fr; }
          .inf__news-form { flex-direction: column; }
        }
      `}</style>
    </section>
  );
}
window.InFeed = InFeed;
