import { twMerge } from "tailwind-merge";
import { MappedOrderItem } from "../../types";
import { formatCurrency } from "../utils/utils";

type OrderItemProps = {
  item: MappedOrderItem;
  className?: string;
};

const OrderItem = ({ item, className }: OrderItemProps) => {
  return (
    <li
      className={twMerge(
        "flex w-full flex-row justify-between gap-2",
        className,
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <p className="text-descriptionColor">{item.quantity}x</p>
        <h3>{item.name ? item.name : "Item name"}</h3>
      </div>
      <p className="italic">
        {item.price
          ? formatCurrency(item.price * item.quantity)
          : formatCurrency(-1)}
      </p>
    </li>
  );
};

export default OrderItem;
