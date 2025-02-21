import { motion } from "framer-motion";
import { MenuItem as MenuItemType } from "../../types";
import useCart from "../../store/CartStore";
import ItemImage from "../items/ItemImage";
import ItemText from "../items/ItemText";
import { menuItemShowAnimation } from "../../animations";
import Button from "../ui/Button";
import { formatCurrency } from "../utils/utils";

type MenuItemProps = {
  item: MenuItemType;
};

const MenuItem = ({ item }: MenuItemProps) => {
  const { addToCart, isItemMaxQuantity, isCartFull } = useCart();

  const handleAddToCart = () => {
    addToCart(item);
  };

  const canAddToCart = () => {
    return !isItemMaxQuantity(item.id) && !isCartFull();
  };

  return (
    <motion.article
      {...menuItemShowAnimation(0.5)}
      className="relative flex h-[26rem] w-[18rem] flex-shrink-0 flex-col justify-start gap-2 rounded-lg bg-slate-900 p-4 text-white shadow-sm shadow-black"
    >
      <ItemImage {...item} />

      <div className="flex h-full flex-col justify-between rounded-lg p-2">
        <ItemText {...item} />

        <Button
          onClick={handleAddToCart}
          className={`flex items-center justify-between ${canAddToCart() ? "" : "bg-gray-400 hover:bg-gray-400"}`}
        >
          <p>Do košíku</p>
          <p className="rounded-lg font-normal italic">
            od {formatCurrency(item.price)}
          </p>
        </Button>
      </div>
    </motion.article>
  );
};

export default MenuItem;
