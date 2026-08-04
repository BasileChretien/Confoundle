import { it } from "vitest";
import { ALL_DICTIONARIES as DICTIONARIES } from "./all";
import { puzzles } from "../../puzzles";
import { TEST_ITEMS } from "../../puzzles/testItems";
import { TAGS } from "../../puzzles/tags";

function walk(node: unknown, out: Set<string>) {
  if (node === null || node === undefined || typeof node !== "object") return;
  const obj = node as Record<string, unknown>;
  if (typeof obj.en === "string") out.add(obj.en);
  for (const v of Object.values(obj)) {
    if (v !== null && v !== undefined) walk(v, out);
  }
}

it("writes the worklist", async () => {
  const all = new Set<string>();
  walk(puzzles, all);
  walk(TEST_ITEMS, all);
  walk(TAGS, all);
  const fs = await import("node:fs");
  const missing: Record<string, string[]> = {};
  for (const [locale, dict] of Object.entries(DICTIONARIES)) {
    if (locale === "en") continue;
    const gone = [...all].filter((s) => !(s in (dict as Record<string, string>)));
    if (gone.length) missing[locale] = gone;
  }
  fs.writeFileSync("worklist.json", JSON.stringify(missing, null, 2), "utf-8");
});
