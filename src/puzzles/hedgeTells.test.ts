import { describe, expect, it } from "vitest";
import { TEST_ITEMS } from "./testItems";
import { puzzles } from "./index";

/**
 * The hedge rule, applied to the Trap Hunt bank by machine instead of by memory.
 *
 * CLAUDE.md states the rule about a puzzle's four answer bands, so that is where
 * it gets audited, and the bank then gets written fourteen items at a time with
 * visibly less care. On 2026-08-12 that produced SIX separate defects across four
 * cards, every one caught in review rather than by anything here:
 *
 *   - two `pygmalion-effect` items each licensed a second shipped skill;
 *   - two `performance-bias` items written as SOUND decoys had that card's own
 *     distinction backwards;
 *   - `ha-sound-placebo-check` let researchers read a within-drug-arm comparison
 *     because a placebo check came back null, which is absence of evidence
 *     rather than exchangeability;
 *   - `se-tumour-shrinkage` said "in a single-arm trial", and that one
 *     scene-setting adjective handed the player a second correct critique.
 *
 * THE LAST ONE IS WHY THIS FILE SCANS SCENARIOS AND NOT VERDICTS. The first
 * five were about what an item CLAIMED. That one was a single incidental
 * adjective nobody would think to audit, which happened to make a second answer
 * right. So the check runs over the scenery.
 *
 * WHAT THIS CAN AND CANNOT DO. It cannot decide whether a scenario licenses a
 * second reading; that is a judgement. What it can do is notice the specific
 * phrases that have actually caused this, and refuse to let them sit in an item
 * tagged to a different skill. It is a list of known tells, not a proof, and it
 * is expected to grow each time review finds a new one. Adding to `TELLS` when
 * that happens is the point of the file.
 */

const SKILLS = new Set(puzzles.map((p) => p.reasoningSkill));

interface Tell {
  /** What the phrase gives a player licence to say. */
  licenses: string;
  /** Skills for which the phrase is the SUBJECT and therefore fine. */
  ownedBy: string[];
  patterns: RegExp[];
}

const TELLS: Tell[] = [
  {
    licenses:
      "rejecting the claim for having no comparison group at all, which is a second correct critique whatever else the item is about",
    ownedBy: [],
    patterns: [/\bsingle[- ]arm\b/i, /\bwith no (?:control|comparison) group\b/i, /\buncontrolled trial\b/i],
  },
  {
    licenses: "the treatment was given BECAUSE the patient was worse, which is confounding by indication",
    ownedBy: ["confounding-by-indication"],
    patterns: [
      /\bprescribed .{0,30}\bbecause they were (?:sicker|worse|more severe)/i,
      /\bgiven .{0,30}\bto (?:the )?(?:sickest|sicker) patients\b/i,
      /\bonly the (?:sickest|most severe) .{0,20}\breceived\b/i,
    ],
  },
  {
    licenses: "a group assembled by what people did after allocation, which is the healthy adherer and intention to treat problem",
    ownedBy: ["healthy-adherer", "intention-to-treat", "attrition-bias"],
    patterns: [
      /\bamong (?:those|patients|people) who (?:actually )?(?:adhered|complied|completed the course)\b/i,
      /\bpost[- ]randomisation (?:split|subgroup)\b/i,
      /\bwho took at least \d+ per cent\b/i,
    ],
  },
  {
    licenses: "somebody optimised the measure on purpose, which is Campbell's law",
    ownedBy: ["campbells-law", "threshold-bunching", "gerrymandering"],
    patterns: [
      /\bteaching to the test\b/i,
      /\bgamed? the (?:measure|metric|target|figures)\b/i,
      /\bto hit the target\b/i,
    ],
  },
  {
    licenses: "a third factor driving both, which is what correlation-not-causation reveals",
    ownedBy: ["correlation-not-causation", "ecological-fallacy", "simpsons-paradox", "effect-modification-vs-confounding"],
    patterns: [/\ba (?:hidden |common )?third (?:factor|variable|thing) (?:drives|driving|caused)\b/i],
  },
  {
    licenses: "the sample was drawn from somewhere that guarantees the association, which is Berkson or selection",
    ownedBy: ["berksons-bias", "self-selection", "survivorship-bias", "spectrum-bias"],
    patterns: [/\bonly (?:among )?(?:hospital(?:ised)?|admitted) patients\b/i, /\bamong volunteers who put themselves forward\b/i],
  },
];

const en = (t: { en?: string }) => t.en ?? "";

describe("Trap Hunt scenarios do not license a second critique", () => {
  it("keeps every tell's owning skills real, so a rename cannot silently disable a rule", () => {
    const unknown = TELLS.flatMap((t) => t.ownedBy).filter((s) => !SKILLS.has(s));
    expect(unknown, "a tell claims to be owned by a skill that is not in the registry").toEqual([]);
  });

  it("finds the bank at all", () => {
    expect(TEST_ITEMS.length).toBeGreaterThan(500);
  });

  it("never puts a known tell in an item tagged to a different skill", () => {
    const offenders: string[] = [];
    for (const item of TEST_ITEMS) {
      const text = `${en(item.scenario)} ${en(item.explanation)}`;
      for (const tell of TELLS) {
        // An item whose SUBJECT is the tell may of course use it.
        if (item.trap && tell.ownedBy.includes(item.trap)) continue;
        const hit = tell.patterns.find((p) => p.test(text));
        if (hit)
          offenders.push(
            `${item.id} (trap: ${item.trap ?? "null"}) matches ${hit} which licenses ${tell.licenses}`,
          );
      }
    }
    expect(
      offenders,
      "cut the detail that licenses the second reading, or retag the item",
    ).toEqual([]);
  });

  it("does not let a sound decoy assert a trap verdict", () => {
    // A `trap: null` item claims that NO shipped skill applies, which is the
    // strongest claim in the bank. An explanation that talks itself into a flaw
    // and then calls the reasoning sound is the shape two decoys took today.
    const offenders = TEST_ITEMS.filter((i) => i.trap === null)
      .filter((i) => /\bis (?:the|a) (?:trap|flaw|error)\b|\bwhich is why it is wrong\b/i.test(en(i.explanation)))
      .map((i) => i.id);
    expect(offenders).toEqual([]);
  });
});
