"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const difficulties: Record<string, number> = {
  쉬움: 4,
  중간: 9,
  어려움: 16,
};

const artists = [
  { name: "레오나르도 다빈치", image: "/artists/davinci.jpg" },
  { name: "빈센트 반 고흐", image: "/artists/gogh.jpg" },
  { name: "클로드 모네", image: "/artists/monet.jpg" },
  { name: "파블로 피카소", image: "/artists/picasso.jpg" },
  { name: "렘브란트", image: "/artists/rembrandt.jpg" },
  { name: "미켈란젤로", image: "/artists/michelangelo.jpg" },
  { name: "살바도르 달리", image: "/artists/dali.jpg" },
  { name: "에드바르 뭉크", image: "/artists/munch.jpg" },
  { name: "폴 세잔", image: "/artists/cezanne.jpg" },
  { name: "앙리 마티스", image: "/artists/matisse.jpg" },
  { name: "요하네스 베르메르", image: "/artists/vermeer.jpg" },
  { name: "잭슨 폴록", image: "/artists/pollock.jpg" },
  { name: "구스타프 클림트", image: "/artists/klimt.jpg" },
  { name: "프리다 칼로", image: "/artists/kahlo.jpg" },
];

const QUESTION_COUNT = 5;
const MAX_TRIES = 3;

export default function ArtPuzzleGame() {
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [quizArtists, setQuizArtists] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [order, setOrder] = useState<number[]>([]);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [tries, setTries] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const startGame = (level: string) => {
    const selected = [...artists]
      .sort(() => Math.random() - 0.5)
      .slice(0, QUESTION_COUNT);

    setQuizArtists(selected);
    setDifficulty(level);
    setCurrentIndex(0);
    setScore(0);
    resetQuestion(level);
  };

  const resetQuestion = (level: string) => {
    const count = difficulties[level];
    setOrder([...Array(count).keys()].sort(() => Math.random() - 0.5));
    setAnswer("");
    setTries(0);
    setRevealed(false);
  };

  const artist = quizArtists[currentIndex];
  const pieces = difficulty ? difficulties[difficulty] : 0;
  const gridSize = Math.sqrt(pieces);

  const checkAnswer = () => {
    if (!artist) return;

    if (answer.trim() === artist.name) {
      setScore((s) => s + 1);
      setRevealed(true);
    } else {
      const nextTries = tries + 1;
      setTries(nextTries);
      if (nextTries >= MAX_TRIES) {
        setRevealed(true);
      }
    }
  };

  const nextQuestion = () => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);

    if (difficulty) {
      resetQuestion(difficulty);
    }
  };

  // 🎉 결과 화면
  if (difficulty && currentIndex >= quizArtists.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 font-mono">
        <h1 className="text-3xl">🎮 GAME OVER</h1>
        <p className="text-xl">
          SCORE: {score} / {quizArtists.length}
        </p>
        <button
          onClick={() => setDifficulty(null)}
          className="px-4 py-2 border rounded"
        >
          RESTART
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 font-mono bg-[#f5f5f5]">
      <h1 className="text-3xl">🎨 PIXEL ART QUIZ</h1>

      {!difficulty && (
        <div className="flex gap-4">
          {Object.keys(difficulties).map((level) => (
            <button
              key={level}
              onClick={() => startGame(level)}
              className="px-4 py-2 border bg-white hover:bg-gray-200"
            >
              {level}
            </button>
          ))}
        </div>
      )}

      {difficulty && artist && (
        <div className="w-full max-w-xl border bg-white p-4 shadow">
          <p className="text-center mb-1">
            문제 {currentIndex + 1} / {quizArtists.length}
          </p>
          <p className="text-center mb-2">
            시도: {tries} / {MAX_TRIES}
          </p>

          <div
            className="grid gap-1 mx-auto"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              imageRendering: "pixelated",
            }}
          >
            {order.map((piece, i) => (
              <motion.div
                key={i}
                className="aspect-square bg-gray-400"
                style={{
                  backgroundImage: `url(${artist.image})`,
                  backgroundSize: `${gridSize * 100}%`,
                  backgroundPosition: `${
                    (piece % gridSize) * 100
                  }% ${Math.floor(piece / gridSize) * 100}%`,
                  imageRendering: "pixelated",
                }}
              />
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="화가 이름 입력"
              disabled={revealed}
              className="border px-3 py-2 font-mono"
            />

            {!revealed ? (
              <button
                onClick={checkAnswer}
                className="border px-4 py-2 bg-gray-100"
              >
                정답 확인
              </button>
            ) : (
              <>
                <p className="text-center font-bold">
                  정답: {artist.name}
                </p>
                <button
                  onClick={nextQuestion}
                  className="border px-4 py-2 bg-gray-200"
                >
                  다음 문제 →
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
