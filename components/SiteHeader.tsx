import Link from "next/link";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { latinLabels } from "@/content/editorial";
import { LocaleSwitcher } from "./LocaleSwitcher";

/** 誌面のヘッダー。太い罫線と欧文の小札で「刊行物」の骨格を作る */
export function SiteHeader({ locale }: { locale: Locale }) {
  const strings = ui[locale];

  return (
    <header className="sticky top-0 z-30 border-b-2 border-ink bg-paper">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-3 sm:h-16 sm:px-6">
        <Link
          href={`/${locale}`}
          className="flex min-h-11 shrink-0 items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center bg-ink text-[13px] leading-none font-black text-flare"
          >
            PA
          </span>
          {/* 320px 幅ではワードマークを畳み、ナビの折り返しを防ぐ */}
          <span className="track-tight hidden text-sm font-black sm:inline sm:text-base">
            {site.name}
          </span>
          <span className="hidden text-[9px] font-black tracking-[0.24em] text-ink-2 md:inline">
            {latinLabels.issue}
          </span>
        </Link>

        <nav className="flex items-center gap-0.5 text-[11px] font-black sm:gap-2 sm:text-xs">
          <a
            href={`/${locale}#games`}
            className="flex min-h-11 items-center px-2 whitespace-nowrap underline decoration-2 underline-offset-4 transition-colors hover:text-shock sm:px-2.5"
          >
            {strings.nav.games}
          </a>
          <a
            href={`/${locale}#how-to-use`}
            className="flex min-h-11 items-center px-2 whitespace-nowrap underline decoration-2 underline-offset-4 transition-colors hover:text-shock sm:px-2.5"
          >
            {strings.nav.howToUse}
          </a>
          <LocaleSwitcher locale={locale} label={strings.nav.language} />
        </nav>
      </div>
    </header>
  );
}
