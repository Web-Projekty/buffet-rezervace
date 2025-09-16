import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import DateComponent from "../ui/DateComponent";
import TimeComponent from "../ui/TimeComponent";
import { ChevronLeft } from "lucide-react";
import { Maximize2, Minimize2 } from "lucide-react"; // optional icons

const KdsHeader = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((err) =>
          console.error("Error attempting to enable fullscreen mode:", err)
        );
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch((err) =>
          console.error("Error attempting to exit fullscreen mode:", err)
        );
    }
  };

  return (
    <header
      ref={headerRef}
      className={`z-50 flex h-20 w-full flex-row items-center justify-between overflow-hidden bg-primary px-10 text-xl text-black shadow-lg shadow-black md:px-32`}
    >
      <div className="flex flex-row items-center gap-8">
        <Link to="/">
          <ChevronLeft size={32} />
        </Link>
        <h1 className="text-3xl">Buffet KDS</h1>
      </div>

      <div className="flex items-center justify-center gap-8 text-2xl">
        <DateComponent />
        <TimeComponent />
        <button
          onClick={toggleFullscreen}
          className="text-black hover:text-white transition-colors duration-200"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
        </button>
      </div>
    </header>
  );
};

export default KdsHeader;
