import { useOrder } from "../../hooks/useOrder";
import { useUser } from "../../hooks/useUser";
import { Order, OrderItem } from "../../types/types";
import OrderItems from "../orders/OrderItems";
import Button from "../ui/Button";
import { ChevronLeft } from "lucide-react";

type KdsDeliveryOrderProps = {
  order: Order;
  items: OrderItem[];
};

const KdsDeliveryOrder = ({ order, items }: KdsDeliveryOrderProps) => {
  const { token } = useUser();
  const { isOpen, toggleOpen, color, mappedItems, handleStatus } = useOrder(
    order,
    true,
    items,
  );

  const handleDoneOrder = () => {
    handleStatus("done", token);
  };

  const handleCancelOrder = () => {
    handleStatus("cancelled", token);
  };

  return (
    <article className="relative flex h-auto w-full max-w-[18rem] flex-col bg-white">
      <div className={`absolute h-[52px] w-2 ${color}`}></div>
      <div className="flex w-full items-center justify-between bg-white px-4 py-3 text-xl font-bold">
        <div className="flex flex-row items-center gap-5">
          {order && `${order.pickUpId}`}
          {!isOpen && (
            <div className="w-[10rem] overflow-hidden">
              <p className="overflow-hidden text-ellipsis whitespace-nowrap text-nowrap text-base font-normal">
                {mappedItems.map((item) => item.name).join(", ")}
              </p>
            </div>
          )}
        </div>

        <button onClick={toggleOpen}>
          <ChevronLeft size={24} className={`${isOpen && "-rotate-90"}`} />
        </button>
      </div>
      {isOpen && (
        <div className="px-4 py-2">
          <div className="my-2 w-full">
            <OrderItems mappedItems={mappedItems} />
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
    </article>
  );
};

export default KdsDeliveryOrder;
