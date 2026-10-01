/* Sky.jsx, Editorial print sun.
   Style: silkscreen flat. Solid disc, crisp solid rays, hairline outline.
   No glow, no halo blur, no red sunset disc. The sun sinks behind the
   horizon (slipping past the bottom) and stars come out in a deep night sky. */

function Sky() {
  const skyRef = React.useRef(null);
  const sunRef = React.useRef(null);
  const raysRef = React.useRef(null);
  const phaseRef = React.useRef("day");

  React.useEffect(() => {
    let raf = 0;
    let lastScroll = window.scrollY;
    let scrollVel = 0;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const y = window.scrollY;
        scrollVel = Math.min(8, Math.abs(y - lastScroll)) / 8;
        lastScroll = y;

        const sj = Math.max(0, Math.min(1, y / max));

        // Arc: low-left → high-center → set below horizon
        let xVw, yVh, opacity = 1;
        if (sj <= 0.5) {
          const t = sj / 0.5;
          const e = 1 - Math.pow(1 - t, 2);
          xVw = 14 + (50 - 14) * e;
          yVh = 92 - (92 - 16) * e;
        } else if (sj <= 0.85) {
          const t = (sj - 0.5) / 0.35;
          const e = Math.pow(t, 1.6);
          xVw = 50 + (84 - 50) * e;
          yVh = 16 + (76 - 16) * e;
        } else {
          const t = (sj - 0.85) / 0.15;
          xVw = 84 + 10 * t;
          yVh = 76 + 70 * t;            // sinks past 100vh
          opacity = Math.max(0, 1 - t * 1.4);
        }

        const sun = sunRef.current;
        const sky = skyRef.current;
        const rays = raysRef.current;
        if (!sun || !sky) return;

        // Subtle scale at horizon (atmospheric refraction)
        const scale = sj < 0.78 ? 1 : 1 + Math.min(0.18, (sj - 0.78) * 0.85);

        sun.style.setProperty("--sun-x", xVw.toFixed(2) + "vw");
        sun.style.setProperty("--sun-y", yVh.toFixed(2) + "vh");
        sun.style.setProperty("--sun-s", scale.toFixed(3));
        sun.style.setProperty("--sun-op", opacity.toFixed(3));

        // Ray rotation speed picks up while scrolling
        const raysSpeed = 120 - scrollVel * 40;
        if (rays) rays.style.animationDuration = raysSpeed.toFixed(1) + "s";

        sky.style.setProperty("--sj", sj.toFixed(4));
        sky.style.setProperty("--sun-vis", opacity.toFixed(3));

        // Phase: day → goldenhr → nightfall (no red disc)
        const phase = sj < 0.6 ? "day" : sj < 0.88 ? "goldenhr" : "nightfall";
        if (phase !== phaseRef.current) {
          phaseRef.current = phase;
          sky.dataset.phase = phase;
        }
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Mouse parallax + cursor magnetism
    let mx = 0, my = 0, tx = 0, ty = 0, raf2 = 0;
    let lastPointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const onMove = (e) => {
      const w = window.innerWidth, h = window.innerHeight;
      lastPointer = { x: e.clientX, y: e.clientY };
      tx = ((e.clientX / w) - 0.5) * 60;
      ty = ((e.clientY / h) - 0.5) * 48;
      if (!raf2) raf2 = requestAnimationFrame(animateMouse);
    };

    const animateMouse = () => {
      raf2 = 0;
      mx += (tx - mx) * 0.085;
      my += (ty - my) * 0.085;

      const sun = sunRef.current;
      if (sun) {
        sun.style.setProperty("--mx", mx.toFixed(2) + "px");
        sun.style.setProperty("--my", my.toFixed(2) + "px");

        // Cursor proximity → outer ring grows
        const rect = sun.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const d = Math.hypot(lastPointer.x - cx, lastPointer.y - cy);
        const norm = Math.min(1, d / Math.hypot(window.innerWidth, window.innerHeight));
        const closeness = 1 - norm;
        sun.style.setProperty("--ring-scale", (1 + closeness * 0.45).toFixed(3));
        sun.style.setProperty("--ring-op", (0.35 + closeness * 0.55).toFixed(3));
      }

      if (Math.abs(tx - mx) > 0.05 || Math.abs(ty - my) > 0.05) {
        raf2 = requestAnimationFrame(animateMouse);
      }
    };
    window.addEventListener("pointermove", onMove);

    const decay = setInterval(() => { scrollVel *= 0.85; }, 100);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onMove);
      if (raf2) cancelAnimationFrame(raf2);
      clearInterval(decay);
    };
  }, []);

  // 16 solid rays, 8 long alternating with 8 short
  const rays = React.useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => {
      const angle = (i * 360) / 16;
      const isLong = i % 2 === 0;
      return {
        angle,
        length: isLong ? 64 : 42,
        width: 2,
        key: i,
      };
    });
  }, []);

  return (
    <div className="sky" ref={skyRef} aria-hidden="true">
      <div className="sky__paper"></div>
      <div className="sky__golden"></div>
      <div className="sky__night"></div>

      {/* Stars */}
      <div className="sky__stars">
        {Array.from({ length: 60 }).map((_, i) => {
          const left = Math.abs((Math.sin(i * 12.9898) * 43758.5453) % 1);
          const top = Math.abs((Math.sin(i * 78.233) * 12345.678) % 1);
          const size = 1 + ((Math.cos(i * 5.0) + 1) / 2) * 1.6;
          const delay = (i * 140) % 2800;
          return (
            <span key={i} className="sky__star" style={{
              left: (left * 100) + "%",
              top: (top * 78) + "%",
              width: size + "px", height: size + "px",
              animationDelay: delay + "ms"
            }}></span>
          );
        })}
      </div>

      <div className="sky__horizon"></div>

      {/* THE SUN, flat editorial silkscreen */}
      <div className="sky__sun" ref={sunRef}>
        {/* Outer thin ring, grows with cursor */}
        <span className="sky__sun-ring"></span>

        {/* Rays, wrapper rotates slowly */}
        <span className="sky__sun-rays">
          <span className="sky__sun-rays-inner" ref={raysRef}>
            {rays.map((r) => (
              <span key={r.key} className="sky__sun-ray" style={{
                transform: `translate(-50%, -50%) rotate(${r.angle}deg) translateY(-${r.length + 100}px)`,
                height: `${r.length}px`,
                width: `${r.width}px`,
              }}></span>
            ))}
          </span>
        </span>

        {/* Inner concentric ring, sits just outside disc */}
        <span className="sky__sun-inring"></span>

        {/* The disc: flat fill, no gradient blur */}
        <span className="sky__sun-disc"></span>
      </div>

      <div className="sky__grain"></div>

      <style>{`
        .sky {
          position: fixed; inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
          --sj: 0;
          --sun-vis: 1;
        }

        /* ---- Sky layers ---- */
        .sky__paper {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% 100%,
              rgba(var(--mmc-yellow-rgb), 0.13) 0%, rgba(var(--mmc-yellow-rgb), 0.03) 40%, rgba(var(--mmc-yellow-rgb), 0) 70%),
            var(--mmc-paper);
          opacity: calc(1 - clamp(0, (var(--sj) - 0.6) * 2.6, 1));
        }
        /* Golden hour wash, warm but no red */
        .sky__golden {
          position: absolute; inset: 0;
          background:
            linear-gradient(180deg,
              rgba(255, 220, 160, 0.0) 0%,
              rgba(255, 200, 130, 0.16) 35%,
              rgba(243, 170, 100, 0.28) 70%,
              rgba(224, 140, 88, 0.36) 100%);
          opacity: calc(clamp(0, (var(--sj) - 0.55) * 2.8, 1) - clamp(0, (var(--sj) - 0.9) * 6, 1));
        }
        /* Night, cool deep blue */
        .sky__night {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, #0A1E47 0%, #0F2A55 50%, #143568 100%);
          opacity: clamp(0, (var(--sj) - 0.88) * 5.5, 1);
        }

        /* Stars */
        .sky__stars {
          position: absolute; inset: 0;
          opacity: clamp(0, (var(--sj) - 0.82) * 6, 1);
          transition: opacity 240ms linear;
        }
        .sky__star {
          position: absolute;
          background: #FFE7B0;
          border-radius: 50%;
          opacity: 0.92;
          box-shadow: 0 0 5px rgba(255, 231, 176, 0.5);
          animation: twinkle 3.4s var(--ease-in-out) infinite;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.92; transform: scale(1); }
          50%      { opacity: 0.32; transform: scale(0.6); }
        }

        .sky__horizon {
          position: absolute; left: 0; right: 0; bottom: 0;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%, rgba(var(--mmc-yellow-rgb), 0.45) 50%, transparent 100%);
          opacity: calc(clamp(0, (var(--sj) - 0.55) * 2.4, 1) - clamp(0, (var(--sj) - 0.93) * 8, 1));
        }

        /* ============================================================
           THE SUN, flat editorial silkscreen
           ============================================================ */
        .sky__sun {
          position: absolute;
          left: var(--sun-x, 14vw);
          top:  var(--sun-y, 92vh);
          width: 200px;
          height: 200px;
          --mx: 0px;
          --my: 0px;
          --sun-op: 1;
          --ring-scale: 1;
          --ring-op: 0.35;
          transform: translate(calc(-50% + var(--mx)), calc(-50% + var(--my))) scale(var(--sun-s, 1));
          opacity: var(--sun-op, 1);
          will-change: transform, left, top, opacity;
          transition: transform 380ms cubic-bezier(0.22, 1, 0.36, 1),
                      opacity 400ms linear;
        }

        /* Outer ring, grows with cursor (replaces the old soft halo) */
        .sky__sun-ring {
          position: absolute;
          inset: -30%;
          border-radius: 50%;
          border: 1.5px solid var(--mmc-yellow);
          opacity: var(--ring-op, 0.35);
          transform: scale(var(--ring-scale, 1));
          transition: transform 420ms var(--ease-out), opacity 420ms var(--ease-out),
                      border-color 1200ms linear;
          pointer-events: none;
        }
        .sky[data-phase="goldenhr"] .sky__sun-ring { border-color: #E89760; }
        .sky[data-phase="nightfall"] .sky__sun-ring { opacity: 0; }

        /* Inner ring: hugs disc, hairline */
        .sky__sun-inring {
          position: absolute;
          inset: -8%;
          border-radius: 50%;
          border: 1px solid var(--mmc-yellow);
          opacity: 0.6;
          transition: border-color 1200ms linear, opacity 600ms linear;
          pointer-events: none;
        }
        .sky[data-phase="goldenhr"] .sky__sun-inring { border-color: #D17C40; opacity: 0.5; }
        .sky[data-phase="nightfall"] .sky__sun-inring { opacity: 0; }

        /* Rays, wrapper rotates */
        .sky__sun-rays {
          position: absolute; inset: 0;
          pointer-events: none;
        }
        .sky__sun-rays-inner {
          position: absolute; inset: 0;
          animation: sunRays 120s linear infinite;
          will-change: transform;
        }
        @keyframes sunRays { to { transform: rotate(360deg); } }
        /* Solid flat ray, no gradient blur */
        .sky__sun-ray {
          position: absolute;
          left: 50%; top: 50%;
          background: var(--mmc-yellow);
          transform-origin: 50% 100%;
          border-radius: 1px;
          transition: background 1200ms linear, opacity 600ms linear;
        }
        .sky[data-phase="goldenhr"] .sky__sun-ray {
          background: #D87F40;
        }
        .sky[data-phase="nightfall"] .sky__sun-ray { opacity: 0; }

        /* The disc: solid fill, hairline outline */
        .sky__sun-disc {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: var(--mmc-yellow);
          box-shadow:
            inset 0 0 0 1.5px #C77800,
            0 0 0 1.5px #C77800;
          transition: background 1200ms linear, box-shadow 1200ms linear;
        }
        /* Subtle internal texture: 3 concentric tone rings, hand-drawn feel */
        .sky__sun-disc::before {
          content: "";
          position: absolute;
          inset: 12%;
          border-radius: 50%;
          border: 1px solid rgba(199, 120, 0, 0.42);
          pointer-events: none;
        }
        .sky__sun-disc::after {
          content: "";
          position: absolute;
          inset: 28%;
          border-radius: 50%;
          border: 1px solid rgba(199, 120, 0, 0.28);
          pointer-events: none;
        }
        /* Golden-hour: warmer amber, deeper outline */
        .sky[data-phase="goldenhr"] .sky__sun-disc {
          background: #E89760;
          box-shadow:
            inset 0 0 0 1.5px #8A3A14,
            0 0 0 1.5px #8A3A14;
        }
        .sky[data-phase="goldenhr"] .sky__sun-disc::before { border-color: rgba(138, 58, 20, 0.55); }
        .sky[data-phase="goldenhr"] .sky__sun-disc::after  { border-color: rgba(138, 58, 20, 0.38); }

        /* Grain */
        .sky__grain {
          position: absolute; inset: 0;
          pointer-events: none;
          opacity: 0.22;
          mix-blend-mode: multiply;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.07  0 0 0 0 0.05  0 0 0 0 0.03  0 0 0 0.045 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
        }

        @media (max-width: 720px) {
          .sky__sun { width: 160px; height: 160px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sky__sun-rays-inner { animation: none; }
          .sky__sun { transition: none; }
        }
      `}</style>
    </div>
  );
}

window.Sky = Sky;
