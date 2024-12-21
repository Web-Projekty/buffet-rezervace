import { MenuItem } from "../../types";
import { formatCurrency } from "../utils/utils";

type OrderItemsProps = {
  items: MenuItem[] | string;
};

const OrderItems = ({ items }: OrderItemsProps) => {
  return (
    <div className="flex flex-col">
      {/* {items.map((item) => (
        <li
          key={item.id}
          className="flex w-[240px] flex-row items-center justify-center gap-2"
        >
          <h3>{item.name}</h3>
          <div className="mt-3 flex-1 border-b-2 border-dotted border-white"></div>
          <p>{formatCurrency(item.price)}</p>
        </li>
      ))} */}
    </div>
  );
};

export default OrderItems;
