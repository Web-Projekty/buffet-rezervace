import Loading from "../Loading";
import KdsStatusBar from "./KdsStatusBar";
import { WEBSOCKET_URL } from "../../constants";
import useWebSocket, { ReadyState } from "react-use-websocket";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Order } from "../../types";
import KdsOrder from "./KdsOrder";
import { usePaging } from "../../hooks/usePaging";
import KdsDeliveryOrder from "./KdsDeliveryOrder";
import { extractToken } from "../utils/utils";

const KdsOrders = () => {
  const authHeader = useAuthHeader();
  const token = extractToken(authHeader);
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

  const { dataList: pendingOrders } = usePaging<Order>(
    (lastJsonMessage?.payload.data || []).filter(
      (order: Order) => order.status === "preparing" || order.status === "sent",
    ),
    8,
  );

  const { dataList: waitingOrders } = usePaging<Order>(
    (lastJsonMessage?.payload.data || []).filter(
      (order: Order) => order.status === "waiting",
    ),
    5,
  );

  return (
    <div className="mx-auto flex w-[85.5%] flex-col justify-center">
      <KdsStatusBar
        delayed={
          pendingOrders.filter(
            (order) => parseInt(order.pickupDate) < Date.now(),
          ).length
        }
        uptodate={
          pendingOrders.filter(
            (order) => parseInt(order.pickupDate) > Date.now(),
          ).length
        }
        current={0}
        waiting={waitingOrders.length}
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
                <KdsOrder key={order.id} order={order} />
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
                  <KdsDeliveryOrder key={order.id} order={order} />
                ))
              : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default KdsOrders;
