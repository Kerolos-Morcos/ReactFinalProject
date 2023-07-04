import React, { useEffect } from "react";
import "./spinner.css";
export default function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
}