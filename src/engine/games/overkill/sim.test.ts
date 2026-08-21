import { describe, expect, it } from "vitest";
import {
  CUTS_PER_RUN,
  EFFECTIVE,
  CUT_TICKS,
  ENEMIES,
  LOADOUT_SIZE,
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
  const rec = recording(policy({ kind: "fixed", weapon: "cytokine" }), SEEDS);
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

  it("consults the stream at a rate nothing in the fight can change", () => {
    // THE SUBTLE HALF OF THE GUARD ABOVE. The spawn stream is drawn from before
    // the live-enemy ceiling is consulted, so how many draws happen depends
    // only on how long the run lasted. Deciding first and drawing second would
    // tie the sequence to combat outcomes, which is invisible in a digest
    // comparison and would quietly make every counterfactual a different game.
    //
    // ASSERTED ON THE SERIES RATHER THAN THROUGH GAMEPLAY, because the ceiling
    // does not bind in a real run: measured, the peak live count is 84 to 121
    // against a cap of 220, since the player dies long before that many pile
    // up. The version of this test that waited for the cap to bite went
    // VACUOUS rather than red, and only its own premise check noticed.
    const { log } = loggedRun(240 * TICK_HZ);
    const base = simulate({ ...SEEDS, controller: replayController(log), maxTicks: log.ticks });
    for (const id of WEAPON_IDS) {
      const arm = simulate({
        ...SEEDS,
        controller: replayController(log),
        without: [id],
        maxTicks: log.ticks,
      });
      const common = Math.min(arm.attemptsAt.length, base.attemptsAt.length);
      expect(common).toBeGreaterThan(30);
      expect(arm.attemptsAt.slice(0, common)).toEqual(base.attemptsAt.slice(0, common));
    }
    // Non-vacuity: the counts really do climb, so this is not comparing two
    // lists of zeroes.
    expect(base.attemptsAt[base.attemptsAt.length - 1]!).toBeGreaterThan(100);
  });

  it("has a digest that can actually see a different world", () => {
    // The guard above compares digests and concludes the worlds match. That
    // conclusion is worth exactly as much as the digest's sensitivity, and
    // mutation testing found the gap: blanking the position term out of the
    // fold left every assertion in this file green, because the runs being
    // compared agreed anyway. So the detector gets its own test.
    const still = simulate({
      ...SEEDS,
      controller: { move: () => 0, cut: () => null,
        chooseUpgrade: (_v, o) => o[0]!,
        chooseLoadout: (_v, u) => u.slice(0, LOADOUT_SIZE),
      },
      maxTicks: SHORT,
    });
    const walking = simulate({
      ...SEEDS,
      controller: { move: () => 3, cut: () => null,
        chooseUpgrade: (_v, o) => o[0]!,
        chooseLoadout: (_v, u) => u.slice(0, LOADOUT_SIZE),
      },
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
    // CUTTING SOMETHING THAT KILLS. The cytokines used to be the subject
    // here and cannot be any more: they deal no damage at all now, so
    // `damage.cytokine` is zero throughout and the test would have "proved"
    // the silence by measuring a weapon that was already silent. The whole
    // assertion would have passed with the cut mechanism deleted.
    const cutter: Controller = {
      ...policy({ kind: "fixed", weapon: "burst" }),
      cut: (view) => (view.tick === at ? "burst" : null),
    };
    let last = 0;
    const watch: Controller = {
      ...cutter,
      move(view) {
        const now = view.damage.burst;
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

describe("armour and the matrix, which is what stops any effector being generally good", () => {
  it("takes armour off every hit but never all the way to nothing", () => {
    expect(effectiveDamage(26, 6, false, 1)).toBe(20);
    expect(effectiveDamage(9, 0, false, 1)).toBe(9);
    // THE FLOOR, and it is the point. Flat subtraction alone made the wrong
    // effector do literally zero, which in a wordless game reads as a broken
    // weapon rather than as a lesson about the wrong tool. Fifteen per cent
    // always gets through, so the attack is SEEN to land and fail.
    expect(effectiveDamage(9, 18, false, 1)).toBeCloseTo(1.35, 6);
    expect(effectiveDamage(9, 1000, false, 1)).toBeCloseTo(1.35, 6);
  });

  it("lets complement through the wall rather than around it", () => {
    expect(effectiveDamage(22, 18, true, 1)).toBe(22);
  });

  it("scales by the match before armour, not after", () => {
    // ORDER MATTERS AND IS EASY TO GET BACKWARDS. Matching first means the
    // floor is fifteen per cent OF THE MATCHED DAMAGE, so bringing the wrong
    // effector against an armoured pathogen is bad twice over, which is the
    // intended shape. Subtracting armour first and matching after would give
    // the same trickle whatever you brought, and the whole briefing decision
    // would stop paying.
    expect(effectiveDamage(100, 0, false, 0.12)).toBeCloseTo(12, 6);
    expect(effectiveDamage(100, 90, false, 0.12)).toBeCloseTo(1.8, 6);
    // Armour first would have been max(100*0.15, 100-90) * 0.12 = 1.8 as well
    // at this pair, so the case is chosen where the two orders disagree.
    expect(effectiveDamage(100, 50, false, 0.5)).toBeCloseTo(7.5, 6);
  });

  it("leaves complement scratching the thick wall and tearing the thin one", () => {
    // THE LOAD-BEARING CLAIM OF THE WHOLE GAME, stated here as arithmetic as
    // well as in the matrix. A tuning pass that quietly made complement a
    // good answer to a gram positive would break the design without breaking
    // anything that looks like a test.
    const thin = ENEMIES.coli;
    const thick = ENEMIES.aureus;
    const dps = WEAPONS.complement.poisonDps!;
    const onThin = effectiveDamage(dps, thin.armour, true, EFFECTIVE.complement[thin.cls]);
    const onThick = effectiveDamage(dps, thick.armour, true, EFFECTIVE.complement[thick.cls]);
    expect(onThick).toBeGreaterThan(0);
    expect(onThin).toBeGreaterThan(onThick * 5);
  });

  it("inverts which effector works when the virus goes inside a cell", () => {
    // The best moment in the design, checked as a number. Antibody is the
    // answer in the open and is worth almost nothing the instant the same
    // wave turns over; the cytotoxic T cell is the exact inverse.
    //
    // COMPARED AS THROUGHPUT AND NOT PER HIT, and the first version of this
    // test compared per hit and came out backwards. Antibody is a high rate
    // tagger, three damage across ten targets every 0.3s; a cytotoxic T cell
    // is thirty damage across two every 0.35s. So per hit the T cell "wins"
    // even against a free virion it is the wrong tool for, which is true and
    // completely irrelevant: what a player experiences is how fast the wave
    // in front of them dies. Per hit is a fact about one number in the table.
    // Throughput is the thing the briefing decision is actually about.
    const free = ENEMIES.virion;
    const inside = ENEMIES.infected;
    const dps = (w: "antibody" | "killerT", e: typeof free) => {
      const spec = WEAPONS[w];
      const per = effectiveDamage(spec.damage, e.armour, false, EFFECTIVE[w][e.cls]);
      return (per * spec.maxTargets * TICK_HZ) / spec.cooldown;
    };
    // Each effector is far better on its own side of the turn, and the two
    // thresholds differ ON PURPOSE rather than because one was fitted to the
    // numbers. Antibody's failure against an intracellular pathogen is
    // ABSOLUTE: it cannot physically reach the virus, so the margin is huge
    // and should stay huge. A cytotoxic T cell pointed at a free virion is
    // merely the wrong job for a specialist, so a smaller margin is the
    // honest claim there.
    expect(dps("antibody", free)).toBeGreaterThan(dps("antibody", inside) * 20);
    expect(dps("killerT", inside)).toBeGreaterThan(dps("killerT", free) * 5);
    // And it is a real SWAP rather than two things both getting worse: which
    // of the two you would rather have deployed changes with the phase.
    expect(dps("antibody", free)).toBeGreaterThan(dps("killerT", free));
    expect(dps("killerT", inside)).toBeGreaterThan(dps("antibody", inside));
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
  const SOURCES = import.meta.glob("./*.{ts,tsx}", {
    query: "?raw",
    import: "default",
    eager: true,
  }) as Record<string, string>;

  const production = Object.entries(SOURCES).filter(
    ([path]) => !path.endsWith(".test.ts") && !path.includes("_probe"),
  );

  /**
   * The simulation, which must be reproducible, and the presentation, which
   * must not be able to reach into it. Splitting them here rather than listing
   * only the strict ones means a file added later cannot quietly land on
   * either side: the membership assertion below fails until somebody says
   * which it is.
   */
  const SIMULATION = ["content.ts", "replay.ts", "rng.ts", "sim.ts"];
  const PRESENTATION = [
    "BriefingSheet.tsx",
    "DeathScreen.tsx",
    "Meter.tsx",
    "OverkillGame.tsx",
    "WeaponIcon.tsx",
    "format.ts",
    "input.ts",
    // The oracle. Presentation rather than simulation because it exists to
    // MEASURE the game from outside, and because it imports a type from
    // `policies.ts`, which the boundary below forbids a simulation file from
    // doing. It is also the one file allowed to know the answers; see the
    // scan in `policies.test.ts` for why that is kept out of `policies.ts`.
    "loadouts.ts",
    "policies.ts",
    "render.ts",
  ];

  const BANNED: readonly (readonly [string, RegExp])[] = [
    ["Math.random", /Math\s*\.\s*random/],
    ["Date", /\bnew\s+Date\b|\bDate\s*\.\s*now\b/],
    ["performance", /\bperformance\s*\.\s*now\b/],
    ["trigonometry", /Math\s*\.\s*(sin|cos|tan|atan2)\b/],
  ];

  it("scans the files it thinks it scans", () => {
    // The hole every scan in this repo has had at least once: a glob that
    // matches less than its name promises. Assert the membership, not the
    // count, and make a new file force a decision about which half it is in.
    const names = production.map(([p]) => p.replace("./", "")).sort();
    expect(names).toEqual([...SIMULATION, ...PRESENTATION].sort());
  });

  it("keeps the simulation from importing anything that draws", () => {
    // The boundary that makes the split above mean something. A simulation
    // that reached into the renderer could pick up a frame time, a canvas
    // size or a device pixel ratio, and a run would stop being reproducible
    // on a different screen.
    for (const name of SIMULATION) {
      const source = production.find(([p]) => p.endsWith(name))![1];
      for (const other of PRESENTATION) {
        const mod = other.replace(/\.tsx?$/, "");
        expect(source.includes(`from "./${mod}"`), `${name} must not import ${other}`).toBe(false);
      }
    }
  });

  it("detects the things it is looking for", () => {
    // Self-test, because a scanner that matches nothing passes everything.
    const bait = "const t = Date.now() + Math.random() + Math.cos(1) + performance.now();";
    for (const [, re] of BANNED) expect(re.test(bait)).toBe(true);
  });

  it.each(SIMULATION)(
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
    // If nothing ever dies the counterfactual has nothing to measure and every
    // arm reports the same number, so this is the premise of the whole death
    // screen. It is a property of the TUNING, and the first version of this
    // test pinned it to one policy, which meant a tuning pass that made that
    // one weapon stronger broke a test about something else entirely. Asked
    // across several ways of playing and several worlds instead.
    const cap = 8 * 60 * TICK_HZ;
    const results = [
      policy({ kind: "fixed", weapon: "antibody" }),
      policy({ kind: "fixed", weapon: "burst" }),
      policy({ kind: "spread" }),
    ].flatMap((p, k) =>
      [0, 1].map((j) =>
        simulate({
          spawnSeed: SEEDS.spawnSeed + k * 101 + j * 7919,
          offerSeed: SEEDS.offerSeed,
          controller: p,
          maxTicks: cap,
        }),
      ),
    );
    // Most ways of playing end in death inside eight minutes. Before the ramp
    // was extended past 3:20 the pressure plateaued and almost nothing did.
    expect(results.filter((r) => r.died).length).toBeGreaterThanOrEqual(4);
    // And nobody dies instantly, or the arms would be indistinguishable at the
    // other end.
    for (const r of results) expect(r.ticks).toBeGreaterThan(60 * TICK_HZ);
  }, 60_000);

  it("books overkill against the weapon that wasted it", () => {
    const r = simulate({
      ...SEEDS,
      controller: policy({ kind: "fixed", weapon: "burst" }),
      maxTicks: SHORT,
    });
    // The burst sprays into crowds that other effectors are already killing, so
    // a large slice of what it reports never bought anything. That surplus is
    // the first of the two ways the meter misleads.
    // MEASURED ON `burst` RATHER THAN ON THE CYTOKINES, and the change is
    // forced. Cytokines now deal no damage whatsoever: they recruit, and the
    // killing lands in somebody else's column. Dividing by their damage was
    // dividing by zero, and the assertion was quietly NaN rather than false.
    // The wide low-damage sweep is the right subject anyway, because it is
    // the one that lands on things already dying.
    expect(r.overkill.burst / r.damage.burst).toBeGreaterThan(0.1);
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
