"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [flippedCardId, setFlippedCardId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleCardFlip = (productId: number) => {
    setFlippedCardId((current) => (current === productId ? null : productId));
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* Desktop: Horizontal slider with navigation */}
      <div className="hidden md:block relative">
        {/* Outer container to clip overflow */}
        <div className="overflow-hidden mx-12">
          {/* Horizontal scroll container - shows exactly 3 cards */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{
              scrollSnapType: "x mandatory",
              scrollPaddingLeft: "0px",
            }}
          >
            <AnimatePresence mode="popLayout">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="flex-shrink-0 w-[calc((100%-48px)/3)]"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <ProductCard
                    product={product}
                    index={index}
                    isFlipped={flippedCardId === product.id}
                    onFlip={() => handleCardFlip(product.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation arrows - centered vertically on cards */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-black/90 border border-neutral-800 flex items-center justify-center text-white hover:border-white hover:bg-white hover:text-black transition-all backdrop-blur-sm"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-black/90 border border-neutral-800 flex items-center justify-center text-white hover:border-white hover:bg-white hover:text-black transition-all backdrop-blur-sm"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Mobile: Vertical grid */}
      <motion.div
        layout
        className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              isFlipped={flippedCardId === product.id}
              onFlip={() => handleCardFlip(product.id)}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
