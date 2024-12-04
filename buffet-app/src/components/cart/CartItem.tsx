import useCart from "../../store/CartStore";
import { MenuItem } from "../../types";
import { formatCurrency } from "../utils/utils";

type CartItemProps = {
  item: MenuItem;
};

const CartItem = ({ item }: CartItemProps) => {
  const { getItemQuantity, removeFromCart, addToCart } = useCart();

  const handleAddItem = (item: MenuItem) => {
    addToCart(item);
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };
  return (
    <div
      key={item.id}
      className="flex h-[90px] w-[300px] flex-row items-center justify-between rounded-lg bg-slate-900 p-4 text-white shadow-md"
    >
      <div className="flex flex-row gap-2">
        <img
          src={item.image}
          alt={item.name}
          className="h-16 w-16 rounded-md object-cover"
        />
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">{item.name}</h1>

          <p className="font-bold text-gray-200">
            {formatCurrency(item.price * getItemQuantity(item.id))}
          </p>
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <button onClick={() => handleRemoveItem(item.id)}>-</button>
        <span>{getItemQuantity(item.id)}</span>
        <button onClick={() => handleAddItem(item)}>+</button>
      </div>
    </div>
  );
};

export default CartItem;
