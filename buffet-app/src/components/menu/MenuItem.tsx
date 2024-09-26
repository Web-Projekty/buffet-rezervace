import { LuBadgePlus } from "react-icons/lu";
import { formatCurrency } from "../../utils";
import { motion } from "framer-motion";
import { MenuItem as MenuItemType } from "../../types";

const MenuItem = ({ image, name, price, description }: MenuItemType) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="relative flex w-[20rem] flex-col justify-around gap-5 rounded-lg bg-slate-900 p-4 text-white shadow-sm shadow-black"
    >
      <img
        src={image}
        alt={name}
        className="h-[15rem] w-[20rem] rounded-lg object-cover"
      />
      <div className="flex flex-col gap-3 rounded-lg p-2">
        <div className="flex items-center">
          <h2 className="rounded-lg px-2 text-xl font-bold">{name}</h2>
          <div className="mt-4 flex-1 border-b-2 border-dotted border-white"></div>
          <p className="rounded-lg px-2 text-lg">{formatCurrency(price)}</p>
        </div>
        <p className="w-[240px] rounded-lg px-2">{description}</p>
        <div className="flex items-center justify-center">
          <LuBadgePlus size={48} className="p-2 hover:cursor-pointer" />
        </div>
      </div>
    </motion.div>
  );
};

export default MenuItem;
