import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./i18n.jsx";

import { registerSW } from 'virtual:pwa-register';

// Register Service Worker for PWA
if ("serviceWorker" in navigator) {
  registerSW({
    immediate: true,
    onRegisterError(error) {
      console.error("Service Worker registration failed:", error);
    }
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <LanguageProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </LanguageProvider>
);