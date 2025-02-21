import { Category, MenuItem as MenuItemType } from "../../types";
import HorizontalPaging from "../ui/HorizontalPaging";
import MenuItem from "./MenuItem";

type MenuItemsProps = {
  menuItems: MenuItemType[] | null;
  categories: Category[];
  categoryId: number;
};

const MenuItems = ({ menuItems, categories, categoryId }: MenuItemsProps) => {
  const filteredItems = menuItems?.filter(
    (item) => categories.length > 0 && item.category === categoryId,
  );
  return (
    <HorizontalPaging className="w-[25rem] transition-all duration-1000 ease-in-out sm:w-[30rem] md:w-[60rem] lg:w-[70rem] xl:w-[85rem] 2xl:w-[100rem]">
      {filteredItems &&
        filteredItems.map((item) => <MenuItem key={item.id} item={item} />)}
    </HorizontalPaging>
  );
};

export default MenuItems;
