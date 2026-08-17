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
  /** Leave the puzzle for the home screen (which carries the dashboard). */
  onExit: () => void;
}) {
  const [beat, setBeat] = useState<Beat>("setup");
  const [committed, setCommitted] = useState<Choice | null>(null);
  const [confidence, setConfidence] = useState<Confidence | null>(null);

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
    track("reveal_view", { slug: puzzle.slug });
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
            <StatsPanel todayScore={scoreFor(committed.isCorrect, confidence)} />
            <FriendsBoard
              today={{
                caught: committed.isCorrect,
                score: scoreFor(committed.isCorrect, confidence),
                streak: getStats().currentStreak,
              }}
            />
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
