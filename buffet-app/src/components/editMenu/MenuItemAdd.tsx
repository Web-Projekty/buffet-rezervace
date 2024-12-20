import { motion } from "framer-motion";
import { menuItemShowAnimation } from "../../animations";
import { Plus } from "lucide-react";

type MenuItemAddProps = {
  handleBarOpen: (id?: number) => void;
  isBarOpen: boolean;
};

const MenuItemAdd = ({ handleBarOpen, isBarOpen }: MenuItemAddProps) => {
  const handleAdd = () => {
    handleBarOpen();
  };

  return (
    <motion.div
      {...menuItemShowAnimation(0.5)}
      className={`relative flex h-[24rem] w-[16rem] ${isBarOpen ? "cursor-not-allowed" : "cursor-pointer"} flex-col items-center justify-center gap-2 rounded-lg bg-slate-900 p-4 text-white shadow-sm shadow-black xl:h-[26rem] xl:w-[18rem]`}
      onClick={isBarOpen ? undefined : handleAdd}
    >
      <Plus size={64} />
    </motion.div>
  );
};

export default MenuItemAdd;
