import { describe, it, expect } from "vitest";
import { puzzles, puzzleForDay } from "./index";

describe("daily rotation", () => {
  it("is stable for a given day and cycles through the registry", () => {
    expect(puzzleForDay(0)).toBe(puzzles[0]);
    expect(puzzleForDay(1)).toBe(puzzles[1 % puzzles.length]);
    // one full lap returns to the start
    expect(puzzleForDay(puzzles.length)).toBe(puzzles[0]);
    // same day → same puzzle
    expect(puzzleForDay(42)).toBe(puzzleForDay(42));
  });

  it("handles negative day indices without crashing", () => {
    expect(puzzleForDay(-1)).toBe(puzzles[(puzzles.length - 1) % puzzles.length]);
  });
});
