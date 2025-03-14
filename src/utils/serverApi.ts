import { PATCH_VERSION } from "@/constants";
import { Champion, ChampionDetail } from "@/types/Champion";
import { Item } from "@/types/Item";

// 챔피언 목록 가져오기
export async function fetchChampionList(): Promise<Champion[]> {
  try {
    const response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/data/ko_KR/champion.json`
    );

    if (!response.ok) throw new Error("챔피언 목록을 불러오는 데 실패했습니다.");

    const data = await response.json();

    return Object.values(data.data).map((champion: any) => ({
      id: champion.id,
      name: champion.name,
      title: champion.title,
      image: champion.image.full,
    })) as Champion[];
  } catch (error) {
    console.error("챔피언 목록 가져오기 실패:", error);
    throw new Error((error as Error).message || "챔피언 목록을 불러오는 중 오류가 발생했습니다.");
  }
}

// 특정 챔피언 상세 정보 가져오기
export async function fetchChampionDetail(id: string): Promise<ChampionDetail> {
  try {
    const response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/data/ko_KR/champion/${id}.json`
    );

    if (!response.ok) throw new Error(`챔피언 상세 정보를 불러오는 데 실패했습니다: ${id}`);

    const data = await response.json();
    return data.data[id] as ChampionDetail;
  } catch (error) {
    console.error(`챔피언(${id}) 정보 가져오기 실패:`, error);
    throw new Error((error as Error).message || "챔피언 상세 정보를 불러오는 중 오류가 발생했습니다.");
  }
}

// 아이템 목록 가져오기
export async function fetchItemList(): Promise<Item[]> {
  try {
    const response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/data/ko_KR/item.json`
    );

    if (!response.ok) throw new Error("아이템 목록을 불러오는 데 실패했습니다.");

    const data = await response.json();

    return Object.entries(data.data).map(([id, item]: [string, any]) => ({
      id,
      name: item.name,
      description: item.description,
      image: `https://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/img/item/${id}.png`,
      gold: item.gold?.total ?? 0, // 아이템 가격 추가 (값이 없을 경우 기본값 0)
    })) as Item[];
  } catch (error) {
    console.error("아이템 목록 가져오기 실패:", error);
    throw new Error((error as Error).message || "아이템 목록을 불러오는 중 오류가 발생했습니다.");
  }
}

// 특정 아이템 상세 정보 가져오기
export async function fetchItemDetail(id: string): Promise<Item> {
  try {
    const response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/data/ko_KR/item.json`
    );

    if (!response.ok) throw new Error(`아이템 상세 정보를 불러오는 데 실패했습니다: ${id}`);

    const data = await response.json();
    const item = data.data[id];

    if (!item) throw new Error(`아이템 ID(${id})에 해당하는 데이터를 찾을 수 없습니다.`);

    return {
      id,
      name: item.name,
      description: item.description,
      image: `https://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/img/item/${id}.png`,
      gold: item.gold?.total ?? 0,
    };
  } catch (error) {
    console.error(`아이템(${id}) 상세 정보 가져오기 실패:`, error);
    throw new Error((error as Error).message || "아이템 상세 정보를 불러오는 중 오류가 발생했습니다.");
  }
}