import type { Difficulty, GameCategory } from "@/content/types";
import { categoryLabels, difficultyLabels } from "@/content/types";
import type { Locale } from "@/lib/i18n";

const categoryTone: Record<GameCategory, string> = {
  reasoning: "bg-accent/15 text-accent-2 ring-accent/30",
  "hidden-role": "bg-fuchsia-400/15 text-fuchsia-300 ring-fuchsia-400/30",
  adventure: "bg-amber-400/15 text-amber-300 ring-amber-400/30",
  simulation: "bg-emerald-400/15 text-emerald-300 ring-emerald-400/30",
  party: "bg-sky-400/15 text-sky-300 ring-sky-400/30",
};

const difficultyTone: Record<Difficulty, string> = {
  easy: "bg-surface-2 text-emerald-300 ring-line",
  normal: "bg-surface-2 text-amber-300 ring-line",
  hard: "bg-surface-2 text-rose-300 ring-line",
};

export function CategoryBadge({
  category,
  locale,
}: {
  category: GameCategory;
  locale: Locale;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold whitespace-nowrap ring-1 ring-inset ${categoryTone[category]}`}
    >
      {categoryLabels[locale][category]}
    </span>
  );
}

export function DifficultyBadge({
  difficulty,
  locale,
}: {
  difficulty: Difficulty;
  locale: Locale;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold whitespace-nowrap ring-1 ring-inset ${difficultyTone[difficulty]}`}
    >
      {difficultyLabels[locale][difficulty]}
    </span>
  );
}
