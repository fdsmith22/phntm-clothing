"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    itemCount,
    subtotal,
    tax,
    shipping,
    total,
  } = useCart();
  const { formatPrice } = useCurrency();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-black border-l border-neutral-800 flex flex-col"
            style={{ boxShadow: "-10px 0 40px rgba(0,0,0,0.5)" }}
          >
            {/* Corner brackets */}
            <div className="absolute top-4 left-4 w-4 h-4 border-l border-t border-neutral-700" />
            <div className="absolute top-4 right-4 w-4 h-4 border-r border-t border-neutral-700" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-l border-b border-neutral-700" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-neutral-700" />

            {/* Scan line */}
            <motion.div
              className="absolute left-0 right-0 h-[1px] pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
              }}
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            {/* Header */}
            <div className="p-6 border-b border-neutral-800">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <motion.span
                      className="w-2 h-2 rounded-full bg-green-500"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-green-500 font-mono text-[10px] font-semibold">CART</span>
                  </div>
                  <h2 className="font-display text-2xl tracking-wider">
                    // ITEMS: {itemCount}
                  </h2>
                </div>
                <motion.button
                  onClick={closeCart}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 border border-neutral-800 flex items-center justify-center hover:border-white transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="font-mono text-[10px] text-neutral-600">// NO SIGNAL</div>
                    <p className="font-display text-2xl text-neutral-500">CART EMPTY</p>
                    <p className="text-neutral-600 text-sm">No items detected in your cart.</p>
                    <motion.button
                      onClick={closeCart}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-4 px-6 py-3 border border-neutral-700 text-sm font-mono uppercase tracking-wider hover:border-white hover:bg-white hover:text-black transition-all"
                    >
                      // Continue Shopping
                    </motion.button>
                  </motion.div>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className="border border-neutral-800 p-4 relative group"
                      >
                        {/* Item corner brackets */}
                        <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-2 right-2 w-2 h-2 border-r border-t border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex gap-4">
                          {/* Ghost letter */}
                          <div className="w-16 h-16 bg-neutral-950 border border-neutral-800 flex items-center justify-center flex-shrink-0">
                            <span className="font-display text-3xl text-neutral-600">
                              {item.name[0]}
                            </span>
                          </div>

                          {/* Item details */}
                          <div className="flex-1 min-w-0">
                            <div className="font-mono text-[9px] text-neutral-600 uppercase tracking-widest mb-1">
                              {item.category}
                            </div>
                            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide truncate">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="font-mono text-[10px] text-neutral-500">
                                SIZE: {item.size}
                              </span>
                            </div>
                            <div className="text-neutral-400 mt-1">
                              {formatPrice(item.price)}
                            </div>
                          </div>

                          {/* Quantity & Remove */}
                          <div className="flex flex-col items-end justify-between">
                            <motion.button
                              onClick={() => removeItem(item.id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-neutral-600 hover:text-red-500 transition-colors"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                              </svg>
                            </motion.button>

                            <div className="flex items-center border border-neutral-800">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-neutral-900 transition-colors font-mono"
                              >
                                -
                              </button>
                              <span className="w-8 h-8 flex items-center justify-center font-mono text-sm border-x border-neutral-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-neutral-900 transition-colors font-mono"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer - Order Summary */}
            {items.length > 0 && (
              <div className="border-t border-neutral-800 p-6 space-y-4">
                <div className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest">
                  // Order Summary
                </div>

                <div className="space-y-2 text-sm">
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

                <div className="flex justify-between pt-4 border-t border-neutral-800">
                  <span className="font-heading text-lg uppercase">Total</span>
                  <span className="font-display text-2xl">{formatPrice(total)}</span>
                </div>

                <div className="space-y-2 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-4 bg-white text-black font-mono text-sm uppercase tracking-widest hover:bg-neutral-200 transition-colors"
                  >
                    // Checkout
                  </motion.button>
                  <Link href="/cart" onClick={closeCart}>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full py-3 border border-neutral-700 font-mono text-xs uppercase tracking-widest hover:border-white transition-colors"
                    >
                      View Full Cart
                    </motion.button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
