/**
 * コピーボタンの押下回数を記録するカウンター。
 *
 * 保存先はストレージ非依存のアダプタで切り替える。
 * - Upstash Redis / Vercel KV の環境変数が設定されていれば、そちらに永続化する
 * - 未設定の場合はプロセス内メモリに記録する（ローカル開発・検証用。再起動で消える）
 *
 * 集計はランキング表示に使うことを前提に、slug ごとの累計値として保持する。
 */

const KEY_PREFIX = "copy:";

/**
 * コピーが押された状況。
 *
 * slug だけを数えていた頃は、6言語ぶんの数が1つに混ざり、一覧から押されたのか
 * 詳細を読んでから押されたのかも分からなかった。どちらも施策の判断に要る。
 */
export type CopyContext = {
  /** 表示していた言語 */
  locale: string;
  /** 押された面。card = 一覧のカード / detail = ゲーム詳細 */
  surface: "card" | "detail";
  /** 訴求の版（lib/site.ts の copyVariant） */
  variant: string;
};

/**
 * 次元つきのキー。累計（copy:{slug}）とは別に積む。
 * 累計を壊さずに内訳を足せるよう、既存キーはそのまま残す。
 */
function contextKey(slug: string, context: CopyContext): string {
  return `copy:d1:${context.variant}:${context.locale}:${context.surface}:${slug}`;
}

/** Upstash Redis REST の接続情報。Vercel KV も同じ形式の環境変数を提供する。 */
function getRedisConfig(): { url: string; token: string } | null {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL ?? "";
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN ?? "";

  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ""), token };
}

/** ストレージ未設定時のフォールバック。プロセス内に保持する。 */
const memoryStore = new Map<string, number>();

export type CopyCount = { slug: string; count: number };

/** 現在の保存先。運用状況の把握とヘルスチェック用に公開する。 */
export function getStorageKind(): "redis" | "memory" {
  return getRedisConfig() ? "redis" : "memory";
}

async function redisFetch(
  config: { url: string; token: string },
  path: string,
): Promise<unknown> {
  const response = await fetch(`${config.url}/${path}`, {
    headers: { Authorization: `Bearer ${config.token}` },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Upstash request failed: path=${path}, status=${response.status}`,
    );
  }

  const body = (await response.json()) as { result?: unknown };
  return body.result;
}

/**
 * slug のコピー回数を1増やし、増加後の累計を返す。
 * 記録に失敗しても呼び出し側の処理は継続できるよう、例外は投げない。
 */
export async function incrementCopyCount(
  slug: string,
  context?: CopyContext,
): Promise<number | null> {
  const config = getRedisConfig();
  const keys = [KEY_PREFIX + slug];
  if (context) keys.push(contextKey(slug, context));

  if (!config) {
    for (const key of keys) memoryStore.set(key, (memoryStore.get(key) ?? 0) + 1);
    return memoryStore.get(keys[0]) ?? 0;
  }

  try {
    // 返すのは累計。内訳の書き込みが失敗しても累計は返す
    const results = await Promise.allSettled(
      keys.map((key) => redisFetch(config, `incr/${encodeURIComponent(key)}`)),
    );
    const first = results[0];
    if (first.status === "rejected") throw first.reason;

    const failed = results.slice(1).filter((r) => r.status === "rejected");
    if (failed.length > 0) {
      console.error("[copy-counter] breakdown increment failed", { slug, context });
    }
    return typeof first.value === "number" ? first.value : Number(first.value);
  } catch (error) {
    console.error("[copy-counter] increment failed", { slug, error });
    return null;
  }
}

/**
 * 内訳を返す。言語 × 面 × ゲーム の全組み合わせを引く。
 * 組み合わせは有限（言語6 × 面2 × ゲーム7 = 84）なので、まとめて取得できる。
 */
export async function getCopyBreakdown(
  slugs: string[],
  locales: readonly string[],
  variant: string,
): Promise<{ locale: string; surface: string; slug: string; count: number }[]> {
  const surfaces = ["card", "detail"] as const;
  const combos = locales.flatMap((locale) =>
    surfaces.flatMap((surface) => slugs.map((slug) => ({ locale, surface, slug }))),
  );
  if (combos.length === 0) return [];

  const keys = combos.map((c) =>
    contextKey(c.slug, { locale: c.locale, surface: c.surface, variant }),
  );
  const config = getRedisConfig();

  if (!config) {
    return combos.map((c, i) => ({ ...c, count: memoryStore.get(keys[i]) ?? 0 }));
  }

  try {
    const result = await redisFetch(
      config,
      `mget/${keys.map((k) => encodeURIComponent(k)).join("/")}`,
    );
    const values = Array.isArray(result) ? result : [];
    return combos.map((c, i) => ({ ...c, count: toCount(values[i]) }));
  } catch (error) {
    console.error("[copy-counter] breakdown read failed", { error });
    return combos.map((c) => ({ ...c, count: 0 }));
  }
}

/** 指定した slug 群の累計コピー回数を、多い順に返す。 */
export async function getCopyCounts(slugs: string[]): Promise<CopyCount[]> {
  if (slugs.length === 0) return [];

  const config = getRedisConfig();

  if (!config) {
    return sortByCount(
      slugs.map((slug) => ({ slug, count: memoryStore.get(KEY_PREFIX + slug) ?? 0 })),
    );
  }

  try {
    const path = `mget/${slugs
      .map((slug) => encodeURIComponent(KEY_PREFIX + slug))
      .join("/")}`;
    const result = await redisFetch(config, path);
    const values = Array.isArray(result) ? result : [];

    return sortByCount(
      slugs.map((slug, index) => ({
        slug,
        count: toCount(values[index]),
      })),
    );
  } catch (error) {
    console.error("[copy-counter] read failed", { error });
    return sortByCount(slugs.map((slug) => ({ slug, count: 0 })));
  }
}

function toCount(value: unknown): number {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function sortByCount(counts: CopyCount[]): CopyCount[] {
  return [...counts].sort(
    (a, b) => b.count - a.count || a.slug.localeCompare(b.slug),
  );
}
