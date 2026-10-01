import React from "react";
import gsap from "gsap";
import "../../styles/forms-hygiene.css";

export default function AuditModal({ open = false, onClose }: { open?: boolean; onClose?: () => void }) {
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

  const overlayRef = React.useRef<HTMLDivElement>(null);
  const scrimRef = React.useRef<HTMLDivElement>(null);
  const sheetRef = React.useRef<HTMLDivElement>(null);
  const tlRef = React.useRef<any>(null);
  const mountedRef = React.useRef(false);

  const [form, setForm] = React.useState({
    name: "", email: "", brand: "", url: "", revenue: "", spend: "", timeline: "", consent: false, channel: "Meta + Google", challenge: ""
  });
  const [submitted, setSubmitted] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [formErr, setFormErr] = React.useState("");
  const [sentVia, setSentVia] = React.useState("");

  const update = (k: string) => (e: any) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // Build timeline once
  React.useEffect(() => {
    const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
    tl
      .set(overlayRef.current, { pointerEvents: "auto", visibility: "visible" }, 0)
      .fromTo(scrimRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0)
      .fromTo(sheetRef.current, { yPercent: 8, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.95 }, 0.08)
      .fromTo(sheetRef.current!.querySelectorAll(".am-stagger"),
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
    if (isOpen) {
      setSubmitted(false);
      if (tlRef.current) tlRef.current.timeScale(1).play(0);
      else { el.style.visibility = "visible"; el.style.pointerEvents = "auto"; }
      document.body.style.overflow = "hidden";
      mountedRef.current = true;
    } else if (mountedRef.current) {
      if (tlRef.current) {
        tlRef.current.timeScale(1.4).reverse();
        gsap.delayedCall(0.7, () => {
          if (!isOpen) gsap.set(el, { pointerEvents: "none", visibility: "hidden" });
        });
      } else { el.style.visibility = "hidden"; el.style.pointerEvents = "none"; }
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Escape, Tab trap, focus-in and focus restore on close.
  React.useEffect(() => {
    if (!isOpen) return;
    const prev = document.activeElement as HTMLElement | null;
    const trap = (e: KeyboardEvent, root: HTMLElement | null) => {
      const w = window as any;
      if (w.mmcTrapTab) { w.mmcTrapTab(e, root); return; }
      if (e.key !== "Tab" || !root) return;
      const f = Array.from(root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])'
      )).filter((n) => n.offsetParent !== null || n === document.activeElement);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (!root.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
      else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else trap(e, overlayRef.current);
    };
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => {
      const first = overlayRef.current && overlayRef.current.querySelector<HTMLElement>("input, textarea, button");
      if (first) first.focus({ preventScroll: true });
    }, 600);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      if (prev && prev.focus) { try { prev.focus({ preventScroll: true }); } catch (e) {} }
    };
  }, [isOpen, close]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (sending) return;
    if (!form.revenue || !form.spend || !form.timeline) { setFormErr("Please choose your revenue band, monthly budget and start time so we can route this to the right person."); return; }
    setFormErr("");
    setSending(true);
    const fail = () => { setSending(false); setFormErr("We couldn't send that just now. Please email sales-in@mondaymarketing.company and we'll pick it up."); };
    const forms = (window as any).MMCForms;
    if (!forms) { fail(); return; }
    Promise.resolve(forms.submitLead(
      { ...form, source: "Brief modal" },
      { subject: "Brief, " + (form.brand || form.name || "New brand") }
    )).then((r: any) => { setSending(false); setSentVia(r && r.mode); setSubmitted(true); }).catch(fail);
  };

  const revenueBands = [
    "Pre-launch / 0–10L",
    "₹10L – ₹1Cr",
    "₹1Cr – ₹10Cr",
    "₹10Cr – ₹50Cr",
    "₹50Cr+",
  ];
  const spendBands = ["Under ₹2L", "₹2L – ₹5L", "₹5L – ₹15L", "₹15L+"];
  const timelines = ["This month", "In 1–3 months", "Just exploring"];
  const channels = [
    "Meta + Google", "Amazon + Quick-com", "TikTok / Reels-led", "Email + SMS / Owned", "Mixed · Everything"
  ];

  return (
    <div className="audit" ref={overlayRef} aria-hidden={!isOpen} role="dialog" aria-modal="true" aria-label="Send a brief">
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
                Free 30-minute audit
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
            </div>
          </aside>

          {/* Right, form */}
          <section className="audit__right">
            {!submitted ? (
              <form className="audit__form" onSubmit={onSubmit}>
                <div className="audit__form-head am-stagger">
                  <div className="audit__form-eyebrow eyebrow">Send a brief</div>
                  <h3 className="audit__form-h">Tell us about the brand.</h3>
                  <p className="audit__form-sub">
                    We'll come back inside one working day with a slot and a short pre-read.
                  </p>
                </div>

                <div className="audit__field-row am-stagger">
                  <Field label="Your name" required>
                    <input type="text" value={form.name} onChange={update("name")} required placeholder="Aanya Sharma" autoComplete="name" />
                  </Field>
                  <Field label="Work email" required>
                    <input type="email" value={form.email} onChange={update("email")} required placeholder="you@yourbrand.com" autoComplete="email" />
                  </Field>
                </div>

                <div className="audit__field-row am-stagger">
                  <Field label="Brand name" required>
                    <input type="text" value={form.brand} onChange={update("brand")} required placeholder="Your brand name" autoComplete="organization" />
                  </Field>
                  <Field label="Website">
                    <input type="text" value={form.url} onChange={update("url")} placeholder="yourbrand.com" autoComplete="url" />
                  </Field>
                </div>

                <Field label="Annual revenue · last 12 months" required className="am-stagger">
                  <div className="audit__chips">
                    {revenueBands.map((b) => (
                      <button type="button" key={b}
                        className={"audit__chip " + (form.revenue === b ? "is-on" : "")}
                        aria-pressed={form.revenue === b}
                        onClick={() => { setFormErr(""); setForm((f) => ({...f, revenue: b})); }}>
                        {b}
                      </button>
                    ))}
                  </div>
                </Field>

                {form.revenue === revenueBands[0] && (
                  <p className="audit__note am-stagger" role="status">Pre-launch brands: we work with operating businesses at ₹50L+ a year. The <a href="/tools/">free calculators</a> and <a href="/guides/">guides</a> are built for where you are. You can still send this.</p>
                )}

                <Field label="Monthly marketing budget, ads included" required className="am-stagger">
                  <div className="audit__chips">
                    {spendBands.map((b) => (
                      <button type="button" key={b}
                        className={"audit__chip " + (form.spend === b ? "is-on" : "")}
                        aria-pressed={form.spend === b}
                        onClick={() => { setFormErr(""); setForm((f) => ({...f, spend: b})); }}>
                        {b}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="When do you want to start?" required className="am-stagger">
                  <div className="audit__chips">
                    {timelines.map((b) => (
                      <button type="button" key={b}
                        className={"audit__chip " + (form.timeline === b ? "is-on" : "")}
                        aria-pressed={form.timeline === b}
                        onClick={() => { setFormErr(""); setForm((f) => ({...f, timeline: b})); }}>
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
                        aria-pressed={form.channel === c}
                        onClick={() => setForm((f) => ({...f, channel: c}))}>
                        {c}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="What's the one thing you'd fix tomorrow if you could?" className="am-stagger">
                  <textarea rows={3} value={form.challenge} onChange={update("challenge")}
                    placeholder="Retention is flat past D30 and our Meta ROAS keeps slipping…"></textarea>
                </Field>

                <label className="audit__consent am-stagger">
                  <input type="checkbox" checked={form.consent} required
                         onChange={(e) => setForm((f) => ({...f, consent: e.target.checked}))} />
                  <span>I agree to MMC using these details to reply to this enquiry, as described in the <a href="/privacy/" target="_blank" rel="noreferrer">privacy policy</a>.</span>
                </label>

                <div className="audit__form-foot am-stagger">
                  {formErr && <p className="audit__err" role="alert">{formErr}</p>}
                  <button type="submit" className="btn btn--primary glow-btn audit__submit" disabled={sending} aria-busy={sending}>
                    <span className="glow-btn__glow" aria-hidden="true"></span>
                    <span className="glow-btn__inner">
                      {sending ? "Sending…" : "Send the brief"}
                      <span className="arrow"></span>
                    </span>
                  </button>
                  <span className="audit__form-fineprint">
                    No pitch decks · No spam · Reply within 1 working day.
                  </span>
                </div>
              </form>
            ) : (
              <div className="audit__thanks" tabIndex={-1} ref={(n) => { if (n) n.focus(); }}>
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
                {sentVia === "mailto" && (
                  <p className="audit__thanks-sub" role="status">Your email app should have opened with the details filled in. If it didn't, send them to <a href="mailto:sales-in@mondaymarketing.company">sales-in@mondaymarketing.company</a>.</p>
                )}
                <button className="btn btn--ghost" onClick={close}>
                  Back to the site
                  <span className="arrow"></span>
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function Field({ label, required, children, className }: { label: string; required?: boolean; children: any; className?: string }) {
  return (
    <label className={"audit__field " + (className || "")}>
      <span className="audit__field-label">{label}{required && <span className="req">*</span>}</span>
      {children}
    </label>
  );
}

