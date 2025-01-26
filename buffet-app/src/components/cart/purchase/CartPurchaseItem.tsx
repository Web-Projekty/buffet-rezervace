import { CartItem } from "../../../store/CartStore";
import { formatCurrency } from "../../utils/utils";

type CartPurchaseItemProps = {
  cartItem: CartItem;
};

const CartPurchaseItem = ({ cartItem }: CartPurchaseItemProps) => {
  const { name, quantity, price } = cartItem;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row items-center justify-between">
        <h3>
          {name} <span>x {quantity}</span>
        </h3>
        <p className="italic">{formatCurrency(quantity * price)}</p>
      </div>

      {/* <div>
        {variants &&
          variants.map((variant) => {
            return (
              <div className="flex flex-row items-center justify-between">
                <p>{variant.name}</p>
                <p className="italic">+{variant.price}</p>
              </div>
            );
          })}
      </div> */}
    </div>
  );
};

export default CartPurchaseItem;
