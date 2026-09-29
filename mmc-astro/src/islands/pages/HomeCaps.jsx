import React from "react";
import { href } from "../../lib/links";

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

  return (
    <div className="n-caps" ref={listRef} onMouseLeave={() => setAt(0)}>
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
           href={href(c.h)} key={c.k} onMouseEnter={enter(i)} onFocus={enter(i)}>
          <span className="n-cap__t">
            <b>{c.t}</b>
            <span className="n-cap__tags">{c.tags.map((t) => <span key={t}>{t}</span>)}</span>
          </span>
          <span className="n-cap__d">{c.d}<br /><span className="n-cap__m">{c.m}</span></span>
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
