"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrency } from "@/context/CurrencyContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "./Toast";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image?: string;
  description?: string;
  stock?: number;
  compareAtPrice?: number;
}

interface ProductCardProps {
  product: Product;
  index: number;
  isFlipped?: boolean;
  onFlip?: () => void;
}

export default function ProductCard({ product, index, isFlipped = false, onFlip }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [signalStrength, setSignalStrength] = useState(4);
  const [ghostPhase, setGhostPhase] = useState(1);
  const [glitchLine, setGlitchLine] = useState<number | null>(null);
  const [timestamp, setTimestamp] = useState("");
  const [interference, setInterference] = useState(false);
  const [scanY, setScanY] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { formatPrice } = useCurrency();
  const { addItem, openCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimestamp(now.toLocaleTimeString("en-US", { hour12: false }) + ":" +
        String(now.getMilliseconds()).padStart(3, "0").slice(0, 2));
    };
    updateTime();
    const interval = setInterval(updateTime, 100);
    return () => clearInterval(interval);
  }, []);

  const ghostTick = useCallback(() => {
    // Reduced frequencies for subtler effects
    if (Math.random() < 0.05) {
      setGhostPhase(0.5 + Math.random() * 0.5);
      setTimeout(() => setGhostPhase(1), 200 + Math.random() * 300);
    }
    if (Math.random() < 0.03) {
      setSignalStrength(Math.floor(Math.random() * 3) + 2);
      setTimeout(() => setSignalStrength(4), 800);
    }
    if (Math.random() < 0.015) {
      setGlitchLine(Math.random() * 100);
      setTimeout(() => setGlitchLine(null), 60);
    }
    if (Math.random() < 0.002) {
      setInterference(true);
      setTimeout(() => setInterference(false), 100);
    }
  }, []);

  const handleFlip = () => {
    setInterference(true);
    setTimeout(() => {
      onFlip?.();
      setTimeout(() => setInterference(false), 150);
    }, 100);
  };

  useEffect(() => {
    const scheduleNext = () => {
      const delay = 400 + Math.random() * 600;
      return setTimeout(() => {
        ghostTick();
        scheduleNext();
      }, delay);
    };
    const timeoutId = scheduleNext();
    return () => clearTimeout(timeoutId);
  }, [ghostTick]);

  useEffect(() => {
    if (!isHovered) return;
    const scanInterval = setInterval(() => {
      setScanY((prev) => (prev + 2) % 100);
    }, 50);
    return () => clearInterval(scanInterval);
  }, [isHovered]);

  useEffect(() => {
    if (!interference) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth || 300;
    canvas.height = canvas.offsetHeight || 400;

    // Ensure valid dimensions before creating image data
    if (canvas.width <= 0 || canvas.height <= 0) return;

    let rafId: number;
    const generateNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 255;
        data[i] = noise;
        data[i + 1] = noise;
        data[i + 2] = noise;
        data[i + 3] = 180;
      }
      ctx.putImageData(imageData, 0, 0);
      rafId = requestAnimationFrame(generateNoise);
    };
    generateNoise();
    return () => cancelAnimationFrame(rafId);
  }, [interference]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Prevent adding out of stock items
    if (product.stock === 0) return;

    // Default to "M" if no size selected
    const size = selectedSize || "M";

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size,
      quantity: 1,
      category: product.category,
    });

    setIsAdded(true);
    setInterference(true);
    showToast(`${product.name} added to basket`, "success");
    setTimeout(() => {
      setInterference(false);
      setTimeout(() => {
        setIsAdded(false);
        openCart();
      }, 800);
    }, 200);
  };

  const isOutOfStock = product.stock === 0;

  const cameraId = `CAM-${String(index + 1).padStart(2, "0")}`;

  const productDetails = {
    material: "100% Organic Cotton",
    fit: "Regular Fit",
    care: "Machine wash cold",
    origin: "Made in Portugal",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative h-[420px] sm:h-[450px] cursor-pointer group perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleFlip}
    >
      {/* Spectral ghost trail during flip */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        animate={{
          opacity: isFlipped ? [0, 0.3, 0.2, 0] : 0,
          scale: isFlipped ? [1, 1.02, 1.01, 1] : 1,
        }}
        transition={{ duration: 0.8 }}
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, transparent 70%)",
        }}
      />

      {/* RGB ghost layers during flip */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        animate={{
          opacity: isFlipped ? [0, 0.2, 0] : 0,
          x: isFlipped ? [0, -6, 0] : 0,
        }}
        transition={{ duration: 0.8 }}
        style={{
          background: "linear-gradient(90deg, rgba(255,0,0,0.15) 0%, transparent 50%)",
          mixBlendMode: "screen",
        }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        animate={{
          opacity: isFlipped ? [0, 0.2, 0] : 0,
          x: isFlipped ? [0, 6, 0] : 0,
        }}
        transition={{ duration: 0.8 }}
        style={{
          background: "linear-gradient(90deg, transparent 50%, rgba(0,255,255,0.15) 100%)",
          mixBlendMode: "screen",
        }}
      />

      {/* 3D flip container */}
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* ===== FRONT OF CARD - Just Image + Name ===== */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: "hidden" }}
        >
          <motion.div
            className="h-full bg-black border border-neutral-800 overflow-hidden relative flex flex-col"
            animate={{
              borderColor: isHovered ? "rgba(255,255,255,0.3)" : "rgba(38,38,38,1)",
            }}
            style={{
              boxShadow: isHovered
                ? "0 0 30px rgba(255,255,255,0.1), inset 0 0 60px rgba(0,0,0,0.5)"
                : "inset 0 0 60px rgba(0,0,0,0.5)",
            }}
          >
            {/* Interference static overlay */}
            <AnimatePresence>
              {interference && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50"
                >
                  <canvas ref={canvasRef} className="w-full h-full" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Surveillance header */}
            <div className="absolute top-0 left-0 right-0 z-20 p-3 flex justify-between items-start font-mono text-[10px] text-neutral-500">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <motion.span
                    className="w-2 h-2 rounded-full bg-red-500"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="text-red-500 font-semibold">REC</span>
                </div>
                <div className="text-neutral-600">{cameraId}</div>
              </div>

              <div className="text-right space-y-1">
                <div className="tabular-nums">{timestamp}</div>
                <div className="flex items-center gap-1 justify-end">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1"
                      style={{
                        height: `${(i + 1) * 3}px`,
                        backgroundColor: i < signalStrength ? "#fff" : "#333",
                      }}
                      animate={{ opacity: i < signalStrength ? 1 : 0.3 }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Product Image Area - Takes most of the space */}
            <div className="flex-1 bg-neutral-950 flex items-center justify-center relative overflow-hidden">
              {/* Ghost afterimage layers */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  opacity: ghostPhase * 0.15,
                  x: isHovered ? [-2, 2, -1, 0] : 0,
                }}
                transition={{ x: { duration: 0.3, repeat: Infinity } }}
                style={{ color: "#ff0000", mixBlendMode: "screen" }}
              >
                <span className="text-[120px] sm:text-[140px] font-display select-none">{product.name[0]}</span>
              </motion.div>

              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  opacity: ghostPhase * 0.15,
                  x: isHovered ? [2, -2, 1, 0] : 0,
                }}
                transition={{ x: { duration: 0.3, repeat: Infinity, delay: 0.1 } }}
                style={{ color: "#00ffff", mixBlendMode: "screen" }}
              >
                <span className="text-[120px] sm:text-[140px] font-display select-none">{product.name[0]}</span>
              </motion.div>

              {/* Main ghost product letter */}
              <motion.div
                className="relative z-10 flex items-center justify-center"
                animate={{
                  opacity: ghostPhase,
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ scale: { duration: 0.3 } }}
              >
                <span
                  className="text-[120px] sm:text-[140px] font-display text-neutral-700 select-none"
                  style={{
                    textShadow: `
                      0 0 ${20 * ghostPhase}px rgba(255,255,255,${0.15 * ghostPhase}),
                      0 0 ${40 * ghostPhase}px rgba(255,255,255,${0.05 * ghostPhase})
                    `,
                  }}
                >
                  {product.name[0]}
                </span>
              </motion.div>

              {/* Scan line */}
              {isHovered && (
                <motion.div
                  className="absolute left-0 right-0 h-[2px] pointer-events-none z-30"
                  style={{
                    top: `${scanY}%`,
                    background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.15) 50%, transparent 90%)",
                  }}
                />
              )}

              {/* Glitch line */}
              {glitchLine !== null && (
                <div
                  className="absolute left-0 right-0 h-[3px] bg-white/20 z-30 pointer-events-none"
                  style={{ top: `${glitchLine}%` }}
                />
              )}

              {/* Horizontal interference lines */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.5) 2px, rgba(255, 255, 255, 0.5) 4px)`,
                }}
              />

              {/* Corner brackets */}
              <div className="absolute inset-4 pointer-events-none">
                <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-neutral-700" />
                <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-neutral-700" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-neutral-700" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-neutral-700" />
              </div>
            </div>

            {/* Product Name - Simple bottom section */}
            <motion.div
              className="p-4 border-t border-neutral-800"
              animate={{ opacity: ghostPhase }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-mono text-neutral-600 uppercase tracking-widest">
                      {product.category}
                    </span>
                    {product.stock !== undefined && (
                      <span
                        className={`text-[8px] font-mono uppercase ${
                          product.stock > 10
                            ? "text-green-500"
                            : product.stock > 0
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {product.stock > 10
                          ? "IN STOCK"
                          : product.stock > 0
                          ? `LOW (${product.stock})`
                          : "SOLD OUT"}
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading text-base sm:text-lg font-semibold uppercase tracking-wide">
                    {product.name}
                  </h3>
                </div>
                <span className="text-[9px] font-mono text-neutral-700">
                  TAP FOR DETAILS
                </span>
              </div>
            </motion.div>

            {/* CRT vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ boxShadow: "inset 0 0 80px rgba(0,0,0,0.6)" }}
            />

            {/* Bottom status bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-900 z-20">
              <motion.div
                className="h-full bg-neutral-700"
                initial={{ width: "0%" }}
                animate={{ width: isHovered ? "100%" : "0%" }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        </div>

        {/* ===== BACK OF CARD - Price, Details, Buy ===== */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="h-full bg-black border border-neutral-800 overflow-hidden relative flex flex-col">
            {/* Interference overlay */}
            <AnimatePresence>
              {interference && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50"
                >
                  <canvas ref={canvasRef} className="w-full h-full" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Back header */}
            <div className="p-3 flex justify-between items-start font-mono text-[10px] text-neutral-500 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <motion.span
                  className="w-2 h-2 rounded-full bg-green-500"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-green-500 font-semibold">DATA</span>
                <span className="text-neutral-600 ml-2">{cameraId}</span>
              </div>
              <span className="text-neutral-600">// DETAILS</span>
            </div>

            {/* Product details content */}
            <div className="flex-1 p-3 sm:p-4 flex flex-col overflow-hidden">
              {/* Product name + price header */}
              <div className="mb-2 sm:mb-3">
                <h3 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-wide mb-1">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl sm:text-3xl">{formatPrice(product.price)}</span>
                  <span className="font-mono text-[9px] sm:text-[10px] text-neutral-600 uppercase">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Details list - more compact */}
              <div className="space-y-1 flex-1 overflow-y-auto">
                {Object.entries(productDetails).map(([key, value], i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isFlipped ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.3 }}
                    className="flex justify-between items-center py-1.5 border-b border-neutral-900"
                  >
                    <span className="text-[9px] sm:text-[10px] text-neutral-600 uppercase tracking-widest font-mono">
                      {key}
                    </span>
                    <span className="text-xs sm:text-sm text-neutral-300 font-body">
                      {value}
                    </span>
                  </motion.div>
                ))}

                {/* Size selector */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isFlipped ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="pt-2"
                >
                  <p className="text-[9px] sm:text-[10px] text-neutral-600 uppercase tracking-widest mb-1.5 font-mono">
                    Select Size
                  </p>
                  <div className="flex gap-1.5 sm:gap-2">
                    {["S", "M", "L", "XL"].map((size) => (
                      <motion.span
                        key={size}
                        whileHover={{
                          boxShadow: "0 0 15px rgba(255,255,255,0.2)",
                        }}
                        className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center border text-xs sm:text-sm font-mono cursor-pointer transition-all ${
                          selectedSize === size
                            ? "border-white bg-white text-black"
                            : "border-neutral-700 hover:border-white"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSize(size);
                        }}
                      >
                        {size}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Action button */}
              <div className="pt-2 mt-auto">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[8px] sm:text-[9px] font-mono text-neutral-600">TAP CARD TO RETURN</span>
                </div>
                <motion.button
                  whileTap={isOutOfStock ? {} : { scale: 0.95 }}
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`w-full py-2.5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-widest transition-all duration-300 font-body ${
                    isOutOfStock
                      ? "bg-neutral-800 text-neutral-600 cursor-not-allowed"
                      : isAdded
                      ? "bg-white text-black"
                      : "bg-white text-black hover:bg-transparent hover:text-white border border-white"
                  }`}
                >
                  {isOutOfStock ? "// SOLD OUT" : isAdded ? "// ADDED" : "// ADD TO BASKET"}
                </motion.button>
              </div>
            </div>

            {/* Scan lines overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.02]"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)`,
              }}
            />

            {/* CRT vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ boxShadow: "inset 0 0 80px rgba(0,0,0,0.6)" }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
