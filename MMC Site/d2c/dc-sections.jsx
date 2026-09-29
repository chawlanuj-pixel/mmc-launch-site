/* d2c/dc-sections.jsx: sections of the D2C hub. Links go only to pages that exist. */

const { useState: dcUseState, useEffect: dcUseEffect } = React;
const DC_CTA = "Get a paid-media audit";
const dcBook = (src) => (e) => window.mmcBookCall(src, e);
function DcArrow() { return <span className="n-btn__arr" aria-hidden="true" />; }
function DcImg({ name, ratio, className = "", eager, pos }) {
  return (
    <img className={"pm-img " + className} src={"assets/" + (name.includes("/") ? "" : "d2c/") + name} alt="" decoding="async"
         loading={eager ? "eager" : "lazy"} style={{ aspectRatio: ratio, objectPosition: pos || "50% 50%" }}
         onError={(e) => e.currentTarget.remove()} />
  );
}
const DC_TILES = [
  { img: "packing.jpg", pos: "50% 50%", label: "Fulfilment", note: "Every order packed" },
  { img: "unboxing.jpg", pos: "50% 50%", label: "Unboxing", note: "The first impression" },
  { img: "checkout.jpg", pos: "50% 50%", label: "Checkout", note: "Where orders are won or lost" },
  { img: "range.jpg", pos: "50% 50%", label: "The range", note: "Beauty, food, kids and more" }
];

function DcHero() {
  const [enter, setEnter] = dcUseState(false);
  dcUseEffect(() => { requestAnimationFrame(() => requestAnimationFrame(() => setEnter(true))); }, []);
  const clip = (x = "") => "clip-reveal " + (enter ? "in " : "") + x;
  const reveal = (x = "") => "reveal " + (enter ? "in " : "") + x;
  return (
    <section className="page-hero pm-hero" id="top" data-wm="D2C">
      <span className="page-hero__wm" aria-hidden="true">D2C</span>
      <div className="container pm-hero__inner">
        <div className="pmh__grid">
          <div className="pmh__l">
            <div className={"eyebrow " + (enter ? "in" : "")}><span>● Direct-to-consumer brands</span></div>
            <h1 className="pmh__h">
              <span className={clip("d1")}><span>Marketing for</span></span>
              <span className={clip("d2")}><span><span className="em-serif">D2C</span> brands</span></span>
              <span className={clip("d3")}><span>in India.</span></span>
            </h1>
            <p className={reveal("d4 pmh__sub")}>
              One team for the whole D2C growth stack, from ads and creative to conversion and retention, judged on profit per order.
            </p>
            <div className={reveal("d5 pmh__actions")}>
              <button className="btn btn--primary glow-btn" onClick={dcBook("d2c-hero")}>
                <span className="glow-btn__glow" aria-hidden="true"></span>
                <span className="glow-btn__inner">{DC_CTA}<span className="arrow"></span></span>
              </button>
              <a className="btn btn--link" href="#brands">See the brands<span className="arrow"></span></a>
            </div>
          </div>
          <div className={"pmh__r " + (enter ? "in" : "")}>
            <div className="pmh__mosaic">
              {DC_TILES.map((t, k) => (
                <figure className={"pmh__tile pmh__tile--" + (k + 1)} key={t.label}>
                  <DcImg name={t.img} ratio="1 / 1.05" className="pmh__img" pos={t.pos} eager={k < 2} />
                  <figcaption><b>{t.label}</b><span>{t.note}</span></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DcAnswer() {
  /* The shared "In short" block (assets/answer.jsx). */
  return (
    <window.MmcAnswer
      lead="D2C marketing sells a brand's products straight to shoppers online, with no retailer in between."
      hl="straight to shoppers"
      who="Monday Marketing Company (MMC) runs the whole stack for D2C brands in India."
      points={[
        { icon: "coin", title: "It all lands on your P&L", text: "Acquisition cost, delivery, returns and repeat purchase sit with the brand, not a retailer." },
        { icon: "layers", title: "One stack, one team", text: "Ads, creative, conversion and retention, run together." },
        { icon: "gauge", title: "Judged on contribution margin", text: "The profit left after variable costs." }
      ]}
      image="d2c/unboxing.jpg"
      chip="No retailer in between" />
  );
}

function DcStages() {
  return (
    <section className="n-band n-band--white pm-band" id="leaks">
      <div className="n-wrap">
        <div className="pm-head n-rise">
          <span className="n-eyebrow">Where D2C brands lose profit</span>
          <h2 className="n-h2">Five places the money <span className="n-serif">leaks.</span></h2>
          <p className="n-lede">Follow one customer from first ad to second order. Each stage has its own way of costing you margin, and its own fix.</p>
        </div>
        <ol className="stg n-rise d1">
          {window.DC_STAGES.map((s, k) => (
            <li className={"stg__item" + (k % 2 ? " is-flip" : "")} key={s.k}>
              <figure className="stg__fig">
                <DcImg name={s.img} ratio="4 / 3" className="stg__img" />
                <span className="stg__num" aria-hidden="true">{k + 1}</span>
                <figcaption className="stg__k">{s.k}</figcaption>
              </figure>
              <div className="stg__body">
                <article className="stg__bad">
                  <span className="stg__tag">
                    <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="currentColor" /><path d="M6.5 6.5 L13.5 13.5 M13.5 6.5 L6.5 13.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
                    What you may be doing
                  </span>
                  <p>{s.breaks}</p>
                  <span className="stg__to" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="M10 4 V15 M5 10.5 L10 15.5 L15 10.5" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                </article>
                <article className="stg__good">
                  <span className="stg__tag">
                    <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="currentColor" /><path d="M5.5 10.5 L8.7 13.6 L14.5 7" fill="none" stroke="#1A2A8C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    What we do instead
                  </span>
                  <p>{s.does}</p>
                  <a className="stg__link" href={s.href}>{s.link}<DcArrow /></a>
                </article>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function DcNumbers() {
  return (
    <section className="n-band n-band--ink pm-band" id="numbers">
      <div className="n-wrap">
        <div className="pm-head n-rise">
          <span className="n-eyebrow">The numbers we start with</span>
          <h2 className="n-h2">Know these four before you <span className="n-serif">spend another rupee.</span></h2>
          <p>Free calculators. No signup. Use your own numbers.</p>
        </div>
        <div className="dcn n-rise d1">
          {window.DC_NUMBERS.map((x) => (
            <a className="dcn__card" href={x.href} key={x.n}>
              <b>{x.n}</b><span>{x.d}</span><i>Open the calculator<DcArrow /></i>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function dcTilt(key) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
  h = Math.abs(h);
  return ((h >> 5) % 2 ? "-" : "") + (5 + (h % 21) / 10).toFixed(1) + "deg";
}
function DcBrands() {
  const logos = window.MMC_CLIENT_LOGOS || [];
  const byId = Object.fromEntries(logos.map((l) => [l.id, l]));
  return (
    <section className="n-band n-band--paper pm-band" id="brands">
      <div className="n-wrap">
        <div className="pm-head n-rise" style={{ marginBottom: 0 }}>
          <span className="n-eyebrow">The brands</span>
          <h2 className="n-h2">Some of the D2C brands we <span className="n-serif">work with.</span></h2>
          <p className="n-lede">Hover any one to see the work. The tags show what we run for each.</p>
        </div>
        <div className="n-wall pm-wall">
          {window.DC_BRANDS.map((p) => {
            const c = byId[p.id];
            if (!c) return null;
            return (
              <div className="pm-wall__item" key={p.id}>
                <span className="n-wall__cell" title={c.name} style={{ "--n-tilt": dcTilt(p.id) }}>
                  <span className="n-wall__mark">{c.w}</span>
                  {(window.MMC_WORK_ART || []).includes(p.id) && (
                    <img className="n-wall__work" src={"assets/clients/" + p.id + "-work.jpg"} alt="" loading="lazy" decoding="async"
                         onLoad={(e) => e.target.classList.add("is-ready")} onError={(e) => e.target.remove()} />
                  )}
                </span>
                <span className="pm-wall__svc">{p.svc.join(" · ")}</span>
              </div>
            );
          })}
        </div>
        <div className="pm-proof__foot">
          <a className="pm-textlink" href="Our Work.html">See the full client book<DcArrow /></a>
        </div>
      </div>
    </section>
  );
}

function DcBeyond() {
  return (
    <section className="n-band n-band--white pm-band" id="beyond">
      <div className="n-wrap">
        <div className="pm-head n-rise">
          <span className="n-eyebrow">Beyond D2C</span>
          <h2 className="n-h2">D2C is where we go deepest. <span className="n-serif">It is not all we do.</span></h2>
        </div>
        <div className="dcb n-rise d1">
          <article className="dcb__card">
            <DcImg name="shared/b2b.jpg" ratio="3 / 2" className="dcb__img" />
            <h3>B2B companies</h3>
            <p>Websites, creative and lead generation for B2B companies, where the goal is a qualified lead, not a basket.</p>
            <a className="pm-textlink" href="b2b.html">See the B2B page<DcArrow /></a>
          </article>
          <article className="dcb__card">
            <DcImg name="shared/education.jpg" ratio="3 / 2" className="dcb__img" />
            <h3>Educational institutes</h3>
            <p>Websites, creative and lead generation for colleges and education brands, where the goal is an enquiry and then an enrolment.</p>
            <a className="pm-textlink" href="education.html">See the education page<DcArrow /></a>
          </article>
        </div>
      </div>
    </section>
  );
}

function DcFaq() {
  const faq = window.DC_FAQ || [];
  return (
    <section className="n-band n-band--paper pm-band" id="faq">
      <div className="n-wrap">
        <div className="pm-head n-rise">
          <span className="n-eyebrow">Common questions</span>
          <h2 className="n-h2">What D2C founders ask <span className="n-serif">first.</span></h2>
        </div>
        <div className="pm-faq n-rise">
          {faq.map((f, k) => (
            <details key={f.q} open={k === 0}>
              <summary>{f.q}</summary>
              <div className="pm-faq__a"><p dangerouslySetInnerHTML={{ __html: f.a }} /></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function DcCta() {
  return (
    <window.MmcCta h2a="Find where your D2C profit" h2b="leaks." lede="On a call, with a senior strategist. We read your accounts against your break-even ROAS." label={DC_CTA} onBook={dcBook("d2c-final")} />
  );
}

function DcSticky() {
  const [on, setOn] = dcUseState(false);
  dcUseEffect(() => {
    const tick = () => {
      const hero = document.getElementById("top"), talk = document.getElementById("talk"), cookie = document.querySelector(".cookie");
      const pastHero = hero ? hero.getBoundingClientRect().bottom < 0 : false;
      const atEnd = talk ? talk.getBoundingClientRect().top < window.innerHeight * 0.9 : false;
      setOn(pastHero && !atEnd && !cookie);
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    const id = setInterval(tick, 700);
    return () => { window.removeEventListener("scroll", tick); window.removeEventListener("resize", tick); clearInterval(id); };
  }, []);
  return (
    <div className={"pm-sticky" + (on ? " is-on" : "")} aria-hidden={!on}>
      <button tabIndex={on ? 0 : -1} onClick={dcBook("d2c-sticky")}>Free paid-media audit</button>
    </div>
  );
}

Object.assign(window, { DcHero, DcAnswer, DcStages, DcNumbers, DcBrands, DcBeyond, DcFaq, DcCta, DcSticky });
