import { NextResponse } from "next/server";
import { games } from "@/content/games";
import {
  getCopyBreakdown,
  getCopyCounts,
  getStorageKind,
  incrementCopyCount,
} from "@/lib/copy-counter";
import { isLocale, locales } from "@/lib/i18n";
import { copyVariant } from "@/lib/site";

export const dynamic = "force-dynamic";

const validSlugs = new Set(games.map((game) => game.slug));
const validSurfaces = new Set(["card", "detail"]);

/**
 * コピーボタンが押されたことを記録する。
 * 未知の slug は受け付けない（任意のキーで書き込まれるのを防ぐ）。
 */
export async function POST(request: Request) {
  let slug: unknown;
  let locale: unknown;
  let surface: unknown;

  try {
    const body = (await request.json()) as {
      slug?: unknown;
      locale?: unknown;
      surface?: unknown;
    };
    slug = body.slug;
    locale = body.locale;
    surface = body.surface;
  } catch {
    return NextResponse.json(
      { error: "Request body must be JSON with a slug field" },
      { status: 400 },
    );
  }

  if (typeof slug !== "string" || !validSlugs.has(slug)) {
    return NextResponse.json(
      { error: `Unknown slug: ${String(slug)}` },
      { status: 400 },
    );
  }

  /**
   * 次元は付いていなくても記録を止めない。累計が本体で、内訳は補助。
   * 想定外の値はキーに混ぜず unknown に寄せる（任意の文字列でキーを増やさせない）。
   */
  const context = {
    locale: typeof locale === "string" && isLocale(locale) ? locale : "unknown",
    surface:
      typeof surface === "string" && validSurfaces.has(surface)
        ? (surface as "card" | "detail")
        : ("detail" as const),
    variant: copyVariant,
  };

  const count = await incrementCopyCount(slug, context);

  return NextResponse.json(
    { slug, count, storage: getStorageKind() },
    { status: 200 },
  );
}

/**
 * 累計コピー回数を多い順に返す。後日のランキング表示用。
 * `?breakdown=1` を付けると、今の版の 言語 × 面 × ゲーム の内訳も返す。
 */
export async function GET(request: Request) {
  const slugs = games.map((game) => game.slug);
  const counts = await getCopyCounts(slugs);
  const total = counts.reduce((sum, entry) => sum + entry.count, 0);

  const wantsBreakdown =
    new URL(request.url).searchParams.get("breakdown") === "1";

  return NextResponse.json(
    {
      total,
      storage: getStorageKind(),
      variant: copyVariant,
      ranking: counts,
      ...(wantsBreakdown
        ? { breakdown: await getCopyBreakdown(slugs, locales, copyVariant) }
        : {}),
    },
    { status: 200 },
  );
}
