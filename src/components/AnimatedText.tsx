"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  animation?: "fadeUp" | "fadeIn" | "letterByLetter" | "wordByWord";
}

export default function AnimatedText({
  children,
  className = "",
  delay = 0,
  as = "p",
  animation = "fadeUp",
}: AnimatedTextProps) {
  const Component = motion[as];

  if (animation === "letterByLetter" && typeof children === "string") {
    return (
      <Component className={className}>
        {children.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: delay + index * 0.03,
              ease: "easeOut",
            }}
            style={{ display: "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </Component>
    );
  }

  if (animation === "wordByWord" && typeof children === "string") {
    return (
      <Component className={className}>
        {children.split(" ").map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: delay + index * 0.1,
              ease: "easeOut",
            }}
            style={{ display: "inline-block", marginRight: "0.3em" }}
          >
            {word}
          </motion.span>
        ))}
      </Component>
    );
  }

  const variants: Record<string, { initial: object; animate: object }> = {
    fadeUp: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
  };

  const selectedVariant = variants[animation] || variants.fadeUp;

  return (
    <Component
      className={className}
      initial={selectedVariant.initial}
      animate={selectedVariant.animate}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </Component>
  );
}
