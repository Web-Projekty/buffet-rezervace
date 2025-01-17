import { Link } from "react-router-dom";
import DateComponent from "../ui/DateComponent";
import TimeComponent from "../ui/TimeComponent";
import { ChevronLeft } from "lucide-react";

const KdsHeader = () => {
  return (
    <header
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
      </div>
    </header>
  );
};

export default KdsHeader;
