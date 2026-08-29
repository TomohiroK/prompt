import Link from "next/link";
import { ui } from "@/content/ui";
import { fallbackLocale } from "@/lib/i18n";
import { Burst } from "@/components/art/Decor";

/**
 * ロケール配下の 404。not-found はパラメータを受け取れないため、
 * 表示言語は fallbackLocale（英語）に固定する。
 */
export default function NotFound() {
  const strings = ui[fallbackLocale];

  return (
    <div className="grain relative mx-auto flex max-w-3xl flex-col items-start px-4 py-20 sm:px-6">
      <Burst className="absolute top-10 right-6 size-24 text-flare" />
      <span className="outlined relative text-7xl leading-none font-black italic sm:text-9xl">
        404
      </span>
      <h1 className="track-tight relative mt-4 text-3xl font-black sm:text-4xl">
        {strings.notFound.title}
      </h1>
      <p className="relative mt-3 max-w-md text-sm leading-relaxed text-ink-2">
        {strings.notFound.body}
      </p>
      <Link
        href={`/${fallbackLocale}`}
        className="relative mt-8 inline-flex min-h-12 items-center justify-center border-2 border-ink bg-ink px-5 text-sm font-black whitespace-nowrap text-paper transition-colors hover:bg-shock"
      >
        {strings.notFound.back}
      </Link>
    </div>
  );
}
