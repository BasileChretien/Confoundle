import { describe, expect, it } from "vitest";
import { falseBalance } from "./false-balance";
import { restrictRates } from "../../engine/charts/rates";

/**
 * Two papers, both read at source on 2026-08-03.
 *
 * Boykoff and Boykoff (2004), figure 1 on page 129, and Oreskes (2004) in
 * Science. Neither number here was taken from an abstract or a secondary
 * account. The reconciliation checks below are the reason both were accepted:
 * every printed percentage recovers a whole number against its stated
 * denominator, and in both papers the recovered counts sum to that denominator.
 */
const raw = falseBalance.setup.data;
if (raw.type !== "rates") throw new Error("expected rates data");
const data = raw;

const cell = (groupId: string): [number, number] => {
  const o = data.observations.find((x) => x.groupId === groupId);
  if (!o) throw new Error(`no observation for ${groupId}`);
  return [o.numerator, o.denominator];
};

const pct = (n: number, d: number) => Number(((100 * n) / d).toFixed(2));

describe("false balance data", () => {
  it("carries the two counts the puzzle turns on", () => {
    expect(cell("literature")).toEqual([0, 928]);
    expect(cell("press")).toEqual([179, 340]);
  });

  it("reproduces Boykoff's printed 52.65 per cent for balanced coverage", () => {
    expect(pct(179, 340)).toBe(52.65);
  });

  it("reconciles the whole Boykoff table against 340, not 636", () => {
    // The four categories exhaust the articles addressing anthropogenic
    // contribution. Reading them against the 636-article full sample is the
    // obvious mistake and recovers nothing: 52.65 per cent of 636 is 334.85.
    expect(pct(179, 340)).toBe(52.65);
    expect(pct(120, 340)).toBe(35.29);
    expect(pct(21, 340)).toBe(6.18);
    expect(pct(20, 340)).toBe(5.88);
    expect(179 + 120 + 21 + 20).toBe(340);
    expect(Math.round((52.65 / 100) * 636)).not.toBe(179);
  });

  it("reconciles Oreskes' six categories against 928", () => {
    // 75 and 25 per cent are the only figures the essay prints. Both land on
    // whole numbers and the three counts sum to the stated denominator, which
    // is what distinguishes this from the reconstructions the project refused
    // for the continued influence papers. See docs/lesson-backlog.md entry 12.
    expect(0.75 * 928).toBe(696);
    expect(0.25 * 928).toBe(232);
    expect(696 + 232 + 0).toBe(928);
  });

  it("keeps the finding that makes the reveal work", () => {
    // Balanced articles outnumbered every article leading with or giving only
    // the anthropogenic case. Without this the correct answer is not correct.
    expect(179).toBeGreaterThan(120 + 20);
  });

  it("crowns nobody", () => {
    // A crown would be the deck adjudicating a live political argument from a
    // bar chart, which is not what this puzzle is about.
    expect(data.crownWinner).toBe(false);
  });

  it("keeps the two studies apart without the separate-samples flag", () => {
    // The flag is about strata, and there is one stratum, so nothing pools and
    // setting it would only forbid the aggregate view. What keeps the two
    // studies from reading as one dataset is that each group label carries its
    // own window, and the provenance note says so outright.
    expect(data.strata).toHaveLength(1);
    expect(data.strataAreSeparateSamples).toBeUndefined();
    expect(data.groups[0].label.en).toContain("1993 to 2003");
    expect(data.groups[1].label.en).toContain("1988 to 2002");
  });
});

describe("false balance framing", () => {
  it("shows only the literature bar at the setup", () => {
    expect(falseBalance.setup.initialView.groupIds).toEqual(["literature"]);
  });

  it("really withholds the press bar", () => {
    const shown = restrictRates(
      falseBalance.setup.data as never,
      falseBalance.setup.initialView,
    );
    expect(shown.observations).toHaveLength(1);
    expect(shown.groups.map((g) => g.id)).toEqual(["literature"]);
    const revealed = restrictRates(
      falseBalance.setup.data as never,
      falseBalance.reveal.view,
    );
    expect(revealed.observations).toHaveLength(2);
  });

  it("names all four press treatments and both denominators in the framing", () => {
    // The commit beat is only answerable because the framing lists the
    // categories being compared and says how many articles there were.
    const framing = falseBalance.setup.framing.en;
    expect(framing).toContain("340");
    expect(framing).toContain("928");
    expect(framing).toContain("roughly equal weight");
    expect(framing).toContain("mostly the anthropogenic case");
  });

  it("asks a comparison rather than a magnitude, and the hedge is wrong", () => {
    // This is the hedge-audit rule. "What share was balanced" would be a
    // magnitude guess, and every band but one would share the direction the
    // skill licenses, marking a good reasoner wrong to land the surprise.
    expect(falseBalance.setup.question.en).toContain("which was more common");
    const hedge = falseBalance.choices.find((c) => c.id === "cannot-tell");
    expect(hedge?.isCorrect).toBe(false);
    expect(falseBalance.choices.filter((c) => c.isCorrect)).toHaveLength(1);
  });

  it("offers exactly one band carrying the direction the skill licenses", () => {
    // The skill says the balance norm gives a fringe position more standing
    // than the evidence warrants. Only the correct band says that. The other
    // two both point the other way, which is allowed, since sharing a direction
    // only matters among bands a correct reasoner might pick.
    const balanceSide = falseBalance.choices.filter((c) =>
      /equal weight/i.test(c.label.en),
    );
    expect(balanceSide).toHaveLength(1);
    expect(balanceSide[0].isCorrect).toBe(true);
    const otherSide = falseBalance.choices.filter((c) =>
      /anthropogenic case/i.test(c.label.en),
    );
    expect(otherSide).toHaveLength(2);
    expect(otherSide.every((c) => !c.isCorrect)).toBe(true);
  });

  it("marks the evidence-following answer as the intuitive trap", () => {
    const trap = falseBalance.choices.find((c) => c.isIntuitiveTrap);
    expect(trap?.id).toBe("anthropogenic-wide");
  });

  it("makes the point that nothing printed was false", () => {
    // If the reveal read as an accusation of dishonesty it would be the wrong
    // lesson and the wrong politics.
    const explanation = falseBalance.reveal.explanation.en;
    expect(explanation).toContain("Nobody printed a falsehood");
    expect(explanation).toContain("distortion is in the proportions");
    expect(falseBalance.reveal.body?.en ?? "").toContain(
      "fact-checking does not catch it",
    );
  });
});

describe("false balance lesson", () => {
  it("gives the denominator question as the procedural defence", () => {
    const how = falseBalance.lesson.howItWorks?.en ?? "";
    expect(how).toContain("find out the denominator");
    expect(how).toContain("50 to 50 or 928 to 0");
  });

  it("states that the format cuts in every direction", () => {
    // Without this the lesson reads as being about one subject and one side.
    const how = falseBalance.lesson.howItWorks?.en ?? "";
    expect(how).toContain("manufacture apparent consensus");
  });

  it("concedes that balance is usually right", () => {
    const body = falseBalance.lesson.body?.en ?? "";
    expect(body).toContain("good default when a question really is open");
  });
});

describe("false balance provenance note", () => {
  const note = falseBalance.provenance.note?.en ?? "";

  it("disclaims taking a position on the science itself", () => {
    expect(note).toContain("takes no position on climate science");
    expect(note).toContain("any lopsided question in any direction");
  });

  it("records the mismatched windows rather than smoothing them over", () => {
    expect(note).toContain("1988 to 2002 against 1993 to 2003");
    expect(note).toContain("not one dataset viewed twice");
  });

  it("concedes that the two bars are not the same measure", () => {
    // The strongest objection to the whole construction, so it is stated in
    // the puzzle rather than left for a reader to notice.
    expect(note).toContain("not the same measure");
    expect(note).toContain("live scientific option");
  });

  it("explains why the newspapers are named", () => {
    expect(note).toContain("because the study names them");
  });

  it("carries both DOIs, one in provenance and one in the deep dive", () => {
    expect(falseBalance.provenance.doi).toBe("10.1016/j.gloenvcha.2003.10.001");
    const examples = falseBalance.lesson.examples ?? [];
    expect(examples).toHaveLength(1);
    expect(examples[0].provenance.doi).toBe("10.1126/science.1103618");
  });
});
