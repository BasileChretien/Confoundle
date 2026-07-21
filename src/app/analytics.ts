/**
 * No-op analytics stub. Phase 0 collects nothing and calls no network. This
 * exists only to fix the funnel event names (PROJECT_PLAN §13) so a real,
 * privacy-respecting/aggregate backend (e.g. Plausible/Umami) can be wired in
 * later without touching call sites. Never add personal or behavioral data here.
 */
export type AnalyticsEvent =
  | "puzzle_view"
  | "commit"
  | "reveal_view"
  | "lesson_view"
  | "share_open"
  | "share_caption_select"
  | "share_export"
  | "replay";

export function track(
  event: AnalyticsEvent,
  props: Record<string, unknown> = {},
): void {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, props);
  }
  // Intentionally no network call in Phase 0.
}
