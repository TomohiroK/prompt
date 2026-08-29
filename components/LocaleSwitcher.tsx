"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isLocale, localeNames, locales, type Locale } from "@/lib/i18n";

/**
 * 言語切替。現在のパスを保ったまま先頭のロケールだけ差し替えるため、
 * 現在パスを知る必要があり Client Component にしている。
 * 開閉は details 要素に任せ、状態は持たない。
 */
export function LocaleSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname() ?? `/${locale}`;

  const segments = pathname.split("/");
  const rest = isLocale(segments[1] ?? "") ? segments.slice(2).join("/") : "";
  const hrefFor = (target: Locale) => `/${target}${rest ? `/${rest}` : ""}`;

  return (
    <details className="relative">
      <summary
        aria-label={label}
        className="flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold whitespace-nowrap text-muted transition hover:bg-surface hover:text-ink sm:text-sm [&::-webkit-details-marker]:hidden"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="size-4 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <circle cx="10" cy="10" r="7.2" />
          <path d="M2.8 10h14.4M10 2.8c1.9 2 2.9 4.5 2.9 7.2s-1 5.2-2.9 7.2c-1.9-2-2.9-4.5-2.9-7.2s1-5.2 2.9-7.2z" />
        </svg>
        {/* 320px 幅ではヘッダーが溢れるため、言語名は sm 以上でのみ表示する */}
        <span className="hidden sm:inline">{localeNames[locale]}</span>
      </summary>

      <ul className="absolute right-0 z-30 mt-1 w-40 overflow-hidden rounded-xl border border-line bg-surface py-1 shadow-2xl shadow-black/40">
        {locales.map((target) => (
          <li key={target}>
            <Link
              href={hrefFor(target)}
              hrefLang={target}
              className={`flex min-h-11 items-center px-4 text-sm transition hover:bg-surface-2 ${
                target === locale ? "font-bold text-accent-2" : "text-ink"
              }`}
            >
              {localeNames[target]}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
