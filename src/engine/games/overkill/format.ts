import { useMemo } from "react";
import { useLocale } from "../../../app/i18n";
import { TICK_HZ } from "./content";

/**
 * Every number the game draws, in the reader's language.
 *
 * Built from `useLocale()` rather than from an absent argument, which is the
 * distinction `src/localeNumerals.test.ts` exists to enforce: `toLocaleString()`
 * with no locale looks like the fix and silently follows the browser's
 * language instead of the one the reader chose in the app.
 *
 * A clock is the awkward one. Padding seconds to two digits by hand would
 * paste Western zeroes onto Bengali or Arabic numerals, so the padding is
 * asked of the formatter with `minimumIntegerDigits` and the separator is the
 * only Latin character left.
 */
export interface Numbers {
  int: (n: number) => string;
  percent: (share: number) => string;
  clock: (ticks: number) => string;
}

export function makeNumbers(locale: string): Numbers {
  const int = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
  const pad2 = new Intl.NumberFormat(locale, {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const pct = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  });
  return {
    int: (n) => int.format(n),
    percent: (share) => pct.format(share),
    clock: (ticks) => {
      const whole = Math.max(0, Math.floor(ticks / TICK_HZ));
      return `${int.format(Math.floor(whole / 60))}:${pad2.format(whole % 60)}`;
    },
  };
}

export function useNumbers(): Numbers {
  const locale = useLocale();
  return useMemo(() => makeNumbers(locale), [locale]);
}
