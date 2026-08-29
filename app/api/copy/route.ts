import { NextResponse } from "next/server";
import { games } from "@/content/games";
import {
  getCopyCounts,
  getStorageKind,
  incrementCopyCount,
} from "@/lib/copy-counter";

export const dynamic = "force-dynamic";

const validSlugs = new Set(games.map((game) => game.slug));

/**
 * コピーボタンが押されたことを記録する。
 * 未知の slug は受け付けない（任意のキーで書き込まれるのを防ぐ）。
 */
export async function POST(request: Request) {
  let slug: unknown;

  try {
    const body = (await request.json()) as { slug?: unknown };
    slug = body.slug;
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

  const count = await incrementCopyCount(slug);

  return NextResponse.json(
    { slug, count, storage: getStorageKind() },
    { status: 200 },
  );
}

/** 累計コピー回数を多い順に返す。後日のランキング表示用。 */
export async function GET() {
  const counts = await getCopyCounts(games.map((game) => game.slug));
  const total = counts.reduce((sum, entry) => sum + entry.count, 0);

  return NextResponse.json(
    { total, storage: getStorageKind(), ranking: counts },
    { status: 200 },
  );
}
