import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  OWNER_EMAIL, CALL_WINDOWS, TIME_ZONES, COUNTRY_CODES, TEAM_SIZES, REVENUE_BANDS, CLIENT_BANDS, RETAINER_BANDS, BUDGET_BANDS,
  SERVICES, CLIENT_TYPES, IN_HOUSE, START_WHEN, HEARD, EMPTY_STEP1, EMPTY_STEP2, LIMITS,
  makeReference, validateStep1, validateStep2, contactSignature, buildEmail1, buildEmail2, renderBody, utmFromSearch, REF_RE,
} from "../../lib/register-payload.mjs";
import { sendRegistration, isLiveHost } from "../../lib/register-submit.js";

const KEY = "mmc_wlr_v1";
const STEPS = ["Contact", "Your agency"];
const Arrow = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
const Back = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>;

function Err({ id, children }) {
  return children ? <p className="wlr-err" id={id}><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" /><path d="M12 7v6M12 16.5v.5" /></svg><span>{children}</span></p> : null;
}

function Text({ id, label, hint, error, optional, type = "text", value, onChange, textarea, rows = 4, maxLength, ...rest }) {
  const d = [hint && id + "-h", error && id + "-e"].filter(Boolean).join(" ") || undefined;
  const P = { id, value, onChange: (e) => onChange(e.target.value), "aria-invalid": error ? "true" : undefined, "aria-describedby": d, "data-err": id, maxLength, ...rest };
  return (
    <div className={"wlr-f" + (error ? " has-err" : "")}>
      <label htmlFor={id}>{label}{optional && <span className="wlr-opt"> (optional)</span>}</label>
      {textarea ? <textarea rows={rows} {...P} /> : <input type={type} {...P} />}
      {hint && <p className="wlr-hint" id={id + "-h"}>{hint}</p>}
      <Err id={id + "-e"}>{error}</Err>
    </div>
  );
}

function Select({ id, label, error, value, onChange, options, placeholder = "Choose one", ...rest }) {
  return (
    <div className={"wlr-f" + (error ? " has-err" : "")}>
      <label htmlFor={id}>{label}</label>
      <div className="wlr-sel">
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={error ? "true" : undefined} aria-describedby={error ? id + "-e" : undefined} data-err={id} {...rest}>
          <option value="">{placeholder}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
      <Err id={id + "-e"}>{error}</Err>
    </div>
  );
}

function Chips({ id, legend, hint, options, value, onChange, multi, error, extra }) {
  const sel = multi ? value : [value];
  const toggle = (o) => (multi ? onChange(value.includes(o) ? value.filter((x) => x !== o) : [...value, o]) : onChange(o));
  const d = [hint && id + "-h", error && id + "-e"].filter(Boolean).join(" ") || undefined;
  return (
    <fieldset className={"wlr-grp" + (error ? " has-err" : "")} aria-describedby={d}>
      <legend>{legend}</legend>
      {hint && <p className="wlr-hint" id={id + "-h"}>{hint}</p>}
      <div className="wlr-chips">
        {options.map((o, i) => (
          <label className="wlr-chip" key={o}>
            <input type={multi ? "checkbox" : "radio"} name={id} checked={sel.includes(o)} onChange={() => toggle(o)} data-err={i === 0 ? id : undefined} aria-invalid={error ? "true" : undefined} />
            <span>{o}</span>
          </label>
        ))}
      </div>
      {extra}
      <Err id={id + "-e"}>{error}</Err>
    </fieldset>
  );
}

function Check({ id, children, checked, onChange, error }) {
  return (
    <div className={"wlr-consent" + (error ? " has-err" : "")}>
      <label className="wlr-check">
        <input type="checkbox" id={id} checked={checked} onChange={(e) => onChange(e.target.checked)} aria-invalid={error ? "true" : undefined} aria-describedby={error ? id + "-e" : undefined} data-err={id} />
        <span>{children}</span>
      </label>
      <Err id={id + "-e"}>{error}</Err>
    </div>
  );
}

const nowIso = () => new Date().toISOString();
const track = (event, extra) => { try { (window.dataLayer = window.dataLayer || []).push({ event, ...extra }); } catch {} };

export default function RegisterApp() {
  const [live, setLive] = useState(null);
  const [step, setStep] = useState(1);
  const [v1, setV1] = useState(EMPTY_STEP1);
  const [v2, setV2] = useState(EMPTY_STEP2);
  const [e1, setE1] = useState({});
  const [e2, setE2] = useState({});
  const [busy, setBusy] = useState(false);
  const [sendFail, setSendFail] = useState(false);
  const [done, setDone] = useState(null);
  const [status, setStatus] = useState("");
  const [hp, setHp] = useState("");
  const [previews, setPreviews] = useState([]);
  const ready = useRef(false);
  const busyRef = useRef(false);
  const ref = useRef("");
  const startedAt = useRef("");
  const s1 = useRef({ sig: "", status: "none", at: "" });
  const root = useRef(null);
  const headRef = useRef(null);
  const changedStep = useRef(false);

  // Restore progress (a refresh keeps the form), then start persisting.
  useEffect(() => {
    setLive(isLiveHost());
    let saved = null;
    try { saved = JSON.parse(sessionStorage.getItem(KEY) || "null"); } catch {}
    if (saved && REF_RE.test(saved.ref || "")) {
      ref.current = saved.ref; startedAt.current = saved.startedAt || nowIso();
      s1.current = saved.s1 || s1.current;
      setV1({ ...EMPTY_STEP1, ...saved.v1 }); setV2({ ...EMPTY_STEP2, ...saved.v2 });
      setPreviews(Array.isArray(saved.previews) ? saved.previews : []);
      if (saved.step === 2 && saved.s1 && saved.s1.sig) setStep(2);
    } else {
      ref.current = makeReference(); startedAt.current = nowIso();
    }
    ready.current = true;
  }, []);

  useEffect(() => {
    if (!ready.current || done) return;
    try { sessionStorage.setItem(KEY, JSON.stringify({ ref: ref.current, startedAt: startedAt.current, step, v1, v2, s1: s1.current, previews })); } catch {}
  }, [v1, v2, step, previews, done]);

  // Focus management on step change and on the confirmation.
  useEffect(() => {
    if (!changedStep.current) return;
    changedStep.current = false;
    if (headRef.current) { headRef.current.focus(); const top = root.current && root.current.getBoundingClientRect().top; if (top < 0 || top > 120) root.current.scrollIntoView({ block: "start" }); }
  }, [step, done]);

  const meta = () => ({
    ref: ref.current, now: nowIso(), startedAt: startedAt.current,
    pageUrl: location.href.split("#")[0], referrer: document.referrer || "",
    utm: utmFromSearch(location.search),
    browserTz: (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch { return ""; } })(),
    step1: { status: s1.current.status, at: s1.current.at },
  });

  const set1 = (k) => (val) => { setV1((p) => ({ ...p, [k]: val })); if (e1[k]) setE1((p) => ({ ...p, [k]: undefined })); };
  const set2 = (k) => (val) => { setV2((p) => ({ ...p, [k]: val })); if (e2[k]) setE2((p) => ({ ...p, [k]: undefined })); };

  function failWith(errs, setter) {
    setter(errs);
    const keys = Object.keys(errs);
    setStatus(`${keys.length} ${keys.length === 1 ? "field needs" : "fields need"} your attention. ${errs[keys[0]]}`);
    requestAnimationFrame(() => {
      const el = root.current && root.current.querySelector(`[data-err="${keys.find((k) => root.current.querySelector(`[data-err="${k}"]`)) || keys[0]}"]`);
      if (el) el.focus();
    });
  }

  async function onNext(ev) {
    ev.preventDefault();
    if (busyRef.current) return;
    const errs = validateStep1(v1);
    if (Object.keys(errs).length) return failWith(errs, setE1);
    setE1({}); setStatus("");
    const sig = contactSignature(v1);
    if (s1.current.sig === sig) { changedStep.current = true; setStep(2); return; } // unchanged: no new email
    busyRef.current = true; setBusy(true); setStatus("Saving your contact details");
    const kind = s1.current.status === "sent" ? "updated" : "started";
    const payload = buildEmail1(v1, meta(), kind);
    const r = await sendRegistration(payload, kind === "updated" ? "email 1 (contact updated)" : "email 1 (registration started)");
    s1.current = { sig, status: r.ok ? "sent" : "queued", at: payload._sections[0].rows[1][1] };
    const pv = renderBody(payload);
    setPreviews((p) => [...p, { label: kind === "updated" ? "Email 1 (contact updated)" : "Email 1 (registration started)", ...pv }]);
    track("wl_register_step1", { wl_ref: ref.current, wl_sent: r.ok });
    busyRef.current = false; setBusy(false); setStatus("");
    changedStep.current = true; setStep(2);
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    if (busyRef.current) return;
    const errs = validateStep2(v2);
    if (Object.keys(errs).length) return failWith(errs, setE2);
    setE2({}); setStatus(""); setSendFail(false);
    busyRef.current = true; setBusy(true); setStatus("Sending your registration");
    const payload = buildEmail2(v1, v2, meta());
    payload._hp = hp;
    const r = await sendRegistration(payload, "email 2 (registration complete)");
    busyRef.current = false; setBusy(false);
    if (!r.ok) {
      setSendFail(true); setStatus("We could not send your registration. Your answers are saved on this page. Please try again.");
      return;
    }
    const pv = renderBody(payload);
    setPreviews((p) => [...p, { label: "Email 2 (registration complete)", ...pv }]);
    track("wl_register_complete", { wl_ref: ref.current });
    try { sessionStorage.removeItem(KEY); } catch {}
    changedStep.current = true; setStatus(""); setDone({ ref: ref.current, agency: v2.agencyName.trim() });
  }

  const soldN = v2.servicesSold.length;
  const wlN = v2.servicesWl.length;
  const left = LIMITS.notes - v2.notes.length;
  const codeOpts = useMemo(() => COUNTRY_CODES, []);

  const PreviewBlock = live === false ? (
    <div className="wlr-preview">
      <p className="wlr-preview__note"><b>Preview mode.</b> Emails are only sent on the live site. Nothing leaves this page here, and no mail app opens.</p>
      <details>
        <summary>What would be sent</summary>
        {previews.length === 0 && <p className="wlr-hint">Press Next to see email 1, then Submit to see email 2.</p>}
        {previews.map((p, i) => (
          <div className="wlr-preview__mail" key={i}>
            <h4>{p.label}</h4>
            <p><b>To:</b> {OWNER_EMAIL}<br /><b>Subject:</b> {p.subject}</p>
            <pre>{p.body}</pre>
          </div>
        ))}
      </details>
    </div>
  ) : null;

  const Status = <div className="wlr-status" role="status" aria-live="polite">{status}</div>;

  if (done) {
    return (
      <div className="wlr-card wlr-done" ref={root} id="register-card">
        <svg className="wlr-done__ring" width="64" height="64" viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="36" fill="none" stroke="#FFC528" strokeWidth="3" /><path d="M26 41L36 51L56 31" fill="none" stroke="#16329E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <h2 id="wlr-done-h" tabIndex={-1} ref={headRef}>Registration received{done.agency ? <>, <span>{done.agency}</span></> : null}.</h2>
        <p className="wlr-done__ref">Your reference: <b>{done.ref}</b></p>
        <h3>What happens next</h3>
        <ol className="wlr-done__list">
          <li>MMC reviews your agency profile and the services you want to white label.</li>
          <li>We reach out on the call window and time zone you chose, to scope what you sell and agree how we work behind you.</li>
          <li>If we go ahead, the usual path is an NDA, a scope, reporting in your format and a first client together.</li>
        </ol>
        <p className="wlr-hint">Need to add something? Email <a href={`mailto:${OWNER_EMAIL}`}>{OWNER_EMAIL}</a> and quote your reference.</p>
        <p><a className="wlr-link" href="/white-label/">Read about white-label services for agencies<Arrow /></a></p>
        {PreviewBlock}
      </div>
    );
  }

  return (
    <div className="wlr-card" ref={root} id="register-card">
      <div className="wlr-prog" aria-label="Registration progress">
        <p className="wlr-prog__t">Step {step} of 2: <b>{STEPS[step - 1]}</b></p>
        <ol className="wlr-prog__steps">
          {STEPS.map((s, i) => (
            <li key={s} className={i + 1 === step ? "is-cur" : i + 1 < step ? "is-done" : ""} aria-current={i + 1 === step ? "step" : undefined}>
              <span className="wlr-prog__n" aria-hidden="true">{i + 1 < step ? <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10" /></svg> : i + 1}</span>
              <span className="wlr-prog__l">{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="wlr-hp" aria-hidden="true"><label>Leave this field empty<input type="text" name="_hp" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} /></label></div>

      {step === 1 && (
        <form noValidate onSubmit={onNext} aria-labelledby="wlr-step-h" className="wlr-form">
          <h2 id="wlr-step-h" tabIndex={-1} ref={headRef}>How do we reach you?</h2>
          <p className="wlr-sub">Pressing Next saves your contact details with MMC, so we know who to speak to even if you do not finish.</p>
          <div className="wlr-row">
            <Text id="name" label="Full name" value={v1.name} onChange={set1("name")} error={e1.name} autoComplete="name" maxLength={LIMITS.short} />
            <Text id="role" label="Role or designation" value={v1.role} onChange={set1("role")} error={e1.role} autoComplete="organization-title" maxLength={LIMITS.short} placeholder="Founder, director, head of growth" />
          </div>
          <Text id="email" label="Work email" type="email" value={v1.email} onChange={set1("email")} error={e1.email} autoComplete="email" inputMode="email" maxLength={LIMITS.short} />
          <div className={"wlr-f" + (e1.phone || e1.phoneCodeOther ? " has-err" : "")}>
            <label htmlFor="phone">Phone with country code</label>
            <div className="wlr-phone">
              <div className="wlr-sel wlr-sel--code">
                <select id="phoneCode" aria-label="Country code" value={v1.phoneCode} onChange={(e) => set1("phoneCode")(e.target.value)} data-err="phoneCode">
                  {codeOpts.map(([c, n]) => <option key={c} value={c}>{c === "other" ? n : `${n} (+${c})`}</option>)}
                </select>
              </div>
              {v1.phoneCode === "other" && (
                <input id="phoneCodeOther" className="wlr-code" aria-label="Country code digits" inputMode="numeric" placeholder="+" value={v1.phoneCodeOther} onChange={(e) => set1("phoneCodeOther")(e.target.value)} maxLength={5} aria-invalid={e1.phoneCodeOther ? "true" : undefined} aria-describedby={e1.phoneCodeOther ? "phone-e" : undefined} data-err="phoneCodeOther" />
              )}
              <input id="phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="Phone number" value={v1.phone} onChange={(e) => set1("phone")(e.target.value)} maxLength={20} aria-invalid={e1.phone ? "true" : undefined} aria-describedby={e1.phone || e1.phoneCodeOther ? "phone-e" : undefined} data-err="phone" />
            </div>
            <Err id="phone-e">{e1.phoneCodeOther || e1.phone}</Err>
          </div>
          <Check id="whatsappSame" checked={v1.whatsappSame} onChange={set1("whatsappSame")}>My WhatsApp number is the same as my phone number</Check>
          {!v1.whatsappSame && <Text id="whatsapp" label="WhatsApp number" type="tel" inputMode="tel" value={v1.whatsapp} onChange={set1("whatsapp")} error={e1.whatsapp} hint="Same country code as above." maxLength={20} autoComplete="off" />}
          <div className="wlr-row">
            <Select id="callWindow" label="Preferred call window" value={v1.callWindow} onChange={set1("callWindow")} options={CALL_WINDOWS} error={e1.callWindow} />
            <Select id="timeZone" label="Your time zone" value={v1.timeZone} onChange={set1("timeZone")} options={TIME_ZONES} error={e1.timeZone} />
          </div>
          <Check id="consent" checked={v1.consent} onChange={set1("consent")} error={e1.consent}>I agree that MMC may contact me by phone, WhatsApp and email about onboarding as a white-label partner.</Check>
          {Status}
          <div className="wlr-actions">
            <button type="submit" className="wlr-btn" disabled={busy} aria-disabled={busy}>{busy ? "Saving..." : <>Next: your agency<Arrow /></>}</button>
          </div>
          {PreviewBlock}
        </form>
      )}

      {step === 2 && (
        <form noValidate onSubmit={onSubmit} aria-labelledby="wlr-step-h" className="wlr-form">
          <h2 id="wlr-step-h" tabIndex={-1} ref={headRef}>Tell us about your agency</h2>
          <p className="wlr-sub">Rough answers are fine. Pick Prefer not to say wherever you would rather discuss it on the call.</p>

          <h3 className="wlr-sec">Your agency</h3>
          <div className="wlr-row">
            <Text id="agencyName" label="Agency name" value={v2.agencyName} onChange={set2("agencyName")} error={e2.agencyName} autoComplete="organization" maxLength={LIMITS.short} />
            <Text id="website" label="Website" value={v2.website} onChange={set2("website")} error={e2.website} autoComplete="url" inputMode="url" placeholder="youragency.com" maxLength={LIMITS.long} />
          </div>
          <div className="wlr-row wlr-row--3">
            <Text id="country" label="Country" value={v2.country} onChange={set2("country")} error={e2.country} autoComplete="country-name" maxLength={LIMITS.short} />
            <Text id="city" label="City" value={v2.city} onChange={set2("city")} error={e2.city} autoComplete="address-level2" maxLength={LIMITS.short} />
            <Text id="yearFounded" label="Year founded" value={v2.yearFounded} onChange={(x) => set2("yearFounded")(x.replace(/\D/g, "").slice(0, 4))} error={e2.yearFounded} inputMode="numeric" placeholder="2018" maxLength={4} autoComplete="off" />
          </div>
          <div className="wlr-row">
            <Select id="teamSize" label="Team size" value={v2.teamSize} onChange={set2("teamSize")} options={TEAM_SIZES} error={e2.teamSize} />
            <Select id="clients" label="Active clients today" value={v2.clients} onChange={set2("clients")} options={CLIENT_BANDS} error={e2.clients} />
          </div>
          <div className="wlr-row">
            <Select id="revenue" label="Annual agency revenue" value={v2.revenue} onChange={set2("revenue")} options={REVENUE_BANDS} error={e2.revenue} />
            <Select id="retainer" label="Average monthly retainer per client" value={v2.retainer} onChange={set2("retainer")} options={RETAINER_BANDS} error={e2.retainer} />
          </div>

          <h3 className="wlr-sec">Services</h3>
          <Chips id="servicesSold" legend="Services you sell today" multi options={SERVICES} value={v2.servicesSold} onChange={set2("servicesSold")} error={e2.servicesSold}
            extra={<>
              <p className="wlr-count" aria-live="polite">{soldN === 0 ? "Choose everything you sell." : `You sell ${soldN} ${soldN === 1 ? "service" : "services"}.`}</p>
              {v2.servicesSold.includes("Other") && <Text id="servicesSoldOther" label="Other services you sell" value={v2.servicesSoldOther} onChange={set2("servicesSoldOther")} error={e2.servicesSoldOther} maxLength={LIMITS.long} />}
            </>} />
          <Chips id="servicesWl" legend="Services you want to white label with MMC" hint="These match the white-label service pages on this site." multi options={SERVICES} value={v2.servicesWl} onChange={set2("servicesWl")} error={e2.servicesWl}
            extra={<>
              <p className="wlr-count" aria-live="polite">{wlN === 0 ? "Choose what you want delivered behind your brand." : `${wlN} ${wlN === 1 ? "service" : "services"} to white label.`}</p>
              {v2.servicesWl.includes("Other") && <Text id="servicesWlOther" label="Other services to white label" value={v2.servicesWlOther} onChange={set2("servicesWlOther")} error={e2.servicesWlOther} maxLength={LIMITS.long} />}
            </>} />
          <Chips id="clientTypes" legend="Client types you serve" multi options={CLIENT_TYPES} value={v2.clientTypes} onChange={set2("clientTypes")} error={e2.clientTypes}
            extra={v2.clientTypes.includes("Other") && <Text id="clientTypesOther" label="Other client type" value={v2.clientTypesOther} onChange={set2("clientTypesOther")} error={e2.clientTypesOther} maxLength={LIMITS.long} />} />

          <h3 className="wlr-sec">How you work</h3>
          <Chips id="inHouse" legend="Do you have an in-house team?" options={IN_HOUSE} value={v2.inHouse} onChange={set2("inHouse")} error={e2.inHouse} />
          <Text id="tools" label="Tools for project management and reporting" optional value={v2.tools} onChange={set2("tools")} hint="For example ClickUp, Asana, Looker Studio, Databox." maxLength={LIMITS.long} />
          <Chips id="usedVendor" legend="Have you used a white-label vendor before?" options={["Yes", "No"]} value={v2.usedVendor === "yes" ? "Yes" : v2.usedVendor === "no" ? "No" : ""} onChange={(o) => set2("usedVendor")(o.toLowerCase())}
            extra={v2.usedVendor === "yes" && <Text id="vendorNotes" label="What went wrong?" optional textarea rows={3} value={v2.vendorNotes} onChange={set2("vendorNotes")} maxLength={LIMITS.notes} />} />

          <h3 className="wlr-sec">Working together</h3>
          <div className="wlr-row">
            <Select id="budget" label="Expected monthly budget for outsourced work" value={v2.budget} onChange={set2("budget")} options={BUDGET_BANDS} error={e2.budget} />
            <Select id="startWhen" label="When do you want to start?" value={v2.startWhen} onChange={set2("startWhen")} options={START_WHEN} error={e2.startWhen} />
          </div>
          <div className="wlr-row">
            <Select id="heard" label="How did you hear about MMC?" value={v2.heard} onChange={set2("heard")} options={HEARD} error={e2.heard} />
            {v2.heard === "Other" && <Text id="heardOther" label="Where did you hear about us?" value={v2.heardOther} onChange={set2("heardOther")} error={e2.heardOther} maxLength={LIMITS.long} />}
          </div>
          <Text id="briefLink" label="Link to a sample brief" optional value={v2.briefLink} onChange={set2("briefLink")} error={e2.briefLink} inputMode="url" hint="A shared link to a past or typical client brief. Remove client names first if you prefer." maxLength={LIMITS.long} autoComplete="off" />
          <div className={"wlr-f" + (e2.notes ? " has-err" : "")}>
            <label htmlFor="notes">Anything else we should know<span className="wlr-opt"> (optional)</span></label>
            <textarea id="notes" rows={4} value={v2.notes} onChange={(e) => set2("notes")(e.target.value.slice(0, LIMITS.notes))} maxLength={LIMITS.notes} aria-describedby="notes-c" data-err="notes" />
            <p className="wlr-hint wlr-hint--r" id="notes-c">{left} characters left</p>
            <Err id="notes-e">{e2.notes}</Err>
          </div>

          <Check id="consent" checked={v2.consent} onChange={set2("consent")} error={e2.consent}>The details above are correct, and MMC may contact me about onboarding as a white-label partner.</Check>
          {Status}
          {sendFail && (
            <div className="wlr-fail" role="alert">
              <p><b>Your registration has not been sent yet.</b> Nothing you typed is lost. Press Try again, or email us at <a href={`mailto:${OWNER_EMAIL}`}>{OWNER_EMAIL}</a> and quote reference {ref.current}.</p>
            </div>
          )}
          <div className="wlr-actions wlr-actions--two">
            <button type="button" className="wlr-btn wlr-btn--ghost" onClick={() => { changedStep.current = true; setStatus(""); setStep(1); }} disabled={busy}><Back />Back</button>
            <button type="submit" className="wlr-btn" disabled={busy} aria-disabled={busy}>{busy ? "Sending..." : sendFail ? "Try again" : <>Submit registration<Arrow /></>}</button>
          </div>
          {PreviewBlock}
        </form>
      )}
    </div>
  );
}
