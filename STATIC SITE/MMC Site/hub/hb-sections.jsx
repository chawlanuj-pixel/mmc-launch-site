/* hub/hb-sections.jsx: generic audience hub (B2B, education). Copy and images come from window.HUB,
   set by hub/hb-data-<audience>.js. Same section order as the D2C hub. Loads dc.css for the stage rows,
   number cards and "other audiences" cards. Links go only to pages that exist. */

const { useState: hbUseState, useEffect: hbUseEffect } = React;
const HB_CTA = "Book a strategy call";
const hbBook = (src) => (e) => window.mmcBookCall(src, e);
function HbArrow() { return <span className="n-btn__arr" aria-hidden="true" />; }
function HbImg({ name, ratio, className = "", eager, pos }) {
  return (
    <img className={"pm-img " + className} src={"assets/" + name} alt="" decoding="async"
         loading={eager ? "eager" : "lazy"} style={{ aspectRatio: ratio, objectPosition: pos || "50% 50%" }}
         onError={(e) => e.currentTarget.remove()} />
  );
}

function HbHero() {
  const H = window.HUB;
  const [enter, setEnter] = hbUseState(false);
  hbUseEffect(() => { requestAnimationFrame(() => requestAnimationFrame(() => setEnter(true))); }, []);
  const clip = (x = "") => "clip-reveal " + (enter ? "in " : "") + x;
  const reveal = (x = "") => "reveal " + (enter ? "in " : "") + x;
  return (
    <section className="page-hero pm-hero" id="top" data-wm={H.wm}>
      <span className="page-hero__wm" aria-hidden="true">{H.wm}</span>
      <div className="container pm-hero__inner">
        <div className="pmh__grid">
          <div className="pmh__l">
            <div className={"eyebrow " + (enter ? "in" : "")}><span>{H.eyebrow}</span></div>
            <h1 className="pmh__h">
              <span className={clip("d1")}><span>{H.h1[0]}</span></span>
              <span className={clip("d2")}><span>{H.h1[1][0]}<span className="em-serif">{H.h1[1][1]}</span>{H.h1[1][2]}</span></span>
              <span className={clip("d3")}><span>{H.h1[2]}</span></span>
            </h1>
            <p className={reveal("d4 pmh__sub")}>{H.sub}</p>
            <div className={reveal("d5 pmh__actions")}>
              <button className="btn btn--primary glow-btn" onClick={hbBook(H.key + "-hero")}>
                <span className="glow-btn__glow" aria-hidden="true"></span>
                <span className="glow-btn__inner">{HB_CTA}<span className="arrow"></span></span>
              </button>
              {H.hero2
                ? <a className="btn btn--link" href={H.hero2.href}>{H.hero2.label}<span className="arrow"></span></a>
                : H.brands && H.brands.list && H.brands.list.length
                ? <a className="btn btn--link" href="#brands">See the brands<span className="arrow"></span></a>
                : <a className="btn btn--link" href="#leaks">See how it works<span className="arrow"></span></a>}
            </div>
          </div>
          <div className={"pmh__r " + (enter ? "in" : "")}>
            <div className="pmh__mosaic">
              {H.tiles.map((t, k) => (
                <figure className={"pmh__tile pmh__tile--" + (k + 1)} key={t.label}>
                  <HbImg name={t.img} ratio="1 / 1.05" className="pmh__img" pos={t.pos} eager={k < 2} />
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

function HbAnswer() {
  /* The shared "In short" block (assets/answer.jsx). Copy: HUB.answer = { label, lead, hl, who, points, image, chip }. */
  return <window.MmcAnswer {...window.HUB.answer} />;
}

/* Stacking cards: one card per stage. Each card sticks below the header and the next one slides over it;
   the covered card eases back (scale). Enabled by HUB.leaks.style = "stack". Styles: hub/hb-stack.css. */
function HbStack() {
  const L = window.HUB.leaks;
  const S = window.HUB.stages;
  const listRef = React.useRef(null);
  hbUseEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const mq = (q) => window.matchMedia && window.matchMedia(q);
    const reduceMq = mq("(prefers-reduced-motion: reduce)");
    let raf = 0;
    /* Cards differ in text length. Give every card the tallest one's height so the pile is tidy at rest and the
       whole pile leaves together (a shorter last card would otherwise let taller earlier cards hang out below it). */
    const equalize = () => {
      list.style.setProperty("--stk-h", "0px");
      const hs = [...list.querySelectorAll(".stk__card")].map((c) => c.offsetHeight);
      list.style.setProperty("--stk-h", Math.max(0, ...hs) + "px");
    };
    const onSize = () => { equalize(); onScroll(); };
    const update = () => {
      raf = 0;
      const cards = [...list.querySelectorAll(".stk__card")];
      // Same condition as the sticky rule in hb-stack.css: tall enough (640px, or 560px on phones), motion allowed.
      const stack = window.innerHeight >= (window.innerWidth >= 760 ? 640 : 560) && !(reduceMq && reduceMq.matches);
      if (!stack) { cards.forEach((c) => { c.style.transform = ""; c.style.setProperty("--dim", 0); }); return; }
      // Read phase: how far each card has been covered by the one after it (0 to 1).
      const cover = cards.map((c, i) => {
        const next = cards[i + 1];
        if (!next) return 0;
        const stickTop = parseFloat(getComputedStyle(c).top) || 0;
        const h = c.offsetHeight || 1;
        return Math.min(1, Math.max(0, (stickTop + h - next.getBoundingClientRect().top) / h));
      });
      // Write phase: a card sinks a little further for every card that has landed on top of it.
      cards.forEach((c, i) => {
        let depth = 0;
        for (let j = i; j < cover.length; j++) depth += cover[j];
        c.style.transform = depth > 0 ? "scale(" + Math.max(0.84, 1 - depth * 0.03).toFixed(4) + ")" : "";
        c.style.setProperty("--dim", Math.min(0.3, depth * 0.07).toFixed(3));
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    /* Keyboard: a link inside a card that a later card has already slid over would be hidden. On focus, scroll to the
       spot where that card has just landed (the next card still sits below it), so the focused link is always visible. */
    const onFocusIn = (e) => {
      const cards = [...list.querySelectorAll(".stk__card")];
      const k = cards.findIndex((c) => c.contains(e.target));
      const next = cards[k + 1];
      if (k < 0 || !next) return;
      if (window.innerHeight < (window.innerWidth >= 760 ? 640 : 560) || (reduceMq && reduceMq.matches)) return;
      const fix = () => {
        const c = cards[k];
        const r = e.target.getBoundingClientRect();
        const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        if (r.top >= 60 && r.bottom <= window.innerHeight && hit && e.target.contains(hit)) return;
        const step = c.offsetHeight + (parseFloat(getComputedStyle(c).marginBottom) || 0);
        const stickTop = parseFloat(getComputedStyle(c).top) || 0;
        window.scrollTo(0, list.getBoundingClientRect().top + window.scrollY + k * step - stickTop);
      };
      fix(); requestAnimationFrame(fix);
    };
    list.addEventListener("focusin", onFocusIn);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onSize);
    window.addEventListener("load", onSize);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(onSize);
    if (reduceMq && reduceMq.addEventListener) reduceMq.addEventListener("change", onSize);
    equalize();
    update();
    return () => {
      list.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onSize); window.removeEventListener("load", onSize);
      if (reduceMq && reduceMq.removeEventListener) reduceMq.removeEventListener("change", onSize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <section className="n-band n-band--paper pm-band stk" id="leaks">
      <div className="n-wrap">
        <div className="pm-head n-rise">
          <span className="n-eyebrow">{L.eyebrow}</span>
          <h2 className="n-h2">{L.h2a} <span className="n-serif">{L.h2b}</span></h2>
          <p className="n-lede">{L.lede}</p>
        </div>
        <ol className="stk__list" ref={listRef}>
          {S.map((s, k) => (
            <li className="stk__card" key={s.k} style={{ "--i": k }}>
              <div className="stk__media">
                <HbImg name={s.img} ratio="4 / 3" className="stk__img" />
                <span className="stk__num" aria-hidden="true">{k + 1}</span>
              </div>
              <div className="stk__body">
                <div className="stk__kick">
                  <span className="stk__step">Stage {k + 1} of {S.length}<span className="stk__seg" aria-hidden="true">{S.map((_, m) => <i key={m} className={m <= k ? "is-on" : ""}></i>)}</span></span>
                  <b>{s.k}</b>
                </div>
                <h3 className="stk__leak">{s.breaks}</h3>
                <p className="stk__why">{s.why}</p>
                <div className="stk__fix">
                  <span className="stk__label">What we do</span>
                  <p>{s.does}</p>
                </div>
                <a className="stk__svc" href={s.href}>{s.tag}<HbArrow /></a>
              </div>
            </li>
          ))}
        </ol>
        {L.note && <p className="stk__note">{L.note}</p>}
      </div>
    </section>
  );
}

/* Funnel layout: a narrowing funnel down the middle, where families slip away on the left,
   how we plug each leak on the right (with the stage photo). Enabled by HUB.leaks.style = "funnel". */
const HB_FUN_COLORS = ["#1A2A8C", "#2340B8", "#2A4BD0", "#3D63E0", "#5D82EC", "#F0C13C", "#F5C842"];
function HbFunnel() {
  const L = window.HUB.leaks;
  const S = window.HUB.stages;
  const n = S.length;
  const top = (i) => 100 - (i * 44) / n;          // width % at the top of slice i (funnel ends at 56%)
  return (
    <section className="n-band n-band--white pm-band fun" id="leaks">
      <div className="n-wrap">
        <div className="pm-head n-rise">
          <span className="n-eyebrow">{L.eyebrow}</span>
          <h2 className="n-h2">{L.h2a} <span className="n-serif">{L.h2b}</span></h2>
          <p className="n-lede">{L.lede}</p>
        </div>

        <div className="fun__cols n-rise d1" aria-hidden="true">
          <span className="fun__col fun__col--leak"><svg viewBox="0 0 20 20"><path d="M10 2 C10 2 4 9 4 13 A6 6 0 0 0 16 13 C16 9 10 2 10 2 Z" fill="currentColor" /></svg>Where families slip away</span>
          <span className="fun__col fun__col--mid">The admissions funnel</span>
          <span className="fun__col fun__col--plug"><svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="currentColor" /><path d="M5.5 10.5 L8.7 13.6 L14.5 7" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>How we plug it</span>
        </div>

        <ol className="fun__list n-rise d1">
          {S.map((s, k) => {
            const t = (100 - top(k)) / 2, b = (100 - top(k + 1)) / 2;
            const dark = k >= 5;
            return (
              <li className="fun__row" key={s.k}>
                <article className="fun__leak">
                  <span className="fun__mini fun__mini--leak">Where families slip away</span>
                  <p>{s.breaks}</p>
                  <i className="fun__out" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="M16 10 H4 M8.5 5.5 L4 10 L8.5 14.5" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></i>
                </article>

                <div className="fun__slice" style={{ "--t": t + "%", "--b": b + "%", "--c": HB_FUN_COLORS[k % HB_FUN_COLORS.length], "--w": top(k) + "%" }}>
                  <span className={"fun__shape" + (dark ? " is-dark" : "")}>
                    <b className="fun__n">{k + 1}</b>
                    <span className="fun__k">{s.k}</span>
                  </span>
                </div>

                <article className="fun__plug">
                  <HbImg name={s.img} ratio="4 / 3" className="fun__img" />
                  <div className="fun__txt">
                    <span className="fun__mini fun__mini--plug">How we plug it</span>
                    <p>{s.does}</p>
                    <a className="fun__link" href={s.href}>{s.link}<HbArrow /></a>
                  </div>
                  <i className="fun__in" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="M16 10 H4 M8.5 5.5 L4 10 L8.5 14.5" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></i>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function HbStages() {
  const L = window.HUB.leaks;
  if (!L) return null;
  if (L.style === "stack") return <HbStack />;
  if (L.style === "funnel") return <HbFunnel />;
  return (
    <section className="n-band n-band--white pm-band" id="leaks">
      <div className="n-wrap">
        <div className="pm-head n-rise">
          <span className="n-eyebrow">{L.eyebrow}</span>
          <h2 className="n-h2">{L.h2a} <span className="n-serif">{L.h2b}</span></h2>
          <p className="n-lede">{L.lede}</p>
        </div>
        <ol className="stg n-rise d1">
          {window.HUB.stages.map((s, k) => (
            <li className={"stg__item" + (k % 2 ? " is-flip" : "")} key={s.k}>
              <figure className="stg__fig">
                <HbImg name={s.img} ratio="4 / 3" className="stg__img" />
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
                  <a className="stg__link" href={s.href}>{s.link}<HbArrow /></a>
                </article>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* CRM + Conversions API section. Inline icons (no emoji), animated flow that stops for reduced motion. */
const HB_ICONS = [
  <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="9" y="7" width="30" height="34" rx="5" fill="none" stroke="currentColor" strokeWidth="2.4" /><path d="M16 17 H32 M16 24 H32" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /><rect x="16" y="30" width="16" height="6" rx="3" fill="currentColor" /></svg>,
  <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="9" width="36" height="30" rx="5" fill="none" stroke="currentColor" strokeWidth="2.4" /><path d="M6 19 H42 M6 29 H42 M20 19 V39" stroke="currentColor" strokeWidth="2.4" /><path d="M25 34 L28.5 37.2 L35 31" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeDasharray="4 4" /><path d="M14 21 H31 M27 16.5 L32 21 L27 25.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M34 29 H17 M21 24.5 L16 29 L21 33.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  null
];
const HB_DOTS_BAD = [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
const HB_DOTS_GOOD = [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1];
function HbDots({ pattern, kind }) {
  return <div className={"cap__dots cap__dots--" + kind} aria-hidden="true">{pattern.map((g, i) => <i key={i} className={g ? "is-fit" : ""}></i>)}</div>;
}
function HbLoop() {
  const L = window.HUB.loop;
  if (!L) return null;
  return (
    <section className="n-band n-band--ink pm-band cap" id="quality">
      <div className="n-wrap">
        <div className="cap__head n-rise">
          <div className="pm-head">
            <span className="n-eyebrow">{L.eyebrow}</span>
            <h2 className="n-h2">{L.h2a} <span className="n-serif">{L.h2b}</span></h2>
            <p>{L.lede}</p>
          </div>
          <figure className="cap__shot">
            <HbImg name={L.img} ratio="3 / 2" />
            <figcaption>{L.imgCaption}</figcaption>
          </figure>
        </div>

        <ol className="cap__flow n-rise d1">
          {L.steps.map((s, k) => (
            <React.Fragment key={s.k}>
              <li className="cap__node">
                <span className="cap__step">Step {k + 1}</span>
                <span className={"cap__icon" + (k === 3 ? " is-meta" : "")}>
                  {k === 3 ? <img src="assets/platforms/meta.svg" alt="" width="34" height="34" /> : HB_ICONS[k]}
                </span>
                <b>{s.k}</b>
                <span className="cap__d">{s.d}</span>
                <em className="cap__chip">{s.chip}</em>
              </li>
              {k < L.steps.length - 1 && <li className="cap__conn" aria-hidden="true"><i></i></li>}
            </React.Fragment>
          ))}
        </ol>

        <div className="cap__return n-rise d2" aria-hidden="true">
          <svg viewBox="0 0 1000 70" preserveAspectRatio="none">
            <defs><marker id="cap-head" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor" /></marker></defs>
            <path className="cap__loopline" d="M 880 2 C 880 66, 120 66, 120 8" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="7 7" vectorEffect="non-scaling-stroke" markerEnd="url(#cap-head)" />
          </svg>
          <span>{L.returnLabel}</span>
        </div>

        <div className="cap__vs n-rise d2">
          <article className="cap__panel cap__panel--bad">
            <span className="cap__tag"><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="currentColor" /><path d="M6.5 6.5 L13.5 13.5 M13.5 6.5 L6.5 13.5" stroke="#0B1020" strokeWidth="2" strokeLinecap="round" /></svg>Without the CRM feedback</span>
            <h3>{L.without.t}</h3>
            <HbDots pattern={HB_DOTS_BAD} kind="bad" />
            <p className="cap__key"><span><i className="is-fit"></i>Leads sales would accept</span><span><i className="is-poor"></i>Poor fit</span></p>
            <p>{L.without.d}</p>
          </article>
          <article className="cap__panel cap__panel--good">
            <span className="cap__tag"><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="currentColor" /><path d="M5.5 10.5 L8.7 13.6 L14.5 7" fill="none" stroke="#0B1020" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>With CRM and CAPI</span>
            <h3>{L.with.t}</h3>
            <HbDots pattern={HB_DOTS_GOOD} kind="good" />
            <p className="cap__key"><span><i className="is-fit"></i>Leads sales would accept</span><span><i className="is-poor"></i>Poor fit</span></p>
            <p>{L.with.d}</p>
          </article>
        </div>
        <p className="cap__note"><span className="cap__ill">Illustration of the idea, not a client result.</span></p>
      </div>
    </section>
  );
}

function HbNumbers() {
  const N = window.HUB.numbers;
  if (!N) return null;
  return (
    <section className="n-band n-band--ink pm-band" id="numbers">
      <div className="n-wrap">
        <div className="pm-head n-rise">
          <span className="n-eyebrow">{N.eyebrow}</span>
          <h2 className="n-h2">{N.h2a} <span className="n-serif">{N.h2b}</span></h2>
          <p>{N.note}</p>
        </div>
        <div className="dcn n-rise d1">
          {N.cards.map((x) => x.href ? (
            <a className="dcn__card" href={x.href} key={x.n}><b>{x.n}</b><span>{x.d}</span><i>Open the calculator<HbArrow /></i></a>
          ) : (
            <div className="dcn__card dcn__card--static" key={x.n}><b>{x.n}</b><span>{x.d}</span></div>
          ))}
        </div>
        {N.link && <p className="hbn__link n-rise d2"><a className="pm-textlink pm-textlink--quiet" href={N.link.href}>{N.link.text}<HbArrow /></a></p>}
      </div>
    </section>
  );
}

function hbTilt(key) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
  h = Math.abs(h);
  return ((h >> 5) % 2 ? "-" : "") + (5 + (h % 21) / 10).toFixed(1) + "deg";
}
function HbBrands() {
  const B = window.HUB.brands;
  if (!B || !B.list || !B.list.length) return null;
  const logos = window.MMC_CLIENT_LOGOS || [];
  const byId = Object.fromEntries(logos.map((l) => [l.id, l]));
  return (
    <section className="n-band n-band--paper pm-band" id="brands">
      <div className="n-wrap">
        <div className="pm-head n-rise" style={{ marginBottom: 0 }}>
          <span className="n-eyebrow">The brands</span>
          <h2 className="n-h2">{B.h2a} <span className="n-serif">{B.h2b}</span></h2>
          <p className="n-lede">{B.lede}</p>
        </div>
        <div className="n-wall pm-wall">
          {B.list.map((p) => {
            const c = byId[p.id];
            if (!c) return null;
            return (
              <div className="pm-wall__item" key={p.id}>
                <span className="n-wall__cell" title={c.name} style={{ "--n-tilt": hbTilt(p.id) }}>
                  <span className="n-wall__mark">{c.w}</span>
                  {(window.MMC_WORK_ART || []).includes(p.id) && (
                    <img className="n-wall__work" src={"assets/clients/" + p.id + "-work.jpg"} alt="" loading="lazy" decoding="async"
                         onLoad={(e) => e.target.classList.add("is-ready")} onError={(e) => e.target.remove()} />
                  )}
                </span>
                <span className="pm-wall__svc">{(p.svc || []).join(" · ")}</span>
              </div>
            );
          })}
        </div>
        <div className="pm-proof__foot"><a className="pm-textlink" href="Our Work.html">See more of our work<HbArrow /></a></div>
      </div>
    </section>
  );
}

function HbBeyond() {
  const Y = window.HUB.beyond;
  if (!Y) return null;
  return (
    <section className="n-band n-band--white pm-band" id="beyond">
      <div className="n-wrap">
        <div className="pm-head n-rise">
          <span className="n-eyebrow">{Y.eyebrow}</span>
          <h2 className="n-h2">{Y.h2a} <span className="n-serif">{Y.h2b}</span></h2>
        </div>
        <div className={"dcb n-rise d1" + (Y.cards.length === 3 ? " dcb--3" : "")}>
          {Y.cards.map((c) => (
            <article className="dcb__card" key={c.n}>
              <HbImg name={c.img} ratio="3 / 2" className="dcb__img" />
              <h3>{c.n}</h3>
              <p>{c.d}</p>
              <a className="pm-textlink" href={c.href}>{c.link}<HbArrow /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HbFaq() {
  return (
    <section className="n-band n-band--paper pm-band" id="faq">
      <div className="n-wrap">
        <div className="pm-head n-rise">
          <span className="n-eyebrow">Common questions</span>
          <h2 className="n-h2">{window.HUB.faqTitle[0]} <span className="n-serif">{window.HUB.faqTitle[1]}</span></h2>
        </div>
        <div className="pm-faq n-rise">
          {window.HUB.faq.map((f, k) => (
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

function HbCta() {
  const C = window.HUB.cta;
  return (
    <window.MmcCta h2a={C.h2a} h2b={C.h2b} lede={C.lede} label={HB_CTA} onBook={hbBook(window.HUB.key + "-final")} />
  );
}

function HbSticky() {
  const [on, setOn] = hbUseState(false);
  hbUseEffect(() => {
    const tick = () => {
      const hero = document.getElementById("top"), talk = document.getElementById("talk"), cookie = document.querySelector(".cookie");
      const pastHero = hero ? hero.getBoundingClientRect().bottom < 0 : false;
      const atEnd = talk ? talk.getBoundingClientRect().top < window.innerHeight * 0.9 : false;
      /* On phones the stacking cards fill the screen, so the floating button would sit over their text. */
      const leaks = document.getElementById("leaks");
      const lr = leaks ? leaks.getBoundingClientRect() : null;
      const overStack = window.innerWidth < 760 && lr && lr.top < window.innerHeight && lr.bottom > 0 && !!document.querySelector(".stk__card");
      setOn(pastHero && !atEnd && !cookie && !overStack);
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    const id = setInterval(tick, 700);
    return () => { window.removeEventListener("scroll", tick); window.removeEventListener("resize", tick); clearInterval(id); };
  }, []);
  return (
    <div className={"pm-sticky" + (on ? " is-on" : "")} aria-hidden={!on}>
      <button tabIndex={on ? 0 : -1} onClick={hbBook(window.HUB.key + "-sticky")}>Book a call</button>
    </div>
  );
}


/* Long-form guide body. Copy: HUB.article = { blocks: [{ id, h, paras: [html], list: [html], steps: [{t, d}], table: { head, rows }, callout: { title, text }, img, cap }] }.
   A contents list sits beside the text on wide screens. Styles: hub/hb-article.css. */
function HbArticle() {
  const A = window.HUB.article;
  if (!A || !A.blocks || !A.blocks.length) return null;
  const html = (t) => ({ __html: t });
  return (
    <section className="n-band n-band--white pm-band gd" id="guide">
      <div className="n-wrap gd__grid">
        <nav className="gd__toc" aria-label="In this guide">
          <span className="n-eyebrow">In this guide</span>
          <ol>{A.blocks.map((b) => <li key={b.id}><a href={"#" + b.id}>{b.h}</a></li>)}</ol>
        </nav>
        <div className="gd__body">
          {A.blocks.map((b) => (
            <section className="gd__sec" id={b.id} key={b.id}>
              <h2 className="gd__h">{b.h}</h2>
              {(b.paras || []).map((t, i) => <p key={i} dangerouslySetInnerHTML={html(t)} />)}
              {b.img && (
                <figure className="gd__fig">
                  <HbImg name={b.img} ratio="3 / 2" className="gd__img" />
                  {b.cap && <figcaption>{b.cap}</figcaption>}
                </figure>
              )}
              {b.list && <ul className="gd__list">{b.list.map((t, i) => <li key={i} dangerouslySetInnerHTML={html(t)} />)}</ul>}
              {b.steps && <ol className="gd__steps">{b.steps.map((st, i) => <li key={i}><b>{st.t}</b><span dangerouslySetInnerHTML={html(st.d)} /></li>)}</ol>}
              {b.table && (
                <div className="gd__tablewrap">
                  <table className="gd__table">
                    <caption>{b.table.caption}</caption>
                    <thead><tr>{b.table.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                    <tbody>{b.table.rows.map((r, i) => <tr key={i}>{r.map((c, j) => j === 0 ? <th scope="row" key={j}>{c}</th> : <td key={j}>{c}</td>)}</tr>)}</tbody>
                  </table>
                </div>
              )}
              {b.callout && <aside className="gd__callout"><b>{b.callout.title}</b><span dangerouslySetInnerHTML={html(b.callout.text)} /></aside>}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HbArticle, HbHero, HbAnswer, HbStages, HbLoop, HbNumbers, HbBrands, HbBeyond, HbFaq, HbCta, HbSticky });
