import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

import {
  contributesAnswers,
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
