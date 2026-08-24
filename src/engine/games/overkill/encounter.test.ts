import { describe, expect, it } from "vitest";
import { ENEMIES, WEAPON_IDS, type EnemyKind, type WeaponId } from "./content";
import {
  ENCOUNTER_TICKS,
  PORE_REACH,
  SEQUENCE,
  stopStep,
  encounterAt,
  lengthOf,
  macAt,
} from "./encounter";
import { VERB, blockerOf } from "./verbs";

/**
 * The prototype makes one claim. This checks it is the claim being made.
 *
 * "Complement builds its pore perfectly well on a gram positive and then
 * cannot reach through what it built on." If the sequence instead diverged
 * early, the animation would be teaching "complement does not work here",
 * which is a different statement and a false one.
 */

const upTo = (kind: EnemyKind, tick: number) =>
  Array.from({ length: tick }, (_, i) => macAt(i, kind));

describe("the two runs of the same animation", () => {
  it("is identical until the pore tries to go in", () => {
    // THE LOAD-BEARING ASSERTION. Deposition and assembly must match tick for
    // tick, because the lesson is about the last step and only the last step.
    const thin = upTo("coli", 26).map((m) => `${m.stage}:${m.t.toFixed(4)}:${m.scatter.toFixed(4)}`);
    const thick = upTo("aureus", 26).map((m) => `${m.stage}:${m.t.toFixed(4)}:${m.scatter.toFixed(4)}`);
    expect(thick).toEqual(thin);
    // And it really did get all the way through assembly, rather than the two
    // agreeing because nothing happened yet.
    expect(macAt(25, "aureus").stage).toBe("assemble");
    expect(macAt(25, "aureus").scatter).toBeLessThan(0.1);
  });

  it("diverges only at insertion, and then completely", () => {
    expect(macAt(30, "coli").stage).toBe("insert");
    expect(macAt(30, "aureus").stage).toBe("insert");
    // EQUAL DEPTH, and this is the assertion that was wrong first. The pore is
    // a fixed-length object; both drive in the same distance and only one of
    // them arrives somewhere that matters. The earlier version drove the
    // failing pore as deep as the wall was thick, so the gram positive looked
    // MORE penetrated throughout, which is the inverse of the lesson.
    expect(macAt(30, "coli").depth).toBeCloseTo(macAt(30, "aureus").depth, 6);
    expect(macAt(ENCOUNTER_TICKS, "coli").stage).toBe("lyse");
    expect(macAt(ENCOUNTER_TICKS, "aureus").stage).toBe("stall");
  });

  it("stops the pore exactly at the wall it cannot cross", () => {
    // The failure is arithmetic on the pathogen's own field, not a branch
    // somebody wrote. A tuning pass that thickened E. coli past 0.22 would
    // flip this without anybody editing the animation, which is the property
    // that makes the drawing a check on the mechanism rather than a picture
    // of it.
    const stalled = macAt(ENCOUNTER_TICKS, "aureus");
    const through = macAt(ENCOUNTER_TICKS, "coli");
    expect(through.depth).toBeCloseTo(PORE_REACH, 6);
    // The stalled one travels the same distance and then RECOILS off what it
    // hit, so it rests just short. That is the drawing being honest about an
    // impact rather than the pore reaching less far: the equal-travel check
    // below is the load-bearing one.
    expect(stalled.depth).toBeLessThan(PORE_REACH);
    expect(stalled.depth).toBeGreaterThan(PORE_REACH * 0.8);
    // Same insertion, and the wall is what decides what it reached.
    expect(ENEMIES.aureus.wall).toBeGreaterThan(PORE_REACH);
    expect(ENEMIES.coli.wall).toBeLessThan(PORE_REACH);
    expect(stalled.penetrates).toBe(false);
    expect(through.penetrates).toBe(true);
  });

  it("never swells anything it did not open", () => {
    // The swelling is osmotic: water entering through a hole. Drawing it on a
    // cell with no hole would be drawing an effect without its cause.
    for (let t = 0; t <= ENCOUNTER_TICKS; t++) {
      expect(macAt(t, "aureus").swell, `tick ${t}`).toBe(0);
    }
    expect(macAt(ENCOUNTER_TICKS - 10, "coli").swell).toBeGreaterThan(0);
  });
});

describe("the wall numbers carry complement's whole row", () => {
  it("lets the pore through exactly the pathogens complement really lyses", () => {
    // Not a coincidence to be maintained by hand: `EFFECTIVE.complement` and
    // these wall thicknesses have to keep agreeing, and a reader should be
    // able to check one against the other. Gram negative yes, gram positive
    // no, and a fungal wall is thicker still.
    const through = (k: EnemyKind) => ENEMIES[k].wall < PORE_REACH;
    expect(through("coli")).toBe(true);
    expect(through("aureus")).toBe(false);
    expect(through("candida")).toBe(false);
    expect(through("worm")).toBe(false);
  });

  it("orders the walls the way a Gram stain does", () => {
    expect(ENEMIES.aureus.wall).toBeGreaterThan(ENEMIES.coli.wall * 3);
  });
});


describe("every verb is a sequence, and every failure is that sequence stopped", () => {
  const KINDS = Object.keys(ENEMIES) as EnemyKind[];
  const pairs: [WeaponId, EnemyKind][] = WEAPON_IDS.flatMap((w) =>
    KINDS.map((k) => [w, k] as [WeaponId, EnemyKind]),
  );

  it("stops every blocker at a step its own verb actually has", () => {
    // A blocker naming a step that does not exist would never fire, so the
    // encounter would run to completion and draw a success for a pair the
    // matrix calls a failure. Nothing else would notice.
    for (const [w, k] of pairs) {
      const b = blockerOf(w, k);
      if (b === null) continue;
      const names = SEQUENCE[VERB[w]].map((s) => s.name);
      const stop = stopStep(w, k);
      // A pair that fails and names no step never stops, so it runs to the end
      // and draws a kill. Both of this file's real bugs were exactly that.
      expect(stop, `${w} vs ${k} fails (${b}) and names no step`).not.toBeNull();
      expect(names, `${w} vs ${k}: ${b} stops at "${stop}"`).toContain(stop);
    }
  });

  it("runs a blocked encounter identically to a working one until the block", () => {
    /*
      THE RULE, AS AN ASSERTION. A failure is the success interrupted at the
      step that cannot complete, and that is only true if everything before
      that step is the same. If the two diverged earlier, the viewer would be
      watching two different mechanisms and the interruption would explain
      nothing.
    */
    for (const [w, k] of pairs) {
      const b = blockerOf(w, k);
      if (b === null) continue;
      const working = KINDS.find((other) => blockerOf(w, other) === null);
      if (working === undefined) continue;
      const steps = SEQUENCE[VERB[w]];
      const upTo = steps.findIndex((s) => s.name === stopStep(w, k));
      const ticks = steps.slice(0, upTo).reduce((sum, s) => sum + s.ticks, 0);
      for (let t = 0; t < ticks; t++) {
        const a = encounterAt(w, k, t);
        const c = encounterAt(w, working, t);
        expect(`${a.step}:${a.t.toFixed(4)}`, `${w}: ${k} vs ${working} at ${t}`).toBe(
          `${c.step}:${c.t.toFixed(4)}`,
        );
      }
    }
  });

  it("never advances a blocked encounter past the step it stopped at", () => {
    for (const [w, k] of pairs) {
      const b = blockerOf(w, k);
      if (b === null) continue;
      const long = lengthOf(VERB[w]) + 200;
      const end = encounterAt(w, k, long);
      expect(end.step, `${w} vs ${k}`).toBe(stopStep(w, k));
      expect(end.stalled).toBe(true);
      expect(end.kills).toBe(false);
    }
  });

  it("finishes every pair that is not blocked", () => {
    for (const [w, k] of pairs) {
      if (blockerOf(w, k) !== null) continue;
      const steps = SEQUENCE[VERB[w]];
      const end = encounterAt(w, k, lengthOf(VERB[w]) + 50);
      expect(end.step, `${w} vs ${k}`).toBe(steps[steps.length - 1]!.name);
      expect(end.stalled).toBe(false);
    }
  });

  it("gives every verb a success somewhere, so no failure is a first sighting", () => {
    /*
      THE COROLLARY, AND IT IS A HARD RULE. An interruption explains itself
      only to somebody who has already watched that motion succeed. A verb
      that fails against everything in the deck would be teaching a shape
      nobody has ever seen work, which is a strike-through with extra steps.
    */
    for (const w of WEAPON_IDS) {
      const wins = KINDS.filter((k) => blockerOf(w, k) === null);
      expect(wins.length, `${w} never completes against anything`).toBeGreaterThan(0);
    }
  });

  it("gives every verb a failure somewhere, or it teaches nothing", () => {
    // The inverse. An effector that works on everything is a card with no
    // decision attached, and its encounter has nothing to show.
    for (const w of WEAPON_IDS) {
      if (VERB[w] === "signal") continue; // Touches nothing, so it cannot fail.
      const losses = KINDS.filter((k) => blockerOf(w, k) !== null);
      expect(losses.length, `${w} never fails against anything`).toBeGreaterThan(0);
    }
  });
});