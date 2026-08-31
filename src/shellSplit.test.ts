import { describe, expect, it, vi } from "vitest";

/**
 * The app shell stays split, checked instead of remembered.
 *
 * THREE MODULES MUST NOT BE REACHABLE FROM THE APP ENTRY BY STATIC IMPORT:
 * `puzzles/all.ts`, `puzzles/testItems.ts` and `app/translations/all.ts`.
 * Between them they are about 3 MB of content that the shell deliberately does
 * not contain. Each is loaded through a dynamic `import()` so it lands in its
 * own chunk, is excluded from the precache manifest and is fetched when it is
 * actually wanted.
 *
 * WHY A TEST AND NOT A CONVENTION. The dictionaries have been split since long
 * before this file existed, and `translations/all.ts` says in its own header
 * that the app must never import it. Nothing checked. One `import { puzzles }
 * from "./all"` added to a view, by anybody, at any time, would put the content
 * straight back into the shell, and every symptom is invisible: the app works,
 * the suite passes, the types check. The only trace is a heavier install and a
 * bundle creeping back toward workbox's 2 MiB precache ceiling, discovered
 * months later as a build failure nobody can attribute to a commit. This is
 * the same argument `declaredColors.test.ts` makes about colour drift, and it
 * shipped for the same reason: everything looked fine.
 *
 * IT READS THE SOURCE, because by the time these are values they are just
 * arrays, indistinguishable from any other import. The file text is the only
 * place the static-versus-dynamic distinction is still visible.
 *
 * WHAT IT DELIBERATELY DOES NOT DO is verify the built output. That would be
 * the stronger check and it needs a build, which this suite does not run. The
 * gap is real and worth naming: a bundler configured to inline a dynamic
 * import would defeat the split with this test still green. `vite.config.ts`
 * pins the two chunk names precisely so that failure would at least be visible
 * in the build log rather than silent.
 */

const SOURCES = import.meta.glob("./**/*.{ts,tsx}", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

/** Paths are keyed relative to `src/`, so "./app/main.tsx" becomes "app/main.tsx". */
const files = new Map<string, string>(
  Object.entries(SOURCES).map(([k, v]) => [k.replace(/^\.\//, ""), v]),
);

/**
 * Comments are stripped BEFORE any matching, and that is not tidiness.
 * This repo writes very long doc comments, and several of them quote the exact
 * import they are warning against: `puzzles/all.ts` contains the sentence
 * about `import { puzzles } from "./all"` a few lines above the code. Matching
 * the raw text would find those and report a graph that does not exist.
 */
function stripComments(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

/**
 * Static import and re-export specifiers, value ones only.
 *
 * `import type { X } from "y"` and `export type { X } from "y"` are erased by
 * the compiler and put nothing in the bundle, so they are not edges. A mixed
 * `import { a, type B } from "y"` IS an edge, which falls out of only
 * excluding the `type` that follows the keyword directly.
 *
 * A dynamic `import("y")` is not matched at all: it has no `from`, which is
 * precisely the distinction this whole file rests on.
 */
function staticEdges(src: string): string[] {
  const clean = stripComments(src);
  const specs: string[] = [];
  const withClause =
    /(?:^|[\s;}])(?:import|export)\s+(?!type[\s{])[\s\S]*?\sfrom\s*["']([^"']+)["']/g;
  const sideEffect = /(?:^|[\s;}])import\s*["']([^"']+)["']/g;
  for (const m of clean.matchAll(withClause)) specs.push(m[1]!);
  for (const m of clean.matchAll(sideEffect)) specs.push(m[1]!);
  return specs;
}

/** Resolve a relative specifier to a key in `files`, or null if it is a package. */
function resolve(fromFile: string, spec: string): string | null {
  if (!spec.startsWith(".")) return null;
  const dir = fromFile.split("/").slice(0, -1);
  const parts = spec.split("/");
  for (const part of parts) {
    if (part === "." || part === "") continue;
    if (part === "..") dir.pop();
    else dir.push(part);
  }
  const base = dir.join("/");
  for (const candidate of [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    `${base}/index.ts`,
    `${base}/index.tsx`,
  ]) {
    if (files.has(candidate)) return candidate;
  }
  return null;
}

function reachableFrom(entry: string): Set<string> {
  const seen = new Set<string>();
  const queue = [entry];
  while (queue.length > 0) {
    const file = queue.pop()!;
    if (seen.has(file)) continue;
    seen.add(file);
    const src = files.get(file);
    if (src === undefined) continue;
    for (const spec of staticEdges(src)) {
      const target = resolve(file, spec);
      if (target !== null && !seen.has(target)) queue.push(target);
    }
  }
  return seen;
}

const ENTRY = "app/main.tsx";

/** Loaded through `import()` only. Each carries a large slab of content. */
const MUST_STAY_LAZY = [
  "puzzles/all.ts",
  "puzzles/testItems.ts",
  "app/translations/all.ts",
];

describe("the app shell", () => {
  it("has an entry point and can see the source of it", () => {
    // Guards against the glob silently matching nothing, which would make
    // every assertion below vacuously true.
    expect(files.has(ENTRY)).toBe(true);
    expect(files.size).toBeGreaterThan(200);
  });

  it("knows the modules it is asserting about", () => {
    // A renamed file would otherwise turn this whole test into a tautology:
    // nothing can be reachable if nothing exists at the path.
    for (const path of MUST_STAY_LAZY) expect(files.has(path)).toBe(true);
  });

  it("reaches the things it is supposed to reach", () => {
    // Proves the walker actually walks. Without this, a bug that returned an
    // empty set would pass every other assertion in the file.
    const reached = reachableFrom(ENTRY);
    expect(reached.has("app/App.tsx")).toBe(true);
    expect(reached.has("puzzles/index.ts")).toBe(true);
    expect(reached.has("puzzles/itemBank.ts")).toBe(true);
    expect(reached.has("app/translations/index.ts")).toBe(true);
    expect(reached.size).toBeGreaterThan(50);
  });

  it("never reaches the eager content modules by a static import", () => {
    const reached = reachableFrom(ENTRY);
    const leaked = MUST_STAY_LAZY.filter((path) => reached.has(path));
    expect(
      leaked,
      "these are loaded with import() on purpose; a static import puts their content back in the app shell and in every install",
    ).toEqual([]);
  });

  it("counts a mixed type-and-value import as a real edge", () => {
    // The parser's one subtle case, pinned so a later simplification cannot
    // quietly start ignoring `import { a, type B } from "y"` and report a
    // smaller graph than the bundler builds.
    expect(staticEdges('import { a, type B } from "./y";')).toEqual(["./y"]);
    expect(staticEdges('import type { B } from "./y";')).toEqual([]);
    expect(staticEdges('const m = await import("./y");')).toEqual([]);
    expect(staticEdges('import "./y";')).toEqual(["./y"]);
    expect(staticEdges('export { a } from "./y";')).toEqual(["./y"]);
    expect(staticEdges('export type { A } from "./y";')).toEqual([]);
  });

  /*
    THE ACCESSORS REFUSE TO SERVE AN UNLOADED CACHE, and proving it needs a
    module instance the suite has not already primed. `testSetup.ts` awaits
    both loaders before every file, so the statically imported instances are
    always loaded and `expect(puzzles).toThrow()` against them would be a test
    of nothing. `vi.resetModules()` plus `await import()` yields a genuinely
    fresh instance with an empty cache, which is the state a browser is in for
    the first few hundred milliseconds of every visit.

    Worth the awkwardness because the alternative to throwing is returning an
    empty array, and an empty registry does not look like a failure from the
    outside: it looks like a catalogue with no lessons and a progress panel
    reading zero of zero.
  */
  it("refuses to serve the registry or the bank before they are loaded", async () => {
    vi.resetModules();
    const registry = await import("./puzzles/index");
    expect(registry.puzzlesLoaded()).toBe(false);
    expect(() => registry.puzzles()).toThrow(/loadPuzzles/);

    const bank = await import("./puzzles/itemBank");
    expect(bank.itemBankLoaded()).toBe(false);
    expect(() => bank.itemBank()).toThrow(/loadItemBank/);
  });

  it("ignores an import that only appears inside a comment", () => {
    // `puzzles/all.ts` quotes the forbidden import in its own header.
    expect(staticEdges('/* import { x } from "./y"; */')).toEqual([]);
    expect(staticEdges('// import { x } from "./y";')).toEqual([]);
  });
});
