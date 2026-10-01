/* about/AbApproach.jsx, "The culture we're building"
   Two-column manifesto: what we care about, what we're not interested in. */

function AbApproach() {
  const ref = React.useRef(null);
  const seen = window.useInViewOnce ? window.useInViewOnce(ref) : true;

  const careAbout = [
    "Ownership",
    "Speed",
    "Adaptability",
    "Curiosity",
    "Execution quality",
    "Continuous learning",
  ];

  const notInterested = [
    "Unnecessary hierarchy",
    "Slow thinking",
    "Corporate agency culture",
    "Work that exists to look busy",
  ];

  const peopleWeLove = [
    { l: "Think independently",  s: "before being told to" },
    { l: "Move fast",            s: "without losing care" },
    { l: "Solve problems",       s: "they weren't handed" },
    { l: "Communicate honestly", s: "even when it's uncomfortable" },
  ];

  return (
    <section ref={ref} id="culture" className="ab-ap" data-screen-label="05 Culture">
      <div className="container">
        <div className={"ab-ap__head " + (seen ? "in" : "")}>
          <div className="eyebrow">The culture</div>
          <h2 className="ab-ap__h">
            The culture we're{" "}
            <span className="em-serif" style={{color:"var(--mmc-blue)"}}>building.</span>
          </h2>
          <p className="ab-ap__lead">
            We've worked inside agencies that ran on hierarchy, meetings about meetings and
            work designed to <em>look</em> busy. We're building the opposite of that.
          </p>
        </div>

        <div className={"ab-ap__grid " + (seen ? "in" : "")}>
          {/* Care about */}
          <div className="ab-ap__pane ab-ap__pane--care">
            <div className="ab-ap__pane-head">
              <span className="ab-ap__pane-tag">We care deeply about</span>
              <span className="ab-ap__pane-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l5 5L20 7"/>
                </svg>
              </span>
            </div>
            <ul className="ab-ap__list ab-ap__list--care">
              {careAbout.map((v, i) => (
                <li key={v} style={{ transitionDelay: `${i * 60}ms` }}>
                  <span className="ab-ap__list-n">{String(i+1).padStart(2,"0")}</span>
                  <span className="ab-ap__list-l">{v}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not interested in */}
          <div className="ab-ap__pane ab-ap__pane--not">
            <div className="ab-ap__pane-head">
              <span className="ab-ap__pane-tag ab-ap__pane-tag--mute">We're not interested in</span>
              <span className="ab-ap__pane-mark ab-ap__pane-mark--mute" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 6l12 12M18 6L6 18"/>
                </svg>
              </span>
            </div>
            <ul className="ab-ap__list ab-ap__list--not">
              {notInterested.map((v, i) => (
                <li key={v} style={{ transitionDelay: `${i * 60}ms` }}>
                  <span className="ab-ap__list-l">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The kind of people we love working with */}
        <div className={"ab-ap__people " + (seen ? "in" : "")}>
          <span className="ab-ap__people-tag">The people we love working with -</span>
          <ul>
            {peopleWeLove.map((p, i) => (
              <li key={p.l} style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="ab-ap__people-l">{p.l}.</span>
                <span className="ab-ap__people-s">{p.s}</span>
              </li>
            ))}
          </ul>
          <p className="ab-ap__people-foot">
            At MMC, <span className="em-serif" style={{color:"var(--mmc-blue)"}}>ideas</span> matter more than designations.
            And <span className="em-serif" style={{color:"var(--mmc-blue)"}}>execution</span> matters more than noise.
          </p>
        </div>
      </div>

      <style>{`
        .ab-ap { position: relative; z-index: 1; padding: clamp(56px, 8vw, 112px) 0; }
        .ab-ap__head { max-width: 820px; margin-bottom: clamp(36px, 4.4vw, 56px);
          opacity: 0; transform: translateY(8px);
          transition: opacity 700ms var(--ease-out), transform 700ms var(--ease-out); }
        .ab-ap__head.in { opacity: 1; transform: translateY(0); }
        .ab-ap__h {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(36px, 5vw, 72px); letter-spacing: -0.035em;
          line-height: 0.98; margin: 18px 0 22px; color: var(--fg-1);
        }
        .ab-ap__lead {
          font-family: var(--font-body); font-size: clamp(16px, 1.2vw, 19px);
          line-height: 1.6; color: var(--fg-2); margin: 0; max-width: 660px;
        }
        .ab-ap__lead em { color: var(--mmc-blue); font-weight: 600; }

        .ab-ap__grid {
          display: grid; grid-template-columns: 1.1fr 0.9fr;
          gap: clamp(20px, 2.4vw, 32px);
          margin-bottom: clamp(40px, 5vw, 64px);
        }

        .ab-ap__pane {
          padding: clamp(28px, 3vw, 40px);
          border-radius: 22px;
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          background: rgba(255,255,255,0.78);
          backdrop-filter: blur(10px);
          display: flex; flex-direction: column; gap: 22px;
        }
        .ab-ap__pane--not {
          background: rgba(247,248,250,0.78);
          border-color: rgba(75,85,99,0.12);
        }
        .ab-ap__pane-head { display: flex; justify-content: space-between; align-items: center; }
        .ab-ap__pane-tag {
          font-family: var(--font-body); font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--mmc-blue);
        }
        .ab-ap__pane-tag--mute { color: var(--fg-3); }
        .ab-ap__pane-mark {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(var(--mmc-blue-rgb), 0.08); color: var(--mmc-blue);
          display: inline-flex; align-items: center; justify-content: center;
        }
        .ab-ap__pane-mark--mute {
          background: rgba(75,85,99,0.10); color: var(--fg-3);
        }

        .ab-ap__list { list-style: none; margin: 0; padding: 0; }
        .ab-ap__list--care li {
          display: grid; grid-template-columns: 40px 1fr; gap: 12px;
          align-items: baseline;
          padding: 18px 0;
          border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.12);
          opacity: 0; transform: translateY(6px);
          transition: opacity 600ms var(--ease-out), transform 600ms var(--ease-out);
        }
        .ab-ap__list--care li:first-child { border-top: 0; padding-top: 4px; }
        .ab-ap__grid.in .ab-ap__list--care li { opacity: 1; transform: translateY(0); }
        .ab-ap__list-n {
          font-family: var(--font-display); font-weight: 800;
          font-size: 12px; letter-spacing: 0.18em;
          color: var(--mmc-yellow); font-variant-numeric: tabular-nums;
        }
        .ab-ap__list-l {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(22px, 2.2vw, 32px); letter-spacing: -0.025em;
          color: var(--fg-1);
        }

        .ab-ap__list--not li {
          padding: 14px 0;
          border-top: 1px dashed rgba(75,85,99,0.22);
          font-family: var(--font-display); font-weight: 500;
          font-size: clamp(18px, 1.6vw, 24px); letter-spacing: -0.02em;
          color: var(--fg-3);
          text-decoration: line-through; text-decoration-color: rgba(75,85,99,0.40);
          opacity: 0; transform: translateX(-4px);
          transition: opacity 600ms var(--ease-out), transform 600ms var(--ease-out);
        }
        .ab-ap__list--not li:first-child { border-top: 0; padding-top: 4px; }
        .ab-ap__grid.in .ab-ap__list--not li { opacity: 1; transform: translateX(0); }

        .ab-ap__people {
          padding: clamp(36px, 4vw, 56px) clamp(28px, 3vw, 44px);
          background: var(--mmc-blue);
          color: #fff;
          border-radius: 22px;
          box-shadow: 0 30px 60px -28px rgba(var(--mmc-blue-rgb), 0.5);
          opacity: 0; transform: translateY(12px);
          transition: opacity 800ms var(--ease-out) 200ms,
                      transform 800ms var(--ease-out) 200ms;
        }
        .ab-ap__people.in { opacity: 1; transform: translateY(0); }
        .ab-ap__people-tag {
          font-family: var(--font-body); font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--mmc-yellow); display: block; margin-bottom: 24px;
        }
        .ab-ap__people ul {
          list-style: none; margin: 0 0 28px; padding: 0;
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 18px 32px;
        }
        .ab-ap__people li {
          display: flex; flex-direction: column; gap: 4px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255,255,255,0.18);
          opacity: 0; transform: translateY(6px);
          transition: opacity 600ms var(--ease-out), transform 600ms var(--ease-out);
        }
        .ab-ap__people.in li { opacity: 1; transform: translateY(0); }
        .ab-ap__people-l {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(20px, 1.9vw, 28px); letter-spacing: -0.025em;
          color: #fff;
        }
        .ab-ap__people-s {
          font-family: var(--font-serif); font-style: italic; font-weight: 500;
          font-size: clamp(14px, 1.2vw, 17px);
          color: var(--mmc-yellow);
        }
        .ab-ap__people-foot {
          font-family: var(--font-display); font-weight: 500;
          font-size: clamp(20px, 2vw, 30px); line-height: 1.3;
          letter-spacing: -0.025em; color: rgba(255,255,255,0.92);
          margin: 0; max-width: 760px;
        }

        @media (max-width: 900px) {
          .ab-ap__grid { grid-template-columns: 1fr; }
          .ab-ap__people ul { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
window.AbApproach = AbApproach;
