"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import GhostParticles from "./GhostParticles";
import GhostEffect from "./GhostEffect";

export default function Hero() {
  const titleLetters = "NEW COLLECTION".split("");
  const [glitchIndex, setGlitchIndex] = useState<number | null>(null);
  const bgControls = useAnimationControls();

  // Random letter glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.05) {
        const randomIndex = Math.floor(Math.random() * titleLetters.length);
        setGlitchIndex(randomIndex);
        setTimeout(() => setGlitchIndex(null), 100);
      }
    }, 300);

    return () => clearInterval(glitchInterval);
  }, [titleLetters.length]);

  // Background PHNTM text flicker
  useEffect(() => {
    const flickerInterval = setInterval(() => {
      if (Math.random() < 0.02) {
        bgControls.start({
          opacity: [0.06, 0.08, 0.04, 0.06],
          x: [0, Math.random() * 2 - 1, 0],
          transition: { duration: 0.15 },
        });
      }
    }, 200);

    return () => clearInterval(flickerInterval);
  }, [bgControls]);

  return (
    <section className="relative text-center py-32 bg-gradient-to-b from-neutral-950 to-black overflow-hidden">
      {/* Ghost particles background */}
      <GhostParticles count={30} />

      {/* CRT phosphor glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.01) 0%, transparent 70%)",
              "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 70%)",
              "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.01) 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Large background ghost text with flicker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={bgControls}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ opacity: 0.06 }}
      >
        <motion.span
          className="text-[25vw] font-display text-white leading-none tracking-wider"
          animate={{
            filter: [
              "brightness(1)",
              "brightness(1.1)",
              "brightness(0.95)",
              "brightness(1)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          PHNTM
        </motion.span>
      </motion.div>

      {/* Scan line that travels down */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] pointer-events-none z-20"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
        }}
        animate={{ top: ["-5%", "105%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Main content */}
      <div className="relative z-10">
        <motion.h1
          className="font-display text-6xl md:text-8xl tracking-[0.1em] mb-6 relative"
          animate={{
            filter: [
              "brightness(1)",
              "brightness(1.02)",
              "brightness(0.98)",
              "brightness(1)",
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        >
          {titleLetters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                x: glitchIndex === index ? [0, 3, -2, 0] : 0,
                skewX: glitchIndex === index ? [0, 5, -3, 0] : 0,
              }}
              transition={{
                opacity: { duration: 0.5, delay: index * 0.04 },
                y: { duration: 0.5, delay: index * 0.04 },
                filter: { duration: 0.5, delay: index * 0.04 },
                x: { duration: 0.1 },
                skewX: { duration: 0.1 },
              }}
              className="inline-block relative"
              style={{
                marginRight: letter === " " ? "0.2em" : "0",
                textShadow: glitchIndex === index
                  ? "2px 0 #ff0000, -2px 0 #00ffff"
                  : "0 0 10px rgba(255,255,255,0.1)",
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}

          {/* RGB split ghost layer */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: [0, 0.15, 0],
              x: [0, 2, 0],
            }}
            transition={{ duration: 6, repeat: Infinity }}
            style={{ color: "#ff0000", mixBlendMode: "screen" }}
          >
            {titleLetters.map((letter, index) => (
              <span
                key={index}
                className="inline-block"
                style={{ marginRight: letter === " " ? "0.2em" : "0" }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </motion.div>
        </motion.h1>

        <GhostEffect delay={0.8} fadeIntensity="medium">
          <motion.p
            className="font-body text-neutral-400 text-lg md:text-xl font-light max-w-xl mx-auto tracking-wide"
            animate={{
              opacity: [1, 0.95, 1],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Minimalist streetwear. Premium quality. Timeless design.
          </motion.p>
        </GhostEffect>

        {/* Animated line with flicker */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: "100px",
            opacity: [1, 0.7, 1, 0.9, 1],
          }}
          transition={{
            width: { delay: 1.2, duration: 0.8 },
            opacity: { delay: 2, duration: 3, repeat: Infinity },
          }}
          className="h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-10"
        />
      </div>

      {/* CRT screen edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 100px rgba(0,0,0,0.5)",
        }}
      />

      {/* Subtle interlace lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.5) 2px,
            rgba(0, 0, 0, 0.5) 4px
          )`,
        }}
      />
    </section>
  );
}
