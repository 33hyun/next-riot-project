import "../styles/globals.css";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-[#1C1C1F] text-[#C8C8C8]">
        {/* 네비게이션 바 */}
        <header className="bg-[#5383E8] text-white py-4 shadow-lg">
          <nav className="container mx-auto flex justify-between items-center px-6">
            <h1 className="text-2xl font-bold">리그 오브 레전드 정보 앱</h1>
            <ul className="flex space-x-6 text-lg">
              <li>
                <Link href="/" className="hover:text-[#FFAA00] transition">
                  홈
                </Link>
              </li>
              <li>
                <Link href="/champions" className="hover:text-[#FFAA00] transition">
                  챔피언 목록
                </Link>
              </li>
              <li>
                <Link href="/items" className="hover:text-[#FFAA00] transition">
                  아이템 목록
                </Link>
              </li>
              <li>
                <Link href="/rotation" className="hover:text-[#FFAA00] transition">
                  챔피언 로테이션
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* 메인 콘텐츠 */}
        <main className="container mx-auto px-6 py-10">{children}</main>
      </body>
    </html>
  );
}