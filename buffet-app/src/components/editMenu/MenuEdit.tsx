import { useEffect, useState } from "react";
import { FETCH_URL, ITEMS_PER_PAGE } from "../../constants";
import { Category, MenuData, MenuItem as MenuItemType } from "../../types";
import ErrorComponent from "../error/ErrorComponent";
import Loading from "../Loading";
import PagingButtons from "../PagingButtons";
import MenuItemAdd from "./MenuItemAdd";
import MenuItemEdit from "./MenuItemEdit";
import MenuItemEditBar from "./MenuItemEditBar";
import { useFetch } from "../../hooks/useFetch";
import { usePaging } from "../../hooks/usePaging";
import { Pen } from "lucide-react";
import MenuCategoryEditBar from "./MenuCategoryEditBar";
import MenuCategoryAdd from "./MenuCategoryAdd";

const MenuEdit = () => {
  const { data, error, isLoading } = useFetch<MenuData>(FETCH_URL, {
    requestType: "getMenu",
    itemsCount: ITEMS_PER_PAGE,
    page: 1,
  });

  const { dataList, currentPage, totalPagesCount, arrayOfPages, handlePage } =
    usePaging<MenuItemType>(data?.data, ITEMS_PER_PAGE, "menuPage");

  const [isItemBarOpen, setIsItemBarOpen] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<MenuItemType | null>(null);
  const [isCategoryBarOpen, setIsCategoryBarOpen] = useState<boolean>(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);

  const handleBarOpen = (id?: number) => {
    if (id) {
      setEditItem(dataList.find((item) => item.id === id) || null);
    } else {
      setEditItem(null);
    }
    setIsItemBarOpen(!isItemBarOpen);
    setIsCategoryBarOpen(false);
  };

  const handleCategoryBarOpen = (id?: number) => {
    if (id) {
      setEditCategory(
        categories.find((category) => category.id === id) || null,
      );
    } else {
      setEditCategory(null);
    }
    setIsCategoryBarOpen(!isCategoryBarOpen);
    setIsItemBarOpen(false);
  };

  useEffect(() => {
    if (data) {
      setCategories(data.categoryList);
    }
  }, [data]);

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
      <div className="flex flex-row-reverse items-start gap-5">
        {isItemBarOpen && (
          <div className="flex-shrink-0">
            <MenuItemEditBar
              handleBarOpen={handleBarOpen}
              menuItem={editItem}
              categories={categories}
            />
          </div>
        )}
        {isCategoryBarOpen && (
          <div className="flex-shrink-0">
            <MenuCategoryEditBar
              handleBarOpen={handleCategoryBarOpen}
              category={editCategory}
            />
          </div>
        )}
        <div className="flex-col">
          {categories?.map((category) => (
            <div className="mt-5 flex flex-col gap-5" key={category.id}>
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold text-white">
                  {category.name}
                </h1>
                <div className="flex gap-2">
                  <div className="mr-5 text-white">{category.description}</div>
                  <button
                    onClick={() => handleCategoryBarOpen(category.id)}
                    disabled={isCategoryBarOpen}
                  >
                    <Pen className="text-white" />
                  </button>
                </div>
              </div>
              <div
                className={`grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-10 ${isItemBarOpen || isCategoryBarOpen ? "xl:grid-cols-2 2xl:grid-cols-3" : "xl:grid-cols-2 2xl:grid-cols-4"}`}
              >
                <MenuItemAdd
                  handleBarOpen={handleBarOpen}
                  isBarOpen={isItemBarOpen}
                />
                {dataList
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
              <MenuCategoryAdd
                handleCategoryBarOpen={handleCategoryBarOpen}
                isCategoryBarOpen={isCategoryBarOpen}
              />
            </div>
          ))}
        </div>
      </div>

      <PagingButtons
        currentPage={currentPage}
        totalPagesCount={totalPagesCount}
        listOfPages={arrayOfPages}
        handlePage={handlePage}
      />
    </div>
  );
};

export default MenuEdit;
