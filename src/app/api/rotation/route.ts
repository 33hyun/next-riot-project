import { NextResponse } from "next/server";

// Riot API 엔드포인트 및 API 키
const RIOT_API_URL = "https://kr.api.riotgames.com/lol/platform/v3/champion-rotations";
const API_KEY = process.env.RIOT_API_KEY;

export async function GET() {
  try {
    // API 키가 없을 경우 에러 반환
    if (!API_KEY) {
      return NextResponse.json(
        { error: "API 키가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    // Riot API 요청
    const response = await fetch(RIOT_API_URL, {
      headers: { "X-Riot-Token": API_KEY },
    });

    // API 응답이 실패한 경우
    if (!response.ok) {
      return NextResponse.json(
        { error: "Riot API에서 데이터를 가져오지 못했습니다." },
        { status: response.status }
      );
    }

    // 응답 데이터 변환
    const data = await response.json();

    // 응답 데이터 검증
    if (!data || !data.freeChampionIds) {
      return NextResponse.json(
        { error: "올바른 챔피언 로테이션 데이터를 받지 못했습니다." },
        { status: 500 }
      );
    }

    // 정상적인 응답 반환
    return NextResponse.json(data);
  } catch (error) {
    console.error("챔피언 로테이션 API 오류:", error);
    return NextResponse.json(
      { error: "서버에서 데이터를 가져오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}