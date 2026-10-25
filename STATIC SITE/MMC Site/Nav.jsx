/* Nav.jsx, floating pill nav with menu trigger */

function Nav({ onOpenMenu, onAudit, menuOpen, menuBtnRef }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const tick = () => {
      const d = new Date();
      const opts = { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" };
      setTime(d.toLocaleTimeString("en-IN", opts) + " IST");
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const skip = (e) => {
    const m = document.querySelector("main");
    if (!m) return;
    e.preventDefault();
    if (!m.hasAttribute("tabindex")) m.setAttribute("tabindex", "-1");
    m.focus({ preventScroll: false });
  };

  return (
    <>
    <a className="skip-link" href="#main" onClick={skip}>Skip to content</a>
    <nav className={"mmc-nav " + (scrolled ? "is-scrolled " : "") + (menuOpen ? "is-menu-open" : "")}>
      <div className="mmc-nav__inner">
        <a className="mmc-nav__mark" href="index.html" aria-label="Monday Marketing Company">
          <img className="mmc-nav__mark-icon" src="assets/logo-mark.png" alt="MMC" />
          <span className="mmc-nav__name">
            <span className="mmc-nav__name-mmc">Monday Marketing Company</span>
            <span className="mmc-nav__name-tag">Design × Marketing × Technology × Content × AI</span>
          </span>
        </a>

        <div className="mmc-nav__meta">
          <span className="mmc-nav__meta-dot"></span>
          <span>Onboarding · Clients · Hires  · {time || "-"}</span>
        </div>

        <div className="mmc-nav__actions">
          <button className="mmc-nav__audit" onClick={onAudit}>
            <span>Book a call</span>
            <span className="mmc-nav__audit-arrow" aria-hidden="true"></span>
          </button>

          <button
            ref={menuBtnRef}
            className={"mmc-menu-btn " + (menuOpen ? "is-open" : "")}
            onClick={onOpenMenu}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className="mmc-menu-btn__halo" aria-hidden="true"></span>
            <span className="mmc-menu-btn__label">
              <span className="mmc-menu-btn__word mmc-menu-btn__word--menu">Menu</span>
              <span className="mmc-menu-btn__word mmc-menu-btn__word--close">Close</span>
            </span>
            <span className="mmc-menu-btn__icon" aria-hidden="true">
              <span></span><span></span><span></span>
            </span>
          </button>
        </div>
      </div>

      <style>{`
        .mmc-nav {
          position: fixed;
          top: 20px;
          left: 0; right: 0;
          z-index: 80;
          display: flex;
          justify-content: center;
          padding-inline: var(--shell-gutter);
          pointer-events: none;
          transition: top 280ms var(--ease-out);
        }
        .mmc-nav.is-scrolled { top: 12px; }
        .mmc-nav__inner {
          pointer-events: auto;
          /* Outer edge lands on the shell edge, so the bar and the hero card
             below it start and end at the same x. A fixed 1240 here was why
             the bar looked small beside a full-bleed section. */
          width: 100%;
          max-width: calc(var(--shell-max) - var(--shell-gutter) * 2);
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(22px) saturate(150%);
          -webkit-backdrop-filter: blur(22px) saturate(150%);
          border: 1px solid var(--mmc-border);
          border-radius: 999px;
          padding: 8px 8px 8px var(--shell-gutter);
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: var(--shadow-3);
          transition: background 280ms var(--ease-out), border-color 280ms var(--ease-out);
        }
        /* When menu is open, keep nav clearly legible on cream background */
        .mmc-nav.is-menu-open .mmc-nav__inner {
          background: rgba(255, 255, 255, 0.92);
          border-color: rgba(var(--mmc-blue-rgb), 0.16);
        }

        .mmc-nav__mark {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: var(--mmc-blue);
          flex: 0 0 auto;
        }
        .mmc-nav__mark-icon {
          width: 38px;
          height: 38px;
          object-fit: contain;
          flex-shrink: 0;
          display: block;
        }
        .mmc-nav__name {
          display: flex;
          flex-direction: column;
          line-height: 1.15;
        }
        .mmc-nav__name-mmc {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 14px;
          letter-spacing: -0.01em;
          color: var(--mmc-blue);
        }
        .mmc-nav__name-tag {
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 9.5px;
          color: var(--fg-3);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 3px;
        }

        .mmc-nav__meta {
          margin-left: auto;
          margin-right: 0;
          font-family: var(--font-body);
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--fg-3);
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-transform: uppercase;
        }
        .mmc-nav__meta-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #2BB573;
          box-shadow: 0 0 0 4px rgba(43, 181, 115, 0.18);
          animation: pulse 2.4s var(--ease-out) infinite;
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 4px rgba(43, 181, 115, 0.18); }
          50%      { box-shadow: 0 0 0 7px rgba(43, 181, 115, 0.05); }
        }

        .mmc-nav__actions {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          /* Always the last thing on the right. The auto margin used to live on
             .mmc-nav__meta, which is hidden under 880px, so below that width the
             menu button slid back against the logo. */
          margin-left: auto;
          flex: 0 0 auto;
        }

        /* ---- Audit pill ---- */
        .mmc-nav__audit {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px 10px 18px;
          border-radius: 999px;
          background: transparent;
          color: var(--mmc-blue);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.18);
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: border-color var(--dur-base) var(--ease-out),
                      color var(--dur-base) var(--ease-out),
                      background var(--dur-base) var(--ease-out);
        }
        .mmc-nav__audit:hover {
          border-color: var(--mmc-blue);
          background: var(--mmc-blue);
          color: #fff;
        }
        .mmc-nav__audit-arrow {
          position: relative;
          display: inline-block;
          width: 14px; height: 1.5px;
          background: currentColor;
          transition: width var(--dur-base) var(--ease-out);
        }
        .mmc-nav__audit-arrow::after {
          content: "";
          position: absolute; right: -1px; top: -3px;
          width: 7px; height: 7px;
          border-top: 1.5px solid currentColor;
          border-right: 1.5px solid currentColor;
          transform: rotate(45deg);
        }
        .mmc-nav__audit:hover .mmc-nav__audit-arrow { width: 22px; }

        /* ---- Menu trigger ---- */
        .mmc-menu-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 10px 16px 10px 18px;
          border-radius: 999px;
          background: var(--mmc-blue);
          color: #fff;
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          overflow: hidden;
          isolation: isolate;
          transition: background var(--dur-base) var(--ease-out),
                      color var(--dur-base) var(--ease-out);
        }
        .mmc-menu-btn:hover { background: var(--mmc-blue-700); }
        /* Open state, clearly visible on paper menu bg */
        .mmc-menu-btn.is-open {
          background: var(--mmc-yellow);
          color: var(--mmc-blue-700);
        }
        .mmc-menu-btn.is-open:hover { background: #F8A800; }

        .mmc-menu-btn__halo {
          position: absolute;
          inset: -40%;
          background: radial-gradient(circle at 50% 50%, rgba(var(--mmc-yellow-rgb), 0.85) 0%, rgba(var(--mmc-yellow-rgb), 0) 60%);
          opacity: 0;
          transform: scale(0.4);
          transition: transform var(--dur-slow) var(--ease-out), opacity var(--dur-slow) var(--ease-out);
          z-index: -1;
        }
        .mmc-menu-btn:hover .mmc-menu-btn__halo { opacity: 0.45; transform: scale(1); }
        .mmc-menu-btn.is-open .mmc-menu-btn__halo { opacity: 0; }

        .mmc-menu-btn__label {
          position: relative;
          display: inline-block;
          height: 14px;
          line-height: 14px;
          overflow: hidden;
        }
        .mmc-menu-btn__word {
          display: block;
          transition: transform var(--dur-base) var(--ease-out);
        }
        .mmc-menu-btn.is-open .mmc-menu-btn__word { transform: translateY(-14px); }

        .mmc-menu-btn__icon {
          position: relative;
          width: 16px;
          height: 14px;
          display: inline-flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .mmc-menu-btn__icon span {
          display: block;
          height: 1.5px;
          background: currentColor;
          border-radius: 1px;
          transform-origin: center;
          transition: transform 380ms var(--ease-out), opacity 240ms var(--ease-out);
        }
        .mmc-menu-btn__icon span:nth-child(1) { width: 16px; }
        .mmc-menu-btn__icon span:nth-child(2) { width: 11px; align-self: flex-end; }
        .mmc-menu-btn__icon span:nth-child(3) { width: 16px; }

        .mmc-menu-btn.is-open .mmc-menu-btn__icon span:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
        }
        .mmc-menu-btn.is-open .mmc-menu-btn__icon span:nth-child(2) { opacity: 0; }
        .mmc-menu-btn.is-open .mmc-menu-btn__icon span:nth-child(3) {
          transform: translateY(-6px) rotate(-45deg);
        }

        @media (max-width: 880px) {
          .mmc-nav__meta { display: none; }
          .mmc-nav__name-tag { display: none; }
        }
        @media (max-width: 720px) {
          .mmc-nav__audit { display: none; }
          .mmc-nav__inner { padding-left: 14px; padding-right: 6px; gap: 10px; }
          .mmc-nav__mark { min-width: 0; }
          .mmc-nav__name-mmc { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
          .mmc-nav__mark-icon { width: 32px; height: 32px; }
          .mmc-nav__name-mmc { font-size: 13px; }
        }
      `}</style>
    </nav>
    <div className="mbar" role="region" aria-label="Contact">
      <button type="button" className="mbar__book" onClick={(e) => window.mmcBookCall("mobile-bar", e)}>Book a call</button>
      <a className="mbar__wa" href="https://wa.me/919619472727" target="_blank" rel="noreferrer"
         onClick={() => { try { (window.dataLayer = window.dataLayer || []).push({ event: "whatsapp_click", cta_source: "mobile-bar" }); } catch (e) {} }}>
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.2.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.5Z"/></svg>
        <span>WhatsApp</span>
      </a>
    </div>
    </>
  );
}

window.Nav = Nav;
