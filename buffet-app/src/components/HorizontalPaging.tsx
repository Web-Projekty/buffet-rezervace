import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { fadeInAnimation } from "../animations";

type HorizontalScrollBarProps = {
  children: React.ReactNode;
  className?: string;
};

const HorizontalScrollBar = ({
  children,
  className,
}: HorizontalScrollBarProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  useEffect(() => {
    updateScrollButtons();
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", updateScrollButtons);
      window.addEventListener("resize", updateScrollButtons);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", updateScrollButtons);
      }
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  useEffect(() => {
    updateScrollButtons();
  }, [children]);

  return (
    <div className="relative flex flex-row">
      <AnimatePresence>
        {canScrollLeft && (
          <motion.div
            {...fadeInAnimation(0.2)}
            className="absolute -left-2 z-10 flex h-full items-center rounded-lg bg-gradient-to-r from-backgroundColor via-backgroundColor to-transparent px-2 pr-10"
          >
            <ChevronLeft
              size={30}
              onClick={scrollLeft}
              className="invisible hidden cursor-pointer text-white md:visible md:block"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`flex w-[25rem] gap-5 overflow-x-auto md:w-[70rem] 2xl:w-[100rem] ${className} overflow-y-hidden`}
        ref={scrollContainerRef}
      >
        {children}
      </div>
      <AnimatePresence>
        {canScrollRight && (
          <motion.div
            {...fadeInAnimation(0.2)}
            className="absolute -right-2 z-10 flex h-full items-center rounded-lg bg-gradient-to-l from-backgroundColor via-backgroundColor to-transparent px-2 pl-10"
          >
            <ChevronRight
              size={30}
              onClick={scrollRight}
              className="invisible hidden cursor-pointer text-white md:visible md:block"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HorizontalScrollBar;
