import type { MetadataRoute } from "next";
import { games } from "@/content/games";
import { site } from "@/lib/site";
import { locales, localeTags } from "@/lib/i18n";

/**
 * 各URLに全言語版の hreflang を付けて出力する。
 *
 * lastModified はビルド時刻ではなく、ゲームごとの本文の更新日を使う。
 * ビルド時刻を入れると、デプロイのたびに全URLが「更新された」ことになり、
 * 更新の合図として意味を失う。頻繁にデプロイするほど信用されなくなる。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  /** トップは一覧なので、掲載中のゲームで最も新しい更新日を使う */
  const latest = games
    .map((game) => game.updatedAt)
    .reduce((a, b) => (a > b ? a : b));

  const homeAlternates = Object.fromEntries(
    locales.map((locale) => [localeTags[locale], `${site.url}/${locale}`]),
  );

  const home = locales.map((locale) => ({
    url: `${site.url}/${locale}`,
    lastModified: latest,
    changeFrequency: "weekly" as const,
    priority: 1,
    alternates: { languages: homeAlternates },
  }));

  const gamePages = locales.flatMap((locale) =>
    games.map((game) => ({
      url: `${site.url}/${locale}/games/${game.slug}`,
      lastModified: game.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((target) => [
            localeTags[target],
            `${site.url}/${target}/games/${game.slug}`,
          ]),
        ),
      },
    })),
  );

  return [...home, ...gamePages];
}
