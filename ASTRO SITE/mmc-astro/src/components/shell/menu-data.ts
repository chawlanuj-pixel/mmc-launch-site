// Menu link tree, verbatim from the original Menu.jsx (urls are rewritten with href() at render time).
import { TOOLS, TOOLS_LABEL, BOOK } from "../../lib/site";
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
            { name: "AI photoshoot",            url: "/ai-by-mmc/photoshoot/" },
            { name: "AI video generation",      url: "/ai-by-mmc/video-generation/" },
            { name: "AI UGC",                   url: "/ai-by-mmc/ugc/" },
            { name: "AI spokesperson video",    url: "/ai-by-mmc/spokesperson-video/" },
            { name: "AI sales agent",           url: "/ai-by-mmc/sales-agent/" },
            { name: "AI landing page builder",  url: "/ai-by-mmc/landing-page-builder/" },
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
      hint: "Case studies · By kind of brand"
    },
    {
      n: "05", label: "Resources", url: "resources.html",
      hint: "D2C calculators · Glossary · Guides",
      sub: [
        {
          name: TOOLS_LABEL, desc: "Run your own numbers",
          url: "tools.html", expandKey: "calculators",
          inner: [
            ...TOOLS.map((t) => ({ name: t.short, url: t.href })),
            { name: "D2C marketing glossary",      url: "d2c-marketing-glossary.html" },
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
      hint: "Systems · Principles · FAQ"
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
      n: "08", label: "Guides", url: "guides.html",
      hint: "The method behind the numbers"
    },
    {
      n: "09", label: "Contact", url: "Contact.html",
      hint: `${BOOK} · Visit Thane`
    },
  ];
