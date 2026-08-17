import React from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/space-grotesk";
import App from "./App";
import { landingRewrite } from "./navigation";
import { hasEverPlayed } from "./session";
import { getOpeningPuzzle } from "../puzzles";
import "../styles/index.css";

// Keep the installed PWA's offline shell fresh.
registerSW({ immediate: true });

/**
 * The landing rule runs ONCE, here, before React exists, as a URL rewrite.
 *
 * WHY NOT IN A COMPONENT. It first lived in `useState`'s lazy initializer in
 * `App`, which looks like "runs once" and is not: React re-invokes it on every
 * fresh mount, and `LocaleProvider` renders `null` while a dictionary is being
 * fetched, which unmounts the whole shell and mounts it again. So a newcomer
 * who left the opener for the home screen and then picked a language, which is
 * the first thing many non-English readers do and the switcher is right there
 * in the header, was silently thrown back into the puzzle they had just left.
 * Exactly the trap the rule's own comment claims to avoid. Found by mounting
 * the real tree and driving it through a locale switch; no pure test of
 * `landingView` could have seen it, because the defect is in how often it runs.
 *
 * Normalising the URL instead makes the question moot. After this, the address
 * bar is the single source of truth and every later mount just reads it, so
 * remounting cannot re-decide anything. It also means the landing is
 * shareable and survives a refresh, and that the back button leaves the app
 * rather than bouncing between the bare root and the opener.
 *
 * IT REWRITES ONLY WHEN IT ACTUALLY REDIRECTS. An earlier version rewrote the
 * URL through `searchForView` on every load, which silently dropped the hash
 * and any query parameter the `View` union does not model, campaign tags
 * included. Nothing depended on those, but it was a lossy resynthesis where
 * the previous code was a byte-identical round trip.
 */
const rewrite = landingRewrite(
  window.location.search,
  hasEverPlayed(),
  getOpeningPuzzle().slug,
);
if (rewrite !== null) window.history.replaceState(null, "", rewrite);

const container = document.getElementById("root");
if (!container) throw new Error('Root element "#root" not found');

createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
