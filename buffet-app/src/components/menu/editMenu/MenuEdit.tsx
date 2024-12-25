import { useCallback, useEffect, useState } from "react";
import { Category, MenuItem as MenuItemType } from "../../../types";
import ErrorComponent from "../../error/ErrorComponent";
import Loading from "../../Loading";
import MenuItemAdd from "./MenuItemAdd";
import MenuItemEdit from "./MenuItemEdit";
import MenuItemEditBar from "./MenuItemEditBar";
import { Pen } from "lucide-react";
import MenuCategoryEditBar from "./MenuCategoryEditBar";
import MenuCategoryAdd from "./MenuCategoryAdd";
import useMenu from "../../../hooks/useMenu";

const MenuEdit = () => {
  const { menuItems, error, isLoading, categories } = useMenu();

  const [isItemBarOpen, setIsItemBarOpen] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<MenuItemType | null>(null);
  const [isCategoryBarOpen, setIsCategoryBarOpen] = useState<boolean>(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);

  const handleBarOpen = useCallback(
    (id?: number) => {
      if (id) {
        setEditItem(menuItems?.find((item) => item.id === id) || null);
      } else {
        setEditItem(null);
      }
      setIsItemBarOpen((prev) => !prev);
      setIsCategoryBarOpen(false);
    },
    [menuItems],
  );

  const handleCategoryBarOpen = useCallback(
    (id?: number) => {
      if (id) {
        setEditCategory(
          categories.find((category) => category.id === id) || null,
        );
      } else {
        setEditCategory(null);
      }
      setIsCategoryBarOpen((prev) => !prev);
      setIsItemBarOpen(false);
    },
    [categories],
  );

  useEffect(() => {
    if (isItemBarOpen || isCategoryBarOpen)
      window.scrollTo({ top: 0, behavior: "smooth" });
  }, [isItemBarOpen, isCategoryBarOpen]);

  if (isLoading) {
    return <Loading size={30} />;
  }

  if (error) {
    return (
      <ErrorComponent title="Načítání položek se nezdařilo." subtitle="🛠️👷" />
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-bold text-white">Úprava menu</h1>
      <div className="relative flex flex-row-reverse items-start gap-5">
        {isItemBarOpen && (
          <div className="sticky top-0 h-screen flex-shrink-0">
            <MenuItemEditBar
              handleBarOpen={handleBarOpen}
              menuItem={editItem}
              categories={categories}
            />
          </div>
        )}
        {isCategoryBarOpen && (
          <div className="sticky top-0 h-screen flex-shrink-0">
            <MenuCategoryEditBar
              handleBarOpen={handleCategoryBarOpen}
              category={editCategory}
            />
          </div>
        )}
        <div className="flex flex-col">
          <MenuCategoryAdd
            handleCategoryBarOpen={handleCategoryBarOpen}
            isCategoryBarOpen={isCategoryBarOpen}
          />
          {categories?.map((category) => (
            <div className="mt-5 flex flex-col gap-5" key={category.id}>
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold text-white">
                  {category.name}
                </h1>
                <div className="flex gap-2">
                  <div className="mr-5 text-white">{category.description}</div>

                  <Pen
                    className={`text-white ${isCategoryBarOpen ? "cursor-not-allowed opacity-75" : "cursor-pointer"}`}
                    onClick={() =>
                      !isCategoryBarOpen
                        ? handleCategoryBarOpen(category.id)
                        : undefined
                    }
                  />
                </div>
              </div>

              <div
                className={`grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-10 ${isItemBarOpen || isCategoryBarOpen ? "xl:grid-cols-2 2xl:grid-cols-3" : "xl:grid-cols-2 2xl:grid-cols-4"}`}
              >
                <MenuItemAdd
                  handleBarOpen={handleBarOpen}
                  isBarOpen={isItemBarOpen}
                />
                {menuItems
                  ?.filter(
                    (item) =>
                      categories.length > 0 && item.category === category.id,
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuEdit;
