"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChampionRotation, ChampionData } from "@/types/ChampionRotation";
import Link from "next/link";

export default function RotationPage() {
  const [rotation, setRotation] = useState<ChampionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRotation() {
      try {
        // 무료 챔피언 ID 목록 가져오기
        const response = await fetch("/api/rotation");
        const data: ChampionRotation = await response.json();

        if (!data.freeChampionIds) {
          throw new Error("freeChampionIds가 응답 데이터에 없음");
        }

        // 전체 챔피언 데이터 가져오기
        const championsResponse = await fetch(
          "https://ddragon.leagueoflegends.com/cdn/14.5.1/data/ko_KR/champion.json"
        );
        const championsData = await championsResponse.json();

        // 무료 챔피언 목록과 전체 챔피언 데이터를 매칭하여 이미지 및 이름 추가
        const championsArray: ChampionData[] = data.freeChampionIds
          .map((championId) => {
            const champKey = Object.keys(championsData.data).find(
              (key) => championsData.data[key].key === championId.toString()
            );

            if (!champKey) return null;

            return {
              id: championId,
              name: championsData.data[champKey].name,
              imageUrl: `https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/${champKey}.png`,
              champKey,
            };
          })
          .filter(Boolean) as ChampionData[]; // null 제거

        setRotation(championsArray);
      } catch (err) {
        console.error("API 요청 오류:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchRotation();
  }, []);

  if (loading)
    return <p className="text-center text-xl text-[#FFAA00]">로딩 중...</p>;
  if (error) return <p className="text-center text-xl text-red-500">{error}</p>;

  return (
    <section className="py-10 bg-[#222] text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-[#FFAA00] mb-6">
        무료 챔피언 로테이션
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 px-6">
        {rotation.map((champion, index) => (
          <Link key={champion.id} href={`/champions/${champion.champKey}`} passHref>
            <div className="bg-[#333] rounded-lg shadow-md p-4 hover:bg-[#444] transition cursor-pointer text-center">
              <Image
                src={champion.imageUrl}
                alt={champion.name}
                width={96}
                height={96}
                className="rounded-full mx-auto"
                unoptimized={true}
                priority={index < 3}
              />
              <p className="mt-2 font-bold text-[#FFAA00]">{champion.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}