import { getPuzzleBySlug } from "../puzzles";

/**
 * The app's view model, as a URL.
 *
 * It used to be three independent booleans in `useState`, which meant the
 * address bar never changed and the History stack never grew. The phone back
 * button therefore did not go up a level, it LEFT THE APP, and in an installed
 * PWA it did nothing at all, so a learner on the progress screen had one small
 * button at the bottom of a long scroll as their only way out. Reloading always
 * dumped you back at the list, and a lesson you were reading could not be
 * linked to even though the app invites you to share lessons.
 *
 * Pure and separate from React so the parsing and the URL building are testable
 * without rendering anything.
 */

export type View =
  | { name: "home" }
  | { name: "about" }
  | { name: "lessons" }
  | { name: "lesson"; slug: string }
  | { name: "review"; practice: boolean }
  | { name: "trapHunt" }
  | { name: "publishGame" }
  | { name: "calibrationRun" }
  | { name: "dailyRun" }
  | { name: "progress" };

export const HOME: View = { name: "home" };

/** Read a view out of a URL's query string, falling back to home. */
export function viewFromSearch(search: string): View {
  const params = new URLSearchParams(search);

  const slug = params.get("p");
  if (slug && getPuzzleBySlug(slug)) return { name: "lesson", slug };

  const review = params.get("review");
  if (review === "1") return { name: "review", practice: false };
  if (review === "practice") return { name: "review", practice: true };

  if (params.get("hunt") === "1") return { name: "trapHunt" };
  if (params.get("game") === "publish") return { name: "publishGame" };
  if (params.get("about") === "1") return { name: "about" };
  if (params.get("lessons") === "1") return { name: "lessons" };
  if (params.get("run") === "daily") return { name: "dailyRun" };
  if (params.get("run") === "1") return { name: "calibrationRun" };
  if (params.get("progress") === "1") return { name: "progress" };

  return HOME;
}

/**
 * The view the app OPENS on, which is not always the one the URL names.
 *
 * A first-time visitor arriving at the bare root lands in a puzzle rather than
 * on a pitch. The old first screen was roughly 197 words arguing that the app
 * is trustworthy, delivered before the fifteen seconds that demonstrate it,
 * which is the wrong order for this product specifically: trust here is earned
 * by being fooled once and shown the source, so those words were spent buying
 * something the reveal gives away for free.
 *
 * A LANDING RULE, NOT A HOME-SCREEN RULE, and that distinction is what stops
 * it becoming a trap. It fires only when the URL names no view AND nothing has
 * ever been answered on this device. Somebody who abandons the opener and then
 * deliberately taps Home still gets the home screen, because they asked for
 * it. Applied on every home render instead, a newcomer trying to leave would
 * be bounced straight back into the puzzle they were leaving.
 *
 * Pure, and takes `hasPlayed` and the slug as arguments, so the whole rule is
 * testable without a DOM, a store, or a registry.
 */
export function landingView(
  search: string,
  hasPlayed: boolean,
  openerSlug: string,
): View {
  const fromUrl = viewFromSearch(search);
  // A URL that names anything at all wins: a shared link, a bookmark and a
  // refresh must all land where they say, newcomer or not.
  if (fromUrl.name !== "home") return fromUrl;
  if (hasPlayed) return fromUrl;
  return { name: "lesson", slug: openerSlug };
}

/**
 * The query string the landing rule wants written, or `null` to leave the URL
 * exactly as it is.
 *
 * NULL IS THE IMPORTANT RETURN VALUE. An earlier version rewrote the address
 * bar on every load by resynthesising it through `searchForView`, which
 * silently dropped the fragment and any query parameter the `View` union does
 * not model, campaign tags among them. Nothing depended on those, but it
 * turned a byte-identical round trip into a lossy one for no gain. Rewriting
 * only when the view actually changed keeps the no-op case genuinely a no-op.
 *
 * Pure so the whole rule, decision and rewrite alike, is testable without a
 * History API.
 */
export function landingRewrite(
  search: string,
  hasPlayed: boolean,
  openerSlug: string,
): string | null {
  const current = viewFromSearch(search);
  const target = landingView(search, hasPlayed, openerSlug);
  return sameView(current, target) ? null : searchForView(target);
}

/**
 * The query string for a view. Home is "." rather than "?" so a shared home
 * link stays clean, and so returning home does not leave a stale parameter
 * behind that a refresh would then act on.
 */
export function searchForView(view: View): string {
  switch (view.name) {
    case "lesson":
      return `?p=${encodeURIComponent(view.slug)}`;
    case "review":
      return view.practice ? "?review=practice" : "?review=1";
    case "trapHunt":
      return "?hunt=1";
    case "publishGame":
      return "?game=publish";
    case "about":
      return "?about=1";
    case "lessons":
      return "?lessons=1";
    case "calibrationRun":
      return "?run=1";
    case "dailyRun":
      return "?run=daily";
    case "progress":
      return "?progress=1";
    case "home":
      return ".";
  }
}

/** Two views are the same entry if they would produce the same URL. */
export function sameView(a: View, b: View): boolean {
  return searchForView(a) === searchForView(b);
}
