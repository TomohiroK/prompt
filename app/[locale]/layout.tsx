import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import {
  isLocale,
  locales,
  localeTags,
  ogLocales,
  type Locale,
} from "@/lib/i18n";
import { ui } from "@/content/ui";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "../globals.css";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** 未対応の言語コードは 404 にする */
export const dynamicParams = false;

/** 全言語版への hreflang。x-default は英語版を指す。 */
const languageAlternates = Object.fromEntries(
  locales.map((locale) => [localeTags[locale], `/${locale}`]),
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const strings = ui[locale];
  const title = `${site.name} — ${strings.hero.title1} ${strings.hero.title2}`;

  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s | ${site.name}` },
    description: strings.siteDescription,
    applicationName: site.name,
    authors: [{ name: site.author }],
    openGraph: {
      type: "website",
      locale: ogLocales[locale],
      url: `${site.url}/${locale}`,
      siteName: site.name,
      title,
      description: strings.siteDescription,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: strings.siteDescription,
    },
    alternates: {
      canonical: `/${locale}`,
      languages: { ...languageAlternates, "x-default": "/en" },
    },
    /**
     * アイコンは public/ に置き、ここで明示的に宣言する。
     * app/icon.svg 等のファイル規約は、このプロジェクトのようにルートレイアウトが
     * 動的セグメント（[locale]）配下にある構成では拾われず 404 になる。
     */
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#f7f2fd",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale: Locale = locale;

  return (
    <html lang={localeTags[typedLocale]}>
      <head>
        {/* AI 向け SEO: metadata API は text/plain の alternate を出力しないため直接記述する */}
        <link
          rel="alternate"
          type="text/plain"
          title="LLMs.txt"
          href="/llms.txt"
        />
        <link
          rel="alternate"
          type="text/plain"
          title="LLMs.txt (English)"
          href="/llms-en.txt"
          hrefLang="en"
        />
      </head>
      <body className="min-h-dvh flex flex-col">
        <SiteHeader locale={typedLocale} />
        <main className="flex-1">{children}</main>
        <SiteFooter locale={typedLocale} />
      </body>
    </html>
  );
}
