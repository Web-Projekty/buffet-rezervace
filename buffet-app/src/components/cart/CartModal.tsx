import { motion } from "framer-motion";
import { scaleUpAnimation } from "../../animations";
import { useContext } from "react";
import { CartContext } from "../../store/CartContext";
import { formatCurrency } from "../../utils";
import { MenuItem } from "../../types";

type CartModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartModal = ({ setIsOpen }: CartModalProps) => {
  const cartCtx = useContext(CartContext);

  const handleAddItem = (item: MenuItem) => {
    cartCtx.addToCart(item);
  };

  const handleRemoveItem = (id: number) => {
    cartCtx.removeFromCart(id);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed left-[50%] top-[50%] z-50 h-screen w-screen -translate-x-1/2 -translate-y-1/2 transform bg-transparentBlack"
      >
        <div className="fixed left-[50%] top-[50%] z-50 -translate-x-1/2 -translate-y-1/2 transform text-white">
          <motion.div
            {...scaleUpAnimation}
            className="flex h-[300px] flex-col items-center justify-between rounded-lg bg-slate-800 p-5"
          >
            <h1>Your Cart</h1>
            <div className="grid w-full grid-cols-3 gap-5">
              {cartCtx.cartItems.length === 0 && (
                <p className="text-white">Your cart is empty</p>
              )}
              {cartCtx.cartItems.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex w-full flex-row items-center justify-between gap-2 rounded-lg bg-white p-4 text-black shadow-md"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-fit h-20 w-20 rounded-md"
                    />
                    <div className="flex w-full flex-col justify-center">
                      <h1 className="text-xl font-bold">{item.name}</h1>

                      <p className="font-bold text-gray-700">
                        {formatCurrency(
                          item.price * cartCtx.getItemQuantity(item.id),
                        )}
                      </p>

                      <div className="flex w-full flex-row items-center gap-2 text-black">
                        <button onClick={() => handleRemoveItem(item.id)}>
                          -
                        </button>
                        <span>{cartCtx.getItemQuantity(item.id)}</span>
                        <button onClick={() => handleAddItem(item)}>+</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-row items-center justify-center gap-5">
              <button onClick={handleClose}>Close</button>
              <button>Continue</button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default CartModal;
