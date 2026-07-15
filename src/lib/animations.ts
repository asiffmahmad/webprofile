export const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

export const hoverLift = {
  whileHover: { y: -5, transition: { duration: 0.2, ease: "easeOut" as const } }
};

export const hoverScale = {
  whileHover: { scale: 1.02, transition: { duration: 0.2, ease: "easeOut" as const } }
};
