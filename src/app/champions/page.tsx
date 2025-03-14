import Image from "next/image";
import Link from "next/link";
import { fetchChampionList } from "@/utils/serverApi";
import { Champion } from "@/types/Champion";

export default async function ChampionsPage() {
  const champions: Champion[] = await fetchChampionList();
  console.log(champions);

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold text-center">챔피언 목록</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-6">
        {champions.map((champion,index) => (
          <Link
            key={champion.id}
            href={`/champions/${champion.id}`}
            className="block bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition"
          >
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${champion.image}`}
              alt={champion.name}
              width={120}
              height={120}
              priority={index === 0}
              className="rounded-lg mx-auto"
            />
            <h3 className="text-center mt-2 font-bold">{champion.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

export const revalidate = 86400; // ISR: 24시간마다 데이터 갱신