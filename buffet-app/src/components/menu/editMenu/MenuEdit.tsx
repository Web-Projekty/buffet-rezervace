import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { Category, MenuItem as MenuItemType } from "../../../types";
import ErrorComponent from "../../error/ErrorComponent";
import Loading from "../../ui/Loading";
import useMenu from "../../../hooks/useMenu";
import { Fallback } from "../../../main";
import { AnimatePresence } from "framer-motion";
import MenuEditCategories from "./MenuEditCategories";

const MenuItemEditBar = lazy(() => import("./MenuItemEditBar"));
const MenuCategoryEditBar = lazy(() => import("./MenuCategoryEditBar"));

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
      setEditCategory(
        id ? categories.find((category) => category.id === id) || null : null,
      );

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
    <section className="flex flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-bold text-white">Úprava menu</h1>
      <div className="relative flex flex-row-reverse items-start gap-5">
        <AnimatePresence>
          {isItemBarOpen && (
            <Suspense fallback={<Fallback />}>
              <MenuItemEditBar
                key={editItem?.id}
                handleBarOpen={handleBarOpen}
                menuItem={editItem}
                categories={categories}
              />
            </Suspense>
          )}

          {isCategoryBarOpen && (
            <Suspense fallback={<Fallback />}>
              <MenuCategoryEditBar
                key={editCategory?.id}
                handleBarOpen={handleCategoryBarOpen}
                category={editCategory}
              />
            </Suspense>
          )}
        </AnimatePresence>
        <MenuEditCategories
          categories={categories}
          handleCategoryBarOpen={handleCategoryBarOpen}
          isCategoryBarOpen={isCategoryBarOpen}
          menuItems={menuItems}
          handleBarOpen={handleBarOpen}
          isItemBarOpen={isItemBarOpen}
        />
      </div>
    </section>
  );
};

export default MenuEdit;
