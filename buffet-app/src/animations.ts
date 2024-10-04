export const scaleUpAnimation = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: { duration: 0.5 },
};

export const tapScaleAnimation = {
  initial: { scale: 1 },
  whileTap: { scale: 0.9 },
};
