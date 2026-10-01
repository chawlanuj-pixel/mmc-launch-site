/* handbook/HbNext.jsx, More handbooks carousel.
   Horizontal scroll with snap, arrow nav, mouse-wheel support on desktop. */

function HbNext() {
  const projects = [
    {
      brand: "Northwall Labs",
      mark: "NW",
      industry: "Healthcare",
      headline: "From zero digital bookings to 8,400 / month.",
      stat: { v: "+412%", l: "Organic traffic · 12 mo" },
      art: "azure",
    },
    {
      brand: "DeoBar Skin Co.",
      mark: "DB",
      industry: "D2C Beauty",
      headline: "8.7× blended ROAS held over six straight quarters.",
      stat: { v: "8.7×", l: "Median blended ROAS" },
      art: "blush",
    },
    {
      brand: "Kavi Coffee",
      mark: "KC",
      industry: "D2C Food",
      headline: "From café to category. 38% of revenue now from owned channels.",
      stat: { v: "38%", l: "Owned revenue contribution" },
      art: "ochre",
    },
    {
      brand: "Hauz Khas Books",
      mark: "HK",
      industry: "Education",
      headline: "92k qualified leads at a sub-₹40 CAC, year after year.",
      stat: { v: "92K", l: "Qualified leads · last 12 mo" },
      art: "sage",
    },
    {
      brand: "Lumen Living",
      mark: "LL",
      industry: "D2C Home",
      headline: "Re-platform + brand rebuild lifted AOV 47% in 90 days.",
      stat: { v: "+47%", l: "AOV lift · 90 days" },
      art: "violet",
    },
    {
      brand: "Forrest & Co.",
      mark: "FC",
      industry: "D2C Wellness",
      headline: "0 → ₹24.6Cr in twelve months across India + the Gulf.",
      stat: { v: "₹24.6Cr", l: "Net revenue · year one" },
      art: "wine",
    },
  ];

  const trackRef = React.useRef(null);
  const [pos, setPos] = React.useState(0);
  const [maxPos, setMaxPos] = React.useState(0);

  const updatePos = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setPos(el.scrollLeft);
    setMaxPos(el.scrollWidth - el.clientWidth);
  }, []);

  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updatePos();
    el.addEventListener("scroll", updatePos, { passive: true });
    window.addEventListener("resize", updatePos);
    return () => {
      el.removeEventListener("scroll", updatePos);
      window.removeEventListener("resize", updatePos);
    };
  }, [updatePos]);

  // Mouse-wheel → horizontal scroll when hovering over the track on desktop.
  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onWheel = (e) => {
      // Only intercept when the user's primary scroll axis is vertical.
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && Math.abs(e.deltaY) > 6) {
        e.preventDefault();
        el.scrollBy({ left: e.deltaY, behavior: "auto" });
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const step = () => {
    const el = trackRef.current;
    if (!el) return 0;
    const card = el.querySelector(".hbn__card");
    if (!card) return el.clientWidth * 0.8;
    return card.getBoundingClientRect().width + 22; // gap
  };
  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * step(), behavior: "smooth" });
  };

  const atStart = pos <= 4;
  const atEnd   = pos >= maxPos - 4;
  const progress = maxPos > 0 ? (pos / maxPos) * 100 : 0;

  return (
    <section className="hbn">
      <div className="container">
        <header className="hbn__head">
          <div className="hbn__head-l">
            <div className="eyebrow">More handbooks</div>
            <h2 className="hbn__h">
              Six more brands.{" "}
              <span className="em-serif" style={{color:"var(--mmc-blue)"}}>Same</span>{" "}
              operating thesis.
            </h2>
          </div>
          <div className="hbn__head-r">
            <div className="hbn__nav">
              <button className="hbn__nav-btn"
                      disabled={atStart}
                      onClick={() => scrollBy(-1)}
                      aria-label="Previous handbook">
                <svg viewBox="0 0 22 22" width="20" height="20">
                  <path d="M 14 5 L 7 11 L 14 17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="hbn__nav-btn"
                      disabled={atEnd}
                      onClick={() => scrollBy(1)}
                      aria-label="Next handbook">
                <svg viewBox="0 0 22 22" width="20" height="20">
                  <path d="M 8 5 L 15 11 L 8 17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </header>

        <div className="hbn__rail" ref={trackRef}>
          {projects.map((p, i) => (
            <a className={"hbn__card hbn__card--" + p.art} key={p.brand} href="Brand Handbook.html">
              <div className="hbn__card-art" aria-hidden="true">
                <span className="hbn__card-mark">{p.mark}</span>
                <span className="hbn__card-tag">{p.industry}</span>
              </div>
              <div className="hbn__card-body">
                <span className="hbn__card-n">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="hbn__card-brand">{p.brand}</h3>
                <p className="hbn__card-line">{p.headline}</p>
                <div className="hbn__card-stat">
                  <span className="hbn__card-stat-v">{p.stat.v}</span>
                  <span className="hbn__card-stat-l">{p.stat.l}</span>
                </div>
                <span className="hbn__card-cta">
                  Read the handbook
                  <span className="arrow"></span>
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="hbn__rule">
          <span className="hbn__rule-fill" style={{ width: progress + "%" }}></span>
        </div>
      </div>

      <style>{`
        .hbn { position: relative; z-index: 1; padding: clamp(56px, 8vw, 96px) 0; }
        .hbn__head { display: grid; grid-template-columns: 1fr auto; gap: 24px; align-items: flex-end; margin-bottom: clamp(28px, 3.4vw, 44px); }
        .hbn__h { font-family: var(--font-display); font-weight: 600; font-size: clamp(28px, 3.6vw, 48px); letter-spacing: -0.025em; line-height: 1.06; color: var(--fg-1); margin: 18px 0 0; max-width: 640px; }

        .hbn__nav { display: inline-flex; gap: 8px; }
        .hbn__nav-btn { width: 44px; height: 44px; border-radius: 50%; background: #fff; border: 1px solid rgba(var(--mmc-blue-rgb), 0.18); color: var(--mmc-blue); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; transition: all var(--dur-base) var(--ease-out); }
        .hbn__nav-btn:hover:not(:disabled) { background: var(--mmc-blue); color: var(--mmc-yellow); border-color: var(--mmc-blue); transform: translateY(-1px); }
        .hbn__nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }

        .hbn__rail {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: clamp(280px, 32%, 380px);
          gap: 22px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 4px 0 22px;
          margin: 0 calc(var(--gutter) * -1);
          padding-left: var(--gutter);
          padding-right: var(--gutter);
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hbn__rail::-webkit-scrollbar { display: none; }

        .hbn__card {
          display: flex;
          flex-direction: column;
          scroll-snap-align: start;
          background: rgba(255,255,255,0.94);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.12);
          border-radius: 18px;
          overflow: hidden;
          color: var(--fg-1);
          transition: transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
        }
        .hbn__card:hover { transform: translateY(-4px); box-shadow: var(--shadow-3); color: var(--fg-1);
          position: relative; z-index: 2;
        }
        .hbn__card-art {
          position: relative;
          aspect-ratio: 4 / 3;
          padding: 18px;
          overflow: hidden;
          isolation: isolate;
          display: flex;
          align-items: flex-start;
        }
        .hbn__card--azure .hbn__card-art { background: radial-gradient(ellipse 70% 50% at 70% 20%, rgba(255,255,255,0.32), transparent 60%), linear-gradient(135deg, var(--mmc-blue), #356CC9); }
        .hbn__card--blush .hbn__card-art { background: radial-gradient(ellipse 80% 60% at 30% 30%, rgba(255,255,255,0.55), transparent 60%), linear-gradient(135deg, #F6CDB4, #DC8E73); }
        .hbn__card--ochre .hbn__card-art { background: radial-gradient(ellipse 80% 60% at 30% 70%, rgba(255,255,255,0.42), transparent 60%), linear-gradient(135deg, #E8C778, #C49230); }
        .hbn__card--sage  .hbn__card-art { background: radial-gradient(ellipse 80% 60% at 60% 30%, rgba(255,255,255,0.35), transparent 60%), linear-gradient(135deg, #C9D3B8, #7F9A6A); }
        .hbn__card--violet .hbn__card-art { background: radial-gradient(ellipse 80% 60% at 30% 30%, rgba(255,255,255,0.32), transparent 60%), linear-gradient(135deg, #D5C5E8, #7E63A8); }
        .hbn__card--wine .hbn__card-art { background: radial-gradient(ellipse 80% 60% at 80% 30%, rgba(255,255,255,0.18), transparent 60%), linear-gradient(135deg, #7A2A3A, #4A1721); }

        .hbn__card-mark {
          position: absolute;
          bottom: 12px; right: 18px;
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(96px, 11vw, 156px);
          line-height: 0.82;
          letter-spacing: -0.06em;
          color: rgba(255,255,255,0.4);
        }
        .hbn__card--azure .hbn__card-mark,
        .hbn__card--wine .hbn__card-mark { color: rgba(255,255,255,0.32); }
        .hbn__card--blush .hbn__card-mark,
        .hbn__card--ochre .hbn__card-mark,
        .hbn__card--sage .hbn__card-mark,
        .hbn__card--violet .hbn__card-mark { color: rgba(var(--mmc-ink-rgb), 0.32); }

        .hbn__card-tag {
          position: relative; z-index: 2;
          display: inline-block;
          font-family: var(--font-body);
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 5px 10px;
          background: rgba(255,255,255,0.78);
          backdrop-filter: blur(6px);
          border-radius: 999px;
          color: var(--mmc-blue-700);
        }
        .hbn__card--azure .hbn__card-tag,
        .hbn__card--wine .hbn__card-tag { background: rgba(255,255,255,0.22); color: #fff; }

        .hbn__card-body { padding: 22px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
        .hbn__card-n {
          font-family: var(--font-display); font-weight: 700; font-size: 12px;
          letter-spacing: 0.18em; color: var(--mmc-yellow);
        }
        .hbn__card-brand {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(20px, 1.8vw, 24px);
          letter-spacing: -0.02em;
          color: var(--fg-1);
          margin: 0;
        }
        .hbn__card-line {
          font-family: var(--font-serif); font-style: italic; font-weight: 500;
          font-size: 14.5px; line-height: 1.35;
          color: var(--mmc-blue); margin: 0;
          max-width: 320px;
        }
        .hbn__card-stat {
          display: flex; align-items: baseline; gap: 10px;
          padding: 12px 0;
          border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          margin-top: auto;
        }
        .hbn__card-stat-v {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(20px, 1.9vw, 26px);
          letter-spacing: -0.025em;
          color: var(--mmc-blue);
          font-variant-numeric: tabular-nums;
        }
        .hbn__card-stat-l {
          font-family: var(--font-body); font-size: 10.5px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--fg-3);
        }
        .hbn__card-cta {
          display: inline-flex; align-items: center; gap: 14px;
          margin-top: 4px;
          font-family: var(--font-body); font-size: 11px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--mmc-blue);
        }
        .hbn__card-cta .arrow {
          width: 18px; height: 1.5px;
          background: currentColor; position: relative;
          transition: width var(--dur-base) var(--ease-out);
        }
        .hbn__card-cta .arrow::after {
          content: ""; position: absolute; right: -1px; top: -4px;
          width: 8px; height: 8px;
          border-top: 1.5px solid currentColor; border-right: 1.5px solid currentColor;
          transform: rotate(45deg);
        }
        .hbn__card:hover .hbn__card-cta .arrow { width: 28px; }

        /* Progress rule */
        .hbn__rule {
          margin-top: 14px;
          height: 2px;
          background: rgba(var(--mmc-blue-rgb), 0.10);
          border-radius: 999px;
          overflow: hidden;
        }
        .hbn__rule-fill {
          display: block;
          height: 100%;
          background: var(--mmc-yellow);
          border-radius: 999px;
          transition: width 120ms linear;
        }

        @media (max-width: 720px) {
          .hbn__head { grid-template-columns: 1fr; align-items: flex-start; }
          .hbn__rail { grid-auto-columns: 84%; }
        }
      `}</style>
    </section>
  );
}
window.HbNext = HbNext;
