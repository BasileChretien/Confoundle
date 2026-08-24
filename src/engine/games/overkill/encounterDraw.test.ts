import { describe, expect, it } from "vitest";
import { ENEMIES, WEAPON_IDS, type EnemyKind, type WeaponId } from "./content";
import { SEQUENCE, encounterAt, lengthOf } from "./encounter";
import { VERB, blockerOf } from "./verbs";
import { drawEncounter } from "./encounterDraw";

/**
 * EVERY MEETING DRAWS, AND A BLOCKED ONE DRAWS DIFFERENTLY.
 *
 * The state machine is tested next door; this is about whether anything
 * reaches the canvas. Both are needed and neither substitutes: a sequence can
 * be perfectly staged and draw nothing, which is exactly how five effectors
 * shipped invisible while a hundred tests passed.
 */

const KINDS = Object.keys(ENEMIES) as EnemyKind[];
const pairs: [WeaponId, EnemyKind][] = WEAPON_IDS.flatMap((w) =>
  KINDS.map((k) => [w, k] as [WeaponId, EnemyKind]),
);

function recorder() {
  const calls: string[] = [];
  const ctx = {
    fillStyle: "",
    strokeStyle: "",
    lineWidth: 1,
    lineCap: "butt",
    globalAlpha: 1,
    globalCompositeOperation: "source-over",
    note(op: string, a: readonly number[]) {
      calls.push(`${op}(${a.map((n) => Math.round(n * 10) / 10).join(",")})`);
    },
    save() { this.note("save", []); },
    restore() { this.note("restore", []); },
    setLineDash(a: number[]) { this.note("dash", a); },
    fillRect(...a: number[]) { this.note("fillRect", a); },
    clearRect(...a: number[]) { this.note("clearRect", a); },
    beginPath() { this.note("beginPath", []); },
    closePath() { this.note("closePath", []); },
    arc(...a: number[]) { this.note("arc", a); },
    ellipse(...a: number[]) { this.note("ellipse", a); },
    rect(...a: number[]) { this.note("rect", a); },
    moveTo(...a: number[]) { this.note("moveTo", a); },
    lineTo(...a: number[]) { this.note("lineTo", a); },
    quadraticCurveTo(...a: number[]) { this.note("q", a); },
    fill() { this.note("fill", []); },
    stroke() { this.note("stroke", []); },
    setTransform() {},
    createRadialGradient() { return { addColorStop() {} }; },
  };
  return { ctx: ctx as unknown as CanvasRenderingContext2D, calls };
}

const frameAt = (w: WeaponId, k: EnemyKind, tick: number) => {
  const { ctx, calls } = recorder();
  drawEncounter(ctx, w, k, 200, 200, 60, tick);
  return calls;
};

describe("every encounter reaches the canvas", () => {
  it("puts ink down at every step of every pair", () => {
    // The bug this is shaped against: a sequence that stages perfectly and
    // draws nothing looks identical, from the state machine's side, to one
    // that works.
    for (const [w, k] of pairs) {
      let elapsed = 0;
      for (const step of SEQUENCE[VERB[w]]) {
        const calls = frameAt(w, k, elapsed + Math.floor(step.ticks / 2));
        expect(
          calls.some((c) => c.startsWith("fill(") || c.startsWith("stroke(")),
          `${w} vs ${k} paints nothing during ${step.name}`,
        ).toBe(true);
        elapsed += step.ticks;
      }
    }
  });

  it("never composites, because that erases the canvas beneath", () => {
    // `destination-out` does not cut a notch in a shape, it punches a hole
    // through everything already drawn. It shipped once in the NK cell's
    // nucleus and looked correct only because the briefing canvas starts
    // transparent.
    for (const [w, k] of pairs) {
      const calls = frameAt(w, k, Math.floor(lengthOf(VERB[w]) / 2));
      expect(calls.some((c) => c.includes("destination-out")), `${w} vs ${k}`).toBe(false);
    }
  });
});

describe("a failure looks like the mechanism stopping", () => {
  it("draws a blocked ending differently from a completed one", () => {
    // Per verb, so the comparison is between two runs of the SAME animation.
    for (const w of WEAPON_IDS) {
      const blocked = KINDS.find((k) => blockerOf(w, k) !== null);
      const works = KINDS.find((k) => blockerOf(w, k) === null);
      if (blocked === undefined || works === undefined) continue;
      const end = lengthOf(VERB[w]) + 10;
      expect(
        frameAt(w, blocked, end).join("|"),
        `${w}: ${blocked} ends looking exactly like ${works}`,
      ).not.toBe(frameAt(w, works, end).join("|"));
    }
  });

  it("holds a blocked encounter still while a working one keeps moving", () => {
    /*
      THE RULE AT THE DRAWING LEVEL. A blocked sequence stops advancing, so its
      picture stops changing except for whatever idles. A working one is still
      going somewhere. If a blocked encounter kept animating it would read as
      progress, which is the opposite of what it has to say.
    */
    for (const w of WEAPON_IDS) {
      const blocked = KINDS.find((k) => blockerOf(w, k) !== null);
      const works = KINDS.find((k) => blockerOf(w, k) === null);
      if (blocked === undefined || works === undefined) continue;
      const stopAt = encounterAt(w, blocked, lengthOf(VERB[w]) + 10);
      expect(stopAt.stalled).toBe(true);
      // The state is frozen, whatever the idle animation does on top of it.
      const a = encounterAt(w, blocked, lengthOf(VERB[w]) + 10);
      const b = encounterAt(w, blocked, lengthOf(VERB[w]) + 400);
      expect(`${a.step}:${a.t}`).toBe(`${b.step}:${b.t}`);
    }
  });
});
