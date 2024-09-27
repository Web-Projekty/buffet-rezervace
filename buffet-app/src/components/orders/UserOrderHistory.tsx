import Order from "./Order";
import { usePaging } from "../../hooks/usePaging";
import { Order as OrderType } from "../../types";
import PagingButtons from "../PagingButtons";

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
      <PagingButtons
        currentPage={currentPage}
        totalPagesCount={totalPagesCount}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
    </div>
  );
};

export default UserOrderHistory;
