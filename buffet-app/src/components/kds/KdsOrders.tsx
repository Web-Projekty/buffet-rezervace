import Button from "../Button";
import KdsOrder from "./KdsOrder";

const KdsOrders = () => {
  return (
    <div className="mx-auto flex w-[80%] flex-col justify-center">
      {/* KDS Orders Status */}
      <div className="mx-1 my-2 flex h-[5rem] w-full items-center justify-between bg-white px-10">
        <div className="flex flex-row items-center gap-10">
          <div className="flex flex-row items-center gap-5 bg-red-400 px-5 py-3 text-white">
            <span className="text-2xl font-bold">1</span>
            <h2>Zpožděné</h2>
          </div>
          <div className="flex flex-row items-center gap-5 bg-orange-400 px-5 py-3 text-white">
            <span className="text-2xl font-bold">3</span>
            <h2>Aktuální</h2>
          </div>
          <div className="flex flex-row items-center gap-5 bg-yellow-500 px-5 py-3 text-white">
            <span className="text-2xl font-bold">2</span>
            <h2>Následující</h2>
          </div>
        </div>
        <div className="flex flex-row items-center gap-5 bg-green-400 px-5 py-3 text-white">
          <span className="text-2xl font-bold">4</span>
          <h2>Výdej</h2>
        </div>
      </div>

      {/* KDS Orders */}
      <div className="flex flex-row justify-between">
        <div className="grid grid-cols-4 grid-rows-2 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <KdsOrder key={index} />
          ))}
        </div>
        <div className="flex flex-col">
          <div className="h-[10rem] bg-white p-4">
            <div className="text-xl font-bold">Table {1}</div>
            <div className="text-sm">Order 1</div>
            <div className="text-sm">Order 2</div>
            <div className="text-sm">Order 3</div>
            <div className="flex">
              <Button className="bottom-0 m-2 mt-auto rounded-none border-0 bg-green-400">
                Vyzvednuto
              </Button>
              <Button className="bottom-0 m-2 mt-auto rounded-none border-0 bg-red-400">
                Zrušit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KdsOrders;
