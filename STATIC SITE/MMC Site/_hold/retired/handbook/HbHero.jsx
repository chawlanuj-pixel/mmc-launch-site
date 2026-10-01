/* ─────────────────────────────────────────────────────────────────────────
   THIS CASE STUDY IS FICTIONAL. DO NOT PUBLISH IT.

   "DeoBar Skin Co." is not a client. The founder story, the Rs 24.6Cr net
   revenue, the 11.8x blended ROAS, the 78% D90 retention and the +587% YoY
   figure on this page were all invented before MMC supplied its real client
   book (content/clients.json, 2026-08-24).

   The page is therefore unlinked from the footer, removed from sitemap.xml,
   stripped of its Article schema and marked noindex in content/seo.json.

   The LAYOUT is good and worth keeping as the template for a real case study.
   To use it: replace every figure and every mention of DeoBar with a real
   client's real numbers, set noindex back to false in content/seo.json, add the
   page back to the footer, and re-run ./build.sh. Until then it stays dark.
   ───────────────────────────────────────────────────────────────────────── */

/* handbook/HbHero.jsx, Brand Handbook hero */

function HbHero({ onAudit }) {
  const [enter, setEnter] = React.useState(false);
  React.useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setEnter(true)));
  }, []);
  const clip = (e = "") => "clip-reveal " + (enter ? "in " : "") + e;
  const reveal = (e = "") => "reveal " + (enter ? "in " : "") + e;

  return (
    <section className="page-hero hb-hero" id="top" data-wm="Handbook">
        <span className="page-hero__wm" aria-hidden="true">Handbook</span>
      <div className="container hb-hero__inner">
        <nav className={"hb-hero__crumb " + (enter ? "in" : "")} aria-label="Breadcrumb">
          <a href="index.html">Home</a>
          <span className="sep">·</span>
          <a href="Our Work.html">Our Work</a>
          <span className="sep">·</span>
          <span className="current">DeoBar Skin Co.</span>
        </nav>

        <div className="hb-hero__tags">
          <span>D2C · Beauty</span>
          <span>Q4 2024 – Q1 2026</span>
          <span>5 systems</span>
        </div>

        <h1 className="hb-hero__h">
          <span className={clip("d1")}><span>DeoBar.</span></span>
          <span className={clip("d2")}><span>How we{" "}
            <span className="em-serif">rebuilt</span>{" "}
            a stuck</span></span>
          <span className={clip("d3")}><span>brand in 90 days.</span></span>
        </h1>

        <p className={reveal("d4 hb-hero__sub")}>
          Three agencies in. Margin bleeding. Retention flat past D60. Then we got the call.
          This is the full handbook: what we did, why, and what we'd do differently.
        </p>

        <div className={reveal("d5 hb-hero__metrics")}>
          <div><span className="n">11.8<i>×</i></span><span className="l">Blended ROAS · D90</span></div>
          <div><span className="n">78<i>%</i></span><span className="l">D90 Retention</span></div>
          <div><span className="n">₹24.6<i>Cr</i></span><span className="l">Net revenue · 12mo</span></div>
          <div><span className="n">+587<i>%</i></span><span className="l">YoY net revenue</span></div>
        </div>
      </div>

      {/* Big visual block */}
      <div className="container">
        <div className="hb-hero__art" aria-hidden="true">
          <span className="hb-hero__art-grain"></span>
          <div className="hb-hero__art-mark">DB</div>
          <div className="hb-hero__art-meta">
            <span>DeoBar Skin Co.</span>
            <span className="dot"></span>
            <span>Founded 2022 · Bengaluru</span>
            <span className="dot"></span>
            <span>D2C · Beauty + Personal Care</span>
          </div>
        </div>
      </div>

      <style>{`
        .hb-hero { position: relative; z-index: 1; padding: 140px 0 clamp(40px, 5vw, 56px); }
        .hb-hero__inner { max-width: none; }
        .hb-hero__crumb { font-family: var(--font-body); font-size: 11.5px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--fg-3); margin-bottom: 28px; opacity: 0; transition: opacity 700ms var(--ease-out); }
        .hb-hero__crumb.in { opacity: 1; }
        .hb-hero__crumb a { color: var(--fg-3); transition: color var(--dur-base) var(--ease-out); }
        .hb-hero__crumb a:hover { color: var(--mmc-blue); }
        .hb-hero__crumb .sep { margin: 0 10px; color: rgba(75,85,99,0.4); }
        .hb-hero__crumb .current { color: var(--mmc-blue); }

        .hb-hero__tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 28px; }
        .hb-hero__tags span { font-family: var(--font-body); font-size: 10.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; padding: 6px 12px; background: rgba(255,255,255,0.6); border: 1px solid rgba(var(--mmc-blue-rgb), 0.12); border-radius: 999px; color: var(--mmc-blue-700); backdrop-filter: blur(8px); }

        .hb-hero__h { font-family: var(--font-display); font-weight: 700; font-size: clamp(48px, 6.4vw, 104px); line-height: 0.96; letter-spacing: -0.035em; color: var(--fg-1); margin: 0 0 28px; }
        .hb-hero__h .clip-reveal { display: block; }
        .hb-hero__sub { font-family: var(--font-body); font-size: clamp(17px, 1.4vw, 22px); line-height: 1.5; color: var(--fg-2); max-width: 620px; margin: 0 0 48px; }
        .hb-hero__metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(16px, 2vw, 36px); padding-top: 28px; border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.18); margin-bottom: clamp(48px, 6vw, 80px); }
        .hb-hero__metrics > div { display: flex; flex-direction: column; gap: 4px; }
        .hb-hero__metrics .n { font-family: var(--font-display); font-weight: 700; font-size: clamp(28px, 3vw, 42px); letter-spacing: -0.03em; color: var(--mmc-blue); }
        .hb-hero__metrics .n i { font-style: normal; color: var(--mmc-yellow); font-size: 0.55em; margin-left: 3px; }
        .hb-hero__metrics .l { font-family: var(--font-body); font-size: 10.5px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--fg-3); }

        .hb-hero__art {
          position: relative;
          aspect-ratio: 21 / 9;
          background: radial-gradient(ellipse 80% 60% at 30% 30%, rgba(255,255,255,0.55), transparent 60%), linear-gradient(135deg, #F6CDB4, #DC8E73);
          color: var(--mmc-blue-700);
          border-radius: 20px;
          overflow: hidden;
          isolation: isolate;
          display: flex;
          align-items: flex-end;
          padding: clamp(28px, 3vw, 44px);
        }
        .hb-hero__art-grain { position: absolute; inset: 0; opacity: 0.14; mix-blend-mode: multiply; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"); pointer-events: none; }
        .hb-hero__art-mark { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-family: var(--font-display); font-weight: 800; font-size: clamp(180px, 22vw, 360px); line-height: 0.82; letter-spacing: -0.06em; color: rgba(255,255,255,0.6); }
        .hb-hero__art-meta { position: relative; z-index: 2; display: inline-flex; align-items: center; gap: 14px; flex-wrap: wrap; font-family: var(--font-body); font-size: 11.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; padding: 10px 16px; background: rgba(255,255,255,0.78); border-radius: 999px; backdrop-filter: blur(8px); }
        .hb-hero__art-meta .dot { width: 4px; height: 4px; border-radius: 50%; background: var(--mmc-blue); }

        @media (max-width: 720px) { .hb-hero__metrics { grid-template-columns: 1fr 1fr; } .hb-hero__art { aspect-ratio: 4 / 3; } }
      `}</style>
    </section>
  );
}
window.HbHero = HbHero;
