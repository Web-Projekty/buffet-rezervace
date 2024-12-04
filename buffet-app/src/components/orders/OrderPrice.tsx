import { MenuItem } from "../../types";
import { formatCurrency } from "../utils/utils";

type OrderPriceProps = {
  items: MenuItem[] | string;
};

const OrderPrice = ({ items }: OrderPriceProps) => {
  return (
    <div className="flex w-[240px] flex-row items-center justify-center gap-2 font-bold">
      <span>Celkem</span>
      <div className="mt-3 flex-1 border-b-2 border-dotted border-white"></div>
      <p>
        {/* {formatCurrency(
          items.reduce((acc: number, item: MenuItem) => acc + item.price, 0),
        )} */}
      </p>
    </div>
  );
};

export default OrderPrice;
