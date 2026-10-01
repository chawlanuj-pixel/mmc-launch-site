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

const bookCall = (src: string) => { const w = window as any; if (w.mmcBookCall) w.mmcBookCall(src); };

export default function NavMenu({ source = "site" }: { source?: string }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuBtnRef = React.useRef<HTMLButtonElement>(null);
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
    const ls = contentRef.current!.querySelectorAll(".sm-link");
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
    const ls = contentRef.current!.querySelectorAll(".sm-link");
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
  }, [buildOpenTl, buildCloseTl]);

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
      // Preselect Services every time menu opens, and replay the waterfall
      setActive("Services");
      setServiceExpanded("");
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
      else mmcTrapTab(e, overlayRef.current);
    };
    window.addEventListener("keydown", onKey);
    // Move focus into the menu once the open animation has made it visible.
    const t = setTimeout(() => {
      const first = overlayRef.current && overlayRef.current.querySelector<HTMLElement>(".sm-link")?.closest<HTMLElement>("a, button");
      if (first) first.focus({ preventScroll: true });
    }, 450);
    const trigger = triggerRef && triggerRef.current;
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      // Closing: hand focus back to the Menu button (unless a link click is navigating away).
      if (trigger && overlayRef.current && overlayRef.current.contains(document.activeElement)) trigger.focus({ preventScroll: true });
    };
  }, [open, onClose, triggerRef]);

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

      <div className="sunmenu__content" ref={contentRef}>
        {/* Header */}
        <div className="sunmenu__head">
          <div className="sm-fade sunmenu__eyebrow">The Index</div>
          <div className="sm-fade sunmenu__head-meta">
            <span>Est. 2019 · Thane, Mumbai, Indore</span>
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
                    className={"sunmenu__primary-row " + (active === l.label ? "is-active" : "")}>
                  <a href={href(l.url)}
                     className="sunmenu__primary-link"
                     onMouseEnter={() => selectPrimary(l.label)}
                     onFocus={() => selectPrimary(l.label)}
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
                        className={"sm-wf sunmenu__sub-item " + (isExpanded ? "is-expanded" : "")}
                        style={{ animationDelay: (subDelayBase + 0.14 + i * 0.07) + "s" }}>
                      <div className="sunmenu__sub-row">
                        <a href={href(s.url)}
                           className="sunmenu__sub-link"
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
                        <div className="sunmenu__inner">
                          <div className="sunmenu__inner-inner">
                            <ul>
                              {s.inner.map((it, idx) => (
                                <li key={it.name}>
                                  <a href={href(it.url)} onClick={(e) => navigate(e, href(it.url))}>
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
            <span><span className="t-muted">In market since</span>&nbsp; 2019</span>
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
      </div>
    </div>
    </>
  );
}
