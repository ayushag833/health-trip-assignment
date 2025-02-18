import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1E1E1E] text-gray-300 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">
              We provide quality products with excellent service.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="/listing"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Products
              </Link>
              <Link
                href="/privacy"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">
              Email: contact@example.com
              <br />
              Phone: (123) 456-7890
            </p>
          </div>
        </div>

        <div className="border-t border-[#2E2E2E] mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} My Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
