/**
 * Filling the `{slot}` placeholders in a chart's spoken description.
 *
 * Every `aria-label` in this directory used to be built by concatenation at the
 * call site, as `` `${t(data.cause)} and ${t(data.effect)} rise together` ``.
 * That is one English sentence with two holes in it, and the holes are in the
 * places English puts them: a translator never sees the sentence, so a screen
 * reader announced English in all ten locales while the figure beside it was
 * fully translated. The fix is to author the whole sentence as one translatable
 * string carrying named slots, look it up through `t()`, and only then drop the
 * values in. The clause order is then the translator's to choose, which is the
 * point, because it does not survive the trip to Japanese, Hindi or Arabic.
 *
 * `translations/inlineChrome.test.ts` holds up the other half: it fails if any
 * locale is missing one of these sentences, and separately if a translation
 * dropped a slot, which would otherwise silently announce a sentence with the
 * number missing and still read as finished.
 */

/**
 * Replace each `{name}` in `sentence` with its value.
 *
 * `split`/`join` rather than `String.replace`, which is not a neutral
 * substitution: it reads `$&`, `$'` and `` $` `` in the REPLACEMENT as
 * references back into the match. These values are puzzle content and derived
 * numbers, so a label containing a dollar sign (a currency, a cost per patient)
 * would come out mangled through `replace` and correct through this. There is
 * no `replaceAll`, which would also be safe: the project's `lib` is ES2020 and
 * it landed in ES2021.
 *
 * A slot with no matching value is left in place rather than blanked, so a
 * mismatch between the sentence and the call site shows up as a visible
 * `{total}` in the announcement instead of a hole that reads as deliberate.
 *
 * NOT called `fill`, which is the obvious name and was the first one. `fill` is
 * already taken all over this directory: it is an SVG attribute on almost every
 * shape, and `RiskView`'s bar component destructures a prop of that name, which
 * silently shadowed the import and threw "fill is not a function" at render.
 * The chart tests caught it, but only because they render; a chart whose
 * aria-label is built in a branch the tests do not reach would not have been.
 */
export function fillSlots(
  sentence: string,
  slots: Readonly<Record<string, string | number>>,
): string {
  let out = sentence;
  for (const [name, value] of Object.entries(slots)) {
    out = out.split(`{${name}}`).join(String(value));
  }
  return out;
}
