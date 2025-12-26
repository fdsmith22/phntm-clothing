"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

interface GhostLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
}

export default function GhostLogo({ size = "md", animated = true }: GhostLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [brightness, setBrightness] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [glitchLetter, setGlitchLetter] = useState<number | null>(null);

  const sizeClasses = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl",
    xl: "text-7xl",
  };

  // Organic CRT flicker - always active, high visibility white flicker
  const flickerTick = useCallback(() => {
    const rand = Math.random();

    // Much more frequent white/brightness spikes
    if (rand < 0.08) {
      // Occasional brightness dip
      setBrightness(0.7 + Math.random() * 0.15);
      setTimeout(() => setBrightness(1), 40 + Math.random() * 80);
    } else if (rand < 0.35) {
      // Frequent white flicker spikes (more visible)
      setBrightness(1.25 + Math.random() * 0.35);
      setTimeout(() => setBrightness(1), 30 + Math.random() * 70);
    }

    // More frequent horizontal jitter
    if (Math.random() < 0.08) {
      setOffsetX(Math.random() * 4 - 2);
      setTimeout(() => setOffsetX(0), 40);
    }

    // More frequent letter glitch
    if (Math.random() < 0.05) {
      setGlitchLetter(Math.floor(Math.random() * 5));
      setTimeout(() => setGlitchLetter(null), 60 + Math.random() * 80);
    }
  }, []);

  useEffect(() => {
    if (!animated) return;

    const scheduleNext = () => {
      const delay = 100 + Math.random() * 250;
      return setTimeout(() => {
        flickerTick();
        scheduleNext();
      }, delay);
    };

    const timeoutId = scheduleNext();
    return () => clearTimeout(timeoutId);
  }, [animated, flickerTick]);

  const letters = "PHNTM".split("");

  return (
    <motion.div
      className={`font-display tracking-[0.15em] cursor-pointer relative ${sizeClasses[size]}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        x: offsetX,
      }}
      transition={{ duration: 0.03 }}
    >
      {/* Main text */}
      <motion.div
        className="relative flex"
        animate={{
          filter: `brightness(${brightness})`,
        }}
        transition={{ duration: 0.04 }}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              x: glitchLetter === index ? Math.random() * 4 - 2 : 0,
              skewX: glitchLetter === index ? Math.random() * 6 - 3 : 0,
            }}
            transition={{
              opacity: { delay: index * 0.08, duration: 0.5 },
              y: { delay: index * 0.08, duration: 0.5 },
              filter: { delay: index * 0.08, duration: 0.5 },
              x: { duration: 0.05 },
              skewX: { duration: 0.05 },
            }}
            className="inline-block relative"
            style={{
              textShadow: glitchLetter === index
                ? "3px 0 #ff0000, -3px 0 #00ffff, 0 0 10px rgba(255,255,255,0.5)"
                : isHovered
                  ? `0 0 ${25 * brightness}px rgba(255,255,255,0.4), 0 0 ${50 * brightness}px rgba(255,255,255,0.1)`
                  : `0 0 ${12 * brightness}px rgba(255,255,255,0.15)`,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>

      {/* Chromatic aberration layers - more visible on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex"
        animate={{
          x: isHovered ? [0, 1.5, 0, -1, 0] : 0,
          opacity: isHovered ? 0.4 : 0.15,
        }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ color: "#ff0000", mixBlendMode: "screen" }}
      >
        {letters.map((letter, index) => (
          <span key={index} className="inline-block">{letter}</span>
        ))}
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none flex"
        animate={{
          x: isHovered ? [0, -1.5, 0, 1, 0] : 0,
          opacity: isHovered ? 0.4 : 0.15,
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        style={{ color: "#00ffff", mixBlendMode: "screen" }}
      >
        {letters.map((letter, index) => (
          <span key={index} className="inline-block">{letter}</span>
        ))}
      </motion.div>

      {/* Scan line on hover */}
      {isHovered && (
        <motion.div
          className="absolute left-0 right-0 h-[2px] pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
          }}
          initial={{ top: "-20%" }}
          animate={{ top: "120%" }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
      )}
    </motion.div>
  );
}
