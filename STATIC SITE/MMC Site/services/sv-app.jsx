/* services/sv-app.jsx: composes the Services hub. Nav, Menu, Footer and the cookie banner are the shared components. */
function SvApp() {
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
                  onOpenMenu={() => setMenuOpen((v) => !v)} onAudit={() => window.mmcBookCall("services-nav")} />
      <window.Menu open={menuOpen} triggerRef={menuBtnRef}
                   onClose={() => setMenuOpen(false)} onAudit={() => window.mmcBookCall("services-menu")} />
      <main className="app-main n-app">
        <window.SvHero />
        <window.SvAnswer />
        <window.SvSystems />
        <window.SvStart />
        <window.SvWork />
        <window.SvFaq />
        <window.SvCta />
        <window.Footer onAudit={() => window.mmcBookCall("services-footer")} />
      </main>
      <window.SvSticky />
      <window.CookieBanner />
    </>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<SvApp />);
