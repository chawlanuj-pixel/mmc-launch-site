# roles.json: adding a new role

The file is `{ "hiringProcess": {...}, "roles": [...] }`. Add a role to the `roles` array. `hiringProcess` is the one source for the hiring steps shown on /careers/ and on every role page (`careersPageUses` and `rolePagesUse` pick the variant; point both at the same key once the owner confirms which process is true). Read it through `src/lib/roles.ts`, which also gives the role count and chips.

Every entry here becomes a full careers page at `/careers/<slug>/`, built by
`src/pages/careers/[slug].astro`. That page automatically emits Google for
Jobs `JobPosting` structured data for every entry in this file, with no
extra step required — that is a standing technical SEO requirement, not
optional. Do not remove or bypass it when adding, editing or generating a
role.

## Fields that feed the JobPosting schema directly

| Field | Used for | Required by Google | If omitted |
|---|---|---|---|
| `title` | `title` | Yes | Build fails |
| `summary`, `responsibilities`, `youAre` | `description` | Yes | Build fails |
| `datePosted` | `datePosted` | Yes | Falls back to today's date |
| `empType` | `employmentType` | Yes | Falls back to `FULL_TIME` |
| `city`, `workMode` | `jobLocation` / `jobLocationType` | Yes | Falls back to Thane |
| `salary`, `salaryMin`, `salaryMax`, `salaryUnit` | `baseSalary` | Recommended | Salary block omitted |
| `slug` | `identifier` | Recommended | — |
| `industry` | `industry` | Optional | Falls back to "Marketing & Advertising" |

`validThrough` is deliberately never set, because these are rolling
openings with no real close date. If a role ever gets a real application
deadline, add a real future `validThrough` date in the schema block in
`[slug].astro` — never a placeholder date, since Google drops a posting
once its `validThrough` has passed.

## Non-schema fields (real data, not marketing claims)

`screening` (4 role-specific interview questions), `hiringSteps`, `salary`,
`reportsTo` and `applyWindow` are real hiring data the client supplied, not
invented figures — they came from the original site's job application flow.
Keep them factual for the same reason: do not add a benefit, perk or salary
figure that is not already established for a role.

## Before publishing a new role

1. Fill every field above with real values.
2. Run `npx astro build` and check `dist/careers/<slug>/index.html` contains
   exactly one `<script type="application/ld+json">` block with
   `"@type": "JobPosting"`, and that it parses as valid JSON.
3. Spot-check the page renders correctly at 390px and 1440px before it ships.
