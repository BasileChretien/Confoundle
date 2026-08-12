import { describe, it, expect, beforeAll } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LocaleProvider } from "../../app/i18n";
import { loadDictionary } from "../../app/translations";
import { puzzles } from "../../puzzles";
import { DataViewRenderer } from "./DataViewRenderer";

/**
 * The chart a player actually looks at, rendered in a language that does not
 * use the Latin alphabet, must draw no Latin words.
 *
 * `share/shareCardLocalized.test.ts` does this for the exported card. This is
 * the same check one beat earlier, on the figure inside the puzzle, which is
 * where a player spends the setup and the reveal and which no test had ever
 * rendered in another language. It found two strings the source scan cannot
 * see, for the two different reasons that scan is blind:
 *
 *   - `CausalView` drew the JSX text `✗ no direct link`, never wrapped in
 *     `t()` at all, so it never reached the dictionaries to be missed.
 *   - `UnseenView` wrote the English word "to" between the two ends of a
 *     confidence interval, as a bare word between two interpolations, while
 *     `EffectView` two files away already rendered the same separator through
 *     `UI.rangeTo`. A Japanese reader got "1.9 to 7.0".
 *
 * Neither had a symptom. A string that was never wrapped is invisible to
 * `translations/inlineChrome.test.ts`, which reads the source for the
 * `t({ en: "..." })` form, and invisible to `coverage.test.ts`, which walks
 * authored puzzle content. Rendering is the only thing that sees them.
 *
 * WHY THE PUZZLES ARE GUTTED FIRST, as on the share card: a real puzzle's own
 * translations legitimately carry Latin ("ISIS-", "HIV", a Hindi gloss keeping
 * a term in brackets), and allowing those by name would grow a list and would
 * put the failure in front of a puzzle author who broke nothing. `sentinel()`
 * replaces every authored string with a non-Latin placeholder, so what is left
 * on the figure is only what the CHART ITSELF writes.
 */

/** Every locale whose script is not Latin, so stray Latin stands out. */
const NON_LATIN = ["ja", "zh", "ru", "hi", "bn", "ar"];

/** Two or more Latin letters in a row. One is an axis label, not a word. */
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

/**
 * The two channels are separated because they are in different states, and
 * merging them would mean either failing on all of both or enforcing neither.
 * What is drawn is clean and is held clean; what is announced is not yet, and
 * is ratcheted below instead.
 */
function drawnText(html: string): string {
  // A tag becomes a separator rather than nothing, so adjacent elements cannot
  // fuse into a word that is in neither of them.
  return decode(html.replace(/<[^>]*>/g, " "));
}

function announcedText(html: string): string {
  return decode(
    [...html.matchAll(/aria-label="([^"]*)"/g)].map((m) => m[1]).join(" "),
  );
}

function latinWords(text: string): string[] {
  return [
    ...new Set(
      (text.match(/[A-Za-z][A-Za-z'’./-]*/g) ?? [])
        .map((w) => w.trim())
        .filter((w) => LATIN_WORD.test(w)),
    ),
  ];
}

function render(
  puzzle: (typeof GUTTED)[number],
  beat: "setup" | "reveal",
  locale: string,
): string {
  return renderToStaticMarkup(
    createElement(LocaleProvider, {
      locale,
      children: createElement(DataViewRenderer, {
        data: puzzle.setup.data,
        view: beat === "setup" ? puzzle.setup.initialView : puzzle.reveal.view,
        // The animated path runs on effects that `renderToStaticMarkup` never
        // fires, so the still frame is both the honest thing to assert on and
        // the only one available.
        animate: false,
      }),
    }),
  );
}

/** Every (shape, beat) pair the registry actually exercises. */
function sweep(
  locale: string,
  channel: (html: string) => string,
): Record<string, string[]> {
  const offenders: Record<string, Set<string>> = {};
  for (const [i, puzzle] of GUTTED.entries()) {
    for (const beat of ["setup", "reveal"] as const) {
      const words = latinWords(channel(render(puzzle, beat, locale)));
      if (!words.length) continue;
      // Named by shape and beat, because the renderer is picked by `data.type`
      // and a failure here is nearly always one chart rather than one puzzle.
      const key = `${puzzles[i].setup.data.type}/${beat}`;
      offenders[key] ??= new Set();
      for (const word of words) offenders[key].add(word);
    }
  }
  return Object.fromEntries(
    Object.entries(offenders).map(([k, v]) => [k, [...v].sort()]),
  );
}

/**
 * The aria-labels that are still English, frozen so they cannot spread.
 *
 * Every one of them is built by concatenation at the call site, as
 * `` `${t(data.cause)} and ${t(data.effect)} rise together` ``. That is a
 * harder fix than a bare string, not a lazier one: each needs redrafting as a
 * single translatable sentence with `{slot}` placeholders, because the clause
 * order it assumes does not hold in Japanese, Hindi or Arabic, and then nine
 * translations apiece. It is a separate piece of work, sized in the pull
 * request that added this file, and it is real: these are what a screen reader
 * announces for the figure, so a blind player in any of these six languages is
 * read English.
 *
 * This list is a ratchet, not an exemption. The test below fails if a shape
 * that is not on it starts announcing English, AND if a shape on it stops:
 * fixing one means deleting its line, and the list can only shrink.
 */
const ANNOUNCED_IN_ENGLISH = [
  "causal/setup",
  "distribution/reveal",
  "ecological/reveal",
  "ecological/setup",
  "effect/setup",
  "projection/reveal",
  "projection/setup",
  "rates/reveal",
  "rates/setup",
  "regression/reveal",
  "regression/setup",
  "risk/reveal",
  "risk/setup",
  "salience/reveal",
  "survivorship/reveal",
  "survivorship/setup",
  "timeline/reveal",
  "timeline/setup",
];

beforeAll(async () => {
  await Promise.all(NON_LATIN.map(loadDictionary));
});

describe("the puzzle's chart in a non-Latin language", () => {
  it("would notice English if there were any", () => {
    // Every assertion below is an assertion of ABSENCE, which passes just as
    // happily when the harness has quietly stopped rendering anything. So
    // sweep in English, where the chart's own chrome is Latin by definition,
    // and require the detector to fire.
    //
    // Named rather than counted, and named on the two strings this file was
    // written for: in English they are correctly English, so the detector must
    // still see them here. That is the exact evidence a count cannot give,
    // because it proves the sweep reaches the two call sites that were broken
    // rather than merely that it reaches something.
    const english = sweep("en", drawnText);
    expect(english["causal/reveal"]).toContain("link");
    expect(english["unseen/reveal"]).toContain("to");
    expect(Object.keys(english).length).toBeGreaterThan(2);
    expect(GUTTED.length).toBeGreaterThan(40);
  });

  it("strips the puzzles' own words before looking", () => {
    // If `sentinel()` silently stopped substituting, every chart would carry
    // its puzzle's real content and the failures below would be about puzzle
    // translations rather than about the chart.
    expect(GUTTED[0].setup.headline.en).toBe("略");
    expect(puzzles[0].setup.headline.en).not.toBe("略");
  });

  for (const locale of NON_LATIN) {
    it(`draws no Latin word in ${locale}`, () => {
      // Route the string through `t()` and add the key to all nine
      // dictionaries; `translations/inlineChrome.test.ts` will then hold it
      // there. Check first whether the string already exists as a `UI` entry,
      // as the interval separator did.
      expect({ locale, offenders: sweep(locale, drawnText) }).toEqual({
        locale,
        offenders: {},
      });
    });

    it(`announces English on no chart beyond the known list in ${locale}`, () => {
      const offenders = Object.keys(sweep(locale, announcedText)).sort();
      // Equality rather than a subset check, in both directions on purpose: a
      // new English aria-label fails, and so does a stale entry left behind
      // after its chart was fixed. A list that may only shrink is the only
      // kind that stays true.
      expect({ locale, offenders }).toEqual({
        locale,
        offenders: ANNOUNCED_IN_ENGLISH,
      });
    });
  }
});
