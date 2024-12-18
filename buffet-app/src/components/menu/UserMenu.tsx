import { useEffect, useState } from "react";
import { FETCH_URL, ITEMS_PER_PAGE } from "../../constants";
import { Category, MenuData, MenuItem as MenuItemType } from "../../types";
import ErrorComponent from "../error/ErrorComponent";
import Loading from "../Loading";
import PagingButtons from "../PagingButtons";
import { useFetch } from "../../hooks/useFetch";
import { usePaging } from "../../hooks/usePaging";
import MenuItem from "./MenuItem";

const UserMenu = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const { data, error, isLoading } = useFetch<MenuData>(FETCH_URL, {
    requestType: "getMenu",
    itemsCount: ITEMS_PER_PAGE,
    page: 1,
  });

  const { dataList, currentPage, totalPagesCount, arrayOfPages, handlePage } =
    usePaging<MenuItemType>(data?.data, ITEMS_PER_PAGE, "menuPage");

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
    <div className="flex flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-bold text-white">Menu</h1>

      {currentPage > totalPagesCount ? (
        <p className="italic text-white">
          "Meow? (Waiting for something to happen?)"
        </p>
      ) : (
        <div className="flex-col">
          {categories?.map((category) => (
            <div className="mt-5 flex flex-col gap-5" key={category.id}>
              <div className="flex justify-between">
                <h1 className="text-4xl font-bold text-white">
                  {category.name}
                </h1>
                <div className="mr-5 text-white">{category.description}</div>
              </div>

              <div
                className={`grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-10`}
              >
                {dataList
                  ?.filter(
                    (item) =>
                      categories.length > 0 && item.category === category.id,
                  )
                  .map((item) => <MenuItem key={item.id} item={item} />)}
              </div>
            </div>
          ))}
        </div>
      )}

      <PagingButtons
        currentPage={currentPage}
        totalPagesCount={totalPagesCount}
        listOfPages={arrayOfPages}
        handlePage={handlePage}
      />
    </div>
  );
};

export default UserMenu;
