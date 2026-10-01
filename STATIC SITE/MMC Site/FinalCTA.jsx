/* FinalCTA.jsx, "Ready To Build Momentum?"
   Single dominant primary action with two secondary entry points underneath.
   Strong typographic hierarchy + emotional close. */

function FinalCTA({ onAudit }) {
  return (
    <section id="cta" className="fcta" data-screen-label="09 Final CTA">
      <div className="container">
        <div className="fcta__inner">
          <div className="eyebrow fcta__eyebrow">
            <span style={{ color: "var(--mmc-yellow)" }}>The last word</span>
          </div>

          <h2 className="fcta__h">
            Stop renting growth.
            <br />
            <span className="em-serif" style={{ color: "var(--mmc-yellow)" }}>Own</span> the engine.
          </h2>

          <p className="fcta__sub">
            One conversation is all it takes to know if we're the team to build it with you.
            Thirty minutes, with a senior who'll tell you the three things to fix first, even if you never sign with us.
          </p>

          {/* Secondary options come first, softer entry points */}
          <div className="fcta__secondary">
            <span className="fcta__secondary-label">Come in any way that suits you</span>
            <div className="fcta__secondary-row">
              <a className="fcta__alt fcta__alt--wa" href="https://wa.me/919619472727">
                <span className="fcta__alt-icon" aria-hidden="true">
                  <svg viewBox="0 0 32 32" width="22" height="22">
                    <path fill="#25D366" d="M16 0C7.16 0 0 7.16 0 16c0 2.82.74 5.58 2.15 8.02L0 32l8.21-2.14A15.93 15.93 0 0 0 16 32c8.84 0 16-7.16 16-16S24.84 0 16 0z"/>
                    <path fill="#FFF" d="M23.47 19.62c-.4-.2-2.36-1.17-2.72-1.3-.37-.13-.63-.2-.9.2-.27.4-1.03 1.3-1.27 1.57-.23.27-.47.3-.87.1-.4-.2-1.68-.62-3.2-1.97a12 12 0 0 1-2.22-2.76c-.23-.4-.02-.62.17-.82.18-.18.4-.47.6-.7.2-.24.27-.4.4-.67.13-.27.07-.5-.03-.7-.1-.2-.9-2.17-1.23-2.97-.32-.78-.65-.67-.9-.68-.23-.01-.5-.01-.77-.01a1.48 1.48 0 0 0-1.07.5c-.37.4-1.4 1.37-1.4 3.34s1.43 3.87 1.63 4.14c.2.27 2.82 4.3 6.83 6.04.95.42 1.7.67 2.28.85.96.3 1.83.26 2.52.16.77-.12 2.36-.97 2.7-1.9.33-.94.33-1.74.23-1.9-.1-.18-.36-.27-.76-.47z"/>
                  </svg>
                </span>
                <span className="fcta__alt-body">
                  <span className="fcta__alt-h">WhatsApp the studio</span>
                  <span className="fcta__alt-sub">+91 96194 72727 · reply in the hour</span>
                </span>
                <span className="fcta__alt-arrow" aria-hidden="true">→</span>
              </a>
              <a className="fcta__alt fcta__alt--prop" href="Contact.html">
                <span className="fcta__alt-icon" aria-hidden="true">
                  <svg viewBox="0 0 32 32" width="22" height="22">
                    <path fill="var(--mmc-blue)" d="M7 3h13l6 6v18a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/>
                    <path fill="var(--mmc-yellow)" d="M20 3v6h6z"/>
                    <path fill="#FFF" d="M9 16h10v1.6H9zm0 4h14v1.6H9zm0 4h11v1.6H9z"/>
                  </svg>
                </span>
                <span className="fcta__alt-body">
                  <span className="fcta__alt-h">Request a proposal</span>
                  <span className="fcta__alt-sub">Brief in, scoped deck back in 48 hrs</span>
                </span>
                <span className="fcta__alt-arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Dominant primary CTA: below the alts, the dominant final beat */}
          <div className="fcta__primary">
            <span className="fcta__primary-label">Or close the loop now</span>
            <button className="fcta__primary-btn glow-btn" onClick={onAudit}>
              <span className="glow-btn__glow" aria-hidden="true"></span>
              <span className="fcta__primary-btn-inner">
                <span className="fcta__primary-btn-text">
                  <span className="fcta__primary-btn-tag">Book the call</span>
                  <span className="fcta__primary-btn-h">30 min with a senior strategist</span>
                </span>
                <span className="fcta__primary-btn-arrow" aria-hidden="true">
                  <svg viewBox="0 0 32 32" width="28" height="28">
                    <path d="M 8 16 L 24 16 M 18 9 L 25 16 L 18 23"
                    fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </button>
            <div className="fcta__primary-meta">
              <span className="fcta__primary-dot"></span>
              <span><strong>Avg. response · 4 hours</strong> · Mon–Sat IST</span>
            </div>
          </div>

          <div className="fcta__foot">
            <span className="fcta__foot-line"></span>
            <span className="fcta__foot-text">
              Or simply <a href="mailto:sales-in@mondaymarketing.company">write to the studio</a>{" "}
              · We read every line.
            </span>
            <span className="fcta__foot-line"></span>
          </div>
        </div>
      </div>

      <style>{`
        .fcta {
          position: relative;
          z-index: 1;
          padding: clamp(64px, 9vw, 132px) 0 clamp(36px, 5vw, 72px);
        }
        .fcta__inner {
          max-width: none;
          margin: 0 auto;
        }
        .fcta__eyebrow { margin-bottom: 28px; }

        /* Oversized closing headline, emotional, two-line */
        .fcta__h {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(56px, 9.6vw, 168px);
          line-height: 0.92;
          letter-spacing: -0.045em;
          color: var(--fg-1);
          margin: 0 0 28px;
        }
        :global([data-phase="dusk"]) .fcta__h,
        :global([data-phase="night"]) .fcta__h { color: #fff; }

        .fcta__sub {
          font-family: var(--font-body);
          font-size: clamp(17px, 1.5vw, 22px);
          line-height: 1.5;
          color: var(--fg-2);
          max-width: 640px;
          margin: 0 0 clamp(36px, 5vw, 56px);
        }

        /* ---- Secondary options come first ---- */
        .fcta__secondary {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 760px;
          margin-bottom: clamp(36px, 5vw, 56px);
        }

        /* ---- Dominant primary CTA ---- */
        .fcta__primary {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .fcta__primary-label {
          font-family: var(--font-body);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--mmc-yellow);
          margin-bottom: 4px;
        }
        .fcta__primary-btn {
          appearance: none;
          background: var(--mmc-blue);
          color: #fff;
          border: 0;
          border-radius: 18px;
          padding: 0;
          cursor: pointer;
          font: inherit;
          width: 100%;
          max-width: 760px;
          box-shadow: 0 32px 64px -28px rgba(var(--mmc-blue-rgb), 0.6),
                      0 0 0 1px rgba(var(--mmc-blue-rgb), 0.2);
          position: relative;
          overflow: hidden;
          transition: transform var(--dur-base) var(--ease-out),
                      box-shadow var(--dur-base) var(--ease-out);
        }
        .fcta__primary-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 40px 80px -28px rgba(var(--mmc-blue-rgb), 0.7),
                      0 0 0 1px rgba(var(--mmc-blue-rgb), 0.3);
          position: relative; z-index: 2;
        }
        .fcta__primary-btn-inner {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 24px;
          align-items: center;
          padding: clamp(26px, 3vw, 38px) clamp(28px, 3.4vw, 44px);
          position: relative;
          z-index: 1;
        }
        .fcta__primary-btn-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
          text-align: left;
        }
        .fcta__primary-btn-tag {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--mmc-yellow);
        }
        .fcta__primary-btn-h {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(24px, 2.8vw, 38px);
          letter-spacing: -0.025em;
          line-height: 1.08;
          color: #fff;
        }
        .fcta__primary-btn-arrow {
          width: 64px; height: 64px;
          border-radius: 50%;
          background: var(--mmc-yellow);
          color: var(--mmc-blue-700);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform var(--dur-base) var(--ease-out);
          flex-shrink: 0;
        }
        .fcta__primary-btn:hover .fcta__primary-btn-arrow {
          transform: translateX(4px) rotate(-3deg);
        }
        .fcta__primary-meta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding-left: 4px;
          font-family: var(--font-body);
          font-size: 12px;
          color: var(--fg-3);
          letter-spacing: 0.02em;
        }
        .fcta__primary-meta strong { color: var(--mmc-blue); font-weight: 700; }
        .fcta__primary-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #2BB573;
          box-shadow: 0 0 0 4px rgba(43, 181, 115, 0.18);
          animation: fctaPulse 2.4s var(--ease-out) infinite;
          flex-shrink: 0;
        }
        @keyframes fctaPulse {
          0%,100% { box-shadow: 0 0 0 4px rgba(43, 181, 115, 0.18); }
          50%     { box-shadow: 0 0 0 8px rgba(43, 181, 115, 0.05); }
        }

        .fcta__secondary-label {
          font-family: var(--font-body);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--fg-3);
        }
        .fcta__secondary-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .fcta__alt {
          display: grid;
          grid-template-columns: 36px 1fr 18px;
          gap: 14px;
          align-items: center;
          padding: 18px 20px;
          background: rgba(255,255,255,0.78);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.12);
          border-radius: 12px;
          backdrop-filter: blur(8px);
          color: var(--fg-1);
          transition: all var(--dur-base) var(--ease-out);
        }
        .fcta__alt:hover {
          background: rgba(255,255,255,0.94);
          border-color: rgba(var(--mmc-blue-rgb), 0.24);
          transform: translateY(-2px);
          color: var(--fg-1);
          position: relative; z-index: 2;
        }
        .fcta__alt-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          background: rgba(255,255,255,0.6);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.08);
          display: inline-flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .fcta__alt-icon svg { display: block; }
        .fcta__alt-body { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .fcta__alt-h {
          font-family: var(--font-display); font-weight: 700; font-size: 15px;
          letter-spacing: -0.01em; color: var(--mmc-blue);
        }
        .fcta__alt-sub {
          font-family: var(--font-body); font-size: 12px;
          color: var(--fg-3);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .fcta__alt-arrow {
          font-family: var(--font-display); font-weight: 700; font-size: 18px;
          color: var(--mmc-yellow);
          transition: transform var(--dur-base) var(--ease-out);
        }
        .fcta__alt:hover .fcta__alt-arrow { transform: translateX(4px); }

        /* ---- Foot ---- */
        .fcta__foot {
          margin-top: clamp(48px, 6vw, 80px);
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .fcta__foot-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(var(--mmc-blue-rgb), 0.18), transparent);
        }
        .fcta__foot-text {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--fg-3);
          white-space: nowrap;
        }
        .fcta__foot-text a {
          color: var(--mmc-blue);
          border-bottom: 1px solid currentColor;
        }
        .fcta__foot-text a:hover { color: var(--mmc-yellow); border-color: var(--mmc-yellow); }

        @media (max-width: 720px) {
          .fcta__primary-btn-inner { grid-template-columns: 1fr; gap: 18px; }
          .fcta__primary-btn-arrow { align-self: flex-start; width: 52px; height: 52px; }
          .fcta__secondary-row { grid-template-columns: 1fr; }
          .fcta__foot { flex-direction: column; gap: 14px; }
          .fcta__foot-text { white-space: normal; text-align: center; }
        }
      `}</style>
    </section>);

}

window.FinalCTA = FinalCTA;