import KdsStatusCards from "./KdsStatusCards";

type KdsStatusProps = {
  delayed: number;
  uptodate: number;
  current: number;
  waiting: number;
};

const KdsStatusBar = ({
  delayed,
  uptodate,
  current,
  waiting,
}: KdsStatusProps) => {
  return (
    <div className="my-2 flex h-[5rem] w-full items-center justify-between bg-white px-10">
      <div className="flex flex-row items-center gap-10">
        <KdsStatusCards
          amount={delayed}
          title="Zpožděné"
          backgroundColor="bg-red-400"
        />
        <KdsStatusCards
          amount={uptodate}
          title="Aktuální"
          backgroundColor="bg-orange-400"
        />
        <KdsStatusCards
          amount={current}
          title="Nadcházející"
          backgroundColor="bg-yellow-400"
        />
      </div>
      <KdsStatusCards
        amount={waiting}
        title="Výdej"
        backgroundColor="bg-[#14ce9c]"
      />
    </div>
  );
};

export default KdsStatusBar;
