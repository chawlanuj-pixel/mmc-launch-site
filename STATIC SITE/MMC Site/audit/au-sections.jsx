/* audit/au-sections.jsx: sections of the Audit page. The booking calendar is the
   same Calendly widget every "Book a call" button opens, mounted inline. */

const { useState: auUseState, useEffect: auUseEffect, useRef: auUseRef } = React;
function AuArrow() { return <span className="n-btn__arr" aria-hidden="true" />; }
function AuImg({ name, ratio, className = "", eager, pos }) {
  return (
    <img className={"pm-img " + className} src={"assets/" + (name.includes("/") ? "" : "au/") + name} alt="" decoding="async"
         loading={eager ? "eager" : "lazy"} style={{ aspectRatio: ratio, objectPosition: pos || "50% 50%" }}
         onError={(e) => e.currentTarget.remove()} />
  );
}

function AuHero() {
  const [enter, setEnter] = auUseState(false);
  auUseEffect(() => { requestAnimationFrame(() => requestAnimationFrame(() => setEnter(true))); }, []);
  const clip = (x = "") => "clip-reveal " + (enter ? "in " : "") + x;
  const reveal = (x = "") => "reveal " + (enter ? "in " : "") + x;
  return (
    <section className="page-hero pm-hero" id="top" data-wm="Audit">
      <span className="page-hero__wm" aria-hidden="true">Audit</span>
      <div className="container pm-hero__inner">
        <div className="pmh__grid">
          <div className="pmh__l">
            <div className={"eyebrow " + (enter ? "in" : "")}><span>● Free · with a senior strategist</span></div>
            <h1 className="pmh__h">
              <span className={clip("d1")}><span>A free paid-media</span></span>
              <span className={clip("d2")}><span><span className="em-serif">audit</span> for brands</span></span>
              <span className={clip("d3")}><span>in India.</span></span>
            </h1>
            <p className={reveal("d4 pmh__sub")}>
              We read your ad accounts against your break-even numbers and tell you where to start.
            </p>
            <div className={reveal("d5 pmh__actions")}>
              <a className="btn btn--primary glow-btn" href="#book">
                <span className="glow-btn__glow" aria-hidden="true"></span>
                <span className="glow-btn__inner">Pick a time<span className="arrow"></span></span>
              </a>
              <button className="btn btn--link" onClick={(e) => window.mmcOpenBrief && window.mmcOpenBrief(e)}>Send a brief instead<span className="arrow"></span></button>
            </div>
          </div>
          <div className={"pmh__r auh__r " + (enter ? "in" : "")}>
            <figure className="auh__fig">
              <AuImg name="audit-call.jpg" ratio="4 / 3" className="auh__img" eager />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

function AuLooks() {
  return (
    <section className="n-band n-band--white pm-band" id="looks">
      <div className="n-wrap">
        <div className="pm-head n-rise">
          <span className="n-eyebrow">What we look at</span>
          <h2 className="n-h2">Four things, <span className="n-serif">in your numbers.</span></h2>
        </div>
        <ul className="aul n-rise d1">
          {window.AU_LOOKS.map((x) => (
            <li key={x.n}>
              <AuImg name={x.img} ratio="3 / 2" className="aul__img" />
              <b>{x.n}</b><span>{x.d}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function AuSteps() {
  return (
    <section className="n-band n-band--paper pm-band" id="how">
      <div className="n-wrap">
        <div className="pm-head n-rise">
          <span className="n-eyebrow">How it works</span>
          <h2 className="n-h2">One call. <span className="n-serif">A clear next step.</span></h2>
        </div>
        <div className="pm-rail aus">
          {window.AU_STEPS.map(([t, d, img], k) => (
            <div className={"pm-step n-rise d" + (k + 1)} key={t}>
              <span className="pm-step__n">{k + 1}</span>
              <div><AuImg name={img} ratio="3 / 2" className="aus__img" /><span className="pm-step__t">{t}</span><span className="pm-step__d">{d}</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AuBook() {
  const ref = auUseRef(null);
  auUseEffect(() => {
    const el = ref.current;
    if (!el || !window.mmcInlineCalendly) return;
    const mount = () => window.mmcInlineCalendly(el);
    if (!("IntersectionObserver" in window)) { mount(); return; }
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); mount(); } }, { rootMargin: "300px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section className="n-band n-band--ink pm-band" id="book">
      <div className="n-wrap">
        <div className="aub">
          <div className="aub__copy n-rise">
            <span className="n-eyebrow">Book the audit</span>
            <h2 className="n-h2" style={{ margin: "18px 0 22px" }}>Pick a time that <span className="n-serif">suits you.</span></h2>
            <p>Choose a slot on the calendar. It works on a phone too.</p>
            <h3 className="aub__h3">Helpful to have ready</h3>
            <ul className="aub__list">
              {window.AU_BRING.map((b) => <li key={b}>{b}</li>)}
            </ul>
            <p className="aub__alt">Prefer to write first? <button className="pm-textlink pm-textlink--quiet" onClick={(e) => window.mmcOpenBrief && window.mmcOpenBrief(e)}>Send a brief<AuArrow /></button></p>
          </div>
          <div className="aub__cal n-rise d1">
            <div className="aub__host" ref={ref} aria-label="Booking calendar"></div>
            <noscript>Booking needs JavaScript. Email sales-in@mondaymarketing.company instead.</noscript>
          </div>
        </div>
      </div>
    </section>
  );
}

function AuFit() {
  return (
    <section className="n-band n-band--white pm-band" id="fit">
      <div className="n-wrap">
        <div className="pm-head n-rise">
          <span className="n-eyebrow">Who it suits</span>
          <h2 className="n-h2">Built for brands that <span className="n-serif">buy media.</span></h2>
        </div>
        <div className="auf n-rise d1">
          {window.AU_FIT.map((x) => (
            <article className="auf__card" key={x.n}>
              <AuImg name={x.img} ratio="3 / 2" className="auf__img" />
              <h3>{x.n}</h3>
              <p>{x.d}</p>
            </article>
          ))}
        </div>
        <p className="auf__not n-rise d2">Probably not a fit: brands where ROAS alone is the target, or where there is no paid media to review yet. We will say so early and point you somewhere useful.</p>
      </div>
    </section>
  );
}

function AuFaq() {
  const faq = window.AU_FAQ || [];
  return (
    <section className="n-band n-band--paper pm-band" id="faq">
      <div className="n-wrap">
        <div className="pm-head n-rise">
          <span className="n-eyebrow">Common questions</span>
          <h2 className="n-h2">Before you <span className="n-serif">book.</span></h2>
        </div>
        <div className="pm-faq n-rise">
          {faq.map((f, k) => (
            <details key={f.q} open={k === 0}>
              <summary>{f.q}</summary>
              <div className="pm-faq__a"><p>{f.a}</p></div>
            </details>
          ))}
        </div>
        <p style={{ marginTop: 30 }}>
          <a className="pm-textlink" href="services.html">See all services<AuArrow /></a>
        </p>
      </div>
    </section>
  );
}

Object.assign(window, { AuHero, AuLooks, AuSteps, AuBook, AuFit, AuFaq });
