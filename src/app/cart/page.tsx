"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
    tax,
    shipping,
    total,
  } = useCart();
  const { formatPrice } = useCurrency();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-2">
              <motion.span
                className="w-2 h-2 rounded-full bg-green-500"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-green-500 font-mono text-[10px] font-semibold">
                CART ACTIVE
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl tracking-wider">
              // YOUR CART
            </h1>
            <p className="text-neutral-500 mt-2 font-mono text-sm">
              {itemCount} {itemCount === 1 ? "item" : "items"} detected
            </p>
          </motion.div>

          {items.length === 0 ? (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-neutral-800 p-12 text-center relative"
            >
              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-4 h-4 border-l border-t border-neutral-700" />
              <div className="absolute top-4 right-4 w-4 h-4 border-r border-t border-neutral-700" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-l border-b border-neutral-700" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-neutral-700" />

              <div className="font-mono text-[10px] text-neutral-600 mb-4">
                // NO SIGNAL
              </div>
              <h2 className="font-display text-3xl text-neutral-500 mb-4">
                CART EMPTY
              </h2>
              <p className="text-neutral-600 mb-8">
                No items have been added to your cart yet.
              </p>
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white text-black font-mono text-sm uppercase tracking-widest hover:bg-neutral-200 transition-colors"
                >
                  // Continue Shopping
                </motion.button>
              </Link>
            </motion.div>
          ) : (
            /* Cart with items */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Items List */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-neutral-800 p-6 relative group"
                  >
                    {/* Corner brackets */}
                    <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-3 right-3 w-3 h-3 border-r border-t border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex gap-6">
                      {/* Ghost letter */}
                      <div className="w-24 h-24 bg-neutral-950 border border-neutral-800 flex items-center justify-center flex-shrink-0">
                        <span className="font-display text-5xl text-neutral-600">
                          {item.name[0]}
                        </span>
                      </div>

                      {/* Item details */}
                      <div className="flex-1">
                        <div className="font-mono text-[9px] text-neutral-600 uppercase tracking-widest mb-1">
                          {item.category}
                        </div>
                        <h3 className="font-heading text-lg font-semibold uppercase tracking-wide">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="font-mono text-[11px] text-neutral-500">
                            SIZE: {item.size}
                          </span>
                          <span className="font-mono text-[11px] text-neutral-500">
                            ID: {item.productId.toString().padStart(4, "0")}
                          </span>
                        </div>
                        <div className="font-display text-xl mt-2">
                          {formatPrice(item.price)}
                        </div>
                      </div>

                      {/* Quantity & Actions */}
                      <div className="flex flex-col items-end justify-between">
                        <motion.button
                          onClick={() => removeItem(item.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-neutral-600 hover:text-red-500 transition-colors"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </motion.button>

                        <div className="flex items-center border border-neutral-800">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-10 h-10 flex items-center justify-center hover:bg-neutral-900 transition-colors font-mono text-lg"
                          >
                            -
                          </button>
                          <span className="w-12 h-10 flex items-center justify-center font-mono text-sm border-x border-neutral-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-10 h-10 flex items-center justify-center hover:bg-neutral-900 transition-colors font-mono text-lg"
                          >
                            +
                          </button>
                        </div>

                        <div className="font-mono text-sm text-neutral-400">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Clear cart button */}
                <motion.button
                  onClick={clearCart}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="text-neutral-600 hover:text-red-500 text-sm font-mono uppercase tracking-wider transition-colors"
                >
                  // Clear Cart
                </motion.button>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="border border-neutral-800 p-6 sticky top-24 relative"
                >
                  {/* Corner brackets */}
                  <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-neutral-700" />
                  <div className="absolute top-3 right-3 w-3 h-3 border-r border-t border-neutral-700" />
                  <div className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-neutral-700" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-neutral-700" />

                  {/* Scan line */}
                  <motion.div
                    className="absolute left-0 right-0 h-[1px] pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
                    }}
                    animate={{ top: ["0%", "100%"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />

                  <div className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest mb-4">
                    // Order Summary
                  </div>

                  <div className="space-y-3 text-sm mb-6">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Tax (8%)</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-500">FREE</span>
                        ) : (
                          formatPrice(shipping)
                        )}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <div className="text-[10px] text-neutral-600 font-mono">
                        Free shipping on orders over {formatPrice(100)}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between pt-4 border-t border-neutral-800 mb-6">
                    <span className="font-heading text-xl uppercase">Total</span>
                    <span className="font-display text-3xl">
                      {formatPrice(total)}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full py-4 bg-white text-black font-mono text-sm uppercase tracking-widest hover:bg-neutral-200 transition-colors"
                    >
                      // Checkout
                    </motion.button>
                    <Link href="/">
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full py-3 border border-neutral-700 font-mono text-xs uppercase tracking-widest hover:border-white transition-colors"
                      >
                        Continue Shopping
                      </motion.button>
                    </Link>
                  </div>

                  {/* Security badge */}
                  <div className="mt-6 pt-4 border-t border-neutral-800">
                    <div className="flex items-center gap-2 text-neutral-600">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                      <span className="font-mono text-[10px] uppercase tracking-wider">
                        Secure Checkout
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
