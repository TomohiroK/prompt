import { notFound } from "next/navigation";
import { games } from "@/content/games";
import { ui } from "@/content/ui";
import { latinLabels } from "@/content/editorial";
import { GameCard } from "@/components/GameCard";
import { HeroPoster } from "@/components/HeroPoster";
import { SimpleHero } from "@/components/SimpleHero";
import { SectionHead } from "@/components/Type";
import { heroPoster, site } from "@/lib/site";
import { isLocale, locales } from "@/lib/i18n";

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
    description: strings.seo.description,
    inLanguage: locale,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* その言語のポスター画像があればそれを敷き、無ければ文字だけの版を出す */}
      {heroPoster[locale] ? (
        <HeroPoster locale={locale} />
      ) : (
        <SimpleHero locale={locale} />
      )}

      {/* ============ 使い方 ============ */}
      <section
        id="how-to-use"
        aria-labelledby="how-to-use-heading"
        className="mx-auto max-w-5xl scroll-mt-20 px-4 pt-12 sm:px-6 sm:pt-16"
      >
        <SectionHead
          latin={latinLabels.howTo}
          title={strings.howToUse.heading}
        />

        <ol className="mt-6 grid gap-4 sm:grid-cols-3">
          {strings.howToUse.steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-xl border border-line bg-surface p-5"
            >
              <span className="text-xs font-bold text-magenta">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="track-tight mt-2 text-base font-bold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-4 text-xs leading-relaxed text-ink-2">
          {strings.howToUse.note}
        </p>
      </section>

      {/* ============ ゲーム一覧 ============ */}
      <section
        id="games"
        aria-labelledby="games-heading"
        className="mx-auto max-w-5xl scroll-mt-20 px-4 pt-14 sm:px-6 sm:pt-20"
      >
        <SectionHead
          latin={latinLabels.games}
          title={strings.gamesSection.heading}
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {games.map((game) => (
            <GameCard key={game.slug} game={game} locale={locale} />
          ))}
        </div>
      </section>
    </>
  );
}
