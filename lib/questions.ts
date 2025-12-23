import { Difficulty, QuestionType, Artist } from "./types";
import { artists } from "./artists";

export const questionTypeByDifficulty: Record<
  Difficulty,
  QuestionType
> = {
  쉬움: "COMMON_PERIOD",
  중간: "TITLE",
  어려움: "ARTIST_AND_PERIOD",
};

export function pickArtists(
  difficulty: Difficulty,
  count: number
): Artist[] {
  if (difficulty === "쉬움") {
    const period =
      artists[Math.floor(Math.random() * artists.length)].period;

    return artists
      .filter((a) => a.period === period)
      .slice(0, count);
  }

  return [...artists]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}
