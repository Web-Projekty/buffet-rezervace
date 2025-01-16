import { MappedOrderItem } from "../../types";
import { formatCurrency } from "../utils/utils";

type OrderItemsProps = {
  mappedItems: MappedOrderItem[];
};

type OrderItemProps = {
  item: MappedOrderItem;
};

const OrderItem = ({ item }: OrderItemProps) => {
  return (
    <li className="flex w-full flex-row justify-between gap-2">
      <div className="flex flex-row items-center gap-2">
        <p className="text-descriptionColor">{item.count}x</p>
        <h3>{item.name ? item.name : "Item name"}</h3>
      </div>
      <p className="italic">
        {item.price ? formatCurrency(item.price) : formatCurrency(-1)}
      </p>
    </li>
  );
};

const OrderItems = ({ mappedItems }: OrderItemsProps) => {
  return (
    <div className="flex flex-col gap-2">
      <ul className="flex flex-col">
        {mappedItems.map((item) => {
          return <OrderItem key={item.id} item={item} />;
        })}
      </ul>
      <hr className="w-full" />
      <div className="flex w-full flex-row items-center justify-between gap-2">
        <h3>Celkem</h3>
        <p className="italic">
          {formatCurrency(
            mappedItems.reduce(
              (acc, item) => acc + item.price! * item.count,
              0,
            ),
          )}
        </p>
      </div>
    </div>
  );
};

export default OrderItems;
