import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LocaleProvider } from "../../app/i18n";
import { ShortcutView } from "./ShortcutView";
import { PuzzleData } from "../../puzzles/schema";
import type { ShortcutData } from "../../puzzles/schema";
import {
  aboveChance,
  bestWithEvidence,
  bestWithoutEvidence,
  pooledPrevalence,
  prevalenceRatio,
  restrictShortcut,
  shortcutShare,
  siteShares,
  withoutEvidence,
} from "./shortcut";

/**
 * The derivation behind the shortcut shape.
 *
 * The card claims that most of a model's apparent skill was available without
 * the image. That is a ratio, not a difference, and this file is where the
 * ratio is pinned to the two numbers the source printed.
 */

const text = (en: string) => ({ en });

/** Zech 2018's joint model, its trivial control, and the two collections. */
const data: ShortcutData = {
  type: "shortcut",
  label: text("Detecting pneumonia on a chest X-ray"),
  metricLabel: text("area under the curve"),
  outcomeLabel: text("pneumonia"),
  prevalenceLabel: text("How often pneumonia appears in this collection"),
  separabilityLabel: text("told the two hospitals apart"),
  separability: 99.95,
  cohortNote: text("Two collections, held-out portions pooled into one test set"),
  chance: 0.5,
  sites: [
    { id: "nih", label: text("National Institutes of Health"), short: text("NIH"), n: 112120, prevalence: 1.2 },
    { id: "msh", label: text("Mount Sinai Hospital"), short: text("Mount Sinai"), n: 42396, prevalence: 34.2 },
  ],
  models: [
    { id: "deep", label: text("Trained on both hospitals' X-rays"), score: 0.931, usesEvidence: true },
    { id: "trivial", label: text("Told only which hospital, never shown the X-ray"), score: 0.861, usesEvidence: false },
  ],
};

describe("the comparison the card rests on", () => {
  it("measures the shortcut as a share of discrimination, not a gap in score", () => {
    /*
      0.931 and 0.861 differ by 0.07, which sounds like nothing. Measured from
      the chance line, where discrimination actually starts, the model denied
      the image reaches 84% of what the model given it reached. Those are the
      same two numbers read two ways, and only the second is the claim.
    */
    expect(shortcutShare(data)).toBeCloseTo(0.8376, 4);
    expect(Math.round(shortcutShare(data)! * 100)).toBe(84);
    expect(bestWithEvidence(data).score - bestWithoutEvidence(data).score).toBeCloseTo(0.07, 10);
  });

  it("measures from chance rather than from zero", () => {
    expect(aboveChance(data, 0.931)).toBeCloseTo(0.431, 10);
    expect(aboveChance(data, 0.861)).toBeCloseTo(0.361, 10);
    // Read from zero instead and the shortcut would look like 92%, which
    // would overstate a claim that is already strong enough.
    expect(0.861 / 0.931).toBeGreaterThan(0.9);
  });

  it("picks the strongest model of each kind rather than the first", () => {
    const three: ShortcutData = {
      ...data,
      models: [
        { ...data.models[0]!, id: "weak", score: 0.72 },
        { ...data.models[0]!, id: "deep", score: 0.931 },
        { ...data.models[1]!, id: "trivial", score: 0.861 },
      ],
    };
    expect(bestWithEvidence(three).id).toBe("deep");
    expect(bestWithoutEvidence(three).id).toBe("trivial");
  });

  it("refuses a share when the model that saw the evidence is at chance", () => {
    // Nothing to be a share OF. Reporting a percentage here would be dividing
    // by zero and printing the result beside a citation.
    const flat: ShortcutData = {
      ...data,
      models: [
        { ...data.models[0]!, score: 0.5 },
        { ...data.models[1]!, score: 0.51 },
      ],
    };
    expect(shortcutShare(flat)).toBeNull();
  });
});

describe("why the shortcut is worth anything", () => {
  it("reports the prevalence gap that makes the site informative", () => {
    expect(prevalenceRatio(data)).toBeCloseTo(28.5, 1);
  });

  it("refuses a ratio rather than reporting infinity", () => {
    const zero: ShortcutData = {
      ...data,
      sites: [{ ...data.sites[0]!, prevalence: 0 }, data.sites[1]!],
    };
    expect(prevalenceRatio(zero)).toBeNull();
  });

  it("weights the pooled rate by collection size, not by counting sites", () => {
    // 1.2% over 112,120 and 34.2% over 42,396. A plain mean of the two would
    // say 17.7%, which is true of no population.
    expect(pooledPrevalence(data)).toBeCloseTo(10.25, 2);
    expect((1.2 + 34.2) / 2).toBeCloseTo(17.7, 2);
  });

  it("gives each collection its share of the pooled set", () => {
    const shares = siteShares(data);
    expect(shares.find((s) => s.id === "nih")!.share).toBeCloseTo(0.7256, 4);
    expect(shares.reduce((sum, s) => sum + s.share, 0)).toBeCloseTo(1, 10);
  });
});

describe("what each beat draws", () => {
  it("hides the model that saw nothing, which is the trap as a function", () => {
    const setup = restrictShortcut(data, { showWithoutEvidence: false });
    expect(setup.models.map((m) => m.id)).toEqual(["deep"]);
    expect(withoutEvidence(setup)).toEqual([]);
  });

  it("keeps every site at the setup, because the mechanism is on screen from the start", () => {
    // The prevalence gap is what makes the question answerable rather than a
    // guess, so the setup must not hide it. See the card's choices.
    const setup = restrictShortcut(data, { showWithoutEvidence: false });
    expect(setup.sites).toEqual(data.sites);
  });

  it("gives the reveal everything", () => {
    expect(restrictShortcut(data, { showWithoutEvidence: true })).toEqual(data);
  });
});

describe("the schema, which stops a figure that argues against itself", () => {
  const parse = (d: unknown) => PuzzleData.safeParse(d);

  it("accepts the shipped figure", () => {
    expect(parse(data).success).toBe(true);
  });

  it("refuses collections with the same outcome rate", () => {
    // Then knowing the collection predicts nothing, and the card's mechanism
    // is contradicted by its own data.
    const flat = {
      ...data,
      sites: data.sites.map((s) => ({ ...s, prevalence: 10 })),
    };
    expect(parse(flat).success).toBe(false);
  });

  it("refuses a blind model that does not beat chance", () => {
    // The figure would be showing that the shortcut does not exist, drawn as
    // though it did.
    const useless = {
      ...data,
      models: [data.models[0]!, { ...data.models[1]!, score: 0.5 }],
    };
    expect(parse(useless).success).toBe(false);
  });

  it("refuses a figure with no blind model at all", () => {
    const noControl = {
      ...data,
      models: [data.models[0]!, { ...data.models[1]!, id: "other", usesEvidence: true }],
    };
    expect(parse(noControl).success).toBe(false);
  });

  it("refuses duplicate ids", () => {
    const dup = { ...data, sites: [data.sites[0]!, { ...data.sites[1]!, id: "nih" }] };
    expect(parse(dup).success).toBe(false);
  });
});

/*
  THE FIGURE HAS TO SURVIVE ITS OWN READER DIVIDING ITS OWN NUMBERS.

  The rates and the ratio are drawn by the same component, one from the data
  and one from `prevalenceRatio`, and they were briefly formatted by different
  rules: the caption said the collections differ by 28.5 times while the rates
  beside it read "34%" and "1%", from which a reader divides and gets 34. The
  same rounding turned a separability of 99.95 into "100%", printing a claim of
  perfection that the source does not make and that the card's own prose
  contradicts two paragraphs later.

  Nothing else could see it. `chartsLocalized` matches runs of Latin LETTERS
  and never looks at digits; `localeNumerals` reads the source for the right
  formatter and both of these WERE the right formatter, just the wrong
  precision. So the check is to render the figure and read the numerals back.
*/
describe("the numbers the figure prints about itself", () => {
  const render = (kind: "asscored" | "whatitsaw") =>
    renderToStaticMarkup(
      createElement(LocaleProvider, {
        locale: "en",
        children: createElement(ShortcutView, { data, full: data, kind }),
      }),
    ).replace(/<[^>]*>/g, " ");

  it("draws each collection's rate exactly as the source printed it", () => {
    const html = render("asscored");
    expect(html).toContain("34.2%");
    expect(html).toContain("1.2%");
  });

  it("prints a ratio a reader can reproduce from the rates beside it", () => {
    const html = render("asscored");
    const drawn = [...html.matchAll(/([\d.]+)%/g)].map((m) => Number(m[1]));
    const [high, low] = [Math.max(...drawn), Math.min(...drawn)];
    // 34.2 / 1.2 is 28.5, and the announcement says so to one decimal.
    const announced = renderToStaticMarkup(
      createElement(LocaleProvider, {
        locale: "en",
        children: createElement(ShortcutView, { data, full: data, kind: "asscored" }),
      }),
    ).match(/differ by ([\d.]+) times/);
    expect(announced).not.toBeNull();
    expect(Number(announced![1])).toBeCloseTo(high / low, 1);
    expect(Number(announced![1])).toEqual(28.5);
  });

  it("does not round a separability of 99.95 up into a claim of perfection", () => {
    const html = render("whatitsaw");
    expect(html).toContain("99.95%");
    expect(html).not.toContain("100%");
  });
});
