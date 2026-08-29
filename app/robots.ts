import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** AIクローラーを明示的に許可する（.claude/rules/ai-seo.md 準拠） */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-Web",
  "ClaudeBot",
  "Anthropic-AI",
  "PerplexityBot",
  "Bytespider",
  "CCBot",
  "Google-Extended",
  "Cohere-AI",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
