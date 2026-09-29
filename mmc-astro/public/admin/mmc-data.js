/* admin/mmc-data.js - the data layer shared by the public site and the dashboard.

   The public site is static, so there is no server to hold a secret. That
   shapes the design:

   READS  (public content: case studies, creative, partners) use a read-only
          Airtable token that is safe to ship, or fall back to the values
          baked into the page if Airtable is unreachable. The site never
          depends on Airtable being up.

   WRITES (new leads) never touch Airtable from the browser. Forms post to a
          webhook (Make.com, Zapier, Formspree) which writes server-side, so
          no write credential is ever exposed.

   ADMIN  reads and updates leads with a personal access token that the user
          pastes once and which is stored only in their own localStorage. It
          is never committed to a file and never served to a visitor. */

(function () {
  var LS_TOKEN = "mmc.airtable.pat";
  var LS_BASE  = "mmc.airtable.base";
  var API      = "https://api.airtable.com/v0";

  var CFG = {
    // Safe to ship: read-only, public content tables only. Leave blank to use
    // the copy baked into the pages.
    publicToken: "",
    publicBase:  "",
    tables: {
      leads: "Leads", cases: "CaseStudies", creative: "Creative", partners: "Partners",
      seo: "SEO", jobs: "Jobs", applications: "Applications"
    },
    // Server-side webhook that writes leads. No credential in the browser.
    leadWebhook: (typeof window !== "undefined" && window.MMC_FORM_ENDPOINT) || ""
  };

  function creds(admin) {
    if (admin) {
      return { token: localStorage.getItem(LS_TOKEN) || "", base: localStorage.getItem(LS_BASE) || "" };
    }
    return { token: CFG.publicToken, base: CFG.publicBase };
  }

  function req(path, opts, admin) {
    var c = creds(admin);
    if (!c.token || !c.base) return Promise.reject(new Error("not-configured"));
    opts = opts || {};
    opts.headers = Object.assign({
      Authorization: "Bearer " + c.token,
      "Content-Type": "application/json"
    }, opts.headers || {});
    return fetch(API + "/" + c.base + "/" + path, opts).then(function (r) {
      if (r.status === 401 || r.status === 403) throw new Error("unauthorised");
      if (!r.ok) throw new Error("airtable-" + r.status);
      return r.json();
    });
  }

  /* Every admin list flattens the same way, so the shape the dashboard sees is
     always { _id, ...fields } and never Airtable's nested record envelope. */
  function rows(d) {
    return (d.records || []).map(function (r) {
      return Object.assign({ _id: r.id }, r.fields);
    });
  }

  /* Sorting is done by Airtable rather than in the browser so that the first
     hundred rows returned are the newest hundred, not an arbitrary hundred. */
  function newestFirst(field) {
    return "?pageSize=100&sort%5B0%5D%5Bfield%5D=" + encodeURIComponent(field) +
           "&sort%5B0%5D%5Bdirection%5D=desc";
  }

  /* ---- Public content ------------------------------------------------ */
  var cache = {};
  function content(table, fallback) {
    if (cache[table]) return Promise.resolve(cache[table]);
    return req(encodeURIComponent(table) + "?pageSize=100")
      .then(function (d) {
        var list = rows(d);
        cache[table] = list.length ? list : fallback;
        return cache[table];
      })
      .catch(function () { cache[table] = fallback; return fallback; });
  }

  /* ---- Leads --------------------------------------------------------- */
  function submitLead(payload) {
    var body = Object.assign({
      submittedAt: new Date().toISOString(),
      page: location.pathname,
      referrer: document.referrer || "",
      status: "New"
    }, payload);

    if (!CFG.leadWebhook) return Promise.resolve({ ok: false, reason: "no-endpoint", body: body });
    return fetch(CFG.leadWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body)
    }).then(function (r) { return { ok: r.ok, status: r.status, body: body }; })
      .catch(function (e) { return { ok: false, reason: String(e), body: body }; });
  }


  /* Row count for one content table, using the admin credentials. Separate from
     content() because that one folds "empty" and "unreachable" into the same
     fallback, and the dashboard needs to tell those apart. */
  function countRows(table) {
    return req(encodeURIComponent(table) + "?pageSize=100&fields%5B%5D=", {}, true)
      .then(function (d) { return (d.records || []).length; });
  }

  function listLeads(view) {
    var q = newestFirst("submittedAt");
    if (view) q += "&view=" + encodeURIComponent(view);
    return req(encodeURIComponent(CFG.tables.leads) + q, {}, true).then(rows);
  }

  function updateLead(id, fields) {
    return req(encodeURIComponent(CFG.tables.leads) + "/" + id,
      { method: "PATCH", body: JSON.stringify({ fields: fields }) }, true);
  }

  /* ---- SEO ----------------------------------------------------------- */
  /* One row per page file, keyed by a "page" field holding the filename. The
     list of pages comes from the repo, not from Airtable, so a page nobody has
     edited yet has no row at all and the first save has to create one. */
  function listSeo() {
    return req(encodeURIComponent(CFG.tables.seo) + "?pageSize=100", {}, true).then(rows);
  }

  /* Pass the record id to patch an existing row, or null to create. Both paths
     resolve to the saved Airtable record, so the caller can keep the new id and
     patch from then on instead of creating a duplicate page row on save two. */
  function upsertSeo(id, fields) {
    var t = encodeURIComponent(CFG.tables.seo);
    if (id) return req(t + "/" + id, { method: "PATCH", body: JSON.stringify({ fields: fields }) }, true);
    return req(t, { method: "POST", body: JSON.stringify({ fields: fields }) }, true);
  }

  /* ---- Jobs ---------------------------------------------------------- */
  function listJobs() {
    return req(encodeURIComponent(CFG.tables.jobs) + newestFirst("postedAt"), {}, true).then(rows);
  }

  function upsertJob(id, fields) {
    var t = encodeURIComponent(CFG.tables.jobs);
    if (id) return req(t + "/" + id, { method: "PATCH", body: JSON.stringify({ fields: fields }) }, true);
    return req(t, { method: "POST", body: JSON.stringify({ fields: fields }) }, true);
  }

  /* Closing is a status change rather than a delete. A filled role still has to
     resolve for anyone holding an old link, and the applications that point at
     it would otherwise name a role that no longer exists. */
  function closeJob(id) {
    return upsertJob(id, { status: "Closed" });
  }

  /* ---- Applications -------------------------------------------------- */
  function listApplications() {
    return req(encodeURIComponent(CFG.tables.applications) + newestFirst("submittedAt"), {}, true).then(rows);
  }

  function updateApplication(id, fields) {
    return req(encodeURIComponent(CFG.tables.applications) + "/" + id,
      { method: "PATCH", body: JSON.stringify({ fields: fields }) }, true);
  }

  function saveCreds(token, base) {
    localStorage.setItem(LS_TOKEN, token || "");
    localStorage.setItem(LS_BASE, base || "");
  }
  function clearCreds() {
    localStorage.removeItem(LS_TOKEN);
    localStorage.removeItem(LS_BASE);
  }
  function hasCreds() {
    var c = creds(true);
    return !!(c.token && c.base);
  }

  window.MMCData = {
    CFG: CFG, content: content, submitLead: submitLead,
    listLeads: listLeads, updateLead: updateLead, countRows: countRows,
    listSeo: listSeo, upsertSeo: upsertSeo,
    listJobs: listJobs, upsertJob: upsertJob, closeJob: closeJob,
    listApplications: listApplications, updateApplication: updateApplication,
    saveCreds: saveCreds, clearCreds: clearCreds, hasCreds: hasCreds
  };
})();
