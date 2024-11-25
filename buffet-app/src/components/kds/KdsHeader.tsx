import DateComponent from "../DateComponent";
import TimeComponent from "../TimeComponent";
import KdsNavbar from "./KdsNavbar";

const KdsHeader = () => {
  return (
    <header
      className={`z-50 flex h-20 w-full flex-row items-center justify-between overflow-hidden bg-primary px-10 text-xl text-black shadow-lg shadow-black md:px-32`}
    >
      <h1 className="w-full text-3xl">Buffet KDS</h1>
      <KdsNavbar />
      <div className="mr-[-10rem] flex w-full items-center justify-center gap-8">
        <DateComponent />
        <TimeComponent />
      </div>
    </header>
  );
};

export default KdsHeader;
