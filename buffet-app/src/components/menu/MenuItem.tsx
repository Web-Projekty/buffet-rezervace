import { motion } from "framer-motion";
import { MenuItem as MenuItemType } from "../../types";
import useCart from "../../store/CartStore";
import MenuItemImage from "./MenuItemImage";
import MenuItemText from "./MenuItemText";
import MenuItemButtons from "./MenuItemButtons";
import { menuItemShowAnimation } from "../../animations";

type MenuItemProps = {
  item: MenuItemType;
};

const MenuItem = ({ item }: MenuItemProps) => {
  const {
    addToCart,
    removeFromCart,
    getItemQuantity,
    isItemInCart,
    isCartFull,
    isItemMaxQuantity,
  } = useCart();

  const handleAddToCart = () => {
    addToCart(item);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(item.id);
  };

  return (
    <motion.div
      {...menuItemShowAnimation(0.5)}
      className="relative flex h-[26rem] w-[18rem] flex-col justify-start gap-2 rounded-lg bg-slate-900 p-4 text-white shadow-sm shadow-black"
    >
      <MenuItemImage {...item} />

      <div className="flex h-full flex-col rounded-lg p-2">
        <MenuItemText {...item} />
        <MenuItemButtons
          isItemInCart={isItemInCart}
          id={item.id}
          getItemQuantity={getItemQuantity}
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
          isCartFull={isCartFull}
          isItemMaxQuantity={isItemMaxQuantity(item.id)}
        />
      </div>
    </motion.div>
  );
};

export default MenuItem;
