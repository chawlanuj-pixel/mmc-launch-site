/* about/AbConnected.jsx, "We're obsessed with understanding digital behaviour"
   A wall of questions we ask. Less infographic, more research-journal. */

function AbConnected() {
  const ref = React.useRef(null);
  const seen = window.useInViewOnce ? window.useInViewOnce(ref) : true;

  const questions = [
    { n: "01", q: "Why do people click?",        s: "(and what kind of click is worth it)" },
    { n: "02", q: "Why do people trust?",        s: "(and how fast can it be lost)" },
    { n: "03", q: "Why do people ignore?",       s: "(the answer is usually structural)" },
    { n: "04", q: "What makes a brand memorable?",s: "(it's almost never the logo)" },
    { n: "05", q: "Where is attention forming?", s: "(and where is it leaking out)" },
    { n: "06", q: "What feels native on this platform?", s: "(and what looks like advertising)" },
  ];

  return (
    <section ref={ref} id="behavior" className="ab-cn" data-screen-label="06 Digital behaviour">
      <div className="container">
        <header className={"ab-cn__head " + (seen ? "in" : "")}>
          <div className="eyebrow">What we study</div>
          <h2 className="ab-cn__h">
            We're obsessed with understanding{" "}
            <span className="em-serif" style={{color:"var(--mmc-blue)"}}>digital behaviour.</span>
          </h2>
          <p className="ab-cn__lead">
            The internet changes constantly. Platforms evolve. Algorithms shift.
            Attention patterns flip overnight. The brands winning today are usually the
            ones reading the room a little earlier than everyone else.
          </p>
        </header>

        <div className="ab-cn__board">
          <div className="ab-cn__board-head">
            <span className="ab-cn__board-tag">Notebook · open questions</span>
            <span className="ab-cn__board-meta">Updated weekly · always</span>
          </div>

          <ul className={"ab-cn__questions " + (seen ? "in" : "")}>
            {questions.map((q, i) => (
              <li key={q.n} className="ab-cn__q" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="ab-cn__q-n">{q.n}</span>
                <span className="ab-cn__q-body">
                  <span className="ab-cn__q-l">{q.q}</span>
                  <span className="ab-cn__q-s">{q.s}</span>
                </span>
                <span className="ab-cn__q-mark" aria-hidden="true">?</span>
              </li>
            ))}
          </ul>

          <div className="ab-cn__foot">
            <span className="ab-cn__foot-mark" aria-hidden="true">→</span>
            <p>
              Modern marketing isn't just creative any more.
              It's <span className="em-serif" style={{color:"var(--mmc-yellow)"}}>behavioural.</span>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .ab-cn { position: relative; z-index: 1; padding: clamp(56px, 8vw, 112px) 0; }
        .ab-cn__head { max-width: 880px; margin: 0 auto clamp(40px, 5vw, 64px); text-align: center;
          opacity: 0; transform: translateY(8px);
          transition: opacity 700ms var(--ease-out), transform 700ms var(--ease-out); }
        .ab-cn__head.in { opacity: 1; transform: translateY(0); }
        .ab-cn__head .eyebrow { justify-content: center; }
        .ab-cn__h {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(36px, 5vw, 72px); letter-spacing: -0.035em;
          line-height: 0.98; margin: 18px 0 22px; color: var(--fg-1);
        }
        .ab-cn__lead {
          font-family: var(--font-body); font-size: clamp(16px, 1.2vw, 19px);
          line-height: 1.6; color: var(--fg-2); margin: 0 auto; max-width: 720px;
        }

        .ab-cn__board {
          max-width: 1100px; margin: 0 auto;
          background:
            linear-gradient(180deg, #FAF7F1, #F2EDE0);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          border-radius: 24px;
          padding: clamp(28px, 3.4vw, 48px);
          position: relative; overflow: hidden;
        }
        .ab-cn__board::before {
          content: ""; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(var(--mmc-blue-rgb), 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--mmc-blue-rgb), 0.04) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, #000 40%, transparent 100%);
        }
        .ab-cn__board > * { position: relative; z-index: 1; }
        .ab-cn__board-head {
          display: flex; justify-content: space-between; align-items: baseline;
          gap: 14px; flex-wrap: wrap;
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.14);
          margin-bottom: clamp(20px, 2.4vw, 32px);
        }
        .ab-cn__board-tag {
          font-family: var(--font-body); font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--mmc-yellow);
        }
        .ab-cn__board-meta {
          font-family: var(--font-serif); font-style: italic; font-size: 13px;
          color: var(--fg-3);
        }

        .ab-cn__questions {
          list-style: none; margin: 0; padding: 0;
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 0;
          border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.08);
        }
        .ab-cn__q {
          position: relative;
          display: grid; grid-template-columns: 56px 1fr auto;
          gap: 16px; align-items: center;
          padding: clamp(20px, 2.4vw, 32px) clamp(16px, 2vw, 28px);
          border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.08);
          opacity: 0; transform: translateY(8px);
          transition: opacity 600ms var(--ease-out), transform 600ms var(--ease-out),
                      background var(--dur-base) var(--ease-out);
        }
        .ab-cn__q:nth-child(odd) { border-right: 1px solid rgba(var(--mmc-blue-rgb), 0.08); }
        .ab-cn__questions.in .ab-cn__q { opacity: 1; transform: translateY(0); }
        .ab-cn__q:hover { background: rgba(255,255,255,0.55); }
        .ab-cn__q:hover .ab-cn__q-mark { color: var(--mmc-yellow); transform: rotate(-8deg) scale(1.05); }

        .ab-cn__q-n {
          font-family: var(--font-display); font-weight: 800;
          font-size: 12.5px; letter-spacing: 0.20em;
          color: var(--mmc-yellow); font-variant-numeric: tabular-nums;
        }
        .ab-cn__q-body { display: flex; flex-direction: column; gap: 4px; }
        .ab-cn__q-l {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(20px, 2vw, 28px); letter-spacing: -0.025em;
          line-height: 1.15; color: var(--fg-1);
        }
        .ab-cn__q-s {
          font-family: var(--font-serif); font-style: italic; font-weight: 500;
          font-size: clamp(14px, 1.15vw, 16.5px); line-height: 1.4;
          color: var(--mmc-blue);
        }
        .ab-cn__q-mark {
          font-family: var(--font-serif); font-style: italic; font-weight: 500;
          font-size: clamp(38px, 4vw, 56px); line-height: 1;
          color: rgba(var(--mmc-blue-rgb), 0.18);
          transition: color var(--dur-base) var(--ease-out),
                      transform var(--dur-base) var(--ease-out);
        }

        .ab-cn__foot {
          display: inline-flex; align-items: center; gap: 14px;
          margin-top: clamp(24px, 3vw, 40px);
          padding: 20px 26px;
          background: var(--mmc-blue);
          color: #fff;
          border-radius: 14px;
          box-shadow: 0 20px 40px -20px rgba(var(--mmc-blue-rgb), 0.40);
        }
        .ab-cn__foot-mark {
          font-family: var(--font-display); font-weight: 700;
          font-size: 22px;
          width: 36px; height: 36px; border-radius: 50%;
          background: var(--mmc-yellow); color: var(--mmc-blue-700);
          display: inline-flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .ab-cn__foot p {
          margin: 0;
          font-family: var(--font-display); font-weight: 500;
          font-size: clamp(16px, 1.4vw, 22px); letter-spacing: -0.02em;
          line-height: 1.3;
        }

        @media (max-width: 760px) {
          .ab-cn__questions { grid-template-columns: 1fr; }
          .ab-cn__q:nth-child(odd) { border-right: 0; }
        }
      `}</style>
    </section>
  );
}
window.AbConnected = AbConnected;
