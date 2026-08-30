import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { games } from "@/content/games";
import { howToPlay } from "@/content/how-to-play";
import { ui } from "@/content/ui";
import { latinLabels } from "@/content/editorial";
import { SectionHead } from "@/components/Type";
import { getGameAccent } from "@/lib/game-art";
import { site } from "@/lib/site";
import { isLocale, locales, localeTags, ogLocales } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const PATH = "how-to-play";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const page = howToPlay[locale];
  const url = `${site.url}/${locale}/${PATH}`;
  const ogImage = `/og/${locale}.png`;

  return {
    // seoTitle は検索語を自分で持つので、レイアウトのテンプレートは重ねない
    title: { absolute: page.seoTitle },
    description: page.seoDescription,
    alternates: {
      canonical: `/${locale}/${PATH}`,
      languages: {
        ...Object.fromEntries(
          locales.map((target) => [localeTags[target], `/${target}/${PATH}`]),
        ),
        "x-default": `/en/${PATH}`,
      },
    },
    // ページ側で openGraph を返すとレイアウトの指定は継承されない。画像もここで指定する
    openGraph: {
      type: "article",
      locale: ogLocales[locale],
      url,
      title: page.seoTitle,
      description: page.seoDescription,
      images: [
        { url: ogImage, width: 1200, height: 630, alt: page.seoTitle },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.seoTitle,
      description: page.seoDescription,
      images: [ogImage],
    },
  };
}

export default async function HowToPlayPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const page = howToPlay[locale];
  const strings = ui[locale];

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
        { "@type": "ListItem", position: 2, name: page.heading },
      ],
    },
    {
      /**
       * FAQPage は現在ほとんどの検索結果でリッチリザルトが出ない。
       * それでも出すのは、質問と答えの対応を機械可読にしておくため。
       * 画面に見えている内容と一致させている（見えないFAQを書かない）。
       */
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: locale,
      mainEntity: page.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
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
          <Link
            href={`/${locale}`}
            className="transition-colors hover:text-magenta"
          >
            {strings.detail.breadcrumbHome}
          </Link>
        </nav>

        <header className="mt-5 border-b border-line pb-8">
          <span
            aria-hidden="true"
            className="block h-1 w-14 rounded-full bg-magenta"
          />
          <h1 className="track-tight mt-4 text-3xl font-bold sm:text-4xl">
            {page.heading}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-ink-2 sm:text-base">
            {page.lead}
          </p>
        </header>

        {/* ============ 3ステップ ============ */}
        <section className="mt-12">
          <SectionHead latin={latinLabels.steps} title={page.stepsHeading} />
          <ol className="mt-5 flex flex-col gap-5">
            {strings.howToUse.steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="mt-0.5 shrink-0 text-sm font-bold text-magenta tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-bold">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ============ 復帰の仕方 ============ */}
        <section className="mt-12">
          <SectionHead latin={latinLabels.recovery} title={page.recovery.heading} />
          <p className="mt-5 text-sm leading-relaxed text-ink-2">
            {page.recovery.body}
          </p>
          <p className="prompt-body mt-4 rounded-lg border border-line bg-white px-4 py-3 text-sm leading-relaxed">
            {page.recovery.example}
          </p>
        </section>

        {/* ============ 共通の設計 ============ */}
        <section className="mt-12">
          <SectionHead latin={latinLabels.design} title={page.design.heading} />
          <p className="mt-5 text-sm leading-relaxed text-ink-2">
            {page.design.lead}
          </p>
          <ul className="mt-5 flex flex-col gap-5">
            {page.design.items.map((item) => (
              <li key={item.title} className="border-l-2 border-magenta pl-4">
                <h3 className="text-base font-bold">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-2">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-ink-2">
            {page.design.caveat}
          </p>
        </section>

        {/* ============ FAQ ============ */}
        <section className="mt-12">
          <SectionHead latin={latinLabels.faq} title={page.faq.heading} />
          <dl className="mt-5 flex flex-col gap-5">
            {page.faq.items.map((item) => (
              <div key={item.q}>
                <dt className="text-base font-bold">{item.q}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink-2">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ============ ゲーム一覧 ============ */}
        <section className="mt-12 border-t border-line pt-8">
          <SectionHead latin={latinLabels.games} title={page.gamesHeading} />
          <ul className="mt-5 flex flex-col">
            {games.map((game) => (
              <li key={game.slug}>
                <Link
                  href={`/${locale}/games/${game.slug}`}
                  className="flex min-h-12 items-center gap-3 border-b border-line py-3 text-sm transition-colors hover:text-magenta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
                >
                  <span
                    aria-hidden="true"
                    className="h-4 w-1 shrink-0 rounded-full"
                    style={{ backgroundColor: getGameAccent(game.slug) }}
                  />
                  {/* 狭い画面ではゲーム名が途中で折り返すため、名前を優先して
                      キャッチは sm 以上でだけ出す */}
                  <span className="font-bold whitespace-nowrap">
                    {game.content[locale].title}
                  </span>
                  <span className="hidden min-w-0 truncate text-ink-2 sm:inline">
                    {game.content[locale].tagline}
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
