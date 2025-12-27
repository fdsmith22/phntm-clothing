"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Product, ApiResponse } from "@/types";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [ghostPhase, setGhostPhase] = useState(1);

  const { addItem, openCart } = useCart();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    async function fetchProduct() {
      const resolvedParams = await params;
      try {
        const response = await fetch(`/api/products/${resolvedParams.slug}`);
        const data: ApiResponse<Product> = await response.json();

        if (data.success && data.data) {
          setProduct(data.data);
        } else {
          notFound();
        }
      } catch {
        notFound();
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [params]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) {
        setGhostPhase(0.4 + Math.random() * 0.6);
        setTimeout(() => setGhostPhase(1), 150);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = () => {
    if (!product || !selectedSize) return;

    addItem({
      productId: parseInt(product.id),
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity,
      category: product.category,
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      openCart();
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="font-mono text-neutral-500"
          >
            // LOADING PRODUCT DATA...
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return notFound();
  }

  const stockStatus =
    product.stock > 10 ? "IN STOCK" : product.stock > 0 ? "LOW STOCK" : "SOLD OUT";
  const stockColor =
    product.stock > 10
      ? "text-green-500"
      : product.stock > 0
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-[11px] text-neutral-600 uppercase tracking-widest mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/?category=${product.category}`}
              className="hover:text-white transition-colors"
            >
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-400">{product.name}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image / Ghost Letter */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative aspect-square bg-neutral-950 border border-neutral-800 flex items-center justify-center overflow-hidden"
            >
              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-6 h-6 border-l border-t border-neutral-700" />
              <div className="absolute top-4 right-4 w-6 h-6 border-r border-t border-neutral-700" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l border-b border-neutral-700" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-neutral-700" />

              {/* Surveillance header */}
              <div className="absolute top-4 left-8 z-20 font-mono text-[10px] text-neutral-500">
                <div className="flex items-center gap-2">
                  <motion.span
                    className="w-2 h-2 rounded-full bg-red-500"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="text-red-500 font-semibold">REC</span>
                </div>
              </div>

              {/* RGB ghost layers */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  opacity: ghostPhase * 0.15,
                  x: [-3, 3, -2, 0],
                }}
                transition={{ x: { duration: 0.3, repeat: Infinity } }}
                style={{ color: "#ff0000", mixBlendMode: "screen" }}
              >
                <span className="text-[200px] sm:text-[280px] font-display select-none">
                  {product.name[0]}
                </span>
              </motion.div>

              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  opacity: ghostPhase * 0.15,
                  x: [3, -3, 2, 0],
                }}
                transition={{ x: { duration: 0.3, repeat: Infinity, delay: 0.1 } }}
                style={{ color: "#00ffff", mixBlendMode: "screen" }}
              >
                <span className="text-[200px] sm:text-[280px] font-display select-none">
                  {product.name[0]}
                </span>
              </motion.div>

              {/* Main ghost letter */}
              <motion.div
                className="relative z-10"
                animate={{ opacity: ghostPhase }}
              >
                <span
                  className="text-[200px] sm:text-[280px] font-display text-neutral-700 select-none"
                  style={{
                    textShadow: `
                      0 0 30px rgba(255,255,255,0.15),
                      0 0 60px rgba(255,255,255,0.05)
                    `,
                  }}
                >
                  {product.name[0]}
                </span>
              </motion.div>

              {/* Scan lines */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.5) 2px, rgba(255, 255, 255, 0.5) 4px)`,
                }}
              />

              {/* CRT vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: "inset 0 0 100px rgba(0,0,0,0.6)" }}
              />
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col"
            >
              {/* Header */}
              <div className="border-b border-neutral-800 pb-6 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <motion.span
                    className="w-2 h-2 rounded-full bg-green-500"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-green-500 font-mono text-[10px] font-semibold">
                    PRODUCT DATA
                  </span>
                </div>
                <span className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest">
                  {product.category} / ID:{product.id.padStart(4, "0")}
                </span>
                <h1 className="font-display text-4xl sm:text-5xl tracking-wider mt-2">
                  {product.name}
                </h1>

                <div className="flex items-end gap-4 mt-4">
                  <span className="font-display text-4xl">
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="font-mono text-lg text-neutral-600 line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                </div>

                <div className={`font-mono text-[10px] mt-3 ${stockColor}`}>
                  // {stockStatus} ({product.stock} units)
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <p className="text-neutral-400 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest">
                    Select Size
                  </span>
                  <Link
                    href="/size-guide"
                    className="font-mono text-[10px] text-neutral-500 hover:text-white transition-colors"
                  >
                    Size Guide
                  </Link>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size.code}
                      whileHover={size.inStock ? { scale: 1.05 } : {}}
                      whileTap={size.inStock ? { scale: 0.95 } : {}}
                      onClick={() => size.inStock && setSelectedSize(size.code)}
                      disabled={!size.inStock}
                      className={`w-14 h-12 flex items-center justify-center border font-mono text-sm transition-all ${
                        selectedSize === size.code
                          ? "border-white bg-white text-black"
                          : size.inStock
                          ? "border-neutral-700 hover:border-white"
                          : "border-neutral-800 text-neutral-700 cursor-not-allowed"
                      }`}
                    >
                      {size.code}
                    </motion.button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="font-mono text-[10px] text-neutral-600 mt-2">
                    Please select a size
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <span className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest block mb-3">
                  Quantity
                </span>
                <div className="flex items-center border border-neutral-800 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-neutral-900 transition-colors font-mono text-lg"
                  >
                    -
                  </button>
                  <span className="w-14 h-12 flex items-center justify-center font-mono border-x border-neutral-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-neutral-900 transition-colors font-mono text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleAddToCart}
                disabled={!selectedSize || product.stock === 0}
                className={`w-full py-4 font-mono text-sm uppercase tracking-widest transition-all ${
                  isAdded
                    ? "bg-green-500 text-black"
                    : !selectedSize || product.stock === 0
                    ? "bg-neutral-800 text-neutral-600 cursor-not-allowed"
                    : "bg-white text-black hover:bg-neutral-200"
                }`}
              >
                {isAdded
                  ? "// ADDED"
                  : product.stock === 0
                  ? "// SOLD OUT"
                  : "// ADD TO BASKET"}
              </motion.button>

              {/* Product Details Accordion */}
              <div className="mt-8 border-t border-neutral-800">
                <details className="group">
                  <summary className="py-4 flex items-center justify-between cursor-pointer border-b border-neutral-800">
                    <span className="font-mono text-[11px] uppercase tracking-widest">
                      Product Details
                    </span>
                    <span className="font-mono text-neutral-600 group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <div className="py-4 text-sm text-neutral-400 space-y-2">
                    <p>Material: 100% Organic Cotton</p>
                    <p>Fit: Regular Fit</p>
                    <p>Care: Machine wash cold</p>
                    <p>Origin: Made in Portugal</p>
                  </div>
                </details>

                <details className="group">
                  <summary className="py-4 flex items-center justify-between cursor-pointer border-b border-neutral-800">
                    <span className="font-mono text-[11px] uppercase tracking-widest">
                      Shipping & Returns
                    </span>
                    <span className="font-mono text-neutral-600 group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <div className="py-4 text-sm text-neutral-400 space-y-2">
                    <p>Free shipping on orders over {formatPrice(100)}</p>
                    <p>Standard delivery: 3-5 business days</p>
                    <p>Express delivery: 1-2 business days</p>
                    <p>30-day returns policy</p>
                  </div>
                </details>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
