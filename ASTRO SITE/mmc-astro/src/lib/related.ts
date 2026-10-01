// Cards for the "Related" band on pages that are not driven by the hub JSON (the performance, services and D2C pages).
// Names come from the menu, so "See [exact page name]" is always right.
import { pageName } from "./services";
import { href } from "./links";
const REG: Record<string, { d: string; img: string }> = {
  "performance-marketing.html": { d: "Media buying on Meta, Google, Amazon and quick commerce, judged on contribution margin.", img: "pm-v3/channel-meta.jpg" },
  "meta-ads.html": { d: "Instagram and Facebook campaigns built as one funnel.", img: "meta/creative.jpg" },
  "google-ads.html": { d: "Search, shopping and video aimed at buying intent.", img: "google/search.jpg" },
  "amazon-ads.html": { d: "Sponsored ads, listings and brand content, read against total sales.", img: "pm-v3/channel-amazon.jpg" },
  "quick-commerce-ads.html": { d: "Listings and placements on quick-commerce apps.", img: "pm-v3/channel-quickcommerce.jpg" },
  "lead-generation.html": { d: "Paid media, landing pages and follow-up funnels connected to your CRM.", img: "b2b/qualify.jpg" },
  "retention-marketing.html": { d: "WhatsApp, email and loyalty funnels that bring buyers back.", img: "rt/journey.jpg" },
  "ugc-and-video.html": { d: "Creator-style video made to run as ads and refreshed before it tires.", img: "ugc/shoot.jpg" },
  "shopify-development.html": { d: "Stores built for browsing, speed and checkout.", img: "shop/design.jpg" },
  "conversion-rate-optimisation.html": { d: "Find where visitors leave your store and test fixes.", img: "cro/pdp.jpg" },
  "d2c.html": { d: "Ads, creative, conversion and retention for brands that sell direct to shoppers.", img: "d2c/packing.jpg" },
  "b2b.html": { d: "Websites, creative and lead generation for companies that win business from other businesses.", img: "shared/b2b.jpg" },
  "education.html": { d: "Websites, lead generation and reputation for colleges and education brands.", img: "shared/education.jpg" },
  "online-reputation-management.html": { d: "Ratings, reviews and replies, so a buyer, parent or student finds a fair picture.", img: "orm/reply.jpg" },
  "services.html": { d: "Paid media, search, brand, technology and content, run by one team.", img: "sv/revenue.jpg" },
};
export function relatedCards(hrefs: string[]) {
  return hrefs.map((h) => {
    const r = REG[h];
    if (!r) throw new Error("[related] no card data for " + h);
    const n = pageName(h) || h;
    return { n, d: r.d, img: r.img, href: href(h), link: "See " + n };
  });
}
