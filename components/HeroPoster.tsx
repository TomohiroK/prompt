import { heroPoster, site } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import { format } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { poster } from "@/content/editorial";
import { games } from "@/content/games";

/**
 * ポスター画像をそのまま敷くキービジュアル。
 *
 * 画像は1枚絵なので、そのままでは以下が失われる。ここで補っている。
 * - 見出しが検索とスクリーンリーダーに届かない → 同じ内容を sr-only で併置
 * - 画像の中のボタンが押せない → ポスター全体をリンクにし、下に実物のボタンを置く
 * - 画像は1言語ぶんしかない → 対応がない言語は呼び出し側で組版の版に切り替える
 */
export function HeroPoster({ locale }: { locale: Locale }) {
  const art = heroPoster[locale];
  if (!art) return null;

  const strings = ui[locale];
  const pop = poster[locale];

  return (
    <section className="relative">
      {/* 画像に焼き込まれた見出しの代替。目には見えないが、検索と読み上げには届く */}
      <h1 className="sr-only">
        {strings.hero.title1} {strings.hero.title2} — {site.name}
      </h1>

      <a
        href="#games"
        aria-label={format(strings.hero.ctaGames, { count: games.length })}
        className="block focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-purple"
      >
        {/* 支給素材のため next/image ではなく img を使う。寸法は固定で渡す */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={art.src}
          alt={art.alt}
          width={art.width}
          height={art.height}
          className="mx-auto block h-auto w-full max-w-[720px] lg:max-w-[860px]"
          fetchPriority="high"
        />
      </a>

      {/* 画像の中のボタンは押せないので、直下に実物を置く */}
      <div className="mx-auto mt-5 flex max-w-6xl flex-wrap items-center justify-center gap-3 px-4 sm:mt-6 sm:gap-4 sm:px-6">
        <a
          href="#games"
          className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-magenta px-6 text-base font-black whitespace-nowrap text-white ring-[3px] ring-purple shadow-[5px_6px_0_0_var(--color-purple)] transition-all hover:-translate-y-0.5 hover:bg-purple focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple sm:text-lg"
        >
          {format(strings.hero.ctaGames, { count: games.length })}
          <span aria-hidden="true">→</span>
        </a>
        <a
          href="#how-to-use"
          className="inline-flex min-h-14 items-center justify-center rounded-full bg-white px-6 text-base font-black whitespace-nowrap text-purple ring-[3px] ring-purple transition-colors hover:bg-sun focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple"
        >
          {strings.hero.ctaHowTo}
        </a>
      </div>

      <p className="mx-auto mt-4 max-w-xl px-4 text-center text-[13px] leading-relaxed font-black text-purple sm:px-6 sm:text-sm">
        {pop.sub}
      </p>
    </section>
  );
}
