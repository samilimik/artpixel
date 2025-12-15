"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// 난이도별 설정
const difficulties: Record<string, number> = {
  쉬움: 4,
  중간: 9,
  어려움: 16,
};

// 화가 데이터 (20명)
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
  { name: "조르주 쇠라", image: "/artists/seurat.jpg" },
  { name: "라파엘로", image: "/artists/raphael.jpg" },
  { name: "장 미셸 바스키아", image: "/artists/basquiat.jpg" },
  { name: "에곤 실레", image: "/artists/schiele.jpg" },
  { name: "앤디 워홀", image: "/artists/warhol.jpg" },
  { name: "호안 미로", image: "/artists/miro.jpg" },
];

export default function ArtPuzzleGame() {
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [artist, setArtist] = useState<{ name: string; image: string } | null>(null);

  const startGame = (level: string) => {
    const randomArtist = artists[Math.floor(Math.random() * artists.length)];
    setArtist(randomArtist);
    setDifficulty(level);
  };

  const pieces = difficulty ? difficulties[difficulty] : 0;
  const gridSize = Math.sqrt(pieces);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-3xl font-bold">🎨 화가 맞추기 퍼즐 게임</h1>

      {!difficulty && (
        <div className="flex gap-4">
          {Object.keys(difficulties).map((level) => (
            <button
              key={level}
              onClick={() => startGame(level)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              {level}
            </button>
          ))}
        </div>
      )}

      {difficulty && artist && (
        <div className="w-full max-w-xl border rounded-xl p-4 shadow">
          <p className="mb-2 text-center">난이도: {difficulty}</p>

          <div
            className="grid gap-1"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            }}
          >
            {Array.from({ length: pieces }).map((_, i) => (
              <motion.div
                key={i}
                className="aspect-square bg-gray-300"
                style={{
                  backgroundImage: `url(${artist.image})`,
                  backgroundSize: `${gridSize * 100}%`,
                  backgroundPosition: `${(i % gridSize) * 100}% ${Math.floor(i / gridSize) * 100}%`,
                }}
                whileHover={{ scale: 1.05 }}
              />
            ))}
          </div>

          <p className="mt-4 text-center text-sm">
            이 그림을 그린 화가는 누구일까요?
          </p>
          <p className="mt-2 text-center font-semibold">
            정답: {artist.name}
          </p>

          <div className="mt-4 flex justify-center">
            <button
              onClick={() => {
                setDifficulty(null);
                setArtist(null);
              }}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              다시하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
