// Internal-linking data for the SEO plan (section 7.3). Everything here points at pages that exist; nothing is invented.
// Guides: GUIDES_FOR maps a page key (same keys as TOOLS_FOR) to 1-3 guide slugs from src/lib/guides.ts.
// Case studies: CASE_SERVICES maps a page key to the service tags recorded in src/data/work-clients.json.
// A case study is shown on a page only when its recorded tags match, or (for pages with no matching tag)
// as "selected work" for the right audience, with its real tags shown so no service is implied that was not run.
import { CASES, tagsFor, type CaseStudy } from "./work";
import { GUIDES } from "./guides";

export const GUIDES_FOR: Record<string, string[]> = {
  "performance-marketing": ["contribution-margin-roas", "attribution-overlap"],
  "meta-ads": ["creative-testing", "attribution-overlap"],
  "google-ads": ["contribution-margin-roas", "attribution-overlap"],
  "amazon-ads": ["contribution-margin-roas", "attribution-overlap"],
  "quick-commerce": ["contribution-margin-roas", "attribution-overlap"],
  "lead-generation": ["attribution-overlap"],
  "retention-marketing": ["contribution-margin-roas"],
  "seo": ["attribution-overlap"],
  "cro": ["contribution-margin-roas", "attribution-overlap"],
  "shopify-development": ["contribution-margin-roas"],
  "web-development": ["attribution-overlap"],
  "mobile-app-development": ["contribution-margin-roas"],
  "ui-ux-design": ["creative-testing"],
  "ugc-and-video": ["creative-testing"],
  "social-media": ["creative-testing"],
  "influencer-marketing": ["creative-testing"],
  "branding": ["creative-testing"],
  "packaging-design": ["creative-testing"],
  "online-reputation-management": ["contribution-margin-roas"],
  "industries-d2c": ["contribution-margin-roas", "attribution-overlap", "creative-testing"],
  "industries-b2b": ["attribution-overlap"],
  "industries-education": ["attribution-overlap"],
  // New hubs (key and path-slug alias, as for TOOLS_FOR). Calculators are D2C only, so education verticals get a guide but no calculators.
  "aiseo": ["attribution-overlap"], "ai-seo": ["attribution-overlap"], "aeo": ["attribution-overlap"], "geo": ["attribution-overlap"],
  "contentmktg": ["creative-testing", "attribution-overlap"], "content-marketing": ["creative-testing", "attribution-overlap"],
  "gbp": ["attribution-overlap"], "google-business-profile": ["attribution-overlap"],
  "d2cskin": ["contribution-margin-roas", "creative-testing"], "d2cbaby": ["contribution-margin-roas", "creative-testing"],
  "d2cfnb": ["contribution-margin-roas", "attribution-overlap"], "d2cfash": ["creative-testing", "contribution-margin-roas"],
  "b2bmfg": ["attribution-overlap"], "b2bsaas": ["attribution-overlap"],
  "educol": ["attribution-overlap"], "edusab": ["attribution-overlap"],
  // White label and WordPress hubs.
  "wordpress": ["attribution-overlap"], "website-maintenance": ["attribution-overlap"], "white-label": ["attribution-overlap"],
  "ppc": ["contribution-margin-roas", "attribution-overlap"], "meta-ads": ["creative-testing", "attribution-overlap"],
  "social-media-management": ["creative-testing"], "email-marketing": ["contribution-margin-roas"],
  "ecommerce": ["contribution-margin-roas"], "creative-and-video": ["creative-testing"], "reporting": ["attribution-overlap"],
  "geo-aeo": ["attribution-overlap"], "link-building": ["attribution-overlap"], "digital-marketing": ["attribution-overlap"],
  // WooCommerce and locations hubs.
  "woocommerce": ["contribution-margin-roas"], "locations": ["attribution-overlap"], "thane": ["attribution-overlap"], "mumbai": ["attribution-overlap"], "indore": ["attribution-overlap"],
};
export const guidesFor = (key: string) => (GUIDES_FOR[key] || []).map((s) => GUIDES.find((g) => g.slug === s)).filter(Boolean) as typeof GUIDES;

/** page key -> { svc: recorded service tags to match, group: audience used for fallback and ordering } */
const CASE_SERVICES: Record<string, { svc: string[]; group: string }> = {
  "performance-marketing": { svc: ["perf"], group: "d2c" }, "meta-ads": { svc: ["perf"], group: "d2c" },
  "google-ads": { svc: ["perf"], group: "d2c" }, "amazon-ads": { svc: ["amazon"], group: "d2c" },
  "quick-commerce": { svc: ["quickcom"], group: "d2c" }, "lead-generation": { svc: ["leadgen"], group: "b2b" },
  "cro": { svc: ["cro"], group: "d2c" }, "shopify-development": { svc: ["web"], group: "d2c" },
  "web-development": { svc: ["web"], group: "b2b" }, "ugc-and-video": { svc: ["creative"], group: "d2c" },
  "social-media": { svc: ["social"], group: "d2c" }, "retention-marketing": { svc: [], group: "d2c" },
  "seo": { svc: [], group: "b2b" }, "branding": { svc: [], group: "d2c" }, "packaging-design": { svc: [], group: "d2c" },
  "influencer-marketing": { svc: [], group: "d2c" }, "ui-ux-design": { svc: [], group: "d2c" },
  "mobile-app-development": { svc: [], group: "b2b" }, "online-reputation-management": { svc: [], group: "edu" },
  "industries-d2c": { svc: [], group: "d2c" }, "industries-b2b": { svc: [], group: "b2b" }, "industries-education": { svc: [], group: "edu" },
};
export function casesFor(key: string, n = 3): CaseStudy[] {
  const m = CASE_SERVICES[key]; if (!m) return [];
  const inGroup = (c: CaseStudy) => c.group === m.group;
  const matches = CASES.filter((c) => m.svc.length && m.svc.every((s) => c.services.includes(s)));
  const pick = [...matches.filter(inGroup), ...matches.filter((c) => !inGroup(c))];
  const fill = CASES.filter(inGroup).filter((c) => !pick.includes(c));
  const fill2 = CASES.filter((c) => !pick.includes(c) && !fill.includes(c));
  return [...pick, ...fill, ...fill2].slice(0, n);
}

/** Service tag -> the service page that covers it. D2C web work points at Shopify, other web work at website development. */
export function servicePageFor(tag: string, group: string): string | null {
  const m: Record<string, string> = {
    web: group === "d2c" ? "/services/shopify-development/" : "/services/web-development/",
    cro: "/services/cro/", perf: "/services/performance-marketing/", amazon: "/services/performance-marketing/amazon-ads/",
    quickcom: "/services/performance-marketing/quick-commerce/", leadgen: "/services/lead-generation/",
    creative: "/services/ugc-and-video/", social: "/services/social-media/",
  };
  return m[tag] ?? null;
}
export const industryPageFor = (group: string): { href: string; label: string } | null =>
  ({ d2c: { href: "/industries/d2c/", label: "D2C marketing" }, b2b: { href: "/industries/b2b/", label: "B2B marketing" }, edu: { href: "/industries/education/", label: "Education marketing" } } as any)[group] ?? null;
void tagsFor;
