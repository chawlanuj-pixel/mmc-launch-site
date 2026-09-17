# design/

Website redesign work for Monday Marketing Company: competitor and reference research, and four rounds
of page mockups. The mockups are Python scripts that print static HTML artboards; they are a design
deliverable, not the site. The live site lives in `MMC Site/`.

Published canvas (all artboards, latest round): https://claude.ai/artifact/LyS3e48eq8sQgQSzPbFAR9

## What the rounds were

| Round | Folder | Direction |
|---|---|---|
| 1 | `mockups/` root | First pass, evolving the live look. Judged too plain. |
| 2 | `mockups/r2/` | Rebuilt the live nav, service page hero and footer exactly, so every later round reuses them. |
| 3 | `mockups/r3/` | Layout, sections and presentation from 3mindsdigital.com, in MMC colours with Cormorant Garamond italic as the accent and DM Sans as the primary typeface. |
| 4 | `mockups/r4/` | Round 3 simplified with habits measured on airbnb.co.in: five corner radii, three shadows, eight type sizes, one filled button per screen, photo-led work cards, and actions that follow the reader. Current. |

Each round imports the one before it, so the nav, service hero and footer come from round 2 unchanged.

## Fixed, do not redesign

- The nav pill, the service page hero and the footer, rebuilt from `MMC Site/Nav.jsx`, `MMC Site/service-detail/SdHero.jsx` and `MMC Site/Footer.jsx`.
- MMC's colours (royal blue `#1D4ED8`, sun yellow `#FFC528`, ink `#0F1E5E`, paper `#FBFAF6`) and the Cormorant Garamond italic accent.
- The two approved homepage sections, carried into round 4 as `r4/approved.py`: the client logo wall where hovering a logo shows that client's project, and the "Five systems, one team" services list where a photo follows the hovered row. They come from `MMC Site/home26/sections.jsx` (`NClients`, `NCapabilities`). Only the typeface changed, to DM Sans.

## Running the mockups

From a round folder, with the local server and Chrome running (`MMC Site/serve.sh`):

```bash
python3 preview.py <module> <function> <width> <Name>   # renders one artboard and screenshots it into preview/
python3 build.py                                        # writes every artboard plus canvas.json into out/
```

`preview.py` and `build.py` drive the local Chrome through `MMC Site/cdp.py`, and `build.py` measures each
artboard so the canvas frames never clip. `out/` and `preview/` are generated and are not tracked.

Publishing the canvas: seed a fresh copy of the design-canvas payload with the artboards, the images listed
in `out/used-images.txt` and `out/canvas.json`, then publish that file to the URL above.

## Images

`mockups/img/` holds every picture the artboards use, shrunk for the canvas: each file must stay under
70 KB, and artboards reference them by bare filename. Sources are `MMC Site/assets/`.

## research/

- `analysis/`: the competitor teardown of webfx.com and mediagarh.com (business, market, copy, content,
  proof, design, development, SEO), plus `airbnb-uiux.md`, the Airbnb simplicity brief that shaped round 4,
  and `data/r3-metrics.json`, the measured comparison of round 3 against Airbnb.
- `reference/`: measurements taken from the reference sites (3 Minds, First Economy, Airbnb) and from the
  live MMC homepage, including captures of the two approved hover sections at rest and on hover.
- `report/teardown.html`: the published competitor teardown report.

Numbers quoted in this research are taken from the sites as they were read. They were not fact-checked,
which was deliberate: the brief was to learn structure, content, design and SEO, not to verify claims.
