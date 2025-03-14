import { Champion, ChampionDetail } from "../types/Champion";

export async function fetchChampionList() {
  const response = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/13.1.1/data/ko_KR/champion.json"
  );
  const data = await response.json();

  return Object.values(data.data).map((champion: any) => ({
    ...champion,
    image: champion.image.full,
  })) as Champion[];
}
  
  export async function fetchChampionDetail(id: string) {
    const response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/13.1.1/data/ko_KR/champion/${id}.json`
    );
    const data = await response.json();
    return data.data[id] as ChampionDetail;
  }