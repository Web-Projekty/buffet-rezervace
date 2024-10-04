export const scaleUpAnimation = (duration: number = 0.5) => ({
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: { duration },
});

export const tapScaleAnimation = {
  initial: { scale: 1 },
  whileTap: { scale: 0.9 },
};
