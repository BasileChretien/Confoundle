import { describe, expect, it } from "vitest";
import { pollsShapeOpinion } from "./polls-shape-opinion";
import { stratifiedRates } from "../../engine/charts/rates";

/**
 * Source reconciliation for Toff (2018), Study 1, against Appendix Table C-1.
 *
 * The appendix prints a share and an N for each cell but no counts. Every count
 * shipped here is reconstructed, so this file does the two things the project's
 * reconstruction standard requires: prove each count is the UNIQUE whole number
 * consistent with its printed share and N, and prove the set reproduces a
 * printed quantity that was not used to derive it.
 */

/** Appendix Table C-1: printed share and cell N. */
const PRINTED: Record<string, Record<string, [number, number]>> = {
  foreign: {
    "control-text": [53.8, 314],
    "control-graphic": [54.5, 312],
    even: [55.7, 318],
    lopsided: [68.4, 313],
  },
  junkfood: {
    "control-text": [27.8, 316],
    "control-graphic": [33.4, 314],
    even: [31.3, 316],
    lopsided: [39.9, 313],
  },
  netneutrality: {
    "control-text": [69.1, 314],
    "control-graphic": [70.9, 313],
    even: [70.7, 314],
    lopsided: [72.6, 314],
  },
};

/** Effect sizes stated in the paper's PROSE, never used to derive a count. */
const PROSE_EFFECTS = { foreign: 14.2, junkfood: 9.3 };

const data = pollsShapeOpinion.setup.data;
if (data.type !== "rates") throw new Error("expected rates data");

const cell = (stratumId: string, groupId: string) => {
  const o = data.observations.find(
    (x) => x.stratumId === stratumId && x.groupId === groupId,
  );
  if (!o) throw new Error(`no observation for ${stratumId}/${groupId}`);
  return o;
};

describe("every count is the unique whole number the source allows", () => {
  it("recovers exactly one candidate for all twelve cells", () => {
    const ambiguous: string[] = [];
    for (const [stratumId, groups] of Object.entries(PRINTED)) {
      for (const [groupId, [pct, n]] of Object.entries(groups)) {
        const candidates: number[] = [];
        for (let k = 0; k <= n; k++) {
          if (Math.round((k / n) * 1000) / 10 === pct) candidates.push(k);
        }
        if (candidates.length !== 1)
          ambiguous.push(`${stratumId}/${groupId}: ${candidates.length}`);
        else expect(cell(stratumId, groupId).numerator).toBe(candidates[0]);
      }
    }
    expect(ambiguous).toEqual([]);
    expect(data.observations).toHaveLength(12);
  });

  it("uses the printed N for every cell", () => {
    for (const [stratumId, groups] of Object.entries(PRINTED)) {
      for (const [groupId, [, n]] of Object.entries(groups)) {
        expect(cell(stratumId, groupId).denominator).toBe(n);
      }
    }
  });

  it("reproduces each printed share from the reconstructed count", () => {
    for (const [stratumId, groups] of Object.entries(PRINTED)) {
      for (const [groupId, [pct]] of Object.entries(groups)) {
        const o = cell(stratumId, groupId);
        expect(Math.round((o.numerator / o.denominator) * 1000) / 10).toBe(pct);
      }
    }
  });
});

describe("the counts reproduce a printed quantity they were not derived from", () => {
  it("recovers the paper's prose effect sizes to one decimal place", () => {
    // The paper states, in prose, that support was 14.2 points higher on
    // foreign language requirements and 9.3 higher on junk food taxes, against
    // the two control groups COMBINED, which is what its own note says it does.
    // Those prose figures were not used to derive any count above.
    for (const [stratumId, expected] of Object.entries(PROSE_EFFECTS)) {
      const a = cell(stratumId, "control-text");
      const b = cell(stratumId, "control-graphic");
      const t = cell(stratumId, "lopsided");
      const control =
        ((a.numerator + b.numerator) / (a.denominator + b.denominator)) * 100;
      const treated = (t.numerator / t.denominator) * 100;
      expect(treated - control).toBeCloseTo(expected, 1);
    }
  });
});

describe("the finding the puzzle claims", () => {
  const rates = Object.fromEntries(
    stratifiedRates(data).map((s) => [
      s.stratumId,
      Object.fromEntries(s.rates.map((r) => [r.groupId, r.rate])),
    ]),
  );

  /** Pooled control share for an issue, the baseline the paper itself uses. */
  const control = (id: string) => {
    const a = cell(id, "control-text");
    const b = cell(id, "control-graphic");
    return (a.numerator + b.numerator) / (a.denominator + b.denominator);
  };

  it("has the even-divide poll shift support by under two points anywhere", () => {
    // The paper reports no significant divergence between the controls and the
    // even-divide group. It is NOT identical to them: on foreign language it
    // runs about a point and a half higher. So the claim tested, and the claim
    // the copy makes, is "barely moved", not "unchanged".
    for (const id of ["foreign", "junkfood", "netneutrality"]) {
      const shift = (rates[id]["even"] - control(id)) * 100;
      expect(Math.abs(shift)).toBeLessThan(2);
    }
  });

  it("has the lopsided poll move support many times further", () => {
    for (const id of ["foreign", "junkfood"]) {
      const evenShift = Math.abs((rates[id]["even"] - control(id)) * 100);
      const lopShift = (rates[id]["lopsided"] - control(id)) * 100;
      expect(lopShift).toBeGreaterThan(9);
      expect(lopShift).toBeGreaterThan(evenShift * 5);
    }
  });

  it("keeps net neutrality, where the same poll did almost nothing", () => {
    // Dropping it would make the finding look general when the paper reports it
    // as conditional. About seven in ten already favoured it everywhere.
    const n = rates["netneutrality"];
    expect(Math.min(...Object.values(n))).toBeGreaterThan(0.68);
    expect(n["lopsided"] - n["control-text"]).toBeLessThan(0.04);
  });
});

describe("what is deliberately excluded", () => {
  it("leaves out Study 2, whose social security cell cannot be reconciled", () => {
    // 42.3 per cent of 387 people is not reachable by any whole number.
    const reachable = Array.from({ length: 388 }, (_, k) =>
      Math.round((k / 387) * 1000) / 10,
    );
    expect(reachable).not.toContain(42.3);
    // The provenance note is exempt and checked the other way round below:
    // naming what was dropped, and why, is exactly its job.
    const { provenance, ...playerFacing } = pollsShapeOpinion;
    void provenance;
    const beats = JSON.stringify(playerFacing);
    expect(beats).not.toContain("42.3");
    expect(beats).not.toContain("Social Security");
    expect(beats).not.toContain("Study 2");
  });

  it("records in the provenance why Study 2 is out", () => {
    const note = pollsShapeOpinion.provenance.note!.en;
    expect(note).toContain("Study 2 is excluded entirely");
    expect(note).toContain("does not reconcile");
  });

  it("says the sample is an opt-in panel rather than claiming otherwise", () => {
    expect(pollsShapeOpinion.provenance.note!.en).toContain("opt-in online panel");
  });
});

describe("the beats and the answer key", () => {
  it("holds the fourth group back at the setup", () => {
    expect(pollsShapeOpinion.setup.initialView.groupIds).toEqual([
      "control-text",
      "control-graphic",
      "even",
    ]);
    expect(pollsShapeOpinion.reveal.view.groupIds).toBeUndefined();
  });

  it("does not pool the issues, because the same people appear in each", () => {
    // Assignment was per issue, so a respondent sits in several strata under
    // different conditions. Pooling would count them more than once.
    expect(data.strataAreSeparateSamples).toBe(true);
  });

  it("crowns nobody, because none of the four conditions is the right answer", () => {
    expect(data.crownWinner).toBe(false);
  });

  it("marks the rise correct and no-change the trap", () => {
    const correct = pollsShapeOpinion.choices.filter((c) => c.isCorrect);
    expect(correct.map((c) => c.id)).toEqual(["rose"]);
    const trap = pollsShapeOpinion.choices.filter((c) => c.isIntuitiveTrap);
    expect(trap.map((c) => c.id)).toEqual(["nothing"]);
  });

  it("offers three distinct directions, so no two bands share the answer", () => {
    // docs/hedge-audit.md: the skill licenses "support rose". One band says
    // rose, one says unchanged, one says fell, one is the hedge.
    const ids = pollsShapeOpinion.choices.map((c) => c.id);
    expect(ids).toEqual(["nothing", "rose", "fell", "cannot-tell"]);
  });
});
