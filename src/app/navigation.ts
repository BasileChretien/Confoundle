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
  | { name: "lesson"; slug: string }
  | { name: "review"; practice: boolean }
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

  if (params.get("progress") === "1") return { name: "progress" };

  return HOME;
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
