/* home/sections-problem.jsx, "Sound familiar?"
   Problem-recognition section. Every line is written as the sentence a founder
   would actually say, not as a description of what we sell. The method copy
   comes later in the deck. This section earns it. */

function ProblemV2({ active }) {
  const pains = [
    {
      tag: "Acquisition",
      say: "We doubled the ad budget and revenue barely moved.",
      why: "Spend buys volume, not efficiency. If the five rates between an impression and a paid order don't change, a bigger budget just buys more of the same maths: at a worse CPM.",
      fix: "We rebuild the funnel before we touch the budget.",
      link: { l: "Run your funnel numbers", h: "funnel-roas-calculator.html" },
    },
    {
      tag: "Unit economics",
      say: "ROAS looks fine on the dashboard. The bank balance disagrees.",
      why: "Dashboard ROAS ignores COGS, shipping, gateway fees and RTO. Plenty of brands hit a 3× that still loses money on every order once the returns come back.",
      fix: "We work backwards from your cost sheet to the ROAS you actually need.",
      link: { l: "Find your break-even ROAS", h: "breakeven-roas-calculator.html" },
    },
    {
      tag: "Retention",
      say: "We're renting customers. Nobody comes back after the first order.",
      why: "Retention is a creative problem before it's a CRM problem. Most brands add a flow to a product nobody was given a reason to reorder, and blame the email tool.",
      fix: "We fix the reason to return, then build the lifecycle around it.",
      link: { l: "Retention Marketing", h: "Contact.html" },
    },
    {
      tag: "Creative",
      say: "Every ad works for two weeks, then dies.",
      why: "One winning angle produced eleven ways isn't creative diversity, it's the same ad in eleven costumes. Fatigue is a symptom of a thin thesis, not a thin budget.",
      fix: "We ship 240+ assets a month against a single brand thesis.",
      link: { l: "UGC & performance creative", h: "Contact.html" },
    },
    {
      tag: "Conversion",
      say: "Traffic is up. Conversion rate has been flat for a year.",
      why: "Traffic growth hides a static site. If the landing page, offer and checkout haven't changed, more visitors just means paying more for the same percentage.",
      fix: "We treat the site as the highest-leverage ad you own.",
      link: { l: "CRO for Website", h: "Contact.html" },
    },
    {
      tag: "Channel",
      say: "We're 90% marketplace. We don't own a single customer.",
      why: "Amazon and the quick-commerce apps rent you demand and keep the relationship. It works right up until the category gets crowded or the commission moves.",
      fix: "We build the owned channel without breaking what already sells.",
      link: { l: "Ecommerce management", h: "Contact.html" },
    },
  ];

  const [i, setI] = React.useState(0);
  const cur = pains[i];

  return (
    <section
      className={"sec sec--dark sec--dense sec--problem" + (active ? " is-active" : "")}
      data-screen-label="03 Problem"
      data-label="Problem"
      id="sec-2"
    >
      <div className="sec__content">
        <span className="eyebrow2 r d1">Sound familiar?</span>
        <h2 className="sec__h r d2" style={{ fontSize: "clamp(30px,3.4vw,54px)" }}>
          Six ways growth stalls. <span className="serif-accent">We've fixed all six.</span>
        </h2>

        <div className="pain r d3">
          <ol className="pain__rows">
            {pains.map((p, idx) => (
              <li key={p.tag}>
                <button
                  className={"painrow " + (idx === i ? "is-on" : "")}
                  onMouseEnter={() => setI(idx)}
                  onFocus={() => setI(idx)}
                  onClick={() => setI(idx)}
                  aria-pressed={idx === i}
                >
                  <span className="painrow__tag">{p.tag}</span>
                  <span className="painrow__say">“{p.say}”</span>
                </button>
              </li>
            ))}
          </ol>

          <div className="pain__detail" key={cur.tag}>
            <span className="pain__k">What's actually happening</span>
            <p className="pain__why">{cur.why}</p>
            <span className="pain__k">What we do about it</span>
            <p className="pain__fix">{cur.fix}</p>
            <a className="pain__link" href={cur.link.h}>
              {cur.link.l}<span className="arr" aria-hidden="true"></span>
            </a>
          </div>
        </div>

        <div className="pain__cta r d4">
          <span className="pain__cta-l">Any of those yours?</span>
          <button className="b b--sun" onClick={(e) => window.mmcBookCall("home-problem", e)}>
            Let's talk<span className="arr"></span>
          </button>
        </div>
      </div>

      <style>{`
        .sec--problem { grid-template-columns: 1fr; }
        .sec--problem .sec__content {
          max-width: 1240px; width: 100%; margin: 0 auto;
          padding-right: clamp(72px, 7vw, 128px);
        }
        .pain {
          display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 0.85fr);
          gap: clamp(18px, 2.4vw, 36px); align-items: start; margin-top: 22px;
        }
        @media (max-width: 900px) { .pain { grid-template-columns: 1fr; gap: 16px; } }

        .pain__rows { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
        .painrow {
          width: 100%; text-align: left; cursor: pointer; background: none;
          border: 0; border-left: 2px solid rgba(255,255,255,0.14);
          padding: 9px 0 9px 14px; display: flex; flex-direction: column; gap: 3px;
          transition: border-color 240ms ease, padding-left 240ms ease;
        }
        .painrow:hover, .painrow.is-on { border-left-color: var(--mmc-yellow); padding-left: 18px; }
        .painrow__tag {
          font-family: var(--font-body); font-size: 9.5px; font-weight: 800;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: rgba(255,255,255,0.45); transition: color 240ms ease;
        }
        .painrow.is-on .painrow__tag { color: var(--mmc-yellow); }
        .painrow__say {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(14px, 1.35vw, 18px); line-height: 1.28;
          letter-spacing: -0.015em; color: rgba(255,255,255,0.62);
          transition: color 240ms ease;
        }
        .painrow:hover .painrow__say, .painrow.is-on .painrow__say { color: #fff; }
        .painrow:focus-visible { outline: 2px solid var(--mmc-yellow); outline-offset: 3px; }

        .pain__detail {
          border: 1.5px solid rgba(255,255,255,0.16); border-radius: 14px;
          padding: clamp(16px, 1.9vw, 24px);
          background: rgba(255,255,255,0.04);
          animation: painIn 380ms cubic-bezier(0.22,0.61,0.36,1) both;
        }
        @keyframes painIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .pain__detail { animation: none; } }
        .pain__k {
          display: block; font-family: var(--font-body); font-size: 9.5px; font-weight: 800;
          letter-spacing: 0.16em; text-transform: uppercase; color: var(--mmc-yellow); margin-bottom: 6px;
        }
        .pain__why, .pain__fix {
          font-family: var(--font-body); font-size: clamp(12.5px, 1.05vw, 14.5px);
          line-height: 1.6; color: rgba(255,255,255,0.76); margin: 0 0 14px;
        }
        .pain__fix { color: #fff; font-weight: 600; }
        .pain__link {
          display: inline-flex; align-items: center; gap: 9px; text-decoration: none;
          font-family: var(--font-body); font-size: 10.5px; font-weight: 800;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--mmc-yellow);
        }
        .pain__link .arr { width: 16px; height: 1.5px; background: currentColor; position: relative; transition: width 220ms ease; }
        .pain__link .arr::after { content: ""; position: absolute; right: -1px; top: -3.5px; width: 7px; height: 7px; border-top: 1.5px solid currentColor; border-right: 1.5px solid currentColor; transform: rotate(45deg); }
        .pain__link:hover .arr { width: 26px; }

        .pain__cta { display: flex; flex-wrap: wrap; align-items: center; gap: 14px; margin-top: 20px; }
        .pain__cta-l {
          font-family: var(--font-body); font-size: 11px; font-weight: 800;
          letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.55);
        }
      `}</style>
    </section>
  );
}
