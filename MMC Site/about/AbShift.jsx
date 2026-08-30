/* about/AbShift.jsx, "We believe growth is never just one thing"
   The belief that frames everything else MMC does. */

function AbShift() {
  const ref = React.useRef(null);
  const seen = window.useInViewOnce ? window.useInViewOnce(ref) : true;

  const notFromOne = [
    "one ad",
    "one website",
    "one viral reel",
    "one campaign",
  ];

  const fromSystems = [
    { l: "Positioning",       s: "feels clear" },
    { l: "Communication",     s: "feels natural" },
    { l: "Branding",          s: "feels trustworthy" },
    { l: "Experiences",       s: "feel frictionless" },
    { l: "Discoverability",   s: "stays consistent" },
  ];

  return (
    <section ref={ref} id="beliefs" className="ab-sh" data-screen-label="03 We believe">
      <div className="container">
        <div className={"ab-sh__lead " + (seen ? "in" : "")}>
          <div className="eyebrow">What we believe</div>
          <h2 className="ab-sh__h">
            Growth is{" "}
            <span className="em-serif" style={{color:"var(--mmc-blue)"}}>never</span>{" "}
            just one thing.
          </h2>
          <p className="ab-sh__p">
            We've watched businesses spend aggressively on marketing while still struggling with
            inconsistent growth, disconnected branding, weak digital experiences and campaigns
            that <em>look</em> active but never build momentum. We wanted to solve that differently.
          </p>
        </div>

        <div className={"ab-sh__cols " + (seen ? "in" : "")}>
          {/* Left, what growth is NOT */}
          <div className="ab-sh__col ab-sh__col--neg">
            <span className="ab-sh__col-tag">A brand doesn't grow because of -</span>
            <ul className="ab-sh__neg">
              {notFromOne.map((x, i) => (
                <li key={x} style={{ transitionDelay: `${i * 70}ms` }}>
                  <span className="ab-sh__neg-strike"></span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right, what growth IS */}
          <div className="ab-sh__col ab-sh__col--pos">
            <span className="ab-sh__col-tag ab-sh__col-tag--yellow">Growth happens when -</span>
            <ul className="ab-sh__pos">
              {fromSystems.map((f, i) => (
                <li key={f.l} style={{ transitionDelay: `${(i + 1) * 70}ms` }}>
                  <span className="ab-sh__pos-l">{f.l}</span>
                  <span className="ab-sh__pos-s">{f.s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className={"ab-sh__foot " + (seen ? "in" : "")}>
          That's why we think in <span className="em-serif" style={{color:"var(--mmc-blue)"}}>systems</span>,
          not isolated marketing activities. Because modern growth is interconnected, and
          treating it that way is the only way it compounds.
        </p>
      </div>

      <style>{`
        .ab-sh { position: relative; z-index: 1; padding: clamp(56px, 8vw, 112px) 0; }
        .ab-sh__lead { max-width: 820px; margin-bottom: clamp(40px, 5vw, 64px);
          opacity: 0; transform: translateY(8px);
          transition: opacity 700ms var(--ease-out), transform 700ms var(--ease-out); }
        .ab-sh__lead.in { opacity: 1; transform: translateY(0); }
        .ab-sh__h {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(36px, 5vw, 72px); letter-spacing: -0.035em;
          line-height: 0.98; margin: 18px 0 22px; color: var(--fg-1);
        }
        .ab-sh__p {
          font-family: var(--font-body); font-size: clamp(16px, 1.2vw, 19px);
          line-height: 1.6; color: var(--fg-2); margin: 0; max-width: 680px;
        }
        .ab-sh__p em { font-style: italic; color: var(--mmc-blue); font-weight: 600; }

        .ab-sh__cols {
          display: grid; grid-template-columns: 0.85fr 1fr;
          gap: clamp(24px, 3vw, 48px);
          padding: clamp(32px, 4vw, 56px) 0;
          border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.14);
          border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.14);
        }
        .ab-sh__col { display: flex; flex-direction: column; gap: 22px; }
        .ab-sh__col-tag {
          font-family: var(--font-body); font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--fg-3);
        }
        .ab-sh__col-tag--yellow { color: var(--mmc-yellow); }

        .ab-sh__neg, .ab-sh__pos { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
        .ab-sh__neg li {
          display: grid; grid-template-columns: 60px 1fr; gap: 16px; align-items: center;
          padding: 14px 0; border-bottom: 1px dashed rgba(75,85,99,0.20);
          font-family: var(--font-display); font-weight: 500;
          font-size: clamp(22px, 2vw, 30px); letter-spacing: -0.02em;
          color: var(--fg-3);
          text-decoration: line-through; text-decoration-color: rgba(75,85,99,0.45);
          opacity: 0; transform: translateX(-6px);
          transition: opacity 600ms var(--ease-out), transform 600ms var(--ease-out);
        }
        .ab-sh__cols.in .ab-sh__neg li { opacity: 1; transform: translateX(0); }
        .ab-sh__neg-strike {
          height: 1px; background: rgba(75,85,99,0.4);
        }

        .ab-sh__pos li {
          display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
          gap: 20px; align-items: baseline;
          padding: 16px 0; border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.14);
          opacity: 0; transform: translateY(6px);
          transition: opacity 600ms var(--ease-out), transform 600ms var(--ease-out);
        }
        .ab-sh__cols.in .ab-sh__pos li { opacity: 1; transform: translateY(0); }
        .ab-sh__pos-l {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(22px, 2.2vw, 32px); letter-spacing: -0.025em;
          color: var(--fg-1);
        }
        .ab-sh__pos-s {
          font-family: var(--font-serif); font-style: italic; font-weight: 500;
          font-size: clamp(16px, 1.4vw, 22px); line-height: 1.3;
          color: var(--mmc-blue);
        }

        .ab-sh__foot {
          margin: clamp(40px, 5vw, 64px) 0 0;
          font-family: var(--font-display); font-weight: 500;
          font-size: clamp(22px, 2.4vw, 36px); line-height: 1.3;
          letter-spacing: -0.025em; color: var(--fg-1);
          max-width: 900px;
          opacity: 0; transform: translateY(8px);
          transition: opacity 700ms var(--ease-out) 300ms,
                      transform 700ms var(--ease-out) 300ms;
        }
        .ab-sh__foot.in { opacity: 1; transform: translateY(0); }

        @media (max-width: 900px) {
          .ab-sh__cols { grid-template-columns: 1fr; }
          .ab-sh__pos li { grid-template-columns: 1fr; gap: 4px; }
        }
        @media (max-width: 600px) {
          .ab-sh__neg li { grid-template-columns: 28px 1fr; gap: 12px; font-size: 20px; }
        }
      `}</style>
    </section>
  );
}
window.AbShift = AbShift;
