import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { games, getGameBySlug } from "@/content/games";
import { ui } from "@/content/ui";
import { latinLabels } from "@/content/editorial";
import { CategoryBadge, DifficultyBadge } from "@/components/Badge";
import { PromptPanel } from "@/components/PromptPanel";
import { GameEmblem } from "@/components/art/GameEmblem";
import { Halftone, Rays, Star, Sparkle } from "@/components/art/Decor";
import { Kicker, MetaRow, PopTitle } from "@/components/Type";
import { getGameArt } from "@/lib/game-art";
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
  const art = getGameArt(game.slug);
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

      {/* ============ 表紙 ============ */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: art.ground, color: art.onGround }}
      >
        <Rays />
        <Halftone className="inset-0 opacity-40" />

        <div className="relative mx-auto max-w-4xl overflow-hidden px-4 pt-5 sm:px-6 sm:pt-8">
          <nav
            aria-label="breadcrumb"
            className="text-[10px] font-black tracking-[0.14em] uppercase"
          >
            <Link
              href={`/${locale}`}
              className="underline decoration-2 underline-offset-4 opacity-85 transition-opacity hover:opacity-100"
            >
              {strings.detail.breadcrumbHome}
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <a
              href={`/${locale}#games`}
              className="underline decoration-2 underline-offset-4 opacity-85 transition-opacity hover:opacity-100"
            >
              {strings.detail.breadcrumbGames}
            </a>
          </nav>

          {/*
            通し番号とキャラクターは文字の背面に置き、右端で断ち切る。
            列を分けると表題の幅が足りず語中で改行するため、重ねる構成にしている。
          */}
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute -top-1 right-0 z-0 text-[4.6rem] leading-none font-black italic opacity-30 sm:-top-3 sm:text-[9rem]"
            >
              {art.index}
            </span>
            <GameEmblem
              slug={game.slug}
              accent={art.accent}
              ground={art.ground}
              className="absolute -right-7 -bottom-3 z-0 size-32 sm:-right-10 sm:size-52"
            />
            <Sparkle className="absolute top-8 right-28 z-0 size-8 text-white/70 sm:right-44 sm:size-12" />

            <div className="relative z-10 pt-5 pb-8 sm:pt-8 sm:pb-14">
              <div className="flex flex-wrap items-center gap-2">
                <CategoryBadge category={game.category} locale={locale} />
                <DifficultyBadge difficulty={game.difficulty} locale={locale} />
              </div>

              <h1 className="track-tight mt-4 text-[8vw] leading-[1.02] font-black sm:text-5xl lg:text-6xl">
                <PopTitle text={content.title} tone="white" />
              </h1>

              <p className="mt-4 inline-block max-w-[64%] rounded-xl bg-white px-3 py-2 text-sm leading-relaxed font-black text-purple sm:max-w-md sm:text-base">
                {content.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-start">
          <p className="rounded-2xl bg-white/80 p-4 text-sm leading-relaxed font-bold text-ink sm:text-base">
            {content.description}
          </p>
          <MetaRow
            className="w-full ring-2 ring-purple sm:w-64"
            items={[
              { label: strings.detail.playtime, value: content.playtime },
              { label: strings.detail.players, value: content.players },
              {
                label: strings.card.chars,
                value: content.prompt.length.toLocaleString("en-US"),
              },
            ]}
          />
        </div>

        <div className="mt-8">
          <PromptPanel
            prompt={content.prompt}
            slug={game.slug}
            locale={locale}
          />
        </div>

        {/* ============ 遊び方 ============ */}
        <section
          aria-labelledby="how-to-play-heading"
          className="card-pop-sm mt-12 rounded-3xl bg-white p-5 sm:p-6"
        >
          <div className="flex flex-wrap items-center gap-3">
            <Kicker tone="purple">{latinLabels.steps}</Kicker>
            <h2
              id="how-to-play-heading"
              className="track-tight text-2xl font-black text-purple sm:text-3xl"
            >
              {strings.detail.howToPlay}
            </h2>
          </div>

          <ol className="mt-5">
            {content.howToPlay.map((step, index) => (
              <li
                key={step}
                className="flex gap-3.5 border-b-2 border-pink-soft py-3.5 last:border-b-0"
              >
                <span
                  aria-hidden="true"
                  className="grid size-7 shrink-0 place-items-center rounded-full bg-magenta text-xs font-black text-white"
                >
                  {index + 1}
                </span>
                <span className="pt-0.5 text-sm leading-relaxed font-bold text-ink-2">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* ============ 攻略のヒント ============ */}
        <section
          aria-labelledby="tips-heading"
          className="card-pop-sm relative mt-8 overflow-hidden rounded-3xl bg-sun p-5 sm:p-6"
        >
          <Star className="absolute -top-3 -right-3 size-20 text-white/50" />
          <div className="relative flex flex-wrap items-center gap-3">
            <Kicker tone="purple">{latinLabels.tips}</Kicker>
            <h2
              id="tips-heading"
              className="track-tight text-2xl font-black text-purple sm:text-3xl"
            >
              {strings.detail.tips}
            </h2>
          </div>
          <ul className="relative mt-4 space-y-3">
            {content.tips.map((tip) => (
              <li key={tip} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-3 shrink-0 rotate-45 rounded-[3px] bg-magenta"
                />
                <span className="text-sm leading-relaxed font-bold text-purple">
                  {tip}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ============ ほかのゲーム ============ */}
        <section aria-labelledby="others-heading" className="mt-14">
          <div className="flex flex-wrap items-center gap-3">
            <Kicker tone="purple">{latinLabels.others}</Kicker>
            <h2
              id="others-heading"
              className="track-tight text-2xl font-black text-purple sm:text-3xl"
            >
              {strings.detail.others}
            </h2>
          </div>

          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {otherGames.map((item) => {
              const itemArt = getGameArt(item.slug);
              return (
                <li key={item.slug}>
                  <Link
                    href={`/${locale}/games/${item.slug}`}
                    className="card-pop-sm group flex items-stretch overflow-hidden rounded-2xl bg-white transition-transform duration-150 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple"
                  >
                    <span
                      className="grid w-20 shrink-0 place-items-center"
                      style={{
                        backgroundColor: itemArt.ground,
                        color: itemArt.onGround,
                      }}
                    >
                      <GameEmblem
                        slug={item.slug}
                        accent={itemArt.accent}
                        ground={itemArt.ground}
                        className="size-14"
                      />
                    </span>
                    <span className="min-w-0 flex-1 p-3.5">
                      <span className="track-tight block text-sm font-black text-purple group-hover:text-magenta">
                        {item.content[locale].title}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed font-bold text-ink-2">
                        {item.content[locale].tagline}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </>
  );
}
