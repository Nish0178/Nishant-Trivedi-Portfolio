/**
 * Cinematic Motion System Tokens & Variants
 * Grounded in the editorial, filmic motion language of the reference portfolio.
 */

// Cinematic cubic-bezier easing curves
export const EASING = {
  cinematic: [0.16, 1, 0.3, 1] as const, // Primary editorial ease-out
  smooth: [0.22, 1, 0.36, 1] as const,    // Smooth layout transitions
  anticipate: [0.34, 1.56, 0.64, 1] as const, // Subtle micro-delight (desktop only)
  linear: [0, 0, 1, 1] as const,
};

// Standardized durations in seconds
export const DURATION = {
  instant: 0.15,
  micro: 0.3,
  normal: 0.6,
  cinematic: 0.9,
  slow: 1.2,
  epic: 1.5,
};

// Stagger timings
export const STAGGER = {
  fast: 0.06,
  normal: 0.1,
  editorial: 0.14,
};

// Reusable Framer Motion variants
export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.normal,
      delay: custom * STAGGER.normal,
      ease: EASING.cinematic,
    },
  }),
};

export const clipRevealVariants = {
  hidden: {
    clipPath: "inset(100% 0% 0% 0%)",
    opacity: 0,
    scale: 1.04,
  },
  visible: (delay: number = 0) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION.cinematic,
      delay,
      ease: EASING.cinematic,
    },
  }),
};

export const horizontalDriftLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.cinematic,
      delay,
      ease: EASING.cinematic,
    },
  }),
};

export const horizontalDriftRight = {
  hidden: { opacity: 0, x: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.cinematic,
      delay,
      ease: EASING.cinematic,
    },
  }),
};

export const scaleRevealVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION.cinematic,
      delay,
      ease: EASING.cinematic,
    },
  }),
};
