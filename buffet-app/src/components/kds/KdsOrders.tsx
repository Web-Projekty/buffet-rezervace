import Loading from "../ui/Loading";
import KdsStatusBar from "./KdsStatusBar";
import KdsOrder from "./KdsOrder";

import KdsDeliveryOrder from "./KdsDeliveryOrder";
import { useKdsOrders } from "../../hooks/useKdsOrders";

const KdsOrders = () => {
  const {
    pendingOrders,
    waitingOrders,
    onStatusChange,
    isLoading,
    items,
    nextOrders,
    delayedOrders,
    upToDateOrders,
    maxSentOrders,
    maxWaitingOrders,
  } = useKdsOrders();

  const renderPendingOrders = () => {
    return (
      pendingOrders &&
      pendingOrders
        .slice(0, maxSentOrders)
        .map((order) => (
          <KdsOrder
            key={order.id}
            order={order}
            onStatusChange={onStatusChange}
            items={items}
          />
        ))
    );
  };

  return (
    <section className="mx-auto flex w-full max-w-[70rem] flex-col justify-center">
      <KdsStatusBar
        delayed={delayedOrders.length}
        uptodate={upToDateOrders.length}
        current={nextOrders.length - maxSentOrders}
        waiting={waitingOrders?.length}
      />

      {isLoading ? (
        <Loading size={30} />
      ) : (
        // ) : error ? (
        //   <p className="text-center text-4xl text-white">{error}</p>
        <div className="flex flex-row items-start justify-between">
          <div className="grid grid-cols-2 grid-rows-2 gap-2 md:grid-cols-3">
            {renderPendingOrders()}
          </div>
          <div className="flex flex-col gap-2">
            {waitingOrders && waitingOrders.length > 0
              ? waitingOrders
                  .slice(0, maxWaitingOrders)
                  .map((order) => (
                    <KdsDeliveryOrder
                      key={order.id}
                      order={order}
                      onStatusChange={onStatusChange}
                      items={items}
                    />
                  ))
              : null}
          </div>
        </div>
      )}
    </section>
  );
};

export default KdsOrders;
