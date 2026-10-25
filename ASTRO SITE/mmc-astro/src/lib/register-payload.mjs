// White-label agency registration: options, validation and the two email payloads. PURE (no DOM, no network),
// so the island, the preview block and tools/register-payload-check.mjs all use the same code.
//
// Email #1 is sent when the visitor presses Next on step 1 (contact details). Email #2 is sent on Submit (the complete registration).
// Both carry the same registration reference. public/forms/send.php renders `_sections` into a readable body;
// renderBody() below mirrors that rendering so the preview on non-live hosts shows exactly what would arrive.

export const OWNER_EMAIL = "anuj@mondaymarketing.company";
export const SUBJECT_MAX = 120;

export const CALL_WINDOWS = ["Morning, 9 am to 12 pm", "Afternoon, 12 pm to 4 pm", "Evening, 4 pm to 7 pm", "Any time in working hours"];
export const TIME_ZONES = [
  "India (IST, UTC+5:30)", "Gulf (GST, UTC+4)", "Singapore and Malaysia (UTC+8)", "Australia East (AEST)",
  "UK and Ireland (GMT or BST)", "Central Europe (CET)", "South Africa (SAST, UTC+2)",
  "US East (ET)", "US Central (CT)", "US West (PT)", "Other",
];
export const COUNTRY_CODES = [
  ["91", "India"], ["1", "United States and Canada"], ["44", "United Kingdom"], ["971", "United Arab Emirates"], ["65", "Singapore"],
  ["61", "Australia"], ["64", "New Zealand"], ["49", "Germany"], ["33", "France"], ["31", "Netherlands"], ["353", "Ireland"],
  ["27", "South Africa"], ["234", "Nigeria"], ["254", "Kenya"], ["92", "Pakistan"], ["880", "Bangladesh"], ["94", "Sri Lanka"],
  ["977", "Nepal"], ["966", "Saudi Arabia"], ["974", "Qatar"], ["965", "Kuwait"], ["968", "Oman"], ["60", "Malaysia"],
  ["62", "Indonesia"], ["63", "Philippines"], ["66", "Thailand"], ["other", "Other code"],
];

export const TEAM_SIZES = ["1 to 5", "6 to 15", "16 to 40", "41 to 100", "100+"];
export const REVENUE_BANDS = [
  "Under ₹25 lakh (about $30k)", "₹25 lakh to ₹1 crore (about $30k to $120k)", "₹1 to 5 crore (about $120k to $600k)",
  "₹5 to 20 crore (about $600k to $2.4M)", "Above ₹20 crore (above $2.4M)", "Prefer not to say",
];
export const CLIENT_BANDS = ["None yet", "1 to 5", "6 to 15", "16 to 40", "41 to 100", "Over 100"];
export const RETAINER_BANDS = [
  "Under ₹25,000 (under about $300)", "₹25,000 to ₹75,000 (about $300 to $900)", "₹75,000 to ₹2 lakh (about $900 to $2.4k)",
  "₹2 to 5 lakh (about $2.4k to $6k)", "Above ₹5 lakh (above $6k)", "Prefer not to say",
];
export const BUDGET_BANDS = [
  "Not sure yet", "Under ₹50,000 a month (under about $600)", "₹50,000 to ₹2 lakh a month (about $600 to $2.4k)",
  "₹2 to 5 lakh a month (about $2.4k to $6k)", "₹5 to 15 lakh a month (about $6k to $18k)", "Above ₹15 lakh a month (above $18k)",
];
// One list for "what you sell" and "what you want to white-label". Names follow the white-label hub pages (src/data/hubs/white-label*.json).
export const SERVICES = [
  "SEO", "Link building", "GEO and AEO", "PPC and Google Ads", "Meta and social ads", "Social media management", "Content marketing",
  "Email and retention", "Lead generation", "CRO", "Web design", "Web development", "WordPress development", "Shopify and ecommerce",
  "Amazon and marketplaces", "Website maintenance", "Creative, video and UGC", "Branding and packaging", "Reputation management (ORM)",
  "App development", "AI services", "Reporting and analytics", "Other",
];
export const CLIENT_TYPES = ["D2C and ecommerce", "B2B", "Education", "Local business", "SaaS", "Other"];
export const IN_HOUSE = ["Yes", "Partly", "No"];
export const START_WHEN = ["Immediately", "Within a month", "In 1 to 3 months", "Just exploring"];
export const HEARD = ["Google search", "An AI assistant", "LinkedIn", "Instagram", "Referral from a client or friend", "Another agency", "Event or community", "I already know MMC", "Other"];

export const EMPTY_STEP1 = { name: "", role: "", email: "", phoneCode: "91", phoneCodeOther: "", phone: "", whatsappSame: true, whatsapp: "", callWindow: "", timeZone: "", consent: false };
export const EMPTY_STEP2 = {
  agencyName: "", website: "", country: "", city: "", yearFounded: "", teamSize: "", revenue: "", clients: "", retainer: "",
  servicesSold: [], servicesSoldOther: "", servicesWl: [], servicesWlOther: "", clientTypes: [], clientTypesOther: "",
  inHouse: "", tools: "", usedVendor: "", vendorNotes: "", budget: "", startWhen: "", heard: "", heardOther: "", notes: "", briefLink: "", consent: false,
};
export const LIMITS = { short: 120, long: 300, notes: 1500 };

/* ── helpers ─────────────────────────────────────────────── */
const pad = (n) => String(n).padStart(2, "0");
const ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789";

/** WL-YYMMDD-xxxx. `now` is a Date, `rand` returns [0,1). */
export function makeReference(now = new Date(), rand = Math.random) {
  let s = "";
  for (let i = 0; i < 4; i++) s += ALPHABET[Math.floor(rand() * ALPHABET.length)];
  return `WL-${pad(now.getUTCFullYear() % 100)}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}-${s}`;
}
export const REF_RE = /^WL-\d{6}-[a-z0-9]{4}$/;

const str = (v) => (v === undefined || v === null ? "" : String(v)).replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
const list = (v) => (Array.isArray(v) ? v : []);
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Accepts "example.com", "www.example.com/path", "https://..."; returns a normalised https URL or "". */
export function normaliseUrl(input) {
  const s = str(input);
  if (!s) return "";
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(s) ? s : "https://" + s;
  try {
    const u = new URL(withScheme);
    if (!/^https?:$/.test(u.protocol)) return "";
    if (!/^[^.\s]+(\.[^.\s]+)+$/.test(u.hostname)) return "";
    return u.href.replace(/\/$/, "");
  } catch { return ""; }
}

/** Digits of the national number, or "" when not a plausible number. */
export function phoneDigits(raw) {
  const s = str(raw);
  if (/^\+/.test(s)) return "";
  const d = s.replace(/[\s\-().]/g, "");
  return /^\d{6,14}$/.test(d) ? d : "";
}
export function codeDigits(v) {
  const code = v.phoneCode === "other" ? str(v.phoneCodeOther).replace(/^\+/, "") : str(v.phoneCode);
  return /^\d{1,4}$/.test(code) ? code : "";
}
export function fullPhone(v) {
  const c = codeDigits(v), d = phoneDigits(v.phone);
  return c && d && (c + d).length <= 15 ? "+" + c + " " + d : "";
}
export function fullWhatsapp(v) {
  if (v.whatsappSame) return fullPhone(v);
  const d = phoneDigits(v.whatsapp);
  const c = codeDigits(v);
  return c && d && (c + d).length <= 15 ? "+" + c + " " + d : "";
}

/* ── validation ──────────────────────────────────────────── */
export function validateStep1(v) {
  const e = {};
  if (str(v.name).length < 2) e.name = "Enter your full name.";
  if (!str(v.role)) e.role = "Enter your role or designation.";
  if (!EMAIL_RE.test(str(v.email))) e.email = "Enter a valid work email, like name@agency.com.";
  if (v.phoneCode === "other" && !codeDigits(v)) e.phoneCodeOther = "Enter the country code, digits only, like 971.";
  if (/^\+/.test(str(v.phone))) e.phone = "Enter the number without the country code. Pick the code from the list.";
  else if (!phoneDigits(v.phone)) e.phone = "Enter a phone number with 6 to 14 digits.";
  else if (codeDigits(v) && !fullPhone(v)) e.phone = "That number is too long with the country code. Check the digits.";
  if (!v.whatsappSame && !phoneDigits(v.whatsapp)) e.whatsapp = "Enter your WhatsApp number, digits only.";
  if (!v.callWindow) e.callWindow = "Choose a call window.";
  if (!v.timeZone) e.timeZone = "Choose your time zone.";
  if (!v.consent) e.consent = "Please agree to be contacted so we can onboard you.";
  return e;
}

export function validateStep2(v, now = new Date()) {
  const e = {};
  const year = Number(str(v.yearFounded));
  if (!str(v.agencyName)) e.agencyName = "Enter your agency name.";
  if (!normaliseUrl(v.website)) e.website = "Enter your website, like youragency.com.";
  if (!str(v.country)) e.country = "Enter your country.";
  if (!str(v.city)) e.city = "Enter your city.";
  if (!/^\d{4}$/.test(str(v.yearFounded)) || year < 1980 || year > now.getUTCFullYear()) e.yearFounded = "Enter the year you started, like 2018.";
  if (!v.teamSize) e.teamSize = "Choose your team size.";
  if (!v.revenue) e.revenue = "Choose a revenue band, or Prefer not to say.";
  if (!v.clients) e.clients = "Choose how many active clients you have.";
  if (!v.retainer) e.retainer = "Choose an average monthly retainer, or Prefer not to say.";
  if (!list(v.servicesSold).length) e.servicesSold = "Choose at least one service you sell today.";
  if (list(v.servicesSold).includes("Other") && !str(v.servicesSoldOther)) e.servicesSoldOther = "Name the other service.";
  if (!list(v.servicesWl).length) e.servicesWl = "Choose at least one service you want to white label.";
  if (list(v.servicesWl).includes("Other") && !str(v.servicesWlOther)) e.servicesWlOther = "Name the other service.";
  if (!list(v.clientTypes).length) e.clientTypes = "Choose at least one client type.";
  if (list(v.clientTypes).includes("Other") && !str(v.clientTypesOther)) e.clientTypesOther = "Name the other client type.";
  if (!v.inHouse) e.inHouse = "Tell us whether you have an in-house team.";
  if (!v.budget) e.budget = "Choose an expected monthly budget, or Not sure yet.";
  if (!v.startWhen) e.startWhen = "Choose when you want to start.";
  if (!v.heard) e.heard = "Tell us how you heard about MMC.";
  if (v.heard === "Other" && !str(v.heardOther)) e.heardOther = "Tell us where you heard about MMC.";
  if (str(v.briefLink) && !normaliseUrl(v.briefLink)) e.briefLink = "Enter a full link, like https://drive.google.com/...";
  if (str(v.notes).length > LIMITS.notes) e.notes = `Keep this under ${LIMITS.notes} characters.`;
  if (!v.consent) e.consent = "Please confirm the details are correct and you agree to be contacted.";
  return e;
}

/** Stable signature of the contact details; used to detect "changed after email #1". */
export function contactSignature(v) {
  return JSON.stringify([str(v.name), str(v.role), str(v.email).toLowerCase(), fullPhone(v), fullWhatsapp(v), v.callWindow, v.timeZone]);
}

/* ── payloads ────────────────────────────────────────────── */
const orDash = (v) => (str(v) === "" ? "-" : str(v));
// Multi-line free text keeps its line breaks (indented so the email stays readable).
const ml = (v) => { const t = (v === undefined || v === null ? "" : String(v)).replace(/\r/g, "").replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, " ").trim().replace(/\n{3,}/g, "\n\n"); return t === "" ? "-" : t; };
const joined = (a, other) => {
  const items = list(a).map((x) => (x === "Other" && str(other) ? `Other (${str(other)})` : x));
  return items.length ? items.join(", ") : "-";
};

export function utmFromSearch(search) {
  const out = {};
  try {
    const p = new URLSearchParams(search || "");
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) if (p.get(k)) out[k] = str(p.get(k)).slice(0, 120);
  } catch {}
  return out;
}

/** Subject line (without the '[MMC] ' prefix, which send.php adds): collapsed, control chars removed, max 120. */
export function cleanSubject(s) {
  return str(s).slice(0, SUBJECT_MAX).trim();
}

function contactRows(v) {
  const phone = fullPhone(v);
  return [
    ["Full name", orDash(v.name)],
    ["Role or designation", orDash(v.role)],
    ["Work email", orDash(v.email)],
    ["Phone", orDash(phone)],
    ["WhatsApp", v.whatsappSame ? (phone ? phone + " (same as phone)" : "-") : orDash(fullWhatsapp(v))],
    ["Preferred call window", orDash(v.callWindow)],
    ["Time zone", orDash(v.timeZone)],
    ["Agreed to be contacted about onboarding", v.consent ? "Yes" : "No"],
  ];
}

function trackingRows(meta) {
  const u = meta.utm || {};
  const rows = [["Page URL", orDash(meta.pageUrl)]];
  rows.push(["Referrer", orDash(meta.referrer)]);
  const keys = Object.keys(u);
  rows.push(["UTM parameters", keys.length ? keys.map((k) => `${k}=${u[k]}`).join(", ") : "none in the URL"]);
  rows.push(["Visitor browser time zone", orDash(meta.browserTz)]);
  return rows;
}

/**
 * Email #1 (kind "started") or the corrected one (kind "updated").
 * meta: { ref, now (ISO string), pageUrl, referrer, utm, browserTz }
 */
export function buildEmail1(step1, meta, kind = "started") {
  const updated = kind === "updated";
  const subject = updated ? "White-label registration contact updated" : "White-label registration started";
  const sections = [
    { title: "Registration", rows: [
      ["Stage", updated ? "Step 1 of 2: contact details changed after the first email (this replaces the earlier details)" : "Step 1 of 2: contact details only. The agency profile may follow in a second email with the same reference."],
      ["Submitted at", orDash(meta.now)],
    ] },
    { title: "Contact", rows: contactRows(step1) },
    { title: "Page", rows: trackingRows(meta) },
  ];
  return {
    _kind: updated ? "wl-register-contact-updated" : "wl-register-started",
    _ref: meta.ref,
    _subject: cleanSubject(`${subject} (${meta.ref})`),
    name: str(step1.name),
    email: str(step1.email),
    _sections: sections,
    _page: "/white-label/register/",
    _hp: "",
  };
}

/**
 * Email #2: the COMPLETE registration, contact details included.
 * meta additionally: { step1: { status: "sent" | "queued" | "none", at } , startedAt }
 */
export function buildEmail2(step1, step2, meta) {
  const v = step2;
  const year = Number(str(v.yearFounded));
  const nowYear = Number(String(meta.now || "").slice(0, 4)) || new Date().getUTCFullYear();
  const yrs = year ? `${year} (about ${Math.max(0, nowYear - year)} years in business)` : "-";
  const s1 = meta.step1 || { status: "none" };
  const s1txt = s1.status === "sent" ? `Email 1 was sent${s1.at ? " at " + s1.at : ""}` :
    s1.status === "queued" ? "Email 1 did not go through earlier (visitor was offline or the server refused). Contact details are included here." :
    "Email 1 was not sent from this browser. Contact details are included here.";
  const soldN = list(v.servicesSold).length, wlN = list(v.servicesWl).length;
  const name = str(v.agencyName);
  const sections = [
    { title: "Registration", rows: [
      ["Stage", "Step 2 of 2: complete registration"],
      ["Contact step", s1txt],
      ["Registration started at", orDash(meta.startedAt)],
      ["Submitted at", orDash(meta.now)],
    ] },
    { title: "Contact", rows: contactRows(step1) },
    { title: "Agency", rows: [
      ["Agency name", orDash(v.agencyName)],
      ["Website", orDash(normaliseUrl(v.website))],
      ["Country", orDash(v.country)],
      ["City", orDash(v.city)],
      ["Year founded", yrs],
      ["Team size", orDash(v.teamSize)],
      ["Annual agency revenue", orDash(v.revenue)],
      ["Active clients", orDash(v.clients)],
      ["Average monthly retainer per client", orDash(v.retainer)],
      ["Client types served", joined(v.clientTypes, v.clientTypesOther)],
      ["In-house team", orDash(v.inHouse)],
      ["Project management and reporting tools", orDash(v.tools)],
    ] },
    { title: "Services", rows: [
      [`Services sold today (${soldN})`, joined(v.servicesSold, v.servicesSoldOther)],
      [`Services to white label with MMC (${wlN})`, joined(v.servicesWl, v.servicesWlOther)],
    ] },
    { title: "Working together", rows: [
      ["Expected monthly outsourced budget", orDash(v.budget)],
      ["When they want to start", orDash(v.startWhen)],
      ["Used a white-label vendor before", v.usedVendor === "yes" ? "Yes" : v.usedVendor === "no" ? "No" : "-"],
      ["What went wrong with the last vendor", ml(v.vendorNotes)],
      ["How they heard about MMC", v.heard === "Other" && str(v.heardOther) ? `Other (${str(v.heardOther)})` : orDash(v.heard)],
      ["Sample brief link", orDash(normaliseUrl(v.briefLink))],
    ] },
    { title: "Anything else", rows: [["Notes", ml(v.notes)]] },
    { title: "Consent", rows: [["Confirmed the details and agreed to be contacted", v.consent ? "Yes" : "No"]] },
    { title: "Page", rows: trackingRows(meta) },
  ];
  return {
    _kind: "wl-register-complete",
    _ref: meta.ref,
    _subject: cleanSubject(`White-label registration complete: ${name || "agency"} (${meta.ref})`),
    name: str(step1.name),
    email: str(step1.email),
    _sections: sections,
    _page: "/white-label/register/",
    _hp: "",
  };
}

/** The visitor's cookie choice as every site form sends it (`_consent`), from the stored "mmc-cookies-v1" value. No choice saved = undefined (the CRM then never shares the lead with ad platforms). */
export function consentFromStored(raw) {
  try { const c = JSON.parse(raw || "null"); return c && typeof c === "object" && !Array.isArray(c) ? { marketing: !!c.marketing, analytics: !!c.analytics } : undefined; } catch { return undefined; }
}

/** Mirrors the structured rendering in public/forms/send.php (keep the two in step). Returns { subject, body }. */
export function renderBody(p) {
  const lines = [`Reference: ${str(p._ref)}`, ""];
  for (const s of list(p._sections)) {
    lines.push(`== ${str(s.title).toUpperCase()} ==`);
    for (const [k, v] of list(s.rows)) lines.push(`${str(k)}: ${Array.isArray(v) ? v.map(str).join(", ") : ml(v)}`);
    lines.push("");
  }
  return { subject: "[MMC] " + cleanSubject(p._subject), body: lines.join("\n").replace(/\n+$/, "\n") };
}
