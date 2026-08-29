import Link from "next/link";
import type { Game } from "@/content/types";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { getGameArt } from "@/lib/game-art";
import { CategoryBadge, DifficultyBadge } from "./Badge";
import { CopyButton } from "./CopyButton";
import { GameEmblem } from "./art/GameEmblem";
import { Burst } from "./art/Decor";
import { MetaRow } from "./Type";

/**
 * 一覧の1枚。上段を色面の「表紙」、下段を紙の「本文」に分け、
 * 1枚ごとに違う地色を与えることで、色そのものが索引として働くようにしている。
 */
export function GameCard({ game, locale }: { game: Game; locale: Locale }) {
  const content = game.content[locale];
  const strings = ui[locale];
  const art = getGameArt(game.slug);
  const isDarkGround = game.slug === "word-wolf" || game.slug === "negotiation";

  return (
    <article className="group flex flex-col border-2 border-ink bg-paper-3 shadow-[5px_5px_0_0_var(--color-ink)] transition-transform duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_0_var(--color-ink)]">
      {/* 表紙 —— 通し番号とキャラクターを衝突させる */}
      <div
        className="grain relative h-44 overflow-hidden border-b-2 border-ink sm:h-48"
        style={{ backgroundColor: art.ground, color: art.onGround }}
      >
        <span
          aria-hidden="true"
          className="absolute -top-3 left-2 text-[5.5rem] leading-none font-black italic opacity-30 sm:text-[7rem]"
        >
          {art.index}
        </span>

        <Burst
          className="absolute top-5 right-40 size-8 opacity-80 sm:right-44 sm:size-10"
          style={{ color: art.accent }}
        />

        {/* キャラクターは右下で断ち切り、カードの外へ続いているように見せる */}
        <GameEmblem
          slug={game.slug}
          accent={art.accent}
          ground={art.ground}
          // 記号の要点（? や虫眼鏡）が帯の上端で切れないよう、下端に寄せて収める
          className="absolute right-1 -bottom-2 size-36 sm:right-2 sm:size-40"
        />

        <div className="absolute bottom-2.5 left-3 flex flex-wrap items-center gap-2">
          <CategoryBadge category={game.category} locale={locale} />
          <DifficultyBadge difficulty={game.difficulty} locale={locale} />
        </div>
      </div>

      {/* 本文 */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="track-tight text-xl leading-[1.1] font-black sm:text-2xl">
          <Link
            href={`/${locale}/games/${game.slug}`}
            className="decoration-shock decoration-2 underline-offset-4 transition-colors hover:text-shock hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            {content.title}
          </Link>
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-ink-2">
          {content.tagline}
        </p>

        <MetaRow
          className="mt-4 text-ink"
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
        <div className="mt-auto flex flex-col gap-2 pt-4 lg:flex-row">
          <CopyButton
            text={content.prompt}
            slug={game.slug}
            labels={strings.copy}
            tone={isDarkGround ? "ink" : "ink"}
            size="sm"
            className="min-w-0 lg:flex-1"
          />
          <Link
            href={`/${locale}/games/${game.slug}`}
            className="inline-flex min-h-12 w-full items-center justify-center border-2 border-ink px-4 text-sm font-black whitespace-nowrap transition-colors hover:bg-flare focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:w-auto"
          >
            {strings.card.details}
          </Link>
        </div>
      </div>
    </article>
  );
}
