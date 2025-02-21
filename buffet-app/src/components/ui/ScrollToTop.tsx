import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { fadeInAnimation } from "../../animations";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          {...fadeInAnimation(0.5)}
          onClick={handleClick}
          className="fixed bottom-5 right-5 z-20 animate-pulse cursor-pointer rounded-full p-2"
        >
          <ChevronUp size={42} color="white" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
