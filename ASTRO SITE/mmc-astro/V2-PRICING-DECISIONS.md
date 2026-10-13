# Pricing decisions log (internal)

Internal only. Decisions taken on the owner's behalf under one rule: decide by how a customer will perceive it, every commercial must be adoptable, and the agency must still make money. All values live in `src/data/pricing/margin-config.json` unless stated. Full line-by-line numbers are in V2-PRICING-MARGINS.md. Nothing here adds a discount, credit, guarantee or term that was not already in the rate card, apart from the white-label discount band in item 3, which is the owner-delegated reseller margin.

Assumptions to confirm: floor Rs.800 an hour is a stand-in for loaded cost; fxInrPerUsd 85; white-label factors 0.70 and 0.75; the market list on the US$ pages; the community management price.

## 1. One cost floor in rupees for every audience
- Before: floors Rs.800 an hour (India) and $35 an hour (International), so 13 International lines looked THIN (audits $400 for 14 hours = $28.6 an hour).
- After: floor Rs.800 per logged hour for all audiences. A dollar price is price x 85 / hours. The dollar floor is Rs.800 / 85 = about $9.41 an hour. Audits at $400 yield about Rs.2,429 an hour, roughly 3x the floor.
- Why: the same India team does the hour whoever pays for it, so a separate dollar billing-rate floor penalised International for no cost reason. Customers see no change; no International list price is raised.
- Confirm: the real loaded cost per hour and minimum margin (floor = cost x (1 + margin)), and FX.
- Revert: set `minYieldInrPerHour` and `fxInrPerUsd`; the dollar floor follows automatically (there is no independent dollar floor key any more).

## 2. Audit bundle, 20% on all four pages
- Before: white-label dollar bundle capped at 0% because $400 for 14 hours was under the $35 floor.
- After: 20% off the combined price in both currencies on every page, as in the owner's data. White-label audit after bundle: Rs.1,000 an hour (India) and about Rs.1,457 an hour (International), both above the Rs.800 floor.
- Why: a flat, simple rule reads as fair to customers and agencies alike.
- Revert: nothing to set; the cap is computed from the floor and would return only if the floor is raised above those yields.

## 3. White-label factors, room for the agency to mark up
- Before: 0.80 in both currencies (agency keeps 20% when it resells at list). Average discount 16.7% (India) and 12.4% (International), because thin lines were protected.
- After: `whiteLabelFactorInr` 0.70 and `whiteLabelFactorUsd` 0.75. An agency reselling at the client list price keeps about 30% (India) and 25% (International), in line with typical reseller margins of 25 to 35 percent.
- Result: average white-label discount 25.0% (India, 27.5% across lines that carry one) and 23.1% (International, 24.9%). The floor trims the discount on labour-heavy lines: India web-template 10.4%, web-highdesign 26.4%, brand-logo 20%, pr-article 4%, mnt-growth 13%, mkt-setup 13.6%, cat-colour 0%, soc-community 0.5%. International lines all keep 22% to 27%.
- Why: a reseller needs room to mark up or the programme will not be adopted. The floor protects MMC's cost on every line.
- Confirm: factors, and whether the near-zero margin lines (soc-community, cat-colour, pr-article) should be repriced.
- Revert: set the two factor keys back to 0.8 (`whiteLabelFactor` is the fallback).

## 4. Client price overrides
- Community management India: Rs.15,000 (Rs.652 an hour for 23 logged hours, under the floor) becomes Rs.18,500 (about Rs.804 an hour). International stays $300 (about Rs.1,109 an hour at fx 85, above the floor). Mechanism: `clientPriceOverrides` in margin-config.json; it also sets the white-label base (white-label India lands at Rs.18,400, the floor).
- Camera assistant (shoot-assist) is a crew day rate that passes through a freelancer rate, not billable man-hours, so it is excluded from the yield check with the equipment lines (`excludeFromYield`). Its price is unchanged.
- No other list price changed.
- Confirm: the Rs.18,500 community management price.
- Revert: empty `clientPriceOverrides`; remove "shoot-assist" from `excludeFromYield`.

## 5. Terms wording (same meaning, adoptable)
- Lock-in: "Non-payment during the lock-in period results in suspension of services and blacklisting of the client account; fees for the full committed period remain payable." now reads "If payments are not received during the lock-in period, services are suspended, and fees for the full committed period remain payable."
- Weekend: first line now "Work done on a Saturday or Sunday is billed at double the man-hours logged for that work." The other weekend lines, every other term and the sentence that the signed proposal governs are unchanged.
- Revert: edit `terms` in rate-card.json.

## 6. Email
Above 1,00,000 emails stays "quoted on request"; no price is shown.

## 7. Page polish (no new terms)
- 'from' and 'up to' labels kept. The Grow tab shows the monthly total next to the 3-month minimum commitment. "Audit first" carries the label "Recommended starting point" on every page (the only preset so marked; not "most popular", there is no usage data). White-label pages show "You pay" and, in a muted line, "Resell at your own price" on each line.

## 8. Markets named instead of "International"
- The US$ pages name their markets from `countries` in `src/data/pricing/links.json` (United States, United Kingdom, United Arab Emirates, Canada, Australia, Singapore). This is a placeholder list: confirm with the owner; the repo itself only states India as the area served. The word International no longer appears on those pages; India pages name only India. The SEO line "International keyword" is shown as "Keyword in a second market" on US$ pages.
- Revert or edit: change the `countries` array.

## Remaining thin lines
None are under the Rs.800 floor on any audience after these changes. Closest to the floor at list: India soc-community (Rs.804 an hour), cat-colour (Rs.800), pr-article (Rs.833), mnt-growth (Rs.920), mkt-setup (Rs.926).
