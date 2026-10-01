/* admin/admin-app.jsx - MMC lead + content dashboard.
   Credentials live only in this browser's localStorage. Nothing is written to
   a file, and nothing is served to a site visitor. */

const { useState, useEffect, useCallback } = React;

const STATUSES = ["New", "Working", "Won", "Lost"];
const APP_STATUSES = ["New", "Screening", "Interview", "Offer", "Rejected"];
const LS_TAB = "mmc.admin.tab";

const SITE_ORIGIN = "https://www.mondaymarketing.company";

/* The .html files at the repo root, which is the whole indexable surface of the
   site. admin/ is left out on purpose: it is noindex and has no metadata worth
   managing. Keep this in step with the root directory when a page is added. */
const SITE_PAGES = [
  "About.html", "Brand Handbook.html",
  "Careers.html", "Contact.html", "Insights.html", "Job Detail.html", "Our Work.html", "Privacy.html", "Service Detail.html",
  "Contact.html",
  "Terms.html",
  "breakeven-roas-calculator.html", "cac-runway-calculator.html",
  "d2c-marketing-glossary.html", "funnel-roas-calculator.html",
  "growth-trajectory-calculator.html", "home-classic.html", "home-v1.html",
  "index.html", "ltv-cac-calculator.html", "tools.html",
  "unit-economics-calculator.html"
];

/* The field list each table needs, used both by the Setup screen and by the
   422 error message, so the two can never drift apart. */
const TABLE_FIELDS = {
  Leads: "name, email, brand, url, revenue, channel, challenge, source, page, submittedAt, status, owner, notes",
  SEO: "page, title, metaDescription, canonical, ogTitle, ogDescription, focusKeyword, noindex",
  Jobs: "slug, title, department, location, type, workMode, band, summary, responsibilities, requirements, postedAt, validThrough, status",
  Applications: "name, email, phone, role, cvUrl, portfolioUrl, note, submittedAt, status, owner, adminNotes"
};

/* A note is as long as it is; a fixed-height box cuts it off mid-word. */
function fit(el) { if (!el) return; el.style.height = "auto"; el.style.height = el.scrollHeight + 2 + "px"; }
const grow = fit;

function fmtWhen(iso) {
  if (!iso) return "-";
  const d = new Date(iso);
  if (isNaN(d)) return String(iso).slice(0, 16);
  const mins = Math.round((Date.now() - d.getTime()) / 60000);
  if (mins < 60) return mins + "m ago";
  if (mins < 1440) return Math.round(mins / 60) + "h ago";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

/* Job dates are calendar dates, not events, so "3h ago" would be nonsense. */
function fmtDate(v) {
  if (!v) return "-";
  const d = new Date(v);
  if (isNaN(d)) return String(v).slice(0, 10);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/* An Airtable URL field arrives as a string, but if someone switches the column
   to Attachment it arrives as an array of objects instead. Handle both so a CV
   link never silently disappears from the table. */
function urlOf(v) {
  if (!v) return "";
  if (Array.isArray(v)) return (v[0] && v[0].url) || "";
  return String(v);
}

/* Shared by three tabs, so the blob dance lives in one place. */
function download(name, mime, text) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type: mime }));
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
}

function toCsv(cols, list) {
  const esc = (v) => '"' + String(v == null ? "" : v).replace(/"/g, '""') + '"';
  return [cols.join(",")].concat(list.map((r) => cols.map((c) => esc(r[c])).join(","))).join("\n");
}

function stamp() { return new Date().toISOString().slice(0, 10); }

/* ---- Errors --------------------------------------------------------- */
/* Airtable failures arrive as codes. A code tells the user nothing, so every
   one they can actually act on gets a sentence that names the fix. */
function errTitle(e) {
  if (e === "unauthorised") return "Token rejected";
  if (e === "not-configured") return "Not connected yet";
  if (e === "airtable-404") return "Base or table not found";
  if (e === "airtable-422") return "Table fields do not match";
  if (e === "airtable-429") return "Airtable rate limit hit";
  if (/^airtable-5/.test(e)) return "Airtable is not responding";
  return "Could not reach Airtable";
}
function errHelp(e, table) {
  table = table || "Leads";
  if (e === "unauthorised") return "The token is wrong, expired, or has no access to this base. Create a new one at airtable.com/create/tokens with data.records:read and data.records:write, then Disconnect and paste it again.";
  if (e === "not-configured") return "Disconnect and paste your token and Base ID again.";
  if (e === "airtable-404") return "Check the Base ID is the app... id from your base URL, and that the base has a table named exactly " + table + ".";
  if (e === "airtable-422") return "The " + table + " table is missing a field this dashboard writes to, or a field is the wrong type. It needs: " + TABLE_FIELDS[table] + ".";
  if (e === "airtable-429") return "Too many requests. Wait about thirty seconds and hit Refresh.";
  if (/^airtable-5/.test(e)) return "Airtable had a server error. Hit Refresh in a minute; nothing was lost.";
  return "Check your connection and hit Refresh. Details: " + e;
}
function Err({ e, table }) {
  if (!e) return null;
  return <div className="a-warn"><b>{errTitle(e)}</b>{errHelp(e, table)}</div>;
}

/* ---- Setup ---------------------------------------------------------- */
function Setup({ onSaved }) {
  const [pat, setPat] = useState("");
  const [base, setBase] = useState("");
  return (
    <div className="a-wrap a-main">
      <h1 className="a-h">Connect your lead store</h1>
      <p className="a-sub">One-time setup. Takes about two minutes.</p>
      <div className="a-setup">
        <div className="a-warn">
          <b>Why you paste this instead of us storing it</b>
          The public site is static, so any key committed to a file would ship to
          every visitor. Your token is kept in this browser only, never written to
          the project and never served to the site.
        </div>
        <div className="a-field">
          <label htmlFor="pat">Airtable personal access token</label>
          <input id="pat" type="password" value={pat} placeholder="pat..."
                 onChange={(e) => setPat(e.target.value)} autoComplete="off" />
          <small>
            Create one at airtable.com/create/tokens with scopes
            <b> data.records:read</b> and <b>data.records:write</b>, limited to this base.
          </small>
        </div>
        <div className="a-field">
          <label htmlFor="base">Base ID</label>
          <input id="base" value={base} placeholder="app..."
                 onChange={(e) => setBase(e.target.value)} autoComplete="off" />
          <small>From the base URL: airtable.com/<b>appXXXXXXXX</b>/...</small>
        </div>
        <div className="a-field">
          <small>
            The base needs these tables. Each one is only needed once you open its
            tab, so you can add them as you go.
          </small>
          {Object.keys(TABLE_FIELDS).map((t) => (
            <div className="a-tblreq" key={t}>
              <b>{t}</b>
              <div className="a-fields">
                {TABLE_FIELDS[t].split(", ").map((f) => <span key={f}>{f}</span>)}
              </div>
            </div>
          ))}
        </div>
        <button className="a-btn a-btn--pri" disabled={!pat || !base}
                onClick={() => { window.MMCData.saveCreds(pat.trim(), base.trim()); onSaved(); }}>
          Connect
        </button>
      </div>
    </div>
  );
}

/* ---- Leads ---------------------------------------------------------- */
function Leads() {
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState(null);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [busy, setBusy] = useState({});

  const load = useCallback(() => {
    setErr(null); setRows(null);
    window.MMCData.listLeads()
      .then(setRows)
      .catch((e) => { setErr(String(e.message || e)); setRows([]); });
  }, []);
  useEffect(load, [load]);

  const patch = (id, fields) => {
    setBusy((b) => Object.assign({}, b, { [id]: true }));
    setRows((rs) => rs.map((r) => (r._id === id ? Object.assign({}, r, fields) : r)));
    window.MMCData.updateLead(id, fields)
      .catch((e) => setErr("Could not save: " + (e.message || e)))
      .then(() => setBusy((b) => Object.assign({}, b, { [id]: false })));
  };

  const list = (rows || []).filter((r) => {
    if (status !== "All" && (r.status || "New") !== status) return false;
    if (!q.trim()) return true;
    const hay = [r.name, r.email, r.brand, r.challenge, r.source].join(" ").toLowerCase();
    return hay.includes(q.trim().toLowerCase());
  });

  const count = (s) => (rows || []).filter((r) => (r.status || "New") === s).length;

  const exportCsv = () => {
    const cols = ["submittedAt", "name", "email", "brand", "url", "revenue", "channel", "challenge", "source", "status", "owner", "notes"];
    download("mmc-leads-" + stamp() + ".csv", "text/csv", toCsv(cols, list));
  };

  if (rows === null) return <div className="a-wrap a-main"><div className="a-empty">Loading leads...</div></div>;

  return (
    <div className="a-wrap a-main">
      <h1 className="a-h">Leads</h1>
      <p className="a-sub">Every enquiry from the audit modal, contact page and job form.</p>

      <div className="a-kpis">
        <div className="a-kpi"><div className="a-kpi__l">Total</div><div className="a-kpi__v">{rows.length}</div></div>
        {STATUSES.map((s) => (
          <div className="a-kpi" key={s}>
            <div className="a-kpi__l">{s}</div>
            <div className="a-kpi__v">{count(s)}</div>
          </div>
        ))}
      </div>

      <Err e={err} table="Leads" />

      <div className="a-bar">
        <label className="a-search">
          <span aria-hidden="true">&#9906;</span>
          <input value={q} onChange={(e) => setQ(e.target.value)}
                 placeholder="Search name, email, brand, challenge..." aria-label="Search leads" />
        </label>
        {["All"].concat(STATUSES).map((s) => (
          <button key={s} className={"a-chip" + (status === s ? " is-on" : "")}
                  onClick={() => setStatus(s)}>{s}</button>
        ))}
        <button className="a-btn" onClick={load}>Refresh</button>
        <button className="a-btn a-btn--pri" onClick={exportCsv} disabled={!list.length}>Export CSV</button>
      </div>

      {list.length === 0 ? (
        <div className="a-empty">
          <b>{rows.length ? "Nothing matches that filter" : "No leads yet"}</b>
          {rows.length
            ? "Try clearing the search or status."
            : "As soon as someone submits the audit modal or contact form, it lands here."}
        </div>
      ) : (
        <div className="a-tablewrap">
          <table className="a-table">
            <thead><tr>
              <th>When</th><th>Who</th><th>Brand</th><th>What they said</th>
              <th>Source</th><th>Status</th><th>Owner</th><th>Notes</th>
            </tr></thead>
            <tbody>
              {list.map((r) => (
                <tr key={r._id}>
                  <td className="a-when">{fmtWhen(r.submittedAt)}</td>
                  <td><b>{r.name || "-"}</b><br />
                    {r.email ? <a href={"mailto:" + r.email}>{r.email}</a> : <span className="a-when">no email</span>}</td>
                  <td>{r.brand || "-"}{r.url ? <><br /><a href={r.url} target="_blank" rel="noreferrer" className="a-when">{r.url}</a></> : null}</td>
                  <td style={{ maxWidth: 300 }}>{r.challenge || "-"}
                    {r.revenue ? <><br /><span className="a-when">{r.revenue}{r.channel ? " / " + r.channel : ""}</span></> : null}</td>
                  <td className="a-when">{r.source || r.page || "-"}</td>
                  <td>
                    <select className={"a-sel a-sel--" + String(r.status || "New").toLowerCase()} value={r.status || "New"} disabled={busy[r._id]}
                            onChange={(e) => patch(r._id, { status: e.target.value })}>
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td><input className="a-note" style={{ minHeight: 0 }} defaultValue={r.owner || ""}
                             placeholder="unassigned"
                             onBlur={(e) => e.target.value !== (r.owner || "") && patch(r._id, { owner: e.target.value })} /></td>
                  <td><textarea className="a-note" defaultValue={r.notes || ""} placeholder="Add a note..."
                                ref={grow} onInput={(e) => fit(e.target)}
                                onBlur={(e) => e.target.value !== (r.notes || "") && patch(r._id, { notes: e.target.value })} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ---- SEO ------------------------------------------------------------ */
/* Google truncates a title around 60 characters and a description around 155,
   but cuts on pixel width rather than character count, so the soft limit is a
   warning and not a rule. Past 70 and 165 it is cut in practice every time,
   which is the point at which amber becomes red. */
const LIM_TITLE = [60, 70];
const LIM_DESC = [155, 165];

function lenClass(n, lim) {
  if (!n) return "is-empty";
  if (n > lim[1]) return "is-bad";
  if (n > lim[0]) return "is-warn";
  return "is-ok";
}

function Counter({ value, lim }) {
  const n = (value || "").length;
  return <span className={"a-cnt " + lenClass(n, lim)}>{n}<i>/{lim[0]}</i></span>;
}

function SeoField({ label, hint, value, lim, rows, onChange }) {
  return (
    <div className="a-field">
      <label>
        <span>{label}</span>
        {lim ? <Counter value={value} lim={lim} /> : null}
      </label>
      {rows
        ? <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
        : <input value={value} onChange={(e) => onChange(e.target.value)} />}
      {hint ? <small>{hint}</small> : null}
    </div>
  );
}

/* Several filenames contain spaces, so the two forms of the same URL differ on
   purpose: a canonical has to be percent-encoded, while the result page prints
   the readable form. */
function pageUrl(page) {
  return SITE_ORIGIN + "/" + page.split("/").map(encodeURIComponent).join("/");
}
function pageCrumb(page) {
  return SITE_ORIGIN.replace(/^https:\/\//, "") + "/" + page;
}

/* The preview is clamped to 600px, one line of title and two of description,
   because that is roughly the desktop result column. Showing the fallback in
   grey where a field is blank keeps it honest rather than rendering an empty
   blue line that looks like a result nobody would ever click. */
function Serp({ page, title, desc }) {
  return (
    <div className="a-serp">
      <div className="a-serp__u">{pageCrumb(page)}</div>
      <div className={"a-serp__t" + (title ? "" : " is-ph")}>
        {title || "No title set, so Google will invent one from the page"}
      </div>
      <div className={"a-serp__d" + (desc ? "" : " is-ph")}>
        {desc || "No description set, so Google will pull a sentence out of the body copy."}
      </div>
    </div>
  );
}

function Seo() {
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState(null);
  const [sel, setSel] = useState(SITE_PAGES[0]);
  const [drafts, setDrafts] = useState({});
  const [saving, setSaving] = useState(false);
  const [q, setQ] = useState("");

  const load = useCallback(() => {
    setErr(null); setRows(null);
    window.MMCData.listSeo()
      .then(setRows)
      .catch((e) => { setErr(String(e.message || e)); setRows([]); });
  }, []);
  useEffect(load, [load]);

  const byPage = {};
  (rows || []).forEach((r) => { if (r.page) byPage[r.page] = r; });

  const blank = (f) => (f === "noindex" ? false : "");
  const val = (page, f) => {
    const d = drafts[page];
    if (d && d[f] !== undefined) return d[f];
    const r = byPage[page];
    return r && r[f] != null ? r[f] : blank(f);
  };
  const edit = (f, v) => setDrafts((d) =>
    Object.assign({}, d, { [sel]: Object.assign({}, d[sel], { [f]: v }) }));

  /* A draft only counts as unsaved when it actually differs from the row, so
     tabbing through a field without changing it does not light up the page. */
  const dirty = (page) => {
    const d = drafts[page];
    if (!d) return false;
    const r = byPage[page] || {};
    return Object.keys(d).some((f) =>
      String(d[f] == null ? blank(f) : d[f]) !== String(r[f] == null ? blank(f) : r[f]));
  };
  const dirtyCount = Object.keys(drafts).filter(dirty).length;

  const save = () => {
    const d = drafts[sel];
    if (!d) return;
    const rec = byPage[sel];
    const fields = Object.assign({}, d);
    if (!rec) fields.page = sel; // the key field has to be on the row we create
    setSaving(true); setErr(null);
    window.MMCData.upsertSeo(rec ? rec._id : null, fields)
      .then((res) => {
        const row = Object.assign({ page: sel }, res.fields, { _id: res.id });
        setRows((rs) => (rs || []).filter((r) => r._id !== row._id).concat([row]));
        setDrafts((x) => { const n = Object.assign({}, x); delete n[sel]; return n; });
      })
      .catch((e) => setErr(String(e.message || e)))
      .then(() => setSaving(false));
  };

  const revert = () => setDrafts((x) => { const n = Object.assign({}, x); delete n[sel]; return n; });

  /* Exported from saved rows, not drafts, because apply-seo.py should only ever
     write what is actually committed to the table. Pages with nothing set are
     skipped: an empty object would read as an instruction to blank a head that
     already has perfectly good metadata baked into it. */
  const exportJson = () => {
    const out = {};
    SITE_PAGES.concat(Object.keys(byPage).filter((p) => SITE_PAGES.indexOf(p) < 0))
      .forEach((p) => {
        const r = byPage[p];
        if (!r) return;
        const o = {};
        if (r.title) o.title = r.title;
        if (r.metaDescription) o.description = r.metaDescription;
        if (r.canonical) o.canonical = r.canonical;
        if (r.ogTitle) o.ogTitle = r.ogTitle;
        if (r.ogDescription) o.ogDescription = r.ogDescription;
        if (r.focusKeyword) o.focusKeyword = r.focusKeyword;
        if (r.noindex) o.noindex = true;
        if (Object.keys(o).length) out[p] = o;
      });
    download("seo.json", "application/json", JSON.stringify(out, null, 2) + "\n");
  };

  const pageState = (page) => {
    const t = String(val(page, "title") || "").length;
    const d = String(val(page, "metaDescription") || "").length;
    if (!t || !d) return "is-empty";
    if (t > LIM_TITLE[1] || d > LIM_DESC[1]) return "is-bad";
    if (t > LIM_TITLE[0] || d > LIM_DESC[0]) return "is-warn";
    return "is-ok";
  };

  const shown = SITE_PAGES.filter((p) =>
    !q.trim() || p.toLowerCase().includes(q.trim().toLowerCase()));

  const withTitle = SITE_PAGES.filter((p) => val(p, "title")).length;
  const withDesc = SITE_PAGES.filter((p) => val(p, "metaDescription")).length;
  const overLimit = SITE_PAGES.filter((p) => pageState(p) === "is-bad" || pageState(p) === "is-warn").length;
  const noindexed = SITE_PAGES.filter((p) => val(p, "noindex")).length;

  const title = String(val(sel, "title") || "");
  const desc = String(val(sel, "metaDescription") || "");
  const kw = String(val(sel, "focusKeyword") || "").trim().toLowerCase();
  const inTitle = kw && title.toLowerCase().includes(kw);
  const inDesc = kw && desc.toLowerCase().includes(kw);

  if (rows === null) return <div className="a-wrap a-main"><div className="a-empty">Loading metadata...</div></div>;

  return (
    <div className="a-wrap a-main">
      <h1 className="a-h">SEO</h1>
      <p className="a-sub">Title, description and canonical for every page at the site root.</p>

      <div className="a-kpis">
        <div className="a-kpi"><div className="a-kpi__l">Pages</div><div className="a-kpi__v">{SITE_PAGES.length}</div></div>
        <div className="a-kpi"><div className="a-kpi__l">With title</div><div className="a-kpi__v">{withTitle}</div></div>
        <div className="a-kpi"><div className="a-kpi__l">With description</div><div className="a-kpi__v">{withDesc}</div></div>
        <div className="a-kpi"><div className="a-kpi__l">Over length</div><div className="a-kpi__v">{overLimit}</div></div>
        <div className="a-kpi"><div className="a-kpi__l">Noindex</div><div className="a-kpi__v">{noindexed}</div></div>
      </div>

      <div className="a-warn">
        <b>Saving here stages the change, it does not publish it</b>
        Metadata lives in each page's <code>&lt;head&gt;</code>, and this dashboard
        cannot write files. Saving puts the values in the SEO table; running
        <code>python3 apply-seo.py</code> from the project root writes them into the
        .html files, which you then deploy. Until that runs, the live page still
        serves its old title and description.
      </div>

      <Err e={err} table="SEO" />

      <div className="a-bar">
        <span className="a-when">{dirtyCount ? dirtyCount + " page(s) with unsaved edits" : "All edits saved"}</span>
        <button className="a-btn" style={{ marginLeft: "auto" }} onClick={load}>Refresh</button>
        <button className="a-btn a-btn--pri" onClick={exportJson}
                disabled={!Object.keys(byPage).length}>Export JSON</button>
      </div>

      <div className="a-split">
        <div className="a-side">
          <div className="a-side__s">
            <input value={q} onChange={(e) => setQ(e.target.value)}
                   placeholder="Filter pages..." aria-label="Filter pages" />
          </div>
          <div className="a-side__l">
            {shown.map((p) => (
              <button key={p} className={"a-pg" + (sel === p ? " is-on" : "")} onClick={() => setSel(p)}>
                <span className={"a-dot " + pageState(p)} aria-hidden="true"></span>
                <span className="a-pg__n">{p}</span>
                {dirty(p) ? <span className="a-star" title="Unsaved">&bull;</span> : null}
              </button>
            ))}
            {shown.length === 0 ? <div className="a-side__none">No page matches that.</div> : null}
          </div>
        </div>

        <div className="a-pane">
          <div className="a-pane__h">
            <h2 className="a-pane__t">{sel}</h2>
            <div className="a-pane__r">
              {dirty(sel) ? <button className="a-btn a-btn--sm" onClick={revert}>Revert</button> : null}
              <button className="a-btn a-btn--pri a-btn--sm" onClick={save} disabled={saving || !dirty(sel)}>
                {saving ? "Saving..." : dirty(sel) ? "Save page" : "Saved"}
              </button>
            </div>
          </div>

          <Serp page={sel} title={title} desc={desc} />
          <small className="a-note--sm">
            Google cuts by pixel width rather than character count, so treat this as
            close rather than exact. Capitals and wide letters cut sooner.
          </small>

          <SeoField label="Title" value={title} lim={LIM_TITLE}
                    onChange={(v) => edit("title", v)}
                    hint="What shows as the blue line. Lead with the thing being searched for, put the brand last." />
          <SeoField label="Meta description" value={desc} lim={LIM_DESC} rows={3}
                    onChange={(v) => edit("metaDescription", v)}
                    hint="Not a ranking factor, but it is the sales line under the link." />

          <div className="a-grid2">
            <SeoField label="Focus keyword" value={String(val(sel, "focusKeyword") || "")}
                      onChange={(v) => edit("focusKeyword", v)}
                      hint={kw
                        ? (inTitle ? "Found in the title. " : "Not in the title. ") +
                          (inDesc ? "Found in the description." : "Not in the description.")
                        : "One phrase this page is meant to win. Used only as a check."} />
            <SeoField label="Canonical URL" value={String(val(sel, "canonical") || "")}
                      onChange={(v) => edit("canonical", v)}
                      hint={"Leave blank to use " + pageUrl(sel) + "."} />
          </div>

          <div className="a-grid2">
            <SeoField label="OG title" value={String(val(sel, "ogTitle") || "")} lim={LIM_TITLE}
                      onChange={(v) => edit("ogTitle", v)}
                      hint="Shown when the link is pasted into WhatsApp or LinkedIn. Blank falls back to the title." />
            <SeoField label="OG description" value={String(val(sel, "ogDescription") || "")} lim={LIM_DESC} rows={3}
                      onChange={(v) => edit("ogDescription", v)}
                      hint="Blank falls back to the meta description." />
          </div>

          <div className="a-field a-check">
            <input id="noindex" type="checkbox" checked={!!val(sel, "noindex")}
                   onChange={(e) => edit("noindex", e.target.checked)} />
            <label htmlFor="noindex">
              <span>Noindex this page</span>
            </label>
          </div>
          <small className="a-note--sm">
            Keeps the page reachable but out of search results. robots.txt already
            disallows home-classic.html and home-v1.html; this is the tag-level
            equivalent for anything else you do not want indexed.
          </small>
        </div>
      </div>
    </div>
  );
}

/* ---- Jobs ----------------------------------------------------------- */
const JOB_TYPES = ["Full-time", "Contract", "Intern"];
const JOB_MODES = ["Onsite", "Hybrid", "Remote"];
const JOB_STATES = ["Open", "Closed"];
const JOB_DATES = ["postedAt", "validThrough"];
const BLANK_JOB = {
  slug: "", title: "", department: "", location: "", type: "Full-time",
  workMode: "Onsite", band: "", summary: "", responsibilities: "",
  requirements: "", postedAt: "", validThrough: "", status: "Open"
};

function slugify(s) {
  return String(s || "").toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function Jobs() {
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState(null);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [show, setShow] = useState("Open");

  const load = useCallback(() => {
    setErr(null); setRows(null);
    window.MMCData.listJobs()
      .then(setRows)
      .catch((e) => { setErr(String(e.message || e)); setRows([]); });
  }, []);
  useEffect(load, [load]);

  /* Nulls are stripped rather than merged: Object.assign would let one overwrite
     the blank string BLANK_JOB provides, and React flips an input from
     controlled to uncontrolled the moment its value goes null. */
  const open = (job) => {
    if (!job) return setForm(Object.assign({}, BLANK_JOB, { postedAt: stamp() }));
    const clean = {};
    Object.keys(job).forEach((k) => { if (job[k] != null) clean[k] = job[k]; });
    setForm(Object.assign({}, BLANK_JOB, clean));
  };

  const set = (f, v) => setForm((x) => Object.assign({}, x, { [f]: v }));

  /* The slug is what the Job Detail page will be linked by, so it is derived
     from the title until someone edits it by hand. Once a role is live the slug
     is a URL other people hold, so an existing job never re-derives. */
  const setTitle = (v) => setForm((f) => Object.assign({}, f, {
    title: v,
    slug: (!f._id && (!f.slug || f.slug === slugify(f.title))) ? slugify(v) : f.slug
  }));

  const save = () => {
    const fields = {};
    Object.keys(BLANK_JOB).forEach((k) => {
      const v = form[k];
      /* An empty string is a 422 on an Airtable date column, but null clears it
         cleanly, so the two date fields cannot go through the same branch. */
      fields[k] = JOB_DATES.indexOf(k) >= 0 ? (v || null) : (v == null ? "" : v);
    });
    setSaving(true); setErr(null);
    window.MMCData.upsertJob(form._id || null, fields)
      .then((res) => {
        const row = Object.assign({}, res.fields, { _id: res.id });
        setRows((rs) => (rs || []).filter((r) => r._id !== row._id).concat([row]));
        setForm(null);
      })
      .catch((e) => setErr(String(e.message || e)))
      .then(() => setSaving(false));
  };

  const close = (job) => {
    setRows((rs) => rs.map((r) => (r._id === job._id ? Object.assign({}, r, { status: "Closed" }) : r)));
    window.MMCData.closeJob(job._id).catch((e) => setErr(String(e.message || e)));
  };

  const reopen = (job) => {
    setRows((rs) => rs.map((r) => (r._id === job._id ? Object.assign({}, r, { status: "Open" }) : r)));
    window.MMCData.upsertJob(job._id, { status: "Open" }).catch((e) => setErr(String(e.message || e)));
  };

  const all = rows || [];
  const openCount = all.filter((r) => (r.status || "Open") === "Open").length;
  const list = show === "All" ? all : all.filter((r) => (r.status || "Open") === show);
  const valid = form && String(form.title || "").trim() && String(form.slug || "").trim();

  if (rows === null) return <div className="a-wrap a-main"><div className="a-empty">Loading roles...</div></div>;

  return (
    <div className="a-wrap a-main">
      <h1 className="a-h">Jobs</h1>
      <p className="a-sub">Open roles, the copy that fills the Job Detail page, and when each one expires.</p>

      <div className="a-kpis a-kpis--auto">
        <div className="a-kpi"><div className="a-kpi__l">Open roles</div><div className="a-kpi__v">{openCount}</div></div>
        <div className="a-kpi"><div className="a-kpi__l">Closed</div><div className="a-kpi__v">{all.length - openCount}</div></div>
        <div className="a-kpi"><div className="a-kpi__l">Total posted</div><div className="a-kpi__v">{all.length}</div></div>
      </div>

      <div className="a-warn">
        <b>The Careers page states a number of open roles</b>
        That headline has to match the {openCount} open {openCount === 1 ? "role" : "roles"} here.
        Close a filled role rather than deleting it, so the old link still resolves
        and the applications attached to it keep naming something real.
      </div>

      <Err e={err} table="Jobs" />

      <div className="a-bar">
        {["Open", "Closed", "All"].map((s) => (
          <button key={s} className={"a-chip" + (show === s ? " is-on" : "")}
                  onClick={() => setShow(s)}>{s}</button>
        ))}
        <button className="a-btn" style={{ marginLeft: "auto" }} onClick={load}>Refresh</button>
        <button className="a-btn a-btn--pri" onClick={() => open(null)}>New role</button>
      </div>

      {form ? (
        <div className="a-pane" style={{ marginBottom: 14 }}>
          <div className="a-pane__h">
            <h2 className="a-pane__t">{form._id ? "Edit role" : "New role"}</h2>
            <div className="a-pane__r">
              <button className="a-btn a-btn--sm" onClick={() => setForm(null)}>Cancel</button>
              <button className="a-btn a-btn--pri a-btn--sm" onClick={save} disabled={saving || !valid}>
                {saving ? "Saving..." : "Save role"}
              </button>
            </div>
          </div>

          <div className="a-grid2">
            <div className="a-field">
              <label htmlFor="j-title"><span>Title</span></label>
              <input id="j-title" value={form.title} onChange={(e) => setTitle(e.target.value)}
                     placeholder="Performance Marketing Manager" />
            </div>
            <div className="a-field">
              <label htmlFor="j-slug"><span>Slug</span></label>
              {/* Slugified on blur rather than on every keystroke: cleaning as
                  you type eats the hyphen the moment you press it, which makes
                  a hand-written slug impossible to enter. */}
              <input id="j-slug" value={form.slug}
                     onChange={(e) => set("slug", e.target.value)}
                     onBlur={(e) => set("slug", slugify(e.target.value))}
                     placeholder="performance-marketing-manager" />
              <small>Job Detail.html?role={form.slug || "..."}</small>
            </div>
          </div>

          <div className="a-grid2">
            <div className="a-field">
              <label htmlFor="j-dept"><span>Department</span></label>
              <input id="j-dept" value={form.department} onChange={(e) => set("department", e.target.value)}
                     placeholder="Performance" />
            </div>
            <div className="a-field">
              <label htmlFor="j-loc"><span>Location</span></label>
              <input id="j-loc" value={form.location} onChange={(e) => set("location", e.target.value)}
                     placeholder="Mumbai" />
            </div>
          </div>

          <div className="a-grid2">
            <div className="a-field">
              <label htmlFor="j-type"><span>Type</span></label>
              <select id="j-type" value={form.type} onChange={(e) => set("type", e.target.value)}>
                {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="a-field">
              <label htmlFor="j-mode"><span>Work mode</span></label>
              <select id="j-mode" value={form.workMode} onChange={(e) => set("workMode", e.target.value)}>
                {JOB_MODES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="a-grid2">
            <div className="a-field">
              <label htmlFor="j-band"><span>Band</span></label>
              <input id="j-band" value={form.band} onChange={(e) => set("band", e.target.value)}
                     placeholder="Mid / 3 to 5 years" />
            </div>
            <div className="a-field">
              <label htmlFor="j-status"><span>Status</span></label>
              <select id="j-status" value={form.status} onChange={(e) => set("status", e.target.value)}>
                {JOB_STATES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="a-field">
            <label htmlFor="j-sum"><span>Summary</span></label>
            <textarea id="j-sum" rows={3} value={form.summary} onChange={(e) => set("summary", e.target.value)}
                      placeholder="Two or three sentences on what the role is for." />
          </div>

          <div className="a-grid2">
            <div className="a-field">
              <label htmlFor="j-resp"><span>Responsibilities</span></label>
              <textarea id="j-resp" rows={6} value={form.responsibilities}
                        onChange={(e) => set("responsibilities", e.target.value)}
                        placeholder="One per line." />
              <small>One per line. Each line becomes a bullet.</small>
            </div>
            <div className="a-field">
              <label htmlFor="j-req"><span>Requirements</span></label>
              <textarea id="j-req" rows={6} value={form.requirements}
                        onChange={(e) => set("requirements", e.target.value)}
                        placeholder="One per line." />
              <small>One per line. Each line becomes a bullet.</small>
            </div>
          </div>

          <div className="a-grid2">
            <div className="a-field">
              <label htmlFor="j-posted"><span>Posted</span></label>
              <input id="j-posted" type="date" value={String(form.postedAt || "").slice(0, 10)}
                     onChange={(e) => set("postedAt", e.target.value)} />
            </div>
            <div className="a-field">
              <label htmlFor="j-valid"><span>Valid through</span></label>
              <input id="j-valid" type="date" value={String(form.validThrough || "").slice(0, 10)}
                     onChange={(e) => set("validThrough", e.target.value)} />
              <small>JobPosting schema wants this. A stale date drops the listing from Google Jobs.</small>
            </div>
          </div>
        </div>
      ) : null}

      {list.length === 0 ? (
        <div className="a-empty">
          <b>{all.length ? "No " + show.toLowerCase() + " roles" : "No roles posted yet"}</b>
          {all.length
            ? "Switch the filter to see the rest."
            : "Hit New role to write the first one. It appears on Careers as soon as the page reads this table."}
        </div>
      ) : (
        <div className="a-tablewrap">
          <table className="a-table">
            <thead><tr>
              <th>Role</th><th>Department</th><th>Location</th><th>Type</th>
              <th>Band</th><th>Posted</th><th>Valid through</th><th>Status</th><th></th>
            </tr></thead>
            <tbody>
              {list.map((r) => (
                <tr key={r._id}>
                  <td style={{ maxWidth: 280 }}>
                    <b>{r.title || "Untitled"}</b><br />
                    <span className="a-when">{r.slug || "no slug"}</span>
                  </td>
                  <td>{r.department || "-"}</td>
                  <td>{r.location || "-"}</td>
                  <td>{r.type || "-"}<br /><span className="a-when">{r.workMode || "-"}</span></td>
                  <td>{r.band || "-"}</td>
                  <td className="a-when">{fmtDate(r.postedAt)}</td>
                  <td className="a-when">{fmtDate(r.validThrough)}</td>
                  <td>
                    <span className={"a-pill " + ((r.status || "Open") === "Open" ? "is-open" : "is-closed")}>
                      {r.status || "Open"}
                    </span>
                  </td>
                  <td>
                    <div className="a-acts">
                      <button className="a-btn a-btn--sm" onClick={() => open(r)}>Edit</button>
                      {(r.status || "Open") === "Open"
                        ? <button className="a-btn a-btn--sm" onClick={() => close(r)}>Close</button>
                        : <button className="a-btn a-btn--sm" onClick={() => reopen(r)}>Reopen</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ---- Applications --------------------------------------------------- */
function LinkCell({ href, label }) {
  const u = urlOf(href);
  if (!u) return <span className="a-none">none</span>;
  return <a href={u} target="_blank" rel="noreferrer">{label}</a>;
}

function Applications() {
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState(null);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [busy, setBusy] = useState({});

  const load = useCallback(() => {
    setErr(null); setRows(null);
    window.MMCData.listApplications()
      .then(setRows)
      .catch((e) => { setErr(String(e.message || e)); setRows([]); });
  }, []);
  useEffect(load, [load]);

  const patch = (id, fields) => {
    setBusy((b) => Object.assign({}, b, { [id]: true }));
    setRows((rs) => rs.map((r) => (r._id === id ? Object.assign({}, r, fields) : r)));
    window.MMCData.updateApplication(id, fields)
      .catch((e) => setErr("Could not save: " + (e.message || e)))
      .then(() => setBusy((b) => Object.assign({}, b, { [id]: false })));
  };

  const list = (rows || []).filter((r) => {
    if (status !== "All" && (r.status || "New") !== status) return false;
    if (!q.trim()) return true;
    const hay = [r.name, r.email, r.role, r.note].join(" ").toLowerCase();
    return hay.includes(q.trim().toLowerCase());
  });

  const count = (s) => (rows || []).filter((r) => (r.status || "New") === s).length;

  const exportCsv = () => {
    const cols = ["submittedAt", "name", "email", "phone", "role", "cvUrl", "portfolioUrl", "note", "status", "owner", "adminNotes"];
    download("mmc-applications-" + stamp() + ".csv", "text/csv", toCsv(cols, list));
  };

  if (rows === null) return <div className="a-wrap a-main"><div className="a-empty">Loading applications...</div></div>;

  return (
    <div className="a-wrap a-main">
      <h1 className="a-h">Applications</h1>
      <p className="a-sub">
        Everyone who applied through a job posting. The application itself is
        read-only; status, owner and notes are yours to edit.
      </p>

      <div className="a-kpis a-kpis--auto">
        <div className="a-kpi"><div className="a-kpi__l">Total</div><div className="a-kpi__v">{rows.length}</div></div>
        {APP_STATUSES.map((s) => (
          <div className="a-kpi" key={s}>
            <div className="a-kpi__l">{s}</div>
            <div className="a-kpi__v">{count(s)}</div>
          </div>
        ))}
      </div>

      <Err e={err} table="Applications" />

      <div className="a-bar">
        <label className="a-search">
          <span aria-hidden="true">&#9906;</span>
          <input value={q} onChange={(e) => setQ(e.target.value)}
                 placeholder="Search name, email, role..." aria-label="Search applications" />
        </label>
        {["All"].concat(APP_STATUSES).map((s) => (
          <button key={s} className={"a-chip" + (status === s ? " is-on" : "")}
                  onClick={() => setStatus(s)}>{s}</button>
        ))}
        <button className="a-btn" onClick={load}>Refresh</button>
        <button className="a-btn a-btn--pri" onClick={exportCsv} disabled={!list.length}>Export CSV</button>
      </div>

      {list.length === 0 ? (
        <div className="a-empty">
          <b>{rows.length ? "Nothing matches that filter" : "No applications yet"}</b>
          {rows.length
            ? "Try clearing the search or status."
            : "Applications land here as soon as someone submits the form on a job posting."}
        </div>
      ) : (
        <div className="a-tablewrap">
          <table className="a-table">
            <thead><tr>
              <th>When</th><th>Who</th><th>Role</th><th>Links</th><th>What they said</th>
              <th>Status</th><th>Owner</th><th>Notes</th>
            </tr></thead>
            <tbody>
              {list.map((r) => (
                <tr key={r._id}>
                  <td className="a-when">{fmtWhen(r.submittedAt)}</td>
                  <td>
                    <b>{r.name || "-"}</b><br />
                    {r.email ? <a href={"mailto:" + r.email}>{r.email}</a> : <span className="a-none">no email</span>}
                    {r.phone ? <><br /><a href={"tel:" + String(r.phone).replace(/\s+/g, "")} className="a-when">{r.phone}</a></> : null}
                  </td>
                  <td>{r.role || <span className="a-none">unspecified</span>}</td>
                  <td>
                    <div className="a-links">
                      <span><b>CV</b> <LinkCell href={r.cvUrl} label="open" /></span>
                      <span><b>Portfolio</b> <LinkCell href={r.portfolioUrl} label="open" /></span>
                    </div>
                  </td>
                  <td style={{ maxWidth: 300 }}>{r.note || "-"}</td>
                  <td>
                    <select className={"a-sel a-sel--" + String(r.status || "New").toLowerCase()}
                            value={r.status || "New"} disabled={busy[r._id]}
                            onChange={(e) => patch(r._id, { status: e.target.value })}>
                      {APP_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td><input className="a-note" style={{ minHeight: 0 }} defaultValue={r.owner || ""}
                             placeholder="unassigned"
                             onBlur={(e) => e.target.value !== (r.owner || "") && patch(r._id, { owner: e.target.value })} /></td>
                  <td><textarea className="a-note" defaultValue={r.adminNotes || ""} placeholder="Add a note..."
                                ref={grow} onInput={(e) => fit(e.target)}
                                onBlur={(e) => e.target.value !== (r.adminNotes || "") && patch(r._id, { adminNotes: e.target.value })} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ---- Pages ---------------------------------------------------------- */
/* Thresholds match the SEO tab so one page cannot read green there and amber
   here. Everything else is a judgement call written down once:
   zero H1 is a structural miss, more than one is only a hierarchy smell;
   under 300 words reads thin to a crawler and under 100 there is no page to
   rank at all; an image with no alt is a plain defect rather than a matter of
   taste, so it goes straight to red. */
function fTitle(n) { return !n ? "is-bad" : n > LIM_TITLE[1] ? "is-bad" : n > LIM_TITLE[0] ? "is-warn" : "is-ok"; }
function fDesc(n) { return !n ? "is-bad" : n > LIM_DESC[1] ? "is-bad" : n > LIM_DESC[0] ? "is-warn" : "is-ok"; }
function fH1(n) { return n === 1 ? "is-ok" : n === 0 ? "is-bad" : "is-warn"; }
function fWords(n) { return n < 100 ? "is-bad" : n < 300 ? "is-warn" : "is-ok"; }
function fSchema(a) { return a && a.length ? "is-ok" : "is-warn"; }
function fAlt(n) { return n > 0 ? "is-bad" : "is-ok"; }

/* Red counts double so a page with one real defect outranks a page with two
   soft warnings when the table sorts worst first. */
function weight(cls) { return cls === "is-bad" ? 2 : cls === "is-warn" ? 1 : 0; }

function Num({ v, cls }) {
  return <span className={"a-num " + cls}>{v == null ? "-" : v}</span>;
}

function PageHealth() {
  const [data, setData] = useState(undefined);
  const [err, setErr] = useState(null);
  const [sort, setSort] = useState("issues");

  const load = useCallback(() => {
    setData(undefined); setErr(null);
    /* no-store because the point of this tab is to reflect the audit you just
       ran, and a cached copy would quietly show you the previous one. */
    fetch("../content/page-audit.json", { cache: "no-store" })
      .then((r) => { if (!r.ok) throw new Error("http-" + r.status); return r.json(); })
      .then((d) => // audit-pages.py nests every page under a "pages" key. Reading the
        // envelope instead made all 36 pages show as "not crawled", and the
        // literal key "pages" rendered as a bogus 37th row.
        setData(d && typeof d === "object" ? (d.pages || d) : {}))
      .catch((e) => { setErr(String(e.message || e)); setData(null); });
  }, []);
  useEffect(load, [load]);

  if (data === undefined) {
    return <div className="a-wrap a-main"><div className="a-empty">Reading the audit file...</div></div>;
  }

  if (data === null) {
    return (
      <div className="a-wrap a-main">
        <h1 className="a-h">Pages</h1>
        <p className="a-sub">Word count, headings, schema and alt text for every page.</p>
        <div className="a-empty">
          <b>No audit file yet</b>
          This tab reads <code>content/page-audit.json</code>, which is generated by
          running <code>python3 audit-pages.py</code> from the project root. It is not
          committed and nothing produces it automatically, so if you have never run
          the script the file does not exist.
          <div style={{ marginTop: 14 }}>
            <button className="a-btn" onClick={load}>Check again</button>
          </div>
          <div className="a-when" style={{ marginTop: 10 }}>Fetch said: {err || "not found"}</div>
        </div>
      </div>
    );
  }

  /* Pages the audit does not mention still get a row, because a page missing
     from the report is worth seeing rather than hiding. They sort last under
     worst-first though: "the audit did not cover this" is one fact about the
     audit repeated N times, not N findings about N pages, and letting it float
     to the top would bury the real ones on a partial run. */
  const keys = SITE_PAGES.concat(Object.keys(data).filter((k) => SITE_PAGES.indexOf(k) < 0));

  const rows = keys.map((p) => {
    const a = data[p];
    if (!a) return { page: p, missing: true, score: -1 };
    const schema = Array.isArray(a.schemaTypes) ? a.schemaTypes : [];
    const f = {
      title: fTitle(a.titleLen || 0),
      desc: fDesc(a.descLen || 0),
      h1: fH1(a.h1 == null ? 0 : a.h1),
      words: fWords(a.words || 0),
      schema: fSchema(schema),
      alt: fAlt(a.imagesMissingAlt || 0)
    };
    const score = Object.keys(f).reduce((n, k) => n + weight(f[k]), 0);
    return { page: p, a: a, schema: schema, f: f, score: score };
  });

  const sorted = rows.slice().sort((x, y) =>
    sort === "issues" ? y.score - x.score || x.page.localeCompare(y.page) : x.page.localeCompare(y.page));

  const audited = rows.filter((r) => !r.missing);
  const clean = audited.filter((r) => r.score === 0).length;
  const thin = audited.filter((r) => (r.a.words || 0) < 300).length;
  const noSchema = audited.filter((r) => !r.schema.length).length;
  const altGaps = audited.reduce((n, r) => n + (r.a.imagesMissingAlt || 0), 0);

  return (
    <div className="a-wrap a-main">
      <h1 className="a-h">Pages</h1>
      <p className="a-sub">Word count, headings, schema and alt text for every page at the site root.</p>

      <div className="a-kpis">
        <div className="a-kpi"><div className="a-kpi__l">Audited</div><div className="a-kpi__v">{audited.length}</div></div>
        <div className="a-kpi"><div className="a-kpi__l">Clean</div><div className="a-kpi__v">{clean}</div></div>
        <div className="a-kpi"><div className="a-kpi__l">Thin</div><div className="a-kpi__v">{thin}</div></div>
        <div className="a-kpi"><div className="a-kpi__l">No schema</div><div className="a-kpi__v">{noSchema}</div></div>
        <div className="a-kpi"><div className="a-kpi__l">Images no alt</div><div className="a-kpi__v">{altGaps}</div></div>
      </div>

      <div className="a-bar">
        <span className="a-when">
          Amber is worth a look, red is worth fixing. Read from
          <code> content/page-audit.json</code>, regenerated by <code>python3 audit-pages.py</code>.
        </span>
        {["issues", "a to z"].map((s) => (
          <button key={s} className={"a-chip" + (sort === s ? " is-on" : "")}
                  onClick={() => setSort(s)}>{s === "issues" ? "Worst first" : "A to Z"}</button>
        ))}
        <button className="a-btn" onClick={load}>Reload audit</button>
      </div>

      <div className="a-tablewrap">
        <table className="a-table">
          <thead><tr>
            <th>Page</th><th>Words</th><th>H1</th><th>Title</th><th>Desc</th>
            <th>Schema</th><th>Links</th><th>Images</th><th>No alt</th>
          </tr></thead>
          <tbody>
            {sorted.map((r) => (
              r.missing ? (
                <tr key={r.page}>
                  <td><b>{r.page}</b></td>
                  <td colSpan={8} className="a-none">not in the audit file, so it was not crawled</td>
                </tr>
              ) : (
                <tr key={r.page}>
                  <td><b>{r.page}</b></td>
                  <td><Num v={r.a.words} cls={r.f.words} /></td>
                  <td><Num v={r.a.h1} cls={r.f.h1} /></td>
                  <td><Num v={r.a.titleLen} cls={r.f.title} /></td>
                  <td><Num v={r.a.descLen} cls={r.f.desc} /></td>
                  <td>
                    {r.schema.length
                      ? <div className="a-tags">{r.schema.map((t) => <span key={t}>{t}</span>)}</div>
                      : <span className="a-num is-warn">none</span>}
                  </td>
                  <td><Num v={r.a.internalLinks} cls="is-ok" /></td>
                  <td><Num v={r.a.images} cls="is-ok" /></td>
                  <td><Num v={r.a.imagesMissingAlt} cls={r.f.alt} /></td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---- Content ------------------------------------------------------- */
/* Exactly the tables home26/showcase.jsx reads, with the exact field names it
   maps, so what this page tells you to build is what the site actually consumes.
   Partners is deliberately absent: each partner mark is an inline SVG in
   home26/partners.jsx, so it lives in code rather than in a row. */
const CMS_TABLES = [
  { t: "CaseStudies", h: "Case studies", d: "The brand portfolio grid on the homepage. One row per case study.",
    fields: ["brand", "category", "tag", "metric", "sub", "services", "cover", "url", "order"] },
  { t: "Creative", h: "Creative & UGC", d: "Every asset in the creative grid. Format drives the aspect ratio it renders at.",
    fields: ["brand", "handle", "category", "format (reel|feed|square|wide)", "caption", "image", "order"] },
];

/* A table that exists but holds nothing is a normal starting state, not an
   error, so the two are reported differently. */
function rowLabel(v) {
  if (v === undefined) return "checking...";
  if (typeof v === "number") return v === 0 ? "empty, site uses built-in copy" : v;
  if (v === "airtable-404") return "table not created yet";
  return "could not read";
}

function Content() {
  const [counts, setCounts] = useState({});
  useEffect(() => {
    CMS_TABLES.forEach((c) => {
      window.MMCData.countRows(c.t)
        .then((n) => setCounts((x) => Object.assign({}, x, { [c.t]: n })))
        .catch((e) => setCounts((x) => Object.assign({}, x, { [c.t]: String(e.message || e) })));
    });
  }, []);
  return (
    <div className="a-wrap a-main">
      <h1 className="a-h">Content</h1>
      <p className="a-sub">
        Editing happens in Airtable, which your team already knows how to use. The
        homepage reads these tables on load and falls back to the copy baked into the
        page whenever Airtable is empty, slow or unreachable, so a visitor never sees a
        blank section. Rows sort by <b>order</b> when you set it. Leave the tables empty
        and the site keeps showing what it shows today.
      </p>
      <div className="a-warn">
        <b>Reads need their own token</b>
        The token you pasted stays in this browser, so the public site cannot use it.
        To publish from Airtable, create a second, read-only token limited to these two
        tables and set <code>publicToken</code> and <code>publicBase</code> in <code>admin/mmc-data.js</code>.
        That one is safe to ship because it can only read this content.
      </div>
      <div className="a-cms">
        {CMS_TABLES.map((c) => (
          <div className="a-card" key={c.t}>
            <h3>{c.h}</h3>
            <p>{c.d}</p>
            <div className="a-kv"><span>Table</span><span>{c.t}</span></div>
            <div className="a-kv"><span>Rows found</span>
              <span>{rowLabel(counts[c.t])}</span></div>
            <div className="a-fields">
              {c.fields.map((f) => <span key={f}>{f}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Shell ---------------------------------------------------------- */
const TABS = [
  ["leads", "Leads"], ["seo", "SEO"], ["jobs", "Jobs"],
  ["apps", "Applications"], ["pages", "Pages"], ["content", "Content"]
];

function AdminApp() {
  const [ready, setReady] = useState(window.MMCData.hasCreds());
  /* Six tabs is enough that landing back on Leads after every reload is a tax.
     The choice is a UI preference, so localStorage is the right home for it. */
  const [tab, setTab] = useState(() => localStorage.getItem(LS_TAB) || "leads");
  const go = (t) => { setTab(t); localStorage.setItem(LS_TAB, t); };

  const body = () => {
    if (!ready) return <Setup onSaved={() => setReady(true)} />;
    if (tab === "seo") return <Seo />;
    if (tab === "jobs") return <Jobs />;
    if (tab === "apps") return <Applications />;
    if (tab === "pages") return <PageHealth />;
    if (tab === "content") return <Content />;
    return <Leads />;
  };

  return (
    <>
      <header className="a-top">
        <div className="a-wrap a-top__in">
          <img className="a-top__logo" src="../assets/logo-white-yellow.png" alt="MMC" />
          <span className="a-top__t">Dashboard</span>
          {ready && (
            <nav className="a-top__nav">
              {TABS.map(([id, label]) => (
                <button key={id} className={"a-tab" + (tab === id ? " is-on" : "")}
                        onClick={() => go(id)}>{label}</button>
              ))}
            </nav>
          )}
          <div className="a-top__r">
            <a className="a-btn a-btn--ghost" href="../index.html">View site</a>
            {ready && <button className="a-btn a-btn--ghost"
              onClick={() => { window.MMCData.clearCreds(); setReady(false); }}>Disconnect</button>}
          </div>
        </div>
      </header>
      {body()}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<AdminApp />);
