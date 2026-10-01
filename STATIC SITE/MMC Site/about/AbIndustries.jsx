/* about/AbIndustries.jsx, "What kind of work excites us"
   Less an industry list, more a portrait of the projects MMC enjoys most. */

function AbIndustries() {
  const ref = React.useRef(null);
  const seen = window.useInViewOnce ? window.useInViewOnce(ref) : true;

  const enjoy = [
    { l: "Ambitious founders",       s: "with a sharp sense of where they're going" },
    { l: "Growth-focused brands",    s: "that take the next ten years seriously" },
    { l: "Businesses willing to evolve", s: "not married to last year's playbook" },
    { l: "Teams that genuinely care", s: "about building something meaningful" },
  ];

  const matters = ["Strategy", "Creativity", "Execution", "Long-term thinking"];

  return (
    <section ref={ref} id="excites-us" className="ab-in" data-screen-label="09 Work that excites us">
      <div className="container">
        <header className={"ab-in__head " + (seen ? "in" : "")}>
          <div className="eyebrow">Work that excites us</div>
          <h2 className="ab-in__h">
            The projects we enjoy most are the ones where{" "}
            <span className="em-serif" style={{color:"var(--mmc-blue)"}}>everything matters</span>{" "}
            equally.
          </h2>
        </header>

        <div className={"ab-in__grid " + (seen ? "in" : "")}>
          <div className="ab-in__l">
            <span className="ab-in__l-tag">We enjoy working with -</span>
            <ul>
              {enjoy.map((x, i) => (
                <li key={x.l} style={{ transitionDelay: `${i * 80}ms` }}>
                  <span className="ab-in__l-n">{String(i+1).padStart(2,"0")}</span>
                  <span className="ab-in__l-body">
                    <span className="ab-in__l-l">{x.l}</span>
                    <span className="ab-in__l-s">{x.s}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="ab-in__r">
            <span className="ab-in__r-tag">Four things we want all in one project -</span>
            <ul>
              {matters.map((m, i) => (
                <li key={m} style={{ transitionDelay: `${i * 80}ms` }}>
                  <span className="ab-in__r-n">{String(i+1).padStart(2,"0")}</span>
                  <span className="ab-in__r-l">{m}</span>
                  <span className="ab-in__r-equal" aria-hidden="true">=</span>
                </li>
              ))}
            </ul>
            <p className="ab-in__r-foot">
              When one of these is missing, the work suffers.
              When all four are present, <span className="em-serif" style={{color:"var(--mmc-blue)"}}>that's when the work gets interesting.</span>
            </p>
          </aside>
        </div>

        {/* Future panel, "the future feels interesting" */}
        <div className={"ab-in__future " + (seen ? "in" : "")}>
          <div className="ab-in__future-head">
            <span className="ab-in__future-tag">A note on the future</span>
            <span className="ab-in__future-meta">from inside the studio</span>
          </div>

          <div className="ab-in__future-body">
            <div className="ab-in__future-shifts">
              <div className="ab-in__future-shift">
                <span className="ab-in__future-shift-l">AI</span>
                <span className="ab-in__future-shift-s">is changing discovery</span>
              </div>
              <div className="ab-in__future-shift">
                <span className="ab-in__future-shift-l">Attention</span>
                <span className="ab-in__future-shift-s">spans are shrinking</span>
              </div>
              <div className="ab-in__future-shift">
                <span className="ab-in__future-shift-l">Consumers</span>
                <span className="ab-in__future-shift-s">are getting smarter</span>
              </div>
              <div className="ab-in__future-shift">
                <span className="ab-in__future-shift-l">Marketing</span>
                <span className="ab-in__future-shift-s">is becoming behavioural</span>
              </div>
            </div>

            <p className="ab-in__future-line">
              Honestly? This is one of the most <span className="em-serif" style={{color:"var(--mmc-yellow)"}}>interesting</span> times to be building brands online.
              We're building for that future every single day.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .ab-in { position: relative; z-index: 1; padding: clamp(56px, 8vw, 112px) 0; }

        .ab-in__head { max-width: 880px; margin-bottom: clamp(40px, 5vw, 64px);
          opacity: 0; transform: translateY(8px);
          transition: opacity 700ms var(--ease-out), transform 700ms var(--ease-out); }
        .ab-in__head.in { opacity: 1; transform: translateY(0); }
        .ab-in__h {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(34px, 4.6vw, 64px); letter-spacing: -0.03em;
          line-height: 1.02; margin: 18px 0 0; color: var(--fg-1);
        }

        .ab-in__grid {
          display: grid; grid-template-columns: 1.25fr 1fr;
          gap: clamp(24px, 3vw, 56px);
          margin-bottom: clamp(40px, 5vw, 64px);
        }

        .ab-in__l-tag, .ab-in__r-tag {
          font-family: var(--font-body); font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--mmc-yellow); display: block; margin-bottom: 14px;
        }

        .ab-in__l ul { list-style: none; margin: 0; padding: 0; }
        .ab-in__l li {
          display: grid; grid-template-columns: 44px 1fr;
          gap: 14px; align-items: baseline;
          padding: 22px 0;
          border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.14);
          opacity: 0; transform: translateY(8px);
          transition: opacity 600ms var(--ease-out), transform 600ms var(--ease-out),
                      padding-left var(--dur-base) var(--ease-out);
        }
        .ab-in__l li:first-child { border-top: 0; padding-top: 6px; }
        .ab-in__grid.in .ab-in__l li { opacity: 1; transform: translateY(0); }
        .ab-in__l li:hover { padding-left: 6px; }
        .ab-in__l-n {
          font-family: var(--font-display); font-weight: 800;
          font-size: 12.5px; letter-spacing: 0.20em;
          color: var(--mmc-yellow); font-variant-numeric: tabular-nums;
        }
        .ab-in__l-body { display: flex; flex-direction: column; gap: 4px; }
        .ab-in__l-l {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(22px, 2.2vw, 32px); letter-spacing: -0.025em;
          color: var(--fg-1);
        }
        .ab-in__l-s {
          font-family: var(--font-serif); font-style: italic; font-weight: 500;
          font-size: clamp(15px, 1.2vw, 18px); color: var(--mmc-blue);
        }

        .ab-in__r {
          padding: clamp(24px, 2.8vw, 36px);
          background: rgba(255,255,255,0.78);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          border-radius: 22px;
          backdrop-filter: blur(10px);
          display: flex; flex-direction: column; gap: 18px;
        }
        .ab-in__r ul { list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 10px; }
        .ab-in__r li {
          display: grid; grid-template-columns: 36px 1fr 20px;
          gap: 12px; align-items: center;
          padding: 14px 18px;
          background: rgba(var(--mmc-blue-rgb), 0.04);
          border-radius: 12px;
          opacity: 0; transform: translateX(-6px);
          transition: opacity 600ms var(--ease-out), transform 600ms var(--ease-out),
                      background var(--dur-base) var(--ease-out);
        }
        .ab-in__grid.in .ab-in__r li { opacity: 1; transform: translateX(0); }
        .ab-in__r li:hover { background: rgba(var(--mmc-blue-rgb), 0.08); }
        .ab-in__r-n {
          font-family: var(--font-display); font-weight: 800;
          font-size: 11.5px; letter-spacing: 0.18em;
          color: var(--mmc-yellow); font-variant-numeric: tabular-nums;
        }
        .ab-in__r-l {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(17px, 1.5vw, 22px); letter-spacing: -0.02em;
          color: var(--mmc-blue);
        }
        .ab-in__r-equal {
          font-family: var(--font-display); font-weight: 800;
          color: var(--mmc-yellow); font-size: 18px;
        }
        .ab-in__r li:last-child .ab-in__r-equal { color: rgba(var(--mmc-yellow-rgb), 0.40); }
        .ab-in__r-foot {
          margin: 6px 0 0;
          font-family: var(--font-body); font-size: clamp(14px, 1.1vw, 16px);
          line-height: 1.55; color: var(--fg-2);
        }

        /* ---- Future panel ---- */
        .ab-in__future {
          padding: clamp(32px, 4vw, 56px);
          background:
            linear-gradient(180deg, #FAF7F1, #F2EDE0);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          border-radius: 24px;
          position: relative; overflow: hidden;
          opacity: 0; transform: translateY(12px);
          transition: opacity 800ms var(--ease-out) 300ms,
                      transform 800ms var(--ease-out) 300ms;
        }
        .ab-in__future.in { opacity: 1; transform: translateY(0); }
        .ab-in__future::before {
          content: ""; position: absolute;
          left: 50%; top: 100%; width: 180%; aspect-ratio: 1 / 1;
          transform: translate(-50%, -8%);
          border-radius: 50%;
          border: 1px solid var(--mmc-blue);
          opacity: 0.06; z-index: 0;
        }
        .ab-in__future > * { position: relative; z-index: 1; }
        .ab-in__future-head {
          display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap;
          padding-bottom: 22px;
          border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.14);
          margin-bottom: 28px;
        }
        .ab-in__future-tag {
          font-family: var(--font-body); font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--mmc-yellow);
        }
        .ab-in__future-meta {
          font-family: var(--font-serif); font-style: italic; font-size: 13.5px;
          color: var(--fg-3);
        }
        .ab-in__future-body { display: flex; flex-direction: column; gap: 28px; }

        .ab-in__future-shifts {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: clamp(16px, 2vw, 28px);
        }
        .ab-in__future-shift {
          display: flex; flex-direction: column; gap: 6px;
          padding-left: 16px;
          border-left: 2px solid var(--mmc-yellow);
        }
        .ab-in__future-shift-l {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(20px, 2vw, 28px); letter-spacing: -0.025em;
          color: var(--mmc-blue);
        }
        .ab-in__future-shift-s {
          font-family: var(--font-serif); font-style: italic; font-weight: 500;
          font-size: clamp(14px, 1.15vw, 16.5px); color: var(--fg-2);
        }
        .ab-in__future-line {
          font-family: var(--font-display); font-weight: 500;
          font-size: clamp(22px, 2.4vw, 36px); line-height: 1.25;
          letter-spacing: -0.025em;
          color: var(--fg-1); margin: 0; max-width: 900px;
          text-wrap: balance;
        }

        @media (max-width: 900px) {
          .ab-in__grid { grid-template-columns: 1fr; }
          .ab-in__future-shifts { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .ab-in__future-shifts { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
window.AbIndustries = AbIndustries;
