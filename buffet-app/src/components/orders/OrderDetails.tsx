import { UseStatusOrderReturn } from "../../hooks/useOrder";
import { CartItem } from "../../store/CartStore";
import { OrderStatus, PaymentMethod } from "../../types";
import OrderButtons from "./OrderButtons";
import OrderItems from "./OrderItems";

type OrderDetailsProps = {
  items: CartItem[];
  dateCreated: string;
  status: OrderStatus;
  orderId: number;
  paymentMethod: PaymentMethod["name"];
  handleStatus: UseStatusOrderReturn["handleStatus"];
};

const OrderDetails = ({
  items,
  dateCreated,
  status,
  orderId,
  paymentMethod,
  handleStatus,
}: OrderDetailsProps) => {
  return (
    <div
      className={`mt-5 grid grid-cols-1 justify-center gap-5 overflow-hidden px-4 md:grid-cols-2 md:justify-between md:gap-0`}
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
              <span className="font-semibold">Platba:</span> {paymentMethod}
            </p>
          </div>
        </div>

        <OrderButtons
          status={status}
          orderId={orderId}
          handleStatus={handleStatus}
        />
      </div>
    </div>
  );
};

export default OrderDetails;
