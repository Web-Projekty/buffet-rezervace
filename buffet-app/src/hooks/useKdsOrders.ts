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
      onError: () => {
        setError("Chyba v komunikaci se serverem.");
      },
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
    [orders],
  );

  const waitingOrders = useMemo(
    () =>
      orders
        ? orders
            .filter((order) => order.status === "waiting")
            .sort((b, a) => a.pickupDate.localeCompare(b.pickupDate))
            .slice(0, 5)
        : [],
    [orders],
  );

  const nextOrdersCount: number = useMemo(
    () =>
      orders ? orders.length - pendingOrders.length - waitingOrders.length : 0,
    [orders, pendingOrders, waitingOrders],
  );

  const onStatusChange = (updatedOrder: Order) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order,
      ),
    );
  };

  const isLoading: boolean = readyState === ReadyState.CONNECTING;

  useEffect(() => {
    if (readyState === ReadyState.CLOSED) {
      setError("Připojení uzavřeno.");
    }
  }, [readyState]);

  useEffect(() => {
    if (lastJsonMessage?.payload.data && lastJsonMessage?.payload.items) {
      try {
        const { data, items } = lastJsonMessage.payload;
        setOrders(data as Order[]);
        setItems(items as OrderItem[]);
        console.log(data);
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
