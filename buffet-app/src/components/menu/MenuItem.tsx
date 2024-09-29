import { LuBadgePlus, LuBadgeMinus } from "react-icons/lu";
import { formatCurrency } from "../../utils";
import { motion } from "framer-motion";
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
      <img
        src={item.image}
        alt={item.name}
        className="h-[15rem] w-[20rem] rounded-lg object-cover"
      />
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
          <p className="rounded-lg">
            <span>Alergeny: </span>
            {item.alergens.map((alergen) => alergen.id).join(", ")}
          </p>
        </div>

        {cartCtx.isItemInCart(item) ? (
          <div className="flex items-center justify-center gap-10">
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
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <LuBadgePlus
              size={48}
              className="p-2 hover:cursor-pointer"
              onClick={() => cartCtx.addToCart(item)}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MenuItem;
