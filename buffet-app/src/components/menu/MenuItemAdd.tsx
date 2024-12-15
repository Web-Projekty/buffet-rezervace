import { motion } from "framer-motion";
import { menuItemShowAnimation } from "../../animations";
import { Plus } from "lucide-react";

type MenuItemAddProps = {
  handleBarOpen: () => void;
};

const MenuItemAdd = ({ handleBarOpen }: MenuItemAddProps) => {
  const handleAdd = () => {
    handleBarOpen();
  };

  return (
    <motion.div
      {...menuItemShowAnimation(0.5)}
      className="relative flex h-[26rem] w-[18rem] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg bg-slate-900 p-4 text-white shadow-sm shadow-black"
      onClick={handleAdd}
    >
      <Plus size={64} onClick={handleAdd} />
    </motion.div>
  );
};

export default MenuItemAdd;
