import { useOrder } from "../../hooks/useOrder";
import { useUser } from "../../hooks/useUser";
import { Order, OrderItem } from "../../types";
import Button from "../ui/Button";
import { ChevronLeft } from "lucide-react";

type KdsDeliveryOrderProps = {
  order: Order;
  onStatusChange: (order: Order) => void;
  items: OrderItem[];
};

const KdsDeliveryOrder = ({
  order,
  onStatusChange,
  items,
}: KdsDeliveryOrderProps) => {
  const { token } = useUser();
  const { isOpen, toggleOpen, color, mappedItems, handleStatus } = useOrder(
    order,
    true,
    items,
  );

  const handleDoneOrder = () => {
    handleStatus("done", token);
    onStatusChange({ ...order, status: "done" });
  };

  const handleCancelOrder = () => {
    handleStatus("cancelled", token);
    onStatusChange({ ...order, status: "cancelled" });
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
