import { chatServices } from "@/lib/site";
import { ui } from "@/content/ui";
import { format, type Locale } from "@/lib/i18n";
import { CopyButton } from "./CopyButton";

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
      className="scroll-mt-20 rounded-2xl border border-line bg-surface p-4 sm:p-6"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="prompt-heading" className="text-lg font-extrabold sm:text-xl">
          {strings.detail.promptHeading}
        </h2>
        <p className="text-xs text-muted">
          {format(strings.detail.promptUnit, {
            count: prompt.length.toLocaleString("en-US"),
          })}
        </p>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-muted">
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

      <div className="mt-4">
        <p className="text-xs font-semibold text-muted">
          {strings.detail.openTarget}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {chatServices.map((service) => (
            <a
              key={service.name}
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-line bg-surface-2 px-3 text-sm font-semibold whitespace-nowrap text-ink transition hover:border-accent/45 hover:text-accent-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-2"
            >
              {service.name}
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="size-3.5 shrink-0 opacity-60"
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
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-line bg-bg">
        <div className="max-h-[26rem] overflow-y-auto overscroll-contain p-3 sm:max-h-[34rem] sm:p-5">
          <pre className="prompt-body font-mono text-[13px] leading-relaxed text-ink/90 sm:text-sm">
            {prompt}
          </pre>
        </div>
      </div>
    </section>
  );
}
