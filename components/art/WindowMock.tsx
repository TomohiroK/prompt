import type { Locale } from "@/lib/i18n";
import { poster } from "@/content/editorial";

/**
 * キービジュアルの中心に置く画面モック。
 *
 * 描いているのは「利用者が使っている AI チャットの画面」であって、
 * このサイトのアプリ画面ではない。
 * 左で規則を貼り、右でAIが相手になる、という体験そのものを
 * 説明文ではなく画面で見せるための要素。
 *
 * 画像ではなく DOM で組んでいるため、言語を切り替えると中身も翻訳される。
 */
export function WindowMock({
  locale,
  templates,
  className = "",
}: {
  locale: Locale;
  /** 左ペインに並べる台本の見出し。扱えるゲームがひと目で分かるようにする */
  templates: string[];
  className?: string;
}) {
  const copy = poster[locale].window;
  const label = poster[locale].templates;

  return (
    <div
      className={`overflow-hidden rounded-2xl bg-white ring-[3px] ring-purple shadow-[0_22px_44px_-16px_rgba(59,20,101,0.55)] sm:rounded-3xl ${className}`}
    >
      {/* ウィンドウの上枠 */}
      <div className="flex items-center gap-2 border-b-2 border-pink-soft px-3 py-2 sm:px-4 sm:py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2 rounded-full bg-magenta sm:size-2.5" />
          <span className="size-2 rounded-full bg-sun sm:size-2.5" />
          <span className="size-2 rounded-full bg-mint sm:size-2.5" />
        </span>
        <span className="ml-1 text-[10px] font-black tracking-[0.14em] text-purple sm:text-xs">
          {copy.title}
        </span>
      </div>

      <div className="grid gap-3 p-3 sm:grid-cols-[1fr_auto_1.05fr] sm:items-stretch sm:gap-3 sm:p-4">
        {/* 1. 貼り付ける */}
        <section className="min-w-0">
          <h3 className="flex items-center gap-2 text-[11px] font-black text-purple sm:text-sm">
            <span
              aria-hidden="true"
              className="grid size-5 shrink-0 place-items-center rounded-full bg-magenta text-[10px] text-white sm:size-6 sm:text-xs"
            >
              1
            </span>
            {copy.step1}
          </h3>
          <p className="mt-1.5 text-[9px] leading-relaxed font-bold text-ink-2 sm:text-[11px]">
            {copy.step1Note}
          </p>

          <p className="mt-2 rounded-xl bg-pink-soft/45 p-2.5 text-[8.5px] leading-relaxed font-medium text-ink ring-2 ring-pink-soft sm:text-[10px]">
            {copy.pasted}
          </p>

          <p className="mt-2 rounded-xl border-2 border-dashed border-magenta/60 py-2.5 text-center text-[9px] font-black text-magenta sm:text-[11px]">
            {copy.paste}
          </p>

          <div className="mt-3 rounded-xl bg-white p-2.5 ring-2 ring-pink-soft">
            <p className="text-[9px] font-black text-purple sm:text-[10px]">
              {label}
            </p>
            <ul className="mt-1.5 space-y-1">
              {templates.map((template) => (
                <li
                  key={template}
                  className="flex items-center gap-1.5 text-[8.5px] font-bold text-ink-2 sm:text-[10px]"
                >
                  <span
                    aria-hidden="true"
                    className="grid size-3 shrink-0 place-items-center rounded-[3px] bg-mint text-[7px] text-white"
                  >
                    ✓
                  </span>
                  {template}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 受け渡しの矢印。縦積みのときは下向きに切り替える */}
        <span
          aria-hidden="true"
          className="mx-auto grid size-7 place-items-center rounded-full bg-purple text-sm font-black text-white sm:size-8 sm:self-center"
        >
          <span className="sm:hidden">↓</span>
          <span className="hidden sm:inline">→</span>
        </span>

        {/* 2. AIが相手になる */}
        <section className="min-w-0">
          <h3 className="flex items-center gap-2 text-[11px] font-black text-purple sm:text-sm">
            <span
              aria-hidden="true"
              className="grid size-5 shrink-0 place-items-center rounded-full bg-purple text-[10px] text-white sm:size-6 sm:text-xs"
            >
              2
            </span>
            {copy.step2}
          </h3>

          <ul className="mt-2 space-y-1.5">
            {copy.chat.map((line, index) => (
              <li
                key={index}
                className={line.from === "me" ? "flex justify-end" : "flex justify-start"}
              >
                <span
                  className={`max-w-[88%] rounded-2xl px-2.5 py-1.5 text-[8.5px] leading-relaxed font-bold sm:text-[10px] ${
                    line.from === "me"
                      ? "rounded-br-sm bg-magenta text-white"
                      : "rounded-bl-sm bg-pink-soft/60 text-purple"
                  }`}
                >
                  {line.text}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-2 flex items-center gap-2 rounded-full bg-pink-soft/45 px-3 py-1.5 text-[9px] font-bold text-ink-2 sm:text-[10px]">
            {copy.input}
            <span
              aria-hidden="true"
              className="ml-auto grid size-5 place-items-center rounded-full bg-magenta text-[9px] text-white"
            >
              →
            </span>
          </p>
        </section>
      </div>
    </div>
  );
}
