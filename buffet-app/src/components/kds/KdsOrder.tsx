import { Order, OrderItem, OrderStatus } from "../../types";
import Button from "../ui/Button";
import { useOrder } from "../../hooks/useOrder";

type KdsOrderProps = {
  order: Order;
  onStatusChange: (id: number, newStatus: OrderStatus) => void;
  items: OrderItem[];
};

const KdsOrder = ({ order, onStatusChange, items }: KdsOrderProps) => {
  const { color, status, mappedItems } = useOrder(order, true, items);

  const handleDoneOrder = () => {
    onStatusChange(order.id, "waiting");
  };

  const handlePrepareOrder = () => {
    onStatusChange(order.id, "preparing");
  };

  const renderButtons = () => {
    if (status === "preparing") {
      return (
        <Button
          onClick={handleDoneOrder}
          className="w-full rounded-none border-0 bg-primary"
        >
          Připraveno
        </Button>
      );
    }

    return (
      <Button
        onClick={handlePrepareOrder}
        className="w-full rounded-none border-0 bg-primary"
      >
        Začít přípravu
      </Button>
    );
  };

  return (
    <div className="flex h-auto w-full flex-col bg-white sm:w-[15rem] md:w-[302px]">
      <div className={`w-full ${color} px-4 py-3 text-xl font-bold`}>
        {order && `#${order.pickUpId}`}
      </div>
      <div className="w-full px-4 py-2">
        <ul className="m-2 flex-grow">
          <div className="flex flex-row gap-1 text-base font-normal">
            {mappedItems.map((item) => (
              <p key={item.id}>{item.name}</p>
            ))}
          </div>
        </ul>
        {renderButtons()}
      </div>
    </div>
  );
};

export default KdsOrder;
