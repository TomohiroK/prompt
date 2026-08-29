import { notFound } from "next/navigation";
import { games } from "@/content/games";
import { categoryLabels } from "@/content/types";
import { ui } from "@/content/ui";
import { GameCard } from "@/components/GameCard";
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    alternateName: site.nameJa,
    url: `${site.url}/${locale}`,
    description: strings.siteDescription,
    inLanguage: locale,
  };

  const categorySummary = [
    ...new Set(games.map((game) => categoryLabels[locale][game.category])),
  ].join(" / ");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="glow absolute -top-32 left-1/2 h-72 w-[42rem] max-w-[130vw] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-5xl px-4 pt-12 pb-10 sm:px-6 sm:pt-20 sm:pb-14">
          <p className="inline-flex items-center rounded-full border border-line bg-surface px-3 py-1 text-xs font-bold text-accent-2">
            {strings.hero.badge}
          </p>
          <h1 className="mt-5 text-3xl leading-tight font-black tracking-tight sm:text-5xl">
            {strings.hero.title1}
            {/* 2文を常に改行で分ける。デスクトップだけ連結すると言語によって
                語間スペースの有無が破綻するため、全幅で同じ組み方にする */}
            <br />
            <span className="bg-linear-to-r from-accent to-accent-2 bg-clip-text text-transparent">
              {strings.hero.title2}
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            {strings.hero.lead}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#games"
              className="inline-flex min-h-14 items-center justify-center rounded-xl bg-linear-to-r from-accent to-accent-2 px-5 text-base font-bold whitespace-nowrap text-[#0b0d14] shadow-lg shadow-accent/25 transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-2 sm:px-6"
            >
              {format(strings.hero.ctaGames, { count: games.length })}
            </a>
            <a
              href="#how-to-use"
              className="inline-flex min-h-14 items-center justify-center rounded-xl border border-line bg-surface px-5 text-base font-bold whitespace-nowrap text-ink transition hover:border-accent/45 hover:text-accent-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-2 sm:px-6"
            >
              {strings.hero.ctaHowTo}
            </a>
          </div>
        </div>
      </section>

      <section
        id="how-to-use"
        aria-labelledby="how-to-use-heading"
        className="mx-auto max-w-5xl scroll-mt-20 px-4 py-10 sm:px-6 sm:py-14"
      >
        <h2
          id="how-to-use-heading"
          className="text-xl font-extrabold tracking-tight sm:text-2xl"
        >
          {strings.howToUse.heading}
        </h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-3">
          {strings.howToUse.steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl border border-line bg-surface p-5"
            >
              <span className="grid size-8 place-items-center rounded-lg bg-surface-2 text-sm font-black text-accent-2">
                {index + 1}
              </span>
              <h3 className="mt-3 text-base font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-xs leading-relaxed text-muted">
          {strings.howToUse.note}
        </p>
      </section>

      <section
        id="games"
        aria-labelledby="games-heading"
        className="mx-auto max-w-5xl scroll-mt-20 px-4 pb-4 sm:px-6"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2
            id="games-heading"
            className="text-xl font-extrabold tracking-tight sm:text-2xl"
          >
            {strings.gamesSection.heading}
          </h2>
          <p className="text-sm text-muted">{categorySummary}</p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {games.map((game) => (
            <GameCard key={game.slug} game={game} locale={locale} />
          ))}
        </div>
      </section>
    </>
  );
}
