import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { track } from "./analytics";
import { setContributesAnswers } from "./answerStats";

/**
 * The switch has to be a switch, not a request.
 *
 * `answerStats` opens by arguing that turning contribution off must stop the
 * send before a body is built, so there is nothing at the far end for anybody
 * to honour or ignore. The funnel counter now shares that switch, and the
 * promise is only as good as the code path.
 *
 * This module was a stub for the whole of Phase 0, so it had no tests at all.
 */
function memoryStorage() {
  const m = new Map<string, string>();
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, String(v)),
    removeItem: (k: string) => void m.delete(k),
    clear: () => m.clear(),
  };
}

describe("the funnel counter", () => {
  beforeEach(() => vi.stubGlobal("localStorage", memoryStorage()));
  afterEach(() => vi.restoreAllMocks());

  it("sends the step and the puzzle, and nothing else", () => {
    const fetchSpy = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchSpy);

    track("reveal_view", { slug: "kidney-stones" });

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const [url, init] = fetchSpy.mock.calls[0]!;
    expect(String(url)).toBe("/api/event");
    expect(init.credentials).toBe("omit");
    const body = JSON.parse(String(init.body)) as Record<string, unknown>;
    expect(body).toEqual({ event: "reveal_view", slug: "kidney-stones" });
  });

  it("builds no body at all when the player has opted out", () => {
    const fetchSpy = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchSpy);
    setContributesAnswers(false);

    track("commit", { slug: "kidney-stones" });
    expect(fetchSpy).not.toHaveBeenCalled();

    setContributesAnswers(true);
    track("commit", { slug: "kidney-stones" });
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("costs the player nothing when the endpoint is absent", () => {
    // No database bound, offline, blocked: the beat must behave exactly as it
    // did while this module sent nothing at all.
    vi.stubGlobal("fetch", () => Promise.reject(new Error("offline")));
    expect(() => track("puzzle_view", { slug: "p" })).not.toThrow();

    vi.stubGlobal("fetch", () => {
      throw new Error("blocked before it started");
    });
    expect(() => track("puzzle_view", { slug: "p" })).not.toThrow();
  });

  it("sends nothing that could identify a player", () => {
    const fetchSpy = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchSpy);
    track("share_open", { slug: "p" });

    const init = fetchSpy.mock.calls[0]![1];
    const sent = JSON.stringify(init.body) + JSON.stringify(init.headers ?? {});
    for (const forbidden of ["cookie", "session", "id", "token", "user"]) {
      expect(sent.toLowerCase()).not.toContain(forbidden);
    }
  });
});
