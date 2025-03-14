import "../styles/globals.css";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-gray-100 text-gray-900">
        <header className="bg-blue-600 text-white py-4 shadow-md">
          <nav className="container mx-auto flex justify-between items-center px-4">
            <h1 className="text-2xl font-bold">LoL 정보 앱</h1>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="hover:underline">
                  홈
                </Link>
              </li>
              <li>
                <Link href="/champions" className="hover:underline">
                  챔피언 목록
                </Link>
              </li>
              <li>
                <Link href="/items" className="hover:underline">
                  아이템 목록
                </Link>
              </li>
              <li>
                <Link href="/rotation" className="hover:underline">
                  로테이션 정보
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
