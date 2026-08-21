import { useEffect, useMemo, useState } from "react";
import { useT } from "../../../app/i18n";
import { type WeaponId } from "./content";
import { WEAPON_COLOR } from "./palette";
import { useNumbers } from "./format";
import { WeaponIcon } from "./WeaponIcon";
import {
  decisionStudyByArm,
  decisionToAskAbout,
  pairedGain,
  summarise,
  type CounterfactualStudy,
  type Decision,
  type RunLog,
} from "./replay";

/**
 * The commit, then the reveal. The same two beats every puzzle in this app
 * already has, arrived at here from a completely different direction.
 *
 * IT ASKS ABOUT A DECISION THE PLAYER MADE, and that is a change of subject
 * rather than a change of wording.
 *
 * The screen used to ask which weapon you could least afford to lose, and
 * answer it by re-running the game with each weapon removed. That question is
 * clean and honestly measured and NOBODY CAN ACT ON IT: nothing in the game
 * lets a player remove a weapon. The only lever they have is which of three
 * cards they take at a level up. Measured headless, the two answers are not the
 * same answer: ice costs about two minutes to remove and pouring levels into it
 * loses. So the game was demonstrating a lesson about a quantity nobody
 * controls, while the quantity they do control was one the damage meter
 * predicts perfectly well, and there was no lesson left in the loop at all.
 *
 * So the reveal now replays the run with ONE card changed, and the three arms
 * are the three cards that were actually on the table. Everything before that
 * moment is identical and everything after it is the consequence.
 *
 * NOTHING HERE SAYS YOU WERE WRONG. The card the player took is outlined and
 * the numbers sit beside it. If those disagree, the screen has said what it
 * needs to; saying it aloud would be the game explaining its own joke.
 */

/** How many worlds each card is measured in. */
const SEEDS = 9;

type Phase =
  | { at: "ask"; decision: Decision; index: number }
  | { at: "working"; done: number; total: number }
  | { at: "seen" };

export function DeathScreen({ log, onAgain }: { log: RunLog; onAgain: () => void }) {
  const t = useT();
  const n = useNumbers();
  const index = useMemo(() => decisionToAskAbout(log), [log]);
  const [phase, setPhase] = useState<Phase>(() =>
    index === null
      ? { at: "seen" }
      : { at: "ask", decision: log.upgrades[index]!, index },
  );
  const [pick, setPick] = useState<WeaponId | null>(null);
  const [study, setStudy] = useState<(CounterfactualStudy & { decision: Decision }) | null>(null);

  // One arm at a time on timeouts. Four arms over nine worlds is seconds of
  // arithmetic and it lands while somebody is looking at the screen, so it
  // cannot be a single synchronous call.
  useEffect(() => {
    if (pick === null || index === null) return;
    let cancelled = false;
    const it = decisionStudyByArm(log, index, SEEDS);
    const pump = () => {
      if (cancelled) return;
      const next = it.next();
      if (next.done === true) {
        setStudy(next.value);
        setPhase({ at: "seen" });
        return;
      }
      setPhase({ at: "working", done: next.value.done, total: next.value.total });
      setTimeout(pump, 0);
    };
    setTimeout(pump, 0);
    return () => {
      cancelled = true;
    };
  }, [pick, log, index]);

  const rows = useMemo(() => {
    if (study === null) return [];
    return study.arms
      .map((a) => ({
        id: a.weapon!,
        summary: summarise(a),
        gain: pairedGain(study.baseline, a),
      }))
      .sort((p, q) => q.gain - p.gain);
  }, [study]);

  if (phase.at === "ask") {
    return (
      <Sheet>
        <p className="text-center text-[0.6rem] tracking-[0.18em] text-slate-400 uppercase">
          {n.clock(phase.decision.tick)}
        </p>
        <p className="mt-2 text-center text-base leading-snug text-slate-100">
          {t({ en: "Which of these was worth most?" })}
        </p>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {phase.decision.offers.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setPick(id)}
              className={`flex flex-col items-center gap-2 rounded-md border bg-slate-900/70 px-2 py-4 active:bg-slate-800 ${
                id === phase.decision.chosen ? "border-slate-400" : "border-slate-700"
              }`}
            >
              <WeaponIcon id={id} size={34} />
              {/* The one the player took, marked so the question is about a
                  moment they remember rather than three abstract colours. */}
              <span className="h-1 w-1 rounded-full bg-slate-400" style={{
                opacity: id === phase.decision.chosen ? 1 : 0,
              }} aria-hidden />
            </button>
          ))}
        </div>
      </Sheet>
    );
  }

  if (phase.at === "working") {
    return (
      <Sheet>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full bg-slate-300 transition-[width] duration-200"
            style={{ width: `${Math.round((phase.done / phase.total) * 100)}%` }}
          />
        </div>
      </Sheet>
    );
  }

  const longest = Math.max(...rows.map((r) => r.summary.high), study?.actual ?? 1, 1);

  return (
    <Sheet>
      <div className="flex items-baseline justify-between gap-3 border-b border-slate-700 pb-2">
        <span className="text-[0.6rem] tracking-[0.18em] text-slate-400 uppercase">
          {t({ en: "Your run" })}
        </span>
        <span className="text-sm text-slate-100 tabular-nums">{n.clock(study?.actual ?? 0)}</span>
      </div>

      <ul className="mt-3 flex flex-col gap-2">
        {rows.map((r) => (
          <li key={r.id} className="flex items-center gap-2">
            <span
              className={`flex-none rounded-sm ${
                r.id === pick ? "ring-2 ring-white ring-offset-1 ring-offset-slate-900" : ""
              }`}
            >
              <WeaponIcon id={r.id} size={18} />
            </span>
            <span className="relative h-3 flex-1 overflow-hidden rounded-sm bg-slate-800">
              <span
                className="absolute inset-y-0 left-0"
                style={{
                  width: `${(r.summary.low / longest) * 100}%`,
                  background: WEAPON_COLOR[r.id],
                }}
              />
              {/* The soft end is the spread across worlds. One replay is one
                  sample, and drawing a hard edge on it would be the error this
                  whole project exists to point at. */}
              <span
                className="absolute inset-y-0"
                style={{
                  left: `${(r.summary.low / longest) * 100}%`,
                  width: `${((r.summary.high - r.summary.low) / longest) * 100}%`,
                  background: WEAPON_COLOR[r.id],
                  opacity: 0.3,
                }}
              />
            </span>
            <span className="w-14 flex-none text-right text-xs text-slate-200 tabular-nums">
              {r.summary.medianCensored ? "≥ " : ""}
              {n.clock(r.summary.median)}
            </span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onAgain}
        className="mt-5 w-full rounded-md bg-slate-100 py-2.5 text-sm font-medium text-slate-900 active:bg-white"
      >
        {t({ en: "Play again" })}
      </button>
    </Sheet>
  );
}

function Sheet({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-xl border border-slate-700 bg-slate-950/95 p-4">
        {children}
      </div>
    </div>
  );
}
