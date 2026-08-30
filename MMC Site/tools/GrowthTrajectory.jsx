/* tools/GrowthTrajectory.jsx, MoM and YoY projection.
   Year 1 compounds month on month; later years use a separate YoY rate, because
   holding a year-one monthly rate for five years is a hope, not a plan. */

const GT_DEFAULTS = { start: 100000, mom: 10, yoy: 50, margin: 8, years: 5, target: 10000000 };

/* Verbatim from the FAQPage JSON-LD in growth-trajectory-calculator.html.
   Google requires the markup and the visible text to agree, so these
   strings are copied, not re-worded. Edit both together or neither. */
const GT_FAQ = [
  { q: "How do you convert MoM growth to YoY growth?",
    a: "Compound the monthly rate over twelve months: YoY = (1 + MoM)^12 − 1. A steady 10% month-on-month compounds to roughly 214% year-on-year, which is why small monthly gains matter far more than they appear." },
  { q: "What is a good MoM growth rate for a D2C brand?",
    a: "It depends entirely on the base. Early brands at a low run rate can post 15–20% MoM for a while; at scale, sustained 5–8% MoM is strong. Any MoM figure quoted without the starting revenue is close to meaningless." },
  { q: "How many months does it take to double revenue?",
    a: "Divide the natural log of 2 by the natural log of one plus your monthly growth rate. At 10% MoM it takes about 7.3 months; at 5% MoM it takes roughly 14.2 months." },
];

function GrowthTrajectory() {
  const T = window.mmcTools;
  const { Ctl, Meter, BigAnswer, Fact, Wins, LineChart, ColumnChart, TableView,
          ToolActions, ToolLede, ReportCover, ReportFooter, ToolCrossLinks, ToolCTA, ToolFAQ,
          useToolState, inr, inrCompact, num, pct } = T;

  const [s, set, reset] = useToolState(GT_DEFAULTS);
  const n = (v) => (v === "" || !isFinite(v) ? 0 : Number(v));
  const F = (k) => n(s[k]);

  const year1Of = (rate) => {
    let c = 0;
    for (let i = 0; i < 12; i++) c += F("start") * Math.pow(1 + rate / 100, i);
    return c;
  };

  const g = F("mom") / 100;
  const months = [];
  let cum = 0;
  for (let i = 0; i < 12; i++) {
    const rev = F("start") * Math.pow(1 + g, i);
    cum += rev;
    months.push({ label: "M" + (i + 1), rev: rev, profit: rev * (F("margin") / 100), cum: cum });
  }
  const year1 = cum;
  const exitRun = months[11].rev;
  const impliedYoY = (Math.pow(1 + g, 12) - 1) * 100;

  const Y = Math.max(1, Math.min(10, Math.round(F("years")) || 5));
  const years = [];
  for (let k = 0; k < Y; k++) {
    const rev = year1 * Math.pow(1 + F("yoy") / 100, k);
    years.push({ label: "Y" + (k + 1), rev: rev, profit: rev * (F("margin") / 100), yoy: k === 0 ? null : F("yoy") });
  }

  const toDouble = g > 0 ? Math.log(2) / Math.log(1 + g) : null;
  const toTarget = (g > 0 && F("start") > 0 && F("target") > F("start"))
    ? Math.log(F("target") / F("start")) / Math.log(1 + g) : null;
  const onePoint = year1Of(F("mom") + 1) - year1;

  const inputRows = [
    { k: "Monthly revenue now", v: inr(F("start")) },
    { k: "MoM growth (year 1)", v: pct(F("mom"), 1) },
    { k: "YoY growth (year 2+)", v: pct(F("yoy"), 1) },
    { k: "Net margin", v: pct(F("margin"), 1) },
    { k: "Years projected", v: num(Y) },
    { k: "Revenue target", v: inr(F("target")) },
  ];

  return (
    <>
      <ReportCover title="Growth Trajectory Report" subtitle="MoM and YoY revenue projection" rows={inputRows} />

      <section className="page-hero page-hero--compact" data-wm="Tools">
        <nav className="tl-crumb" aria-label="Breadcrumb">
            <a href="tools.html">Tools</a><span aria-hidden="true">/</span>
            <span aria-current="page">Growth Trajectory</span>
          </nav>

        <div className="tl-head">
          <h1 className="tl-title">Where does this run rate <em>get you</em>?</h1>
          <p className="tl-title__s">
            Small monthly gains compound harder than almost anyone expects. Move the MoM
            slider one point and watch what a year of it is worth.
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
          <div className="tl-actionbar"><ToolActions state={s} onReset={reset} toolName="growth-trajectory" /></div>
          <div className="tl-split">
            <div className="tl-split__ctrl">
              <div className="tl-card">
                <div className="tl-card__top"><div><h2 className="tl-card__h">Your numbers</h2></div></div>
                <div className="tl-groups tl-groups--flush">
                  <details className="tl-group" open>
                    <summary>Starting point</summary>
                    <div className="tl-fields">
                      <Ctl label="Monthly revenue now" value={s.start} onChange={(v) => set("start", v)}
                           min={25000} max={20000000} step={25000} fmt={(v) => inrCompact(v)} />
                      <Ctl label="MoM growth (year 1)" info="mom" value={s.mom} onChange={(v) => set("mom", v)}
                           min={0} max={30} step={0.5} fmt={(v) => pct(v, 1)}
                           hint="Sustained 5–8% is strong at scale; early brands can run higher." />
                      <Ctl label="Net margin" info="net-margin" value={s.margin} onChange={(v) => set("margin", v)}
                           min={-10} max={30} step={0.5} fmt={(v) => pct(v, 1)} />
                    </div>
                  </details>
                  <details className="tl-group" open>
                    <summary>Projection</summary>
                    <div className="tl-fields">
                      <Ctl label="YoY growth (year 2+)" info="yoy" value={s.yoy} onChange={(v) => set("yoy", v)}
                           min={0} max={200} step={5} fmt={(v) => pct(v, 0)} />
                      <Ctl label="Years to project" value={s.years} onChange={(v) => set("years", v)}
                           min={1} max={10} step={1} fmt={(v) => num(v)} />
                      <Ctl label="Revenue target" value={s.target} onChange={(v) => set("target", v)}
                           min={1000000} max={500000000} step={1000000} fmt={(v) => inrCompact(v)} />
                    </div>
                  </details>
                </div>
              </div>
            </div>

            <div className="tl-split__out">
              <div className="tl-answer">
                <BigAnswer k="Implied YoY growth" info="yoy" v={pct(impliedYoY, 0)}
                           tone={impliedYoY >= 100 ? "good" : null}>
                  <Meter value={F("mom")} goal={10} floor={3} min={0} max={Math.max(20, F("mom") * 1.2)}
                         fmtV={(v) => pct(v, 1) + " MoM"} labels={["0% MoM", "Strong 10% MoM"]} />
                  <p className="tl-big__s">
                    Compounding <b>{pct(F("mom"), 1)}</b> a month takes you from{" "}
                    <b>{inrCompact(F("start"))}</b> to a <b>{inrCompact(exitRun)}</b> monthly run rate
                    inside a year. One extra point of MoM would add{" "}
                    <b>{inrCompact(onePoint)}</b> to year one.
                  </p>
                </BigAnswer>

                <div className="tl-facts">
                  <Fact label="Year 1 revenue" value={inrCompact(year1)} sub={inr(Math.round(year1))} />
                  <Fact label="Exit run rate (M12)" value={inrCompact(exitRun)}
                        sub={inrCompact(exitRun * 12) + " annualised"} tone="good" />
                  <Fact label="Months to double" info="mom" value={toDouble ? toDouble.toFixed(1) + " mo" : "-"} />
                  <Fact label={"Months to " + inrCompact(F("target"))}
                        value={toTarget ? Math.ceil(toTarget) + " mo" : (F("target") <= F("start") ? "Already there" : "-")}
                        tone={toTarget && toTarget <= 24 ? "good" : null} />
                </div>
              </div>

              <div className="tl-card">
                <div className="tl-card__top">
                  <div><h2 className="tl-card__h">Year one, month by month</h2>
                  <p className="tl-card__sub">Hover the line for the revenue in any month.</p></div>
                </div>
                <LineChart rows={months} series={[{ key: "rev", name: "Revenue", color: "var(--c1)" }]}
                           fmt={(v) => inr(Math.round(v))} fmtTick={(v) => inrCompact(v)} height={210} />
                <TableView
                  summary="Month-by-month table"
                  head={["Month", "Revenue", "Net profit", "Cumulative"]}
                  rows={months.map((mo) => ({
                    cells: [mo.label, inr(Math.round(mo.rev)),
                            { v: inr(Math.round(mo.profit)), tone: mo.profit >= 0 ? "pos" : "neg" },
                            inr(Math.round(mo.cum))]
                  })).concat([{ total: true, cells: ["Year 1", inr(Math.round(year1)),
                            inr(Math.round(year1 * (F("margin") / 100))), inr(Math.round(year1))] }])} />
              </div>

              <div className="tl-card">
                <div className="tl-card__top">
                  <div><h2 className="tl-card__h">The next {num(Y)} years</h2>
                  <p className="tl-card__sub">Year one compounds monthly; the rest use your YoY rate.</p></div>
                </div>
                <ColumnChart rows={years} valueKey="rev" fmt={(v) => inr(Math.round(v))}
                             fmtTick={(v) => inrCompact(v)} height={200} color="var(--c1)" />
                <TableView
                  summary="Year-by-year table"
                  head={["Year", "Revenue", "Net profit", "YoY"]}
                  rows={years.map((yr) => ({
                    cells: [yr.label, inr(Math.round(yr.rev)),
                            { v: inr(Math.round(yr.profit)), tone: yr.profit >= 0 ? "pos" : "neg" },
                            yr.yoy == null ? "-" : pct(yr.yoy, 0)]
                  }))} />
              </div>

              <div className="tl-card">
                <h2 className="tl-sec__h">What one more point is worth</h2>
                <Wins items={[
                  { k: "One point of MoM", value: "+" + inrCompact(Math.max(0, onePoint)),
                    text: <>Going from <b>{pct(F("mom"), 1)}</b> to <b>{pct(F("mom") + 1, 1)}</b> a month adds this much to year one alone.</>,
                    apply: "Model +1 point →", onApply: () => set("mom", F("mom") + 1) },
                  { k: "Compounding", value: pct(impliedYoY, 0),
                    text: <>That monthly rate is a <b>{pct(impliedYoY, 0)}</b> year: MoM and YoY are the same number wearing different clothes.</> },
                  { k: "Reaching the target", value: toTarget ? Math.ceil(toTarget) + " months" : "-",
                    text: <>At today's rate you hit <b>{inrCompact(F("target"))}</b> a month in {toTarget ? Math.ceil(toTarget) : "-"} months.</> },
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
              <strong>MoM</strong> is how much this month beat last month.{" "}
              <strong>YoY</strong> compares against the same period a year earlier. They're the
              same growth seen at two speeds: {pct(F("mom"), 1)} a month compounds to{" "}
              <strong>{pct(impliedYoY, 0)}</strong> across twelve.
            </ToolLede>
            <div className="tl-insight">
              <h3 className="tl-insight__h">Year {Y} at this trajectory</h3>
              <p className="tl-insight__p">
                Holding {pct(F("yoy"), 0)} YoY after year one puts year {Y} at{" "}
                <strong>{inrCompact(years[Y - 1].rev)}</strong> and{" "}
                <strong>{inrCompact(years[Y - 1].profit)}</strong> of net profit at a{" "}
                {pct(F("margin"), 1)} margin. The whole path traces back to the monthly rate,
                which is why one point matters more than it looks.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ReportFooter />
      <ToolFAQ items={GT_FAQ} />
      <ToolCrossLinks current="growth-trajectory-calculator.html" />
      <ToolCTA line="A trajectory is a hypothesis. We build the engine that delivers it." />
    </>
  );
}

window.GrowthTrajectory = GrowthTrajectory;
