import { NextResponse, type NextRequest } from "next/server";
import { isLocale, matchLocale } from "@/lib/i18n";

/**
 * 言語プレフィックスのないパスを、ブラウザの言語設定に合わせて
 * /{locale}/... にリダイレクトする。
 * Accept-Language が対応言語に一致しない場合は英語になる（fallbackLocale）。
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const firstSegment = pathname.split("/")[1] ?? "";
  if (isLocale(firstSegment)) {
    return NextResponse.next();
  }

  const locale = matchLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  // api / _next / 拡張子つきの静的ファイル（llms.txt, robots.txt 等）は対象外
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
