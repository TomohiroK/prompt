import Link from "next/link";
import { site } from "@/lib/site";
import { localeNames, locales, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { latinLabels } from "@/content/editorial";
import { Ticker, Star } from "./art/Decor";

/** 奥付。地の明るさを保ったまま、紫の面で画面を締める */
export function SiteFooter({ locale }: { locale: Locale }) {
  const strings = ui[locale];

  return (
    <footer className="mt-20 overflow-hidden">
      <Ticker
        text={latinLabels.ticker}
        className="bg-sun py-2 text-purple"
      />

      <div className="relative bg-purple text-white">
        <Star className="deco absolute top-8 right-6 size-10 text-white/15" />
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="grid size-10 place-items-center rounded-xl bg-white text-sm leading-none font-black text-purple"
            >
              Q!
            </span>
            <p className="track-tight text-2xl font-black">{site.name}</p>
          </div>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">
            {strings.siteDescription}
          </p>

          <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-0 text-sm font-black">
            <Link
              href={`/${locale}`}
              className="flex min-h-11 items-center transition-colors hover:text-sun"
            >
              {strings.detail.breadcrumbHome}
            </Link>
            <a
              href={`/${locale}#games`}
              className="flex min-h-11 items-center transition-colors hover:text-sun"
            >
              {strings.nav.games}
            </a>
            <a
              href={`/${locale}#how-to-use`}
              className="flex min-h-11 items-center transition-colors hover:text-sun"
            >
              {strings.nav.howToUse}
            </a>
            <a
              href="/llms.txt"
              className="flex min-h-11 items-center transition-colors hover:text-sun"
            >
              llms.txt
            </a>
          </nav>

          <div className="mt-4 border-t border-white/25 pt-4">
            <p className="text-[10px] font-black tracking-[0.24em] text-white/60 uppercase">
              {strings.nav.language}
            </p>
            <ul className="mt-1 flex flex-wrap gap-x-5 gap-y-0">
              {locales.map((target) => (
                <li key={target}>
                  <Link
                    href={`/${target}`}
                    hrefLang={target}
                    className={`flex min-h-11 items-center text-sm font-black transition-colors hover:text-sun ${
                      target === locale ? "text-sun" : "text-white/70"
                    }`}
                  >
                    {localeNames[target]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 max-w-lg text-[11px] leading-relaxed text-white/55">
            {strings.footer.disclaimer}
          </p>
          <p className="mt-3 text-[10px] font-black tracking-[0.26em] text-white/45 uppercase">
            {latinLabels.credit} — {latinLabels.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
