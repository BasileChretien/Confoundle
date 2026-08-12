import { describe, it, expect, beforeAll } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LocaleProvider } from "../../app/i18n";
import { loadDictionary } from "../../app/translations";
import { puzzles } from "../../puzzles";
import { ShareCard } from "./ShareCard";

/**
 * The share card, rendered in a language that does not use the Latin alphabet,
 * must contain no Latin words.
 *
 * Every glyph in `ShareCard.tsx` used to draw hard-coded English onto the
 * chart: "took few" and "took most" on the adherence card, "told yes" and
 * "told no" on the crossed one, "died" on the surrogate one, plus an English
 * `aria-label` on each of the twenty-seven SVGs. A Bengali player exported an
 * image with English words on it. Nothing failed, because a dictionary miss
 * falls back to English by design and a string that was never wrapped in `t()`
 * does not even reach the dictionaries.
 *
 * `translations/inlineChrome.test.ts` closes half of this: it reads the source
 * for `t({ en: "..." })` and fails if any of the nine dictionaries lacks the
 * key. What it cannot see is a string that was never wrapped, which is exactly
 * the bug, and it cannot see a computed one either: the category eyebrow is
 * `t({ en: humanize(puzzle.category) })`, whose English is a function call, and
 * it shipped untranslated for the same reason.
 *
 * So this renders instead of reading. In a non-Latin locale, any Latin word
 * left on the card is a string that did not go through `t()`, or went through
 * it without a translation. Both are the same defect to the person holding the
 * exported PNG.
 *
 * WHY THE PUZZLES ARE GUTTED FIRST. A real puzzle's own content legitimately
 * carries Latin inside a translation: "Coronary Drug Project", "ISIS-", "HIV",
 * "Nature", a Hindi gloss that keeps "confounding by indication" in brackets.
 * Allowing those by name would mean a growing list, and worse, it would put
 * the failure in front of the wrong person: a puzzle author whose Japanese
 * translation mentions a trial by name would be sent to debug a share-card
 * test. `sentinel()` replaces every authored string with a non-Latin
 * placeholder, so what is left is only what the CARD itself writes.
 */

/** Every locale whose script is not Latin, so stray Latin stands out. */
const NON_LATIN = ["ja", "zh", "ru", "hi", "bn", "ar"];

/**
 * Latin that is allowed to survive: the brand, which is a name rather than a
 * word, and is drawn on the card twice (the wordmark, and the footer rule,
 * where the translations keep it inside the translated sentence).
 */
const BRAND = ["Confoundle", "confoundle"];

/** Two or more Latin letters in a row. One is a label, not a word. */
const LATIN_WORD = /[A-Za-z]{2,}/;

/**
 * Replace every authored `LocalizedText` with a non-Latin placeholder, leaving
 * the numbers and the structure alone. Runs after the registry has validated
 * the puzzles, so nothing here has to satisfy the schema.
 */
function sentinel<T>(value: T): T {
  if (Array.isArray(value)) return value.map(sentinel) as unknown as T;
  if (value && typeof value === "object") {
    const o = value as Record<string, unknown>;
    if (typeof o.en === "string") return { en: "略" } as unknown as T;
    return Object.fromEntries(
      Object.entries(o).map(([k, v]) => [k, sentinel(v)]),
    ) as unknown as T;
  }
  return value;
}

const GUTTED = puzzles.map(sentinel);

/** `renderToStaticMarkup` escapes quotes and ampersands; "quot" is Latin. */
function decode(html: string): string {
  return html
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

/** Everything a reader or a screen reader gets off the rendered card. */
function visibleText(html: string): string {
  const labels = [...html.matchAll(/aria-label="([^"]*)"/g)].map((m) => m[1]);
  // A tag becomes a separator rather than nothing, so adjacent elements cannot
  // fuse into a word that is in neither of them.
  const body = html.replace(/<[^>]*>/g, "");
  return decode([...labels, body].join(""));
}

function renderCard(puzzle: (typeof GUTTED)[number], locale: string): string {
  return renderToStaticMarkup(
    createElement(LocaleProvider, {
      locale,
      children: createElement(ShareCard, {
        puzzle,
        committed: puzzle.choices[0],
        onReplay: () => {},
        onHome: () => {},
      }),
    }),
  );
}

/** The Latin words on a card, with the brand and the placeholders removed. */
function latinWords(html: string): string[] {
  let text = visibleText(html);
  for (const name of BRAND) text = text.split(name).join("");
  return [
    ...new Set(
      text
        .split("")
        .flatMap((chunk) => chunk.match(/[A-Za-z][A-Za-z'’./-]*/g) ?? [])
        .map((w) => w.trim())
        .filter((w) => LATIN_WORD.test(w)),
    ),
  ];
}

beforeAll(async () => {
  await Promise.all(NON_LATIN.map(loadDictionary));
});

describe("the share card in a non-Latin language", () => {
  it("would notice English if there were any", () => {
    // The whole suite below asserts an ABSENCE, which is the kind of assertion
    // that passes just as happily when the harness has stopped working. So
    // render one card in English, where every word on it is Latin by
    // definition, and require the detector to fire. If this ever goes quiet,
    // the locale assertions underneath it mean nothing.
    const english = latinWords(renderCard(GUTTED[0], "en"));
    expect(english.length).toBeGreaterThan(5);
    expect(english).toContain("card"); // "Your card", chrome the card owns
    expect(GUTTED.length).toBeGreaterThan(40);
  });

  it("strips the puzzles' own words before looking", () => {
    // If `sentinel()` silently stopped substituting, every card would carry its
    // puzzle's real content and the failures below would be about translations
    // rather than about the card.
    const card = renderCard(GUTTED[0], "ja");
    expect(visibleText(card)).toContain("略");
    expect(GUTTED[0].lesson.skillName.en).toBe("略");
  });

  for (const locale of NON_LATIN) {
    it(`draws no Latin word in ${locale}`, () => {
      const offenders: Record<string, string[]> = {};
      for (const [i, puzzle] of GUTTED.entries()) {
        const words = latinWords(renderCard(puzzle, locale));
        // Named by shape, because the glyph is picked by `data.type` and a
        // failure here is nearly always one glyph rather than one puzzle.
        if (words.length) offenders[`${puzzles[i].setup.data.type}`] = words;
      }
      // Route the string through `t()` and add the key to all nine
      // dictionaries; `inlineChrome.test.ts` will then hold it there.
      expect({ locale, offenders }).toEqual({ locale, offenders: {} });
    });
  }
});
