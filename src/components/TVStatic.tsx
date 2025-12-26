"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TVStaticProps {
  duration?: number;
  intensity?: "subtle" | "medium" | "strong";
  fadeOutDuration?: number;
}

export default function TVStatic({
  duration = 2000,
  intensity = "subtle",
  fadeOutDuration = 1000,
}: TVStaticProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const animationRef = useRef<number | undefined>(undefined);
  const frameCount = useRef(0);

  const intensityValues = {
    subtle: { opacity: 0.02, scanlineOpacity: 0.015 },
    medium: { opacity: 0.04, scanlineOpacity: 0.03 },
    strong: { opacity: 0.08, scanlineOpacity: 0.05 },
  };

  const { opacity, scanlineOpacity } = intensityValues[intensity];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // Generate static noise - slower refresh rate
    const generateNoise = () => {
      frameCount.current++;

      // Only update every 3rd frame for slower static
      if (frameCount.current % 3 === 0) {
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const noise = Math.random() * 255;
          data[i] = noise;
          data[i + 1] = noise;
          data[i + 2] = noise;
          data[i + 3] = 255;
        }

        ctx.putImageData(imageData, 0, 0);
      }

      animationRef.current = requestAnimationFrame(generateNoise);
    };

    generateNoise();

    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(timeout);
    };
  }, [duration]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: fadeOutDuration / 1000, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] pointer-events-none"
        >
          {/* Static noise canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ opacity: opacity, mixBlendMode: "overlay" }}
          />

          {/* Scanlines overlay */}
          <div
            className="absolute inset-0"
            style={{
              opacity: scanlineOpacity,
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 0, 0, 0.3) 2px,
                rgba(0, 0, 0, 0.3) 4px
              )`,
            }}
          />

          {/* Vignette effect */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(
                ellipse at center,
                transparent 0%,
                transparent 60%,
                rgba(0, 0, 0, 0.1) 100%
              )`,
            }}
          />

          {/* Slower flicker effect */}
          <motion.div
            className="absolute inset-0 bg-white"
            animate={{
              opacity: [0, 0.015, 0, 0.01, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Math.floor(duration / 1500),
              ease: "linear",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
