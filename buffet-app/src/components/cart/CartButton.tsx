import { useContext } from "react";
import { PiShoppingCartSimple } from "react-icons/pi";
import { CartContext } from "../../store/CartContext";
import { motion } from "framer-motion";
import { scaleUp } from "../../animations";

const CartButton = () => {
  const { getCartQuantity } = useContext(CartContext);

  const handleOpenCart = () => {
    console.log("Opening cart...");
  };
  return (
    <div
      className="relative rounded-full bg-white p-2 hover:cursor-pointer"
      onClick={handleOpenCart}
    >
      <motion.span
        key={getCartQuantity()}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className="absolute -right-3 -top-3 rounded-full bg-red-400 px-2 py-1 text-white"
      >
        {getCartQuantity()}
      </motion.span>
      <PiShoppingCartSimple size={36} />
    </div>
  );
};

export default CartButton;
