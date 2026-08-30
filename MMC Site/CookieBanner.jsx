/* CookieBanner.jsx, GDPR-style cookie consent banner.
   Sits at bottom of viewport on first visit. Persists choice to localStorage.
   Exposes window.__mmcOpenCookies() so Footer "Cookies" link can re-trigger. */

function CookieBanner() {
  const [open, setOpen] = React.useState(false);
  const [showPrefs, setShowPrefs] = React.useState(false);
  const [prefs, setPrefs] = React.useState({
    necessary: true,    // always on
    analytics: true,
    marketing: true,
  });

  // Mount check
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("mmc-cookies-v1");
      if (!stored) setOpen(true);
    } catch (e) { setOpen(true); }

    // Expose re-open API
    window.__mmcOpenCookies = () => {
      setOpen(true);
      setShowPrefs(true);
    };
    return () => { delete window.__mmcOpenCookies; };
  }, []);

  const save = (choice) => {
    const value = choice === "accept-all"
      ? { necessary: true, analytics: true, marketing: true, at: Date.now() }
      : choice === "reject-non-essential"
      ? { necessary: true, analytics: false, marketing: false, at: Date.now() }
      : { ...prefs, at: Date.now() };
    try { localStorage.setItem("mmc-cookies-v1", JSON.stringify(value)); } catch (e) {}
    setOpen(false);
    setShowPrefs(false);
  };

  if (!open) return null;

  return (
    <div className="cookie" role="dialog" aria-label="Cookie preferences">
      <div className="cookie__inner">
        {!showPrefs ? (
          <>
            <div className="cookie__l">
              <div className="cookie__eyebrow">
                <span className="cookie__eyebrow-dot"></span>
                A note about cookies
              </div>
              <p className="cookie__body">
                We use cookies to measure how the site performs, improve our work, and
                show you the right brand audit content. <a href="Privacy.html">Read the privacy policy</a> or pick
                what you'd like to allow.
              </p>
            </div>
            <div className="cookie__r">
              <button className="cookie__btn cookie__btn--ghost" onClick={() => setShowPrefs(true)}>
                Choose
              </button>
              <button className="cookie__btn cookie__btn--secondary" onClick={() => save("reject-non-essential")}>
                Essential only
              </button>
              <button className="cookie__btn cookie__btn--primary" onClick={() => save("accept-all")}>
                Accept all
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="cookie__prefs">
              <div className="cookie__prefs-head">
                <div className="cookie__prefs-title">Cookie preferences</div>
                <button className="cookie__close" onClick={() => setShowPrefs(false)} aria-label="Close">×</button>
              </div>

              <ul className="cookie__list">
                <li>
                  <div className="cookie__list-head">
                    <span className="cookie__list-name">Strictly necessary</span>
                    <span className="cookie__list-locked">Always on</span>
                  </div>
                  <p>For session, security, and form submission. Cannot be disabled.</p>
                </li>
                <li>
                  <div className="cookie__list-head">
                    <span className="cookie__list-name">Analytics</span>
                    <label className="cookie__toggle">
                      <input type="checkbox"
                             checked={prefs.analytics}
                             onChange={(e) => setPrefs(p => ({...p, analytics: e.target.checked}))}/>
                      <span className="cookie__toggle-track"></span>
                    </label>
                  </div>
                  <p>GA4, Hotjar, Microsoft Clarity. Helps us understand where the site needs work.</p>
                </li>
                <li>
                  <div className="cookie__list-head">
                    <span className="cookie__list-name">Marketing</span>
                    <label className="cookie__toggle">
                      <input type="checkbox"
                             checked={prefs.marketing}
                             onChange={(e) => setPrefs(p => ({...p, marketing: e.target.checked}))}/>
                      <span className="cookie__toggle-track"></span>
                    </label>
                  </div>
                  <p>Meta Pixel, LinkedIn Insight, Google Ads. So we can show you the right brand audit content.</p>
                </li>
              </ul>

              <div className="cookie__prefs-foot">
                <button className="cookie__btn cookie__btn--secondary" onClick={() => save("reject-non-essential")}>
                  Essential only
                </button>
                <button className="cookie__btn cookie__btn--primary" onClick={() => save("custom")}>
                  Save preferences
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        .cookie {
          position: fixed;
          left: clamp(12px, 2vw, 24px);
          right: clamp(12px, 2vw, 24px);
          bottom: clamp(12px, 2vw, 24px);
          /* Above page content, below anything the visitor deliberately opened:
             the menu (70), the nav (80) and the audit / booking modals (100+).
             At 95 this banner covered the audit form's revenue field. */
          z-index: 60;
          animation: cookieIn 480ms var(--ease-out);
        }
        @keyframes cookieIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cookie__inner {
          background: rgba(255, 252, 244, 0.96);
          backdrop-filter: blur(24px) saturate(140%);
          -webkit-backdrop-filter: blur(24px) saturate(140%);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.18);
          border-radius: 16px;
          padding: clamp(18px, 2vw, 26px) clamp(20px, 2.4vw, 32px);
          box-shadow: 0 22px 64px -16px rgba(17, 24, 39, 0.22);
          display: flex;
          align-items: center;
          gap: clamp(20px, 3vw, 36px);
          flex-wrap: wrap;
        }
        .cookie__l { flex: 1; min-width: 260px; }
        .cookie__r {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .cookie__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-body);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--mmc-yellow);
          margin-bottom: 6px;
        }
        .cookie__eyebrow-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--mmc-yellow);
          box-shadow: 0 0 0 3px rgba(var(--mmc-yellow-rgb), 0.2);
        }
        .cookie__body {
          font-family: var(--font-body);
          font-size: 13.5px;
          line-height: 1.55;
          color: var(--fg-1);
          margin: 0;
          max-width: 640px;
        }
        .cookie__body a {
          color: var(--mmc-blue);
          border-bottom: 1px solid currentColor;
        }
        .cookie__body a:hover { color: var(--mmc-blue-700); }

        .cookie__btn {
          font-family: var(--font-body);
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 11px 18px;
          border-radius: 999px;
          border: 1px solid transparent;
          transition: all var(--dur-base) var(--ease-out);
          cursor: pointer;
          white-space: nowrap;
        }
        .cookie__btn--primary {
          background: var(--mmc-blue);
          color: #fff;
        }
        .cookie__btn--primary:hover {
          background: var(--mmc-blue-700);
          transform: translateY(-1px);
          position: relative; z-index: 2;
        }
        .cookie__btn--secondary {
          background: #fff;
          color: var(--mmc-blue);
          border-color: rgba(var(--mmc-blue-rgb), 0.22);
        }
        .cookie__btn--secondary:hover {
          border-color: var(--mmc-blue);
        }
        .cookie__btn--ghost {
          background: transparent;
          color: var(--fg-2);
        }
        .cookie__btn--ghost:hover {
          color: var(--mmc-blue);
        }

        /* Prefs panel */
        .cookie__prefs { flex: 1; min-width: 100%; }
        .cookie__prefs-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 14px;
          margin-bottom: 14px;
          border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.12);
        }
        .cookie__prefs-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 18px;
          letter-spacing: -0.015em;
          color: var(--fg-1);
        }
        .cookie__close {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: rgba(var(--mmc-blue-rgb), 0.08);
          color: var(--mmc-blue);
          font-size: 20px; line-height: 1;
          cursor: pointer;
          transition: background var(--dur-base) var(--ease-out);
        }
        .cookie__close:hover { background: rgba(var(--mmc-blue-rgb), 0.16); }

        .cookie__list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .cookie__list li {
          padding: 14px 0;
          border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
        }
        .cookie__list li:last-child { border-bottom: 0; }
        .cookie__list-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
          gap: 14px;
        }
        .cookie__list-name {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 15px;
          letter-spacing: -0.005em;
          color: var(--fg-1);
        }
        .cookie__list-locked {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--mmc-yellow);
          padding: 4px 10px;
          background: rgba(var(--mmc-yellow-rgb), 0.16);
          border-radius: 999px;
        }
        .cookie__list p {
          font-family: var(--font-body);
          font-size: 12.5px;
          line-height: 1.5;
          color: var(--fg-2);
          margin: 0;
          max-width: 600px;
        }

        /* Toggle */
        .cookie__toggle {
          position: relative;
          width: 42px;
          height: 22px;
          flex-shrink: 0;
          cursor: pointer;
        }
        .cookie__toggle input { opacity: 0; position: absolute; inset: 0; cursor: pointer; }
        .cookie__toggle-track {
          position: absolute; inset: 0;
          background: rgba(var(--mmc-blue-rgb), 0.18);
          border-radius: 999px;
          transition: background var(--dur-base) var(--ease-out);
        }
        .cookie__toggle-track::after {
          content: "";
          position: absolute;
          left: 3px;
          top: 3px;
          width: 16px; height: 16px;
          border-radius: 50%;
          background: #fff;
          transition: transform var(--dur-base) var(--ease-out);
          box-shadow: 0 1px 2px rgba(0,0,0,0.18);
        }
        .cookie__toggle input:checked + .cookie__toggle-track {
          background: var(--mmc-blue);
        }
        .cookie__toggle input:checked + .cookie__toggle-track::after {
          transform: translateX(20px);
        }

        .cookie__prefs-foot {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          padding-top: 18px;
          margin-top: 8px;
          border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.12);
        }

        @media (max-width: 720px) {
          .cookie__inner { flex-direction: column; align-items: stretch; }
          .cookie__r { justify-content: flex-end; }
          .cookie__prefs-foot { flex-direction: column-reverse; }
          .cookie__btn { width: 100%; text-align: center; }
        }
      `}</style>
    </div>
  );
}

window.CookieBanner = CookieBanner;
