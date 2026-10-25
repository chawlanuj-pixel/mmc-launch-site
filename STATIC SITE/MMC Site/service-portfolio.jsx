/* service-portfolio.jsx, Per-service portfolio block. 4 case-study cards in a grid.
   Takes a `service` prop. Each service has its own curated set of cards. */

function ServicePortfolio({ service = "SEO" }) {
  const sets = {
    SEO: {
      eyebrow: "Selected SEO outcomes",
      h: <>SEO that paid for itself, then{" "}<span className="em-serif" style={{color:"var(--mmc-blue)"}}>some.</span></>,
      lead: "A few of the brands we've taken from page-three to category-leader on organic search, AEO and GEO surfaces.",
      cases: [
        { brand: "ATOMA",         cat: "D2C · Skincare",       metric: "8.4x",   sub: "organic revenue · 12mo",  blurb: "Topical clusters + AEO content + technical fix. From 3.2K to 27K monthly organic sessions.",   tags: ["AEO","Cluster","Schema"] },
        { brand: "FOLKLORE",      cat: "Fashion · D2C",        metric: "+184%",  sub: "non-brand traffic · 9mo", blurb: "Re-architected category pages, fixed crawl waste and launched 40 cluster guides.",            tags: ["Tech SEO","Content","IA"] },
        { brand: "THE LEAF COMPANY", cat: "Wellness · D2C",    metric: "#1",     sub: "for 14 commercial terms",  blurb: "Topical authority play across ingredients, conditions and outcomes: 14 head-term #1s in 7mo.", tags: ["Authority","E-E-A-T","SERP"] },
        { brand: "VOLTA",         cat: "SaaS · B2B",           metric: "−42%",   sub: "blended CAC · 6mo",        blurb: "Programmatic LP set + intent-stage content. Organic took 38% of pipeline by Q4.",             tags: ["B2B","Programmatic","Intent"] },
      ],
    },
    CRO: {
      eyebrow: "Selected CRO outcomes",
      h: <>Existing traffic, turned into{" "}<span className="em-serif" style={{color:"var(--mmc-blue)"}}>real revenue.</span></>,
      lead: "Audit, prioritise, test, ship, repeat. The brands below saw their conversion economics change without touching ad budgets.",
      cases: [
        { brand: "AERION",        cat: "D2C · Skincare",       metric: "+38%",   sub: "site-wide CR · 90d",       blurb: "Cart → checkout collapse + 1-step payment + trust block. Cart abandonment dropped 22%.",      tags: ["Checkout","Trust","Mobile"] },
        { brand: "PILLAR",        cat: "Furniture · D2C",      metric: "₹2.4Cr+",sub: "lift · 6mo · same spend",  blurb: "PDP rebuild + comparison table + finance options surfaced. RPV up 64%.",                       tags: ["PDP","RPV","Finance"] },
        { brand: "BEACON",        cat: "Healthcare · D2C",     metric: "+156%",  sub: "LP conversion rate",       blurb: "Replaced hero + reframed offer + moved proof above the fold. 5-test winning sequence.",        tags: ["LP","Proof","Offer"] },
        { brand: "RIBBONS",       cat: "Marketplace · D2C",    metric: "−24%",   sub: "cart abandonment",         blurb: "Removed forced account creation + added guest UPI. Lifted purchase by 28% in one cycle.",      tags: ["Friction","UPI","Guest"] },
      ],
    },
    PM: {
      eyebrow: "Selected performance outcomes",
      h: <>Profitable growth, built on{" "}<span className="em-serif" style={{color:"var(--mmc-blue)"}}>creative systems.</span></>,
      lead: "Brands we've scaled past the point where most accounts plateau. Real numbers, real budgets, real P&Ls.",
      cases: [
        { brand: "MOTH & MORROW", cat: "D2C · Sleep",          metric: "8.7x",   sub: "blended ROAS · 90d",       blurb: "Creative lab from 4 → 18 winners. Founder-led hooks unlocked YT + Reels at the same time.",   tags: ["Meta","UGC","ROAS"] },
        { brand: "QUARRY",        cat: "Fashion · D2C",        metric: "₹38L → ₹2.1Cr", sub: "MMR · 7mo",         blurb: "Funnel rebuild + product-led PMax + retention nudges. Profitable at 5x scale.",                tags: ["PMax","Retention","Funnel"] },
        { brand: "OBJEKT",        cat: "Home · D2C",           metric: "−34%",   sub: "CAC · 6mo",                blurb: "Killed weak audiences, doubled-down on a winning hook system. 12 hooks × 3 formats / week.",   tags: ["CAC","Hooks","Cohorts"] },
        { brand: "VEER",          cat: "Healthcare · D2C",     metric: "4.6 : 1", sub: "LTV : CAC · 12mo",        blurb: "Acquisition + retention paced together. Replenishment cohort drove 38% repeat by month 4.",   tags: ["LTV","Repeat","D2C"] },
      ],
    },
    Branding: {
      eyebrow: "Selected branding work",
      h: <>Identities built to{" "}<span className="em-serif" style={{color:"var(--mmc-blue)"}}>lead categories.</span></>,
      lead: "Full identity systems: naming, logo, voice, packaging-ready guidelines - for brands that needed to do more than just exist.",
      cases: [
        { brand: "ATOMA",         cat: "Naming · Identity",    metric: "01",     sub: "category created",         blurb: "Named, positioned, identified and launched. Now a category-defining wellness brand.",          tags: ["Naming","System","Voice"] },
        { brand: "MOTH & MORROW", cat: "Rebrand",              metric: "+220%",  sub: "brand recall · 6mo",       blurb: "From utilitarian to ritual. Identity, photography direction and packaging in one wave.",       tags: ["Rebrand","Photo","Pack"] },
        { brand: "PILLAR",        cat: "Identity",             metric: "1.0 → 2.0", sub: "system depth",           blurb: "Single-mark logo to full system: typography, motion, voice, illustration vocabulary.",         tags: ["System","Motion","Type"] },
        { brand: "QUARRY",        cat: "Naming · Identity",    metric: "₹14Cr+", sub: "seed round closed",        blurb: "Identity built the deck. Investors said the brand was the differentiator.",                    tags: ["Naming","Deck","Story"] },
      ],
    },
    Packaging: {
      eyebrow: "Selected packaging work",
      h: <>Packaging that{" "}<span className="em-serif" style={{color:"var(--mmc-blue)"}}>earns shelf.</span></>,
      lead: "Structural and graphic design for shelves, marketplaces and quick-commerce: built to convert in 1.7 seconds.",
      cases: [
        { brand: "AERION",        cat: "Skincare · Carton",    metric: "+44%",   sub: "shelf pick-up rate",       blurb: "Restructured the SKU family. Common architecture, distinct skus. Won shelf in 90 days.",       tags: ["Carton","Family","Shelf"] },
        { brand: "THE LEAF COMPANY", cat: "Wellness · Bottle", metric: "01",     sub: "regulatory pass · v1",     blurb: "FSSAI-compliant from day one. Designed once, shipped without re-design.",                       tags: ["FSSAI","Bottle","System"] },
        { brand: "VOLTA",         cat: "Beverage · Can",       metric: "+126%",  sub: "Blinkit add-to-cart",      blurb: "Re-art for tile-first browsing. Logo, hero ingredient, claim: readable at 80px.",              tags: ["QC","Tile","Claim"] },
        { brand: "PILLAR",        cat: "Home · Unboxing",      metric: "9.4 / 10", sub: "post-purchase NPS",      blurb: "Unboxing system + insert cards + thank-you ritual. Reviews mention packaging in 41% of UGC.",  tags: ["Unbox","Insert","UGC"] },
      ],
    },
    "Web Development": {
      eyebrow: "Selected web builds",
      h: <>Websites that{" "}<span className="em-serif" style={{color:"var(--mmc-blue)"}}>perform.</span></>,
      lead: "Fast, conversion-tuned, SEO-instrumented websites: built on Shopify, headless and custom stacks for D2C, B2B and SaaS.",
      cases: [
        { brand: "ATOMA",         cat: "Shopify · Headless",   metric: "1.1s",   sub: "median LCP · mobile",      blurb: "Headless build with image CDN + edge cache. Lighthouse 96 / 98 / 100 / 100.",                  tags: ["Shopify","Headless","Perf"] },
        { brand: "VOLTA",         cat: "Marketing site",        metric: "+184%",  sub: "demo-to-signup rate",      blurb: "Replaced 12-page Webflow with a 5-page intentional site. Conversion architecture, not features.", tags: ["B2B","Webflow","CRO"] },
        { brand: "PILLAR",        cat: "Shopify Plus",         metric: "+28%",   sub: "site-wide CR · 90d",       blurb: "PDP rebuild, predictive search, finance options in cart. Lifts in every funnel step.",         tags: ["Plus","PDP","Search"] },
        { brand: "BEACON",        cat: "Healthcare site",       metric: "01",     sub: "DPDP-ready launch",        blurb: "Compliance, consent, content and clinical pages built in one wave. No re-platform needed.",   tags: ["DPDP","Consent","Care"] },
      ],
    },
    "Quick Commerce": {
      eyebrow: "Selected QC outcomes",
      h: <>Brands that{" "}<span className="em-serif" style={{color:"var(--mmc-blue)"}}>own the tile.</span></>,
      lead: "Blinkit, Zepto, Instamart, BB Now: listing science + media + replen ops + dark-store visibility, treated as one system.",
      cases: [
        { brand: "ATOMA",         cat: "Blinkit · Zepto",      metric: "₹0 → ₹1.4Cr/mo", sub: "GMV · 5mo",        blurb: "Launch from scratch. Listing-first, then ads, then replen. Hit #1 in category by month 4.",   tags: ["Launch","Listing","Replen"] },
        { brand: "VOLTA",         cat: "Zepto · Instamart",    metric: "+212%",  sub: "tile CTR · 60d",           blurb: "Re-art across 18 SKUs for tile-first browsing. Hero claim moved up 38% in scroll attention.",  tags: ["Tile","Art","SKU"] },
        { brand: "RIBBONS",       cat: "Blinkit · BB Now",     metric: "1.8x",   sub: "ROAS lift · 90d",          blurb: "Bid strategy + creative + dark-store-level promo. Profitable at scale, not just visible.",     tags: ["Ads","DSM","ROAS"] },
        { brand: "QUARRY",        cat: "Quick Commerce ops",   metric: "−18%",   sub: "OOS rate · 90d",           blurb: "Replen ops, stock health, dark-store map. Visibility became repeatable.",                       tags: ["Replen","OOS","Ops"] },
      ],
    },
    "Ecommerce Management": {
      eyebrow: "Selected ecommerce outcomes",
      h: <>Marketplaces, run as the{" "}<span className="em-serif" style={{color:"var(--mmc-blue)"}}>main channel.</span></>,
      lead: "Amazon, Flipkart and Myntra account management: listing science, ads, ratings, AMS, brand store, A+ content, the lot.",
      cases: [
        { brand: "OBJEKT",        cat: "Amazon · Flipkart",    metric: "₹4Cr+",  sub: "incremental · 6mo",        blurb: "A+ rebuild + Sponsored Brands + ratings ops. Best-Seller badge in 3 sub-categories.",          tags: ["A+","SB","Ratings"] },
        { brand: "FOLKLORE",      cat: "Myntra · Style",       metric: "+148%",  sub: "Myntra ROAS · 90d",        blurb: "Style-page tuning + ad mix shift to BPM. Moved out of long-tail, into hero.",                  tags: ["Myntra","BPM","Style"] },
        { brand: "VEER",          cat: "Amazon · Brand Store", metric: "01",     sub: "brand store launched",      blurb: "Stories, comparisons and category storytelling, not a glorified PLP.",                          tags: ["Store","A+","Brand"] },
        { brand: "PILLAR",        cat: "Marketplace ops",      metric: "+24pp",  sub: "buy-box win rate",         blurb: "Price + stock + reviews managed as one system. Margins held, share grew.",                     tags: ["Buy-Box","Repricer","Reviews"] },
      ],
    },
  };

  const data = sets[service] || sets.SEO;

  return (
    <section id="portfolio" className="sp" data-screen-label="N Portfolio">
      <div className="container">
        <header className="sp__head">
          <div className="sp__head-l">
            <div className="eyebrow">{data.eyebrow}</div>
            <h2 className="sp__h">{data.h}</h2>
            <p className="sp__lead">{data.lead}</p>
          </div>
          <a className="sp__head-link" href="Our Work.html">
            See the full portfolio <span className="arrow"></span>
          </a>
        </header>

        <div className="sp__grid">
          {data.cases.map((c, i) => (
            <article key={i} className="sp__card">
              <span className="sp__card-n">{String(i + 1).padStart(2, "0")}</span>
              <header className="sp__card-head">
                <span className="sp__card-brand">{c.brand}</span>
                <span className="sp__card-cat">{c.cat}</span>
              </header>
              <div className="sp__card-metric">
                <span className="sp__card-metric-n">{c.metric}</span>
                <span className="sp__card-metric-l">{c.sub}</span>
              </div>
              <p className="sp__card-blurb">{c.blurb}</p>
              <ul className="sp__card-tags">
                {c.tags.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .sp { position: relative; z-index: 1; padding: clamp(56px, 8vw, 112px) 0; }
        .sp__head {
          display: grid; grid-template-columns: 1fr auto;
          gap: clamp(24px, 4vw, 56px); align-items: end;
          margin-bottom: clamp(36px, 5vw, 64px);
        }
        .sp__head-l { max-width: 820px; }
        .sp__h {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(30px, 4vw, 56px); letter-spacing: -0.03em;
          line-height: 1.04; margin: 18px 0 22px; color: var(--fg-1);
        }
        .sp__lead {
          font-family: var(--font-body); font-size: clamp(16px, 1.2vw, 19px);
          line-height: 1.55; color: var(--fg-2); margin: 0; max-width: 640px;
        }
        .sp__head-link {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--font-display); font-weight: 700;
          font-size: 15px; letter-spacing: -0.01em;
          color: var(--mmc-blue);
          padding-bottom: 4px;
          border-bottom: 1.5px solid var(--mmc-yellow);
          white-space: nowrap;
          transition: gap var(--dur-base) var(--ease-out);
        }
        .sp__head-link:hover { gap: 14px; }

        .sp__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(18px, 2vw, 28px);
        }
        .sp__card {
          position: relative;
          display: flex; flex-direction: column; gap: 18px;
          padding: clamp(26px, 3vw, 38px);
          background: rgba(255,255,255,0.86);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          border-radius: 22px;
          backdrop-filter: blur(10px);
          transition: transform var(--dur-base) var(--ease-out),
                      box-shadow var(--dur-base) var(--ease-out),
                      border-color var(--dur-base) var(--ease-out);
        }
        .sp__card:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 48px -28px rgba(var(--mmc-blue-rgb), 0.30);
          border-color: rgba(var(--mmc-blue-rgb), 0.22);
          position: relative; z-index: 2;
        }
        .sp__card-n {
          position: absolute; top: 22px; right: 22px;
          font-family: var(--font-display); font-weight: 800;
          font-size: 12.5px; letter-spacing: 0.18em;
          color: var(--mmc-yellow); font-variant-numeric: tabular-nums;
        }
        .sp__card-head {
          display: flex; flex-direction: column; gap: 6px;
        }
        .sp__card-brand {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(20px, 1.8vw, 26px);
          letter-spacing: 0.04em; line-height: 1.1;
          color: var(--fg-1);
        }
        .sp__card-cat {
          font-family: var(--font-body); font-size: 11px; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--mmc-blue-700);
        }
        .sp__card-metric {
          display: flex; flex-direction: column; gap: 4px;
          padding: 16px 0;
          border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
        }
        .sp__card-metric-n {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(34px, 4vw, 56px);
          letter-spacing: -0.04em; line-height: 1;
          color: var(--mmc-blue);
          font-variant-numeric: tabular-nums;
        }
        .sp__card-metric-l {
          font-family: var(--font-serif); font-style: italic; font-weight: 500;
          font-size: 14.5px; line-height: 1.4;
          color: var(--mmc-blue);
        }
        .sp__card-blurb {
          font-family: var(--font-body); font-size: 15px;
          line-height: 1.6; color: var(--fg-2); margin: 0;
        }
        .sp__card-tags {
          list-style: none; margin: auto 0 0; padding: 0;
          display: flex; flex-wrap: wrap; gap: 6px;
        }
        .sp__card-tags li {
          font-family: var(--font-body); font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--mmc-blue-700);
          background: rgba(var(--mmc-blue-rgb), 0.06);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          padding: 5px 10px; border-radius: 999px;
        }

        @media (max-width: 900px) {
          .sp__head { grid-template-columns: 1fr; }
          .sp__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
window.ServicePortfolio = ServicePortfolio;
