import { LuBadgePlus, LuBadgeMinus } from "react-icons/lu";
import { formatCurrency } from "../../utils";
import { AnimatePresence, motion } from "framer-motion";
import { MenuItem as MenuItemType } from "../../types";
import { CartContext } from "../../store/CartContext";
import { useContext } from "react";
import { scaleUpAnimation, tapScaleAnimation } from "../../animations";

const MenuItem = ({ item }: { item: MenuItemType }) => {
  const { addToCart, removeFromCart, getItemQuantity, isItemInCart } =
    useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(item);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(item.id);
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative flex w-[20rem] flex-col justify-around gap-5 rounded-lg bg-slate-900 p-4 text-white shadow-sm shadow-black"
    >
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="h-[15rem] w-[20rem] rounded-lg object-cover"
        />
        <ul className="absolute top-0 m-1 flex flex-row gap-1">
          {item.alergens.map((alergen) => (
            <li key={alergen.id} className="rounded-full bg-slate-600 p-1 px-3">
              {alergen.id}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3 rounded-lg p-2">
        <div className="flex items-center font-bold">
          <h1 className="rounded-lg px-2 text-xl">{item.name}</h1>
          <div className="mt-4 flex-1 border-b-2 border-dotted border-white"></div>
          <p className="rounded-lg px-2 text-lg">
            {formatCurrency(item.price)}
          </p>
        </div>

        <div className="flex flex-col items-start px-2">
          <p className="rounded-lg">{item.description}</p>
        </div>

        <AnimatePresence>
          <div className="flex flex-row items-center justify-center">
            {isItemInCart(item.id) ? (
              <motion.div
                key="remove-from-cart"
                {...scaleUpAnimation}
                className="flex transform flex-row items-center gap-3"
              >
                <motion.div {...tapScaleAnimation}>
                  <LuBadgeMinus
                    size={48}
                    className="p-2 hover:cursor-pointer"
                    onClick={handleRemoveFromCart}
                  />
                </motion.div>
                <motion.span
                  key={getItemQuantity(item.id)}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-lg px-2 text-lg"
                >
                  {getItemQuantity(item.id)}
                </motion.span>
                <motion.div {...tapScaleAnimation}>
                  <LuBadgePlus
                    size={48}
                    className="p-2 hover:cursor-pointer"
                    onClick={handleAddToCart}
                  />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="add-to-cart"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex transform items-center justify-center"
              >
                <LuBadgePlus
                  size={48}
                  className="p-2 hover:cursor-pointer"
                  onClick={handleAddToCart}
                />
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MenuItem;
