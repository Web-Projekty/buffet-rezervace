import { Order } from "../../types";
import Button from "../ui/Button";
import { useOrder } from "../../hooks/useOrder";

type KdsOrderProps = {
  order: Order;
  onStatusChange: (order: Order) => void;
};

const KdsOrder = ({ order, onStatusChange }: KdsOrderProps) => {
  const { color, status, handleStatus } = useOrder(order);

  const handlePrepareOrder = () => {
    handleStatus("preparing");
  };

  const handleDoneOrder = () => {
    const updatedOrder: Order = { ...order, status: "waiting" };
    handleStatus("waiting");
    onStatusChange(updatedOrder);
  };

  return (
    <div className="flex h-auto w-full flex-col bg-white sm:w-[15rem] md:w-[302px]">
      <div className={`w-full ${color} px-4 py-3 text-xl font-bold`}>
        {order && `#${order.pickUpId}`}
      </div>
      <div className="w-full px-4 py-2">
        <div className="m-2 flex-grow">{order.items}</div>
        {status === "preparing" ? (
          <div>
            <Button
              onClick={handleDoneOrder}
              className="w-full rounded-none border-0 bg-primary"
            >
              Připraveno
            </Button>
          </div>
        ) : (
          <Button
            onClick={handlePrepareOrder}
            className="mt-auto w-full rounded-none border-0 bg-primary"
          >
            Hotovo
          </Button>
        )}
      </div>
    </div>
  );
};

export default KdsOrder;
