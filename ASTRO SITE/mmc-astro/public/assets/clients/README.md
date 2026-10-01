# Client logos and work images

Two files per client, both in this folder. Drop them in and they appear
everywhere that client is shown. A logo needs no code change. A work image
also needs its id added to `MMC_WORK_ART` in `clients-strip.jsx` and an `img`
on its row in `home26/showcase.jsx`. Then re-run `./build.sh`.

## 1. The logo

**900 x 300 px, PNG, transparent background.**

One size covers every slot on the site. The largest a logo ever renders is
190 x 49 css px, in the trust rows on the service pages, measured at 2560px
wide. 900 x 300 clears 3x for that, so it will not look soft on any display.

| Where it appears | Renders at | Needs at 3x |
|---|---|---|
| Trust rows, service pages | 190 x 49 | 570 x 147 |
| Homepage client wall | 260 x 146 | 780 x 438 |
| Client grid | 121 x 46 | 363 x 138 |

What matters more than the pixel count:

- **Transparent background.** The wall is dark and the cards are cream, so a
  logo on a white rectangle shows its edges as a visible box.
- **Trimmed to the mark's own edges**, no built-in padding. The slot adds its
  own; baked-in whitespace makes a logo render smaller than its neighbours.
- **Landscape, or centred if square.** The slots are wider than tall.
- **PNG or SVG.** JPEG cannot be transparent, so use it only if it is
  genuinely all a client has.
- On the homepage wall the logo is flattened to white, so a colour logo is
  fine: the site does the greyscaling.

## 2. The work image

**1280 x 720 px, JPEG, roughly 150 to 250 KB.**

This is what the tile becomes when someone hovers it on the homepage. A still
from a reel, a hero creative, a packshot: whatever best represents what MMC
made for that client.

- **16:9, and cropped to fill.** Anything that matters should sit centre
  frame; the edges get trimmed on narrower screens.
- **JPEG is right here**, unlike the logos. These are photographs and there is
  no transparency to keep.
- A client with no work image simply brightens on hover instead. Nothing
  breaks, so add them as the work is cleared for use.
- **List the id in `MMC_WORK_ART`** (`clients-strip.jsx`) when the file lands.
  Unlisted brands never request an image, which is what keeps missing files
  from firing a 404 on every visit, but it also means an unlisted file is
  never shown.

## Filenames

Exactly these, all lowercase:

```
  qid.png            qid-work.jpg            qid
  bloom.png          bloom-work.jpg          Bloom Edutours
  sprouts.png        sprouts-work.jpg        Sprouts Edu Tours
  nmc.png            nmc-work.jpg            NM Consultings
  skyfling.png       skyfling-work.jpg       Skyfling Technologies
  lepure.png         lepure-work.jpg         Lepure
  arsya.png          arsya-work.jpg          Arsya
  giraffe.png        giraffe-work.jpg        The Growing Giraffe
  mittiy.png         mittiy-work.jpg         Mittiy Made
  awwbaby.png        awwbaby-work.jpg        AwwBaby
  sprnt.png          sprnt-work.jpg          Sprnt
  vagakids.png       vagakids-work.jpg       Vaga Kids
  mbb.png            mbb-work.jpg            MyBrownButters
  notic.png          notic-work.jpg          Notic
```

## Partial coverage is fine

A client with no logo keeps its name set in the site's display type, which
reads as a deliberate treatment rather than a broken image. There is no
all-or-nothing switch; add files as clients send artwork.

Ask each client for their logo pack rather than pulling one off their site.
A traced or screenshotted mark will not survive being scaled down.
