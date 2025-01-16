import { useOrder } from "../../hooks/useOrder";
import { Order, OrderItem, OrderStatus } from "../../types";
import Button from "../ui/Button";
import { ChevronLeft } from "lucide-react";

type KdsDeliveryOrderProps = {
  order: Order;
  onStatusChange: (id: number, newStatus: OrderStatus) => void;
  items: OrderItem[];
};

const KdsDeliveryOrder = ({
  order,
  onStatusChange,
  items,
}: KdsDeliveryOrderProps) => {
  const { isOpen, toggleOpen, color, mappedItems } = useOrder(
    order,
    true,
    items,
  );

  const handleDoneOrder = () => {
    onStatusChange(order.id, "done");
  };

  const handleCancelOrder = () => {
    onStatusChange(order.id, "cancelled");
  };

  return (
    <div className="relative flex h-auto w-full flex-col bg-white sm:w-[10rem] md:w-[18rem]">
      <div className={`absolute h-[52px] w-2 ${color}`}></div>
      <div className="flex w-full items-center justify-between bg-white px-4 py-3 text-xl font-bold">
        <div className="flex flex-row items-center gap-5">
          {order && `#${order.pickUpId}`}
          {!isOpen && (
            <div className="flex flex-row gap-1 text-base font-normal">
              {mappedItems.map((item) => (
                <p key={item.id}>{item.id}</p>
              ))}
            </div>
          )}
        </div>

        <button onClick={toggleOpen}>
          <ChevronLeft size={24} className={`${isOpen && "-rotate-90"}`} />
        </button>
      </div>
      {isOpen && (
        <div className="px-4 py-2">
          <div className="m-2 flex-grow">
            {mappedItems.map((item, index) => (
              <p key={index}>{item.name}</p>
            ))}
          </div>
          <div className="flex w-full justify-center gap-2">
            <Button
              className="w-full rounded-none border-0 bg-red-400"
              onClick={handleCancelOrder}
            >
              Zrušit
            </Button>
            <Button
              className="w-full rounded-none border-0 bg-primary"
              onClick={handleDoneOrder}
            >
              Vyzvednuto
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KdsDeliveryOrder;
