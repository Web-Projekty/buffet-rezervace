import { Category, MenuItem } from "../../../types";
import MenuItemAdd from "./MenuItemAdd";
import MenuItemEdit from "./MenuItemEdit";

type MenuEditItemsProps = {
  menuItems: MenuItem[] | null;
  categories: Category[];
  category: Category | null;
  handleBarOpen: (id?: number) => void;
  isItemBarOpen: boolean;
};

const MenuEditItems = ({
  menuItems,
  categories,
  category,
  handleBarOpen,
  isItemBarOpen,
}: MenuEditItemsProps) => {
  return (
    <div className={`grid grid-cols-1 gap-5 md:grid-cols-3 xl:gap-10`}>
      <MenuItemAdd handleBarOpen={handleBarOpen} isBarOpen={isItemBarOpen} />
      {menuItems
        ?.filter(
          (item) => categories.length > 0 && item.category === category?.id,
        )
        .map((item) => (
          <MenuItemEdit
            key={item.id}
            item={item}
            handleBarOpen={handleBarOpen}
            isBarOpen={isItemBarOpen}
          />
        ))}
    </div>
  );
};

export default MenuEditItems;
