import { beforeAll, describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LocaleProvider } from "../../app/i18n";
import { loadDictionary } from "../../app/translations";
import { puzzles } from "../../puzzles/all";
import type { NoninferiorityData } from "../../puzzles/schema";
import { NoninferiorityView } from "./NoninferiorityView";

/**
 * What a pure test cannot see.
 *
 * `noninferiority.test.ts` pins the derivation; nothing in it knows whether a
 * number reaches the page, or reaches it rounded to something that contradicts
 * the sentence beside it. That is not hypothetical: `ShortcutView` shipped a
 * percent formatter that drew 34.2 and 1.2 as "34%" and "1%" next to a caption
 * saying they differ by 28.5 times, and only a rendering test found it.
 *
 * The other half is the SETUP/REVEAL contract. This shape's whole argument is
 * that the reveal adds the interval and the margin to a figure the setup drew
 * with the point estimate alone. If the setup ever started drawing the interval
 * the card would give away its own answer, and no derivation test could tell.
 */

const data = (): NoninferiorityData => {
  const found = puzzles.find((p) => p.setup.data.type === "noninferiority");
  if (!found) throw new Error("no shipped noninferiority puzzle");
  return found.setup.data as NoninferiorityData;
};

const render = (locale: string, kind: "asclaimed" | "againstmargin") =>
  renderToStaticMarkup(
    createElement(LocaleProvider, {
      locale: locale as "en",
      children: createElement(NoninferiorityView, { data: data(), kind }),
    }),
  );

/** Strip tags so an assertion reads the text a person sees, not the markup. */
const text = (html: string) =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");

beforeAll(async () => {
  await Promise.all(["en", "fr", "ja"].map(loadDictionary));
}, 60_000);

describe("the numbers reach the page", () => {
  it("draws both arms as counts and as rates, on both beats", () => {
    for (const kind of ["asclaimed", "againstmargin"] as const) {
      const t = text(render("en", kind));
      expect(t, kind).toContain("82");
      expect(t, kind).toContain("53,043");
      expect(t, kind).toContain("93");
      expect(t, kind).toContain("52,872");
      // Derived from the counts, and the figures the paper prints.
      expect(t, kind).toContain("1.55");
      expect(t, kind).toContain("1.76");
    }
  });

  it("draws the ratio to two places, so 0.88 is not rounded to 0.9", () => {
    // A one-place formatter would print 0.9 beside a caption saying 12 per
    // cent, and 1.2 for both the interval's top and the margin, which are the
    // two numbers the whole reveal is about telling apart.
    const t = text(render("en", "againstmargin"));
    expect(t).toContain("0.88");
    expect(t).toContain("1.18");
    expect(t).toContain("1.20");
    expect(t).not.toContain("0.9,");
  });
});

describe("the setup withholds exactly what the reveal adds", () => {
  it("gives the setup the point estimate and its apparent size, and no interval", () => {
    const t = text(render("en", "asclaimed"));
    expect(t).toContain("0.88");
    expect(t).toContain("12%");
    // The two numbers that would answer the question before it is asked.
    expect(t).not.toContain("1.18");
    expect(t).not.toContain("1.20");
  });

  it("adds the interval, the margin and the three zones at the reveal", () => {
    const t = text(render("en", "againstmargin"));
    expect(t).toContain("1.18");
    expect(t).toContain("1.20");
    expect(t).toContain("Unacceptably worse");
    expect(t).toContain("Not meaningfully worse");
    expect(t).toContain("Genuinely better");
  });

  it("states at the reveal that the interval contains no difference", () => {
    // Derived through `crossesNull`, so it cannot contradict the interval it
    // is printed beside.
    expect(text(render("en", "againstmargin"))).toContain("which means no difference");
  });

  it("keeps that sentence off the setup", () => {
    expect(text(render("en", "asclaimed"))).not.toContain("which means no difference");
  });
});

describe("numerals follow the reader, not the runtime", () => {
  it("groups and points a French reader's numbers the French way", () => {
    const t = text(render("fr", "againstmargin"));
    expect(t).toContain("0,88");
    expect(t).toContain("1,18");
    // French groups with a narrow no-break space rather than a comma.
    expect(t).not.toContain("53,043");
  });

  it("converts every numeral in the figure, not some of them", () => {
    // The half-converted state `localeNumerals.test.ts` argues is worse than
    // either choice held consistently. Counts, rates, ratio and axis ends all
    // come from the same locale here, so no English separator may survive.
    const t = text(render("fr", "againstmargin"));
    expect(t).not.toMatch(/\d,\d{3}/);
  });
});

describe("nothing English survives a translated locale", () => {
  it("draws no Latin word in Japanese", () => {
    // The figure's own chrome only. The puzzle's authored labels are Japanese
    // in the dictionary, so anything Latin left here is a string the component
    // wrote and never wrapped in `t()`.
    const t = text(render("ja", "againstmargin"));
    const latin = t.match(/[A-Za-z]{2,}/g) ?? [];
    // MASAI and Lancet are proper nouns carried by the puzzle's own note.
    expect(latin.filter((w) => !["MASAI", "Lancet"].includes(w))).toEqual([]);
  });
});
