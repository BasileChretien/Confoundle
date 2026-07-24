import { useEffect, useMemo, useRef, useState } from "react";
import { useT } from "../app/i18n";
import { useAuth } from "../app/auth";
import { reviews, gradeReview, type ReviewResult } from "../app/reviews";
import { recordReviewOutcomes } from "../app/session";
import { puzzles } from "../puzzles";
import type { Review } from "../srs/select";
import { CONFIDENCE_LEVELS, reactionFor, type Confidence } from "./scoring";
import { Badge, Button, ProgressDots } from "./ui";

/**
 * A spaced-repetition review session.
 *
 * This is what an account was always for. The scheduler decides which skills
 * are due; each review draws a fresh scenario for one of them, a trap for that
 * skill or a sound decoy, and asks the one question that matters: does this
 * reasoning fall for the skill, or is it fine? A wager is taken before the
 * answer is graded, because being confidently wrong is the exact failure this
 * whole project exists to catch, and the ladder weights it accordingly.
 *
 * Unlike a puzzle, nothing here names the trap or telegraphs it. The skill is
 * named as context ("you learned X, is this an instance of it?"), which is the
 * transfer test: recognising a bias in the wild, not reciting it.
 */

type Phase = "answer" | "wager" | "reveal";

const CONFIDENCE_LABEL: Record<Confidence, { en: string }> = {
  hunch: { en: "Hunch" },
  sure: { en: "Fairly sure" },
  certain: { en: "Certain" },
};

const choiceButton =
  "rounded-lg border border-rule bg-paper-2 px-4 py-3.5 text-left font-semibold text-ink transition hover:border-ink/40 hover:bg-paper-3 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand active:scale-[.99]";

export function ReviewView({
  seed,
  onDone,
  practice = false,
}: {
  seed: number;
  onDone: () => void;
  /** Practice draws from every learned skill and does not move the ladder. */
  practice?: boolean;
}) {
  const t = useT();
  const auth = useAuth();

  const [session, setSession] = useState<Review[] | null>(null);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("answer");
  const [saidItFalls, setSaidItFalls] = useState<boolean | null>(null);
  const [results, setResults] = useState<ReviewResult[]>([]);

  // Build the session once, from whatever the scheduler says is due.
  useEffect(() => {
    let alive = true;
    const build = practice ? reviews.practiceSession(seed) : reviews.nextSession(seed);
    void build.then((s) => {
      if (alive) setSession(s);
    });
    return () => {
      alive = false;
    };
  }, [seed, practice]);

  const skillName = useMemo(
    () => (slug: string) => {
      const p = puzzles.find((x) => x.reasoningSkill === slug);
      return p ? t(p.lesson.skillName) : slug;
    },
    [t],
  );

  const done = session != null && index >= session.length;

  // Persist and sync exactly once, when the session finishes.
  const recorded = useRef(false);
  useEffect(() => {
    if (done && !recorded.current) {
      recorded.current = true;
      // Two stores, deliberately: the ladder (synced to an account) and the
      // local streak/calibration record, which is what makes a review count
      // for anything the learner can see.
      recordReviewOutcomes(results);
      const persist = practice
        ? reviews.recordPractice(results)
        : reviews.recordReviews(results);
      void persist.then(() => auth.syncProgress());
    }
  }, [done, results, auth, practice]);

  if (session == null) {
    return (
      <section className="flex flex-col gap-4">
        <Badge tone="brand">{t({ en: "Review" })}</Badge>
        <p className="text-[15px] text-ink-soft">{t({ en: "Loading your review…" })}</p>
      </section>
    );
  }

  if (session.length === 0) {
    return (
      <section className="flex flex-col gap-4">
        <Badge tone="brand">{t({ en: "Review" })}</Badge>
        <p className="text-[15px] text-ink-soft">
          {t({ en: "Nothing is due right now. Learn a puzzle or come back later." })}
        </p>
        <Button onClick={onDone}>{t({ en: "Done" })}</Button>
      </section>
    );
  }

  if (done) {
    const correctCount = results.filter((r) => r.correct).length;
    return (
      <section className="flex flex-col gap-4">
        <header className="flex flex-col gap-2">
          <Badge tone="brand">{t({ en: "Review" })}</Badge>
          <h2 className="font-display text-[28px] font-semibold leading-[1.05] text-ink">
            {correctCount} / {results.length}
          </h2>
          <p className="text-[15px] text-ink-soft">
            {auth.status === "signed-in"
              ? t({ en: "Saved, and synced to your account." })
              : t({ en: "Saved on this device." })}
          </p>
        </header>

        <ol className="flex flex-col gap-3">
          {session.map((review, i) => {
            const res = results[i];
            const ok = res?.correct;
            return (
              <li key={review.item.id} className="rounded-lg border border-rule bg-paper-2 p-3">
                <div className="mb-1 flex items-center gap-2">
                  <span>{ok ? "✅" : "❌"}</span>
                  <span className="font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
                    {review.item.trap === null
                      ? t({ en: "Sound reasoning" })
                      : skillName(review.skill)}
                  </span>
                </div>
                <p className="text-[13px] leading-snug text-ink-soft">
                  {t(review.item.explanation)}
                </p>
              </li>
            );
          })}
        </ol>

        <Button onClick={onDone}>{t({ en: "Done" })}</Button>
      </section>
    );
  }

  const review = session[index];

  function answer(falls: boolean) {
    setSaidItFalls(falls);
    setPhase("wager");
  }

  function wager(confidence: Confidence) {
    const correct = gradeReview(review, saidItFalls ?? false);
    setResults((prev) => [
      ...prev,
      { skill: review.skill, itemId: review.item.id, correct, confidence },
    ]);
    setPhase("reveal");
  }

  function next() {
    setSaidItFalls(null);
    setPhase("answer");
    setIndex((i) => i + 1);
  }

  const current = results[index];

  return (
    <section className="flex flex-col gap-4">
      <ProgressDots total={session.length} index={index} />
      <header className="flex flex-col gap-1.5">
        <Badge tone="brand">{t({ en: "Review" })}</Badge>
        <p className="font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
          {t({ en: "Does this fall for" })} {skillName(review.skill)}?
        </p>
      </header>

      <div key={review.item.id} className="cf-enter-sm rounded-lg border border-rule bg-paper-2 p-4">
        <p className="text-[15px] leading-relaxed text-ink">{t(review.item.scenario)}</p>
      </div>

      {phase === "answer" ? (
        <div className="grid gap-2">
          <button type="button" onClick={() => answer(true)} className={choiceButton}>
            {t({ en: "Yes, it falls for it" })}
          </button>
          <button type="button" onClick={() => answer(false)} className={choiceButton}>
            {t({ en: "No, the reasoning is sound" })}
          </button>
        </div>
      ) : null}

      {phase === "wager" ? (
        <div className="flex flex-col gap-2">
          <span className="text-center font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
            {t({ en: "How sure are you?" })}
          </span>
          <div className="grid grid-cols-3 gap-2">
            {CONFIDENCE_LEVELS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => wager(c)}
                className="rounded-lg border border-rule bg-paper-2 px-2 py-3 text-center text-[13px] font-semibold text-ink transition hover:border-ink/40 hover:bg-paper-3 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand active:scale-[.99]"
              >
                {t(CONFIDENCE_LABEL[c])}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {phase === "reveal" && current ? (
        <div className="flex flex-col gap-3">
          <div
            className={
              "rounded-lg border-l-4 p-3.5 " +
              (current.correct
                ? "border-l-brand bg-brand/[0.06]"
                : "border-l-rust bg-rust/[0.06]")
            }
          >
            <p className="font-display text-base font-semibold text-ink">
              {current.correct ? t({ en: "Right." }) : t({ en: "Not this time." })}{" "}
              {t({ en: reactionFor(current.correct, current.confidence) })}
            </p>
            <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">
              {t(review.item.explanation)}
            </p>
          </div>
          <Button onClick={next}>
            {index + 1 < session.length ? t({ en: "Next" }) : t({ en: "See your score" })}
          </Button>
        </div>
      ) : null}
    </section>
  );
}
