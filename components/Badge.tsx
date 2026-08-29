import type { Difficulty, GameCategory } from "@/content/types";
import { categoryLabels, difficultyLabels } from "@/content/types";
import type { Locale } from "@/lib/i18n";

/** 分類と難易度の札。色数を増やさず、罫線と地の淡さだけで区別する */
export function CategoryBadge({
  category,
  locale,
  className = "",
}: {
  category: GameCategory;
  locale: Locale;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-lav px-2.5 py-1 text-[11px] font-bold whitespace-nowrap text-purple ${className}`}
    >
      {categoryLabels[locale][category]}
    </span>
  );
}

export function DifficultyBadge({
  difficulty,
  locale,
  className = "",
}: {
  difficulty: Difficulty;
  locale: Locale;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-line-strong px-2.5 py-1 text-[11px] font-bold whitespace-nowrap text-ink-2 ${className}`}
    >
      {difficultyLabels[locale][difficulty]}
    </span>
  );
}
