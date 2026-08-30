# Monday Marketing Company: the site, and how to run it

A static site. HTML plus JSX that React transpiles in the browser, with a
Python build step that turns it into something a crawler can read.

---

## Run it locally

```bash
./serve.sh          # dev server on :8080 + Chrome with the debug port open
open http://localhost:8080/
```

`serve.sh` is idempotent: run it as often as you like, it will not start a
second copy of anything.

---

## Deploy checklist

**Run `./build.sh` before every deploy.** Nothing else in this document matters
as much as that line.

```bash
./build.sh          # apply SEO, stamp schema, pre-render, audit
./build.sh --check  # show what would change, write nothing
```

It runs four steps in order:

| Step | Script | What it does |
|---|---|---|
| 1 | `apply-seo.py` | Writes titles, descriptions, OG tags and canonicals from `content/seo.json` into each page's `<head>` |
| 2 | `apply-schema.py` | Stamps JSON-LD from `content/schema.json` between `<!--schema-->` markers |
| 3 | `prerender.py` | Loads each page in Chrome and bakes the rendered DOM back into `<div id="root">` |
| 4 | `audit-pages.py` | Writes `content/page-audit.json`, which the dashboard's Pages tab reads |

### Why pre-rendering exists

Every page ships as `<div id="root"></div>` plus scripts. Content only appears
after Babel transpiles the JSX in the visitor's browser.

Googlebot renders JavaScript, so it copes. **ChatGPT, Perplexity and Claude
largely do not.** Before pre-rendering, those answer engines fetched the site
and saw an empty body on all 36 pages. There is now about 56,000 words of
crawlable text in the HTML itself.

The bake is idempotent: it replaces what is between the `<!--prerender-->`
markers rather than nesting a second copy. **Never hand-edit inside those
markers.** Edit the JSX and re-run.

---

## The dashboard

`/admin/`: noindex, and disallowed in `robots.txt`.

Paste an Airtable personal access token and Base ID once. The token is stored
only in your own browser's localStorage: it is never committed and never served
to a visitor. That is why you paste it rather than it living in a file.

| Tab | What it is for |
|---|---|
| **Leads** | Every enquiry from the audit modal, contact page and calculators. Status, owner, notes, CSV export |
| **SEO** | Title and description per page, with a live SERP preview and length warnings. **Staging only:** hit Export JSON, save it as `content/seo.json`, then run `./build.sh` |
| **Jobs** | Create, edit and close roles. The Careers page reads this live |
| **Applications** | Job applicants with a five-stage workflow, CV and portfolio links, CSV export |
| **Pages** | Health of every page: word count, H1s, title and description length, schema, missing alt text |
| **Content** | Case studies and creative for the homepage grids |

### Airtable tables it expects

- **Leads**: `name, email, brand, url, revenue, channel, challenge, source, page, submittedAt, status, owner, notes`
- **SEO**: `page, title, description, canonical, ogTitle, ogDescription, focusKeyword, noindex`
- **Jobs**: `slug, title, department, location, type, workMode, band, summary, responsibilities, requirements, postedAt, validThrough, status`
- **Applications**: `name, email, phone, role, cvUrl, portfolioUrl, note, submittedAt, status, owner, adminNotes`
- **CaseStudies**: `brand, category, tag, metric, sub, services, cover, url, order`
- **Creative**: `brand, handle, category, format, caption, image, order`

Every table is optional. With none of them, the site renders the copy baked into
the pages. Nothing goes blank because Airtable is slow or down.

---

## Where leads and applications go

Set one value, before `assets/mmc-forms.js` loads:

```html
<script>window.MMC_FORM_ENDPOINT = "https://hook.eu2.make.com/YOURID";</script>
```

Every form on the site posts one JSON record there. Point the webhook at your
Airtable Leads table.

Until it is set, submissions open a pre-filled email to
`sales-in@mondaymarketing.company`, so nothing is lost in the meantime.

Writes go through a webhook rather than straight to Airtable on purpose: a
static site cannot hold a write key without shipping it to every visitor.

**Job applications carry the actual CV.** The file is read in the browser and
travels as base64 (`cvBase64`, `cvName`, `cvType`, `cvSize`), capped at 4MB,
with a link field as the alternative for anything larger. Your webhook decodes
and stores it. Before this, only the filename was transmitted and the document
was discarded.

---

## Layout: one spine

Two tokens in `design-system/colors_and_type.css` govern every horizontal edge:

```css
--shell-gutter   /* where a card or the nav pill sits, inset from the viewport */
--shell-pad      /* where TEXT starts: exactly two gutters */
--shell-max      /* 2160px, so a 4K monitor does not stretch a card grid */
```

The nav, the hero card, every section container and the footer resolve to the
same left and right edge. If you add a section, use `.container`, `.n-wrap` or
`.tl-wrap` and it will line up. **Never introduce a second page width.** The
site previously ran five of them, and the nav sat 284px inside the sections at
1920px.

Line length is capped separately by `--measure`, because full-bleed structure
must not mean full-bleed prose.

---

## Conventions worth knowing

- **No em dashes.** Deliberate, and `apply-seo.py` refuses to write one.
- **Colour and type come from tokens.** `--mmc-blue`, `--mmc-yellow`,
  `--mmc-ink`, plus `--mmc-*-rgb` triples for translucent tints. Roughly 2,000
  hard-coded literals were migrated onto these; do not add more.
- **The secondary-page hero** is `assets/page-hero.css`. A page opts in with
  `<section className="page-hero xx-hero" data-wm="Word">`. Calculators use
  `page-hero--compact` so the instrument stays above the fold.
- **Specificity:** each page's own `<style>` block loads *after* the shared
  stylesheets, so an override must be written as `section.page-hero .thing` to
  actually win.
- **Never invent client results.** Thirteen brands in the client book have a
  headline metric and no narrative. Only DeoBar has a written case study.

---

## Known gaps

- **Case studies.** Twelve of thirteen brands have a metric and no story, so
  their cards deep-link to the Our Work grid rather than pretending a study
  exists. Write the content and they can become real pages.
- **Two advertised roles have no posting.** `ai-workflow-engineer` and
  `account-director` appear on Careers but have no entry in `job/JdPage.jsx`.
  They now show an honest "this role isn't open" page instead of silently
  serving the wrong job. Add them via the Jobs tab.
- **Client logos** in `*Logos.jsx` are hand-drawn approximations of real
  third-party wordmarks in typefaces the site never loads. Ask the clients for
  their vectors, or set the names in brand type instead.
- **Off-page SEO** cannot be done from this repo. Backlinks, PR, directory
  citations and Google Business Profile are all external work. What is here is
  the on-site foundation they need: entity-consistent schema, `llms.txt`, clean
  canonicals and a linkable free-tools surface.

---

## File map

```
build.sh / serve.sh        one command each: build, and run locally
prerender.py               bakes the rendered DOM into each page
apply-seo.py               content/seo.json    -> page <head>
apply-schema.py            content/schema.json -> page <head>
audit-pages.py             page health -> content/page-audit.json
llms.txt                   plain-language company summary for answer engines

admin/                     the dashboard (noindex)
assets/page-hero.css       the shared secondary-page hero
assets/mmc-forms.js        every form on the site posts through here
design-system/             colour, type and layout tokens
home26/                    the homepage
tools/                     six calculators, the hub and the glossary
content/                   CMS exports the build step consumes
```

## Portfolio ordering by popularity

Client cards on the homepage and Our Work re-order so the most-opened brand
leads. Implemented in `assets/mmc-popularity.js`.

It works in two modes and prefers the better one automatically:

**Global** — everyone's clicks counted together. This is the version worth
having. It needs two things, neither of which is configured yet:

1. `window.MMC_FORM_ENDPOINT` set, so a click can be written server-side. It is
   the same webhook the lead forms use; point it at a Make/Zapier scenario that
   appends to an Airtable table named `Popularity` with fields `key` and
   `clicks`.
2. `publicToken` and `publicBase` in `admin/mmc-data.js`, so the counts can be
   read back.

When both exist the ordering switches over on its own. No code change.

**Local** — the visitor's own clicks, in their browser. This is what runs today
with no configuration. Be clear on what it does: it promotes the card that
visitor already opened, which is arguably the one they least need shown again.
It is a graceful fallback, not the goal.

Either way every click pushes a `portfolio_open` event to `dataLayer`, so GA4
records it through GTM (`GTM-KC22WQZ7`) from today. The real popularity data
starts accumulating in analytics even while the ordering is still local, which
means switching to global mode later has history behind it.

Notes:

- Ordering is applied **after mount**, never during. Re-sorting under a pointer
  mid-hover would move a card out from under the cursor, and the pre-rendered
  HTML ships in the authored order, which is what crawlers see.
- The sort is **stable**: brands nobody has opened keep the order they are
  authored in rather than being shuffled by tie-breaking.
- It re-ranks when the source list changes, because the CMS hook swaps the
  baked-in fallback for Airtable rows shortly after mount.
- `window.MMCPop.reset()` clears this browser's tally, useful when testing.
