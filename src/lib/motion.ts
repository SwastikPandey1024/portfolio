import type { Variants, Transition } from 'framer-motion';

// Standardized Timing Constants (Constitution §17 / Master Prompt §22)
export const MOTION_TIMING = {
  micro: 0.2, // 200ms
  component: 0.4, // 400ms
  section: 0.7, // 700ms
  ambient: 4.0, // 4000ms
} as const;

export const MOTION_EASING = {
  editorial: [0.16, 1, 0.3, 1], // Custom smooth cubic-bezier
  spring: { type: 'spring', damping: 25, stiffness: 300 },
} as const;

export const standardTransition: Transition = {
  duration: MOTION_TIMING.component,
  ease: [0.16, 1, 0.3, 1],
};

export const sectionTransition: Transition = {
  duration: MOTION_TIMING.section,
  ease: [0.16, 1, 0.3, 1],
};

// Reusable Motion Variants
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: standardTransition,
  },
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: standardTransition,
  },
};

export const sectionFadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: sectionTransition,
  },
};

export const staggerContainerVariants = (staggerChildren = 0.1): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren: 0.1,
    },
  },
});

export const subtleScaleHoverVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: MOTION_TIMING.micro, ease: 'easeOut' },
  },
  tap: {
    scale: 0.98,
    transition: { duration: MOTION_TIMING.micro, ease: 'easeIn' },
  },
};
