/* handbook/HbStory.jsx, The story in narrative format */

function HbStory() {
  return (
    <section className="hs">
      <div className="container hs__container">
        {/* Chapter 1, Problem */}
        <article className="hs__chapter">
          <header className="hs__chapter-head">
            <span className="hs__ch-n">Chapter 01</span>
            <h2 className="hs__ch-h">When we got the call.</h2>
          </header>
          <div className="hs__body">
            <p className="hs__lede">
              October 2024. DeoBar's founder called us on a Friday. By Monday, the deck on
              their board was due, and the projection wasn't going to clear.
            </p>
            <p>
              The brand had crossed ₹4Cr in the previous 12 months and was doing the right shapes
              on the surface: a 4.2× ROAS, monthly creative refreshes, three agencies running
              specialized stacks. But blended margin was at <em>6%</em> and slipping. They were
              hitting the wall most D2C brands hit between ₹4Cr and ₹8Cr, and they didn't know why.
            </p>
            <div className="hs__pullquote">
              <p>
                "I've spent ₹2.4Cr on Meta in 12 months and I cannot tell you which 200k of it{" "}
                <span className="em-serif" style={{color:"var(--mmc-yellow)"}}>actually built a customer</span>{" "}
                versus rented attention I never owned."
              </p>
              <cite>Aanya Sharma · Founder, DeoBar</cite>
            </div>
            <p>
              We did a 5-day audit. The findings, in order of severity:
            </p>
            <ol className="hs__findings">
              <li><strong>D60 retention was 28%.</strong> Their category average is 52%. Every new customer was bleeding before LTV could pay back CAC.</li>
              <li><strong>Meta had 87 active ad sets and 312 creatives</strong> with no naming convention and overlapping audiences. The algorithm was cannibalizing itself.</li>
              <li><strong>The website was 4.2s LCP on mobile.</strong> Add-to-cart was a 3-step modal. A 14% conversion improvement was sitting in plain sight.</li>
              <li><strong>Klaviyo had 6 flows that hadn't been touched in 11 months.</strong> Welcome series sent the same email to a first-time buyer and a sixth-purchase loyalist.</li>
              <li><strong>The brand voice across creative was inconsistent</strong>: three agencies producing three different tones, none of them the founder's.</li>
            </ol>
          </div>
        </article>

        {/* Chapter 2, Plan */}
        <article className="hs__chapter">
          <header className="hs__chapter-head">
            <span className="hs__ch-n">Chapter 02</span>
            <h2 className="hs__ch-h">The 90-day plan.</h2>
          </header>
          <div className="hs__body">
            <p>
              We refused the project at first. The founder wanted us to "fix Meta." That isn't a fix.
              We came back two days later with a single-page proposal: rebuild the system end-to-end,
              one pod, 90 days, retention-first. They signed it that afternoon.
            </p>
            <div className="hs__plan">
              <div className="hs__phase">
                <span className="hs__phase-n">Days 1–14</span>
                <h3 className="hs__phase-h">Foundation</h3>
                <ul>
                  <li>Brand voice rewrite (3 voice pillars, 30 example lines)</li>
                  <li>Meta account rebuild, 3-tier funnel</li>
                  <li>Server-side CAPI + cohort-tagged events</li>
                  <li>Klaviyo flows audit + first 3 rebuilt</li>
                  <li>Site speed: 4.2s → 1.8s LCP</li>
                </ul>
              </div>
              <div className="hs__phase">
                <span className="hs__phase-n">Days 15–45</span>
                <h3 className="hs__phase-h">Production</h3>
                <ul>
                  <li>220 new creatives shipped (60 UGC, 100 static, 60 motion)</li>
                  <li>All 14 Klaviyo flows rewritten</li>
                  <li>Welcome → Second purchase email arc launched</li>
                  <li>WhatsApp lifecycle layer added</li>
                  <li>Subscription mechanic introduced</li>
                </ul>
              </div>
              <div className="hs__phase">
                <span className="hs__phase-n">Days 46–90</span>
                <h3 className="hs__phase-h">Compound</h3>
                <ul>
                  <li>Creative iteration on winners, 40 new units/wk</li>
                  <li>Spend scaled from ₹18L/mo to ₹84L/mo</li>
                  <li>Loyalty mechanic, points + tiers - went live</li>
                  <li>First subscription cohort hit 81% D90 retention</li>
                  <li>Brand campaign launched across all touchpoints</li>
                </ul>
              </div>
            </div>
          </div>
        </article>

        {/* Chapter 3, Results */}
        <article className="hs__chapter">
          <header className="hs__chapter-head">
            <span className="hs__ch-n">Chapter 03</span>
            <h2 className="hs__ch-h">What the math did.</h2>
          </header>
          <div className="hs__body">
            <p>
              The first week of December, six weeks in - was when the numbers turned. Cohort
              CAC dropped 41%. Blended ROAS crossed 8× for the first time. By the end of Q1,
              we were running ₹84L/mo in Meta spend at an 11.8× blended ROAS, a number we
              didn't promise and would have called optimistic.
            </p>

            <div className="hs__results">
              {[
                { l: "Blended ROAS",        f: "3.1×",   t: "11.8×" },
                { l: "Net revenue · 12mo",  f: "₹4.2Cr", t: "₹24.6Cr" },
                { l: "D90 Retention",       f: "41%",    t: "78%" },
                { l: "Cohort CAC",          f: "₹1,840", t: "₹620" },
                { l: "AOV",                 f: "₹780",   t: "₹1,420" },
                { l: "Meta CPM",            f: "₹420",   t: "₹260" },
                { l: "Creatives shipped",   f: "12/mo",  t: "240/mo" },
                { l: "Subscriber base",     f: "0",      t: "8,400" },
              ].map((r) => (
                <div key={r.l} className="hs__result">
                  <div className="hs__result-l">{r.l}</div>
                  <div className="hs__result-r">
                    <span className="from">{r.f}</span>
                    <span className="arr">→</span>
                    <span className="to">{r.t}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="hs__pullquote">
              <p>
                "The thing nobody told us is that{" "}
                <span className="em-serif" style={{color:"var(--mmc-blue)"}}>retention is a creative problem</span>.{" "}
                MMC was the first agency we worked with that saw that."
              </p>
              <cite>Aanya Sharma · Founder, DeoBar · April 2025</cite>
            </div>
          </div>
        </article>

        {/* Chapter 4, Lessons */}
        <article className="hs__chapter">
          <header className="hs__chapter-head">
            <span className="hs__ch-n">Chapter 04</span>
            <h2 className="hs__ch-h">What we'd do differently.</h2>
          </header>
          <div className="hs__body">
            <ol className="hs__lessons">
              <li>
                <h3>We waited too long on subscription.</h3>
                <p>The subscription mechanic was the single highest-leverage move and we shipped it in week 6. We should have done it in week 1. Future retainers, D2C - get subscription scoped into the first sprint.</p>
              </li>
              <li>
                <h3>We over-tested early.</h3>
                <p>Forty creative concepts running simultaneously means Meta can't learn. Now we constrain to 6–8 in week one, find winners, then scale variation.</p>
              </li>
              <li>
                <h3>Klaviyo deserved its own week.</h3>
                <p>We tried to redo flows in parallel with Meta. They deserved a dedicated sprint. Now every retainer has Week 3 reserved for retention infrastructure.</p>
              </li>
            </ol>
          </div>
        </article>
      </div>

      <style>{`
        .hs { position: relative; z-index: 1; padding: clamp(56px, 8vw, 96px) 0; }
        .hs__container { max-width: 880px; }
        .hs__chapter { padding: clamp(40px, 5vw, 72px) 0; border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.18); }
        .hs__chapter:first-child { padding-top: 0; }
        .hs__chapter:last-child { border-bottom: 0; }
        .hs__chapter-head { margin-bottom: 28px; }
        .hs__ch-n { font-family: var(--font-body); font-size: 11.5px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--mmc-yellow); }
        .hs__ch-h { font-family: var(--font-display); font-weight: 700; font-size: clamp(32px, 4vw, 56px); letter-spacing: -0.03em; line-height: 1.05; color: var(--fg-1); margin: 10px 0 0; }

        .hs__body { font-family: var(--font-body); font-size: clamp(15.5px, 1.15vw, 18px); line-height: 1.7; color: var(--fg-2); }
        .hs__body p { margin: 0 0 22px; }
        .hs__body em { font-family: var(--font-serif); font-style: italic; font-weight: 600; color: var(--mmc-blue); }
        .hs__body strong { color: var(--fg-1); font-weight: 700; }
        .hs__lede { font-family: var(--font-display); font-weight: 500; font-size: clamp(20px, 1.9vw, 26px); line-height: 1.4; letter-spacing: -0.015em; color: var(--fg-1); margin-bottom: 28px; }

        .hs__pullquote { background: rgba(255,255,255,0.78); backdrop-filter: blur(12px); border-left: 4px solid var(--mmc-yellow); border-radius: 0 12px 12px 0; padding: 28px 32px; margin: 28px 0; }
        .hs__pullquote p { font-family: var(--font-display); font-weight: 500; font-size: clamp(20px, 1.9vw, 26px); line-height: 1.35; letter-spacing: -0.018em; color: var(--fg-1); margin: 0 0 16px; }
        .hs__pullquote cite { font-family: var(--font-body); font-style: normal; font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--mmc-blue); }

        .hs__findings, .hs__lessons { list-style: none; margin: 8px 0 22px; padding: 0; counter-reset: hb; }
        .hs__findings li, .hs__lessons li { counter-increment: hb; padding: 18px 0 18px 56px; border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.10); position: relative; }
        .hs__findings li:first-child, .hs__lessons li:first-child { border-top: 0; padding-top: 8px; }
        .hs__findings li::before, .hs__lessons li::before {
          content: counter(hb, decimal-leading-zero);
          position: absolute; left: 0; top: 20px;
          font-family: var(--font-display); font-weight: 700; font-size: 13px;
          letter-spacing: 0.18em; color: var(--mmc-yellow);
        }
        .hs__findings li:first-child::before, .hs__lessons li:first-child::before { top: 10px; }
        .hs__lessons li h3 { font-family: var(--font-display); font-weight: 700; font-size: clamp(18px, 1.6vw, 22px); letter-spacing: -0.02em; color: var(--fg-1); margin: 0 0 8px; }

        .hs__plan { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin: 28px 0; }
        .hs__phase { background: rgba(255,255,255,0.78); backdrop-filter: blur(12px); border: 1px solid rgba(var(--mmc-blue-rgb), 0.12); border-radius: 12px; padding: 22px; display: flex; flex-direction: column; gap: 10px; }
        .hs__phase-n { font-family: var(--font-body); font-size: 10.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--mmc-yellow); }
        .hs__phase-h { font-family: var(--font-display); font-weight: 700; font-size: 22px; letter-spacing: -0.02em; color: var(--fg-1); margin: 0; }
        .hs__phase ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
        .hs__phase li { font-family: var(--font-body); font-size: 13.5px; line-height: 1.5; color: var(--fg-2); padding-left: 14px; position: relative; }
        .hs__phase li::before { content: ""; position: absolute; left: 0; top: 9px; width: 6px; height: 1px; background: var(--mmc-blue); opacity: 0.5; }

        .hs__results { background: rgba(255,255,255,0.82); border: 1px solid rgba(var(--mmc-blue-rgb), 0.12); border-radius: 14px; padding: 8px 24px; margin: 28px 0; }
        .hs__result { display: grid; grid-template-columns: 1fr auto; gap: 18px; align-items: center; padding: 14px 0; border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.08); }
        .hs__result:first-child { border-top: 0; }
        .hs__result-l { font-family: var(--font-display); font-weight: 600; font-size: 14px; letter-spacing: -0.005em; color: var(--fg-1); }
        .hs__result-r { display: inline-flex; align-items: baseline; gap: 12px; font-family: var(--font-display); font-weight: 700; font-variant-numeric: tabular-nums; }
        .hs__result-r .from { font-size: 15px; color: var(--fg-3); text-decoration: line-through; }
        .hs__result-r .arr { color: var(--mmc-yellow); }
        .hs__result-r .to { font-size: clamp(20px, 1.8vw, 24px); color: var(--mmc-blue); letter-spacing: -0.02em; }

        @media (max-width: 720px) { .hs__plan { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
window.HbStory = HbStory;
