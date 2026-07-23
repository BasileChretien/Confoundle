# Design note: the `risk` data shape (relative versus absolute)

Status: **built and shipped**, in `relative-risk` (puzzle #10).

## Why it could not reuse `rates`

This was tried first and it does not work, so the reasoning is worth keeping.

The engine's whole rhythm is that setup and reveal are two *views of the same
data*. For relative versus absolute risk, the illusion is a bar scaled against
the control risk ("a third of it is gone") and the truth is the same bar scaled
against the whole population ("two people in a hundred"). Those are two
different axes over identical numbers, which is exactly what a view is for.

`rates` cannot express that. It has one axis, 0 to 100 percent of the group, so
its aggregate and stratified views differ in *how the people are split*, never
in *what the bar is a fraction of*. Authoring this puzzle as `rates` gives a
setup showing 8% against 5% and a reveal showing the same 8% against 5%, which
is not a reveal. The trick has to live in the prose instead, and the figure
stops carrying the lesson.

Hence the rule now in `CLAUDE.md`: build the shape the lesson needs.

## The shape

Four integers and some labels. Everything shown is derived.

```ts
control: { label, short?, events, n }
treated: { label, short?, events, n }
scale: number          // the "per how many people" the absolute view speaks in
```

`engine/charts/risk.ts` derives the two risks, the relative reduction, the
absolute reduction, the count spared per `scale`, the number needed to treat,
and `remainingShare` (the treated risk as a fraction of the control risk, which
is literally what the relative view draws).

The three captions (`relativeCaption`, `absoluteCaption`, `nntCaption`) are
authored rather than composed in the renderer. Every number appears above its
caption, never interpolated into a sentence, because a sentence with a number
slotted into it cannot be translated into ten languages without breaking
somewhere.

## The two views

- `relative`: control bar full height, treated bar at `remainingShare`. One gold
  stat, the relative reduction. **No percentage is printed above the bars**: a
  "100%" over the control arm reads as "100% of these men had a heart attack",
  which is the opposite of what it means.
- `absolute`: each arm drawn inside an outlined box representing the full 0 to
  100 scale, so the eye sees how little of it is used, plus two stats, the
  number spared per `scale` and the number needed to treat.

## Where the rounding bites

The derived headline numbers are sensitive to the arm sizes in a way that is
easy to miss. With the WOSCOPS counts, a 3293/3302 split gives 22.6 spared per
1,000 (so 23) and an NNT of 44.2 (so 44). An even 3298/3297 split would give
22.4 and 44.6, which round to 22 and 45. The puzzle's prose names those numbers,
so `data/relative-risk.test.ts` asserts them: if a denominator is ever corrected,
the test fails rather than letting the chart and the sentence drift apart.

## What the next tenant needs

- **Absolute risk increase / number needed to harm.** Same four integers with
  the treated arm worse. The derivation already handles it (`absoluteReduction`
  goes negative, `numberNeededToTreat` becomes infinite), but the renderer and
  the captions assume a benefit, so it needs a sign-aware pass and probably an
  `nnhCaption`.
- **A risk expressed per person-years** rather than per patient. That is a
  different denominator and should be a different shape, not a flag here.
