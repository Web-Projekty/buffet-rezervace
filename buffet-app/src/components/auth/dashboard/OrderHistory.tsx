import Order from "../../orders/Order";
import { AnimatePresence } from "framer-motion";
import { ORDERS_PER_PAGE } from "../../../constants";
import Loading from "../../ui/Loading";
import { Order as OrderType } from "../../../types";
import PagingButtons from "../../ui/PagingButtons";
import { useBackendPaging } from "../../../hooks/useBackendPaging";

type OrderHistoryData = {
  data: OrderType[];
};

const OrderHistory = () => {
  const {
    currentPage,
    totalPagesCount,
    dataList,
    arrayOfPages,
    handlePage,
    isLoading,
    error,
  } = useBackendPaging<OrderHistoryData>(
    "getOrders",
    ORDERS_PER_PAGE,
    true,
    "orderPage",
  );

  if (isLoading) {
    return <Loading size={30} />;
  }

  if (error) {
    return <div className="text-white">{error}</div>;
  }

  return (
    <div className="flex w-auto flex-col gap-2">
      <h1 className="text-2xl font-bold">
        Tvá historie objednávek ({dataList?.data.length})
      </h1>
      <div className="flex min-h-[25rem] flex-col justify-between gap-2">
        <AnimatePresence>
          <ul className="flex flex-col items-center gap-2">
            {dataList?.data?.map((order) => (
              <Order key={order.pickUpId + "" + order.userId} order={order} />
            ))}
          </ul>
        </AnimatePresence>
        <PagingButtons
          currentPage={currentPage}
          totalPagesCount={totalPagesCount}
          listOfPages={arrayOfPages}
          handlePage={handlePage}
        />
      </div>
    </div>
  );
};

export default OrderHistory;
