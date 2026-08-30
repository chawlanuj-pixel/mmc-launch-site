/* home26/partners.jsx, the platforms MMC actually runs on.
   Marks are simple inline glyphs in each platform's own colour, recognisable
   without reproducing anyone's logo artwork, the same approach clients-strip.jsx
   already uses. Grouped by what the platform is FOR, so the section reads as a
   capability map rather than a wall of badges. */

/* Each mark is the platform's own artwork, fetched from the source recorded in
   assets/platforms/README.md, rather than a glyph drawn to resemble it. The
   marks that used to live here were approximations and several were simply the
   wrong logo: the Google Ads triangle was Google's own G, Razorpay and Klaviyo
   were invented shapes.

   `img` rather than inline SVG because the files are the vendors' own and are
   replaced wholesale when a brand refreshes, and because a platform with no
   artwork sourced yet can then fall back on its own. */
const P_FILE = {
  meta: "meta.svg",       google: "google.svg",     amazon: "amazon.svg",
  tiktok: "tiktok.svg",   youtube: "youtube.svg",   linkedin: "linkedin.svg",
  shopify: "shopify.svg", gokwik: "gokwik.png",     shopflo: "shopflo.png",
  razorpay: "razorpay.svg", whatsapp: "whatsapp.svg", klaviyo: "klaviyo.svg",
  moengage: "moengage.png", ga4: "ga4.svg",         tableau: "tableau.png",
  adobe: "adobe.svg",     mixpanel: "mixpanel.svg",
};

/* BuySpeed has no entry above on purpose. Nothing by that name exists in the
   Indian D2C checkout market this group lists: buyspeed.com is US procurement
   software, unrelated to the rest of the row. Until the intended platform is
   confirmed it keeps a neutral placeholder rather than borrowing someone
   else's logo. */
const P_FALLBACK = {
  buyspeed: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 15.4h8M6 11.6h9M8 7.8h9" fill="none" stroke="#F0603C" strokeWidth="2.1" strokeLinecap="round"/>
      <path d="M15.6 18.6 20 12l-4.4-6.6" fill="none" stroke="#F0603C" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"/></svg>),
};

function PMark({ k }) {
  const f = P_FILE[k];
  if (!f) return P_FALLBACK[k] || null;
  return <img className="n-plogo__img" src={"assets/platforms/" + f}
              alt="" loading="lazy" decoding="async" />;
}

const P_GROUPS = [
  { h: "Media & platforms", items: [
    { k: "meta",     n: "Meta Ads",        b: "Partner" },
    { k: "google",   n: "Google Ads",      b: "Partner" },
    { k: "amazon",   n: "Amazon Ads",      b: null },
    { k: "tiktok",   n: "TikTok Ads",      b: null },
    { k: "youtube",  n: "YouTube",         b: null },
    { k: "linkedin", n: "LinkedIn Ads",    b: null },
  ]},
  { h: "Commerce & checkout", items: [
    { k: "shopify",  n: "Shopify Plus",    b: "Partner" },
    { k: "gokwik",   n: "GoKwik",          b: null },
    { k: "shopflo",  n: "Shopflo",         b: null },
    { k: "buyspeed", n: "BuySpeed",        b: null },
    { k: "razorpay", n: "Razorpay",        b: null },
  ]},
  { h: "Retention & messaging", items: [
    { k: "whatsapp", n: "WhatsApp Business", b: "API" },
    { k: "klaviyo",  n: "Klaviyo",         b: null },
    { k: "moengage", n: "MoEngage",        b: null },
  ]},
  { h: "Measurement & BI", items: [
    { k: "ga4",      n: "GA4",             b: null },
    { k: "tableau",  n: "Tableau",         b: null },
    { k: "adobe",    n: "Adobe Analytics", b: null },
    { k: "mixpanel", n: "Mixpanel",        b: null },
  ]},
];

function NPartners() {
  return (
    <section className="n-band n-band--void" id="partners">
      <div className="n-wrap">
        <div className="n-head n-rise">
          <div className="n-head__l">
            <span className="n-eyebrow">Partners &amp; platforms</span>
            <h2 className="n-h2">
              We don't just advise on the stack.<br />
              <span className="n-serif">We run it.</span>
            </h2>
          </div>
          <p className="n-lede">
            Eighteen platforms across media, checkout, retention and measurement, configured,
            integrated and operated in-house. No handoffs to a third party, no "ask your
            developer".
          </p>
        </div>

        <div className="n-partners">
          {P_GROUPS.map((g, gi) => (
            <div className={"n-pgroup n-rise d" + Math.min(4, gi + 1)} key={g.h}>
              <h3 className="n-pgroup__h">{g.h}</h3>
              <div className="n-plist">
                {g.items.map((it) => (
                  <div className="n-plogo" key={it.n}>
                    <span className="n-plogo__m"><PMark k={it.k} /></span>
                    <span className="n-plogo__n">{it.n}</span>
                    {it.b && <span className="n-plogo__b">{it.b}</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.NPartners = NPartners;
