import { useState } from "react";
import { ITEMS_PER_PAGE } from "../../constants";
import { useBackendPaging } from "../../hooks/useBackendPaging";
import { MenuItem as MenuItemType } from "../../types";
import ErrorComponent from "../error/ErrorComponent";
import Loading from "../Loading";
import PagingButtons from "../PagingButtons";
import MenuItemAdd from "./MenuItemAdd";
import MenuItemEdit from "./MenuItemEdit";
import MenuItemEditBar from "./MenuItemEditBar";

const MenuEdit = () => {
  const {
    dataList,
    error,
    isLoading,
    currentPage,
    arrayOfPages,
    totalPagesCount,
    handlePage,
  } = useBackendPaging<MenuItemType>("getMenu", ITEMS_PER_PAGE - 1);
  const [isBarOpen, setIsBarOpen] = useState<boolean>(false);

  const [editItem, setEditItem] = useState<MenuItemType | null>(null);

  const handleBarOpen = (id?: number) => {
    if (id) {
      setEditItem(dataList.find((item) => item.id === id) || null);
    } else {
      setEditItem(null);
    }
    setIsBarOpen(!isBarOpen);
  };

  if (isLoading) {
    return <Loading size={30} />;
  }

  if (error) {
    return (
      <ErrorComponent title="Načítání položek se nezdařilo." subtitle="🛠️👷" />
    );
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-3xl font-bold text-white">Úprava menu</h1>
        {/* {isLoading && <Loading size={30} />} */}
        <div className="flex flex-row-reverse items-start gap-5">
          {isBarOpen && (
            <MenuItemEditBar
              handleBarOpen={handleBarOpen}
              menuItem={editItem}
            />
          )}

          <div
            className={`grid grid-cols-1 gap-10 md:grid-cols-2 ${isBarOpen ? "xl:grid-cols-3" : "xl:grid-cols-4"}`}
          >
            <MenuItemAdd handleBarOpen={handleBarOpen} />
            {dataList.map((item) => (
              <MenuItemEdit
                key={item.id}
                item={item}
                handleBarOpen={handleBarOpen}
                isBarOpen={isBarOpen}
              />
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
    </>
  );
};

export default MenuEdit;
