"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// 난이도별 설정
const difficulties = {
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
  const [difficulty, setDifficulty] = useState(null);
  const [artist, setArtist] = useState(null);

  const startGame = (level) => {
    const randomArtist = artists[Math.floor(Math.random() * artists.length)];
    setArtist(randomArtist);
    setDifficulty(level);
  };

  const pieces = difficulty ? difficulties[difficulty] : 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-3xl font-bold">🎨 화가 맞추기 퍼즐 게임</h1>

      {!difficulty && (
        <div className="flex gap-4">
          {Object.keys(difficulties).map((level) => (
            <Button key={level} onClick={() => startGame(level)}>
              {level}
            </Button>
          ))}
        </div>
      )}

      {difficulty && artist && (
        <Card className="w-full max-w-xl">
          <CardContent className="p-4">
            <p className="mb-2 text-center">난이도: {difficulty}</p>
            <div
              className="grid gap-1"
              style={{
                gridTemplateColumns: `repeat(${Math.sqrt(pieces)}, 1fr)`,
              }}
            >
              {Array.from({ length: pieces }).map((_, i) => (
                <motion.div
                  key={i}
                  className="aspect-square bg-gray-300"
                  style={{
                    backgroundImage: `url(${artist.image})`,
                    backgroundSize: `${Math.sqrt(pieces) * 100}%`,
                    backgroundPosition: `${(i % Math.sqrt(pieces)) * 100}% ${Math.floor(i / Math.sqrt(pieces)) * 100}%`,
                  }}
                  whileHover={{ scale: 1.05 }}
                />
              ))}
            </div>
            <p className="mt-4 text-center text-sm">이 그림을 그린 화가는 누구일까요?</p>
            <p className="mt-2 text-center font-semibold">정답: {artist.name}</p>
            <div className="mt-4 flex justify-center">
              <Button variant="outline" onClick={() => { setDifficulty(null); setArtist(null); }}>
                다시하기
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
