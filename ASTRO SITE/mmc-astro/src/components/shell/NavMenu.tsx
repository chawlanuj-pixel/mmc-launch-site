import React from "react";
import gsap from "gsap";
import { href } from "../../lib/links";
import { menuLinks as links } from "./menu-data";
import { BOOK } from "../../lib/site";

// Nav + Menu as one island. Ported from Nav.jsx and Menu.jsx.
// Difference from the original: every primary item's sub-pane is rendered (inactive ones carry
// `hidden`) so the whole link tree is in the server HTML. Visually identical: only the active pane shows.

/* Keeps Tab inside an open overlay (ported from Menu.jsx window.mmcTrapTab). */
const mmcTrapTab = (e: KeyboardEvent, root: HTMLElement | null) => {
  const w = window as any;
  if (w.mmcTrapTab) return w.mmcTrapTab(e, root);
  if (e.key !== "Tab" || !root) return;
  const f = (Array.from(root.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])'
  )) as HTMLElement[]).filter((n) => n.offsetParent !== null || n === document.activeElement);
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (!root.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
  else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
};

/* Phone menu Tab trap. Tab order is Close button, then the current view, then the CTA, wrapping at both ends.
   Every Tab is handled here, so focus never reaches the page behind. Hidden views are inert and left out. */
const phoneTrapTab = (e: KeyboardEvent, root: HTMLElement | null, closeBtn: HTMLElement | null) => {
  if (e.key !== "Tab" || !root) return;
  const f = [
    ...(closeBtn ? [closeBtn] : []),
    ...Array.from(root.querySelectorAll<HTMLElement>(".mm-view.is-current a[href], .mm-view.is-current button, .mm-cta button")),
  ];
  if (!f.length) return;
  const i = f.indexOf(document.activeElement as HTMLElement);
  const next = i < 0 ? (e.shiftKey ? f.length - 1 : 0) : (i + (e.shiftKey ? -1 : 1) + f.length) % f.length;
  e.preventDefault();
  f[next].focus();
};

/* The phone menu has no .sm-link rows; give GSAP a detached stand-in so an empty selection does not log "target not found". */
const orStandIn = (n: ArrayLike<Element>): any => (n.length ? Array.from(n) : [document.createElement("i")]);

const bookCall = (src: string) => { const w = window as any; if (w.mmcBookCall) w.mmcBookCall(src); };

/* Current page. Menu urls are old-site names rewritten by href(), so compare clean paths (no query, trailing slash).
   A url with a #hash points into a page section, so it never counts as the current page. */
const cleanPath = (u: string) => { const p = (u || "").split("?")[0]; return p ? (p.endsWith("/") ? p : p + "/") : ""; };
const pageMatch = (url: string, path: string) => { const h = href(url); return !!path && h.startsWith("/") && !h.includes("#") && cleanPath(h) === path; };
type Cur = { primary: string; expandKey: string };
/* The primary group (and the expandable category) holding the current page. An inner link wins over a primary link. */
const findCurrent = (path: string): Cur => {
  let hit: Cur = { primary: "", expandKey: "" };
  if (!path) return hit;
  for (const l of links) {
    for (const s of l.sub || []) {
      if (s.inner ? s.inner.some((it) => pageMatch(it.url, path)) : pageMatch(s.url, path)) return { primary: l.label, expandKey: s.inner ? s.expandKey || "" : "" };
    }
    if (!hit.primary && pageMatch(l.url, path)) hit = { primary: l.label, expandKey: "" };
  }
  return hit;
};
/* A sub row (category) holds the current page: one of its inner links, or its own url when it has no inner list. */
const subHolds = (s: { url: string; inner?: { url: string }[] }, path: string) => (s.inner ? s.inner.some((it) => pageMatch(it.url, path)) : pageMatch(s.url, path));
const here = (on: boolean) => (on ? ({ "aria-current": "page" } as const) : {});

/* Desktop two-pane menu: Tab goes primary link, then that link's open pane, then the next primary link; Shift+Tab mirrors it.
   Without this, focusing a primary link swaps the pane, so Tab only ever reached the last item's pane.
   Returns true when it moved focus itself. Collapsed inner lists are inert, so they are skipped. */
const paneTab = (e: KeyboardEvent, root: HTMLElement | null): boolean => {
  if (e.key !== "Tab" || !root) return false;
  const ae = document.activeElement as HTMLElement | null;
  if (!ae || !root.contains(ae)) return false;
  const paneLinks = () => {
    const pane = root.querySelector<HTMLElement>(".sunmenu__sub:not([hidden])");
    return pane ? Array.from(pane.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")).filter((n) => !n.closest("[inert]") && n.offsetParent !== null) : [];
  };
  const prim = Array.from(root.querySelectorAll<HTMLElement>(".sunmenu__primary-link"));
  const pi = prim.indexOf(ae);
  const inPane = paneLinks();
  if (pi >= 0) {
    if (!e.shiftKey && inPane.length) { e.preventDefault(); inPane[0].focus(); return true; }
    if (e.shiftKey && pi > 0) {
      // Back to the previous primary link (its focus handler opens its pane), then onto that pane's last link.
      e.preventDefault(); prim[pi - 1].focus();
      setTimeout(() => { const l = paneLinks(); if (l.length) l[l.length - 1].focus(); }, 0);
      return true;
    }
    return false;
  }
  const k = inPane.indexOf(ae);
  if (k < 0) return false;
  const row = root.querySelector<HTMLElement>(".sunmenu__primary-row.is-active .sunmenu__primary-link");
  const ri = row ? prim.indexOf(row) : -1;
  if (e.shiftKey && k === 0 && row) { e.preventDefault(); row.focus(); return true; }
  if (!e.shiftKey && k === inPane.length - 1 && ri >= 0 && ri < prim.length - 1) { e.preventDefault(); prim[ri + 1].focus(); return true; }
  return false;
};

/* ---------------- Phone menu (<= 720px) ----------------
   Three levels in one overlay: root list -> directory (a primary link's sub items) -> category (its inner links).
   Every view stays mounted so each list keeps its own scroll position; only the current view is visible and focusable.
   Built from menuLinks, so no label or link is retyped here. Desktop and tablet keep the two-pane menu. */
const ARROW = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
    <path d="M 4 8 H 12 M 9 5 L 12 8 L 9 11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const BACK = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
    <path d="M 12 8 H 4 M 7 5 L 4 8 L 7 11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
type Pos = { level: 0 | 1 | 2; p: string; c: string };
const pad2 = (i: number) => String(i + 1).padStart(2, "0");

function PhoneMenu({ navigate, overlayRef, path, cur }: { navigate: (e: React.MouseEvent, url: string) => void; overlayRef: React.RefObject<HTMLDivElement>; path: string; cur: Cur }) {
  const [pos, setPos] = React.useState<Pos>({ level: 0, p: "", c: "" });
  const from = React.useRef<string>("");
  const dir = React.useRef<"fwd" | "back">("fwd");
  const lastMove = React.useRef(0);
  const first = React.useRef(true);

  // Ignore a second tap while a view is still sliding (260ms), so it cannot land on a different row.
  const move = (to: Pos, rowKey: string, d: "fwd" | "back") => {
    const now = Date.now();
    if (now - lastMove.current < 280) return;
    lastMove.current = now; from.current = rowKey; dir.current = d; setPos(to);
  };
  const go = (next: Pos, rowKey: string) => move(next, rowKey, "fwd");
  const back = (to: Pos, rowKey: string) => move(to, rowKey, "back");

  // Move focus with the view: forward -> the new view's back control; back -> the row we came from.
  React.useEffect(() => {
    if (first.current) { first.current = false; return; }
    const root = overlayRef.current; if (!root) return;
    const t = setTimeout(() => {
      const el = dir.current === "fwd"
        ? root.querySelector<HTMLElement>(".mm-view.is-current .mm-back")
        : root.querySelector<HTMLElement>(`.mm-view.is-current [data-rowkey="${from.current}"]`);
      (el || root.querySelector<HTMLElement>(".mm-view.is-current .mm-row"))?.focus({ preventScroll: true });
    }, 30);
    return () => clearTimeout(t);
  }, [pos, overlayRef]);

  const state = (level: number, p: string, c: string) => {
    const here = pos.level === level && (level === 0 || (pos.p === p && (level === 1 || pos.c === c)));
    if (here) return "is-current";
    return pos.level > level ? "is-left" : "is-right";
  };
  const inert = (cls: string) => (cls === "is-current" ? {} : ({ inert: "" } as any));
  const withSub = links.filter((l) => l.sub);

  return (
    <div className="mm-views">
      {/* Level 0: root */}
      <div className={"mm-view " + state(0, "", "")} {...inert(state(0, "", ""))}>
        <ul className="mm-list mm-scroll" aria-label="Primary">
          {links.map((l) => (
            <li key={l.label}>
              {l.sub ? (
                <button type="button" className={"mm-row" + (cur.primary === l.label ? " is-current-group" : "")} data-rowkey={"r:" + l.label} aria-label={l.label + ", open submenu"}
                        onClick={() => go({ level: 1, p: l.label, c: "" }, "r:" + l.label)}>
                  <span className="mm-n">{l.n}</span><span className="mm-label">{l.label}</span><span className="mm-arr">{ARROW}</span>
                </button>
              ) : (
                <a className="mm-row" href={href(l.url)} data-rowkey={"r:" + l.label} {...here(pageMatch(l.url, path))} onClick={(e) => navigate(e, href(l.url))}>
                  <span className="mm-n">{l.n}</span><span className="mm-label">{l.label}</span><span className="mm-arr">{ARROW}</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Level 1: directory for each primary link that has sub items */}
      {withSub.map((l) => {
        const st = state(1, l.label, "");
        return (
          <div key={"d:" + l.label} className={"mm-view " + st} {...inert(st)}>
            <div className="mm-bar">
              <button type="button" className="mm-back" onClick={() => back({ level: 0, p: "", c: "" }, "r:" + l.label)}>{BACK}<span>Menu</span></button>
              <a className="mm-page" href={href(l.url)} {...here(pageMatch(l.url, path))} onClick={(e) => navigate(e, href(l.url))}>{l.label} page{ARROW}</a>
            </div>
            <h2 className="mm-title">{l.label}</h2>
            <p className="mm-hint">{l.hint}</p>
            <ul className="mm-list mm-scroll" aria-label={l.label}>
              {l.sub!.map((s, i) => (
                <li key={s.name}>
                  {s.inner ? (
                    <button type="button" className={"mm-row mm-row--two" + (subHolds(s, path) ? " is-current-group" : "")} data-rowkey={"d:" + l.label + ":" + s.expandKey} aria-label={s.name + ", open submenu"}
                            onClick={() => go({ level: 2, p: l.label, c: s.expandKey! }, "d:" + l.label + ":" + s.expandKey)}>
                      <span className="mm-n">{pad2(i)}</span>
                      <span className="mm-body"><span className="mm-label">{s.name}</span><span className="mm-desc">{s.desc}</span></span>
                      <span className="mm-arr">{ARROW}</span>
                    </button>
                  ) : (
                    <a className="mm-row mm-row--two" href={href(s.url)} {...here(pageMatch(s.url, path))} onClick={(e) => navigate(e, href(s.url))}>
                      <span className="mm-n">{pad2(i)}</span>
                      <span className="mm-body"><span className="mm-label">{s.name}</span><span className="mm-desc">{s.desc}</span></span>
                      <span className="mm-arr">{ARROW}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      {/* Level 2: one category's links */}
      {withSub.flatMap((l) => l.sub!.filter((s) => s.inner).map((s) => {
        const st = state(2, l.label, s.expandKey!);
        return (
          <div key={"c:" + l.label + ":" + s.expandKey} className={"mm-view " + st} {...inert(st)}>
            <div className="mm-bar">
              <button type="button" className="mm-back" onClick={() => back({ level: 1, p: l.label, c: "" }, "d:" + l.label + ":" + s.expandKey)}>{BACK}<span>All {l.label}</span></button>
            </div>
            <h2 className="mm-title">{s.name}</h2>
            <p className="mm-hint">{s.desc}</p>
            <ul className="mm-list mm-scroll" aria-label={s.name}>
              {s.inner!.map((it, i) => (
                <li key={it.name}>
                  <a className="mm-row" href={href(it.url)} {...here(pageMatch(it.url, path))} onClick={(e) => navigate(e, href(it.url))}>
                    <span className="mm-n">{pad2(i)}</span><span className="mm-label">{it.name}</span><span className="mm-arr">{ARROW}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );
      }))}
    </div>
  );
}

export default function NavMenu({ source = "site" }: { source?: string }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  // Phone layout (<= 720px). False on the server and first render, so the full link tree stays in the server HTML.
  const [isPhone, setIsPhone] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    const sync = () => setIsPhone(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  const menuBtnRef = React.useRef<HTMLButtonElement>(null);
  // Current page, read on the client (the island renders the same markup on the server, then marks the match).
  const [path, setPath] = React.useState("");
  React.useEffect(() => { setPath(cleanPath(window.location.pathname)); }, []);
  const cur = React.useMemo(() => findCurrent(path), [path]);
  const curRef = React.useRef(cur);
  curRef.current = cur;
  const onClose = React.useCallback(() => setMenuOpen(false), []);

  /* ---------------- Nav ---------------- */
  const [scrolled, setScrolled] = React.useState(false);
  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const tick = () => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" };
      setTime(d.toLocaleTimeString("en-IN", opts) + " IST");
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  /* ---------------- Menu ---------------- */
  const open = menuOpen;
  const triggerRef = menuBtnRef;
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const discRef = React.useRef<HTMLDivElement>(null);
  const paperRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const openTlRef = React.useRef<any>(null);
  const closeTlRef = React.useRef<any>(null);
  const mountedRef = React.useRef(false);
  const [active, setActive] = React.useState("Services");
  const [serviceExpanded, setServiceExpanded] = React.useState("");
  // Waterfall control for the right sub-pane: openEpoch bumps on each open so
  // the pane remounts & replays; subDelayBase is long on open (lets the sun
  // finish expanding first) and short on in-menu swaps.
  const [openEpoch, setOpenEpoch] = React.useState(0);
  const [subDelayBase, setSubDelayBase] = React.useState(0.95);

  const selectPrimary = (label: string) => {
    setSubDelayBase(0.05);
    setActive(label);
    setServiceExpanded("");
  };

  const buildOpenTl = React.useCallback(() => {
    const ls = orStandIn(contentRef.current!.querySelectorAll(".sm-link"));
    const fades = contentRef.current!.querySelectorAll(".sm-fade");
    const corona = overlayRef.current!.querySelector(".sunmenu__corona");
    const heat   = overlayRef.current!.querySelector(".sunmenu__heat");
    const tl = gsap.timeline({ paused: true });
    tl
      .set(overlayRef.current, { pointerEvents: "auto", visibility: "visible" }, 0)
      .set([discRef.current, paperRef.current], { scale: 0, opacity: 1 }, 0)
      .set([corona, heat], { opacity: 0 }, 0)
      .set(ls, { yPercent: -120 }, 0)
      .set(fades, { opacity: 0, y: 14 }, 0)
      // 1. White circle expands from button origin
      .to(discRef.current,
        { scale: 1, duration: 0.95, ease: "expo.out" }, 0)
      // 2. Deep blue circle trails by 200ms, also from button origin
      .to(paperRef.current,
        { scale: 1, duration: 0.95, ease: "expo.out" }, 0.2)
      // 3. Highlights fade in once the dark ground is established
      .to([corona, heat], { opacity: 1, duration: 0.5, ease: "power2.out" }, 0.85)
      // 4. Primary nav items cascade DOWN from the top, top-to-bottom
      .to(ls,
        { yPercent: 0, duration: 0.9, stagger: 0.055, ease: "expo.out" }, 0.9)
      // 5. Other UI fades in (header, tagline, sub-pane, footer)
      .to(fades,
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.045, ease: "power3.out" }, 1.0);
    return tl;
  }, []);

  const buildCloseTl = React.useCallback(() => {
    const ls = orStandIn(contentRef.current!.querySelectorAll(".sm-link"));
    const fades = contentRef.current!.querySelectorAll(".sm-fade");
    const corona = overlayRef.current!.querySelector(".sunmenu__corona");
    const heat   = overlayRef.current!.querySelector(".sunmenu__heat");
    const tl = gsap.timeline({ paused: true });
    tl
      // 1. Sub-pane / header / footer fade out first
      .to(fades,
        { opacity: 0, y: 10, duration: 0.3, stagger: 0.02, ease: "power2.in" }, 0)
      // 2. Primary links slide back up through the top of their clip
      .to(ls,
        { yPercent: -120, duration: 0.5, stagger: 0.035, ease: "expo.in" }, 0.05)
      // 3. Highlights fade out
      .to([corona, heat], { opacity: 0, duration: 0.3, ease: "power2.in" }, 0.25)
      // 4. Deep blue circle collapses back to the button origin
      .to(paperRef.current,
        { scale: 0, duration: 0.85, ease: "expo.in" }, 0.45)
      // 5. White circle trails the paper by 200ms on the way out too
      .to(discRef.current,
        { scale: 0, duration: 0.85, ease: "expo.in" }, 0.65)
      .set(overlayRef.current, { pointerEvents: "none", visibility: "hidden" });
    return tl;
  }, []);

  React.useEffect(() => {
    openTlRef.current = buildOpenTl();
    closeTlRef.current = buildCloseTl();
    return () => {
      openTlRef.current && openTlRef.current.kill();
      closeTlRef.current && closeTlRef.current.kill();
    };
  }, [buildOpenTl, buildCloseTl, isPhone]);

  // Open / close.
  React.useEffect(() => {
    if (!openTlRef.current || !closeTlRef.current) {
      const el = overlayRef.current;
      if (!el) return;
      if (open) {
        el.style.visibility = "visible"; el.style.pointerEvents = "auto";
        el.style.opacity = "1";
        document.body.style.overflow = "hidden"; mountedRef.current = true;
      } else if (mountedRef.current) {
        el.style.visibility = "hidden"; el.style.pointerEvents = "none";
        document.body.style.overflow = "";
      }
      return;
    }
    if (open) {
      // Preselect the group holding the current page (Services when none does), open its category, and replay the waterfall
      setActive(curRef.current.primary || "Services");
      setServiceExpanded(curRef.current.expandKey);
      setSubDelayBase(0.95);
      setOpenEpoch((e) => e + 1);

      const btn = triggerRef && triggerRef.current;
      let cx = window.innerWidth - 80, cy = 40;
      if (btn) {
        const r = btn.getBoundingClientRect();
        cx = r.left + r.width / 2;
        cy = r.top + r.height / 2;
      }
      const farX = Math.max(cx, window.innerWidth - cx);
      const farY = Math.max(cy, window.innerHeight - cy);
      const radius = Math.ceil(Math.hypot(farX, farY)) + 40;
      const size = radius * 2;
      // Both circles sized + anchored to the same button origin
      gsap.set([discRef.current, paperRef.current], {
        width: size, height: size, left: cx - radius, top: cy - radius
      });

      if (closeTlRef.current.isActive()) closeTlRef.current.pause(0);
      openTlRef.current.play(0);
      document.body.style.overflow = "hidden";
      mountedRef.current = true;
    } else if (mountedRef.current) {
      if (openTlRef.current.isActive()) openTlRef.current.pause();
      closeTlRef.current.play(0);
      document.body.style.overflow = "";
      setServiceExpanded("");
    }
  }, [open, triggerRef]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (isPhone) phoneTrapTab(e, overlayRef.current, triggerRef && triggerRef.current);
      else if (!paneTab(e, overlayRef.current)) mmcTrapTab(e, overlayRef.current);
    };
    window.addEventListener("keydown", onKey);
    // Move focus into the menu once the open animation has made it visible: the current group's row when the page is in the menu, else the first row.
    const t = setTimeout(() => {
      const root = overlayRef.current;
      const cg = curRef.current.primary;
      const first = root && ((isPhone
        ? root.querySelector<HTMLElement>(`.mm-view.is-current [data-rowkey="r:${cg}"]`)
        : root.querySelector<HTMLElement>(".sunmenu__primary-row.is-current-group .sunmenu__primary-link")) || (isPhone
        ? root.querySelector<HTMLElement>(".mm-view.is-current .mm-row")
        : root.querySelector<HTMLElement>(".sm-link")?.closest<HTMLElement>("a, button")));
      if (first) first.focus({ preventScroll: true });
    }, 450);
    const trigger = triggerRef && triggerRef.current;
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      // Closing: hand focus back to the Menu button (unless a link click is navigating away).
      if (trigger && overlayRef.current && overlayRef.current.contains(document.activeElement)) trigger.focus({ preventScroll: true });
    };
  }, [open, onClose, triggerRef, isPhone]);

  const navigate = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    onClose();
    setTimeout(() => {
      const [page, hash] = url.split("#");
      if (page === window.location.pathname && hash) {
        const el = document.getElementById(hash);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: "smooth" });
          return;
        }
      }
      window.location.href = url;
    }, 420);
  };

  return (
    <>
      <nav className={"mmc-nav " + (scrolled ? "is-scrolled " : "") + (menuOpen ? "is-menu-open" : "")}>
        <div className="mmc-nav__inner">
          <a className="mmc-nav__mark" href="/" aria-label="Monday Marketing Company">
            <img className="mmc-nav__mark-icon" src="/assets/logo-mark.png" alt="MMC" />
            <span className="mmc-nav__name">
              <span className="mmc-nav__name-mmc">Monday Marketing Company</span>
              <span className="mmc-nav__name-tag">Design × Marketing × Technology × Content × AI</span>
            </span>
          </a>

          <div className="mmc-nav__meta">
            <span className="mmc-nav__meta-dot"></span>
            <span>Onboarding · Clients · Hires  · {time || "-"}</span>
          </div>

          <div className="mmc-nav__actions">
            <button className="mmc-nav__audit" onClick={() => bookCall(source + "-nav")}>
              <span>Book a call</span>
              <span className="mmc-nav__audit-arrow" aria-hidden="true"></span>
            </button>

            <button
              ref={menuBtnRef}
              className={"mmc-menu-btn " + (menuOpen ? "is-open" : "")}
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span className="mmc-menu-btn__halo" aria-hidden="true"></span>
              <span className="mmc-menu-btn__label">
                <span className="mmc-menu-btn__word mmc-menu-btn__word--menu">Menu</span>
                <span className="mmc-menu-btn__word mmc-menu-btn__word--close">Close</span>
              </span>
              <span className="mmc-menu-btn__icon" aria-hidden="true">
                <span></span><span></span><span></span>
              </span>
            </button>
          </div>
        </div>
      </nav>

    <div className="sunmenu" ref={overlayRef} aria-hidden={!open} role="dialog" aria-modal="true" aria-label="Site menu">
      {/* Two concentric circles grow from the menu-button origin */}
      <div className="sunmenu__paper" ref={paperRef} aria-hidden="true"></div>
      <div className="sunmenu__disc" ref={discRef} aria-hidden="true"></div>
      {/* Decorative highlights live above the paper but below content */}
      <div className="sunmenu__corona" aria-hidden="true"></div>
      <div className="sunmenu__heat" aria-hidden="true"></div>

      <div className={"sunmenu__content" + (isPhone ? " sunmenu__content--phone" : "")} ref={contentRef}>
        {isPhone ? (
          <>
            <div className="sm-fade mm-head">
              <div className="sunmenu__eyebrow mm-index">The Index</div>
              <div className="sunmenu__multi mm-multi" aria-label="Design, Marketing, Technology, Content, AI">
                <span>Design</span><span className="x">×</span><span>Marketing</span><span className="x">×</span><span>Technology</span><span className="x">×</span><span>Content</span><span className="x">×</span><span>AI</span>
              </div>
            </div>
            <nav className="sm-fade mm-nav" aria-label="Menu">
              <PhoneMenu key={openEpoch} navigate={navigate} overlayRef={overlayRef} path={path} cur={cur} />
            </nav>
            <div className="sm-fade mm-cta">
              <button className="btn btn--solid-blue glow-btn"
                      onClick={() => { onClose(); setTimeout(() => bookCall(source + "-menu"), 420); }}>
                <span className="glow-btn__glow" aria-hidden="true"></span>
                <span className="glow-btn__inner">
                  {BOOK}
                  <span className="arrow"></span>
                </span>
              </button>
            </div>
          </>
        ) : (
          <>
        {/* Header */}
        <div className="sunmenu__head">
          <div className="sm-fade sunmenu__eyebrow">The Index</div>
          <div className="sm-fade sunmenu__head-meta">
            <span>Since 2015 · Mumbai, Indore</span>
          </div>
        </div>

        {/* Tagline */}
        <div className="sm-fade sunmenu__multi">
          <span>Design</span>
          <span className="x">×</span>
          <span>Marketing</span>
          <span className="x">×</span>
          <span>Technology</span>
          <span className="x">×</span>
          <span>Content</span>
          <span className="x">×</span>
          <span>AI</span>
        </div>

        {/* Two-pane nav */}
        <div className="sunmenu__panes">
          {/* Primary nav */}
          <nav className="sunmenu__primary" aria-label="Primary">
            <ul>
              {links.map((l) => (
                <li key={l.label}
                    className={"sunmenu__primary-row " + (active === l.label ? "is-active" : "") + (cur.primary === l.label ? " is-current-group" : "")}>
                  <a href={href(l.url)}
                     className="sunmenu__primary-link"
                     {...here(pageMatch(l.url, path))}
                     onMouseEnter={() => selectPrimary(l.label)}
                     onFocus={() => { if (active !== l.label) selectPrimary(l.label); }}
                     onClick={(e) => navigate(e, href(l.url))}>
                    <span className="sunmenu__link-clip">
                      <span className="sm-link">
                        <span className="sunmenu__primary-n">{l.n}</span>
                        <span className="sunmenu__primary-label">{l.label}</span>
                        <span className="sunmenu__primary-arrow" aria-hidden="true">
                          <svg viewBox="0 0 16 16" width="14" height="14">
                            <path d="M 4 8 H 12 M 9 5 L 12 8 L 9 11"
                                  fill="none" stroke="currentColor" strokeWidth="1.4"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sub-menu panes. All are rendered so the link tree is crawlable; only the active one is shown. */}
          {links.map((activeItem) => (
          <div className="sunmenu__sub" key={activeItem.label + "#" + openEpoch} hidden={active !== activeItem.label}>
            <div className="sm-wf sunmenu__sub-head" style={{ animationDelay: subDelayBase + "s" }}>
              <span className="sunmenu__sub-eyebrow">{activeItem.label}</span>
              <span className="sunmenu__sub-rule"></span>
            </div>
            <p className="sm-wf sunmenu__sub-hint" style={{ animationDelay: (subDelayBase + 0.07) + "s" }}>{activeItem.hint}</p>

            {activeItem.sub ? (
              <ul className="sunmenu__sub-list">
                {activeItem.sub.map((s, i) => {
                  const isExpanded = !!s.expandKey && serviceExpanded === s.expandKey;
                  return (
                    <li key={s.name}
                        className={"sm-wf sunmenu__sub-item " + (isExpanded ? "is-expanded" : "") + (subHolds(s, path) ? " is-current-group" : "")}
                        style={{ animationDelay: (subDelayBase + 0.14 + i * 0.07) + "s" }}>
                      <div className="sunmenu__sub-row">
                        <a href={href(s.url)}
                           className="sunmenu__sub-link"
                           {...here(!s.inner && pageMatch(s.url, path))}
                           onClick={(e) => {
                             if (s.inner) {
                               e.preventDefault();
                               setServiceExpanded(isExpanded ? "" : s.expandKey!);
                             } else {
                               navigate(e, href(s.url));
                             }
                           }}>
                          <span className="sunmenu__sub-n">{String(i + 1).padStart(2, "0")}</span>
                          <span className="sunmenu__sub-body">
                            <span className="sunmenu__sub-name">{s.name}</span>
                            <span className="sunmenu__sub-desc">{s.desc}</span>
                          </span>
                          <span className="sunmenu__sub-go" aria-hidden="true">
                            <svg viewBox="0 0 16 16" width="14" height="14">
                              <path d="M 4 8 H 12 M 9 5 L 12 8 L 9 11"
                                    fill="none" stroke="currentColor" strokeWidth="1.4"
                                    strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                        </a>
                        {s.inner && (
                          <button className="sunmenu__sub-expand"
                                  onClick={() => setServiceExpanded(isExpanded ? "" : s.expandKey!)}
                                  aria-expanded={isExpanded}
                                  aria-label={isExpanded ? "Collapse" : "Expand inner services"}>
                            <span></span><span></span>
                          </button>
                        )}
                      </div>
                      {s.inner && (
                        <div className="sunmenu__inner" {...(isExpanded ? {} : ({ inert: "" } as any))}>
                          <div className="sunmenu__inner-inner">
                            <ul>
                              {s.inner.map((it, idx) => (
                                <li key={it.name}>
                                  <a href={href(it.url)} {...here(pageMatch(it.url, path))} onClick={(e) => navigate(e, href(it.url))}>
                                    <span className="ix-n">{String(idx + 1).padStart(2, "0")}</span>
                                    <span className="ix-name">{it.name}</span>
                                    <span className="ix-arr" aria-hidden="true">↗</span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <a className="sm-wf sunmenu__sub-cta"
                 href={href(activeItem.url)}
                 {...here(pageMatch(activeItem.url, path))}
                 style={{ animationDelay: (subDelayBase + 0.14) + "s" }}
                 onClick={(e) => navigate(e, href(activeItem.url))}>
                <span>Go to {activeItem.label}</span>
                <span className="arrow">→</span>
              </a>
            )}
          </div>
          ))}
        </div>

        {/* Footer */}
        <div className="sunmenu__foot">
          <div className="sm-fade sunmenu__foot-cols">
            <span><span className="t-muted">Working with</span>&nbsp; D2C, B2B and education brands</span>
            <span><span className="t-muted">In market since</span>&nbsp; 2015</span>
          </div>
          <div className="sm-fade sunmenu__cta-wrap">
            <button className="btn btn--solid-blue glow-btn"
                    onClick={() => { onClose(); setTimeout(() => bookCall(source + "-menu"), 420); }}>
              <span className="glow-btn__glow" aria-hidden="true"></span>
              <span className="glow-btn__inner">
                {BOOK}
                <span className="arrow"></span>
              </span>
            </button>
          </div>
        </div>
          </>
        )}
      </div>
    </div>
    </>
  );
}
