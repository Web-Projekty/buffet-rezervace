import useWebSocket, { ReadyState } from "react-use-websocket";
import { Order, OrderItem } from "../types";
import { useUser } from "./useUser";
import { WEBSOCKET_URL } from "../constants";
import { useEffect, useState, useMemo } from "react";

export const useKdsOrders = () => {
  const { token } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { sendMessage, lastJsonMessage, readyState } = useWebSocket(
    WEBSOCKET_URL("kds"),
    {
      onOpen: () => {
        if (token) {
          sendMessage(JSON.stringify({ requestType: "subscribe", token }));
        }
      },
      shouldReconnect: () => true,
      // reconnectInterval: 5000,
      /*onError: () => {
        setError("Chyba v komunikaci se serverem.");
      },*/
    },
  );

  const pendingOrders = useMemo(
    () =>
      orders
        ? orders
            .filter(
              (order) =>
                order.status === "preparing" || order.status === "sent",
            )
            .sort((a, b) => a.pickupDate.localeCompare(b.pickupDate))
            .slice(0, 6)
        : [],
    [orders, orders.filter((order) => order.status === "sent").length],
  );

  const waitingOrders = useMemo(
    () =>
      orders
        ? orders
            .filter((order) => order.status === "waiting")
            .sort((b, a) => a.pickupDate.localeCompare(b.pickupDate))
            .slice(0, 10)
        : [],
    [orders],
  );

  const nextOrdersCount: number = useMemo(
    () =>
      orders && orders.length > 0
        ? orders.filter(
            (order) =>
              order.status !== "cancelled" &&
              order.status !== "storno" &&
              order.status !== "done",
          ).length -
          orders.filter(
            (order) => order.status === "preparing" || order.status === "sent",
          ).length -
          orders.filter((order) => order.status === "waiting").length
        : 0,
    [orders, pendingOrders, waitingOrders],
  );

  const onStatusChange = (updatedOrder: Order) => {
    setOrders((prevOrders) => {
      const newOrders = prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order,
      );
      return [...newOrders];
    });
  };

  const isLoading: boolean = readyState === ReadyState.CONNECTING;

  useEffect(() => {
    if (lastJsonMessage?.payload.data && lastJsonMessage?.payload.items) {
      try {
        const { data, items } = lastJsonMessage.payload;
        setOrders((prev) => (prev === data ? prev : (data as Order[])));
        setItems(items as OrderItem[]);
        console.log(lastJsonMessage.payload);
      } catch {
        setError("Chyba v komunikaci se serverem.");
      }
    }
  }, [lastJsonMessage]);

  return {
    pendingOrders,
    waitingOrders,
    nextOrdersCount,
    items,
    onStatusChange,
    isLoading,
    error,
  };
};
