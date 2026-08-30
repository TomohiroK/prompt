/**
 * Google Analytics 4 の初期化。
 *
 * この処理を layout.tsx にインラインの <script> として書くと、Next.js の
 * segment prefetch が一部ロケールで 404 を返すようになる（実測で確認）。
 * next/script を使っても同じだったため、インラインを一切持たない形にしている。
 *
 * 測定IDは読み込み側の data-ga-id 属性から受け取る。IDの定義は lib/site.ts の一箇所だけ。
 */
(function () {
  var el = document.currentScript;
  var id = el && el.dataset ? el.dataset.gaId : null;
  if (!id) return;

  window.dataLayer = window.dataLayer || [];
  // gtag.js が先に読み込まれていれば、そちらの実装を壊さない
  window.gtag =
    window.gtag ||
    function () {
      window.dataLayer.push(arguments);
    };

  window.gtag("js", new Date());
  window.gtag("config", id);
})();
