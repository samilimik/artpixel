export type Difficulty = "쉬움" | "중간" | "어려움";

export type Artist = {
  name: string;
  image: string;
  period: string;
  title: string;
};

export type QuestionType =
  | "COMMON_PERIOD"
  | "TITLE"
  | "ARTIST_AND_PERIOD";
