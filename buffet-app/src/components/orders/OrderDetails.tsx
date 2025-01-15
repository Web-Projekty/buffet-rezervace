import { useOrder } from "../../hooks/useOrder";
import { Order } from "../../types";
import OrderButton from "./OrderButton";
import OrderItems from "./OrderItems";
import { OrderItems as OrderItemsType } from "../../types";

type OrderDetailsProps = {
  order: Order;
  items: OrderItemsType[];
};

const OrderDetails = ({ order, items }: OrderDetailsProps) => {
  const { dateCreated } = useOrder(order);
  return (
    <div
      className={`mt-5 grid grid-cols-1 justify-center gap-5 overflow-hidden px-4 md:grid-cols-2 md:justify-between md:gap-0`}
    >
      <div>
        <p className="font-semibold">Objednané položky:</p>
        <OrderItems orderItems={order.items} items={items} />
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
