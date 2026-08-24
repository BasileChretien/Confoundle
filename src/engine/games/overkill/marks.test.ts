import { describe, expect, it } from "vitest";
import { WEAPON_IDS } from "./content";
import {
  MARKS_PER_TICK,
  MARK_TICKS,
  drawFrame,
  spawnHitMarks,
  type Mark,
} from "./render";
import type { Landed, RunView } from "./sim";

/**
 * THE MOST IMPORTANT DRAWING IN THE RENDERER, GIVEN A LIFETIME.
 *
 * Every hit used to be read straight out of `view.hitsThisTick`, which the
 * simulation clears every tick, so the greyed struck-through effector lasted
 * 16.7 milliseconds. And because the host steps the simulation as many times
 * as the frame budget allows and paints once at the end, any frame that
 * advanced two ticks threw the earlier tick's hits away unseen. On a busy
 * phone most of the teaching signal was never drawn at all.
 *
 * Nothing could see that: the renderer's tests passed `hitsThisTick: []`.
 */

const zero = Object.fromEntries(WEAPON_IDS.map((id) => [id, 0]));

const hit = (over: Partial<Landed> = {}): Landed => ({
  weapon: "complement",
  kind: "aureus",
  cls: "gramPositive",
  x: 40,
  y: 0,
  killed: false,
  match: 0.12,
  ...over,
});

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
  active: ["neutrophil", "burst", "complement"],
  unlocked: WEAPON_IDS,
  waveIndex: 0,
  waveTick: 0,
  overload: 0,
  ...over,
});

describe("marks outlive the tick that made them", () => {
  it("stamps the tick it was born on, so a later frame can still draw it", () => {
    const into: Mark[] = [];
    spawnHitMarks(view({ tick: 500, hitsThisTick: [hit()] }), into);
    expect(into).toHaveLength(1);
    expect(into[0]!.born).toBe(500);
    expect(MARK_TICKS).toBeGreaterThan(20);
  });

  it("carries what was hit, not only how well it matched", () => {
    // Without this the renderer cannot tell complement stopped by a wall from
    // a T cell finding nothing to recognise, and draws both the same way.
    const into: Mark[] = [];
    spawnHitMarks(view({ hitsThisTick: [hit({ cls: "helminth", kind: "worm" })] }), into);
    expect(into[0]!.cls).toBe("helminth");
  });
});

describe("the throttle", () => {
  it("never lets one tick spend more than its budget", () => {
    // Complement is a poison resolved once per poisoned enemy per tick, so a
    // single tick can carry hundreds of records. Persisted unthrottled that is
    // a solid grey screen rather than a signal.
    const many = Array.from({ length: 300 }, (_, i) => hit({ x: i }));
    const into: Mark[] = [];
    spawnHitMarks(view({ hitsThisTick: many }), into);
    expect(into).toHaveLength(MARKS_PER_TICK);
  });

  it("spends the budget on failures first, because that is the lesson", () => {
    // A frame that must drop something should drop a kill, which the player
    // can already see happening, and keep the wrong tool failing, which is
    // the only thing on screen that explains anything.
    const hits = [
      ...Array.from({ length: 10 }, () => hit({ match: 1, killed: true })),
      hit({ match: 0.12, x: 999 }),
    ];
    const into: Mark[] = [];
    spawnHitMarks(view({ hitsThisTick: hits }), into);
    expect(into.some((m) => m.match < 1), "the failure was dropped").toBe(true);
  });
});

describe("the three tiers of the matrix are three drawings", () => {
  function drawn(match: number): string {
    const calls: string[] = [];
    const ctx = {
      fillStyle: "",
      strokeStyle: "",
      lineWidth: 1,
      lineCap: "butt",
      globalAlpha: 1,
      note(op: string, a: readonly number[]) {
        calls.push(`${op}(${a.map((n) => Math.round(n * 10) / 10).join(",")})@${this.strokeStyle}`);
      },
      fillRect(...a: number[]) { this.note("fillRect", a); },
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
      createRadialGradient() { return { addColorStop() {} }; },
    };
    const mark: Mark = {
      weapon: "complement",
      cls: "gramPositive",
      x: 30,
      y: 0,
      killed: false,
      match,
      born: 100,
    };
    drawFrame(ctx as unknown as CanvasRenderingContext2D, {
      view: view({ tick: 104 }),
      pulses: [],
      marks: [mark],
      particles: [],
      width: 400,
      height: 800,
      shake: 0,
    });
    return calls.join("|");
  }

  it("draws a principal defence, a contributor and a dud differently", () => {
    /*
      THE LIE THIS REMOVES. The branch was `if (match < 0.35)` and the matrix
      has three tiers, so a match of exactly 0.35, the "contributes but is not
      sufficient alone" tier, is NOT less than 0.35 and took the success
      branch. Complement on a fungus, on a helminth and on a free virion all
      drew as principal defences. The screen stated something the simulation
      disagreed with, which is worse than saying nothing.
    */
    const dud = drawn(0.12);
    const contributes = drawn(0.35);
    const principal = drawn(1);
    expect(dud).not.toBe(contributes);
    expect(contributes).not.toBe(principal);
    expect(dud).not.toBe(principal);
  });

  it("keeps the tier boundary where the matrix puts it", () => {
    // 0.35 belongs with the contributors, not with the duds.
    expect(drawn(0.35)).toBe(drawn(0.6));
    expect(drawn(0.34)).toBe(drawn(0.12));
  });

  it("stops drawing a mark once it is stale", () => {
    const stale: Mark = {
      weapon: "complement",
      cls: "gramPositive",
      x: 30,
      y: 0,
      killed: false,
      match: 0.12,
      born: 0,
    };
    const calls: string[] = [];
    const ctx = {
      fillStyle: "", strokeStyle: "", lineWidth: 1, lineCap: "butt", globalAlpha: 1,
      note(op: string) { calls.push(op); },
      fillRect() { this.note("fillRect"); }, beginPath() { this.note("beginPath"); },
      closePath() { this.note("closePath"); }, arc() { this.note("arc"); },
      ellipse() { this.note("ellipse"); }, rect() { this.note("rect"); },
      moveTo() { this.note("moveTo"); }, lineTo() { this.note("lineTo"); },
      quadraticCurveTo() { this.note("q"); }, fill() { this.note("fill"); },
      stroke() { this.note("stroke"); },
      createRadialGradient() { return { addColorStop() {} }; },
    };
    const before = calls.length;
    drawFrame(ctx as unknown as CanvasRenderingContext2D, {
      view: view({ tick: MARK_TICKS + 50 }),
      pulses: [],
      marks: [stale],
      particles: [],
      width: 400,
      height: 800,
      shake: 0,
    });
    const withStale = calls.length - before;
    calls.length = 0;
    drawFrame(ctx as unknown as CanvasRenderingContext2D, {
      view: view({ tick: MARK_TICKS + 50 }),
      pulses: [],
      marks: [],
      particles: [],
      width: 400,
      height: 800,
      shake: 0,
    });
    expect(withStale).toBe(calls.length);
  });
});
