# V2 case-study reference teardown (internal)

Reference: https://www.3mindsdigital.com/case-study/trident, compared with /case-study/speedo (same site, same template).
Fetched raw with curl; both pages are server-rendered Next.js (no JSON needed). Raw HTML and body extracts live in the session scratchpad (ref3m/).
Scope of use: layout, section order, pacing and presentation style only. Not their colours, fonts, copy or imagery. Their text is not reproduced here.

## 1. Section order, top to bottom (both pages are the same template)

| # | Section | Layout |
|---|---------|--------|
| 0 | Fixed nav | Transparent over hero, white once scrolled |
| 1 | Hero | One large banner image inside the 1280px container, 5px radius, pulled up under the nav (negative top margin). Text is overlaid on the image, left-aligned: small category line, H1 (brand), white uppercase letter-spaced chips for services, then a big tagline H2 (about 48px/62px, max 600px wide). A second hero is used under 640px: a full-viewport-height cover image with the same stack of text |
| 2 | Pull statement | One centred sentence, 26px medium, max 880px, framed as a quote. A single-line summary, no image |
| 3 | Team | White card. Left third: "Our Team" (light weight with bold word). Right two-thirds: 3-column grid of role label (bold, small) over person name (large, light). Seven names on Trident |
| 4 | Overview | Heading left (48px light, bold keyword), body paragraph about two-thirds width at 18px/30px, then a full-width image below at 34px radius |
| 5 | Challenge / problem | Same shape as 4: heading, paragraph, wide rounded image |
| 6 to 11 | Work chapters | The same heading + paragraph + wide image block repeated: branding, UX strategy, UI design, development, content, and Impact on Trident; strategy, competitor analysis, implementation, A+ creatives, infographics, design stack on Speedo. Heading pattern is "bold keyword, light descriptor" |
| 12 | Impact / results | Same shape, but the paragraph is a short list of three headline results, each a bold number-led line with a one-sentence explanation (on Speedo) or a closing paragraph (on Trident) |
| 13 | Conclusion | One paragraph, no image |
| 14 | Next work | Centred H3 (36px) with a semibold lead and an italic serif accent. Below it a Swiper carousel of eight case-study cards (aspect 898:538 image, service chips that link to service pages, title, two-line blurb, full-width "View Project" button), prev/next arrows |
| 15 | Contact form + footer | Form band, then a dark footer |

## 2. Layout vocabulary

- Container: max 1280px, 16 to 20px gutters. Almost everything is one column at a time; there are no sticky panels, no parallax, no overlapping layers and no full-bleed bands other than the mobile hero.
- Rhythm: a chapter is about 72px (phone) to 140px (desktop) of space above, heading, paragraph, then a wide image. Each chapter is roughly one viewport tall, so the page reads as a slow vertical scroll of "paragraph, picture, paragraph, picture".
- Type scale: H1 24 to 36px bold; tagline 30 to 48px semibold; chapter headings 24 (phone) to 48px light with a bold keyword; body 14 to 18px at 24 to 30px line height; chips 12px, 1.8px tracking, uppercase, bold. Headings are light weight with one bold word, a deliberate "quiet then loud" contrast.
- Imagery: every chapter image is a designed composite (device mockups, wireframes, brand boards, research boards) exported at desktop and mobile versions, swapped by breakpoint (not responsive crops). Rounded 34px corners on desktop, square and edge-to-edge on phones.
- Motion: essentially none on the page itself. No scroll reveals, no sticky, no video. The only interaction is the Swiper carousel and the hover state on cards (the info panel under the image).
- Length: about 10 chapters and 25 to 30 KB of markup; on a desktop that is roughly 8 to 10 screens, on a phone roughly 15.
- Ending: next work carousel (browse all, no single "next" pager), then the contact form. There is no testimonial block and no FAQ.
- Proof: results appear as bold numeric lines on Speedo (three results). Trident has none, just an impact paragraph.

## 3. What we take, what we change

Took: the hero-with-chips-and-tagline composition, the one-line pull statement under the hero, the facts-then-story order, the quiet-light/bold-keyword heading pattern (as a Raleway weight contrast plus italic accent), big rounded image per chapter with generous spacing, a "next work" ending with large thumbnails before the contact CTA.

Added for MMC (their page has none of these): sticky captions beside tall crops, alternating layouts per brand type, a small "how it works together" diagram, subtle scroll reveals with reduced-motion support, a true previous/next pager, a results slot that only renders real, agreed numbers, an FAQ with FAQPage markup, and an honest line wherever the reference would show invented-looking metrics.

Not taken: their results lists (we show numbers only when the client has agreed them), their team grid (renders only if named people exist in the data), their colours, fonts, words and pictures.
