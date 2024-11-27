import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useFetch from "../../hooks/useFetch";
import { Order } from "../../types";
import KdsDeliveryOrder from "./KdsDeliveryOrder";
import KdsOrder from "./KdsOrder";
import KdsStatusCards from "./KdsStatusCards";
import { useEffect } from "react";
import { usePaging } from "../../hooks/usePaging";

const KdsOrders = () => {
  const token = useAuthHeader()?.split(" ")[1];
  const { data, error, isLoading } = useFetch<Order[]>(
    "https://wlczak.vlastas.cc/backend/api",
    { requestType: "getOrders", token: token },
    [],
    [token],
  );

  const { dataList } = usePaging<Order>(data, 5);

  useEffect(() => {
    console.log("Fetched data:", data);
  }, [data]);

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-white">Error: {error}</div>;
  }

  return (
    <div className="mx-auto flex w-[85.5%] flex-col justify-center">
      {/* KDS Orders Status */}
      <div className="my-2 flex h-[5rem] w-full items-center justify-between bg-white px-10">
        <div className="flex flex-row items-center gap-10">
          <KdsStatusCards
            amount={1}
            title="Zpožděné"
            backgroundColor="bg-red-400"
          />
          <KdsStatusCards
            amount={3}
            title="Aktuální"
            backgroundColor="bg-orange-400"
          />
          <KdsStatusCards
            amount={2}
            title="Nadcházející"
            backgroundColor="bg-yellow-400"
          />
        </div>
        <KdsStatusCards
          amount={6}
          title="Výdej"
          backgroundColor="bg-green-400"
        />
      </div>

      {/* KDS Orders */}
      <div className="flex flex-row items-start justify-between">
        <div className="flex flex-wrap gap-2">
          {dataList ? (
            dataList.map((order, index) => (
              <KdsOrder key={index} order={order} />
            ))
          ) : (
            <p className="text-4xl">No orders available</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {dataList ? (
            dataList.map((order, index) => (
              <KdsDeliveryOrder key={index} order={order} />
            ))
          ) : (
            <p className="text-4xl">No orders available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default KdsOrders;
