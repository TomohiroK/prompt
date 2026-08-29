import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { games, getGameBySlug } from "@/content/games";
import { ui } from "@/content/ui";
import { CategoryBadge, DifficultyBadge } from "@/components/Badge";
import { PromptPanel } from "@/components/PromptPanel";
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
  const description = `${content.tagline} ${content.description}`.slice(0, 150);

  return {
    title: content.title,
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
      title: `${content.title} | ${site.name}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${content.title} | ${site.name}`,
      description,
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
  const otherGames = games.filter((item) => item.slug !== game.slug).slice(0, 4);

  const jsonLd = {
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <nav aria-label="breadcrumb" className="text-xs text-muted">
          <Link href={`/${locale}`} className="transition hover:text-ink">
            {strings.detail.breadcrumbHome}
          </Link>
          <span className="mx-1.5">/</span>
          <a href={`/${locale}#games`} className="transition hover:text-ink">
            {strings.detail.breadcrumbGames}
          </a>
          <span className="mx-1.5">/</span>
          <span className="text-ink/80">{content.title}</span>
        </nav>

        <header className="mt-5">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={game.category} locale={locale} />
            <DifficultyBadge difficulty={game.difficulty} locale={locale} />
          </div>
          <h1 className="mt-4 text-2xl leading-tight font-black tracking-tight sm:text-4xl">
            {content.title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-accent-2 sm:text-base">
            {content.tagline}
          </p>
          <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 rounded-xl border border-line bg-surface px-4 py-3 text-xs sm:text-sm">
            <div className="flex gap-2">
              <dt className="text-muted">{strings.detail.playtime}</dt>
              <dd className="font-bold">{content.playtime}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted">{strings.detail.players}</dt>
              <dd className="font-bold">{content.players}</dd>
            </div>
          </dl>
          <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
            {content.description}
          </p>
        </header>

        <div className="mt-8">
          <PromptPanel
            prompt={content.prompt}
            slug={game.slug}
            locale={locale}
          />
        </div>

        <section
          aria-labelledby="how-to-play-heading"
          className="mt-10 rounded-2xl border border-line bg-surface p-4 sm:p-6"
        >
          <h2
            id="how-to-play-heading"
            className="text-lg font-extrabold sm:text-xl"
          >
            {strings.detail.howToPlay}
          </h2>
          <ol className="mt-4 space-y-3">
            {content.howToPlay.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md bg-surface-2 text-xs font-black text-accent-2">
                  {index + 1}
                </span>
                <span className="text-sm leading-relaxed text-muted">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="tips-heading"
          className="mt-6 rounded-2xl border border-line bg-surface p-4 sm:p-6"
        >
          <h2 id="tips-heading" className="text-lg font-extrabold sm:text-xl">
            {strings.detail.tips}
          </h2>
          <ul className="mt-4 space-y-3">
            {content.tips.map((tip) => (
              <li key={tip} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                />
                <span className="text-sm leading-relaxed text-muted">
                  {tip}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="others-heading"
          className="mt-10 border-t border-line pt-8"
        >
          <h2 id="others-heading" className="text-lg font-extrabold sm:text-xl">
            {strings.detail.others}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {otherGames.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/${locale}/games/${item.slug}`}
                  className="block rounded-xl border border-line bg-surface p-4 transition hover:border-accent/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-2"
                >
                  <span className="text-sm font-bold">
                    {item.content[locale].title}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted">
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
