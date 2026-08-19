import type { LocalizedText, Puzzle } from "../puzzles/schema";
import { LESSON_PAGE } from "./lessonPageStrings";

/**
 * A lesson as a page you can paste into an argument.
 *
 * The share card already existed and does a different job: it is a picture of
 * YOUR result, made to be posted after playing. This is for the other case, the
 * one that keeps coming up: somebody is making an argument that has a named
 * flaw in it, and you want to hand them the explanation rather than retype it.
 *
 * That has three consequences the puzzle flow cannot satisfy.
 *
 *  1. It has to open on the ANSWER. The game is built to fool you first, which
 *     is exactly wrong for a link sent to someone mid-debate: they did not ask
 *     to be tested, and being tested by an opponent reads as a trap rather than
 *     an explanation.
 *  2. It has to work with no JavaScript and before the app boots, because the
 *     first thing that fetches the link is a social network's crawler building
 *     the preview card. A single-page app returns the same empty shell for
 *     every URL, so every lesson would unfurl identically.
 *  3. It has to be a real page in the reader's language, not a redirect into an
 *     app that then has to be navigated.
 *
 * So this builds one self-contained HTML document per lesson, from the same
 * puzzle data the game renders. Pure and injectable: it takes a `t` rather than
 * reaching for a dictionary, so it is testable and cannot drift from the app's
 * own translation rules.
 *
 * WHY THESE ARE PRERENDERED RATHER THAN SERVED BY A FUNCTION. The first draft
 * was a Cloudflare Pages Function that loaded the right dictionary per request.
 * Measured, that bundle came to 910 KB gzipped, essentially all of it the nine
 * dictionaries, against a 1 MiB limit for the whole Functions bundle. It would
 * have taken the accounts endpoints down with it on the next deploy. Writing
 * the pages at build time removes the ceiling entirely, costs nothing at
 * runtime, and has the better property anyway: the share links keep working on
 * a plain static host, which the README promises and a Function would not.
 */

/** Where a lesson lives, per locale. English sits at the bare path. */
export function lessonPath(slug: string, locale: string): string {
  return locale === "en" ? `/l/${slug}/` : `/l/${slug}/${locale}/`;
}

export interface LessonPageOptions {
  /**
   * Where to send a reader who has just had this puzzle spoiled, and what to
   * link so the 730 pages form a graph rather than a set of leaves. Computed by
   * `lessonSiblings.ts` at build time.
   */
  siblings?: readonly Puzzle[];
  puzzle: Puzzle;
  /** Resolver for the reader's locale, e.g. `(text) => translate(text, "fr")`. */
  t: (text: LocalizedText) => string;
  locale: string;
  /**
   * Scheme and host of this deployment, with no trailing slash.
   *
   * Used ONLY where a URL has to be absolute: the canonical link, the hreflang
   * alternates and the Open Graph tags, none of which accept a relative one.
   * Links the reader can click stay relative, so a fork or a preview
   * deployment does not send its visitors to the production site.
   */
  origin: string;
  /** Locales this deployment can serve, for the hreflang alternates. */
  locales: readonly string[];
  /** Locales written right to left. */
  rtlLocales?: readonly string[];
}

/**
 * Escape for HTML text and for double-quoted attributes at once.
 *
 * Every string on this page comes from a puzzle data file, which is repo
 * content rather than user input, so this is not defending against an attacker.
 * It is defending against an author writing a perfectly reasonable sentence
 * containing an ampersand or an angle bracket and silently breaking the page
 * for one locale.
 */
/**
 * Make a JSON string safe inside a `<script>` block.
 *
 * An HTML parser ends the block at the first `</script`, wherever it appears,
 * including inside a JSON string. A source title or a skill name containing it
 * would break the page open. `<!--` gets the same treatment for the same
 * reason.
 */
export function escapeJsonLd(json: string): string {
  // The replacements really do contain a backslash: inside a JSON string a
  // backslash before a slash is a valid escape, and that is what stops the
  // parser seeing `</script`. An earlier version lost both backslashes to a
  // shell heredoc and shipped as a no-op that read exactly like this one.
  return json
    .replace(/<\/(script)/gi, "<\\/$1")
    .replace(/<!--/g, "<\\u0021--");
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Trim to a whole word, for the preview card's description. */
export function clamp(value: string, max: number): string {
  const collapsed = value.replace(/\s+/g, " ").trim();
  if (collapsed.length <= max) return collapsed;
  const cut = collapsed.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}...`;
}

function sourceLink(puzzle: Puzzle): string | undefined {
  const { url, doi } = puzzle.provenance;
  return url ?? (doi ? `https://doi.org/${doi}` : undefined);
}

const STYLE = `
:root{--paper:#F2ECDE;--paper2:#E9DEC8;--ink:#221D15;--soft:#6B6154;--mute:#8A7E6A;--rule:#D6C9AE;--brand:#0A6B5D;--gold:#8A5A0E}
*{box-sizing:border-box}
body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.6 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}
main{max-width:40rem;margin:0 auto;padding:2rem 1.25rem 3rem}
.eyebrow{font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--mute);margin:0 0 .75rem}
h1{font-size:2rem;line-height:1.1;margin:0 0 .75rem}
h2{font-size:.75rem;letter-spacing:.14em;text-transform:uppercase;color:var(--mute);margin:2rem 0 .5rem}
p{color:var(--soft)}
.lede{font-size:1.1rem;color:var(--ink)}
.rule{border-left:4px solid var(--gold);background:var(--paper2);padding:.85rem 1rem;margin:0;color:var(--ink);font-size:1.05rem}
.claim{border:1px solid var(--rule);border-radius:.5rem;padding:.85rem 1rem;margin:0 0 .75rem}
.claim strong{display:block;color:var(--ink);margin-bottom:.35rem}
a{color:var(--brand)}
.cta{display:inline-block;margin-top:.5rem;background:var(--ink);color:var(--paper);text-decoration:none;padding:.7rem 1.1rem;border-radius:.4rem;font-weight:600}
.src{font-size:.82rem;color:var(--mute);word-wrap:break-word;overflow-wrap:break-word}
footer{margin-top:2.5rem;border-top:1px solid var(--rule);padding-top:1rem;font-size:.8rem;color:var(--mute)}
[dir=rtl] .rule{border-left:0;border-right:4px solid var(--gold)}
@media(prefers-color-scheme:dark){:root{--paper:#17140F;--paper2:#201B14;--ink:#F0E8D8;--soft:#C3B8A3;--mute:#948873;--rule:#3A3227;--brand:#4FC7B2;--gold:#D8A33C}}
`.trim();

const RTL_DEFAULT = ["ar"];

export function renderLessonPage({
  puzzle,
  t,
  locale,
  origin,
  locales,
  rtlLocales = RTL_DEFAULT,
  siblings = [],
}: LessonPageOptions): string {
  const e = (text: LocalizedText) => escapeHtml(t(text));
  const dir = rtlLocales.includes(locale) ? "rtl" : "ltr";
  const canonical = `${origin}${lessonPath(puzzle.slug, locale)}`;
  const skill = t(puzzle.lesson.skillName);
  const description = clamp(t(puzzle.share.explainer), 200);
  const link = sourceLink(puzzle);

  /*
    STRUCTURED DATA, because every one of these pages carries a real citation
    and none of it was expressed. `citation` is the field a DOI is for, and it
    is the single highest-value thing that can be added to a page whose whole
    claim is that it is sourced.

    Written as a literal rather than through JSON.stringify of a built object so
    the shape is readable here, and escaped for `</script` because a source
    title containing that sequence would otherwise close the block early.
  */
  const citation = puzzle.provenance.doi
    ? `https://doi.org/${puzzle.provenance.doi}`
    : (link ?? "");
  const jsonLd = escapeJsonLd(
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${skill} · Confoundle`,
      description,
      inLanguage: locale,
      url: canonical,
      about: { "@type": "Thing", name: skill },
      isPartOf: { "@type": "WebSite", name: "Confoundle", url: origin },
      ...(citation ? { citation } : {}),
    }),
  );

  // Every locale is a real URL, so a search engine and a reader who speaks
  // another language both land on the right one.
  const alternates = locales
    .map(
      (code) =>
        `<link rel="alternate" hreflang="${escapeHtml(code)}" href="${escapeHtml(
          `${origin}${lessonPath(puzzle.slug, code)}`,
        )}">`,
    )
    .join("");

  // The first sibling is where the button goes; the rest are the link graph.
  // They point at LESSON PAGES rather than at the app, because a crawler
  // following `/?p=slug` lands on a client-rendered shell with nothing in it.
  const [next, ...rest] = siblings;

  const howItWorks = puzzle.lesson.howItWorks
    ? `<h2>${e(LESSON_PAGE.whyItWorks)}</h2><p>${e(puzzle.lesson.howItWorks)}</p>`
    : "";
  const revealBody = puzzle.reveal.body ? `<p>${e(puzzle.reveal.body)}</p>` : "";

  return `<!doctype html>
<html lang="${escapeHtml(locale)}" dir="${dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(skill)} · Confoundle</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="${escapeHtml(canonical)}">
${alternates}
<meta property="og:type" content="article">
<meta property="og:site_name" content="Confoundle">
<meta property="og:locale" content="${escapeHtml(locale)}">
<meta property="og:title" content="${escapeHtml(`${skill} · Confoundle`)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${escapeHtml(canonical)}">
<meta property="og:image" content="${escapeHtml(`${origin}/icons/icon-512.png`)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(`${skill} · Confoundle`)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<meta name="twitter:image" content="${escapeHtml(`${origin}/icons/icon-512.png`)}">
<link rel="icon" href="/favicon.svg">
<style>${STYLE}</style>
<script type="application/ld+json">${jsonLd}</script>
</head>
<body>
<main>
<p class="eyebrow">Confoundle · ${e(LESSON_PAGE.eyebrow)}</p>
<h1>${escapeHtml(skill)}</h1>
<p class="lede">${e(puzzle.share.explainer)}</p>

<h2>${e(LESSON_PAGE.rule)}</h2>
<p class="rule">${e(puzzle.lesson.takeaway)}</p>

<h2>${e(LESSON_PAGE.looksLike)}</h2>
<div class="claim"><strong>${e(puzzle.setup.headline)}</strong>${e(puzzle.setup.framing)}</div>
<div class="claim"><strong>${e(puzzle.reveal.headline)}</strong>${e(puzzle.reveal.explanation)}</div>
${revealBody}

${howItWorks}

<h2>${e(LESSON_PAGE.source)}</h2>
<p class="src">${
    link
      ? `<a href="${escapeHtml(link)}" rel="noreferrer">${e({ en: puzzle.provenance.source })}</a>`
      : e({ en: puzzle.provenance.source })
  }</p>

<h2>${e(LESSON_PAGE.tryIt)}</h2>
<p>${e(LESSON_PAGE.spoiler)}</p>
<a class="cta" href="${escapeHtml(next ? `/?p=${next.slug}` : "/")}">${e(LESSON_PAGE.play)}</a>
${
    rest.length === 0
      ? ""
      : `<h2>${e(LESSON_PAGE.related)}</h2><ul class="related">${rest
          .map(
            (p) =>
              `<li><a href="${escapeHtml(lessonPath(p.slug, locale))}">${escapeHtml(
                t(p.lesson.skillName),
              )}</a></li>`,
          )
          .join("")}</ul>`
  }

<footer>${e(LESSON_PAGE.free)} <a href="/">${e(LESSON_PAGE.everyDay)}</a></footer>
</main>
</body>
</html>`;
}
