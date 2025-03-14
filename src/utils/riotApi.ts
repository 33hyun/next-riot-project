export async function getChampionRotation() {
    // 환경 변수에서 API Key 가져오기
    const apiKey = process.env.RIOT_API_KEY;
  
    if (!apiKey) {
      throw new Error("API Key가 존재하지 않습니다. `.env.local` 파일을 확인하세요.");
    }
  
    // Riot API를 호출하여 챔피언 로테이션 정보 가져오기
    const response = await fetch(
      "https://kr.api.riotgames.com/lol/platform/v3/champion-rotations",
      {
        headers: {
          "X-Riot-Token": apiKey,
        },
      }
    );
  
    // API 호출 실패 시 오류 처리
    if (!response.ok) {
      throw new Error(`Riot API 호출 실패: ${response.status} ${response.statusText}`);
    }
  
    // 응답 데이터를 JSON 형태로 변환 후 반환
    const data = await response.json();
  
    // 데이터 검증
    if (!data.freeChampionIds) {
      throw new Error("freeChampionIds가 응답 데이터에 없음");
    }
  
    return data;
  }