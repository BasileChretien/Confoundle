import { describe, expect, it } from "vitest";

/**
 * THE ONE THING THAT MUST NOT HAPPEN.
 *
 * A forum thread about a card contains the answer to that card. That is the
 * entire point of it. So a "discuss this" link placed on the setup or commit
 * beat is not a convenience, it is a button labelled "show me the answer", and
 * it would be placed there by someone doing something perfectly reasonable:
 * moving a link up to where it gets more clicks.
 *
 * Nothing about the type system stops that, and nothing about a rendering test
 * would catch it either, since the link would render correctly. So this scans
 * the source and fails if any view except the two post-answer ones so much as
 * mentions the forum module. It is deliberately a coarse check: it does not try
 * to understand what the reference does, only that it is not there.
 */

const SOURCES = import.meta.glob("../**/*.{ts,tsx}", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

/**
 * Views that come AFTER the player has committed and seen the reveal. The
 * lesson beat is the natural home; ShareCard is listed because a card the
 * reader is about to send is also post-answer, so a link there would be safe
 * if someone later wants one.
 */
const ALLOWED = ["engine/LessonView.tsx", "engine/share/ShareCard.tsx"];

/** The module itself, its own tests, and the app shell that may configure it. */
const EXEMPT = [
  "app/forum.ts",
  "app/forum.test.ts",
  "app/forumSpoiler.test.ts",
];

/**
 * Glob keys are relative to THIS file, which lives in `src/app/`, so a sibling
 * arrives as "./forum.ts" and everything else as "../engine/...". Both have to
 * end up as one src-relative path or the allow lists silently match nothing,
 * which is how the first version of this test passed while flagging the module
 * it was written to exempt.
 */
function srcRelative(globKey: string): string {
  if (globKey.startsWith("./")) return `app/${globKey.slice(2)}`;
  return globKey.replace(/^(\.\.\/)+/, "");
}

function mentionsForum(source: string): boolean {
  // Strip comments first, so that this very file's prose, and any explanatory
  // comment elsewhere, cannot trip the scan.
  const code = source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
  return /\bforumTagUrl\b|\bisForumEnabled\b|\bFORUM_ORIGIN\b|from\s+["'][^"']*\/forum["']/.test(
    code,
  );
}

describe("the forum link cannot reach a player before the answer does", () => {
  it("is mentioned by no view outside the post-answer ones", () => {
    const offenders: string[] = [];
    for (const [path, source] of Object.entries(SOURCES)) {
      const rel = srcRelative(path);
      if (EXEMPT.some((e) => rel.endsWith(e))) continue;
      if (ALLOWED.some((a) => rel.endsWith(a))) continue;
      if (mentionsForum(source)) offenders.push(rel);
    }
    // Named explicitly so the failure says which file, not just that one exists.
    expect(offenders).toEqual([]);
  });

  it("would notice a reference if there were one", () => {
    // The assertion above passes just as happily when the matcher has stopped
    // matching. Prove the matcher fires before trusting an empty list.
    expect(mentionsForum('import { forumTagUrl } from "../app/forum";')).toBe(true);
    expect(mentionsForum("if (isForumEnabled()) {}")).toBe(true);
    expect(mentionsForum("FORUM_ORIGIN")).toBe(true);
    expect(mentionsForum("const x = 1;")).toBe(false);
    // And that prose about the forum does not count as a reference.
    expect(mentionsForum("// we could call forumTagUrl here one day")).toBe(false);
    expect(mentionsForum("/* forumTagUrl is deliberately absent */")).toBe(false);
  });

  it("actually scanned the views, rather than an empty glob", () => {
    // If the glob pattern ever stops matching, every check above passes on
    // nothing at all. This is the guard on the guard.
    const paths = Object.keys(SOURCES).map(srcRelative);
    expect(paths.length).toBeGreaterThan(50);
    for (const view of [
      "engine/SetupView.tsx",
      "engine/CommitView.tsx",
      "engine/RevealView.tsx",
      "engine/LessonView.tsx",
    ]) {
      expect(paths).toContain(view);
    }
  });

  it("normalises glob keys to src-relative paths", () => {
    // The allow lists are matched against this, so if it drifts the exemptions
    // stop applying and the whole test reports its own module as an offender.
    expect(srcRelative("./forum.ts")).toBe("app/forum.ts");
    expect(srcRelative("../engine/LessonView.tsx")).toBe("engine/LessonView.tsx");
    expect(srcRelative("../engine/share/ShareCard.tsx")).toBe(
      "engine/share/ShareCard.tsx",
    );
  });
});
