import { useMemo, useState } from "react";
import { useLocale, useT } from "../app/i18n";
import { puzzles } from "../puzzles";
import { fillSlots } from "./charts/announce";
import { Badge, Button } from "./ui";
import {
  alwaysTrapScore,
  drawRound,
  grade,
  isTrap,
  longestRun,
  ROUND_SIZE,
  type TrapHuntAnswer,
} from "../srs/trapHunt";
import { recentlySeen, recordRound } from "../app/trapHuntStats";
import { itemBank } from "../puzzles/itemBank";
import { gradeSpot, hasSpot, segmentJoin, withOneSpot } from "../srs/spotTheTell";
import { gradeName, nameOptions, planSteps } from "../srs/session";

/**
 * A clause inside the scenario, tappable on the second beat.
 *
 * Inline rather than a block, so the paragraph still reads as a paragraph: the
 * question is which sentence did it, and a player who has been handed the
 * sentences pre-separated into a list has been given most of the answer.
 */
function segmentButton(state: "tell" | "wrong" | null): string {
  const base =
    "cursor-pointer rounded-[3px] px-0.5 text-left underline decoration-dotted decoration-ink-mute underline-offset-4 transition focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand";
  if (state === "tell") return `${base} bg-brand/25 decoration-transparent`;
  if (state === "wrong") return `${base} bg-rust/20 decoration-transparent`;
  return `${base} hover:bg-paper-3`;
}

/** How many items "one more" appends. Short enough to be a nightcap. */
const EXTENSION_SIZE = 3;

const choiceButton =
  "rounded-lg border border-rule bg-paper-2 px-4 py-3.5 text-left font-semibold text-ink transition hover:border-ink/40 hover:bg-paper-3 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand active:scale-[.99]";

/**
 * Trap Hunt: eight scenarios, three questions, no scheduling.
 *
 * IT USED TO BE ONE QUESTION EIGHT TIMES, which is what made it, and the two
 * modes drawing from the same bank, feel like one activity dressed three ways.
 * Three of the eight now carry a follow-up: name the skill, or point at the
 * clause. `srs/session.ts` decides which, and its header argues the one thing
 * here that is easy to get wrong, which is that the follow-up must be scattered
 * rather than ramped: only a trap can carry one, so any difficulty ramp puts the
 * traps at the end and hands a returning player the binary for free.
 *
 * WHAT MAKES IT DIFFERENT FROM A REVIEW, beyond not touching the SRS. A review
 * asks you to stake a confidence and then grades that too, because being
 * confidently wrong is the failure worth measuring on a schedule. This asks the
 * binary and moves, because the mode exists to be fast and because a stake on
 * every item eight times over is a chore rather than a game. The follow-ups are
 * not a stake: they are the next question about the same scenario, asked on the
 * paragraph already read.
 *
 * IT SHOWS THE THOUGHTLESS SCORE AT THE END, and that is not decoration. Around
 * a quarter of the bank is sound reasoning, so answering "trap" every time
 * scores about six of eight. A mode that celebrated six without saying what six
 * is worth would be teaching the exact error this deck exists to correct, on
 * the deck's own surface.
 *
 * FEEDBACK IS IMMEDIATE AND NAMED. Each answer reveals whether it was a trap
 * and which one, with the explanation, before the next scenario. Batching the
 * feedback to the end would make the round faster and teach less, and the bank
 * is a teaching instrument first.
 */
export function TrapHuntView({ onDone }: { onDone: () => void }) {
  const t = useT();
  // Every numeral this view draws goes through here before it reaches a slot.
  // A slot fills by string coercion, which is always Latin digits, so a count
  // dropped in raw stays "5" beside fully translated Bengali or Arabic text.
  const locale = useLocale();
  const nf = new Intl.NumberFormat(locale);

  // Drawn once per mount, avoiding whatever the player has seen lately.
  const first = useMemo(() => {
    const drawn = drawRound(Math.random, ROUND_SIZE, undefined, recentlySeen());
    // One clause question per round, guaranteed. See `withOneSpot` for why the
    // preference lives there and not in the shared draw.
    return planSteps(withOneSpot(drawn.items, Math.random, itemBank()), Math.random);
  }, []);

  /*
    ONE MORE, and it appends rather than restarting.

    The mode used to stop dead at eight with a Done button, which is a strange
    thing to do to somebody who is enjoying it. An extension keeps the same
    session: the run counts across the join, the record is written once at the
    real end, and the items already seen are excluded so the extra three are
    new. Nothing about it is scored differently, because nothing here is scored
    at all.
  */
  const [steps, setSteps] = useState(first);
  /** True once "one more" has been pressed, so the record is not counted twice. */
  const [extended, setExtended] = useState(false);
  const skills = useMemo(() => [...new Set(puzzles().map((p) => p.reasoningSkill))], []);

  const [at, setAt] = useState(0);
  const [answers, setAnswers] = useState<TrapHuntAnswer[]>([]);
  const [showing, setShowing] = useState<TrapHuntAnswer | null>(null);
  /** Which clause was tapped on the second beat, or null before one is. */
  const [picked, setPicked] = useState<number | null>(null);
  /** Which skill was named on the second beat, or null before one is. */
  const [named, setNamed] = useState<string | null>(null);
  const [saved, setSaved] = useState<{ best: number; isBest: boolean } | null>(null);

  const skillName = useMemo(
    () => (slug: string) => {
      const p = puzzles().find((x) => x.reasoningSkill === slug);
      return p ? t(p.lesson.skillName) : slug;
    },
    [t],
  );

  const step = steps[at];
  const item = step?.item;
  const done = at >= steps.length;

  /*
    The follow-up runs after the binary call, and is offered whether or not that
    call was right: a player who said "sound" has just been told otherwise, and
    being asked what kind and where is the cheapest way to show them what they
    walked past.
  */
  const followUp = showing !== null ? step?.beats[1] : undefined;
  const askingSpot = followUp === "spot" && item !== undefined && hasSpot(item);
  const askingName = followUp === "name" && item !== undefined;
  const pending =
    (askingSpot && picked === null) || (askingName && named === null);

  const join = segmentJoin(locale);
  const spotResult =
    askingSpot && picked !== null ? gradeSpot(item, picked) : null;
  /* Drawn once per item, so the four names do not reshuffle under a tapping
     finger when the component re-renders. */
  const options = useMemo(
    () => (item && isTrap(item) ? nameOptions(item, skills, Math.random) : []),
    [item, skills],
  );

  function answer(saidTrap: boolean) {
    if (!item || showing) return;
    setShowing(grade(item, saidTrap));
  }

  function next() {
    if (!showing) return;
    const all = [...answers, showing];
    setAnswers(all);
    setShowing(null);
    setPicked(null);
    setNamed(null);
    const nextAt = at + 1;
    setAt(nextAt);
    if (nextAt >= steps.length) {
      // Recorded at the end, so an abandoned round costs nothing and cannot
      // inflate the count. An extension records again to keep the best run and
      // the seen list current, but says it is a continuation so one sitting is
      // never counted twice.
      const { stats, isBest } = recordRound(
        longestRun(all),
        steps.map((s) => s.item.id),
        undefined,
        { continued: extended },
      );
      setSaved({ best: stats.bestRun, isBest });
    }
  }

  /**
   * Three more items, appended, drawn away from everything already in play.
   *
   * The plan is rebuilt over the new items alone, so the extension carries its
   * own follow-up rather than inheriting a beat from the items behind it.
   */
  function oneMore() {
    const seen = new Set([...recentlySeen(), ...steps.map((s) => s.item.id)]);
    const drawn = drawRound(Math.random, EXTENSION_SIZE, undefined, seen);
    const more = planSteps(
      withOneSpot(drawn.items, Math.random, itemBank()),
      Math.random,
      1,
    );
    setSteps([...steps, ...more]);
    setExtended(true);
    setSaved(null);
  }

  if (done) {
    const run = longestRun(answers);
    const right = answers.filter((a) => a.correct).length;
    const thoughtless = alwaysTrapScore(steps.map((s) => s.item));
    return (
      <section className="flex flex-col gap-4">
        <header className="flex flex-col gap-2">
          <Badge tone="brand">{t({ en: "Trap Hunt" })}</Badge>
          {/*
            This round's run, labelled as this round's run. It read "Best run"
            while showing the same number, so a player whose record was eight
            finished a run of three and was told their best was three, with "A
            new personal best" sitting underneath deciding whether to appear.
            The record itself was computed, stored, and never drawn.
          */}
          <h2 className="font-display text-[28px] font-semibold leading-[1.05] text-ink">
            {fillSlots(t({ en: "Longest run: {run}" }), { run: nf.format(run) })}
          </h2>
          <p className="text-[15px] text-ink-soft">
            {fillSlots(t({ en: "{right} of {total} called correctly." }), {
              right: nf.format(right),
              total: nf.format(answers.length),
            })}{" "}
            {saved === null
              ? null
              : saved.isBest
                ? t({ en: "A new personal best." })
                : fillSlots(t({ en: "Your best is {best}." }), {
                    best: nf.format(saved.best),
                  })}
          </p>
          <p className="text-[13px] leading-snug text-ink-soft">
            {/*
              The honest comparison. Without it a mode about spotting traps
              would quietly reward the habit of seeing them everywhere.
            */}
            {fillSlots(
              t({
                en: "Answering trap every time would have scored {n} on this round.",
              }),
              { n: nf.format(thoughtless) },
            )}
          </p>
        </header>

        <ol className="flex flex-col gap-3">
          {steps.map(({ item: it }, i) => {
            const res = answers[i];
            return (
              <li key={it.id} className="rounded-lg border border-rule bg-paper-2 p-3">
                <div className="mb-1 flex items-center gap-2">
                  <span>{res?.correct ? "✅" : "❌"}</span>
                  <span className="font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
                    {it.trap === null
                      ? t({ en: "Sound reasoning" })
                      : skillName(it.trap)}
                  </span>
                </div>
                <p className="text-[13px] leading-snug text-ink-soft">
                  {t(it.explanation)}
                </p>
              </li>
            );
          })}
        </ol>

        <div className="grid gap-2">
          <Button onClick={oneMore}>{t({ en: "One more" })}</Button>
          <Button variant="ghost" onClick={onDone}>
            {t({ en: "Done" })}
          </Button>
        </div>
      </section>
    );
  }

  if (!item) return null;

  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-col gap-2">
        <Badge tone="brand">{t({ en: "Trap Hunt" })}</Badge>
        <p className="font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
          {fillSlots(t({ en: "{at} of {total}" }), {
            at: nf.format(at + 1),
            total: nf.format(steps.length),
          })}
        </p>
        <p className="text-[15px] text-ink-soft">
          {t({ en: "Does this reasoning fall for something?" })}
        </p>
      </header>

      {/*
        THE SCENARIO IS THE SAME TEXT IN BOTH BEATS, and becoming tappable is
        the only thing that changes. A second beat that reprinted the paragraph
        somewhere else would make a player read it twice; keeping it in place
        means the clause question costs no reading at all, which is the whole
        argument for putting it here rather than in a mode of its own.
      */}
      <div key={item.id} className="cf-enter-sm rounded-lg border border-rule bg-paper-2 p-4">
        {askingSpot ? (
          <p className="text-[15px] leading-relaxed text-ink">
            {item.spot.segments.map((seg, i) => (
              <span key={i}>
                {i > 0 ? join : null}
                <button
                  type="button"
                  onClick={() => setPicked(i)}
                  className={segmentButton(
                    picked === null ? null : i === item.spot!.tell ? "tell" : picked === i ? "wrong" : null,
                  )}
                >
                  {t(seg)}
                </button>
              </span>
            ))}
          </p>
        ) : (
          <p className="text-[15px] leading-relaxed text-ink">{t(item.scenario)}</p>
        )}
      </div>

      {showing ? (
        <div className="flex flex-col gap-3">
          <div className="rounded-lg border border-rule bg-paper-2 p-3">
            <div className="mb-1 flex items-center gap-2">
              <span>{showing.correct ? "✅" : "❌"}</span>
              <span className="font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
                {isTrap(item) ? skillName(item.trap!) : t({ en: "Sound reasoning" })}
              </span>
            </div>
            {/*
              THE EXPLANATION IS HELD BACK WHILE THE CLAUSE QUESTION IS OPEN,
              and this was found by playing it rather than by reasoning about
              it. The explanation names the clause almost verbatim, so showing
              it first turned the second beat into a copying exercise: the
              answer was on screen, three lines above the thing being asked.
              The verdict and the skill name still show, because those are what
              the first beat earned and because knowing WHAT KIND of flaw it is
              does not tell you which sentence carries it.
            */}
            {pending ? null : (
              <p className="text-[13px] leading-snug text-ink-soft">
                {t(item.explanation)}
              </p>
            )}
          </div>

          {askingSpot && picked === null ? (
            <p className="text-[15px] text-ink-soft">
              {t({ en: "Now point at it. Which part does the damage?" })}
            </p>
          ) : null}

          {askingName && named === null ? (
            <div className="flex flex-col gap-2">
              <p className="text-[15px] text-ink-soft">
                {t({ en: "Now name it. What does it fall for?" })}
              </p>
              <div className="grid gap-2">
                {options.map((slug) => (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => setNamed(slug)}
                    className={choiceButton}
                  >
                    {skillName(slug)}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {askingName && named !== null ? (
            <div className="cf-enter-sm rounded-lg border border-rule bg-paper-2 p-3">
              <div className="flex items-center gap-2">
                <span>{gradeName(item, named) ? "✅" : "❌"}</span>
                <span className="font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
                  {gradeName(item, named)
                    ? t({ en: "Named it" })
                    : fillSlots(t({ en: "It falls for {skill}." }), {
                        skill: skillName(item.trap!),
                      })}
                </span>
              </div>
            </div>
          ) : null}

          {askingSpot && spotResult !== null ? (
            <div className="cf-enter-sm rounded-lg border border-rule bg-paper-2 p-3">
              <div className="mb-1 flex items-center gap-2">
                <span>{spotResult.correct ? "✅" : "❌"}</span>
                <span className="font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
                  {spotResult.correct
                    ? t({ en: "That is the one" })
                    : t({ en: "The highlighted clause is the one" })}
                </span>
              </div>
              <p className="text-[13px] leading-snug text-ink-soft">{t(item.spot!.why)}</p>
            </div>
          ) : null}

          {pending ? null : (
            <Button onClick={next}>
              {at + 1 >= steps.length
                ? t({ en: "See the round" })
                : t({ en: "Next" })}
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-2">
          <button type="button" onClick={() => answer(true)} className={choiceButton}>
            {t({ en: "Yes, it falls for something" })}
          </button>
          <button type="button" onClick={() => answer(false)} className={choiceButton}>
            {t({ en: "No, the reasoning is sound" })}
          </button>
        </div>
      )}
    </section>
  );
}
