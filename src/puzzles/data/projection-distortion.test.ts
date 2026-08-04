import { describe, expect, it } from "vitest";
import { projectionDistortion } from "./projection-distortion";
import {
  areaFidelity,
  gallPeters,
  projectionShape,
  robinson,
  worstMistake,
} from "../../engine/charts/projections";

/**
 * Source reconciliation for Battersby and Kessler (2012), read at source off the
 * rendered pages.
 *
 * The unusual thing about this source is that five of its six figures are
 * printed twice, once in Table 1 and once in the prose paragraph about that
 * projection. That is the cross-check, and it is done here rather than trusted.
 */

/** Table 1, Novice column, n = 31. */
const TABLE_1 = {
  robinson: 10,
  gallpeters: 39,
  vandergrinten: 58,
  goode: 71,
  mercator: 74,
  eisenlohr: 55,
};

/** The same figures where the paper states them again in prose. */
const PROSE = {
  robinson: 10, // "10% and 33%, respectively, indicated that the projection distorted area"
  gallpeters: 39, // "39 percent of Novice participants ... indicated that the projection distorts area"
  vandergrinten: 58, // "More than half of the Novice participants (58%)"
  goode: 71, // "71 percent of Novice participants ... indicated that the projection did not preserve area"
  mercator: 74, // "correctly seen as distorting area (74% and 91%, respectively)"
  eisenlohr: 58, // "More than half of all Novice participants (58%)" -- DISAGREES with Table 1
};

const N_NOVICE = 31;

const data = projectionDistortion.setup.data;
if (data.type !== "projection") throw new Error("expected projection data");
const byId = new Map(data.projections.map((p) => [p.id, p]));

describe("the paper states five of its six figures twice, and they agree", () => {
  it("agrees on every projection the puzzle uses", () => {
    for (const id of [
      "robinson",
      "gallpeters",
      "vandergrinten",
      "goode",
      "mercator",
    ] as const) {
      expect({ id, table: TABLE_1[id] }).toEqual({ id, table: PROSE[id] });
    }
  });

  it("does NOT agree on Eisenlohr, which is why it is excluded", () => {
    // Table 1 says 55 per cent, the prose says 58. Rather than pick, drop it.
    expect(TABLE_1.eisenlohr).not.toBe(PROSE.eisenlohr);
    expect(byId.has("eisenlohr")).toBe(false);
  });

  it("takes every drawn share straight from Table 1", () => {
    for (const [id, pct] of Object.entries(TABLE_1)) {
      if (id === "eisenlohr") continue;
      expect(byId.get(id)?.saidDistorts).toBe(pct);
    }
    expect(data.projections).toHaveLength(5);
  });
});

describe("what the puzzle deliberately refuses to use", () => {
  it("keeps the trained group out entirely, because it cannot be reconciled", () => {
    // The paper reports 91 per cent of its 42 GIScience participants for
    // Mercator. No whole number of 42 people rounds to 91 per cent, so that
    // column cannot be checked at all and none of it is used here.
    const reachable = Array.from({ length: 43 }, (_, k) =>
      Math.round((k / 42) * 100),
    );
    expect(reachable).not.toContain(91);

    // No trained-group figure appears in anything a player reads. The
    // provenance note is exempt and checked the other way round below: naming
    // what was excluded, and why, is exactly its job.
    const { provenance, ...playerFacing } = projectionDistortion;
    void provenance;
    const beats = JSON.stringify(playerFacing);
    for (const gisFigure of ["33", "83", "62", "50 per cent", "91"]) {
      expect(beats).not.toContain(`${gisFigure} per cent of the trained`);
    }
    expect(beats).not.toContain("GIScience");
    expect(beats).not.toContain("91");
  });

  it("records in the provenance why the trained group is excluded", () => {
    const note = projectionDistortion.provenance.note!.en;
    expect(note).toContain("42 trained participants is excluded");
    expect(note).toContain("does not reconcile");
  });

  it("authors shares as published rather than converting them to counts", () => {
    // Each novice percentage does pin a unique number of people out of 31, but
    // no other printed quantity in the paper confirms those counts, so
    // converting would assert precision the source does not support. This test
    // records that the uniqueness was checked and the conversion still refused.
    for (const pct of Object.values(TABLE_1)) {
      const candidates = Array.from({ length: N_NOVICE + 1 }, (_, k) => k).filter(
        (k) => Math.round((k / N_NOVICE) * 100) === pct,
      );
      expect(candidates).toHaveLength(1);
    }
    expect(data.percentNote.en).toContain("31 people");
  });

  it("says on the figure that the study's own maps are not reproduced", () => {
    expect(data.percentNote.en).toContain("not reproduced");
  });
});

describe("the arithmetic the reveal asserts", () => {
  it("has Gall-Peters exactly area-true at every latitude", () => {
    for (const lat of [0, 20, 40, 60, 80]) {
      expect(areaFidelity(gallPeters, lat)).toBeCloseTo(1, 9);
    }
  });

  it("has Robinson inflate the far north by about double, as the copy says", () => {
    const ratio = areaFidelity(robinson, 70) / areaFidelity(robinson, 0);
    expect(ratio).toBeGreaterThan(1.8);
    expect(ratio).toBeLessThan(2.2);
    expect(projectionDistortion.reveal.explanation.en).toContain("roughly double");
  });

  it("has people accuse the honest map nearly four times as often", () => {
    const w = worstMistake(data)!;
    // Goode, exactly area-true, accused by 71 per cent. Robinson, which
    // distorts, accused by 10.
    expect(w.accusedHonest.id).toBe("goode");
    expect(w.excusedLiar.id).toBe("robinson");
    expect(w.ratio).toBeCloseTo(7.1, 6);
  });

  it("has both drawn maps on screen and both area verdicts represented", () => {
    const { drawn, rows } = projectionShape(data);
    expect(drawn.map((r) => r.id)).toEqual(["robinson", "gallpeters"]);
    expect(rows.some((r) => r.equalArea)).toBe(true);
    expect(rows.some((r) => !r.equalArea)).toBe(true);
  });
});

describe("the answer key", () => {
  it("marks the stretched-looking map correct and the familiar one the trap", () => {
    const correct = projectionDistortion.choices.filter((c) => c.isCorrect);
    expect(correct.map((c) => c.id)).toEqual(["gallpeters"]);
    const trap = projectionDistortion.choices.filter((c) => c.isIntuitiveTrap);
    expect(trap.map((c) => c.id)).toEqual(["robinson"]);
  });

  it("keeps the answer bands pointing at the two maps actually drawn", () => {
    const drawn = projectionShape(data).drawn.map((r) => r.id);
    for (const id of ["robinson", "gallpeters"]) expect(drawn).toContain(id);
  });

  it("offers the half-remembered objection as a band, and it is wrong", () => {
    // "Every flat map distorts area" is the common half-truth. Every flat map
    // distorts SOMETHING; equal-area projections give up shape and keep area
    // exact, which the arithmetic above proves.
    const neither = projectionDistortion.choices.find((c) => c.id === "neither");
    expect(neither?.isCorrect).toBe(false);
    expect(areaFidelity(gallPeters, 70)).toBeCloseTo(1, 9);
  });

  it("starts on the maps alone and reveals the verdict", () => {
    expect(projectionDistortion.setup.initialView.kind).toBe("asdrawn");
    expect(projectionDistortion.reveal.view.kind).toBe("whichisexact");
  });
});
