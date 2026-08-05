import { describe, expect, it } from "vitest";
import { sourceCountIllusion } from "./source-count-illusion";
import { points, restrictRatings } from "../../engine/charts/ratings";

/**
 * Weaver, Garcia, Schwarz and Miller (2007), Study 1A, Table 1, read at source
 * from the published article.
 *
 * Three jobs here. Check the three printed percentages. Reconcile the reading
 * of Table 1 by a route the puzzle does not otherwise use, since the column it
 * draws cannot be checked against the paper's own effect sizes and the
 * neighbouring column can. And pin the design decisions that could rot, above
 * all the one number on the card that was not printed and the fact that this
 * puzzle deliberately does NOT rest on a null.
 */
const raw = sourceCountIllusion.setup.data;
if (raw.type !== "ratings") throw new Error("expected ratings data");
const data = raw;

const obs = (id: string) => {
  const o = data.observations.find((x) => x.seriesId === id);
  if (!o) throw new Error(`no observation for ${id}`);
  return o;
};
const mean = (id: string) => obs(id).mean;
const round = (v: number, places = 2) => Number(v.toFixed(places));

/** Printed in the paper, used only to reconcile against. */
const TOTAL_N = 177;
const CONDITIONS = 3;
const PRINTED_DF = 174;

/**
 * The neighbouring column of the same table, focus-group favorability on a 1 to
 * 7 scale, with the effect sizes the paper prints beside it. Not drawn by the
 * puzzle. It is here because it is the only column whose printed d can be
 * recovered from its printed means and standard deviations, which is what makes
 * it a check on the reading of the table rather than a restatement of it.
 */
const FAVORABILITY = {
  single: { mean: 4.66, sd: 1.06 },
  repeated: { mean: 5.43, sd: 1.02 },
  threePerson: { mean: 6.22, sd: 0.89 },
};
const pooledD = (
  a: { mean: number; sd: number },
  b: { mean: number; sd: number },
) => (a.mean - b.mean) / Math.sqrt((a.sd ** 2 + b.sd ** 2) / 2);

describe("Table 1 as printed", () => {
  it("carries the three percentage estimates", () => {
    expect(mean("one-person-once")).toBe(56.87);
    expect(mean("one-person-thrice")).toBe(65.96);
    expect(mean("three-people")).toBe(72.18);
  });

  it("carries the printed standard deviations, which are wide", () => {
    // Drawn, because the paper prints them and because a reader should see how
    // much these groups overlap. The reveal does not pretend otherwise.
    expect(obs("one-person-once").sd).toBe(20.26);
    expect(obs("one-person-thrice").sd).toBe(15.64);
    expect(obs("three-people").sd).toBe(14.25);
    expect(data.dispersionLabel?.en ?? "").toContain("one standard deviation");
  });
});

describe("reconciliations", () => {
  it("recovers the printed degrees of freedom from the printed total", () => {
    expect(TOTAL_N - CONDITIONS).toBe(PRINTED_DF);
  });

  it("has the per-condition count sum back to the printed total", () => {
    // The one authored figure that was NOT printed: 177 divided by three. The
    // provenance note says so rather than letting it pass as read.
    const total = data.observations.reduce((s, o) => s + o.n, 0);
    expect(total).toBe(TOTAL_N);
    expect(sourceCountIllusion.provenance.note?.en ?? "").toContain(
      "total divided by three",
    );
  });

  it("recovers both printed effect sizes from the neighbouring column", () => {
    // d = 1.60 and d = 0.74 as printed. Neither was used to choose a number on
    // the card; agreement to two decimals is the check that Table 1 was read
    // correctly across its rows.
    expect(round(pooledD(FAVORABILITY.threePerson, FAVORABILITY.single), 2)).toBe(
      1.59,
    );
    expect(round(pooledD(FAVORABILITY.repeated, FAVORABILITY.single), 2)).toBe(
      0.74,
    );
  });

  it("says why that check cannot be run on the column it draws", () => {
    // The paper standardised favorability and percentage and analysed them
    // together, so the F and d for this measure belong to the composite.
    expect(sourceCountIllusion.provenance.note?.en ?? "").toContain(
      "standardised the favorability and percentage items",
    );
  });
});

describe("the finding the puzzle turns on", () => {
  it("puts the repeated single voice between the two controls", () => {
    expect(mean("one-person-thrice")).toBeGreaterThan(mean("one-person-once"));
    expect(mean("one-person-thrice")).toBeLessThan(mean("three-people"));
  });

  it("derives how far along it landed rather than asserting it", () => {
    const span = mean("three-people") - mean("one-person-once");
    const bought = mean("one-person-thrice") - mean("one-person-once");
    expect(round(span)).toBe(15.31);
    expect(round(bought)).toBe(9.09);
    // Three fifths, which is what the correct band and the reveal both claim.
    expect(bought / span).toBeGreaterThan(0.55);
    expect(bought / span).toBeLessThan(0.65);
  });

  it("keeps every estimate above an even split, so the anchor earns its place", () => {
    expect(data.scale.anchorAt).toBe(50);
    for (const o of data.observations) expect(o.mean).toBeGreaterThan(50);
  });
});

describe("the beats", () => {
  it("shows only the two controls at the setup", () => {
    // `bothratings` restricted, not `onerating`, which slices to the first
    // series alone however the view is filtered.
    expect(sourceCountIllusion.setup.initialView.kind).toBe("bothratings");
    const shown = points(
      restrictRatings(data, {
        groupIds: sourceCountIllusion.setup.initialView.groupIds,
      }),
    );
    expect(shown.map((p) => p.seriesId)).toEqual([
      "one-person-once",
      "three-people",
    ]);
  });

  it("adds the answer at the reveal", () => {
    expect(sourceCountIllusion.reveal.view.kind).toBe("bothratings");
    expect(sourceCountIllusion.reveal.view.groupIds).toBeUndefined();
    expect(points(data).map((p) => p.seriesId)).toEqual([
      "one-person-once",
      "three-people",
      "one-person-thrice",
    ]);
  });

  it("KEEPS EVERY DRAWN ROW THE SAME COLOUR ACROSS BOTH BEATS", () => {
    // RatingsView colours by index into the series array AFTER filtering, so a
    // series whose position shifts when the setup is restricted also changes
    // colour between the beats, and the reader loses the thing the two views
    // share. The two controls must therefore lead the array.
    const shownAtSetup = sourceCountIllusion.setup.initialView.groupIds ?? [];
    const restricted = restrictRatings(data, { groupIds: shownAtSetup });
    for (const id of shownAtSetup) {
      expect({ id, index: restricted.series.findIndex((s) => s.id === id) }).toEqual({
        id,
        index: data.series.findIndex((s) => s.id === id),
      });
    }
  });

  it("prints both anchors in the framing, or the question is unanswerable", () => {
    const framing = sourceCountIllusion.setup.framing.en;
    expect(framing).toContain("56.87");
    expect(framing).toContain("72.18");
    expect(framing).toContain("fifteen points");
  });

  it("says the names were visible, which is what makes the result surprising", () => {
    const framing = sourceCountIllusion.setup.framing.en;
    expect(framing).toContain("nobody was hiding who was speaking");
    expect(framing).toContain("they knew it");
  });
});

describe("the commit beat stays answerable", () => {
  it("makes the normatively correct expectation the trap", () => {
    // Discounting a voice you can see repeating itself is what a reader SHOULD
    // do. The puzzle exists because they do not.
    const correct = sourceCountIllusion.choices.filter((c) => c.isCorrect);
    expect(correct).toHaveLength(1);
    expect(correct[0].id).toBe("most-of-the-way");
    expect(sourceCountIllusion.choices.find((c) => c.isIntuitiveTrap)?.id).toBe(
      "discounted",
    );
  });

  it("puts the four bands at four distinct places on one axis", () => {
    // At the low anchor, three fifths up, at the high anchor, past it. Ordered,
    // non-overlapping, and each is a position the framing lets a reader locate.
    expect(sourceCountIllusion.choices.map((c) => c.id)).toEqual([
      "discounted",
      "most-of-the-way",
      "all-the-way",
      "above",
    ]);
  });

  it("NO BAND ASSERTS A NULL, which is why this puzzle was rebuilt", () => {
    // The first draft was built on a null result and its correct answer was
    // "there is no gap". That could have marked a well-reasoning player wrong,
    // and it contradicted the deck's own `no-difference-found`. If a band ever
    // reappears claiming an effect is absent, this fails.
    const nullish =
      /\bno (gap|difference|effect)\b|\bnothing at all\b|\bunchanged\b/i;
    const offenders = sourceCountIllusion.choices.filter((c) =>
      nullish.test(`${c.label.en} ${c.sublabel?.en ?? ""}`),
    );
    expect(offenders.map((c) => c.id)).toEqual([]);
  });
});

describe("the escape routes the paper closed, and the card reports", () => {
  const body = sourceCountIllusion.reveal.body?.en ?? "";

  it("reports the memory check, which is the first objection", () => {
    expect(body).toContain("137 of the 177");
  });

  it("reports the second experiment, where the copies were visibly identical", () => {
    expect(body).toContain("38.26 to 44.18");
    expect(body).toContain("271 of the 305");
  });

  it("reports the mechanism measured directly rather than inferred", () => {
    expect(body).toContain("63.56 milliseconds");
    expect(body).toContain("22.25 milliseconds");
  });
});

describe("the honesty items", () => {
  const note = sourceCountIllusion.provenance.note?.en ?? "";

  it("flags the one figure that was not read off the page", () => {
    expect(note).toContain("only figure on this card that was not read off the page");
    expect(note).toContain("59");
  });

  it("records that the issue was fictitious, so there is no true value", () => {
    expect(note).toContain("fictitious");
    expect(note).toContain("no true value is drawn because none exists");
  });

  it("records the overlap and the narrowness of the sample", () => {
    expect(note).toContain("undergraduates at one university");
    expect(note).toContain("overlap heavily between conditions");
  });

  it("keeps the O'Donnell null in the deep dive and labels it a null", () => {
    // A bounded null belongs in an example that says so, not in an answer key.
    const example = sourceCountIllusion.lesson.examples?.[0];
    expect(example?.provenance.doi).toBe("10.3389/fpsyg.2023.1201674");
    expect(example?.summary.en ?? "").toContain(
      "cannot prove that source count never matters",
    );
    expect(example?.provenance.source ?? "").toContain(
      "rather than across a literature",
    );
  });
});

describe("the lesson does not overshoot", () => {
  it("says plainly that independent corroboration IS good evidence", () => {
    expect(sourceCountIllusion.lesson.body?.en ?? "").toContain(
      "Independent corroboration is genuinely strong evidence",
    );
  });

  it("is not a second illusory truth puzzle", () => {
    // That one is repetition making a claim feel truer. This is repetition
    // making it feel more widely held, which is a different outcome.
    expect(sourceCountIllusion.reasoningSkill).toBe("source-count-illusion");
    expect(sourceCountIllusion.lesson.takeaway.en).toContain("widely held");
  });

  it("gives the reader a check to run, and turns it on themselves", () => {
    const how = sourceCountIllusion.lesson.howItWorks?.en ?? "";
    expect(how).toContain("do the trails end at the same place");
    expect(how).toContain("how many distinct origins you can actually name");
    expect(how).toContain("your own side of an argument first");
  });
});
