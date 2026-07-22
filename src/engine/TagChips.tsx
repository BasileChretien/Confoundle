import type { TagId } from "../puzzles/schema";
import { TAGS, orderedTags } from "../puzzles/tags";
import { useT } from "../app/i18n";

/**
 * The audience/domain tags for a puzzle, as quiet chips. Audience tags read a
 * touch stronger (filled) than domain tags (outline) so "who is this for" lands
 * first, without competing with the rust category badge.
 */
export function TagChips({
  tags,
  className = "",
}: {
  tags: TagId[];
  className?: string;
}) {
  const t = useT();
  const ordered = orderedTags(tags);
  if (ordered.length === 0) return null;

  return (
    <ul className={"flex flex-wrap items-center gap-1.5 " + className}>
      {ordered.map((id) => {
        const meta = TAGS[id];
        const audience = meta.kind === "audience";
        return (
          <li
            key={id}
            title={t(meta.blurb)}
            className={
              "inline-flex items-center rounded-full px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-eyebrow " +
              (audience
                ? "bg-paper-3 text-ink ring-1 ring-inset ring-black/10"
                : "text-ink-mute ring-1 ring-inset ring-rule")
            }
          >
            {t(meta.label)}
          </li>
        );
      })}
    </ul>
  );
}
