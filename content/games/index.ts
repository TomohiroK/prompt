import type { Locale } from "@/lib/i18n";
import type { Game, GameCategory, GameContent } from "../types";
import { numberGuess } from "./number-guess";
import { twentyQuestions } from "./twenty-questions";
import { wordWolf } from "./word-wolf";
import { whodunit } from "./whodunit";
import { findTheLiar } from "./find-the-liar";
import { escapeRoom } from "./escape-room";
import { negotiation } from "./negotiation";

/**
 * サイトに掲載するゲーム一覧。表示順はこの配列の順序に従う。
 * ゲームを追加する場合は content/games/ にファイルを作り、ここに追記するだけでよい。
 */
export const games: Game[] = [
  numberGuess,
  whodunit,
  findTheLiar,
  wordWolf,
  escapeRoom,
  negotiation,
  twentyQuestions,
];

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((game) => game.slug === slug);
}

export function getGameContent(game: Game, locale: Locale): GameContent {
  return game.content[locale];
}

/** 掲載されているカテゴリを、games の並び順のまま重複なく返す。 */
export function getUsedCategories(): GameCategory[] {
  return [...new Set(games.map((game) => game.category))];
}
