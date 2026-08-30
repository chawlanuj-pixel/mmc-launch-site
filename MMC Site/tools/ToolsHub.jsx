/* tools/ToolsHub.jsx, index for the free calculator suite. */

function ToolsHub() {
  const T = window.mmcTools;
  const { ToolCTA } = T;

  const tools = [
    {
      slug: "unit-economics-calculator.html",
      name: "Unit Economics Calculator",
      line: "What one order actually leaves behind.",
      body: "The full contribution ladder: MRP and GST down through COGS, fulfilment, RTO and CAC to CM1, CM2 and CM3. Then it scales one order into a monthly P&L with EBITDA, EBIT and PAT, and tells you the exact volume you need to break even.",
      inputs: ["MRP & GST", "COGS lines", "Fulfilment", "RTO", "CAC", "Overhead"],
      out: "CM1 · CM2 · CM3 · Monthly P&L · Break-even units",
    },
    {
      slug: "growth-trajectory-calculator.html",
      name: "Growth Trajectory Calculator",
      line: "Where this run rate actually gets you.",
      body: "Project revenue and profit from where you are today. Year one compounds month-on-month; the years after use a separate YoY rate, because holding a year-one MoM figure for five years is a hope, not a plan. Shows implied YoY, months to double, and the full path.",
      inputs: ["Starting revenue", "MoM %", "YoY %", "Net margin"],
      out: "Implied YoY · Months to double · 5-year trajectory",
    },
    {
      slug: "cac-runway-calculator.html",
      name: "CAC Runway Calculator",
      line: "How long a new brand burns before it turns.",
      body: "A new brand almost never hits break-even CAC on day one. This models the honest version. You overpay while the account learns, and two forces close the gap: CAC falling month on month, and repeat purchase from customers already bought. Answers the only two questions that matter: how long, and how much cash.",
      inputs: ["Contribution / order", "CAC today", "Improvement rate", "Repeat rate", "Cash in bank"],
      out: "Months to profit · Total cash to burn · 36-month projection",
    },
    {
      slug: "funnel-roas-calculator.html",
      name: "Funnel ROAS Calculator",
      line: "Where the funnel leaks, and what each leak costs.",
      body: "Set spend, CPM and AOV, then move the five conversion rates between an impression and a paid order. Shows how many people survive each step, rates every rate against Indian D2C medians, and proves the thing most brands get backwards: spend buys volume, not efficiency.",
      inputs: ["Ad spend", "CPM", "AOV", "5 conversion rates"],
      out: "Orders · Revenue · ROAS · Cost per order",
    },
    {
      slug: "breakeven-roas-calculator.html",
      name: "Break-even ROAS Calculator",
      line: "The ROAS you actually need before you make a rupee.",
      body: "Most brands chase a ROAS number they heard somewhere. Yours falls out of your own cost sheet. Put in COGS, shipping, gateway fees and RTO, and get the exact ROAS that breaks even: plus the one that hits your target net margin.",
      inputs: ["AOV", "COGS", "Shipping", "Fees", "RTO rate"],
      out: "Break-even ROAS · Break-even CAC · Contribution margin",
    },
    {
      slug: "ltv-cac-calculator.html",
      name: "LTV : CAC Calculator",
      line: "What a customer is worth, and when you get it back.",
      body: "First-order profit is the wrong question for a brand that plans to exist in three years. Models repeat purchase as a decaying cohort and shows the month your acquisition cost is finally paid back, and what a ten-point lift in repeat rate is worth.",
      inputs: ["AOV", "Contribution margin", "Repeat rate", "CAC"],
      out: "LTV · LTV:CAC ratio · Payback month",
    },
    {
      slug: "d2c-marketing-glossary.html",
      name: "D2C Marketing Glossary",
      line: "Every term above, in plain English.",
      body: "ROAS, CAC, LTV, AOV, COGS, RTO, contribution margin: 39 terms from D2C and performance marketing, each with what it means, how it's calculated, and why it matters to your P&L. Jargon never explained with more jargon.",
      inputs: ["A term you don't know"],
      out: "Definition · Formula · Why it matters",
    },
  ];

  return (
    <>
      <section className="page-hero tl-hero" id="top" data-wm="Tools">
        <span className="page-hero__wm" aria-hidden="true">Tools</span>
        <div className="tl-wrap">
          <nav className="tl-crumb" aria-label="Breadcrumb">
            <a href="index.html">Home</a><span aria-hidden="true">·</span>
            <span aria-current="page">Free tools</span>
          </nav>
          <h1 className="tl-hero__h">
            The numbers we run before <span className="tl-serif">we take a client.</span>
          </h1>
          <p className="tl-hero__p">
            Six calculators we use inside real engagements, plus the glossary that
            explains every term in them: rebuilt for you to use free. No email wall, no gated PDF, no drip sequence - put your numbers in
            and take the answer with you.
          </p>
          <p className="tl-reassure">
            <b>A number is not a verdict.</b> Nothing here is a judgement on your brand. It
            shows you the shape of the problem and the order worth fixing it in, so the next
            quarter starts prepared instead of surprised.
          </p>
        </div>
      </section>

      <section className="tl-calc">
        <div className="tl-wrap">
          <div className="th-grid">
            {tools.map((t, i) => (
              <a className="th-card" href={t.slug} key={t.slug}>
                <span className="th-card__n">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="th-card__h">{t.name}</h2>
                <p className="th-card__line">{t.line}</p>
                <p className="th-card__body">{t.body}</p>
                <div className="th-card__meta">
                  <span className="th-card__k">You put in</span>
                  <span className="th-card__v">{t.inputs.join(" · ")}</span>
                </div>
                <div className="th-card__meta">
                  <span className="th-card__k">You get out</span>
                  <span className="th-card__v">{t.out}</span>
                </div>
                <span className="th-card__cta">Open the calculator<span className="tl-cross__arr" aria-hidden="true"></span></span>
              </a>
            ))}
          </div>

          <div className="tl-insight" style={{ marginTop: "28px" }}>
            <h3 className="tl-insight__h">Why these three, in this order</h3>
            <p className="tl-insight__p">
              Start with <strong>Unit Economics</strong>: if one order doesn't contribute,
              nothing downstream matters. Then the three ROAS and retention tools answer the
              same question at three different altitudes.{" "}
              <strong>Funnel ROAS</strong> tells you where efficiency is lost.{" "}
              <strong>Break-even ROAS</strong> tells you what efficiency you need.{" "}
              <strong>LTV:CAC</strong> tells you how long you can afford to be patient
              about getting there.
            </p>
            <p className="tl-insight__p">
              Run in that order they compose: the funnel gives you a ROAS, break-even tells
              you whether that ROAS is survivable, and LTV:CAC tells you whether a thin
              first order is a problem or a plan. <strong>CAC Runway</strong> answers the
              question every new brand actually has, how long until this stops costing
              money, and <strong>Growth Trajectory</strong> projects whatever margin the
              others produce forward.
            </p>
          </div>
        </div>
      </section>

      <ToolCTA line="Or skip the arithmetic and let us run it with you." />

      <style>{`
        .th-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; }
        .th-card {
          display: flex; flex-direction: column; gap: 10px; text-decoration: none;
          background: #fff; border: 1.5px solid rgba(29,78,216,0.15);
          border-radius: 16px; padding: clamp(22px, 2.6vw, 30px);
          transition: border-color 220ms ease, transform 220ms ease, box-shadow 220ms ease;
        }
        .th-card:hover { border-color: var(--mmc-blue); transform: translateY(-4px); box-shadow: 0 14px 34px rgba(15,30,94,0.10);
          position: relative; z-index: 2;
        }
        .th-card__n {
          font-family: var(--font-display); font-weight: 800; font-size: 12px;
          letter-spacing: 0.16em; color: var(--mmc-yellow);
        }
        .th-card__h {
          font-family: var(--font-display); font-weight: 800; font-size: clamp(19px, 2vw, 23px);
          letter-spacing: -0.022em; color: var(--fg-1); margin: 0; line-height: 1.15;
        }
        .th-card__line {
          font-family: var(--font-serif); font-style: italic; font-size: 16.5px;
          color: var(--mmc-blue); margin: 0; line-height: 1.35;
        }
        .th-card__body { font-family: var(--font-body); font-size: 14px; line-height: 1.6; color: var(--fg-2); margin: 0; }
        .th-card__meta { display: flex; flex-direction: column; gap: 3px; padding-top: 11px; border-top: 1px dashed rgba(29,78,216,0.16); }
        .th-card__k {
          font-family: var(--font-body); font-size: 9.5px; font-weight: 800;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--fg-3);
        }
        .th-card__v { font-family: var(--font-body); font-size: 12.5px; color: var(--fg-2); line-height: 1.45; }
        .th-card__cta {
          margin-top: auto; padding-top: 14px;
          font-family: var(--font-body); font-size: 11.5px; font-weight: 800;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--mmc-blue);
          display: inline-flex; align-items: center; gap: 10px;
        }
        .th-card:hover .tl-cross__arr { width: 26px; }
      `}</style>
    </>
  );
}

window.ToolsHub = ToolsHub;
