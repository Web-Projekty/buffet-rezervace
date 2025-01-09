import { Category, MenuItem as MenuItemType } from "../../types";
import HorizontalPaging from "../ui/HorizontalPaging";
import MenuItem from "./MenuItem";

type MenuItemsProps = {
  menuItems: MenuItemType[] | null;
  categories: Category[];
  categoryId: number;
};

const MenuItems = ({ menuItems, categories, categoryId }: MenuItemsProps) => {
  return (
    <HorizontalPaging className="w-[25rem] md:w-[80rem] 2xl:w-[100rem]">
      {menuItems &&
        menuItems
          .filter(
            (item) => categories.length > 0 && item.category === categoryId,
          )
          .map((item) => <MenuItem key={item.id} item={item} />)}
    </HorizontalPaging>
  );
};

export default MenuItems;
