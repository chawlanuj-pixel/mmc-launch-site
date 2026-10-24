import React from "react";
import { PHONE_DISPLAY, WHATSAPP } from "../../lib/site";

/* contact/CtPage.jsx, Contact page */

function CtPage({ onAudit }) {
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "", email: "", brand: "", revenue: "", systems: [], message: ""
  });
  const update = (k) => (e) => setForm((f) => ({...f, [k]: e.target.value}));
  const toggleSystem = (s) => {
    setForm((f) => ({
      ...f,
      systems: f.systems.includes(s) ? f.systems.filter(x => x !== s) : [...f.systems, s]
    }));
  };

  const revenueBands = ["Pre-launch / 0–10L", "₹10L – ₹1Cr", "₹1Cr – ₹10Cr", "₹10Cr – ₹50Cr", "₹50Cr+"];
  const systems = ["Performance", "SEO + Content", "Brand & Design", "Tech / Site", "Creative / UGC", "Retention / CRM"];

  return (
    <>
      <section className="page-hero ct-hero" id="top" data-wm="Contact">
        <span className="page-hero__wm" aria-hidden="true">Contact</span>
        <div className="container ct-hero__inner">
          <div className="eyebrow">Contact · Three ways in</div>
          <h1 className="ct-hero__h">
            Let's{" "}
            <span className="em-serif">talk</span>{" "}
            about your brand.
          </h1>
          <p className="ct-hero__sub">
            Pick the format that fits how you work. We'll come back inside one
            working day, with a slot and a short pre-read.
          </p>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          .ct-hero { position: relative; z-index: 1; padding: 140px 0 clamp(40px, 5vw, 64px); }
          .ct-hero__inner { max-width: none; }
          .ct-hero__h { font-family: var(--font-display); font-weight: 700; font-size: clamp(48px, 6.4vw, 104px); line-height: 0.96; letter-spacing: -0.035em; color: var(--fg-1); margin: 22px 0 28px; }
          .ct-hero__sub { font-family: var(--font-body); font-size: clamp(17px, 1.4vw, 22px); line-height: 1.5; color: var(--fg-2); max-width: 640px; margin: 0; }
        ` }} />
      </section>

      {/* Three channels */}
      <section className="ct-channels">
        <div className="container">
          <div className="ct-channels__grid">
            <div className="ct-channel ct-channel--primary">
              <div className="ct-channel-top">
                <span className="ct-channel-n">01</span>
                <span className="ct-channel-tag">Recommended</span>
              </div>
              <h2 className="ct-channel-h">Book a strategy call</h2>
              <p className="ct-channel-desc">
                30 minutes with a senior strategist. A direct read on the three
                things to fix first. No pitch.
              </p>
              <button className="ct-channel-cta" onClick={onAudit}>
                Book the call
                <span className="arrow"></span>
              </button>
              <div className="ct-channel-foot">Avg. response · 4 hours</div>
            </div>

            <a className="ct-channel" href={WHATSAPP}>
              <div className="ct-channel-top">
                <span className="ct-channel-n">02</span>
                <span className="ct-channel-tag">Quickest</span>
              </div>
              <h2 className="ct-channel-h">WhatsApp us</h2>
              <p className="ct-channel-desc">
                Voice note, screenshot, or a single question.
              </p>
              <span className="ct-channel-cta">
                {PHONE_DISPLAY}
                <span className="arrow"></span>
              </span>
              <div className="ct-channel-foot">Mon to Sat · 10:00 to 19:00 IST</div>
            </a>

            <a className="ct-channel" href="mailto:sales-in@mondaymarketing.company?subject=Proposal request">
              <div className="ct-channel-top">
                <span className="ct-channel-n">03</span>
                <span className="ct-channel-tag">For procurement</span>
              </div>
              <h2 className="ct-channel-h">Request a proposal</h2>
              <p className="ct-channel-desc">
                Send a brief, we send back a scoped proposal with pricing,
                deliverables, and the team you'll work with.
              </p>
              <span className="ct-channel-cta">
                sales-in@mondaymarketing.company
                <span className="arrow"></span>
              </span>
              <div className="ct-channel-foot">Returns in 48 hours</div>
            </a>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          .ct-channels { position: relative; z-index: 1; padding: clamp(40px, 5vw, 64px) 0 clamp(56px, 7vw, 96px); }
          .ct-channels__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(14px, 1.8vw, 22px); }
          .ct-channel { background: rgba(255,255,255,0.85); backdrop-filter: blur(14px); border: 1px solid rgba(var(--mmc-blue-rgb), 0.10); border-radius: 16px; padding: clamp(28px, 3vw, 36px); display: flex; flex-direction: column; gap: 14px; color: var(--fg-1); transition: transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out); }
          .ct-channel:hover { transform: translateY(-4px); box-shadow: var(--shadow-3); color: var(--fg-1);
          position: relative; z-index: 2;
        }
          .ct-channel--primary { background: var(--mmc-blue); color: #fff; border-color: transparent; }
          .ct-channel--primary .ct-channel-h, .ct-channel--primary .ct-channel-desc, .ct-channel--primary .ct-channel-cta, .ct-channel--primary .ct-channel-foot { color: #fff; }
          .ct-channel--primary .ct-channel-desc { color: rgba(255,255,255,0.78); }
          .ct-channel--primary .ct-channel-foot { color: rgba(255,255,255,0.55); border-color: rgba(255,255,255,0.18); }
          .ct-channel-top { display: flex; justify-content: space-between; align-items: center; }
          .ct-channel-n { font-family: var(--font-display); font-weight: 700; font-size: 13px; letter-spacing: 0.18em; color: var(--mmc-yellow); }
          .ct-channel-tag { font-family: var(--font-body); font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; padding: 5px 10px; border-radius: 999px; background: rgba(var(--mmc-yellow-rgb), 0.18); color: var(--mmc-yellow); }
          .ct-channel-h { font-family: var(--font-display); font-weight: 700; font-size: clamp(26px, 2.4vw, 32px); letter-spacing: -0.025em; line-height: 1.1; color: var(--fg-1); margin: 0; }
          .ct-channel-desc { font-family: var(--font-body); font-size: 14px; line-height: 1.55; color: var(--fg-2); margin: 0; }
          .ct-channel-cta { display: inline-flex; align-items: center; gap: 14px; margin-top: 8px; font-family: var(--font-body); font-size: 13px; font-weight: 700; letter-spacing: 0.04em; color: var(--mmc-blue); background: none; padding: 0; cursor: pointer; }
          .ct-channel-cta .arrow { width: 18px; height: 1.5px; background: currentColor; position: relative; transition: width var(--dur-base) var(--ease-out); }
          .ct-channel-cta .arrow::after { content: ""; position: absolute; right: -1px; top: -4px; width: 8px; height: 8px; border-top: 1.5px solid currentColor; border-right: 1.5px solid currentColor; transform: rotate(45deg); }
          .ct-channel:hover .ct-channel-cta .arrow { width: 28px; }
          .ct-channel-foot { font-family: var(--font-body); font-size: 11px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--fg-3); margin-top: auto; padding-top: 14px; border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.10); }
          @media (max-width: 880px) { .ct-channels__grid { grid-template-columns: 1fr; } }
        ` }} />
      </section>

      {/* Live calendar: the fastest path, so it sits above the form */}
      <section className="ct-book" id="book">
        <div className="container">
          <div className="ct-book__head">
            <span className="eyebrow">Pick a slot</span>
            <h2 className="ct-book__h">
              Thursday works? <span className="em-serif" style={{color:"var(--mmc-blue)"}}>Take it.</span>
            </h2>
            <p className="ct-book__p">
              30 minutes with a senior strategist. No deck, no pitch, a direct read on the
              three things to fix first. Pick a time that suits you and it's booked.
            </p>
          </div>
          <CalendlyInline />
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .ct-book { position: relative; z-index: 1; padding: 0 0 clamp(48px, 6vw, 80px); scroll-margin-top: 104px; }
          .ct-book__head { max-width: 640px; margin-bottom: clamp(20px, 2.6vw, 32px); }
          .ct-book__h {
            font-family: var(--font-display); font-weight: 600;
            font-size: clamp(26px, 3vw, 44px); letter-spacing: -0.025em;
            line-height: 1.08; margin: 14px 0 0; color: var(--fg-1);
          }
          .ct-book__p {
            font-family: var(--font-body); font-size: 15px; line-height: 1.6;
            color: var(--fg-3); margin: 12px 0 0; max-width: 58ch;
          }
          .ct-book__frame {
            border: 1px solid rgba(var(--mmc-blue-rgb), 0.12); border-radius: 16px;
            overflow: hidden; background: #fff;
            box-shadow: 0 12px 40px rgba(15,30,94,0.07);
          }
        ` }} />
      </section>

      {/* Form + sidebar */}
      <section className="ct-form-sec">
        <div className="container">
          <div className="ct-form-sec__grid">
            <div className="ct-form-sec__l">
              {!submitted ? (
                <form className="ct-form" onSubmit={(e) => {
                  e.preventDefault();
                  if (window.MMCForms) {
                    window.MMCForms.submitLead(
                      { ...form, source: "Contact page" },
                      { subject: "New brief, " + (form.brand || form.name || "Contact form") }
                    );
                  }
                  setSubmitted(true);
                }}>
                  <div className="eyebrow">Or fill the brief</div>
                  <h2 className="ct-form-h">Tell us about the brand.</h2>
                  <p className="ct-form-sub">We'll come back inside one working day with a slot and a short pre-read.</p>

                  <div className="ct-row">
                    <label>
                      <span>Your name <i>*</i></span>
                      <input type="text" value={form.name} onChange={update("name")} required placeholder="Aanya Sharma" />
                    </label>
                    <label>
                      <span>Work email <i>*</i></span>
                      <input type="email" value={form.email} onChange={update("email")} required placeholder="you@yourbrand.com" />
                    </label>
                  </div>

                  <label>
                    <span>Brand name <i>*</i></span>
                    <input type="text" value={form.brand} onChange={update("brand")} required placeholder="Your brand name" />
                  </label>

                  <label>
                    <span>Annual revenue · last 12 months <i>*</i></span>
                    <div className="ct-chips">
                      {revenueBands.map((b) => (
                        <button type="button" key={b}
                          className={"ct-chip " + (form.revenue === b ? "is-on" : "")}
                          onClick={() => setForm(f => ({...f, revenue: b}))}>
                          {b}
                        </button>
                      ))}
                    </div>
                  </label>

                  <label>
                    <span>Systems you're interested in</span>
                    <div className="ct-chips">
                      {systems.map((s) => (
                        <button type="button" key={s}
                          className={"ct-chip " + (form.systems.includes(s) ? "is-on" : "")}
                          onClick={() => toggleSystem(s)}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </label>

                  <label>
                    <span>What would you fix tomorrow?</span>
                    <textarea rows="4" value={form.message} onChange={update("message")} placeholder="Retention is flat past D30 and our Meta ROAS keeps slipping…"></textarea>
                  </label>

                  <div className="ct-form-foot">
                    <button type="submit" className="btn btn--primary glow-btn">
                      <span className="glow-btn__glow" aria-hidden="true"></span>
                      <span className="glow-btn__inner">
                        Send the brief
                        <span className="arrow"></span>
                      </span>
                    </button>
                    <span className="ct-fineprint">No pitch decks · No spam · Reply within 1 working day</span>
                  </div>
                </form>
              ) : (
                <div className="ct-thanks">
                  <div className="ct-thanks-ring">
                    <svg viewBox="0 0 80 80" width="80" height="80">
                      <circle cx="40" cy="40" r="36" fill="none" stroke="var(--mmc-yellow)" strokeWidth="2"/>
                      <path d="M 26 41 L 36 51 L 56 31" fill="none" stroke="var(--mmc-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h2>Thanks, {form.name.split(" ")[0] || "friend"}.</h2>
                  <p>We'll read your brief for <span className="em-serif" style={{color:"var(--mmc-blue)"}}>{form.brand || "your brand"}</span> and come back inside one working day with a slot and a short pre-read.</p>
                </div>
              )}
            </div>

            <aside className="ct-form-sec__r">
              <div className="ct-side">
                <div className="ct-side-block">
                  <div className="ct-side-label">Studio</div>
                  <div className="ct-side-h">Mumbai</div>
                  <p className="ct-side-body">
                    4th Floor, Office No. 105<br/>
                    WeWork, Zenia Building<br/>
                    Hiranandani Business Park<br/>
                    Thane 400607 · Maharashtra · India
                  </p>
                  <a className="ct-side-link" href="https://maps.app.goo.gl/" target="_blank" rel="noreferrer">View on Maps <span className="arrow"></span></a>
                </div>

                <div className="ct-side-block">
                  <div className="ct-side-label">Hours · IST</div>
                  <div className="ct-side-h">Monday → Saturday</div>
                  <p className="ct-side-body">10:00 to 19:00 · Mon to Fri<br/>10:00 to 14:00 · Sat</p>
                </div>

                <div className="ct-side-block">
                  <div className="ct-side-label">Talent</div>
                  <p className="ct-side-body">
                    Looking to join the studio? See{" "}
                    <a href="/careers/" style={{color: "var(--mmc-blue)", borderBottom: "1px solid currentColor"}}>open roles</a>{" "}or write to{" "}
                    <a href="mailto:hr@mondaymarketing.company" style={{color: "var(--mmc-blue)", borderBottom: "1px solid currentColor"}}>hr@</a>.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          .ct-form-sec { position: relative; z-index: 1; padding: clamp(56px, 7vw, 96px) 0; }
          .ct-form-sec__grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: clamp(28px, 4vw, 56px); align-items: start; }

          .ct-form { background: rgba(255,255,255,0.88); backdrop-filter: blur(14px); border: 1px solid rgba(var(--mmc-blue-rgb), 0.10); border-radius: 18px; padding: clamp(28px, 3.4vw, 48px); display: flex; flex-direction: column; gap: 22px; }
          .ct-form-h { font-family: var(--font-display); font-weight: 600; font-size: clamp(28px, 3.2vw, 40px); letter-spacing: -0.025em; line-height: 1.06; margin: 12px 0 6px; }
          .ct-form-sub { font-family: var(--font-body); font-size: 14.5px; color: var(--fg-2); margin: 0 0 14px; }
          .ct-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
          .ct-form label { display: flex; flex-direction: column; gap: 8px; }
          .ct-form label > span { font-family: var(--font-body); font-size: 10.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--fg-3); }
          .ct-form label > span i { font-style: normal; color: var(--mmc-yellow); margin-left: 3px; }
          .ct-form input, .ct-form textarea { font-family: var(--font-body); font-size: 14.5px; color: var(--mmc-text); background: #fff; border: 1px solid var(--mmc-border); border-radius: 8px; padding: 12px 14px; width: 100%; font-weight: 500; transition: border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out); }
          .ct-form input::placeholder, .ct-form textarea::placeholder { color: rgba(75, 85, 99, 0.45); }
          .ct-form input:focus, .ct-form textarea:focus { outline: none; border-color: var(--mmc-blue); box-shadow: 0 0 0 3px rgba(var(--mmc-blue-rgb), 0.12); }
          .ct-form textarea { resize: vertical; min-height: 90px; font-family: var(--font-body); }
          .ct-chips { display: flex; flex-wrap: wrap; gap: 6px; }
          .ct-chip { font-family: var(--font-body); font-size: 12px; font-weight: 600; padding: 8px 12px; border-radius: 999px; background: #fff; color: var(--fg-1); border: 1px solid var(--mmc-border); cursor: pointer; transition: all var(--dur-base) var(--ease-out); }
          .ct-chip:hover { border-color: var(--mmc-blue); color: var(--mmc-blue); }
          .ct-chip.is-on { background: var(--mmc-blue); color: var(--mmc-yellow); border-color: var(--mmc-blue); }
          .ct-form-foot { display: flex; align-items: center; gap: 18px; padding-top: 8px; flex-wrap: wrap; }
          .ct-fineprint { font-family: var(--font-body); font-size: 11.5px; color: var(--fg-3); font-style: italic; }

          .ct-thanks { padding: clamp(40px, 5vw, 64px); background: rgba(255,255,255,0.88); border: 1px solid rgba(var(--mmc-blue-rgb), 0.10); border-radius: 18px; display: flex; flex-direction: column; gap: 18px; }
          .ct-thanks h2 { font-family: var(--font-display); font-weight: 600; font-size: clamp(28px, 3.2vw, 40px); letter-spacing: -0.025em; line-height: 1.06; margin: 0; }
          .ct-thanks p { font-family: var(--font-body); font-size: 16px; line-height: 1.55; color: var(--fg-2); margin: 0; }

          .ct-side { display: flex; flex-direction: column; gap: 28px; padding: 28px 30px; background: rgba(255,255,255,0.65); border: 1px solid rgba(var(--mmc-blue-rgb), 0.10); border-radius: 18px; backdrop-filter: blur(12px); position: sticky; top: 110px; }
          .ct-side-block { padding-bottom: 24px; border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.10); }
          .ct-side-block:last-child { border-bottom: 0; padding-bottom: 0; }
          .ct-side-label { font-family: var(--font-body); font-size: 10.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--mmc-yellow); margin-bottom: 8px; }
          .ct-side-h { font-family: var(--font-display); font-weight: 700; font-size: 19px; letter-spacing: -0.015em; color: var(--mmc-blue); margin-bottom: 8px; }
          .ct-side-body { font-family: var(--font-body); font-size: 13.5px; line-height: 1.6; color: var(--fg-2); margin: 0; }
          .ct-side-link { display: inline-flex; align-items: center; gap: 10px; margin-top: 12px; font-family: var(--font-body); font-size: 11.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--mmc-blue); padding-bottom: 3px; border-bottom: 1px solid rgba(var(--mmc-blue-rgb), 0.25); }
          .ct-side-link .arrow { width: 16px; height: 1.5px; background: currentColor; position: relative; }
          .ct-side-link .arrow::after { content: ""; position: absolute; right: -1px; top: -3px; width: 7px; height: 7px; border-top: 1.5px solid currentColor; border-right: 1.5px solid currentColor; transform: rotate(45deg); }
          .ct-side-cities { display: flex; flex-direction: column; gap: 8px; margin-top: 8px; }
          .ct-side-city { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
          .ct-side-city .city { font-family: var(--font-display); font-weight: 600; font-size: 15px; letter-spacing: -0.01em; color: var(--mmc-blue-700); }
          .ct-side-city .note { font-family: var(--font-body); font-size: 11px; color: var(--fg-3); font-weight: 600; letter-spacing: 0.04em; }

          @media (max-width: 980px) {
            .ct-form-sec__grid { grid-template-columns: 1fr; }
            .ct-side { position: static; }
            .ct-row { grid-template-columns: 1fr; }
          }
        ` }} />
      </section>
    </>
  );
}

/* CalendlyInline: hands the element to mmcInlineCalendly(), which lazy-loads
   Calendly's widget.js and mounts the inline booking widget into it. */
function CalendlyInline() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && window.mmcInlineCalendly) window.mmcInlineCalendly(ref.current);
  }, []);
  return <div className="ct-book__frame"><div ref={ref} style={{ minWidth: "320px", height: "700px" }} /></div>;
}

export { CtPage };
