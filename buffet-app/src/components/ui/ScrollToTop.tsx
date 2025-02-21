import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { scrollToTopShowAnimation } from "../../animations";

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
          {...scrollToTopShowAnimation(0.5)}
          onClick={handleClick}
          className="fixed bottom-5 right-5 z-20 cursor-pointer rounded-full p-2"
        >
          <ChevronUp
            size={42}
            className={`text-white transition-all duration-500 ease-in-out hover:text-gray-300`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
