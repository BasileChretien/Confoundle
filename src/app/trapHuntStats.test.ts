import { describe, expect, it } from "vitest";

import { recordRound, type TrapHuntStats } from "./trapHuntStats";

const stats = (over: Partial<TrapHuntStats> = {}): TrapHuntStats => ({
  bestRun: 0,
  rounds: 0,
  recent: [],
  ...over,
});

describe("recording a round", () => {
  it("keeps the better run and counts the round", () => {
    const { stats: next, isBest } = recordRound(5, ["a"], () =>
      stats({ bestRun: 3, rounds: 2 }),
    );
    expect(next.bestRun).toBe(5);
    expect(next.rounds).toBe(3);
    expect(isBest).toBe(true);
  });

  it("does not announce equalling a best as beating it", () => {
    const { isBest } = recordRound(4, [], () => stats({ bestRun: 4 }));
    expect(isBest).toBe(false);
  });

  it("never lowers the best run on a bad round", () => {
    const { stats: next, isBest } = recordRound(1, [], () => stats({ bestRun: 7 }));
    expect(next.bestRun).toBe(7);
    expect(isBest).toBe(false);
  });

  it("puts the newest items first so the next round avoids them", () => {
    const { stats: next } = recordRound(2, ["new1", "new2"], () =>
      stats({ recent: ["old"] }),
    );
    expect(next.recent.slice(0, 3)).toEqual(["new1", "new2", "old"]);
  });

  it("bounds the recent list so it cannot grow without limit", () => {
    const many = Array.from({ length: 200 }, (_, i) => `old${i}`);
    const { stats: next } = recordRound(0, ["fresh"], () => stats({ recent: many }));
    expect(next.recent.length).toBeLessThanOrEqual(120);
    expect(next.recent[0]).toBe("fresh");
  });
});
