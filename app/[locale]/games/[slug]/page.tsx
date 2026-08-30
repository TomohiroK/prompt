import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { games, getGameBySlug } from "@/content/games";
import { categoryLabels } from "@/content/types";
import { ui } from "@/content/ui";
import { CategoryBadge, DifficultyBadge } from "@/components/Badge";
import { PromptPanel } from "@/components/PromptPanel";
import { MetaRow } from "@/components/Type";
import { getGameAccent } from "@/lib/game-art";
import { buildMetaDescription } from "@/lib/meta";
import { site } from "@/lib/site";
import { isLocale, locales, localeTags, ogLocales } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    games.map((game) => ({ locale, slug: game.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const game = getGameBySlug(slug);

  if (!game || !isLocale(locale)) {
    return { title: "Not found" };
  }

  const content = game.content[locale];
  const description = buildMetaDescription([content.tagline, content.description]);

  /**
   * ページ側で openGraph / twitter を返すと、レイアウトの指定は継承されず
   * 丸ごと置き換わる。画像もここで指定しないと共有時に画像なしになる。
   */
  const ogImage = `/og/${locale}.png`;
  /**
   * 検索と共有で見出しを揃える。
   * seoTitle があればそれを使う。ゲーム名が、その言語では別のものを
   * 指してしまう場合にだけ持たせている（content/types.ts を参照）。
   * 画面の見出し（h1）は content.title のままで、名前は変えない。
   */
  const metaTitle = content.seoTitle ?? content.title;
  /**
   * seoTitle は検索語を自分で持っているので、レイアウトのテンプレートは重ねない
   * （重ねると同じ語が二度出て、表示上限を超える）。
   * ゲーム名のままの場合だけテンプレートで補う。
   */
  const sharedTitle = content.seoTitle
    ? content.seoTitle
    : ui[locale].seo.titleTemplate.replace("%s", content.title);

  return {
    // absolute にするとレイアウトの template を適用しない
    title: content.seoTitle ? { absolute: content.seoTitle } : metaTitle,
    description,
    alternates: {
      canonical: `/${locale}/games/${game.slug}`,
      languages: {
        ...Object.fromEntries(
          locales.map((target) => [
            localeTags[target],
            `/${target}/games/${game.slug}`,
          ]),
        ),
        "x-default": `/en/games/${game.slug}`,
      },
    },
    openGraph: {
      type: "article",
      locale: ogLocales[locale],
      url: `${site.url}/${locale}/games/${game.slug}`,
      title: sharedTitle,
      description,
      images: [
        { url: ogImage, width: 1200, height: 630, alt: sharedTitle },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: sharedTitle,
      description,
      images: [ogImage],
    },
  };
}

export default async function GamePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const game = getGameBySlug(slug);

  if (!game || !isLocale(locale)) {
    notFound();
  }

  const content = game.content[locale];
  const strings = ui[locale];
  const otherGames = games.filter((item) => item.slug !== game.slug);

  /**
   * 3つを出す。それぞれ役割が違う。
   *
   * BreadcrumbList
   *   このサイトで唯一、検索結果の見た目が変わるもの（パンくず表示）。
   *   画面に出ているパンくずと同じ内容にしている。
   * Game
   *   ページに表示済みの情報だけで組む。評価や価格は持っていないので書かない。
   *   （持っていない値を書くのは構造化データのポリシー違反にあたる）
   * HowTo
   *   Google は 2023年に HowTo のリッチリザルトを廃止しており、検索結果の
   *   見た目には効かない。ただし手順の列挙という意味づけは正確なので、
   *   AI に遊び方を読ませる用途として残す。
   */
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: strings.detail.breadcrumbHome,
          item: `${site.url}/${locale}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: strings.detail.breadcrumbGames,
          item: `${site.url}/${locale}#games`,
        },
        // 末尾は現在地。Google の推奨に従い item を持たせない
        { "@type": "ListItem", position: 3, name: content.title },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Game",
      name: content.title,
      description: content.description,
      url: `${site.url}/${locale}/games/${game.slug}`,
      genre: categoryLabels[locale][game.category],
      inLanguage: locale,
      playMode: "SinglePlayer",
      numberOfPlayers: {
        "@type": "QuantitativeValue",
        minValue: 1,
        maxValue: 1,
      },
      // 幅のある目安なので上限を出す
      timeRequired: `PT${game.playtimeMinutes.max}M`,
      isAccessibleForFree: true,
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: content.title,
      description: content.description,
      inLanguage: locale,
      step: content.howToPlay.map((text, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        text,
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <nav aria-label="breadcrumb" className="text-xs text-ink-2">
          <Link href={`/${locale}`} className="transition-colors hover:text-magenta">
            {strings.detail.breadcrumbHome}
          </Link>
          <span className="mx-1.5">/</span>
          <a href={`/${locale}#games`} className="transition-colors hover:text-magenta">
            {strings.detail.breadcrumbGames}
          </a>
        </nav>

        {/* ============ 概要 ============ */}
        <header className="mt-5 border-b border-line pb-8">
          <span
            aria-hidden="true"
            className="block h-1 w-14 rounded-full"
            style={{ backgroundColor: getGameAccent(game.slug) }}
          />
          <h1 className="track-tight mt-4 text-3xl leading-[1.15] font-bold sm:text-4xl">
            {content.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-ink-2">
            {content.tagline}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <CategoryBadge category={game.category} locale={locale} />
            <DifficultyBadge difficulty={game.difficulty} locale={locale} />
          </div>

          <MetaRow
            className="mt-4"
            items={[
              { label: strings.detail.playtime, value: content.playtime },
              { label: strings.detail.players, value: content.players },
              {
                label: strings.card.chars,
                value: content.prompt.length.toLocaleString("en-US"),
              },
            ]}
          />

          <p className="mt-5 text-sm leading-relaxed">{content.description}</p>
        </header>

        {/* ============ プロンプト ============ */}
        <div className="mt-8">
          <PromptPanel
            prompt={content.prompt}
            slug={game.slug}
            locale={locale}
          />
        </div>

        {/* ============ 遊び方 ============ */}
        <section aria-labelledby="how-to-play-heading" className="mt-12">
          <h2
            id="how-to-play-heading"
            className="track-tight text-xl font-bold sm:text-2xl"
          >
            {strings.detail.howToPlay}
          </h2>
          <ol className="mt-4">
            {content.howToPlay.map((step, index) => (
              <li
                key={step}
                className="flex gap-3 border-b border-line py-3 last:border-b-0"
              >
                <span
                  aria-hidden="true"
                  className="shrink-0 text-sm font-bold text-magenta tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-relaxed text-ink-2">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* ============ 攻略のヒント ============ */}
        <section aria-labelledby="tips-heading" className="mt-10">
          <h2
            id="tips-heading"
            className="track-tight text-xl font-bold sm:text-2xl"
          >
            {strings.detail.tips}
          </h2>
          <ul className="mt-4 space-y-2.5">
            {content.tips.map((tip) => (
              <li key={tip} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-magenta"
                />
                <span className="text-sm leading-relaxed text-ink-2">{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ============ ほかのゲーム ============ */}
        <section
          aria-labelledby="others-heading"
          className="mt-12 border-t border-line pt-8"
        >
          <h2
            id="others-heading"
            className="track-tight text-xl font-bold sm:text-2xl"
          >
            {strings.detail.others}
          </h2>
          <ul className="mt-4 divide-y divide-line">
            {otherGames.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/${locale}/games/${item.slug}`}
                  className="flex min-h-11 items-baseline gap-3 py-3 transition-colors hover:text-magenta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
                >
                  <span className="text-sm font-bold">
                    {item.content[locale].title}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-xs text-ink-2">
                    {item.content[locale].tagline}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
