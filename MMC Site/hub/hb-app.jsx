/* hub/hb-app.jsx: composes an audience hub. Nav, Menu, Footer and the cookie banner are the shared components. */
function HbApp() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuBtnRef = React.useRef(null);
  const key = window.HUB.key;
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
                  onOpenMenu={() => setMenuOpen((v) => !v)} onAudit={() => window.mmcBookCall(key + "-nav")} />
      <window.Menu open={menuOpen} triggerRef={menuBtnRef}
                   onClose={() => setMenuOpen(false)} onAudit={() => window.mmcBookCall(key + "-menu")} />
      <main className="app-main n-app">
        <window.HbHero />
        <window.HbAnswer />
        <window.HbArticle />
        <window.HbStages />
        {window.HUB.loop && window.HUB.loop.variant === "b" && window.HbLoopB ? <window.HbLoopB /> : <window.HbLoop />}
        <window.HbNumbers />
        <window.HbBrands />
        <window.HbBeyond />
        <window.HbFaq />
        <window.HbCta />
        <window.Footer onAudit={() => window.mmcBookCall(key + "-footer")} />
      </main>
      <window.HbSticky />
      <window.CookieBanner />
    </>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<HbApp />);
