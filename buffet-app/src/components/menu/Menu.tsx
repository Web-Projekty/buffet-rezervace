import PagingButtons from "../PagingButtons";
import MenuItem from "./MenuItem";
import { MenuItem as MenuItemType } from "../../types";
import Loading from "../Loading";
import { itemsPerPage } from "../../constants";
import ErrorComponent from "../error/ErrorComponent";
import { useBackendPaging } from "../../hooks/useBackendPaging";

const Menu = () => {
  const {
    dataList,
    error,
    isLoading,
    currentPage,
    arrayOfPages,
    totalPagesCount,
    handlePage,
  } = useBackendPaging<MenuItemType>("getMenu", itemsPerPage);

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
      {/* {isLoading && <Loading size={30} />} */}
      {currentPage > totalPagesCount ? (
        <p className="italic text-white">
          "Meow? (Waiting for something to happen?)"
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4">
          {dataList.map((item) => (
            <MenuItem key={item.id} item={item} />
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

export default Menu;
