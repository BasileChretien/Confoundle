import { useLocale, useT } from "../../app/i18n";
import type { CalibrationDay } from "../../app/session";
import { fillSlots } from "../charts/announce";

/**
 * The week, as a betting ledger. Height is what was staked, colour is whether
 * it paid.
 *
 * WHY TWO CHANNELS RATHER THAN WORDLE'S ONE. A grid of coloured squares can
 * only say right or wrong. This deck's subject is not whether you were right,
 * it is whether you knew how sure to be, so the artefact has to carry the
 * stake as well as the outcome. Height does that, and it also means the strip
 * survives being screenshotted in greyscale or read by someone who cannot
 * separate the teal from the rust: a tall bar is a big claim either way.
 *
 * The visual hierarchy is deliberate and is the whole point. Certain-and-wrong
 * is a full-height rust bar, so the loudest mark on the card is the moment the
 * player was most confidently fooled. Hedged-and-right is a short teal bar, so
 * honest uncertainty reads as quiet. The card's emotional emphasis and the
 * product's thesis agree, which is not true of a score.
 *
 * A skipped day is a hairline on the baseline, never a gap and never a cross:
 * a missed day should read as absence rather than as failure.
 *
 * IT CARRIES NOTHING ABOUT THE PUZZLE. `calibrationByDay` hands over an
 * outcome and a stake per day and nothing else, which is what makes this safe
 * to post while the puzzle is still live for everybody who has not played it.
 */

/** Bar height per stake, out of the full height. Certain fills the plate. */
const STAKE_HEIGHT: Record<string, number> = {
  hunch: 24,
  sure: 46,
  certain: 70,
};

const BAR = 26;
const GAP = 12;
const FULL = 70;
const BASELINE = 70;
const SKIPPED_H = 7;

export function CalibrationStrip({
  week,
  colors,
}: {
  week: CalibrationDay[];
  /** The card's own palette, passed in so this never re-declares brand colour. */
  colors: {
    teal: string;
    rust: string;
    muted: string;
    text: string;
    rule: string;
  };
}) {
  const t = useT();
  const locale = useLocale();

  const width = week.length * BAR + (week.length - 1) * GAP;
  const height = 96;

  /**
   * Weekday initials from the reader's locale rather than from English. A
   * hardcoded M T W T F S S is wrong in most of the ten languages this ships
   * in, and the strip is the one part of the card with a label per column.
   */
  const narrowDay = (iso: string) =>
    new Intl.DateTimeFormat(locale, {
      weekday: "narrow",
      // Pinned to UTC. The dates are UTC day strings, and formatting them in
      // the reader's zone shifted the letter by one for anybody far enough
      // east: at UTC+13 a midday-UTC instant is already tomorrow.
      timeZone: "UTC",
    }).format(new Date(`${iso}T12:00:00Z`));

  const caught = week.filter((d) => d.outcome === "caught").length;
  const played = week.filter((d) => d.outcome !== "skipped").length;
  const nf = new Intl.NumberFormat(locale);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      role="img"
      /**
       * One authored sentence with slots, never assembled by concatenation:
       * clause order and the way a count attaches to its noun are the
       * translator's to choose, and Japanese puts the whole before the part.
       */
      aria-label={fillSlots(
        t({ en: "Caught {caught} of the {played} days played this week" }),
        { caught: nf.format(caught), played: nf.format(played) },
      )}
    >
      <line
        x1={0}
        y1={BASELINE}
        x2={width}
        y2={BASELINE}
        stroke={colors.rule}
        strokeWidth={1}
      />
      {week.map((day, i) => {
        const x = i * (BAR + GAP);
        const isToday = i === week.length - 1;
        if (day.outcome === "skipped") {
          return (
            <g key={day.date}>
              <rect
                x={x}
                y={BASELINE - SKIPPED_H}
                width={BAR}
                height={SKIPPED_H}
                rx={3}
                fill={colors.rule}
              />
              <text
                x={x + BAR / 2}
                y={88}
                textAnchor="middle"
                fontSize={11}
                fill={isToday ? colors.text : colors.muted}
                opacity={isToday ? 1 : 0.7}
              >
                {narrowDay(day.date)}
              </text>
            </g>
          );
        }
        const h = STAKE_HEIGHT[day.confidence ?? "hunch"] ?? FULL;
        return (
          <g key={day.date}>
            <rect
              x={x}
              y={BASELINE - h}
              width={BAR}
              height={h}
              rx={3}
              fill={day.outcome === "caught" ? colors.teal : colors.rust}
            />
            <text
              x={x + BAR / 2}
              y={88}
              textAnchor="middle"
              fontSize={11}
              fill={isToday ? colors.text : colors.muted}
              opacity={isToday ? 1 : 0.7}
            >
              {narrowDay(day.date)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/**
 * The line under the strip. Two sentences, not one, and the second only when
 * it is true, because "certain and wrong" is the line that makes somebody ask
 * what this app is and it should not be diluted when it did not happen.
 */
export function calibrationSummary(week: CalibrationDay[]): {
  caught: number;
  played: number;
  certainAndWrong: number;
} {
  const played = week.filter((d) => d.outcome !== "skipped");
  return {
    caught: played.filter((d) => d.outcome === "caught").length,
    played: played.length,
    certainAndWrong: played.filter(
      (d) => d.outcome === "fooled" && d.confidence === "certain",
    ).length,
  };
}
