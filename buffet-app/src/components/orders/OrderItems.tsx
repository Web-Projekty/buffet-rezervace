import { CartItem } from "../../store/CartStore";
import { formatCurrency } from "../utils/utils";

type OrderItemsProps = {
  items: CartItem[];
};

type OrderItemProps = {
  item: CartItem;
};

const OrderItem = ({ item }: OrderItemProps) => {
  return (
    <li className="flex w-full flex-row items-center justify-center gap-2 md:w-[240px]">
      <h3>{item.name ? item.name : "Item name"}</h3>
      <div className="mt-3 flex-1 border-b-2 border-dotted border-white"></div>
      <p>{item.price ? formatCurrency(item.price) : formatCurrency(-1)}</p>
    </li>
  );
};

const OrderItems = ({ items }: OrderItemsProps) => {
  return (
    <div className="flex flex-col gap-1">
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <OrderItem key={item.id} item={item} />
        ))}
      </ul>
      <hr className="w-full md:w-[240px]" />
      <div className="flex w-full flex-row items-center justify-between gap-2 md:w-[240px]">
        <h3>Celkem</h3>
        <p>60 Kč</p>
      </div>
    </div>
  );
};

export default OrderItems;
