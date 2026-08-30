/* FAQ.jsx, 10 FAQs. AEO/GEO-friendly direct answers. */

function FAQ({ onAudit }) {
  const items = [
    {
      q: "Are you a performance agency, a brand agency, or a tech studio?",
      a: "We're a full-service growth studio. Five disciplines: design, marketing, technology, content, AI - sit in one pod for each client. Most agencies do one of these well; we built the studio so a brand never has to stitch four vendors to compound."
    },
    {
      q: "What does a typical engagement look like?",
      a: "A 6-week strategy sprint, followed by a 12-month retainer. The first 14 days are audit + roadmap. Days 15–28 are creative production and platform setup. Day 30 onwards is live media, weekly creative, monthly cohort reviews, and quarterly strategy resets."
    },
    {
      q: "Which brand sizes do you work with?",
      a: "We work with brands doing ₹3Cr → ₹150Cr in annual revenue. Below that, we recommend a smaller specialist. Above that, we typically partner alongside an in-house team rather than replace it."
    },
    {
      q: "Do you only work with D2C brands?",
      a: "No. About 60% of our work is D2C: beauty, food, apparel, home. The rest is healthcare, real estate, SaaS, education, and hospitality. The constant is consumer commerce: we know the physics of buying."
    },
    {
      q: "Can you guarantee a specific ROAS or revenue number?",
      a: "No serious operator can. What we will guarantee is the system: weekly cadence, transparent reporting, senior strategists on every account, and a 30-day exit clause if it's not working. Our median blended ROAS across the book is 8.7×."
    },
    {
      q: "How is MMC different from a freelance team or a holding-company agency?",
      a: "Freelancers can't run cross-discipline pods. Holding-company agencies can, but bill ₹15L+ a month for it and treat brands under ₹50Cr as small accounts. MMC is built for the middle: senior pods, ₹3L–₹15L monthly retainers, real ownership."
    },
    {
      q: "What platforms and tools do you run?",
      a: "Meta Ads, Google Ads, Amazon Ads, TikTok, Shopify, Klaviyo, WebEngage, GA4, Razorpay, GTM, Hotjar, Microsoft Clarity. Plus an in-house AI workflow stack for creative drafting and audience research."
    },
    {
      q: "Where are you based and do you work with international brands?",
      a: "Headquartered in Thane, Mumbai. We run brands across India, UAE, UK, and the US. About 30% of our current book is non-India revenue."
    },
    {
      q: "How fast can you go live?",
      a: "Two weeks from kickoff to first paid media. Strategy in week 1, creative production and platform integration in week 2, live media in week 3. Most agencies need 60 days; we treat onboarding as a sprint, not a discovery phase."
    },
    {
      q: "How do I start?",
      a: "Book a 30-minute free brand audit. A senior strategist reads your funnel, retention, creative, and architecture, and tells you the three highest-ROI things to fix first. No pitch deck, no sales pressure. If it makes sense after, we talk retainers."
    },
  ];

  const [open, setOpen] = React.useState(0);
  const toggle = (i) => setOpen(open === i ? -1 : i);

  return (
    <section id="faq" className="faq" data-screen-label="08 FAQ">
      <div className="container">
        <div className="faq__grid">
          {/* Left, pitch + CTA */}
          <aside className="faq__l">
            <div className="eyebrow">Answers · 10 questions</div>
            <h2 className="faq__h">
              Things worth{" "}
              <span className="em-serif" style={{color:"var(--mmc-blue)"}}>asking out loud.</span>
            </h2>
            <p className="faq__lead">
              We get the same dozen questions every month. So here they are, answered plainly,
              and faster than a sales call would have been.
            </p>
            <button className="btn btn--ghost faq__btn" onClick={onAudit}>
              Ask a different one
              <span className="arrow"></span>
            </button>

            <div className="faq__contact">
              <div className="faq__contact-line">
                <span className="faq__contact-lbl">Or write directly</span>
                <a href="mailto:sales-in@mondaymarketing.company">sales-in@mondaymarketing.company</a>
              </div>
              <div className="faq__contact-line">
                <span className="faq__contact-lbl">WhatsApp</span>
                <a href="tel:+919619472727">+91 96194 72727</a>
              </div>
            </div>
          </aside>

          {/* Right, accordion */}
          <ol className="faq__list">
            {items.map((it, i) => (
              <li key={i}
                  className={"faq__item " + (open === i ? "is-open" : "")}
                  itemScope itemType="https://schema.org/Question">
                <button className="faq__q" onClick={() => toggle(i)}
                        aria-expanded={open === i}>
                  <span className="faq__q-n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="faq__q-text" itemProp="name">{it.q}</span>
                  <span className="faq__q-icon" aria-hidden="true">
                    <span></span><span></span>
                  </span>
                </button>
                <div className="faq__a"
                     itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <div className="faq__a-inner" itemProp="text">
                    {it.a}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <style>{`
        .faq {
          position: relative;
          z-index: 1;
          padding: clamp(56px, 7vw, 96px) 0;
        }
        /* Paper backdrop, keeps content readable as the sky reddens around it.
           Sits inside the section, full-bleed, with a soft warm cream fade. */
        .faq::before {
          content: "";
          position: absolute;
          left: 0; right: 0; top: clamp(40px, 5vw, 72px); bottom: clamp(40px, 5vw, 72px);
          background:
            radial-gradient(ellipse 90% 80% at 50% 50%,
              rgba(255, 252, 244, 0.96) 0%,
              rgba(251, 250, 246, 0.92) 60%,
              rgba(251, 250, 246, 0.85) 100%);
          backdrop-filter: blur(24px) saturate(140%);
          -webkit-backdrop-filter: blur(24px) saturate(140%);
          border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          z-index: -1;
          pointer-events: none;
        }
        .faq__grid {
          display: grid;
          grid-template-columns: 0.45fr 0.55fr;
          gap: clamp(40px, 6vw, 80px);
          align-items: start;
        }
        .faq__l {
          position: sticky;
          top: 120px;
          max-width: 460px;
        }
        .faq__h {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(34px, 4.4vw, 60px);
          line-height: 1.04;
          letter-spacing: -0.03em;
          margin: 18px 0 22px;
          color: var(--fg-1);
        }
        .faq__lead {
          font-family: var(--font-body);
          font-size: clamp(16px, 1.2vw, 19px);
          line-height: 1.55;
          color: var(--fg-2);
          margin: 0 0 28px;
        }
        .faq__btn { margin-bottom: 32px; }
        .faq__contact {
          padding-top: 24px;
          border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.18);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .faq__contact-line {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .faq__contact-lbl {
          font-family: var(--font-body);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--fg-3);
        }
        .faq__contact-line a {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 16px;
          letter-spacing: -0.005em;
          color: var(--mmc-blue);
        }

        .faq__list {
          list-style: none;
          margin: 0; padding: 0;
        }
        .faq__item {
          border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.18);
        }
        .faq__item:last-child {
          border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.18);
        }
        .faq__q {
          width: 100%;
          display: grid;
          grid-template-columns: 40px 1fr 28px;
          gap: 18px;
          align-items: center;
          padding: 22px 4px;
          text-align: left;
          color: var(--fg-1);
          font: inherit;
          transition: padding var(--dur-base) var(--ease-out);
        }
        .faq__q:hover { padding-left: 12px; }
        .faq__q-n {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.18em;
          color: var(--mmc-yellow);
        }
        .faq__q-text {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(17px, 1.4vw, 21px);
          letter-spacing: -0.015em;
          line-height: 1.3;
          color: var(--fg-1);
          transition: color var(--dur-base) var(--ease-out);
        }
        .faq__item.is-open .faq__q-text { color: var(--mmc-blue); }
        .faq__q-icon {
          width: 22px; height: 22px;
          position: relative;
          margin-left: auto;
        }
        .faq__q-icon span {
          position: absolute;
          left: 50%; top: 50%;
          width: 14px; height: 1.5px;
          background: var(--mmc-blue);
          transform: translate(-50%, -50%);
          transition: transform var(--dur-base) var(--ease-out),
                      opacity var(--dur-base) var(--ease-out);
        }
        .faq__q-icon span:nth-child(2) {
          transform: translate(-50%, -50%) rotate(90deg);
        }
        .faq__item.is-open .faq__q-icon span:nth-child(2) {
          transform: translate(-50%, -50%) rotate(0deg);
          opacity: 0;
        }

        .faq__a {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 480ms var(--ease-out);
        }
        .faq__item.is-open .faq__a {
          grid-template-rows: 1fr;
        }
        .faq__a-inner {
          overflow: hidden;
          font-family: var(--font-body);
          font-size: clamp(14.5px, 1.05vw, 16.5px);
          line-height: 1.65;
          color: var(--fg-2);
          padding: 0 4px 0 62px;
          opacity: 0;
          transition: opacity 320ms var(--ease-out), padding-bottom 320ms var(--ease-out);
          padding-bottom: 0;
        }
        .faq__item.is-open .faq__a-inner {
          opacity: 1;
          padding-bottom: 26px;
          transition-delay: 100ms;
        }

        @media (max-width: 900px) {
          .faq__grid { grid-template-columns: 1fr; gap: 36px; }
          .faq__l { position: static; max-width: 100%; }
          .faq__a-inner { padding-left: 58px; }
        }
        @media (max-width: 520px) {
          .faq__q { grid-template-columns: 32px 1fr 24px; gap: 12px; }
          .faq__a-inner { padding-left: 44px; }
        }
      `}</style>
    </section>
  );
}

window.FAQ = FAQ;
