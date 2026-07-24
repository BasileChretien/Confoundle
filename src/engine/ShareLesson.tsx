import { useState } from "react";
import type { Puzzle } from "../puzzles/schema";
import { useLocale, useT } from "../app/i18n";
import { lessonPath } from "../server/lessonPage";
import { LESSON_SHARE } from "../app/ui";

/**
 * Hand the explanation to somebody else.
 *
 * This is a different job from the share card, which is a picture of your own
 * result and is made to be posted after playing. This is for the argument case:
 * someone is making a claim with a named flaw in it, and you want to send the
 * explanation rather than retype it. So it copies a link to the prerendered
 * lesson page, not to the puzzle, because a puzzle arriving from an opponent
 * reads as a trap rather than as an explanation.
 *
 * The link goes to the reader's current language, since the person being sent
 * it is usually in the same conversation, and therefore usually reading the
 * same language.
 */
export function ShareLesson({ puzzle }: { puzzle: Puzzle }) {
  const t = useT();
  const locale = useLocale();
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  const url = `${window.location.origin}${lessonPath(puzzle.slug, locale)}`;
  // Skill name, the portable rule, then the link. That order survives being
  // pasted into a thread where nobody clicks anything.
  const text = `${t(puzzle.lesson.skillName)}: ${t(puzzle.lesson.takeaway)}\n\n${url}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      // Clipboard access can be refused outright (insecure context, permission,
      // an older browser). Show the link so it can still be copied by hand.
      setState("failed");
    }
  }

  return (
    <div className="flex flex-col gap-1.5 rounded-lg border border-rule bg-paper-2 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-sans text-[11px] leading-snug text-ink-soft">
          {t(LESSON_SHARE.blurb)}
        </span>
        <button
          type="button"
          onClick={() => void copy()}
          className="shrink-0 rounded-md border border-rule bg-paper px-3 py-1.5 font-sans text-[12px] font-semibold text-ink transition hover:bg-paper-3 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
        >
          {t(state === "copied" ? LESSON_SHARE.copied : LESSON_SHARE.copy)}
        </button>
      </div>
      {state === "failed" ? (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="break-all font-sans text-[11px] text-brand-ink underline underline-offset-2"
        >
          {url}
        </a>
      ) : null}
    </div>
  );
}
