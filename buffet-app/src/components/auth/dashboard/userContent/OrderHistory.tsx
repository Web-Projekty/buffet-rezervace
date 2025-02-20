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
    <section className="flex flex-col gap-2">
      <h1 className="flex items-center gap-2 text-2xl font-bold">
        Tvá historie objednávek
        <span className="flex items-center gap-2">
          ({dataList ? dataList.itemsCount : <Loading size={20} />})
        </span>
      </h1>
      <div className="flex min-h-[27rem] flex-col items-center gap-4">
        <div className="flex w-full gap-[5.4rem] rounded-md bg-backgroundColor px-6 py-2 text-center font-semibold text-descriptionColor md:w-[45rem] md:gap-[8.2rem]">
          <p>ID</p>
          <p>Status</p>
          <p>Čas vyzvednutí</p>
        </div>

        <AnimatePresence>
          {!isLoading ? (
            <ul className="flex flex-col gap-2">
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
      </div>
      {renderPagingButtons()}
    </section>
  );
};

export default OrderHistory;
