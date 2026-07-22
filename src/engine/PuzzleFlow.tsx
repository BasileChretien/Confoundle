import { useEffect, useState } from "react";
import type { Choice, Puzzle } from "../puzzles/schema";
import { track } from "../app/analytics";
import { recordPlay } from "../app/session";
import { ProgressDots } from "./ui";
import { SetupView } from "./SetupView";
import { RevealView } from "./RevealView";
import { LessonView } from "./LessonView";
import { ShareCard } from "./share/ShareCard";
import { StatsPanel } from "./StatsPanel";
import { scoreFor, type Confidence } from "./scoring";

type Beat = "setup" | "reveal" | "lesson" | "share";
const ORDER: Beat[] = ["setup", "reveal", "lesson", "share"];

/**
 * The engine's beat state machine. Renders ANY puzzle from its data, it never
 * references the seed puzzle's specifics. Adding a puzzle changes nothing here.
 * Each beat is keyed so its CSS enter-animation replays on mount (see index.css);
 * reduced motion disables the animation but not the transition.
 */
export function PuzzleFlow({ puzzle }: { puzzle: Puzzle }) {
  const [beat, setBeat] = useState<Beat>("setup");
  const [committed, setCommitted] = useState<Choice | null>(null);
  const [confidence, setConfidence] = useState<Confidence | null>(null);

  useEffect(() => {
    track("puzzle_view", { slug: puzzle.slug });
  }, [puzzle.slug]);

  function commit(choice: Choice, wager: Confidence) {
    setCommitted(choice);
    setConfidence(wager);
    recordPlay(puzzle.slug, choice.id, choice.isCorrect, wager);
    track("commit", {
      slug: puzzle.slug,
      choiceId: choice.id,
      correct: choice.isCorrect,
    });
    track("reveal_view", { slug: puzzle.slug });
    setBeat("reveal");
  }

  function toLesson() {
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
        {beat === "lesson" && <LessonView puzzle={puzzle} onNext={toShare} />}
        {beat === "share" && committed && confidence && (
          <div className="flex flex-col gap-4">
            <StatsPanel todayScore={scoreFor(committed.isCorrect, confidence)} />
            <ShareCard puzzle={puzzle} committed={committed} onReplay={replay} />
          </div>
        )}
      </div>
    </div>
  );
}
