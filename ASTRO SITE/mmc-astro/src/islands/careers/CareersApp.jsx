import React from "react";
import { CrPage } from "./CrPage.jsx";
export default function CareersApp() {
  return <CrPage onAudit={() => window.mmcBookCall("careers")} />;
}
