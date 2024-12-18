import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type HorizontalScrollBarProps = {
  children: React.ReactNode;
};

const HorizontalScrollBar = ({ children }: HorizontalScrollBarProps) => {
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

  return (
    <div className="relative flex items-center">
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 z-10 h-full bg-gray-800 px-2 text-white"
        >
          <ChevronLeft />
        </button>
      )}

      <div
        className="scrollbar-hide flex w-[100rem] gap-5 overflow-x-auto px-10 py-3"
        ref={scrollContainerRef}
      >
        {children}
      </div>
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-0 z-10 h-full bg-gray-800 px-2 text-white"
        >
          <ChevronRight />
        </button>
      )}
    </div>
  );
};

export default HorizontalScrollBar;
