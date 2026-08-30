/* about/AbCTA.jsx, Final CTA · "Let's build something that actually matters" */

function AbCTA({ onAudit }) {
  return (
    <section id="cta" className="ab-fcta" data-screen-label="10 Final CTA">
      <div className="container">
        <div className="ab-fcta__inner">
          <div className="eyebrow ab-fcta__eyebrow">
            <span style={{ color: "var(--mmc-yellow)" }}>Let's talk</span>
          </div>

          <h2 className="ab-fcta__h">
            Let's build something
            <br/>
            that <span className="em-serif" style={{ color: "var(--mmc-blue)" }}>actually</span> matters.
          </h2>

          <ul className="ab-fcta__notlist" aria-label="What we're not building">
            <li><span className="strike">Not just campaigns.</span></li>
            <li><span className="strike">Not just content.</span></li>
            <li><span className="strike">Not just visibility.</span></li>
          </ul>

          <p className="ab-fcta__sub">
            Something people genuinely <span className="em-serif" style={{color:"var(--mmc-blue)"}}>remember.</span>
          </p>

          <div className="ab-fcta__primary">
            <button className="ab-fcta__primary-btn glow-btn" onClick={onAudit}>
              <span className="glow-btn__glow" aria-hidden="true"></span>
              <span className="ab-fcta__primary-btn-inner">
                <span className="ab-fcta__primary-btn-text">
                  <span className="ab-fcta__primary-btn-tag">Start the conversation</span>
                  <span className="ab-fcta__primary-btn-h">30 min with a founding strategist</span>
                </span>
                <span className="ab-fcta__primary-btn-arrow" aria-hidden="true">
                  <svg viewBox="0 0 32 32" width="28" height="28">
                    <path d="M 8 16 L 24 16 M 18 9 L 25 16 L 18 23"
                          fill="none" stroke="currentColor" strokeWidth="2"
                          strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </button>
            <div className="ab-fcta__primary-meta">
              <span className="ab-fcta__primary-dot"></span>
              <span><strong>Avg. response · 4 hours</strong> · Mon–Sat IST</span>
            </div>
          </div>

          <div className="ab-fcta__secondary">
            <a className="ab-fcta__alt" href="https://wa.me/919619472727">
              <span className="ab-fcta__alt-icon" aria-hidden="true">
                <svg viewBox="0 0 32 32" width="22" height="22">
                  <path fill="#25D366" d="M16 0C7.16 0 0 7.16 0 16c0 2.82.74 5.58 2.15 8.02L0 32l8.21-2.14A15.93 15.93 0 0 0 16 32c8.84 0 16-7.16 16-16S24.84 0 16 0z"/>
                  <path fill="#FFF" d="M23.47 19.62c-.4-.2-2.36-1.17-2.72-1.3-.37-.13-.63-.2-.9.2-.27.4-1.03 1.3-1.27 1.57-.23.27-.47.3-.87.1-.4-.2-1.68-.62-3.2-1.97a12 12 0 0 1-2.22-2.76c-.23-.4-.02-.62.17-.82.18-.18.4-.47.6-.7.2-.24.27-.4.4-.67.13-.27.07-.5-.03-.7-.1-.2-.9-2.17-1.23-2.97-.32-.78-.65-.67-.9-.68-.23-.01-.5-.01-.77-.01a1.48 1.48 0 0 0-1.07.5c-.37.4-1.4 1.37-1.4 3.34s1.43 3.87 1.63 4.14c.2.27 2.82 4.3 6.83 6.04.95.42 1.7.67 2.28.85.96.3 1.83.26 2.52.16.77-.12 2.36-.97 2.7-1.9.33-.94.33-1.74.23-1.9-.1-.18-.36-.27-.76-.47z"/>
                </svg>
              </span>
              <span className="ab-fcta__alt-body">
                <span className="ab-fcta__alt-h">WhatsApp the studio</span>
                <span className="ab-fcta__alt-sub">+91 96194 72727 · reply in the hour</span>
              </span>
              <span className="ab-fcta__alt-arrow" aria-hidden="true">→</span>
            </a>
            <a className="ab-fcta__alt" href="Contact.html">
              <span className="ab-fcta__alt-icon" aria-hidden="true">
                <svg viewBox="0 0 32 32" width="22" height="22">
                  <circle cx="16" cy="16" r="10" fill="none" stroke="var(--mmc-blue)" strokeWidth="2.4"/>
                  <path d="M 11 16 h 10 M 17 11 l 5 5 l -5 5" stroke="var(--mmc-blue)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </span>
              <span className="ab-fcta__alt-body">
                <span className="ab-fcta__alt-h">See what we do</span>
                <span className="ab-fcta__alt-sub">Eight connected practices · one studio</span>
              </span>
              <span className="ab-fcta__alt-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .ab-fcta { position: relative; z-index: 1;
          padding: clamp(64px, 9vw, 132px) 0 clamp(28px, 3.4vw, 48px);
          isolation: isolate;
        }
        .ab-fcta::before {
          content: ""; position: absolute;
          left: 0; right: 0; top: clamp(24px, 3vw, 48px); bottom: 0;
          background: radial-gradient(ellipse 95% 80% at 50% 50%,
            rgba(255, 252, 244, 0.94) 0%,
            rgba(251, 250, 246, 0.88) 60%,
            rgba(251, 250, 246, 0.82) 100%);
          backdrop-filter: blur(22px) saturate(140%);
          border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.08);
          z-index: -1; pointer-events: none;
        }
        .ab-fcta__inner { max-width: none; margin: 0 auto; }
        .ab-fcta__eyebrow { margin-bottom: 28px; }
        .ab-fcta__eyebrow::before { background: var(--mmc-yellow); }
        .ab-fcta__h {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(44px, 7vw, 120px);
          line-height: 0.94; letter-spacing: -0.045em;
          color: var(--fg-1); margin: 0 0 36px;
        }

        .ab-fcta__notlist {
          list-style: none; margin: 0 0 20px; padding: 0;
          display: flex; flex-direction: column; gap: 4px;
        }
        .ab-fcta__notlist li {
          font-family: var(--font-display); font-weight: 500;
          font-size: clamp(20px, 2vw, 30px); letter-spacing: -0.025em;
        }
        .ab-fcta__notlist .strike {
          color: var(--fg-3);
          text-decoration: line-through;
          text-decoration-color: rgba(75,85,99,0.45);
          text-decoration-thickness: 1px;
        }

        .ab-fcta__sub {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(28px, 3.4vw, 48px);
          line-height: 1.1; letter-spacing: -0.025em;
          color: var(--fg-1);
          max-width: 720px; margin: 0 0 clamp(36px, 5vw, 56px);
        }

        .ab-fcta__primary { display: flex; flex-direction: column; gap: 14px; margin-bottom: clamp(28px, 4vw, 48px); }
        .ab-fcta__primary-btn {
          appearance: none; background: var(--mmc-blue); color: #fff;
          border: 0; border-radius: 18px; padding: 0; cursor: pointer;
          font: inherit; width: 100%; max-width: 760px;
          box-shadow: 0 32px 64px -28px rgba(var(--mmc-blue-rgb), 0.6),
                      0 0 0 1px rgba(var(--mmc-blue-rgb), 0.2);
          position: relative; overflow: hidden;
          transition: transform var(--dur-base) var(--ease-out),
                      box-shadow var(--dur-base) var(--ease-out);
        }
        .ab-fcta__primary-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 40px 80px -28px rgba(var(--mmc-blue-rgb), 0.7),
                      0 0 0 1px rgba(var(--mmc-blue-rgb), 0.3);
          position: relative; z-index: 2;
        }
        .ab-fcta__primary-btn-inner {
          display: grid; grid-template-columns: 1fr auto;
          gap: 24px; align-items: center;
          padding: clamp(26px, 3vw, 38px) clamp(28px, 3.4vw, 44px);
          position: relative; z-index: 1;
        }
        .ab-fcta__primary-btn-text {
          display: flex; flex-direction: column; align-items: flex-start; gap: 8px;
          text-align: left;
        }
        .ab-fcta__primary-btn-tag {
          font-family: var(--font-body); font-size: 11px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--mmc-yellow);
        }
        .ab-fcta__primary-btn-h {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(22px, 2.6vw, 36px);
          letter-spacing: -0.025em; line-height: 1.08; color: #fff;
        }
        .ab-fcta__primary-btn-arrow {
          width: 64px; height: 64px; border-radius: 50%;
          background: var(--mmc-yellow); color: var(--mmc-blue-700);
          display: inline-flex; align-items: center; justify-content: center;
          transition: transform var(--dur-base) var(--ease-out);
          flex-shrink: 0;
        }
        .ab-fcta__primary-btn:hover .ab-fcta__primary-btn-arrow {
          transform: translateX(4px) rotate(-3deg);
        }
        .ab-fcta__primary-meta {
          display: inline-flex; align-items: center; gap: 10px;
          padding-left: 4px;
          font-family: var(--font-body); font-size: 12px;
          color: var(--fg-3); letter-spacing: 0.02em;
        }
        .ab-fcta__primary-meta strong { color: var(--mmc-blue); font-weight: 700; }
        .ab-fcta__primary-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #2BB573;
          box-shadow: 0 0 0 4px rgba(43, 181, 115, 0.18);
          animation: abFctaPulse 2.4s var(--ease-out) infinite;
          flex-shrink: 0;
        }
        @keyframes abFctaPulse {
          0%,100% { box-shadow: 0 0 0 4px rgba(43, 181, 115, 0.18); }
          50%     { box-shadow: 0 0 0 8px rgba(43, 181, 115, 0.05); }
        }

        .ab-fcta__secondary {
          display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
          max-width: 760px;
        }
        .ab-fcta__alt {
          display: grid; grid-template-columns: 36px 1fr 18px;
          gap: 14px; align-items: center;
          padding: 18px 20px;
          background: rgba(255,255,255,0.78);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.12);
          border-radius: 12px; backdrop-filter: blur(8px);
          color: var(--fg-1);
          transition: all var(--dur-base) var(--ease-out);
        }
        .ab-fcta__alt:hover {
          background: rgba(255,255,255,0.94);
          border-color: rgba(var(--mmc-blue-rgb), 0.24);
          transform: translateY(-2px); color: var(--fg-1);
          position: relative; z-index: 2;
        }
        .ab-fcta__alt-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: rgba(255,255,255,0.6);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.08);
          display: inline-flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .ab-fcta__alt-body { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .ab-fcta__alt-h {
          font-family: var(--font-display); font-weight: 700; font-size: 15px;
          letter-spacing: -0.01em; color: var(--mmc-blue);
        }
        .ab-fcta__alt-sub {
          font-family: var(--font-body); font-size: 12px;
          color: var(--fg-3);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .ab-fcta__alt-arrow {
          font-family: var(--font-display); font-weight: 700; font-size: 18px;
          color: var(--mmc-yellow);
          transition: transform var(--dur-base) var(--ease-out);
        }
        .ab-fcta__alt:hover .ab-fcta__alt-arrow { transform: translateX(4px); }

        @media (max-width: 720px) {
          .ab-fcta__primary-btn-inner { grid-template-columns: 1fr; gap: 18px; }
          .ab-fcta__primary-btn-arrow { align-self: flex-start; width: 52px; height: 52px; }
          .ab-fcta__secondary { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
window.AbCTA = AbCTA;
