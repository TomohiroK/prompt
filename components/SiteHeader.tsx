import Link from "next/link";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function SiteHeader({ locale }: { locale: Locale }) {
  const strings = ui[locale];

  return (
    <header className="sticky top-0 z-30 border-b-[3px] border-purple bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-3 sm:h-16 sm:px-6">
        <Link
          href={`/${locale}`}
          className="flex min-h-11 shrink-0 items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple"
        >
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-xl bg-linear-to-br from-magenta to-purple text-[13px] leading-none font-black text-white"
          >
            CG
          </span>
          {/* 320px 幅ではワードマークを畳み、ナビの折り返しを防ぐ */}
          <span className="track-tight hidden text-sm font-black text-purple sm:inline sm:text-base">
            {site.name}
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-[11px] font-black sm:gap-2 sm:text-xs">
          <a
            href={`/${locale}#games`}
            className="flex min-h-11 items-center rounded-full px-2.5 whitespace-nowrap text-purple transition-colors hover:bg-pink-soft sm:px-3"
          >
            {strings.nav.games}
          </a>
          <a
            href={`/${locale}#how-to-use`}
            className="flex min-h-11 items-center rounded-full px-2.5 whitespace-nowrap text-purple transition-colors hover:bg-pink-soft sm:px-3"
          >
            {strings.nav.howToUse}
          </a>
          <LocaleSwitcher locale={locale} label={strings.nav.language} />
        </nav>
      </div>
    </header>
  );
}
