import React from "react";
import { mmcTools } from "./ToolsShared.jsx";

/* tools/UnitEconomics.jsx, the D2C contribution ladder.
   One order from MRP down to CM3, then scaled into a monthly P&L and a
   break-even volume. Simple mode shows the six inputs that move the answer;
   Advanced itemises the cost sheet line by line. */

const UE_DEFAULTS = {
  mrp: 1499, disc: 10, gst: 18,
  rawMat: 320, pkg1: 45, pkg2: 15, label: 5, assembly: 30, inFreight: 12, otherDirect: 8,
  ship: 85, pgPct: 2, packHandle: 12, warehouse: 5,
  rto: 18, revShip: 80, lossPct: 20,
  cac: 380, units: 1500, fixed: 75000, da: 1500, taxPct: 25,
};

/* Verbatim from the FAQPage JSON-LD in unit-economics-calculator.html.
   Google requires the markup and the visible text to agree, so these
   strings are copied, not re-worded. Edit both together or neither. */
const UE_FAQ = [
  { q: "What is CM1, CM2 and CM3 in D2C?",
    a: "They are the three rungs of the contribution ladder. CM1 is net revenue minus product cost. CM2 is CM1 minus fulfilment: shipping, gateway fees, packing. CM3 is CM2 minus returns and the cost of acquiring the customer. CM3 is the only one that pays for salaries, rent and profit." },
  { q: "How do you calculate break-even units for a D2C brand?",
    a: "Divide total fixed monthly cost, including depreciation, by CM3 per order. If CM3 is negative there is no break-even volume: more orders simply enlarge the loss, and the fix has to come from price, product cost, RTO rate or CAC." },
  { q: "Should CAC be adjusted for RTO?",
    a: "Yes. You pay to acquire every order placed, including the ones that come back undelivered. At a 25% RTO rate your effective cost per delivered order is your CAC divided by 0.75, a third higher than the figure in your ad account." },
];

function UnitEconomics() {
  const T = mmcTools;
  const { Ctl, Meter, BigAnswer, Fact, Wins, Field, Rows, CompositionBar, TableView,
          ToolActions, ToolLede, ReportCover, ReportFooter, ToolCrossLinks, ToolCTA, ToolFAQ,
          useToolState, inr, inrCompact, num, pct } = T;

  const [s, set, reset] = useToolState(UE_DEFAULTS);
  const [adv, setAdv] = React.useState(false);
  const n = (v) => (v === "" || !isFinite(v) ? 0 : Number(v));
  const F = (k) => n(s[k]);

  const calc = (over) => {
    const g = (k) => (over && over[k] != null ? over[k] : F(k));
    const dsp = g("mrp") * (1 - g("disc") / 100);
    const netRev = dsp / (1 + g("gst") / 100);
    const cogs = g("rawMat") + g("pkg1") + g("pkg2") + g("label") + g("assembly") + g("inFreight") + g("otherDirect");
    const cm1 = netRev - cogs;
    const fulfil = g("ship") + dsp * (g("pgPct") / 100) + g("packHandle") + g("warehouse");
    const cm2 = cm1 - fulfil;
    // Returns are quoted per delivered order: at r% RTO there are r/(1−r)
    // failed orders riding on every delivered one.
    const r = Math.min(0.95, Math.max(0, g("rto") / 100));
    const rtoCost = (r / (1 - r)) * (g("ship") + g("revShip") + g("packHandle") + cogs * (g("lossPct") / 100));
    const afterRto = cm2 - rtoCost;
    const adjCac = g("cac") / (1 - r);            // you pay to acquire the returns too
    const cm3 = afterRto - adjCac;
    return { dsp: dsp, netRev: netRev, cogs: cogs, cm1: cm1, fulfil: fulfil, cm2: cm2,
             rtoCost: rtoCost, afterRto: afterRto, adjCac: adjCac, cm3: cm3 };
  };

  const m = calc();
  const U = F("units");
  const contribution = m.cm3 * U;
  const revMonth = m.netRev * U;
  const ebitda = contribution - F("fixed");
  const ebit = ebitda - F("da");
  const pat = ebit - (ebit > 0 ? ebit * (F("taxPct") / 100) : 0);
  const fixedTotal = F("fixed") + F("da");
  const beUnits = m.cm3 > 0 ? fixedTotal / m.cm3 : null;
  const mgn = (v) => (m.netRev > 0 ? (v / m.netRev) * 100 : 0);

  const rtoWin = calc({ rto: Math.max(0, F("rto") - 4) }).cm3 - m.cm3;
  const cacWin = calc({ cac: F("cac") * 0.85 }).cm3 - m.cm3;
  const priceWin = calc({ mrp: F("mrp") * 1.08 }).cm3 - m.cm3;

  const scale = Math.max(m.netRev, 1);
  let run = m.netRev;
  const wf = [{ l: "Net revenue", v: m.netRev, left: 0, width: 100, color: "var(--c1)" }];
  const step = (label, cost) => {
    wf.push({ l: label, v: cost, left: ((run - cost) / scale) * 100, width: (cost / scale) * 100, color: "var(--c2)" });
    run -= cost;
  };
  step("− Product cost", m.cogs);
  wf.push({ l: "CM1", v: run, left: 0, width: (run / scale) * 100, color: "var(--c1)" });
  step("− Fulfilment", m.fulfil);
  wf.push({ l: "CM2", v: run, left: 0, width: (run / scale) * 100, color: "var(--c1)" });
  step("− Returns", m.rtoCost);
  step("− Marketing", m.adjCac);
  wf.push({ l: "CM3", v: run, left: 0, width: Math.abs(run / scale) * 100,
            color: run >= 0 ? "var(--t-good)" : "var(--t-gap)" });

  // Validated set (adjacent pairs, white surface): worst CVD ΔE 11.8, normal
  // 31.1. The previous order put aqua beside the green "you keep" at ΔE 5.9,
  // indistinguishable even with full colour vision.
  const parts = [
    { name: "Product", value: m.cogs, color: "var(--c1)" },
    { name: "Fulfilment", value: m.fulfil, color: "var(--c2)" },
    { name: "Returns", value: m.rtoCost, color: "var(--c6)" },
    { name: "Marketing", value: m.adjCac, color: "var(--c5)" },
    { name: m.cm3 >= 0 ? "You keep" : "Shortfall", value: Math.abs(m.cm3),
      color: m.cm3 >= 0 ? "var(--t-good)" : "var(--t-gap)" },
  ];

  const inputRows = [
    { k: "MRP (incl GST)", v: inr(F("mrp")) }, { k: "Discount", v: pct(F("disc"), 1) },
    { k: "GST", v: pct(F("gst"), 1) }, { k: "Total product cost", v: inr(Math.round(m.cogs)) },
    { k: "Fulfilment", v: inr(Math.round(m.fulfil)) }, { k: "RTO rate", v: pct(F("rto"), 1) },
    { k: "CAC per order", v: inr(F("cac")) }, { k: "Units / month", v: num(U) },
    { k: "Fixed overhead", v: inr(F("fixed")) },
  ];

  return (
    <>
      <ReportCover title="Unit Economics Report" subtitle="Contribution ladder, CM1 to CM3" rows={inputRows} />

      <section className="page-hero page-hero--compact" data-wm="Tools">
        <nav className="tl-crumb" aria-label="Breadcrumb">
            <a href="/tools/">D2C calculators</a><span aria-hidden="true">/</span>
            <span aria-current="page">Unit economics</span>
          </nav>

        <div className="tl-head">
          <h1 className="tl-title">Unit economics <em>calculator</em></h1>
          <p className="tl-title__s">
            <strong>What does one order <em>actually</em> leave you?</strong>{" "}
            Six sliders to start. Switch to Advanced when you want to itemise the cost sheet
            line by line. Nothing is hidden, just folded away until you need it.
          </p>
        </div>
      </section>

      <section className="tl-page">
        <div className="tl-wrap">
          <div className="tl-actionbar"><ToolActions state={s} onReset={reset} toolName="unit-economics" /></div>
          <div className="tl-split">
            <div className="tl-split__ctrl">
              <div className="tl-card">
                <div className="tl-card__top">
                  <div><h2 className="tl-card__h">Your numbers</h2><T.ExampleTag s={s} defaults={UE_DEFAULTS} />
                  <p className="tl-card__sub">{adv ? "Every cost line, itemised." : "The six that move the answer most."}</p></div>
                  <div className="tl-seg" role="group" aria-label="Detail level">
                    <button type="button" className={"tl-seg__b" + (!adv ? " is-on" : "")}
                            aria-pressed={!adv} onClick={() => setAdv(false)}>Simple</button>
                    <button type="button" className={"tl-seg__b" + (adv ? " is-on" : "")}
                            aria-pressed={adv} onClick={() => setAdv(true)}>Advanced</button>
                  </div>
                </div>

                <div className="tl-groups tl-groups--flush">
                  <details className="tl-group" open>
                    <summary>Price & product</summary>
                    <div className="tl-fields">
                      <Ctl label="MRP (incl GST)" info="mrp" value={s.mrp} onChange={(v) => set("mrp", v)}
                           min={100} max={9999} step={50} fmt={(v) => inr(v)}
                           hint={"Sells at " + inr(Math.round(m.dsp)) + " · net " + inr(Math.round(m.netRev))} />
                      <Ctl label="Total product cost" value={m.cogs} onChange={(v) => {
                             const f = m.cogs > 0 ? v / m.cogs : 1;
                             ["rawMat","pkg1","pkg2","label","assembly","inFreight","otherDirect"]
                               .forEach((k) => set(k, Math.round(F(k) * f)));
                           }}
                           min={20} max={4000} step={10} fmt={(v) => inr(Math.round(v))}
                           hint="Scales every product line together. Advanced splits them out." />
                      <Ctl label="RTO / return rate" info="rto" value={s.rto} onChange={(v) => set("rto", v)}
                           min={0} max={45} step={0.5} fmt={(v) => pct(v, 1)} />
                    </div>
                  </details>
                  <details className="tl-group" open>
                    <summary>Delivery & scale</summary>
                    <div className="tl-fields">
                      <Ctl label="Shipping to customer" info="fulfilment-cost" value={s.ship} onChange={(v) => set("ship", v)}
                           min={0} max={400} step={5} fmt={(v) => inr(v)} />
                      <Ctl label="CAC per order" info="cac" value={s.cac} onChange={(v) => set("cac", v)}
                           min={20} max={3000} step={10} fmt={(v) => inr(v)}
                           hint={"Effective " + inr(Math.round(m.adjCac)) + " once returns are counted."} />
                      <Ctl label="Units / month" value={s.units} onChange={(v) => set("units", v)}
                           min={100} max={50000} step={100} fmt={(v) => num(v)} />
                    </div>
                  </details>
                </div>

                {adv && (
                  <div className="tl-groups">
                    <details className="tl-group" open>
                      <summary>Product cost <span>{inr(Math.round(m.cogs))}</span></summary>
                      <div className="tl-fields">
                        <Field label="Raw material" prefix="₹" info="cogs" step={5} value={s.rawMat} onChange={(v) => set("rawMat", v)} />
                        <Field label="Primary packaging" prefix="₹" step={1} value={s.pkg1} onChange={(v) => set("pkg1", v)} />
                        <Field label="Secondary packaging" prefix="₹" step={1} value={s.pkg2} onChange={(v) => set("pkg2", v)} />
                        <Field label="Label / printing" prefix="₹" step={1} value={s.label} onChange={(v) => set("label", v)} />
                        <Field label="Assembly / labour" prefix="₹" step={1} value={s.assembly} onChange={(v) => set("assembly", v)} />
                        <Field label="Inbound freight" prefix="₹" step={1} value={s.inFreight} onChange={(v) => set("inFreight", v)} />
                        <Field label="Other direct" prefix="₹" step={1} value={s.otherDirect} onChange={(v) => set("otherDirect", v)} />
                      </div>
                    </details>

                    <details className="tl-group" open>
                      <summary>Delivery &amp; returns <span>{inr(Math.round(m.fulfil + m.rtoCost))}</span></summary>
                      <div className="tl-fields">
                        <Field label="Gateway fee" suffix="%" info="gateway-fee" step={0.1} value={s.pgPct} onChange={(v) => set("pgPct", v)} />
                        <Field label="Packaging &amp; handling" prefix="₹" step={1} value={s.packHandle} onChange={(v) => set("packHandle", v)} />
                        <Field label="Warehousing" prefix="₹" step={1} value={s.warehouse} onChange={(v) => set("warehouse", v)} />
                        <Field label="Return shipping" prefix="₹" step={5} value={s.revShip} onChange={(v) => set("revShip", v)} />
                        <Field label="Product loss on RTO" suffix="%" step={1} value={s.lossPct} onChange={(v) => set("lossPct", v)} />
                      </div>
                    </details>

                    <details className="tl-group" open>
                      <summary>Price &amp; tax <span>{pct(F("disc"), 0)} off</span></summary>
                      <div className="tl-fields">
                        <Field label="Discount" suffix="%" step={1} value={s.disc} onChange={(v) => set("disc", v)} />
                        <Field label="GST" suffix="%" info="gst" step={1} value={s.gst} onChange={(v) => set("gst", v)} />
                        <Field label="Tax on profit" suffix="%" step={1} value={s.taxPct} onChange={(v) => set("taxPct", v)} />
                      </div>
                    </details>

                    <details className="tl-group" open>
                      <summary>Monthly overhead <span>{inr(Math.round(F("fixed") + F("da")))}</span></summary>
                      <div className="tl-fields">
                        <Field label="Fixed overhead / mo" prefix="₹" info="fixed-overhead" step={5000} value={s.fixed} onChange={(v) => set("fixed", v)} />
                        <Field label="D&amp;A / month" prefix="₹" info="da" step={500} value={s.da} onChange={(v) => set("da", v)} />
                      </div>
                    </details>
                  </div>
                )}
              </div>
            </div>

            <div className="tl-split__out">
              <div className="tl-answer">
                <BigAnswer k="You keep, per order" info="cm3" v={inr(Math.round(m.cm3))}
                           tone={m.cm3 > 0 ? "good" : "gap"}>
                  <Meter value={mgn(m.cm3)} goal={15} floor={0} min={Math.min(-20, mgn(m.cm3) * 1.2)} max={30}
                         fmtV={(v) => pct(v, 1)} labels={["Loss", "Healthy 15%"]} />
                  <p className="tl-big__s">
                    {m.cm3 > 0
                      ? <>That's <b>{pct(mgn(m.cm3), 1)}</b> of net revenue after product, delivery, returns and buying the customer. You need <b>{num(Math.ceil(beUnits))}</b> orders a month to cover overhead; you're modelling <b>{num(U)}</b>.</>
                      : <>Every order costs you <b>{inr(Math.round(Math.abs(m.cm3)))}</b> before overhead. Volume multiplies that, so the fix is upstream, the wins below show which lever is worth most.</>}
                  </p>
                </BigAnswer>

                <div className="tl-facts">
                  <Fact label="CM1 after product cost" info="cm1" value={inr(Math.round(m.cm1))} sub={pct(mgn(m.cm1), 1)} />
                  <Fact label="CM2 after delivery" info="cm2" value={inr(Math.round(m.cm2))} sub={pct(mgn(m.cm2), 1)} />
                  <Fact label="Break-even units" info="breakeven-units"
                        value={beUnits ? num(Math.ceil(beUnits)) : "-"}
                        tone={beUnits && U >= beUnits ? "good" : "gap"}
                        sub={beUnits ? "To cover fixed costs" : "CM3 must be positive first"} />
                  <Fact label="Net profit / month" info="pat" value={inrCompact(pat)}
                        tone={pat > 0 ? "good" : "gap"} sub={"At " + num(U) + " units"} />
                </div>
              </div>

              <div className="tl-card">
                <div className="tl-card__top">
                  <div><h2 className="tl-card__h">From price to what you keep</h2>
                  <p className="tl-card__sub">Blue is revenue and subtotals, orange is what comes out, green is what's left.</p></div>
                </div>
                <Rows items={wf.map((w) => ({ l: w.l, v: inr(Math.round(w.v)), left: w.left, width: w.width, color: w.color }))} />
                <div style={{ marginTop: "26px" }}>
                  <h3 className="tl-sec__h">Where each ₹{num(Math.round(m.netRev))} goes</h3>
                  <CompositionBar parts={parts} total={m.netRev} fmt={(v) => inr(Math.round(v))} />
                </div>
                <TableView
                  summary="Full monthly P&L"
                  head={["Line", "Per unit", "Per month"]}
                  rows={[
                    { cells: ["Net revenue (ex GST)", inr(Math.round(m.netRev)), inr(Math.round(revMonth))] },
                    { cells: ["Product cost", "−" + inr(Math.round(m.cogs)), "−" + inr(Math.round(m.cogs * U))] },
                    { cells: ["CM1", inr(Math.round(m.cm1)), inr(Math.round(m.cm1 * U))], total: true },
                    { cells: ["Fulfilment", "−" + inr(Math.round(m.fulfil)), "−" + inr(Math.round(m.fulfil * U))] },
                    { cells: ["CM2", inr(Math.round(m.cm2)), inr(Math.round(m.cm2 * U))], total: true },
                    { cells: ["Returns / RTO", "−" + inr(Math.round(m.rtoCost)), "−" + inr(Math.round(m.rtoCost * U))] },
                    { cells: ["Marketing (RTO-adjusted)", "−" + inr(Math.round(m.adjCac)), "−" + inr(Math.round(m.adjCac * U))] },
                    { cells: ["CM3 contribution", inr(Math.round(m.cm3)), inr(Math.round(contribution))], total: true },
                    { cells: ["Fixed overhead", "-", "−" + inr(Math.round(F("fixed")))] },
                    { cells: ["EBITDA", "-", { v: inr(Math.round(ebitda)), tone: ebitda >= 0 ? "pos" : "neg" }] },
                    { cells: ["Depreciation & amortisation", "-", "−" + inr(Math.round(F("da")))] },
                    { cells: ["EBIT", "-", { v: inr(Math.round(ebit)), tone: ebit >= 0 ? "pos" : "neg" }] },
                    { cells: ["Net profit (PAT)", "-", { v: inr(Math.round(pat)), tone: pat >= 0 ? "pos" : "neg" }], total: true },
                  ]} />
              </div>

              <div className="tl-card">
                <Wins items={[
                  { k: "Returns", value: (rtoWin >= 0 ? "+" : "") + inr(Math.round(rtoWin)),
                    text: <>Cut RTO from <b>{pct(F("rto"), 0)}</b> to <b>{pct(Math.max(0, F("rto") - 4), 0)}</b>: prepaid nudges at checkout do most of this.</>,
                    apply: "Model it →", onApply: () => set("rto", Math.max(0, F("rto") - 4)) },
                  { k: "Acquisition", value: (cacWin >= 0 ? "+" : "") + inr(Math.round(cacWin)),
                    text: <>Bring CAC down <b>15%</b>, from {inr(F("cac"))} to {inr(Math.round(F("cac") * 0.85))}.</>,
                    apply: "Model it →", onApply: () => set("cac", Math.round(F("cac") * 0.85)) },
                  { k: "Price", value: (priceWin >= 0 ? "+" : "") + inr(Math.round(priceWin)),
                    text: <>An <b>8%</b> price rise, to {inr(Math.round(F("mrp") * 1.08))} MRP: usually the fastest of the three.</>,
                    apply: "Model it →", onApply: () => set("mrp", Math.round(F("mrp") * 1.08)) },
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
              <strong>CM1</strong> is what's left after the product, <strong>CM2</strong> after
              getting it to the door, and <strong>CM3</strong> after returns and buying the
              customer. CM3 is the only one that pays your salaries. Returns are converted per
              delivered order, and marketing is charged on every order placed, including the
              ones that come back.
            </ToolLede>
            <div className="tl-insight">
              <h3 className="tl-insight__h">
                {m.cm3 > 0 ? (beUnits && U >= beUnits ? "Profitable at this volume" : "Contributing, below break-even") : "Volume won't fix this"}
              </h3>
              <p className="tl-insight__p">
                {m.cm3 > 0
                  ? <>Each order contributes <strong>{inr(Math.round(m.cm3))}</strong>, so{" "}
                     <strong>{num(Math.ceil(beUnits))}</strong> orders a month covers{" "}
                     {inr(Math.round(fixedTotal))} of fixed cost. Every point off RTO is worth about{" "}
                     <strong>{inr(Math.round(rtoWin / 4))}</strong> an order, cheaper than finding it in the ad account.</>
                  : <>CM3 is negative before a rupee of overhead, so more orders enlarge the loss.
                     The three levers above are ranked by what each is worth on your numbers.</>}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ReportFooter />
      <ToolFAQ items={UE_FAQ} />
      <ToolCrossLinks current="/tools/unit-economics/" />
      <ToolCTA line="This is the model we build in week one of every engagement." />
    </>
  );
}


export { UnitEconomics };
