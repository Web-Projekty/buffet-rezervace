export const menuItemShowAnimation = (duration: number = 0.5) => ({
  initial: { scale: 0.9, opacity: 0 },
  whileInView: { scale: 1, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 },
  transition: { duration },
});

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

export const fadeInAnimation = (duration: number = 0.5) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration },
});

export const slideInAnimation = (duration: number = 0.5) => ({
  initial: { y: 0, opacity: 0 },
  animate: { y: 50, opacity: 1 },
  exit: { y: 0, opacity: 0 },
  transition: { duration },
});

export const slideInLeftAnimation = (duration: number = 0.5) => ({
  initial: { x: -50, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -50, opacity: 0 },
  transition: { duration },
});

export const slideInRightAnimation = (duration: number = 0.5) => ({
  initial: { x: 50, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 50, opacity: 0 },
  transition: { duration },
});

export const scrollToTopShowAnimation = (duration: number = 0.5) => ({
  initial: { y: 20, opacity: 0 },
  animate: { y: -5, opacity: 1 },
  exit: { y: 20, opacity: 0 },
  transition: { duration },
});
