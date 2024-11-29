import KdsStatusCards from "./KdsStatusCards";

const KdsStatusBar = () => {
  return (
    <div className="my-2 flex h-[5rem] w-full items-center justify-between bg-white px-10">
      <div className="flex flex-row items-center gap-10">
        <KdsStatusCards
          amount={1}
          title="Zpožděné"
          backgroundColor="bg-red-400"
        />
        <KdsStatusCards
          amount={3}
          title="Aktuální"
          backgroundColor="bg-orange-400"
        />
        <KdsStatusCards
          amount={2}
          title="Nadcházející"
          backgroundColor="bg-yellow-400"
        />
      </div>
      <KdsStatusCards amount={6} title="Výdej" backgroundColor="bg-green-400" />
    </div>
  );
};

export default KdsStatusBar;
