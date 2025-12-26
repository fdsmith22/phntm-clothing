"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GhostEffectProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  fadeIntensity?: "subtle" | "medium" | "strong";
}

export default function GhostEffect({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  fadeIntensity = "medium",
}: GhostEffectProps) {
  const intensityValues = {
    subtle: { blur: 5, opacity: 0.3 },
    medium: { blur: 10, opacity: 0 },
    strong: { blur: 20, opacity: 0 },
  };

  const { blur, opacity } = intensityValues[fadeIntensity];

  return (
    <motion.div
      className={className}
      initial={{
        opacity: opacity,
        filter: `blur(${blur}px)`,
        y: 20,
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
