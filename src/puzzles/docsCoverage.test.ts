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

/**
 * The audit's PROSE sections, which the row checks above cannot see at all,
 * because `auditRows` only looks at lines beginning with a pipe.
 *
 * That blind spot is not hypothetical. On 2026-08-12 two `###` sections were
 * found making build-status claims about skills that had long since shipped:
 * one headed "worth building" for a card that exists on the very shape its own
 * shape note asked for, and one headed "the better demonstration is the second
 * one" whose chosen demonstration IS puzzle #28. Both read as open work. Both
 * passed every check in this file, because a heading is not a table row.
 *
 * So the same contract the rows carry is extended to any section whose HEADING
 * makes a claim about build status: it must be tagged, and if the tagged skill
 * is registered the section must say SHIPPED. Headings are the right trigger
 * because a heading is what a reader skims and what misleads them, which is
 * exactly how both of those sections survived being read repeatedly.
 *
 * Sections that merely discuss a topic stay untagged and unchecked; only a
 * status CLAIM opts a section in.
 */
const STATUS_CLAIM =
  /\b(shipped|worth building|ready to build|unsourced|sourced|to build|not yet built|rejected)\b/i;

function auditSections(
  doc: string,
): { heading: string; skill: string; body: string }[] {
  return doc
    .split(/^### /m)
    .slice(1)
    .map((section) => ({
      heading: section.split("\n")[0].trim(),
      skill: /<!--\s*skill:\s*([a-z0-9-]+)\s*-->/.exec(section)?.[1] ?? "",
      body: section,
    }))
    .filter((s) => STATUS_CLAIM.test(s.heading));
}

const sections = auditSections(auditDoc);

/**
 * The exact inventory, not a floor.
 *
 * This started as `expect(sections.length).toBeGreaterThanOrEqual(5)` against
 * seven sections, which let two of them vanish from `STATUS_CLAIM` entirely
 * while the test still passed and its own name promised that a rewording could
 * not disable it. That is the same inert-guard bug the rest of this PR is
 * about, committed inside the fix for it, so the inventory is now pinned: a
 * reworded heading that stops matching fails here by name.
 *
 * Adding a status-claiming section to the audit means adding it here too. That
 * is the point rather than a chore, since the whole failure mode is a section
 * nothing is watching.
 */
const EXPECTED_STATUS_SKILLS = [
  "anchoring",
  "cherry-picked-baselines",
  "ecological-fallacy",
  "gerrymandering",
  "illusory-truth",
  "manufactured-doubt",
  "statistical-vs-clinical-significance",
];

/**
 * "SHIPPED" as a bare token also matches "not shipped" and "never shipped", so
 * a section could stay open and still pass. The status marker is required in
 * the same `**Status: SHIPPED**` form the backlog entries use, which cannot be
 * negated by preceding prose.
 */
const SHIPPED_MARKER = /\*\*Status:\s*SHIPPED\b/;

describe("syllabus audit prose does not claim open work that has shipped", () => {
  it("finds exactly the known status-claiming sections, so a rewording cannot disable this", () => {
    expect(sections.map((s) => s.skill).sort()).toEqual(EXPECTED_STATUS_SKILLS);
  });

  it("gives every status-claiming section a skill tag", () => {
    const untagged = sections.filter((s) => !s.skill).map((s) => s.heading);
    expect(
      untagged,
      "this heading claims a build status; tag it with the skill it ships (or would ship) under",
    ).toEqual([]);
  });

  it("marks a section SHIPPED once its skill is in the registry", () => {
    // The check that would have caught illusory truth and anchoring.
    const stale = sections
      .filter((s) => SKILLS.has(s.skill) && !SHIPPED_MARKER.test(s.body))
      .map((s) => `${s.heading} (skill ${s.skill} is registered)`);
    expect(
      stale,
      "this lesson has shipped; add **Status: SHIPPED** to the section and name the slug",
    ).toEqual([]);
  });
});
