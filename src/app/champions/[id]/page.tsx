import Image from "next/image";
import { fetchChampionDetail } from "@/utils/serverApi";
import { ChampionDetail } from "@/types/Champion";
import { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const champion = await fetchChampionDetail(params.id);
  return {
    title: `${champion.name} - 리그 오브 레전드 챔피언`,
    description: champion.lore,
  };
}

export default async function ChampionDetailPage({ params }: Props) {
  const champion: ChampionDetail = await fetchChampionDetail(params.id);

  return (
    <section className="py-10">
      <h2 className="text-4xl font-bold text-center">{champion.name}</h2>
      <p className="text-center text-gray-600">{champion.title}</p>
      <div className="flex flex-col items-center mt-6">
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${champion.image.full}`}
          alt={champion.name}
          width={240}
          height={240}
          className="rounded-lg"
        />
        <p className="mt-4 px-6 text-gray-800 text-lg max-w-2xl text-center">{champion.lore}</p>
      </div>
    </section>
  );
}
