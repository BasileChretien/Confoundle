import { describe, expect, it } from "vitest";
import { dirFromKeys, dirFromOffset, isMovementKey } from "./input";

describe("the thumb", () => {
  it("stands still inside the dead zone", () => {
    expect(dirFromOffset(0, 0)).toBe(0);
    expect(dirFromOffset(8, 8)).toBe(0);
  });

  it("reads the four axes", () => {
    expect(dirFromOffset(0, -60)).toBe(1);
    expect(dirFromOffset(60, 0)).toBe(3);
    expect(dirFromOffset(0, 60)).toBe(5);
    expect(dirFromOffset(-60, 0)).toBe(7);
  });

  it("reads the four diagonals", () => {
    expect(dirFromOffset(60, -60)).toBe(2);
    expect(dirFromOffset(60, 60)).toBe(4);
    expect(dirFromOffset(-60, 60)).toBe(6);
    expect(dirFromOffset(-60, -60)).toBe(8);
  });

  it("splits each octant halfway, so no direction is easier to hit than another", () => {
    // Just either side of the boundary between up and up-right, which sits at
    // 22.5 degrees. A drag that feels vertical must not read as diagonal.
    expect(dirFromOffset(20, -100)).toBe(1);
    expect(dirFromOffset(60, -100)).toBe(2);
  });

  it("covers all eight, so nothing is unreachable", () => {
    const seen = new Set<number>();
    for (let i = 0; i < 64; i++) {
      // A ring of directions, without trigonometry: walk the square's edge.
      const t = (i / 64) * 4;
      const s = t % 1;
      const [x, y] =
        t < 1 ? [1, -1 + 2 * s] : t < 2 ? [1 - 2 * s, 1] : t < 3 ? [-1, 1 - 2 * s] : [-1 + 2 * s, -1];
      seen.add(dirFromOffset(x * 100, y * 100));
    }
    expect([...seen].sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });
});

describe("the keyboard", () => {
  it("reads arrows, WASD and ZQSD", () => {
    expect(dirFromKeys(new Set(["ArrowUp"]))).toBe(1);
    expect(dirFromKeys(new Set(["w"]))).toBe(1);
    expect(dirFromKeys(new Set(["z"]))).toBe(1);
    expect(dirFromKeys(new Set(["q"]))).toBe(7);
    expect(dirFromKeys(new Set(["a"]))).toBe(7);
  });

  it("combines two keys into a diagonal", () => {
    expect(dirFromKeys(new Set(["ArrowUp", "ArrowRight"]))).toBe(2);
    expect(dirFromKeys(new Set(["s", "d"]))).toBe(4);
  });

  it("cancels opposite keys rather than picking one", () => {
    expect(dirFromKeys(new Set(["ArrowLeft", "ArrowRight"]))).toBe(0);
    expect(dirFromKeys(new Set(["w", "s"]))).toBe(0);
  });

  it("ignores everything else", () => {
    expect(dirFromKeys(new Set(["Shift", "1", "Enter"]))).toBe(0);
    expect(isMovementKey("Enter")).toBe(false);
    expect(isMovementKey("ArrowLeft")).toBe(true);
  });
});
