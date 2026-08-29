import { notFound } from "next/navigation";
import { games } from "@/content/games";
import { ui } from "@/content/ui";
import { editorial, latinLabels } from "@/content/editorial";
import { GameCard } from "@/components/GameCard";
import { Mascot } from "@/components/art/Mascot";
import { Burst, RegistrationMark, Ticker } from "@/components/art/Decor";
import { DisplayLine, Kicker, Rail, SectionHead } from "@/components/Type";
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
      {/*
        版面は上下2段。
        上段は紙の余白と文字だけに絞り、下段の色面に人物を立たせる。
        1段目で読ませ、2段目で目を留める。スマホの第一画面に
        「見出し・人物・CTA」の3つが必ず同時に入るよう高さを設計している。
      */}
      <section className="relative border-b-2 border-ink">
        {/* ---- 柱：刊行情報 ---- */}
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 pt-4 sm:px-6 sm:pt-6 lg:px-[max(1.5rem,calc((100vw-72rem)/2))]">
          <Kicker tone="ink">{latinLabels.issue}</Kicker>
          <span className="h-px flex-1 bg-ink" />
          <span className="text-[10px] font-black tracking-[0.24em] whitespace-nowrap">
            {games.length} GAMES
          </span>
        </div>

        <div className="lg:grid lg:grid-cols-[1fr_44%] lg:items-stretch">
          {/* ---- 上段：文字の版 ---- */}
          <div className="grain relative px-4 pt-5 pb-6 sm:px-6 sm:pt-8 lg:pt-12 lg:pr-12 lg:pb-12 lg:pl-[max(1.5rem,calc((100vw-72rem)/2))]">
            <RegistrationMark className="absolute top-2 right-4 size-5 text-ink/30 sm:size-6 lg:right-12" />

            <h1 className="track-tight balance text-[9.2vw] leading-[0.96] font-black sm:text-[7.4vw] lg:text-[3.3rem] xl:text-[3.9rem]">
              <DisplayLine text={strings.hero.title1} />
              <br />
              <DisplayLine text={strings.hero.title2} misprint blockFirst />
            </h1>

            <p className="mt-5 max-w-md border-l-4 border-shock pl-3 text-[13px] leading-relaxed text-ink-2 sm:pl-4 sm:text-sm">
              {strings.hero.lead}
            </p>

            <a
              href="#how-to-use"
              className="mt-5 inline-flex min-h-12 items-center justify-center border-2 border-ink px-5 text-sm font-black whitespace-nowrap transition-colors hover:bg-flare focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:text-base"
            >
              {strings.hero.ctaHowTo}
            </a>
          </div>

          {/* ---- 下段：人物の版 ---- */}
          <div className="grain relative h-[52vh] max-h-[420px] min-h-[300px] overflow-hidden border-t-2 border-ink bg-aqua sm:h-[440px] sm:max-h-none lg:h-auto lg:border-t-0 lg:border-l-2">
            {/* 天地を断ち切る色面 */}
            <div
              aria-hidden="true"
              className="deco absolute -top-1 -left-10 h-4 w-64 -rotate-6 bg-shock sm:h-5 sm:w-96"
            />
            <div
              aria-hidden="true"
              className="deco absolute -right-16 bottom-8 size-[240px] rounded-full bg-flare sm:size-[340px]"
            />

            {/* 画面端で断ち切る巨大な欧文。人物の背後を横切らせる */}
            <span
              aria-hidden="true"
              className="outlined tighten deco absolute top-8 -left-4 z-0 text-[4.4rem] leading-none font-black italic sm:top-14 sm:text-[7rem]"
            >
              PLAY
            </span>

            <Mascot className="absolute bottom-0 left-1/2 z-10 h-[88%] -translate-x-[34%] sm:h-[90%] sm:-translate-x-[28%] lg:left-auto lg:right-0 lg:translate-x-[4%]" />

            {/* 縦組みの柱。人物の肩口に重ねて、文字と人物を同じ面に置く */}
            <Rail
              text={edit.rail}
              latin={!isCjk}
              className="track-tight absolute top-4 right-3 z-20 bg-ink px-1.5 py-2 text-xs font-black text-flare sm:top-6 sm:text-sm"
            />

            <Burst className="absolute top-6 left-4 z-20 size-8 text-paper-3 sm:size-11" />

            {/* 第一画面のうちに主CTAを置く */}
            <a
              href="#games"
              className="absolute bottom-4 left-4 z-20 inline-flex min-h-14 items-center justify-between gap-3 border-2 border-ink bg-ink px-4 text-sm font-black whitespace-nowrap text-paper shadow-[5px_5px_0_0_var(--color-paper-3)] transition-colors hover:bg-shock focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:px-5 sm:text-base"
            >
              {format(strings.hero.ctaGames, { count: games.length })}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <Ticker
          text={latinLabels.ticker}
          className="border-t-2 border-ink bg-ink py-2 text-flare"
        />
      </section>

      {/* ============ 使い方 ============ */}
      <section
        id="how-to-use"
        aria-labelledby="how-to-use-heading"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-12 sm:px-6 sm:pt-16"
      >
        <SectionHead
          index="A"
          latin={latinLabels.howTo}
          title={strings.howToUse.heading}
        />

        <ol className="mt-8 grid gap-px border-2 border-ink bg-ink sm:grid-cols-3">
          {strings.howToUse.steps.map((step, index) => (
            <li key={step.title} className="grain relative bg-paper-3 p-5">
              <span
                aria-hidden="true"
                className="absolute top-2 right-3 text-5xl leading-none font-black italic text-ink/10"
              >
                {index + 1}
              </span>
              <span className="inline-flex size-7 items-center justify-center bg-ink text-xs font-black text-flare">
                {index + 1}
              </span>
              <h3 className="track-tight mt-3 text-lg font-black">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-4 max-w-2xl border-l-4 border-shock pl-3 text-xs leading-relaxed text-ink-2">
          {strings.howToUse.note}
        </p>
      </section>

      {/* ============ ゲーム一覧 ============ */}
      <section
        id="games"
        aria-labelledby="games-heading"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-14 sm:px-6 sm:pt-20"
      >
        <SectionHead
          index="B"
          latin={latinLabels.games}
          title={strings.gamesSection.heading}
        />

        <p className="track-tight mt-5 text-xl font-black text-shock sm:text-2xl">
          {edit.pickLine}
        </p>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 sm:gap-6">
          {games.map((game) => (
            <GameCard key={game.slug} game={game} locale={locale} />
          ))}
        </div>
      </section>
    </>
  );
}
