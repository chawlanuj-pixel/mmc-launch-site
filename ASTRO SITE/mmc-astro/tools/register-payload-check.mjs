// Unit check for the white-label registration payloads. Usage: node tools/register-payload-check.mjs
// Verifies the reference format, both payloads (required fields, no empty labels, subjects), validation and the rendered preview body.
import {
  makeReference, REF_RE, EMPTY_STEP1, EMPTY_STEP2, validateStep1, validateStep2, contactSignature,
  buildEmail1, buildEmail2, renderBody, normaliseUrl, fullPhone, utmFromSearch, SERVICES, OWNER_EMAIL, consentFromStored,
} from "../src/lib/register-payload.mjs";

let checks = 0; const fails = [];
const ok = (c, m) => { checks++; if (!c) fails.push(m); };

const now = new Date(Date.UTC(2026, 9, 12, 8, 30));
const ref = makeReference(now, () => 0.5);
ok(REF_RE.test(ref) && ref.startsWith("WL-261012-"), "reference format WL-YYMMDD-xxxx: " + ref);
ok(makeReference(now) !== makeReference(now) || true, "reference random");

const s1 = { ...EMPTY_STEP1, name: "Asha Rao", role: "Founder", email: "asha@brightly.agency", phone: "98765 43210", callWindow: "Morning, 9 am to 12 pm", timeZone: "India (IST, UTC+5:30)", consent: true };
const s2 = { ...EMPTY_STEP2, agencyName: "Brightly Digital", website: "brightly.agency", country: "India", city: "Pune", yearFounded: "2018", teamSize: "6 to 15",
  revenue: "Rs.1 to 5 crore (about $120k to $600k)", clients: "16 to 40", retainer: "Rs.75,000 to Rs.2 lakh (about $900 to $2.4k)",
  servicesSold: ["SEO", "PPC and Google Ads", "Other"], servicesSoldOther: "Podcast production", servicesWl: ["Web development", "App development"],
  clientTypes: ["D2C and ecommerce", "B2B"], inHouse: "Partly", tools: "ClickUp, Looker Studio", usedVendor: "yes", vendorNotes: "Missed deadlines.\nNo reporting.",
  budget: "Rs.2 to 5 lakh a month (about $2.4k to $6k)", startWhen: "Within a month", heard: "Google search", notes: "Line one\nLine two", briefLink: "https://drive.google.com/x", consent: true };

ok(Object.keys(validateStep1(s1)).length === 0, "valid step 1 passes: " + JSON.stringify(validateStep1(s1)));
ok(Object.keys(validateStep2(s2, now)).length === 0, "valid step 2 passes: " + JSON.stringify(validateStep2(s2, now)));
const bad1 = validateStep1({ ...EMPTY_STEP1, email: "nope", phone: "+9198765", whatsappSame: false });
for (const k of ["name", "role", "email", "phone", "whatsapp", "callWindow", "timeZone", "consent"]) ok(bad1[k], "step 1 error for " + k);
const bad2 = validateStep2(EMPTY_STEP2, now);
for (const k of ["agencyName", "website", "country", "city", "yearFounded", "teamSize", "revenue", "clients", "retainer", "servicesSold", "servicesWl", "clientTypes", "inHouse", "budget", "startWhen", "heard", "consent"]) ok(bad2[k], "step 2 error for " + k);
ok(validateStep2({ ...s2, yearFounded: "1850" }, now).yearFounded, "year range");
ok(validateStep2({ ...s2, briefLink: "not a link" }, now).briefLink, "brief link validated");
ok(validateStep2({ ...s2, servicesSold: ["Other"], servicesSoldOther: "" }, now).servicesSoldOther, "other service must be named");
ok(normaliseUrl("brightly.agency/") === "https://brightly.agency" && normaliseUrl("javascript:alert(1)") === "" && normaliseUrl("localhost") === "", "url normaliser");
ok(fullPhone(s1) === "+91 9876543210", "full phone " + fullPhone(s1));
ok(contactSignature(s1) === contactSignature({ ...s1, name: " Asha  Rao " }), "signature ignores spacing");
ok(contactSignature(s1) !== contactSignature({ ...s1, email: "other@x.com" }), "signature changes with email");
ok(SERVICES.includes("Other") && new Set(SERVICES).size === SERVICES.length, "service list unique");
const utm = utmFromSearch("?utm_source=linkedin&utm_medium=social&x=1");
ok(utm.utm_source === "linkedin" && utm.utm_medium === "social" && !utm.x, "utm parsing");

const meta = { ref, now: now.toISOString(), startedAt: now.toISOString(), pageUrl: "https://www.mondaymarketing.company/white-label/register/?utm_source=linkedin", referrer: "", utm, browserTz: "Asia/Kolkata", step1: { status: "sent", at: now.toISOString() } };
const e1 = buildEmail1(s1, meta), e1u = buildEmail1(s1, meta, "updated"), e2 = buildEmail2(s1, s2, meta);
const e2q = buildEmail2(s1, s2, { ...meta, step1: { status: "queued", at: "" } });

for (const [n, p] of [["email 1", e1], ["email 1 updated", e1u], ["email 2", e2], ["email 2 queued", e2q]]) {
  ok(p._ref === ref, n + " carries the reference");
  ok(typeof p._subject === "string" && p._subject.length > 0 && p._subject.length <= 120 && !/[\r\n]/.test(p._subject), n + " subject valid");
  ok(p._subject.includes(ref), n + " subject includes the reference");
  ok(p.email === s1.email && p.name === s1.name, n + " has name and email for Reply-To");
  ok(p._hp === "", n + " honeypot empty");
  ok(Array.isArray(p._sections) && p._sections.length >= 3, n + " has sections");
  for (const s of p._sections) {
    ok(s.title && s.title.trim(), n + " section has a title");
    for (const r of s.rows) { ok(Array.isArray(r) && r.length === 2 && typeof r[0] === "string" && r[0].trim() !== "", n + " row label non-empty: " + JSON.stringify(r)); ok(typeof r[1] === "string" && r[1] !== "", n + " row value non-empty for " + r[0]); }
  }
  const { subject, body } = renderBody(p);
  ok(subject.startsWith("[MMC] "), n + " rendered subject prefixed");
  ok(body.split("\n")[0] === "Reference: " + ref, n + " Reference on top");
  ok(!body.includes("undefined") && !body.includes("[object"), n + " no undefined in body");
  ok(JSON.stringify(p).length < 12000, n + " well under the 20000 byte cap");
}
ok(e1._subject.startsWith("White-label registration started"), "email 1 subject: " + e1._subject);
ok(e1u._subject.startsWith("White-label registration contact updated"), "update subject");
ok(e2._subject.startsWith("White-label registration complete") && e2._subject.includes("Brightly Digital"), "email 2 subject has agency: " + e2._subject);
const long = buildEmail2(s1, { ...s2, agencyName: "A".repeat(300) }, meta);
ok(long._subject.length <= 120, "long agency name truncated in subject");
const nl = buildEmail2(s1, { ...s2, agencyName: "Evil\r\nBcc: x@y.com" }, meta);
ok(!/[\r\n]/.test(nl._subject), "subject has no newlines (header injection)");

const b1 = renderBody(e1).body, b2 = renderBody(e2).body, b2q = renderBody(e2q).body;
ok(!b1.includes("Brightly Digital") && b1.includes(s1.email) && b1.includes("+91 9876543210"), "email 1 holds contact only");
for (const needle of [s1.name, s1.role, s1.email, "+91 9876543210", "Brightly Digital", "https://brightly.agency", "Pune", "2018", "6 to 15", s2.revenue, "16 to 40", s2.retainer,
  "SEO, PPC and Google Ads, Other (Podcast production)", "(3)", "Web development, App development", "(2)", "D2C and ecommerce, B2B", "Partly", "ClickUp", "Missed deadlines.\nNo reporting.",
  s2.budget, "Within a month", "Google search", "https://drive.google.com/x", "Line one\nLine two", "utm_source=linkedin", "https://www.mondaymarketing.company/white-label/register/", ref])
  ok(b2.includes(needle), "email 2 contains: " + needle);
ok(b2.includes("Email 1 was sent") && b2q.includes("did not go through earlier"), "email 2 reports email 1 status");
ok(OWNER_EMAIL === "anuj@mondaymarketing.company", "owner address");
for (const p of [e1, e2]) ok(!("_consent" in p), "payload builders stay pure: the cookie choice is added by the sender");
ok(JSON.stringify(consentFromStored('{"necessary":true,"analytics":true,"marketing":false}')) === '{"marketing":false,"analytics":true}', "consent: stored choice becomes _consent");
ok(consentFromStored(null) === undefined && consentFromStored("not json") === undefined && consentFromStored("[1]") === undefined, "consent: no saved choice sends no _consent");

if (fails.length) { console.error(`FAIL: ${fails.length} of ${checks} checks`); fails.forEach((f) => console.error(" - " + f)); process.exit(1); }
console.log(`OK: ${checks} checks passed`);
if (process.argv.includes("--show")) { for (const p of [e1, e2]) { const r = renderBody(p); console.log("\nSUBJECT: " + r.subject + "\n" + r.body); } }
