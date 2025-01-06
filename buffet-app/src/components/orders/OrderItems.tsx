import { CartItem } from "../../store/CartStore";
import { MenuItem } from "../../types";
import { formatCurrency } from "../utils/utils";

type OrderItemsProps = {
  items: CartItem[] | string;
};

const OrderItems = ({ items }: OrderItemsProps) => {
  return (
    <div className="flex flex-col gap-1">
      <ul className="flex flex-col gap-2">
        <li className="flex w-[240px] flex-row items-center justify-center gap-2">
          <h3>Polévka</h3>
          <div className="mt-3 flex-1 border-b-2 border-dotted border-white"></div>
          <p>20 Kč</p>
        </li>
        <li className="flex w-[240px] flex-row items-center justify-center gap-2">
          <h3>Polévka</h3>
          <div className="mt-3 flex-1 border-b-2 border-dotted border-white"></div>
          <p>20 Kč</p>
        </li>
        <li className="flex w-[240px] flex-row items-center justify-center gap-2">
          <h3>Polévka</h3>
          <div className="mt-3 flex-1 border-b-2 border-dotted border-white"></div>
          <p>20 Kč</p>
        </li>
      </ul>
      <hr className="w-[240px]" />
      <div className="flex w-[240px] flex-row items-center justify-between gap-2">
        <h3>Celkem</h3>
        <p>60 Kč</p>
      </div>
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
