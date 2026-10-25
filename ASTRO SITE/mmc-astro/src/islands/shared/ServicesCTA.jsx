import React from "react";

/* MidCTA.jsx, the mid-funnel CTA band that sits above the footer.

   It used to live in services/ and was named for that page, but three other
   pages render it and the Services page is gone. Same component, same
   ServicesCTA export so existing callers keep working. */

function ServicesCTA({ onAudit }) {
  return (
    <section className="sxc">
      <div className="container">
        <div className="sxc__inner">
          <div className="eyebrow">Start the system</div>
          <h2 className="sxc__h">
            One pod. <span className="em-serif" style={{color:"var(--mmc-yellow)"}}>Every system.</span>
            <br/>
            Built for revenue that compounds.
          </h2>
          <p className="sxc__sub">
            Book a strategy call. We'll read your funnel, retention, creative,
            and architecture, and come back with the three things to fix first.
            No pitch. One working day.
          </p>
          <div className="sxc__actions">
            <button className="btn btn--primary glow-btn" onClick={onAudit}>
              <span className="glow-btn__glow" aria-hidden="true"></span>
              <span className="glow-btn__inner">
                Book a strategy call
                <span className="arrow"></span>
              </span>
            </button>
            <a className="btn btn--ghost-on-dark" href="/work/">
              See the work first
              <span className="arrow"></span>
            </a>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .sxc { position: relative; z-index: 1; padding: clamp(56px, 7vw, 96px) 0; }
        .sxc__inner {
          background: var(--mmc-blue);
          color: #fff;
          padding: clamp(40px, 5vw, 72px) clamp(36px, 4.6vw, 64px);
          border-radius: 18px;
          max-width: none;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
        }
        .sxc__inner::before {
          content: "";
          position: absolute;
          right: -10%; top: -30%;
          width: 320px; height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(var(--mmc-yellow-rgb), 0.35), rgba(var(--mmc-yellow-rgb), 0) 60%);
          pointer-events: none;
        }
        .sxc__inner .eyebrow { color: var(--mmc-yellow); margin-bottom: 18px; }
        .sxc__inner .eyebrow::before { background: var(--mmc-yellow); }
        .sxc__h {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(34px, 4.4vw, 60px); letter-spacing: -0.03em; line-height: 1.04;
          color: #fff; margin: 0 0 20px;
          position: relative;
        }
        .sxc__sub {
          font-family: var(--font-body); font-size: clamp(15px, 1.15vw, 18px); line-height: 1.55;
          color: rgba(255,255,255,0.78);
          max-width: 580px; margin: 0 0 32px;
        }
        .sxc__actions { display: inline-flex; align-items: center; gap: 22px; flex-wrap: wrap; }
        .btn--ghost-on-dark {
          background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.22);
        }
        .btn--ghost-on-dark:hover { border-color: var(--mmc-yellow); color: var(--mmc-yellow); }
      ` }} />
    </section>
  );
}


export { ServicesCTA };
