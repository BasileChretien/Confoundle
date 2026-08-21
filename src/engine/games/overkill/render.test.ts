import { describe, expect, it } from "vitest";
import { TICK_HZ, WEAPON_IDS } from "./content";
import { WEAPON_COLOR, cutProgress, drawFrame, secondsOf } from "./render";
import type { EnemyView, RunView } from "./sim";

/**
 * The renderer, against a context that writes down what it was asked to do.
 *
 * A canvas cannot be read back in this suite, so the assertion is about the
 * INSTRUCTIONS rather than the pixels. That is enough for the things that can
 * silently go wrong: a shape drawn in the wrong colour, an enemy drawn at the
 * wrong place, and the grid, which is the only thing on screen that tells a
 * player they are moving and would be invisible to any test that only asked
 * whether the frame threw.
 */

interface Call {
  op: string;
  args: readonly number[];
  fill: string;
  stroke: string;
  alpha: number;
}

function fakeContext() {
  const calls: Call[] = [];
  const ctx = {
    fillStyle: "",
    strokeStyle: "",
    lineWidth: 1,
    globalAlpha: 1,
    note(op: string, args: readonly number[]) {
      calls.push({
        op,
        args,
        fill: String(this.fillStyle),
        stroke: String(this.strokeStyle),
        alpha: this.globalAlpha,
      });
    },
    fillRect(...a: number[]) {
      this.note("fillRect", a);
    },
    beginPath() {
      this.note("beginPath", []);
    },
    arc(...a: number[]) {
      this.note("arc", a);
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
    closePath() {
      this.note("closePath", []);
    },
    fill() {
      this.note("fill", []);
    },
    stroke() {
      this.note("stroke", []);
    },
  };
  return { ctx: ctx as unknown as CanvasRenderingContext2D, calls };
}

function enemy(over: Partial<EnemyView> = {}): EnemyView {
  return { id: 1, kind: "chaff", x: 0, y: 0, hp: 8, slowUntil: 0, flashUntil: 0, ...over };
}

function view(over: Partial<RunView> = {}): RunView {
  const zero = Object.fromEntries(WEAPON_IDS.map((id) => [id, 0]));
  return {
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
    ...over,
  };
}

const SIZE = { width: 400, height: 800, particles: [], shake: 0 };

describe("drawing a frame", () => {
  it("paints a ground and a grid before anything else", () => {
    const { ctx, calls } = fakeContext();
    drawFrame(ctx, { view: view(), pulses: [], ...SIZE });
    expect(calls[0]!.op).toBe("fillRect");
    expect(calls[0]!.args).toEqual([0, 0, 400, 800]);
    // The grid: at least one horizontal and one vertical line.
    expect(calls.filter((c) => c.op === "moveTo").length).toBeGreaterThan(4);
  });

  it("moves the grid with the player, which is the only sign of travel", () => {
    // A camera locked to the player draws them in the same place forever, so
    // if the grid did not shift, holding a direction would look like nothing
    // happening at all.
    const a = fakeContext();
    const b = fakeContext();
    drawFrame(a.ctx, { view: view({ x: 0 }), pulses: [], ...SIZE });
    drawFrame(b.ctx, { view: view({ x: 37 }), pulses: [], ...SIZE });
    const xs = (f: typeof a) =>
      f.calls.filter((c) => c.op === "moveTo").map((c) => c.args[0]);
    expect(xs(a)).not.toEqual(xs(b));
  });

  it("draws the player at the centre whatever the world coordinates are", () => {
    for (const at of [0, 500, -900]) {
      const { ctx, calls } = fakeContext();
      drawFrame(ctx, { view: view({ x: at, y: at }), pulses: [], ...SIZE });
      const white = calls.find((c) => c.op === "arc" && c.fill === "#FFFFFF");
      expect(white).toBeDefined();
      expect(white!.args.slice(0, 2)).toEqual([200, 400]);
    }
  });

  it("gives each enemy kind its own shape", () => {
    const shapes = (kind: EnemyView["kind"]) => {
      const { ctx, calls } = fakeContext();
      drawFrame(ctx, {
        view: view({ enemies: [enemy({ kind, x: 40, y: 0 })] }),
        pulses: [],
        ...SIZE,
      });
      return calls.filter((c) => ["rect", "lineTo", "arc"].includes(c.op)).map((c) => c.op);
    };
    expect(shapes("brute")).toContain("rect");
    expect(shapes("hunter")).toContain("lineTo");
    // Chaff is a circle, and so is the player, so the count is what separates
    // them: two arcs for the player's body and halo, plus one for the chaff.
    expect(shapes("chaff").filter((o) => o === "arc").length).toBeGreaterThan(2);
  });

  it("rings a slowed enemy in the ice colour, and only while it is slowed", () => {
    const ringed = (slowUntil: number) => {
      const { ctx, calls } = fakeContext();
      drawFrame(ctx, {
        view: view({ tick: 100, enemies: [enemy({ slowUntil })] }),
        pulses: [],
        ...SIZE,
      });
      return calls.some((c) => c.op === "arc" && c.stroke === WEAPON_COLOR.ice);
    };
    expect(ringed(160)).toBe(true);
    expect(ringed(100)).toBe(false);
    expect(ringed(0)).toBe(false);
  });

  it("marks a hit on the player without moving them", () => {
    const { ctx, calls } = fakeContext();
    drawFrame(ctx, { view: view({ hurtThisTick: true }), pulses: [], ...SIZE });
    expect(calls.some((c) => c.op === "arc" && c.fill === "#FCA5A5")).toBe(true);
    expect(calls.some((c) => c.op === "arc" && c.fill === "#FFFFFF")).toBe(false);
  });

  it("expands a pulse in the weapon's colour and drops it once it is stale", () => {
    const drawn = (age: number) => {
      const { ctx, calls } = fakeContext();
      drawFrame(ctx, {
        view: view({ tick: 100 }),
        pulses: [{ weapon: "poison", tick: 100 - age }],
        ...SIZE,
      });
      // A pulse is the only thing drawn part-transparent. Filtering on colour
      // alone caught the player's own circle too, because the stroke colour
      // is still whatever the last pulse set it to when the player is drawn.
      return calls.filter(
        (c) => c.op === "arc" && c.stroke === WEAPON_COLOR.poison && c.alpha < 1,
      );
    };
    expect(drawn(0)).toHaveLength(1);
    expect(drawn(4)).toHaveLength(1);
    expect(drawn(40)).toHaveLength(0);
    // It grows outwards, so the eye reads it as leaving the player.
    expect(drawn(6)[0]!.args[2]).toBeGreaterThan(drawn(1)[0]!.args[2]!);
  });

  it("skips enemies that are off screen", () => {
    const { ctx, calls } = fakeContext();
    const far = fakeContext();
    drawFrame(ctx, { view: view({ enemies: [enemy({ x: 20 })] }), pulses: [], ...SIZE });
    drawFrame(far.ctx, { view: view({ enemies: [enemy({ x: 5000 })] }), pulses: [], ...SIZE });
    expect(far.calls.length).toBeLessThan(calls.length);
  });
});

describe("the small readouts", () => {
  it("reports how far through a cut a weapon is", () => {
    const v = view({ tick: 100, cutUntil: { ...view().cutUntil, ice: 100 + 8 * TICK_HZ } });
    expect(cutProgress(v, "ice")).toBeCloseTo(0, 6);
    expect(cutProgress(v, "knife")).toBeNull();
    const later = view({ tick: 100 + 4 * TICK_HZ, cutUntil: v.cutUntil });
    expect(cutProgress(later, "ice")).toBeCloseTo(0.5, 6);
  });

  it("splits ticks into minutes and seconds", () => {
    expect(secondsOf(0)).toEqual({ m: 0, s: 0 });
    expect(secondsOf(59 * TICK_HZ)).toEqual({ m: 0, s: 59 });
    expect(secondsOf(61 * TICK_HZ)).toEqual({ m: 1, s: 1 });
    expect(secondsOf(2 * 60 * TICK_HZ + 3 * TICK_HZ)).toEqual({ m: 2, s: 3 });
  });
});
