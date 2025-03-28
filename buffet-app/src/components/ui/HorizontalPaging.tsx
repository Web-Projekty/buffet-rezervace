import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { fadeInAnimation } from "../../animations";
import { twMerge } from "tailwind-merge";

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

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollStartPosition, setScrollStartPosition] = useState<number>(0);

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

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollStartPosition(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;

    const x = e.pageX;
    const walk = startX - x;

    scrollContainerRef.current.scrollLeft = scrollStartPosition + walk;
    e.preventDefault();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
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
    <section className="relative flex flex-row">
      <AnimatePresence>
        {canScrollLeft && (
          <motion.div
            {...fadeInAnimation(0.2)}
            className={`pointer-events-none absolute -left-2 z-20 flex h-full items-center rounded-lg ${getBackgroundColor("left")} px-2 pr-10`}
          >
            <ChevronLeft
              size={30}
              onClick={scrollLeft}
              className="pointer-events-auto cursor-pointer text-white"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={twMerge(
          `flex items-center gap-3 overflow-x-auto overflow-y-hidden`,
          isDragging ? "cursor-grabbing" : "cursor-grab",
          className,
        )}
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>

      <AnimatePresence>
        {canScrollRight && (
          <motion.div
            {...fadeInAnimation(0.2)}
            className={`pointer-events-none absolute -right-2 z-20 flex h-full items-center rounded-lg ${getBackgroundColor("right")} px-2 pl-10`}
          >
            <ChevronRight
              size={30}
              onClick={scrollRight}
              className="pointer-events-auto cursor-pointer text-white"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HorizontalPaging;
