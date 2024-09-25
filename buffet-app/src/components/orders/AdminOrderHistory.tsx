import Order from "./Order";
import { usePaging } from "../../hooks/usePaging";
import { Order as OrderType } from "../../types";
import { dummyOrders } from "../../dummyData";

const AdminOrderHistory = () => {
  const {
    currentPage,
    totalPagesCount,
    totalListCount,
    displayedList,
    handleNextPage,
    handlePreviousPage,
  } = usePaging(dummyOrders, 4);
  return (
    <div className="mb-[3rem] mt-[15rem] flex flex-col justify-evenly gap-10 text-white md:flex-row md:gap-0">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl">Objednávky ({totalListCount})</h1>
        <ul className="flex flex-col gap-2">
          {displayedList.map((order) => (
            <Order key={order.id} order={order} />
          ))}
        </ul>
        {totalPagesCount > 1 && (
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
              disabled={currentPage === totalPagesCount}
              className="rounded-md border bg-cyan-500 p-2 text-white hover:bg-cyan-700"
            >
              Další
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrderHistory;
