// Build-time pricing module. Pure: reads the rate card, internal man-hours and margin config, and returns one
// audience's payload. Nothing here may be imported by the browser bundle (it pulls in the rate card and the hours).
//
// Audiences:
//   india         INR list prices only (as the owner wrote them).
//   international USD list prices only.
//   whitelabel    computed agency prices only (INR and USD); no client-facing list price is passed on.
//
// Hours and margin settings are used here and in tools/pricing-margin-check.mjs, and are never put in a payload.
import card from "../data/pricing/rate-card.json" with { type: "json" };
import hoursFile from "../data/pricing/internal-man-hours.json" with { type: "json" };
import margin from "../data/pricing/margin-config.json" with { type: "json" };
import linksFile from "../data/pricing/links.json" with { type: "json" };

const HOURS = hoursFile.hours;
const FX = margin.fxInrPerUsd;
const FLOOR_INR = margin.minYieldInrPerHour;
// One rupee cost floor for every audience; a dollar price is tested at price x FX against it.
const FLOOR = { inr: FLOOR_INR, usd: FLOOR_INR / FX };
const YIELD_TO_INR = { inr: 1, usd: FX };
// Owner price decisions (see V2-PRICING-DECISIONS.md) replace named client list prices, and so the white-label base.
for (const sec of card.sections) for (const it of sec.items) {
  const o = margin.clientPriceOverrides && margin.clientPriceOverrides[it.id];
  if (o) Object.assign(it, o);
}
const FACTORS = { inr: margin.whiteLabelFactorInr ?? margin.whiteLabelFactor, usd: margin.whiteLabelFactorUsd ?? margin.whiteLabelFactor };
const ENFORCE = !!margin.enforceFloorOnClientPrices;
const EQUIPMENT = new Set(margin.excludeFromYield || ["shoot-camera", "shoot-light"]);
const EXCLUSIVE_GROUPS = ["webtier", "logo", "retplat", "soctier", "mnt"];

export const config = { floor: FLOOR, floorInr: FLOOR_INR, fx: FX, factors: FACTORS, enforce: ENFORCE, overrides: margin.clientPriceOverrides || {}, excluded: [...EQUIPMENT] };

/* ── Rounding ────────────────────────────────────────────────────────────── */
const round2 = (v) => Math.round(v * 100) / 100;
const ceil2 = (v) => Math.ceil(v * 100 - 1e-9) / 100;
function roundClean(v, cur) {
  if (cur === "inr") return v < 1000 ? Math.round(v / 10) * 10 : Math.round(v / 50) * 50;
  return Math.round(v);
}
function ceilClean(v, cur) {
  if (cur === "inr") return v < 1000 ? Math.ceil(v / 10 - 1e-9) * 10 : Math.ceil(v / 50 - 1e-9) * 50;
  return Math.ceil(v - 1e-9);
}

/* ── Single-value price rules ────────────────────────────────────────────── */

/** White-label price for one number. Returns { price, status, discountPct } with status ok | raised | thin | none. */
export function wlValue(list, hours, cur, opts = {}) {
  const perword = !!opts.perword;
  if (!(hours > 0) || opts.equipment) {
    if (!(hours > 0) && !opts.equipment) return { price: list, status: "none", discountPct: 0 };
    const p = Math.min(list, perword ? round2(list * FACTORS[cur]) : roundClean(list * FACTORS[cur], cur));
    return { price: p, status: "none", discountPct: (1 - p / list) * 100 };
  }
  let p = perword ? round2(list * FACTORS[cur]) : roundClean(list * FACTORS[cur], cur);
  if (p > list) p = list;
  const need = FLOOR[cur] * hours;
  let status = "ok";
  if (p < need - 1e-9) {
    if (list < need - 1e-9) {
      p = list;
      status = "thin";
    } else {
      const up = perword ? ceil2(need) : ceilClean(need, cur);
      p = Math.min(list, up);
      status = "raised";
    }
  }
  return { price: p, status, discountPct: (1 - p / list) * 100 };
}

/** Client-facing price for one number: the list price, unless enforceFloorOnClientPrices is on. */
export function clientValue(list, hours, cur, opts = {}) {
  if (!ENFORCE || !(hours > 0) || opts.equipment) return { price: list, status: "ok" };
  const need = FLOOR[cur] * hours;
  if (list >= need - 1e-9) return { price: list, status: "ok" };
  const up = opts.perword ? ceil2(need) : ceilClean(need, cur);
  return { price: up, status: "raised" };
}

export const yieldPerHour = (price, hours) => (hours > 0 ? price / hours : null);

/* ── Line-level pricing (used by payloads and by the margin tool) ───────── */

function curSet(aud) {
  return aud === "india" || aud === "whitelabelIndia" ? ["inr"] : ["usd"];
}

/** Prices of one rate-card item in one currency for one mode ("client" | "wl"). */
function priceItem(it, cur, mode) {
  const hours = HOURS[it.id];
  const equipment = EQUIPMENT.has(it.id);
  const perword = it.kind === "perword";
  const f = (list, extra = {}) => (mode === "wl" ? wlValue(list, hours, cur, { perword, equipment, ...extra }) : clientValue(list, hours, cur, { perword, equipment, ...extra }));
  const out = {};
  const status = [];
  if (typeof it[cur] === "number") {
    const r = f(it[cur]);
    out.p = r.price;
    status.push(r.status);
    out._disc = (1 - r.price / it[cur]) * 100;
    if (typeof it[cur + "Max"] === "number") {
      const rm = mode === "wl" ? Math.max(r.price, Math.min(it[cur + "Max"], roundClean(it[cur + "Max"] * FACTORS[cur], cur))) : it[cur + "Max"];
      out.pMax = rm;
    }
  }
  if (it.min) {
    const r = f(it.min[cur]);
    out.min = r.price;
    status.push(r.status);
  }
  if (it.minPiece) {
    out.minPiece = mode === "wl" ? Math.min(it.minPiece[cur], roundClean(it.minPiece[cur] * FACTORS[cur], cur)) : it.minPiece[cur];
  }
  if (it.pct) out.pct = it.pct[cur];
  if (it.threshold) out.threshold = it.threshold[cur];
  if (it.minProgramme) {
    out.minProgramme = mode === "wl" ? Math.min(it.minProgramme[cur], (it.minQty || 1) * out.p) : it.minProgramme[cur];
  }
  out._status = status.includes("thin") ? "thin" : status.includes("raised") ? "raised" : "ok";
  return out;
}

function flatItems() {
  const out = [];
  card.sections.forEach((s) => s.items.forEach((it) => out.push({ s, it })));
  return out;
}

/** Every line, both modes, both currencies, with hours and yields. Used by the margin tool; never shipped. */
export function analyse() {
  const rows = [];
  for (const { s, it } of flatItems()) {
    const hours = HOURS[it.id] ?? null;
    const row = { id: it.id, section: s.id, name: it.name, unit: it.unit, hours, equipment: EQUIPMENT.has(it.id), kind: it.kind, list: {}, client: {}, wl: {}, yieldClient: {}, yieldWl: {}, statusClient: {}, statusWl: {}, discount: {} };
    for (const cur of ["inr", "usd"]) {
      const base = typeof it[cur] === "number" ? it[cur] : it.min ? it.min[cur] : null;
      const isMin = !(typeof it[cur] === "number") && !!it.min;
      const pc = priceItem(it, cur, "client");
      const pw = priceItem(it, cur, "wl");
      const cv = isMin ? pc.min : pc.p;
      const wv = isMin ? pw.min : pw.p;
      row.list[cur] = base;
      row.client[cur] = cv ?? null;
      row.wl[cur] = wv ?? null;
      const check = hours > 0 && !row.equipment && base !== null;
      // Client status is judged on the LIST price (that is what the owner publishes), even when enforcement raised it.
      const listYield = check ? base / hours : null;
      row.yieldClient[cur] = check ? (cv / hours) * YIELD_TO_INR[cur] : null;
      row.yieldWl[cur] = check ? (wv / hours) * YIELD_TO_INR[cur] : null;
      row.statusClient[cur] = !check ? "n/a" : listYield < FLOOR[cur] - 1e-9 ? (ENFORCE ? "RAISED" : "THIN") : "ok";
      row.statusWl[cur] = !check ? "n/a" : pw._status === "thin" ? "THIN" : pw._status === "raised" ? "RAISED" : "ok";
      row.discount[cur] = base ? (1 - wv / base) * 100 : null;
      row.suggest ||= {};
      row.suggest[cur] = check && listYield < FLOOR[cur] - 1e-9 ? (it.kind === "perword" ? ceil2(FLOOR[cur] * hours) : ceilClean(FLOOR[cur] * hours, cur)) : null;
    }
    rows.push(row);
  }
  return rows;
}

/** Audit bundle discount the white-label page may offer per currency (capped so yield stays at or above the floor). */
function bundleCaps() {
  const sec = card.sections.find((s) => s.id === "audits");
  const stated = +(sec.rules.join(" ").match(/(\d+)% off/) || [0, 0])[1];
  const out = {};
  for (const cur of ["inr", "usd"]) {
    let cap = stated;
    for (const it of sec.items) {
      const wl = priceItem(it, cur, "wl").p;
      const need = FLOOR[cur] * HOURS[it.id];
      const allowed = Math.floor(Math.max(0, (1 - need / wl) * 100) + 1e-9);
      cap = Math.min(cap, allowed);
    }
    out[cur] = cap;
  }
  return { stated, caps: out };
}

/* ── Text handling ───────────────────────────────────────────────────────── */

const RS_RANGE = /Rs\.[\d,]+(?: to Rs\.[\d,]+)?/;

/** Replaces literal list prices inside data strings with placeholders (filled per audience on render). */
function tokenise(str) {
  return str
    .replace(/Rs\.75,000 \/ \$2,500/g, "{{minProject}}")
    .replace(/Rs\.1,50,000 \/ \$5,000/g, "{{minProgramme}}")
    .replace(/Rs\.16,200/g, "{{shootDay}}");
}

function audienceNote(note, aud) {
  const m = note.match(/^(.*?about )(Rs\.[\d,]+ to Rs\.[\d,]+)( depending on tier(?: and length)?), or (\$[\d,]+ to \$[\d,]+) international\.$/);
  if (!m) return RS_RANGE.test(note) || /\$\d/.test(note) ? null : note;
  if (aud === "india") return m[1] + m[2] + m[3] + ".";
  if (aud === "international") return m[1] + m[4] + m[3] + ".";
  return null;
}

function sentences(str) {
  return str.match(/[^.]+\.(?:\s|$)/g)?.map((x) => x.trim()) || [str];
}

function audienceTerms(aud) {
  const t = JSON.parse(JSON.stringify(card.terms));
  const tax = sentences(t.taxes[0]);
  const indiaTax = tax.find((x) => /GST/.test(x));
  const intlTax = tax.find((x) => /US\$ fees/.test(x));
  const passThrough = t.taxes[1];
  const intlPay = t.payment.findIndex((x) => /^Clients outside India/.test(x));
  if (aud === "india") {
    t.taxes = [indiaTax, passThrough];
    t.payment.splice(intlPay, 1);
  } else if (aud === "international") {
    t.taxes = [intlTax.replace("US$ fees are quoted", "Fees are quoted").replace("the client's jurisdiction", "your jurisdiction").replace("the client's", "your"), passThrough];
    t.excludedBilledAtActuals = t.excludedBilledAtActuals.map((x) => x.replace("GST and tax filings", "tax filings"));
    t.payment[intlPay] = t.payment[intlPay].replace("Clients outside India are invoiced", "You are invoiced").replace("borne by the client", "borne by you");
  }
  return t;
}

/* ── The payload ─────────────────────────────────────────────────────────── */

const CFG = {
  inr: { sym: "Rs.", locale: "en-IN", name: "Indian rupees", short: "INR" },
  usd: { sym: "$", locale: "en-US", name: "US dollars", short: "USD" },
};

// Markets named on the US$ pages (links.json, editable). Long names for body text, short names for tight spots.
const SHORT = { "United States": "US", "United Kingdom": "UK", "United Arab Emirates": "UAE" };
const joinList = (a) => (a.length <= 1 ? a.join("") : a.slice(0, -1).join(", ") + " and " + a[a.length - 1]);
const COUNTRIES = linksFile.countries;
export const countryNames = { long: joinList(COUNTRIES), short: joinList(COUNTRIES.map((c) => SHORT[c] || c)), shortList: COUNTRIES.map((c) => SHORT[c] || c) };
const THE = (txt) => (/^(US|UK|UAE|United)/.test(txt) ? "the " + txt : txt);
const CS = THE(countryNames.short);
const CL = THE(countryNames.long);
countryNames.theShort = CS;
countryNames.theLong = CL;

const AUD = {
  india: {
    label: "Clients in India",
    h1: "Pricing for clients in India",
    intro: "Build an estimate from the rate card: choose the services you need, set the quantities and see the fees add up. Share the estimate, save it as a PDF, or send it to us for a proposal.",
    taxShort: "Fees exclusive of GST.",
    taxLong: "India fees are exclusive of GST, charged additionally at the applicable rate.",
    currencyNote: "Prices are in Indian rupees (Rs.), for clients billed in India. They are never converted from, or blended with, another currency on one invoice.",
  },
  international: {
    label: `Clients in ${CS}`,
    h1: `Pricing for clients in ${CS}`,
    intro: "Build an estimate from the rate card: choose the services you need, set the quantities and see the fees add up. Share the estimate, save it as a PDF, or send it to us for a proposal.",
    taxShort: "Fees exclusive of any tax in your jurisdiction.",
    taxLong: "Fees are quoted exclusive of any tax in your jurisdiction.",
    currencyNote: `Priced in US$ for clients in ${CL} and other countries outside India. Prices are never converted from, or blended with, another currency on one invoice.`,
  },
  whitelabelIndia: {
    label: "Agency (white-label), India",
    h1: "Agency (white-label) pricing, India",
    intro: "These are the prices an agency pays MMC. You set your own price to your client, and the work is delivered under your agency's brand. Build an estimate of what a project or retainer costs you, then share it, save it as a PDF, or send it to us.",
    taxShort: "Agency fees exclusive of GST.",
    taxLong: "Agency fees are exclusive of GST, charged additionally at the applicable rate.",
    currencyNote: "Agency prices are in Indian rupees (Rs.), for agencies billed in India. They are never converted from, or blended with, another currency on one invoice.",
  },
  whitelabelInternational: {
    label: `Agency (white-label), ${CS}`,
    h1: `Agency (white-label) pricing for agencies in ${CS}`,
    intro: "These are the prices an agency pays MMC. You set your own price to your client, and the work is delivered under your agency's brand. Build an estimate of what a project or retainer costs you, then share it, save it as a PDF, or send it to us.",
    taxShort: "Agency fees exclusive of any tax in your jurisdiction.",
    taxLong: "Agency fees are quoted exclusive of any tax in your jurisdiction.",
    currencyNote: `Agency pricing in US$ for agencies in ${CL} and other countries outside India. Prices are never converted from, or blended with, another currency on one invoice.`,
  },
};

export const AUDIENCES = Object.keys(AUD);

function presetsFor() {
  return [
    { id: "audit-first", recommended: true, name: "Audit first", blurb: "Find the real problem before spending.", sel: { "audit-website": { q: 1 }, "audit-marketing": { q: 1 } } },
    { id: "rebuild", name: "Rebuild the store", blurb: "Custom theme, tracking, two landing pages and a first product upload.", sel: { "web-custom": { q: 1 }, "analytics-setup": { q: 1 }, "cro-lp": { q: 2 }, "cat-upload": { q: 100 } } },
    { id: "growth", name: "Growth retainer", blurb: "Two ad channels, organic social, SEO and WhatsApp retention.", sel: { "perf-channel": { q: 2 }, "perf-above": { q: { inr: 400000, usd: 8000 } }, "soc-organic": { q: 1 }, "seo-dom": { q: 25 }, "ret-platform": { q: 1 } } },
    { id: "maintenance", name: "Maintenance only", blurb: "Catalogue management on a half-yearly cycle.", sel: { "mnt-catalogue": { q: 1 } }, cycle: "h" },
  ];
}

export function buildAudience(aud) {
  if (!AUD[aud]) throw new Error("unknown audience " + aud);
  const curs = curSet(aud);
  const mode = aud.startsWith("whitelabel") ? "wl" : "client";
  const region = curs[0] === "inr" ? "india" : "international";
  const a = AUD[aud];
  const items = flatItems();
  const byId = Object.fromEntries(items.map(({ it }) => [it.id, it]));
  const tokens = {};
  const cfg = {};
  curs.forEach((c) => (cfg[c] = CFG[c]));

  const mkItem = (sec, it) => {
    const pr = {};
    curs.forEach((cur) => {
      const p = priceItem(it, cur, mode);
      Object.keys(p).filter((k) => k[0] === "_").forEach((k) => delete p[k]);
      pr[cur] = p;
    });
    const pctNote = it.pctNote || "";
    const pctSpend = /(\d+)% of PR spend/.test(pctNote) ? +pctNote.match(/(\d+)% of PR spend/)[1] : 0;
    const rec = sec.billing === "cycle" ? "cycle" : (it.cadence || sec.cadence) === "monthly" ? "monthly" : "once";
    const out = {
      id: it.id, name: curs[0] === "usd" && it.id === "seo-intl" ? "Keyword in a second market" : it.name, unit: it.unit, kind: it.kind,
      qty: { min: it.qty.min, max: it.qty.max, step: it.qty.step || 1 },
      pr, rec,
    };
    if (it.detail) out.detail = it.detail;
    if (it.group) out.group = it.group;
    if (it.included) out.included = it.included;
    if (it.notIncluded) out.notIncluded = it.notIncluded;
    if (it.spendLabel) out.spendLabel = it.spendLabel;
    if (it.creators) out.creators = true;
    if (it.pieces) out.pieces = true;
    if (pctSpend) out.pctSpend = pctSpend;
    if (it.minQty) out.minQty = it.minQty;
    if (it.revShare) { out.revShare = it.revShare; out.revLabel = it.revLabel; }
    if (it.kind === "pctspend") {
      const partner = sec.items.find((x) => x.threshold);
      out.partner = partner.id;
      out.thresholdFor = {};
      curs.forEach((cur) => (out.thresholdFor[cur] = priceItem(partner, cur, mode).threshold));
    }
    if (it.id === "perf-channel") out.thresholdFor = Object.fromEntries(curs.map((cur) => [cur, pr[cur].threshold]));
    return out;
  };

  const sections = card.sections.map((sec) => {
    const s = {
      id: sec.id, stage: sec.stage, title: sec.title,
      blurb: tokenise(sec.blurb), cadence: sec.cadence,
      payment: sec.payment || "",
      items: sec.items.map((it) => mkItem(sec, it)),
    };
    if (sec.billing) s.billing = sec.billing;
    if (sec.cycles) s.cycles = sec.cycles;
    if (sec.rules) s.rules = sec.rules.map(tokenise);
    if (sec.includes) s.includes = sec.includes;
    if (sec.excludes && sec.excludes.length) s.excludes = sec.excludes;
    if (sec.notes) s.notes = sec.notes.map((n) => audienceNote(n, mode === "wl" ? "whitelabel" : aud)).filter(Boolean).map(tokenise);
    if (sec.minTotalQty) s.minTotalQty = sec.minTotalQty;
    if (sec.minProject) {
      s.minProject = {};
      curs.forEach((cur) => (s.minProject[cur] = mode === "wl" ? Math.min(sec.minProject[cur], roundClean(sec.minProject[cur] * FACTORS[cur], cur)) : sec.minProject[cur]));
      tokens.minProject = s.minProject;
    }
    return s;
  });
  // Placeholder values that are not on a section
  const gift = sections.find((s) => s.id === "influencer").items.find((i) => i.id === "inf-gift");
  tokens.minProgramme = Object.fromEntries(curs.map((cur) => [cur, gift.pr[cur].minProgramme]));
  const shoot = ["shoot-cine-junior", "shoot-camera", "shoot-light", "shoot-assist"];
  const vid = sections.find((s) => s.id === "videography").items;
  tokens.shootDay = Object.fromEntries(curs.map((cur) => [cur, shoot.reduce((t, id) => t + vid.find((i) => i.id === id).pr[cur].p, 0)]));

  // Audit bundle
  const bc = bundleCaps();
  const bundle = {};
  curs.forEach((cur) => (bundle[cur] = mode === "wl" ? bc.caps[cur] : bc.stated));
  const audits = sections.find((s) => s.id === "audits");
  audits.rules = card.sections.find((s) => s.id === "audits").rules.map((r) => {
    if (/Combining two or more audits/.test(r)) {
      if (mode !== "wl") return r.replace("the combined list price, in either currency", "the combined price");
      const cur = curs[0];
      return bundle[cur] > 0
        ? `Combining two or more audits for the same client in one engagement is billed at ${bundle[cur]}% off the combined price.`
        : "There is no bundle discount on the audit price.";
    }
    return r;
  });
  audits.rules = audits.rules.filter(Boolean);

  // Standard rates (no logged hours, so the white-label rate equals the list rate by rule)
  const standardRates = {
    blurb: card.standardRates.blurb,
    items: card.standardRates.items.map((r) => {
      const pr = {};
      curs.forEach((cur) => (pr[cur] = { p: r[cur] }));
      return { id: r.id, name: r.name, unit: r.unit, kind: "fixed", pr };
    }),
  };

  const terms = audienceTerms(region);
  const data = {
    audience: aud,
    audienceLabel: a.label,
    title: card.meta.title,
    version: card.meta.version,
    effective: card.meta.effective,
    curs,
    multi: curs.length > 1,
    cfg,
    tokens,
    exclusive: EXCLUSIVE_GROUPS,
    bundle,
    cycles: card.sections.find((s) => s.id === "maintenance").cycles,
    sections,
    stages: card.stages.map((s) => ({ id: s.id, n: s.n, name: s.name, purpose: s.purpose, billing: s.billing })),
    principles: card.principles,
    standardRates,
    terms,
    taxShort: a.taxShort,
    taxLong: a.taxLong,
    currencyNote: a.currencyNote,
    h1: a.h1,
    intro: a.intro,
    presets: presetsFor().map((p) => ({ ...p, sel: Object.fromEntries(Object.entries(p.sel).filter(([id]) => byId[id]).map(([id, v]) => [id, typeof v.q === "object" ? { q: Object.fromEntries(Object.entries(v.q).filter(([c]) => curs.includes(c))) } : v])) })),
    company: card.meta.company,
    marketsShort: curs[0] === "usd" ? CS : "India",
    marketsList: curs[0] === "usd" ? countryNames.shortList : [],
  };
  assertClean(aud, data);
  return data;
}

/** Build-time guard: a payload must not carry another audience's currency or text. */
const curs0 = (aud) => curSet(aud)[0];
function assertClean(aud, data) {
  const json = JSON.stringify(data);
  const bad = [];
  if (curs0(aud) === "inr" && /\$|US\$|USD|[Dd]ollar/.test(json)) bad.push("dollar text in the india payload");
  if (curs0(aud) === "usd" && /\bInternational\b/.test(json)) bad.push("the word International in a US$ payload");
  if (curs0(aud) === "usd" && /Rs\.|₹|INR|GST|[Rr]upee/.test(json)) bad.push("rupee or GST text in the international payload");
  if (/minYield|"hours"|"internal"/.test(json)) bad.push("internal costing key in a payload");
  if (aud.startsWith("whitelabel")) {
    const wl = new Set();
    JSON.stringify(data, (k, v) => { if (typeof v === "number") wl.add(v); return v; });
    for (const { it } of flatItems()) for (const cur of curSet(aud)) {
      if (typeof it[cur] === "number" && it[cur] >= 100 && !wl.has(it[cur]) && new RegExp("(?<![\\d.])" + it[cur] + "(?![\\d.])").test(json)) bad.push("list price " + it[cur] + " appears in the white-label payload");
    }
  }
  if (bad.length) throw new Error("pricing payload leak (" + aud + "): " + bad.join("; "));
}

/** Plain-text list of every distinct list value, for the leak checker. */
export function listValues() {
  const out = { inr: new Set(), usd: new Set() };
  for (const { it } of flatItems()) for (const cur of ["inr", "usd"]) {
    for (const k of [cur, cur + "Max"]) if (typeof it[k] === "number") out[cur].add(it[k]);
    if (it.min) out[cur].add(it.min[cur]);
    if (it.minPiece) out[cur].add(it.minPiece[cur]);
    if (it.minProgramme) out[cur].add(it.minProgramme[cur]);
  }
  for (const r of card.standardRates.items) for (const cur of ["inr", "usd"]) out[cur].add(r[cur]);
  for (const s of card.sections) if (s.minProject) for (const cur of ["inr", "usd"]) out[cur].add(s.minProject[cur]);
  return { inr: [...out.inr], usd: [...out.usd] };
}

export const meta = card.meta;
