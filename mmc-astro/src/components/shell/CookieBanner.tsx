import React from "react";

export default function CookieBanner() {
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
    (window as any).__mmcOpenCookies = () => {
      setOpen(true);
      setShowPrefs(true);
    };
    return () => { delete (window as any).__mmcOpenCookies; };
  }, []);

  const save = (choice: string) => {
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
                show you the right brand audit content. <a href="/privacy/">Read the privacy policy</a> or pick
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
    </div>
  );
}

