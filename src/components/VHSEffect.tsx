"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface VHSEffectProps {
  children: ReactNode;
  className?: string;
  active?: boolean;
}

export default function VHSEffect({ children, className = "", active = true }: VHSEffectProps) {
  const [trackingOffset, setTrackingOffset] = useState(0);
  const [glitchLine, setGlitchLine] = useState<number | null>(null);

  useEffect(() => {
    if (!active) return;

    // Subtle tracking wobble
    const trackingInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        setTrackingOffset(Math.random() * 1 - 0.5);
        setTimeout(() => setTrackingOffset(0), 100);
      }
    }, 500);

    // Occasional horizontal glitch line
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.03) {
        const linePos = Math.random() * 100;
        setGlitchLine(linePos);
        setTimeout(() => setGlitchLine(null), 150);
      }
    }, 300);

    return () => {
      clearInterval(trackingInterval);
      clearInterval(glitchInterval);
    };
  }, [active]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        animate={{ x: trackingOffset }}
        transition={{ duration: 0.05 }}
      >
        {children}
      </motion.div>

      {/* Horizontal glitch line */}
      {glitchLine !== null && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          exit={{ opacity: 0 }}
          className="absolute left-0 right-0 h-[2px] bg-white/10 pointer-events-none"
          style={{ top: `${glitchLine}%` }}
        />
      )}

      {/* Subtle noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
