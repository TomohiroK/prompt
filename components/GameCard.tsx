import Link from "next/link";
import type { Game } from "@/content/types";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { getGameAccent } from "@/lib/game-art";
import { CategoryBadge, DifficultyBadge } from "./Badge";
import { CopyButton } from "./CopyButton";
import { MetaRow } from "./Type";

/**
 * 一覧の1枚。
 * このサイトで利用者がすることは「概要を読む」「プロンプトをコピーする」の2つだけ。
 * カードもその2つに絞り、装飾は色の細い罫1本に留めている。
 */
export function GameCard({ game, locale }: { game: Game; locale: Locale }) {
  const content = game.content[locale];
  const strings = ui[locale];

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-line bg-surface">
      {/* ゲームごとの色は、この細い罫だけで示す */}
      <span
        aria-hidden="true"
        className="block h-1"
        style={{ backgroundColor: getGameAccent(game.slug) }}
      />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge category={game.category} locale={locale} />
          <DifficultyBadge difficulty={game.difficulty} locale={locale} />
        </div>

        <h3 className="track-tight mt-3 text-lg font-bold sm:text-xl">
          <Link
            href={`/${locale}/games/${game.slug}`}
            className="transition-colors hover:text-magenta focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta"
          >
            {content.title}
          </Link>
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-ink-2">
          {content.tagline}
        </p>

        <MetaRow
          className="mt-4"
          items={[
            { label: strings.card.playtime, value: content.playtime },
            { label: strings.card.players, value: content.players },
            {
              label: strings.card.chars,
              value: content.prompt.length.toLocaleString("en-US"),
            },
          ]}
        />

        {/* 2カラム時のカード幅は狭い。ラベルが長い言語（西・葡）で行が縮まず
            はみ出すため、横並びは lg 以上に限定する */}
        <div className="mt-auto flex flex-col gap-2 pt-5 lg:flex-row">
          <CopyButton
            text={content.prompt}
            slug={game.slug}
            locale={locale}
            surface="card"
            labels={strings.copy}
            size="sm"
            className="min-w-0 lg:flex-1"
          />
          <Link
            href={`/${locale}/games/${game.slug}`}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-line-strong px-4 text-sm font-bold whitespace-nowrap transition-colors hover:border-magenta hover:text-magenta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta lg:w-auto"
          >
            {strings.card.details}
          </Link>
        </div>
      </div>
    </article>
  );
}
