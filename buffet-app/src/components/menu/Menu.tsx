import { dummyFood } from "../../dummyData";
import { usePaging } from "../../hooks/usePaging";
import PagingButtons from "../PagingButtons";
import MenuItem from "./MenuItem";

const Menu = () => {
  const {
    currentPage,
    totalPagesCount,
    displayedList,
    handleNextPage,
    handlePreviousPage,
  } = usePaging(dummyFood, 9);

  return (
    <div className="mb-[3rem] mt-[10rem] flex flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-bold text-white">Menu</h1>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
        {displayedList.map((item) => {
          return <MenuItem key={item.id} item={item} />;
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

export default Menu;
