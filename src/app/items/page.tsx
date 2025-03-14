import Image from "next/image";
import { fetchItemList } from "@/utils/serverApi";
import { Item } from "@/types/Item";

export const revalidate = 86400; // 24시간마다 데이터 갱신 (ISR)

export default async function ItemsPage() {
  let items: Item[] = [];

  try {
    items = await fetchItemList();

    // 골드 가격이 0이 아닌 아이템만 필터링(판매 가능한 아이템만 표시함)
    items = items.filter((item) => item.gold > 0);

    if (!items.length) throw new Error("아이템 데이터가 없습니다.");
  } catch (error) {
    console.error("아이템 데이터 로딩 실패:", error);
    return (
      <section className="py-10 bg-[#222] text-white rounded-lg shadow-lg max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#FFAA00] mb-4">아이템 목록</h2>
        <p className="text-gray-400">아이템을 불러올 수 없습니다.</p>
      </section>
    );
  }

  return (
    <section className="py-10 bg-[#222] text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-[#FFAA00] mb-6">
        아이템 목록
      </h2>

      {/* 아이템 목록 그리드 */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-6">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="bg-[#333] rounded-lg shadow-md p-4 hover:bg-[#444] transition text-center"
          >
            {/* 아이템 이미지 */}
            <Image
              src={item.image}
              alt={item.name}
              width={64}
              height={64}
              priority={index < 6} // 상위 6개 아이템만 우선 로드
              className="rounded-md mx-auto"
            />
            {/* 아이템 이름 */}
            <h3 className="mt-2 text-sm font-bold text-[#FFAA00]">{item.name}</h3>
            {/* 아이템 가격 */}
            <p className="text-gray-300 text-sm mt-1">{item.gold} 골드</p>
          </div>
        ))}
      </div>
    </section>
  );
}