# MMC Website: fixes applied & what's left

This build is the reviewed site with the concrete errors fixed. Below is what
changed and the few things that need **your** input to finish.

## Fixed in this build

1. **Forms now actually send.** The brand-audit modal, contact brief, and job
   application previously showed a "thank you" but sent nothing. Every lead
   was lost. All three now submit through `assets/mmc-forms.js`.
   - Until you set an endpoint (see below), a submission opens a pre-filled
     email to `sales-in@mondaymarketing.company` so no lead is lost.

2. **Production React.** Every page now loads `react.production.min.js` /
   `react-dom.production.min.js` instead of the slow development builds.
   (Stale Subresource-Integrity hashes for the old files were removed.)

3. **One canonical homepage.** The flagship scroll-snap page is now
   `index.html`, and all nav/footer/menu "home" links point to it. The old
   `Hero & Menu.html` (a broken URL with a space and ampersand) was retired;
   its content is preserved, unlinked, as `home-classic.html`.
   - To switch back to the classic homepage, copy `home-classic.html` over
     `index.html`.

4. **SEO + social sharing.** Added a meta description to the homepage and
   Open Graph + Twitter Card + canonical tags to every page, so links shared
   on WhatsApp/LinkedIn/etc. now show a title, description, and image.
   Added `robots.txt` and `sitemap.xml`.

5. **Lighter fonts.** All fonts converted TTF → WOFF2 (~2.2 MB → ~0.8 MB,
   64% smaller). CSS loads WOFF2 first with TTF as a fallback.

6. **Removed editor artifacts** from the deployable build: the "Tweaks" panel,
   design iteration screenshots, and uploaded references. (The `<image-slot>`
   image data in `.image-slots.state.json` was kept, the homepage images
   read from it.)

7. **Favicon** standardized to `assets/logo-yellow.png` across all pages.


## Lead dashboard and CMS (`/admin/`)

Open `/admin/` on the site. It is `noindex` and blocked in `robots.txt`, so it
never shows up in search.

### 1. Collect leads

Every form on the site (audit modal, contact brief, job application, and the
calculators) posts one JSON record to a single webhook. Set it once, before
`assets/mmc-forms.js` loads on each page:

```html
<script>window.MMC_FORM_ENDPOINT = "https://hook.eu2.make.com/YOURID";</script>
```

Point that webhook at an Airtable "Leads" table with these fields:

`name, email, brand, url, revenue, channel, challenge, source, page,
submittedAt, status, owner, notes`

`status` should be a single-select of `New / Working / Won / Lost`.

Until the endpoint is set, submissions fall back to a pre-filled email to
`sales-in@mondaymarketing.company`, so no lead is lost in the meantime.

Writes go through the webhook rather than straight to Airtable on purpose: a
static site cannot hold a write key without shipping it to every visitor.

### 2. Work the leads

Open `/admin/` and paste an Airtable personal access token plus your Base ID.
Create the token at `airtable.com/create/tokens` with `data.records:read` and
`data.records:write`, limited to this one base.

That token is stored only in your own browser's localStorage. It is never
written into a file and never served to a visitor, which is why you paste it
instead of it being committed.

The Leads tab gives you counts by status, search across name / email / brand /
challenge, status filters, inline status / owner / notes editing that saves
straight back to Airtable, and a CSV export.

### 3. Publish content from Airtable (optional)

The homepage case-study grid and creative grid can read from Airtable instead
of the copy baked into the page. Create either or both tables:

- **CaseStudies**: `brand, category, tag, metric, sub, services, cover, url, order`
- **Creative**: `brand, handle, category, format, caption, image, order`

`format` is one of `reel | feed | square | wide` and decides the aspect ratio.
`services` accepts a comma or pipe separated list. `order` sorts the grid.

Then create a **second, read-only** token limited to those two tables and set
`publicToken` and `publicBase` in `admin/mmc-data.js`. That one is safe to ship
because it can only read published content.

Leave all of this unset and the site renders exactly what it renders today. If
Airtable is empty, slow or down, each section falls back to its built-in copy,
so a visitor never sees a blank band.

Partner logos are not in the CMS: each one is an inline SVG in
`home26/partners.jsx`, so it lives in code rather than in a row.

## You need to do (can't be done without your accounts)

- **Point leads at your inbox/CRM.** Add this one line to each page's `<head>`
  (or just to the pages with forms: Contact, Job Detail, and any page using
  the audit modal), before `assets/mmc-forms.js` loads:
  ```html
  <script>window.MMC_FORM_ENDPOINT = "https://formspree.io/f/YOURID";</script>
  ```
  Works with Formspree, Getform, Web3Forms, a Make.com webhook, or your own API
  (it POSTs JSON). Note: file uploads (CV) send the filename only over the
  email fallback; a real endpoint with multipart is needed for the actual file.

- **Analytics, already installed from your live site.** Google Tag Manager
  (`GTM-KC22WQZ7`) and the Meta Pixel (`24125282267174885`) are now on every
  page, pulled from mondaymarketing.company. GA4 almost certainly loads through
  your GTM container, so it should start reporting once this build is live on
  the domain.
  - **One thing to check:** if your GTM container *also* fires the Meta Pixel,
    you'll now be counting it twice (once via GTM, once via the hardcoded pixel
    base code). If so, remove the `<!-- Meta Pixel Code -->` block from the
    pages and let GTM handle it, or leave the pixel and remove it from GTM.

## Recommended next (larger, separate effort)

- **Replace in-browser Babel with a real build step.** Pages still transpile
  JSX in the browser via `@babel/standalone`, which is slow and not meant for
  production. Moving to Vite or Next.js (Next would also give you server-side
  rendering, fixing the fact that crawlers currently see an empty page on the
  JS-rendered homepage) is the biggest remaining win.
- Convert the `<image-slot>` editor placeholders to plain hosted `<img>` tags
  as part of that migration, so the 700 KB sidecar JSON isn't needed.

## How to preview the real site

Because pages load React/Babel/GSAP from a CDN and fetch images over HTTP, the
site must be served over `http://`, not opened as a file. Two quick ways:

**Locally (30 seconds):**
```bash
cd MMC-Website-Fixed
python3 -m http.server 8080
# then open http://localhost:8080/ in your browser
```

**Deploy a free preview URL:** drag the unzipped folder onto Netlify Drop
(app.netlify.com/drop) or Cloudflare Pages, you'll get a public link instantly.

> The `mmc-home-preview.html` shown in chat is an approximate single-file
> snapshot of the homepage (fonts and a couple of behaviours may differ). Use
> the local server or a deploy for the true experience.
