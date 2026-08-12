import { useT } from "../../app/i18n";
import type { ProjectionData } from "../../puzzles/schema";
import { fillSlots } from "./announce";
import { colorFor } from "./palette";
import { projectionShape } from "./projections";

/**
 * Two world maps, and what people said about them.
 *
 * `asdrawn` shows the maps and nothing else, so the reader judges them the way
 * the study's participants did: by looking. `whichisexact` keeps both maps at
 * exactly the same size and position and adds what was in the data all along,
 * which projections are area-exact and how many people said each one distorted
 * area.
 *
 * The maps are precomputed outlines from public-domain geometry (see
 * `worldOutlines.ts`). They are drawn into a fixed 320 by 200 box each, so
 * neither map can appear bigger than the other and the reader is comparing the
 * shape of the distortion rather than the size of the picture.
 */
function WorldMap({
  path,
  name,
  verdict,
}: {
  path: string;
  name: string;
  verdict: { exact: boolean; label: string } | null;
}) {
  const t = useT();
  return (
    <figure className="flex min-w-0 flex-1 flex-col gap-1">
      <svg
        viewBox="0 0 320 200"
        className="w-full rounded-[3px] border border-rule bg-paper"
        role="img"
        // The verdict is a whole clause from the puzzle, so the sentence that
        // carries it is authored with the full stop in it rather than having
        // one appended: not every one of these languages ends a sentence with
        // the same mark.
        aria-label={fillSlots(
          t(
            verdict
              ? { en: "World map in the {projection} projection. {verdict}." }
              : { en: "World map in the {projection} projection" },
          ),
          { projection: name, verdict: verdict?.label ?? "" },
        )}
      >
        <path
          d={path}
          fill={
            verdict
              ? colorFor(verdict.exact ? 0 : 1)
              : "currentColor"
          }
          className={verdict ? undefined : "text-ink-mute"}
        />
      </svg>
      <figcaption className="flex flex-col gap-0.5">
        <span className="text-[10px] font-semibold leading-none text-ink-soft">
          {name}
        </span>
        {verdict ? (
          <span
            className="text-[9px] leading-tight"
            style={{ color: colorFor(verdict.exact ? 0 : 1) }}
          >
            {verdict.label}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}

export function ProjectionView({
  data,
  kind,
}: {
  data: ProjectionData;
  kind: "asdrawn" | "whichisexact";
}) {
  const t = useT();
  const { rows, drawn } = projectionShape(data);
  const showsTruth = kind === "whichisexact";

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-start gap-2">
        {drawn.map((row) => (
          <WorldMap
            key={row.id}
            path={row.path!}
            name={t(row.short ?? row.label)}
            verdict={
              showsTruth
                ? {
                    exact: row.equalArea,
                    label: t(
                      row.equalArea ? data.exactLabel : data.distortsLabel,
                    ),
                  }
                : null
            }
          />
        ))}
      </div>

      {/*
        The accusation bars are the second half of the reveal. They are held
        back entirely at the setup, because showing how often each map was
        accused would hand over the answer before the reader has looked.
      */}
      {showsTruth ? (
        <div className="flex flex-col gap-1.5 rounded-md border border-rule bg-paper/50 px-2.5 py-2">
          <p className="text-[10px] leading-snug text-ink-soft">
            {t(data.accusedLabel)}
          </p>
          {rows.map((row) => (
            <div key={row.id} className="flex min-w-0 items-center gap-2">
              <span className="w-20 shrink-0 truncate text-[10px] leading-none text-ink-mute">
                {t(row.short ?? row.label)}
              </span>
              <div className="h-2 min-w-0 flex-1">
                <div
                  className="h-full rounded-r-[2px]"
                  style={{
                    width: `${Math.max(row.width * 100, 1)}%`,
                    backgroundColor: colorFor(row.equalArea ? 0 : 1),
                  }}
                />
              </div>
              <span className="w-8 shrink-0 text-right font-mono text-[9px] tabular-nums leading-none text-ink-soft">
                {row.saidDistorts}%
              </span>
            </div>
          ))}
        </div>
      ) : null}

      <p className="text-[11px] leading-snug text-ink-mute">
        {t(data.percentNote)}
      </p>
    </div>
  );
}
