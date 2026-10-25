/* Footer.jsx, Mid-weight. Logo + tagline + services breakdown + meta + legal. */

function Footer({ onAudit, cta }) {
  // Primary always books a slot. Pages may relabel it, but the destination
  // is the calendar, the audit form is the secondary path underneath.
  // One label sitewide ("Book a call"), so a buyer meets the same action on every
  // page. The exception is the hiring pages (cta.nav): a job seeker must not be
  // sent into the sales calendar, so those go where their label says.
  const nav = !!(cta && cta.nav);
  const ctaLabel = nav ? cta.label : "Book a call";
  const ctaHref = nav ? cta.href : (window.MMC_CALENDLY || "https://calendly.com/mmc-agency-ww/audit-onboarding-calls");
  const ctaExternal = !nav;

  /* Four columns of roughly even depth. The old set ran 5 / 3 / 8 / 2, so the
     Free Tools column towered over a two-item Legal column and the block ended
     on a badly ragged edge. Legal is gone entirely: Privacy and Terms already
     sit in the bottom bar, so that column was pure repetition. */
  const cols = [
  {
    title: "Company",
    items: [
    { name: "About", url: "About.html" },
    { name: "Our Work", url: "Our Work.html" },
    { name: "Careers", url: "Careers.html" },
    { name: "Contact", url: "Contact.html" }]

  },
  {
    title: "What we do",
    items: [
    { name: "Services", url: "services.html" },
    { name: "Performance marketing", url: "performance-marketing.html" },
    { name: "Lead generation", url: "lead-generation.html" },
    { name: "Retention marketing", url: "retention-marketing.html" },
    { name: "SEO", url: "seo.html" },
    { name: "Web development", url: "web-development.html" }]

  },
  {
    title: "Industries and resources",
    items: [
    { name: "Industries", url: "industries.html" },
    { name: "D2C brands", url: "d2c.html" },
    { name: "B2B companies", url: "b2b.html" },
    { name: "Education", url: "education.html" },
    { name: "Resources", url: "resources.html" },
    { name: "Guides", url: "guides.html" }]

  },
  {
    title: "Free tools",
    items: [
    { name: "Unit Economics", url: "unit-economics-calculator.html" },
    { name: "Growth Trajectory", url: "growth-trajectory-calculator.html" },
    { name: "CAC Runway", url: "cac-runway-calculator.html" },
    { name: "Funnel ROAS", url: "funnel-roas-calculator.html" },
    { name: "Break-even ROAS", url: "breakeven-roas-calculator.html" },
    { name: "LTV : CAC", url: "ltv-cac-calculator.html" },
    { name: "D2C Marketing Glossary", url: "d2c-marketing-glossary.html" }]

  }];


  const navLinks = [
  { label: "Our Work", url: "Our Work.html" },
  { label: "About", url: "About.html" },
  { label: "Careers", url: "Careers.html" },
  { label: "Contact", url: "Contact.html" }];


  return (
    <footer id="footer" className="ft ink-ground">
      <div className="ft__container">

        {/* Top row: logo on left, schedule CTA on right */}
        <div className="ft__top">
          <a className="ft__brand" href="index.html" aria-label="Monday Marketing Company">
            <img src="assets/logo-white-yellow.png" alt="MMC · Monday Marketing Company" className="ft__brand-img" style={{ width: "158px", height: "127px" }} />
            <div className="ft__brand-tag">Design × Marketing × Technology × Content × AI</div>
          </a>

          <div className="ft__cta-stack">
            <a className="ft__cta"
            href={ctaHref}
            target={ctaExternal ? "_blank" : undefined}
            rel={ctaExternal ? "noreferrer" : undefined}
            onClick={nav ? undefined : (e) => window.mmcBookCall("footer", e)}>
              {ctaLabel}
              <span className="arrow"></span>
            </a>
            <button type="button" className="ft__cta-alt" onClick={(e) => window.mmcOpenBrief(e)}>
              Not ready for a call? Send a brief instead
            </button>
          </div>
        </div>

        {/* Services grid */}
        <div className="ft__cols">
          {cols.map((c) =>
          <div className="ft__col" key={c.title}>
              <div className="ft__col-label">{c.title}</div>
              <ul>
                {c.items.map((it) =>
              <li key={it.name}><a href={it.url}>{it.name}</a></li>
              )}
              </ul>
            </div>
          )}
        </div>

        {/* One bottom bar. This used to be three stacked rows with a rule
            between each, which is most of why the footer ran to 959px. */}
        <div className="ft__base">
          <div className="ft__base-l">
            <a href="tel:+917666309102">+91 766 630 9102</a>
            <span className="ft__dot"></span>
            <a href="Contact.html">Thane · Mumbai · Maharashtra</a>
          </div>
          <div className="ft__base-r">
            <a href="https://www.instagram.com/monday.marketing.co/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://in.linkedin.com/company/monday-marketing-company" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="Privacy.html">Privacy</a>
            <a href="Terms.html">Terms</a>
            <a href="#" onClick={(e) => {e.preventDefault();if (window.__mmcOpenCookies) window.__mmcOpenCookies();}}>Cookies</a>
          </div>
        </div>

        <div className="ft__legal">
          <span>© 2026 Monday Marketing Company</span>
          <span className="em-serif ft__tagline">Quietly outperforming, since 2019.</span>
        </div>
      </div>

      <style>{`
        .ft {
          position: relative;
          z-index: 1;
          isolation: isolate;
          padding: clamp(34px, 3.2vw, 52px) 0 18px;
          color: rgba(255, 255, 255, 0.9);
          /* The same ground the case-study covers use: royal blue at the top
             shoulder, sinking to near-black by the base. Reusing the recipe
             rather than approximating it keeps one dark surface across the
             site instead of two that nearly match. */
          background: var(--grad-ink);
        }
        /* The same faint grid, masked so it fades out before the legal line. */
        .ft::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          opacity: 0.16;
          pointer-events: none;
          background-image: linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px);
          background-size: 26px 26px;
          -webkit-mask-image: radial-gradient(70% 60% at 50% 12%, #000, transparent);
                  mask-image: radial-gradient(70% 60% at 50% 12%, #000, transparent);
        }
        .ft__container {
          position: relative;
          width: 100%;
          max-width: var(--container-max);
          margin: 0 auto;
          padding-left: var(--gutter);
          padding-right: var(--gutter);
        }

        /* Top row */
        .ft__top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 28px;
          flex-wrap: wrap;
          padding-bottom: clamp(22px, 2.4vw, 30px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        }
        .ft__brand {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 20px;
          color: #fff;
        }
        .ft__brand:hover { color: #fff; }
        .ft__brand-img {
          height: 64px;
          width: auto;
          max-width: 250px;
          object-fit: contain;
          display: block;
          flex-shrink: 0;
        }
        .ft__brand-tag {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.78);
          max-width: 40ch;
          line-height: 1.5;
        }

        .ft__cta-stack { display: flex; flex-direction: column; align-items: flex-end; gap: 12px; }
        .ft__cta-alt {
          background: none; border: 0; padding: 0; cursor: pointer;
          font-family: var(--font-body); font-size: 12px; font-weight: 600;
          letter-spacing: 0.02em; color: rgba(255,255,255,0.6);
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.26); padding-bottom: 2px;
          transition: color var(--dur-base) var(--ease-out);
        }
        .ft__cta-alt:hover { color: #fff; border-bottom-color: var(--mmc-yellow); }
        @media (max-width: 720px) { .ft__cta-stack { align-items: flex-start; } }
        .ft__cta {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 14px 24px;
          background: var(--mmc-yellow);
          color: var(--mmc-blue-700);
          border-radius: 999px;
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: background var(--dur-base) var(--ease-out),
                      transform var(--dur-base) var(--ease-out);
          align-self: flex-end;
        }
        .ft__cta:hover {
          background: #F8A800;
          transform: translateY(-1px);
          color: var(--mmc-blue-700);
          position: relative; z-index: 2;
        }
        .ft__cta .arrow {
          width: 18px; height: 1.5px;
          background: currentColor;
          position: relative;
          transition: width var(--dur-base) var(--ease-out);
        }
        .ft__cta .arrow::after {
          content: "";
          position: absolute; right: -1px; top: -4px;
          width: 8px; height: 8px;
          border-top: 1.5px solid currentColor;
          border-right: 1.5px solid currentColor;
          transform: rotate(45deg);
        }
        .ft__cta:hover .arrow { width: 28px; }

        /* Services grid */
        .ft__cols {
          display: grid;
          /* The full-bleed shell made four equal 328px columns very wide and
             very empty. Capping each one keeps the link lists readable and
             stops the block spreading to 1400px on a large monitor. */
          /* Four equal columns that fill the shell, so the block's right edge
             lands on the same line as the CTA above it. Capping the columns
             left 284px of dead gutter and made the two masses look unrelated. */
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(20px, 2.6vw, 44px);
          padding: clamp(30px, 3.4vw, 44px) 0;
          border-bottom: 0;
        }
        @media (max-width: 900px) {
          .ft__cols { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 520px) {
          .ft__cols { grid-template-columns: 1fr; }
        }
        .ft__col {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .ft__col-label {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 14px;
          letter-spacing: -0.005em;
          color: var(--mmc-yellow);
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(var(--mmc-yellow-rgb), 0.22);
        }
        .ft__col ul {
          list-style: none;
          margin: 0; padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .ft__col a {
          font-family: var(--font-body);
          font-size: 13px;
          color: rgba(255, 255, 255, 0.78);
          letter-spacing: 0.005em;
          transition: color var(--dur-base) var(--ease-out);
        }
        .ft__col a:hover { color: #fff; }

        /* Nav row */
        /* One bar: contact on the left, social and cookies on the right. */
        .ft__base {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px 28px;
          padding: clamp(20px, 2.4vw, 28px) 0;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }
        .ft__base-l, .ft__base-r {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px 22px;
        }
        .ft__base a {
          font-family: var(--font-body);
          font-size: 13.5px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.78);
          text-decoration: none;
          transition: color 200ms var(--ease-out);
        }
        .ft__base a:hover { color: var(--mmc-yellow); }
        .ft__dot {
          width: 3px; height: 3px; border-radius: 50%;
          background: rgba(255, 255, 255, 0.34); flex: none;
        }

        .ft__legal {
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px;
          padding-top: 22px;
          font-family: var(--font-body);
          font-size: 11.5px;
          color: rgba(255, 255, 255, 0.55);
        }
        .ft__legal-links {
          display: inline-flex;
          gap: 18px;
        }
        .ft__legal-links a {
          color: rgba(255, 255, 255, 0.62);
          transition: color var(--dur-base) var(--ease-out);
        }
        .ft__legal-links a:hover { color: var(--mmc-yellow); }
        .ft__tagline {
          color: rgba(255, 255, 255, 0.55);
          font-size: 13px;
        }

        @media (max-width: 1100px) {
          .ft__cols { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 720px) {
          .ft__top { flex-direction: column; align-items: flex-start; }
          .ft__cta { align-self: flex-start; }
          .ft__cols { grid-template-columns: 1fr 1fr; }
          .ft__meta { flex-direction: column; align-items: flex-start; }
          .ft__legal { flex-direction: column; align-items: flex-start; }
          .ft__brand { flex-direction: column; align-items: flex-start; gap: 14px; }
          .ft__brand-tag { max-width: 100%; }
        }
        @media (max-width: 460px) {
          .ft__cols { grid-template-columns: 1fr; }
          .ft__brand-img { height: 72px; }
        }
      `}</style>
    </footer>);

}

window.Footer = Footer;