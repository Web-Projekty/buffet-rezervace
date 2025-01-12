import ErrorComponent from "../error/ErrorComponent";
import Loading from "../ui/Loading";
import HorizontalPaging from "../ui/HorizontalPaging";
import useMenu from "../../hooks/useMenu";
import { useFilter } from "../../hooks/useFilter";
import MenuCategory from "./MenuCategory";
import { Category } from "../../types";
import { ReactNode } from "react";
import MenuItems from "./MenuItems";
import { motion } from "framer-motion";
import { menuItemShowAnimation } from "../../animations";

const UserMenu = () => {
  const { menuItems, error, isLoading, categories } = useMenu();
  const { data: filteredCategories, handleFilter } = useFilter(
    "name",
    "category",
    categories,
  );

  if (isLoading) {
    return <Loading size={30} />;
  }

  if (error) {
    return (
      <ErrorComponent title="Načítání položek se nezdařilo." subtitle="🛠️👷" />
    );
  }

  const renderCategories = (): ReactNode => {
    const AllCategory: Category = {
      id: 0,
      name: "Vše",
      image: "",
      description: "Zobrazit všechny položky",
    };
    return (
      <HorizontalPaging className="w-[25rem] md:w-[40rem] 2xl:w-[51rem]">
        <MenuCategory category={AllCategory} onClick={handleFilter} />
        {categories.map((category) => {
          return (
            <MenuCategory
              key={category.id}
              category={category}
              onClick={handleFilter}
            />
          );
        })}
      </HorizontalPaging>
    );
  };

  const renderItems = (): ReactNode => {
    return filteredCategories && filteredCategories.length <= 0 ? (
      <p className="italic text-white">
        "Meow? (Waiting for something to happen?)"
      </p>
    ) : (
      <motion.div
        {...menuItemShowAnimation(0.5)}
        className="flex flex-col items-start"
      >
        {filteredCategories.map((category) => (
          <div className="mt-5 flex flex-col gap-3" key={category.id}>
            <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between md:gap-0">
              <h1 className="text-4xl font-bold text-white">{category.name}</h1>
              <p className="text-white md:mr-5">{category.description}</p>
            </div>

            <MenuItems
              menuItems={menuItems}
              categories={categories}
              categoryId={category.id}
            />
          </div>
        ))}
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-bold text-white">Naše menu</h1>
      {renderCategories()}
      {renderItems()}
    </div>
  );
};

export default UserMenu;
