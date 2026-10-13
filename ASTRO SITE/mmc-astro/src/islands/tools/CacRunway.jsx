import React from "react";
import { mmcTools } from "./ToolsShared.jsx";

/* tools/CacRunway.jsx, CAC runway / burn projection.
   A new brand almost never hits break-even CAC on day one. Two forces close the
   gap: CAC falling as the account learns, and repeat purchase from customers
   already paid for. Marketing is charged only on new customers. */

const RW_DEFAULTS = {
  contrib: 670, cacNow: 900, improve: 6, floor: 480,
  orders1: 300, growth: 12, repeat: 26, cycle: 3, fixed: 250000, cash: 4000000,
};
const RW_MONTHS = 36;

/* Verbatim from the FAQPage JSON-LD in cac-runway-calculator.html.
   Google requires the markup and the visible text to agree, so these
   strings are copied, not re-worded. Edit both together or neither. */
const RW_FAQ = [
  { q: "How long does a new D2C brand take to reach break-even CAC?",
    a: "It depends on how far above break-even you start and how fast the account learns. A brand paying 900 rupees against a 670 rupee break-even CAC, improving 6% a month, typically crosses into monthly profit somewhere between month 8 and month 14, but the number that matters is the cumulative cash burned getting there, not the month itself." },
  { q: "How much cash does a new D2C brand need before it turns profitable?",
    a: "Total burn equals the deepest point of your cumulative cash curve. Every month of losses added together before the first profitable month. It is almost always larger than founders expect, because growing faster increases the trough before it shortens it." },
  { q: "Does growing faster shorten the burn?",
    a: "Not usually. Faster growth means more new customers acquired above break-even CAC each month, which deepens the cash trough even though it brings the profitable month closer. Repeat rate is the lever that shortens the burn from both ends, because repeat orders cost nothing to acquire." },
];

function CacRunway() {
  const T = mmcTools;
  const { Ctl, Meter, BigAnswer, Fact, Wins, LineChart, ColumnChart, TableView,
          ToolActions, ToolLede, ReportCover, ReportFooter, ToolCrossLinks, ToolCTA, ToolFAQ,
          useToolState, inr, inrCompact, num, pct } = T;

  const [s, set, reset] = useToolState(RW_DEFAULTS);
  const n = (v) => (v === "" || !isFinite(v) ? 0 : Number(v));
  const F = (k) => n(s[k]);

  const project = (over) => {
    const g = (k) => (over && over[k] != null ? over[k] : F(k));
    const cycle = Math.max(1, Math.round(g("cycle")) || 1);
    const r = Math.min(0.95, Math.max(0, g("repeat") / 100));
    const imp = Math.min(0.5, Math.max(0, g("improve") / 100));
    const rows = [], newOrders = [];
    let cum = 0, trough = 0, breakMonth = null, payback = null, cacAtBreak = null;

    for (let i = 0; i < RW_MONTHS; i++) {
      const cac = Math.max(g("floor"), g("cacNow") * Math.pow(1 - imp, i));
      const nw = g("orders1") * Math.pow(1 + g("growth") / 100, i);
      newOrders.push(nw);
      let rep = 0;
      for (let j = 1; i - j * cycle >= 0; j++) rep += newOrders[i - j * cycle] * Math.pow(r, j);
      const marketing = nw * cac;
      const profit = (nw + rep) * g("contrib") - marketing - g("fixed");
      cum += profit;
      if (cum < trough) trough = cum;
      if (breakMonth === null && profit > 0) { breakMonth = i + 1; cacAtBreak = cac; }
      if (payback === null && cum >= 0 && i > 0) payback = i + 1;
      rows.push({ label: "M" + (i + 1), month: i + 1, cac: cac, newOrders: nw, repeatOrders: rep,
                  marketing: marketing, profit: profit, cum: cum, tipLabel: "Monthly P&L" });
    }
    return { rows: rows, trough: Math.abs(trough), breakMonth: breakMonth,
             payback: payback, cacAtBreak: cacAtBreak };
  };

  const m = project();
  const viable = F("contrib") > 0;
  const turns = m.breakMonth !== null;
  const cashOk = F("cash") >= m.trough;
  const runsOutAt = (() => {
    for (let i = 0; i < m.rows.length; i++) if (-m.rows[i].cum > F("cash")) return i + 1;
    return null;
  })();
  const gap = F("cacNow") - F("contrib");

  const repeatWin = project({ repeat: Math.min(95, F("repeat") + 10) });
  const slowWin = project({ growth: Math.max(0, F("growth") - 5) });

  const inputRows = [
    { k: "Contribution per order", v: inr(F("contrib")) },
    { k: "CAC today", v: inr(F("cacNow")) },
    { k: "CAC improvement / month", v: pct(F("improve"), 1) },
    { k: "Realistic CAC floor", v: inr(F("floor")) },
    { k: "New orders, month 1", v: num(F("orders1")) },
    { k: "New-order growth / month", v: pct(F("growth"), 1) },
    { k: "Repeat rate per cycle", v: pct(F("repeat"), 1) },
    { k: "Purchase cycle", v: num(F("cycle")) + " months" },
    { k: "Fixed overhead / month", v: inr(F("fixed")) },
    { k: "Cash available", v: inr(F("cash")) },
  ];

  return (
    <>
      <ReportCover title="CAC Runway Report" subtitle="How long a new brand burns before it turns" rows={inputRows} />

      <section className="page-hero page-hero--compact" data-wm="Tools">
        <nav className="tl-crumb" aria-label="Breadcrumb">
            <a href="/tools/">D2C calculators</a><span aria-hidden="true">/</span>
            <span aria-current="page">CAC runway</span>
          </nav>

        <div className="tl-head">
          <h1 className="tl-title">CAC runway <em>calculator</em></h1>
          <p className="tl-title__s">
            <strong>How long until this <em>stops</em> costing money?</strong>{" "}
            No new brand hits break-even CAC on day one: that's normal, and survivable, as
            long as it's finite. Here's how finite yours is.
          </p>
        </div>
      </section>

      <section className="tl-page">
        <div className="tl-wrap">
          <div className="tl-actionbar"><ToolActions state={s} onReset={reset} toolName="cac-runway" /></div>
          <div className="tl-split">
            <div className="tl-split__ctrl">
              <div className="tl-card">
                <div className="tl-card__top">
                  <div><h2 className="tl-card__h">Your numbers</h2><T.ExampleTag s={s} defaults={RW_DEFAULTS} />
                  <p className="tl-card__sub">Contribution per order is the same number as your break-even CAC.</p></div>
                </div>
                <div className="tl-groups tl-groups--flush">
                  <details className="tl-group" open>
                    <summary>Economics & acquisition</summary>
                    <div className="tl-fields">
                      <Ctl label="Contribution per order" info="contribution-margin" value={s.contrib} onChange={(v) => set("contrib", v)}
                           min={50} max={3000} step={10} fmt={(v) => inr(v)} />
                      <Ctl label="CAC today" info="cac" value={s.cacNow} onChange={(v) => set("cacNow", v)}
                           min={50} max={4000} step={25} fmt={(v) => inr(v)} />
                      <Ctl label="CAC falls per month" value={s.improve} onChange={(v) => set("improve", v)}
                           min={0} max={20} step={0.5} fmt={(v) => pct(v, 1)}
                           hint="Creative, targeting and scale learning. 4 to 8% is typical." />
                      <Ctl label="Realistic CAC floor" value={s.floor} onChange={(v) => set("floor", v)}
                           min={50} max={3000} step={10} fmt={(v) => inr(v)} />
                      <Ctl label="Cash available" value={s.cash} onChange={(v) => set("cash", v)}
                           min={500000} max={100000000} step={500000} fmt={(v) => inrCompact(v)} />
                    </div>
                  </details>
                  <details className="tl-group" open>
                    <summary>Volume & repeat</summary>
                    <div className="tl-fields">
                      <Ctl label="New orders, month 1" value={s.orders1} onChange={(v) => set("orders1", v)}
                           min={25} max={5000} step={25} fmt={(v) => num(v)} />
                      <Ctl label="New-order growth / month" info="mom" value={s.growth} onChange={(v) => set("growth", v)}
                           min={0} max={40} step={1} fmt={(v) => pct(v, 0)}
                           hint="Faster growth usually deepens the dip before it shortens it." />
                      <Ctl label="Repeat rate per cycle" info="repeat-rate" value={s.repeat} onChange={(v) => set("repeat", v)}
                           min={0} max={80} step={1} fmt={(v) => pct(v, 0)} />
                      <Ctl label="Purchase cycle" info="purchase-cycle" value={s.cycle} onChange={(v) => set("cycle", v)}
                           min={1} max={12} step={1} fmt={(v) => num(v) + " mo"} />
                      <Ctl label="Fixed overhead / month" info="fixed-overhead" value={s.fixed} onChange={(v) => set("fixed", v)}
                           min={0} max={3000000} step={25000} fmt={(v) => inrCompact(v)} />
                    </div>
                  </details>
                </div>
              </div>
            </div>

            <div className="tl-split__out">
              <div className="tl-answer">
                <BigAnswer k="Monthly break-even in"
                           v={!viable ? "Fix CM3 first" : turns ? "Month " + m.breakMonth : "Not in 36 mo"}
                           tone={turns && viable && cashOk ? "good" : "gap"}>
                  {turns && viable && (
                    <Meter value={m.breakMonth} goal={12} floor={0} min={0} max={Math.max(24, m.breakMonth * 1.3)}
                           fmtV={(v) => "Month " + Math.round(v)} labels={["Today", "Comfortable by M12"]} />
                  )}
                  <p className="tl-big__s">
                    {!viable
                      ? <>Contribution per order is <b>{inr(F("contrib"))}</b>. Until that's positive there's no CAC low enough to make this work, start with the break-even tool.</>
                      : turns
                        ? <>You'll burn <b>{inrCompact(m.trough)}</b> getting there, and the cash position climbs back to zero in <b>{m.payback ? "month " + m.payback : "over 36 months"}</b>. {cashOk ? <>Your {inrCompact(F("cash"))} covers it.</> : <>You'd need <b>{inrCompact(m.trough - F("cash"))}</b> more than you have.</>}</>
                        : <>At {pct(F("improve"), 1)} monthly improvement this doesn't turn inside 36 months. The wins below show which assumption to change first.</>}
                  </p>
                </BigAnswer>

                <div className="tl-facts">
                  <Fact label="Cash to burn first" value={viable && turns ? inrCompact(m.trough) : "-"}
                        tone={cashOk ? null : "gap"} sub="Deepest point of the curve" />
                  <Fact label="Cash back to zero" value={m.payback ? "Month " + m.payback : "Beyond 36mo"} />
                  <Fact label="Overpaying by, today" value={inr(Math.round(Math.abs(gap)))}
                        tone={gap > 0 ? "gap" : "good"} sub={gap > 0 ? "Per new customer" : "Headroom per customer"} />
                  <Fact label={"Runway on " + inrCompact(F("cash"))}
                        value={runsOutAt ? "Month " + runsOutAt : "Survives"}
                        tone={runsOutAt ? "gap" : "good"} />
                </div>
              </div>

              <div className="tl-card">
                <div className="tl-card__top">
                  <div><h2 className="tl-card__h">Your cash position, month by month</h2>
                  <p className="tl-card__sub">It dips, then climbs. The dip is what you need in the bank.</p></div>
                </div>
                <LineChart rows={m.rows.slice(0, 24).map((x) => ({ label: x.label, cum: x.cum }))}
                           series={[{ key: "cum", name: "Cumulative cash", color: "var(--c1)" }]}
                           fmt={(v) => inr(Math.round(v))} fmtTick={(v) => inrCompact(v)}
                           height={220} signedY />
              </div>

              <div className="tl-card">
                <div className="tl-card__top">
                  <div><h2 className="tl-card__h">Monthly profit and loss</h2>
                  <p className="tl-card__sub">Red months are the investment; green months are the return.</p></div>
                </div>
                <ColumnChart rows={m.rows.slice(0, 18)} valueKey="profit" signed
                             fmt={(v) => inr(Math.round(v))} fmtTick={(v) => inrCompact(v)}
                             height={200} color="var(--t-good)" negColor="var(--t-gap)" />
                <TableView
                  summary="Full 36-month projection"
                  head={["Month", "CAC", "New orders", "Repeat", "Marketing", "Monthly P&L", "Cash position"]}
                  rows={m.rows.map((x) => ({
                    total: x.month === m.breakMonth,
                    cells: [x.label, inr(Math.round(x.cac)), num(Math.round(x.newOrders)),
                            num(Math.round(x.repeatOrders)), inr(Math.round(x.marketing)),
                            { v: inr(Math.round(x.profit)), tone: x.profit >= 0 ? "pos" : "neg" },
                            { v: inr(Math.round(x.cum)), tone: x.cum >= 0 ? "pos" : "neg" }]
                  }))} />
              </div>

              <div className="tl-card">
                <Wins items={[
                  { k: "Costs nothing", value: repeatWin.breakMonth ? "Month " + repeatWin.breakMonth : "-",
                    text: <>Ten more points of repeat rate pulls break-even in from month <b>{m.breakMonth || "-"}</b> and cuts the dip to <b>{inrCompact(repeatWin.trough)}</b>. Repeat orders cost nothing to acquire.</>,
                    apply: "Model +10 points →", onApply: () => set("repeat", Math.min(95, F("repeat") + 10)) },
                  { k: "Counterintuitive", value: inrCompact(slowWin.trough),
                    text: <>Growing <b>5 points slower</b> shrinks the cash you need from {inrCompact(m.trough)} to this: fewer customers bought above break-even each month.</>,
                    apply: "Model slower growth →", onApply: () => set("growth", Math.max(0, F("growth") - 5)) },
                  { k: "The real target", value: inr(F("contrib")),
                    text: <>Break-even CAC. Every rupee you take off today's {inr(F("cacNow"))} shortens the burn from the other end.</> },
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
              Paying <strong>{inr(F("cacNow"))}</strong> against a break-even CAC of{" "}
              <strong>{inr(F("contrib"))}</strong> means losing money on every new customer,
              normal for a new brand. Marketing is charged only on new customers here, because
              repeat orders cost nothing to acquire. That's why repeat rate shortens the burn
              from both ends at once.
            </ToolLede>
            <div className="tl-insight">
              <h3 className="tl-insight__h">Growing faster usually costs more, not less</h3>
              <p className="tl-insight__p">
                More new customers each month at above-break-even CAC deepens the dip even
                though it pulls the profitable month closer. At {pct(F("growth"), 0)} growth you
                need <strong>{inrCompact(m.trough)}</strong>; at {pct(Math.max(0, F("growth") - 5), 0)}{" "}
                you'd need <strong>{inrCompact(slowWin.trough)}</strong>. The question isn't how
                fast you can grow, it's how much of the dip you can fund.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ReportFooter />
      <ToolFAQ items={RW_FAQ} />
      <ToolCrossLinks current="/tools/cac-runway/" />
      <ToolCTA line="Every brand we take on gets this model in week one." />
    </>
  );
}


export { CacRunway };
