import { NextResponse } from "next/server";
import { getChampionRotation } from "@/utils/riotApi";

export async function GET() {
  try {
    // Riot API에서 챔피언 로테이션 데이터 가져오기
    const data = await getChampionRotation();

    // 데이터 검증
    if (!data || !data.freeChampionIds) {
      throw new Error("freeChampionIds가 응답 데이터에 없음");
    }

    // JSON 형태로 응답 반환
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return;
  }
}