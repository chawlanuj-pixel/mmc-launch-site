// Renders 1200x630 JPG social cards into public/assets/og/. Local only (sharp + librsvg), no paid generation.
// Usage: node tools/make-og.mjs
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fontDir = resolve(root, "src/styles/design-system/fonts");
const scratch = process.env.TMPDIR || "/tmp";
// (fontconfig no longer needed)
const conf = resolve(scratch, "mmc-og-fonts.conf");
writeFileSync(conf, `<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "fonts.dtd"><fontconfig><dir>${fontDir}</dir><cachedir>${scratch}/mmc-og-fc</cachedir></fontconfig>`);
process.env.FONTCONFIG_FILE = conf;
const sharp = (await import("sharp")).default;
const out = resolve(root, "public/assets/og");
mkdirSync(out, { recursive: true });

// name: [kicker, [heading lines], [sub lines]]  (no figures, no client counts)
const CARDS = {
  home: ["Monday Marketing Company", ["Growth marketing", "that survives the P&L."], ["Media, creative, retention and technology", "run by one senior team."]],
  services: ["Services", ["Every channel,", "one senior team."], ["Performance, search, web and creative", "work, measured on contribution margin."]],
  "performance-marketing": ["Performance marketing", ["Paid media built for", "contribution margin."], ["Meta, Google, marketplace and lead", "generation programmes."]],
  "seo-and-ai-search": ["SEO and AI search", ["Be the answer", "search and AI give."], ["SEO, AEO, GEO and AI search", "visibility for Indian brands."]],
  seo: ["SEO", ["Organic growth that", "compounds."], ["Technical, content and links,", "tied to revenue."]],
  aeo: ["Answer engine optimisation", ["Get quoted in", "the answer box."], ["Answer-first content that search", "engines can lift."]],
  "ai-seo": ["AI SEO", ["Show up when", "people ask AI."], ["Visibility in ChatGPT, Gemini,", "Perplexity and AI Overviews."]],
  geo: ["Generative engine optimisation", ["Be cited by", "AI assistants."], ["Entities, sources and structure", "that models trust."]],
  "web-and-ecommerce": ["Web and e-commerce", ["Stores and sites", "built to convert."], ["Shopify, WordPress, CRO and", "UI and UX design."]],
  "creative-and-content": ["Creative and content", ["Creative that earns", "the click."], ["UGC, video, social and", "content for D2C brands."]],
  industries: ["Industries", ["Marketing built for", "how your category sells."], ["D2C and category playbooks", "from skincare to apparel."]],
  "white-label": ["White-label", ["Your agency's", "senior bench."], ["White-label marketing delivery", "under your brand."]],
  guides: ["Guides", ["Practical guides for", "growth teams."], ["Margin, ROAS, retention and", "search, explained plainly."]],
  work: ["Work", ["Brands we have", "grown."], ["Case studies from D2C", "and B2B programmes."]],
  tools: ["Free tools", ["Calculators for", "real margin maths."], ["Breakeven ROAS, LTV to CAC,", "CAC runway and more."]],
  "ai-by-mmc": ["AI by MMC", ["AI that does", "the marketing work."], ["Agents and automations built", "for growth teams."]],
  about: ["About", ["A senior team,", "on your account."], ["Who we are and how we work."]],
  careers: ["Careers", ["Do the best work", "of your career."], ["Open roles at Monday Marketing", "Company."]],
  contact: ["Contact", ["Let us talk", "about your growth."], ["Book a call or send a brief."]],
  audit: ["Free audit", ["See where your", "margin is leaking."], ["A senior review of your", "marketing and funnel."]],
};
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const logo = await sharp(resolve(root, "public/assets/logo-white-yellow.png")).resize({ height: 120 }).png().toBuffer();
const lm = await sharp(logo).metadata();
const F = (f) => resolve(fontDir, f);
// Text is rasterised with sharp's text input and an explicit fontfile, so no system font is needed.
async function line(text, file, family, px, color, spacing = 0) {
  const sp = spacing ? ` letter_spacing="${spacing * 1024}"` : "";
  const buf = await sharp({ text: { text: `<span foreground="${color}"${sp}>${esc(text)}</span>`, font: `${family} ${px}px`, fontfile: F(file), rgba: true, dpi: 72, width: 1100 } }).png().toBuffer();
  return buf;
}
for (const [name, [kicker, head, sub]] of Object.entries(CARDS)) {
  const layers = [{ input: logo, left: 60, top: 28 }];
  layers.push({ input: await line(kicker.toUpperCase(), "Nunito-Bold.ttf", "Nunito", 26, "#FFC528", 3), left: 72, top: 160 });
  for (let i = 0; i < head.length; i++) layers.push({ input: await line(head[i], "Raleway-ExtraBold.ttf", "Raleway ExtraBold", 80, "#FFFFFF"), left: 72, top: 246 + i * 96 });
  for (let i = 0; i < sub.length; i++) layers.push({ input: await line(sub[i], "Nunito-Regular.ttf", "Nunito", 30, "#C9D6FA"), left: 72, top: 246 + head.length * 96 + 16 + i * 42 });
  layers.push({ input: await line("mondaymarketing.company", "Nunito-Bold.ttf", "Nunito", 24, "#8FA8EE"), left: 1128 - 330, top: 548 });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs>
<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2A55DC"/><stop offset="0.55" stop-color="#1D4ED8"/><stop offset="1" stop-color="#0F1E5E"/></linearGradient></defs>
<rect width="1200" height="630" fill="url(#g)"/><rect x="72" y="208" width="64" height="8" rx="4" fill="#FFC528"/></svg>`;
  const base = await sharp(Buffer.from(svg)).png().toBuffer();
  const buf = await sharp(base).composite(layers).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  writeFileSync(resolve(out, name + ".jpg"), buf);
  console.log(name, (buf.length / 1024).toFixed(0) + "KB");
}
