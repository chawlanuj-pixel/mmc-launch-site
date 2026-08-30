/* home26/sections.jsx: hero, proof, capabilities, work, process, quote, CTA. */

const { useState: nUseState, useEffect: nUseEffect, useRef: nUseRef } = React;

/* Reveal-on-scroll. One observer for the whole page. */
function useReveal() {
  nUseEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      document.querySelectorAll(".n-rise").forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    const tick = () => document.querySelectorAll(".n-rise:not(.is-in)").forEach((el) => io.observe(el));
    tick();
    const t = setInterval(tick, 700);
    return () => { clearInterval(t); io.disconnect(); };
  }, []);
}

/* Count-up that fires when the number scrolls into view. */
function NCount({ to, decimals = 0, prefix = "", suffix = "", dur = 1500 }) {
  const ref = nUseRef(null);
  const [v, setV] = nUseState(0);
  nUseEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf, io, done = false;
    const run = () => {
      if (done) return;
      done = true;
      if (io) io.disconnect();
      if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(to); return; }
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        setV(to * (1 - Math.pow(1 - p, 4)));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    // The hero's stat row sits right on the fold, where a 40%-visibility
    // threshold may never trip, leaving the headline numbers reading zero.
    // Start immediately if any part of the element is already on screen.
    const onScreen = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };
    if (typeof IntersectionObserver === "undefined" || onScreen()) { run(); return () => cancelAnimationFrame(raf); }

    io = new IntersectionObserver((es) => { if (es[0].isIntersecting) run(); },
      { threshold: 0.05, rootMargin: "0px 0px -4% 0px" });
    io.observe(el);
    // Belt and braces: never leave a number sitting at zero.
    const guard = setTimeout(() => { if (!done && onScreen()) run(); }, 1200);
    return () => { if (io) io.disconnect(); clearTimeout(guard); cancelAnimationFrame(raf); };
  }, [to, dur]);
  return <span ref={ref}>{prefix}{v.toFixed(decimals)}<i>{suffix}</i></span>;
}

/* ── Hero ──────────────────────────────────────────────────── */
function NHero() {
  return (
    <header className="n-band n-band--void n-hero" id="top">
      <span className="n-hero__glow" aria-hidden="true" />
      <span className="n-hero__grid" aria-hidden="true" />
      <div className="n-wrap n-hero__in">
        <span className="n-hero__tag n-rise"><i />Full-service growth studio · Bengaluru &amp; Mumbai</span>
        <h1 className="n-h1 n-hero__h n-rise d1">
          Performance marketing<br />that survives the <span className="n-serif">P&amp;L.</span>
        </h1>
        <p className="n-lede n-hero__p n-rise d2">
          Media, creative, retention and technology run by one senior team, measured on
          contribution margin, not on the dashboard screenshot.
        </p>
        <div className="n-hero__cta n-rise d3">
          <button className="n-btn n-btn--sun" onClick={(e) => window.mmcBookCall("home-hero", e)}>
            Book a strategy call<span className="n-btn__arr" aria-hidden="true" />
          </button>
          <a className="n-btn n-btn--ghost" href="#work">See the work<span className="n-btn__arr" aria-hidden="true" /></a>
        </div>
        <div className="n-hero__foot n-rise d4">
          <span className="n-hero__fact"><b><NCount to={248} prefix="₹" suffix="Cr+" /></b><span>Revenue compounded</span></span>
          <span className="n-hero__fact"><b><NCount to={8.7} decimals={1} suffix="×" /></b><span>Median blended ROAS</span></span>
          <span className="n-hero__fact"><b><NCount to={24} suffix="" /></b><span>Brands scaled</span></span>
          <span className="n-hero__fact"><b><NCount to={20} suffix="+" /></b><span>Platforms operated</span></span>
        </div>
      </div>
    </header>
  );
}

/* ── Numbers (sun band) ────────────────────────────────────── */
function NNumbers() {
  const nums = [
    { v: <NCount to={248} prefix="₹" suffix="Cr+" />, l: "Revenue compounded for clients since 2019" },
    { v: <NCount to={8.7} decimals={1} suffix="×" />, l: "Median blended ROAS across the last 12 months" },
    { v: <NCount to={27} suffix="mo" />,               l: "Median client tenure: we're measured on staying" },
    { v: <NCount to={240} suffix="+" />,               l: "Creative assets shipped every month" },
  ];
  return (
    <section className="n-band n-band--sun n-band--tight" id="numbers">
      <div className="n-wrap">
        <span className="n-eyebrow n-rise" style={{ marginBottom: "clamp(28px,3.4vw,44px)", display: "flex" }}>
          The part that matters
        </span>
        <div className="n-nums">
          {nums.map((n, i) => (
            <div className={"n-num n-rise d" + Math.min(4, i + 1)} key={n.l}>
              <span className="n-num__v">{n.v}</span>
              <span className="n-num__l">{n.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Client marquee ────────────────────────────────────────── */

/* One tilt per cell, 5.0 to 7.0 degrees, leaning either way.

   Deterministic rather than Math.random(): prerender.py bakes this DOM into
   index.html, so a value that redrew on every render would put a fresh diff in
   the baked page on every build and the angle would jump between the
   pre-rendered paint and the live one. Hashing the brand and its position in
   the track gives a fixed angle per cell that still reads as random along the
   row, and gives the duplicate copy of a brand a different lean from the
   first. */
function nTilt(key) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
  h = Math.abs(h);
  const deg = (5 + (h % 21) / 10).toFixed(1);   // 5.0 … 7.0
  return ((h >> 5) % 2 ? "-" : "") + deg + "deg";
}

function NClients() {
  const logos = window.MMC_CLIENT_LOGOS || [];
  const half = Math.ceil(logos.length / 2);
  const rows = [logos.slice(0, half), logos.slice(half)];

  /* Each cell holds two layers: the mark, and the work. Hovering swaps them,
     and pauses the row it is in so the image can actually be looked at. A
     client with no work image simply brightens, which is the honest state
     until MMC drops the files in.

     The track carries the row twice so translateX(-50%) lands exactly on the
     duplicate and the loop has no seam. */
  const Row = ({ items, rev }) => (
    <div className={"n-marquee n-wall__row" + (rev ? " n-marquee--rev" : "")}>
      <div className="n-marquee__track">
        {[...items, ...items].map((c, i) => (
          <span className="n-wall__cell" key={c.id + "-" + i} title={c.name}
                style={{ "--n-tilt": nTilt(c.id + i) }}>
            <span className="n-wall__mark">{c.w}</span>
            <img className="n-wall__work"
                 src={"assets/clients/" + c.id + "-work.jpg"}
                 alt="" loading="lazy" decoding="async"
                 onLoad={(e) => e.target.classList.add("is-ready")}
                 onError={(e) => e.target.remove()} />
          </span>
        ))}
      </div>
      <span className="n-marquee__fade n-marquee__fade--l" />
      <span className="n-marquee__fade n-marquee__fade--r" />
    </div>
  );

  return (
    <section className="n-band n-band--white n-wall" id="clients">
      <div className="n-wrap">
        <div className="n-head n-rise">
          <div className="n-head__l">
            <span className="n-eyebrow">Trusted by {logos.length} brands</span>
            <h2 className="n-h2">
              We are not for everyone.<br />
              <span className="n-serif">Just for the ones who ship.</span>
            </h2>
          </div>
          <p className="n-lede">
            Twenty-four brands across B2B, B2C and D2C. Hover any one to see the
            work.
          </p>
        </div>
      </div>

      <div className="n-wall__rows">
        {rows.map((r, i) => r.length > 0 && <Row items={r} rev={i % 2 === 1} key={i} />)}
      </div>
    </section>
  );
}

/* ── Capabilities ──────────────────────────────────────────── */
const N_CAPS = [
  { k: "performance", t: "Performance media", h: "Contact.html",
    d: "Meta, Google, Amazon and quick-commerce run as one account structure, budgeted against contribution rather than platform ROAS.",
    m: "8.7× blended", tags: ["Meta", "Google", "Amazon", "Quick commerce"] },
  { k: "creative", t: "Creative & UGC", h: "Contact.html",
    d: "240+ assets a month against a single brand thesis: creator content, performance edits, statics and landing-page copy.",
    m: "240+ / month", tags: ["UGC", "Performance edits", "Creators", "Statics"] },
  { k: "retention", t: "Retention & lifecycle", h: "Contact.html",
    d: "Email, WhatsApp and loyalty built on the reason people come back, not a flow bolted onto a product nobody reorders.",
    m: "D60 in a quarter", tags: ["Klaviyo", "WhatsApp", "Loyalty", "Cohorts"] },
  { k: "conversion", t: "Conversion & technology", h: "Contact.html",
    d: "Shopify builds, checkout, speed and CRO: the highest-leverage ad you own is the page the ad lands on.",
    m: "1.4s median LCP", tags: ["Shopify Plus", "CRO", "Checkout", "Speed"] },
  { k: "brand", t: "Brand & packaging", h: "Contact.html",
    d: "Identity, packaging and design systems that make paid media cheaper by making the brand easier to remember.",
    m: "In-house studio", tags: ["Identity", "Packaging", "UI/UX", "Systems"] },
];

function NCapabilities() {
  // The peek panel follows whichever row the pointer is on. -1 means idle, and
  // the panel simply fades out rather than snapping back to the first row.
  const [at, setAt] = React.useState(0);   // first system is shown at rest
  const listRef = React.useRef(null);
  const [y, setY] = React.useState(0);
  /* The panel leans in the direction it is travelling and settles back level a
     moment later. Without it a photograph slides between rows as a rigid
     rectangle, which is the part that read as unfinished. */
  const [tilt, setTilt] = React.useState(-3);
  const prevY = React.useRef(0);
  const settle = React.useRef(null);

  // Park the panel on the first row once it has a measurable position.
  React.useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const first = list.querySelector(".n-cap");
    if (!first) return;
    const r = first.getBoundingClientRect();
    const y0 = r.top - list.getBoundingClientRect().top + r.height / 2;
    prevY.current = y0;
    setY(y0);
  }, []);

  const enter = (i) => (e) => {
    setAt(i);
    const list = listRef.current;
    if (!list) return;
    const r = e.currentTarget.getBoundingClientRect();
    const lr = list.getBoundingClientRect();
    const next = r.top - lr.top + r.height / 2;
    const travel = next - prevY.current;
    prevY.current = next;
    setY(next);
    // Cap the lean so a jump from the first row to the last does not spin it.
    setTilt(Math.max(-7, Math.min(0.5, -3 - travel * 0.014)));
    clearTimeout(settle.current);
    settle.current = setTimeout(() => setTilt(-3), 190);
  };

  React.useEffect(() => () => clearTimeout(settle.current), []);

  return (
    <section className="n-band n-band--white" id="capabilities">
      <div className="n-wrap">
        <div className="n-head n-rise">
          <div className="n-head__l">
            <span className="n-eyebrow">What we run</span>
            <h2 className="n-h2">Five systems, <span className="n-serif">one team.</span></h2>
          </div>
          <p className="n-lede">
            Most brands buy these from five vendors and spend their week translating between
            them. Here they share a strategist, a thesis and a P&amp;L.
          </p>
        </div>

        <div className="n-caps" ref={listRef} onMouseLeave={() => setAt(0)}>
          {/* One panel, moved and re-sourced, rather than one image per row: the
              browser only ever decodes the cover the pointer is actually on. */}
          <span className={"n-peek" + (at > -1 ? " is-on" : "")}
                style={{ "--peek-y": y + "px", "--peek-tilt": tilt + "deg" }} aria-hidden="true">
            {N_CAPS.map((c, i) => (
              <img key={c.k} src={"assets/services/" + c.k + ".jpg"} alt=""
                   loading="lazy" decoding="async"
                   className={"n-peek__img" + (at === i ? " is-on" : "")} />
            ))}
          </span>

          {N_CAPS.map((c, i) => (
            <a className={"n-cap n-rise d" + Math.min(4, i + 1) + (at === i ? " is-at" : "")}
               href={c.h} key={c.k} onMouseEnter={enter(i)} onFocus={enter(i)}>
              <span className="n-cap__t">
                <b>{c.t}</b>
                <span className="n-cap__tags">{c.tags.map((t) => <span key={t}>{t}</span>)}</span>
              </span>
              <span className="n-cap__d">{c.d}<br /><span className="n-cap__m">{c.m}</span></span>
              <span className="n-cap__go" aria-hidden="true">
                {/* One closed arrow outline. Stroked at rest, filled when
                    active, so the row goes from hollow to solid rather than
                    just heavier. A stroke-only chevron cannot do that. */}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M2 10.3 H12.1 V5 L22.2 12 L12.1 19 V13.7 H2 Z" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Work ────────────────────────────────────────────────────
   The client book from content/clients.json: the brand, the kind of business it
   is, and the services MMC runs for it. MMC supplied no result for any client,
   so the card leads with the name and lists the service mix where a metric used
   to sit. Nothing here may be embellished with a number. */
const N_WORK = [
  { b: "Bloom Edutours",         i: "B2B",   k: "BE", svc: ["Website redesign and development", "Lead generation", "Performance creative", "Social media"] },
  { b: "Sprouts Edu Tours",      i: "B2B",   k: "SE", svc: ["Website redesign and development", "Lead generation", "Performance creative", "Social media"] },
  { b: "NM Consultings",         i: "B2B",   k: "NM", svc: ["Website redesign and development", "Lead generation", "Performance creative"] },
  { b: "Skyfling Technologies",  i: "B2B",   k: "SK", svc: ["Website redesign and development", "Lead generation", "Performance creative"] },
  { b: "Lepure",                 i: "D2C",   k: "LP", svc: ["Website redesign and development", "Performance ads, D2C", "Performance creative", "Social media"] },
  { b: "The Growing Giraffe",    i: "D2C",   k: "GG", svc: ["Conversion rate optimisation", "Performance ads, D2C", "Performance creative", "Amazon", "Quick commerce"] },
  { b: "Mittiy Made",            i: "D2C",   k: "MM", svc: ["Conversion rate optimisation", "Performance ads, D2C", "Performance creative"] },
  { b: "AwwBaby",                i: "D2C",   k: "AB", svc: ["Website redesign and development", "Performance ads, D2C", "Performance creative"] },
  { b: "Sprnt",                  i: "D2C",   k: "SP", svc: ["Website redesign and development", "Performance ads, D2C", "Performance creative", "Social media"] },
  { b: "Vaga Kids",              i: "D2C",   k: "VK", svc: ["Website redesign and development", "Performance ads, D2C", "Performance creative"] },
  { b: "MyBrownButters",         i: "D2C",   k: "MB", svc: ["Website redesign and development", "Performance ads, D2C", "Performance creative"] },
  { b: "Notic",                  i: "D2C",   k: "NT", svc: ["Website redesign and development", "Performance ads, D2C", "Performance creative", "Social media"] },
];

function NWork() {
  return (
    <section className="n-band n-band--ink" id="work">
      <div className="n-wrap">
        <div className="n-head n-rise">
          <div className="n-head__l">
            <span className="n-eyebrow">The client book</span>
            <h2 className="n-h2">Twenty-four brands,<br /><span className="n-serif">and the work behind each.</span></h2>
          </div>
          <p className="n-lede">
            B2B, B2C and D2C. Every card lists the services we actually run for that brand,
            and nothing we cannot stand behind.
          </p>
        </div>
        <div className="n-work">
          {N_WORK.map((w, i) => (
            <a className={"n-case n-rise d" + Math.min(4, (i % 4) + 1)} href="Our Work.html" key={w.b}>
              <span className="n-case__top">
                <span className="n-case__ind">{w.i}</span>
                <span className="n-case__mark">{w.k}</span>
              </span>
              <span className="n-case__b">
                <span className="n-case__brand">{w.b}</span>
                <span className="n-case__svc">{w.svc.map((s) => <span key={s}>{s}</span>)}</span>
              </span>
            </a>
          ))}
        </div>
        <div className="n-rise" style={{ marginTop: "clamp(28px,3.4vw,44px)" }}>
          <a className="n-btn n-btn--sun" href="Our Work.html">See the work<span className="n-btn__arr" aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}

/* ── Process ───────────────────────────────────────────────── */
const N_STEPS = [
  { n: "01", t: "We dig", d: "A full read of the account, the funnel and the cost sheet before anyone touches a budget.", w: "Week 1" },
  { n: "02", t: "We model", d: "Unit economics first: break-even ROAS, CAC ceiling, payback. The plan has to survive the maths.", w: "Week 1–2" },
  { n: "03", t: "We ship", d: "Creative, media and site changes go live together, because they only work together.", w: "Week 2–4" },
  { n: "04", t: "We compound", d: "Weekly optimisation against contribution, monthly against the P&L. We're measured on staying.", w: "Month 2+" },
];

function NProcess() {
  return (
    <section className="n-band n-band--white" id="process">
      <div className="n-wrap">
        <div className="n-head n-rise">
          <div className="n-head__l">
            <span className="n-eyebrow">How it works</span>
            <h2 className="n-h2">Four weeks to a working <span className="n-serif">engine.</span></h2>
          </div>
          <p className="n-lede">
            No three-month discovery. The model is built in week one, because everything after it
            depends on knowing what an order is actually worth.
          </p>
        </div>
        <div className="n-steps">
          {N_STEPS.map((s, i) => (
            <div className={"n-step n-rise d" + Math.min(4, i + 1)} key={s.n}>
              <span className="n-step__n">{s.n}</span>
              <span className="n-step__t">{s.t}</span>
              <span className="n-step__d">{s.d}</span>
              <span className="n-step__w">{s.w}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Quote ─────────────────────────────────────────────────── */
function NQuote() {
  return (
    <section className="n-band n-band--paper" id="trust">
      <div className="n-wrap">
        <div className="n-quote">
          <div className="n-rise">
            <blockquote className="n-quote__t">
              “We'd worked with three agencies before MMC. None of them understood that{" "}
              <em>retention is a creative problem.</em> They fixed our D60 in a quarter.”
            </blockquote>
            <div className="n-quote__by">
              <b>Founder · D2C beauty</b>
              <span>Named reference available on the call</span>
            </div>
          </div>
          <div className="n-rise d2">
            <p className="n-lede" style={{ marginBottom: "22px" }}>
              We take on a small number of brands at a time. If we're not the right fit, the
              30-minute call will tell you that faster than a proposal will.
            </p>
            <button className="n-btn n-btn--ink" onClick={(e) => window.mmcBookCall("home-trust", e)}>
              Book a strategy call<span className="n-btn__arr" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Closing CTA ───────────────────────────────────────────── */
function NCta() {
  return (
    <section className="n-band n-band--void" id="talk">
      <div className="n-wrap">
        <div className="n-cta n-rise">
          <span className="n-eyebrow">Ready when you are</span>
          <h2 className="n-h2 n-cta__h">Let's find out what an order is <span className="n-serif">actually worth.</span></h2>
          <p className="n-lede" style={{ textAlign: "center", margin: "0 auto" }}>
            Thirty minutes with a senior strategist. No deck, no pitch, a direct read on the
            three things to fix first.
          </p>
          <div className="n-cta__row">
            <button className="n-btn n-btn--sun" onClick={(e) => window.mmcBookCall("home-cta", e)}>
              Book a strategy call<span className="n-btn__arr" aria-hidden="true" />
            </button>
            <a className="n-btn n-btn--ghost" href="tools.html">Run the numbers yourself<span className="n-btn__arr" aria-hidden="true" /></a>
          </div>
          <span className="n-cta__note">Avg. response 4 hours · sales-in@mondaymarketing.company</span>
        </div>
      </div>
    </section>
  );
}

window.useReveal = useReveal;
window.NHero = NHero; window.NNumbers = NNumbers; window.NClients = NClients;
window.NCapabilities = NCapabilities; window.NWork = NWork; window.NProcess = NProcess;
window.NQuote = NQuote; window.NCta = NCta;
