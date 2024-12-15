import { motion } from "framer-motion";
import { MenuItem as MenuItemType } from "../../types";
import MenuItemImage from "./MenuItemImage";
import MenuItemText from "./MenuItemText";
import { menuItemShowAnimation } from "../../animations";
import Button from "../Button";

type MenuItemProps = {
  item: MenuItemType;
};

const MenuItemEdit = ({ item }: MenuItemProps) => {
  const handleEdit = () => {};

  return (
    <motion.div
      {...menuItemShowAnimation(0.5)}
      className="relative flex h-[26rem] w-[18rem] flex-col justify-start gap-2 rounded-lg bg-slate-900 p-4 text-white shadow-sm shadow-black"
    >
      <MenuItemImage {...item} />

      <div className="flex h-full flex-col rounded-lg p-2">
        <MenuItemText {...item} />
      </div>
      <Button className="absolute bottom-2 w-[16rem]" onClick={handleEdit}>
        Upravit
      </Button>
    </motion.div>
  );
};

export default MenuItemEdit;
