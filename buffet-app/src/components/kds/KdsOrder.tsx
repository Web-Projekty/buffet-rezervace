import { Order } from "../../types";
import Button from "../Button";

type KdsOrderProps = {
  order: Order | null;
};

const KdsOrder = ({ order }: KdsOrderProps) => {
  return (
    <div className="m-2 flex h-auto w-full flex-col bg-white p-4 sm:w-[15rem] md:w-[20rem]">
      <div className="w-full bg-orange-400 px-4 py-3 text-xl font-bold">
        {order && `#${order.id}`}
      </div>
      <div className="m-2 flex-grow">
        {order?.items.map((item, index) => (
          <div key={index} className="flex flex-row justify-between">
            <div>{item.name}</div>
          </div>
        ))}
      </div>
      <Button className="mt-auto rounded-none border-0 bg-green-400">
        Hotovo
      </Button>
    </div>
  );
};

export default KdsOrder;
