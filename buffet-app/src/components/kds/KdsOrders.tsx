import { dummyOrders } from "../../dummyData";
import Button from "../Button";
import KdsOrder from "./KdsOrder";
import KdsStatusCards from "./KdsStatusCards";

const KdsOrders = () => {
  return (
    <div className="mx-auto flex w-[80%] flex-col justify-center">
      {/* KDS Orders Status */}
      <div className="mx-1 my-2 flex h-[5rem] w-full items-center justify-between bg-white px-10">
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
        <KdsStatusCards
          amount={6}
          title="Výdej"
          backgroundColor="bg-green-400"
        />
      </div>

      {/* KDS Orders */}
      <div className="flex flex-row justify-between">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dummyOrders.map((order, index) => (
            <KdsOrder key={index} order={order} />
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
