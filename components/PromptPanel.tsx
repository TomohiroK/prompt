import { chatServices } from "@/lib/site";
import { ui } from "@/content/ui";
import { format, type Locale } from "@/lib/i18n";
import { CopyButton } from "./CopyButton";

/**
 * プロンプト本文とコピーボタン。このサイトの中心。
 * 本文表示は CSS のスクロールだけで完結させ、クライアント状態を持たない。
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
      className="scroll-mt-20 rounded-xl border border-line bg-surface p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="prompt-heading" className="track-tight text-xl font-bold">
          {strings.detail.promptHeading}
        </h2>
        <span className="text-xs text-ink-2">
          {format(strings.detail.promptUnit, {
            count: prompt.length.toLocaleString("en-US"),
          })}
        </span>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-ink-2">
        {strings.detail.promptLead}
      </p>

      <div className="mt-4">
        <CopyButton
          text={prompt}
          slug={slug}
          locale={locale}
          surface="detail"
          labels={strings.copy}
          size="lg"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="text-xs text-ink-2">{strings.detail.openTarget}</span>
        {chatServices.map((service) => (
          <a
            key={service.name}
            href={service.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1 text-sm font-bold whitespace-nowrap text-purple underline underline-offset-4 transition-colors hover:text-magenta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
          >
            {service.name}
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="size-3.5 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
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

      <div className="mt-5 overflow-hidden rounded-lg border border-line bg-bg">
        <div className="max-h-[26rem] overflow-y-auto overscroll-contain p-4 sm:max-h-[34rem]">
          <pre className="prompt-body font-mono text-[13px] leading-relaxed">
            {prompt}
          </pre>
        </div>
      </div>
    </section>
  );
}
