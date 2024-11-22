import { AnimatePresence, motion } from "framer-motion";
import { BadgeMinus, BadgePlus } from "lucide-react";
import { scaleUpAnimation, tapScaleAnimation } from "../../animations";

type MenuItemButtonsProps = {
  isItemInCart: (id: number) => boolean;
  id: number;
  getItemQuantity: (id: number) => number;
  handleAddToCart: () => void;
  handleRemoveFromCart: () => void;
  isCartFull: () => boolean;
  isItemMaxQuantity: boolean;
};

const quantChangeAnimation = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 10, opacity: 0 },
  transition: { duration: 0.2 },
};

const quantButtonShowAnimation = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: { duration: 0.2 },
};

const MenuItemButtons = ({
  isItemInCart,
  id,
  getItemQuantity,
  handleAddToCart,
  handleRemoveFromCart,
  isItemMaxQuantity,
  isCartFull,
}: MenuItemButtonsProps) => {
  return (
    <AnimatePresence>
      <div className="absolute bottom-[0.30rem] left-1/2 flex -translate-x-1/2 transform flex-row items-center justify-center">
        {isItemInCart(id) ? (
          <motion.div
            key="remove-from-cart"
            {...scaleUpAnimation}
            className="flex transform flex-row items-center gap-3"
          >
            <motion.div {...tapScaleAnimation}>
              <BadgeMinus
                key={"remove-from-cart"}
                size={48}
                className="cursor-pointer p-2"
                onClick={handleRemoveFromCart}
              />
            </motion.div>

            <motion.span
              key={getItemQuantity(id)}
              {...quantChangeAnimation}
              className={`rounded-lg px-2 text-lg ${isItemMaxQuantity || isCartFull() ? "bg-red-400" : "bg-slate-800"}`}
            >
              {getItemQuantity(id)}
            </motion.span>

            <motion.div {...tapScaleAnimation}>
              <BadgePlus
                key={"add-to-cart"}
                size={48}
                className={`p-2 ${isItemMaxQuantity || isCartFull() ? "cursor-not-allowed text-gray-400" : "cursor-pointer"} transition-colors duration-500`}
                onClick={handleAddToCart}
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="add-to-cart"
            {...quantButtonShowAnimation}
            {...tapScaleAnimation}
            className="flex transform items-center justify-center"
          >
            <BadgePlus
              size={48}
              className={`${isItemMaxQuantity || isCartFull() ? "cursor-not-allowed text-gray-400" : "cursor-pointer"} p-2 transition-colors duration-500`}
              onClick={handleAddToCart}
            />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default MenuItemButtons;
