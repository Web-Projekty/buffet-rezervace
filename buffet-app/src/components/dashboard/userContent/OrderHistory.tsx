import { AnimatePresence } from "framer-motion";
import { lazy, Suspense, useCallback } from "react";
import { ORDERS_PER_PAGE } from "../../../constants";
import { useBackendPaging } from "../../../hooks/useBackendPaging";
import { Fallback } from "../../../main";
import { OrdersData } from "../../../types";
import Order from "../../orders/Order";
import Loading from "../../ui/Loading";
import PagingButtons from "../../ui/PagingButtons";
import FetchError from "../../error/FetchError";

const HorizontalPaging = lazy(() => import("../../ui/HorizontalPaging"));

const OrderHistory = () => {
  const {
    currentPage,
    dataList,
    arrayOfPages,
    handlePage,
    isLoading,
    error,
    refetch,
  } = useBackendPaging<OrdersData>(
    "getOrders",
    ORDERS_PER_PAGE,
    true,
    "orderPage",
    "orders",
  );

  console.log(dataList?.variants);

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

  return (
    <section className="flex w-full flex-col gap-2">
      <h1 className="flex items-center gap-2 text-2xl font-bold">
        Tvá historie objednávek
        <span className="flex items-center gap-2">
          (
          {dataList ? (
            dataList.itemsCount > 0 ? (
              dataList.itemsCount
            ) : (
              0
            )
          ) : (
            <Loading size={20} />
          )}
          )
        </span>
      </h1>
      <div className="flex min-h-[27rem] flex-col items-center gap-4">
        <div className="flex w-full items-center gap-[5.4rem] rounded-md bg-backgroundColor px-6 py-2 text-center font-semibold text-descriptionColor md:w-[45rem] md:gap-[8.2rem]">
          <p>ID</p>
          <p>Status</p>
          <p>Čas vyzvednutí</p>
        </div>
        <AnimatePresence>
          {isLoading ? (
            <Loading />
          ) : error ? (
            <FetchError refetch={refetch} />
          ) : (
            <ul className="flex w-full max-w-[45rem] flex-col gap-2">
              {dataList?.data?.map((order) => (
                <Order
                  key={order.pickUpId + "" + order.userId}
                  order={order}
                  items={dataList?.items}
                  variants={dataList?.variants}
                />
              ))}
            </ul>
          )}
        </AnimatePresence>
      </div>
      {renderPagingButtons()}
    </section>
  );
};

export default OrderHistory;
