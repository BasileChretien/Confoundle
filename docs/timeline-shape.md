# Design note: the `timeline` data shape (for lead-time bias)

Status: **built and shipped**, in `stage-migration`'s successor `lead-time`
(puzzle #7). Kept as the record of why the shape looks like this, and of the two
places the build deliberately departed from the plan:

1. **Death alignment is proved by a test, not by the schema.** The plan wanted a
   superRefine forcing `diedAt` equal across tracks. That would have been right
   for lead-time and wrong for the next two tenants of this shape: length-time
   and immortal time bias do not align their deaths. The schema now enforces
   only what is structurally true of any life (`onsetAt <= detectedAt <= diedAt
   <= span`), and `data/lead-time.test.ts` asserts the alignment that *this*
   puzzle turns on, exactly as `will-rogers.test.ts` proves its own paradox.
2. **The tracks carry three more labels** than the sketch: `detectedLabel`,
   `diedLabel` and `survivalLabel`. The renderer needs to name the markers and
   the survival bar, and every user-facing string has to be one a puzzle owns.

## Why a new shape

Lead-time bias cannot be told with `rates`. The claim is not "which group is
better" but "the clock started earlier". It needs a picture of one life with
events on it, shown twice.

Building it also pays for itself twice more: **length-time bias** and **immortal
time bias** both fit the same shape and would then be data files only.

## The shape

```ts
const TimelineData = z.object({
  type: z.literal("timeline"),
  label: LocalizedText,          // figure title
  unit: LocalizedText,           // "years"
  span: z.number().positive(),   // total axis length
  onsetLabel: LocalizedText,     // "disease begins"
  tracks: z.array(z.object({
    id: z.string().min(1),
    label: LocalizedText,        // "Without screening" / "With screening"
    onsetAt: z.number(),         // same for both: the disease starts when it starts
    detectedAt: z.number(),      // screening moves this EARLIER
    diedAt: z.number(),          // identical in both: the point of the puzzle
  })).min(2),
});
```

Derivation lives in a pure module (`charts/timeline.ts`), mirroring
`charts/rates.ts`: `survivalFromDiagnosis(track) = diedAt - detectedAt`.

## Views

Two `DataView` kinds, matching the setup/reveal rhythm:

- `survival`: draws only the diagnosis-to-death bar. Screening looks like a
  triumph, because that bar is much longer.
- `lifespan`: draws the whole line, onset to death, with the death marker
  aligned across both tracks. The bars end at the same instant. Nobody lived
  longer.

The reveal is the alignment of the two death markers. That is the entire lesson,
so the renderer should make that vertical line unmissable.

## Build checklist (all done)

1. `schema.ts`: `TimelineData` in the `PuzzleData` union, `survival` and
   `lifespan` in the `DataView` union, superRefine on track ordering.
2. `charts/timeline.ts`: pure derivation plus `timeline.test.ts`.
3. `charts/TimelineView.tsx`: the renderer. Horizontal, works at 375px wide.
4. `DataViewRenderer.tsx`: `case "timeline"` plus the two `scopeLabel` entries.
5. `ShareCard.tsx`: `TimelineGlyph` on the dark plate and its dispatch branch.
6. The puzzle data file, Trap Hunt items, nine translations.

## What the next tenant needs

**Length-time bias** and **immortal time bias** reuse the shape but not the
`lifespan` view, because their reveal is not an alignment:

- Length-time needs several tracks with *different* `onsetAt`-to-`diedAt`
  lengths, and a view that shows which ones a periodic screen is likely to
  catch (the slow ones sit in the detectable window longer). Probably a new
  `sampled` view kind rather than a change to the shape.
- Immortal time needs a stretch of a track marked as "counted as exposed but
  could not have died yet". That is one more optional field on a track, plus a
  view that shades it.

## Content: sourcing lead-time bias

The timeline itself is schematic, like the bomber diagram, so it needs no
provenance. The puzzle's factual claim does. Candidates to verify (browser
access to Nagoya's subscriptions is authorized, see the memory note):

- **Welch HG, Schwartz LM, Woloshin S. "Are increasing 5-year survival rates
  evidence of success against cancer?" JAMA. 2000;283(22):2975-2978.** The
  canonical demonstration that rising 5-year survival tracked rising incidence,
  not falling mortality. Best fit for the setup's headline claim.
- **Ahn HS, Kim HJ, Welch HG. "Korea's thyroid-cancer epidemic." N Engl J Med.
  2014;371(19):1765-1767.** Incidence up enormously, mortality flat. Vivid, and
  strong for the deep dive.
- Japan's neuroblastoma screening programme, halted in 2004 after screening
  raised incidence and survival without moving mortality.

Rule unchanged: verify every number against the source and arithmetic-check it,
or the puzzle does not ship.

## Trap for the item bank

When this lands, the Trap Hunt needs its sound decoy too: a screening programme
where **mortality** actually fell, not just survival. Otherwise players learn
"screening claims are always bogus", which is its own error.
