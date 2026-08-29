# 設計メモ

## 目的

AIチャットに貼るだけで遊べるプロンプトを集めて公開する。
最重要の利用動線は「ページを開く → コピー → AIに貼る」の3手であり、
この動線を最短にすることを設計上の第一基準とする。

## 技術スタック

| 領域 | 採用 | 理由 |
|------|------|------|
| フレームワーク | Next.js 16（App Router） | 静的生成でページを配信しつつ、コピー集計だけを動的に扱える |
| スタイル | Tailwind CSS v4 | モバイルファーストの調整を1ファイルに閉じ込められる |
| ホスティング | Vercel | Next.js の Middleware（言語判定）をそのまま使える |
| フォント | システムフォントスタック | 6言語すべてで追加ダウンロードなしに表示できる |

Web フォントは採用していない。日本語・韓国語・中国語の Web フォントは
容量が大きく、モバイルの初回表示を確実に悪化させるため。

## 多言語対応

- 対応言語: `ja` / `en` / `ko` / `zh` / `es` / `pt`
- URL は `/{locale}/...` 固定。共有されたURLが言語ごとに一意になる
- `middleware.ts` が言語プレフィックスのないパスを `Accept-Language` に従ってリダイレクトする
- どの対応言語にも一致しない場合は英語（`lib/i18n.ts` の `fallbackLocale`）
- `dynamicParams = false` により、未対応の言語コードは404になる

### 翻訳漏れを型で防ぐ

`Game.content` は `Record<Locale, GameContent>` として定義してある。
言語を1つ追加すると、全ゲームでその言語の本文が未定義になり、
`npm run build` の型チェックが落ちる。翻訳漏れは実行時ではなくビルド時に落ちる。

UI文言も同じ方針で `content/ui.ts` の `Record<Locale, UIStrings>` に集約している。

## Server / Client Component の切り分け

Client Component は次の2つだけ。それ以外はすべて Server Component。

| コンポーネント | Client である理由 |
|---------------|------------------|
| `CopyButton` | クリップボード書き込みとコピー後の表示切替に状態が必要 |
| `LocaleSwitcher` | 現在パスを保ったまま言語を切り替えるため `usePathname` が必要 |

プロンプト本文の折りたたみは CSS のスクロール（`max-h` + `overflow-y-auto`）で処理し、
状態を持たせていない。開閉UIは `<details>` を使い、JavaScript を増やしていない。

## コピー回数の記録

`lib/copy-counter.ts` がストレージ非依存のアダプタになっている。

- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`（または Vercel KV の
  `KV_REST_API_URL` / `KV_REST_API_TOKEN`）が設定されていれば Redis に永続化する
- 未設定ならプロセス内メモリに記録する（開発・検証用。再起動で消える）

API は `app/api/copy/route.ts`。

| メソッド | 内容 |
|---------|------|
| `POST /api/copy` `{ slug }` | 該当ゲームのコピー回数を1増やし、増加後の値を返す |
| `GET /api/copy` | 全ゲームのコピー回数を多い順に返す（ランキング表示用） |

設計上の約束:

- 集計の失敗がコピー体験を壊してはならない。`CopyButton` は記録の結果を待たず、
  失敗しても握りつぶす（ログのみ）
- `slug` は掲載中のゲームのホワイトリストで検証する。任意のキーで書き込ませない

現状、UIにはコピー回数を表示していない。ランキングを出す段階で `GET /api/copy` を使う。

## モバイル基準の品質ゲート

`preview` 相当の検証は Playwright + Chromium で自動化しており、
デプロイ前に以下をすべて満たすことを確認する。

- 6言語 × 5ビューポート（320 / 375 / 390 / 768 / 1280）× トップ・詳細で横スクロールが出ない
- 操作要素（ボタン・ナビ）の高さが44px以上
- 320px幅でCTAのテキストが2行に折り返さない
- 6言語 × 6ゲーム = 36通りでコピー内容が画面の本文と完全一致する
- コピー回数が3ラウンド連続で正しく加算される
- `llms.txt` 4種 / `robots.txt` / `sitemap.xml` が200を返す

320px幅はヘッダーが最も詰まる。言語名やワードマークは `sm` 未満で畳んでいる。

## SEO

- `sitemap.xml` は 6言語 × 7ページ = 42URL を hreflang 付きで出力する
- `layout.tsx` が全言語版への hreflang と `x-default`（英語）を持つ
- ページ側で `alternates` を再定義すると layout の hreflang が丸ごと置き換わるため、
  トップページでは `generateMetadata` を定義していない
- AI向けSEOとして `public/llms.txt`・`llms-full.txt`・`llms-en.txt`・`llms-full-en.txt` を配置し、
  `robots.txt` で主要なAIクローラーを明示的に許可している
