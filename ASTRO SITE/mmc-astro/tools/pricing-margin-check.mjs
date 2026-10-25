// Margin guard for the private pricing pages. Usage: node tools/pricing-margin-check.mjs [--md] [--strict]
// For every priced line: India price, International price, white-label prices, logged hours and the yield per hour of each,
// flagged against the floor in src/data/pricing/margin-config.json.
//   THIN    the price is below floor x hours even at the client list price (white-label then equals list, no discount)
//   RAISED  a lower price was lifted to floor x hours (white-label discount trimmed, or client price lifted when enforceFloorOnClientPrices is on)
// Exit code 1 if any white-label price is above its list price, or below the floor where it could have been raised (a bug in the rules).
// THIN lines are owner decisions, listed with a suggested minimum price; they only fail the run with --strict.
import { analyse, buildAudience, config, AUDIENCES } from "../src/lib/pricing.mjs";

const args = process.argv.slice(2);
const MD = args.includes("--md");
const STRICT = args.includes("--strict");
const rows = analyse();
const { floor, floorInr, fx, factors, enforce, overrides, excluded } = config;
const sym = { inr: "Rs.", usd: "$" };
const fmt = (v, cur) => (v === null || v === undefined ? "-" : sym[cur] + Number(v).toLocaleString(cur === "inr" ? "en-IN" : "en-US", { maximumFractionDigits: 2 }));
// Yields are always shown in rupees per logged hour (a dollar price is converted at fxInrPerUsd) so every audience is comparable.
const y = (v) => (v === null || v === undefined ? "-" : "Rs." + Math.round(v).toLocaleString("en-IN"));
const pct = (v) => (v === null || v === undefined ? "-" : (Math.round(v * 10) / 10).toFixed(1) + "%");

let violations = 0;
const out = [];
const log = (s = "") => out.push(s);

log(`One cost floor for every audience: Rs.${floorInr} per logged man-hour (a stand-in for loaded cost). US$ prices are tested at price x Rs.${fx} per $ against it, which makes the dollar floor $${floor.usd.toFixed(2)} an hour. White-label factor ${factors.inr} (INR) and ${factors.usd} (USD). enforceFloorOnClientPrices: ${enforce}.`);
log(`Yield is price divided by the logged hours of one priced unit (per word for content, per keyword for SEO, per influencer for gifting, per creator for paid influencer minimums). Excluded from the check as pass-through rates, not billable man-hours: ${excluded.join(", ")}. Client price overrides applied: ${JSON.stringify(overrides)}.`);
log();

const flagged = { inr: [], usd: [] };
const wlThin = [];
const wlRaised = [];
const clientThin = { inr: [], usd: [] };
const discs = { inr: [], usd: [] };

for (const cur of ["inr", "usd"]) {
  const who = cur === "inr" ? "India" : "International";
  log(MD ? `### ${who} (${cur.toUpperCase()}) and white-label ${who}` : `${"=".repeat(8)} ${who} (${cur.toUpperCase()}) and white-label ${who} ${"=".repeat(8)}`);
  const head = ["Line", "Hrs", `${who} price`, "Rs/hr", "Flag", "White-label", "Rs/hr", "Agency margin at list resale", "WL flag"];
  const lines = [];
  for (const r of rows) {
    if (r.list[cur] === null) continue;
    const hrs = r.hours === null ? "-" : r.hours;
    const fc = r.statusClient[cur] === "ok" || r.statusClient[cur] === "n/a" ? "" : r.statusClient[cur];
    const fw = r.statusWl[cur] === "ok" || r.statusWl[cur] === "n/a" ? "" : r.statusWl[cur];
    lines.push([r.id + (r.equipment ? " (excluded)" : ""), hrs, fmt(r.client[cur], cur), y(r.yieldClient[cur]), fc, fmt(r.wl[cur], cur), y(r.yieldWl[cur]), pct(r.discount[cur]), fw]);
    if (r.discount[cur] !== null) discs[cur].push(r.discount[cur]);
    if (fc) { flagged[cur].push(r); clientThin[cur].push(r); }
    if (r.statusWl[cur] === "THIN") wlThin.push([r, cur]);
    if (r.statusWl[cur] === "RAISED") wlRaised.push([r, cur]);
    // rules that must always hold
    if (r.wl[cur] !== null && r.list[cur] !== null && r.wl[cur] > r.list[cur] + 1e-9) { violations++; log(`VIOLATION: ${r.id} ${cur} white-label ${r.wl[cur]} is above list ${r.list[cur]}`); }
    if (r.yieldWl[cur] !== null && r.yieldWl[cur] < floorInr - 1e-6 && r.statusWl[cur] !== "THIN") { violations++; log(`VIOLATION: ${r.id} ${cur} white-label yield ${r.yieldWl[cur]} is below the floor but the line is not marked THIN`); }
  }
  if (MD) {
    log("| " + head.join(" | ") + " |");
    log("|" + head.map((h, i) => (i === 0 || i === 4 || i === 8 ? "---" : "---:")).join("|") + "|");
    lines.forEach((l) => log("| " + l.join(" | ") + " |"));
  } else {
    const w = head.map((h, i) => Math.max(h.length, ...lines.map((l) => String(l[i]).length)));
    log(head.map((h, i) => h.padEnd(w[i])).join("  "));
    lines.forEach((l) => log(l.map((c, i) => (i === 0 || i === 4 || i === 8 ? String(c).padEnd(w[i]) : String(c).padStart(w[i]))).join("  ")));
  }
  log();
}

// Audit bundle on the white-label page
const wlBy = { inr: buildAudience("whitelabelIndia"), usd: buildAudience("whitelabelInternational") };
log(MD ? "### Audit bundle discount" : "Audit bundle discount");
for (const cur of ["inr", "usd"]) {
  const a = rows.find((r) => r.id === "audit-website");
  const k = cur === "usd" ? fx : 1;
  const w = wlBy[cur].bundle[cur];
  log(`- ${cur.toUpperCase()}: white-label bundle discount offered ${w}% (stated rule 20%). Per-audit yield after the bundle: white-label ${y((a.wl[cur] * (1 - w / 100) / a.hours) * k)} per hour, client ${y((a.client[cur] * 0.8 / a.hours) * k)} per hour, floor Rs.${floorInr}.`);
}
log();

// Suggested minimum prices
log(MD ? "### Suggested minimum list prices (floor x hours, rounded up)" : "Suggested minimum list prices for flagged client lines (floor x hours, rounded up)");
const sugg = [];
for (const r of rows) {
  const parts = [];
  for (const cur of ["inr", "usd"]) if (r.suggest[cur] !== null) parts.push(`${cur.toUpperCase()} ${fmt(r.list[cur], cur)} -> ${fmt(r.suggest[cur], cur)} (${y((r.list[cur] / r.hours) * (cur === "usd" ? fx : 1))} an hour now)`);
  if (parts.length) sugg.push(`- ${r.id} (${r.hours} h): ${parts.join("; ")}`);
}
sugg.forEach((s) => log(s));
log();

// Summary
const avg = (a) => (a.length ? a.reduce((x, y2) => x + y2, 0) / a.length : 0);
log(MD ? "### Summary" : "Summary");
for (const cur of ["inr", "usd"]) {
  const d = discs[cur];
  const withDisc = d.filter((x) => x > 0.05);
  log(`- ${cur.toUpperCase()} (${cur === "inr" ? "white-label India" : "white-label International"}): ${d.length} priced lines. Average white-label discount ${pct(avg(d))} across all lines (${pct(avg(withDisc))} across the ${withDisc.length} lines that carry a discount). ${clientThin[cur].length} lines below the floor at the list price in ${cur === "inr" ? "India" : "International"}.`);
}
for (const [cur, name] of [["inr", "White-label India"], ["usd", "White-label International"]]) {
  const th = wlThin.filter(([, c]) => c === cur).map(([r]) => r.id);
  const ra = wlRaised.filter(([, c]) => c === cur).map(([r]) => r.id);
  log(`- ${name} THIN (list price already below the floor, no discount given): ${th.length}. ${th.join(", ")}`);
  log(`- ${name} RAISED (discount trimmed so yield stays at the floor): ${ra.length}. ${ra.join(", ")}`);
}
log(`- Rule violations: ${violations}`);
console.log(out.join("\n"));
if (violations) process.exit(1);
if (STRICT && (wlThin.length || clientThin.inr.length || clientThin.usd.length)) { console.log("\n--strict: lines below the floor exist."); process.exit(1); }
