import { describe, it, expect } from "vitest";
import { clamp, escapeHtml, lessonPath, renderLessonPage } from "./lessonPage";
import { lessonPages, lessonSitemap } from "./prerender";
import { puzzles } from "../puzzles";
import { ALL_DICTIONARIES } from "../app/translations/all";
import { LOCALE_CODES } from "../app/locales";
import type { LocalizedText } from "../puzzles/schema";

const ORIGIN = "https://confoundle.pages.dev";
const english = (text: LocalizedText) => text.en;

const page = (slug = "who-got-left-out", locale = "en") =>
  renderLessonPage({
    puzzle: puzzles.find((p) => p.slug === slug)!,
    t: english,
    locale,
    origin: ORIGIN,
    locales: LOCALE_CODES,
  });

/**
 * These pages are the only part of the project a stranger meets without ever
 * opening the app: someone is arguing on the internet, is handed a link, and
 * decides in about two seconds whether it is worth reading. So what is tested
 * here is mostly what a crawler and a skim-reader see, which is exactly the
 * part no other test touches.
 */
describe("the shareable lesson page", () => {
  it("gives the answer away, which is the whole point", () => {
    // A debate link must not open something built to fool the reader first.
    const html = page();
    const puzzle = puzzles.find((p) => p.slug === "who-got-left-out")!;
    expect(html).toContain(escapeHtml(puzzle.reveal.headline.en));
    expect(html).toContain(escapeHtml(puzzle.lesson.takeaway.en));
    expect(html).toContain(escapeHtml(puzzle.lesson.skillName.en));
    // And it warns the reader, so nobody spoils a puzzle they wanted to play.
    expect(html).toContain("gives the answer away");
  });

  it("unfurls with the lesson's own title and blurb", () => {
    // The failure this guards against is every link previewing identically,
    // which is what a single-page app would have done.
    const titles = puzzles.map((p) => {
      const html = page(p.slug);
      return /<meta property="og:title" content="([^"]*)"/.exec(html)?.[1] ?? "";
    });
    expect(new Set(titles).size).toBe(puzzles.length);
    for (const title of titles) expect(title).not.toBe("");
  });

  it("carries an absolute url and image in the preview tags", () => {
    // Open Graph rejects relative URLs, and a missing image gives a bare link.
    const html = page("asked-twice");
    expect(html).toContain(`<meta property="og:url" content="${ORIGIN}/l/asked-twice/">`);
    expect(html).toContain(`content="${ORIGIN}/icons/icon-512.png"`);
    expect(html).toContain('<meta name="twitter:card" content="summary_large_image">');
  });

  it("points every locale at its own url, and says which it is", () => {
    const html = page("asked-twice", "fr");
    expect(html).toContain('<html lang="fr" dir="ltr">');
    expect(html).toContain(`<link rel="canonical" href="${ORIGIN}/l/asked-twice/fr/">`);
    for (const code of LOCALE_CODES) {
      expect(html).toContain(`hreflang="${code}"`);
    }
  });

  it("renders right to left for Arabic", () => {
    expect(page("asked-twice", "ar")).toContain('dir="rtl"');
  });

  it("links back into the puzzle and out to the source", () => {
    const html = page("the-months-before");
    const puzzle = puzzles.find((p) => p.slug === "the-months-before")!;
    expect(html).toContain(escapeHtml(puzzle.provenance.url!));
    // Relative, so a fork or a preview deployment keeps its own visitors
    // instead of handing them to the production site. Only the tags that
    // cannot take a relative URL are absolute.
    expect(html).toContain('href="/?p=the-months-before"');
    const body = html.split("<body>")[1];
    expect(body).not.toContain(ORIGIN);
  });

  it("escapes, so an ampersand in a puzzle cannot break a locale's page", () => {
    expect(escapeHtml(`<script>"x" & 'y'</script>`)).toBe(
      "&lt;script&gt;&quot;x&quot; &amp; &#39;y&#39;&lt;/script&gt;",
    );
    // Nothing authored may leak a raw tag into the document.
    for (const p of puzzles) {
      const body = page(p.slug).split("<body>")[1] ?? "";
      expect({ slug: p.slug, scripts: body.includes("<script") }).toEqual({
        slug: p.slug,
        scripts: false,
      });
    }
  });

  it("clamps the preview blurb on a word boundary", () => {
    expect(clamp("short", 200)).toBe("short");
    expect(clamp("a".repeat(300), 200)).toHaveLength(203);
    expect(clamp("one two three four five", 15)).toBe("one two three...");
    // A word so long that backing up to its start would throw most of the
    // budget away is cut mid-word instead, which reads better than a stub.
    expect(clamp("one supercalifragilistic", 12)).toBe("one supercal...");
    expect(clamp("  spaced   out  ", 200)).toBe("spaced out");
  });

  it("keeps every preview description inside what a card will show", () => {
    for (const p of puzzles) {
      const html = page(p.slug);
      const description =
        /<meta property="og:description" content="([^"]*)"/.exec(html)?.[1] ?? "";
      expect({ slug: p.slug, ok: description.length > 40 && description.length <= 220 }).toEqual(
        { slug: p.slug, ok: true },
      );
    }
  });
});

describe("what gets written at build time", () => {
  const pages = lessonPages({
    puzzles,
    dictionaries: ALL_DICTIONARIES,
    origin: ORIGIN,
  });

  it("writes one page per puzzle per language", () => {
    expect(pages).toHaveLength(puzzles.length * LOCALE_CODES.length);
    expect(new Set(pages.map((p) => p.file)).size).toBe(pages.length);
  });

  it("puts English at the bare path and the rest under it", () => {
    expect(lessonPath("asked-twice", "en")).toBe("/l/asked-twice/");
    expect(lessonPath("asked-twice", "ja")).toBe("/l/asked-twice/ja/");
    expect(pages.some((p) => p.file === "l/asked-twice/index.html")).toBe(true);
    expect(pages.some((p) => p.file === "l/asked-twice/ja/index.html")).toBe(true);
  });

  it("actually translates, rather than shipping ten English pages", () => {
    // The failure mode this catches is a lookup that silently falls back:
    // the dictionaries are keyed by the exact English source text, so a page
    // built with the wrong resolution order would look fine and be English.
    const puzzle = puzzles[0];
    const french = pages.find((p) => p.file === `l/${puzzle.slug}/fr/index.html`)!;
    const english = pages.find((p) => p.file === `l/${puzzle.slug}/index.html`)!;
    expect(french.html).not.toBe(english.html);
    const translated = ALL_DICTIONARIES.fr[puzzle.lesson.takeaway.en];
    expect(translated).toBeTruthy();
    expect(french.html).toContain(escapeHtml(translated));
  });

  it("lists every page in the sitemap, with absolute urls", () => {
    const xml = lessonSitemap(pages);
    expect((xml.match(/<loc>/g) ?? []).length).toBe(pages.length);
    expect(xml).toContain(`<loc>${ORIGIN}/l/${puzzles[0].slug}/</loc>`);
    expect(xml).not.toContain("<loc>/l/");
  });
});
