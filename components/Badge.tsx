import type { Difficulty, GameCategory } from "@/content/types";
import { categoryLabels, difficultyLabels } from "@/content/types";
import type { Locale } from "@/lib/i18n";

/** 分類の札。地色の上に置くため、白のピルで固定して読ませる */
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
      className={`inline-flex items-center rounded-full bg-white px-2.5 py-1 text-[10px] font-black whitespace-nowrap text-purple ${className}`}
    >
      {categoryLabels[locale][category]}
    </span>
  );
}

const difficultyMark: Record<Difficulty, string> = {
  easy: "★☆☆",
  normal: "★★☆",
  hard: "★★★",
};

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
      className={`inline-flex items-center gap-1.5 rounded-full bg-purple px-2.5 py-1 text-[10px] font-black whitespace-nowrap text-white ${className}`}
    >
      <span aria-hidden="true" className="text-sun">
        {difficultyMark[difficulty]}
      </span>
      {difficultyLabels[locale][difficulty]}
    </span>
  );
}
