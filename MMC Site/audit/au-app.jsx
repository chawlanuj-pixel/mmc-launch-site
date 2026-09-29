/* audit/au-app.jsx: composes the Audit page. Nav, Menu, Footer, the audit brief modal
   and the cookie banner are the shared components. */
function AuApp() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuBtnRef = React.useRef(null);
  window.useReveal && window.useReveal();
  React.useEffect(() => {
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
      <window.Nav menuBtnRef={menuBtnRef} menuOpen={menuOpen}
                  onOpenMenu={() => setMenuOpen((v) => !v)} onAudit={() => window.mmcBookCall("audit-nav")} />
      <window.Menu open={menuOpen} triggerRef={menuBtnRef}
                   onClose={() => setMenuOpen(false)} onAudit={() => window.mmcBookCall("audit-menu")} />
      <main className="app-main n-app">
        <window.AuHero />
        <window.AuLooks />
        <window.AuSteps />
        <window.AuBook />
        <window.AuFit />
        <window.AuFaq />
        <window.Footer onAudit={() => window.mmcBookCall("audit-footer")} />
      </main>
      <window.AuditModal />
      <window.CookieBanner />
    </>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<AuApp />);
