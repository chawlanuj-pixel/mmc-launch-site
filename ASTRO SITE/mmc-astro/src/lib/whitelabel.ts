// White-label section: the constants that the templates share (added 22 Oct 2026, white-label technical SEO pass).
// Source of each decision: SEO-WHITELABEL/APPROVED-DECISIONS.md (owner, 22 Oct 2026) and TABLE-C-silos-and-internal-links.csv.
// Change wording or lists here only; every page reads them from this file.

/** True for /white-label/ and every page under it. */
export const isWhiteLabel = (path: string): boolean => /^\/white-label(\/|$)/.test(path);

/** Page key for the tools and guides lookup (TOOLS_FOR / GUIDES_FOR). It has no entry there on purpose:
 *  white-label pages show no D2C calculators and no D2C guides. Add an entry in both maps when agency guides exist. */
export const WL_TOOLS_KEY = "white-label-agency";

/** Countries and regions the owner confirmed for white-label work (APPROVED-DECISIONS.md, 22 Oct 2026).
 *  Used as areaServed on every white-label Service node. "Rest of Europe" is expressed as the region Europe. */
export const WL_AREA_SERVED = [
  { "@type": "Country", name: "United States" },
  { "@type": "Country", name: "United Kingdom" },
  { "@type": "Country", name: "Canada" },
  { "@type": "Country", name: "Australia" },
  { "@type": "Country", name: "United Arab Emirates" },
  { "@type": "Country", name: "Singapore" },
  { "@type": "Country", name: "India" },
  { "@type": "Place", name: "Europe" },
];

/** Who white-label services are for. */
export const WL_AUDIENCE = { "@type": "BusinessAudience", audienceType: "Marketing agencies" };

/** Sets areaServed and audience on every Service node of a white-label page. Other nodes are returned unchanged.
 *  (The hub JSON files still carry areaServed India; this override wins at build time.) */
export function whiteLabelJsonld<T>(blocks: T): T {
  if (!Array.isArray(blocks)) return blocks;
  return blocks.map((b: any) => (b && b["@type"] === "Service" ? { ...b, areaServed: WL_AREA_SERVED, audience: WL_AUDIENCE } : b)) as T;
}

/** The "Are you an agency?" line on direct service pages. Plain wording, British spelling, no em dashes.
 *  Rendered as: `${lead} ${see} <a>{anchor}</a>.` */
export const AGENCY_LINE = { lead: "Are you an agency?", see: "See" } as const;

/** Direct page -> white-label twin and link text (TABLE-C "direct twin" rows, all 21). */
export const AGENCY_TWINS: Record<string, { href: string; anchor: string }> = {
  "/services/seo/": { href: "/white-label/seo/", anchor: "white-label SEO for agencies" },
  "/services/performance-marketing/google-ads/": { href: "/white-label/ppc/", anchor: "white-label PPC and Google Ads for agencies" },
  "/services/performance-marketing/meta-ads/": { href: "/white-label/meta-ads/", anchor: "white-label Facebook and Meta Ads for agencies" },
  "/services/web-development/": { href: "/white-label/web-development/", anchor: "white-label web development for agencies" },
  "/services/web-development/wordpress/": { href: "/white-label/wordpress-development/", anchor: "white-label WordPress development for agencies" },
  "/services/website-maintenance/": { href: "/white-label/website-maintenance/", anchor: "white-label website maintenance for agencies" },
  "/services/shopify-development/": { href: "/white-label/shopify-development/", anchor: "white-label Shopify development for agencies" },
  "/services/social-media/": { href: "/white-label/social-media-management/", anchor: "white-label social media management for agencies" },
  "/services/content-marketing/": { href: "/white-label/content-marketing/", anchor: "white-label content marketing for agencies" },
  "/services/ugc-and-video/": { href: "/white-label/creative-and-video/", anchor: "white-label design, video and UGC for agencies" },
  "/services/retention-marketing/": { href: "/white-label/email-marketing/", anchor: "white-label email marketing for agencies" },
  "/services/cro/": { href: "/white-label/cro/", anchor: "white-label CRO for agencies" },
  "/services/lead-generation/": { href: "/white-label/lead-generation/", anchor: "white-label lead generation for agencies" },
  "/services/performance-marketing/amazon-ads/": { href: "/white-label/ecommerce/", anchor: "white-label ecommerce and Amazon for agencies" },
  "/services/online-reputation-management/": { href: "/white-label/orm/", anchor: "white-label reputation management for agencies" },
  "/services/seo/geo/": { href: "/white-label/geo-aeo/", anchor: "white-label GEO and AEO for agencies" },
  "/services/mobile-app-development/": { href: "/white-label/app-development/", anchor: "white-label app development for agencies" },
  "/services/ui-ux-design/": { href: "/white-label/web-design/", anchor: "white-label web design for agencies" },
  "/ai-by-mmc/": { href: "/white-label/ai-services/", anchor: "white-label AI services for agencies" },
  // TABLE-C lists these two as "white-label services for agencies for agencies" (doubled phrase); the duplicate is dropped here.
  "/about/": { href: "/white-label/", anchor: "white-label services for agencies" },
  "/services/": { href: "/white-label/", anchor: "white-label services for agencies" },
};
export const agencyTwin = (path: string) => AGENCY_TWINS[path];

/** Hub body grid: TABLE-C silo groups, in TABLE-C order. Labels are the TABLE-C silo names (copywriter may rename).
 *  Paths not built yet (for example /white-label/local-seo/, gated) are skipped automatically because they have no page.
 *  /white-label/digital-marketing/ is left out: it is to be merged into the hub (merge gated on Search Console data). */
export const WL_GROUPS: Array<{ label: string; paths: string[] }> = [
  { label: "Search", paths: ["/white-label/seo/", "/white-label/link-building/", "/white-label/geo-aeo/", "/white-label/local-seo/"] },
  { label: "Paid media", paths: ["/white-label/ppc/", "/white-label/meta-ads/"] },
  { label: "Web and tech", paths: ["/white-label/web-development/", "/white-label/web-design/", "/white-label/wordpress-development/", "/white-label/website-maintenance/", "/white-label/shopify-development/", "/white-label/app-development/"] },
  { label: "Content and creative", paths: ["/white-label/social-media-management/", "/white-label/content-marketing/", "/white-label/creative-and-video/"] },
  { label: "Retention and growth", paths: ["/white-label/email-marketing/", "/white-label/cro/", "/white-label/lead-generation/", "/white-label/ecommerce/", "/white-label/orm/"] },
  { label: "AI", paths: ["/white-label/ai-services/"] },
  { label: "Operations and delivery", paths: ["/white-label/outsourcing/", "/white-label/reseller-programme/", "/white-label/pricing-models/", "/white-label/reporting/", "/white-label/register/"] },
  { label: "International delivery", paths: ["/white-label/india/"] },
];

/** Pages under /white-label/ that are not hub JSON pages: their visible breadcrumb name (from the page file). */
const WL_STATIC_NAMES: Record<string, string> = { "/white-label/register/": "Register as a partner" };

/** Resolves WL_GROUPS against the built pages. Link text is the page's own breadcrumb name (its visible short title). */
export function whiteLabelGroups(): Array<{ label: string; links: Array<{ n: string; href: string }> }> {
  const mods = import.meta.glob("../data/hubs/white-label*.json", { eager: true, import: "default" }) as Record<string, any>;
  const names: Record<string, string> = { ...WL_STATIC_NAMES };
  for (const d of Object.values(mods)) {
    const bc = (d.jsonld || []).find((b: any) => b && b["@type"] === "BreadcrumbList");
    const last = bc?.itemListElement?.[bc.itemListElement.length - 1];
    if (d.path && last?.name) names[d.path] = last.name;
  }
  return WL_GROUPS.map((g) => ({ label: g.label, links: g.paths.filter((p) => names[p]).map((p) => ({ n: names[p], href: p })) })).filter((g) => g.links.length > 0);
}
