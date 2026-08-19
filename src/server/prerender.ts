import type { LocalizedText, Puzzle } from "../puzzles/schema";
import { lessonPath, renderLessonPage } from "./lessonPage";
import { siblingsFor } from "./lessonSiblings";

/**
 * Every shareable lesson page, as files to write.
 *
 * Pure: it is handed the puzzles and the dictionaries rather than importing
 * them, so the whole set can be generated in a test and checked without a
 * build. The Vite plugin in vite.config.ts is the only caller that supplies
 * real data.
 */

export interface GeneratedPage {
  /** Path relative to the output directory, e.g. "l/asked-twice/fr/index.html". */
  file: string;
  /** The URL it will be served at, for the sitemap and for logging. */
  url: string;
  html: string;
}

export interface PrerenderOptions {
  puzzles: readonly Puzzle[];
  /** locale code to its dictionary. English needs none and must not be listed. */
  dictionaries: Record<string, Record<string, string>>;
  /** Absolute origin, no trailing slash. Open Graph requires absolute URLs. */
  origin: string;
}

export function lessonPages({
  puzzles,
  dictionaries,
  origin,
}: PrerenderOptions): GeneratedPage[] {
  const locales = ["en", ...Object.keys(dictionaries)];
  const pages: GeneratedPage[] = [];

  for (const puzzle of puzzles) {
    // Depends on the puzzle and not the locale, so it is computed once rather
    // than ten times per card.
    const siblings = siblingsFor(puzzle, puzzles);
    for (const locale of locales) {
      const dictionary = dictionaries[locale] ?? {};
      // The same resolution order as the app's translate(): an inline locale
      // key wins, then the dictionary keyed by the English source, then
      // English. Reimplemented rather than imported because app/i18n is a React
      // module and this runs in a build script.
      const t = (text: LocalizedText): string =>
        text[locale] ?? dictionary[text.en] ?? text.en;

      const path = lessonPath(puzzle.slug, locale);
      pages.push({
        file: `${path.replace(/^\/|\/$/g, "")}/index.html`,
        url: `${origin}${path}`,
        html: renderLessonPage({
          puzzle,
          t,
          locale,
          origin,
          locales,
          siblings,
        }),
      });
    }
  }
  return pages;
}

/**
 * A sitemap for the lesson pages.
 *
 * Worth having precisely because these are the pages meant to be found by
 * someone who is not already playing: a person searching for the name of the
 * trap they are arguing about. The app itself is one URL and needs no sitemap.
 */
export function lessonSitemap(pages: readonly GeneratedPage[]): string {
  /*
    HREFLANG, BECAUSE TEN URLS PER PUZZLE ARE TEN TRANSLATIONS AND NOT TEN
    PAGES. Without the annotation a crawler sees 730 documents, most of them
    near-duplicates, and picks one per cluster on its own. With it, it sees 73
    pages in ten languages and can serve the right one. The pages already carry
    `rel="alternate"` in their heads; this says the same where a crawler reads
    it first.

    NO `lastmod`, AND THAT IS DELIBERATE. Nothing in a puzzle records when it
    changed, so the only date available is the build's, which would tell a
    crawler that all 730 pages changed on every deploy. A date that is always
    today is not a date, and a search engine that stops believing this one has
    no way to start again. Better absent than false, which is the subject of
    the deck it describes.
  */
  const familyOf = (file: string) => file.split("/")[1] ?? file;
  // "l/<slug>/index.html" is English; "l/<slug>/<locale>/index.html" is not.
  const localeOf = (file: string) => {
    const parts = file.split("/");
    return parts.length === 4 ? parts[2]! : "en";
  };

  const families = new Map<string, GeneratedPage[]>();
  for (const page of pages) {
    const key = familyOf(page.file);
    families.set(key, [...(families.get(key) ?? []), page]);
  }

  const urls = pages
    .map((p) => {
      const family = families.get(familyOf(p.file)) ?? [p];
      const links = family
        .map(
          (alt) =>
            `    <xhtml:link rel="alternate" hreflang="${localeOf(alt.file)}" href="${alt.url}"/>`,
        )
        .join("\n");
      const english = family.find((alt) => localeOf(alt.file) === "en");
      const xDefault = english
        ? `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${english.url}"/>`
        : "";
      return `  <url>\n    <loc>${p.url}</loc>\n${links}${xDefault}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
}
