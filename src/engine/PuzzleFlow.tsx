import { useEffect, useState } from "react";
import type { Choice, Puzzle } from "../puzzles/schema";
import { track } from "../app/analytics";
import { recordPlay, getStats, markLearned } from "../app/session";
import { sendAnswer } from "../app/answerStats";
import { reviews } from "../app/reviews";
import { ProgressDots } from "./ui";
import { SetupView } from "./SetupView";
import { RevealView } from "./RevealView";
import { LessonView } from "./LessonView";
import { ShareCard } from "./share/ShareCard";
import { StatsPanel } from "./StatsPanel";
import { FriendsBoard } from "./FriendsBoard";
import { puzzleNumberOf } from "../puzzles";
import { scoreFor, type Confidence } from "./scoring";

type Beat = "setup" | "reveal" | "lesson" | "share";
const ORDER: Beat[] = ["setup", "reveal", "lesson", "share"];

/**
 * The engine's beat state machine. Renders ANY puzzle from its data, it never
 * references the seed puzzle's specifics. Adding a puzzle changes nothing here.
 * Each beat is keyed so its CSS enter-animation replays on mount (see index.css);
 * reduced motion disables the animation but not the transition.
 */
export function PuzzleFlow({
  puzzle,
  onExit,
}: {
  puzzle: Puzzle;
  /** Leave the puzzle for the home screen. */
  onExit: () => void;
}) {
  const [beat, setBeat] = useState<Beat>("setup");
  const [committed, setCommitted] = useState<Choice | null>(null);
  const [confidence, setConfidence] = useState<Confidence | null>(null);
  const puzzleNo = puzzleNumberOf(puzzle.slug);

  useEffect(() => {
    track("puzzle_view", { slug: puzzle.slug });
  }, [puzzle.slug]);

  function commit(choice: Choice, wager: Confidence) {
    setCommitted(choice);
    setConfidence(wager);
    // `first` is false when the player is replaying, which they can only do
    // from the share beat, which is to say having already read the reveal.
    const { first } = recordPlay(puzzle.slug, choice.id, choice.isCorrect, wager);
    // Fire and forget, and never awaited: the reveal must not wait on the
    // network, and a failure here costs the player nothing. Sends nothing at
    // all when the player has turned contribution off.
    //
    // ONLY THE FIRST ANSWER OF THE DAY IS SENT, and that is the whole value of
    // the number. "68% picked that" is a claim about people meeting the figures
    // cold; a replay is made by somebody who has just been told the answer, so
    // counting it would drag every tally towards the correct band over time and
    // quietly convert "most people fall for this" into "most people saw
    // through this". On a deck about not overstating what data shows, a
    // self-flattering statistic assembled by accident is the worst possible
    // defect, and nothing downstream could detect it.
    if (first) sendAnswer(puzzle.slug, choice.id, wager);
    track("commit", {
      slug: puzzle.slug,
      choiceId: choice.id,
      correct: choice.isCorrect,
    });
    // `reveal_view` used to fire here, one line after `commit`, so the two
    // events were the same event and the funnel step between them was always
    // 100%. It now fires in `RevealView` when the player actually pulls the
    // lever, which makes the gap the share of people who commit and then never
    // look. Same fixed event name, a step that can now be non-trivial.
    setBeat("reveal");
  }

  function toLesson() {
    // Reaching the lesson is what counts as having been taught this bias; the
    // reviews only ever test biases the player has actually seen explained.
    markLearned(puzzle.reasoningSkill);
    // Put the skill on the spaced-repetition schedule the first time it is
    // learned. Fire and forget: a storage hiccup must not block the beat, and
    // enrolment is idempotent so a replay never disturbs progress already made.
    void reviews.enrollSkill(puzzle.reasoningSkill);
    track("lesson_view", { slug: puzzle.slug });
    setBeat("lesson");
  }

  function toShare() {
    track("share_open", { slug: puzzle.slug });
    setBeat("share");
  }

  function replay() {
    setCommitted(null);
    setConfidence(null);
    track("puzzle_view", { slug: puzzle.slug });
    setBeat("setup");
  }

  const index = ORDER.indexOf(beat);

  return (
    <div className="flex flex-col gap-4">
      <ProgressDots total={ORDER.length} index={index} />
      <div key={beat} className="cf-enter">
        {beat === "setup" && <SetupView puzzle={puzzle} onCommit={commit} />}
        {beat === "reveal" && committed && confidence && (
          <RevealView
            puzzle={puzzle}
            committed={committed}
            confidence={confidence}
            onNext={toLesson}
          />
        )}
        {beat === "lesson" && (
          <LessonView puzzle={puzzle} onNext={toShare} onHome={onExit} />
        )}
        {beat === "share" && committed && confidence && (
          <div className="flex flex-col gap-4">
            <StatsPanel
              slug={puzzle.slug}
              todayScore={scoreFor(committed.isCorrect, confidence)}
            />
            {/*
              No number, no board. `puzzleNumberOf` cannot miss for a puzzle
              that came out of the registry, but the alternative to this guard
              was `?? 0`, which would have shipped a line reading "Confoundle
              #0" and a board grouping every unnumbered result together. A
              share surface that is wrong is worse than one that is absent.
            */}
            {puzzleNo === undefined ? null : (
              <FriendsBoard
                puzzleNo={puzzleNo}
                today={{
                  caught: committed.isCorrect,
                  score: scoreFor(committed.isCorrect, confidence),
                  streak: getStats().currentStreak,
                }}
              />
            )}
            <ShareCard
              puzzle={puzzle}
              committed={committed}
              onReplay={replay}
              onHome={onExit}
            />
          </div>
        )}
      </div>
    </div>
  );
}
