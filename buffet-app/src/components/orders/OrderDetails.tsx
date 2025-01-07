import { lazy } from "react";
import { CartItem } from "../../store/CartStore";

const OrderItems = lazy(() => import("./OrderItems"));

type OrderDetailsProps = {
  items: CartItem[];
  dateCreated: string;
};

const OrderDetails = ({ items, dateCreated }: OrderDetailsProps) => {
  return (
    <div
      className={`mt-5 grid grid-cols-2 justify-between overflow-hidden px-4`}
    >
      <div>
        <p className="font-semibold">Objednané položky:</p>

        <OrderItems items={items} />
      </div>

      <div className="">
        <p>
          <span className="font-semibold">Vytvořeno:</span> {dateCreated}
        </p>
        <div>
          <p>
            <span className="font-semibold">Platba:</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
