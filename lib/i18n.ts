/** 対応言語。追加する場合は content/ui.ts と各ゲームの content も併せて追加する。 */
export const locales = ["ja", "en", "ko", "zh", "es", "pt"] as const;

export type Locale = (typeof locales)[number];

/**
 * 言語が特定できなかった場合のフォールバック。
 * 通常はブラウザの Accept-Language から判定するため、ここに落ちるのは
 * 対応言語にまったく一致しなかった場合のみ。
 */
export const fallbackLocale: Locale = "en";

/** 言語切替UIに出す表記（各言語の自称） */
export const localeNames: Record<Locale, string> = {
  ja: "日本語",
  en: "English",
  ko: "한국어",
  zh: "中文",
  es: "Español",
  pt: "Português",
};

/** html lang 属性 / hreflang に使う BCP 47 タグ */
export const localeTags: Record<Locale, string> = {
  ja: "ja",
  en: "en",
  ko: "ko",
  zh: "zh-Hans",
  es: "es",
  pt: "pt",
};

/** OpenGraph の locale */
export const ogLocales: Record<Locale, string> = {
  ja: "ja_JP",
  en: "en_US",
  ko: "ko_KR",
  zh: "zh_CN",
  es: "es_ES",
  pt: "pt_BR",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Accept-Language ヘッダーから対応言語を選ぶ。
 * "zh-TW,zh;q=0.9,en;q=0.8" のような優先度付きリストを q 値順に評価する。
 */
export function matchLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return fallbackLocale;

  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const quality = qParam ? Number.parseFloat(qParam.split("=")[1]) : 1;
      return {
        tag: tag.trim().toLowerCase(),
        quality: Number.isFinite(quality) ? quality : 0,
      };
    })
    .filter((entry) => entry.tag.length > 0)
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of ranked) {
    const primary = tag.split("-")[0];
    if (isLocale(primary)) return primary;
    // zh-tw / zh-hk なども中国語として扱う
    if (primary === "cmn" || primary === "yue") return "zh";
  }

  return fallbackLocale;
}

/** 文字列中の {count} などのプレースホルダを置換する */
export function format(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
