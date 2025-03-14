import { Champion, ChampionDetail } from "../types/Champion";

// 최신 패치 버전 변수화
const PATCH_VERSION = "15.5.1"; // 필요시 최신 버전으로 변경

// 챔피언 목록 가져오기
export async function fetchChampionList(): Promise<Champion[]> {
  try {
    const response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/data/ko_KR/champion.json`
    );

    if (!response.ok) {
      throw new Error("챔피언 목록을 불러오는 데 실패했습니다.");
    }

    const data = await response.json();

    return Object.values(data.data).map((champion: any) => ({
      id: champion.id,
      name: champion.name,
      title: champion.title,
      image: champion.image.full,
    })) as Champion[];
  } catch (error) {
    console.error("Error fetching champion list:", error);
    throw new Error("챔피언 목록을 불러오는 중 오류가 발생했습니다.");
  }
}

// 특정 챔피언 상세 정보 가져오기
export async function fetchChampionDetail(id: string): Promise<ChampionDetail> {
  try {
    const response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/data/ko_KR/champion/${id}.json`
    );

    if (!response.ok) {
      throw new Error(`챔피언 상세 정보를 불러오는 데 실패했습니다: ${id}`);
    }

    const data = await response.json();
    return data.data[id] as ChampionDetail;
  } catch (error) {
    console.error("Error fetching champion detail:", error);
    throw new Error("챔피언 상세 정보를 불러오는 중 오류가 발생했습니다.");
  }
}