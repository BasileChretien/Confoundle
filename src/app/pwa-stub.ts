/**
 * Stand-in for `virtual:pwa-register` used only in the single-file build
 * (`SINGLEFILE=1`), where vite-plugin-pwa is disabled. Keeps main.tsx's import
 * resolvable; the returned updater is a no-op since there's no service worker.
 */
export function registerSW(_options?: unknown): (reload?: boolean) => void {
  return () => {};
}
