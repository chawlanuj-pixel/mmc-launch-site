#!/usr/bin/env python3
"""Subset the self-hosted woff2 fonts in place to Latin + Latin-1 + Latin Extended-A + general punctuation + currency + a few symbols.
Same filenames, same family/weight, all OpenType layout features kept, so no CSS or page changes. Idempotent.
Needs: pip install fonttools brotli.  Usage: python3 tools/subset-fonts.py [fontsDir]
Characters outside the subset (arrows, stars, box-drawing) were never in these fonts, so they already fell back to system fonts."""
import sys, glob, os
from fontTools import subset
d = sys.argv[1] if len(sys.argv) > 1 else "src/styles/design-system/fonts"
UNI = "U+0020-007E,U+00A0-017F,U+2010-2027,U+2030-203A,U+20A0-20BF,U+2122,U+2212,U+2260,U+2264-2265,U+FB01-FB02"
tot0 = tot1 = 0
for f in sorted(glob.glob(os.path.join(d, "*.woff2"))):
    before = os.path.getsize(f)
    opts = subset.Options(); opts.flavor = "woff2"; opts.layout_features = ["*"]; opts.name_IDs = ["*"]; opts.notdef_outline = True; opts.glyph_names = False; opts.hinting = False
    font = subset.load_font(f, opts)
    s = subset.Subsetter(opts); s.populate(unicodes=subset.parse_unicodes(UNI)); s.subset(font)
    tmp = f + ".tmp"; subset.save_font(font, tmp, opts); font.close()
    after = os.path.getsize(tmp)
    if after < before: os.replace(tmp, f); tot0 += before; tot1 += after
    else: os.remove(tmp)
    print(os.path.basename(f), before, "->", min(after, before))
print("total", tot0, "->", tot1)
