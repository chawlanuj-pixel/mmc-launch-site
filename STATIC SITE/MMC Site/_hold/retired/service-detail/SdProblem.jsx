/* service-detail/SdProblem.jsx, Problem we solve */

function SdProblem() {
  const problems = [
    { p: "Your ROAS is slipping every month and creative refreshes aren't fixing it." },
    { p: "Audiences feel exhausted. Frequency is up. New customer rate is flat." },
    { p: "You're running 4 ad accounts across regions and can't see blended performance." },
    { p: "Creative production can't keep pace with the testing volume you need." },
    { p: "iOS attribution is broken and you're flying blind on cohort economics." },
    { p: "Brand and performance teams are at war about creative direction." },
  ];

  return (
    <section className="sdp">
      <div className="container">
        <header className="sdp__head">
          <div className="eyebrow">The problem we solve</div>
          <h2 className="sdp__h">
            One of these is{" "}
            <span className="em-serif" style={{color:"var(--mmc-blue)"}}>almost certainly</span>{" "}
            slowing your Meta down.
          </h2>
          <p className="sdp__lead">
            Six symptoms we see in the first audit, ranked by how often they show up.
            Each one is a system problem, not a campaign problem.
          </p>
        </header>

        <ol className="sdp__list">
          {problems.map((it, i) => (
            <li key={i} className="sdp__item">
              <span className="sdp__n">{String(i + 1).padStart(2, "0")}</span>
              <span className="sdp__text">{it.p}</span>
              <span className="sdp__check" aria-hidden="true">
                <svg viewBox="0 0 16 16" width="14" height="14">
                  <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M 5 8.5 L 7 10.5 L 11 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <style>{`
        .sdp { position: relative; z-index: 1; padding: clamp(56px, 8vw, 112px) 0; }
        .sdp__head { max-width: 880px; margin-bottom: clamp(36px, 5vw, 56px); }
        .sdp__h {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(30px, 3.8vw, 52px); letter-spacing: -0.025em; line-height: 1.06;
          margin: 18px 0 14px;
        }
        .sdp__lead { font-family: var(--font-body); font-size: 17px; line-height: 1.55; color: var(--fg-2); margin: 0; max-width: 580px; }

        .sdp__list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
        .sdp__item {
          display: grid; grid-template-columns: 50px 1fr 24px;
          gap: 14px; align-items: center;
          padding: 22px 4px;
          border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          transition: padding var(--dur-base) var(--ease-out);
        }
        .sdp__item:hover { padding-left: 14px; }
        .sdp__list > .sdp__item:nth-child(odd) { border-right: 1px solid rgba(var(--mmc-blue-rgb), 0.10); padding-right: 24px; }
        .sdp__list > .sdp__item:nth-child(even) { padding-left: 24px; }
        .sdp__list > .sdp__item:nth-last-child(-n+2) { border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.10); }
        .sdp__n { font-family: var(--font-display); font-weight: 700; font-size: 13px; letter-spacing: 0.18em; color: var(--mmc-yellow); }
        .sdp__text { font-family: var(--font-display); font-weight: 500; font-size: clamp(16px, 1.3vw, 19px); letter-spacing: -0.01em; line-height: 1.35; color: var(--fg-1); }
        .sdp__check { color: var(--mmc-blue); opacity: 0.4; }

        @media (max-width: 720px) {
          .sdp__list { grid-template-columns: 1fr; }
          .sdp__list > .sdp__item:nth-child(odd) { border-right: 0; padding-right: 4px; }
          .sdp__list > .sdp__item:nth-child(even) { padding-left: 4px; }
        }
      `}</style>
    </section>
  );
}

window.SdProblem = SdProblem;
