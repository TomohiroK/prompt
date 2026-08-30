/**
 * 設定は空。
 *
 * TypeScript の型注釈（`const nextConfig: NextConfig`）は、Next.js の起動時に
 * 実行環境側で型を剥がす必要があり、Node のバージョンによっては構文エラーになる。
 * 設定が空である以上、型注釈を持つ理由がないので素の JavaScript で書く。
 * 型の補完は JSDoc で受け取れる。
 *
 * @type {import("next").NextConfig}
 */
const nextConfig = {};

export default nextConfig;
