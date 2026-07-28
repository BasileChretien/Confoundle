# Plan: publishing lessons on social platforms

For Instagram, TikTok, YouTube Shorts and the text platforms. Written now, to be
executed later, so that decisions made while building content do not
accidentally foreclose it.

## The one structural advantage, and it is a big one

Confoundle's atomic unit is **setup, commit, reveal, lesson**. That is not
merely compatible with short-form video, it is the exact structure short-form
video rewards: a hook that poses a question, a pause that makes the viewer
commit, and a turn that pays it off. Most educational accounts have to
manufacture that shape. This one already ships it, twenty-three times over, with
the numbers checked.

The second advantage: **every lesson is already a static page** at
`/l/<slug>/`, in ten languages, with Open Graph tags. Every post has somewhere
to send people that is not the app store and not a paywall.

The third: `engine/charts/*.ts` keep **derivation pure and separate from
rendering** (`rates.ts` and its siblings), and `CLAUDE.md` records that this was
done deliberately so the derivations could be reused by future Remotion
templates. That decision was made for exactly this plan. It means a video does
not re-enter the numbers by hand, which is the single most likely way a video
would end up contradicting the puzzle it came from.

## The format

**One puzzle, one vertical video, 30 to 50 seconds, five beats:**

| Beat | Seconds | Content |
|---|---|---|
| Hook | 0 to 4 | The claim, as a sentence somebody would actually say. "Treatment A works better. Here are the numbers." |
| Setup | 4 to 14 | The chart, animating in. Exactly the slice the puzzle shows first. |
| Commit | 14 to 20 | "Which is better? Pick before you scroll." A visible pause. This is the beat most accounts skip and it is the one that makes the payoff land. |
| Reveal | 20 to 38 | The same data re-sorted. The bars move rather than being replaced, because the whole point is that it is the same data. |
| Lesson | 38 to 50 | The rule in one line, the source cited on screen, and the URL. |

**The commit beat is non-negotiable.** Without it the video is a fact, and facts
scroll past. With it the viewer has been wrong, which is the entire product.

## How it gets built

**Remotion**, per the standing default for programmatic video, importing the
real derivation modules from `src/engine/charts/`. The pipeline:

```
src/puzzles/data/<slug>.ts   the numbers, already authored once
        ↓  (imported, never retyped)
src/engine/charts/rates.ts   the pure derivation, already tested
        ↓
video/<Template>.tsx         Remotion composition, one per data shape
        ↓
npx remotion render           one MP4 per puzzle per locale
```

One template per **data shape**, not per puzzle. There are seven or eight shapes
and twenty-three puzzles, so the templates amortise immediately, and a new
puzzle on an existing shape is a render rather than a build. That mirrors how
the app itself works and is the reason it will not rot.

**Verify before publishing:** the rendered figure must match the app's figure
for the same puzzle. A silent divergence between the video and the lesson page
is the failure mode that would cost the most credibility, and it is cheap to
check by eye at render time.

## Platform notes

| Platform | Fit | Cost | Verdict |
|---|---|---|---|
| **YouTube Shorts** | Good. Searchable, durable, links survive, and the audience actively looks for explanations | Same render | **Start here.** The only platform where a video from 2027 still gets found in 2029 |
| **Instagram Reels** | Good. Carousels are also a strong native format for the setup/reveal turn, and cheaper than video | Same render, plus stills | **Yes.** Reels plus carousels |
| **TikTok** | Strong format fit, weakest link affordance, youngest audience | Same render | **Yes, but expect no click-through.** Treat it as reach, not traffic |
| **LinkedIn** | Unexpectedly good: clinicians, researchers, epidemiologists, the people who cite you | Stills plus text | **Yes.** Likely the highest-value audience per post |
| **Bluesky / Mastodon** | The existing academic and stats communities. Text and a still are enough | Nearly free | **Yes**, and it is where the first real users will come from |

**Deliberately not doing:** paid promotion, follow-for-follow, engagement-bait
hooks ("99% get this wrong"), or any hook that misstates the finding to earn the
click. That last one is disqualifying rather than merely tacky: this project's
entire claim is that it is careful with numbers.

## Cadence

**One puzzle per week, batched monthly.** Render four at a sitting, schedule
them out. A weekly cadence is sustainable alongside a PhD, and twenty-three
puzzles is roughly five months of material before anything new is needed.

Do not start until there are enough puzzles that the account does not run dry,
which there already are, and not before the analytics from the Track A work can
tell whether any of it lands.

## What to measure, and the honest limit

Cloudflare Web Analytics gives referrer and landing page, so it can answer
**"did this platform send anyone, and to which lesson"**. That is the question
worth asking and it is answerable today.

It cannot answer whether those people came back, because it holds no visitor
identifier by design. Do not build a posting strategy that needs a retention
number until there is a first-party event store to produce one. Platform-native
analytics (views, watch-through) stays inside each platform and should be read
there rather than pulled anywhere.

**One number to watch above the others:** lesson-page visits arriving with a
social referrer. If videos generate views but no lesson visits, the format is
working and the call to action is not, which is a fixable problem and a
different one from "nobody cares".

## Sequencing against everything else

This sits **after** the analytics wiring and **after** the content gaps in
[`plan-syllabus-gaps.md`](./plan-syllabus-gaps.md) are closed, for one reason:
the fastest way to waste this advantage is to point an audience at a deck with
visible holes in the trial-appraisal topics that every French and American
medical exam names.

The build is genuinely small once it starts. One Remotion template per shape,
reusing derivations that already exist and are already tested, is a few days of
work, not a project.
