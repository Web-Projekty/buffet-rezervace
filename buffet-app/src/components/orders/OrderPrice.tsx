import { CartItem } from "../../store/CartStore";
import { MappedOrderItem } from "../../types";
import { formatCurrency, getVariantsPrice } from "../utils/utils";

type OrderPriceProps = {
  items: CartItem[] | MappedOrderItem[];
  isPaid?: boolean;
};

const OrderPrice = ({ items, isPaid }: OrderPriceProps) => {
  return (
    <div
      className={`flex w-full flex-row items-center ${isPaid ? "justify-center" : "justify-between"} gap-2 font-bold`}
    >
      {isPaid ? (
        <span>Zaplaceno</span>
      ) : (
        <>
          <span>Celkem</span>
          <p>
            {formatCurrency(
              items.reduce(
                (acc, item) =>
                  acc +
                  item.price! * item.quantity +
                  getVariantsPrice(
                    item.selectedVariants,
                    item.variants,
                    item.quantity,
                  ),
                0,
              ),
            )}
          </p>
        </>
      )}
    </div>
  );
};

export default OrderPrice;
