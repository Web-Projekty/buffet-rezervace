import { dummyOrders } from "../../dummyData";
import { usePaging } from "../../hooks/usePaging";
import Order from "./Order";

const OrderHistory = () => {
  const {
    currentPage,
    totalPages,
    displayedOrders,
    handleNextPage,
    handlePreviousPage,
  } = usePaging(dummyOrders, 4);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">
        Tvá historie objednávek ({dummyOrders.length})
      </h1>
      <ul className="flex flex-col gap-2">
        {displayedOrders.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </ul>
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

export default OrderHistory;
