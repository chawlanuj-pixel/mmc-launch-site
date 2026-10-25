# Animation audit: 3minds reference vs first AI by MMC build

Sources: research files 01 to 04 (code evidence) and headless renders of ai-by-3minds.framer.website (hub, photoshoot, UGC).
Not observed live: exact easing and timings of the Framer components are inferred from their props.

| # | Reference behaviour | First build | Gap | Fix in v2 |
|---|---|---|---|---|
| 1 | Lenis inertial smooth scroll on every page | Native scroll | Missing | Lenis, synced to GSAP ticker |
| 2 | Hub hero: drifting starfield, centred layout, two-tone gradient headline, split badge, tool logo marquee with faded edges | Left-aligned static hero, no background motion | Missing | Canvas starfield with pointer response, gradient second line, split badge, blur-edged tool marquee |
| 3 | Photoshoot hero: fanned photo cards that rotate around Y with a spring entrance | Three static tilted boxes with a CSS float | Weak | 5-card 3D fan: spring entrance, auto-shuffle, pointer tilt, click to bring forward, scroll parallax |
| 4 | UGC hero: cards fanned left, glow gradient across the top, copy right | Same static stack | Weak | Same fan, mirrored layout, top glow |
| 5 | Word-by-word blur-in headline | Hero only, plain CSS | Partial | Kept for hero; section headings now reveal word by word on scroll |
| 6 | Blocks fade up 50 to 150px once at half visibility | One fade, no stagger | Partial | Batched, staggered GSAP reveal |
| 7 | Scroll-pinned sticky grid (5 x 3) converging from scattered | None | Missing | Photoshoot: pinned grid, tiles fly in from the centre base image as you scroll |
| 8 | UGC "how it works": progress line fills as each step scrolls in | Static list | Missing | Every step list has a scroll-scrubbed fill bar and lights up as reached |
| 9 | Sales: 3-step scroll story with plates re-lit per step, synced titles | Static list | Missing | Pinned story: text swaps while three isometric plates light in turn |
| 10 | Sales: integrations flow with a shimmer travelling on curved lines | Plain chips | Missing | SVG flow diagram, chips around a hub, shimmer running along each line |
| 11 | LP: scroll-scrubbed screenshots inside a pinned frame | None | Missing | Pinned browser frame; five pages scroll through as you scroll |
| 12 | Video: draggable 3D slideshow with a Pause pill and arrows | None | Missing | Drag or arrow carousel, 3D-tilted neighbours, autoplay with Pause |
| 13 | Button text roll on hover | Lift and shadow | Missing | Two-state text roll on every button, magnetic pull on primary buttons |
| 14 | FAQ accordion: animated open, rotating icon, ambient blur glow behind | Native details, no animation | Weak | Animated height, rotating plus, glow blob |
| 15 | Radial gradient benefit cards with a glow in the corner | Flat cards | Weak | Corner-glow cards with cursor spotlight |
| 16 | Nav pill with looping ring video | CSS conic ring | Stand-in | Kept; swap for video later |
| 17 | Empty media | Empty dark cards | Biggest visible gap | Motion is now built to carry real images; placeholders get a moving sheen. Generating the images is still needed |

Accessibility and performance kept: everything falls back to the static layout without JS, with reduced motion, or on phones (pins are desktop only). The animation libraries load from a CDN and the page still works if they fail.
