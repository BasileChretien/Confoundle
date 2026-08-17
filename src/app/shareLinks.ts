import { searchForView } from "./navigation";

/**
 * Where a shared thing points.
 *
 * THE DEFECT THIS EXISTS TO FIX. The result card is the atomic shareable unit,
 * the thing the whole share beat is built to produce, and it carried NO WAY
 * BACK TO THE APP: its footer was a wordmark rather than an address, and the
 * text handed to the OS share sheet was `"<caption>, Confoundle"`. Somebody who
 * saw a card in a story had to guess that "confoundle" was a dot-org and type
 * it. The only URL anywhere in a share path was in `FriendsBoard`, hardcoded to
 * `https://confoundle.pages.dev`, the preview host rather than the canonical
 * domain, so the one link that existed pointed at the wrong place.
 *
 * PURE, AND TAKES THE ORIGIN AS AN ARGUMENT, for the reason every other derived
 * module here does: it can be tested without a DOM, and a future Remotion
 * template or server renderer can call it with an origin of its own. Callers in
 * the app pass `window.location.origin`, which is also what `ShareLesson`
 * already does. Reading the live origin rather than a build-time constant is
 * deliberate: a fork, a preview deployment and a local dev server each emit
 * links to themselves, which is what someone testing a share flow needs, and
 * `SITE_ORIGIN` stays what it is for, the absolute URLs baked into prerendered
 * lesson pages where no browser exists to ask.
 */

/**
 * A link that opens the puzzle at its SETUP beat, so the receiver is challenged
 * rather than spoiled.
 *
 * This is the opposite choice from `lessonPath`, and the difference is the
 * point. A lesson page opens on the answer because a debate link that tests the
 * reader reads as a trap. A card that says "bet you can't" has to open on the
 * puzzle, or the boast arrives with its own solution attached.
 */
export function puzzleUrl(origin: string, slug: string): string {
  return `${trimOrigin(origin)}/${searchForView({ name: "lesson", slug })}`;
}

/** The app's front door, for a share that is not about one puzzle. */
export function appUrl(origin: string): string {
  return `${trimOrigin(origin)}/`;
}

/**
 * What the CARD prints, which is the host and nothing else.
 *
 * The card is a PNG. A URL on it is not a link, it is something a person reads
 * and retypes, and a query string is exactly the part that gets mistyped. The
 * full deep link belongs in the share TEXT, which is real text and clickable;
 * the image carries the shortest thing that still gets somebody there. This
 * also survives the common case where the image is screenshotted and reposted
 * with the text stripped off.
 */
export function displayHost(origin: string): string {
  const trimmed = trimOrigin(origin);
  return trimmed.replace(/^https?:\/\//, "").replace(/^www\./, "");
}

/** Drop a trailing slash so callers can always add their own. */
function trimOrigin(origin: string): string {
  return origin.replace(/\/+$/, "");
}

/**
 * The origin the app is being served from, or an empty string where there is
 * no browser.
 *
 * `ShareCard` is rendered by `shareCardLocalized.test.ts` through
 * `renderToStaticMarkup` in the node environment, where `window` does not
 * exist, so reading `window.location.origin` straight out of a component body
 * throws during that render. The guard is what makes the value safe to reach
 * for from render rather than only from an event handler.
 *
 * Components take the origin as a PROP defaulted to this, rather than calling
 * it inline, so a test can pass a real origin and actually exercise the markup
 * the browser will produce. Defaulting to "" and leaving it there would have
 * made the card render without its address under test while still printing one
 * in production, which is the shape of a test that guards nothing.
 */
export function currentOrigin(): string {
  return typeof window === "undefined" ? "" : window.location.origin;
}
