import { useEffect, useMemo, useState } from "react";
import { useT } from "../../../app/i18n";
import { WEAPON_IDS, type WeaponId } from "./content";
import { WEAPON_COLOR } from "./render";
import { useNumbers } from "./format";
import {
  pairedLoss,
  studyByArm,
  summarise,
  type CounterfactualStudy,
  type RunLog,
} from "./replay";

/**
 * The commit, then the reveal. The same two beats every puzzle in this app
 * already has, arrived at from a completely different direction.
 *
 * THE QUESTION IS "WHICH COULD YOU LEAST AFFORD TO LOSE", not "which was
 * keeping you alive". The second implies there is one, and with specialised
 * weapons there usually is not: ice buys time, the knife handles whatever
 * reaches you, poison is the only answer to a brute, and pulling any of them
 * hurts. Asking which one, when the honest answer is three, would mark a
 * player wrong for reasoning correctly. "Least afford to lose" asks for the
 * largest gap, which is exactly what the bars below measure.
 *
 * NOTHING HERE SAYS YOU WERE WRONG. The player's pick is outlined and the
 * numbers are printed beside it. If those two disagree, the screen has said
 * everything it needs to and saying it out loud would be the game explaining
 * its own joke.
 *
 * The bars run the other way from the meter: they show how long the same run
 * lasted WITHOUT each weapon, so the shortest bar is the biggest loss. The
 * soft end on each is the spread across seeds, and it is there because a
 * single replay is a single sample and printing it as a fact would be the
 * error this whole project exists to point at.
 */

/** How many worlds each arm is measured in. */
const SEEDS = 9;

type Phase = { at: "ask" } | { at: "working"; done: number; total: number } | { at: "seen" };

export function DeathScreen({
  log,
  onAgain,
}: {
  log: RunLog;
  onAgain: () => void;
}) {
  const t = useT();
  const n = useNumbers();
  const [phase, setPhase] = useState<Phase>({ at: "ask" });
  const [pick, setPick] = useState<WeaponId | null>(null);
  const [study, setStudy] = useState<CounterfactualStudy | null>(null);

  // Run the arms one at a time on timeouts. Seven arms over nine seeds is
  // seconds of arithmetic, and it lands exactly when the player is looking at
  // the screen, so it cannot be one synchronous call.
  useEffect(() => {
    if (pick === null) return;
    let cancelled = false;
    const it = studyByArm(log, SEEDS);
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
  }, [pick, log]);

  const rows = useMemo(() => {
    if (study === null) return [];
    return WEAPON_IDS.map((id) => {
      const a = study.arms.find((x) => x.without === id)!;
      return { id, arm: a, summary: summarise(a), loss: pairedLoss(study.baseline, a) };
    }).sort((p, q) => q.loss - p.loss);
  }, [study]);

  if (phase.at === "ask") {
    return (
      <Sheet>
        <p className="text-center text-base leading-snug text-slate-100">
          {t({ en: "Which one could you least afford to lose?" })}
        </p>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {WEAPON_IDS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setPick(id)}
              className="flex flex-col items-center gap-2 rounded-md border border-slate-700 bg-slate-900/70 px-2 py-3 active:bg-slate-800"
            >
              <span
                className="h-6 w-6 rounded-sm"
                style={{ background: WEAPON_COLOR[id] }}
                aria-hidden
              />
              <span className="text-[0.6rem] text-slate-500 tabular-nums">
                {n.int(log.upgrades.filter((u) => u === id).length)}
              </span>
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

  const longest = Math.max(
    ...rows.map((r) => r.summary.high),
    study?.actual ?? 1,
    1,
  );

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
              className={`h-4 w-4 flex-none rounded-sm ${
                r.id === pick ? "ring-2 ring-white ring-offset-1 ring-offset-slate-900" : ""
              }`}
              style={{ background: WEAPON_COLOR[r.id] }}
              aria-hidden
            />
            <span className="relative h-3 flex-1 overflow-hidden rounded-sm bg-slate-800">
              <span
                className="absolute inset-y-0 left-0"
                style={{
                  width: `${(r.summary.low / longest) * 100}%`,
                  background: WEAPON_COLOR[r.id],
                }}
              />
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
