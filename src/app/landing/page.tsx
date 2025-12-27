"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import GhostParticles from "@/components/GhostParticles";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [glitchIndex, setGlitchIndex] = useState<number | null>(null);
  const [showContent, setShowContent] = useState(false);
  const [ghostPhase, setGhostPhase] = useState(1);
  const bgControls = useAnimationControls();

  const titleLetters = "PHNTM".split("");

  useEffect(() => {
    setMounted(true);
    // Delay content reveal for dramatic entrance
    const timer = setTimeout(() => setShowContent(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Random letter glitch effect - subtle and infrequent
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.03) {
        const randomIndex = Math.floor(Math.random() * titleLetters.length);
        setGlitchIndex(randomIndex);
        setTimeout(() => setGlitchIndex(null), 80);
      }
    }, 600);

    return () => clearInterval(glitchInterval);
  }, [titleLetters.length]);

  // Ghost phase fluctuation
  const ghostTick = useCallback(() => {
    if (Math.random() < 0.15) {
      setGhostPhase(0.7 + Math.random() * 0.3);
      setTimeout(() => setGhostPhase(1), 150);
    }
  }, []);

  useEffect(() => {
    const scheduleNext = () => {
      const delay = 100 + Math.random() * 200;
      return setTimeout(() => {
        ghostTick();
        scheduleNext();
      }, delay);
    };
    const timeoutId = scheduleNext();
    return () => clearTimeout(timeoutId);
  }, [ghostTick]);

  // Background text flicker
  useEffect(() => {
    const flickerInterval = setInterval(() => {
      if (Math.random() < 0.03) {
        bgControls.start({
          opacity: [0.03, 0.06, 0.02, 0.04],
          x: [0, Math.random() * 3 - 1.5, 0],
          transition: { duration: 0.2 },
        });
      }
    }, 150);

    return () => clearInterval(flickerInterval);
  }, [bgControls]);

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden flex items-center justify-center">
      {/* Ghost particles - more for landing */}
      <GhostParticles count={50} />

      {/* CRT phosphor glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 60%)",
              "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 60%)",
              "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.01) 0%, transparent 60%)",
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Large background ghost text with flicker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={bgControls}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ opacity: 0.07 }}
      >
        <motion.span
          className="text-[40vw] sm:text-[35vw] font-display text-white leading-none tracking-wider"
          animate={{
            filter: [
              "brightness(1)",
              "brightness(1.2)",
              "brightness(0.9)",
              "brightness(1)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          PHNTM
        </motion.span>
      </motion.div>

      {/* RGB chromatic split ghost layer */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        animate={{
          opacity: [0, 0.03, 0],
          x: [-3, 3, -3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{ mixBlendMode: "screen" }}
      >
        <span className="text-[40vw] sm:text-[35vw] font-display text-red-500 leading-none tracking-wider">
          PHNTM
        </span>
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        animate={{
          opacity: [0, 0.03, 0],
          x: [3, -3, 3],
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 0.5 }}
        style={{ mixBlendMode: "screen" }}
      >
        <span className="text-[40vw] sm:text-[35vw] font-display text-cyan-500 leading-none tracking-wider">
          PHNTM
        </span>
      </motion.div>

      {/* Scan lines that travel down - slow and subtle */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] pointer-events-none z-20"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
        }}
        animate={{ top: ["-5%", "105%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute left-0 right-0 h-[1px] pointer-events-none z-20"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
        }}
        animate={{ top: ["-5%", "105%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear", delay: 7 }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        {/* Small header tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: showContent ? 0.5 : 0, y: showContent ? 0 : -20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-[10px] sm:text-xs text-neutral-500 tracking-[0.3em] mb-8"
        >
          // ESTABLISHING CONNECTION
        </motion.div>

        {/* Main title with glitch */}
        <motion.h1
          className="font-display text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] tracking-[0.15em] mb-8 relative"
          animate={{
            opacity: ghostPhase,
            filter: [
              "brightness(1)",
              "brightness(1.05)",
              "brightness(0.95)",
              "brightness(1)",
            ],
          }}
          transition={{ filter: { duration: 6, repeat: Infinity, ease: "linear" } }}
        >
          {titleLetters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 80, filter: "blur(20px)" }}
              animate={{
                opacity: showContent ? 1 : 0,
                y: showContent ? 0 : 80,
                filter: showContent ? "blur(0px)" : "blur(20px)",
                x: glitchIndex === index ? [0, 5, -3, 0] : 0,
                skewX: glitchIndex === index ? [0, 8, -5, 0] : 0,
              }}
              transition={{
                opacity: { duration: 1.5, delay: 0.5 + index * 0.15 },
                y: { duration: 1.5, delay: 0.5 + index * 0.15 },
                filter: { duration: 1.8, delay: 0.5 + index * 0.15 },
                x: { duration: 0.2 },
                skewX: { duration: 0.2 },
              }}
              className="inline-block relative"
              style={{
                textShadow: glitchIndex === index
                  ? "3px 0 #ff0000, -3px 0 #00ffff, 0 0 20px rgba(255,255,255,0.3)"
                  : "0 0 30px rgba(255,255,255,0.1)",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showContent ? 0.6 : 0, y: showContent ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="font-body text-lg sm:text-xl md:text-2xl text-neutral-400 font-light max-w-2xl mx-auto tracking-wide mb-12"
        >
          Premium streetwear. Minimal design. Maximum impact.
        </motion.p>

        {/* Animated divider */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: showContent ? "120px" : 0,
            opacity: showContent ? [1, 0.6, 1, 0.8, 1] : 0,
          }}
          transition={{
            width: { delay: 1.3, duration: 0.8 },
            opacity: { delay: 2, duration: 4, repeat: Infinity },
          }}
          className="h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-12"
        />

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 40 }}
          transition={{ duration: 1.2, delay: 2 }}
        >
          <Link href="/">
            <motion.button
              whileHover={{
                scale: 1.01,
              }}
              whileTap={{ scale: 0.98 }}
              className="relative px-12 sm:px-16 py-5 sm:py-6 bg-transparent border border-neutral-800 text-white font-mono text-sm uppercase tracking-[0.25em] transition-all duration-500 overflow-hidden group"
            >
              {/* Ambient glow pulse */}
              <motion.span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 70%)",
                }}
              />

              {/* Scan line on hover */}
              <motion.span
                className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                initial={{ top: "0%" }}
                whileHover={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />

              {/* Ghost text layers */}
              <span className="absolute inset-0 flex items-center justify-center text-red-500/0 group-hover:text-red-500/20 transition-colors duration-300 translate-x-[2px]" style={{ mixBlendMode: "screen" }}>
                Enter
              </span>
              <span className="absolute inset-0 flex items-center justify-center text-cyan-500/0 group-hover:text-cyan-500/20 transition-colors duration-300 -translate-x-[2px]" style={{ mixBlendMode: "screen" }}>
                Enter
              </span>

              {/* Main text with subtle breathing */}
              <motion.span
                className="relative z-10 block"
                animate={{
                  opacity: [1, 0.85, 1],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                Enter
              </motion.span>

              {/* Bottom border glow on hover */}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500" />

              {/* Subtle corner accents on hover */}
              <span className="absolute top-0 left-0 w-0 h-[1px] bg-white/50 group-hover:w-4 transition-all duration-300" />
              <span className="absolute top-0 left-0 w-[1px] h-0 bg-white/50 group-hover:h-4 transition-all duration-300" />
              <span className="absolute top-0 right-0 w-0 h-[1px] bg-white/50 group-hover:w-4 transition-all duration-300" />
              <span className="absolute top-0 right-0 w-[1px] h-0 bg-white/50 group-hover:h-4 transition-all duration-300" />
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/50 group-hover:w-4 transition-all duration-300 delay-100" />
              <span className="absolute bottom-0 left-0 w-[1px] h-0 bg-white/50 group-hover:h-4 transition-all duration-300 delay-100" />
              <span className="absolute bottom-0 right-0 w-0 h-[1px] bg-white/50 group-hover:w-4 transition-all duration-300 delay-100" />
              <span className="absolute bottom-0 right-0 w-[1px] h-0 bg-white/50 group-hover:h-4 transition-all duration-300 delay-100" />
            </motion.button>
          </Link>
        </motion.div>

      </div>

      {/* CRT screen edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 150px rgba(0,0,0,0.7)",
        }}
      />

      {/* Subtle interlace lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.8) 2px,
            rgba(0, 0, 0, 0.8) 4px
          )`,
        }}
      />

    </main>
  );
}
