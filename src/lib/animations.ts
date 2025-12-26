// Reusable animation variants for Framer Motion

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4, ease: "easeInOut" },
};

export const letterAnimation = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

export const hoverGlow = {
  rest: {
    boxShadow: "0 0 0px rgba(255, 255, 255, 0)",
  },
  hover: {
    boxShadow: "0 0 30px rgba(255, 255, 255, 0.15)",
  },
};

export const hoverScale = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
};

export const hoverLift = {
  rest: { y: 0 },
  hover: { y: -5 },
};

// Default transition config
export const defaultTransition = {
  duration: 0.4,
  ease: [0.25, 0.1, 0.25, 1],
};

export const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 25,
};
