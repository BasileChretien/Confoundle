import { describe, expect, it } from "vitest";
import { sponsorshipBias } from "./sponsorship-bias";

/**
 * Barnes & Bero 1998, Table 3. Every cell is printed in the paper, so these
 * tests are not checking a decoding, they are checking a transcription. The
 * strongest such check available is to recompute a statistic the authors
 * calculated independently and see whether it lands on their printed value,
 * which is why the chi-square is here.
 */
const raw = sponsorshipBias.setup.data;
if (raw.type !== "rates") throw new Error("expected rates data");
const data = raw;

const count = (groupId: string, stratumId: string): [number, number] => {
  const o = data.observations.find(
    (x) => x.groupId === groupId && x.stratumId === stratumId,
  );
  if (!o) throw new Error(`no observation for ${groupId}/${stratumId}`);
  return [o.numerator, o.denominator];
};

/** The four cells of the two by two, as the paper's Table 3 lays them out. */
const [industryNotHarmful, industryTotal] = count("industry", "not-harmful");
const [independentNotHarmful, independentTotal] = count(
  "independent",
  "not-harmful",
);
const industryHarmful = industryTotal - industryNotHarmful;
const independentHarmful = independentTotal - independentNotHarmful;

describe("sponsorship bias data", () => {
  it("carries the four cells the paper prints", () => {
    expect([industryNotHarmful, industryHarmful]).toEqual([29, 2]);
    expect([independentNotHarmful, independentHarmful]).toEqual([10, 65]);
  });

  it("reproduces every marginal the paper prints", () => {
    expect(industryTotal).toBe(31);
    expect(independentTotal).toBe(75);
    expect(industryTotal + independentTotal).toBe(106);
    // 39 of 106 concluded not harmful, printed as 37 per cent.
    expect(industryNotHarmful + independentNotHarmful).toBe(39);
    expect(
      Math.round((100 * (industryNotHarmful + independentNotHarmful)) / 106),
    ).toBe(37);
    // 67 of 106 concluded harmful, printed as 63 per cent.
    expect(industryHarmful + independentHarmful).toBe(67);
    expect(
      Math.round((100 * (industryHarmful + independentHarmful)) / 106),
    ).toBe(63);
  });

  it("reproduces the four printed percentages of Table 3", () => {
    expect(Math.round((100 * industryNotHarmful) / industryTotal)).toBe(94);
    expect(Math.round((100 * industryHarmful) / industryTotal)).toBe(6);
    expect(Math.round((100 * independentNotHarmful) / independentTotal)).toBe(
      13,
    );
    expect(Math.round((100 * independentHarmful) / independentTotal)).toBe(87);
  });

  it("reproduces the printed share of the doubt, 74 per cent of it", () => {
    const doubt = industryNotHarmful + independentNotHarmful;
    expect(Math.round((100 * industryNotHarmful) / doubt)).toBe(74);
  });

  it("reproduces the printed relative risk of 7.0", () => {
    const rr =
      industryNotHarmful /
      industryTotal /
      (independentNotHarmful / independentTotal);
    expect(Number(rr.toFixed(1))).toBe(7.0);
  });

  it("reproduces the printed crude odds ratio of 94.2", () => {
    // Exactly 1885/20 = 94.25. The paper prints 94.2, which is that value
    // rounded to one decimal; asserting the exact ratio is stricter.
    const or =
      (industryNotHarmful * independentHarmful) /
      (industryHarmful * independentNotHarmful);
    expect(or).toBe(94.25);
  });

  it("reproduces the paper's own chi-square of 60.69", () => {
    const [a, b, c, d] = [
      industryNotHarmful,
      industryHarmful,
      independentNotHarmful,
      independentHarmful,
    ];
    const n = a + b + c + d;
    const chi =
      (n * Math.pow(a * d - b * c, 2)) /
      ((a + b) * (c + d) * (a + c) * (b + d));
    expect(Number(chi.toFixed(2))).toBe(60.69);
  });

  it("keeps the composition stratum consistent with the group totals", () => {
    // The setup's numerators are the reveal's denominators. If these ever drift
    // apart the puzzle would show a reader two different literatures.
    expect(count("industry", "literature")).toEqual([industryTotal, 106]);
    expect(count("independent", "literature")).toEqual([independentTotal, 106]);
  });

  it("does not author the adjusted odds ratio anywhere in the data", () => {
    // 88.4 is real and cited in the provenance, but it is an adjusted odds
    // ratio for a common outcome and belongs nowhere near the counts.
    const numbers = data.observations.flatMap((o) => [
      o.numerator,
      o.denominator,
    ]);
    expect(numbers).not.toContain(88);
    expect(numbers).not.toContain(94);
  });
});

describe("sponsorship bias framing", () => {
  it("shows only the composition of the literature in the setup", () => {
    // Showing the conclusion stratum first would hand over the answer.
    expect(sponsorshipBias.setup.initialView.strataIds).toEqual(["literature"]);
  });

  it("drops the filter at the reveal", () => {
    expect(sponsorshipBias.reveal.view.strataIds).toBeUndefined();
  });

  it("treats the two strata as separate measures rather than a partition", () => {
    expect(data.strataAreSeparateSamples).toBe(true);
  });

  it("crowns no winner, because neither conclusion is a win", () => {
    expect(data.crownWinner).toBe(false);
  });

  it("gives the reader both group sizes before asking", () => {
    const framing = sponsorshipBias.setup.framing.en;
    expect(framing).toContain("106");
    expect(framing).toContain("77 per cent");
  });

  it("tells the reader the quality scoring was blinded", () => {
    const framing = sponsorshipBias.setup.framing.en;
    expect(framing).toContain("blind");
    expect(framing).toContain("random order");
  });

  it("marks the equal-rates option as the intuitive trap and keeps a hedge", () => {
    const trap = sponsorshipBias.choices.find((c) => c.isIntuitiveTrap);
    expect(trap?.id).toBe("equally");
    const hedge = sponsorshipBias.choices.find((c) => c.id === "cannot-tell");
    expect(hedge?.isCorrect).toBe(false);
    expect(sponsorshipBias.choices.filter((c) => c.isCorrect)).toHaveLength(1);
  });

  it("quotes the relative risk rather than the odds ratio in the reveal", () => {
    const explanation = sponsorshipBias.reveal.explanation.en;
    expect(explanation).toContain("relative risk of 7.0");
    expect(explanation).not.toContain("88.4");
    expect(explanation).not.toContain("odds ratio");
  });

  it("says in the reveal that the visible signals did not predict anything", () => {
    const body = sponsorshipBias.reveal.body?.en ?? "";
    expect(body).toContain("did not predict the conclusion");
    expect(body).toContain("peer review");
  });
});

describe("sponsorship bias lesson", () => {
  it("keeps the mechanism about judgement calls rather than fraud", () => {
    const body = sponsorshipBias.lesson.body?.en ?? "";
    expect(body).toContain("Nobody in this story has to have faked anything");
    expect(body).toContain("judgement calls");
  });

  it("generalises past tobacco and says the checklists miss it", () => {
    const how = sponsorshipBias.lesson.howItWorks?.en ?? "";
    expect(how).toContain("not confined to tobacco");
    expect(how).toContain("critical appraisal checklist");
  });

  it("asks the reader to apply the test to conclusions they like", () => {
    const how = sponsorshipBias.lesson.howItWorks?.en ?? "";
    expect(how).toContain("a study you agree with");
  });

  it("carries two deep dives from different fields and research groups", () => {
    const examples = sponsorshipBias.lesson.examples ?? [];
    expect(examples).toHaveLength(2);
    expect(examples[0].title.en).toContain("sugar");
    expect(examples[0].provenance.year).toBe(2013);
    expect(examples[1].provenance.year).toBe(2017);
  });
});

describe("sponsorship bias provenance note", () => {
  const note = sponsorshipBias.provenance.note?.en ?? "";

  it("records that inconclusive reviews were counted as not harmful", () => {
    expect(note).toContain("inconclusive");
    expect(note).toContain("conservative");
  });

  it("records that affiliation was assigned rather than self-disclosed", () => {
    expect(note).toContain("not from what authors disclosed");
  });

  it("refuses to read the association as proof about any individual", () => {
    expect(note).toContain(
      "not proof that any individual author was moved by money",
    );
  });

  it("explains why the odds ratio is not quoted as the effect", () => {
    expect(note).toContain("badly overstates the risk ratio");
  });

  it("applies the lesson to the study itself", () => {
    expect(note).toContain("the same test applies to this study");
    expect(note).toContain("San Francisco");
  });
});
