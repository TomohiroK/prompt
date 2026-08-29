"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type CopyState = "idle" | "copied" | "error";

type Props = {
  /** クリップボードに書き込むテキスト */
  text: string;
  /** コピー回数の集計キー。ランキング用に記録される */
  slug: string;
  labels: { label: string; copied: string; error: string };
  /** 置かれる地色に合わせて反転させる */
  tone?: "magenta" | "white";
  size?: "sm" | "lg";
  className?: string;
};

/**
 * navigator.clipboard が使えない環境（非セキュアコンテキスト等）では
 * textarea + execCommand にフォールバックする。
 */
async function writeToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-1000px";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  const succeeded = document.execCommand("copy");
  document.body.removeChild(textarea);

  if (!succeeded) {
    throw new Error("execCommand('copy') returned false");
  }
}

/**
 * コピー回数を記録する。集計の失敗はコピー体験を妨げてはならないため、
 * 結果を待たず、失敗しても握りつぶす（ログのみ残す）。
 */
function recordCopy(slug: string): void {
  try {
    void fetch("/api/copy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
      keepalive: true,
    }).catch((error: unknown) => {
      console.warn("[CopyButton] failed to record copy", { slug, error });
    });
  } catch (error) {
    console.warn("[CopyButton] failed to record copy", { slug, error });
  }
}

export function CopyButton({
  text,
  slug,
  labels,
  tone = "magenta",
  size = "lg",
  className = "",
}: Props) {
  const [state, setState] = useState<CopyState>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // アンマウント時にタイマーを必ず破棄する
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const handleClick = useCallback(async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    try {
      await writeToClipboard(text);
      setState("copied");
      recordCopy(slug);
    } catch (error) {
      console.error("[CopyButton] copy failed", {
        slug,
        length: text.length,
        error,
      });
      setState("error");
    }

    timerRef.current = setTimeout(() => {
      setState("idle");
      timerRef.current = null;
    }, 2200);
  }, [text, slug]);

  const isCopied = state === "copied";
  const isError = state === "error";

  const sizeClasses =
    size === "lg"
      ? "w-full min-h-14 px-5 text-base sm:text-lg"
      : "w-full min-h-12 px-4 text-sm";

  const idleTone =
    tone === "magenta"
      ? "bg-magenta text-white hover:bg-purple"
      : "bg-white text-purple hover:bg-sun";

  const toneClasses = isCopied
    ? "bg-sun text-purple"
    : isError
      ? "bg-flame text-white"
      : idleTone;

  return (
    <button
      type="button"
      onClick={handleClick}
      data-copy-slug={slug}
      data-copy-state={state}
      className={`group inline-flex items-center justify-between gap-3 rounded-full font-black whitespace-nowrap ring-[3px] ring-purple shadow-[4px_5px_0_0_var(--color-purple)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[5px_7px_0_0_var(--color-purple)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple ${sizeClasses} ${toneClasses} ${className}`}
    >
      <span className="flex items-center gap-2">
        <CopyIcon state={state} />
        <span aria-live="polite">
          {isCopied ? labels.copied : isError ? labels.error : labels.label}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="text-lg leading-none transition-transform duration-150 group-hover:translate-x-1"
      >
        {isCopied ? "✓" : "→"}
      </span>
    </button>
  );
}

function CopyIcon({ state }: { state: CopyState }) {
  if (state === "copied") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="size-5 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 10.5l4 4 8-9" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="size-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="7" y="7" width="9" height="10" rx="1" />
      <path d="M13 4H6a2 2 0 0 0-2 2v8" />
    </svg>
  );
}
