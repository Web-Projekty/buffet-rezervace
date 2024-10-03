import { useContext } from "react";
import { CartContext } from "../../store/CartContext";
import { formatCurrency } from "../../utils";
import { MenuItem } from "../../types";
import { motion } from "framer-motion";

const Cart = () => {
  const cartCtx = useContext(CartContext);

  const handleAddItem = (item: MenuItem) => {
    cartCtx.addToCart(item);
  };

  const handleRemoveItem = (id: number) => {
    cartCtx.removeFromCart(id);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0,
      }}
      className="fixed z-50 m-auto bg-black"
    >
      <h1>Your Cart</h1>
      <div className="grid grid-cols-3 gap-4">
        {cartCtx.cartItems.length === 0 && (
          <p className="text-white">Your cart is empty</p>
        )}
        {cartCtx.cartItems.map((item) => {
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
                  {formatCurrency(
                    item.price * cartCtx.getItemQuantity(item.id),
                  )}
                </p>
              </div>
              <div className="flex flex-row gap-2">
                <button onClick={() => handleRemoveItem(item.id)}>-</button>
                <span>{cartCtx.getItemQuantity(item.id)}</span>
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
    </motion.div>
  );
};

export default Cart;
