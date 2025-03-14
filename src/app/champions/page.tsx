import Image from "next/image";
import Link from "next/link";
import { fetchChampionList } from "@/utils/serverApi";
import { Champion } from "@/types/Champion";
import { PATCH_VERSION } from "@/constants";

export default async function ChampionsPage() {
  const champions: Champion[] = await fetchChampionList();

  return (
    <section className="py-10 bg-[#222] text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-[#FFAA00] mb-6">
        챔피언 목록
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 px-6">
        {champions.map((champion, index) => (
          <Link
            key={champion.id}
            href={`/champions/${champion.id}`}
            className="block bg-[#333] rounded-lg shadow-md p-4 hover:bg-[#444] transition text-center"
          >
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/img/champion/${champion.image}`}
              alt={champion.name}
              width={120}
              height={120}
              priority={index < 3}
              className="rounded-lg mx-auto"
            />
            <h3 className="mt-2 font-bold text-[#FFAA00]">{champion.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ISR: 24시간(86400초)마다 데이터 갱신
export const revalidate = 86400;