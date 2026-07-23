import type { LocalizedText, Puzzle } from "../puzzles/schema";
import { lessonPath, renderLessonPage } from "./lessonPage";

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
        html: renderLessonPage({ puzzle, t, locale, origin, locales }),
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
  const urls = pages
    .map((p) => `  <url><loc>${p.url}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
