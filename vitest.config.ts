import { defineConfig } from "vitest/config";

// Kept separate from vite.config.ts so the PWA plugin / service worker does not
// run during unit tests. The engine logic under test is DOM-free (pure derivation).
export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
