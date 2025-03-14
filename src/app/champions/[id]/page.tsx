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
    </section>
  );
}