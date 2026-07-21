import React from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App";
import "../styles/index.css";

// Keep the installed PWA's offline shell fresh.
registerSW({ immediate: true });

const container = document.getElementById("root");
if (!container) throw new Error('Root element "#root" not found');

createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
