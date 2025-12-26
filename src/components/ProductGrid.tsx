"use client";

import { useState } from "react";
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

  const handleCardFlip = (productId: number) => {
    setFlippedCardId((current) => (current === productId ? null : productId));
  };

  return (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
  );
}
