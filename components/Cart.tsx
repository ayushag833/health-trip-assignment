"use client";

import { useState } from "react";
import { FiX, FiShoppingCart } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-6 bottom-6 bg-blue-600 p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <FiShoppingCart className="text-2xl text-white" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-dark-bg z-50 shadow-xl">
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Your Cart</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <FiX className="text-2xl" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-gray-400">
                  Your cart is empty
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="bg-dark-card p-4 rounded-lg flex gap-4"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-white font-medium">{item.name}</h3>
                          <p className="text-blue-400 font-bold">
                            ${item.price.toFixed(2)}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <select
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  item.id,
                                  parseInt(e.target.value)
                                )
                              }
                              className="bg-dark-bg border border-dark-border rounded px-2 py-1 text-white"
                            >
                              {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>
                                  {num}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-dark-border mt-6 pt-6">
                    <div className="flex justify-between text-white mb-4">
                      <span>Total:</span>
                      <span className="text-xl font-bold">
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
} 