"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HoverGlowProps {
  children: ReactNode;
  className?: string;
  glowIntensity?: "subtle" | "medium" | "strong";
  hoverScale?: number;
  hoverLift?: number;
}

export default function HoverGlow({
  children,
  className = "",
  glowIntensity = "medium",
  hoverScale = 1,
  hoverLift = 0,
}: HoverGlowProps) {
  const glowValues = {
    subtle: "0 0 20px rgba(255, 255, 255, 0.08)",
    medium: "0 0 30px rgba(255, 255, 255, 0.12)",
    strong: "0 0 40px rgba(255, 255, 255, 0.18)",
  };

  return (
    <motion.div
      className={className}
      initial={{
        boxShadow: "0 0 0px rgba(255, 255, 255, 0)",
      }}
      whileHover={{
        boxShadow: glowValues[glowIntensity],
        scale: hoverScale,
        y: -hoverLift,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
