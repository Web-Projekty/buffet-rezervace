import { CartItem } from "../../../store/CartStore";
import { formatCurrency } from "../../utils/utils";

type CartPurchaseItemsProps = {
  cartItems: CartItem[];
};

const CartPurchaseItems = ({ cartItems }: CartPurchaseItemsProps) => {
  return (
    <div className="flex flex-col gap-2 rounded-lg p-5">
      {cartItems &&
        cartItems.map(({ name, variants, price, quantity }) => {
          return (
            <div key={name} className="flex flex-col gap-1">
              <div className="flex flex-row items-center justify-between">
                <h3>
                  {name} <span>x {quantity}</span>
                </h3>
                <p className="italic">{formatCurrency(quantity * price)}</p>
              </div>

              <div>
                {variants &&
                  variants.map((variant) => {
                    return (
                      <div className="flex flex-row items-center justify-between">
                        <p>{variant.name}</p>
                        <p className="italic">+{variant.price}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      <hr />
      <div className="flex flex-row items-center justify-between font-bold">
        <h3>Celkem</h3>
        <p className="italic">
          {formatCurrency(
            cartItems.reduce(
              (acc, { price, quantity }) => acc + price * quantity,
              0,
            ),
          )}
        </p>
      </div>
    </div>
  );
};

export default CartPurchaseItems;
