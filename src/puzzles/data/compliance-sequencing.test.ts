import { describe, expect, it } from "vitest";
import { complianceSequencing } from "./compliance-sequencing";
import { restrictRates } from "../../engine/charts/rates";

/**
 * Freedman and Fraser (1966), Table 1 on page 197, read from the rendered page
 * because the extraction misaligns the four condition labels against their four
 * percentages. The check that matters most is not any single percentage: it is
 * that all four land on a whole number out of 36, which a misread cell almost
 * certainly would not.
 */
const raw = complianceSequencing.setup.data;
if (raw.type !== "rates") throw new Error("expected rates data");
const data = raw;

const cell = (groupId: string): [number, number] => {
  const o = data.observations.find((x) => x.groupId === groupId);
  if (!o) throw new Error(`no observation for ${groupId}`);
  return [o.numerator, o.denominator];
};

const pct = (n: number, d: number) => Number(((100 * n) / d).toFixed(1));

describe("compliance sequencing data", () => {
  it("carries the counts Table 1 implies", () => {
    expect(cell("performance")).toEqual([19, 36]);
    expect(cell("agree-only")).toEqual([12, 36]);
    expect(cell("familiarization")).toEqual([10, 36]);
    expect(cell("one-contact")).toEqual([8, 36]);
  });

  it("reproduces all four printed percentages", () => {
    expect(pct(...cell("performance"))).toBe(52.8);
    expect(pct(...cell("agree-only"))).toBe(33.3);
    expect(pct(...cell("familiarization"))).toBe(27.8);
    expect(pct(...cell("one-contact"))).toBe(22.2);
  });

  it("has every numerator land on a whole number, which is the real check", () => {
    // The paper prints percentages, not counts. Recovering an integer from each
    // one is what makes the reading trustworthy: a cell paired with the wrong
    // condition would be very unlikely to divide cleanly into 36.
    for (const o of data.observations) {
      expect(Number.isInteger(o.numerator)).toBe(true);
      expect(o.denominator).toBe(36);
    }
  });

  it("accounts for the 156 housewives the method states", () => {
    // Four groups of 36 is 144, plus the 12 extra distributed among the
    // two-contact conditions who could not be reached and were excluded.
    const assigned = data.observations.reduce((s, o) => s + o.denominator, 0);
    expect(assigned).toBe(144);
    expect(assigned + 12).toBe(156);
  });

  it("keeps the finding the puzzle turns on, more than double", () => {
    const [perfN, perfD] = cell("performance");
    const [baseN, baseD] = cell("one-contact");
    expect(perfN / perfD).toBeGreaterThan((2 * baseN) / baseD);
  });

  it("keeps both controls sitting between the two headline bars", () => {
    // This ordering is the whole reveal. If a control ever matched Performance
    // the rapport or the agreement explanation would survive, and the lesson
    // would be a different one.
    const rate = (g: string) => {
      const [n, d] = cell(g);
      return n / d;
    };
    expect(rate("familiarization")).toBeGreaterThan(rate("one-contact"));
    expect(rate("agree-only")).toBeGreaterThan(rate("familiarization"));
    expect(rate("performance")).toBeGreaterThan(rate("agree-only"));
  });

  it("crowns nobody, because four conditions are an experiment not a contest", () => {
    expect(data.crownWinner).toBe(false);
  });
});

describe("compliance sequencing framing", () => {
  it("shows only the no-earlier-call group at the setup", () => {
    expect(complianceSequencing.setup.initialView.groupIds).toEqual([
      "one-contact",
    ]);
  });

  it("really withholds the other three bars", () => {
    // First puzzle in the deck to use four groups in a single stratum, so the
    // filter is worth checking against the derivation rather than assuming.
    const shown = restrictRates(
      complianceSequencing.setup.data as never,
      complianceSequencing.setup.initialView,
    );
    expect(shown.observations).toHaveLength(1);
    expect(shown.groups.map((g) => g.id)).toEqual(["one-contact"]);

    const revealed = restrictRates(
      complianceSequencing.setup.data as never,
      complianceSequencing.reveal.view,
    );
    expect(revealed.observations).toHaveLength(4);
  });

  it("tells the reader the large request was identical for everybody", () => {
    const framing = complianceSequencing.setup.framing.en;
    expect(framing).toContain("the same for everybody");
    expect(framing).toContain("156");
  });

  it("marks the nothing-changed answer as the intuitive trap and keeps a hedge", () => {
    const trap = complianceSequencing.choices.find((c) => c.isIntuitiveTrap);
    expect(trap?.id).toBe("same");
    const hedge = complianceSequencing.choices.find(
      (c) => c.id === "cannot-tell",
    );
    expect(hedge?.isCorrect).toBe(false);
    expect(complianceSequencing.choices.filter((c) => c.isCorrect)).toHaveLength(
      1,
    );
  });

  it("spends the reveal body on what each control rules out", () => {
    const body = complianceSequencing.reveal.body?.en ?? "";
    expect(body).toContain("not liking, and it is not familiarity");
    expect(body).toContain("saying yes is worth something");
  });
});

describe("compliance sequencing lesson", () => {
  it("makes the pair of opposite techniques the point", () => {
    const body = complianceSequencing.lesson.body?.en ?? "";
    expect(body).toContain("One says start small");
    expect(body).toContain("cannot both be a rule about the size");
  });

  it("says a refusal is not a reset", () => {
    const how = complianceSequencing.lesson.howItWorks?.en ?? "";
    expect(how).toContain("A refusal is not a reset");
  });

  it("warns that accuracy-checking is no defence here", () => {
    // Everything said to the subjects was true, which is what makes this
    // different from most of the deck.
    const how = complianceSequencing.lesson.howItWorks?.en ?? "";
    expect(how).toContain("nothing inaccurate was ever said");
  });

  it("states the honest limit on how far the effect generalises", () => {
    const how = complianceSequencing.lesson.howItWorks?.en ?? "";
    expect(how).toContain("plausibly connected");
  });

  it("carries the door-in-the-face deep dive with its counts", () => {
    const examples = complianceSequencing.lesson.examples ?? [];
    expect(examples).toHaveLength(1);
    const summary = examples[0].summary.en;
    expect(summary).toContain("12 of 24");
    expect(summary).toContain("4 of 24");
    expect(summary).toContain("6 of 24");
    expect(examples[0].provenance.doi).toBe("10.1037/h0076284");
    // The three Cialdini rates must also divide cleanly into 24.
    for (const n of [12, 6, 4]) expect(Number.isInteger(n)).toBe(true);
    expect(pct(12, 24)).toBe(50);
    expect(pct(6, 24)).toBe(25);
    expect(pct(4, 24)).toBe(16.7);
  });
});

describe("compliance sequencing provenance note", () => {
  const note = complianceSequencing.provenance.note?.en ?? "";

  it("records why the table was read visually", () => {
    expect(note).toContain("rendered page");
    expect(note).toContain("misaligns the four condition labels");
  });

  it("discloses that refusers of the small request stay in the denominator", () => {
    // This makes the headline figure conservative, and hiding it would let the
    // puzzle look stronger than the paper supports.
    expect(note).toContain("include people who refused the small request");
    expect(note).toContain("more conservative figure");
  });

  it("concedes the size of the experiment", () => {
    expect(note).toContain("evidence of an effect and not a precise measurement");
  });

  it("says the two studies are not on one axis", () => {
    expect(note).toContain("not because their percentages belong on one axis");
  });

  it("offers exactly one option pointing to a higher rate", () => {
    // Foot-in-the-door licenses that the small favour raises compliance. It
    // says nothing about by how much, and the setup shows only the baseline,
    // so two bands both reading "more" would leave a correct reasoner guessing.
    // One points up, one points down, one says no change, one is the hedge.
    const up = complianceSequencing.choices.filter((c) =>
      /More than double|A little more|perhaps a third/i.test(c.label.en),
    );
    expect(up).toHaveLength(1);
    expect(up[0].isCorrect).toBe(true);
    expect(complianceSequencing.choices.some((c) => /^Fewer\./.test(c.label.en))).toBe(true);
  });
});
