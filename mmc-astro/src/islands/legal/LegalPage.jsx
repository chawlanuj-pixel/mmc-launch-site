import React from "react";

/* legal/LegalPage.jsx, Shared shell for Privacy + Terms.
   Pass <LegalPage kind="privacy" /> or kind="terms" to switch content. */

function LegalPage({ kind }) {
  const isPrivacy = kind === "privacy";
  const title = isPrivacy ? "Privacy Policy" : "Terms & Conditions";
  const eyebrow = isPrivacy
    ? "Privacy · How we handle your data"
    : "Terms · The agreement";
  const intro = isPrivacy
    ? "We collect the minimum necessary to make the site work, run our retainers, and get you back inside one working day. We don't sell data and we never have."
    : "By using mondaymarketing.company, you agree to these terms. They cover how the site behaves, what we promise, and what we don't.";

  const updated = "May 14, 2026";
  const wm = isPrivacy ? "Privacy" : "Terms";

  const privacy = [
    { h: "What we collect",
      body: [
        "Contact details you submit through forms: name, email, phone, brand. We use these to respond to your enquiry within one working day.",
        "Application data: for jobs, we collect your name, email, CV, current/expected CTC, work-mode preference, and a written response. Retained for 18 months from submission.",
        "Cookies: see Cookie Policy below for category-by-category breakdown.",
        "Usage data, anonymized pageviews and event data via GA4 and Microsoft Clarity to understand how the site is used.",
      ]
    },
    { h: "What we don't collect",
      body: [
        "We do not sell or rent personal data to third parties.",
        "We do not run third-party advertising trackers on logged-in client dashboards (when applicable).",
        "We do not collect data from anyone under 16.",
      ]
    },
    { h: "Cookie policy",
      body: [
        "Strictly necessary: for session, security, and form submission. Cannot be disabled.",
        "Analytics: GA4, Hotjar, Microsoft Clarity. Helps us see what's working and what isn't.",
        "Marketing: Meta Pixel, LinkedIn Insight, Google Ads. So we can show you the right brand audit content.",
        "You can change your preferences any time by clicking 'Cookies' in the footer.",
      ]
    },
    { h: "Your rights",
      body: [
        "Access: request a copy of the data we hold on you.",
        "Correction: ask us to fix anything that's wrong.",
        "Deletion, ask us to remove your data. We honor this inside 30 days unless legally required to retain.",
        "Portability: receive your data in a machine-readable format.",
        "Email all rights requests to privacy@mondaymarketing.company. We acknowledge within 7 days.",
      ]
    },
    { h: "Data storage & transfer",
      body: [
        "Primary storage in India: AWS Asia Pacific (Mumbai) for application data and forms.",
        "Analytics processed by Google in the United States under standard contractual clauses.",
        "Application files (CVs) stored in encrypted S3, accessible only to the hiring pod for that role.",
      ]
    },
    { h: "Changes to this policy",
      body: [
        "We'll post any material change here with a new 'Last updated' date. For substantial changes, we'll notify subscribers via the Monday Letter.",
      ]
    },
    { h: "Contact",
      body: [
        "privacy@mondaymarketing.company · +91 766 630 9102 · 4th Floor, Office No. 105, WeWork, Zenia Building, Hiranandani Business Park, Thane 400607, Maharashtra, India.",
      ]
    },
  ];

  const terms = [
    { h: "Acceptance",
      body: [
        "By accessing this site, you agree to these terms and our Privacy Policy. If you don't agree, please don't use the site.",
      ]
    },
    { h: "About this site",
      body: [
        "Monday Marketing Company ('MMC') is a private limited company registered in Maharashtra, India. The mondaymarketing.company site is a marketing publication for our studio's services.",
        "The site is not a contract for services. Engagement with MMC for any service requires a separate written agreement.",
      ]
    },
    { h: "Use of the site",
      body: [
        "You may not copy, reproduce, or distribute case-study content, copy, or imagery without written permission.",
        "You may not use the site to engage in any unlawful activity, scrape automated data, or impersonate MMC personnel.",
        "Pricing, packages, and engagement details shown are indicative. Final scope is set in a written engagement letter.",
      ]
    },
    { h: "Intellectual property",
      body: [
        "All site copy, design, photography, and marks are the property of Monday Marketing Company unless otherwise credited.",
        "Client logos and case-study assets are shown with the client's permission and remain their property.",
      ]
    },
    { h: "Job applications",
      body: [
        "Submitting an application creates no employment relationship and is not a guarantee of a response or offer.",
        "We retain application data for 18 months. You may request deletion any time at privacy@mondaymarketing.company.",
      ]
    },
    { h: "Limitation of liability",
      body: [
        "The site is provided 'as is.' We work hard to keep it accurate but make no warranty.",
        "MMC is not liable for any indirect, incidental, or consequential loss arising from use of the site.",
        "If you engage MMC under a written contract, liability is governed by that contract, not by these terms.",
      ]
    },
    { h: "Governing law",
      body: [
        "These terms are governed by the laws of India. Disputes are subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.",
      ]
    },
    { h: "Contact",
      body: [
        "legal@mondaymarketing.company · 4th Floor, Office No. 105, WeWork, Zenia Building, Hiranandani Business Park, Thane 400607, Maharashtra, India.",
      ]
    },
  ];

  const sections = isPrivacy ? privacy : terms;

  return (
    <>
      <section className="page-hero lg-hero" id="top" data-wm={wm}>
        <span className="page-hero__wm" aria-hidden="true">{wm}</span>
        <div className="container lg-hero__inner">
          <nav className="lg-crumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="sep">·</span>
            <span className="current">{title}</span>
          </nav>
          <div className="eyebrow">{eyebrow}</div>
          <h1 className="lg-h">{title}</h1>
          <p className="lg-lead">{intro}</p>
          <div className="lg-updated">Last updated · {updated}</div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          .lg-hero { position: relative; z-index: 1; padding: 140px 0 clamp(40px, 5vw, 64px); }
          .lg-hero__inner { max-width: none; }
          .lg-crumb { font-family: var(--font-body); font-size: 11.5px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 24px; }
          .lg-crumb .sep { margin: 0 10px; }
          /* The crumb is spelled .lg-crumb, not .lg__crumb, so the shared sheet's
             [class*="__crumb"] block never reaches it. Repeat those colours here,
             scoped to section.page-hero so they only apply on the blue card. */
          section.page-hero .lg-crumb { color: rgba(255,255,255,0.5); }
          section.page-hero .lg-crumb a { color: rgba(255,255,255,0.66); }
          section.page-hero .lg-crumb a:hover { color: #fff; }
          section.page-hero .lg-crumb .sep { color: rgba(255,255,255,0.34); }
          section.page-hero .lg-crumb .current { color: rgba(255,255,255,0.86); }
          .lg-h { font-family: var(--font-display); font-weight: 700; font-size: clamp(40px, 5.4vw, 80px); line-height: 0.98; letter-spacing: -0.035em; color: var(--fg-1); margin: 18px 0 22px; }
          .lg-lead { font-family: var(--font-body); font-size: clamp(16px, 1.3vw, 19px); line-height: 1.55; color: var(--fg-2); margin: 0 0 22px; max-width: 720px; }
          .lg-updated { font-family: var(--font-body); font-size: 11.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--mmc-yellow); padding-top: 18px; display: inline-block; padding-right: 22px; }
          /* The old rule ruled off in ink blue, which is invisible on the card. */
          section.page-hero .lg-updated { border-top: 1px solid rgba(255,255,255,0.16); }
        ` }} />
      </section>

      <section className="lg-body">
        <div className="container lg-body__container">
          <ol className="lg-sections">
            {sections.map((s, i) => (
              <li key={s.h} className="lg-section">
                <div className="lg-n">{String(i + 1).padStart(2, "0")}</div>
                <div className="lg-section-body">
                  <h2 className="lg-h2">{s.h}</h2>
                  {s.body.map((p, j) => (
                    <p key={j} className="lg-p">{p}</p>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          .lg-body { position: relative; z-index: 1; padding: clamp(48px, 6vw, 80px) 0 clamp(56px, 8vw, 112px); }
          .lg-body__container { max-width: 860px; }
          .lg-sections { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0; }
          .lg-section { display: grid; grid-template-columns: 70px 1fr; gap: 24px; padding: clamp(28px, 3vw, 40px) 0; border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.18); }
          .lg-section:first-child { border-top: 0; }
          .lg-n { font-family: var(--font-display); font-weight: 700; font-size: 13px; letter-spacing: 0.18em; color: var(--mmc-yellow); padding-top: 4px; }
          .lg-section-body { display: flex; flex-direction: column; gap: 12px; }
          .lg-h2 { font-family: var(--font-display); font-weight: 700; font-size: clamp(20px, 2vw, 28px); letter-spacing: -0.02em; line-height: 1.15; color: var(--fg-1); margin: 0 0 6px; }
          .lg-p { font-family: var(--font-body); font-size: 15px; line-height: 1.65; color: var(--fg-1); margin: 0; }
          @media (max-width: 600px) { .lg-section { grid-template-columns: 1fr; } .lg-n { padding-top: 0; } }
        ` }} />
      </section>
    </>
  );
}


export { LegalPage };
