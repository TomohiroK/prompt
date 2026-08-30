import { heroPoster, site } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import { format } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { games } from "@/content/games";

/**
 * ポスター画像を敷くキービジュアル。
 *
 * 画像は1枚絵なので、そのままでは以下が失われる。ここで補っている。
 * - 見出しが検索とスクリーンリーダーに届かない → 同じ内容を sr-only で併置
 * - 画像の中のボタンは押せない → 直下に実物のボタンを置く
 * - 画像は1言語ぶんしかない → 対応がない言語は呼び出し側で文字の版に切り替える
 */
export function HeroPoster({ locale }: { locale: Locale }) {
  const art = heroPoster[locale];
  if (!art) return null;

  const strings = ui[locale];

  return (
    <section className="border-b border-line">
      <h1 className="sr-only">
        {strings.hero.title1} {strings.hero.title2} — {site.name}
      </h1>

      {/*
        支給素材なので next/image ではなく img を使い、幅違いは事前に書き出してある。
        実行時の画像最適化を挟まないぶん、変換の失敗も費用も発生しない。
        srcset / sizes はブラウザに選ばせるためのもの。表示幅 560px の画面に
        1122px の画像を送らない。
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={art.sources[art.sources.length - 1].src}
        srcSet={art.sources.map((s) => `${s.src} ${s.width}w`).join(", ")}
        sizes={`(max-width: ${art.displayMaxWidth}px) 100vw, ${art.displayMaxWidth}px`}
        alt={art.alt}
        width={art.width}
        height={art.height}
        className="mx-auto block h-auto w-full max-w-[560px]"
        fetchPriority="high"
      />

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 pt-6 pb-10 text-center sm:px-6">
        <p className="max-w-md text-sm leading-relaxed text-ink-2">
          {strings.hero.lead}
        </p>
        <a
          href="#games"
          className="inline-flex min-h-13 items-center justify-center rounded-lg bg-magenta px-6 text-base font-bold whitespace-nowrap text-white transition-colors hover:bg-purple focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
        >
          {format(strings.hero.ctaGames, { count: games.length })}
        </a>
      </div>
    </section>
  );
}
