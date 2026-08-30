/* home/sections-a.jsx: Hero, Proof, Growth Systems
   All visuals are <image-slot> (team fills them) or on-brand data viz.
   Sections get `active` from the app so counters animate on snap-in. */

/* ---- Animated counter ---- */
function Count({ to, decimals = 0, prefix = "", suffix = "", run }) {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    if (!run) { setV(0); return; }
    let raf; const start = performance.now(); const dur = 1400;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - t, 4);
      setV(e * to);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return <span>{prefix}{v.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>;
}

/* ============================================================ HERO, three selectable layouts (Tweak: hero) */
function openAudit(e) { window.mmcBookCall("home", e); }

function HeroV2({ active, layout = "editorial" }) {
  const eyebrow = "Full-service growth studio · Bengaluru";
  const Actions = ({ ghost }) => (
    <div className="actions r d4">
      <a className="b b--sun" href="Contact.html" onClick={openAudit}>Get a free brand audit<span className="arr"></span></a>
      <a className={"b " + (ghost || "b--ghost-light")} href="#sec-6">See the work<span className="arr"></span></a>
    </div>
  );

  /* ---- SPLIT: text left, framed visual right ---- */
  if (layout === "split") {
    return (
      <section className={"sec sec--hero sec--dark sec--hero-split" + (active ? " is-active" : "")} data-screen-label="01 Hero" data-label="Home" id="sec-0">
        <div className="herosplit">
          <div className="herosplit__text">
            <span className="eyebrow2 r d1">{eyebrow}</span>
            <h1 className="sec__h r d2">
              We don't run ads.<br/>
              We build <span className="serif-accent">revenue engines.</span>
            </h1>
            <p className="sec__lead r d3">
              Design × Marketing × Technology × Content × AI, one team compounding
              growth for modern consumer brands.
            </p>
            <Actions ghost="b--ghost-light" />
          </div>
          <div className="herosplit__media r d3">
            <div className="ken" style={{position:"absolute",inset:0}}>
              <image-slot id="home-hero" placeholder="Drop a full-bleed brand / team hero image" fit="cover" style={{width:"100%",height:"100%"}}></image-slot>
            </div>
            <span className="herosplit__chip"><span className="dot"></span>₹248Cr+ compounded · since 2019</span>
          </div>
        </div>
        <div className="scrollcue"><span>Scroll</span><span className="scrollcue__line"></span></div>
        <HeroStyles />
      </section>
    );
  }

  /* ---- STATEMENT: centered, type-led, sun arc + stat ticker ---- */
  if (layout === "statement") {
    return (
      <section className={"sec sec--hero sec--dark sec--hero-statement" + (active ? " is-active" : "")} data-screen-label="01 Hero" data-label="Home" id="sec-0">
        <div className="herostate__sun" aria-hidden="true"></div>
        <div className="herostate__grid" aria-hidden="true"></div>
        <div className="herostate">
          <span className="eyebrow2 r d1">{eyebrow}</span>
          <h1 className="herostate__h r d2">
            We don't run ads.<br/>
            We build <span className="serif-accent">revenue engines.</span>
          </h1>
          <p className="sec__lead r d3" style={{maxWidth:"56ch",margin:"0 auto"}}>
            Design × Marketing × Technology × Content × AI, one team compounding
            growth for modern consumer brands. Compounded, not campaigned.
          </p>
          <Actions ghost="b--ghost-light" />
          <div className="herostate__ticker r d5">
            <div className="ht"><span className="ht__n">₹248Cr+</span><span className="ht__l">Revenue compounded</span></div>
            <div className="ht"><span className="ht__n">8.7×</span><span className="ht__l">Median blended ROAS</span></div>
            <div className="ht"><span className="ht__n">14</span><span className="ht__l">Brands · 4 countries</span></div>
          </div>
        </div>
        <HeroStyles />
      </section>
    );
  }

  /* ---- EDITORIAL (default): full-bleed image, left-aligned ---- */
  return (
    <section className={"sec sec--hero sec--dark" + (active ? " is-active" : "")} data-screen-label="01 Hero" data-label="Home" id="sec-0">
      <div className="hero-bg ken">
        <image-slot id="home-hero" placeholder="Drop a full-bleed brand / team hero image" fit="cover" style={{width:"100%",height:"100%"}}></image-slot>
      </div>
      <div className="hero-overlay"></div>

      <div className="hero-inner">
        <span className="eyebrow2 r d1">{eyebrow}</span>
        <h1 className="sec__h r d2">
          We don't run ads.<br/>
          We build <span className="serif-accent">revenue engines.</span>
        </h1>
        <p className="sec__lead r d3">
          Design × Marketing × Technology × Content × AI, one team compounding
          growth for modern consumer brands. Compounded, not campaigned.
        </p>
        <Actions ghost="b--ghost-light" />
      </div>

      <div className="scrollcue">
        <span>Scroll</span>
        <span className="scrollcue__line"></span>
      </div>
      <HeroStyles />
    </section>
  );
}

function HeroStyles() {
  return (
    <style>{`
      /* ---- Split hero ---- */
      .sec--hero-split { display: block; }
      .herosplit {
        position: relative; z-index: 2; height: 100%;
        max-width: var(--container-max); margin: 0 auto;
        padding: var(--nav-h) clamp(28px,5vw,88px) clamp(40px,5vh,72px);
        display: grid; grid-template-columns: 1fr 0.92fr; align-items: center; gap: clamp(32px,5vw,80px);
      }
      .herosplit__text { display: flex; flex-direction: column; gap: clamp(20px,2vw,28px); }
      .herosplit__text .sec__h { font-size: clamp(42px,5.2vw,84px); max-width: 14ch; }
      .herosplit__media {
        position: relative; align-self: stretch; margin: clamp(40px,8vh,96px) 0;
        border-radius: 20px; overflow: hidden;
        border: 1px solid rgba(255,255,255,0.14);
        box-shadow: 0 50px 100px -50px rgba(0,0,0,0.7);
        background: radial-gradient(120% 90% at 25% 20%, rgba(29,78,216,0.55), transparent 60%), linear-gradient(155deg,#1733A8,#0b1645);
      }
      .herosplit__chip {
        position: absolute; left: 18px; bottom: 18px; z-index: 3;
        display: inline-flex; align-items: center; gap: 10px;
        padding: 9px 16px; border-radius: 999px;
        background: rgba(10,18,55,0.6); border: 1px solid rgba(255,255,255,0.22); backdrop-filter: blur(12px);
        font-family: var(--font-body); font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #fff;
      }
      .herosplit__chip .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--mmc-yellow); box-shadow: 0 0 0 4px rgba(255,197,40,0.22); }
      @media (max-width: 920px) {
        .herosplit { grid-template-columns: 1fr; align-content: center; gap: 22px; }
        .herosplit__media { min-height: 30vh; margin: 0; }
        .herosplit__text .sec__h { font-size: clamp(36px,9vw,56px); }
      }

      /* ---- Statement hero ---- */
      .sec--hero-statement { display: flex; align-items: center; justify-content: center; background: radial-gradient(120% 80% at 50% 120%, rgba(29,78,216,0.45), transparent 60%), linear-gradient(180deg,#0b1645,#0F1E5E); }
      .herostate { position: relative; z-index: 3; text-align: center; max-width: 960px; padding: var(--nav-h) clamp(24px,5vw,40px) 0; display: flex; flex-direction: column; align-items: center; gap: clamp(20px,2.2vw,30px); }
      .herostate .eyebrow2 { justify-content: center; }
      .herostate__h { font-family: var(--font-display); font-weight: 800; font-size: clamp(46px,7vw,108px); line-height: 0.98; letter-spacing: -0.04em; color: #fff; margin: 0; }
      .herostate__h .serif-accent { font-family: var(--font-serif); font-style: italic; font-weight: 600; color: var(--mmc-yellow); letter-spacing: -0.01em; }
      .herostate__sun {
        position: absolute; left: 50%; bottom: -42%; transform: translateX(-50%);
        width: min(140vw, 1500px); aspect-ratio: 1; border-radius: 50%; z-index: 1; pointer-events: none;
        background: radial-gradient(circle at 50% 50%, rgba(255,197,40,0.34) 0%, rgba(255,197,40,0.10) 34%, rgba(255,197,40,0) 60%);
      }
      .herostate__grid { position: absolute; inset: 0; z-index: 0; pointer-events: none; background-image: radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1.4px); background-size: 30px 30px; opacity: 0.5; mask-image: radial-gradient(70% 60% at 50% 40%, #000, transparent 75%); }
      .herostate__ticker { display: inline-flex; flex-wrap: wrap; justify-content: center; gap: clamp(20px,3vw,52px); margin-top: 10px; padding-top: clamp(18px,2vw,26px); border-top: 1px solid rgba(255,255,255,0.16); }
      .ht { display: flex; flex-direction: column; gap: 5px; }
      .ht__n { font-family: var(--font-display); font-weight: 800; font-size: clamp(26px,2.8vw,40px); letter-spacing: -0.03em; color: #fff; }
      .ht__l { font-family: var(--font-body); font-size: 10.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.6); }
      @media (max-width: 920px) { .herostate__h { font-size: clamp(38px,11vw,62px); } }
    `}</style>
  );
}

/* ============================================================ PROOF */
function ProofV2({ active }) {
  // Platform / partner logos, simple brand-true marks.
  const platforms = [
    { name: "Meta",    mark: <svg viewBox="0 0 24 24"><path d="M3 16c0-5 2.5-9 5.5-9 2 0 3.3 1.7 4.5 4 1.2-2.3 2.5-4 4.5-4 3 0 5.5 4 5.5 9" fill="none" stroke="currentColor" strokeWidth="2.4"/></svg> },
    { name: "Google",  mark: <svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-3-6.7" fill="none" stroke="currentColor" strokeWidth="2.4"/><path d="M21 5v6h-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: "Amazon Ads", mark: <svg viewBox="0 0 24 24"><path d="M5 16c4 3 10 3 14 0" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/><path d="M17 17l2 .5-.5 2" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: "Shopify", mark: <svg viewBox="0 0 24 24"><path d="M14 4l4 2v14H6V8l5-2z" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/></svg> },
    { name: "Klaviyo", mark: <svg viewBox="0 0 24 24"><path d="M5 19l7-14 7 14-7-5z" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/></svg> },
    { name: "TikTok",  mark: <svg viewBox="0 0 24 24"><path d="M14 4v10a4 4 0 1 1-3-3.9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/><path d="M14 6a5 5 0 0 0 5 4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg> },
    { name: "GA4",     mark: <svg viewBox="0 0 24 24"><path d="M6 20V11M12 20V5M18 20v-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/></svg> },
  ];
  return (
    <section className={"sec sec--light sec--flip sec--dense" + (active ? " is-active" : "")} data-screen-label="02 Proof" data-label="Proof" id="sec-1">
      <div className="sec__media">
        <div className="ken">
          <image-slot id="home-proof" placeholder="Drop a grid of client / product photography" fit="cover" style={{width:"100%",height:"100%"}}></image-slot>
        </div>
        <span className="media-tag"><span className="dot"></span>24 brands · 4 countries</span>
      </div>

      <div className="sec__content">
        <span className="eyebrow2 r d1">Trusted by fast-growing brands</span>
        <h2 className="sec__h r d2" style={{fontSize:"clamp(30px,3vw,52px)"}}>
          24 brands. <span className="serif-accent">One thesis.</span><br/>Revenue that compounds.
        </h2>
        <div className="stats r d3">
          <div className="stat stat-top"><span className="stat__n"><i>₹</i><Count to={248} run={active} /><i>Cr+</i></span><span className="stat__l">Revenue compounded since 2019</span></div>
          <div className="stat stat-top"><span className="stat__n"><Count to={8.7} decimals={1} run={active} /><i>×</i></span><span className="stat__l">Median blended ROAS · 12mo</span></div>
          <div className="stat stat-top"><span className="stat__n"><Count to={27} run={active} /><i>mo</i></span><span className="stat__l">Median client tenure</span></div>
        </div>

        <div className="logowall r d4">
          <span className="microlabel">Brands we've compounded</span>
          {window.ClientsLogoGrid
            ? <window.ClientsLogoGrid />
            : null}
        </div>

        <div className="partnerstrip r d5">
          <span className="microlabel">Platforms &amp; partners we run</span>
          <div className="partnerstrip__row">
            {platforms.map((p) => (
              <span className="partner" key={p.name}><span className="partner__mark">{p.mark}</span>{p.name}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .microlabel { font-family: var(--font-body); font-size: 10px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; color: var(--fg-3); display: block; margin-bottom: 10px; }
        .logowall__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
        .logomark {
          display: flex; align-items: center; gap: 11px;
          height: 56px; padding: 0 14px;
          border: 1.5px solid rgba(29,78,216,0.14); border-radius: 12px;
          background: rgba(255,255,255,0.7);
          color: color-mix(in oklab, var(--mmc-text) 62%, transparent);
          transition: border-color var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out);
        }
        .logomark:hover { border-color: var(--mmc-blue); color: var(--mmc-blue); transform: translateY(-2px);
          position: relative; z-index: 2;
        }
        .logomark__icon { flex-shrink: 0; width: 26px; height: 26px; }
        .logomark__icon svg { width: 100%; height: 100%; display: block; }
        .logomark__word { font-family: var(--font-display); font-weight: 800; font-size: 15px; letter-spacing: -0.02em; line-height: 1; display: flex; flex-direction: column; gap: 2px; }
        .logomark__word i { font-style: normal; font-weight: 600; font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.6; }
        .partnerstrip__row { display: flex; flex-wrap: wrap; gap: 7px; }
        .partner {
          display: inline-flex; align-items: center; gap: 9px;
          font-family: var(--font-display); font-weight: 700; font-size: 13px; letter-spacing: -0.01em;
          color: var(--mmc-blue); padding: 8px 14px; border-radius: 999px;
          background: rgba(255,255,255,0.7); border: 1.5px solid rgba(29,78,216,0.16);
          transition: border-color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out);
        }
        .partner:hover { border-color: var(--mmc-blue); background: var(--mmc-blue-50); }
        .partner__mark { width: 17px; height: 17px; display: inline-flex; color: var(--mmc-blue); }
        .partner__mark svg { width: 100%; height: 100%; display: block; }
      `}</style>
    </section>
  );
}

/* ============================================================ GROWTH SYSTEMS (interactive) */
function SystemsV2({ active }) {
  const systems = [
    { n: "I",   t: "Revenue Accelerators",     d: "Performance media that compounds, not just spends. Meta, Google & Amazon ads run as one engine.", m: "8.7× median ROAS",
      items: [{l:"Performance Marketing",h:"Contact.html"},{l:"Retention Marketing",h:"Contact.html"},{l:"Quick Commerce",h:"Contact.html"}] },
    { n: "II",  t: "Organic Growth Engines",   d: "Search authority plus on-site conversion architecture that turns traffic into compounding revenue.", m: "+412% organic traffic",
      items: [{l:"SEO Services",h:"Contact.html"},{l:"CRO for Website",h:"Contact.html"}] },
    { n: "III", t: "Brand Foundation Builders",d: "Identity, UX and packaging systems that earn memory, so every paid rupee works harder.", m: "100% in-house studio",
      items: [{l:"Brand Identity",h:"Contact.html"},{l:"Packaging Design",h:"Contact.html"},{l:"UI / UX Systems",h:"Service Detail.html"}] },
    { n: "IV",  t: "Technology Drivers",       d: "Storefronts and apps that load fast and convert harder. Shopify, web & mobile, production-grade.", m: "1.4s avg. LCP",
      items: [{l:"Shopify Development",h:"Contact.html"},{l:"Web Development",h:"Contact.html"},{l:"Mobile App Development",h:"Contact.html"},{l:"Ecommerce Management",h:"Contact.html"}] },
    { n: "V",   t: "Content Magnets",          d: "UGC, video and creator systems for modern distribution: the multiplier on every other layer.", m: "240+ assets / month",
      items: [{l:"UGC Content",h:"Contact.html"},{l:"Social Media Creatives",h:"Contact.html"},{l:"Influencer Marketing",h:"Contact.html"}] },
  ];
  const [i, setI] = React.useState(0);
  const cur = systems[i];
  return (
    <section className={"sec sec--dark sec--dense" + (active ? " is-active" : "")} data-screen-label="04 Growth Systems" data-label="Systems" id="sec-3">
      <div className="sec__content">
        <span className="eyebrow2 r d1">Growth systems · 05 surfaces</span>
        <h2 className="sec__h r d2" style={{fontSize:"clamp(34px,3.6vw,60px)"}}>
          Five systems. <span className="serif-accent">One engine.</span>
        </h2>
        <ol className="sysrows r d3">
          {systems.map((s, idx) => (
            <li key={s.t}>
              <button className={"sysrow " + (idx === i ? "is-on" : "")}
                      onMouseEnter={() => setI(idx)} onClick={() => setI(idx)}>
                <span className="sysrow__n">{s.n}</span>
                <span className="sysrow__t">{s.t}</span>
                <span className="sysrow__m">{s.m}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="sec__media">
        <div className="ken">
          <image-slot id="home-systems" placeholder="Drop a studio / process / creative photo" fit="cover" style={{width:"100%",height:"100%"}}></image-slot>
        </div>
        <div className="sysdetail" key={i}>
          <div className="sysdetail__top">
            <span className="sysdetail__metric">{cur.m}</span>
            <div>
              <span className="sysdetail__name">{cur.n} · {cur.t}</span>
              <p className="sysdetail__desc">{cur.d}</p>
            </div>
          </div>
          <div className="sysdetail__servs">
            <span className="sysdetail__lbl">{cur.items.length} services in this system</span>
            <div className="sysdetail__grid">
              {cur.items.map((s) => (
                <a className="sysdetail__serv" href={s.h} key={s.l}>
                  <span className="sysdetail__serv-name">{s.l}</span>
                  <span className="sysdetail__serv-arr" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .sysrows { list-style: none; margin: 4px 0 0; padding: 0; display: flex; flex-direction: column; gap: 2px; max-width: 560px; }
        .sysrow {
          width: 100%; display: grid; grid-template-columns: 36px 1fr auto; align-items: center; gap: 16px;
          padding: 16px 6px; border-top: 1px solid rgba(255,255,255,0.14);
          color: rgba(255,255,255,0.62); text-align: left; transition: all var(--dur-base) var(--ease-out);
        }
        .sysrows li:last-child .sysrow { border-bottom: 1px solid rgba(255,255,255,0.14); }
        .sysrow__n { font-family: var(--font-display); font-weight: 800; font-size: 13px; letter-spacing: 0.14em; color: var(--mmc-yellow); }
        .sysrow__t { font-family: var(--font-display); font-weight: 700; font-size: clamp(18px,1.7vw,24px); letter-spacing: -0.02em; line-height: 1.1; }
        .sysrow__m { font-family: var(--font-body); font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0; transition: opacity var(--dur-base); white-space: nowrap; }
        .sysrow:hover, .sysrow.is-on { color: #fff; padding-left: 16px; }
        .sysrow.is-on .sysrow__m { opacity: 0.8; color: var(--mmc-yellow); }
        @keyframes sysFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .sysdetail { position: absolute; z-index: 4; left: clamp(20px,2.5vw,40px); right: clamp(20px,2.5vw,40px); bottom: clamp(20px,2.5vw,40px); padding: clamp(18px,2vw,26px); border-radius: 18px; background: rgba(10,18,55,0.62); border: 1px solid rgba(255,255,255,0.18); backdrop-filter: blur(16px) saturate(140%); box-shadow: 0 30px 70px -40px rgba(0,0,0,0.7); animation: sysFade 380ms var(--ease-out); }
        .sysdetail__top { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 16px; }
        .sysdetail__metric { flex-shrink: 0; font-family: var(--font-display); font-weight: 800; font-size: clamp(20px,1.8vw,28px); letter-spacing: -0.02em; color: var(--mmc-yellow); line-height: 1.05; max-width: 5.5em; }
        .sysdetail__name { display: block; font-family: var(--font-body); font-size: 10.5px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.65); margin-bottom: 6px; }
        .sysdetail__desc { font-family: var(--font-body); font-size: clamp(13.5px,1vw,15.5px); line-height: 1.55; color: rgba(255,255,255,0.86); margin: 0; }
        .sysdetail__lbl { display: block; font-family: var(--font-body); font-size: 10px; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.55); margin-bottom: 9px; }
        .sysdetail__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
        .sysdetail__serv { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 11px 14px; border-radius: 10px; border: 1.5px solid rgba(255,255,255,0.18); background: rgba(255,255,255,0.06); color: #fff; transition: border-color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out); }
        .sysdetail__serv:hover { border-color: var(--mmc-yellow); background: rgba(255,197,40,0.12); transform: translateY(-2px);
          position: relative; z-index: 2;
        }
        .sysdetail__serv-name { font-family: var(--font-display); font-weight: 700; font-size: 13px; letter-spacing: -0.01em; }
        .sysdetail__serv-arr { color: var(--mmc-yellow); font-size: 13px; opacity: 0.85; }
        @media (max-width: 920px) { .sysrow__m { display: none; } .sysrow { padding: 12px 6px; } .sysdetail { position: static; margin: 12px; backdrop-filter: none; } .sysdetail__top { flex-direction: column; gap: 8px; } .sysdetail__grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

Object.assign(window, { Count, HeroV2, ProofV2, SystemsV2 });
