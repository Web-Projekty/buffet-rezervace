import { AnimatePresence, motion } from "framer-motion";
import { scaleUpAnimation } from "../../animations";
import { formatCurrency } from "../../utils";
import { MenuItem } from "../../types";
import { useNavigate } from "react-router-dom";
import useCart from "../../store/CartZustand";

const CartModal = () => {
  const {
    isOpen,
    handleOpenCart,
    cartItems,
    addToCart,
    removeFromCart,
    getCartQuantity,
    getItemQuantity,
  } = useCart();
  const navigate = useNavigate();

  const handleAddItem = (item: MenuItem) => {
    addToCart(item);
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };

  const handleContinue = () => {
    handleOpenCart();
    navigate("/cart");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed left-[50%] top-[50%] z-50 h-screen w-screen -translate-x-1/2 -translate-y-1/2 transform bg-transparentBlack"
        >
          <div className="fixed left-[50%] top-[50%] z-50 -translate-x-1/2 -translate-y-1/2 transform">
            <motion.div
              {...scaleUpAnimation(0.3)}
              className="flex h-[500px] w-[800px] flex-col items-center justify-between rounded-lg bg-slate-800 shadow-md shadow-black"
            >
              <div className="flex h-10 w-full items-center justify-center rounded-t-lg bg-primary text-center text-xl text-black">
                <h1>Your Cart</h1>
              </div>

              <div className="flex w-full flex-col gap-5 overflow-hidden px-5">
                {cartItems.length === 0 && (
                  <p className="text-center text-white">Your cart is empty</p>
                )}
                {cartItems.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="flex w-full flex-row items-center justify-between gap-2 rounded-lg bg-white p-4 text-black shadow-md"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-md object-cover"
                      />
                      <div className="flex w-full flex-col justify-center">
                        <h1 className="text-xl font-bold">{item.name}</h1>

                        <p className="font-bold text-gray-700">
                          {formatCurrency(
                            item.price * getItemQuantity(item.id),
                          )}
                        </p>

                        <div className="flex w-full flex-row items-center gap-2 text-black">
                          <button onClick={() => handleRemoveItem(item.id)}>
                            -
                          </button>
                          <span>{getItemQuantity(item.id)}</span>
                          <button onClick={() => handleAddItem(item)}>+</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-row items-center justify-center gap-5 text-white">
                <button onClick={handleOpenCart}>Close</button>
                <button
                  disabled={getCartQuantity() === 0}
                  onClick={handleContinue}
                >
                  Continue
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
