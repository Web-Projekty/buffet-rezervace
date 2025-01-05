import Order from "./Order";
import { usePaging } from "../../hooks/usePaging";
import { AnimatePresence } from "framer-motion";
import { ORDERS_PER_PAGE } from "../../constants";
import Loading from "../ui/Loading";
import useOrders from "../../hooks/useOrders";
import { Order as OrderType } from "../../types";
import PagingButtons from "../ui/PagingButtons";

const OrderHistory = () => {
  const { orders, isLoading, error } = useOrders();

  const { currentPage, totalPagesCount, dataList, arrayOfPages, handlePage } =
    usePaging<OrderType>(
      orders?.data ? orders.data : [],
      ORDERS_PER_PAGE,
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
        Tvá historie objednávek ({orders?.data.length})
      </h1>
      <div className="flex min-h-[25rem] flex-col justify-between gap-2">
        <AnimatePresence>
          <ul className="flex flex-col items-center gap-2">
            {dataList.map((order) => (
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
