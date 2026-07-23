import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { viteSingleFile } from "vite-plugin-singlefile";

// `SINGLEFILE=1 vite build` inlines everything (JS, CSS, fonts) into one
// self-contained dist-single/index.html, for publishing a playable build where
// a static host isn't available. The PWA/service worker is dropped in that mode.
const singleFile = process.env.SINGLEFILE === "1";

const pwa = VitePWA({
  registerType: "autoUpdate",
  includeAssets: ["favicon.svg"],
  workbox: {
    // The bundle crossed workbox's 2 MiB precache default once the tenth
    // language landed: every dictionary is imported eagerly by
    // app/translations/index.ts, so a reader in France downloads Bengali,
    // Arabic, Hindi, Japanese, Chinese and Russian too.
    //
    // Raising the ceiling keeps the app installable and fully offline, which
    // is the property that matters, but it is a stopgap and not the fix. The
    // fix is to load each dictionary on demand, which needs the locale
    // resolved before first paint (or an accepted flash of English), so it is
    // a real change rather than a config tweak. Revisit before adding an
    // eleventh language.
    maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
  },
  manifest: {
    name: "Confoundle",
    short_name: "Confoundle",
    description:
      "Spot the hidden variable. A daily reasoning puzzle that fools you, then shows you the trick.",
    theme_color: "#f2ecde",
    background_color: "#f2ecde",
    display: "standalone",
    orientation: "portrait",
    start_url: "/",
    icons: [
      { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  // Enables the in-app puzzle picker in the single-file demo build only.
  define: { __DEMO__: JSON.stringify(singleFile) },
  plugins: singleFile ? [react(), viteSingleFile()] : [react(), pwa],
  resolve: singleFile
    ? {
        // No PWA plugin in single-file mode: point its virtual module at a stub.
        alias: {
          "virtual:pwa-register": fileURLToPath(
            new URL("./src/app/pwa-stub.ts", import.meta.url),
          ),
        },
      }
    : undefined,
  build: singleFile
    ? {
        outDir: "dist-single",
        assetsInlineLimit: 100_000_000,
        chunkSizeWarningLimit: 100_000,
        cssCodeSplit: false,
        // Emit one IIFE bundle (no ES-module semantics) so the extracted page
        // runs as a classic <script> in any sandbox, however it injects scripts.
        rollupOptions: {
          output: { format: "iife", inlineDynamicImports: true },
        },
      }
    : undefined,
});
