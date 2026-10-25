import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { compute, encodeState, decodeState, quoteText, fmtMoney } from "../../lib/pricing-calc.mjs";
import { SectionCard } from "./Parts.jsx";
import { Summary, QuoteDialog, PrintDoc } from "./Summary.jsx";

/* Interactive pricing configurator. The only data it knows is the audience payload it is given as props
   (built at build time by src/lib/pricing.mjs), so a page can never show another audience's prices. */

const EMPTY = { sel: {}, cycle: "q" };

export default function PricingConfigurator({ data }) {
  const [cur, setCur] = useState(data.curs[0]);
  const [st, setSt] = useState(EMPTY);
  const [stage, setStage] = useState(data.stages[0].id);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [dlg, setDlg] = useState(false);
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState(false);
  const [link, setLink] = useState("");
  const toolRef = useRef(null);

  const items = useMemo(() => {
    const m = {};
    data.sections.forEach((s) => s.items.forEach((it) => (m[it.id] = it)));
    return m;
  }, [data]);

  // Restore a shared selection from the URL hash (works with no server).
  useEffect(() => {
    const d = decodeState(window.location.hash, data);
    if (Object.keys(d.sel).length || d.cycle !== "q") setSt({ sel: d.sel, cycle: d.cycle });
    if (d.cur) setCur(d.cur);
    setReady(true);
  }, [data]);

  // Keep the hash in step with the selection.
  useEffect(() => {
    if (!ready) return;
    const h = encodeState(st, cur, data.multi);
    try { window.history.replaceState(null, "", window.location.pathname + window.location.search + h); } catch (e) {}
    setLink(window.location.origin + window.location.pathname + window.location.search + h);
  }, [st, cur, ready, data.multi]);

  // Open every terms accordion while printing, then put them back.
  useEffect(() => {
    let saved = [];
    const before = () => {
      const ds = Array.from(document.querySelectorAll(".pc-terms details"));
      saved = ds.map((d) => d.open);
      ds.forEach((d) => (d.open = true));
    };
    const after = () => Array.from(document.querySelectorAll(".pc-terms details")).forEach((d, i) => (d.open = !!saved[i]));
    window.addEventListener("beforeprint", before);
    window.addEventListener("afterprint", after);
    return () => { window.removeEventListener("beforeprint", before); window.removeEventListener("afterprint", after); };
  }, []);

  const res = useMemo(() => compute(data, st, cur), [data, st, cur]);

  const setQ = useCallback((it, q) => {
    setSt((s) => {
      const sel = { ...s.sel };
      if (!(q > 0)) delete sel[it.id];
      else {
        const prev = sel[it.id] || {};
        const e = { ...prev, q };
        if (it.creators && !e.n) e.n = 1;
        if (it.pieces && !e.n) e.n = 1;
        sel[it.id] = e;
        if (it.group && data.exclusive.includes(it.group)) {
          Object.values(items).forEach((o) => { if (o.id !== it.id && o.group === it.group) delete sel[o.id]; });
        }
      }
      return { ...s, sel };
    });
  }, [data, items]);

  const setExtra = useCallback((it, key, v) => {
    setSt((s) => {
      const prev = s.sel[it.id];
      if (!prev) return s;
      return { ...s, sel: { ...s.sel, [it.id]: { ...prev, [key]: v } } };
    });
  }, []);

  const remove = useCallback((id) => {
    setSt((s) => {
      const sel = { ...s.sel };
      delete sel[id];
      return { ...s, sel };
    });
  }, []);

  const applyPreset = (p) => {
    const sel = {};
    for (const [id, v] of Object.entries(p.sel)) {
      const it = items[id];
      if (!it) continue;
      const q = typeof v.q === "object" ? v.q[cur] : v.q;
      if (!(q > 0)) continue;
      sel[id] = { q, s: 0, n: it.creators || it.pieces ? 1 : 0 };
    }
    setSt({ sel, cycle: p.cycle || "q" });
    setQuery("");
    const first = Object.keys(sel)[0];
    if (first) {
      const sec = data.sections.find((s) => s.items.some((i) => i.id === first));
      if (sec) setStage(sec.stage);
    }
    announce("Started from " + p.name + ".");
  };

  const [msg, setMsg] = useState("");
  const announce = (m) => { setMsg(m); setTimeout(() => setMsg(""), 2500); };

  const reset = () => { setSt(EMPTY); announce("Estimate cleared."); };

  const copy = async () => {
    const url = window.location.origin + window.location.pathname + window.location.search + encodeState(st, cur, data.multi);
    let ok = false;
    try { await navigator.clipboard.writeText(url); ok = true; } catch (e) {}
    if (!ok) {
      try {
        const ta = document.createElement("textarea");
        ta.value = url; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select(); ok = document.execCommand("copy"); ta.remove();
      } catch (e) {}
    }
    if (!ok) window.prompt("Copy this link", url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const print = () => window.print();

  const onSent = (d, r) => {
    setDlg(false);
    if (window.MMCForms && window.MMCForms.goThanks) window.MMCForms.goThanks("brief", r, d);
    else window.location.assign("/thank-you/");
  };

  const date = () => new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const getText = () => quoteText(data, res, cur, link, date());

  // Which sections to show
  const q = query.trim().toLowerCase();
  const matches = (s) => !q || (s.title + " " + s.blurb).toLowerCase().includes(q) || s.items.some((i) => (i.name + " " + (i.detail || "") + " " + i.unit).toLowerCase().includes(q));
  const visible = data.sections.filter((s) => (q ? true : s.stage === stage) && matches(s));
  const countBy = (sid) => res.lines.filter((l) => l.stage === sid && l.kind !== "discount").length;

  const onTabKey = (e, i) => {
    const n = data.stages.length;
    let j = -1;
    if (e.key === "ArrowRight") j = (i + 1) % n;
    if (e.key === "ArrowLeft") j = (i - 1 + n) % n;
    if (e.key === "Home") j = 0;
    if (e.key === "End") j = n - 1;
    if (j >= 0) {
      e.preventDefault();
      setStage(data.stages[j].id);
      const el = toolRef.current && toolRef.current.querySelector("#pc-tab-" + data.stages[j].id);
      if (el) el.focus();
    }
  };

  return (
    <div className="pc-tool" ref={toolRef}>
      <div className="pc-start">
        <div className="pc-start__t">
          <h2 className="pc-h2">Build your estimate</h2>
          <p className="pc-start__p">Start from a common set of lines, or pick your own below. You can change everything afterwards.</p>
        </div>
        <ul className="pc-presets">
          {data.presets.map((p) => (
            <li key={p.id}>
              <button type="button" className="pc-preset" onClick={() => applyPreset(p)}>
                {p.recommended && <span className="pc-preset__rec">Recommended starting point</span>}
                <span className="pc-preset__n">{p.name}</span>
                <span className="pc-preset__b">{p.blurb}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="pc-bar">
        <div className="pc-tabs" role="tablist" aria-label="Stage">
          {data.stages.map((s, i) => {
            const on = !q && stage === s.id;
            const n = countBy(s.id);
            return (
              <button key={s.id} type="button" role="tab" id={"pc-tab-" + s.id} aria-selected={on} aria-controls="pc-panel" tabIndex={on || (q && i === 0) ? 0 : -1} className={"pc-tab" + (on ? " is-on" : "")} onClick={() => { setQuery(""); setStage(s.id); }} onKeyDown={(e) => onTabKey(e, i)}>
                <span className="pc-tab__n">{s.n}</span>
                <span className="pc-tab__t">{s.name}</span>
                {n > 0 && <span className="pc-tab__c" aria-label={n + " selected"}>{n}</span>}
              </button>
            );
          })}
        </div>
        <label className="pc-search">
          <span className="pc-sr">Search the rate card</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          <input type="search" placeholder="Search services" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        {data.multi && (
          <div className="pc-cur" role="radiogroup" aria-label="Currency">
            {data.curs.map((k) => (
              <button key={k} type="button" role="radio" aria-checked={cur === k} className={"pc-cur__b" + (cur === k ? " is-on" : "")} onClick={() => setCur(k)}>
                {data.cfg[k].short}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="pc-layout">
        <div className="pc-main" id="pc-panel" role="tabpanel" aria-labelledby={"pc-tab-" + stage}>
          {!q && (
            <div className="pc-stage-intro">
              <h2 className="pc-h2 pc-h2--sm">{data.stages.find((s) => s.id === stage).n}. {data.stages.find((s) => s.id === stage).name}</h2>
              <p>{data.stages.find((s) => s.id === stage).purpose} <span className="pc-muted">{data.stages.find((s) => s.id === stage).billing}.</span></p>
              {stage === "grow" && res.total.monthly > 0 && (
                <p className="pc-growtot" aria-live="polite">
                  <span>Monthly total <strong>{fmtMoney(res.total.monthly, data.cfg[cur])}</strong></span>
                  <span>3-month minimum commitment <strong>{fmtMoney(res.total.commit, data.cfg[cur])}</strong></span>
                </p>
              )}
            </div>
          )}
          {q && <p className="pc-stage-intro pc-muted">{visible.length === 0 ? "No services match that search." : visible.length + (visible.length === 1 ? " section matches" : " sections match") + " \"" + query + "\"."}</p>}
          {visible.map((s) => (
            <SectionCard key={s.id} id={"pc-s-" + s.id} s={s} data={data} cur={cur} st={st} res={res} onQ={setQ} onExtra={setExtra} onCycle={(cy) => setSt((x) => ({ ...x, cycle: cy }))} />
          ))}
          <p className="pc-excl-line">{data.taxShort} Ad spend, platform and API charges, software subscriptions, hosting and theme costs are pass-through and billed at actuals unless a line says otherwise.</p>
        </div>
        <Summary data={data} res={res} cur={cur} open={open} onToggle={() => setOpen(!open)} onRemove={remove} onReset={reset} onCopy={copy} onPrint={print} onRequest={() => setDlg(true)} copied={copied} />
      </div>
      <p className="pc-sr" role="status" aria-live="polite">{msg}</p>
      <QuoteDialog data={data} cur={cur} res={res} open={dlg} onClose={() => setDlg(false)} onSent={onSent} getLink={() => link} getText={getText} />
      <PrintDoc data={data} res={res} cur={cur} link={link} />
    </div>
  );
}
