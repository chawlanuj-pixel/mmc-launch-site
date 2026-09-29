// Menu link tree, verbatim from the original Menu.jsx (urls are rewritten with href() at render time).
export interface MenuInner { name: string; url: string }
export interface MenuSub { name: string; desc: string; url: string; expandKey?: string; inner?: MenuInner[] }
export interface MenuLink { n: string; label: string; url: string; hint: string; sub?: MenuSub[] }

export const menuLinks: MenuLink[] = [
    {
      n: "01", label: "Home", url: "index.html",
      hint: "We build revenue engines."
    },
    {
      n: "02", label: "Services", url: "services.html",
      hint: "Paid media, search, creative, brand and build",
      sub: [
        {
          name: "Design", desc: "Identity, packaging and product design",
          url: "branding.html", expandKey: "svc-design",
          inner: [
            { name: "Branding",                 url: "branding.html" },
            { name: "Packaging design",         url: "packaging-design.html" },
            { name: "UI/UX design",             url: "ui-ux-design.html" },
          ]
        },
        {
          name: "Marketing", desc: "Paid media, search, leads and retention",
          url: "performance-marketing.html", expandKey: "svc-marketing",
          inner: [
            { name: "Performance marketing",   url: "performance-marketing.html" },
            { name: "Meta Ads",                url: "meta-ads.html" },
            { name: "Google Ads",              url: "google-ads.html" },
            { name: "Amazon Ads",              url: "amazon-ads.html" },
            { name: "Quick commerce ads",      url: "quick-commerce-ads.html" },
            { name: "Lead generation",         url: "lead-generation.html" },
            { name: "Retention marketing",     url: "retention-marketing.html" },
            { name: "Online reputation management", url: "online-reputation-management.html" },
            { name: "SEO",                     url: "seo.html" },
            { name: "Conversion optimisation", url: "conversion-rate-optimisation.html" },
            { name: "Influencer marketing",    url: "influencer-marketing.html" },
          ]
        },
        {
          name: "Technology", desc: "Storefronts, websites and apps",
          url: "shopify-development.html", expandKey: "svc-technology",
          inner: [
            { name: "Shopify development",     url: "shopify-development.html" },
            { name: "Website development",     url: "web-development.html" },
            { name: "Mobile app development",  url: "mobile-app-development.html" },
          ]
        },
        {
          name: "Content", desc: "Creative made to run as ads",
          url: "ugc-and-video.html", expandKey: "svc-content",
          inner: [
            { name: "UGC and video",           url: "ugc-and-video.html" },
            { name: "Social media creatives",  url: "social-media-creatives.html" },
          ]
        },
        {
          name: "AI", desc: "AI by MMC, our AI production line",
          url: "/ai-by-mmc/", expandKey: "svc-ai",
          inner: [
            { name: "AI by MMC overview",       url: "/ai-by-mmc/" },
            { name: "AI photoshoot",            url: "/ai-by-mmc/ai-photoshoot.html" },
            { name: "AI video generation",      url: "/ai-by-mmc/ai-video-generation.html" },
            { name: "AI UGC",                   url: "/ai-by-mmc/ai-ugc.html" },
            { name: "AI spokesperson video",    url: "/ai-by-mmc/ai-spokesperson-video.html" },
            { name: "AI sales agent",           url: "/ai-by-mmc/ai-sales-agent.html" },
            { name: "AI landing page builder",  url: "/ai-by-mmc/ai-landing-page-builder.html" },
          ]
        },
      ]
    },
    {
      n: "03", label: "Industries", url: "industries.html",
      hint: "D2C · B2B · Education",
      sub: [
        { name: "D2C brands",             desc: "Ads, store, creative, retention", url: "d2c.html" },
        { name: "B2B companies",          desc: "Leads judged on fit",             url: "b2b.html" },
        { name: "Educational institutes", desc: "Enquiries through to enrolment",  url: "education.html" },
      ]
    },
    {
      n: "04", label: "Our Work", url: "Our Work.html",
      hint: "Featured · Growth Blueprints · Industries"
    },
    {
      n: "05", label: "Resources", url: "resources.html",
      hint: "Calculators · Glossary · Guides",
      sub: [
        {
          name: "Calculators", desc: "Run your own numbers",
          url: "tools.html", expandKey: "calculators",
          inner: [
            { name: "Unit Economics Calculator",   url: "unit-economics-calculator.html" },
            { name: "Growth Trajectory Calculator", url: "growth-trajectory-calculator.html" },
            { name: "CAC Runway Calculator",       url: "cac-runway-calculator.html" },
            { name: "Funnel ROAS Calculator",      url: "funnel-roas-calculator.html" },
            { name: "Break-even ROAS Calculator",  url: "breakeven-roas-calculator.html" },
            { name: "LTV : CAC Calculator",        url: "ltv-cac-calculator.html" },
            { name: "D2C Marketing Glossary",      url: "d2c-marketing-glossary.html" },
          ]
        },
        {
          name: "Guides", desc: "The method behind the numbers",
          url: "guides.html", expandKey: "guides",
          inner: [
            { name: "All guides",                            url: "guides.html" },
            { name: "Contribution margin and break-even ROAS", url: "guide-contribution-margin-roas.html" },
            { name: "Why platform dashboards over-count",    url: "guide-attribution-overlap.html" },
            { name: "How D2C brands test creative",          url: "guide-creative-testing.html" },
          ]
        },
      ]
    },
    {
      n: "06", label: "About Us", url: "About.html",
      hint: "Story · Team · Awards · Press"
    },
    {
      n: "07", label: "Careers", url: "Careers.html",
      hint: "6 open senior roles · Apply with one page",
      sub: [
        {
          name: "Performance", desc: "Run media at scale",
          url: "Careers.html", expandKey: "performance",
          inner: [
            { name: "Senior Meta Buyer · Mumbai",           url: "/careers/senior-meta-buyer/" },
            { name: "Google + Amazon Specialist · Mumbai",  url: "/careers/google-amazon-specialist/" },
          ]
        },
        {
          name: "Creative", desc: "Direct + write the work",
          url: "Careers.html", expandKey: "creative",
          inner: [
            { name: "Senior Art Director · Mumbai",        url: "/careers/senior-art-director/" },
            { name: "Performance Copywriter · Remote",     url: "/careers/performance-copywriter/" },
          ]
        },
        {
          name: "Strategy", desc: "Own a P&L",
          url: "Careers.html", expandKey: "strategy",
          inner: [
            { name: "Growth Strategist · D2C · Mumbai",     url: "/careers/growth-strategist/" },
          ]
        },
        {
          name: "Technology", desc: "Ship the stack",
          url: "Careers.html", expandKey: "tech",
          inner: [
            { name: "Shopify Plus Engineer · Remote",       url: "/careers/shopify-engineer/" },
          ]
        },
      ]
    },
    {
      n: "08", label: "Insights", url: "Insights.html",
      hint: "Founder's Journal · Playbooks · Breakdowns"
    },
    {
      n: "09", label: "Contact", url: "Contact.html",
      hint: "Book a call · Visit Thane"
    },
  ];
