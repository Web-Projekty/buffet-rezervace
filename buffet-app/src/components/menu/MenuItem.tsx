import { motion } from "framer-motion";
import { MenuItem as MenuItemType } from "../../types";
import useCart from "../../store/CartStore";
import MenuItemImage from "./MenuItemImage";
import MenuItemText from "./MenuItemText";
import MenuItemButtons from "./MenuItemButtons";

type MenuItem = {
  item: MenuItemType;
};

const menuItemShowAnimation = {
  initial: { x: 50, opacity: 0 },
  whileInView: { x: 0, opacity: 1 },
  transition: { duration: 0.5 },
};

const MenuItem = ({ item }: MenuItem) => {
  const { addToCart, removeFromCart, getItemQuantity, isItemInCart } =
    useCart();

  const handleAddToCart = () => {
    addToCart(item);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(item.id);
  };

  return (
    <motion.div
      {...menuItemShowAnimation}
      className="relative flex h-[26rem] w-[18rem] flex-col justify-start gap-2 rounded-lg bg-slate-900 p-4 text-white shadow-sm shadow-black"
    >
      <MenuItemImage {...item} />

      <div className="flex flex-col gap-3 rounded-lg p-2">
        <MenuItemText {...item} />
        <MenuItemButtons
          isItemInCart={isItemInCart}
          id={item.id}
          getItemQuantity={getItemQuantity}
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      </div>
    </motion.div>
  );
};

export default MenuItem;
