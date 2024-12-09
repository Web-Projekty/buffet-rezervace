import { Order } from "../../types";
import Button from "../Button";
import { useOrder } from "../../hooks/useOrder";

type KdsOrderProps = {
  order: Order;
};

const KdsOrder = ({ order }: KdsOrderProps) => {
  const { color } = useOrder(order);

  return (
    <div className="flex h-auto w-full flex-col bg-white sm:w-[15rem] md:w-[302px]">
      <div className={`w-full ${color} px-4 py-3 text-xl font-bold`}>
        {order && `#${order.id}`}
      </div>
      <div className="w-full px-4 py-2">
        <div className="m-2 flex-grow">{order.items}</div>
        <Button className="mt-auto w-full rounded-none border-0 bg-primary">
          Hotovo
        </Button>
      </div>
    </div>
  );
};

export default KdsOrder;
