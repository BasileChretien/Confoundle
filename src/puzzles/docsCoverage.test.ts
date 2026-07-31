import { describe, expect, it } from "vitest";
import backlogDoc from "../../docs/lesson-backlog.md?raw";
import auditDoc from "../../docs/exam-syllabus-audit.md?raw";
import { puzzles } from "./index";

/**
 * The planning docs are enforced, not remembered.
 *
 * Twice now a puzzle shipped and the document that tracks it was not updated:
 * `lesson-backlog.md` still called three shipped lessons "READY TO AUTHOR" or
 * "LEAD", and `exam-syllabus-audit.md` still had statistical power marked
 * **gap** weeks after it shipped. Both are worse than useless in that state,
 * because the whole point of them is to stop somebody re-researching work that
 * is already done, or believing the deck has a hole it does not have.
 *
 * A stale document cannot be caught by reading it, so it is caught here. Each
 * tracked entry carries a machine-readable `<!-- skill: id -->` tag naming the
 * `reasoningSkill` it ships (or would ship) under, and this file cross-checks
 * every tag against the registry.
 *
 * THE ONE THING THIS CANNOT CATCH: shipping a backlog lesson under a different
 * skill id than the entry declares. The tag is the contract, so if the id
 * changes, change it in both places. Everything else is checked.
 */

const SKILLS = new Set(puzzles.map((p) => p.reasoningSkill));

interface Entry {
  heading: string;
  skill: string;
  status: string;
}

/**
 * Numbered backlog entries, i.e. the candidate lessons. Tier 3's persuasion
 * terms and Tier 4's curriculum notes are dispositions rather than queued
 * lessons and carry no tag.
 */
function backlogEntries(doc: string): Entry[] {
  const out: Entry[] = [];
  const sections = doc.split(/^### /m).slice(1);
  for (const section of sections) {
    const heading = section.split("\n")[0].trim();
    if (!/^\d+\.\s/.test(heading)) continue;
    const skill = /<!--\s*skill:\s*([a-z0-9-]+)\s*-->/.exec(section)?.[1] ?? "";
    const status =
      /\*\*Status:\s*([A-Z][A-Z\s]*)/.exec(section)?.[1]?.trim() ?? "";
    out.push({ heading, skill, status });
  }
  return out;
}

const entries = backlogEntries(backlogDoc);

describe("lesson backlog stays honest about what has shipped", () => {
  it("finds the numbered entries at all, so a rename cannot silently disable this file", () => {
    expect(entries.length).toBeGreaterThanOrEqual(10);
  });

  it("gives every numbered entry a skill tag", () => {
    const untagged = entries.filter((e) => !e.skill).map((e) => e.heading);
    expect(untagged, "add <!-- skill: some-id --> under the heading").toEqual(
      [],
    );
  });

  it("gives every numbered entry a status", () => {
    const statusless = entries.filter((e) => !e.status).map((e) => e.heading);
    expect(statusless).toEqual([]);
  });

  it("never reuses a skill tag between two entries", () => {
    const seen = new Map<string, string>();
    const clashes: string[] = [];
    for (const e of entries) {
      const first = seen.get(e.skill);
      if (first) clashes.push(`${e.skill}: ${first} and ${e.heading}`);
      else seen.set(e.skill, e.heading);
    }
    expect(clashes).toEqual([]);
  });

  it("marks an entry SHIPPED once its skill is in the registry", () => {
    // This is the check that would have caught the three stale entries.
    const shippedButNotSaid = entries
      .filter((e) => SKILLS.has(e.skill) && !e.status.startsWith("SHIPPED"))
      .map(
        (e) =>
          `${e.heading} (skill ${e.skill} is registered, status says ${e.status})`,
      );
    expect(
      shippedButNotSaid,
      "this lesson has shipped; set its status to SHIPPED and name the slug",
    ).toEqual([]);
  });

  it("does not let an entry claim SHIPPED before its skill exists", () => {
    const claimsTooSoon = entries
      .filter((e) => e.status.startsWith("SHIPPED") && !SKILLS.has(e.skill))
      .map((e) => `${e.heading} (no registered skill ${e.skill})`);
    expect(claimsTooSoon).toEqual([]);
  });
});

/** Table rows of the audit doc, as `{ tag, statusCell }`. */
function auditRows(
  doc: string,
): { line: string; skill: string; status: string }[] {
  return doc
    .split("\n")
    .filter((line) => line.startsWith("|") && line.split("|").length > 3)
    .map((line) => {
      const cells = line.split("|").map((c) => c.trim());
      return {
        line,
        skill: /<!--\s*skill:\s*([a-z0-9-]+)\s*-->/.exec(line)?.[1] ?? "",
        status: cells[cells.length - 2] ?? "",
      };
    });
}

const rows = auditRows(auditDoc);

describe("syllabus audit stays honest about what is still a gap", () => {
  it("finds the coverage table at all", () => {
    expect(rows.filter((r) => r.skill).length).toBeGreaterThanOrEqual(20);
  });

  it("never marks a shipped skill as a gap", () => {
    // This is the check that would have caught statistical power sitting at
    // **gap** for weeks after Freiman shipped.
    const wrong = rows
      .filter((r) => SKILLS.has(r.skill) && /\bgap\b/i.test(r.status))
      .map((r) => r.line.slice(0, 90));
    expect(wrong, "this trap has shipped; the row must not say gap").toEqual(
      [],
    );
  });

  it("requires a skill tag on any row that claims a gap", () => {
    // Without this an untagged row could claim a gap forever and no check would
    // ever look at it.
    const untagged = rows
      .filter((r) => /\bgap\b/i.test(r.status) && !r.skill)
      .map((r) => r.line.slice(0, 90));
    expect(
      untagged,
      "tag the row with the skill it would ship under, so this file can check it",
    ).toEqual([]);
  });

  it("keeps every audit tag pointing at a real or plausible skill id", () => {
    const malformed = rows
      .filter((r) => r.skill && !/^[a-z][a-z0-9-]*[a-z0-9]$/.test(r.skill))
      .map((r) => r.skill);
    expect(malformed).toEqual([]);
  });
});
