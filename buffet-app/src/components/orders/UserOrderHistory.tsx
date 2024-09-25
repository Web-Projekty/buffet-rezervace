import Order from "./Order";
import { usePaging } from "../../hooks/usePaging";
import { Order as OrderType } from "../../types";

const UserOrderHistory = ({ list }: { list: OrderType[] }) => {
  const {
    currentPage,
    totalPagesCount,
    totalListCount,
    displayedList,
    handleNextPage,
    handlePreviousPage,
  } = usePaging(list, 4);
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">Tvá historie objednávek ({totalListCount})</h1>
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
  );
};

export default UserOrderHistory;
