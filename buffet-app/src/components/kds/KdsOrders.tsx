import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useFetch from "../../hooks/useFetch";
import { Order } from "../../types";
import KdsDeliveryOrder from "./KdsDeliveryOrder";
import KdsOrder from "./KdsOrder";

import { usePaging } from "../../hooks/usePaging";
import Loading from "../Loading";
import KdsStatusBar from "./KdsStatusBar";
import { FETCH_URL } from "../../constants";

const KdsOrders = () => {
  const token = useAuthHeader()?.split(" ")[1];
  const { data, error, isLoading } = useFetch<Order[]>(
    FETCH_URL,
    { requestType: "getOrders", token: token },
    [],
    [token],
  );

  const { dataList: pendingOrders } = usePaging<Order>(
    data?.filter((order) => order.status !== "pickedup"),
    8,
  );
  const { dataList: pickedUpOrders } = usePaging<Order>(
    data?.filter((order) => order.status === "pickedup"),
    5,
  );

  return (
    <div className="mx-auto flex w-[85.5%] flex-col justify-center">
      <KdsStatusBar />

      {isLoading ? (
        <Loading size={30} />
      ) : error ? (
        <p className="text-center text-4xl text-white">{error}</p>
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
            {pickedUpOrders && !(pickedUpOrders.length < 1)
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
