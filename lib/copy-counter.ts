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
export async function incrementCopyCount(slug: string): Promise<number | null> {
  const config = getRedisConfig();

  if (!config) {
    const next = (memoryStore.get(slug) ?? 0) + 1;
    memoryStore.set(slug, next);
    return next;
  }

  try {
    const result = await redisFetch(
      config,
      `incr/${encodeURIComponent(KEY_PREFIX + slug)}`,
    );
    return typeof result === "number" ? result : Number(result);
  } catch (error) {
    console.error("[copy-counter] increment failed", { slug, error });
    return null;
  }
}

/** 指定した slug 群の累計コピー回数を、多い順に返す。 */
export async function getCopyCounts(slugs: string[]): Promise<CopyCount[]> {
  if (slugs.length === 0) return [];

  const config = getRedisConfig();

  if (!config) {
    return sortByCount(
      slugs.map((slug) => ({ slug, count: memoryStore.get(slug) ?? 0 })),
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
