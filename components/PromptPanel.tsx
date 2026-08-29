import { chatServices } from "@/lib/site";
import { ui } from "@/content/ui";
import { latinLabels } from "@/content/editorial";
import { format, type Locale } from "@/lib/i18n";
import { CopyButton } from "./CopyButton";
import { Star } from "./art/Decor";

/**
 * プロンプト本文 + ワンクリックコピー + 貼り付け先へのリンク。
 * 本文表示は CSS のスクロールのみで完結させ、クライアント状態を持たない。
 */
export function PromptPanel({
  prompt,
  slug,
  locale,
}: {
  prompt: string;
  slug: string;
  locale: Locale;
}) {
  const strings = ui[locale];

  return (
    <section
      id="prompt"
      aria-labelledby="prompt-heading"
      className="card-pop relative scroll-mt-20 overflow-hidden rounded-3xl bg-white"
    >
      <Star className="absolute top-3 right-3 z-10 size-6 text-sun" />

      <div className="flex items-center justify-between gap-2 bg-linear-to-r from-magenta to-purple px-4 py-2.5 text-white">
        <span className="text-[10px] font-black tracking-[0.24em] uppercase">
          {latinLabels.prompt}
        </span>
        <span className="text-[10px] font-black tracking-[0.1em]">
          {format(strings.detail.promptUnit, {
            count: prompt.length.toLocaleString("en-US"),
          })}
        </span>
      </div>

      <div className="p-4 sm:p-5">
        <h2
          id="prompt-heading"
          className="track-tight text-xl font-black text-purple sm:text-2xl"
        >
          {strings.detail.promptHeading}
        </h2>
        <p className="mt-2 text-sm leading-relaxed font-bold text-ink-2">
          {strings.detail.promptLead}
        </p>

        <div className="mt-4">
          <CopyButton
            text={prompt}
            slug={slug}
            labels={strings.copy}
            size="lg"
          />
        </div>

        <div className="mt-5 rounded-2xl bg-pink-soft/40 p-3">
          <p className="text-[10px] font-black tracking-[0.14em] text-magenta uppercase">
            {strings.detail.openTarget}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {chatServices.map((service) => (
              <a
                key={service.name}
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white px-3.5 text-sm font-black whitespace-nowrap text-purple ring-2 ring-purple transition-colors hover:bg-sun focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple"
              >
                {service.name}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="size-3.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 3h7v7" />
                  <path d="M13 3L6.5 9.5" />
                  <path d="M11 10.5V13H3V5h2.5" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl bg-pink-soft/25 ring-2 ring-pink-soft">
          <div className="max-h-[24rem] overflow-y-auto overscroll-contain p-3 sm:max-h-[32rem] sm:p-4">
            <pre className="prompt-body font-mono text-[12.5px] leading-relaxed text-ink sm:text-[13.5px]">
              {prompt}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
