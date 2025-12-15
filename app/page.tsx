// artpixel - main page (typescript) //
//             samilimik             //
//     December 21, 2025 (Monday)    //

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

  if (difficulty && currentIndex >= quizArtists.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl text-red-500 drop-shadow-[4px_4px_0_#000]">
          GAME OVER
        </h1>
        <p className="text-yellow-400">
          SCORE {score} / {quizArtists.length}
        </p>
        <button onClick={() => setDifficulty(null)} className="pixel-button">
          RESTART
        </button>

        {/* Footer */}
        <div className="mt-6 text-sm text-gray-400">
          <span>소스코드: </span>
          <a
            href="https://github.com/samilimik/artpixel"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-yellow-400"
          >
            GitHub
          </a>
        </div>
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
          {Object.keys(difficulties).map((level) => (
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
                  backgroundPosition: `${(piece % gridSize) * 100}% ${Math.floor(piece / gridSize) * 100}%`,
                  imageRendering: "pixelated",
                }}
              />
            ))}
          </div>

          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={revealed}
            placeholder="ARTIST NAME?"
            className="pixel-input w-full mb-2"
          />

          {!revealed ? (
            <button
              onClick={() => {
                if (answer.trim() === artist.name) {
                  setScore((s) => s + 1);
                  setRevealed(true);
                } else {
                  setTries((t) => t + 1);
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
                ANSWER: {artist.name}
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

      {/* Footer */}
      <div className="mt-8 text-sm text-gray-400">
        <span>소스코드: </span>
        <a
          href="https://github.com/samilimik/artpixel"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-yellow-400"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
