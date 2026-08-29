# Prompt Arcade

AIチャットにそのまま貼り付けるだけで遊べる「ゲームになるプロンプト」を集めたサイト。
スマートフォン・PC 両対応、ワンクリックでプロンプト全文をコピーできる。

- 対応言語: 日本語 / English / 한국어 / 中文 / Español / Português（プロンプト本文も全言語）
- 表示言語はブラウザの言語設定から自動判定し、一致しない場合は英語になる
- ホスティング: Vercel

## セットアップ

```bash
npm install
npm run dev     # http://localhost:3000
```

## 主なスクリプト

| コマンド | 内容 |
|---------|------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番ビルド（全42ページを静的生成） |
| `npm run start` | ビルド済みアプリの起動 |
| `npm run lint` | ESLint |

## ディレクトリ構成

```
app/
  [locale]/            # 言語別ルート（ja / en / ko / zh / es / pt）
    layout.tsx         # ルートレイアウト。metadata・hreflang
    page.tsx           # トップ（ヒーロー / 使い方 / ゲーム一覧）
    games/[slug]/      # ゲーム詳細（プロンプト全文 + コピー）
    not-found.tsx
  api/copy/route.ts    # コピー回数の記録・集計API
  robots.ts, sitemap.ts
components/            # UI（Client Component は CopyButton と LocaleSwitcher のみ）
content/
  games/               # ゲーム本文（1ファイル1ゲーム × 6言語）
  types.ts             # Game / GameContent 型、カテゴリ・難易度ラベル
  ui.ts                # UI文言の辞書（6言語）
lib/
  i18n.ts              # ロケール定義、Accept-Language 判定
  site.ts              # サイト名・URL・貼り付け先サービス
  copy-counter.ts      # コピー回数のストレージアダプタ
middleware.ts          # 言語プレフィックスなしパスのリダイレクト
public/                # llms.txt 4種
docs/                  # 設計メモ
```

## 環境変数

| 変数 | 必須 | 用途 |
|------|------|------|
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | 任意 | コピー回数の永続化 |
| `KV_REST_API_URL` / `KV_REST_API_TOKEN` | 任意 | 同上（Vercel KV 形式。上記の代替） |

未設定の場合、コピー回数はプロセス内メモリに記録され、再起動で消える。
本番でランキングを出すには、いずれかの組を設定する。詳細は `docs/README.md`。

## コンテンツの追加

1. `content/games/{slug}.ts` を作り、6言語すべての `content` を埋める
2. `content/games/index.ts` の `games` 配列に追加する
3. `public/llms*.txt` のゲーム一覧を更新する

型が全言語を必須にしているため、翻訳漏れはビルド時に検出される。
