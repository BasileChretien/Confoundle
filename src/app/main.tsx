import React from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/space-grotesk";
import App from "./App";
import { CrashScreen, ErrorBoundary } from "./ErrorBoundary";
import { landingRewrite } from "./navigation";
import { hasEverPlayed } from "./session";
import { getOpeningPuzzle, loadPuzzles } from "../puzzles";
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
const container = document.getElementById("root");
if (!container) throw new Error('Root element "#root" not found');

const root = createRoot(container);

/**
 * NOTHING RENDERS UNTIL THE REGISTRY IS IN MEMORY, and that is a change in
 * timing rather than in cost.
 *
 * The puzzle content used to be part of this very bundle, so it was already
 * blocking the first paint; it simply blocked it invisibly. Moving it behind a
 * dynamic import buys a shell that is a quarter of the size and an install
 * that no longer carries all 73 cards, at the price of one extra round trip
 * that was previously hidden inside the first one. See `puzzles/index.ts`.
 *
 * THE FAILURE PATH IS THE POINT OF DOING IT HERE. `ErrorBoundary` cannot catch
 * this: the load happens before React exists, and a rejected chunk would
 * otherwise leave the container empty, which in an installed app opened from a
 * home screen is indistinguishable from the app being broken. `CrashScreen` is
 * exported for exactly this kind of caller, translates through `UI` without
 * needing a fetch, and offers a reload.
 */
loadPuzzles().then(
  () => {
    /*
      The landing rule still runs ONCE, before anything is rendered, for the
      reasons set out above. It needs the registry, so it waits for it.
    */
    const rewrite = landingRewrite(
      window.location.search,
      hasEverPlayed(),
      getOpeningPuzzle().slug,
    );
    if (rewrite !== null) window.history.replaceState(null, "", rewrite);

    root.render(
      <React.StrictMode>
        {/*
          OUTSIDE EVERYTHING, INCLUDING THE LOCALE PROVIDER. A boundary placed
          inside cannot catch a failure in the provider or in the dictionary
          loading it does, which is the failure that would otherwise leave the
          whole installed app blank with no message and no way back.
        */}
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>,
    );
  },
  () => {
    root.render(
      <React.StrictMode>
        <CrashScreen />
      </React.StrictMode>,
    );
  },
);
