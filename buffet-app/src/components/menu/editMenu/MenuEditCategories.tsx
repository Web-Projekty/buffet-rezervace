import { Category, MenuItem } from "../../../types";
import MenuCategoryAdd from "./MenuCategoryAdd";
import MenuEditItems from "./MenuEditItems";
import MenuEditCategory from "./MenuEditCategory";

type MenuEditCategoriesProps = {
  categories: Category[];
  handleCategoryBarOpen: (id?: number) => void;
  isCategoryBarOpen: boolean;
  menuItems: MenuItem[] | null;
  handleBarOpen: (id?: number) => void;
  isItemBarOpen: boolean;
};

const MenuEditCategories = ({
  categories,
  handleCategoryBarOpen,
  isCategoryBarOpen,
  menuItems,
  handleBarOpen,
  isItemBarOpen,
}: MenuEditCategoriesProps) => {
  return (
    <div className="flex flex-col">
      <MenuCategoryAdd
        handleCategoryBarOpen={handleCategoryBarOpen}
        isCategoryBarOpen={isCategoryBarOpen}
      />
      {categories?.map((category) => (
        <div className="mt-5 flex flex-col gap-5" key={category.id}>
          <MenuEditCategory
            category={category}
            isCategoryBarOpen={isCategoryBarOpen}
            handleCategoryBarOpen={handleCategoryBarOpen}
          />

          <MenuEditItems
            menuItems={menuItems}
            categories={categories}
            category={category}
            handleBarOpen={handleBarOpen}
            isItemBarOpen={isItemBarOpen}
          />
        </div>
      ))}
    </div>
  );
};

export default MenuEditCategories;
