import * as React from "react";
import * as ReactDOM from "react-dom";
import "./overlay.less";

export default function Overlay(props) {
  return ReactDOM.createPortal(
    <div className="date-picker-overlay" />,
    document.querySelector("body")
  );
}
