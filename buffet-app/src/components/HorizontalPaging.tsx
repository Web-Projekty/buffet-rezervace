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
      // window.addEventListener("resize", updateScrollButtons);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", updateScrollButtons);
      }
      // window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  return (
    <div className="relative flex flex-row items-center">
      <div className="absolute -left-2 z-10 flex h-full items-center rounded-lg bg-gradient-to-r from-backgroundColor via-backgroundColor to-transparent px-2 pr-10">
        {canScrollLeft && (
          <ChevronLeft
            size={30}
            onClick={scrollLeft}
            className="hidden cursor-pointer text-white md:block"
          />
        )}
      </div>

      <div
        className="flex w-[25rem] gap-5 overflow-x-auto px-10 py-3 md:w-[70rem] 2xl:w-[100rem]"
        ref={scrollContainerRef}
      >
        {children}
      </div>
      <div className="absolute -right-2 z-10 flex h-full items-center rounded-lg bg-gradient-to-l from-backgroundColor via-backgroundColor to-transparent px-2 pl-10">
        {canScrollRight && (
          <ChevronRight
            size={30}
            onClick={scrollRight}
            className="hidden cursor-pointer text-white md:block"
          />
        )}
      </div>
    </div>
  );
};

export default HorizontalScrollBar;
