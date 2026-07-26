import { describe, it, expect } from "vitest";
import { pickQuip, type ConfounderState } from "./Confounder";

const base: ConfounderState = {
  learned: 5,
  dueNow: 0,
  streak: 0,
  catchRate: 0,
  played: 0,
  burned: 0,
  misconceptions: 0,
  allDone: false,
};

describe("the Confounder picks a line by priority", () => {
  it("welcomes a newcomer above everything else", () => {
    expect(pickQuip({ ...base, learned: 0, dueNow: 3 }).key).toBe("confounderWelcome");
  });

  it("concedes when every skill is burned", () => {
    expect(pickQuip({ ...base, allDone: true, dueNow: 2 }).key).toBe("confounderAllDone");
  });

  it("points at the due pile, and carries its size", () => {
    const q = pickQuip({ ...base, dueNow: 4, misconceptions: 2 });
    expect(q).toEqual({ key: "confounderDue", n: 4 });
  });

  it("gloats about a live misconception over a compliment", () => {
    expect(pickQuip({ ...base, misconceptions: 1, streak: 9 }).key).toBe(
      "confounderMisconceived",
    );
  });

  it("grudgingly respects a high catch rate once there is a record", () => {
    expect(
      pickQuip({ ...base, played: 20, catchRate: 0.9, burned: 2 }).key,
    ).toBe("confounderHighCatch");
  });

  it("notes a streak, and carries its length", () => {
    expect(pickQuip({ ...base, streak: 6 })).toEqual({ key: "confounderStreak", n: 6 });
  });

  it("falls back to idle needling with nothing to react to", () => {
    expect(pickQuip(base).key).toBe("confounderIdle");
  });
});
