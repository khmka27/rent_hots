import SpinnerUi from "../ui/SpinnerUi";
import React from "react";

export default function Loader({ showSpinner, children }) {
  if (showSpinner) return <SpinnerUi />;
  return children;
}
