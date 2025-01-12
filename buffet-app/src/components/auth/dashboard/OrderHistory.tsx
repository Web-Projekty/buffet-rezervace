import Order from "../../orders/Order";
import { AnimatePresence } from "framer-motion";
import { ORDERS_PER_PAGE } from "../../../constants";
import Loading from "../../ui/Loading";
import { Order as OrderType } from "../../../types";
import PagingButtons from "../../ui/PagingButtons";
import { useBackendPaging } from "../../../hooks/useBackendPaging";
import { lazy, Suspense, useCallback } from "react";
import { Fallback } from "../../../main";

const HorizontalPaging = lazy(() => import("../../ui/HorizontalPaging"));

type OrderHistoryData = {
  data: OrderType[];
  itemsCount: number;
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

  const renderPagingButtons = useCallback(() => {
    return (
      <Suspense fallback={<Fallback />}>
        <HorizontalPaging backgroundType={2}>
          <PagingButtons
            currentPage={currentPage}
            totalPagesCount={totalPagesCount}
            listOfPages={arrayOfPages}
            handlePage={handlePage}
          />
        </HorizontalPaging>
      </Suspense>
    );
  }, [currentPage, totalPagesCount, arrayOfPages, handlePage]);

  if (isLoading) {
    return <Loading size={30} />;
  }

  if (error) {
    return <div className="text-white">{error}</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">
        Tvá historie objednávek ({dataList?.itemsCount})
      </h1>
      <div className="flex min-h-[25rem] flex-col justify-between gap-4">
        <AnimatePresence>
          <ul className="flex flex-col items-center gap-2">
            {dataList?.data?.map((order) => (
              <Order key={order.pickUpId + "" + order.userId} order={order} />
            ))}
          </ul>
        </AnimatePresence>
        {renderPagingButtons()}
      </div>
    </div>
  );
};

export default OrderHistory;
