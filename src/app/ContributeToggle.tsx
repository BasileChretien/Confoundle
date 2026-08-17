import { useState } from "react";
import { useT } from "./i18n";
import { ACCOUNT } from "./ui";
import { contributesAnswers, setContributesAnswers } from "./answerStats";

/**
 * The switch `public/privacy.html` promises, in the section "How answers are
 * counted".
 *
 * THREE DIFFERENCES FROM `ReminderToggle`, all of them deliberate.
 *
 * It is on by default, because the submission carries no identifier and an
 * opt-in gate would suppress most of the data for no privacy gain. The page
 * says so plainly rather than burying the default.
 *
 * It is purely local: no request, no account, and it works signed out. The
 * preference decides whether anything is transmitted at all, so it cannot be
 * something the server has to be trusted to honour. That is exactly what the
 * policy claims, and keeping the switch client-side is what makes the claim
 * cheap to keep true.
 *
 * It never hides. `ReminderToggle` removes itself on a deployment with no mail
 * provider, because a preference nobody can honour is worse than no control.
 * Here the opposite holds: if the tally endpoint is missing, nothing is sent
 * anyway, and a person who wants to check that contribution is off should
 * always be able to find the control and see it.
 */
export function ContributeToggle() {
  const t = useT();
  const [on, setOn] = useState(() => contributesAnswers());

  function choose(next: boolean) {
    // Local and synchronous, so there is no optimistic state to correct and no
    // failure path in which the control shows something untrue.
    setContributesAnswers(next);
    setOn(contributesAnswers());
  }

  return (
    <div className="mt-4 border-t border-rule pt-3">
      <label className="flex cursor-pointer items-start gap-2.5">
        <input
          type="checkbox"
          checked={on}
          onChange={(e) => choose(e.target.checked)}
          className="mt-0.5 size-4 shrink-0 accent-brand focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
        />
        <span className="min-w-0">
          <span className="block font-sans text-[13px] font-semibold text-ink">
            {t(ACCOUNT.contributeAnswers)}
          </span>
          <span className="block font-sans text-[12px] leading-snug text-ink-soft">
            {t(ACCOUNT.contributeAnswersBlurb)}
          </span>
        </span>
      </label>
    </div>
  );
}
