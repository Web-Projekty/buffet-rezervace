import { useEffect, useState } from "react";
import { FETCH_URL } from "../constants";
import { Order } from "../types";
import { useFetch } from "./useFetch";
import { useUser } from "./useUser";

type OrderData = {
  data: Order[];
};

const useOrders = () => {
  const { token } = useUser();
  const [orders, setOrders] = useState<OrderData | null>(null);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {
    data: fetchedOrders,
    isLoading: fetchLoading,
    error: fetchError,
  } = useFetch<OrderData>(
    FETCH_URL,
    { requestType: "getOrders", token: token },
    { data: [] },
    [token],
  );

  useEffect(() => {
    if (fetchedOrders && fetchedOrders.data) {
      if (
        !orders ||
        JSON.stringify(orders.data) !== JSON.stringify(fetchedOrders.data)
      ) {
        setOrders(fetchedOrders);
        setLatestOrder(fetchedOrders.data[0]);
      }
    }
    setIsLoading(fetchLoading);
    setError(fetchError);
  }, [fetchedOrders, fetchLoading, fetchError, orders]);

  return { orders, latestOrder, error, isLoading };
};

export default useOrders;
