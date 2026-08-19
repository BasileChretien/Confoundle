import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { readRunStats, recentlySeen, recordRun } from "./runStats";

function memoryStorage(seed: Record<string, string> = {}) {
  const m = new Map<string, string>(Object.entries(seed));
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
    expect(readRunStats()).toEqual({ bestCorrect: 0, runs: 0, recent: [] });
  });

  it("keeps only a number no stake can move", () => {
    /*
      THE TEST THIS MODULE EXISTS FOR NOW. It used to store two records and
      both were reachable by a strategy rather than by reading well.
      `bestStreak` counted well-calibrated calls, where a call counts as
      calibrated if it was right OR staked at `hunch`, so eight hunches scored
      a perfect streak every time. `bestScore` looks safer because the payoff
      table is proper, but a RECORD is a maximum and a maximum never touches
      the penalty column, so its ceilings run 320 / 288 / 208 strictly by
      stake. One record paid for hedging and the other for overclaiming.

      What is stored is a count of correct calls, which no stake can reach.
    */
    expect(readRunStats()).not.toHaveProperty("bestScore");
    expect(readRunStats()).not.toHaveProperty("bestStreak");
    recordRun(6, ["a"]);
    recordRun(3, ["b"]);
    const s = readRunStats();
    expect(s.bestCorrect).toBe(6);
    expect(s.runs).toBe(2);
  });

  it("calls a first run a personal best even when nothing was right", () => {
    /*
      A bare `correct > before.bestCorrect` compares 0 > 0 and reports "your
      best is 0" against a record nobody has ever set. The stored value is
      right either way; what was wrong was the message.
    */
    const { isBest, stats } = recordRun(0, ["a"]);
    expect(isBest).toBe(true);
    expect(stats.bestCorrect).toBe(0);
  });

  it("never lets a later bad run lower the record", () => {
    recordRun(7, ["a"]);
    const second = recordRun(1, ["b"]);
    expect(second.isBest).toBe(false);
    expect(second.stats.bestCorrect).toBe(7);
  });

  it("ignores a v1 store rather than reading its records forward", () => {
    // v1 held `bestScore` and `bestStreak`, both of which described a strategy.
    // Reading them under the new key would carry the defect across the fix.
    vi.stubGlobal(
      "localStorage",
      memoryStorage({
        "confoundle:run:v1": JSON.stringify({
          bestScore: 320,
          bestStreak: 8,
          runs: 40,
          recent: ["old"],
        }),
      }),
    );
    expect(readRunStats()).toEqual({ bestCorrect: 0, runs: 0, recent: [] });
  });

  it("remembers recent items newest first, so a run avoids repeats", () => {
    recordRun(4, ["a", "b"]);
    recordRun(4, ["c"]);
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
    expect(() => recordRun(4, ["a"])).not.toThrow();
  });
});
