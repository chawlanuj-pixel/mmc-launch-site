// Transport for the white-label registration page ONLY. It does not touch window.MMCForms (public/assets/mmc-forms.js),
// because that helper falls back to opening a mail app, which is wrong for the step 1 background submit.
//
// Live site (hostname ends with mondaymarketing.company): POST JSON to /forms/send.php with fetch. No navigation, no mailto.
// Anywhere else (localhost, previews): nothing is sent. The payload is logged to the console and the page shows what would be sent.

export const ENDPOINT = "/forms/send.php";
const TIMEOUT_MS = 20000;

export function hostName() {
  // __mmcRegisterHost is a test hook so QA can exercise the live path without a real network send.
  return String((typeof window !== "undefined" && window.__mmcRegisterHost) || (typeof location !== "undefined" ? location.hostname : ""));
}
export function isLiveHost(host = hostName()) {
  return /(^|\.)mondaymarketing\.company$/i.test(host);
}

/** Resolves { ok, mode: "live" | "preview", status?, error? }. Never rejects, never navigates, never opens a mail app. */
export async function sendRegistration(payload, label) {
  if (!isLiveHost()) {
    try { console.info("[MMC register preview] " + (label || "email"), payload); } catch {}
    await new Promise((r) => setTimeout(r, 400));
    return { ok: true, mode: "preview" };
  }
  let body = payload;
  try { const tok = window.MMCCaptcha ? await window.MMCCaptcha.token("mmc_register") : ""; if (tok) body = { ...payload, _rc: tok }; } catch {}
  const ctl = typeof AbortController !== "undefined" ? new AbortController() : null;
  const timer = ctl ? setTimeout(() => ctl.abort(), TIMEOUT_MS) : null;
  try {
    const res = await window.fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
      credentials: "same-origin",
      signal: ctl ? ctl.signal : undefined,
    });
    return res && res.ok ? { ok: true, mode: "live", status: res.status } : { ok: false, mode: "live", status: res && res.status };
  } catch (err) {
    return { ok: false, mode: "live", error: String(err) };
  } finally {
    if (timer) clearTimeout(timer);
  }
}
