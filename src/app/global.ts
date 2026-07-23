/**
 * Global percentile client. Sends only { day, score } to an anonymous aggregate
 * endpoint, never a name or identifier, and submits at most once per day so the
 * histogram isn't double-counted. If the endpoint isn't deployed, is blocked, or
 * you're simply the first player today, this returns null and the UI shows
 * nothing rather than breaking.
 */
const KEY = "confoundle:global:v1";

type Cache = Record<string, number | null>; // day -> percentile

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
  day: number,
  score: number,
): Promise<number | null> {
  const cache = read();
  const key = String(day);
  // Already submitted today: reuse the answer instead of counting twice.
  if (key in cache) return cache[key];

  try {
    const res = await fetch("/api/score", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ day, score }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { percentile?: number | null };
    const percentile =
      typeof data.percentile === "number" ? data.percentile : null;
    cache[key] = percentile;
    write(cache);
    return percentile;
  } catch {
    // Endpoint absent or unreachable: stay quiet, and retry on a later day.
    return null;
  }
}
