import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./i18n.jsx";

// Register Service Worker for PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        console.log("Service Worker registered with scope:", reg.scope);
      })
      .catch((err) => {
        console.error("Service Worker registration failed:", err);
      });
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <LanguageProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </LanguageProvider>
);