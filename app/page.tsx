"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { Difficulty, Artist } from "@/lib/types";
import { pickArtists, questionTypeByDifficulty } from "@/lib/questions";

const difficulties: Record<Difficulty, number> = {
  쉬움: 4,
  중간: 9,
  어려움: 16,
};

const QUESTION_COUNT = 5;
const MAX_TRIES = 3;

export default function ArtPuzzleGamePage() {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [quizArtists, setQuizArtists] = useState<Artist[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [order, setOrder] = useState<number[]>([]);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [tries, setTries] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startGame = (level: Difficulty) => {
    const selected = pickArtists(level, QUESTION_COUNT);
    setQuizArtists(selected);
    setDifficulty(level);
    setCurrentIndex(0);
    setScore(0);
    resetQuestion(level);
  };

  const resetQuestion = (level: Difficulty) => {
    const count = difficulties[level];
    setOrder([...Array(count).keys()].sort(() => Math.random() - 0.5));
    setAnswer("");
    setTries(0);
    setRevealed(false);
    setError(null);
  };

  const artist = quizArtists[currentIndex];
  const pieces = difficulty ? difficulties[difficulty] : 0;
  const gridSize = Math.sqrt(pieces);
  const questionType = difficulty
    ? questionTypeByDifficulty[difficulty]
    : null;

  if (difficulty && currentIndex >= quizArtists.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl text-red-500 drop-shadow-[4px_4px_0_#000]">
          GAME OVER
        </h1>
        <p className="text-yellow-400">
          SCORE {score} / {quizArtists.length}
        </p>
        <button
          onClick={() => setDifficulty(null)}
          className="pixel-button"
        >
          RESTART
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-3xl text-yellow-400 tracking-widest drop-shadow-[4px_4px_0_#000]">
        서양시대 그림 맞추기
      </h1>

      {!difficulty && (
        <div className="flex gap-4">
          {(Object.keys(difficulties) as Difficulty[]).map((level) => (
            <button
              key={level}
              onClick={() => startGame(level)}
              className="pixel-button"
            >
              {level}
            </button>
          ))}
        </div>
      )}

      {difficulty && artist && (
        <div className="pixel-box w-full max-w-xl p-4">
          <div className="flex justify-between mb-2 text-sm text-yellow-300">
            <span>STAGE {currentIndex + 1}</span>
            <span>TRY {tries}/{MAX_TRIES}</span>
          </div>

          <p className="text-center text-yellow-300 mb-2">
            {questionType === "COMMON_PERIOD" && "이 그림의 시대는?"}
            {questionType === "TITLE" && "이 그림의 제목은?"}
            {questionType === "ARTIST_AND_PERIOD" &&
              "작가 이름과 시대를 입력하세요"}
          </p>

          {difficulty === "어려움" && (
            <p className="text-xs text-gray-400 text-center mb-2">
              예시: 빈센트 반 고흐 / 후기 인상주의
            </p>
          )}

          <div
            className="grid gap-1 mx-auto mb-4"
            style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
          >
            {order.map((piece, i) => (
              <motion.div
                key={i}
                className="aspect-square border border-black"
                style={{
                  backgroundImage: `url(${artist.image})`,
                  backgroundSize: `${gridSize * 100}%`,
                  backgroundPosition: `${(piece % gridSize) * 100}% ${
                    Math.floor(piece / gridSize) * 100
                  }%`,
                  imageRendering: "pixelated",
                }}
              />
            ))}
          </div>

          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={revealed}
            placeholder="ANSWER?"
            className="pixel-input w-full mb-2"
          />

          {error && !revealed && (
            <p className="text-red-400 text-sm mb-2 text-center">❌ {error}</p>
          )}

          {!revealed ? (
            <button
              onClick={() => {
                let correct = false;

                if (questionType === "COMMON_PERIOD") {
                  correct = answer.trim() === artist.period;
                }

                if (questionType === "TITLE") {
                  correct = answer.trim() === artist.title;
                }

                if (questionType === "ARTIST_AND_PERIOD") {
                  const [name, period] = answer
                    .split("/")
                    .map((v) => v.trim());
                  correct =
                    name === artist.name && period === artist.period;
                }

                if (correct) {
                  setScore((s) => s + 1);
                  setRevealed(true);
                  setError(null);
                } else {
                  setTries((t) => t + 1);
                  setError("다시 한번 잘 생각해봐요.");
                  if (tries + 1 >= MAX_TRIES) setRevealed(true);
                }
              }}
              className="pixel-button w-full"
            >
              CHECK
            </button>
          ) : (
            <div className="text-center">
              <p className="text-green-400 mb-2">
                {questionType === "COMMON_PERIOD" &&
                  `ANSWER: ${artist.period}`}
                {questionType === "TITLE" &&
                  `ANSWER: ${artist.title}`}
                {questionType === "ARTIST_AND_PERIOD" &&
                  `ANSWER: ${artist.name} / ${artist.period}`}
              </p>
              <button
                onClick={() => {
                  setCurrentIndex((i) => i + 1);
                  resetQuestion(difficulty);
                }}
                className="pixel-button w-full"
              >
                NEXT →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
