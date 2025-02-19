"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { FiShoppingCart, FiHeart, FiFilter } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import productData from "@/data/products.json";
import { useSearchParams } from "next/navigation";
import { Product, Filters } from "@/types";

const products = productData.products;

export default function ListingPage() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    priceRange: "all",
    brand: "all",
    rating: "all",
    category: "all",
    searchQuery: search || "",
  });

  const { addToCart } = useCart();

  // Update the function signature
  const filterProducts = (products: Product[]) => {
    return products.filter((product) => {
      // Search Filter
      if (filters.searchQuery) {
        const searchMatch = product.name
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase());
        if (!searchMatch) return false;
      }

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

      // Category Filter
      if (filters.category !== "all" && product.category !== filters.category)
        return false;

      return true;
    });
  };

  const filteredProducts = filterProducts(products);

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <div className="shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Our Products</h1>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden bg-blue-600 p-2 rounded-lg text-white"
            >
              <FiFilter size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="relative h-[300px] w-full">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
          alt="Store Banner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Collection
            </h1>
            <p className="text-xl text-gray-200">
              Discover the perfect products for you
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {filters.searchQuery && (
          <div className="mb-6 text-white">
            <p className="text-lg">
              Search results for:{" "}
              <span className="font-semibold">{filters.searchQuery}</span>
            </p>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Sidebar */}
          <div
            className={`md:w-64 space-y-6 ${
              isFilterOpen ? "block" : "hidden md:block"
            }`}
          >
            {/* Price Range Filter */}
            <div className="space-y-2">
              <label className="text-lg font-medium text-white">
                Price Range
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) =>
                  setFilters({ ...filters, priceRange: e.target.value })
                }
                className="w-full p-2 rounded bg-dark-card border border-dark-border text-white"
              >
                <option value="all">All Prices</option>
                <option value="0-100">Under $100</option>
                <option value="100-200">$100 - $200</option>
                <option value="200">Over $200</option>
              </select>
            </div>

            {/* Brand Filter */}
            <div className="space-y-2">
              <label className="text-lg font-medium text-white">Brand</label>
              <select
                value={filters.brand}
                onChange={(e) =>
                  setFilters({ ...filters, brand: e.target.value })
                }
                className="w-full p-2 rounded bg-dark-card border border-dark-border text-white"
              >
                <option value="all">All Brands</option>
                <option value="TechPro">TechPro</option>
                <option value="AudioMax">AudioMax</option>
                <option value="SportX">SportX</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-lg font-medium text-white">Category</label>
              <select
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
                className="w-full p-2 rounded bg-dark-card border border-dark-border text-white"
              >
                <option value="all">All Categories</option>
                <option value="Watches">Watches</option>
                <option value="Audio">Audio</option>
                <option value="Footwear">Footwear</option>
                <option value="Fitness">Fitness</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div className="space-y-2">
              <label className="text-lg font-medium text-white">Rating</label>
              <select
                value={filters.rating}
                onChange={(e) =>
                  setFilters({ ...filters, rating: e.target.value })
                }
                className="w-full p-2 rounded bg-dark-card border border-dark-border text-white"
              >
                <option value="all">All Ratings</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-dark-card rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-64 group">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity duration-300">
                      <button
                        onClick={() =>
                          addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            quantity: 1,
                          })
                        }
                        className="bg-white p-3 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <FiShoppingCart className="text-xl text-gray-900" />
                      </button>
                      <button className="bg-white p-3 rounded-full hover:bg-gray-100 transition-colors">
                        <FiHeart className="text-xl text-gray-900" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-blue-400 mb-1">
                      {product.brand}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mb-4">
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
                    <button
                      onClick={() =>
                        (window.location.href = `/product/${product.id}`)
                      }
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                No products found matching your filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </Suspense>
  );
}
