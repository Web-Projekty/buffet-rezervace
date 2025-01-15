import Loading from "../ui/Loading";
import KdsStatusBar from "./KdsStatusBar";
import KdsOrder from "./KdsOrder";

import KdsDeliveryOrder from "./KdsDeliveryOrder";
import { useKdsOrders } from "../../hooks/useKdsOrders";

const KdsOrders = () => {
  const { pendingOrders, waitingOrders, handleStatusChange, isLoading, error } =
    useKdsOrders();

  const renderPendingOrders = () => {
    return pendingOrders && pendingOrders.length > 0 ? (
      pendingOrders.map((order) => (
        <KdsOrder
          key={order.id}
          order={order}
          onStatusChange={handleStatusChange}
        />
      ))
    ) : (
      <p className="text-4xl text-white">Žádné objevnávky nejsou dostupné</p>
    );
  };

  return (
    <div className="mx-auto flex w-[85.5%] flex-col justify-center">
      <KdsStatusBar
        delayed={
          pendingOrders.filter(
            (order) => new Date(order.pickupDate).getTime() < Date.now(),
          ).length
        }
        uptodate={
          pendingOrders.filter(
            (order) => new Date(order.pickupDate).getTime() > Date.now(),
          ).length
        }
        current={0}
        waiting={waitingOrders?.length}
      />

      {isLoading ? (
        <Loading size={30} />
      ) : error ? (
        <p className="text-center text-4xl text-white">{error}</p>
      ) : (
        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-wrap gap-2">{renderPendingOrders()}</div>
          <div className="flex flex-col gap-2">
            {waitingOrders && waitingOrders.length > 0
              ? waitingOrders.map((order) => (
                  <KdsDeliveryOrder
                    key={order.id}
                    order={order}
                    onStatusChange={handleStatusChange}
                  />
                ))
              : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default KdsOrders;
