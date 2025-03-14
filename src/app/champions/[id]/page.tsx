import Image from "next/image";
import { fetchChampionDetail } from "@/utils/serverApi";
import { ChampionDetail } from "@/types/Champion";
import { PATCH_VERSION } from "@/constants";

type Props = { params: { id: string } };

export default async function ChampionDetailPage({ params }: Props) {
  const champion: ChampionDetail = await fetchChampionDetail(params.id);

  return (
    <section className="py-10 bg-[#222] text-white rounded-lg shadow-lg max-w-3xl mx-auto">
      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-bold text-[#FFAA00]">{champion.name}</h2>
        <p className="text-gray-400">{champion.title}</p>
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/img/champion/${champion.image.full}`}
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

      <div className="mt-8">
        <h3 className="text-2xl font-bold text-[#FFAA00] text-center mb-4">
          스킬 정보
        </h3>

        <SkillCard
          name={`패시브: ${champion.passive.name}`}
          description={champion.passive.description}
          imageUrl={`https://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/img/passive/${champion.passive.image.full}`}
        />

        <div className="grid grid-cols-2 gap-4 mt-4">
          {champion.spells.map((spell, index) => (
            <SkillCard
              key={index}
              name={spell.name}
              description={spell.description}
              imageUrl={`https://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/img/spell/${spell.image.full}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// 스킬 설명 컴포넌트
function SkillCard({ name, description, imageUrl }: { name: string; description: string; imageUrl: string }) {
  return (
    <div className="bg-[#333] p-4 rounded-lg shadow-md flex items-center">
      <Image src={imageUrl} alt={name} width={64} height={64} className="rounded-md" />
      <div className="ml-4">
        <h4 className="text-xl font-bold text-[#FFAA00]">{name}</h4>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </div>
  );
}