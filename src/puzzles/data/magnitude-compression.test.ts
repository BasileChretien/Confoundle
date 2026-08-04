import { describe, expect, it } from "vitest";
import { magnitudeCompression } from "./magnitude-compression";
import {
  compressionSpan,
  furthestByGap,
  magnitudeShape,
  mostDistortedByFactor,
  ratioBetween,
} from "../../engine/charts/magnitudes";

/**
 * Source reconciliation for Battersby and Montello (2009), read at source off
 * the rendered pages rather than from a text layer, because pdftotext shifts
 * the rows of these tables.
 *
 * All twenty-six regions are carried here even though the puzzle draws seven,
 * for two reasons. It proves the drawn subset is not where the pattern lives,
 * and it lets the reconciliation run over the whole of the paper's Table 1
 * rather than the part that happens to be on screen.
 */

/** Table 1, the conterminous United States, the standard everything is relative to. */
const US_KM2 = 7_809_158;

/**
 * Every region in Studies 1 and 2.
 *
 * `km2` and `modulusInt` are Table 1. `modulus1dp` is the modulus column of
 * Table 3, typeset separately from Table 1 and to one more significant figure.
 * `estimate` is the mean estimated area of Table 2 (Study 1). `absLatitude` is
 * the mean absolute latitude column of Table 3.
 */
const REGIONS: {
  name: string;
  km2: number;
  modulusInt: number;
  modulus1dp: number;
  estimate: number;
  absLatitude: number;
}[] = [
  { name: "Denmark", km2: 41_104, modulusInt: 5, modulus1dp: 5.3, estimate: 140, absLatitude: 56.0 },
  { name: "Switzerland", km2: 41_854, modulusInt: 5, modulus1dp: 5.4, estimate: 146, absLatitude: 46.8 },
  { name: "Austria", km2: 82_869, modulusInt: 11, modulus1dp: 10.6, estimate: 159, absLatitude: 47.6 },
  { name: "Guatemala", km2: 109_829, modulusInt: 14, modulus1dp: 14.1, estimate: 118, absLatitude: 15.7 },
  { name: "North Korea", km2: 122_847, modulusInt: 16, modulus1dp: 15.7, estimate: 180, absLatitude: 40.1 },
  { name: "Greece", km2: 125_515, modulusInt: 16, modulus1dp: 16.1, estimate: 179, absLatitude: 39.1 },
  { name: "New Zealand", km2: 267_214, modulusInt: 34, modulus1dp: 34.2, estimate: 193, absLatitude: 41.8 },
  { name: "Italy", km2: 301_101, modulusInt: 39, modulus1dp: 38.6, estimate: 177, absLatitude: 42.8 },
  { name: "Norway", km2: 305_866, modulusInt: 39, modulus1dp: 39.2, estimate: 205, absLatitude: 64.4 },
  { name: "Vietnam", km2: 322_743, modulusInt: 41, modulus1dp: 41.3, estimate: 164, absLatitude: 16.7 },
  { name: "Japan", km2: 370_727, modulusInt: 47, modulus1dp: 47.5, estimate: 269, absLatitude: 37.6 },
  { name: "Sweden", km2: 442_246, modulusInt: 57, modulus1dp: 56.6, estimate: 184, absLatitude: 62.8 },
  { name: "Spain", km2: 503_250, modulusInt: 64, modulus1dp: 64.4, estimate: 264, absLatitude: 40.2 },
  { name: "Venezuela", km2: 913_485, modulusInt: 117, modulus1dp: 117.0, estimate: 183, absLatitude: 7.1 },
  { name: "Ethiopia", km2: 1_134_156, modulusInt: 145, modulus1dp: 145.2, estimate: 169, absLatitude: 8.6 },
  { name: "South Africa", km2: 1_219_930, modulusInt: 156, modulus1dp: 156.2, estimate: 393, absLatitude: 29.0 },
  { name: "Peru", km2: 1_296_605, modulusInt: 166, modulus1dp: 166.0, estimate: 165, absLatitude: 9.2 },
  { name: "Alaska", km2: 1_499_145, modulusInt: 192, modulus1dp: 192.0, estimate: 318, absLatitude: 64.3 },
  { name: "Mexico", km2: 1_953_851, modulusInt: 250, modulus1dp: 250.2, estimate: 569, absLatitude: 24.0 },
  { name: "Greenland", km2: 2_118_140, modulusInt: 271, modulus1dp: 271.2, estimate: 520, absLatitude: 74.7 },
  { name: "India", km2: 3_153_010, modulusInt: 404, modulus1dp: 403.8, estimate: 754, absLatitude: 22.9 },
  { name: "Australia", km2: 7_694_273, modulusInt: 985, modulus1dp: 985.3, estimate: 740, absLatitude: 25.7 },
  { name: "Brazil", km2: 8_493_132, modulusInt: 1088, modulus1dp: 1087.6, estimate: 615, absLatitude: 10.8 },
  { name: "China", km2: 9_366_190, modulusInt: 1199, modulus1dp: 1199.4, estimate: 1409, absLatitude: 36.6 },
  { name: "Antarctica", km2: 12_277_658, modulusInt: 1572, modulus1dp: 1572.2, estimate: 1225, absLatitude: 80.4 },
  { name: "Russia", km2: 16_897_294, modulusInt: 2164, modulus1dp: 2163.8, estimate: 2077, absLatitude: 62.0 },
];

function pearson(xs: number[], ys: number[]): number {
  const n = xs.length;
  const mx = xs.reduce((a, b) => a + b, 0) / n;
  const my = ys.reduce((a, b) => a + b, 0) / n;
  let num = 0;
  let dx = 0;
  let dy = 0;
  for (let i = 0; i < n; i++) {
    num += (xs[i] - mx) * (ys[i] - my);
    dx += (xs[i] - mx) ** 2;
    dy += (ys[i] - my) ** 2;
  }
  return num / Math.sqrt(dx * dy);
}

const data = magnitudeCompression.setup.data;
if (data.type !== "magnitude") throw new Error("expected magnitude data");

describe("the paper's own tables agree with each other", () => {
  it("recomputes every modulus area from the printed square kilometres", () => {
    // The reconstruction standard: a derived number counts only if it
    // reproduces a printed quantity that was not used to derive it. The
    // modulus columns of Table 1 and Table 3 were typeset separately from each
    // other and from the square kilometres, so this is that check, twice, for
    // all twenty-six regions.
    const off: string[] = [];
    for (const r of REGIONS) {
      const calc = (r.km2 / US_KM2) * 1000;
      if (Math.round(calc) !== r.modulusInt)
        off.push(`${r.name}: ${calc.toFixed(3)} vs Table 1 ${r.modulusInt}`);
      if (Math.abs(Number(calc.toFixed(1)) - r.modulus1dp) > 1e-9)
        off.push(`${r.name}: ${calc.toFixed(3)} vs Table 3 ${r.modulus1dp}`);
    }
    expect(off).toEqual([]);
    expect(REGIONS).toHaveLength(26);
  });

  it("puts the conterminous United States at the 1,000 the paper sets it to", () => {
    expect((US_KM2 / US_KM2) * 1000).toBe(1000);
  });
});

describe("the pattern is a size effect, not a latitude effect", () => {
  const logRatio = REGIONS.map((r) => Math.log10(r.estimate / r.modulus1dp));

  it("has the error shrink as the region grows, across all twenty-six", () => {
    const r = pearson(
      logRatio,
      REGIONS.map((x) => Math.log10(x.modulus1dp)),
    );
    expect(r).toBeLessThan(-0.9);
  });

  it("finds almost nothing in latitude, which is what refutes the Mercator story", () => {
    const r = pearson(
      logRatio,
      REGIONS.map((x) => x.absLatitude),
    );
    // The paper reports 0.17 within participants for the same relationship.
    // This is over the means, a different estimator, so it is checked for
    // being small and positive rather than for equalling that figure.
    expect(r).toBeGreaterThan(0);
    expect(r).toBeLessThan(0.3);
  });

  it("compresses: the fitted exponent on the means is well below one", () => {
    const xs = REGIONS.map((r) => Math.log10(r.modulus1dp));
    const ys = REGIONS.map((r) => Math.log10(r.estimate));
    const mx = xs.reduce((a, b) => a + b, 0) / xs.length;
    const my = ys.reduce((a, b) => a + b, 0) / ys.length;
    const slope =
      xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0) /
      xs.reduce((s, x) => s + (x - mx) ** 2, 0);
    // The paper's own figure is 0.56, the mean of per-participant exponents.
    // This slope is fitted to the means instead, so it is NOT the same
    // estimator and is not asserted to equal it. Both are below 1, which is
    // the only claim the lesson makes.
    expect(slope).toBeGreaterThan(0);
    expect(slope).toBeLessThan(1);
  });
});

describe("the seven regions drawn are faithful to the twenty-six", () => {
  const bySlug = new Map(REGIONS.map((r) => [r.name.toLowerCase(), r]));

  it("takes every drawn value straight from the paper", () => {
    for (const item of data.items) {
      const source = bySlug.get(item.label.en.toLowerCase());
      expect(source, `no source row for ${item.label.en}`).toBeDefined();
      expect(item.actual).toBe(source!.modulus1dp);
      expect(item.estimated).toBe(source!.estimate);
    }
    expect(data.items).toHaveLength(7);
  });

  it("does not exaggerate: the drawn spread sits inside the full one", () => {
    const drawnRatios = data.items.map((i) => i.estimated / i.actual);
    const allRatios = REGIONS.map((r) => r.estimate / r.modulus1dp);
    expect(Math.max(...drawnRatios)).toBeLessThanOrEqual(Math.max(...allRatios));
    expect(Math.min(...drawnRatios)).toBeGreaterThanOrEqual(
      Math.min(...allRatios),
    );
  });

  it("keeps the accurate guess in the figure, so the lesson is not survivorship", () => {
    // Peru at 165 against 166. Without a region people got right, the honest
    // reading of the figure would be "people are bad at this" rather than "the
    // error depends on size", and the lesson copy would be overclaiming.
    const peru = data.items.find((i) => i.id === "peru");
    expect(peru).toBeDefined();
    expect(Math.abs(peru!.estimated / peru!.actual - 1)).toBeLessThan(0.02);
  });
});

describe("the answer key", () => {
  it("makes Denmark the answer, by the largest multiple", () => {
    expect(mostDistortedByFactor(data)?.id).toBe("denmark");
    const denmark = data.items.find((i) => i.id === "denmark")!;
    expect(denmark.estimated / denmark.actual).toBeGreaterThan(26);
  });

  it("makes Greenland a trap and not the answer", () => {
    const greenland = data.items.find((i) => i.id === "greenland")!;
    const ratio = greenland.estimated / greenland.actual;
    expect(ratio).toBeLessThan(2);
    // Fifteen of the other twenty-five regions are further out than Greenland,
    // which is the claim the reveal copy makes in words.
    const worse = REGIONS.filter(
      (r) => r.name !== "Greenland" && r.estimate / r.modulus1dp > ratio,
    );
    expect(worse).toHaveLength(15);
  });

  it("PINS THE WORDING: 'multiple' is load-bearing and must not be edited out", () => {
    // Brazil is the furthest from the truth in raw units, by 473 of them, and
    // Brazil is on the answer list. A reader who takes "furthest from the
    // truth" as a distance would pick it and be marked wrong, which this deck
    // refuses to do. The question therefore asks for the biggest MULTIPLE of
    // the country's real size, the same discriminator-in-the-framing move that
    // `statistical-power` makes. If that word ever leaves the question, this
    // test is the thing that should stop the change.
    expect(furthestByGap(data)?.id).toBe("brazil");
    expect(furthestByGap(data)?.id).not.toBe(mostDistortedByFactor(data)?.id);
    expect(magnitudeCompression.setup.question.en).toContain("multiple");
  });

  it("offers exactly one correct choice and marks the famous one as the trap", () => {
    const correct = magnitudeCompression.choices.filter((c) => c.isCorrect);
    expect(correct.map((c) => c.id)).toEqual(["denmark"]);
    const trap = magnitudeCompression.choices.filter((c) => c.isIntuitiveTrap);
    expect(trap.map((c) => c.id)).toEqual(["greenland"]);
  });

  it("names every non-hedge choice after an item that is actually drawn", () => {
    const drawn = new Set(data.items.map((i) => i.id));
    const named = magnitudeCompression.choices
      .map((c) => c.id)
      .filter((id) => id !== "cannot-tell");
    for (const id of named) expect(drawn.has(id)).toBe(true);
  });
});

describe("the two beats are the same numbers drawn twice", () => {
  it("never rescales the guesses when the reveal lands", () => {
    // The scale comes from the largest number anywhere in the data, which is
    // Brazil's TRUE size and is not on screen during the setup. If this ever
    // became a view-local peak, every guess bar would shrink at the reveal and
    // the reader would lose the thread.
    const { peak } = magnitudeShape(data);
    const largestGuess = Math.max(...data.items.map((i) => i.estimated));
    expect(peak).toBe(1087.6);
    expect(peak).toBeGreaterThan(largestGuess);
  });

  it("starts on the guesses and reveals the truth", () => {
    expect(magnitudeCompression.setup.initialView.kind).toBe("asnumbers");
    expect(magnitudeCompression.reveal.view.kind).toBe("againsttruth");
  });

  it("has the guessed spread understate the real one enormously", () => {
    const r = ratioBetween(data, "denmark", "brazil")!;
    // Guessed about four times bigger; actually about two hundred times.
    expect(r.guessed).toBeGreaterThan(4);
    expect(r.guessed).toBeLessThan(5);
    expect(r.actual).toBeGreaterThan(200);
  });

  it("has the error change sign between the two ends", () => {
    const span = compressionSpan(data)!;
    expect(span.smallest.ratio).toBeGreaterThan(1);
    expect(span.largest.ratio).toBeLessThan(1);
  });
});
