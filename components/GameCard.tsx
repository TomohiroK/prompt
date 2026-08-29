import Link from "next/link";
import type { Game } from "@/content/types";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { CategoryBadge, DifficultyBadge } from "./Badge";
import { CopyButton } from "./CopyButton";

export function GameCard({ game, locale }: { game: Game; locale: Locale }) {
  const content = game.content[locale];
  const strings = ui[locale];

  return (
    <article className="flex flex-col rounded-2xl border border-line bg-surface p-4 transition hover:border-accent/45 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <CategoryBadge category={game.category} locale={locale} />
        <DifficultyBadge difficulty={game.difficulty} locale={locale} />
      </div>

      <h3 className="mt-4 text-lg font-extrabold tracking-tight sm:text-xl">
        <Link
          href={`/${locale}/games/${game.slug}`}
          className="rounded transition hover:text-accent-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-2"
        >
          {content.title}
        </Link>
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-muted">
        {content.tagline}
      </p>

      <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        <div className="flex gap-1.5">
          <dt className="text-muted/70">{strings.card.playtime}</dt>
          <dd className="font-semibold text-ink/90">{content.playtime}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="text-muted/70">{strings.card.players}</dt>
          <dd className="font-semibold text-ink/90">{content.players}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="text-muted/70">{strings.card.chars}</dt>
          <dd className="font-semibold text-ink/90">
            {content.prompt.length.toLocaleString("en-US")}
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <CopyButton
          text={content.prompt}
          slug={game.slug}
          labels={strings.copy}
          size="sm"
          className="sm:flex-1"
        />
        <Link
          href={`/${locale}/games/${game.slug}`}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-line bg-surface-2 px-4 text-sm font-bold whitespace-nowrap text-ink transition hover:border-accent/45 hover:text-accent-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-2 sm:w-auto"
        >
          {strings.card.details}
        </Link>
      </div>
    </article>
  );
}
