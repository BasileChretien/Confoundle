import { describe, expect, it } from "vitest";
import { thirdPersonEffect } from "./third-person-effect";
import {
  distanceFromAnchor,
  gapBetween,
  restrictRatings,
} from "../../engine/charts/ratings";

/**
 * Gunther (1995), Table 1 on page 33, read from the rendered page.
 *
 * These are means, so there is nothing to reconcile the way a count table
 * reconciles. What there is: seven printed differences that must reproduce from
 * the two means beside them, and two subsample sizes that must sum to the
 * combined N. Both are checked against the whole table, not only the row the
 * puzzle uses.
 */
const raw = thirdPersonEffect.setup.data;
if (raw.type !== "ratings") throw new Error("expected ratings data");
const data = raw;

const obs = (id: string) => {
  const o = data.observations.find((x) => x.seriesId === id);
  if (!o) throw new Error(`no observation for ${id}`);
  return o;
};

/** Every row of Table 1: label, N, self mean, self sd, others mean, others sd, printed difference. */
const TABLE1 = [
  ["moral values", 550, 3.24, 0.78, 3.55, 1.28, 0.31],
  ["attitudes", 525, 3.17, 0.66, 3.63, 1.13, 0.46],
  ["combined", 492, 3.23, 0.64, 3.62, 1.07, 0.39],
  ["no exposure", 115, 3.37, 0.6, 3.63, 1.19, 0.26],
  ["some exposure", 319, 3.22, 0.63, 3.63, 1.02, 0.41],
  ["male", 230, 3.08, 0.6, 3.49, 1.07, 0.41],
  ["female", 262, 3.36, 0.65, 3.73, 1.07, 0.37],
] as const;

describe("third person effect data", () => {
  it("carries the combined-index row", () => {
    expect(obs("self").mean).toBe(3.23);
    expect(obs("self").sd).toBe(0.64);
    expect(obs("others").mean).toBe(3.62);
    expect(obs("others").sd).toBe(1.07);
    expect(obs("self").n).toBe(492);
    expect(obs("others").n).toBe(492);
  });

  it("reproduces all seven printed differences in Table 1", () => {
    for (const [label, , self, , others, , diff] of TABLE1) {
      expect({ label, diff: Number((others - self).toFixed(2)) }).toEqual({
        label,
        diff,
      });
    }
  });

  it("derives the puzzle's own gap rather than authoring it", () => {
    expect(gapBetween(data, "self", "others")).toBe(0.39);
  });

  it("has the male and female subsamples sum to the combined N", () => {
    // 230 plus 262 is 492. Printed in different rows and never stated as a
    // total, so it is a real check on the reading of the table.
    const male = TABLE1.find((r) => r[0] === "male")![1];
    const female = TABLE1.find((r) => r[0] === "female")![1];
    expect(male + female).toBe(obs("self").n);
  });

  it("keeps the finding the whole lesson turns on", () => {
    // Not that one mean beats another, but that the self rating sits on "no
    // effect at all" while the same people's rating of everyone else does not.
    expect(data.scale.anchorAt).toBe(3);
    expect(distanceFromAnchor(data, "self")).toBe(0.23);
    expect(distanceFromAnchor(data, "others")).toBe(0.62);
    expect(distanceFromAnchor(data, "others")!).toBeGreaterThan(
      2 * distanceFromAnchor(data, "self")!,
    );
  });

  it("holds in every subgroup the paper breaks out", () => {
    // Men, women, exposed and unexposed all show it, which is why the reveal
    // is allowed to say so.
    for (const [label, , self, , others] of TABLE1) {
      expect({ label, positive: others > self }).toEqual({ label, positive: true });
    }
  });

  it("names both ends of the scale and the anchor", () => {
    // A mean is meaningless without them, and the schema refuses an unlabelled
    // anchor for the same reason.
    expect(data.scale.min).toBe(1);
    expect(data.scale.max).toBe(5);
    expect(data.scale.minLabel.en).toContain("positive");
    expect(data.scale.maxLabel.en).toContain("negative");
    expect(data.scale.anchorLabel?.en).toContain("no effect at all");
  });

  it("shows the dispersion the paper printed rather than implying precision", () => {
    expect(data.dispersionLabel?.en).toContain("standard deviation");
    expect(obs("others").sd!).toBeGreaterThan(obs("self").sd!);
  });
});

describe("third person effect framing", () => {
  it("shows only the self rating at the setup", () => {
    expect(thirdPersonEffect.setup.initialView.groupIds).toEqual(["self"]);
  });

  it("really withholds the others rating", () => {
    const shown = restrictRatings(
      thirdPersonEffect.setup.data as never,
      thirdPersonEffect.setup.initialView,
    );
    expect(shown.observations).toHaveLength(1);
    const revealed = restrictRatings(
      thirdPersonEffect.setup.data as never,
      thirdPersonEffect.reveal.view,
    );
    expect(revealed.observations).toHaveLength(2);
  });

  it("tells the reader what 3 means, which is what makes the beat readable", () => {
    expect(thirdPersonEffect.setup.framing.en).toContain(
      "3 is the middle: no effect at all",
    );
  });

  it("records that question order was randomised and made no difference", () => {
    // The obvious objection to any self-versus-others comparison, and the paper
    // tested it, so the framing says so rather than leaving it to be spotted.
    expect(thirdPersonEffect.setup.framing.en).toContain("order was randomised");
  });

  it("offers exactly one band saying the others rating sits higher", () => {
    const higher = thirdPersonEffect.choices.filter((c) =>
      /Further up the scale/i.test(c.label.en),
    );
    expect(higher).toHaveLength(1);
    expect(higher[0].isCorrect).toBe(true);
    expect(thirdPersonEffect.choices.find((c) => c.isIntuitiveTrap)?.id).toBe("same");
    const hedge = thirdPersonEffect.choices.find((c) => c.id === "cannot-tell");
    expect(hedge?.isCorrect).toBe(false);
    expect(thirdPersonEffect.choices.filter((c) => c.isCorrect)).toHaveLength(1);
  });

  it("turns the finding on the reader instead of on a survey sample", () => {
    const body = thirdPersonEffect.reveal.body?.en ?? "";
    expect(body).toContain("no version of it in which you are the exception");
    expect(body).toContain("other person");
  });
});

describe("third person effect lesson", () => {
  it("explains the asymmetry rather than calling it vanity", () => {
    const body = thirdPersonEffect.lesson.body?.en ?? "";
    expect(body).toContain("privileged access to your own reasons");
    expect(body).toContain("difference in what is observable");
  });

  it("gives a checkable question in place of an unanswerable one", () => {
    const how = thirdPersonEffect.lesson.howItWorks?.en ?? "";
    expect(how).toContain("last three things you bought");
    expect(how).toContain("two different theories of persuasion");
  });

  it("names what the belief is used for", () => {
    expect(thirdPersonEffect.lesson.body?.en ?? "").toContain(
      "controlling what other people are allowed to see",
    );
  });

  it("reports the censorship finding with the authors' own caveat", () => {
    const deepDive = thirdPersonEffect.lesson.examples?.[0];
    expect(deepDive?.summary.en).toContain("overshadowed");
    expect(deepDive?.summary.en).toContain("three fifths");
    expect(deepDive?.provenance.doi).toBe("10.1111/j.1460-2466.1995.tb00712.x");
  });
});

describe("third person effect provenance note", () => {
  const note = thirdPersonEffect.provenance.note?.en ?? "";

  it("records that the deck refused this paper twice for want of counts", () => {
    expect(note).toContain("refusing this paper twice");
    expect(note).toContain("sixteen different count triples");
  });

  it("says nothing in the puzzle rests on the unrecoverable split", () => {
    expect(note).toContain("Nothing here rests on them");
  });

  it("lists the three checks that did pass", () => {
    expect(note).toContain("all seven of its printed differences");
    expect(note).toContain("230 and 262");
    expect(note).toContain("39 per cent");
  });

  it("concedes the sample and the subject matter", () => {
    expect(note).toContain("46 per cent response rate");
    expect(note).toContain("only shows the study it cites");
  });
});
