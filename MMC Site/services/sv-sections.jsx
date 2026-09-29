/* services/sv-sections.jsx: sections of the Services hub.
   The hub only links to pages that exist. Every other service is described and
   routed to the audit call, so nothing on it is a dead link. */

const { useState: svUseState, useEffect: svUseEffect } = React;
const SV_CTA = "Book an audit call";
const svBook = (src) => (e) => window.mmcBookCall(src, e);
function SvArrow() { return <span className="n-btn__arr" aria-hidden="true" />; }
function SvImg({ name, ratio, className = "", eager, pos }) {
  return (
    <img className={"pm-img " + className} src={"assets/sv/" + name} alt="" decoding="async"
         loading={eager ? "eager" : "lazy"} style={{ aspectRatio: ratio, objectPosition: pos || "50% 50%" }}
         onError={(e) => e.currentTarget.remove()} />
  );
}

function SvHero() {
  const [enter, setEnter] = svUseState(false);
  svUseEffect(() => { requestAnimationFrame(() => requestAnimationFrame(() => setEnter(true))); }, []);
  const clip = (x = "") => "clip-reveal " + (enter ? "in " : "") + x;
  const reveal = (x = "") => "reveal " + (enter ? "in " : "") + x;
  const S = window.SV_SYSTEMS;
  return (
    <section className="page-hero pm-hero" id="top" data-wm="Services">
      <span className="page-hero__wm" aria-hidden="true">Services</span>
      <div className="container pm-hero__inner">
        <div className="pmh__grid">
          <div className="pmh__l">
            <div className={"eyebrow " + (enter ? "in" : "")}><span>● Five connected systems</span></div>
            <h1 className="pmh__h">
              <span className={clip("d1")}><span>Marketing services</span></span>
              <span className={clip("d2")}><span>for <span className="em-serif">D2C</span>, B2B and</span></span>
              <span className={clip("d3")}><span>education brands.</span></span>
            </h1>
            <p className={reveal("d4 pmh__sub")}>
              Paid media, search, brand, technology and content, run by one team. Start with the system that fixes your biggest leak.
            </p>
            <div className={reveal("d5 pmh__actions")}>
              <button className="btn btn--primary glow-btn" onClick={svBook("services-hero")}>
                <span className="glow-btn__glow" aria-hidden="true"></span>
                <span className="glow-btn__inner">{SV_CTA}<span className="arrow"></span></span>
              </button>
              <a className="btn btn--link" href="Our Work.html">See the work<span className="arrow"></span></a>
            </div>
          </div>
          <div className={"pmh__r svh__r " + (enter ? "in" : "")}>
            <div className="svh__mosaic">
              {S.map((s, k) => (
                <a className={"svh__tile svh__tile--" + (k + 1)} href={"#" + s.id} key={s.id} aria-label={s.label}>
                  <SvImg name={s.img} ratio={k < 2 ? "4 / 3" : "1 / 1"} className="svh__img" pos={s.pos} eager={k < 2} />
                  <span className="svh__cap"><i>{s.n}</i><b>{s.short}</b></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SvAnswer() {
  /* The shared "In short" block (assets/answer.jsx). */
  return (
    <window.MmcAnswer
      lead="Monday Marketing Company (MMC) is an India-based marketing agency for D2C, B2B and education brands. Its services sit in five systems: paid media, search and conversion, brand, technology, and content."
      hl="five systems"
      points={[
        { icon: "grid", title: "Five systems", text: "Paid media, search and conversion, brand, technology, and content." },
        { icon: "users", title: "One team runs all five", text: "So the work in one system is judged by what it does for the others." }
      ]}
      image="pm-v3/process.jpg"
      chip="Five systems, one team" />
  );
}

function SvSystems() {
  const S = window.SV_SYSTEMS;
  return (
    <div id="systems">
      {S.map((s, k) => (
        <section className={"n-band pm-band svs " + (k % 2 ? "n-band--paper" : "n-band--white")} id={s.id} key={s.id}>
          <div className="n-wrap">
            <div className={"svs__row" + (k % 2 ? " is-flip" : "")}>
              <div className="svs__art n-rise"><SvImg name={s.img} ratio="3 / 2" className="svs__img" pos={s.pos} /></div>
              <div className="svs__body n-rise d1">
                <span className="n-eyebrow">System {s.n}</span>
                <h2 className="n-h2 svs__h">{s.label}</h2>
                <p className="svs__desc">{s.desc}</p>
                <ul className="svs__list">
                  {s.items.map((it) => (
                    <li key={it.n}>
                      <b>{it.n}</b>
                      <span>{it.d}</span>
                      {it.href && <a className="pm-textlink" href={it.href}>{it.link}<SvArrow /></a>}
                    </li>
                  ))}
                </ul>
                <button className="pm-textlink" onClick={svBook("services-" + s.id)}>Talk to us about {s.short.toLowerCase()}<SvArrow /></button>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

function SvStart() {
  return (
    <section className="n-band n-band--ink pm-band" id="start">
      <div className="n-wrap">
        <div className="pm-head n-rise">
          <span className="n-eyebrow">Where to start</span>
          <h2 className="n-h2">Start from the problem, <span className="n-serif">not the service.</span></h2>
        </div>
        <ul className="svt n-rise d1">
          {window.SV_START.map(([p, id, to]) => (
            <li key={p}><a href={"#" + id}><span>{p}</span><b>{to}<SvArrow /></b></a></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const SV_WALL = [
  { id: "lepure", svc: ["Performance", "Web", "Creative", "Social"] },
  { id: "giraffe", svc: ["Performance", "CRO", "Creative", "Amazon", "Quick commerce"] },
  { id: "sprnt", svc: ["Performance", "Web", "Creative", "Social"] },
  { id: "nmc", svc: ["Web", "Lead generation", "Creative"] },
  { id: "skyfling", svc: ["Web", "Lead generation", "Creative"] },
  { id: "bloom", svc: ["Web", "Lead generation", "Creative", "Social"] },
  { id: "mvj", svc: ["Web", "Lead generation", "Creative", "Social"] },
  { id: "pandacabs", svc: ["Web", "Lead generation", "Creative", "Social"] },
  { id: "rustomjee", svc: [] },
  { id: "clubmahindra", svc: [] }
];
function svTilt(key) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
  h = Math.abs(h);
  return ((h >> 5) % 2 ? "-" : "") + (5 + (h % 21) / 10).toFixed(1) + "deg";
}
function SvWork() {
  const logos = window.MMC_CLIENT_LOGOS || [];
  const byId = Object.fromEntries(logos.map((l) => [l.id, l]));
  return (
    <section className="n-band n-band--white pm-band" id="work">
      <div className="n-wrap">
        <div className="pm-head n-rise" style={{ marginBottom: 0 }}>
          <span className="n-eyebrow">The brands</span>
          <h2 className="n-h2">A few of the brands we <span className="n-serif">work with.</span></h2>
          <p className="n-lede">D2C, B2B, education and other consumer-facing brands. Hover any one to see the work. Where a brand has no tags, we have not recorded the mix yet.</p>
        </div>
        <div className="n-wall pm-wall">
          {SV_WALL.map((p) => {
            const c = byId[p.id];
            if (!c) return null;
            return (
              <div className="pm-wall__item" key={p.id}>
                <span className="n-wall__cell" title={c.name} style={{ "--n-tilt": svTilt(p.id) }}>
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
          <a className="pm-textlink" href="Our Work.html">See more of our work<SvArrow /></a>
          <a className="pm-textlink" href="breakeven-roas-calculator.html">Try the break-even ROAS calculator<SvArrow /></a>
        </div>
      </div>
    </section>
  );
}

function SvFaq() {
  const faq = window.SV_FAQ || [];
  return (
    <section className="n-band n-band--paper pm-band" id="faq">
      <div className="n-wrap">
        <div className="pm-head n-rise">
          <span className="n-eyebrow">Common questions</span>
          <h2 className="n-h2">What people ask <span className="n-serif">first.</span></h2>
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

function SvCta() {
  return (
    <window.MmcCta eyebrow="Not sure where to start?" h2a="Tell us the problem. We will say" h2b="which system fixes it." lede="On a call, with a senior strategist. We look at your accounts and tell you where to start." label={SV_CTA} onBook={svBook("services-final")} />
  );
}

function SvSticky() {
  const [on, setOn] = svUseState(false);
  svUseEffect(() => {
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
      <button tabIndex={on ? 0 : -1} onClick={svBook("services-sticky")}>{SV_CTA}</button>
    </div>
  );
}

Object.assign(window, { SvHero, SvAnswer, SvSystems, SvStart, SvWork, SvFaq, SvCta, SvSticky });
