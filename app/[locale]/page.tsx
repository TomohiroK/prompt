import { notFound } from "next/navigation";
import { games } from "@/content/games";
import { ui } from "@/content/ui";
import { editorial, latinLabels, poster } from "@/content/editorial";
import { GameCard } from "@/components/GameCard";
import { HeroFigure } from "@/components/art/HeroFigure";
import { Plush } from "@/components/art/Plush";
import { WindowMock } from "@/components/art/WindowMock";
import {
  Bolt,
  Bubble,
  Confetti,
  Cursor,
  Halftone,
  Rays,
  Star,
  Sticker,
  Ticker,
  BurstShape,
} from "@/components/art/Decor";
import { Kicker, PopTitle, Rail, SectionHead } from "@/components/Type";
import { site } from "@/lib/site";
import { format, isLocale, locales } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/*
 * トップページは metadata を上書きしない。
 * alternates を再定義すると layout 側の hreflang（全言語版へのリンク）が
 * 丸ごと置き換わって失われるため、canonical / languages は layout に任せる。
 */

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const strings = ui[locale];
  const edit = editorial[locale];
  const pop = poster[locale];
  const isCjk = locale === "ja" || locale === "zh" || locale === "ko";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    alternateName: site.nameJa,
    url: `${site.url}/${locale}`,
    description: strings.siteDescription,
    inLanguage: locale,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ============ キービジュアル ============ */}
      <section className="relative overflow-hidden pb-10 sm:pb-14">
        <Rays />
        <Confetti />
        <Halftone className="top-0 right-0 h-64 w-64 opacity-60 sm:h-96 sm:w-96" />

        <div className="relative mx-auto max-w-6xl px-4 pt-6 sm:px-6 sm:pt-10">
          {/* ---- 見出しと人物 ---- */}
          <div className="relative grid gap-4 lg:grid-cols-[1.12fr_0.88fr] lg:items-end lg:gap-6">
            <div className="relative z-10 min-w-0">
              <Sticker className="mb-3">{pop.tag}</Sticker>

              <h1 className="track-tight text-[14.5vw] leading-[0.9] font-black sm:text-[10vw] lg:text-[5.6rem] xl:text-[6.8rem]">
                <PopTitle text={strings.hero.title1} tone="white" />
                <br />
                <PopTitle text={strings.hero.title2} tone="purple" />
              </h1>

              <p className="mt-4 inline-block rounded-xl bg-white px-3 py-2 text-[12px] leading-relaxed font-black text-magenta ring-[3px] ring-purple sm:px-4 sm:text-sm">
                {pop.sub}
              </p>
            </div>

            {/* ---- 人物と機能ラベル ---- */}
            <div className="relative h-[270px] overflow-hidden sm:h-[360px] lg:h-[430px]">
              <div className="absolute top-0 right-0 z-20 flex flex-col items-end gap-1.5">
                <span className="text-[11px] font-black tracking-[0.3em] text-purple sm:text-sm">
                  WEB APP
                </span>
                {latinLabels.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full bg-white/85 px-3 py-1 text-[9px] font-black tracking-[0.12em] text-purple sm:text-[10px]"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <HeroFigure className="absolute -bottom-8 left-1/2 z-10 h-[126%] -translate-x-[58%] sm:-bottom-10 sm:-translate-x-[62%] lg:left-2 lg:translate-x-0" />

              <Bubble className="absolute bottom-3 left-0 z-20 max-w-[10.5rem] text-[11px] leading-snug font-black ring-[3px] ring-purple sm:bottom-6 sm:max-w-[13rem] sm:text-sm">
                {pop.heart}
              </Bubble>

              <Bolt className="absolute top-4 left-1 z-0 h-10 text-sun sm:h-14" />
            </div>
          </div>

          {/* ---- 画面モック ---- */}
          <div className="relative mt-6 sm:mt-8">
            <WindowMock
              locale={locale}
              templates={games.slice(0, 4).map((game) => game.content[locale].title)}
            />

            <Plush className="bob absolute -top-10 -right-2 z-20 w-24 sm:-top-16 sm:-right-4 sm:w-36 lg:-top-24 lg:w-40" />

            <Cursor className="absolute -bottom-4 left-8 z-20 h-8 sm:h-10" />
            <Sticker className="absolute -bottom-4 right-6 z-20 sm:right-12">
              COPY &amp; PASTE!
            </Sticker>
          </div>

          {/* ---- 行動 ---- */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4 sm:mt-12 sm:gap-6">
            <a
              href="#games"
              className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple"
            >
              {/* 爆発形の札は円の中に2行で組むのが正しい形。
                  ピル型ボタンの折り返し検査からは除外する */}
              <BurstShape
                className="size-32 bg-sun text-purple transition-transform duration-150 hover:scale-105 sm:size-40"
                data-wrap="ok"
              >
                <span className="px-4 text-sm leading-tight font-black sm:text-base">
                  {pop.ctaBurst}
                  <span aria-hidden="true" className="mt-1 block text-lg">
                    →
                  </span>
                </span>
              </BurstShape>
            </a>

            <a
              href="#games"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-magenta px-6 text-base font-black whitespace-nowrap text-white ring-[3px] ring-purple shadow-[5px_6px_0_0_var(--color-purple)] transition-all hover:-translate-y-0.5 hover:bg-purple focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple sm:text-lg"
            >
              {format(strings.hero.ctaGames, { count: games.length })}
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* ---- ロゴ・ロックアップ ---- */}
          <div className="mt-10 text-center sm:mt-14">
            <p className="text-[10px] font-black tracking-[0.4em] text-purple sm:text-xs">
              {site.nameJa}
            </p>
            <p className="track-tight mt-1 text-[11vw] leading-none font-black sm:text-6xl lg:text-7xl">
              <PopTitle text={site.name.toUpperCase()} tone="white" wave={false} />
            </p>
            <p className="mt-3 text-[11px] font-black tracking-[0.3em] text-purple sm:text-base">
              {latinLabels.tagline}
            </p>

            <ul className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {pop.features.map((feature) => (
                <li
                  key={feature}
                  className="rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-black text-purple ring-2 ring-purple sm:text-xs"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 縦組みの柱 */}
        <Rail
          text={edit.rail}
          latin={!isCjk}
          className="absolute top-40 right-1 z-20 hidden rounded-full bg-purple px-1.5 py-3 text-xs font-black text-white lg:block"
        />

      </section>

      <Ticker text={latinLabels.ticker} className="bg-purple py-2 text-white" />

      {/* ============ 使い方 ============ */}
      <section
        id="how-to-use"
        aria-labelledby="how-to-use-heading"
        className="relative mx-auto max-w-6xl scroll-mt-20 px-4 pt-12 sm:px-6 sm:pt-16"
      >
        <SectionHead latin={latinLabels.howTo} title={strings.howToUse.heading} />

        <ol className="mt-8 grid gap-4 sm:grid-cols-3">
          {strings.howToUse.steps.map((step, index) => (
            <li
              key={step.title}
              className="card-pop-sm relative rounded-3xl bg-white p-5"
            >
              <Star className="absolute -top-3 -right-2 size-7 text-sun" />
              <span className="grid size-9 place-items-center rounded-full bg-magenta text-sm font-black text-white">
                {index + 1}
              </span>
              <h3 className="track-tight mt-3 text-lg font-black text-purple">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed font-bold text-ink-2">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-5 max-w-2xl rounded-2xl bg-white/70 px-4 py-3 text-center text-xs leading-relaxed font-bold text-purple">
          {strings.howToUse.note}
        </p>
      </section>

      {/* ============ ゲーム一覧 ============ */}
      <section
        id="games"
        aria-labelledby="games-heading"
        className="relative mx-auto max-w-6xl scroll-mt-20 px-4 pt-14 sm:px-6 sm:pt-20"
      >
        <SectionHead
          latin={latinLabels.games}
          title={strings.gamesSection.heading}
        />

        <p className="mt-4 text-center">
          <Kicker tone="sun">{edit.pickLine}</Kicker>
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {games.map((game) => (
            <GameCard key={game.slug} game={game} locale={locale} />
          ))}
        </div>
      </section>
    </>
  );
}
