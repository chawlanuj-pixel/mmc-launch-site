import React from "react";
import { CtPage } from "./CtPage.jsx";
export default function ContactApp() {
  return <CtPage onAudit={() => window.mmcBookCall()} />;
}
