/* utils.jsx, small shared utilities.
   <Num value="₹248Cr+" />: counts up the numeric portion when scrolled into view,
   while keeping any prefix (currency, sign) and suffix (units) static.

   Also exposes useInViewOnce(ref), boolean that flips true the first time the
   element enters the viewport, then sticks. */

(function () {
  const { useState, useEffect, useRef } = React;

  function useInViewOnce(ref, { threshold = 0.25, rootMargin = "0px 0px -10% 0px" } = {}) {
    const [seen, setSeen] = useState(false);
    useEffect(() => {
      if (seen) return;
      const el = ref.current;
      if (!el) return;
      if (typeof IntersectionObserver === "undefined") {
        setSeen(true);
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) { setSeen(true); io.disconnect(); break; }
          }
        },
        { threshold, rootMargin }
      );
      io.observe(el);
      return () => io.disconnect();
    }, [ref, seen, threshold, rootMargin]);
    return seen;
  }

  /* Parse strings like "₹248Cr+", "8.7×", "+412%", "14/14", "1.4s", "100%",
     "₹148Cr+", "240+", "8,400+", "27mo", "0→1": separates leading non-digit prefix,
     the first numeric run (with optional decimals or comma groups), and the rest. */
  function parseNumeric(value) {
    if (value == null) return null;
    const s = String(value);
    // Don't try to animate things like "0→1" or "1 : 4", leave them static.
    if (/[→/:]/.test(s)) return null;
    const m = s.match(/^(\D*)([\d,]+(?:\.\d+)?)(.*)$/);
    if (!m) return null;
    const prefix = m[1];
    const cleaned = m[2].replace(/,/g, "");
    const n = Number(cleaned);
    if (!isFinite(n)) return null;
    // Preserve whether the original had a comma grouping (for thousands)
    const hasComma = /,/.test(m[2]);
    // Preserve decimals
    const decMatch = m[2].match(/\.(\d+)$/);
    const decimals = decMatch ? decMatch[1].length : 0;
    return { prefix, n, suffix: m[3], hasComma, decimals };
  }

  function formatN(n, decimals, hasComma) {
    let out = n.toFixed(decimals);
    if (hasComma) {
      const [intPart, decPart] = out.split(".");
      const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      out = decPart != null ? grouped + "." + decPart : grouped;
    }
    return out;
  }

  function Num({ value, duration = 1400, className = "", style }) {
    const ref = useRef(null);
    const inView = useInViewOnce(ref);
    const parsed = parseNumeric(value);

    const [display, setDisplay] = useState(() => {
      if (!parsed) return value;
      return parsed.prefix + formatN(0, parsed.decimals, parsed.hasComma) + parsed.suffix;
    });

    useEffect(() => {
      if (!parsed) return;
      if (!inView) return;
      let raf;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        // easeOutQuart for that premium feel
        const eased = 1 - Math.pow(1 - t, 4);
        const cur = parsed.n * eased;
        setDisplay(parsed.prefix + formatN(cur, parsed.decimals, parsed.hasComma) + parsed.suffix);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, [inView, parsed && parsed.n, duration]);

    if (!parsed) {
      return <span ref={ref} className={className} style={style}>{value}</span>;
    }
    return <span ref={ref} className={className} style={style}>{display}</span>;
  }

  window.useInViewOnce = useInViewOnce;
  window.Num = Num;
})();
