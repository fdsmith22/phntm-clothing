"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import GhostLogo from "@/components/GhostLogo";

export default function NotFound() {
  const [staticIntensity, setStaticIntensity] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setStaticIntensity(0.3 + Math.random() * 0.7);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId: number;

    const generateNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 255;
        data[i] = noise;
        data[i + 1] = noise;
        data[i + 2] = noise;
        data[i + 3] = 30 * staticIntensity;
      }

      ctx.putImageData(imageData, 0, 0);
      animationId = requestAnimationFrame(generateNoise);
    };

    generateNoise();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [staticIntensity]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Static noise background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Scan lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.5) 2px, rgba(255, 255, 255, 0.5) 4px)`,
        }}
      />

      {/* Moving scan line */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
        }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <GhostLogo size="lg" animated={true} />
        </motion.div>

        {/* Status indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-red-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
          <span className="font-mono text-[10px] text-red-500 uppercase tracking-widest">
            Signal Lost
          </span>
        </motion.div>

        {/* 404 Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative"
        >
          {/* RGB ghost layers */}
          <motion.span
            className="absolute inset-0 font-display text-[120px] sm:text-[200px] leading-none"
            style={{ color: "#ff0000", mixBlendMode: "screen" }}
            animate={{ x: [-2, 2, -1, 0], opacity: 0.3 }}
            transition={{ duration: 0.3, repeat: Infinity }}
          >
            404
          </motion.span>
          <motion.span
            className="absolute inset-0 font-display text-[120px] sm:text-[200px] leading-none"
            style={{ color: "#00ffff", mixBlendMode: "screen" }}
            animate={{ x: [2, -2, 1, 0], opacity: 0.3 }}
            transition={{ duration: 0.3, repeat: Infinity, delay: 0.1 }}
          >
            404
          </motion.span>
          <span
            className="font-display text-[120px] sm:text-[200px] leading-none text-neutral-800"
            style={{
              textShadow: "0 0 40px rgba(255,255,255,0.1)",
            }}
          >
            404
          </span>
        </motion.div>

        {/* Error message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 space-y-4"
        >
          <h1 className="font-heading text-2xl sm:text-3xl uppercase tracking-wider">
            Page Not Found
          </h1>
          <p className="text-neutral-500 max-w-md mx-auto">
            The page you are looking for has vanished into the void.
            It may have been moved, deleted, or never existed.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white text-black font-mono text-sm uppercase tracking-widest hover:bg-neutral-200 transition-colors"
            >
              // Return Home
            </motion.button>
          </Link>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 border border-neutral-700 font-mono text-sm uppercase tracking-widest hover:border-white transition-colors"
            >
              Report Issue
            </motion.button>
          </Link>
        </motion.div>

        {/* Timestamp */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12 font-mono text-[10px] text-neutral-700"
        >
          ERROR_CODE: 404 | TIMESTAMP: {new Date().toISOString()}
        </motion.div>
      </div>

      {/* CRT vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 150px rgba(0,0,0,0.8)" }}
      />

      {/* Corner brackets */}
      <div className="absolute top-8 left-8 w-8 h-8 border-l border-t border-neutral-800" />
      <div className="absolute top-8 right-8 w-8 h-8 border-r border-t border-neutral-800" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-l border-b border-neutral-800" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-r border-b border-neutral-800" />
    </div>
  );
}
