/* about/ab-app.jsx, Root mount for the About page. */

const { useState: useStateAb, useRef: useRefAb, useEffect: useEffectAb } = React;

function AbApp() {
  const [menuOpen, setMenuOpen] = useStateAb(false);
  const [auditOpen, setAuditOpen] = useStateAb(false);
  const menuBtnRef = useRefAb(null);

  useEffectAb(() => {
    const onMove = (e) => {
      document.querySelectorAll(".glow-btn").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
          el.style.setProperty("--gx", (e.clientX - r.left) + "px");
          el.style.setProperty("--gy", (e.clientY - r.top) + "px");
        }
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <>
      <window.Nav menuBtnRef={menuBtnRef} menuOpen={menuOpen} onOpenMenu={() => setMenuOpen((v) => !v)} onAudit={() => window.mmcBookCall()} />
      <window.Menu open={menuOpen} triggerRef={menuBtnRef} onClose={() => setMenuOpen(false)} onAudit={() => window.mmcBookCall()} />
      <main className="app-main">
        <window.AbHero onAudit={() => window.mmcBookCall()} />
        <window.ClientsStrip />
        <window.AbShift />
        <window.AbThesis />
        <window.AbApproach />
        <window.AbConnected />
        <window.AbFuture />
        <window.AbWhy />
        <window.AbIndustries />
        <window.AbCTA onAudit={() => window.mmcBookCall()} />
        <window.Footer onAudit={() => window.mmcBookCall()} cta={{ label: "Start the conversation", href: "#cta" }} />
      </main>
      <window.AuditModal open={auditOpen} onClose={() => setAuditOpen(false)} />
      <window.CookieBanner />
    </>
  );
}
const abRoot = ReactDOM.createRoot(document.getElementById("root"));
abRoot.render(<AbApp />);
