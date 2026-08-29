import type { MetadataRoute } from "next";
import { games } from "@/content/games";
import { site } from "@/lib/site";
import { locales, localeTags } from "@/lib/i18n";

/** 各URLに全言語版の hreflang を付けて出力する */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const homeAlternates = Object.fromEntries(
    locales.map((locale) => [localeTags[locale], `${site.url}/${locale}`]),
  );

  const home = locales.map((locale) => ({
    url: `${site.url}/${locale}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 1,
    alternates: { languages: homeAlternates },
  }));

  const gamePages = locales.flatMap((locale) =>
    games.map((game) => ({
      url: `${site.url}/${locale}/games/${game.slug}`,
      lastModified,
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
