import { lazy, Suspense } from "react";
import { CartItem } from "../../store/CartStore";
import { Fallback } from "../../main";

const OrderItems = lazy(() => import("./OrderItems"));

type OrderDetailsProps = {
  isOpen: boolean;
  items: CartItem[];
  dateCreated: string;
};

const OrderDetails = ({ isOpen, items, dateCreated }: OrderDetailsProps) => {
  return (
    <div
      className={`mt-5 grid grid-cols-2 justify-between overflow-hidden px-4`}
    >
      <div>
        <p className="font-semibold">Objednané položky:</p>

        {isOpen && (
          <Suspense fallback={<Fallback />}>
            <OrderItems items={items} />
          </Suspense>
        )}
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
