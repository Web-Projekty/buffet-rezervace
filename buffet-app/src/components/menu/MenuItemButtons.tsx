import { AnimatePresence, motion } from "framer-motion";
import { MinusCircle, PlusCircle } from "lucide-react";
import { scaleUpAnimation, tapScaleAnimation } from "../../animations";
import useCart from "../../store/CartStore";
import { MenuItem } from "../../types";

type MenuItemButtonsProps = {
  item: MenuItem;
};

const quantChangeAnimation = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 10, opacity: 0 },
  transition: { duration: 0.2 },
};

const MenuItemButtons = ({ item }: MenuItemButtonsProps) => {
  const {
    getItemQuantity,
    addToCart,
    removeFromCart,
    isItemMaxQuantity,
    isCartFull,
  } = useCart();

  const { id } = item;

  const handleAddToCart = () => {
    addToCart(item);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(item.id);
  };

  return (
    <AnimatePresence>
      <div className="flex flex-row items-center justify-center">
        {
          <motion.div
            key="remove-from-cart"
            {...scaleUpAnimation}
            className="flex transform flex-row items-center"
          >
            <motion.div {...tapScaleAnimation}>
              <MinusCircle
                key={"remove-from-cart"}
                size={48}
                className="cursor-pointer p-2"
                onClick={handleRemoveFromCart}
              />
            </motion.div>

            <motion.span
              key={getItemQuantity(id)}
              {...quantChangeAnimation}
              className={`rounded-lg px-2 text-lg ${isItemMaxQuantity(id) || isCartFull() ? "bg-red-400" : "bg-slate-800"}`}
            >
              {getItemQuantity(id)}
            </motion.span>

            <motion.div {...tapScaleAnimation}>
              <PlusCircle
                key={"add-to-cart"}
                size={48}
                className={`p-2 ${isItemMaxQuantity(id) || isCartFull() ? "cursor-not-allowed text-gray-400" : "cursor-pointer"} transition-colors duration-500`}
                onClick={handleAddToCart}
              />
            </motion.div>
          </motion.div>
        }
      </div>
    </AnimatePresence>
  );
};

export default MenuItemButtons;
