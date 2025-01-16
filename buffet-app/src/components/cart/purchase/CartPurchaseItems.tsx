import { CartItem } from "../../../store/CartStore";
import OrderPrice from "../../orders/OrderPrice";

import CartPurchaseItem from "./CartPurchaseItem";

type CartPurchaseItemsProps = {
  cartItems: CartItem[];
};

const CartPurchaseItems = ({ cartItems }: CartPurchaseItemsProps) => {
  return (
    <div className="flex flex-col rounded-lg p-5">
      {cartItems &&
        cartItems.map((item) => {
          return <CartPurchaseItem cartItem={item} />;
        })}
      <hr />
      <OrderPrice items={cartItems} />
    </div>
  );
};

export default CartPurchaseItems;
