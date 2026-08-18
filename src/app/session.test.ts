import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  activityByDay,
  addFriendResults,
  computeStats,
  getFriendsBoard,
  recordPlay,
} from "./session";
import type { PlayRecord } from "./session";

const rec = (correct: boolean, confidence: PlayRecord["confidence"] = "sure"): PlayRecord => ({
  choiceId: "x",
  correct,
  confidence,
  playedAt: "",
});

describe("computeStats", () => {
  it("counts plays, catches and rate", () => {
    const s = computeStats(
      { "a@2026-07-20": rec(true), "b@2026-07-21": rec(false) },
      "2026-07-21",
    );
    expect(s.played).toBe(2);
    expect(s.caught).toBe(1);
    expect(s.catchRate).toBe(0.5);
  });

  it("counts a run of consecutive days as one streak", () => {
    const s = computeStats(
      {
        "a@2026-07-19": rec(true),
        "b@2026-07-20": rec(true),
        "c@2026-07-21": rec(false),
      },
      "2026-07-21",
    );
    expect(s.currentStreak).toBe(3);
    expect(s.maxStreak).toBe(3);
  });

  it("keeps the streak alive when today isn't played yet but yesterday was", () => {
    const s = computeStats({ "a@2026-07-20": rec(true) }, "2026-07-21");
    expect(s.currentStreak).toBe(1);
  });

  it("breaks the current streak after a missed day", () => {
    const s = computeStats(
      { "a@2026-07-18": rec(true), "b@2026-07-21": rec(true) },
      "2026-07-21",
    );
    expect(s.currentStreak).toBe(1);
    expect(s.maxStreak).toBe(1);
  });

  it("splits accuracy by confidence for calibration", () => {
    const s = computeStats(
      {
        "a@2026-07-20": rec(true, "certain"),
        "b@2026-07-21": rec(false, "certain"),
        "c@2026-07-22": rec(true, "hunch"),
      },
      "2026-07-22",
    );
    expect(s.byConfidence.certain).toEqual({ played: 2, caught: 1 });
    expect(s.byConfidence.hunch).toEqual({ played: 1, caught: 1 });
  });
});

describe("reviews count towards the numbers the learner sees", () => {
  // The bug this guards: every stat came from recordPlay, which only fires when
  // a PUZZLE is opened. Doing reviews daily left the streak at zero, and
  // replaying a solved puzzle inflated both streak and catch rate.
  const PLAYS = {
    "kidney-stones@2026-07-10": {
      choiceId: "a",
      correct: true,
      confidence: "sure" as const,
      playedAt: "2026-07-10T09:00:00.000Z",
    },
  };

  it("keeps a streak alive on a day with only reviews", () => {
    const stats = computeStats(PLAYS, "2026-07-11", {
      "2026-07-11": {
        hunch: { played: 0, caught: 0 },
        sure: { played: 2, caught: 1 },
        certain: { played: 0, caught: 0 },
      },
    });
    expect(stats.currentStreak).toBe(2);
  });

  it("counted zero for a review-only day before this existed", () => {
    // Same data, reviews ignored: the old behaviour, kept as a regression guard.
    expect(computeStats({}, "2026-07-11").currentStreak).toBe(0);
    expect(
      computeStats({}, "2026-07-11", {
        "2026-07-11": {
          hunch: { played: 0, caught: 0 },
          sure: { played: 3, caught: 2 },
          certain: { played: 0, caught: 0 },
        },
      }).currentStreak,
    ).toBe(1);
  });

  it("feeds the calibration panel, so it can show improvement", () => {
    const stats = computeStats(PLAYS, "2026-07-10", {
      "2026-07-10": {
        hunch: { played: 0, caught: 0 },
        sure: { played: 0, caught: 0 },
        certain: { played: 4, caught: 3 },
      },
    });
    expect(stats.byConfidence.certain).toEqual({ played: 4, caught: 3 });
    expect(stats.byConfidence.sure).toEqual({ played: 1, caught: 1 });
  });

  it("keeps totals consistent with the breakdown beside them", () => {
    const stats = computeStats(PLAYS, "2026-07-10", {
      "2026-07-10": {
        hunch: { played: 2, caught: 0 },
        sure: { played: 0, caught: 0 },
        certain: { played: 4, caught: 3 },
      },
    });
    const fromBreakdown = Object.values(stats.byConfidence).reduce(
      (n, b) => n + b.played,
      0,
    );
    expect(stats.played).toBe(fromBreakdown);
    expect(stats.played).toBe(7);
    expect(stats.caught).toBe(4);
  });

  it("ignores a recorded day on which nothing was actually reviewed", () => {
    const stats = computeStats({}, "2026-07-11", {
      "2026-07-11": {
        hunch: { played: 0, caught: 0 },
        sure: { played: 0, caught: 0 },
        certain: { played: 0, caught: 0 },
      },
    });
    expect(stats.currentStreak).toBe(0);
  });
});

describe("activityByDay", () => {
  const tally = (played: number, caught: number) => ({
    hunch: { played, caught },
    sure: { played: 0, caught: 0 },
    certain: { played: 0, caught: 0 },
  });

  it("sums plays and reviews per day, oldest first, filling gaps with zero", () => {
    const map = {
      "a@2026-07-10": rec(true),
      "b@2026-07-10": rec(false),
      "a@2026-07-08": rec(true),
    };
    const reviews = {
      "2026-07-10": tally(3, 2),
      "2026-07-09": tally(0, 0),
    };
    const out = activityByDay(4, "2026-07-10", map, reviews);
    expect(out).toEqual([
      { date: "2026-07-07", count: 0 },
      { date: "2026-07-08", count: 1 },
      { date: "2026-07-09", count: 0 },
      { date: "2026-07-10", count: 5 },
    ]);
  });

  it("returns exactly `days` entries ending today", () => {
    const out = activityByDay(30, "2026-07-10", {}, {});
    expect(out).toHaveLength(30);
    expect(out[29].date).toBe("2026-07-10");
    expect(out.every((d) => d.count === 0)).toBe(true);
  });
});

/**
 * The blind-answer guarantee.
 *
 * The anonymous tally may only count a player's FIRST commit to a puzzle. A
 * replay happens from the share beat, after the reveal has explained the trick,
 * so an answer given then is not a reading of the figures at all. Counting them
 * would pull every published "most people picked X" towards the correct option
 * over time, which on this deck would be the most embarrassing defect possible:
 * a self-flattering statistic assembled by accident.
 *
 * recordPlay reports it, rather than the caller comparing before and after,
 * because the caller would have to read the store before the write and one
 * reordered line would silently answer "first" forever.
 */
describe("recordPlay reports the first commit of the day", () => {
  beforeEach(() => {
    const m = new Map<string, string>();
    vi.stubGlobal("localStorage", {
      getItem: (k: string) => m.get(k) ?? null,
      setItem: (k: string, v: string) => void m.set(k, String(v)),
      removeItem: (k: string) => void m.delete(k),
      clear: () => m.clear(),
    });
  });
  afterEach(() => vi.restoreAllMocks());

  it("is first once, and never again for the same puzzle that day", () => {
    expect(recordPlay("a-slug", "c1", false, "sure").first).toBe(true);
    // The replay: same puzzle, and this time the player knows the answer.
    expect(recordPlay("a-slug", "c2", true, "certain").first).toBe(false);
    expect(recordPlay("a-slug", "c2", true, "certain").first).toBe(false);
  });

  it("is first again for a different puzzle", () => {
    recordPlay("a-slug", "c1", false, "sure");
    expect(recordPlay("b-slug", "c1", false, "sure").first).toBe(true);
  });

  it("still records the replay, which the streak and stats need", () => {
    recordPlay("a-slug", "c1", false, "hunch");
    recordPlay("a-slug", "c2", true, "certain");
    const raw = localStorage.getItem("confoundle:progress:v1");
    expect(raw).toBeTruthy();
    const stored = Object.values(JSON.parse(raw!) as Record<string, PlayRecord>);
    expect(stored).toHaveLength(1);
    // Last write wins: not sending the answer must not mean not recording it.
    expect(stored[0]!.choiceId).toBe("c2");
    expect(stored[0]!.correct).toBe(true);
  });
});

/**
 * A board keyed by a number that changed meaning must not read its own old data.
 *
 * `puzzleNo` used to be days since launch and is now the puzzle's position in
 * the registry. The store's SHAPE did not change, every stored value still
 * parses, and nothing in an entry records which numbering wrote it, so the old
 * data would have been read straight back under the new meaning: the friends
 * who played whatever card the rotation served on day 7, shown on the board of
 * the puzzle at registry position 7, with their real names and scores. The
 * ranges already overlap, so this was today's behaviour and not a future one.
 *
 * The key is what separates them, so the key is what this asserts.
 */
describe("the friends board across the renumbering", () => {
  function withStorage(seed: Record<string, string> = {}) {
    const m = new Map<string, string>(Object.entries(seed));
    vi.stubGlobal("localStorage", {
      getItem: (k: string) => m.get(k) ?? null,
      setItem: (k: string, v: string) => void m.set(k, String(v)),
      removeItem: (k: string) => void m.delete(k),
      clear: () => m.clear(),
    });
    return m;
  }
  afterEach(() => vi.restoreAllMocks());

  const V1 = "confoundle:friends:v1";

  it("ignores a board written under the day numbering", () => {
    withStorage({
      [V1]: JSON.stringify({
        "7": { Ada: { caught: true, score: 40, streak: 9 } },
      }),
    });
    // Day 7 and registry position 7 are different puzzles. Ada never played
    // this one, and the old store cannot say which one she did play.
    expect(getFriendsBoard(7)).toEqual([]);
  });

  it("still keeps a board written under the new numbering", () => {
    withStorage();
    addFriendResults([
      { name: "Ada", puzzleNo: 7, caught: true, score: 40, streak: 9 },
    ]);
    expect(getFriendsBoard(7)).toEqual([
      { name: "Ada", caught: true, score: 40, streak: 9 },
    ]);
    // And does not answer for a different card.
    expect(getFriendsBoard(8)).toEqual([]);
  });

  it("does not write back into the old key", () => {
    const m = withStorage();
    addFriendResults([
      { name: "Ada", puzzleNo: 7, caught: true, score: 40, streak: 9 },
    ]);
    expect(m.get(V1)).toBeUndefined();
  });
});
