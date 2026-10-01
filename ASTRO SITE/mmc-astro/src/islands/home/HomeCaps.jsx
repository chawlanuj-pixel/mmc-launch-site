import React from "react";
import { href } from "../../lib/links";

const N_CAPS = [
  { k: "performance", t: "Performance media", h: "performance-marketing.html",
    d: "Meta, Google, Amazon and quick-commerce for shops, and search and social lead generation for B2B and education, all budgeted against profit rather than platform ROAS.",
    tags: ["Meta", "Google", "Amazon", "Lead generation"] },
  { k: "creative", t: "Creative & UGC", h: "ugc-and-video.html",
    d: "Creator content, performance edits, statics and landing-page copy, all built from one brand idea so every ad feels like the same company.",
    tags: ["UGC", "Performance edits", "Creators", "Statics"] },
  { k: "retention", t: "Retention & follow-up", h: "retention-marketing.html",
    d: "Email and WhatsApp built on the reason people come back, from repeat orders for shops to follow-up for buyers and applicant families.",
    tags: ["Email", "WhatsApp", "Loyalty", "Follow-up"] },
  { k: "conversion", t: "Conversion & technology", h: "conversion-rate-optimisation.html",
    d: "Shopify builds, checkout, speed and CRO. The page the ad lands on is the most important ad you own.",
    tags: ["Shopify", "CRO", "Checkout", "Landing pages"] },
  { k: "brand", t: "Brand & packaging", h: "branding.html",
    d: "Identity, packaging and design systems that make paid media work harder by making the brand easier to remember.",
    tags: ["Identity", "Packaging", "UI/UX", "Systems"] },
];

/* Services hover-to-project: one peek panel follows the row under the pointer and leans in the direction it travels. */
export default function HomeCaps() {
  const [at, setAt] = React.useState(0);
  const listRef = React.useRef(null);
  const [y, setY] = React.useState(0);
  const [tilt, setTilt] = React.useState(-3);
  const prevY = React.useRef(0);
  const settle = React.useRef(null);

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
    setTilt(Math.max(-7, Math.min(0.5, -3 - travel * 0.014)));
    clearTimeout(settle.current);
    settle.current = setTimeout(() => setTilt(-3), 190);
  };

  React.useEffect(() => () => clearTimeout(settle.current), []);

  // No hover on touch: cycle the active row on its own, but only while the
  // section is on screen and only if the visitor hasn't touched a row yet.
  const touched = React.useRef(false);
  React.useEffect(() => {
    if (!window.matchMedia || !window.matchMedia("(hover: none)").matches) return;
    const list = listRef.current;
    if (!list) return;
    let id = null;
    const io = new IntersectionObserver(([entry]) => {
      clearInterval(id); id = null;
      if (entry.isIntersecting) {
        id = setInterval(() => {
          if (touched.current) return;
          setAt((v) => (v + 1) % N_CAPS.length);
        }, 3200);
      }
    }, { threshold: 0.4 });
    io.observe(list);
    return () => { io.disconnect(); clearInterval(id); };
  }, []);
  const onTouch = () => { touched.current = true; };

  return (
    <div className="n-caps" ref={listRef} onMouseLeave={() => setAt(0)}>
      <span className="n-caps__dots" aria-hidden="true">
        {N_CAPS.map((c, i) => <i key={c.k} className={at === i ? "is-on" : ""} />)}
      </span>
      <span className={"n-peek" + (at > -1 ? " is-on" : "")}
            style={{ "--peek-y": y + "px", "--peek-tilt": tilt + "deg" }} aria-hidden="true">
        {N_CAPS.map((c, i) => (
          <img key={c.k} src={"/assets/services/" + c.k + ".jpg"} alt=""
               loading="lazy" decoding="async"
               className={"n-peek__img" + (at === i ? " is-on" : "")} />
        ))}
      </span>

      {N_CAPS.map((c, i) => (
        <a suppressHydrationWarning className={"n-cap n-rise d" + Math.min(4, i + 1) + (at === i ? " is-at" : "")}
           href={href(c.h)} key={c.k} onMouseEnter={enter(i)} onFocus={enter(i)} onTouchStart={onTouch}>
          <span className="n-cap__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          <span className="n-cap__t">
            <b>{c.t}</b>
            <span className="n-cap__tags">{c.tags.map((t) => <span key={t}>{t}</span>)}</span>
          </span>
          <span className="n-cap__d">{c.d}</span>
          <span className="n-cap__go" aria-hidden="true">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2 10.3 H12.1 V5 L22.2 12 L12.1 19 V13.7 H2 Z" />
            </svg>
          </span>
        </a>
      ))}
    </div>
  );
}
