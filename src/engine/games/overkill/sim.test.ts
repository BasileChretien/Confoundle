import { describe, expect, it } from "vitest";
import {
  CUTS_PER_RUN,
  CUT_TICKS,
  ENEMIES,
  TICK_HZ,
  WEAPONS,
  WEAPON_IDS,
  effectiveDamage,
  type WeaponId,
} from "./content";
import { simulate, type Controller } from "./sim";
import { policy } from "./policies";
import { recording, replayController } from "./replay";

const SEEDS = { spawnSeed: 12345, offerSeed: 999 };
/** Ninety seconds. Long enough to reach the second phase, short enough to run. */
const SHORT = 90 * TICK_HZ;

function loggedRun(maxTicks = SHORT) {
  const rec = recording(policy({ kind: "fixed", weapon: "lightning" }), SEEDS);
  const result = simulate({ ...SEEDS, controller: rec.controller, maxTicks });
  return { result, log: rec.log() };
}

describe("determinism", () => {
  it("runs the same run twice", () => {
    const a = simulate({
      ...SEEDS,
      controller: policy({ kind: "biggestBar" }),
      maxTicks: SHORT,
    });
    const b = simulate({
      ...SEEDS,
      controller: policy({ kind: "biggestBar" }),
      maxTicks: SHORT,
    });
    expect(a).toEqual(b);
  });

  it("changes the run when the seed changes", () => {
    const a = simulate({ ...SEEDS, controller: policy({ kind: "biggestBar" }), maxTicks: SHORT });
    const b = simulate({
      spawnSeed: SEEDS.spawnSeed + 1,
      offerSeed: SEEDS.offerSeed,
      controller: policy({ kind: "biggestBar" }),
      maxTicks: SHORT,
    });
    expect(a.spawnDigest).not.toBe(b.spawnDigest);
  });
});

/**
 * THE GUARD THE WHOLE GAME RESTS ON.
 *
 * The death screen claims that the difference between your run and your run
 * without the knife is caused by the knife. That claim is true only if the two
 * runs were otherwise the same world. If switching a weapon off shifted the
 * spawn sequence by even one draw, the screen would be reporting the
 * difference between two different games and attributing it to a weapon: the
 * exact error this project exists to teach people to spot, printed on our own
 * scoreboard, in the one screen everybody reads.
 */
describe("a counterfactual is the same world", () => {
  it("leaves the spawn sequence untouched when a weapon is removed", () => {
    // Compared over the stretch both worlds existed for. A counterfactual
    // normally dies earlier than the run it came from, so comparing
    // end-of-run totals compares two different numbers of spawns; the first
    // version of this test did exactly that and could only pass inside a
    // window where nobody died, which is a window where the game is not
    // happening yet.
    const { log } = loggedRun(240 * TICK_HZ);
    const base = simulate({
      ...SEEDS,
      controller: replayController(log),
      maxTicks: log.ticks,
    });
    let shorter = 0;
    for (const id of WEAPON_IDS) {
      const arm = simulate({
        ...SEEDS,
        controller: replayController(log),
        without: [id],
        maxTicks: log.ticks,
      });
      const common = Math.min(arm.digestAt.length, base.digestAt.length);
      expect(common).toBeGreaterThan(30);
      expect(arm.digestAt.slice(0, common)).toEqual(base.digestAt.slice(0, common));
      if (arm.ticks < base.ticks) shorter += 1;
    }
    // The premise: arms really do end at different times here, so the prefix
    // comparison above is doing work rather than comparing two identical runs.
    expect(shorter).toBeGreaterThan(0);
  });

  it("keeps drawing at the same rate when the enemy cap bites", () => {
    // With a weapon switched off more enemies survive, so the live ceiling is
    // reached sooner and FEWER enemies actually enter the world. The draws
    // still happen: the stream is consulted before the cap is, so the sequence
    // is untouched. Deciding first and drawing second would tie the spawn
    // sequence to combat outcomes, which is the subtle version of the bug
    // above and the one that would survive review.
    const rec = recording(policy({ kind: "spread" }), SEEDS);
    simulate({ ...SEEDS, controller: rec.controller, maxTicks: 360 * TICK_HZ });
    const log = rec.log();
    const base = simulate({ ...SEEDS, controller: replayController(log), maxTicks: log.ticks });
    expect(base.spawnAttempts - base.spawned).toBeGreaterThan(0);

    let capDiffered = 0;
    for (const id of WEAPON_IDS) {
      const arm = simulate({
        ...SEEDS,
        controller: replayController(log),
        without: [id],
        maxTicks: log.ticks,
      });
      const common = Math.min(arm.digestAt.length, base.digestAt.length);
      expect(arm.digestAt.slice(0, common)).toEqual(base.digestAt.slice(0, common));
      if (!arm.spawnedAt.slice(0, common).every((n, i) => n === base.spawnedAt[i])) capDiffered += 1;
    }
    // Non-vacuity again: somewhere in that common window the ceiling really
    // did admit a different number of enemies, and the stream did not care.
    expect(capDiffered).toBeGreaterThan(0);
  });

  it("has a digest that can actually see a different world", () => {
    // The guard above compares digests and concludes the worlds match. That
    // conclusion is worth exactly as much as the digest's sensitivity, and
    // mutation testing found the gap: blanking the position term out of the
    // fold left every assertion in this file green, because the runs being
    // compared agreed anyway. So the detector gets its own test.
    const still = simulate({
      ...SEEDS,
      controller: { move: () => 0, cut: () => null, chooseUpgrade: (_v, o) => o[0]! },
      maxTicks: SHORT,
    });
    const walking = simulate({
      ...SEEDS,
      controller: { move: () => 3, cut: () => null, chooseUpgrade: (_v, o) => o[0]! },
      maxTicks: SHORT,
    });
    // Same seed and same length, so the stream was consulted identically and
    // the same kinds came out. Only the places they arrived differ.
    expect(walking.spawnAttempts).toBe(still.spawnAttempts);
    expect(walking.spawnDigest).not.toBe(still.spawnDigest);
  });

  it("does NOT hold for a controller that reacts, which is why a counterfactual replays a log", () => {
    // A live policy reads the enemies on screen, so removing a weapon changes
    // what it sees, changes where it walks, and moves every later spawn with
    // it. Nothing is broken here; this is why `study` replays recorded inputs
    // and never re-runs a policy. Kept as a test because the tempting shortcut
    // is to re-run the policy, and it looks like it works.
    const reactive: Controller = policy({ kind: "biggestBar" });
    const base = simulate({ ...SEEDS, controller: reactive, maxTicks: SHORT });
    const digests = WEAPON_IDS.map(
      (id) => simulate({ ...SEEDS, controller: reactive, without: [id], maxTicks: SHORT }).spawnDigest,
    );
    expect(digests.some((d) => d !== base.spawnDigest)).toBe(true);
  });
});

describe("the cut", () => {
  it("cannot be spent more than three times", () => {
    // COUNTED FROM THE SIMULATION'S OWN STATE, not from the controller's
    // intentions. The first version of this test counted the ticks on which
    // the controller believed a cut would be honoured, which it worked out
    // by reading `cutsLeft`; so it reported three whether the limit existed or
    // not, and deleting the limit entirely left it green.
    const started: string[] = [];
    const previous = {} as Record<WeaponId, number>;
    for (const id of WEAPON_IDS) previous[id] = 0;

    const greedy: Controller = {
      ...policy({ kind: "spread" }),
      cut(view) {
        for (const id of WEAPON_IDS) {
          if (view.cutUntil[id] > view.tick && previous[id] <= view.tick) started.push(id);
          previous[id] = view.cutUntil[id];
        }
        // Ask on every single tick, for every weapon in turn.
        return WEAPON_IDS[view.tick % WEAPON_IDS.length]!;
      },
    };
    const r = simulate({ ...SEEDS, controller: greedy, maxTicks: SHORT });
    expect(started).toHaveLength(CUTS_PER_RUN);
    expect(r.ticks).toBeGreaterThan(0);
  });

  it("actually silences the weapon for eight seconds", () => {
    const at = 30 * TICK_HZ;
    let duringCut = 0;
    let afterCut = 0;
    const cutter: Controller = {
      ...policy({ kind: "fixed", weapon: "lightning" }),
      cut: (view) => (view.tick === at ? "lightning" : null),
    };
    let last = 0;
    const watch: Controller = {
      ...cutter,
      move(view) {
        const now = view.damage.lightning;
        if (view.tick > at && view.tick <= at + CUT_TICKS) duringCut += now - last;
        if (view.tick > at + CUT_TICKS && view.tick <= at + 2 * CUT_TICKS) afterCut += now - last;
        last = now;
        return cutter.move(view);
      },
    };
    simulate({ ...SEEDS, controller: watch, maxTicks: at + 2 * CUT_TICKS + 2 });
    expect(duringCut).toBe(0);
    expect(afterCut).toBeGreaterThan(0);
  });
});

describe("armour, which is what stops any weapon being generally good", () => {
  it("takes armour off every hit and never goes below zero", () => {
    expect(effectiveDamage(26, 6, false)).toBe(20);
    expect(effectiveDamage(9, 18, false)).toBe(0);
    expect(effectiveDamage(9, 0, false)).toBe(9);
  });

  it("lets poison through, which is the only reason a brute can be killed", () => {
    expect(effectiveDamage(22, 18, true)).toBe(22);
  });

  it("means lightning does literally nothing to a brute and the knife does something", () => {
    // Stated here as well as in the table because it is the design claim, and
    // a tuning pass that quietly made lightning a brute answer would break the
    // game without breaking anything that looks like a test.
    const brute = ENEMIES.brute.armour;
    expect(effectiveDamage(WEAPONS.lightning.damage, brute, false)).toBe(0);
    expect(effectiveDamage(WEAPONS.knife.damage, brute, false)).toBeGreaterThan(0);
  });
});

/**
 * A source scan, in the style the rest of this repo uses for rules a person
 * has to remember otherwise. Every one of these would produce a simulation
 * that cannot be replayed, and none of them would fail any other test: a run
 * seeded off the clock still runs, still looks right, and quietly makes every
 * counterfactual the game draws a fiction.
 */
describe("nothing in here can reach outside itself", () => {
  const SOURCES = import.meta.glob("./*.ts", {
    query: "?raw",
    import: "default",
    eager: true,
  }) as Record<string, string>;

  const production = Object.entries(SOURCES).filter(
    ([path]) => !path.endsWith(".test.ts") && !path.includes("_probe"),
  );

  const BANNED: readonly (readonly [string, RegExp])[] = [
    ["Math.random", /Math\s*\.\s*random/],
    ["Date", /\bnew\s+Date\b|\bDate\s*\.\s*now\b/],
    ["performance", /\bperformance\s*\.\s*now\b/],
    ["trigonometry", /Math\s*\.\s*(sin|cos|tan|atan2)\b/],
  ];

  it("scans the files it thinks it scans", () => {
    // The hole every scan in this repo has had at least once: a glob that
    // matches less than its name promises. Assert the membership, not the
    // count.
    const names = production.map(([p]) => p.replace("./", "")).sort();
    expect(names).toEqual(["content.ts", "policies.ts", "replay.ts", "rng.ts", "sim.ts"]);
  });

  it("detects the things it is looking for", () => {
    // Self-test, because a scanner that matches nothing passes everything.
    const bait = "const t = Date.now() + Math.random() + Math.cos(1) + performance.now();";
    for (const [, re] of BANNED) expect(re.test(bait)).toBe(true);
  });

  it.each(["sim.ts", "rng.ts", "content.ts", "replay.ts"])(
    "%s reads no clock, draws no unseeded randomness, and uses no trigonometry",
    (file) => {
      const source = production.find(([p]) => p.endsWith(file))![1];
      // Comments discuss these by name, so they are stripped before matching.
      const code = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
      for (const [name, re] of BANNED) {
        expect(re.test(code), `${file} must not use ${name}`).toBe(false);
      }
    },
  );

  it("allows the policies file its trigonometry, and nothing else", () => {
    // `policies.ts` turns a vector into one of eight directions and uses
    // `atan2` to do it. That is allowed because a policy is a stand-in for a
    // thumb: it is INPUT to the simulation, and its output is one of nine
    // integers, so an engine that rounded `atan2` differently could at worst
    // produce a different log, never a different replay of the same log.
    const source = production.find(([p]) => p.endsWith("policies.ts"))![1];
    const code = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
    expect(/Math\s*\.\s*atan2\b/.test(code)).toBe(true);
    for (const [name, re] of BANNED.filter(([n]) => n !== "trigonometry")) {
      expect(re.test(code), `policies.ts must not use ${name}`).toBe(false);
    }
  });
});

describe("the run itself", () => {
  it("kills the player rather than running out the clock", () => {
    // If nothing ever dies the counterfactual has nothing to measure, and
    // every arm reports the same number. This is the premise of the whole
    // death screen and it is a property of the tuning, so it is asserted.
    const r = simulate({
      ...SEEDS,
      controller: policy({ kind: "fixed", weapon: "ice" }),
      maxTicks: 8 * 60 * TICK_HZ,
    });
    expect(r.died).toBe(true);
    expect(r.ticks).toBeGreaterThan(60 * TICK_HZ);
  });

  it("books overkill against the weapon that wasted it", () => {
    const r = simulate({
      ...SEEDS,
      controller: policy({ kind: "fixed", weapon: "lightning" }),
      maxTicks: SHORT,
    });
    // Lightning sprays into crowds that other weapons are already killing, so
    // a large slice of what it reports never bought anything. That surplus is
    // the first of the two ways the meter misleads.
    expect(r.overkill.lightning / r.damage.lightning).toBeGreaterThan(0.1);
    for (const id of WEAPON_IDS) {
      expect(r.overkill[id]).toBeLessThanOrEqual(r.damage[id]);
    }
  });

  it("never books damage for a weapon that was switched off", () => {
    const { log } = loggedRun();
    for (const id of WEAPON_IDS) {
      const arm = simulate({
        ...SEEDS,
        controller: replayController(log),
        without: [id],
        maxTicks: log.ticks,
      });
      expect(arm.damage[id]).toBe(0);
      expect(arm.kills[id as WeaponId]).toBe(0);
    }
  });
});
