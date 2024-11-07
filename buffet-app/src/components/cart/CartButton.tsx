import { motion } from "framer-motion";
import useCart from "../../store/CartStore";
import { ShoppingCartIcon } from "lucide-react";

const CartButton = () => {
  const { getCartQuantity, handleOpenCart, isOpen } = useCart();

  return (
    <div
      className={`relative rounded-full p-2 hover:cursor-pointer ${isOpen ? "bg-white" : ""}`}
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
      <ShoppingCartIcon size={36} />
    </div>
  );
};

export default CartButton;
