import { Order, OrderItem } from "../../types";
import Button from "../ui/Button";
import { useOrder } from "../../hooks/useOrder";
import OrderItems from "../orders/OrderItems";
import { useUser } from "../../hooks/useUser";

type KdsOrderProps = {
  order: Order;
  onStatusChange: (order: Order) => void;
  items: OrderItem[];
};

const KdsOrder = ({ order, onStatusChange, items }: KdsOrderProps) => {
  const { token } = useUser();
  const {
    color,
    status,
    mappedItems,
    pickUpDate,
    startTime,
    endTime,
    handleStatus,
  } = useOrder(order, true, items);

  const handleDoneOrder = () => {
    handleStatus("waiting", token).then(() =>
      onStatusChange({ ...order, status: "waiting" }),
    );
  };

  const handlePrepareOrder = () => {
    handleStatus("preparing", token).then(() =>
      onStatusChange({ ...order, status: "preparing" }),
    );
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
    <div className="flex h-auto w-full flex-col justify-between bg-white sm:w-[15rem] md:w-[302px]">
      <div className="flex w-full flex-col gap-2">
        <div
          className={`flex w-full flex-row items-center justify-between ${color} px-4 py-3 text-xl font-bold`}
        >
          <p>{order && `#${order.pickUpId}`}</p>
          <p className="text-lg font-normal">
            {order && pickUpDate + " " + startTime + "-" + endTime}
          </p>
        </div>
        <div className="w-full px-4 py-2">
          <OrderItems mappedItems={mappedItems} />
        </div>
      </div>
      <div className="px-4 py-2">{renderButtons()}</div>
    </div>
  );
};

export default KdsOrder;
