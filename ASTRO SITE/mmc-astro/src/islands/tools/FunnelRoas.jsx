import React from "react";
import { mmcTools } from "./ToolsShared.jsx";

/* tools/FunnelRoas.jsx, Funnel ROAS.
   Spend and CPM set the scale; the five conversion rates set the efficiency.
   The tool's argument: spend buys volume, never efficiency. */

const FN_DEFAULTS = { spend: 500000, cpm: 220, aov: 1450, ctr: 1.2, lp: 82, atc: 8.5, ck: 46, ord: 62 };

/* Indian D2C medians, used both to band the sliders and to find the weakest step. */
const FN_STEPS = [
  { key: "ctr", label: "Impression → click",        min: 0.1, max: 5,  step: 0.05, poor: 0.8, good: 1.5, info: "ctr",
    hint: "A creative problem. Weak hooks show up here before anywhere else." },
  { key: "lp",  label: "Click → landing page",      min: 30,  max: 100, step: 1,   poor: 70,  good: 88,  info: "landing-page",
    hint: "Page speed and redirects. Under 70% is a technical fault, not a marketing one." },
  { key: "atc", label: "Landing page → add to cart",min: 0.5, max: 30, step: 0.1, poor: 5,   good: 10,  info: "atc",
    hint: "Offer, pricing and proof. The most expensive step to get wrong." },
  { key: "ck",  label: "Add to cart → checkout",    min: 5,   max: 95, step: 1,   poor: 35,  good: 55,  info: "checkout-abandonment",
    hint: "Shipping cost and trust signals decide this one." },
  { key: "ord", label: "Checkout → order",          min: 10,  max: 98, step: 1,   poor: 50,  good: 70,  info: "conversion-rate",
    hint: "Payment options and COD availability. Often the biggest leak in India." },
];

/* Verbatim from the FAQPage JSON-LD in funnel-roas-calculator.html.
   Google requires the markup and the visible text to agree, so these
   strings are copied, not re-worded. Edit both together or neither. */
const FN_FAQ = [
  { q: "What is a good ROAS for a D2C brand in India?",
    a: "There is no universal number. A good ROAS is any figure above your break-even ROAS, which depends on your COGS, shipping, gateway fees and RTO rate. Brands with 30% COGS and low returns can be profitable at 2.2×, while brands with 55% COGS and 25% RTO may need 4.5× or more." },
  { q: "Does increasing ad spend improve ROAS?",
    a: "No. Spend determines how many orders you get, not how efficiently you get them. ROAS is set by your CPM, your AOV and the five conversion rates between an impression and a paid order. Doubling spend roughly doubles orders at the same ROAS." },
  { q: "Which funnel step should I fix first?",
    a: "Usually the one furthest from the benchmark, weighted by traffic volume. Landing-page-to-cart is typically the most expensive step to get wrong because every visitor has already been paid for by that point." },
];

function FunnelRoas() {
  const T = mmcTools;
  const { Ctl, Meter, BigAnswer, Fact, Wins, Rows, TableView, ToolActions, ToolLede,
          ReportCover, ReportFooter, ToolCrossLinks, ToolCTA, ToolFAQ, useToolState,
          inr, inrCompact, num, pct } = T;

  const [s, set, reset] = useToolState(FN_DEFAULTS);
  const n = (v) => (v === "" || !isFinite(v) ? 0 : Number(v));
  const F = (k) => n(s[k]);

  const run = (over) => {
    const g = (k) => (over && over[k] != null ? over[k] : F(k));
    const impressions = g("cpm") > 0 ? (g("spend") / g("cpm")) * 1000 : 0;
    const stages = [impressions];
    ["ctr", "lp", "atc", "ck", "ord"].forEach((k) => stages.push(stages[stages.length - 1] * (g(k) / 100)));
    const orders = stages[5];
    const revenue = orders * g("aov");
    return { impressions: impressions, stages: stages, orders: orders, revenue: revenue,
             roas: g("spend") > 0 ? revenue / g("spend") : 0,
             cpo: orders > 0 ? g("spend") / orders : 0 };
  };

  const m = run();
  const endToEnd = (m.orders / (m.impressions || 1)) * 100;

  // The weakest step, measured as distance below its median, that's the one
  // worth fixing first, and saying so turns a diagnosis into a plan.
  const weakest = FN_STEPS
    .map((st) => ({ st: st, gap: (st.good - F(st.key)) / st.good }))
    .sort((a, b) => b.gap - a.gap)[0];
  const fixed = run({ [weakest.st.key]: weakest.st.good });
  const winOrders = fixed.orders - m.orders;

  const labels = ["Impressions", "Clicks", "Landed", "Added to cart", "Reached checkout", "Orders"];
  // Bar width is each stage as a share of the one before it, so the bar itself
  // shows the leak. Absolute counts sit alongside. (Absolute-width bars are
  // useless here: the funnel spans lakhs to hundreds, and a log scale made a
  // 98.8% drop look like a rounding error.)
  const barW = (v, i) => (i === 0 ? 100 : Math.max(1.5, (v / (m.stages[i - 1] || 1)) * 100));

  const inputRows = [{ k: "Monthly ad spend", v: inr(F("spend")) }, { k: "CPM", v: inr(F("cpm")) },
    { k: "Average order value", v: inr(F("aov")) }]
    .concat(FN_STEPS.map((st) => ({ k: st.label, v: pct(F(st.key), 2) })));

  return (
    <>
      <ReportCover title="Funnel ROAS Report" subtitle="Impression-to-order funnel model" rows={inputRows} />

      <section className="page-hero page-hero--compact" data-wm="Tools">
        <nav className="tl-crumb" aria-label="Breadcrumb">
            <a href="/tools/">D2C calculators</a><span aria-hidden="true">/</span>
            <span aria-current="page">Funnel ROAS</span>
          </nav>

        <div className="tl-head">
          <h1 className="tl-title">Funnel ROAS <em>calculator</em></h1>
          <p className="tl-title__s">
            <strong>Where is your funnel <em>leaking</em>?</strong>{" "}
            Five rates stand between an impression and a paid order. Move them and watch the
            ROAS move, then try changing the spend, and watch it not.
          </p>
        </div>
      </section>

      <section className="tl-page">
        <div className="tl-wrap">
          <div className="tl-actionbar"><ToolActions state={s} onReset={reset} toolName="funnel-roas" /></div>
          <div className="tl-split">
            <div className="tl-split__ctrl">
              <div className="tl-card">
                <div className="tl-card__top">
                  <div>
                    <h2 className="tl-card__h">Your numbers</h2><T.ExampleTag s={s} defaults={FN_DEFAULTS} />
                    <p className="tl-card__sub">Bands on each slider are Indian D2C medians.</p>
                  </div>
                </div>
                <div className="tl-groups tl-groups--flush">
                  <details className="tl-group" open>
                    <summary>Spend & scale</summary>
                    <div className="tl-fields">
                      <Ctl label="Monthly ad spend" value={s.spend} onChange={(v) => set("spend", v)}
                           min={50000} max={5000000} step={25000} fmt={(v) => inrCompact(v)}
                           hint="Change this and watch the ROAS hold still." />
                      <Ctl label="CPM" info="cpm" value={s.cpm} onChange={(v) => set("cpm", v)}
                           min={40} max={800} step={5} fmt={(v) => inr(v)} />
                      <Ctl label="Average order value" info="aov" value={s.aov} onChange={(v) => set("aov", v)}
                           min={200} max={6000} step={50} fmt={(v) => inr(v)} />
                    </div>
                  </details>
                  <details className="tl-group" open>
                    <summary>Top of funnel</summary>
                    <div className="tl-fields">
                      {FN_STEPS.slice(0, 3).map((st) => (
                        <Ctl key={st.key} label={st.label} info={st.info} value={s[st.key]}
                             onChange={(v) => set(st.key, v)} min={st.min} max={st.max} step={st.step}
                             tone="band" lo={st.poor} hi={st.good}
                             fmt={(v) => pct(v, v < 10 ? 2 : 1)} hint={st.hint} />
                      ))}
                    </div>
                  </details>
                  <details className="tl-group" open>
                    <summary>Cart &amp; checkout</summary>
                    <div className="tl-fields">
                      {FN_STEPS.slice(3).map((st) => (
                        <Ctl key={st.key} label={st.label} info={st.info} value={s[st.key]}
                             onChange={(v) => set(st.key, v)} min={st.min} max={st.max} step={st.step}
                             tone="band" lo={st.poor} hi={st.good}
                             fmt={(v) => pct(v, v < 10 ? 2 : 1)} hint={st.hint} />
                      ))}
                    </div>
                  </details>
                </div>
              </div>
            </div>

            <div className="tl-split__out">
              <div className="tl-answer">
                <BigAnswer k="Blended ROAS" info="blended-roas" v={m.roas.toFixed(2) + "×"}
                           tone={m.roas >= 3 ? "good" : m.roas >= 1.8 ? null : "gap"}>
                  <Meter value={m.roas} goal={3} floor={1.8} min={0} max={Math.max(4, m.roas * 1.2)}
                         fmtV={(v) => v.toFixed(2) + "×"} labels={["0×", "Healthy 3.00×"]} />
                  <p className="tl-big__s">
                    Your funnel turns <b>{num(Math.round(m.impressions))}</b> impressions into{" "}
                    <b>{num(Math.round(m.orders))}</b> orders. Lifting your weakest step,{" "}
                    <b>{weakest.st.label.toLowerCase()}</b>, to the median would add{" "}
                    <b>{num(Math.round(winOrders))}</b> orders on the same spend.
                  </p>
                </BigAnswer>

                <div className="tl-facts">
                  <Fact label="Orders / month" value={num(Math.round(m.orders))} />
                  <Fact label="Revenue / month" value={inrCompact(m.revenue)} sub={inr(Math.round(m.revenue))} />
                  <Fact label="Cost per order" info="cpo" value={inr(Math.round(m.cpo))} />
                  <Fact label="Impression → order" value={pct(endToEnd, 3)} sub="End to end" />
                </div>
              </div>

              <div className="tl-card">
                <div className="tl-card__top">
                  <div>
                    <h2 className="tl-card__h">Where people fall out</h2>
                    <p className="tl-card__sub">Each bar is what survives the step before it. Counts on the right are exact.</p>
                  </div>
                </div>
                <Rows items={m.stages.map((v, i) => ({
                  l: labels[i], v: num(Math.round(v)), width: barW(v, i),
                  color: i === 5 ? "var(--t-good)" : "var(--c1)",
                  note: i === 0 ? null : "− " + num(Math.round(m.stages[i - 1] - v)) + " lost ("
                     + pct(100 - F(FN_STEPS[i - 1].key), 1) + " of the step)",
                }))} />
                <TableView
                  summary="Funnel table"
                  head={["Stage", "People", "Step rate", "Lost here"]}
                  rows={m.stages.map((v, i) => ({
                    total: i === 5,
                    cells: [labels[i], num(Math.round(v)),
                            i === 0 ? "-" : pct(F(FN_STEPS[i - 1].key), 2),
                            i === 0 ? "-" : { v: "−" + num(Math.round(m.stages[i - 1] - v)), tone: "neg" }]
                  }))} />
              </div>

              <div className="tl-card">
                <Wins items={[
                  { k: "Weakest step", value: "+" + num(Math.round(Math.max(0, winOrders))) + " orders",
                    text: <>Lift <b>{weakest.st.label.toLowerCase()}</b> from {pct(F(weakest.st.key), 1)} to the {pct(weakest.st.good, 1)} median.</>,
                    apply: "Model the median →", onApply: () => set(weakest.st.key, weakest.st.good) },
                  { k: "Same spend", value: m.roas.toFixed(2) + "× → " + fixed.roas.toFixed(2) + "×",
                    text: <>That single fix moves ROAS without another rupee of budget.</> },
                  { k: "Doubling spend", value: m.roas.toFixed(2) + "×",
                    text: <>Twice the budget buys roughly <b>{num(Math.round(m.orders * 2))}</b> orders at exactly the same ROAS. Spend buys volume, not efficiency.</>,
                    apply: "Try doubling →", onApply: () => set("spend", F("spend") * 2) },
                ]} />
              </div>
              <T.ResultsNote />
            </div>
          </div>
        </div>
      </section>

      <section className="tl-below">
        <div className="tl-wrap">
          <div className="tl-below__grid">
            <ToolLede>
              Each slider is banded against Indian D2C medians, <strong>amber below</strong> the
              typical range, <strong>green above</strong> it. Each bar shows what survives the
              step before it, so the leak is the bar itself; absolute widths would be
              unreadable across a funnel spanning lakhs of impressions to hundreds of orders.
            </ToolLede>
            <div className="tl-insight">
              <h3 className="tl-insight__h">One rate is worth more than the budget</h3>
              <p className="tl-insight__p">
                Doubling spend to {inrCompact(F("spend") * 2)} buys about{" "}
                <strong>{num(Math.round(m.orders * 2))}</strong> orders at the same{" "}
                <strong>{m.roas.toFixed(2)}×</strong>. Fixing {weakest.st.label.toLowerCase()}{" "}
                instead gets <strong>{num(Math.round(fixed.orders))}</strong> orders at{" "}
                <strong>{fixed.roas.toFixed(2)}×</strong>, on the spend you already have.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ReportFooter />
      <ToolFAQ items={FN_FAQ} />
      <ToolCrossLinks current="/tools/funnel-roas/" />
      <ToolCTA line="You've found the leak. Fixing it is the hard part." />
    </>
  );
}


export { FunnelRoas };
