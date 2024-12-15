import Loading from "../Loading";
import KdsStatusBar from "./KdsStatusBar";
import { WEBSOCKET_URL } from "../../constants";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Order } from "../../types";
import KdsOrder from "./KdsOrder";

import KdsDeliveryOrder from "./KdsDeliveryOrder";
import { useEffect, useState } from "react";
import { usePaging } from "../../hooks/usePaging";
import { useUser } from "../../hooks/useUser";

const KdsOrders = () => {
  const { token } = useUser();
  const { sendMessage, lastJsonMessage, readyState } = useWebSocket(
    WEBSOCKET_URL("kds"),
    {
      onOpen: () => {
        if (token) {
          sendMessage(JSON.stringify({ requestType: "subscribe", token }));
        }
      },
      shouldReconnect: () => true,
    },
  );

  console.log(lastJsonMessage ? lastJsonMessage.payload : "Čekám na data");

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (lastJsonMessage) {
      setOrders(lastJsonMessage.payload.data);
    }
  }, [lastJsonMessage]);

  const { dataList: pendingOrders } = usePaging<Order>(
    orders
      ?.filter(
        (order) => order.status === "preparing" || order.status === "sent",
      )
      .sort((a, b) => a.pickupDate.localeCompare(b.pickupDate)),
    8,
  );

  const { dataList: waitingOrders } = usePaging<Order>(
    orders?.filter((order) => order.status === "waiting"),
    8,
  );

  const handleStatusChange = (updatedOrder: Order) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order,
      ),
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

      {readyState === ReadyState.CONNECTING ? (
        <Loading size={30} />
      ) : readyState === ReadyState.CLOSED ? (
        <p className="text-center text-4xl text-white">Chyba</p>
      ) : (
        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-wrap gap-2">
            {pendingOrders && pendingOrders.length > 0 ? (
              pendingOrders.map((order) => (
                <KdsOrder
                  key={order.id}
                  order={order}
                  onStatusChange={handleStatusChange}
                />
              ))
            ) : (
              <p className="text-4xl text-white">
                Žádné objevnávky nejsou dostupné
              </p>
            )}
          </div>
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
