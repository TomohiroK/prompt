import type { Locale } from "@/lib/i18n";
import { format } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { heroSub } from "@/content/editorial";
import { games } from "@/content/games";

/**
 * ポスター画像がない言語のキービジュアル。
 * 画像に頼らず、見出しと1行の説明だけで成立させる。
 */
export function SimpleHero({ locale }: { locale: Locale }) {
  const strings = ui[locale];

  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-5xl px-4 pt-14 pb-12 sm:px-6 sm:pt-20 sm:pb-16">
        <h1 className="track-tight text-4xl leading-[1.12] font-bold sm:text-6xl">
          {strings.hero.title1}
          <br />
          <span className="text-magenta">{strings.hero.title2}</span>
        </h1>

        <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-2">
          {heroSub[locale]}
        </p>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-2">
          {strings.hero.lead}
        </p>

        <a
          href="#games"
          className="mt-7 inline-flex min-h-13 items-center justify-center rounded-lg bg-magenta px-6 text-base font-bold whitespace-nowrap text-white transition-colors hover:bg-purple focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
        >
          {format(strings.hero.ctaGames, { count: games.length })}
        </a>
      </div>
    </section>
  );
}
