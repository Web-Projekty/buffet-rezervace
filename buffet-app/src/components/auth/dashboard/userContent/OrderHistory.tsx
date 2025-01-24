import { AnimatePresence } from "framer-motion";
import { lazy, Suspense, useCallback } from "react";
import { ORDERS_PER_PAGE } from "../../../../constants";
import { useBackendPaging } from "../../../../hooks/useBackendPaging";
import { Fallback } from "../../../../main";
import { OrdersData } from "../../../../types";
import Order from "../../../orders/Order";
import Loading from "../../../ui/Loading";
import PagingButtons from "../../../ui/PagingButtons";

const HorizontalPaging = lazy(() => import("../../../ui/HorizontalPaging"));

const OrderHistory = () => {
  const { currentPage, dataList, arrayOfPages, handlePage, isLoading, error } =
    useBackendPaging<OrdersData>(
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
            listOfPages={arrayOfPages}
            handlePage={handlePage}
          />
        </HorizontalPaging>
      </Suspense>
    );
  }, [currentPage, arrayOfPages, handlePage]);

  if (error) {
    return <div className="text-white">{error}</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="flex items-center gap-2 text-2xl font-bold">
        Tvá historie objednávek
        <span className="flex items-center gap-2">
          ({dataList ? dataList.itemsCount : <Loading size={20} />})
        </span>
      </h1>
      <div className="flex min-h-[26rem] flex-col justify-between gap-4">
        <AnimatePresence>
          {!isLoading ? (
            <ul className="flex flex-col items-center gap-2">
              {dataList?.data?.map((order) => (
                <Order
                  key={order.pickUpId + "" + order.userId}
                  order={order}
                  items={dataList?.items}
                />
              ))}
            </ul>
          ) : (
            <Loading size={30} />
          )}
        </AnimatePresence>
        {renderPagingButtons()}
      </div>
    </div>
  );
};

export default OrderHistory;
