import React from "react";
import { fmtMoney, fmtNum, priceText, fillTokens } from "../../lib/pricing-calc.mjs";

/* Small controls and the line / section cards of the pricing configurator.
   No prices live in this file: every figure and every currency symbol arrives through props. */

const KIND_TAG = { from: "from", upto: "up to", plus: "plus", range: "range" };

export function Stepper({ label, value, min, max, step, onChange, wide }) {
  const set = (v) => onChange(Math.min(max, Math.max(min, Math.round(v * 100) / 100)));
  return (
    <div className={"pc-stepper" + (wide ? " pc-stepper--wide" : "")} role="group" aria-label={label}>
      <button type="button" className="pc-stepper__btn" aria-label={"Decrease " + label} onClick={() => set((+value || 0) - step)} disabled={!(value > min)}>
        <span aria-hidden="true">&minus;</span>
      </button>
      <input
        className="pc-stepper__in"
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        step={step}
        value={value ? value : ""}
        placeholder="0"
        aria-label={label}
        onChange={(e) => set(e.target.value === "" ? 0 : +e.target.value)}
      />
      <button type="button" className="pc-stepper__btn" aria-label={"Increase " + label} onClick={() => set((+value || 0) + step)} disabled={!(value < max)}>
        <span aria-hidden="true">+</span>
      </button>
    </div>
  );
}

export function MoneyInput({ label, sym, value, step, max, onChange, id }) {
  return (
    <label className="pc-money" htmlFor={id}>
      <span className="pc-money__label">{label}</span>
      <span className="pc-money__box">
        <span className="pc-money__sym" aria-hidden="true">{sym}</span>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min="0"
          max={max}
          step={step}
          value={value ? value : ""}
          placeholder="0"
          onChange={(e) => onChange(e.target.value === "" ? 0 : Math.min(max, Math.max(0, +e.target.value)))}
        />
      </span>
    </label>
  );
}

function Lists({ it }) {
  if (!it.included && !it.notIncluded) return null;
  return (
    <details className="pc-inc">
      <summary>{"What is included" + (it.notIncluded ? " and not included" : "")}</summary>
      <div className="pc-inc__cols">
        {it.included && (
          <div>
            <h5>Included</h5>
            <ul className="pc-list pc-list--yes">{it.included.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        )}
        {it.notIncluded && (
          <div>
            <h5>Not included</h5>
            <ul className="pc-list pc-list--no">{it.notIncluded.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        )}
      </div>
    </details>
  );
}

export function ItemRow({ it, ent, cur, cfg, line, onQ, onExtra, disabledHint, wl }) {
  const c = cfg[cur];
  const q = ent ? ent.q : 0;
  const on = q > 0;
  const tag = KIND_TAG[it.kind];
  const money = it.kind === "pctspend" || it.kind === "pctfee";
  const isToggle = !money && it.qty.max === 1;
  const idp = "pc-" + it.id;
  return (
    <div className={"pc-item" + (on ? " is-on" : "")} data-item={it.id}>
      <div className="pc-item__main">
        <div className="pc-item__name">
          <span id={idp + "-n"}>{it.name}</span>
          {tag && <span className="pc-tag">{tag}</span>}
        </div>
        {it.detail && <p className="pc-item__detail">{it.detail}</p>}
        <p className="pc-item__unit">{it.unit}</p>
        <Lists it={it} />
      </div>
      <div className="pc-item__price">
        {wl && <span className="pc-item__pay">You pay</span>}
        <span className="pc-item__amt">{priceText(it, cur, cfg)}</span>
        {wl && <span className="pc-item__resell">Resell at your own price</span>}
      </div>
      <div className="pc-item__ctl">
        {money ? (
          <MoneyInput id={idp + "-m"} label={it.spendLabel} sym={c.sym} value={q} step={it.qty.step} max={it.qty.max} onChange={(v) => onQ(it, v)} />
        ) : isToggle ? (
          <button type="button" className={"pc-toggle" + (on ? " is-on" : "")} aria-pressed={on} aria-labelledby={idp + "-n"} onClick={() => onQ(it, on ? 0 : 1)}>
            {on ? "Added" : "Add"}
          </button>
        ) : (
          <Stepper label={it.name} value={q} min={it.qty.min} max={it.qty.max} step={it.qty.step} onChange={(v) => onQ(it, v)} wide={it.qty.max > 999} />
        )}
      </div>
      <div className="pc-item__sub" aria-live="polite">
        {on && line ? <strong>{fmtMoney(line.amount, c)}</strong> : <span className="pc-muted">&nbsp;</span>}
      </div>
      {on && (it.creators || it.pieces || it.pctSpend || it.revShare) && (
        <div className="pc-item__extra">
          {it.creators && (
            <label className="pc-mini">
              <span>Number of creators</span>
              <Stepper label={"Number of creators for " + it.name} value={ent.n || 0} min={0} max={500} step={1} onChange={(v) => onExtra(it, "n", v)} />
            </label>
          )}
          {it.pieces && (
            <label className="pc-mini">
              <span>Number of pieces</span>
              <Stepper label={"Number of pieces for " + it.name} value={ent.n || 1} min={1} max={500} step={1} onChange={(v) => onExtra(it, "n", v)} />
            </label>
          )}
          {it.pctSpend ? (
            <MoneyInput id={idp + "-s"} label={"PR spend, if any (" + it.pctSpend + "% applies when higher)"} sym={c.sym} value={ent.s || 0} step={10000} max={100000000} onChange={(v) => onExtra(it, "s", v)} />
          ) : null}
          {it.revShare ? (
            <MoneyInput id={idp + "-r"} label={it.revLabel + ", optional"} sym={c.sym} value={ent.s || 0} step={10000} max={1000000000} onChange={(v) => onExtra(it, "s", v)} />
          ) : null}
        </div>
      )}
      {on && line && (line.notes.length > 0 || line.warn.length > 0) && (
        <div className="pc-item__notes">
          {line.warn.map((w) => <p key={w} className="pc-warn" role="note">{w}</p>)}
          {line.notes.map((w) => <p key={w} className="pc-note">{w}</p>)}
        </div>
      )}
      {disabledHint && !on && <p className="pc-item__hint">{disabledHint}</p>}
    </div>
  );
}

export function SectionCard({ s, data, cur, st, res, onQ, onExtra, onCycle, id }) {
  const cfg = data.cfg;
  const c = cfg[cur];
  const lineOf = (iid) => res.lines.find((l) => l.id === iid);
  const exclusive = new Set(s.items.filter((i) => i.group && data.exclusive.includes(i.group)).map((i) => i.group));
  const secWarn = res.warnings.filter((w) => s.items.some((i) => i.id === w.id) && !res.lines.some((l) => l.id === w.id && l.warn.includes(w.text)));
  return (
    <section className="pc-card" id={id} aria-labelledby={id + "-h"}>
      <div className="pc-card__head">
        <h3 id={id + "-h"} className="pc-card__title">{s.title}</h3>
        <span className="pc-card__cad">{s.billing === "cycle" ? "Billed in advance per cycle" : s.cadence === "monthly" ? "Monthly" : "One-time"}</span>
      </div>
      <p className="pc-card__blurb">{fillTokens(s.blurb, data.tokens, cfg, cur)}</p>
      {exclusive.size > 0 && <p className="pc-card__hint">Options in the same group are alternatives: choosing one replaces the other.</p>}
      {s.rules && s.rules.length > 0 && (
        <ul className="pc-rules">{s.rules.map((r) => <li key={r}>{fillTokens(r, data.tokens, cfg, cur)}</li>)}</ul>
      )}
      {s.id === "perf" && (
        <p className="pc-assume"><strong>How the spend-linked fee is worked out:</strong> enter the total monthly ad spend. We assume it is split evenly across your channels, and the fee applies to the part of each channel's spend above the threshold.</p>
      )}
      {s.minTotalQty && <p className="pc-card__hint">{s.minTotalQty.message}</p>}
      {s.billing === "cycle" && (
        <fieldset className="pc-cycle">
          <legend>Billing cycle</legend>
          <div className="pc-cycle__opts">
            {data.cycles.map((cy) => (
              <label key={cy.id} className={"pc-cycle__opt" + (st.cycle === cy.id ? " is-on" : "")}>
                <input type="radio" name="pc-cycle" value={cy.id} checked={st.cycle === cy.id} onChange={() => onCycle(cy.id)} />
                <span>{cy.label}</span>
                <small>{cy.months} months</small>
              </label>
            ))}
          </div>
          <p className="pc-cycle__total" aria-live="polite">
            {res.total.mntMonthly > 0
              ? "Billed in advance: " + fmtMoney(res.total.mntCycleTotal, c) + " " + res.total.cycle.label.toLowerCase() + " (" + fmtMoney(res.total.mntMonthly, c) + " x " + res.total.cycle.months + " months). No discount at any cycle."
              : "No discount at any cycle, including yearly."}
          </p>
        </fieldset>
      )}
      <div className="pc-items">
        {s.items.map((it) => (
          <ItemRow
            key={it.id}
            it={it}
            ent={st.sel[it.id]}
            cur={cur}
            cfg={cfg}
            line={lineOf(it.id)}
            onQ={onQ}
            onExtra={onExtra}
            wl={data.audience.indexOf("whitelabel") === 0}
            disabledHint={it.kind === "pctspend" ? "Add at least one channel first." : ""}
          />
        ))}
      </div>
      {secWarn.map((w) => <p key={w.text} className="pc-warn" role="note">{w.text}</p>)}
      {s.notes && s.notes.length > 0 && (
        <ul className="pc-notes">{s.notes.map((n) => <li key={n}>{fillTokens(n, data.tokens, cfg, cur)}</li>)}</ul>
      )}
      {(s.includes || s.excludes) && (
        <details className="pc-inc pc-inc--sec">
          <summary>{s.includes && s.excludes ? "What is included and not included" : s.includes ? "What is included" : "What is not included"}</summary>
          <div className="pc-inc__cols">
            {s.includes && <div><h5>Included</h5><ul className="pc-list pc-list--yes">{s.includes.map((x) => <li key={x}>{x}</li>)}</ul></div>}
            {s.excludes && <div><h5>Not included</h5><ul className="pc-list pc-list--no">{s.excludes.map((x) => <li key={x}>{x}</li>)}</ul></div>}
          </div>
        </details>
      )}
      {s.payment && <p className="pc-card__pay"><strong>Payment:</strong> {s.payment}</p>}
    </section>
  );
}
