import { describe, it, expect } from "vitest";
import { puzzles } from "./all";
import { TEST_ITEMS } from "./testItems";
import { scopeLabel, viewKey } from "../engine/charts/DataViewRenderer";

/**
 * Contract checks across the whole library, rather than inside one puzzle.
 *
 * These encode rules CONTRIBUTING.md states in prose, so that adding a puzzle
 * that quietly breaks one fails in CI instead of shipping. The Trap Hunt rule
 * in particular is easy to forget: a puzzle teaches a skill, and the item bank
 * has to be able to test that skill afterwards, including with a case where the
 * same reasoning is genuinely sound.
 */
describe("the puzzle registry", () => {
  it("has unique ids and slugs", () => {
    const ids = puzzles.map((p) => p.id);
    const slugs = puzzles.map((p) => p.slug);
    expect(new Set(ids).size).toBe(puzzles.length);
    expect(new Set(slugs).size).toBe(puzzles.length);
  });

  it("teaches a different skill in every puzzle", () => {
    const skills = puzzles.map((p) => p.reasoningSkill);
    expect(new Set(skills).size).toBe(puzzles.length);
  });

  it("always reveals something the setup did not show", () => {
    for (const p of puzzles) {
      // Same view twice means the reveal restates the setup, and the beat
      // carries no information. The view carries its filter, so a puzzle may
      // legitimately flip from one slice of a kind to the whole of it.
      expect({
        slug: p.slug,
        same: viewKey(p.setup.initialView) === viewKey(p.reveal.view),
      }).toEqual({ slug: p.slug, same: false });
    }
  });

  it("names every view it uses", () => {
    for (const p of puzzles) {
      for (const view of [p.setup.initialView, p.reveal.view]) {
        expect({ slug: p.slug, label: scopeLabel(view.kind) }).not.toEqual({
          slug: p.slug,
          label: "",
        });
      }
    }
  });

  it("cites a source for every puzzle and every deep-dive example", () => {
    for (const p of puzzles) {
      expect(p.provenance.source.length).toBeGreaterThan(20);
      expect(Boolean(p.provenance.url || p.provenance.doi)).toBe(true);
      for (const example of p.lesson.examples ?? []) {
        expect({
          slug: p.slug,
          cited: Boolean(example.provenance.url || example.provenance.doi),
        }).toEqual({ slug: p.slug, cited: true });
      }
    }
  });

  it("can be tested afterwards: every skill has Trap Hunt items", () => {
    const underfed = puzzles
      .map((p) => ({
        skill: p.reasoningSkill,
        items: TEST_ITEMS.filter((i) => i.trap === p.reasoningSkill).length,
      }))
      .filter((entry) => entry.items < 2);
    expect(underfed).toEqual([]);
  });

  it("gives every Trap Hunt item a distinct id", () => {
    // Ids key the session's seen/answered records, so a duplicate silently
    // merges two items' histories. Nothing else checks this.
    const ids = TEST_ITEMS.map((i) => i.id);
    const duplicated = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(duplicated).toEqual([]);
  });

  it("never repeats a Trap Hunt scenario", () => {
    const scenarios = TEST_ITEMS.map((i) => i.scenario.en);
    expect(new Set(scenarios).size).toBe(TEST_ITEMS.length);
  });

  it("keeps enough sound decoys that the answer is never always yes", () => {
    const sound = TEST_ITEMS.filter((i) => i.trap === null);
    const traps = TEST_ITEMS.filter((i) => i.trap !== null);
    expect(sound.length).toBeGreaterThanOrEqual(puzzles.length / 2);
    // Sound items must stay a real share of the bank, not a token few.
    expect(sound.length / (sound.length + traps.length)).toBeGreaterThan(0.25);
  });

  it("only traps skills that a puzzle actually teaches", () => {
    const taught = new Set(puzzles.map((p) => p.reasoningSkill));
    const orphans = [
      ...new Set(
        TEST_ITEMS.filter((i) => i.trap !== null).map((i) => i.trap as string),
      ),
    ].filter((skill) => !taught.has(skill));
    expect(orphans).toEqual([]);
  });
});
