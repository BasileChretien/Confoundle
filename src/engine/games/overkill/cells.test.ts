import { describe, expect, it } from "vitest";
import { WEAPON_IDS, type WeaponId } from "./content";
import { drawEffector } from "./cells";
import { drawFrame } from "./render";
import type { RunView } from "./sim";

/**
 * CAN YOU TELL WHAT IS WHAT?
 *
 * This file exists because the answer was no, and because nothing in a suite
 * of a hundred passing tests could see it. The game shipped with five of its
 * eight effectors drawn as nothing at all: no NK cell, no eosinophil, no
 * cytokines, complement invisible, the oxidative burst a background gradient.
 * Every test passed. The renderer was asked whether it threw, whether it
 * culled off-screen enemies and whether it drew a grid, and it did all three
 * beautifully while the player's own side of the screen was empty.
 *
 * So these assert the two properties that were silently false: every effector
 * draws SOMETHING, and no two of them draw the SAME something. Both read
 * their enumeration off `WEAPON_IDS`, so a ninth effector added later is
 * covered without its author knowing this file exists, which is the pattern
 * `declaredColors.test.ts` and `scopeLabels.test.ts` use on the puzzle side.
 */

interface Call {
  op: string;
  args: readonly number[];
}

function recorder() {
  const calls: Call[] = [];
  const ctx = {
    fillStyle: "",
    strokeStyle: "",
    lineWidth: 1,
    lineCap: "butt",
    globalAlpha: 1,
    globalCompositeOperation: "source-over",
    note(op: string, args: readonly number[]) {
      calls.push({ op, args: args.map((n) => Math.round(n * 100) / 100) });
    },
    fillRect(...a: number[]) {
      this.note("fillRect", a);
    },
    clearRect(...a: number[]) {
      this.note("clearRect", a);
    },
    beginPath() {
      this.note("beginPath", []);
    },
    closePath() {
      this.note("closePath", []);
    },
    arc(...a: number[]) {
      this.note("arc", a);
    },
    ellipse(...a: number[]) {
      this.note("ellipse", a);
    },
    rect(...a: number[]) {
      this.note("rect", a);
    },
    moveTo(...a: number[]) {
      this.note("moveTo", a);
    },
    lineTo(...a: number[]) {
      this.note("lineTo", a);
    },
    quadraticCurveTo(...a: number[]) {
      this.note("quadraticCurveTo", a);
    },
    fill() {
      this.note("fill", []);
    },
    stroke() {
      this.note("stroke", []);
    },
    setTransform() {},
    createRadialGradient() {
      return { addColorStop() {} };
    },
  };
  return { ctx: ctx as unknown as CanvasRenderingContext2D, calls };
}

/** What one effector draws, as a string, so two can be compared. */
function signature(id: WeaponId, firing = false): string {
  const { ctx, calls } = recorder();
  drawEffector(ctx, id, 50, 50, 20, 0, { firing, angle: 0.7 });
  return calls.map((c) => `${c.op}(${c.args.join(",")})`).join("|");
}

describe("every effector is a thing you can see", () => {
  it("draws something for all of them", () => {
    // The bug this catches, exactly: five of eight drew nothing whatsoever.
    for (const id of WEAPON_IDS) {
      const { ctx, calls } = recorder();
      drawEffector(ctx, id, 50, 50, 20, 0);
      expect(calls.length, `${id} draws nothing`).toBeGreaterThan(4);
      // And it must actually put ink down, not merely describe paths.
      expect(
        calls.some((c) => c.op === "fill" || c.op === "stroke"),
        `${id} builds paths but never paints`,
      ).toBe(true);
    }
  });

  it("draws no two of them alike", () => {
    // "We do not know what is what" was the complaint, and two effectors that
    // draw the same shape in different colours are indistinguishable to the
    // eight per cent of men who cannot separate red from green, and nearly so
    // to everybody else at speed on a dark background.
    const seen = new Map<string, WeaponId>();
    for (const id of WEAPON_IDS) {
      const sig = signature(id);
      const clash = seen.get(sig);
      expect(clash, `${id} draws exactly what ${clash} draws`).toBeUndefined();
      seen.set(sig, id);
    }
    expect(seen.size).toBe(WEAPON_IDS.length);
  });

  it("makes every one of them visibly do something when it fires", () => {
    // Otherwise a squad is decoration: eight cells bobbing, none of which ever
    // appears to act, and no way to connect a bar on the meter to a thing on
    // the screen.
    for (const id of WEAPON_IDS) {
      expect(signature(id, true), `${id} looks the same firing as idle`).not.toBe(
        signature(id, false),
      );
    }
  });
});

describe("the squad", () => {
  const zero = Object.fromEntries(WEAPON_IDS.map((id) => [id, 0]));
  const view = (over: Partial<RunView> = {}): RunView => ({
    tick: 100,
    hp: 100,
    x: 0,
    y: 0,
    enemies: [],
    levels: zero as RunView["levels"],
    damage: zero as RunView["damage"],
    cutsLeft: 3,
    cutUntil: zero as RunView["cutUntil"],
    firedThisTick: [],
    hurtThisTick: false,
    hitsThisTick: [],
    deathsThisTick: [],
    gems: [],
    level: 1,
    xp: 0,
    xpNeeded: 3,
    active: ["neutrophil", "complement", "cytokine"],
    unlocked: WEAPON_IDS,
    waveIndex: 0,
    waveTick: 0,
    overload: 0,
    ...over,
  });

  const frameFor = (v: RunView) => {
    const { ctx, calls } = recorder();
    drawFrame(ctx, { view: v, pulses: [], marks: [], width: 400, height: 800, particles: [], shake: 0 });
    return calls.map((c) => `${c.op}(${c.args.join(",")})`).join("|");
  };

  it("puts what you deployed on screen, and leaves out what you did not", () => {
    // The briefing is a promise that the three you picked are the three that
    // turn up. Checked by swapping ONE slot and requiring the frame to change,
    // for every effector in turn, so no slot can be silently ignored.
    for (const id of WEAPON_IDS) {
      const withIt = frameFor(view({ active: ["neutrophil", "complement", id] }));
      const without = frameFor(view({ active: ["neutrophil", "complement"] }));
      expect(withIt, `deploying ${id} changes nothing on screen`).not.toBe(without);
    }
  });

  it("takes a cut effector off the field, because that is what a cut is", () => {
    const normal = frameFor(view());
    const cut = frameFor(
      view({ cutUntil: { ...zero, complement: 500 } as RunView["cutUntil"] }),
    );
    expect(cut).not.toBe(normal);
  });
});
