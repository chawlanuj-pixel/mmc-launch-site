import React from "react";
import { JdPage } from "./JdPage.jsx";

/* The role is chosen from ?role= in the browser, as before. The server (and the first client render)
   show the default posting; the query string is applied right after mount. keyed so hooks reset per role. */
export default function JdRoot() {
  const [slug, setSlug] = React.useState("senior-meta-buyer");
  React.useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("role");
    if (s) setSlug(s);
  }, []);
  return <JdPage key={slug} slug={slug} onAudit={() => window.mmcBookCall("careers-role-" + slug)} />;
}
