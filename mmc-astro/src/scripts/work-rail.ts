// Selected work rail. Desktop (wide, tall, hover-capable, motion allowed): the section is a tall wrapper,
// its inner .wk__pin is position: sticky, and vertical scroll is mapped 1:1 onto a translateX of the track.
// Wrapper height = viewport height + track overflow, so the pin releases the moment the last card is in view.
// Everything else keeps the plain vertical stack (no JS needed for it).
const MQ = "(min-width: 901px) and (min-height: 560px) and (hover: hover) and (prefers-reduced-motion: no-preference)";

function init(root: HTMLElement) {
  const pin = root.querySelector<HTMLElement>("[data-wk-pin]")!;
  const view = root.querySelector<HTMLElement>("[data-wk-view]")!;
  const track = root.querySelector<HTMLElement>("[data-wk-track]")!;
  const fill = root.querySelector<HTMLElement>("[data-wk-fill]");
  const skip = root.querySelector<HTMLAnchorElement>("[data-wk-skip]");
  const mq = window.matchMedia(MQ);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  let overflow = 0, raf = 0, on = false;

  const nextEl = () => document.getElementById(root.dataset.wkNext || "") || (root.nextElementSibling as HTMLElement | null);
  const top = () => root.getBoundingClientRect().top + window.scrollY;

  function measure() {
    track.style.transform = "none";
    overflow = Math.max(0, track.scrollWidth - view.clientWidth);
    root.style.height = `calc(100svh + ${overflow}px)`;
    update();
  }
  function update() {
    raf = 0;
    if (!on) return;
    const p = overflow > 0 ? Math.min(1, Math.max(0, -root.getBoundingClientRect().top / overflow)) : 0;
    track.style.transform = `translate3d(${(-p * overflow).toFixed(1)}px,0,0)`;
    if (fill) fill.style.transform = `scaleX(${p.toFixed(4)})`;
  }
  const queue = () => { if (!raf) raf = requestAnimationFrame(update); };
  const onResize = () => { if (on) { measure(); } };

  function onFocusIn(e: FocusEvent) {
    const card = (e.target as HTMLElement).closest<HTMLElement>("[data-wk-card]");
    if (!card || !on) return;
    const item = card.parentElement as HTMLElement;
    const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    const want = Math.min(overflow, Math.max(0, item.offsetLeft - pad));
    window.scrollTo({ top: top() + want, behavior: "auto" });
    queue();
  }
  function onSkip(e: MouseEvent) {
    const t = nextEl();
    if (!t) return;
    e.preventDefault();
    window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY, behavior: reduce.matches ? "auto" : "smooth" });
    t.setAttribute("tabindex", "-1");
    (t as HTMLElement).focus({ preventScroll: true });
  }

  function enable() {
    if (on) return;
    on = true;
    root.classList.add("wk--rail");
    measure();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", onResize);
    root.addEventListener("focusin", onFocusIn);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => on && measure());
    window.addEventListener("load", onResize, { once: true });
  }
  function disable() {
    if (!on) return;
    on = false;
    root.classList.remove("wk--rail");
    root.style.height = "";
    track.style.transform = "";
    if (fill) fill.style.transform = "";
    window.removeEventListener("scroll", queue);
    window.removeEventListener("resize", onResize);
    root.removeEventListener("focusin", onFocusIn);
  }

  skip?.addEventListener("click", onSkip);
  const sync = () => (mq.matches ? enable() : disable());
  mq.addEventListener("change", sync);
  sync();
}

document.querySelectorAll<HTMLElement>("[data-wk]").forEach(init);
