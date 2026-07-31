import { describe, expect, it } from "vitest";
import { selfAppliedLabel } from "./self-applied-label";

/**
 * Law and Versteeg (2013), Table 14 on page 913, read from the rendered page
 * because `pdftotext -layout` shifts that table in two separate places and
 * mislabels five rows. These tests pin the pairing of counts to rights, which
 * is exactly what those shifts destroy, and they assert the four prose anchors
 * on the facing page that settled the true reading.
 */
const raw = selfAppliedLabel.setup.data;
if (raw.type !== "rates") throw new Error("expected rates data");
const data = raw;

const cell = (groupId: string, stratumId: string): [number, number] => {
  const o = data.observations.find(
    (x) => x.groupId === groupId && x.stratumId === stratumId,
  );
  if (!o) throw new Error(`no observation for ${groupId}/${stratumId}`);
  return [o.numerator, o.denominator];
};

const pct = (n: number, d: number) => Number(((100 * n) / d).toFixed(1));

describe("self-applied label data", () => {
  it("carries the counts Table 14 prints for the five rights used", () => {
    expect(cell("y1981", "torture")).toEqual([26, 83]);
    expect(cell("y2010", "torture")).toEqual([19, 155]);
    expect(cell("y1981", "expression")).toEqual([25, 136]);
    expect(cell("y2010", "expression")).toEqual([48, 180]);
    expect(cell("y1981", "religion")).toEqual([112, 142]);
    expect(cell("y2010", "religion")).toEqual([127, 179]);
    expect(cell("y1981", "movement")).toEqual([82, 97]);
    expect(cell("y2010", "movement")).toEqual([137, 162]);
    expect(cell("y1981", "death-penalty")).toEqual([14, 14]);
    expect(cell("y2010", "death-penalty")).toEqual([49, 49]);
  });

  it("reproduces every printed percentage from the counts", () => {
    const expected: Array<[string, string, number]> = [
      ["y1981", "torture", 31.3],
      ["y2010", "torture", 12.3],
      ["y1981", "expression", 18.4],
      ["y2010", "expression", 26.7],
      ["y1981", "religion", 78.9],
      ["y2010", "religion", 70.9],
      ["y1981", "movement", 84.5],
      ["y2010", "movement", 84.6],
      ["y1981", "death-penalty", 100.0],
      ["y2010", "death-penalty", 100.0],
    ];
    for (const [g, s, printed] of expected) {
      const [n, d] = cell(g, s);
      expect(pct(n, d)).toBe(printed);
    }
  });

  it("pins the rows the facing-page prose independently anchors", () => {
    // These four are what proved the naive text extraction wrong. The prose on
    // page 912 gives torture as 12.3 per cent and religious freedom as 70 per
    // cent, and says every country with a constitutional bar on the death
    // penalty refrained from executions. Footnote 136 spells out 136/175 for
    // arbitrary arrest, which is a row this puzzle does not use but which
    // established the direction of the shift.
    expect(pct(...cell("y2010", "torture"))).toBe(12.3);
    expect(Math.round(pct(...cell("y2010", "religion")))).toBe(71);
    const [dpN, dpD] = cell("y2010", "death-penalty");
    expect(dpN).toBe(dpD);
  });

  it("keeps the finding the puzzle turns on", () => {
    // The promise spread while the number honouring it fell. Both halves have
    // to hold or the correct answer stops being correct.
    const [n1981, d1981] = cell("y1981", "torture");
    const [n2010, d2010] = cell("y2010", "torture");
    expect(d2010).toBeGreaterThan(d1981);
    expect(n2010).toBeLessThan(n1981);
    expect(n2010 / d2010).toBeLessThan(n1981 / d1981 / 2);
  });

  it("keeps a right that was honoured completely, so the lesson is not cynical", () => {
    // Without this the puzzle would teach that charters are worthless, which is
    // not what the paper found and not what the reveal says.
    const [n, d] = cell("y2010", "death-penalty");
    expect(n / d).toBe(1);
    expect(pct(...cell("y2010", "movement"))).toBeGreaterThan(80);
  });

  it("treats the rights as separate samples, because each has its own denominator", () => {
    // The countries promising a torture ban are not the countries promising to
    // abolish the death penalty, so a pooled bar would count some repeatedly.
    expect(data.strataAreSeparateSamples).toBe(true);
  });

  it("counts rights kept, and crowns nobody", () => {
    expect(data.higherIsBetter).toBe(true);
    expect(data.crownWinner).toBe(false);
  });
});

describe("self-applied label framing", () => {
  it("hides 2010 at the setup, which is what makes the question askable", () => {
    // First puzzle in the deck to filter by group rather than stratum.
    expect(selfAppliedLabel.setup.initialView.groupIds).toEqual(["y1981"]);
    expect(selfAppliedLabel.setup.initialView.strataIds).toEqual(["torture"]);
  });

  it("drops both filters at the reveal", () => {
    expect(selfAppliedLabel.reveal.view.groupIds).toBeUndefined();
    expect(selfAppliedLabel.reveal.view.strataIds).toBeUndefined();
  });

  it("gives the reader the 1981 baseline and the 2010 denominator up front", () => {
    // The puzzle asks for a count, so withholding either number would make it
    // a guess rather than a judgement.
    const framing = selfAppliedLabel.setup.framing.en;
    expect(framing).toContain("83");
    expect(framing).toContain("26");
    expect(framing).toContain("155");
  });

  it("marks the norm-spread answer as the intuitive trap and keeps a hedge", () => {
    const trap = selfAppliedLabel.choices.find((c) => c.isIntuitiveTrap);
    expect(trap?.id).toBe("more");
    const hedge = selfAppliedLabel.choices.find((c) => c.id === "cannot-tell");
    expect(hedge?.isCorrect).toBe(false);
    expect(selfAppliedLabel.choices.filter((c) => c.isCorrect)).toHaveLength(1);
  });

  it("heads off the misreading that 19 is a percentage", () => {
    expect(selfAppliedLabel.reveal.explanation.en).toContain(
      "Not 19 per cent, 19 countries",
    );
  });

  it("spends the reveal body refusing the cynical reading", () => {
    const body = selfAppliedLabel.reveal.body?.en ?? "";
    expect(body).toContain("teaching cynicism rather than reasoning");
    expect(body).toContain("14 out of 14");
    expect(body).toContain("negatively correlated");
  });
});

describe("self-applied label lesson", () => {
  it("says the technique has no single agreed name rather than inventing one", () => {
    const body = selfAppliedLabel.lesson.body?.en ?? "";
    expect(body).toContain("no single agreed name");
  });

  it("names all four established neighbours so a reader can follow them up", () => {
    const body = selfAppliedLabel.lesson.body?.en ?? "";
    for (const term of [
      "persuasive definition",
      "glittering generality",
      "doublespeak",
      "decoupling",
    ]) {
      expect(body.toLowerCase()).toContain(term);
    }
    // With their sources, so the claim is checkable.
    expect(body).toContain("Stevenson");
    expect(body).toContain("1937");
    expect(body).toContain("Meyer and Rowan");
  });

  it("keeps both requested examples", () => {
    const body = selfAppliedLabel.lesson.body?.en ?? "";
    expect(body).toContain("Democratic People's Republic of Korea");
    expect(body).toContain("National Socialism");
  });

  it("reduces the habit to one cheap question", () => {
    const how = selfAppliedLabel.lesson.howItWorks?.en ?? "";
    expect(how).toContain("what did it cost them to write it");
    expect(how).toContain("who checked?");
  });

  it("generalises past politics, so it cannot read as being about one country", () => {
    const how = selfAppliedLabel.lesson.howItWorks?.en ?? "";
    expect(how).toContain("packaging");
  });

  it("carries the deep dive, with counts that sum to the stated total", () => {
    const examples = selfAppliedLabel.lesson.examples ?? [];
    expect(examples).toHaveLength(1);
    expect(74 + 39 + 13 + 11 + 30).toBe(167);
    for (const [n, printed] of [
      [74, 44.3],
      [39, 23.4],
      [13, 7.8],
      [11, 6.6],
      [30, 18.0],
    ] as Array<[number, number]>) {
      expect(pct(n, 167)).toBe(printed);
    }
    expect(examples[0].summary.en).toContain("parchment barriers");
  });
});

describe("self-applied label provenance", () => {
  const note = selfAppliedLabel.provenance.note?.en ?? "";

  it("cites a verified URL rather than an unverified DOI", () => {
    // The journal version has no CrossRef-registered DOI. Guessing one is the
    // exact failure this project has hit before, so the citation carries the
    // open-access URL that was actually read.
    expect(selfAppliedLabel.provenance.doi).toBeUndefined();
    expect(selfAppliedLabel.provenance.url).toContain(
      "comparativeconstitutionsproject.org",
    );
    expect(selfAppliedLabel.provenance.source).toContain("10.2139/ssrn.1989979");
    expect(selfAppliedLabel.provenance.source).toContain("is not what was read");
  });

  it("records why the table was read visually", () => {
    expect(note).toContain("rendered as an image");
    expect(note).toContain("mislabels five rows");
  });

  it("warns against the exact misreading the headline figure invites", () => {
    expect(note).toContain(
      "should not be read as twelve per cent of countries being torture-free",
    );
  });

  it("concedes the confound it cannot resolve", () => {
    // Reporting on rights abuses improved a lot between 1981 and 2010, which
    // could depress the later figures by itself. Saying so is why the reveal
    // leans on the within-year comparison.
    expect(note).toContain("reporting on rights abuses improved");
    expect(note).toContain("this deck can resolve");
  });

  it("states what the puzzle is not claiming", () => {
    expect(note).toContain("not that written rights are useless");
  });
});
