/* Menu.jsx: Sunrise Menu, space-conscious two-pane.
   Left pane: primary nav (6 items). Right pane: contextual sub-menu
   that swaps when you hover or click a primary item.
   Services has its own inner sub-menu (each category expands in place). */

function Menu({ open, triggerRef, onClose, onAudit }) {
  const overlayRef = React.useRef(null);
  const discRef = React.useRef(null);
  const paperRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const openTlRef = React.useRef(null);
  const closeTlRef = React.useRef(null);
  const mountedRef = React.useRef(false);
  const [active, setActive] = React.useState("Services");
  const [serviceExpanded, setServiceExpanded] = React.useState("");
  // Waterfall control for the right sub-pane: openEpoch bumps on each open so
  // the pane remounts & replays; subDelayBase is long on open (lets the sun
  // finish expanding first) and short on in-menu swaps.
  const [openEpoch, setOpenEpoch] = React.useState(0);
  const [subDelayBase, setSubDelayBase] = React.useState(0.95);

  const selectPrimary = (label) => {
    setSubDelayBase(0.05);
    setActive(label);
    setServiceExpanded("");
  };

  const links = [
    {
      n: "01", label: "Home", url: "index.html",
      hint: "We build revenue engines."
    },
    {
      n: "03", label: "Our Work", url: "Our Work.html",
      hint: "Featured · Growth Blueprints · Industries"
    },
    {
      n: "04", label: "Free Tools", url: "tools.html",
      hint: "Six calculators + a 53-term glossary",
      sub: [
        {
          name: "Calculators", desc: "Run your own numbers",
          url: "tools.html", expandKey: "calculators",
          inner: [
            { name: "Unit Economics Calculator",   url: "unit-economics-calculator.html" },
            { name: "Growth Trajectory Calculator", url: "growth-trajectory-calculator.html" },
            { name: "CAC Runway Calculator",       url: "cac-runway-calculator.html" },
            { name: "Funnel ROAS Calculator",      url: "funnel-roas-calculator.html" },
            { name: "Break-even ROAS Calculator",  url: "breakeven-roas-calculator.html" },
            { name: "LTV : CAC Calculator",        url: "ltv-cac-calculator.html" },
            { name: "D2C Marketing Glossary",      url: "d2c-marketing-glossary.html" },
          ]
        },
      ]
    },
    {
      n: "05", label: "About Us", url: "About.html",
      hint: "Story · Team · Awards · Press"
    },
    {
      n: "06", label: "Careers", url: "Careers.html",
      hint: "6 open senior roles · Apply with one page",
      sub: [
        {
          name: "Performance", desc: "Run media at scale",
          url: "Careers.html", expandKey: "performance",
          inner: [
            { name: "Senior Meta Buyer · Mumbai",           url: "Job Detail.html?role=senior-meta-buyer" },
            { name: "Google + Amazon Specialist · Mumbai",  url: "Job Detail.html?role=google-amazon-specialist" },
          ]
        },
        {
          name: "Creative", desc: "Direct + write the work",
          url: "Careers.html", expandKey: "creative",
          inner: [
            { name: "Senior Art Director · Mumbai",        url: "Job Detail.html?role=senior-art-director" },
            { name: "Performance Copywriter · Remote",     url: "Job Detail.html?role=performance-copywriter" },
          ]
        },
        {
          name: "Strategy", desc: "Own a P&L",
          url: "Careers.html", expandKey: "strategy",
          inner: [
            { name: "Growth Strategist · D2C · Mumbai",     url: "Job Detail.html?role=growth-strategist" },
          ]
        },
        {
          name: "Technology", desc: "Ship the stack",
          url: "Careers.html", expandKey: "tech",
          inner: [
            { name: "Shopify Plus Engineer · Remote",       url: "Job Detail.html?role=shopify-engineer" },
          ]
        },
      ]
    },
    {
      n: "06", label: "Insights", url: "Insights.html",
      hint: "Founder's Journal · Playbooks · Breakdowns"
    },
    {
      n: "07", label: "Contact", url: "Contact.html",
      hint: "Book a call · Visit Thane"
    },
  ];

  // Build a forward (open) timeline; close uses an explicit mirrored sequence
  // so the unwind reads cleanly instead of stuttering on reverse.
  const buildOpenTl = React.useCallback(() => {
    const gsap = window.gsap;
    if (!gsap) return null;
    const links = contentRef.current.querySelectorAll(".sm-link");
    const fades = contentRef.current.querySelectorAll(".sm-fade");
    const corona = overlayRef.current.querySelector(".sunmenu__corona");
    const heat   = overlayRef.current.querySelector(".sunmenu__heat");
    const tl = gsap.timeline({ paused: true });
    tl
      .set(overlayRef.current, { pointerEvents: "auto", visibility: "visible" }, 0)
      .set([discRef.current, paperRef.current], { scale: 0, opacity: 1 }, 0)
      .set([corona, heat], { opacity: 0 }, 0)
      .set(links, { yPercent: -120 }, 0)
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
      .to(links,
        { yPercent: 0, duration: 0.9, stagger: 0.055, ease: "expo.out" }, 0.9)
      // 5. Other UI fades in (header, tagline, sub-pane, footer)
      .to(fades,
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.045, ease: "power3.out" }, 1.0);
    return tl;
  }, []);

  const buildCloseTl = React.useCallback(() => {
    const gsap = window.gsap;
    if (!gsap) return null;
    const links = contentRef.current.querySelectorAll(".sm-link");
    const fades = contentRef.current.querySelectorAll(".sm-fade");
    const corona = overlayRef.current.querySelector(".sunmenu__corona");
    const heat   = overlayRef.current.querySelector(".sunmenu__heat");
    const tl = gsap.timeline({ paused: true });
    tl
      // 1. Sub-pane / header / footer fade out first
      .to(fades,
        { opacity: 0, y: 10, duration: 0.3, stagger: 0.02, ease: "power2.in" }, 0)
      // 2. Primary links slide back up through the top of their clip
      .to(links,
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

  // Open / close. The timelines are the animation; without GSAP the overlay is
  // still toggled outright so the menu keeps working rather than staying hidden.
  React.useEffect(() => {
    const gsap = window.gsap;
    if (!openTlRef.current || !closeTlRef.current || !gsap) {
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
    const onKey = (e) => { if (e.key === "Escape" && open) onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const navigate = (e, url) => {
    e.preventDefault();
    onClose();
    setTimeout(() => {
      const here = window.location.pathname.split("/").pop();
      const [page, hash] = url.split("#");
      if ((page === here || (here === "" && page === "index.html")) && hash) {
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

  const activeItem = links.find((l) => l.label === active) || links[1];

  return (
    <div className="sunmenu" ref={overlayRef} aria-hidden={!open}>
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
            <span>06 surfaces · 30+ services</span>
            <span className="dot"></span>
            <span>Est. 2019 · Thane</span>
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
                  <a href={l.url}
                     className="sunmenu__primary-link"
                     onMouseEnter={() => selectPrimary(l.label)}
                     onFocus={() => selectPrimary(l.label)}
                     onClick={(e) => navigate(e, l.url)}>
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

          {/* Sub-menu pane, minimal for non-services items */}
          <div className="sunmenu__sub" key={activeItem.label + "#" + openEpoch}>
            <div className="sm-wf sunmenu__sub-head" style={{ animationDelay: subDelayBase + "s" }}>
              <span className="sunmenu__sub-eyebrow">{activeItem.label}</span>
              <span className="sunmenu__sub-rule"></span>
            </div>
            <p className="sm-wf sunmenu__sub-hint" style={{ animationDelay: (subDelayBase + 0.07) + "s" }}>{activeItem.hint}</p>

            {activeItem.sub ? (
              <ul className="sunmenu__sub-list">
                {activeItem.sub.map((s, i) => {
                  const isExpanded = s.expandKey && serviceExpanded === s.expandKey;
                  return (
                    <li key={s.name}
                        className={"sm-wf sunmenu__sub-item " + (isExpanded ? "is-expanded" : "")}
                        style={{ animationDelay: (subDelayBase + 0.14 + i * 0.07) + "s" }}>
                      <div className="sunmenu__sub-row">
                        <a href={s.url}
                           className="sunmenu__sub-link"
                           onClick={(e) => {
                             if (s.inner) {
                               e.preventDefault();
                               setServiceExpanded(isExpanded ? "" : s.expandKey);
                             } else {
                               navigate(e, s.url);
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
                                  onClick={() => setServiceExpanded(isExpanded ? "" : s.expandKey)}
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
                                  <a href={it.url} onClick={(e) => navigate(e, it.url)}>
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
                 href={activeItem.url}
                 style={{ animationDelay: (subDelayBase + 0.14) + "s" }}
                 onClick={(e) => navigate(e, activeItem.url)}>
                <span>Go to {activeItem.label}</span>
                <span className="arrow">→</span>
              </a>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sunmenu__foot">
          <div className="sm-fade sunmenu__foot-cols">
            <span><span className="t-muted">Currently building for</span>&nbsp; 24 brands</span>
            <span><span className="t-muted">In market since</span>&nbsp; 2019</span>
            <span><span className="t-muted">Revenue compounded</span>&nbsp; ₹248Cr+</span>
          </div>
          <div className="sm-fade sunmenu__cta-wrap">
            <button className="btn btn--solid-blue glow-btn"
                    onClick={() => { onClose(); setTimeout(onAudit, 420); }}>
              <span className="glow-btn__glow" aria-hidden="true"></span>
              <span className="glow-btn__inner">
                Get a free brand audit
                <span className="arrow"></span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .sunmenu {
          position: fixed; inset: 0;
          z-index: 70;
          visibility: hidden;
          pointer-events: none;
          isolation: isolate;
        }
        /* White glow circle: expands first from the button origin,
           sits behind the paper so it ends covered once paper completes */
        .sunmenu__disc {
          position: absolute; border-radius: 50%;
          background:
            radial-gradient(circle at 50% 50%,
              rgba(255,255,255,1) 0%,
              rgba(255,255,255,0.96) 30%,
              rgba(235,242,255,0.85) 55%,
              rgba(200,218,245,0.45) 80%,
              rgba(180,200,235,0) 100%);
          box-shadow:
            0 0 120px 30px rgba(255,255,255,0.35),
            0 0 220px 60px rgba(255,255,255,0.18);
          will-change: transform, opacity;
          transform-origin: center;
          z-index: 1;
        }
        /* Brand blue circle: trails by 200ms, covers the white disc */
        .sunmenu__paper {
          position: absolute; border-radius: 50%;
          background: var(--mmc-blue); /* brand blue var(--mmc-blue) */
          will-change: transform, opacity;
          transform-origin: center;
          z-index: 2;
        }
        /* Subtle highlight in the top-right corner, kept faint enough
           to not tint the brand blue */
        .sunmenu__corona {
          position: absolute;
          right: clamp(-120px, -5vw, -40px);
          top: clamp(-160px, -9vw, -80px);
          width: clamp(380px, 50vmin, 640px);
          height: clamp(380px, 50vmin, 640px);
          border-radius: 50%;
          background: radial-gradient(circle at 50% 50%,
            rgba(255, 255, 255, 0.14) 0%,
            rgba(255, 255, 255, 0.06) 40%,
            rgba(255, 255, 255, 0) 72%);
          filter: blur(14px); pointer-events: none;
          z-index: 3;
          opacity: 0;
          mix-blend-mode: screen;
          transform-origin: center;
        }
        .sunmenu__heat { display: none; }

        .sunmenu__content {
          position: absolute;
          inset: 0;
          z-index: 3;
          padding: clamp(90px, 9vh, 110px) clamp(28px, 5vw, 80px) 22px;
          display: grid;
          grid-template-rows: auto auto 1fr auto;
          gap: clamp(10px, 1.2vw, 18px);
          color: #FFFFFF;
        }

        /* Header */
        .sunmenu__head {
          display: flex; align-items: center; justify-content: space-between;
          gap: 24px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255,255,255,0.22);
        }
        .sunmenu__eyebrow {
          font-family: var(--font-body); font-size: 11px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #FFFFFF;
          display: inline-flex; align-items: center; gap: 12px;
        }
        .sunmenu__eyebrow::before {
          content: ""; width: 24px; height: 1.5px; background: var(--mmc-yellow);
        }
        .sunmenu__head-meta {
          display: inline-flex; align-items: center; gap: 14px;
          font-family: var(--font-body); font-size: 11.5px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255,255,255,0.7);
        }
        .sunmenu__head-meta .dot { width: 4px; height: 4px; border-radius: 50%; background: var(--mmc-yellow); }

        /* Tagline */
        .sunmenu__multi {
          display: flex; flex-wrap: wrap; gap: 14px; align-items: baseline;
          padding: 4px 0 14px;
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(18px, 2vw, 26px);
          letter-spacing: -0.02em;
          color: #FFFFFF;
          border-bottom: 1px solid rgba(255,255,255,0.22);
        }
        .sunmenu__multi .x {
          font-family: var(--font-serif); font-style: italic; font-weight: 500;
          color: var(--mmc-yellow); opacity: 0.95; font-size: 0.95em;
        }

        /* TWO-PANE NAV */
        .sunmenu__panes {
          display: grid;
          grid-template-columns: 0.4fr 0.6fr;
          gap: clamp(28px, 4vw, 64px);
          padding-top: clamp(8px, 1.2vw, 16px);
          min-height: 0;
        }

        /* Primary nav (left) */
        .sunmenu__primary { min-width: 0; }
        .sunmenu__primary ul { list-style: none; margin: 0; padding: 0; }
        .sunmenu__primary-row { border-bottom: 1px solid rgba(255,255,255,0.16); }
        .sunmenu__primary-row:last-child { border-bottom: 0; }
        .sunmenu__primary-row.is-active { background: rgba(255,255,255,0.08); }
        .sunmenu__primary-link {
          display: block;
          padding: clamp(10px, 1.4vw, 16px) clamp(10px, 1.4vw, 18px) clamp(10px, 1.4vw, 16px) 0;
          color: rgba(255,255,255,0.78);
          transition: padding var(--dur-base) var(--ease-out),
                      color var(--dur-base) var(--ease-out);
        }
        .sunmenu__primary-row.is-active .sunmenu__primary-link,
        .sunmenu__primary-link:hover {
          padding-left: 18px;
          color: #FFFFFF;
        }
        .sunmenu__link-clip { display: block; overflow: hidden; }
        .sm-link {
          display: inline-flex; align-items: baseline; gap: 16px;
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(26px, 3vw, 44px);
          letter-spacing: -0.025em; line-height: 1;
          color: inherit;
          width: 100%;
        }
        .sunmenu__primary-n {
          font-family: var(--font-body); font-weight: 600;
          font-size: 11px; letter-spacing: 0.18em;
          color: rgba(255,255,255,0.5);
          transform: translateY(-0.4em);
        }
        .sunmenu__primary-label { flex: 1; }
        .sunmenu__primary-arrow {
          color: rgba(255,255,255,0.4);
          display: inline-flex; align-items: center;
          transform: translateY(-0.2em);
          transition: transform var(--dur-base) var(--ease-out),
                      color var(--dur-base) var(--ease-out);
        }
        .sunmenu__primary-row.is-active .sunmenu__primary-arrow,
        .sunmenu__primary-link:hover .sunmenu__primary-arrow {
          color: var(--mmc-yellow);
          transform: translate(4px, -0.2em);
        }

        /* Sub-menu (right) */
        .sunmenu__sub {
          min-width: 0;
          padding-left: clamp(20px, 2.4vw, 36px);
          border-left: 1px solid rgba(255,255,255,0.18);
          overflow-y: auto;
          overscroll-behavior: contain;
        }
        /* Waterfall reveal, each row of the right pane drops in top-to-bottom.
           Delays are set inline so they cascade on open and on every swap. */
        .sm-wf { opacity: 0; will-change: transform, opacity; animation: smWaterfall 0.52s var(--ease-out) both; }
        @keyframes smWaterfall {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sm-wf { opacity: 1; animation: none; }
        }
        .sunmenu__sub-head {
          display: flex; align-items: center; gap: 14px;
          margin-bottom: 4px;
        }
        .sunmenu__sub-eyebrow {
          font-family: var(--font-body); font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--mmc-yellow);
        }
        .sunmenu__sub-rule {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0.3), transparent);
        }
        .sunmenu__sub-overview {
          font-family: var(--font-body); font-size: 11px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #FFFFFF;
          display: inline-flex; align-items: center; gap: 6px;
        }
        .sunmenu__sub-overview .arrow {
          transition: transform var(--dur-base) var(--ease-out);
          display: inline-block;
        }
        .sunmenu__sub-overview:hover .arrow { transform: translateX(4px); }

        .sunmenu__sub-hint {
          font-family: var(--font-serif); font-style: italic; font-weight: 500;
          font-size: 14px; color: rgba(255,255,255,0.85);
          margin: 0 0 12px;
        }

        /* Minimal CTA for items without sub-services */
        .sunmenu__sub-cta {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          margin-top: 12px;
          padding: 18px 24px;
          background: var(--mmc-yellow);
          color: var(--mmc-blue-700);
          border-radius: 999px;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: background var(--dur-base) var(--ease-out),
                      transform var(--dur-base) var(--ease-out);
        }
        .sunmenu__sub-cta:hover {
          background: #FFC940;
          color: var(--mmc-blue-700);
          transform: translateY(-1px);
          position: relative; z-index: 2;
        }
        .sunmenu__sub-cta .arrow {
          font-family: var(--font-display); font-size: 16px;
          transition: transform var(--dur-base) var(--ease-out);
        }
        .sunmenu__sub-cta:hover .arrow { transform: translateX(4px); }

        .sunmenu__sub-list { list-style: none; margin: 0; padding: 0; }
        .sunmenu__sub-item { border-top: 1px solid rgba(255,255,255,0.14); }
        .sunmenu__sub-item:first-child { border-top: 0; }
        .sunmenu__sub-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 0;
          align-items: stretch;
        }
        .sunmenu__sub-link {
          display: grid;
          grid-template-columns: 32px 1fr 22px;
          gap: 12px;
          align-items: center;
          padding: 12px 14px 12px 0;
          color: rgba(255,255,255,0.82);
          transition: padding var(--dur-base) var(--ease-out),
                      background var(--dur-base) var(--ease-out),
                      color var(--dur-base) var(--ease-out);
        }
        .sunmenu__sub-link:hover {
          padding-left: 10px;
          background: rgba(255,255,255,0.06);
          color: #FFFFFF;
        }
        .sunmenu__sub-n {
          font-family: var(--font-body); font-weight: 700;
          font-size: 10.5px; letter-spacing: 0.2em;
          color: var(--mmc-yellow); opacity: 0.75;
        }
        .sunmenu__sub-body {
          display: flex; flex-direction: column; gap: 2px;
          min-width: 0;
        }
        .sunmenu__sub-name {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(15px, 1.3vw, 17px);
          letter-spacing: -0.012em;
          color: inherit;
          transition: color var(--dur-base) var(--ease-out);
        }
        .sunmenu__sub-link:hover .sunmenu__sub-name { color: #FFFFFF; }
        .sunmenu__sub-desc {
          font-family: var(--font-body); font-size: 11.5px;
          color: rgba(255,255,255,0.6);
          letter-spacing: 0.01em;
        }
        .sunmenu__sub-go {
          color: rgba(255,255,255,0.4);
          display: inline-flex; align-items: center;
          transition: transform var(--dur-base) var(--ease-out),
                      color var(--dur-base) var(--ease-out);
        }
        .sunmenu__sub-link:hover .sunmenu__sub-go {
          transform: translateX(4px);
          color: var(--mmc-yellow);
        }

        /* Expand button for service rows */
        .sunmenu__sub-expand {
          width: 38px;
          background: transparent;
          border-left: 1px solid rgba(255,255,255,0.14);
          color: rgba(255,255,255,0.85);
          position: relative;
          cursor: pointer;
          transition: background var(--dur-base) var(--ease-out);
        }
        .sunmenu__sub-expand:hover { background: rgba(255,255,255,0.08); }
        .sunmenu__sub-expand span {
          position: absolute; left: 50%; top: 50%;
          width: 11px; height: 1.5px;
          background: currentColor;
          transform: translate(-50%, -50%);
          transition: transform var(--dur-base) var(--ease-out),
                      opacity var(--dur-base) var(--ease-out);
        }
        .sunmenu__sub-expand span:nth-child(2) {
          transform: translate(-50%, -50%) rotate(90deg);
        }
        .sunmenu__sub-item.is-expanded .sunmenu__sub-expand span:nth-child(2) {
          transform: translate(-50%, -50%) rotate(0);
          opacity: 0;
        }

        /* Inner sub-services accordion */
        .sunmenu__inner {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 440ms var(--ease-out);
        }
        .sunmenu__sub-item.is-expanded .sunmenu__inner {
          grid-template-rows: 1fr;
        }
        .sunmenu__inner-inner { overflow: hidden; }
        .sunmenu__inner ul {
          list-style: none; margin: 0; padding: 0 0 16px 44px;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 0 18px;
          opacity: 0;
          transform: translateY(-4px);
          transition: opacity 320ms var(--ease-out) 100ms,
                      transform 320ms var(--ease-out) 100ms;
        }
        .sunmenu__sub-item.is-expanded .sunmenu__inner ul {
          opacity: 1;
          transform: translateY(0);
        }
        .sunmenu__inner a {
          display: grid;
          grid-template-columns: 24px 1fr 16px;
          gap: 8px;
          align-items: center;
          padding: 8px 0;
          color: rgba(255,255,255,0.78);
          border-bottom: 1px solid rgba(255,255,255,0.10);
          transition: padding var(--dur-base) var(--ease-out),
                      color var(--dur-base) var(--ease-out);
        }
        .sunmenu__inner a:hover {
          padding-left: 8px;
          color: #FFFFFF;
        }
        .ix-n {
          font-family: var(--font-body); font-weight: 700;
          font-size: 9.5px; letter-spacing: 0.2em;
          color: var(--mmc-yellow); opacity: 0.7;
        }
        .ix-name {
          font-family: var(--font-display); font-weight: 600;
          font-size: 13.5px; letter-spacing: -0.005em;
          color: inherit;
        }
        .ix-arr { color: var(--mmc-yellow); font-size: 11px; opacity: 0.85; }

        /* Footer */
        .sunmenu__foot {
          display: flex; align-items: center; justify-content: space-between;
          gap: 22px; flex-wrap: wrap;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.22);
        }
        .sunmenu__foot-cols {
          display: flex; gap: 28px; flex-wrap: wrap;
          font-family: var(--font-body); font-size: 12px;
          font-weight: 600; letter-spacing: 0.04em;
          color: #FFFFFF;
        }
        .sunmenu__foot-cols .t-muted {
          color: rgba(255,255,255,0.55); font-weight: 500;
        }
        /* CTA: yellow button reads boldly on blue ground */
        .btn--solid-blue {
          background: var(--mmc-yellow); color: var(--mmc-blue-700);
        }
        .btn--solid-blue:hover {
          transform: translateY(-1px);
          background: #FFC940;
          color: var(--mmc-blue-700);
          box-shadow: 0 18px 40px -16px rgba(0, 0, 0, 0.45);
          position: relative; z-index: 2;
        }

        @media (max-width: 980px) {
          .sunmenu__panes { grid-template-columns: 1fr; gap: 22px; }
          .sunmenu__sub { padding-left: 0; border-left: 0; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.22); }
          .sunmenu__primary { max-height: 38vh; overflow-y: auto; }
          .sm-link { font-size: clamp(22px, 4vw, 32px); }
        }
        @media (max-width: 720px) {
          .sunmenu__content { padding: 90px 22px 18px; }
          .sunmenu__multi { font-size: clamp(15px, 4vw, 20px); gap: 10px; }
          .sunmenu__inner ul { grid-template-columns: 1fr; padding-left: 32px; }
          .sunmenu__head-meta { display: none; }
        }
        @media (max-height: 760px) {
          .sunmenu__content { padding-top: 80px; gap: 8px; }
          .sm-link { font-size: clamp(22px, 2.8vw, 36px); }
          .sunmenu__multi { padding: 4px 0 10px; font-size: 18px; }
        }
      `}</style>
    </div>
  );
}

window.Menu = Menu;
