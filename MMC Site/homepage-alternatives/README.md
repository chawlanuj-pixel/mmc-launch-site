# Monday Marketing homepage alternatives

Two isolated, complete homepage proposals. The existing `index.html` and all shared components are unchanged.

- `../home-studio.html`: The Growth Studio. Deep-blue opening, photographic storytelling, staggered portfolio, service accordion and a horizontal process.
- `../home-editorial.html`: The Commercial Imagination. Paper canvas, oversized editorial opening, work-led presentation, alternating portfolio features and a commercial-principles chapter.

Both pages reuse Raleway/Nunito, brand color tokens, existing `n-btn` styles, actual client artwork and current site photography. Aggregate performance figures come from `home26/sections.jsx`; client-specific descriptions follow `content/clients.json`. No new client results or testimonials are invented.

## Regenerate

From the repository root:

```sh
node 'MMC Site/homepage-alternatives/build-shell.mjs'
python3 'MMC Site/homepage-alternatives/build-pages.py'
```

The shell build uses the existing esbuild/React/GSAP dependencies in `mmc-astro/node_modules`, bundling unchanged Nav, Menu, Footer, AuditModal and CookieBanner components. Static fallback navigation/footer markup is extracted verbatim from the current homepage. Page-specific styles are scoped to the new sections; shared stylesheets are not edited.

Serve `MMC Site` using the project's usual static server and open the two HTML files. A bottom-right review switch links them. These preview pages carry `noindex,nofollow` and are not added to the production sitemap or navigation.

## Verification

Checked: generated JavaScript syntax, a single H1 per page, unique IDs, image alt attributes, local assets and links, exact fallback navigation/footer equality, and all private-review Worker routes/assets. Native details accordions support keyboard interaction; responsive layouts are defined for desktop, tablet and mobile, with reduced-motion support.

Browser visual and interaction testing could not be performed because this session had no connected browser. Booking uses the site's existing Calendly integration and brief form; no lead submission was sent.

## Private review

- [Studio](https://monday-homepage-directions.chawlanuj.chatgpt.site/home-studio.html)
- [Editorial](https://monday-homepage-directions.chawlanuj.chatgpt.site/home-editorial.html)

Project: `appgprj_6abb63465c2081918b9211b250d6898d`

Private review source checkout: `/tmp/mmc-homepage-review`. Its standalone Worker serves a snapshot of these pages and their local assets. Non-preview navigation links lead to the existing Monday Marketing website. Edit these local source previews first, then refresh the review snapshot for another deployment.
