/* performance/pm-app.jsx: composes the Performance marketing page.
   Nav, Menu, Footer and the cookie banner are the shared components, unchanged. */

function PmApp() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuBtnRef = React.useRef(null);
  const review = /[?&]review\b/.test(window.location.search);

  React.useEffect(() => { document.documentElement.classList.toggle("pm-review", review); }, [review]);
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
                  onOpenMenu={() => setMenuOpen((v) => !v)} onAudit={() => window.mmcBookCall("pm-nav")} />
      <window.Menu open={menuOpen} triggerRef={menuBtnRef}
                   onClose={() => setMenuOpen(false)} onAudit={() => window.mmcBookCall("pm-menu")} />
      <main className="app-main n-app">
        <window.PmHero />
        <window.PmAnswer />
        <window.PmMargin />
        <window.PmClaims />
        <window.PmPayback />
        <window.PmChannels />
        <window.PmProcess />
        <window.PmWho />
        <window.PmProof />
        <window.PmFaq />
        <window.PmRelated />
        <window.PmCta />
        <window.Footer onAudit={() => window.mmcBookCall("pm-footer")} />
      </main>
      <window.PmSticky />
      <window.CookieBanner />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<PmApp />);
