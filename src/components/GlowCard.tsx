"use client";

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: "low" | "medium" | "high";
}

export default function GlowCard({
  children,
  className = "",
  glowColor = "255, 255, 255",
  intensity = "medium"
}: GlowCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const intensityValues = {
    low: { blur: 20, opacity: 0.05 },
    medium: { blur: 40, opacity: 0.1 },
    high: { blur: 60, opacity: 0.15 },
  };

  const { blur, opacity } = intensityValues[intensity];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Dynamic glow that follows cursor */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{
          opacity: isHovered ? opacity : 0,
          x: mousePosition.x - blur,
          y: mousePosition.y - blur,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          width: blur * 2,
          height: blur * 2,
          background: `radial-gradient(circle, rgba(${glowColor}, 0.3) 0%, transparent 70%)`,
          filter: `blur(${blur / 2}px)`,
        }}
      />

      {/* Border glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          boxShadow: isHovered
            ? `inset 0 0 ${blur}px rgba(${glowColor}, ${opacity})`
            : "inset 0 0 0px transparent",
        }}
        transition={{ duration: 0.3 }}
      />

      {children}
    </motion.div>
  );
}
