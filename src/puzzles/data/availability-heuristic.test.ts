import { describe, expect, it } from "vitest";
import { availabilityHeuristic } from "./availability-heuristic";
import {
  closenessExplanationFails,
  hitComparisons,
  missedComparisons,
  narrowestHit,
  shareFor,
} from "../../engine/charts/salience";

const raw = availabilityHeuristic.setup.data;
if (raw.type !== "salience") throw new Error("expected salience data");
const data = raw;

const byId = (id: string) => {
  const c = data.comparisons.find((x) => x.id === id);
  if (!c) throw new Error(`no comparison ${id}`);
  return c;
};

describe("availability data", () => {
  it("carries the four pairs the paper prints, with their ratios", () => {
    expect(
      data.comparisons.map((c) => [c.id, c.trueRatio, c.percentCorrect]),
    ).toEqual([
      ["diabetes-crash", 1.42, 99],
      ["accidents-stroke", 1.85, 20],
      ["tornado-asthma", 20.9, 42],
      ["botulism-lightning", 52, 37],
    ]);
  });

  it("derives the shares people actually picked", () => {
    // 80 per cent picked all accidents over stroke, 58 per cent tornado over
    // asthma, 63 per cent botulism over lightning. None of these is authored.
    expect(shareFor(byId("accidents-stroke"), "a")).toBe(80);
    expect(shareFor(byId("tornado-asthma"), "a")).toBe(58);
    expect(shareFor(byId("botulism-lightning"), "a")).toBe(63);
    expect(shareFor(byId("diabetes-crash"), "b")).toBe(99);
  });

  it("has exactly one pair the majority got right, and it is the control", () => {
    expect(hitComparisons(data).map((c) => c.id)).toEqual(["diabetes-crash"]);
    expect(missedComparisons(data)).toHaveLength(3);
  });

  it("refutes the closeness excuse from inside its own data", () => {
    // This is the load-bearing property of the puzzle. The pair the public got
    // RIGHT has a narrower true margin than one it got wrong, so "people only
    // fail when it is close" cannot be the explanation. If a future edit ever
    // swapped in a control pair with a wider margin, the reveal would become
    // an unsupported assertion and this test would catch it.
    const hit = narrowestHit(data);
    expect(hit?.id).toBe("diabetes-crash");
    expect(hit?.trueRatio).toBeLessThan(byId("accidents-stroke").trueRatio);
    expect(closenessExplanationFails(data)).toBe(true);
  });

  it("never authors a head count, because the paper prints none", () => {
    // 42 per cent of 111 students is not an integer, so converting the printed
    // percentages into counts would mean inventing a denominator.
    const text = JSON.stringify(data);
    expect(text).not.toContain("numerator");
    expect(text).not.toContain("denominator");
  });
});

describe("availability framing", () => {
  it("shows the split with no verdict on it at the setup", () => {
    expect(availabilityHeuristic.setup.initialView.kind).toBe("asguessed");
  });

  it("adds the verdict at the reveal", () => {
    expect(availabilityHeuristic.reveal.view.kind).toBe("againstfact");
  });

  it("tells the reader up front that three of the four went wrong", () => {
    // Without this the puzzle would be a trivia quiz about mortality rather
    // than a question about the pattern.
    expect(availabilityHeuristic.setup.framing.en).toContain(
      "Three of the four went the wrong way",
    );
    expect(missedComparisons(data)).toHaveLength(3);
  });

  it("keeps the setup label from naming any side as the answer", () => {
    // The label may say that it withholds the answer; what it must never do is
    // name one of the options, which would give the pattern away before the
    // reader commits.
    const split = data.splitLabel.en.toLowerCase();
    for (const c of data.comparisons) {
      expect(split).not.toContain(c.optionA.en.toLowerCase());
      expect(split).not.toContain(c.optionB.en.toLowerCase());
    }
    expect(split).toContain("nothing here says which side is right");
  });

  it("marks the closeness answer as the intuitive trap and keeps a hedge", () => {
    const trap = availabilityHeuristic.choices.find((c) => c.isIntuitiveTrap);
    expect(trap?.id).toBe("too-close");
    const hedge = availabilityHeuristic.choices.find(
      (c) => c.id === "cannot-tell",
    );
    expect(hedge?.isCorrect).toBe(false);
    expect(availabilityHeuristic.choices.filter((c) => c.isCorrect)).toHaveLength(
      1,
    );
  });

  it("spends the reveal body killing the trap answer with the control pair", () => {
    const body = availabilityHeuristic.reveal.body?.en ?? "";
    expect(body).toContain("1.42");
    expect(body).toContain("narrower margin");
    expect(body).toContain("cannot be that people fail when the margin is close");
  });

  it("does not claim availability always makes you wrong", () => {
    const body = availabilityHeuristic.reveal.body?.en ?? "";
    expect(body).toContain("right for a reason that will not hold");
  });
});

describe("availability lesson", () => {
  it("carries the newspaper measurement rather than asserting media bias", () => {
    const body = availabilityHeuristic.lesson.body?.en ?? "";
    expect(body).toContain("184 days");
    expect(body).toContain("19 of their 41 causes");
    expect(body).toContain("9.6 times as often");
  });

  it("does not blame journalists for doing their job", () => {
    const body = availabilityHeuristic.lesson.body?.en ?? "";
    expect(body).toContain("does not require anybody to be lying");
  });

  it("applies the habit to the reader's own vivid experiences", () => {
    const how = availabilityHeuristic.lesson.howItWorks?.en ?? "";
    expect(how).toContain("rare diagnosis");
    expect(how).toContain("denominator");
  });
});

describe("availability provenance note", () => {
  const note = availabilityHeuristic.provenance.note?.en ?? "";

  it("names where the copy was read and under what licence", () => {
    expect(note).toContain("Scholars' Bank");
    expect(note).toContain("CC BY-NC-ND");
  });

  it("records that every figure was cross-checked against the prose", () => {
    expect(note).toContain("once in Table 2 and once discussed in the Results");
  });

  it("says the sample is not a sample of anybody", () => {
    expect(note).toContain("campus newspaper advertisement");
    expect(note).toContain("neither group is the public");
  });

  it("carries the commentary that disputes the interpretation", () => {
    expect(note).toContain("response error rather than necessarily a judgemental bias");
  });

  it("declines to claim the mechanism, only the pattern", () => {
    expect(note).toContain("claims the pattern in the answers");
  });

  it("warns that the rates are a period photograph", () => {
    expect(note).toContain("period photograph");
  });
});
