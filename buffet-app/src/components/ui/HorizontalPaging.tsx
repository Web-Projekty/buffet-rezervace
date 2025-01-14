import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { fadeInAnimation } from "../../animations";

type HorizontalPagingProps = {
  children: React.ReactNode;
  className?: string;
  backgroundType?: number;
};

const HorizontalPaging = ({
  children,
  className,
  backgroundType = 1,
}: HorizontalPagingProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      const isMobile = window.innerWidth <= 1500;
      setCanScrollRight(
        scrollWidth > clientWidth + scrollLeft + (isMobile ? 1 : 0),
      );
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const getBackgroundColor = (side: "left" | "right") => {
    if (backgroundType === 1) {
      if (side === "right") {
        return "bg-gradient-to-l from-backgroundColor via-backgroundColor to-transparent";
      } else {
        return "bg-gradient-to-r from-backgroundColor via-backgroundColor to-transparent";
      }
    } else {
      if (side === "right") {
        return "bg-gradient-to-l from-slate-900 via-slate-900 to-transparent";
      } else {
        return "bg-gradient-to-r from-slate-900 via-slate-900 to-transparent";
      }
    }
  };

  useEffect(() => {
    const handleResize = () => updateScrollButtons();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    updateScrollButtons();
  }, [children]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      scrollContainer.addEventListener("scroll", updateScrollButtons);
      return () => {
        scrollContainer.removeEventListener("scroll", updateScrollButtons);
      };
    }
  }, []);

  return (
    <div className="relative flex flex-row">
      <AnimatePresence>
        {canScrollLeft && (
          <motion.div
            {...fadeInAnimation(0.2)}
            className={`absolute -left-2 z-10 flex h-full items-center rounded-lg ${getBackgroundColor("left")} px-2 pr-10`}
          >
            <ChevronLeft
              size={30}
              onClick={scrollLeft}
              className="cursor-pointer text-white"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`flex overflow-x-auto ${className} items-center gap-3 overflow-y-hidden`}
        ref={scrollContainerRef}
      >
        {children}
      </div>

      <AnimatePresence>
        {canScrollRight && (
          <motion.div
            {...fadeInAnimation(0.2)}
            className={`absolute -right-2 z-10 flex h-full items-center rounded-lg ${getBackgroundColor("right")} px-2 pl-10`}
          >
            <ChevronRight
              size={30}
              onClick={scrollRight}
              className="cursor-pointer text-white"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HorizontalPaging;
