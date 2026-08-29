import Link from "next/link";
import { site } from "@/lib/site";
import { localeNames, locales, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";

export function SiteFooter({ locale }: { locale: Locale }) {
  const strings = ui[locale];

  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
        <p className="track-tight text-base font-bold">{site.name}</p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-2">
          {strings.siteDescription}
        </p>

        <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-0 text-sm">
          <Link
            href={`/${locale}`}
            className="flex min-h-11 items-center transition-colors hover:text-magenta"
          >
            {strings.detail.breadcrumbHome}
          </Link>
          <a
            href={`/${locale}#games`}
            className="flex min-h-11 items-center transition-colors hover:text-magenta"
          >
            {strings.nav.games}
          </a>
          <a
            href={`/${locale}#how-to-use`}
            className="flex min-h-11 items-center transition-colors hover:text-magenta"
          >
            {strings.nav.howToUse}
          </a>
          <a
            href="/llms.txt"
            className="flex min-h-11 items-center transition-colors hover:text-magenta"
          >
            llms.txt
          </a>
        </nav>

        <div className="mt-4 border-t border-line pt-4">
          <p className="text-xs text-ink-2">{strings.nav.language}</p>
          <ul className="mt-1 flex flex-wrap gap-x-5 gap-y-0">
            {locales.map((target) => (
              <li key={target}>
                <Link
                  href={`/${target}`}
                  hrefLang={target}
                  className={`flex min-h-11 items-center text-sm transition-colors hover:text-magenta ${
                    target === locale ? "font-bold text-magenta" : "text-ink-2"
                  }`}
                >
                  {localeNames[target]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 max-w-lg text-xs leading-relaxed text-ink-2">
          {strings.footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
