"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import productData from "@/data/products.json";
import ReactImageMagnify from "react-image-magnify";
import { Product, CustomerReview } from "@/types";
import { useCart } from "@/context/CartContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      const foundProduct = productData.products.find(
        (p) => p.id.toString() === id
      );
      setProduct(foundProduct || null);
      setSelectedImage(foundProduct?.images[0]!);
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>; // Handle loading state
  }

  const ReactImageMagnifier = ReactImageMagnify as unknown as React.FC<any>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <div className="flex flex-col md:flex-row">
        {/* Image Gallery */}
        <div className="md:w-[27%]">
          <div className="relative h-64 md:h-96">
            <ReactImageMagnifier
              {...{
                smallImage: {
                  alt: product.name,
                  src: selectedImage,
                  isFluidWidth: false,
                  width: 400, // Adjust width as needed
                  height: 350, // Adjust height as needed
                },
                largeImage: {
                  src: selectedImage,
                  width: 800, // Adjust zoomed-in size as needed
                  height: 800,
                },
                enlargedImageContainerDimensions: {
                  width: "200%",
                  height: "160%",
                },
              }}
            />
          </div>
          <div className="flex space-x-2 mt-4">
            {product.images.map((image: string, index: number) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  className="object-cover object-center rounded h-[5rem] w-[5rem]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 md:pl-8">
          <p className="text-xl font-bold text-blue-400">${product.price}</p>
          <p className="mt-4 text-3xl">{product.brand}</p>
          <p className="mt-4">{product.description}</p>
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
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        {product.customerReviews.map((review: CustomerReview) => (
          <div key={review.id} className="border-b w-[20rem] py-2">
            <p className="font-semibold">Rating: {review.rating} / 5</p>
            <p>{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailPage;
