import { useState } from "react";
import { useT } from "../app/i18n";
import {
  addFriendResults,
  getFriendsBoard,
  getNickname,
  setNickname,
  type BoardRow,
} from "../app/session";
import { appUrl } from "../app/shareLinks";
import { buildResultLine, parseResults } from "./result";

interface TodayResult {
  caught: boolean;
  score: number;
  streak: number;
}

/**
 * Zero-backend friends leaderboard. Your result is a spoiler-free line you copy
 * into a group chat; paste friends' lines back and it tallies a local board.
 * Nothing leaves the device and no account is needed, just a nickname.
 */
export function FriendsBoard({
  puzzleNo,
  today,
}: {
  /**
   * Which card this is, one-based in registry order. Passed in rather than
   * derived here, because the board's whole job is to group results that faced
   * the same puzzle and it must not be able to disagree with the beat it sits
   * under.
   */
  puzzleNo: number;
  today: TodayResult;
}) {
  const t = useT();
  const [name, setName] = useState(getNickname());
  const [paste, setPaste] = useState("");
  const [copied, setCopied] = useState(false);
  const [tick, setTick] = useState(0);

  const me = name.trim() || "You";
  const myLine = buildResultLine({ name: me, puzzleNo, ...today });

  // Self is shown live; the store holds only friends' pasted results.
  void tick;
  const friends = getFriendsBoard(puzzleNo).filter((r) => r.name !== me);
  const rows: (BoardRow & { self?: boolean })[] = [
    { name: me, self: true, ...today },
    ...friends,
  ].sort(
    (a, b) =>
      b.score - a.score || b.streak - a.streak || a.name.localeCompare(b.name),
  );

  function saveName(v: string) {
    setName(v);
    setNickname(v);
  }

  function copy() {
    navigator.clipboard
      ?.writeText(myLine)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {});
  }

  function share() {
    /*
      This was hardcoded to `https://confoundle.pages.dev`, the preview host,
      and it was the ONLY URL anywhere in any share path in the app. So the one
      link the product emitted sent people to a deployment that is not the
      canonical domain. Reading the live origin fixes it and keeps fixing it:
      the address can now never drift from wherever the app is actually served.

      The front door rather than a puzzle link, because a result line is about
      the day rather than about one card, and because the line is deliberately
      spoiler-free.
    */
    const text = `${myLine}\n${appUrl(window.location.origin)}`;
    if (navigator.share) {
      navigator.share({ text }).catch(() => {});
    } else {
      copy();
    }
  }

  function addFriends() {
    const parsed = parseResults(paste).filter((r) => r.puzzleNo === puzzleNo);
    if (parsed.length > 0) {
      addFriendResults(parsed);
      setPaste("");
      setTick((n) => n + 1);
    }
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-rule bg-paper-2 p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
          {t({ en: "Friends board" })}
        </span>
        <input
          value={name}
          onChange={(e) => saveName(e.target.value)}
          placeholder={t({ en: "Your name" })}
          maxLength={24}
          className="w-28 rounded-md border border-rule bg-paper px-2 py-1 text-right font-sans text-[12px] font-semibold text-ink placeholder:text-ink-mute focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
        />
      </div>

      <div className="rounded-md border border-rule bg-paper px-3 py-2 font-sans text-[13px] text-ink">
        {myLine}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={copy}
          className="rounded-lg bg-ink px-3 py-2 font-sans text-[13px] font-semibold text-paper transition hover:bg-ink/90 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand active:scale-[.98]"
        >
          {copied ? t({ en: "Copied" }) : t({ en: "Copy result" })}
        </button>
        <button
          type="button"
          onClick={share}
          className="rounded-lg border border-rule bg-paper px-3 py-2 font-sans text-[13px] font-semibold text-ink transition hover:bg-paper-3 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand active:scale-[.98]"
        >
          {t({ en: "Share" })}
        </button>
      </div>

      <ol className="flex flex-col divide-y divide-rule">
        {rows.map((r, i) => (
          <li
            key={r.name}
            className={
              "flex items-center gap-2 py-1.5 text-[13px] " +
              (r.self ? "font-semibold text-ink" : "text-ink-soft")
            }
          >
            <span className="w-4 tabular-nums text-ink-mute">{i + 1}</span>
            <span className="w-4">{r.caught ? "🎯" : "🫠"}</span>
            <span className="min-w-0 flex-1 truncate">{r.name}</span>
            <span className="tabular-nums">🔥{r.streak}</span>
            <span className="w-12 text-right font-semibold tabular-nums text-ink">
              {r.score >= 0 ? `+${r.score}` : r.score}
            </span>
          </li>
        ))}
      </ol>

      <div className="flex flex-col gap-2 border-t border-rule pt-2.5">
        <textarea
          value={paste}
          onChange={(e) => setPaste(e.target.value)}
          rows={2}
          placeholder={t({ en: "Paste your friends' results here" })}
          className="resize-none rounded-md border border-rule bg-paper px-3 py-2 font-sans text-[12px] text-ink placeholder:text-ink-mute focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
        />
        <button
          type="button"
          onClick={addFriends}
          disabled={parseResults(paste).length === 0}
          className="self-end rounded-lg border border-rule bg-paper px-3 py-1.5 font-sans text-[12px] font-semibold text-ink transition enabled:hover:bg-paper-3 disabled:opacity-40 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
        >
          {t({ en: "Add to board" })}
        </button>
      </div>
    </div>
  );
}
