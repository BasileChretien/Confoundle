import { it } from "vitest";
import { ALL_DICTIONARIES } from "./all";
import { puzzles } from "../../puzzles";
import { TEST_ITEMS } from "../../puzzles/testItems";
import { TAGS } from "../../puzzles/tags";

/** THROWAWAY. Regenerates the translation worklist. Delete before commit. */
const collect = (node: unknown, out: Set<string>): void => {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) { for (const n of node) collect(n, out); return; }
  const rec = node as Record<string, unknown>;
  if (typeof rec.en === "string") out.add(rec.en);
  for (const v of Object.values(rec)) collect(v, out);
};

it("writes the worklist", async () => {
  const authored = new Set<string>();
  collect(puzzles, authored); collect(TEST_ITEMS, authored); collect(TAGS, authored);
  const worklist: Record<string, string[]> = {};
  for (const [locale, dict] of Object.entries(ALL_DICTIONARIES)) {
    if (locale === "en") continue;
    worklist[locale] = [...authored].filter((s) => !(s in dict));
  }
  const fs = await import("node:fs");
  fs.writeFileSync("worklist.json", JSON.stringify(worklist, null, 2), "utf8");
  console.log(`count ${worklist.fr?.length ?? 0}`);
});
