import Link from "next/link";
import { ui } from "@/content/ui";
import { fallbackLocale } from "@/lib/i18n";

/**
 * ロケール配下の 404。not-found はパラメータを受け取れないため、
 * 表示言語は fallbackLocale（英語）に固定する。
 */
export default function NotFound() {
  const strings = ui[fallbackLocale];

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-4 py-20 sm:px-6">
      <p className="text-sm font-bold text-accent-2">404</p>
      <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
        {strings.notFound.title}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {strings.notFound.body}
      </p>
      <Link
        href={`/${fallbackLocale}`}
        className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-linear-to-r from-accent to-accent-2 px-5 text-sm font-bold whitespace-nowrap text-[#0b0d14]"
      >
        {strings.notFound.back}
      </Link>
    </div>
  );
}
