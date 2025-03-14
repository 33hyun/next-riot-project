import Image from "next/image";
import { fetchChampionDetail } from "@/utils/serverApi";
import { ChampionDetail } from "@/types/Champion";
import { Metadata } from "next";

type Props = {
  params: { id: string };
};

// 최신 패치 버전
const patchVersion = "15.5.1";

// SEO 최적화 (메타데이터 설정)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const champion = await fetchChampionDetail(params.id);
  return {
    title: `${champion.name} - 리그 오브 레전드 챔피언`,
    description: champion.lore,
  };
}

// 챔피언 상세 페이지
export default async function ChampionDetailPage({ params }: Props) {
  const champion: ChampionDetail = await fetchChampionDetail(params.id);

  return (
    <section className="py-10 bg-[#222] text-white rounded-lg shadow-lg">
      {/* 챔피언 이름 & 타이틀 */}
      <h2 className="text-4xl font-bold text-center text-[#FFAA00]">
        {champion.name}
      </h2>
      <p className="text-center text-gray-400">{champion.title}</p>

      {/* 챔피언 이미지 & 설명 */}
      <div className="flex flex-col items-center mt-6">
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${champion.image.full}`}
          alt={champion.name}
          width={240}
          height={240}
          priority
          className="rounded-lg border border-gray-600 shadow-md"
        />
        <p className="mt-4 px-6 text-gray-300 text-lg max-w-2xl text-center leading-relaxed">
          {champion.lore}
        </p>
      </div>

      {/* 스킬 섹션 */}
      <div className="mt-10 px-6 max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold text-[#FFAA00] text-center mb-6">
          스킬 정보
        </h3>

        {/* 패시브 스킬 */}
        <div className="flex items-center bg-[#333] p-4 rounded-lg shadow-md mb-6">
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/passive/${champion.passive.image.full}`}
            alt={champion.passive.name}
            width={80}
            height={80}
            className="rounded-md"
          />
          <div className="ml-4">
            <h4 className="text-xl font-bold text-[#FFAA00]">패시브: {champion.passive.name}</h4>
            <p className="text-gray-300 text-sm">{champion.passive.description}</p>
          </div>
        </div>

        {/* QWER 스킬 개별 박스로 표시 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["Q", "W", "E", "R"].map((key, index) => {
            const spell = champion.spells[index];
            return (
              <div key={index} className="flex flex-col items-center bg-[#333] p-6 rounded-lg shadow-md">
                <h4 className="text-2xl font-bold text-[#FFAA00] mb-2">{key} - {spell.name}</h4>
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/spell/${spell.image.full}`}
                  alt={spell.name}
                  width={96}
                  height={96}
                  className="rounded-lg border border-gray-500"
                />
                <p className="text-gray-300 text-sm text-center mt-3">{spell.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}