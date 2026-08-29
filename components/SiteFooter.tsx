import Link from "next/link";
import { site } from "@/lib/site";
import { localeNames, locales, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { latinLabels } from "@/content/editorial";
import { Ticker } from "./art/Decor";
import { RegistrationMark } from "./art/Decor";

/** 奥付。誌面の締めとして墨ベタで受け、本文の明るさを際立たせる */
export function SiteFooter({ locale }: { locale: Locale }) {
  const strings = ui[locale];

  return (
    <footer className="mt-24 border-t-2 border-ink bg-ink text-paper">
      <Ticker
        text={latinLabels.ticker}
        className="border-b border-paper/20 bg-flare py-1.5 text-ink"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <RegistrationMark className="absolute top-6 right-5 size-6 text-paper/35" />

        <div className="flex items-baseline gap-3">
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center bg-flare text-sm leading-none font-black text-ink"
          >
            PA
          </span>
          <p className="track-tight text-2xl font-black">{site.name}</p>
        </div>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/75">
          {strings.siteDescription}
        </p>

        <nav className="mt-7 flex flex-wrap gap-x-6 gap-y-0 text-sm font-bold">
          <Link
            href={`/${locale}`}
            className="flex min-h-11 items-center underline decoration-flare decoration-2 underline-offset-4 transition-colors hover:text-flare"
          >
            {strings.detail.breadcrumbHome}
          </Link>
          <a
            href={`/${locale}#games`}
            className="flex min-h-11 items-center underline decoration-flare decoration-2 underline-offset-4 transition-colors hover:text-flare"
          >
            {strings.nav.games}
          </a>
          <a
            href={`/${locale}#how-to-use`}
            className="flex min-h-11 items-center underline decoration-flare decoration-2 underline-offset-4 transition-colors hover:text-flare"
          >
            {strings.nav.howToUse}
          </a>
          <a
            href="/llms.txt"
            className="flex min-h-11 items-center underline decoration-flare decoration-2 underline-offset-4 transition-colors hover:text-flare"
          >
            llms.txt
          </a>
        </nav>

        <div className="mt-6 border-t border-paper/25 pt-4">
          <p className="text-[10px] font-black tracking-[0.28em] text-paper/60 uppercase">
            {strings.nav.language}
          </p>
          <ul className="mt-1 flex flex-wrap gap-x-5 gap-y-0">
            {locales.map((target) => (
              <li key={target}>
                <Link
                  href={`/${target}`}
                  hrefLang={target}
                  className={`flex min-h-11 items-center text-sm font-bold transition-colors hover:text-flare ${
                    target === locale ? "text-flare" : "text-paper/70"
                  }`}
                >
                  {localeNames[target]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 max-w-lg text-[11px] leading-relaxed text-paper/50">
          {strings.footer.disclaimer}
        </p>
        <p className="mt-3 text-[9px] font-black tracking-[0.3em] text-paper/40 uppercase">
          {latinLabels.credit}
        </p>
      </div>
    </footer>
  );
}
