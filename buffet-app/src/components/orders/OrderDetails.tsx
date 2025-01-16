import { useOrder } from "../../hooks/useOrder";
import { Order, OrderItem } from "../../types";
import OrderButton from "./OrderButton";
import OrderItems from "./OrderItems";
import { mapItemsWithOrders } from "../utils/utils";
import { useMemo } from "react";

type OrderDetailsProps = {
  order: Order;
  items: OrderItem[];
};

const OrderDetails = ({ order, items }: OrderDetailsProps) => {
  const { dateCreated } = useOrder(order);
  const mappedItems = useMemo(
    () => mapItemsWithOrders(order.items, items),
    [order.items, items],
  );
  return (
    <div
      className={`mt-5 grid grid-cols-1 justify-center gap-5 overflow-hidden px-4 md:grid-cols-2 md:justify-between md:gap-0`}
    >
      <div className="flex max-w-[300px] flex-col gap-2">
        <p className="font-semibold">Objednané položky:</p>
        <OrderItems mappedItems={mappedItems} />
      </div>

      <div className="flex flex-col justify-between gap-2">
        <div className="flex flex-col">
          <p>
            <span className="font-semibold">Vytvořeno:</span> {dateCreated}
          </p>
          <div>
            <p>
              <span className="font-semibold">Platba:</span> {}
            </p>
          </div>
        </div>

        <OrderButton order={order} />
      </div>
    </div>
  );
};

export default OrderDetails;
