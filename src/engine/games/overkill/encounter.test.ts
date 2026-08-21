import { describe, expect, it } from "vitest";
import { ENEMIES, type EnemyKind } from "./content";
import { ENCOUNTER_TICKS, PORE_REACH, macAt } from "./encounter";

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
    expect(stalled.depth).toBeCloseTo(PORE_REACH, 6);
    expect(through.depth).toBeCloseTo(PORE_REACH, 6);
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
