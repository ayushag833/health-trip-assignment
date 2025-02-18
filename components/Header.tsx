import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#1E1E1E] shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-400">
            My Store
          </Link>

          <div className="flex gap-6">
            <Link
              href="/"
              className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              href="/listing"
              className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium"
            >
              About
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
