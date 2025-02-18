"use client";

import { useState } from "react";
import { FiSearch, FiShoppingCart, FiHeart, FiFilter } from "react-icons/fi";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCart } from "@/context/CartContext";
import carouselData from "@/data/carousel.json";
import productData from "@/data/products.json";
import { useRouter } from "next/navigation";
import { Product } from "@/types";

const carouselItems = carouselData.carouselItems;
const featuredProducts = productData.products;

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const { addToCart } = useCart();
  const router = useRouter();

  // Filter state
  const [filters, setFilters] = useState({
    priceRange: "all",
    brand: "all",
    rating: "all",
  });

  // Slick carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  // Add handleSearch function
  const handleSearch = (query: string) => {
    router.push(`/listing?search=${encodeURIComponent(query)}`);
  };

  // Filter products based on selected filters
  const filterProducts = (products: Product[]) => {
    return products.filter((product: Product) => {
      // Price Range Filter
      if (filters.priceRange !== "all") {
        const [min, max] = filters.priceRange.split("-").map(Number);
        if (max && (product.price < min || product.price > max)) return false;
        if (!max && product.price < min) return false;
      }

      // Brand Filter
      if (filters.brand !== "all" && product.brand !== filters.brand)
        return false;

      // Rating Filter
      if (filters.rating !== "all") {
        const minRating = Number(filters.rating.split("+")[0]);
        if (product.rating < minRating) return false;
      }

      return true;
    });
  };

  const filteredFeaturedProducts = filterProducts(featuredProducts);

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section with Search */}
      <section className="relative h-[70vh] bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d"
            alt="Background Image"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-center">
            Discover Amazing Products
          </h1>

          {/* Search Bar */}
          <div className="w-full max-w-2xl flex">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full px-6 py-4 rounded-l-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery) {
                    handleSearch(searchQuery);
                  }
                }}
              />
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 bg-white rounded-b-lg shadow-lg">
                  {featuredProducts
                    .filter((product) =>
                      product.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((product) => (
                      <div
                        key={product.id}
                        className="p-3 hover:bg-gray-100 cursor-pointer text-gray-900 flex items-center gap-3"
                        onClick={() => handleSearch(product.name)}
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded-md"
                        />
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">
                            ${product.price}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
            <button
              onClick={() => searchQuery && handleSearch(searchQuery)}
              className="bg-blue-600 text-white px-8 rounded-r-lg hover:bg-blue-700 transition-colors"
            >
              <FiSearch className="text-2xl" />
            </button>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Slider {...settings}>
            {carouselItems.map((item) => (
              <div key={item.id} className="relative h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover rounded-xl"
                />
                <div className="relative z-20 p-12 text-white">
                  <h2 className="text-4xl font-bold mb-4">{item.title}</h2>
                  <p className="text-xl">{item.description}</p>
                  <button
                    onClick={() => router.push("/listing")}
                    className="mt-6 bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-white">
            Filter Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Price Range */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Price Range
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) =>
                  setFilters({ ...filters, priceRange: e.target.value })
                }
                className="w-full p-2 rounded bg-dark-bg border border-dark-border text-white"
              >
                <option value="all">All Prices</option>
                <option value="0-50">Under $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="100-200">$100 - $200</option>
                <option value="200">Over $200</option>
              </select>
            </div>

            {/* Brand Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Brand
              </label>
              <select
                value={filters.brand}
                onChange={(e) =>
                  setFilters({ ...filters, brand: e.target.value })
                }
                className="w-full p-2 rounded bg-dark-bg border border-dark-border text-white"
              >
                <option value="all">All Brands</option>
                <option value="TechPro">TechPro</option>
                <option value="AudioMax">AudioMax</option>
                <option value="SportX">SportX</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Rating
              </label>
              <select
                value={filters.rating}
                onChange={(e) =>
                  setFilters({ ...filters, rating: e.target.value })
                }
                className="w-full p-2 rounded bg-dark-bg border border-dark-border text-white"
              >
                <option value="all">All Ratings</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-white">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredFeaturedProducts.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                No products found matching your filters.
              </div>
            ) : (
              filteredFeaturedProducts.map((product: Product) => (
                <div
                  key={product.id}
                  className="bg-dark-card rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="relative h-64">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    {hoveredProduct === product.id && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4">
                        <button
                          className="bg-white p-3 rounded-full hover:bg-gray-100 transition-colors"
                          onClick={() =>
                            addToCart({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              image: product.image,
                              quantity: 1,
                            })
                          }
                        >
                          <FiShoppingCart className="text-xl text-gray-900" />
                        </button>
                        <button className="bg-white p-3 rounded-full hover:bg-gray-100 transition-colors">
                          <FiHeart className="text-xl text-gray-900" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-blue-400 mb-1">
                      {product.brand}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-blue-400">
                        ${product.price}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400">★</span>
                        <span className="text-gray-300">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
