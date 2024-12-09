import Loading from "../Loading";
import KdsStatusBar from "./KdsStatusBar";
import { WEBSOCKET_URL } from "../../constants";
import useWebSocket, { ReadyState } from "react-use-websocket";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const KdsOrders = () => {
  const token = useAuthHeader()?.split(" ")[1];
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    WEBSOCKET_URL("kds"),
    {
      onOpen: () => {
        if (token) {
          sendMessage(JSON.stringify({ requestType: "subscribe", token }));
        }
      },
    },
  );

  /*const { dataList: pendingOrders } = usePaging<Order>(
    data?.filter(
      (order) => order.status === "preparing" || order.status === "sent",
    ),
    8,
  );

  const { dataList: pickedUpOrders } = usePaging<Order>(
    data?.filter((order) => order.status === "waiting"),
    5,
  );*/

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
            {lastMessage?.data}
            {/*pendingOrders && pendingOrders.length > 0 ? (
              pendingOrders.map((order, index) => (
                <KdsOrder key={index} order={order} />
              ))
            ) : (
              <p className="text-4xl text-white">
                Žádné objevnávky nejsou dostupné
              </p>
            )*/}
          </div>
          <div className="flex flex-col gap-2">
            {/*pickedUpOrders && pickedUpOrders.length > 0
              ? pickedUpOrders.map((order, index) => (
                  <KdsDeliveryOrder key={index} order={order} />
                ))
              : null*/}
          </div>
        </div>
      )}
    </div>
  );
};

export default KdsOrders;
