import { LuBadgePlus, LuBadgeMinus } from "react-icons/lu";
import { formatCurrency } from "../../utils";
import { AnimatePresence, motion } from "framer-motion";
import { MenuItem as MenuItemType } from "../../types";
import { CartContext } from "../../store/CartContext";
import { useContext } from "react";

const MenuItem = ({ item }: { item: MenuItemType }) => {
  const cartCtx = useContext(CartContext);
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
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
            <li className="rounded-full bg-slate-600 p-1 px-3">{alergen.id}</li>
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

        <div className="flex flex-row items-center justify-center">
          {cartCtx.isItemInCart(item) ? (
            <AnimatePresence>
              <motion.div
                key="quantity-control"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex transform flex-row items-center gap-3"
              >
                <LuBadgeMinus
                  size={48}
                  className="p-2 hover:cursor-pointer"
                  onClick={() => cartCtx.removeFromCart(item)}
                />
                <span>{cartCtx.getItemQuantity(item)}</span>
                <LuBadgePlus
                  size={48}
                  className="p-2 hover:cursor-pointer"
                  onClick={() => cartCtx.addToCart(item)}
                />
              </motion.div>
            </AnimatePresence>
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
                onClick={() => cartCtx.addToCart(item)}
              />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MenuItem;
