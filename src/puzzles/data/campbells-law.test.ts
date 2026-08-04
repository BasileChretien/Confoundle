import { describe, expect, it } from "vitest";
import { campbellsLaw } from "./campbells-law";
import {
  crowdingRatio,
  headlineGap,
  lateBand,
  targetShape,
} from "../../engine/charts/targets";

/**
 * Source reconciliation for Eatock, Cooke and Young (2017), read at source from
 * the open-access article rather than from a secondary summary.
 *
 * The paper prints four shares and two attendance totals and no counts at all,
 * so what can be checked is internal consistency: that the compliant shares are
 * derived rather than authored, that the three segments of each bar partition
 * everybody, that both departments really do pass, and that the reconstruction
 * this project would normally attempt is genuinely impossible here.
 */

/** Exactly as printed in the paper. */
const PRINTED = {
  targetPercent: 95,
  a: { attendances: 148_999, breach: 4.68, threeFortyToFour: 20.83 },
  b: { attendances: 108_698, breach: 4.49, threeFortyToFour: 8.56 },
};

const data = campbellsLaw.setup.data;
if (data.type !== "target") throw new Error("expected target data");

const rowFor = (id: string) => targetShape(data).rows.find((r) => r.id === id)!;

describe("every drawn number is one the paper printed, or is derived from one", () => {
  it("takes the breach shares and attendances straight from the source", () => {
    const [a, b] = data.performers;
    expect(a.n).toBe(PRINTED.a.attendances);
    expect(a.breachPercent).toBe(PRINTED.a.breach);
    expect(b.n).toBe(PRINTED.b.attendances);
    expect(b.breachPercent).toBe(PRINTED.b.breach);
  });

  it("takes the final-stretch shares straight from the source", () => {
    expect(data.performers[0].lateSharePercent).toBe(PRINTED.a.threeFortyToFour);
    expect(data.performers[1].lateSharePercent).toBe(PRINTED.b.threeFortyToFour);
  });

  it("derives the compliant share rather than authoring it", () => {
    // 100 minus the printed breach rate, so the figure the whole setup turns on
    // cannot drift from what the paper actually reported.
    expect(rowFor("a").withinPercent).toBeCloseTo(95.32, 10);
    expect(rowFor("b").withinPercent).toBeCloseTo(95.51, 10);
    const authored = JSON.stringify(data.performers);
    expect(authored).not.toContain("95.32");
    expect(authored).not.toContain("95.51");
  });

  it("uses the target the paper states", () => {
    expect(data.targetPercent).toBe(PRINTED.targetPercent);
  });
});

describe("the bars partition everybody, which is what lets them stack", () => {
  it("has the three segments of each bar sum to a hundred", () => {
    for (const r of targetShape(data).rows) {
      expect(r.earlyPercent + r.lateSharePercent + r.breachPercent).toBeCloseTo(
        100,
        10,
      );
    }
  });

  it("puts the final stretch hard against the deadline, not floating", () => {
    // The axis is everyone ordered by time taken. Breachers are past four
    // hours and the three-forty-to-four group sits immediately before them, so
    // the band has to END exactly where the compliant part does.
    for (const r of targetShape(data).rows) {
      expect(lateBand(r).end).toBeCloseTo(r.withinPercent / 100, 10);
    }
  });

  it("keeps every segment non-negative, so no bar is drawn inside out", () => {
    for (const r of targetShape(data).rows) {
      expect(r.earlyPercent).toBeGreaterThan(0);
      expect(r.lateSharePercent).toBeGreaterThan(0);
      expect(r.breachPercent).toBeGreaterThan(0);
    }
  });
});

describe("the premise of the setup", () => {
  it("has both departments actually pass", () => {
    // If either had failed, the puzzle would be about a shortfall rather than
    // about a target being met and gamed.
    for (const r of targetShape(data).rows) expect(r.meetsTarget).toBe(true);
  });

  it("has them pass by margins nobody could tell apart", () => {
    expect(headlineGap(data)!).toBeLessThan(0.2);
  });

  it("has the reveal be a genuine difference, not a rounding artefact", () => {
    const c = crowdingRatio(data)!;
    expect(c.crowded.id).toBe("a");
    expect(c.ratio).toBeGreaterThan(2.4);
  });

  it("shows the headline first and the distribution second", () => {
    expect(campbellsLaw.setup.initialView.kind).toBe("oncompliance");
    expect(campbellsLaw.reveal.view.kind).toBe("insidewindow");
  });
});

describe("the reconstruction this project would normally attempt is impossible", () => {
  it("has no unique integer behind the final-stretch share", () => {
    // The standard is that a reconstructed count counts only if it is unique.
    // Check by enumeration rather than by eye: every integer whose share of
    // 148,999 rounds to 20.83 per cent is a candidate, and there are many.
    const candidates: number[] = [];
    for (let k = 0; k <= PRINTED.a.attendances; k++) {
      const pct = (k / PRINTED.a.attendances) * 100;
      if (Math.abs(pct - PRINTED.a.threeFortyToFour) < 0.005) candidates.push(k);
    }
    expect(candidates.length).toBeGreaterThan(1);
    // So the shape authors published shares, the deliberate exception this
    // project already makes for framing, distribution, dose, estimation and
    // magnitude data, and says so on the figure.
    expect(data.percentNote.en).toContain("no patient counts");
  });
});

describe("the answer key and the hedge", () => {
  it("marks exactly one choice correct", () => {
    const correct = campbellsLaw.choices.filter((c) => c.isCorrect);
    expect(correct.map((c) => c.id)).toEqual(["cannot-tell"]);
  });

  it("PINS THE HEDGE: only one band may say you cannot tell", () => {
    // docs/hedge-audit.md forbids two bands sharing the direction the skill
    // licenses. Here the skill licenses exactly "the compliance figure does not
    // separate them", so the hedge IS the answer and no other band may say the
    // same thing in different words. An earlier draft had a second band reading
    // "almost nothing, and the number cannot tell you", which would have marked
    // a well-reasoning player wrong for picking the hedge. It was removed.
    const hedgey = campbellsLaw.choices.filter((c) =>
      /cannot tell|no way to tell|nothing/i.test(c.label.en),
    );
    expect(hedgey.map((c) => c.id)).toEqual(["cannot-tell"]);
  });

  it("makes the metric's own reading the trap", () => {
    const trap = campbellsLaw.choices.filter((c) => c.isIntuitiveTrap);
    expect(trap.map((c) => c.id)).toEqual(["alike"]);
  });

  it("offers four bands, so the hedge is a judgement rather than a tell", () => {
    expect(campbellsLaw.choices).toHaveLength(4);
  });
});

describe("what the puzzle deliberately does not claim", () => {
  it("makes no claim about the final ten minutes in anything a player reads", () => {
    // The paper prints 15.82 per cent for Hospital A and no counterpart for
    // Hospital B, and the profile behind it is a figure that is never
    // tabulated. Backlog entry 23 rules it out of the puzzle; this test
    // enforces that across every beat.
    //
    // The provenance note is deliberately exempt and checked the other way
    // round below: its job is to record WHY the figure is excluded, so it is
    // the one place the number belongs.
    const { provenance, ...playerFacing } = campbellsLaw;
    void provenance;
    const beats = JSON.stringify(playerFacing);
    expect(beats).not.toContain("15.82");
    expect(beats).not.toContain("ten minutes");
  });

  it("records in the provenance why the final ten minutes is excluded", () => {
    const note = campbellsLaw.provenance.note!.en;
    expect(note).toContain("15.82");
    expect(note).toContain("no counterpart for Hospital B");
  });

  it("says the study measured time and not quality of care", () => {
    expect(campbellsLaw.provenance.note!.en).toContain("not quality of care");
  });

  it("does not accuse either department of breaking the rule", () => {
    expect(campbellsLaw.reveal.body!.en).toContain("Neither department broke");
  });
});
