import { CartItem } from "../../store/CartStore";
import { OrderStatus } from "../../types";
import OrderButtons from "./OrderButtons";
import OrderItems from "./OrderItems";

type OrderDetailsProps = {
  items: CartItem[];
  dateCreated: string;
  status: OrderStatus;
  orderId: number;
};

const OrderDetails = ({
  items,
  dateCreated,
  status,
  orderId,
}: OrderDetailsProps) => {
  return (
    <div
      className={`mt-5 grid grid-cols-2 justify-between overflow-hidden px-4`}
    >
      <div>
        <p className="font-semibold">Objednané položky:</p>
        <OrderItems items={items} />
      </div>

      <div className="flex flex-col justify-between gap-2">
        <div className="flex flex-col">
          <p>
            <span className="font-semibold">Vytvořeno:</span> {dateCreated}
          </p>
          <div>
            <p>
              <span className="font-semibold">Platba:</span>
            </p>
          </div>
        </div>

        <OrderButtons status={status} orderId={orderId} />
      </div>
    </div>
  );
};

export default OrderDetails;
