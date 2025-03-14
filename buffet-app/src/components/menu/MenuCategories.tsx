import { Category } from "../../types";
import HorizontalPaging from "../ui/HorizontalPaging";
import MenuCategory from "./MenuCategory";

type MenuCategoriesProps = {
  categories: Category[];
  onFilter: (categoryId: number) => void;
};

const MenuCategories = ({ categories, onFilter }: MenuCategoriesProps) => {
  return (
    <HorizontalPaging
      className={`h-[4rem] w-[25rem] transition-all duration-1000 ease-in-out sm:w-[30rem] md:w-[35rem] lg:w-[40rem] xl:w-[48rem] 2xl:w-[51rem] ${categories.length < 4 ? "justify-center" : "justify-start"}`}
    >
      {categories.map((category) => (
        <MenuCategory
          key={category.id}
          category={category}
          onClick={onFilter}
        />
      ))}
    </HorizontalPaging>
  );
};

export default MenuCategories;
