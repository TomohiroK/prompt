import Link from "next/link";
import type { Game } from "@/content/types";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { getGameArt } from "@/lib/game-art";
import { CategoryBadge, DifficultyBadge } from "./Badge";
import { CopyButton } from "./CopyButton";
import { GameEmblem } from "./art/GameEmblem";
import { Halftone, Star } from "./art/Decor";
import { MetaRow, PopText } from "./Type";

/**
 * 一覧の1枚。上段を色面の「表紙」、下段を白い「本文」に分ける。
 * 1枚ごとに地色を変え、色そのものが索引として働くようにしている。
 */
export function GameCard({ game, locale }: { game: Game; locale: Locale }) {
  const content = game.content[locale];
  const strings = ui[locale];
  const art = getGameArt(game.slug);

  return (
    <article className="card-pop flex flex-col overflow-hidden rounded-3xl bg-white transition-transform duration-150 hover:-translate-y-1">
      {/* 表紙 */}
      <div
        className="relative h-44 overflow-hidden sm:h-48"
        style={{ backgroundColor: art.ground, color: art.onGround }}
      >
        <Halftone className="inset-0 opacity-45" />
        <Star
          className="absolute top-4 right-40 size-7 sm:right-44 sm:size-9"
          style={{ color: art.accent }}
        />

        <span
          aria-hidden="true"
          className="absolute -top-2 left-3 text-[5rem] leading-none font-black italic opacity-35 sm:text-[6.5rem]"
        >
          {art.index}
        </span>

        {/* キャラクターは右下に置き、記号の要点が切れないよう収める */}
        <GameEmblem
          slug={game.slug}
          accent={art.accent}
          ground={art.ground}
          className="absolute right-1 -bottom-2 size-36 sm:right-2 sm:size-40"
        />

        <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-1.5">
          <CategoryBadge category={game.category} locale={locale} />
          <DifficultyBadge difficulty={game.difficulty} locale={locale} />
        </div>
      </div>

      {/* 本文 */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="track-tight text-xl leading-[1.15] font-black text-purple sm:text-2xl">
          <Link
            href={`/${locale}/games/${game.slug}`}
            className="underline-offset-4 transition-colors hover:text-magenta hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple"
          >
            {content.title}
          </Link>
        </h3>

        <p className="mt-2 text-sm leading-relaxed font-bold text-ink-2">
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
        <div className="mt-auto flex flex-col gap-2.5 pt-4 lg:flex-row">
          <CopyButton
            text={content.prompt}
            slug={game.slug}
            labels={strings.copy}
            size="sm"
            className="min-w-0 lg:flex-1"
          />
          <Link
            href={`/${locale}/games/${game.slug}`}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-pink-soft px-4 text-sm font-black whitespace-nowrap text-purple ring-[3px] ring-purple transition-colors hover:bg-sun focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple lg:w-auto"
          >
            {strings.card.details}
          </Link>
        </div>
      </div>

      <span className="sr-only">
        <PopText text="" />
      </span>
    </article>
  );
}
