"use client";

import { motion, useAnimationControls } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface CRTFlickerProps {
  children: ReactNode;
  className?: string;
  intensity?: "subtle" | "medium" | "heavy";
  active?: boolean;
  onHover?: boolean;
}

export default function CRTFlicker({
  children,
  className = "",
  intensity = "subtle",
  active = true,
  onHover = false,
}: CRTFlickerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimationControls();

  const intensityConfig = {
    subtle: {
      brightnessRange: [1, 1.02, 0.98, 1, 1.01, 1],
      opacityRange: [1, 0.97, 1, 0.99, 1],
      duration: 4,
      glitchChance: 0.02,
    },
    medium: {
      brightnessRange: [1, 1.04, 0.96, 1, 1.02, 0.98, 1],
      opacityRange: [1, 0.94, 1, 0.97, 1, 0.96, 1],
      duration: 3,
      glitchChance: 0.05,
    },
    heavy: {
      brightnessRange: [1, 1.08, 0.92, 1, 1.05, 0.95, 1],
      opacityRange: [1, 0.9, 1, 0.95, 1, 0.92, 1],
      duration: 2,
      glitchChance: 0.1,
    },
  };

  const config = intensityConfig[intensity];
  const shouldAnimate = active && (!onHover || isHovered);

  // Random micro-glitch effect
  useEffect(() => {
    if (!shouldAnimate) return;

    const glitchInterval = setInterval(() => {
      if (Math.random() < config.glitchChance) {
        controls.start({
          x: [0, Math.random() * 2 - 1, 0],
          filter: [
            "brightness(1)",
            `brightness(${1.1 + Math.random() * 0.1})`,
            "brightness(1)",
          ],
          transition: { duration: 0.1 },
        });
      }
    }, 200);

    return () => clearInterval(glitchInterval);
  }, [shouldAnimate, config.glitchChance, controls]);

  return (
    <motion.div
      className={`relative ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={controls}
    >
      {/* Main content with flicker */}
      <motion.div
        animate={
          shouldAnimate
            ? {
                filter: config.brightnessRange.map((b) => `brightness(${b})`),
                opacity: config.opacityRange,
              }
            : {}
        }
        transition={{
          duration: config.duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {children}
      </motion.div>

      {/* Chromatic aberration layer - subtle RGB split */}
      {shouldAnimate && (
        <>
          <motion.div
            className="absolute inset-0 pointer-events-none mix-blend-screen"
            animate={{
              x: [0, 0.5, 0, -0.3, 0],
              opacity: [0, 0.03, 0, 0.02, 0],
            }}
            transition={{
              duration: config.duration * 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ filter: "url(#redChannel)" }}
          >
            {children}
          </motion.div>
          <motion.div
            className="absolute inset-0 pointer-events-none mix-blend-screen"
            animate={{
              x: [0, -0.5, 0, 0.3, 0],
              opacity: [0, 0.03, 0, 0.02, 0],
            }}
            transition={{
              duration: config.duration * 1.3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ filter: "url(#blueChannel)" }}
          >
            {children}
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
