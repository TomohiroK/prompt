import Link from "next/link";
import { ui } from "@/content/ui";
import { fallbackLocale } from "@/lib/i18n";
import { Confetti, Rays, Star } from "@/components/art/Decor";
import { PopTitle } from "@/components/Type";

/**
 * ロケール配下の 404。not-found はパラメータを受け取れないため、
 * 表示言語は fallbackLocale（英語）に固定する。
 */
export default function NotFound() {
  const strings = ui[fallbackLocale];

  return (
    <div className="relative overflow-hidden">
      <Rays />
      <Confetti />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center sm:px-6">
        <Star className="size-10 text-sun" />
        <p className="mt-2 text-[16vw] leading-none font-black sm:text-9xl">
          <PopTitle text="404" tone="white" />
        </p>
        <h1 className="track-tight mt-5 text-2xl font-black text-purple sm:text-3xl">
          {strings.notFound.title}
        </h1>
        <p className="mt-3 max-w-md rounded-2xl bg-white/80 px-4 py-3 text-sm leading-relaxed font-bold text-ink-2">
          {strings.notFound.body}
        </p>
        <Link
          href={`/${fallbackLocale}`}
          className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-magenta px-6 text-sm font-black whitespace-nowrap text-white ring-[3px] ring-purple shadow-[5px_6px_0_0_var(--color-purple)] transition-all hover:-translate-y-0.5 hover:bg-purple"
        >
          {strings.notFound.back}
        </Link>
      </div>
    </div>
  );
}
