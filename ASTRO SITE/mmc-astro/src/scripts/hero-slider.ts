// Hero image slider: turns every .pmh__mosaic into a 2.5-up auto-advancing slider (two tiles and half of the next).
// Without JS the mosaic is a plain horizontal scroll strip. Pauses on hover/focus and when the tab is hidden; still under reduced motion.
const EVERY = 3500;
const SLOW = 850;

function mount(mosaic: HTMLElement) {
  if (mosaic.dataset.slider) return;
  const tiles = Array.from(mosaic.children) as HTMLElement[];
  if (tiles.length < 2) return;
  mosaic.dataset.slider = "1";
  const n = tiles.length;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Tiles further along the track would stay unloaded under loading="lazy" while clipped, so load them all now.
  tiles.forEach((t) => t.querySelectorAll("img").forEach((im) => { im.loading = "eager"; im.removeAttribute("fetchpriority"); }));

  const track = document.createElement("div");
  track.className = "pmh__track";
  tiles.forEach((t) => track.appendChild(t));
  // Clones of the first 2.5 tiles so the loop back to the start has no visible jump.
  tiles.slice(0, 3).forEach((t) => {
    const c = t.cloneNode(true) as HTMLElement;
    c.setAttribute("aria-hidden", "true");
    c.querySelectorAll("img").forEach((im) => { im.alt = ""; });
    track.appendChild(c);
  });
  mosaic.appendChild(track);
  mosaic.classList.add("is-slider");
  mosaic.setAttribute("role", "group");
  mosaic.setAttribute("aria-roledescription", "carousel");
  mosaic.setAttribute("aria-label", "Highlights");

  const dots = document.createElement("div");
  dots.className = "pmh__dots";
  const btns = tiles.map((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "pmh__dot";
    b.setAttribute("aria-label", "Show slide " + (i + 1));
    b.addEventListener("click", () => go(i));
    dots.appendChild(b);
    return b;
  });
  mosaic.after(dots);

  let i = 0;
  let paused = false;
  const step = () => (track.children[0] as HTMLElement).offsetWidth + (parseFloat(getComputedStyle(track).columnGap) || 14);
  function go(k: number, animate = true) {
    i = k;
    track.style.transition = animate ? "" : "none";
    track.style.transform = `translateX(${-k * step()}px)`;
    btns.forEach((b, j) => b.classList.toggle("is-on", j === k % n));
  }
  function next() {
    go(i + 1);
    if (i === n) setTimeout(() => go(0, false), SLOW);
  }
  const host = mosaic.parentElement || mosaic;
  ["mouseenter", "focusin"].forEach((e) => host.addEventListener(e, () => { paused = true; }));
  ["mouseleave", "focusout"].forEach((e) => host.addEventListener(e, () => { paused = false; }));
  window.addEventListener("resize", () => go(i % n, false));
  go(0, false);
  if (reduce) return;
  setInterval(() => { if (!paused && !document.hidden && i < n) next(); }, EVERY);
}

function init() { document.querySelectorAll<HTMLElement>(".pmh__mosaic").forEach(mount); }
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
