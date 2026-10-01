import React from "react";
import { href } from "../../lib/links";

/* Six systems. Column one = 1-3, column two = 4-6; on phones the two lists stack, so the reading order stays 01..06.
   `img` is the peek cover (hover-to-project). Organic Traffic has none, so no peek shows for it. */
const SYSTEMS = [
  { k: "performance", t: "Performance media", h: "performance-marketing.html", img: "performance",
    d: "Meta, Google, Amazon and quick-commerce for shops, and search and social lead generation for B2B and education, all budgeted against profit rather than platform ROAS.",
    tags: ["Meta", "Google", "Amazon", "Lead generation"] },
  { k: "content", t: "Content Marketing", h: "ugc-and-video.html", img: "creative",
    d: "Creator content, performance edits, statics, emailers and landing-page copy, all built from one brand idea so every ad feels like the same company.",
    tags: ["Performance Creatives", "Social Media", "UGC", "Emailers"] },
  { k: "retention", t: "Retention & follow-up", h: "retention-marketing.html", img: "retention",
    d: "Email and WhatsApp built on the reason people come back, from repeat orders for shops to follow-up for buyers and applicant families.",
    tags: ["Email", "WhatsApp", "Loyalty", "Follow-up"] },
  { k: "conversion", t: "Conversion Technology", h: "conversion-rate-optimisation.html", img: "conversion",
    d: "Shopify builds, checkout, speed and CRO. The page the ad lands on is the most important ad you own.",
    tags: ["Website Development", "App Development", "CRO", "Automations"] },
  { k: "brand", t: "Brand and Packaging", h: "branding.html", img: "brand",
    d: "Identity, packaging and design systems that make paid media work harder by making the brand easier to remember.",
    tags: ["Logo Design", "Packaging", "UI/UX", "Design & Communication"] },
  { k: "organic", t: "Organic Traffic", h: "seo.html", img: null,
    d: "Be found when people search, and cited when they ask an AI. Technical foundations and content that earn steady organic visits, so growth does not rest on ad spend alone.",
    tags: ["SEO", "AEO", "GEO"] },
];
const COLS = [[0, 1, 2], [3, 4, 5]];

/* Hover-to-project: each column has one peek panel that follows the card under the pointer and leans in the direction it travels. */
export default function HomeSystems() {
  const [at, setAt] = React.useState(0);
  const rootRef = React.useRef(null);
  const colRefs = [React.useRef(null), React.useRef(null)];
  const [peek, setPeek] = React.useState([{ y: 0, tilt: -3 }, { y: 0, tilt: -3 }]);
  const prevY = React.useRef([0, 0]);
  const settle = React.useRef([null, null]);

  const place = React.useCallback((i, el, instant) => {
    const c = i < 3 ? 0 : 1;
    const list = colRefs[c].current;
    if (!list || !el) return;
    const r = el.getBoundingClientRect();
    const pad = parseFloat(getComputedStyle(el).paddingTop) || 24;
    const next = r.top - list.getBoundingClientRect().top + pad + 54;
    const travel = instant ? 0 : next - prevY.current[c];
    prevY.current[c] = next;
    const tilt = Math.max(-7, Math.min(0.5, -3 - travel * 0.014));
    setPeek((p) => p.map((v, j) => (j === c ? { y: next, tilt } : v)));
    clearTimeout(settle.current[c]);
    settle.current[c] = setTimeout(() => setPeek((p) => p.map((v, j) => (j === c ? { ...v, tilt: -3 } : v))), 190);
  }, []);

  React.useEffect(() => {
    const first = rootRef.current && rootRef.current.querySelector(".sy-card");
    if (first) place(0, first, true);
    return () => settle.current.forEach(clearTimeout);
  }, [place]);

  const enter = (i) => (e) => { setAt(i); place(i, e.currentTarget, false); };

  // Touch: no hover, so cycle the highlighted card while the section is on screen and untouched.
  const touched = React.useRef(false);
  React.useEffect(() => {
    if (!window.matchMedia || !window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = rootRef.current;
    if (!root) return;
    let id = null;
    const io = new IntersectionObserver(([entry]) => {
      clearInterval(id); id = null;
      if (entry.isIntersecting) {
        id = setInterval(() => { if (!touched.current) setAt((v) => (v + 1) % SYSTEMS.length); }, 3200);
      }
    }, { threshold: 0.2 });
    io.observe(root);
    return () => { io.disconnect(); clearInterval(id); };
  }, []);

  return (
    <div className="sy-cols" ref={rootRef} onMouseLeave={() => setAt(0)}>
      <span className="sy-dots" aria-hidden="true">
        {SYSTEMS.map((c, i) => <i key={c.k} className={at === i ? "is-on" : ""} />)}
      </span>
      {COLS.map((idxs, c) => {
        const on = idxs.includes(at) && SYSTEMS[at].img;
        return (
          <div className="sy-list" key={c} ref={colRefs[c]}>
            <span className={"sy-peek" + (on ? " is-on" : "")}
                  style={{ "--peek-y": peek[c].y + "px", "--peek-tilt": peek[c].tilt + "deg" }} aria-hidden="true">
              {idxs.filter((i) => SYSTEMS[i].img).map((i) => (
                <img key={SYSTEMS[i].k} src={"/assets/services/" + SYSTEMS[i].img + ".jpg"} alt=""
                     loading="lazy" decoding="async"
                     className={"sy-peek__img" + (at === i ? " is-on" : "")} />
              ))}
            </span>
            {idxs.map((i) => {
              const s = SYSTEMS[i];
              return (
                <a className={"sy-card" + (at === i ? " is-at" : "")} href={href(s.h)} key={s.k}
                   onMouseEnter={enter(i)} onFocus={enter(i)} onTouchStart={() => { touched.current = true; }}>
                  <span className="sy-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <span className="sy-t">
                    <b>{s.t}</b>
                    <span className="sy-tags">{s.tags.map((t) => <span key={t}>{t}</span>)}</span>
                  </span>
                  <span className="sy-d">{s.d}</span>
                  <span className="sy-go" aria-hidden="true">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 10.3 H12.1 V5 L22.2 12 L12.1 19 V13.7 H2 Z" /></svg>
                  </span>
                </a>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
