import type { Difficulty, GameCategory } from "@/content/types";
import { categoryLabels, difficultyLabels } from "@/content/types";
import type { Locale } from "@/lib/i18n";

/**
 * 分類の札。角丸のパステルチップではなく、罫線で囲った印刷物のラベルとして扱う。
 * 地色の上に置くため、色は currentColor に依存させて破綻を防ぐ。
 */
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
      className={`inline-flex items-center border border-current px-2 py-0.5 text-[10px] font-black tracking-[0.14em] whitespace-nowrap ${className}`}
    >
      {categoryLabels[locale][category]}
    </span>
  );
}

const difficultyMark: Record<Difficulty, string> = {
  easy: "●○○",
  normal: "●●○",
  hard: "●●●",
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
      className={`inline-flex items-center gap-1.5 text-[10px] font-black tracking-[0.14em] whitespace-nowrap ${className}`}
    >
      <span aria-hidden="true" className="tracking-[0.1em]">
        {difficultyMark[difficulty]}
      </span>
      {difficultyLabels[locale][difficulty]}
    </span>
  );
}
