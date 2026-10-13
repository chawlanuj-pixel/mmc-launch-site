import React from "react";
import ReactDOM from "react-dom";
import { MMC_GLOSSARY_BY_ID, MMC_GLOSSARY_URL } from "./glossaryData.js";
import { TOOLS as SITE_TOOLS } from "../../lib/site";

/* tools/ToolsShared.jsx, shared primitives for the MMC calculator suite.
   Formatting, inputs, benchmark ratings, result tiles, and the page shell
   every tool sits inside. Kept in one file so the three tools stay visually
   identical and only their maths differ. */

/* ── Formatting ─────────────────────────────────────────────── */

/* Indian grouping: 12,34,567 rather than 1,234,567. */
function inr(n, decimals = 0) {
  if (!isFinite(n)) return "-";
  return "₹" + Number(n).toLocaleString("en-IN", {
    minimumFractionDigits: decimals, maximumFractionDigits: decimals
  });
}

/* Compact Indian units, ₹4.2L, ₹3.6Cr - for numbers that get large. */
function inrCompact(n) {
  if (!isFinite(n)) return "-";
  const a = Math.abs(n);
  if (a >= 1e7) return "₹" + (n / 1e7).toFixed(2).replace(/\.00$/, "") + "Cr";
  if (a >= 1e5) return "₹" + (n / 1e5).toFixed(2).replace(/\.00$/, "") + "L";
  if (a >= 1e3) return "₹" + (n / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  return inr(n);
}

/* Signed currency: +₹1,200 / −₹340. Uses the real minus sign. */
function inrSigned(n, decimals = 0) {
  if (!isFinite(n)) return "-";
  return (n < 0 ? "\u2212" : "+") + inr(Math.abs(n), decimals);
}

/* Ratios always use the multiplication sign: 2.40× */
function ratio(n, decimals = 2) {
  if (!isFinite(n)) return "-";
  return Number(n).toFixed(decimals) + "\u00D7";
}

function num(n, decimals = 0) {
  if (!isFinite(n)) return "-";
  return Number(n).toLocaleString("en-IN", {
    minimumFractionDigits: decimals, maximumFractionDigits: decimals
  });
}

function pct(n, decimals = 1) {
  if (!isFinite(n)) return "-";
  return n.toFixed(decimals) + "%";
}

/* ── Benchmark rating ───────────────────────────────────────────
   Each rate carries [poorBelow, goodAbove] thresholds drawn from Indian
   D2C medians. Returns a band so the UI can colour and label it. */
function rate(value, poorBelow, goodAbove) {
  if (value < poorBelow) return { band: "poor", label: "Poor" };
  if (value >= goodAbove) return { band: "good", label: "Good" };
  return { band: "okay", label: "Okay" };
}

/* ── Jargon ─────────────────────────────────────────────────────
   InfoDot, a small "i" beside any labelled metric. Definitions come from
   window.MMC_GLOSSARY (tools/glossary-data.js), the same source the glossary
   page reads, so wording never drifts between the two.

   The panel is position:fixed and measured from the button, so it can't be
   clipped by a panel's bounds and costs the layout no vertical space, which
   matters, because these calculators are built to fit one screen. */
function InfoDot({ term, label }) {
  const g = (MMC_GLOSSARY_BY_ID || {})[term];
  const [open, setOpen] = React.useState(false);
  const [pos, setPos] = React.useState(null);
  const btnRef = React.useRef(null);

  const place = React.useCallback(() => {
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const W = Math.min(272, window.innerWidth - 24);
    let left = r.left + r.width / 2 - W / 2;
    left = Math.max(12, Math.min(left, window.innerWidth - W - 12));
    const roomBelow = window.innerHeight - r.bottom;
    setPos({
      left: left, width: W,
      top: roomBelow > 210 ? r.bottom + 9 : null,
      bottom: roomBelow > 210 ? null : window.innerHeight - r.top + 9,
    });
  }, []);

  React.useEffect(() => {
    if (!open) return;
    place();
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    const onAway = (e) => { if (btnRef.current && !btnRef.current.contains(e.target)) setOpen(false); };
    const onMove = () => setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onAway);
    window.addEventListener("scroll", onMove, true);
    window.addEventListener("resize", onMove);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onAway);
      window.removeEventListener("scroll", onMove, true);
      window.removeEventListener("resize", onMove);
    };
  }, [open, place]);

  if (!g) return null;
  const name = g.abbr ? g.term + " (" + g.abbr + ")" : g.term;

  return (
    <span className="tl-info" ref={btnRef}>
      <button
        type="button"
        className={"tl-info__btn" + (open ? " is-on" : "")}
        aria-expanded={open}
        aria-label={"What is " + (label || g.abbr || g.term) + "?"}
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        onMouseEnter={() => setOpen(true)}
        onFocus={() => setOpen(true)}
      >i</button>

      {open && pos && (
        <span className="tl-info__pop" role="tooltip" style={{
          left: pos.left + "px", width: pos.width + "px",
          top: pos.top != null ? pos.top + "px" : "auto",
          bottom: pos.bottom != null ? pos.bottom + "px" : "auto",
        }}>
          <span className="tl-info__t">{name}</span>
          <span className="tl-info__d">{g.def}</span>
          {g.formula && <span className="tl-info__f">{g.formula}</span>}
          {g.matters && <span className="tl-info__w">{g.matters}</span>}
          <a className="tl-info__more" href={(MMC_GLOSSARY_URL || "/glossary/") + "#" + g.id}>
            Full glossary →
          </a>
        </span>
      )}
    </span>
  );
}

/* ── Inputs ─────────────────────────────────────────────────── */

/* A labelled numeric input with a unit affix. Used for money and counts. */
function Field({ label, value, onChange, prefix, suffix, step = 1, min = 0, max, hint, info }) {
  // A typed value can never exceed a sensible ceiling: 100 for a percentage, 1 lakh for a per-unit rupee cost,
  // 1 crore for monthly money (the step is large only for those fields).
  const cap = max != null ? max : suffix === "%" ? 100 : step >= 500 ? 10000000 : 100000;
  return (
    <label className="tl-field">
      <span className="tl-field__label">{label}{info && <InfoDot term={info} label={label} />}</span>
      <span className="tl-field__box">
        {prefix && <span className="tl-field__affix">{prefix}</span>}
        <input
          type="number"
          className="tl-field__input"
          value={value}
          step={step}
          min={min}
          max={cap}
          inputMode="decimal"
          onChange={(e) => {
            const v = e.target.value === "" ? "" : Number(e.target.value);
            if (v === "") return onChange("");
            if (!isFinite(v)) return;
            onChange(Math.min(cap, v));
          }}
          onBlur={() => {
            const v = Number(value);
            if (value !== "" && isFinite(v) && v < min) onChange(min);
          }}
        />
        {suffix && <span className="tl-field__affix tl-field__affix--suf">{suffix}</span>}
      </span>
      {hint && <span className="tl-field__hint">{hint}</span>}
    </label>
  );
}

/* ── Output tiles ───────────────────────────────────────────── */

/* ── Shareable state ────────────────────────────────────────────
   One state object per tool, mirrored into the URL so a result can be sent to
   a colleague or reopened later. Reset returns to the documented defaults. */
function useToolState(defaults) {
  const read = () => {
    try {
      const raw = new URLSearchParams(window.location.search).get("s");
      if (!raw) return defaults;
      const parsed = JSON.parse(decodeURIComponent(escape(atob(raw.replace(/-/g, "+").replace(/_/g, "/")))));
      const merged = Object.assign({}, defaults);
      Object.keys(defaults).forEach((k) => { if (parsed[k] != null) merged[k] = parsed[k]; });
      return merged;
    } catch (e) { return defaults; }
  };
  /* Server render and first client render use the defaults; a shared ?s= link
     is applied right after mount (the original read it during first render). */
  const [s, setS] = React.useState(defaults);
  React.useEffect(() => { const r = read(); if (r !== defaults) setS(r); }, []);
  const set = React.useCallback((k, v) => setS((p) => Object.assign({}, p, { [k]: v })), []);
  const reset = React.useCallback(() => {
    setS(defaults);
    try { window.history.replaceState(null, "", window.location.pathname); } catch (e) {}
  }, [defaults]);
  return [s, set, reset, setS];
}

function encodeToolState(state) {
  try {
    const json = JSON.stringify(state);
    return btoa(unescape(encodeURIComponent(json))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  } catch (e) { return ""; }
}

/* ── Tool action bar ────────────────────────────────────────────
   Reset · Share (copies a URL carrying the current inputs) · Download, which
   opens the browser's print dialog against a branded print stylesheet so the
   reader gets an MMC-headed PDF rather than a screenshot. */
function ToolActions({ state, onReset, toolName }) {
  const [msg, setMsg] = React.useState(null);

  const share = async () => {
    const url = window.location.origin + window.location.pathname + "?s=" + encodeToolState(state);
    try { window.history.replaceState(null, "", url); } catch (e) {}
    try {
      await navigator.clipboard.writeText(url);
      setMsg("Link copied");
    } catch (e) {
      setMsg("Link is in the address bar");
    }
    setTimeout(() => setMsg(null), 2600);
  };

  return (
    <div className="tl-acts">
      <button type="button" className="tl-act" onClick={onReset}>
        <span className="tl-act__i" aria-hidden="true">↺</span>Reset
      </button>
      <button type="button" className="tl-act" onClick={share}>
        <span className="tl-act__i" aria-hidden="true">↗</span>Share result
      </button>
      <button type="button" className="tl-act" onClick={() => window.print()}>
        <span className="tl-act__i" aria-hidden="true">↓</span>Download report
      </button>
      <button type="button" className="tl-act tl-act--cta" onClick={(e) => window.mmcBookCall(toolName || "tool", e)}>
        Book a strategy call<span className="tl-btn__arr" aria-hidden="true"></span>
      </button>
      {msg && <span className="tl-acts__toast" role="status">{msg}</span>}
    </div>
  );
}

/* Print-only cover. Screen readers and the browser ignore it until print. */
function ReportCover({ title, subtitle, rows }) {
  const d = new Date();
  const stamp = d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  return (
    <div className="tl-print">
      <div className="tl-print__bar">
        <img src="/assets/logo-blue.png" alt="Monday Marketing Company" className="tl-print__logo" />
        <div className="tl-print__meta">
          <strong>Monday Marketing Company</strong>
          <span>Design × Marketing × Technology × Content × AI</span>
          <span>mondaymarketing.company · sales-in@mondaymarketing.company</span>
        </div>
      </div>
      <p className="tl-print__h" role="presentation">{title}</p>
      <p className="tl-print__sub">{subtitle} · Generated {stamp}</p>
      {rows && rows.length > 0 && (
        <table className="tl-print__inputs">
          <caption>Inputs used</caption>
          <tbody>
            {rows.map((r) => (
              <tr key={r.k}><th scope="row">{r.k}</th><td>{r.v}</td></tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function ReportFooter() {
  return (
    <div className="tl-printfoot">
      <strong>These are your numbers. The next question is what to do about them.</strong>
      <span>
        Book a 30-minute strategy call, no deck, no pitch, a direct read on what to fix
        first: calendly.com/mmc-agency-ww/audit-onboarding-calls
      </span>
      <span>© Monday Marketing Company · Prepared with the free calculators at mondaymarketing.company/tools/</span>
    </div>
  );
}

/* ── Interactive primitives ─────────────────────────────────────
   Sliders over number boxes wherever a range makes sense: a slider invites
   you to play, a text field asks you to know the answer already. */

function Ctl({ label, value, onChange, min, max, step = 1, fmt, hint, info, lo, hi, tone }) {
  const v = Number(value) || 0;
  const [draft, setDraft] = React.useState(null);
  // Read the unit off the formatter rather than duplicating it at ~45 call sites.
  const sample = fmt ? String(fmt(v)) : String(v);
  const pre = sample.charAt(0) === "\u20B9" ? "\u20B9" : "";
  const suf = /%$/.test(sample) ? "%" : /\u00D7$/.test(sample) ? "\u00D7" : /mo$/.test(sample) ? "mo" : "";
  const frac = Math.max(0, Math.min(1, (v - min) / ((max - min) || 1)));
  const track = tone === "band"
    ? `linear-gradient(90deg, var(--t-gap-bg) 0 ${((lo - min) / (max - min)) * 100}%,
        var(--t-warn-bg) ${((lo - min) / (max - min)) * 100}% ${((hi - min) / (max - min)) * 100}%,
        var(--t-good-bg) ${((hi - min) / (max - min)) * 100}% 100%)`
    : `linear-gradient(90deg, var(--t-blue) 0 ${frac * 100}%, var(--t-soft) ${frac * 100}% 100%)`;

  return (
    <div className="tl-ctl">
      <div className="tl-ctl__top">
        <span className="tl-ctl__l">{label}{info && <InfoDot term={info} label={label} />}</span>
        <span className="tl-ctl__v">
          {pre && <span className="tl-ctl__fix">{pre}</span>}
          <input
            type="text" className="tl-ctl__in" inputMode="decimal" autoComplete="off"
            value={draft != null ? draft : (Math.abs(v) >= 10000 ? v.toLocaleString("en-IN") : String(v))}
            data-min={min} data-max={max} aria-label={label}
            onFocus={() => setDraft(String(v))}
            onChange={(e) => {
              const raw = e.target.value.replace(/,/g, "");
              if (!/^-?\d*\.?\d*$/.test(raw)) return;
              const num = Number(raw);
              // Typed values stop at the slider's maximum: no 11-digit entries.
              if (raw !== "" && isFinite(num) && num > max) {
                setDraft(String(max));
                onChange(max);
                return;
              }
              setDraft(raw);
              if (raw !== "" && raw !== "-" && raw !== "." && isFinite(num)) onChange(num);
            }}
            onBlur={() => {
              const num = Number(draft);
              setDraft(null);
              onChange(!isFinite(num) || draft === "" || draft === null || draft === "-" || draft === "."
                ? v : Math.max(min, Math.min(max, num)));
            }} />
          {suf && <span className="tl-ctl__fix">{suf}</span>}
        </span>
      </div>
      <input
        type="range" className="tl-slider" style={{ "--t-track": track }}
        value={v} min={min} max={max} step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label} aria-valuetext={fmt ? fmt(v) : String(v)} />
      <div className="tl-ctl__scale"><span>{fmt ? fmt(min) : min}</span><span>{fmt ? fmt(max) : max}</span></div>
      {hint && <p className="tl-ctl__hint">{hint}</p>}
    </div>
  );
}

/* Meter: distance travelled toward the goal, not a pass/fail verdict.
   Someone below break-even should see how far they've come and what's left,
   not a red light. */
function Meter({ value, goal, floor, min, max, fmtV, labels }) {
  const span = (max - min) || 1;
  const pos = (x) => Math.max(0, Math.min(100, ((x - min) / span) * 100));
  const short = value < floor;
  return (
    <div className="tl-meter">
      <div className="tl-meter__track">
        <span className={"tl-meter__fill" + (short ? " is-short" : "")} style={{ width: pos(value) + "%" }} />
        {isFinite(goal) && <span className="tl-meter__goal" style={{ left: pos(goal) + "%" }} />}
        <span className="tl-meter__pin" style={{ left: pos(value) + "%" }} />
      </div>
      <div className="tl-meter__scale">
        <span>{labels[0]}</span>
        <span><b>{fmtV(value)}</b> you</span>
        <span>{labels[1]}</span>
      </div>
    </div>
  );
}

/* LiveBar: on phones the result sits ~1300px below the sliders, so a compact
   headline bar follows the reader while they are in the inputs. Shown only
   while the reader is inside the inputs card and the results panel is not on screen; it never
   renders on desktop (CSS), and it is portalled so no transformed ancestor
   can break position:fixed. */
function LiveBar({ k, v, tone }) {
  const [host, setHost] = React.useState(null);
  const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    setHost(document.body);
    const ctrl = document.querySelector(".tl-split__ctrl");
    const out = document.querySelector(".tl-answer");
    if (!ctrl || !out) return;
    let raf = 0;
    const calc = () => {
      raf = 0;
      const vh = window.innerHeight;
      const c = ctrl.getBoundingClientRect(), r = out.getBoundingClientRect();
      // Inside the inputs (past the top of the card, not yet at its end) and the result not yet on screen.
      setOn(c.top < vh * 0.45 && c.bottom > 200 && r.top > vh * 0.6);
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(calc); };
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    calc();
    return () => { window.removeEventListener("scroll", queue); window.removeEventListener("resize", queue); if (raf) cancelAnimationFrame(raf); };
  }, []);
  if (!host) return null;
  return ReactDOM.createPortal(
    <div className={"tl-live" + (on ? " is-on" : "")} aria-hidden="true">
      <span className="tl-live__k">{k}</span>
      <span className={"tl-live__v" + (tone ? " is-" + tone : "")}>{v}</span>
    </div>, host);
}

/* BigAnswer: one number, one plain sentence, and the meter under it. */
function BigAnswer({ k, v, tone, info, children }) {
  return (
    <div className="tl-big">
      <LiveBar k={k} v={v} tone={tone} />
      <span className="tl-big__k">{k}{info && <InfoDot term={info} label={k} />}</span>
      <span className={"tl-big__v" + (tone ? " is-" + tone : "")}>{v}</span>
      {children}
    </div>
  );
}

function Fact({ label, value, sub, tone, info }) {
  return (
    <div className={"tl-fact" + (tone ? " tl-fact--" + tone : "")}>
      <span className="tl-fact__l">{label}{info && <InfoDot term={info} label={label} />}</span>
      <span className="tl-fact__v">{value}</span>
      {sub && <span className="tl-fact__s">{sub}</span>}
    </div>
  );
}

/* Wins: the motivating half. Each is a concrete, achievable move with the
   number it's worth and a button that actually applies it. */
const WIN_TITLES = ["", "One move, and what it is worth", "Two moves, and what each is worth", "Three moves, and what each is worth"];
function Wins({ items }) {
  if (!items || !items.length) return null;
  return (
    <>
      <h2 className="tl-sec__h">{WIN_TITLES[Math.min(3, items.length)]}</h2>
      <div className="tl-wins">
        {items.map((w) => (
          <div className="tl-win" key={w.k}>
            <span className="tl-win__k">{w.k}</span>
            <span className="tl-win__v">{w.value}</span>
            <p className="tl-win__t">{w.text}</p>
            {w.onApply && (
              <button type="button" className="tl-win__b" onClick={w.onApply}>Model it &rarr;</button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

/* Shown beside "Your numbers" until a visitor changes an input. */
function ExampleTag({ s, defaults }) {
  const same = Object.keys(defaults).every((k) => Number(s[k]) === Number(defaults[k]));
  if (!same) return null;
  return <span className="tl-example">Example numbers: replace with your own</span>;
}

/* One line under the results, in place of the long reassurance box. */
function ResultsNote() {
  return <p className="tl-resultsnote">Estimates from your inputs, not a forecast.</p>;
}

/* Horizontal bar rows: used for funnels, waterfalls and cost splits. */
function Rows({ items }) {
  if (!items || !items.length) return null;
  return (
    <div className="tl-rows">
      {items.map((r, i) => (
        <React.Fragment key={r.l + i}>
          <div className="tl-row">
            <span className="tl-row__l">{r.l}</span>
            <span className="tl-row__bar">
              <span className="tl-row__fill"
                    style={{ left: Math.max(0, Math.min(100, r.left || 0)) + "%",
                             width: Math.max(0.5, Math.min(100 - Math.max(0, Math.min(100, r.left || 0)),
                                                           (r.left || 0) < 0 ? r.width + (r.left || 0) : r.width)) + "%",
                             background: r.color || "var(--c1)" }} />
              {(r.left || 0) < -0.01 && (
                <span className="tl-row__under" title="This cost is larger than what was left" />
              )}
            </span>
            <span className="tl-row__n">{r.v}</span>
          </div>
          {r.note && <div className="tl-row__d">{r.note}</div>}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ── Charts ─────────────────────────────────────────────────────
   Rendered at measured pixel width so text stays crisp and hit areas are
   honest, no viewBox scaling. Every chart ships a hover layer; the ones
   using sub-3:1 palette slots also ship direct labels and a table view,
   which the palette validation makes mandatory rather than optional. */

const SERIES = ["var(--c1)", "var(--c2)", "var(--c3)", "var(--c4)", "var(--c5)", "var(--c6)"];

function useWidth(ref, fallback = 620) {
  const [w, setW] = React.useState(fallback);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => setW(Math.max(260, Math.round(el.getBoundingClientRect().width)));
    read();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return w;
}

/* Round a max up to a readable tick value. */
function niceMax(v) {
  if (!(v > 0)) return 1;
  const mag = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / mag;
  const steps = [1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
  return (steps.find((x) => n <= x + 1e-9) || 10) * mag;
}

/* Bar with only its top corners rounded, so the mark stays anchored to the
   baseline (a fully rounded bar reads as floating). */
function barPath(x, y, w, h, r) {
  if (h < 0) {  // downward bar: round the bottom corners instead
    const hh = -h, rr2 = Math.max(0, Math.min(-r, w / 2, hh));
    return `M${x},${y - hh} L${x},${y - rr2} Q${x},${y} ${x + rr2},${y}` +
           ` L${x + w - rr2},${y} Q${x + w},${y} ${x + w},${y - rr2} L${x + w},${y - hh} Z`;
  }
  const rr = Math.max(0, Math.min(r, w / 2, h));
  return `M${x},${y + h} L${x},${y + rr} Q${x},${y} ${x + rr},${y}` +
         ` L${x + w - rr},${y} Q${x + w},${y} ${x + w},${y + rr} L${x + w},${y + h} Z`;
}

/* Pointer handling shared by the charts: mouse hover, and tap or drag on touch.
   On touch the tooltip stays after the finger lifts and clears on the next
   tap outside the chart. */
function chartPointer(update, clear) {
  return {
    onPointerDown: update,
    onPointerMove: update,
    onPointerLeave: (e) => { if (e.pointerType !== "touch") clear(); },
  };
}
function useDismissOutside(ref, active, clear) {
  React.useEffect(() => {
    if (!active) return;
    const f = (e) => { if (ref.current && !ref.current.contains(e.target)) clear(); };
    document.addEventListener("pointerdown", f);
    return () => document.removeEventListener("pointerdown", f);
  }, [active]);
}

/* Line chart: one or two series, crosshair + tooltip, endpoint direct label. */
function LineChart({ rows, series, fmt, fmtTick, height = 216, xKey = "label", signedY = false }) {
  const wrap = React.useRef(null);
  const W = useWidth(wrap);
  const [hover, setHover] = React.useState(null);
  useDismissOutside(wrap, hover != null, () => setHover(null));

  if (!rows || rows.length === 0) return <div className="tl-chart" />;
  const n = rows.length;
  const gutter = (vals) => Math.max(48, Math.min(96,
    Math.max(...vals.map((v) => String(fmtTick(v)).length)) * 6.6 + 14));
  const P = { l: 16, r: 16, t: 14, b: 32 };
  const ih = Math.max(10, height - P.t - P.b);

  const all = rows.flatMap((r) => series.map((s) => r[s.key] || 0));
  const maxV = niceMax(Math.max(0, ...all));
  // A cumulative cash line dips below zero; clamping at 0 would hide the trough.
  const minV = signedY ? -niceMax(Math.abs(Math.min(0, ...all))) : 0;
  const span = (maxV - minV) || 1;
  const x = (i) => P.l + (n <= 1 ? iw / 2 : (i / (n - 1)) * iw);
  const y = (v) => P.t + ih - (((signedY ? v : Math.max(0, v)) - minV) / span) * ih;

  const ticks = signedY ? [minV, minV / 2, 0, maxV / 2, maxV]
                        : [0, 0.25, 0.5, 0.75, 1].map((f) => maxV * f);
  P.l = gutter(ticks);
  const iw = Math.max(10, W - P.l - P.r);
  const zeroY = y(0);
  // Thin the x labels by the pixel width available (about one per 44px) and never print a label that would sit on top of the last one.
  const stepPx = n > 1 ? iw / (n - 1) : iw;
  const every = Math.max(1, Math.ceil(46 / Math.max(stepPx, 1)));
  const showX = (i) => i === n - 1 || (i % every === 0 && (n - 1 - i) * stepPx >= 40);

  const onMove = (e) => {
    const r = wrap.current.getBoundingClientRect();
    const px = e.clientX - r.left;
    let i = Math.round(((px - P.l) / (iw || 1)) * (n - 1));
    i = Math.max(0, Math.min(n - 1, i));
    setHover(i);
  };

  return (
    <div className="tl-chart" ref={wrap} {...chartPointer(onMove, () => setHover(null))}>
      <svg width={W} height={height} role="img"
           aria-label={series.map((s) => s.name).join(" and ") + " over time"}>
        {ticks.map((t, i) => (
          <g key={i}>
            <line className="tl-chart__grid" x1={P.l} x2={P.l + iw} y1={y(t)} y2={y(t)} />
            <text className="tl-chart__tick" x={P.l - 8} y={y(t) + 3.5} textAnchor="end">{fmtTick(t)}</text>
          </g>
        ))}
        <line className="tl-chart__axis" x1={P.l} x2={P.l + iw} y1={zeroY} y2={zeroY} />

        {rows.map((r, i) => showX(i) && (
          <text key={i} className="tl-chart__tick" x={x(i)} y={height - 10}
                textAnchor={i === 0 ? "start" : i === n - 1 ? "end" : "middle"}>{r[xKey]}</text>
        ))}

        {series.map((s, si) => {
          const pts = rows.map((r, i) => [x(i), y(r[s.key] || 0)]);
          const d = pts.map((p, i) => (i ? "L" : "M") + p[0] + "," + p[1]).join(" ");
          const color = s.color || SERIES[si];
          return (
            <g key={s.key}>
              {series.length === 1 && (
                <path d={d + ` L${x(n - 1)},${zeroY} L${x(0)},${zeroY} Z`} fill={color} opacity="0.09" />
              )}
              <path className="tl-chart__line" d={d} stroke={color} />
              <circle className="tl-chart__dot" cx={x(n - 1)} cy={y(rows[n - 1][s.key] || 0)} r="4.5" fill={color} />
            </g>
          );
        })}

        {hover != null && (
          <g>
            <line className="tl-chart__cross" x1={x(hover)} x2={x(hover)} y1={P.t} y2={P.t + ih} />
            {series.map((s, si) => (
              <circle key={s.key} cx={x(hover)} cy={y(rows[hover][s.key] || 0)} r="4.5"
                      fill={s.color || SERIES[si]} className="tl-chart__dot" />
            ))}
          </g>
        )}
      </svg>

      {hover != null && (
        <div className="tl-tip" style={{ left: Math.max(76, Math.min(W - 76, x(hover))) + "px", top: (P.t + 4) + "px" }}>
          <span className="tl-tip__t">{rows[hover][xKey]}</span>
          {series.map((s, si) => (
            <span className="tl-tip__r" key={s.key}>
              <span className="tl-tip__sw" style={{ background: s.color || SERIES[si] }} />
              {s.name}<span className="tl-tip__v">{fmt(rows[hover][s.key] || 0)}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* Column chart: single series, magnitude. Rounded data-ends on the baseline. */
function ColumnChart({ rows, valueKey, labelKey = "label", fmt, fmtTick, height = 216,
                      color = "var(--c1)", negColor = "var(--t-gap)", signed = false }) {
  const wrap = React.useRef(null);
  const W = useWidth(wrap);
  const [hover, setHover] = React.useState(null);
  useDismissOutside(wrap, hover != null, () => setHover(null));

  if (!rows || rows.length === 0) return <div className="tl-chart" />;
  const P = { l: 58, r: 12, t: 14, b: 32 };
  const ih = Math.max(10, height - P.t - P.b);
  const n = rows.length;
  const vals = rows.map((r) => r[valueKey] || 0);
  const maxV = niceMax(Math.max(0, ...vals));
  // A signed series needs room below the baseline, and the baseline itself
  // has to sit where zero actually is.
  const minV = signed ? -niceMax(Math.abs(Math.min(0, ...vals))) : 0;
  const span = (maxV - minV) || 1;
  const ticks = signed ? [minV, 0, maxV] : [0, 0.5, 1].map((f) => maxV * f);
  // Reserve the y gutter from the widest tick label before anything measures
  // against it: Babel compiles const to var, so reading iw early yields NaN
  // rather than throwing, and every bar silently collapses.
  P.l = Math.max(48, Math.min(96, Math.max(...ticks.map((v) => String(fmtTick(v)).length)) * 6.6 + 16));
  const iw = Math.max(10, W - P.l - P.r);
  const slot = iw / Math.max(1, n);
  const barEvery = Math.max(1, Math.ceil(40 / Math.max(slot, 1)));
  const barLabel = (i) => i === n - 1 || (i % barEvery === 0 && (n - 1 - i) * slot >= 36);
  const bw = Math.max(6, Math.min(56, slot - 10));
  const yOf = (v) => P.t + ih - ((v - minV) / span) * ih;
  const zeroY = yOf(0);

  const onMove = (e) => {
    const r = wrap.current.getBoundingClientRect();
    const i = Math.floor((e.clientX - r.left - P.l) / (slot || 1));
    setHover(i >= 0 && i < n ? i : null);
  };

  return (
    <div className="tl-chart" ref={wrap} {...chartPointer(onMove, () => setHover(null))}>
      <svg width={W} height={height} role="img" aria-label="Revenue by year">
        {ticks.map((t, i) => (
          <g key={i}>
            <line className="tl-chart__grid" x1={P.l} x2={P.l + iw} y1={yOf(t)} y2={yOf(t)} />
            <text className="tl-chart__tick" x={P.l - 8} y={yOf(t) + 3.5} textAnchor="end">{fmtTick(t)}</text>
          </g>
        ))}
        <line className="tl-chart__axis" x1={P.l} x2={P.l + iw} y1={zeroY} y2={zeroY} />

        {rows.map((r, i) => {
          const v = r[valueKey] || 0;
          const neg = v < 0;
          const h = Math.abs(yOf(v) - zeroY);
          const bx = P.l + slot * i + (slot - bw) / 2;
          const by = neg ? zeroY : zeroY - h;
          return (
            <g key={i}>
              <path className="tl-chart__bar"
                    d={neg ? barPath(bx, by + h, bw, -h, -4) : barPath(bx, by, bw, h, 4)}
                    fill={neg ? negColor : color} opacity={hover == null || hover === i ? 1 : 0.55} />
              {barLabel(i) && <text className="tl-chart__tick" x={bx + bw / 2} y={height - 10}
                    textAnchor={i === 0 ? "start" : i === n - 1 ? "end" : "middle"}>{r[labelKey]}</text>}
            </g>
          );
        })}
      </svg>
      {hover != null && (
        <div className="tl-tip" style={{ left: Math.max(76, Math.min(W - 76, P.l + slot * hover + slot / 2)) + "px",
                                         top: Math.min(zeroY, yOf(rows[hover][valueKey] || 0)) + "px" }}>
          <span className="tl-tip__t">{rows[hover][labelKey]}</span>
          <span className="tl-tip__r">
            <span className="tl-tip__sw" style={{ background: (rows[hover][valueKey] || 0) < 0 ? negColor : color }} />
            {rows[hover].tipLabel || "Revenue"}<span className="tl-tip__v">{fmt(rows[hover][valueKey] || 0)}</span>
          </span>
        </div>
      )}
    </div>
  );
}

/* RoasSpectrum, profit per order as a function of ROAS.
   profit(R) = contribution − revenue/R, so the curve crosses zero exactly at
   break-even. Zones are coloured by meaning (loss / profitable / past target),
   which is a diverging job, not a categorical one. */
function RoasSpectrum({ revenue, contribution, breakeven, current, target, fmt, height: h0 = 226 }) {
  const wrap = React.useRef(null);
  const W = useWidth(wrap);
  // Phones stagger up to three labels, which needs more headroom above the curve.
  const height = h0 + (W < 500 ? 40 : 0);
  const [hover, setHover] = React.useState(null);
  useDismissOutside(wrap, hover != null, () => setHover(null));

  const P = { l: 16, r: 16, t: W < 500 ? 118 : 54, b: 34 };
  const iw = Math.max(10, W - P.l - P.r);
  const ih = Math.max(10, height - P.t - P.b);

  const hasT = isFinite(target) && target > 0;
  // The plotted range must always contain the markers, or "you" ends up drawn
  // outside the chart at extreme inputs.
  const xMin = Math.max(0.15, Math.min(breakeven * 0.55, current * 0.88));
  const xMax = Math.max(hasT ? target * 1.16 : 0, current * 1.22, breakeven * 1.7, xMin * 1.4);
  const profit = (R) => contribution - revenue / R;

  const yTop = profit(xMax);
  const yBot = Math.min(profit(xMin), -Math.abs(yTop) * 0.42);
  const x = (R) => P.l + Math.max(0, Math.min(1, (R - xMin) / ((xMax - xMin) || 1))) * iw;
  const y = (v) => P.t + ih - ((v - yBot) / ((yTop - yBot) || 1)) * ih;

  const N = 72;
  const pts = [];
  for (let i = 0; i <= N; i++) {
    const R = xMin + ((xMax - xMin) * i) / N;
    pts.push([R, x(R), y(profit(R))]);
  }
  const seg = (from, to) => {
    const sub = pts.filter((p) => p[0] >= from - 1e-9 && p[0] <= to + 1e-9);
    if (sub.length < 2) return "";
    return sub.map((p, i) => (i ? "L" : "M") + p[1].toFixed(1) + "," + p[2].toFixed(1)).join(" ");
  };

  const marks = [
    { R: breakeven, l: "BREAK-EVEN", v: breakeven.toFixed(2) + "×", c: "var(--fg-1, #0E1626)" },
    { R: current, l: "YOU", v: current.toFixed(2) + "×", c: "var(--c1)" },
  ];
  if (hasT) marks.push({ R: target, l: "TARGET", v: target.toFixed(2) + "×", c: "var(--c4)" });

  // "You" and "target" can sit a hundredth of a turn apart, which collides the
  // labels into mush. Stagger any marker whose neighbour is within 60px, and
  // nudge the anchor so the text clears the edges of the plot.
  marks.sort((a, b) => a.R - b.R);
  let lastX = -1e9, level = 0;
  marks.forEach((mk) => {
    const mx = x(mk.R);
    level = mx - lastX < (W < 500 ? 92 : 60) ? level + 1 : 0;
    mk.lift = 22 + level * (W < 500 ? 36 : 27);
    mk.anchor = mx < 46 ? "start" : mx > P.l + iw - 46 ? "end" : "middle";
    mk.dx = mk.anchor === "start" ? -4 : mk.anchor === "end" ? 4 : 0;
    lastX = mx;
  });

  const zone = (a, b, label, color) => {
    const cx = (x(Math.max(a, xMin)) + x(Math.min(b, xMax))) / 2;
    if (x(Math.min(b, xMax)) - x(Math.max(a, xMin)) < label.length * (W < 500 ? 9.2 : 7.5) + 16) return null;
    return <text className="tl-spec__zone" x={cx} y={P.t + ih + 20} textAnchor="middle" fill={color}>{label}</text>;
  };

  const onMove = (e) => {
    const r = wrap.current.getBoundingClientRect();
    const R = xMin + ((e.clientX - r.left - P.l) / (iw || 1)) * (xMax - xMin);
    setHover(R >= xMin && R <= xMax ? R : null);
  };

  return (
    <div className="tl-chart tl-spec" ref={wrap} {...chartPointer(onMove, () => setHover(null))}>
      <svg width={W} height={height} role="img"
           aria-label={"Profit per order across ROAS. Break-even at " + breakeven.toFixed(2) + " times; you are at " + current.toFixed(2) + " times."}>
        <defs>
          <linearGradient id="tlSpecLoss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--t-gap)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--t-gap)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="tlSpecOk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--c1)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--c1)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Zero line, the only reference value that matters here. */}
        <line className="tl-chart__grid" x1={P.l} x2={P.l + iw} y1={y(0)} y2={y(0)} />
        <text className="tl-chart__tick" x={P.l} y={y(0) - 6}>₹0 profit</text>

        <path d={seg(xMin, breakeven) + ` L${x(breakeven)},${y(0)} L${x(xMin)},${y(0)} Z`} fill="url(#tlSpecLoss)" />
        <path d={seg(breakeven, xMax) + ` L${x(xMax)},${y(0)} L${x(breakeven)},${y(0)} Z`} fill="url(#tlSpecOk)" />

        <path className="tl-chart__line" d={seg(xMin, breakeven)} stroke="var(--t-gap)" />
        <path className="tl-chart__line" d={seg(breakeven, hasT ? target : xMax)} stroke="var(--c1)" />
        {hasT && <path className="tl-chart__line" d={seg(target, xMax)} stroke="var(--c4)" />}

        {zone(xMin, breakeven, "LOSS", "var(--t-gap)")}
        {zone(breakeven, hasT ? target : xMax, "PROFITABLE", "var(--c1)")}
        {hasT && zone(target, xMax, "TARGET MARGIN", "var(--c4)")}

        {marks.map((mk) => (
          <g key={mk.l}>
            <line className="tl-chart__cross" x1={x(mk.R)} x2={x(mk.R)}
                  y1={Math.max(16, y(profit(mk.R)) - mk.lift + 17)} y2={P.t + ih} />
            <circle cx={x(mk.R)} cy={y(profit(mk.R))} r="6" fill="#fff" stroke={mk.c} strokeWidth="2.5" />
            <text className="tl-spec__v" x={x(mk.R) - mk.dx} y={Math.max(16, y(profit(mk.R)) - mk.lift)}
                  textAnchor={mk.anchor} fill={mk.c}>{mk.v}</text>
            <text className="tl-spec__l" x={x(mk.R) - mk.dx} y={Math.max(28, y(profit(mk.R)) - mk.lift + 13)}
                  textAnchor={mk.anchor} fill={mk.c}>{mk.l}</text>
          </g>
        ))}

        {hover != null && (
          <line className="tl-chart__cross" x1={x(hover)} x2={x(hover)} y1={P.t} y2={P.t + ih} />
        )}
      </svg>

      {hover != null && (
        <div className="tl-tip" style={{ left: Math.max(76, Math.min(W - 76, x(hover))) + "px", top: (P.t + 2) + "px" }}>
          <span className="tl-tip__t">At {hover.toFixed(2)}× ROAS</span>
          <span className="tl-tip__r">
            Profit / order<span className="tl-tip__v">{fmt(profit(hover))}</span>
          </span>
        </div>
      )}
    </div>
  );
}

/* 100% composition bar + legend. Direct value labels in the legend are the
   required relief for the sub-3:1 slots. */
function CompositionBar({ parts, total, fmt }) {
  if (!parts || !parts.length) return null;
  const t = total || parts.reduce((a, p) => a + Math.max(0, p.value), 0) || 1;
  return (
    <div>
      <div className="tl-comp" role="img" aria-label="Composition of one rupee of revenue">
        {parts.map((p, i) => (
          <span key={p.name} className="tl-comp__seg"
                title={p.name + " " + fmt(p.value)}
                style={{ width: (Math.max(0, p.value) / t) * 100 + "%", background: p.color || SERIES[i] }} />
        ))}
      </div>
      <div className="tl-legend">
        {parts.map((p, i) => (
          <span className="tl-legend__i" key={p.name}>
            <span className="tl-legend__sw" style={{ background: p.color || SERIES[i] }} />
            {p.name}
            <span className="tl-legend__v">{fmt(p.value)} · {((Math.max(0, p.value) / t) * 100).toFixed(1)}%</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* Collapsible table, the accessible counterpart to every chart above. */
function TableView({ summary, head, rows }) {
  return (
    <details className="tl-details">
      <summary>{summary}</summary>
      <div className="tl-details__body">
        <div className="tl-tablewrap">
          <table className="tl-table">
            <thead><tr>{head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className={r.total ? "is-total" : ""}>
                  {r.cells.map((c, j) => (
                    <td key={j} className={c.tone ? "num-" + c.tone : ""}>{c.v != null ? c.v : c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </details>
  );
}

/* ── Page shell ─────────────────────────────────────────────── */

const TOOLS = SITE_TOOLS.map((t) => ({ slug: t.href, name: t.short, blurb: t.blurb }));

/* ── FAQ ────────────────────────────────────────────────────────
   Every calculator page ships FAQPage JSON-LD in its <head>. Google requires
   that markup to describe Q&A a visitor can actually read, so this renders the
   same three items into the DOM. The strings are passed straight through, never
   re-wrapped or re-worded, so the visible text and the structured data stay
   identical character for character; if the copy changes, change it in both.

   It lives at the foot of the page, below the results and above the
   cross-links, so it never pushes the calculator off the first screen. First
   item open, the rest collapsed, matching the .tl-details accordion grammar
   used by every table view above it. */
function ToolFAQ({ items, heading }) {
  if (!items || !items.length) return null;
  return (
    <section className="tl-faq" aria-labelledby="tl-faq-h">
      <div className="tl-wrap">
        <h2 className="tl-faq__h" id="tl-faq-h">
          {heading || "Questions this calculator answers"}
        </h2>
        <div className="mmc-faq">
          {items.map((it, i) => (
            <details key={it.q} open={i === 0}>
              <summary>{it.q}</summary>
              <div className="mmc-faq__a"><p>{it.a}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolCrossLinks({ current }) {
  const others = TOOLS.filter((t) => t.slug !== current);
  return (
    <div className="tl-cross">
      <span className="tl-cross__lead">More free tools</span>
      <div className="tl-cross__grid">
        {others.map((t) => (
          <a className="tl-cross__card" href={t.slug} key={t.slug}>
            <span className="tl-cross__name">{t.name}<span className="tl-cross__arr" aria-hidden="true"></span></span>
            <span className="tl-cross__blurb">{t.blurb}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* The closing call-to-action is now the shared PreFooterCta rendered by each tool page (src/components/shared).
   Kept as a no-op so the existing <ToolCTA line=... /> call sites in the calculators render nothing. */
function ToolCTA() {
  return null;
}

/* The explanatory copy the hero used to carry. Sits under the calculator so the
   tool itself owns the first screen. */
function ToolLede({ children }) {
  return <p className="tl-lede__p">{children}</p>;
}

const mmcTools = {
  inr, inrCompact, inrSigned, ratio, num, pct, rate, ExampleTag, ResultsNote,
  Field, InfoDot,
  TOOLS, ToolCrossLinks, ToolCTA, ToolLede, ToolFAQ,
  SERIES, useWidth, niceMax, LineChart, ColumnChart, CompositionBar, TableView,
  Ctl, Meter, BigAnswer, Fact, Wins, Rows,
  useToolState, encodeToolState, ToolActions, ReportCover, ReportFooter, RoasSpectrum
};

export { mmcTools };
