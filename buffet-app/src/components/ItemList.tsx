import { dummyFood } from "../dummyData";
import { usePaging } from "../hooks/usePaging";
import Item from "./Item";

const ItemList = () => {
  // const { isLoading, error, data } = useFetch(
  //   { url: "http://localhost:80/api", requestType: "" },
  //   [],
  // );

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center text-2xl">
  //       Loading...
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="flex items-center justify-center text-2xl">
  //       Error occured while fetching...
  //     </div>
  //   );
  // }

  // console.log(data);

  const {
    currentPage,
    totalPages,
    displayedOrders,
    handleNextPage,
    handlePreviousPage,
  } = usePaging(dummyFood, 9);

  return (
    <div className="mb-[3rem] mt-[10rem] flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
        {displayedOrders.map((food) => {
          return <Item key={food.id} {...food} />;
        })}
      </div>
      {totalPages > 1 && (
        <div className="flex flex-row gap-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="rounded-md border bg-cyan-500 p-2 text-white hover:bg-cyan-700"
          >
            Předchozí
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="rounded-md border bg-cyan-500 p-2 text-white hover:bg-cyan-700"
          >
            Další
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemList;
