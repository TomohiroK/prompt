import Link from "next/link";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function SiteHeader({ locale }: { locale: Locale }) {
  const strings = ui[locale];

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-2 px-4 sm:h-16 sm:px-6">
        <Link
          href={`/${locale}`}
          className="track-tight flex min-h-11 shrink-0 items-center text-base font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta sm:text-lg"
        >
          {site.name}
        </Link>

        <nav className="flex items-center gap-1 text-sm sm:gap-2">
          <a
            href={`/${locale}#games`}
            className="flex min-h-11 items-center rounded-lg px-2.5 whitespace-nowrap transition-colors hover:text-magenta"
          >
            {strings.nav.games}
          </a>
          <a
            href={`/${locale}#how-to-use`}
            className="hidden min-h-11 items-center rounded-lg px-2.5 whitespace-nowrap transition-colors hover:text-magenta sm:flex"
          >
            {strings.nav.howToUse}
          </a>
          <LocaleSwitcher locale={locale} label={strings.nav.language} />
        </nav>
      </div>
    </header>
  );
}
