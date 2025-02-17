import { UseFilterReturn } from "../../hooks/useFilter";
import { Category } from "../../types";
import HorizontalPaging from "../ui/HorizontalPaging";
import MenuCategory from "./MenuCategory";

type MenuCategoriesProps = {
  categories: Category[];
  onFilter: UseFilterReturn<Category>["handleFilter"];
};

const MenuCategories = ({ categories, onFilter }: MenuCategoriesProps) => {
  const AllCategory: Category = {
    id: 0,
    name: "Vše",
    image: "",
    description: "Zobrazit všechny položky",
  };

  return (
    <HorizontalPaging className="w-[25rem] transition-all duration-1000 ease-in-out sm:w-[30rem] md:w-[35rem] lg:w-[40rem] xl:w-[48rem] 2xl:w-[51rem]">
      <MenuCategory category={AllCategory} onClick={onFilter} />
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
