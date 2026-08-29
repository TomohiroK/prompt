import Link from "next/link";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function SiteHeader({ locale }: { locale: Locale }) {
  const strings = ui[locale];

  return (
    <header className="sticky top-0 z-20 border-b border-line/80 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-2 px-3 sm:px-6">
        <Link
          href={`/${locale}`}
          className="flex min-h-11 shrink-0 items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-2"
        >
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-lg bg-linear-to-br from-accent to-accent-2 text-base font-black text-[#0b0d14]"
          >
            P
          </span>
          {/* 320px 幅ではワードマークを畳み、ナビの折り返しを防ぐ */}
          <span className="hidden text-sm font-extrabold tracking-tight sm:inline sm:text-base">
            {site.name}
          </span>
        </Link>

        <nav className="flex items-center gap-0.5 text-xs font-semibold sm:gap-1 sm:text-sm">
          <a
            href={`/${locale}#games`}
            className="flex min-h-11 items-center rounded-lg px-2.5 whitespace-nowrap text-muted transition hover:bg-surface hover:text-ink sm:px-3"
          >
            {strings.nav.games}
          </a>
          <a
            href={`/${locale}#how-to-use`}
            className="flex min-h-11 items-center rounded-lg px-2.5 whitespace-nowrap text-muted transition hover:bg-surface hover:text-ink sm:px-3"
          >
            {strings.nav.howToUse}
          </a>
          <LocaleSwitcher locale={locale} label={strings.nav.language} />
        </nav>
      </div>
    </header>
  );
}
