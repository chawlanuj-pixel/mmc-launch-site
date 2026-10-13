// Client-safe pricing maths and text helpers, shared by the Astro page (build time) and the React island (browser).
// Pure: it never imports the rate card. Every number it uses arrives in the audience payload built by pricing.mjs.
// Currency symbols and locales also arrive in the payload, so this file holds no currency literals.

/** Money text: fmtMoney(75000, {sym:"Rs.", locale:"en-IN"}) -> "Rs.75,000". Keeps up to 2 decimals only when needed. */
export function fmtMoney(v, c) {
  if (v === null || v === undefined || !isFinite(v)) return "-";
  const neg = v < 0 ? "-" : "";
  const a = Math.abs(v);
  const frac = Math.abs(a - Math.round(a)) > 0.0049;
  const s = a.toLocaleString(c.locale, { minimumFractionDigits: frac ? 2 : 0, maximumFractionDigits: 2 });
  return neg + c.sym + s;
}

export function fmtNum(v, locale) {
  return Number(v).toLocaleString(locale || "en-IN", { maximumFractionDigits: 2 });
}

/** Fills {{token}} placeholders. With a currency, one value; without (white-label static HTML), every currency joined. */
export function fillTokens(text, tokens, cfg, cur) {
  if (!text || text.indexOf("{{") < 0) return text;
  return text.replace(/\{\{(\w+)\}\}/g, (m, k) => {
    const t = tokens && tokens[k];
    if (!t) return "";
    if (cur) return t[cur] === undefined ? "" : fmtMoney(t[cur], cfg[cur]);
    return Object.keys(t).map((x) => fmtMoney(t[x], cfg[x])).join(" / ");
  });
}

/** One readable price for a rate-card line in one currency. */
export function priceText(it, cur, cfg) {
  const c = cfg[cur];
  const p = it.pr[cur];
  if (!p) return "";
  const m = (v) => fmtMoney(v, c);
  switch (it.kind) {
    case "from": return "from " + m(p.p);
    case "upto": return "up to " + m(p.p);
    case "plus": return "plus " + m(p.p);
    case "range": return m(p.p) + " to " + m(p.pMax);
    case "perword": return m(p.p) + " per word, minimum " + m(p.minPiece) + " per piece";
    case "pctspend": return p.pct + "% of the spend above " + m(it.thresholdFor[cur]) + " per channel";
    case "pctfee": return p.pct + "% of the influencer fee, minimum " + m(p.min) + " per creator";
    default: return m(p.p);
  }
}

/** Same, across every currency the audience may see ("Rs.X / $Y" on the white-label page). */
export function priceTextAll(it, curs, cfg) {
  return curs.map((x) => priceText(it, x, cfg)).join(" / ");
}

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const num = (v) => (isFinite(+v) ? +v : 0);

/** Which Grow-stage lines recur monthly, which are cycle-billed (maintenance), the rest are one-time. */
export function compute(data, st, cur) {
  const cfg = data.cfg;
  const c = cfg[cur];
  const sel = st.sel || {};
  const lines = [];
  const warnings = [];
  const flat = [];
  data.sections.forEach((s) => s.items.forEach((it) => flat.push({ s, it })));
  const byId = {};
  flat.forEach(({ it }) => (byId[it.id] = it));

  const get = (id) => sel[id] || { q: 0 };
  let auditCount = 0;
  let auditGross = 0;
  let auditPct = 0;

  for (const { s, it } of flat) {
    const e = get(it.id);
    const q = clamp(num(e.q), 0, it.qty.max);
    if (q <= 0) continue;
    const p = it.pr[cur];
    if (!p) continue;
    let amount = 0;
    let qtyText = "";
    const notes = [];
    const warn = [];
    let rec = it.rec;

    if (it.kind === "pctspend") {
      const ch = it.partner ? clamp(num(get(it.partner).q), 0, 10000) : 0;
      const T = it.thresholdFor[cur];
      if (ch < 1) {
        warn.push("Add at least one channel above, then the spend per channel can be worked out.");
      } else {
        const per = q / ch;
        const over = Math.max(0, per - T);
        amount = (ch * over * p.pct) / 100;
        qtyText = fmtMoney(q, c) + " a month across " + ch + (ch === 1 ? " channel" : " channels");
        notes.push(
          over > 0
            ? "About " + fmtMoney(per, c) + " per channel, " + fmtMoney(over, c) + " above the " + fmtMoney(T, c) + " threshold, at " + p.pct + "%."
            : "About " + fmtMoney(per, c) + " per channel, within the " + fmtMoney(T, c) + " threshold, so no spend-linked fee."
        );
      }
    } else if (it.kind === "pctfee") {
      const n = Math.max(0, Math.floor(num(e.n)));
      const pctPart = (q * p.pct) / 100;
      const minPart = n * p.min;
      amount = n > 0 ? Math.max(pctPart, minPart) : pctPart;
      qtyText = fmtMoney(q, c) + " of influencer fees" + (n > 0 ? ", " + n + (n === 1 ? " creator" : " creators") : "");
      if (n < 1) warn.push("Enter the number of creators: the minimum fee per creator applies.");
      else notes.push(minPart > pctPart ? "The minimum of " + fmtMoney(p.min, c) + " per creator is higher than " + p.pct + "% of the fees, so the minimum applies." : p.pct + "% of the influencer fees is higher than the per-creator minimum.");
      const mp = s.minProject && s.minProject[cur];
      if (mp && q < mp) warn.push("Below the minimum paid-campaign project size of " + fmtMoney(mp, c) + ". MMC does not service below this.");
    } else if (it.kind === "perword") {
      const n = Math.max(1, Math.floor(num(e.n) || 1));
      amount = Math.max(q * p.p, n * p.minPiece);
      qtyText = fmtNum(q, c.locale) + " words, " + n + (n === 1 ? " piece" : " pieces");
      if (q * p.p < n * p.minPiece) notes.push("The minimum of " + fmtMoney(p.minPiece, c) + " per piece applies (" + n + " " + (n === 1 ? "piece" : "pieces") + ").");
    } else if (it.pctSpend) {
      const sp = Math.max(0, num(e.s));
      const base = q * p.p;
      const share = (sp * it.pctSpend) / 100;
      amount = Math.max(base, share);
      qtyText = q + (q === 1 ? " article" : " articles") + (sp > 0 ? ", PR spend " + fmtMoney(sp, c) : "");
      notes.push(share > base ? it.pctSpend + "% of the PR spend is higher than the fixed fee, so it applies." : "Fixed fee applies. It becomes " + it.pctSpend + "% of PR spend when that is higher.");
    } else if (it.minQty) {
      const billed = Math.max(q, it.minQty);
      amount = Math.max(billed * p.p, p.minProgramme || 0);
      qtyText = q + " influencers";
      if (q < it.minQty) warn.push("Minimum " + it.minQty + " influencers. Billed at the " + it.minQty + "-influencer minimum programme of " + fmtMoney(p.minProgramme, c) + ".");
    } else {
      amount = q * p.p;
      qtyText = it.qty.max === 1 ? "" : fmtNum(q, c.locale) + " \u00d7 " + fmtMoney(p.p, c);
      if (it.revShare) {
        const rev = Math.max(0, num(e.s));
        if (rev > 0) {
          const share = (rev * it.revShare) / 100;
          amount += share;
          notes.push("Includes " + it.revShare + "% of " + fmtMoney(rev, c) + " marketplace sales, " + fmtMoney(share, c) + ".");
        } else notes.push("Plus " + it.revShare + "% of marketplace sales revenue, charged on actuals.");
      }
      if (it.kind === "range") notes.push("Estimate uses the lower figure. The range runs up to " + fmtMoney(p.pMax, c) + ".");
      if (it.kind === "upto") notes.push("Priced up to this figure, set by the scope.");
      if (it.kind === "from") notes.push("Starting price. The final fee is set in the proposal.");
    }
    if (it.group === "audit") {
      auditCount += q;
      auditGross += amount;
      auditPct = (data.bundle && data.bundle[cur]) || 0;
    }
    lines.push({ id: it.id, sid: s.id, stage: s.stage, name: it.name, qtyText: qtyText.trim(), amount, rec, notes, warn, audit: it.group === "audit", kind: it.kind });
    warn.forEach((w) => warnings.push({ id: it.id, text: w }));
  }

  // SEO minimum
  for (const s of data.sections) {
    if (!s.minTotalQty) continue;
    const tot = s.minTotalQty.ids.reduce((a, id) => a + clamp(num(get(id).q), 0, 10000), 0);
    if (tot > 0 && tot < s.minTotalQty.min) {
      const text = s.minTotalQty.message + " You have " + tot + ".";
      warnings.push({ id: s.minTotalQty.ids[0], text });
      lines.filter((l) => s.minTotalQty.ids.includes(l.id)).forEach((l) => l.warn.push(text));
    }
  }
  // Email above the included volume is quoted on request.
  // Audit bundle
  let auditDiscount = 0;
  if (auditCount >= 2 && auditPct > 0) {
    auditDiscount = (auditGross * auditPct) / 100;
    lines.push({ id: "audit-bundle", sid: "audits", stage: "diagnose", name: "Audit bundle discount (" + auditPct + "% off the combined price)", qtyText: "", amount: -auditDiscount, rec: "once", notes: [], warn: [], audit: true, kind: "discount" });
  }

  const sum = (f) => lines.filter(f).reduce((a, l) => a + l.amount, 0);
  const oneTime = sum((l) => l.rec === "once");
  const monthly = sum((l) => l.rec === "monthly");
  const mntMonthly = sum((l) => l.rec === "cycle");
  const cycle = (data.cycles || []).find((x) => x.id === st.cycle) || (data.cycles || [])[0] || { months: 3, label: "" };
  const mntCycleTotal = mntMonthly * cycle.months;
  const auditNet = sum((l) => l.audit && l.rec === "once");
  const projects = oneTime - auditNet;
  const first = {
    audits: auditNet,
    projects: projects * 0.5,
    retainer: monthly,
    maintenance: mntCycleTotal,
  };
  first.total = first.audits + first.projects + first.retainer + first.maintenance;
  const total = {
    oneTime, monthly, mntMonthly, mntCycleTotal, cycle,
    commit: monthly * 3,
    first,
    projectsAfter: projects * 0.5,
    count: lines.filter((l) => l.kind !== "discount").length,
  };
  // Sections touched (for the excluded-costs hint)
  const touched = {};
  lines.forEach((l) => (touched[l.sid] = true));
  const emailIds = ["email-base"];
  const emailOver = emailIds.some((id) => get(id).q > 0);
  return { lines, warnings, total, touched, emailOver };
}

/* ── Share link (hash) ───────────────────────────────────────────────────── */

/** #v1/id=q,s,n/id=q/cy=h/cur=usd  (no server, no price in it) */
export function encodeState(st, cur, multi) {
  const parts = ["v1"];
  const sel = st.sel || {};
  for (const id of Object.keys(sel)) {
    const e = sel[id];
    if (!(e.q > 0)) continue;
    const arr = [e.q];
    if (e.s || e.n) arr.push(e.s || 0);
    if (e.n) arr.push(e.n);
    parts.push(id + "=" + arr.join(","));
  }
  if (st.cycle && st.cycle !== "q") parts.push("cy=" + st.cycle);
  if (multi && cur) parts.push("cur=" + cur);
  return parts.length > 1 ? "#" + parts.join("/") : "";
}

export function decodeState(hash, data) {
  const out = { sel: {}, cycle: "q", cur: null };
  if (!hash || hash.charAt(0) !== "#") return out;
  const parts = hash.slice(1).split("/");
  if (parts[0] !== "v1") return out;
  const items = {};
  data.sections.forEach((s) => s.items.forEach((it) => (items[it.id] = it)));
  for (const part of parts.slice(1)) {
    const i = part.indexOf("=");
    if (i < 1) continue;
    const k = part.slice(0, i);
    const v = part.slice(i + 1);
    if (k === "cy") { if ((data.cycles || []).some((c) => c.id === v)) out.cycle = v; continue; }
    if (k === "cur") { if (data.curs.includes(v)) out.cur = v; continue; }
    const it = items[k];
    if (!it) continue;
    const n = v.split(",").map((x) => +x);
    const q = clamp(isFinite(n[0]) ? n[0] : 0, 0, it.qty.max);
    if (q > 0) out.sel[k] = { q, s: isFinite(n[1]) && n[1] > 0 ? n[1] : 0, n: isFinite(n[2]) && n[2] > 0 ? Math.floor(n[2]) : 0 };
  }
  // exclusive groups: keep the first one only
  const seen = {};
  for (const id of Object.keys(out.sel)) {
    const g = items[id].group;
    if (g && data.exclusive.includes(g)) {
      if (seen[g]) delete out.sel[id]; else seen[g] = id;
    }
  }
  return out;
}

/** Human-readable quote text for the request form and the clipboard. */
export function quoteText(data, res, cur, link, fmtDate) {
  const c = data.cfg[cur];
  const m = (v) => fmtMoney(v, c);
  const L = [];
  L.push(data.title + ", " + data.audienceLabel + ", version " + data.version + ", effective " + data.effective);
  L.push("Prepared " + fmtDate + ". Currency: " + c.name + ". " + data.taxShort);
  L.push("");
  res.lines.forEach((l) => {
    const tag = l.rec === "monthly" ? " per month" : l.rec === "cycle" ? " per month" : "";
    L.push("- " + l.name + (l.qtyText ? " (" + l.qtyText + ")" : "") + ": " + m(l.amount) + tag);
  });
  L.push("");
  const t = res.total;
  L.push("One-time total: " + m(t.oneTime));
  L.push("Monthly retainer: " + m(t.monthly) + (t.monthly > 0 ? " (3-month minimum commitment " + m(t.commit) + ")" : ""));
  if (t.mntMonthly > 0) L.push("Website maintenance: " + m(t.mntMonthly) + " per month, billed " + t.cycle.label.toLowerCase() + " in advance: " + m(t.mntCycleTotal));
  L.push("Estimated first invoice: " + m(t.first.total));
  L.push("Indicative estimate. The signed proposal or statement of work governs.");
  if (link) { L.push(""); L.push("Link: " + link); }
  return L.join("\n");
}
