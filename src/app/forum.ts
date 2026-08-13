/**
 * The discussion link, and the reasons it is a link rather than a comment box.
 *
 * Discourse ships an official embedded-comments script, and it is the obvious
 * thing to reach for. It is not usable here. `public/privacy.html` states that
 * Cloudflare Web Analytics is the ONLY measurement on the site, that it sets no
 * cookie and builds no identifier; an embed loads third-party JavaScript into
 * the page and, for anyone signed in to the forum, carries their session with
 * it. That is a different privacy policy, not a feature. It would also put a
 * network dependency inside a shell whose whole promise is that it works
 * offline once loaded. So: an ordinary link, opened in a new tab, and nothing
 * from the forum ever executes in this origin.
 *
 * TWO CONSEQUENCES WORTH KNOWING BEFORE CHANGING ANY OF THIS.
 *
 * The link carries `rel="noreferrer"`, not merely `noopener`. Without it the
 * forum learns which card the reader was on at the moment they clicked, which
 * is exactly the per-card behavioural crumb the policy promises not to leave.
 * `noopener` alone does not suppress the Referer header.
 *
 * The destination is a TAG page rather than a topic id. A topic id would have
 * to exist before the link could be written, which means seeding dozens of
 * threads into an empty forum and keeping a mapping in step with the registry
 * forever. A tag page needs nothing seeded: it renders for an unknown tag, and
 * the first reader who wants to talk about a card opens the thread that every
 * later reader then lands on. The cost is that a forum must allow ordinary
 * users to apply a tag, which is NOT the Discourse default. See docs.
 */

/**
 * Unset means the feature does not exist, not that it is broken. A build with
 * no forum behind it hides the link entirely, the same way a build with no
 * functions behind it hides the account panel.
 */
const RAW = import.meta.env.VITE_FORUM_ORIGIN;

/**
 * A misconfigured origin must fail closed. An env var that arrived with a path,
 * a query, or an http scheme would otherwise be pasted straight into an anchor
 * and shipped, and the failure would look like a working link.
 */
function normalise(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim().replace(/\/+$/, "");
  if (!trimmed) return null;
  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return null;
  }
  // https only: the link leaves a page that is itself https, and a downgrade
  // would be both a mixed-content warning and a plaintext record of the visit.
  if (url.protocol !== "https:") return null;
  // No path, query or fragment. Anything there is a sign the value was pasted
  // from a browser address bar mid-session, e.g. an /admin URL.
  if (url.pathname !== "/" || url.search || url.hash) return null;
  return url.origin;
}

export const FORUM_ORIGIN: string | null = normalise(RAW);

export function isForumEnabled(): boolean {
  return FORUM_ORIGIN !== null;
}

/**
 * Discourse tag slugs are lowercase, and it collapses runs of punctuation to a
 * single hyphen. Puzzle slugs are already in that shape, but they are authored
 * by hand, so this normalises rather than trusting them. Returns null instead
 * of a half-formed URL when there is nothing usable left.
 */
export function forumTagSlug(puzzleSlug: string): string | null {
  const s = puzzleSlug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return s || null;
}

/** Where a card's discussion lives. Null when the forum is not configured. */
export function forumTagUrl(puzzleSlug: string): string | null {
  if (!FORUM_ORIGIN) return null;
  const tag = forumTagSlug(puzzleSlug);
  if (!tag) return null;
  return `${FORUM_ORIGIN}/tag/${encodeURIComponent(tag)}`;
}
