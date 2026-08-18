import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { readRunStats, recentlySeen, recordRun } from "./runStats";

function memoryStorage() {
  const m = new Map<string, string>();
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, String(v)),
    removeItem: (k: string) => void m.delete(k),
    clear: () => m.clear(),
  };
}

describe("the calibration run's record", () => {
  beforeEach(() => vi.stubGlobal("localStorage", memoryStorage()));
  afterEach(() => vi.restoreAllMocks());

  it("starts empty rather than undefined", () => {
    expect(readRunStats()).toEqual({
      bestScore: 0,
      bestStreak: 0,
      runs: 0,
      recent: [],
    });
  });

  it("keeps the two records apart", () => {
    /*
      The whole point of storing two numbers. A bold player can post the best
      score with a short streak; a cautious one the best streak on a modest
      score. Combining them would erase the distinction the mode exists to draw.
    */
    recordRun(120, 3, ["a"]);
    recordRun(40, 8, ["b"]);
    const s = readRunStats();
    expect(s.bestScore).toBe(120);
    expect(s.bestStreak).toBe(8);
    expect(s.runs).toBe(2);
  });

  it("accepts a first run that scored below zero", () => {
    /*
      A player CAN go negative here: the wager takes points off for
      overclaiming. Treating 0 as a floor would tell somebody their best was
      zero when they have never scored it, which is the kind of quietly wrong
      number this deck exists to object to.
    */
    const { isBestScore, stats } = recordRun(-30, 1, ["a"]);
    expect(isBestScore).toBe(true);
    expect(stats.bestScore).toBe(-30);
  });

  it("calls a first run a personal best even when the streak was zero", () => {
    /*
      The symmetric case to the negative score above, and it was missing. A
      first run in which every call overclaimed has a streak of 0, and a bare
      `streak > before.bestStreak` compares 0 > 0 and reports "your best is 0"
      against a record nobody has ever set. The stored value is right either
      way, because a streak cannot go negative; what was wrong was the message.
    */
    const { isBestStreak, isBestScore } = recordRun(-40, 0, ["a"]);
    expect(isBestStreak).toBe(true);
    expect(isBestScore).toBe(true);
  });

  it("never lets a later bad run lower a record", () => {
    recordRun(100, 6, ["a"]);
    const second = recordRun(-10, 0, ["b"]);
    expect(second.isBestScore).toBe(false);
    expect(second.isBestStreak).toBe(false);
    expect(second.stats.bestScore).toBe(100);
    expect(second.stats.bestStreak).toBe(6);
  });

  it("remembers recent items newest first, so a run avoids repeats", () => {
    recordRun(10, 1, ["a", "b"]);
    recordRun(10, 1, ["c"]);
    expect(readRunStats().recent.slice(0, 3)).toEqual(["c", "a", "b"]);
    expect(recentlySeen().has("a")).toBe(true);
  });

  it("survives unreadable storage instead of taking the mode down", () => {
    vi.stubGlobal("localStorage", {
      getItem: () => "{ not json",
      setItem: () => {
        throw new Error("full");
      },
      removeItem: () => {},
      clear: () => {},
    });
    expect(() => readRunStats()).not.toThrow();
    expect(readRunStats().runs).toBe(0);
    expect(() => recordRun(10, 2, ["a"])).not.toThrow();
  });
});
