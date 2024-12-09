import Loading from "../Loading";
import KdsStatusBar from "./KdsStatusBar";
import { WEBSOCKET_URL } from "../../constants";
import useWebSocket, { ReadyState } from "react-use-websocket";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Order } from "../../types";
import KdsOrder from "./KdsOrder";
import { usePaging } from "../../hooks/usePaging";
import KdsDeliveryOrder from "./KdsDeliveryOrder";

type PayloadType = {
  data?: Order[];
  msg?: string;
};

type WebSocketType = {
  status: string;
  payload: PayloadType;
};

const KdsOrders = () => {
  const token = useAuthHeader()?.split(" ")[1];
  const { sendMessage, lastJsonMessage, readyState } =
    useWebSocket<WebSocketType>(WEBSOCKET_URL("kds"), {
      onOpen: () => {
        if (token) {
          sendMessage(JSON.stringify({ requestType: "subscribe", token }));
        }
      },
      shouldReconnect: () => true,
    });

  console.log(lastJsonMessage ? lastJsonMessage.payload : "Čekám na data");

  const { dataList: pendingOrders } = usePaging<Order>(
    lastJsonMessage?.payload.data?.filter(
      (order) => order.status === "preparing" || order.status === "sent",
    ),
    8,
  );

  const { dataList: pickedUpOrders } = usePaging<Order>(
    lastJsonMessage?.payload.data?.filter(
      (order) => order.status === "waiting",
    ),
    5,
  );

  return (
    <div className="mx-auto flex w-[85.5%] flex-col justify-center">
      <KdsStatusBar delayed={0} uptodate={0} current={0} waiting={0} />

      {readyState === ReadyState.CONNECTING ? (
        <Loading size={30} />
      ) : readyState === ReadyState.CLOSED ? (
        <p className="text-center text-4xl text-white">Chyba</p>
      ) : (
        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-wrap gap-2">
            {pendingOrders && pendingOrders.length > 0 ? (
              pendingOrders.map((order, index) => (
                <KdsOrder key={index} order={order} />
              ))
            ) : (
              <p className="text-4xl text-white">
                Žádné objevnávky nejsou dostupné
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {pickedUpOrders && pickedUpOrders.length > 0
              ? pickedUpOrders.map((order, index) => (
                  <KdsDeliveryOrder key={index} order={order} />
                ))
              : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default KdsOrders;
