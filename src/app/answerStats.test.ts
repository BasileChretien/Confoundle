import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

import {
  contributesAnswers,
  fetchDistribution,
  MIN_ANSWERS_TO_SHOW,
  sendAnswer,
  setContributesAnswers,
  shareOf,
} from "./answerStats";
import { MIN_ANSWERS_TO_SHOW as SERVER_FLOOR } from "../server/answers";

/**
 * The suite runs in the node environment, as the rest of src/app does, so
 * localStorage is stubbed in memory rather than by pulling in a DOM. That also
 * makes the opt-out assertions independent of any real browser storage state.
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

describe("the switch the privacy page promises", () => {
  beforeEach(() => vi.stubGlobal("localStorage", memoryStorage()));
  afterEach(() => vi.restoreAllMocks());

  it("contributes by default", () => {
    expect(contributesAnswers()).toBe(true);
  });

  it("stops sending anything at all once turned off", () => {
    /**
     * THE ONE THAT MATTERS. The policy says turning it off "stops the message
     * being sent at all rather than asking us to ignore it once it arrives".
     * If this ever becomes a server-side filter, that sentence becomes a lie.
     */
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    setContributesAnswers(false);
    expect(contributesAnswers()).toBe(false);
    sendAnswer("a-puzzle", "band-2", "certain");
    expect(fetchSpy).not.toHaveBeenCalled();

    setContributesAnswers(true);
    sendAnswer("a-puzzle", "band-2", "certain");
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("sends four fields and no identifier", () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    sendAnswer("the-slot-they-drew", "worse", "sure");

    const [url, init] = fetchSpy.mock.calls[0]!;
    expect(url).toBe("/api/answers");
    const body = JSON.parse((init as RequestInit).body as string);
    expect(Object.keys(body).sort()).toEqual([
      "choiceId",
      "confidence",
      "day",
      "slug",
    ]);
    // Credentials omitted, so the tally cannot differ between a signed-in
    // player and an anonymous one.
    expect((init as RequestInit).credentials).toBe("omit");
  });

  it("swallows a transport failure rather than costing the player their beat", () => {
    vi.stubGlobal("fetch", () => {
      throw new Error("offline");
    });
    expect(() => sendAnswer("a", "b", "hunch")).not.toThrow();
  });
});

describe("what the reveal is allowed to draw", () => {
  const dist = (total: number, count: number) => ({
    total,
    choices: [{ choiceId: "trap", count }],
    certain: [],
  });

  it("agrees with the server about the floor", () => {
    // A client drawing a percentage the server considers too small to be
    // evidence would be this deck making the mistake it teaches against.
    expect(MIN_ANSWERS_TO_SHOW).toBe(SERVER_FLOOR);
  });

  it("shows nothing below the floor, however lopsided", () => {
    expect(shareOf(dist(MIN_ANSWERS_TO_SHOW - 1, 18), "trap")).toBeNull();
    expect(shareOf(dist(3, 3), "trap")).toBeNull();
    expect(shareOf(null, "trap")).toBeNull();
  });

  it("gives a share once there is enough to be worth saying", () => {
    expect(shareOf(dist(100, 68), "trap")).toBeCloseTo(0.68, 5);
  });

  it("returns null for an option nobody picked rather than zero", () => {
    // Zero and "no data" look identical once rendered, and only one of them is
    // a claim we can support.
    expect(shareOf(dist(100, 68), "never-picked")).toBeNull();
  });
});

describe("which population the reveal line is about", () => {
  beforeEach(() => vi.stubGlobal("localStorage", memoryStorage()));
  afterEach(() => vi.restoreAllMocks());

  const ok = (body: unknown) => ({
    ok: true,
    json: async () => body,
  });

  /**
   * THE DEFECT THIS PINS. `fetchDistribution` took `day = todayDayNumber()` as
   * a DEFAULT ARGUMENT, so every request carried a day and the server answered
   * from one UTC calendar day. With the floor at twenty, "68% of players fell
   * for the same one" then required twenty answers to one slug within one day,
   * across a freely browsable deck of 73 with no forced daily. The line was
   * built, tested, translated, and unreachable.
   *
   * A default argument is exactly the kind of defect no type checks and no
   * test caught: the call site reads `fetchDistribution(slug)`, which looks
   * like it is asking for everything.
   */
  it("asks for every answer ever given, not just today's", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(ok({ total: 0, choices: [] }));
    vi.stubGlobal("fetch", fetchSpy);

    await fetchDistribution("kidney-stones");

    const [url] = fetchSpy.mock.calls[0]!;
    expect(url).toBe("/api/answers?slug=kidney-stones");
    expect(String(url)).not.toContain("day");
  });

  it("still scopes to one day when a caller genuinely asks for one", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(ok({ total: 0, choices: [] }));
    vi.stubGlobal("fetch", fetchSpy);

    await fetchDistribution("kidney-stones", 20_314);

    expect(String(fetchSpy.mock.calls[0]![0])).toBe(
      "/api/answers?slug=kidney-stones&day=20314",
    );
  });

  it("escapes the slug rather than pasting it into the query", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(ok({ total: 0, choices: [] }));
    vi.stubGlobal("fetch", fetchSpy);

    await fetchDistribution("a slug&day=1");

    expect(String(fetchSpy.mock.calls[0]![0])).toBe(
      "/api/answers?slug=a%20slug%26day%3D1",
    );
  });

  it("treats a malformed body as no data rather than as a zero tally", async () => {
    // A zero would render as a claim about players. Null renders as nothing.
    const fetchSpy = vi.fn().mockResolvedValue(ok({ nonsense: true }));
    vi.stubGlobal("fetch", fetchSpy);

    expect(await fetchDistribution("kidney-stones")).toBeNull();
  });

  it("survives a transport failure without costing the reveal", async () => {
    vi.stubGlobal("fetch", () => Promise.reject(new Error("offline")));
    expect(await fetchDistribution("kidney-stones")).toBeNull();
  });
});
