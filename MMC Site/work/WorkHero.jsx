/* work/WorkHero.jsx */

function WorkHero({ onAudit }) {
  const [enter, setEnter] = React.useState(false);
  React.useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setEnter(true)));
  }, []);
  const clip = (e = "") => "clip-reveal " + (enter ? "in " : "") + e;
  const reveal = (e = "") => "reveal " + (enter ? "in " : "") + e;

  return (
    <section className="page-hero wh" id="top" data-wm="Work">
        <span className="page-hero__wm" aria-hidden="true">Work</span>
      <div className="container wh__inner">
        {/* The book has no country column, so the old "4 countries" claim had no
            source. The type split does, straight from content/clients.json. */}
        <div className={"eyebrow " + (enter ? "in" : "")}>Our work · 25 brands · 9 B2B, 9 D2C, 7 B2C</div>
        <h1 className="wh__h">
          <span className={clip("d1")}><span>25 brands.</span></span>
          <span className={clip("d2")}><span><span className="em-serif">One</span> common thesis:</span></span>
          <span className={clip("d3")}><span>revenue that compounds.</span></span>
        </h1>
        <p className={reveal("d4 wh__sub")}>
          The full book, brand by brand: what kind of business each one is, and the services
          we actually run for them. Where a number is not ours to publish, we have left it out.
        </p>

        <div className={reveal("d5 wh__meta")}>
          <div><span className="num">₹248<i>Cr+</i></span><span className="lbl">Revenue compounded</span></div>
          <div><span className="num">8.7<i>×</i></span><span className="lbl">Median ROAS</span></div>
          <div><span className="num">14<i>/14</i></span><span className="lbl">Brands renewed</span></div>
          <div><span className="num">27<i>mo</i></span><span className="lbl">Median tenure</span></div>
        </div>
      </div>

      <style>{`
        .wh { position: relative; z-index: 1; padding: 140px 0 clamp(48px, 6vw, 80px); }
        .wh__inner { max-width: none; }
        .wh__h { font-family: var(--font-display); font-weight: 700; font-size: clamp(44px, 6vw, 100px); line-height: 0.98; letter-spacing: -0.035em; color: var(--fg-1); margin: 22px 0 28px; }
        .wh__h .clip-reveal { display: block; }
        .wh__sub { font-family: var(--font-body); font-size: clamp(17px, 1.4vw, 22px); line-height: 1.5; color: var(--fg-2); max-width: 600px; margin: 0 0 48px; }
        .wh__meta { display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(16px, 2vw, 36px); padding-top: 28px; border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.18); }
        .wh__meta > div { display: flex; flex-direction: column; gap: 4px; }
        .wh__meta .num { font-family: var(--font-display); font-weight: 700; font-size: clamp(28px, 3vw, 42px); letter-spacing: -0.03em; color: var(--mmc-blue); }
        .wh__meta .num i { font-style: normal; color: var(--mmc-yellow); font-size: 0.55em; margin-left: 3px; }
        .wh__meta .lbl { font-family: var(--font-body); font-size: 10.5px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--fg-3); }
        @media (max-width: 720px) { .wh__meta { grid-template-columns: 1fr 1fr; } }
      `}</style>
    </section>
  );
}
window.WorkHero = WorkHero;
