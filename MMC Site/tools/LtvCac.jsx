/* tools/LtvCac.jsx, LTV : CAC.
   Repeat purchase as a decaying cohort: of the customers who buy in one cycle,
   `repeat`% buy in the next. Contribution accumulates until it clears CAC. */

const LC_DEFAULTS = { aov: 1450, cm: 42, repeat: 28, cycle: 3, horizon: 24, cac: 520 };

/* Verbatim from the FAQPage JSON-LD in ltv-cac-calculator.html.
   Google requires the markup and the visible text to agree, so these
   strings are copied, not re-worded. Edit both together or neither. */
const LC_FAQ = [
  { q: "What is a good LTV:CAC ratio?",
    a: "3:1 is the widely used benchmark, three rupees of lifetime contribution for every rupee of acquisition cost. Below 2:1 growth generally burns cash. Far above 4:1 often means you are underspending and leaving growth on the table." },
  { q: "Should LTV use revenue or contribution?",
    a: "Contribution. Lifetime revenue flatters the number badly because it ignores COGS, shipping and fees. LTV built on contribution tells you what is actually available to pay for acquisition and overhead." },
  { q: "What is CAC payback and why does it matter?",
    a: "CAC payback is the month cumulative contribution from a customer finally equals what you paid to acquire them. It governs how fast you can grow without external funding: a brand with three-month payback can recycle cash four times a year, while a twelve-month payback can only do it once." },
];

function LtvCac() {
  const T = window.mmcTools;
  const { Ctl, Meter, BigAnswer, Fact, Wins, LineChart, TableView, ToolActions, ToolLede,
          ReportCover, ReportFooter, ToolCrossLinks, ToolCTA, ToolFAQ, useToolState,
          inr, inrCompact, num, pct } = T;

  const [s, set, reset] = useToolState(LC_DEFAULTS);
  const n = (v) => (v === "" || !isFinite(v) ? 0 : Number(v));
  const F = (k) => n(s[k]);

  const build = (over) => {
    const g = (k) => (over && over[k] != null ? over[k] : F(k));
    const perOrder = g("aov") * (g("cm") / 100);
    const r = Math.min(0.95, Math.max(0, g("repeat") / 100));
    const cycle = Math.max(1, Math.round(g("cycle")) || 1);
    const periods = Math.max(1, Math.floor(g("horizon") / cycle) + 1);
    const rows = []; let orders = 0, value = 0, payback = null;
    for (let k = 0; k < periods; k++) {
      orders += Math.pow(r, k);
      value += Math.pow(r, k) * perOrder;
      const month = k * cycle;
      if (payback === null && value >= g("cac") && g("cac") > 0) payback = month;
      rows.push({ label: month === 0 ? "First" : "M" + month, cum: value, cac: g("cac") });
    }
    return { perOrder: perOrder, orders: orders, ltv: value, rows: rows, payback: payback,
             ratio: g("cac") > 0 ? value / g("cac") : 0 };
  };

  const m = build();
  const firstProfit = m.perOrder - F("cac");
  const repeatWin = build({ repeat: Math.min(95, F("repeat") + 10) }).ltv - m.ltv;
  const cmWin = build({ cm: F("cm") + 5 }).ltv - m.ltv;
  const cacTarget = m.ltv / 3;

  const inputRows = [
    { k: "Average order value", v: inr(F("aov")) },
    { k: "Contribution margin", v: pct(F("cm"), 1) },
    { k: "Acquisition cost (CAC)", v: inr(F("cac")) },
    { k: "Repeat rate per cycle", v: pct(F("repeat"), 1) },
    { k: "Purchase cycle", v: num(F("cycle")) + " months" },
    { k: "Horizon", v: num(F("horizon")) + " months" },
  ];

  return (
    <>
      <ReportCover title="LTV : CAC Report" subtitle="Cohort lifetime-value model" rows={inputRows} />

      <section className="page-hero page-hero--compact" data-wm="Tools">
        <nav className="tl-crumb" aria-label="Breadcrumb">
            <a href="tools.html">Tools</a><span aria-hidden="true">/</span>
            <span aria-current="page">LTV : CAC</span>
          </nav>

        <div className="tl-head">
          <h1 className="tl-title">What is a customer <em>really</em> worth?</h1>
          <p className="tl-title__s">
            First-order profit is the wrong question for a brand that intends to exist in
            three years. This one follows the customer, not the order.
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
          <div className="tl-actionbar"><ToolActions state={s} onReset={reset} toolName="ltv-cac" /></div>
          <div className="tl-split">
            <div className="tl-split__ctrl">
              <div className="tl-card">
                <div className="tl-card__top">
                  <div><h2 className="tl-card__h">Your numbers</h2>
                  <p className="tl-card__sub">Not sure of contribution margin? The break-even tool works it out from your cost sheet.</p></div>
                </div>
                <div className="tl-groups tl-groups--flush">
                  <details className="tl-group" open>
                    <summary>Per order</summary>
                    <div className="tl-fields">
                      <Ctl label="Average order value" info="aov" value={s.aov} onChange={(v) => set("aov", v)}
                           min={200} max={6000} step={50} fmt={(v) => inr(v)} />
                      <Ctl label="Contribution margin" info="contribution-margin" value={s.cm} onChange={(v) => set("cm", v)}
                           min={5} max={80} step={1} fmt={(v) => pct(v, 0)} hint="After COGS, shipping and fees." />
                      <Ctl label="Acquisition cost" info="cac" value={s.cac} onChange={(v) => set("cac", v)}
                           min={50} max={3000} step={10} fmt={(v) => inr(v)} />
                    </div>
                  </details>
                  <details className="tl-group" open>
                    <summary>Repeat behaviour</summary>
                    <div className="tl-fields">
                      <Ctl label="Repeat rate per cycle" info="repeat-rate" value={s.repeat} onChange={(v) => set("repeat", v)}
                           min={0} max={80} step={1} fmt={(v) => pct(v, 0)}
                           hint="Of buyers in one cycle, how many buy in the next." />
                      <Ctl label="Purchase cycle" info="purchase-cycle" value={s.cycle} onChange={(v) => set("cycle", v)}
                           min={1} max={12} step={1} fmt={(v) => num(v) + " mo"} />
                      <Ctl label="Horizon" value={s.horizon} onChange={(v) => set("horizon", v)}
                           min={6} max={60} step={3} fmt={(v) => num(v) + " mo"} />
                    </div>
                  </details>
                </div>
              </div>
            </div>

            <div className="tl-split__out">
              <div className="tl-answer">
                <BigAnswer k="LTV : CAC" info="ltv-cac" v={m.ratio > 0 ? m.ratio.toFixed(2) + " : 1" : "-"}
                           tone={m.ratio >= 3 ? "good" : m.ratio >= 2 ? null : "gap"}>
                  <Meter value={m.ratio} goal={3} floor={2} min={0} max={Math.max(4, m.ratio * 1.15)}
                         fmtV={(v) => v.toFixed(2) + ":1"} labels={["0:1", "Healthy 3:1"]} />
                  <p className="tl-big__s">
                    Each customer returns <b>{inr(Math.round(m.ltv))}</b> of contribution over{" "}
                    {num(F("horizon"))} months against a <b>{inr(F("cac"))}</b> acquisition cost.
                    {m.ratio < 3
                      ? <> To reach 3:1 you'd need CAC at <b>{inr(Math.round(cacTarget))}</b>, or a better repeat rate.</>
                      : <> That's healthy. You likely have room to spend harder.</>}
                  </p>
                </BigAnswer>

                <div className="tl-facts">
                  <Fact label={"LTV over " + num(F("horizon")) + " months"} info="ltv"
                        value={inr(Math.round(m.ltv))} sub="Contribution, not revenue" />
                  <Fact label="Orders per customer" value={m.orders.toFixed(2)} />
                  <Fact label="CAC payback" info="cac-payback"
                        value={m.payback === null ? "Beyond horizon" : m.payback === 0 ? "First order" : num(m.payback) + " mo"}
                        tone={m.payback === null ? "gap" : m.payback <= 3 ? "good" : null} />
                  <Fact label="First-order profit" value={inr(Math.round(firstProfit))}
                        tone={firstProfit >= 0 ? "good" : "gap"}
                        sub={firstProfit >= 0 ? "Profitable immediately" : "Repeat closes the gap"} />
                </div>
              </div>

              <div className="tl-card">
                <div className="tl-card__top">
                  <div>
                    <h2 className="tl-card__h">Contribution catching up with CAC</h2>
                    <p className="tl-card__sub">Where the blue line crosses the flat one, the customer has paid for themselves.</p>
                  </div>
                </div>
                <LineChart
                  rows={m.rows}
                  series={[{ key: "cum", name: "Cumulative contribution", color: "var(--c1)" },
                           { key: "cac", name: "Acquisition cost", color: "var(--c2)" }]}
                  fmt={(v) => inr(Math.round(v))} fmtTick={(v) => inrCompact(v)} height={220} />
                <div className="tl-legend">
                  <span className="tl-legend__i"><span className="tl-legend__sw" style={{ background: "var(--c1)" }} />Cumulative contribution</span>
                  <span className="tl-legend__i"><span className="tl-legend__sw" style={{ background: "var(--c2)" }} />Acquisition cost <span className="tl-legend__v">{inr(F("cac"))}</span></span>
                </div>
                <TableView
                  summary="Period-by-period table"
                  head={["Period", "Cumulative contribution", "Cleared CAC?"]}
                  rows={m.rows.map((x) => ({
                    cells: [x.label, inr(Math.round(x.cum)),
                            { v: x.cum >= F("cac") ? "Yes" : "Not yet", tone: x.cum >= F("cac") ? "pos" : "neg" }]
                  }))} />
              </div>

              <div className="tl-card">
                <h2 className="tl-sec__h">The cheapest growth you have</h2>
                <Wins items={[
                  { k: "No extra ad spend", value: "+" + inr(Math.round(Math.max(0, repeatWin))),
                    text: <>Lift repeat from <b>{pct(F("repeat"), 0)}</b> to <b>{pct(Math.min(95, F("repeat") + 10), 0)}</b>: the single cheapest lever most brands have.</>,
                    apply: "Model +10 points →", onApply: () => set("repeat", Math.min(95, F("repeat") + 10)) },
                  { k: "Margin side", value: "+" + inr(Math.round(Math.max(0, cmWin))),
                    text: <>Five points of contribution margin, from packaging, shipping or price.</>,
                    apply: "Model +5 points →", onApply: () => set("cm", Math.min(80, F("cm") + 5)) },
                  { k: "To hit 3:1", value: inr(Math.round(cacTarget)),
                    text: <>The CAC that would put you at the 3:1 benchmark at today's LTV.</>,
                    apply: "Model that CAC →", onApply: () => set("cac", Math.round(cacTarget)) },
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
              LTV here is built on <strong>contribution</strong>, not revenue, lifetime revenue
              flatters the number badly because it ignores COGS, shipping and fees.{" "}
              <strong>3:1</strong> is the usual benchmark. Below 2:1 growth burns cash; far above
              4:1 often means you're underspending and leaving growth on the table.
            </ToolLede>
            <div className="tl-insight">
              <h3 className="tl-insight__h">Repeat rate does the heavy lifting</h3>
              <p className="tl-insight__p">
                At {pct(F("repeat"), 0)} the average customer buys{" "}
                <strong>{m.orders.toFixed(2)}</strong> times. Ten points more takes lifetime
                contribution from {inr(Math.round(m.ltv))} to{" "}
                <strong>{inr(Math.round(m.ltv + repeatWin))}</strong>, and it needs no extra ad
                spend at all, which is why it beats chasing CAC down.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ReportFooter />
      <ToolFAQ items={LC_FAQ} />
      <ToolCrossLinks current="ltv-cac-calculator.html" />
      <ToolCTA line="Retention is a creative problem before it's a CRM problem." />
    </>
  );
}

window.LtvCac = LtvCac;
