/* AuditModal.jsx, Brand audit signup popup
   Editorial 2-column modal: left = pitch, right = form.
   GSAP entry: scrim fades, sheet rises with the yellow underline drawing. */

function AuditModal({ open, onClose }) {
  // The audit form is now the secondary path, primary CTAs book a call.
  // Listen for the global "open-audit" event so mmcOpenBrief() can reach the
  // form from any page without every page app wiring its own handler.
  const [selfOpen, setSelfOpen] = React.useState(false);
  React.useEffect(() => {
    const onOpen = () => setSelfOpen(true);
    window.addEventListener("open-audit", onOpen);
    return () => window.removeEventListener("open-audit", onOpen);
  }, []);
  const isOpen = open || selfOpen;
  const close = React.useCallback(() => {
    setSelfOpen(false);
    if (onClose) onClose();
  }, [onClose]);

  const overlayRef = React.useRef(null);
  const scrimRef = React.useRef(null);
  const sheetRef = React.useRef(null);
  const tlRef = React.useRef(null);
  const mountedRef = React.useRef(false);

  const [form, setForm] = React.useState({
    name: "", email: "", brand: "", url: "", revenue: "", channel: "Meta + Google", challenge: ""
  });
  const [submitted, setSubmitted] = React.useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // Build timeline once
  React.useEffect(() => {
    if (!window.gsap) return;
    const gsap = window.gsap;
    const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
    tl
      .set(overlayRef.current, { pointerEvents: "auto", visibility: "visible" }, 0)
      .fromTo(scrimRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0)
      .fromTo(sheetRef.current, { yPercent: 8, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.95 }, 0.08)
      .fromTo(sheetRef.current.querySelectorAll(".am-stagger"),
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power2.out" }, 0.3);
    tlRef.current = tl;
    return () => tl.kill();
  }, []);

  // Open / close. GSAP only animates the transition; if it never loaded, the
  // overlay is still shown and hidden directly, so the form stays reachable.
  React.useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    const gsap = window.gsap;
    if (isOpen) {
      setSubmitted(false);
      if (tlRef.current) tlRef.current.timeScale(1).play(0);
      else { el.style.visibility = "visible"; el.style.pointerEvents = "auto"; }
      document.body.style.overflow = "hidden";
      mountedRef.current = true;
    } else if (mountedRef.current) {
      if (tlRef.current && gsap) {
        tlRef.current.timeScale(1.4).reverse();
        gsap.delayedCall(0.7, () => {
          if (!isOpen) gsap.set(el, { pointerEvents: "none", visibility: "hidden" });
        });
      } else { el.style.visibility = "hidden"; el.style.pointerEvents = "none"; }
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Escape
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape" && isOpen) close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (window.MMCForms) {
      window.MMCForms.submitLead(
        { ...form, source: "Brand audit modal" },
        { subject: "Free brand audit, " + (form.brand || form.name || "New brand") }
      );
    }
    setSubmitted(true);
  };

  const revenueBands = [
    "Pre-launch / 0–10L",
    "₹10L – ₹1Cr",
    "₹1Cr – ₹10Cr",
    "₹10Cr – ₹50Cr",
    "₹50Cr+",
  ];
  const channels = [
    "Meta + Google", "Amazon + Quick-com", "TikTok / Reels-led", "Email + SMS / Owned", "Mixed · Everything"
  ];

  return (
    <div className="audit" ref={overlayRef} aria-hidden={!isOpen} role="dialog" aria-modal="true" aria-label="Free brand audit">
      <div className="audit__scrim" ref={scrimRef} onClick={close}></div>

      <div className="audit__sheet" ref={sheetRef}>
        <button className="audit__close" onClick={close} aria-label="Close">
          <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
            <path d="M5 5 L15 15 M15 5 L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <div className="audit__cols">
          {/* Left, pitch */}
          <aside className="audit__left">
            <div className="audit__left-bg" aria-hidden="true">
              <span className="audit__left-amber"></span>
              <span className="audit__left-ring r1"></span>
              <span className="audit__left-ring r2"></span>
              <span className="audit__left-ring r3"></span>
              <span className="audit__left-sun"></span>
            </div>
            <div className="audit__left-inner">
              <div className="audit__left-eyebrow am-stagger">
                <span className="dot"></span>
                Limited · 8 audits per month
              </div>
              <h2 className="audit__left-h am-stagger">
                A 30-minute look at where your <span className="em-serif" style={{color:"var(--mmc-yellow)"}}>momentum</span> is leaking.
              </h2>
              <p className="audit__left-sub am-stagger">
                Performance, retention, creative, and architecture, diagnosed by a senior strategist.
                No deck. No pitch. A direct read on what to fix first.
              </p>

              <ul className="audit__left-list">
                <li className="am-stagger">
                  <span className="num">01</span>
                  <span className="t">
                    <b>Funnel diagnostic</b>
                    A line-by-line read of your Meta, Google, Amazon, and email ROAS, by cohort.
                  </span>
                </li>
                <li className="am-stagger">
                  <span className="num">02</span>
                  <span className="t">
                    <b>Retention forensic</b>
                    Where customers are dropping, why, and the three highest-ROI levers to pull.
                  </span>
                </li>
                <li className="am-stagger">
                  <span className="num">03</span>
                  <span className="t">
                    <b>Creative + brand read</b>
                    What your top-performing creative says about your brand memory.
                  </span>
                </li>
              </ul>

              <div className="audit__left-foot am-stagger">
                <span className="audit__left-foot-num">14<i>/14</i></span>
                <span className="audit__left-foot-lbl">brands renewed last year</span>
              </div>
            </div>
          </aside>

          {/* Right, form */}
          <section className="audit__right">
            {!submitted ? (
              <form className="audit__form" onSubmit={onSubmit}>
                <div className="audit__form-head am-stagger">
                  <div className="audit__form-eyebrow eyebrow">Begin the system</div>
                  <h3 className="audit__form-h">Tell us about the brand.</h3>
                  <p className="audit__form-sub">
                    We'll come back inside one working day with a slot and a short pre-read.
                  </p>
                </div>

                <div className="audit__field-row am-stagger">
                  <Field label="Your name" required>
                    <input type="text" value={form.name} onChange={update("name")} required placeholder="Aanya Sharma" />
                  </Field>
                  <Field label="Work email" required>
                    <input type="email" value={form.email} onChange={update("email")} required placeholder="aanya@brand.com" />
                  </Field>
                </div>

                <div className="audit__field-row am-stagger">
                  <Field label="Brand name" required>
                    <input type="text" value={form.brand} onChange={update("brand")} required placeholder="Your brand name" />
                  </Field>
                  <Field label="Website">
                    <input type="text" value={form.url} onChange={update("url")} placeholder="yourbrand.com" />
                  </Field>
                </div>

                <Field label="Annual revenue · last 12 months" required className="am-stagger">
                  <div className="audit__chips">
                    {revenueBands.map((b) => (
                      <button type="button" key={b}
                        className={"audit__chip " + (form.revenue === b ? "is-on" : "")}
                        onClick={() => setForm((f) => ({...f, revenue: b}))}>
                        {b}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Where you spend most" className="am-stagger">
                  <div className="audit__chips">
                    {channels.map((c) => (
                      <button type="button" key={c}
                        className={"audit__chip " + (form.channel === c ? "is-on" : "")}
                        onClick={() => setForm((f) => ({...f, channel: c}))}>
                        {c}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="What's the one thing you'd fix tomorrow if you could?" className="am-stagger">
                  <textarea rows="3" value={form.challenge} onChange={update("challenge")}
                    placeholder="Retention is flat past D30 and our Meta ROAS keeps slipping…"></textarea>
                </Field>

                <div className="audit__form-foot am-stagger">
                  <button type="submit" className="btn btn--primary glow-btn audit__submit">
                    <span className="glow-btn__glow" aria-hidden="true"></span>
                    <span className="glow-btn__inner">
                      Request the audit
                      <span className="arrow"></span>
                    </span>
                  </button>
                  <span className="audit__form-fineprint">
                    No pitch decks · No spam · Reply within 1 working day.
                  </span>
                </div>
              </form>
            ) : (
              <div className="audit__thanks">
                <div className="audit__thanks-ring" aria-hidden="true">
                  <svg viewBox="0 0 80 80" width="80" height="80">
                    <circle cx="40" cy="40" r="36" fill="none" stroke="var(--mmc-yellow)" strokeWidth="2"
                            strokeDasharray="226" strokeDashoffset="0">
                      <animate attributeName="stroke-dashoffset" from="226" to="0" dur="0.9s" fill="freeze" />
                    </circle>
                    <path d="M 26 41 L 36 51 L 56 31" fill="none" stroke="var(--mmc-blue)"
                          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                          strokeDasharray="60" strokeDashoffset="60">
                      <animate attributeName="stroke-dashoffset" from="60" to="0" dur="0.5s" begin="0.4s" fill="freeze" />
                    </path>
                  </svg>
                </div>
                <h3 className="audit__thanks-h">
                  Thanks, {form.name ? form.name.split(" ")[0] : "friend"}.
                </h3>
                <p className="audit__thanks-sub">
                  We'll read what you sent for <span className="em-serif" style={{color:"var(--mmc-blue)"}}>{form.brand || "your brand"}</span> and come back inside one working day with a slot and a short pre-read.
                </p>
                <button className="btn btn--ghost" onClick={close}>
                  Back to the site
                  <span className="arrow"></span>
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      <style>{`
        .audit {
          position: fixed;
          inset: 0;
          z-index: 100;
          visibility: hidden;
          pointer-events: none;
          isolation: isolate;
          /* Centre with flex, not transform. GSAP animates the sheet's yPercent
             and would overwrite a translate(-50%,-50%), dropping the vertical
             centering and dragging the sheet below the fold. */
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        .audit__scrim {
          position: absolute;
          inset: 0;
          background: rgba(17, 24, 39, 0.42);
          backdrop-filter: blur(10px) saturate(120%);
          -webkit-backdrop-filter: blur(10px) saturate(120%);
        }
        .audit__sheet {
          position: relative;
          width: min(1080px, 100%);
          height: min(720px, 100%);
          max-height: 100%;
          background: var(--mmc-paper);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 36px 96px -20px rgba(17,24,39,0.4);
          border: 1px solid rgba(255,255,255,0.6);
          display: flex;
          flex-direction: column;
        }
        .audit__close {
          position: absolute;
          top: 16px; right: 16px;
          z-index: 5;
          width: 36px; height: 36px;
          border-radius: 999px;
          background: rgba(255,255,255,0.9);
          color: var(--mmc-blue);
          border: 1px solid var(--mmc-border);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(8px);
          transition: transform var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out);
        }
        .audit__close:hover {
          transform: rotate(90deg);
          background: var(--mmc-yellow);
        }

        .audit__cols {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          flex: 1;
          min-height: 0;
          overflow: hidden;
        }

        /* ---- Left pitch column ---- */
        .audit__left {
          position: relative;
          background: var(--mmc-blue);
          color: #fff;
          overflow: hidden;
          isolation: isolate;
        }
        .audit__left-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .audit__left-amber {
          position: absolute;
          left: 50%; bottom: -10%;
          transform: translateX(-50%);
          width: 140%; height: 70%;
          background: radial-gradient(ellipse 60% 80% at 50% 100%,
            rgba(var(--mmc-yellow-rgb), 0.5) 0%,
            rgba(var(--mmc-yellow-rgb), 0.12) 40%,
            rgba(var(--mmc-yellow-rgb), 0) 70%);
        }
        .audit__left-ring {
          position: absolute;
          left: 50%; bottom: -10%;
          transform: translateX(-50%);
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.18);
        }
        .audit__left-ring.r1 { width: 800px; height: 800px; opacity: 0.16; }
        .audit__left-ring.r2 { width: 560px; height: 560px; opacity: 0.22; }
        .audit__left-ring.r3 { width: 360px; height: 360px; opacity: 0.30; }
        .audit__left-sun {
          position: absolute;
          left: 50%; bottom: -6px;
          transform: translateX(-50%);
          width: 180px; height: 90px;
          background: var(--mmc-yellow);
          border-radius: 180px 180px 0 0;
          box-shadow: 0 -28px 80px rgba(var(--mmc-yellow-rgb), 0.6);
        }
        .audit__left-inner {
          position: relative;
          z-index: 2;
          padding: 36px 32px 28px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          height: 100%;
        }
        .audit__left-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.8);
        }
        .audit__left-eyebrow .dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--mmc-yellow);
          box-shadow: 0 0 0 4px rgba(var(--mmc-yellow-rgb), 0.18);
        }
        .audit__left-h {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(26px, 2.6vw, 38px);
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: #fff;
          margin: 0;
        }
        .audit__left-sub {
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.55;
          color: rgba(255,255,255,0.72);
          margin: 0;
          max-width: 420px;
        }
        .audit__left-list {
          list-style: none;
          margin: 8px 0 auto;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .audit__left-list li {
          display: grid;
          grid-template-columns: 34px 1fr;
          gap: 12px;
          align-items: start;
        }
        .audit__left-list .num {
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.18em;
          color: var(--mmc-yellow);
          padding-top: 2px;
        }
        .audit__left-list .t {
          font-family: var(--font-body);
          font-size: 13.5px;
          line-height: 1.5;
          color: rgba(255,255,255,0.78);
        }
        .audit__left-list .t b {
          display: block;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 15px;
          color: #fff;
          margin-bottom: 2px;
        }
        .audit__left-foot {
          position: relative;
          display: flex;
          align-items: baseline;
          gap: 10px;
          padding-top: 18px;
          border-top: 1px solid rgba(255,255,255,0.12);
        }
        /* The rising sun sits directly behind this row, which left the label
           reading white-on-yellow. Fade the column colour back in underneath it. */
        .audit__left-foot::before {
          content: "";
          position: absolute;
          left: -32px; right: -32px; top: 0; bottom: -28px;
          z-index: -1;
          pointer-events: none;
          background: linear-gradient(to top,
            var(--mmc-blue) 60%, rgba(29, 78, 216, 0) 100%);
        }
        .audit__left-foot-num {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 32px;
          color: var(--mmc-yellow);
          letter-spacing: -0.02em;
        }
        .audit__left-foot-num i {
          font-style: normal;
          color: rgba(255,255,255,0.5);
          font-size: 0.65em;
          margin-left: 1px;
        }
        .audit__left-foot-lbl {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.62);
        }

        /* ---- Right form column ---- */
        .audit__right {
          position: relative;
          overflow-y: auto;
          min-height: 0;
          max-height: 100%;
          -webkit-overflow-scrolling: touch;
        }
        .audit__left {
          overflow-y: auto;
          min-height: 0;
          max-height: 100%;
          -webkit-overflow-scrolling: touch;
        }
        .audit__form {
          padding: 36px 36px 28px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .audit__form-head { display: flex; flex-direction: column; gap: 8px; margin-bottom: 4px; }
        .audit__form-eyebrow { margin-bottom: 4px; }
        .audit__form-h {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 26px;
          letter-spacing: -0.02em;
          color: var(--mmc-text);
          margin: 0;
        }
        .audit__form-sub {
          font-family: var(--font-body);
          font-size: 13.5px;
          color: var(--fg-3);
          line-height: 1.5;
          margin: 0;
        }

        .audit__field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .audit__field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .audit__field-label {
          font-family: var(--font-body);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--fg-3);
        }
        .audit__field-label .req { color: var(--mmc-yellow); margin-left: 4px; }
        .audit__field input,
        .audit__field textarea {
          font-family: var(--font-body);
          font-size: 14.5px;
          color: var(--mmc-text);
          background: var(--mmc-white);
          border: 1px solid var(--mmc-border);
          border-radius: 8px;
          padding: 11px 14px;
          width: 100%;
          transition: border-color var(--dur-base) var(--ease-out),
                      box-shadow var(--dur-base) var(--ease-out);
          font-weight: 500;
        }
        .audit__field input::placeholder,
        .audit__field textarea::placeholder {
          color: rgba(75, 85, 99, 0.45);
          font-weight: 400;
        }
        .audit__field input:focus,
        .audit__field textarea:focus {
          outline: none;
          border-color: var(--mmc-blue);
          box-shadow: 0 0 0 3px rgba(var(--mmc-blue-rgb), 0.12);
        }
        .audit__field textarea {
          resize: vertical;
          min-height: 76px;
          font-family: var(--font-body);
        }

        .audit__chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .audit__chip {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 600;
          padding: 8px 12px;
          border-radius: 999px;
          background: var(--mmc-white);
          color: var(--mmc-text);
          border: 1px solid var(--mmc-border);
          transition: border-color var(--dur-base) var(--ease-out),
                      background var(--dur-base) var(--ease-out),
                      color var(--dur-base) var(--ease-out);
        }
        .audit__chip:hover {
          border-color: var(--mmc-blue);
          color: var(--mmc-blue);
        }
        .audit__chip.is-on {
          background: var(--mmc-blue);
          color: var(--mmc-yellow);
          border-color: var(--mmc-blue);
        }

        .audit__form-foot {
          display: flex;
          align-items: center;
          gap: 18px;
          padding-top: 4px;
          flex-wrap: wrap;
        }
        .audit__submit {
          font-size: 13px;
          padding: 14px 22px;
        }
        /* Button + emphasis styles the modal needs (self-contained for Home) */
        .audit .btn--primary { background: var(--mmc-blue); color: #fff; }
        .audit .btn--primary:hover { transform: translateY(-2px); box-shadow: 0 20px 44px -16px rgba(29,78,216,0.55);
          position: relative; z-index: 2;
        }
        .audit .btn--ghost { background: transparent; color: var(--mmc-blue); border: 1px solid var(--mmc-border-strong); }
        .audit .btn--ghost:hover { border-color: var(--mmc-blue); background: var(--mmc-blue-50); }
        .audit .em-serif { font-family: var(--font-serif); font-style: italic; font-weight: 600; letter-spacing: -0.005em; }
        .audit__form-fineprint {
          font-family: var(--font-body);
          font-size: 11.5px;
          color: var(--fg-3);
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        /* ---- Thanks state ---- */
        .audit__thanks {
          padding: 56px 36px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 18px;
          height: 100%;
          justify-content: center;
          min-height: 540px;
        }
        .audit__thanks-h {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 32px;
          letter-spacing: -0.025em;
          color: var(--mmc-text);
          margin: 0;
        }
        .audit__thanks-sub {
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.55;
          color: var(--fg-2);
          margin: 0;
          max-width: 460px;
        }
        .audit__thanks .btn { margin-top: 8px; }

        @media (max-width: 880px) {
          .audit { padding: 8px; }
          .audit__cols { grid-template-columns: 1fr; }
          .audit__left { display: none; }
          .audit__form { padding: 28px 22px 22px; }
        }
        @media (max-height: 760px) {
          .audit__left-list { gap: 10px; }
          .audit__left-inner { padding: 28px 28px 24px; gap: 14px; }
          .audit__form { gap: 14px; padding: 28px 28px 22px; }
        }
      `}</style>
    </div>
  );
}

function Field({ label, required, children, className }) {
  return (
    <label className={"audit__field " + (className || "")}>
      <span className="audit__field-label">{label}{required && <span className="req">*</span>}</span>
      {children}
    </label>
  );
}

window.AuditModal = AuditModal;
