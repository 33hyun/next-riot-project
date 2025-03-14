export default function HomePage() {
  return (
    <section className="text-center py-10">
      <h2 className="text-3xl font-bold">리그 오브 레전드 정보 앱</h2>
      <p className="mt-4 text-gray-700">
        Riot Games API를 활용하여 챔피언 정보와 로테이션을 조회하는 앱입니다.
      </p>
      <div className="mt-6 flex justify-center space-x-4">
        <a href="/champions" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          챔피언 목록 보기
        </a>
        <a href="/rotation" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700">
          로테이션 정보 보기
        </a>
      </div>
    </section>
  );
}
