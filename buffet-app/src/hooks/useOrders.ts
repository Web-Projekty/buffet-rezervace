import { useEffect, useState } from "react";
import { useFetch } from "./useFetch";
import { useUser } from "./useUser";
import { Order, OrdersData } from "../types";
import { FETCH_URL } from "../constants";

const useOrders = (itemsCount: "all" | number, page?: number) => {
  const { token } = useUser();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {
    data: fetchedOrders,
    isLoading: fetchLoading,
    error: fetchError,
  } = useFetch<OrdersData>(
    FETCH_URL,
    {
      requestType: "getOrders",
      token: token,
      page: page ? page : undefined,
      itemsCount: itemsCount === "all" ? undefined : itemsCount,
    },
    { data: [], itemsCount: 0, items: [] },
    [token],
  );

  useEffect(() => {
    if (fetchedOrders && fetchedOrders.data) {
      // const sortedOrders = [...fetchedOrders.data].sort((a, b) => {
      //   return (
      //     new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
      //   );
      // });

      if (
        !orders ||
        JSON.stringify(orders) !== JSON.stringify(fetchedOrders.data)
      ) {
        setOrders(fetchedOrders.data);
        setLatestOrder(fetchedOrders.data[0]);
      }
    }
    setIsLoading(fetchLoading);
    setError(fetchError);
  }, [fetchedOrders, fetchLoading, fetchError]);

  return {
    orders,
    latestOrder,
    error,
    isLoading,
    fetchedItems: fetchedOrders?.items,
  };
};

export default useOrders;
