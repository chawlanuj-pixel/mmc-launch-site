import React from "react";
import { CLIENTS, csFit } from "../../lib/hub";

/* Client name to logo id (clients-strip.jsx CS_BY_NAME). */
const BY_NAME = {};
Object.entries(CLIENTS).forEach(([id, c]) => { BY_NAME[c.name.toLowerCase()] = id; });

/* The logo slot: wordmark in the display type, real logo cross-fades over it once assets/clients/<id>.png loads. */
export function Wordmark({ name, className }) {
  const id = BY_NAME[String(name || "").toLowerCase()];
  const [got, setGot] = React.useState(false);
  const ref = React.useRef(null);
  /* The server-rendered <img> may finish loading before hydration, when React never sees its load event. */
  React.useEffect(() => { const im = ref.current; if (im && im.complete && im.naturalWidth > 0) setGot(true); }, []);
  return (
    <span className={"cs-logo-wrap " + (className || "")}>
      <span className="cs-logo">
        <span className={"cs-wm" + (got ? " is-off" : "")} style={{ "--cs-wm-k": csFit(name) }}>{name}</span>
        {id && (
          <img ref={ref} className={"cs-logo__img" + (got ? " is-on" : "")} src={"/assets/clients/" + id + ".png"}
               alt={name} loading="lazy" decoding="async"
               onLoad={() => setGot(true)} onError={() => setGot(false)} />
        )}
      </span>
    </span>
  );
}

/* Content is CMS-driven when a read-only Airtable token is configured in admin/mmc-data.js; otherwise the baked rows render. */
export function useCms(table, fallback, map) {
  const [rows, setRows] = React.useState(fallback);
  React.useEffect(() => {
    const D = window.MMCData;
    if (!D || !D.content) return;
    let live = true;
    D.content(table, fallback).then((r) => {
      if (!live || !Array.isArray(r) || r === fallback || !r.length) return;
      try {
        const ordered = r.slice().sort((a, b) => (a.order == null ? 1e9 : a.order) - (b.order == null ? 1e9 : b.order));
        const mapped = ordered.map(map).filter((x) => x && x.b);
        if (mapped.length) setRows(mapped);
      } catch (e) { /* malformed row: keep the baked-in copy */ }
    });
    return () => { live = false; };
  }, []);
  return rows;
}

export function pickImg(v) {
  if (!v) return "";
  if (Array.isArray(v)) return (v[0] && (v[0].url || v[0].thumbnails && v[0].thumbnails.large && v[0].thumbnails.large.url)) || "";
  return String(v);
}

export const splitList = (v) => Array.isArray(v) ? v : String(v || "").split(/\s*[,|]\s*/).filter(Boolean);

/* The designed tile is always underneath; a real photo fades in over it once it loads. */
export function Shot({ src, brand, tag, compact }) {
  const [loaded, setLoaded] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => { const im = ref.current; if (im && im.complete && im.naturalWidth > 0) setLoaded(true); }, [src]);
  return (
    <>
      <span className="n-shot" aria-hidden={loaded ? "true" : undefined}>
        <span className="n-shot__b">{brand}</span>
        {!compact && <span className="n-shot__t">{tag}</span>}
      </span>
      {src && (
        <img ref={ref} src={src} alt={brand + ", " + tag} loading="lazy"
             className={"n-shot__img" + (loaded ? " is-on" : "")}
             onLoad={() => setLoaded(true)} onError={() => setLoaded(false)} />
      )}
    </>
  );
}
