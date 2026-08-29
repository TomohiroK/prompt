import type { Locale } from "@/lib/i18n";
import { phoneCopy } from "@/content/editorial";

/**
 * 端末モック。
 * 画像ではなく DOM で組んでいるため、言語を切り替えると中身も翻訳される。
 * 「コピーして貼る → AIがゲームマスターになる」という一連の流れを、
 * 説明文ではなく画面そのもので見せるための要素。
 */
export function PhoneMock({
  locale,
  className = "",
}: {
  locale: Locale;
  className?: string;
}) {
  const copy = phoneCopy[locale];

  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden rounded-[2rem] bg-purple p-2 shadow-[0_18px_40px_-12px_rgba(59,20,101,0.55)] ring-4 ring-white ${className}`}
    >
      <div className="overflow-hidden rounded-[1.5rem] bg-white">
        {/* アプリのヘッダー */}
        <div className="flex items-center gap-2 bg-linear-to-r from-magenta to-purple-2 px-3 py-2.5 text-white">
          <span className="grid size-6 place-items-center rounded-full bg-white/25 text-[10px] font-black">
            AI
          </span>
          <span className="text-[11px] font-black tracking-wide">
            {copy.app}
          </span>
          <span className="ml-auto flex gap-1">
            <span className="size-1.5 rounded-full bg-white/70" />
            <span className="size-1.5 rounded-full bg-white/70" />
            <span className="size-1.5 rounded-full bg-white/70" />
          </span>
        </div>

        {/* 会話 */}
        <div className="space-y-2.5 bg-pink-soft/45 px-3 py-3">
          <p className="ml-auto max-w-[86%] rounded-2xl rounded-br-sm bg-magenta px-3 py-2 text-[10px] leading-relaxed font-bold text-white">
            {copy.pasted}
          </p>
          <p className="mr-auto max-w-[92%] rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-[10px] leading-relaxed font-bold text-purple shadow-sm">
            {copy.reply}
          </p>
          <p className="ml-auto max-w-[70%] rounded-2xl rounded-br-sm bg-magenta px-3 py-2 text-[10px] leading-relaxed font-bold text-white">
            {copy.ask}
          </p>
          <p className="mr-auto max-w-[62%] rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-[10px] leading-relaxed font-black text-purple shadow-sm">
            {copy.answer}
          </p>
        </div>

        {/* 入力欄 */}
        <div className="flex items-center gap-2 border-t-2 border-pink-soft bg-white px-3 py-2">
          <span className="flex-1 rounded-full bg-pink-soft/60 px-3 py-1.5 text-[9px] font-bold text-ink-2">
            {copy.input}
          </span>
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-magenta text-[10px] font-black text-white">
            →
          </span>
        </div>
      </div>
    </div>
  );
}
