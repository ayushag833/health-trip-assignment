import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import Cart from "@/components/Cart";

export const metadata = {
  title: "My Store",
  description: "A simple yet dynamic website with multiple functionalities.",
  icons: {
    icon: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full dark">
      <body className="min-h-full flex flex-col bg-[#121212] text-gray-100">
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <Cart />
        </CartProvider>
      </body>
    </html>
  );
}
