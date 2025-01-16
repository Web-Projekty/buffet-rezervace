import useWebSocket, { ReadyState } from "react-use-websocket";
import { Order, OrderItem, OrderStatus } from "../types";
import { useUser } from "./useUser";
import { WEBSOCKET_URL } from "../constants";
import { useEffect, useState, useCallback, useMemo } from "react";

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

  useEffect(() => {
    if (lastJsonMessage?.payload) {
      try {
        const { data, items } = lastJsonMessage.payload;
        setOrders(data as Order[]);
        setItems(items as OrderItem[]);
        console.log("Orders:", data);
      } catch {
        setError("Chyba v komunikaci se serverem.");
      }
    }
  }, [lastJsonMessage]);

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

  const handleStatusChange = useCallback(
    (id: number, newStatus: OrderStatus) => {
      if (!token) {
        setError("Přihlaste se prosím.");
        return;
      }
      // sendMessage(JSON.stringify({ requestType: "subscribe", token }));
      sendMessage(
        JSON.stringify({
          requestType: "updateOrder",
          token,
          orderId: id,
          status: newStatus,
        }),
      );

      console.log(lastJsonMessage);
    },
    [token, sendMessage],
  );

  const isLoading: boolean = readyState === ReadyState.CONNECTING;

  useEffect(() => {
    if (readyState === ReadyState.CLOSED) {
      setError("Připojení uzavřeno.");
    }
  }, [readyState]);

  return {
    pendingOrders,
    waitingOrders,
    nextOrdersCount,
    items,
    handleStatusChange,
    isLoading,
    error,
  };
};
