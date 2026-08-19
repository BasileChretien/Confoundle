/**
 * Global percentile client. Sends only { slug, score } to an anonymous
 * aggregate endpoint, never a name or identifier, and submits at most once per
 * puzzle so the histogram isn't double-counted. If the endpoint isn't deployed,
 * is blocked, or you're simply the first player on that card, this returns null
 * and the UI shows nothing rather than breaking.
 *
 * IT SENT A DAY UNTIL A REVIEW LOOKED AT WHAT THE NUMBER MEANT. A score is
 * earned on one card out of 73 that anybody may open at any time, so a
 * histogram per calendar day ranked a score on one puzzle against scores on
 * different puzzles and printed the result as "you beat 63% of players today".
 * The friends board had the identical defect, keyed on days since launch, and
 * it was fixed one component away on the same screen without anybody noticing
 * this one.
 *
 * The cache key is bumped because its VALUE changed meaning: a stored number is
 * now a rank among people who played that card. Numeric day keys could never be
 * returned for a slug lookup, so nothing would have broken, but leaving the old
 * entries would leave two incompatible meanings under one name.
 */
const KEY = "confoundle:global:v2";

type Cache = Record<string, number | null>; // puzzle slug -> percentile

function read(): Cache {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Cache) : {};
  } catch {
    return {};
  }
}

function write(cache: Cache): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    // storage unavailable, degrade silently
  }
}

export async function globalPercentile(
  slug: string,
  score: number,
): Promise<number | null> {
  const cache = read();
  // Already submitted for this card: reuse the answer instead of counting a
  // replay as a second player.
  if (slug in cache) return cache[slug];

  try {
    const res = await fetch("/api/score", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ slug, score }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { percentile?: number | null };
    const percentile =
      typeof data.percentile === "number" ? data.percentile : null;
    cache[slug] = percentile;
    write(cache);
    return percentile;
  } catch {
    // Endpoint absent or unreachable: stay quiet, and retry on a later card.
    return null;
  }
}
