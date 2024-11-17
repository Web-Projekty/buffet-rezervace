import { useEffect, useState } from "react";
import { dummyFood } from "../../dummyData";
import { usePaging } from "../../hooks/usePaging";
import PagingButtons from "../PagingButtons";
import MenuItem from "./MenuItem";
import { MenuItem as MenuItemType } from "../../types";
import useFetch from "../../hooks/useFetch";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import Loading from "../Loading";
import { itemsPerPage } from "../../constants";

const Menu = () => {
  const [menu, setMenu] = useState<MenuItemType[]>([]);

  const { currentPage, totalPagesCount, dataList, arrayOfPages, handlePage } =
    usePaging<MenuItemType>(menu, itemsPerPage);

  // const { data, isLoading, error } = useFetch<MenuItemType[]>(
  //   "https://wlczak.vlastas.cc/backend/api",
  //   { requestType: "getMenu" },
  //   [],
  // );

  useEffect(
    () => {
      // if (data) {
      //   setMenu(data);
      // }
      setMenu(dummyFood as MenuItemType[]);
    },
    [
      /*data*/
    ],
  );

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-bold text-white">Menu</h1>
      {/* {isLoading && <Loading size={30} />} */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4">
        {dataList.map((item) => {
          return <MenuItem key={item.id} item={item} />;
        })}
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

export default Menu;
