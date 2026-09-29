import React from "react";
import { useInViewOnce } from "../shared/utils.jsx";

/* about/AbThesis.jsx, "Built by people who understand both creativity & business"
   Editorial split, the personality behind the company. */

function AbThesis() {
  const ref = React.useRef(null);
  const seen = useInViewOnce ? useInViewOnce(ref) : true;

  const lovesL = [
    "building brands",
    "consumer behaviour",
    "solving growth problems",
    "moving businesses forward",
  ];
  const lovesR = [
    "late-night execution",
    "performance breakdowns",
    "creative experiments",
    "product thinking",
  ];

  return (
    <section ref={ref} id="thesis" className="ab-th" data-screen-label="04 Creativity + business">
      <div className="container">
        <header className={"ab-th__head " + (seen ? "in" : "")}>
          <div className="eyebrow">Who built it</div>
          <h2 className="ab-th__h">
            Built by people who understand{" "}
            <span className="em-serif" style={{color:"var(--mmc-blue)"}}>both creativity</span>{" "}
            and business.
          </h2>
        </header>

        <div className={"ab-th__split " + (seen ? "in" : "")}>
          {/* Left column, the work we genuinely enjoy */}
          <div className="ab-th__col">
            <span className="ab-th__col-num">01</span>
            <h3 className="ab-th__col-h">
              We enjoy the<br/>
              <span className="em-serif" style={{color:"var(--mmc-blue)"}}>strategy</span> conversations.
            </h3>
            <p className="ab-th__col-p">
              Talking through positioning, the awkward middle, why a brand isn't sticking.
              Reading what's underneath a growth problem before anyone touches a campaign.
            </p>
            <ul className="ab-th__col-list">
              {lovesL.map((x) => <li key={x}><span aria-hidden="true">-</span>{x}</li>)}
            </ul>
          </div>

          {/* Center vertical divider with the quote */}
          <div className="ab-th__pivot" aria-hidden="true">
            <span className="ab-th__pivot-line"></span>
            <span className="ab-th__pivot-dot"></span>
            <span className="ab-th__pivot-line"></span>
          </div>

          {/* Right column, and we love the execution */}
          <div className="ab-th__col">
            <span className="ab-th__col-num">02</span>
            <h3 className="ab-th__col-h">
              And we love<br/>
              the <span className="em-serif" style={{color:"var(--mmc-blue)"}}>execution.</span>
            </h3>
            <p className="ab-th__col-p">
              The late-night shipping. The performance breakdowns. The creative experiments
              that don't always work. Storytelling that holds up when it's measured.
            </p>
            <ul className="ab-th__col-list">
              {lovesR.map((x) => <li key={x}><span aria-hidden="true">-</span>{x}</li>)}
            </ul>
          </div>
        </div>

        <blockquote className={"ab-th__quote " + (seen ? "in" : "")}>
          <span className="ab-th__quote-mark" aria-hidden="true">"</span>
          <p>
            Marketing, at its best,<br/>
            is <span className="em-serif" style={{color:"var(--mmc-yellow)"}}>psychology</span> meeting{" "}
            <span className="em-serif" style={{color:"var(--mmc-yellow)"}}>communication.</span>
          </p>
          <span className="ab-th__quote-sig">how we think about the work</span>
        </blockquote>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .ab-th { position: relative; z-index: 1; padding: clamp(56px, 8vw, 112px) 0; }

        .ab-th__head { max-width: 880px; margin-bottom: clamp(40px, 5vw, 64px);
          opacity: 0; transform: translateY(8px);
          transition: opacity 700ms var(--ease-out), transform 700ms var(--ease-out); }
        .ab-th__head.in { opacity: 1; transform: translateY(0); }
        .ab-th__h {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(34px, 4.6vw, 64px); letter-spacing: -0.03em;
          line-height: 1.02; margin: 18px 0 0; color: var(--fg-1);
        }

        .ab-th__split {
          display: grid; grid-template-columns: 1fr auto 1fr;
          gap: clamp(24px, 3vw, 56px);
          align-items: start;
          padding: clamp(28px, 3.4vw, 48px) 0;
          opacity: 0; transform: translateY(8px);
          transition: opacity 800ms var(--ease-out) 200ms,
                      transform 800ms var(--ease-out) 200ms;
        }
        .ab-th__split.in { opacity: 1; transform: translateY(0); }

        .ab-th__col {
          display: flex; flex-direction: column; gap: 16px;
          padding: clamp(20px, 2.4vw, 32px) 0;
        }
        .ab-th__col-num {
          font-family: var(--font-display); font-weight: 800;
          font-size: 13px; letter-spacing: 0.22em;
          color: var(--mmc-yellow); font-variant-numeric: tabular-nums;
        }
        .ab-th__col-h {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(26px, 2.8vw, 40px); letter-spacing: -0.025em;
          line-height: 1.1; margin: 0; color: var(--fg-1);
        }
        .ab-th__col-p {
          font-family: var(--font-body); font-size: clamp(15px, 1.15vw, 17.5px);
          line-height: 1.6; color: var(--fg-2); margin: 0;
        }
        .ab-th__col-list {
          list-style: none; margin: 14px 0 0; padding: 0;
          display: flex; flex-direction: column; gap: 6px;
        }
        .ab-th__col-list li {
          display: grid; grid-template-columns: 20px 1fr; gap: 8px; align-items: baseline;
          font-family: var(--font-serif); font-style: italic; font-weight: 500;
          font-size: clamp(15px, 1.2vw, 18px);
          color: var(--mmc-blue);
        }
        .ab-th__col-list li span { color: var(--mmc-yellow); font-style: normal; }

        .ab-th__pivot {
          display: flex; flex-direction: column; align-items: center; gap: 10px;
          padding-top: 24px;
          min-height: 100%;
        }
        .ab-th__pivot-line {
          width: 1px; flex: 1; min-height: 100px;
          background: linear-gradient(180deg, transparent, rgba(var(--mmc-blue-rgb), 0.20), transparent);
        }
        .ab-th__pivot-dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: var(--mmc-yellow);
          box-shadow: 0 0 0 6px rgba(var(--mmc-yellow-rgb), 0.18);
        }

        .ab-th__quote {
          position: relative;
          max-width: 920px; margin: clamp(20px, 2.4vw, 36px) auto 0;
          padding: clamp(40px, 4.6vw, 64px) clamp(28px, 3.6vw, 56px);
          background: var(--mmc-blue);
          color: #fff;
          border-radius: 22px;
          box-shadow: 0 30px 60px -28px rgba(var(--mmc-blue-rgb), 0.5);
          opacity: 0; transform: translateY(12px);
          transition: opacity 800ms var(--ease-out) 400ms,
                      transform 800ms var(--ease-out) 400ms;
        }
        .ab-th__quote.in { opacity: 1; transform: translateY(0); }
        .ab-th__quote-mark {
          position: absolute; top: -12px; left: 28px;
          font-family: var(--font-serif); font-style: italic; font-weight: 500;
          font-size: 140px; line-height: 1;
          color: var(--mmc-yellow);
          pointer-events: none;
        }
        .ab-th__quote p {
          font-family: var(--font-display); font-weight: 500;
          font-size: clamp(28px, 3.4vw, 52px);
          line-height: 1.12; letter-spacing: -0.03em;
          margin: 0; color: #fff;
        }
        .ab-th__quote-sig {
          display: block; margin-top: 22px;
          font-family: var(--font-body); font-size: 11.5px; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(255,255,255,0.62);
        }

        @media (max-width: 900px) {
          .ab-th__split { grid-template-columns: 1fr; }
          .ab-th__pivot { flex-direction: row; min-height: 0; padding: 8px 0; }
          .ab-th__pivot-line {
            flex: 1; min-height: 0; height: 1px; width: auto;
            background: linear-gradient(90deg, transparent, rgba(var(--mmc-blue-rgb), 0.20), transparent);
          }
        }
      ` }} />
    </section>
  );
}

export { AbThesis };
