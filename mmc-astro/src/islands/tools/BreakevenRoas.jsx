import React from "react";
import { mmcTools } from "./ToolsShared.jsx";

/* tools/BreakevenRoas.jsx, Break-even ROAS.
   Per attempted order: revenue is what survives returns; shipping is paid on
   every attempt with the return leg on the ones that come back. */

const BE_DEFAULTS = { aov: 1450, cogs: 32, ship: 95, gw: 2.2, rto: 18, margin: 15, current: 2.4, comm: 0 };

/* Verbatim from the FAQPage JSON-LD in breakeven-roas-calculator.html.
   Google requires the markup and the visible text to agree, so these
   strings are copied, not re-worded. Edit both together or neither. */
const BE_FAQ = [
  { q: "How do you calculate break-even ROAS?",
    a: "Break-even ROAS is revenue divided by contribution, worked out per attempted order. Take AOV, subtract the value lost to returns, then subtract COGS, shipping on both legs for returned orders, payment gateway fees and any marketplace commission. What remains is contribution: the most you can spend acquiring that order." },
  { q: "What is a good contribution margin for D2C?",
    a: "Above 45% of delivered revenue gives comfortable room to buy customers. Between 28% and 45% is workable but constrains how hard you can scale. Below 28% means most acquisition channels will be unprofitable regardless of how well the ads are run." },
  { q: "Why does RTO matter so much for break-even ROAS?",
    a: "A returned order earns nothing but still pays shipping on both legs plus packaging and handling. At a 25% RTO rate you lose a quarter of your revenue while paying roughly 125% of your forward shipping cost, which can move break-even ROAS by more than a full turn." },
];

function BreakevenRoas() {
  const T = mmcTools;
  const { Ctl, Meter, BigAnswer, Fact, Wins, Field, InfoDot, RoasSpectrum, TableView,
          ToolActions, ToolLede, ReportCover, ReportFooter, ToolCrossLinks, ToolCTA, ToolFAQ,
          useToolState, inr, pct } = T;

  const [s, set, reset] = useToolState(BE_DEFAULTS);
  const [adv, setAdv] = React.useState(false);
  const n = (v) => (v === "" || !isFinite(v) ? 0 : Number(v));
  const F = (k) => n(s[k]);

  const model = (o) => {
    const rto = o.rto != null ? o.rto : F("rto");
    const aov = o.aov != null ? o.aov : F("aov");
    const delivered = Math.max(0.05, 1 - rto / 100);
    const revenue = aov * delivered;
    const cost = revenue * ((F("cogs") + F("gw") + F("comm")) / 100) + F("ship") * (1 + rto / 100);
    const contribution = revenue - cost;
    return { revenue: revenue, cost: cost, contribution: contribution,
             be: contribution > 0 ? revenue / contribution : Infinity };
  };

  const m = model({});
  const viable = m.contribution > 0;
  const cmPct = m.revenue > 0 ? (m.contribution / m.revenue) * 100 : 0;
  const targetCac = m.contribution - m.revenue * (F("margin") / 100);
  const targetRoas = targetCac > 0 ? m.revenue / targetCac : Infinity;
  const currentCac = F("current") > 0 ? m.revenue / F("current") : 0;
  const profit = m.contribution - currentCac;
  const above = profit > 0;

  // How far along the journey from break-even to target you already are.
  const journey = viable && isFinite(targetRoas) && targetRoas > m.be
    ? Math.max(0, Math.min(100, ((F("current") - m.be) / (targetRoas - m.be)) * 100)) : 0;

  const rtoWin = model({ rto: Math.max(0, F("rto") - 4) }).contribution - m.contribution;
  const aovWin = model({ aov: F("aov") * 1.1 }).contribution - m.contribution;
  const roasNeeded = isFinite(targetRoas) ? targetRoas - F("current") : 0;

  const inputRows = [
    { k: "Average order value", v: inr(F("aov")) },
    { k: "Product cost", v: pct(F("cogs"), 1) },
    { k: "Shipping & fulfilment", v: inr(F("ship")) },
    { k: "Gateway / COD fee", v: pct(F("gw"), 1) },
    { k: "Marketplace commission", v: pct(F("comm"), 1) },
    { k: "RTO / return rate", v: pct(F("rto"), 1) },
    { k: "Target net margin", v: pct(F("margin"), 1) },
    { k: "Current ROAS", v: F("current").toFixed(2) + "×" },
  ];

  return (
    <>
      <ReportCover title="Break-even ROAS Report" subtitle="D2C unit-economics model" rows={inputRows} />

      <section className="page-hero page-hero--compact" data-wm="Tools">
        <nav className="tl-crumb" aria-label="Breadcrumb">
            <a href="/tools/">Tools</a><span aria-hidden="true">/</span>
            <span aria-current="page">Break-even ROAS</span>
          </nav>

        <div className="tl-head">
          <h1 className="tl-title">Are your ads <em>actually</em> making money?</h1>
          <p className="tl-title__s">
            Move a slider and watch the answer change. Every number here comes from your own
            cost sheet, not a benchmark someone quoted on LinkedIn.
          </p>
        </div>
          <p className="tl-reassure">
            <b>A number is not a verdict.</b> Nothing here is a judgement on your brand. It
            shows you the shape of the problem and the order worth fixing it in, so the next
            quarter starts prepared instead of surprised.
          </p>
      </section>

      <section className="tl-page">
        <div className="tl-wrap">
          <div className="tl-actionbar"><ToolActions state={s} onReset={reset} toolName="breakeven-roas" /></div>
          <div className="tl-split">
            <div className="tl-split__ctrl">
              <div className="tl-card">
                <div className="tl-card__top">
                  <div>
                    <h2 className="tl-card__h">Your numbers</h2>
                    <p className="tl-card__sub">Drag to see what each one is worth.</p>
                  </div>
                  <div className="tl-seg" role="group" aria-label="Detail level">
                    <button type="button" className={"tl-seg__b" + (!adv ? " is-on" : "")}
                            aria-pressed={!adv} onClick={() => setAdv(false)}>Simple</button>
                    <button type="button" className={"tl-seg__b" + (adv ? " is-on" : "")}
                            aria-pressed={adv} onClick={() => setAdv(true)}>Advanced</button>
                  </div>
                </div>

                <div className="tl-groups tl-groups--flush">
                  <details className="tl-group" open>
                    <summary>Product & returns</summary>
                    <div className="tl-fields">
                      <Ctl label="Average order value" info="aov" value={s.aov} onChange={(v) => set("aov", v)}
                           min={200} max={6000} step={50} fmt={(v) => inr(v)} />
                      <Ctl label="Product cost" info="cogs" value={s.cogs} onChange={(v) => set("cogs", v)}
                           min={5} max={80} step={0.5} fmt={(v) => pct(v, 1)}
                           hint="Landed cost as a share of order value." />
                      <Ctl label="RTO / return rate" info="rto" value={s.rto} onChange={(v) => set("rto", v)}
                           min={0} max={45} step={0.5} fmt={(v) => pct(v, 1)}
                           hint="Usually the cheapest number on this page to improve." />
                    </div>
                  </details>
                  <details className="tl-group" open>
                    <summary>Delivery & targets</summary>
                    <div className="tl-fields">
                      <Ctl label="Shipping & fulfilment" info="fulfilment-cost" value={s.ship} onChange={(v) => set("ship", v)}
                           min={0} max={400} step={5} fmt={(v) => inr(v)} />
                      <Ctl label="Current ROAS" info="roas" value={s.current} onChange={(v) => set("current", v)}
                           min={0.4} max={8} step={0.05} fmt={(v) => v.toFixed(2) + "×"} />
                      <Ctl label="Target net margin" info="net-margin" value={s.margin} onChange={(v) => set("margin", v)}
                           min={0} max={40} step={1} fmt={(v) => pct(v, 0)} />
                    </div>
                  </details>
                </div>

                {adv && (
                  <div className="tl-fields" style={{ marginTop: "22px", paddingTop: "22px", borderTop: "1px solid var(--t-line)" }}>
                    <Field label="Gateway / COD fee" suffix="%" info="gateway-fee" step={0.1}
                           value={s.gw} onChange={(v) => set("gw", v)} />
                    <Field label="Marketplace commission" suffix="%" info="marketplace-commission" step={0.5}
                           value={s.comm} onChange={(v) => set("comm", v)}
                           hint="Leave at 0 for your own D2C site." />
                  </div>
                )}

                <TableView
                  summary="Cost breakdown per attempted order"
                  head={["Line", "Per order", "% of revenue"]}
                  rows={[
                    { cells: ["Revenue after returns", inr(Math.round(m.revenue)), "100.0%"], total: true },
                    { cells: ["Product, fees & shipping", "−" + inr(Math.round(m.cost)), pct((m.cost / (m.revenue || 1)) * 100, 1)] },
                    { cells: ["Contribution (break-even CAC)", inr(Math.round(m.contribution)), pct(cmPct, 1)], total: true },
                    { cells: ["Acquisition at " + F("current").toFixed(2) + "×", "−" + inr(Math.round(currentCac)), pct((currentCac / (m.revenue || 1)) * 100, 1)] },
                    { cells: ["Profit per order", { v: inr(Math.round(profit)), tone: above ? "pos" : "neg" }, pct((profit / (m.revenue || 1)) * 100, 1)], total: true },
                  ]} />
              </div>
            </div>

            <div className="tl-split__out">
              <div className="tl-answer">
                <BigAnswer
                  k={above ? "You keep, per order" : "Short, per order"}
                  v={inr(Math.round(Math.abs(profit)))}
                  tone={above ? "good" : "gap"}>
                  {viable && isFinite(targetRoas) && (
                    <Meter
                      value={F("current")} goal={targetRoas} floor={m.be}
                      min={Math.max(0.4, m.be * 0.6)} max={targetRoas * 1.12}
                      fmtV={(v) => v.toFixed(2) + "×"}
                      labels={["Break-even " + m.be.toFixed(2) + "×", "Target " + targetRoas.toFixed(2) + "×"]} />
                  )}
                  <p className="tl-big__s">
                    {!viable
                      ? <>Costs currently exceed revenue before any ad spend. Start with the cost sheet below, the sliders show what each change is worth.</>
                      : above
                        ? <>You're past break-even and <b>{Math.round(journey)}% of the way</b> to your {pct(F("margin"), 0)} margin target. {roasNeeded > 0 ? <>Another <b>{roasNeeded.toFixed(2)}×</b> of ROAS gets you there.</> : <>You've cleared it.</>}</>
                        : <>You're <b>{inr(Math.round(Math.abs(profit)))}</b> short per order, about <b>{(m.be - F("current")).toFixed(2)}×</b> of ROAS. The quick wins below are usually cheaper than finding that in the ad account.</>}
                  </p>
                </BigAnswer>

                <div className="tl-facts">
                  <Fact label="Break-even ROAS" info="breakeven-roas" value={viable ? m.be.toFixed(2) + "×" : "-"}
                        sub="Where you stop losing money" tone={above ? "good" : null} />
                  <Fact label="Break-even CAC" info="cac" value={viable ? inr(Math.round(m.contribution)) : "-"}
                        sub="Most you can pay per order" />
                  <Fact label="Contribution margin" info="contribution-margin" value={pct(cmPct, 1)}
                        sub="Of revenue after returns" tone={cmPct >= 45 ? "good" : null} />
                  <Fact label="You pay today" value={inr(Math.round(currentCac))}
                        sub={"At " + F("current").toFixed(2) + "× ROAS"} tone={above ? null : "gap"} />
                </div>
              </div>

              {viable && (
                <div className="tl-card">
                  <div className="tl-card__top">
                    <div>
                      <h2 className="tl-card__h">Every ROAS, and what it pays you</h2>
                      <p className="tl-card__sub">Hover anywhere on the curve to read the profit at that ROAS.</p>
                    </div>
                  </div>
                  <RoasSpectrum
                    revenue={m.revenue} contribution={m.contribution} breakeven={m.be}
                    current={F("current")} target={isFinite(targetRoas) ? targetRoas : NaN}
                    fmt={(v) => inr(Math.round(v))} height={250} />
                </div>
              )}

              <div className="tl-card">
                <h2 className="tl-sec__h">Three moves, and what each is worth</h2>
                <Wins items={[
                  { k: "Cheapest first", value: "+" + inr(Math.round(Math.max(0, rtoWin))),
                    text: <>Cut RTO from <b>{pct(F("rto"), 0)}</b> to <b>{pct(Math.max(0, F("rto") - 4), 0)}</b>: a prepaid nudge at checkout usually does it.</>,
                    apply: "Model 4% lower →", onApply: () => set("rto", Math.max(0, F("rto") - 4)) },
                  { k: "Biggest lever", value: "+" + inr(Math.round(Math.max(0, aovWin))),
                    text: <>Lift average order value <b>10%</b> with a bundle or a free-shipping threshold.</>,
                    apply: "Model +10% AOV →", onApply: () => set("aov", Math.round(F("aov") * 1.1)) },
                  { k: "Media side", value: roasNeeded > 0 ? "+" + roasNeeded.toFixed(2) + "×" : "Cleared",
                    text: roasNeeded > 0
                      ? <>The ROAS improvement you'd need to hit <b>{pct(F("margin"), 0)}</b> net margin without touching costs.</>
                      : <>You're already past your <b>{pct(F("margin"), 0)}</b> margin target at this ROAS.</>,
                    apply: roasNeeded > 0 ? "Model that ROAS →" : null,
                    onApply: roasNeeded > 0 ? () => set("current", Number(targetRoas.toFixed(2))) : null },
                ]} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tl-below">
        <div className="tl-wrap">
          <div className="tl-below__grid">
            <ToolLede>
              Everything is <strong>per attempted order</strong>. Revenue is what survives
              returns; shipping is paid on every attempt with the return leg added on the ones
              that come back. <strong>Contribution</strong> is what's left to buy the customer,
              which is exactly your break-even CAC.
            </ToolLede>
            <div className="tl-insight">
              <h3 className="tl-insight__h">{above ? "You have room to push" : "The gap is closeable"}</h3>
              <p className="tl-insight__p">
                {viable
                  ? <>Break-even sits at <strong>{m.be.toFixed(2)}×</strong>, you're at{" "}
                     <strong>{F("current").toFixed(2)}×</strong>, and your {pct(F("margin"), 0)} margin
                     target needs <strong>{isFinite(targetRoas) ? targetRoas.toFixed(2) + "×" : "-"}</strong>.
                     Every point off RTO is worth about <strong>{inr(Math.round(rtoWin / 4))}</strong> an
                     order, the cheapest rupee on this page.</>
                  : <>Fix the cost sheet before the ad account. The sliders above show exactly what
                     each change buys you.</>}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ReportFooter />
      <ToolFAQ items={BE_FAQ} />
      <ToolCrossLinks current="/tools/breakeven-roas/" />
      <ToolCTA line="Knowing the number is step one. Hitting it is step two." />
    </>
  );
}


export { BreakevenRoas };
