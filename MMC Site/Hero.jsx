/* Hero.jsx, Editorial hero with performance dashboard preview.
   The sun is owned globally by Sky.jsx now: hero only contributes content,
   a momentum arc line, and the partners platform strip. */

function Hero({ heroVariant, onAudit }) {
  const [enter, setEnter] = React.useState(false);
  const [time, setTime] = React.useState({ day: "Monday", t: "" });
  const heroRef = React.useRef(null);

  React.useEffect(() => {
    let r1, r2;
    r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setEnter(true));
    });
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
  }, []);

  React.useEffect(() => {
    const tick = () => {
      const d = new Date();
      const day = d.toLocaleDateString("en-IN", { weekday: "long", timeZone: "Asia/Kolkata" });
      const t = d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" });
      setTime({ day, t });
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const reveal = (extra = "") => "reveal " + (enter ? "in " : "") + extra;
  const clip   = (extra = "") => "clip-reveal " + (enter ? "in " : "") + extra;
  const variant = heroVariant || "manifesto";

  // Platforms MMC runs on, brand color cues without recreating distinctive logos.
  const partners = [
    { name: "Meta",        color: "#0866FF", mono: "M" },
    { name: "Google Ads",  color: "#1E73E8", mono: "G" },
    { name: "Shopify",     color: "#5C8A3A", mono: "S" },
    { name: "Amazon Ads",  color: "#FF9900", mono: "A" },
    { name: "Klaviyo",     color: "#1F4D2C", mono: "K" },
    { name: "GA4",         color: "#E37400", mono: "G" },
    { name: "Razorpay",    color: "#072654", mono: "R" },
    { name: "WebEngage",   color: "#6D2EBA", mono: "W" },
  ];

  return (
    <section id="top" className={"mmc-hero v-" + variant} ref={heroRef}>
      {/* Momentum growth arc, single SVG line that draws on load */}
      <svg className="mmc-hero__line" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
        <path className="mmc-hero__path"
          d="M 0 780 C 320 780, 580 580, 780 420 S 1280 160, 1600 60"
          fill="none" stroke="var(--mmc-yellow)"
          strokeWidth="1.75" strokeLinecap="round" opacity="0.65" />
      </svg>

      {/* Floating top meta */}
      <div className={"mmc-hero__topmeta " + (enter ? "in " : "")}>
        <span className="mmc-hero__topmeta-pill">
          <span className="dot"></span>
          {time.day} · {time.t} IST · Bengaluru
        </span>
      </div>

      <div className="container mmc-hero__inner">
        <div className="mmc-hero__head">
          <div className={"mmc-hero__eyebrow eyebrow " + (enter ? "in" : "")}>
            <span>Full-service performance · D2C growth studio</span>
          </div>

          {variant === "numbers" ?
            <h1 className="mmc-hero__h">
              <span className={clip("d1")}><span>₹248Cr+</span></span>
              <span className="mmc-hero__h-sub">
                <span className={clip("d2")}><span>of D2C revenue,</span></span>
                <span className={clip("d3")}><span>compounded.</span></span>
              </span>
            </h1> :
          variant === "editorial" ?
            <h1 className="mmc-hero__h mmc-hero__h--editorial">
              <span className={clip("d1")}><span>Modern brands</span></span>
              <span className={clip("d2")}><span>don't grow on ads -</span></span>
              <span className={clip("d3")}><span>they grow on <span className="em-serif" style={{ color: "var(--mmc-blue)" }}>memory.</span></span></span>
            </h1> :
            <h1 className="mmc-hero__h">
              <span className={clip("d1")}><span>We don't run</span></span>
              <span className={clip("d2")}><span>ads.</span></span>
              <span className="mmc-hero__h-line2">
                <span className={clip("d3")}>
                  <span>We build <span className="em-serif" style={{ color: "var(--mmc-blue)" }}>revenue engines.</span></span>
                </span>
              </span>
            </h1>
          }

          <p className={reveal("d4 mmc-hero__sub")}>
            A full-service growth studio: Design × Marketing × Technology × Content × AI,
            for modern consumer brands. Compounded, not campaigned.
          </p>

          <div className={reveal("d5 mmc-hero__actions")}>
            <button className="btn btn--primary glow-btn" onClick={onAudit}>
              <span className="glow-btn__glow" aria-hidden="true"></span>
              <span className="glow-btn__inner">
                Get a free brand audit
                <span className="arrow"></span>
              </span>
            </button>
            <a className="btn btn--link" href="#work">
              See the work
              <span className="arrow"></span>
            </a>
          </div>

          {/* Partner platforms strip, brand-colored monogram chips */}
          <div className={reveal("d6 mmc-hero__partners")}>
            <span className="mmc-hero__partners-label">
              <span className="dot"></span>
              Platforms we run
            </span>
            <span className="mmc-hero__partners-row">
              {partners.map((p) => (
                <span className="mmc-hero__partner" key={p.name} title={p.name}>
                  <span className="mmc-hero__partner-mark"
                        style={{ "--brand": p.color }}>
                    <span className="mmc-hero__partner-mono">{p.mono}</span>
                  </span>
                  <span className="mmc-hero__partner-name">{p.name}</span>
                </span>
              ))}
            </span>
          </div>
        </div>

        {/* Right column, Performance dashboard mock */}
        <div className={reveal("d4 mmc-hero__panel")}>
          <DashboardPreview enter={enter} />
          <div className="mmc-hero__stamp" aria-hidden="true">
            <svg viewBox="0 0 120 120" width="84" height="84">
              <defs>
                <path id="circ" d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0" />
              </defs>
              <text fontSize="8.5" fontWeight="700" letterSpacing="2.6" fill="var(--mmc-blue)" fontFamily="Raleway, sans-serif">
                <textPath href="#circ">FULL-SERVICE · PERFORMANCE · RETENTION · CREATIVE · </textPath>
              </text>
              <text x="60" y="66" textAnchor="middle" fontFamily="Cormorant Garamond, serif"
                fontStyle="italic" fontSize="22" fill="var(--mmc-blue)">m.</text>
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        .mmc-hero {
          position: relative;
          z-index: 1;
          padding-top: 124px;
          padding-bottom: clamp(48px, 7vw, 96px);
          background: transparent;          /* Sky shows through */
          overflow: hidden;
          isolation: isolate;
        }
        .mmc-hero__line {
          position: absolute;
          left: 0; right: 0; top: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          z-index: 0;
        }
        .mmc-hero__path {
          stroke-dasharray: 2400;
          stroke-dashoffset: 2400;
          animation: drawPath 2400ms 400ms var(--ease-out) forwards;
        }
        @keyframes drawPath { to { stroke-dashoffset: 0; } }

        /* Top meta pill */
        .mmc-hero__topmeta {
          position: absolute;
          top: 92px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 4;
          opacity: 0;
          transition: opacity 800ms var(--ease-out) 240ms;
          pointer-events: none;
        }
        .mmc-hero__topmeta.in { opacity: 1; }
        .mmc-hero__topmeta-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 7px 16px 7px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.78);
          backdrop-filter: blur(14px);
          border: 1px solid var(--mmc-border);
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--mmc-blue);
        }
        .mmc-hero__topmeta-pill .dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--mmc-yellow);
          box-shadow: 0 0 0 4px rgba(var(--mmc-yellow-rgb), 0.18);
          animation: pulse2 2.4s var(--ease-out) infinite;
        }
        @keyframes pulse2 {
          0%,100% { box-shadow: 0 0 0 4px rgba(var(--mmc-yellow-rgb), 0.18); }
          50%     { box-shadow: 0 0 0 7px rgba(var(--mmc-yellow-rgb), 0.05); }
        }

        /* Layout */
        .mmc-hero__inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: clamp(36px, 5vw, 80px);
          align-items: end;
          padding-top: 28px;
          min-height: 64vh;
        }
        .mmc-hero__eyebrow {
          margin-bottom: clamp(20px, 2.5vw, 32px);
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 700ms var(--ease-out) 80ms, transform 700ms var(--ease-out) 80ms;
        }
        .mmc-hero__eyebrow.in { opacity: 1; transform: translateY(0); }

        .mmc-hero__h {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(44px, 6.4vw, 100px);
          line-height: 0.96;
          letter-spacing: -0.035em;
          color: var(--fg-1);
          margin: 0;
        }
        .mmc-hero__h .clip-reveal { display: block; }
        .mmc-hero__h-line2 { display: block; }
        .mmc-hero__h--editorial {
          font-weight: 500;
          font-size: clamp(40px, 5.4vw, 84px);
          letter-spacing: -0.025em;
        }
        .mmc-hero__h-sub {
          display: block;
          font-size: 0.34em;
          font-weight: 500;
          color: var(--fg-2);
          letter-spacing: -0.005em;
          margin-top: 16px;
          line-height: 1.18;
        }

        .mmc-hero__sub {
          font-family: var(--font-body);
          font-size: clamp(16px, 1.15vw, 18px);
          line-height: 1.55;
          color: var(--fg-2);
          max-width: 560px;
          margin: clamp(24px, 2.6vw, 32px) 0 clamp(24px, 2.6vw, 32px);
        }
        .mmc-hero__actions {
          display: inline-flex;
          align-items: center;
          gap: 22px;
          flex-wrap: wrap;
        }

        /* Partner platforms strip */
        .mmc-hero__partners {
          margin-top: clamp(32px, 4vw, 52px);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .mmc-hero__partners-label {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-body);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--fg-3);
        }
        .mmc-hero__partners-label .dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--mmc-yellow);
        }
        .mmc-hero__partners-row {
          display: inline-flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px 12px;
        }
        .mmc-hero__partner {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px 6px 6px;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          border-radius: 999px;
          backdrop-filter: blur(8px);
          transition: background var(--dur-base) var(--ease-out),
                      border-color var(--dur-base) var(--ease-out),
                      transform var(--dur-base) var(--ease-out);
        }
        .mmc-hero__partner:hover {
          background: rgba(255, 255, 255, 0.95);
          border-color: rgba(var(--mmc-blue-rgb), 0.22);
          transform: translateY(-1px);
          position: relative; z-index: 2;
        }
        .mmc-hero__partner-mark {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--brand, var(--mmc-blue));
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.25),
                      0 1px 3px rgba(0, 0, 0, 0.08);
        }
        .mmc-hero__partner-mono {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 12px;
          letter-spacing: -0.02em;
          color: #fff;
          line-height: 1;
        }
        .mmc-hero__partner-name {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 13.5px;
          letter-spacing: -0.005em;
          color: var(--mmc-text);
        }
        .mmc-hero__partner:hover .mmc-hero__partner-name {
          color: var(--mmc-blue);
        }

        /* Right panel */
        .mmc-hero__panel {
          align-self: end;
          justify-self: end;
          width: 100%;
          max-width: 460px;
          position: relative;
        }
        .mmc-hero__stamp {
          position: absolute;
          top: -42px;
          left: -42px;
          width: 84px; height: 84px;
          animation: spin 28s linear infinite;
          z-index: 3;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 980px) {
          .mmc-hero__inner { grid-template-columns: 1fr; align-items: start; }
          .mmc-hero__panel { justify-self: start; max-width: 100%; }
          .mmc-hero__stamp { display: none; }
        }
        @media (max-width: 720px) {
          .mmc-hero__topmeta { display: none; }
        }
      `}</style>
    </section>
  );
}

/* ============================================================
   DashboardPreview, performance mock
   ============================================================ */
function DashboardPreview({ enter }) {
  const channels = [
    { name: "Meta",    spend: 38, roas: 6.4,  trend: "+18%", color: "var(--mmc-blue)" },
    { name: "Google",  spend: 28, roas: 9.2,  trend: "+24%", color: "var(--mmc-blue)" },
    { name: "Amazon",  spend: 16, roas: 12.6, trend: "+41%", color: "var(--mmc-yellow)" },
    { name: "TikTok",  spend: 12, roas: 4.8,  trend: "+62%", color: "var(--mmc-blue)" },
    { name: "Email",   spend:  6, roas: 22.1, trend: "+9%",  color: "var(--mmc-yellow)" },
  ];

  return (
    <div className="dash">
      <div className="dash__head">
        <div className="dash__brand">
          <span className="dash__brand-mark">M</span>
          <div>
            <div className="dash__brand-name">MMC · Client book</div>
            <div className="dash__brand-meta">24 brands · last 90d</div>
          </div>
        </div>
        <div className="dash__live">
          <span className="dash__live-dot"></span>
          <span>Live</span>
        </div>
      </div>

      <div className="dash__hero">
        <div className="dash__hero-l">
          <div className="dash__hero-label">Blended ROAS · 90d</div>
          <div className="dash__hero-num">
            <CountUp to={8.7} suffix="×" decimals={1} />
          </div>
          <div className="dash__hero-delta">
            <span className="dash__hero-delta-arrow">↗</span>
            <span>+2.3× vs. industry · 24% MoM</span>
          </div>
        </div>
        <div className="dash__hero-r">
          <svg viewBox="0 0 200 80" className="dash__spark" preserveAspectRatio="none">
            <defs>
              <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"  stopColor="var(--mmc-yellow)" stopOpacity="0.45" />
                <stop offset="100%" stopColor="var(--mmc-yellow)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M 0 62 L 18 58 L 36 60 L 54 50 L 72 48 L 90 38 L 108 42 L 126 30 L 144 28 L 162 18 L 180 14 L 200 6 L 200 80 L 0 80 Z"
              fill="url(#sparkFill)" className={"dash__spark-fill " + (enter ? "in" : "")} />
            <path d="M 0 62 L 18 58 L 36 60 L 54 50 L 72 48 L 90 38 L 108 42 L 126 30 L 144 28 L 162 18 L 180 14 L 200 6"
              fill="none" stroke="var(--mmc-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className={"dash__spark-line " + (enter ? "in" : "")} />
            <circle cx="200" cy="6" r="3.5" fill="var(--mmc-yellow)" className={"dash__spark-dot " + (enter ? "in" : "")} />
          </svg>
        </div>
      </div>

      <div className="dash__section">
        <div className="dash__section-head">
          <span>Channel mix</span>
          <span className="dash__section-meta">5 channels</span>
        </div>
        <div className="dash__channels">
          {channels.map((c, i) => (
            <div className="dash__row" key={c.name}>
              <span className="dash__row-name">{c.name}</span>
              <div className="dash__row-bar">
                <span style={{
                  width: enter ? (c.spend * 2.2) + "%" : "0%",
                  background: c.color,
                  transitionDelay: (i * 80 + 400) + "ms"
                }}></span>
              </div>
              <span className="dash__row-roas">{c.roas.toFixed(1)}×</span>
              <span className="dash__row-trend">{c.trend}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="dash__mini">
        <div>
          <span className="dash__mini-num">98<i>%</i></span>
          <span className="dash__mini-lbl">D90 Retention</span>
        </div>
        <div>
          <span className="dash__mini-num">24.6<i>K</i></span>
          <span className="dash__mini-lbl">New customers</span>
        </div>
        <div>
          <span className="dash__mini-num">₹24.6<i>Cr</i></span>
          <span className="dash__mini-lbl">Net revenue Q1</span>
        </div>
      </div>

      <div className="dash__creatives">
        <div className="dash__creatives-label">In rotation</div>
        <div className="dash__creatives-grid">
          {Array.from({ length: 5 }).map((_, i) => (
            <div className={"dash__creative dash__creative--" + i} key={i}>
              <span className="dash__creative-meta">{["UGC", "Static", "Carousel", "Reel", "Email"][i]}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .dash {
          background: rgba(255, 255, 255, 0.94);
          border: 1px solid var(--mmc-border);
          backdrop-filter: blur(14px);
          border-radius: 18px;
          padding: 18px 18px 16px;
          box-shadow: var(--shadow-3);
          position: relative;
          font-family: var(--font-body);
          font-size: 13px;
          color: var(--fg-1);
        }
        .dash__head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--mmc-border);
        }
        .dash__brand { display: inline-flex; align-items: center; gap: 10px; }
        .dash__brand-mark {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: var(--mmc-blue);
          color: var(--mmc-yellow);
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 14px;
          display: inline-flex; align-items: center; justify-content: center;
        }
        .dash__brand-name {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 13.5px;
          color: var(--mmc-text);
        }
        .dash__brand-meta {
          font-size: 10.5px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--fg-3);
          font-weight: 600;
        }
        .dash__live {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 5px 10px 5px 8px;
          border-radius: 999px;
          background: rgba(43, 181, 115, 0.08);
          color: #1F8A5B;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .dash__live-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #2BB573;
          animation: pulse 2.4s var(--ease-out) infinite;
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 4px rgba(43, 181, 115, 0.18); }
          50%     { box-shadow: 0 0 0 7px rgba(43, 181, 115, 0.05); }
        }

        .dash__hero {
          display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
          align-items: end; padding: 16px 0 14px;
          border-bottom: 1px solid var(--mmc-border);
        }
        .dash__hero-label {
          font-size: 10.5px; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--fg-3); font-weight: 600; margin-bottom: 6px;
        }
        .dash__hero-num .countup {
          font-family: var(--font-display); font-weight: 700; font-size: 44px;
          line-height: 0.95; letter-spacing: -0.04em; color: var(--mmc-blue);
          font-variant-numeric: tabular-nums;
        }
        .dash__hero-num .suffix { color: var(--mmc-yellow); }
        .dash__hero-delta {
          display: flex; align-items: center; gap: 6px;
          font-size: 11px; color: #1F8A5B; font-weight: 700;
          letter-spacing: 0.04em; margin-top: 6px;
        }
        .dash__hero-delta-arrow { font-size: 13px; line-height: 1; }
        .dash__hero-r { height: 70px; position: relative; }
        .dash__spark { width: 100%; height: 100%; }
        .dash__spark-line {
          stroke-dasharray: 280; stroke-dashoffset: 280;
          transition: stroke-dashoffset 1600ms var(--ease-out) 500ms;
        }
        .dash__spark-line.in { stroke-dashoffset: 0; }
        .dash__spark-fill { opacity: 0; transition: opacity 800ms var(--ease-out) 1200ms; }
        .dash__spark-fill.in { opacity: 1; }
        .dash__spark-dot { opacity: 0; transition: opacity 400ms var(--ease-out) 2000ms; }
        .dash__spark-dot.in { opacity: 1; }

        .dash__section { padding: 14px 0 6px; border-bottom: 1px solid var(--mmc-border); }
        .dash__section-head {
          display: flex; justify-content: space-between; align-items: baseline;
          margin-bottom: 10px;
          font-size: 10.5px; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--fg-3); font-weight: 700;
        }
        .dash__section-meta { color: var(--fg-3); font-weight: 500; }
        .dash__channels { display: flex; flex-direction: column; gap: 8px; }
        .dash__row {
          display: grid; grid-template-columns: 52px 1fr 44px 42px;
          align-items: center; gap: 10px;
        }
        .dash__row-name {
          font-family: var(--font-display); font-weight: 600; font-size: 12.5px;
          color: var(--mmc-text);
        }
        .dash__row-bar {
          height: 6px; background: rgba(var(--mmc-blue-rgb), 0.06);
          border-radius: 999px; overflow: hidden;
        }
        .dash__row-bar > span {
          display: block; height: 100%; width: 0;
          border-radius: 999px;
          transition: width 1200ms var(--ease-out);
        }
        .dash__row-roas {
          font-family: var(--font-display); font-weight: 700; font-size: 13px;
          color: var(--mmc-blue); text-align: right;
          font-variant-numeric: tabular-nums;
        }
        .dash__row-trend {
          font-size: 10.5px; color: #1F8A5B; font-weight: 700;
          text-align: right; letter-spacing: 0.02em;
        }

        .dash__mini {
          display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;
          padding: 14px 0; border-bottom: 1px solid var(--mmc-border);
        }
        .dash__mini > div { display: flex; flex-direction: column; gap: 3px; }
        .dash__mini-num {
          font-family: var(--font-display); font-weight: 700; font-size: 19px;
          color: var(--mmc-text); letter-spacing: -0.02em;
        }
        .dash__mini-num i {
          font-style: normal; color: var(--mmc-yellow);
          font-size: 0.65em; margin-left: 1px;
        }
        .dash__mini-lbl {
          font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--fg-3); font-weight: 600;
        }

        .dash__creatives { padding-top: 12px; }
        .dash__creatives-label {
          font-size: 10.5px; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--fg-3); font-weight: 700; margin-bottom: 8px;
        }
        .dash__creatives-grid {
          display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px;
        }
        .dash__creative {
          aspect-ratio: 3/4; border-radius: 6px;
          position: relative; overflow: hidden;
          border: 1px solid var(--mmc-border);
        }
        .dash__creative--0 { background: linear-gradient(135deg, #F4E2C5, #E8C99A); }
        .dash__creative--1 { background: linear-gradient(135deg, var(--mmc-blue), #2C5FB3); }
        .dash__creative--2 { background: linear-gradient(135deg, var(--mmc-yellow), #F89B1A); }
        .dash__creative--3 { background: linear-gradient(135deg, #2D3748, #4A5568); }
        .dash__creative--4 { background: linear-gradient(135deg, #FBFAF6, #E8E4DA); }
        .dash__creative-meta {
          position: absolute; left: 4px; bottom: 3px;
          font-size: 8px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.85);
          background: rgba(0,0,0,0.25);
          padding: 1px 4px; border-radius: 3px;
          backdrop-filter: blur(3px);
        }
        .dash__creative--0 .dash__creative-meta,
        .dash__creative--2 .dash__creative-meta,
        .dash__creative--4 .dash__creative-meta {
          color: var(--mmc-blue-700);
          background: rgba(255,255,255,0.55);
        }
      `}</style>
    </div>
  );
}

function CountUp({ to, decimals = 0, suffix = "" }) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    let raf;
    const start = performance.now();
    const dur = 1600;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 4);
      setVal(eased * to);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return (
    <span className="countup">
      {val.toFixed(decimals)}
      <span className="suffix">{suffix}</span>
    </span>
  );
}

window.Hero = Hero;
window.CountUp = CountUp;
window.DashboardPreview = DashboardPreview;
