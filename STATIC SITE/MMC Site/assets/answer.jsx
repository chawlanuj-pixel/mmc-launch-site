/* assets/answer.jsx: the shared "In short" block (the answer-engine definition) used on the hubs, services and
   performance pages. One component, per-page copy. Styles: assets/answer.css (prefix ans__).
   Props: label, lead (the definition, 1 to 2 sentences, kept as ONE paragraph), hl (optional phrase inside lead
   to set in blue italic), who (optional sentence naming MMC), points [{icon,title,text}] (2 to 4),
   image (path under assets/), chip (small floating caption), cta {label, onClick} (optional), id. */
(function () {
  const S = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7,
              strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", focusable: "false" };
  const ICONS = {
    link:    <svg {...S}><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 18.700l1-1" /></svg>,
    loop:    <svg {...S}><path d="M20 12a8 8 0 0 1-13.7 5.6" /><path d="M4 12a8 8 0 0 1 13.7-5.6" /><path d="M18 3v4h-4" /><path d="M6 21v-4h4" /></svg>,
    gauge:   <svg {...S}><path d="M4.5 17a8.5 8.5 0 1 1 15 0" /><path d="M12 13l4-4" /><circle cx="12" cy="13.5" r="1.3" /></svg>,
    layers:  <svg {...S}><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></svg>,
    grid:    <svg {...S}><rect x="3.5" y="3.5" width="7" height="7" rx="2" /><rect x="13.5" y="3.5" width="7" height="7" rx="2" /><rect x="3.5" y="13.5" width="7" height="7" rx="2" /><rect x="13.5" y="13.5" width="7" height="7" rx="2" /></svg>,
    window:  <svg {...S}><rect x="3" y="4.5" width="18" height="15" rx="3" /><path d="M3 9.500h18" /><path d="M7 14.500h5" /></svg>,
    bag:     <svg {...S}><path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8V6.500a3 3 0 0 1 6 0V8" /></svg>,
    users:   <svg {...S}><circle cx="9" cy="8.5" r="3.2" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M16 5.700a3.2 3.2 0 0 1 0 5.6" /><path d="M18 14.200A6 6 0 0 1 21 20" /></svg>,
    target:  <svg {...S}><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" /></svg>,
    chart:   <svg {...S}><path d="M4 20V4" /><path d="M4 20h16" /><path d="M8 15l4-4 3 3 5-6" /></svg>,
    coin:    <svg {...S}><circle cx="12" cy="12" r="8.5" /><path d="M14.5 9.200c-.5-.8-1.4-1.2-2.5-1.2-1.4 0-2.5.7-2.5 1.800s1 1.6 2.5 2 2.5.9 2.5 2-1.1 1.8-2.5 1.800c-1.1 0-2-.4-2.5-1.2" /><path d="M12 6.500V8M12 16v1.5" /></svg>
  };
  const Sunrise = () => (
    <svg className="ans__sun-ic" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" aria-hidden="true" focusable="false">
      <path d="M5 17a7 7 0 0 1 14 0" /><path d="M2.5 17h19" /><path d="M12 4.500v2M5 8l1.4 1.400M19 8l-1.4 1.4" />
    </svg>
  );
  const ArrowIc = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
         strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  );

  function MmcAnswer({ label = "In short", lead, hl, who, points = [], image, chip, cta, id = "ans" }) {
    let leadNode = lead;
    if (hl && lead && lead.indexOf(hl) > -1) {
      const i = lead.indexOf(hl);
      leadNode = [lead.slice(0, i), <em key="hl" className="ans__hl">{hl}</em>, lead.slice(i + hl.length)];
    }
    const n = Math.min(4, Math.max(2, points.length));
    return (
      <section className="n-band n-band--paper ans" id="answer" aria-labelledby={id + "-h"}>
        <div className="n-wrap">
          <div className={"ans__card n-rise ans__card--" + n}>
            <div className="ans__main">
              <h2 className="ans__label" id={id + "-h"}><Sunrise />{label}</h2>
              <p className="ans__lead">{leadNode}</p>
              {who ? <p className="ans__who">{who}</p> : null}
              {cta ? (
                <button type="button" className="ans__cta" onClick={cta.onClick}>{cta.label}<ArrowIc /></button>
              ) : null}
            </div>
            {image ? (
              <figure className="ans__fig n-rise d1">
                <span className="ans__sun" aria-hidden="true"></span>
                <span className="ans__arch">
                  <img src={"assets/" + image} alt="" width="800" height="1000" decoding="async" />
                </span>
                {chip ? <figcaption className="ans__chip"><i aria-hidden="true"></i>{chip}</figcaption> : null}
              </figure>
            ) : null}
            <ul className="ans__pts">
              {points.map((p, k) => (
                <li className={"ans__pt n-rise d" + Math.min(k + 1, 4)} key={k}>
                  <span className="ans__ic">{ICONS[p.icon] || ICONS.layers}</span>
                  <span className="ans__pt-t">{p.title}</span>
                  <span className="ans__pt-x">{p.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }
  window.MmcAnswer = MmcAnswer;
})();

/* assets/answer.jsx (part 2): the shared closing call-to-action, MmcCta. Styles: assets/answer.css (prefix cta2__).
   Props: { eyebrow, h2a, h2b, lede, label, onBook, secondary: { href, label }, image, looks }.
   A photo of the audit call sits beside the promise, the button, and the four things the audit reads. */
(function () {
  const Arrow = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
  );
  const Tick = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
  );
  const LOOKS = ["Break-even economics", "Account structure", "Tracking", "Creative"];
  function MmcCta({ eyebrow = "Thirty minutes, your numbers", h2a, h2b, lede, label = "Book a strategy call", onBook, secondary, image = "au/audit-call.jpg", looks = LOOKS }) {
    const sec = secondary === undefined ? { href: "audit.html", label: "How the audit works" } : secondary;
    return (
      <section className="n-band n-band--paper cta2" id="talk">
        <div className="n-wrap">
          <div className="cta2__card n-rise">
            <figure className="cta2__fig">
              <img src={"assets/" + image} alt="" width="1024" height="688" loading="lazy" decoding="async" />
              <figcaption className="cta2__chip"><i aria-hidden="true"></i>Your numbers, on screen</figcaption>
            </figure>
            <div className="cta2__body">
              <span className="cta2__eyebrow">{eyebrow}</span>
              <h2 className="cta2__h">{h2a} <em>{h2b}</em></h2>
              <p className="cta2__lede">{lede}</p>
              {looks && looks.length ? (
                <div className="cta2__looks">
                  <span className="cta2__looks-t">What the audit reads</span>
                  <ul>{looks.map((t) => <li key={t}><Tick />{t}</li>)}</ul>
                </div>
              ) : null}
              <div className="cta2__act">
                <button type="button" className="cta2__btn" onClick={onBook}>{label}<Arrow /></button>
                {sec ? <a className="cta2__link" href={sec.href}>{sec.label}<Arrow /></a> : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  window.MmcCta = MmcCta;
})();
