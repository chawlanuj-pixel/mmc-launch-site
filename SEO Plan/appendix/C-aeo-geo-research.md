# Workstream D: AEO, GEO and Brand Authority (MMC)
Research date / access date for all sources: 2026-09-28. Tools: WebSearch (US-located, so India SERPs and personalisation not reproduced) and WebFetch (returns model-summarised page text, not raw HTML, so schema on competitor pages could NOT be verified directly).

## 1. Official guidance: confirmed vs speculation

### Confirmed by the engine/vendor itself
| Topic | What is officially stated | Source (accessed 2026-09-28) |
|---|---|---|
| Google AI Overviews / AI Mode | No additional requirements or special optimisations. Page must be indexed and snippet-eligible. No new machine-readable files, AI text files, or special schema needed. Existing controls (nosnippet, data-nosnippet, max-snippet, noindex) govern AI features too. Google-Extended is a separate robots token for Gemini training/grounding, not Search. AI feature traffic is reported inside Search Console "Web" performance. | https://developers.google.com/search/docs/appearance/ai-features |
| Google spam policies | Scaled content abuse (many pages made mainly to manipulate rankings, incl. AI bulk generation, scraping, stitching sources with no added value). Site reputation abuse (third-party content on an established host to exploit its ranking signals). Link spam (buying/selling links for ranking, automated links, paid articles with optimised anchors; use rel=nofollow/sponsored for commercial links). Expired domain abuse. | https://developers.google.com/search/docs/essentials/spam-policies |
| llms.txt and Google | Per search-reported coverage of Google's June 2026 Search Central docs update ("Clarifying guidance on llms.txt files"): not needed, does not help or hurt, Search does not use it for AI features. Mueller earlier compared it to the keywords meta tag. Note: Lighthouse 13.3 has an experimental "Agentic Browsing" audit that checks for llms.txt, a different use case (agent readiness, not Search). I could not fetch the Google changelog page itself; this comes via Search Engine Journal https://www.searchenginejournal.com/googles-llms-txt-guidance-depends-on-which-product-you-ask/575431/ and Search Engine Land https://searchengineland.com/google-says-normal-seo-works-for-ranking-in-ai-overviews-and-llms-txt-wont-be-used-459422 . Verify against Google's docs changelog before quoting. |
| OpenAI crawlers | GPTBot = training (disallow to opt out; not used for search). OAI-SearchBot = ChatGPT search; must be allowed to appear in ChatGPT search answers; robots changes take ~24h. ChatGPT-User = user-initiated fetches; robots.txt may not apply. Each publishes IP JSON. | https://developers.openai.com/api/docs/bots |
| Perplexity crawlers | PerplexityBot = search indexing, not foundation-model training, respects robots.txt. Perplexity-User = user-initiated, generally ignores robots.txt. IP lists published. | https://docs.perplexity.ai/guides/bots |
| Bing / Microsoft | Per search-reported coverage, Bing rewrote its Webmaster Guidelines to add GEO / Copilot grounding, states GEO does not guarantee citations, and launched "AI Performance" report in Bing Webmaster Tools (public preview, Feb 2026). IndexNow recommended for freshness. Direct fetch of the guidelines page returned no body text, so unverified first-hand. Sources: https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a ; https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview ; https://www.searchenginejournal.com/bing-adds-geo-to-official-guidelines-expands-ai-abuse-definitions/568442/ |

### llms.txt: plain answer
- Google Search: officially not used (see above).
- OpenAI, Perplexity, Microsoft: I found NO official statement that any of them read or honour llms.txt. Absence of evidence, not confirmation of absence. Treat as optional, low-cost, zero-proven-benefit. MMC already has /llms.txt; keep it accurate, do not invest further or claim it drives visibility.
- Not fetched: Google's structured-data general guidelines page and helpful-content page (relied on the AI features page statement that structured data must match visible content).

### Industry speculation (not confirmed, do not build strategy on it)
Answer-first "chunking", entity-density tricks, citation-share percentages from GEO tool vendors, "Bing ranking drives ChatGPT citations", and claims that FAQ schema lifts AI citations. Several vendor blogs in results assert these; none is an engine statement.

## 2. MMC and peer observation

### MMC current SERP/brand presence (WebSearch, US, 2026-09-28)
- Branded queries return mondaymarketing.company (home and /performance-marketing/) and a LinkedIn company page. No Knowledge Panel visible from search text (panels are not observable via this tool; check manually in India).
- Name collision: monday.com, Monday Creative, Monday Digital, Marketing Monday Agency, mondaymarketing.io. A branded-entity problem: "Monday Marketing Company" is generic and confusable.
- LinkedIn page (fetched): 674 followers, founded 2022, 51-200 employees, HQ listed as North Wales, Pennsylvania, offices Thane and Indore. Description is generic full-service (SEO, ads, web, content, UI/UX) and does not lead with D2C/education/B2B. Align with site NAP and positioning.
- The live page fetched at /performance-marketing/ appears to be the OLD site: "10x Results Guaranteed", "Pay Per Result Model", "Best Performance Marketing Agency In Mumbai", "50+ brands". This conflicts with memory rule of no client counts and with safeguards below; make sure the launch replaces/redirects it and the guarantee language is retired.
- No Clutch, GoodFirms, Sortlist, press or third-party review mention of MMC surfaced in any search. Treat as absent until checked manually.

### Answer-style queries (WebSearch, US, 2026-09-28)
1. "best performance marketing agency for D2C brands India": surfaced sariyo.in, prohed.com listicle, iblixdigital.com listicle, sqroot.in, brandchanakya.in, goadsindia.com, digitaldc.in, d2scale.in, codexxa.net listicle. Named in summaries: Sariyo, FCB Kinnect, PROHED, DigitalDC, Merkle (Sokrati), Schbang.
2. "D2C marketing agency India": peakpilots.in, prohed listicle, blackcoffee.media, trilliantdigital.com, sqroot.in, adycircle.com, themarcomavenue.com, reinventdigital.com, havstrategy.com.
3. Pattern: results are dominated by (a) agency-owned service pages and (b) agency-owned "best agencies" listicles where the author ranks itself first. Third-party publications and directories (Clutch, Sortlist) appear for broader queries (Sortlist India performance marketing page https://www.sortlist.com/s/performance-marketing/india-in). MMC appeared in none. Caveat: these are Claude-search-tool result lists, not ChatGPT/Perplexity/Google AIO outputs; AI answer engines were NOT directly tested.

### Peer page observations (WebFetch summaries; schema unverifiable)
| Peer | Structure | Proof | Expert/authority | Gaps |
|---|---|---|---|---|
| Sqroot (sqroot.in D2C page) | H1 + expertise, why-us, services H3s, case studies, categories; ~2,500 words; city presence | Named brand case studies with ROAS/CAC/repeat metrics; "50+ customers" | Address/phone; no named experts, no directories seen | No FAQ seen |
| PROHED (blog listicle) | Table, 5 profiles, growth-stage framework, 5 FAQs | Named case studies with links; ROAS movement claim | Named author (co-founder, 10+ yrs, Google/Meta certified); proprietary framework named | Self-ranks #1; methodology thin (credibility risk) |
| AdyCircle | Home with service/industry/case study nav | "150+ brands", "₹2000Cr+", "4.9/5", "20x ROAS" headline claims | 5 international offices | No awards/press/badges seen |
| DigitalDC | Home, services, 4 portfolio items | "200+ brands", "16X ROAS", "40+ reviews" | Founder named | No partner badge, Clutch, press |
| Go Ads India D2C page | Hero, ~8 logos, industries, FAQ | Logos only | None | No case-study metrics, no experts, no reviews |
| Schbang (via search summaries only; site not fetched) | Full-service creative+media+tech | Large brand base | Founders named; appears in third-party rankings, Afaqs Top 50 coverage | Different weight class |
Takeaway: peers rely on headline numbers (which I have not fact-checked, per instruction) and self-published listicles. Few show third-party validation, named experts, or partner badges. Differentiation opportunity for MMC: named practitioners, documented methodology, verifiable partner status, and original data, not bigger claims.

## 3. Legitimate authority channels (MMC must verify eligibility for every partner program)

### Directories/reviews
- Clutch: free profile; reviews verified by Clutch via identity checks. "Clutch Verified" needs 3 verified reviews per Clutch's help centre (https://help.clutch.co/en/knowledge/how-do-i-become-verified-on-clutch); Premier Verified needs 3+ reviews (1 in last 12 months), 3.0+ average, acceptable credit risk (secondary summary; confirm). Only invite real clients to review; never write, incentivise or gate reviews.
- GoodFirms: free; needs legally registered business and official website; details must match website/socials (https://help.goodfirms.co/what-are-the-eligibility-criteria-or-requirements-for-listing-a-business-on-goodfirms/).
- Sortlist: appears in India performance-marketing rankings; requirements not checked.
- Google Business Profile, LinkedIn page, Crunchbase-style entity profiles: fix NAP consistency, reconcile Pennsylvania/Thane/Indore address data.

### Partner programs (eligibility as found; MMC to verify; all subject to change)
| Program | Requirements found | Confidence |
|---|---|---|
| Google Partners badge | Secondary sources: 90-day spend across managed accounts (about USD 10,000), optimisation score 70%, certification of 50% of account strategists; Premier = top 3% per country. Official support URL I tried returned 404, so NOT verified at official page. | Low; verify in Google Ads Manager account > Partners |
| Meta Business Partner | Official page requires Facebook login to see criteria; not viewable. Secondary sources: verified Business Manager, spend threshold, Blueprint-certified staff, results; exact thresholds unpublished. | Unverified; MMC must apply/log in |
| Shopify Partner Directory | Official (https://help.shopify.com/en/partners/grow-your-business/partner-directory/join): Plus/Premier/Platinum tiers auto-invited; needs USD 500k annual revenue to Shopify from merchants acquired in 5 yrs (or 2.5M existing route), 2 Plus shops or 40 Standard shops, 10 Verified Skills across staff, 3+ people with a skill. Likely out of reach for an agency without Shopify-referred revenue; a plain Partner account is open to anyone. | High for stated criteria |
| Amazon Ads Partner Network | Official page: agencies can register (authorised representative, business info); verified/advanced status criteria not on that page. Secondary: at least two certified team members and recent campaign activity, spend thresholds. | Registration confirmed; status criteria unverified |
| Klaviyo Partner Program | Secondary: Silver/Gold/Platinum/Elite tiers based on managed revenue, certifications, case studies. Not verified at official page. | Low |
| WhatsApp/Meta Tech Provider (BSP route) | Meta developer docs (via search): business verification, 2FA, advanced access permissions, App Review with video. This is a technical product route and probably not applicable to an agency; being a reseller of an existing BSP is not the same thing. | Medium; likely not relevant |
Rule: only display badges/logos the account genuinely holds; badge claims are checkable.

### Publications, podcasts, events (no paid placements)
Afaqs, Exchange4media, YourStory, Inc42, Social Samosa, Search Engine Land/Journal (contributor guidelines vary), Entrackr/D2C-focused newsletters, ecommerce and edtech conferences and podcasts. Route: expert commentary and original data pitched to journalists; guest posts only where editorial and unpaid; sponsored content must be labelled and rel=sponsored. Eligibility/editorial policies of each publication were not checked and must be verified.

## 4. Original-evidence content MMC can credibly produce
- Benchmarks from own campaigns (aggregated, anonymised, client permission, stated methodology, sample window, definitions; no invented ranges). Example: CAC/ROAS/CVR ranges by category and spend band; edu lead-to-enrolment funnel stages; B2B lead quality.
- Teardowns: public ad libraries (Meta Ad Library), landing pages, checkout flows of consenting or clearly-public brands, with dated screenshots.
- Calculators (breakeven ROAS, CAC runway, LTV:CAC, funnel ROAS, unit economics exist): add methodology, formulae, named reviewer, last-reviewed date, worked examples; publish embeddable assumptions.
- Glossary and guides: add author, reviewer, date, sources; link to calculators.
- Quarterly "state of D2C/edu paid media in India" data note; post-mortems with real failures.
Expert input needed: named media buyers/strategists for bylines and review; finance lead to validate unit-economics formulas; clients' written approval and numbers; legal review of claims; an editor for consistency. Add Person schema and real profile links only for people who exist and consent.

## 5. Safeguards
- No promises: remove "Results Guaranteed", "10x", "Pay per result", "Best in Mumbai/India" unless provable and substantiated; ASCI advertising guidelines and Consumer Protection rules on misleading claims apply (check with counsel; not researched here).
- No client or brand counts (per project rule); use "a few of the brands".
- No schema shortcuts: markup only for visible content; no fake Review/AggregateRating, no self-authored reviews, no fabricated awards, no FAQ schema on content not on the page, no fake authors. Organization/sameAs only to real profiles.
- No scaled content: no mass city/keyword pages or bulk AI articles without unique data and expert review (scaled content abuse).
- No "best agencies" self-ranking listicles without transparent methodology and disclosure; avoid site-reputation-abuse patterns (renting the domain to third parties).
- No paid links, link exchanges, or PBNs; label sponsored.
- Do not block OAI-SearchBot/PerplexityBot/Googlebot in robots.txt if AI search visibility is wanted; decide GPTBot/Google-Extended policy deliberately.
- llms.txt: keep, do not sell it as a ranking lever.
- Monitor: Search Console, Bing Webmaster Tools AI Performance, manual prompt checks logged with engine, location, date; treat as directional only.
- Brand disambiguation: consistent name, tagline, address, sameAs, LinkedIn text; consider always using "Monday Marketing Company (MMC), India".

## Unverified / inaccessible
Google Partner official criteria page (404); Meta partner criteria (login wall); Klaviyo, Amazon verified thresholds; Bing guidelines body; Google llms.txt changelog first-hand; Schbang page not fetched; competitor schema/JSON-LD not visible via summariser; India-located SERPs and ChatGPT/Perplexity/AIO outputs not tested; Knowledge Panel presence unknown.
