import Link from "next/link";
import { site } from "@/lib/site";
import { localeNames, locales, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";

export function SiteFooter({ locale }: { locale: Locale }) {
  const strings = ui[locale];

  return (
    <footer className="mt-20 border-t border-line/80">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
        <p className="text-sm font-bold">{site.name}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {strings.siteDescription}
        </p>

        <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-sm">
          <Link
            href={`/${locale}`}
            className="flex min-h-11 items-center text-muted transition hover:text-ink"
          >
            {strings.detail.breadcrumbHome}
          </Link>
          <a
            href={`/${locale}#games`}
            className="flex min-h-11 items-center text-muted transition hover:text-ink"
          >
            {strings.nav.games}
          </a>
          <a
            href={`/${locale}#how-to-use`}
            className="flex min-h-11 items-center text-muted transition hover:text-ink"
          >
            {strings.nav.howToUse}
          </a>
          <a
            href="/llms.txt"
            className="flex min-h-11 items-center text-muted transition hover:text-ink"
          >
            llms.txt
          </a>
        </nav>

        <div className="mt-4 border-t border-line/60 pt-4">
          <p className="text-xs font-semibold text-muted/80">
            {strings.nav.language}
          </p>
          <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-0">
            {locales.map((target) => (
              <li key={target}>
                <Link
                  href={`/${target}`}
                  hrefLang={target}
                  className={`flex min-h-11 items-center text-sm transition hover:text-ink ${
                    target === locale ? "font-bold text-accent-2" : "text-muted"
                  }`}
                >
                  {localeNames[target]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted/70">
          {strings.footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
