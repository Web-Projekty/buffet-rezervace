import { motion } from "framer-motion";
import { MenuItem as MenuItemType } from "../../../types/types";
import ItemImage from "../../items/ItemImage";
import ItemText from "../../items/ItemText";
import { menuItemShowAnimation } from "../../../animations/animations";
import Button from "../../ui/Button";

type MenuItemProps = {
  item: MenuItemType;
  handleBarOpen: (id: number) => void;
  isBarOpen: boolean;
};

const MenuItemEdit = ({ item, handleBarOpen, isBarOpen }: MenuItemProps) => {
  const handleEdit = () => {
    handleBarOpen(item.id);
  };

  return (
    <motion.div
      {...menuItemShowAnimation(0.5)}
      className="relative flex h-[24rem] w-[16rem] flex-col justify-start gap-2 rounded-lg bg-slate-900 p-4 text-white shadow-sm shadow-black xl:h-[26rem] xl:w-[18rem]"
    >
      <ItemImage {...item} />

      <div className="flex h-full flex-col rounded-lg p-2">
        <ItemText {...item} />
      </div>
      <Button
        className="absolute bottom-2 w-[14rem] xl:w-[16rem]"
        onClick={handleEdit}
        disabled={isBarOpen}
      >
        Upravit
      </Button>
    </motion.div>
  );
};

export default MenuItemEdit;
