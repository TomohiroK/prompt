import Link from "next/link";
import { ui } from "@/content/ui";
import { fallbackLocale } from "@/lib/i18n";

/**
 * ロケール配下の 404。not-found はパラメータを受け取れないため、
 * 表示言語は fallbackLocale（英語）に固定する。
 *
 * 表示言語を合わせようとして headers() を使ってはいけない。
 * ミドルウェアでヘッダーに言語を載せて not-found から読む形を実測したところ、
 * ルート全体が動的レンダリングに切り替わり、48ページの静的生成が失われた。
 *
 *   変更前  ● /ja  静的生成
 *   変更後  ƒ /[locale]  毎リクエストでサーバー生成
 *
 * 404 の言語表示のために払う代償として釣り合わないため、英語固定のままにする。
 */
export default function NotFound() {
  const strings = ui[fallbackLocale];

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-4 py-20 sm:px-6">
      <p className="text-sm font-bold text-magenta">404</p>
      <h1 className="track-tight mt-3 text-2xl font-bold sm:text-3xl">
        {strings.notFound.title}
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-2">
        {strings.notFound.body}
      </p>
      <Link
        href={`/${fallbackLocale}`}
        className="mt-7 inline-flex min-h-12 items-center justify-center rounded-lg bg-magenta px-5 text-sm font-bold whitespace-nowrap text-white transition-colors hover:bg-purple"
      >
        {strings.notFound.back}
      </Link>
    </div>
  );
}
