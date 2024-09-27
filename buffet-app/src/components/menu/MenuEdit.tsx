import { useState } from "react";
import { dummyFood } from "../../dummyData";
import { usePaging } from "../../hooks/usePaging";
import PagingButtons from "../PagingButtons";
import MenuItem from "./MenuItem";
import { MenuItem as MenuItemType } from "../../types";

const MenuEdit = () => {
  const [menu, setMenu] = useState<MenuItemType[]>(dummyFood);

  const {
    currentPage,
    totalPagesCount,
    displayedList,
    handleNextPage,
    handlePreviousPage,
  } = usePaging(menu, 9);

  return (
    <div className="mb-[3rem] mt-[10rem] flex flex-col items-center justify-center gap-5">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
        {displayedList.map((food) => {
          return <MenuItem key={food.id} {...food} />;
        })}
      </div>
      <PagingButtons
        currentPage={currentPage}
        totalPagesCount={totalPagesCount}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
    </div>
  );
};

export default MenuEdit;
