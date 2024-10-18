import { formatCurrency } from "../../utils";
import { MenuItem } from "../../types";
import useCart from "../../store/CartStore";

const Cart = () => {
  const { cartItems, getItemQuantity, removeFromCart, addToCart } = useCart();

  const handleAddItem = (item: MenuItem) => {
    addToCart(item);
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };

  return (
    <div className="mb-[3rem] mt-[10rem] flex flex-col items-center justify-center">
      <h1>Your Cart</h1>
      <div className="grid grid-cols-3 gap-4">
        {cartItems.length === 0 && (
          <p className="text-white">Your cart is empty</p>
        )}
        {cartItems.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-row items-center justify-between rounded-lg bg-white p-4 shadow-md"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-12 w-12 rounded-md"
              />
              <div className="flex flex-col">
                <h1 className="text-xl font-bold">{item.name}</h1>

                <p className="font-bold text-gray-700">
                  {formatCurrency(item.price * getItemQuantity(item.id))}
                </p>
              </div>
              <div className="flex flex-row gap-2">
                <button onClick={() => handleRemoveItem(item.id)}>-</button>
                <span>{getItemQuantity(item.id)}</span>
                <button onClick={() => handleAddItem(item)}>+</button>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <button>Close</button>
        <button>Continue</button>
      </div>
    </div>
  );
};

export default Cart;
