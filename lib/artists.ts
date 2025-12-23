import { Artist } from "./types";

export const artists: Artist[] = [
  // 작성시 안내
  // 이미지 파일은 public 폴더에 있는 artists 폴더에 저장하시면 됩니다.
  // 이때 이미지 파일의 경로는 /artists/???.jpg 입니다.
  // 시대가 정확하지 않거나 작가의 이름이 정확하지 않은 그림은 작성을 자제해주세요.
  
  {
    name: "레오나르도 다빈치",
    image: "/artists/davinci.jpg",
    period: "르네상스",
    title: "모나리자",
  },
  {
    name: "빈센트 반 고흐",
    image: "/artists/gogh.jpg",
    period: "후기 인상주의",
    title: "별이 빛나는 밤",
  },
  {
    name: "클로드 모네",
    image: "/artists/monet.jpg",
    period: "인상주의",
    title: "수련",
  },
  // 이 아래에 이어서 입력해주세요.
];
