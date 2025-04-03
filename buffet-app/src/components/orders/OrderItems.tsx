import { MappedOrderItem } from "../../types/types";
import OrderPrice from "./OrderPrice";
import OrderItem from "./OrderItem";
import { twMerge } from "tailwind-merge";

type OrderItemsProps = {
  mappedItems: MappedOrderItem[];
  className?: string;
  isPaid?: boolean;
};

const OrderItems = ({ mappedItems, className, isPaid }: OrderItemsProps) => {
  return (
    <div className={twMerge("flex flex-col gap-2", className)}>
      <ul className="flex flex-col">
        {mappedItems.map((item) => {
          return <OrderItem key={item.id} item={item} />;
        })}
      </ul>
      <hr className="w-full" />
      <OrderPrice items={mappedItems} isPaid={isPaid} />
    </div>
  );
};

export default OrderItems;
