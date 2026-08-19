import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { globalPercentile } from "./global";

/**
 * The client half of the same argument: what it SENDS decides what the
 * percentile can mean. It posted a calendar day, so the server could only ever
 * bucket by day, and the app printed a rank against people who had played
 * different puzzles.
 *
 * There was no test file here at all, which is how a client that determined the
 * meaning of a published number went unexamined.
 */
function memoryStorage(seed: Record<string, string> = {}) {
  const m = new Map<string, string>(Object.entries(seed));
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, String(v)),
    removeItem: (k: string) => void m.delete(k),
    clear: () => m.clear(),
    map: m,
  };
}

const ok = (body: unknown) =>
  Promise.resolve({ ok: true, json: () => Promise.resolve(body) });

describe("the global percentile client", () => {
  beforeEach(() => vi.stubGlobal("localStorage", memoryStorage()));
  afterEach(() => vi.restoreAllMocks());

  it("posts the card it was played on, and never a date", async () => {
    const fetchSpy = vi.fn().mockReturnValue(ok({ percentile: 63, n: 40 }));
    vi.stubGlobal("fetch", fetchSpy);

    expect(await globalPercentile("kidney-stones", 40)).toBe(63);

    const body = JSON.parse(String(fetchSpy.mock.calls[0]![1].body)) as Record<
      string,
      unknown
    >;
    expect(body).toEqual({ slug: "kidney-stones", score: 40 });
    expect(body).not.toHaveProperty("day");
  });

  it("submits once per card, so a replay is not a second player", async () => {
    const fetchSpy = vi.fn().mockReturnValue(ok({ percentile: 63, n: 40 }));
    vi.stubGlobal("fetch", fetchSpy);

    await globalPercentile("kidney-stones", 40);
    await globalPercentile("kidney-stones", 40);
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    // A different card is a different histogram and must still be sent.
    await globalPercentile("medical-test", 26);
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it("ignores a v1 cache rather than reading day ranks as card ranks", async () => {
    const store = memoryStorage({
      "confoundle:global:v1": JSON.stringify({ "20657": 99 }),
    });
    vi.stubGlobal("localStorage", store);
    const fetchSpy = vi.fn().mockReturnValue(ok({ percentile: 12, n: 40 }));
    vi.stubGlobal("fetch", fetchSpy);

    expect(await globalPercentile("kidney-stones", 40)).toBe(12);
    expect(store.map.has("confoundle:global:v2")).toBe(true);
  });

  it("shows nothing rather than a number when the endpoint is absent", async () => {
    vi.stubGlobal("fetch", () => Promise.reject(new Error("offline")));
    expect(await globalPercentile("kidney-stones", 40)).toBeNull();

    vi.stubGlobal("fetch", () => Promise.resolve({ ok: false }));
    expect(await globalPercentile("medical-test", 40)).toBeNull();
  });

  it("treats a malformed percentile as no comparison", async () => {
    vi.stubGlobal("fetch", () => ok({ percentile: "most of them" }));
    expect(await globalPercentile("kidney-stones", 40)).toBeNull();
  });
});
