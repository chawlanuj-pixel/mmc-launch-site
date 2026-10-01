/* hub/hb-loop-b.jsx: "Lead quality" section, Option B (light, calm, mobile-first).
   Reads window.HUB.loop. Short mobile-friendly copy lives here, keyed by window.HUB.key; falls back to the loop data.
   Plain inline SVG icons, no emoji. Flow animation is CSS only and is switched off for reduced motion. */
const LQB_SHORT = {
  education: {
    steps: [
      ["The enquiry arrives", "A form fill, call or WhatsApp message."],
      ["Your CRM records what happens", "Contacted, applied, admitted, enrolled."],
      ["CAPI sends the stage to Meta", "A server-side event, not a browser guess."],
      ["Meta learns your best applicants", "It learns from the families who enrolled."]
    ],
    back: "The next ads aim at families like the ones who enrolled",
    without: { t: "Optimised for enquiries", pts: [
      "Meta sees only that a form was filled.",
      "It tends to find whoever fills a form cheapest.",
      "Counsellors can end up chasing families who never apply."] },
    with: { t: "Optimised for applicants", pts: [
      "Meta sees who applied and who enrolled.",
      "Spend can shift toward families like those who enrolled.",
      "The cost of an enrolment becomes the number to watch."] }
  },
  b2b: {
    steps: [
      ["The lead arrives", "A form fill, call or WhatsApp enquiry."],
      ["Your CRM records what happens", "Qualified, meeting booked, won."],
      ["CAPI sends the stage to Meta", "A server-side event, not a browser guess."],
      ["Meta learns your best leads", "It learns from the buyers sales accepted."]
    ],
    back: "The next ads aim at leads like the good ones",
    without: { t: "Optimised for form fills", pts: [
      "Meta sees only that a form was filled.",
      "It tends to find whoever fills a form cheapest.",
      "Sales can end up chasing leads that never fit."] },
    with: { t: "Optimised for qualified leads", pts: [
      "Meta sees which leads sales accepted and won.",
      "Spend can shift toward buyers like the ones you win.",
      "The cost of a qualified lead becomes the number to watch."] }
  }
};

const LQB_ICONS = [
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h11M11 7l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M19 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>,
  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="14" rx="3" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M3.5 10h17M9.5 10v9" stroke="currentColor" strokeWidth="2" /></svg>,
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9h12M14 5.5 17.5 9 14 12.5M19 15H7M10 11.5 6.5 15 10 18.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
];

function HbLoopB() {
  const H = window.HUB, L = H && H.loop;
  const [mode, setMode] = React.useState("with");
  if (!L) return null;
  const S = LQB_SHORT[H.key] || {};
  const steps = L.steps.map((s, i) => ({
    t: S.steps ? S.steps[i][0] : s.k,
    d: S.steps ? S.steps[i][1] : s.d,
    chip: i === 3 ? "A clearer signal" : s.chip
  }));
  const back = S.back || L.returnLabel;
  const cmp = {
    without: { tag: "Without the CRM feedback", t: (S.without || L.without).t, pts: S.without ? S.without.pts : [L.without.d] },
    with: { tag: "With CRM and CAPI", t: (S.with || L.with).t, pts: S.with ? S.with.pts : [L.with.d] }
  };
  const Panel = ({ k }) => {
    const c = cmp[k], on = mode === k;
    return (
      <article
               className={"lqb__panel lqb__panel--" + k + (on ? " is-on" : "")}>
        <span className="lqb__tag">
          {k === "with"
            ? <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="currentColor" /><path d="M5.6 10.4 8.6 13.2 14.2 7.4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            : <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="currentColor" /><path d="M6 10h8" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>}
          {c.tag}
        </span>
        <h3>{c.t}</h3>
        <ul>{c.pts.map((p, i) => <li key={i}>{p}</li>)}</ul>
      </article>
    );
  };
  return (
    <section className="lqb" id="quality" aria-labelledby="lqb-h">
      <div className="lqb__wrap">
        <div className="lqb__head">
          <div className="lqb__copy">
            <span className="lqb__eyebrow">{L.eyebrow}</span>
            <h2 id="lqb-h" className="lqb__h">{L.h2a} <em>{L.h2b}</em></h2>
            <p className="lqb__lede">{L.lede}</p>
          </div>
          <figure className="lqb__shot">
            <img src={"assets/" + L.img} alt="" loading="lazy" decoding="async" onError={(e) => e.currentTarget.closest("figure").remove()} />
            <figcaption>{L.imgCaption}</figcaption>
          </figure>
        </div>

        <div className="lqb__card">
          <ol className="lqb__flow">
            {steps.map((s, i) => (
              <li key={i} className="lqb__step">
                <span className={"lqb__ico" + (i === 3 ? " is-meta" : "")}>
                  {i === 3 ? <img src="assets/platforms/meta.svg" alt="" width="22" height="22" /> : LQB_ICONS[i]}
                </span>
                <div className="lqb__txt">
                  <span className="lqb__n">Step {i + 1}</span>
                  <b>{s.t}</b>
                  <span className="lqb__d">{s.d}</span>
                  <em className="lqb__chip">{s.chip}</em>
                </div>
              </li>
            ))}
          </ol>
          <div className="lqb__back" aria-label={"Loops back to step 1: " + back}>
            <span className="lqb__loopico" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M18.5 3v4h-4M5.5 21v-4h4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <span className="lqb__pill"><i>Back to step 1</i>{back}</span>
          </div>
        </div>

        <div className="lqb__cmp">
          <div className="lqb__seg" role="group" aria-label="Compare with and without CRM feedback">
            {["without", "with"].map((k) => (
              <button key={k} type="button"
                      aria-pressed={mode === k} className={"lqb__segbtn" + (mode === k ? " is-on" : "")} onClick={() => setMode(k)}>
                {k === "without" ? "Without" : "With CRM and CAPI"}
              </button>
            ))}
          </div>
          <div className="lqb__panels"><Panel k="without" /><Panel k="with" /></div>
        </div>
        <p className="lqb__note">Illustration of the idea, not a client result.</p>
      </div>
    </section>
  );
}
Object.assign(window, { HbLoopB });
