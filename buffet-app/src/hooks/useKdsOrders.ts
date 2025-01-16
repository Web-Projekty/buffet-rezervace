import useWebSocket, { ReadyState } from "react-use-websocket";
import { Order, OrderItem, OrderStatus } from "../types";
import { useUser } from "./useUser";
import { WEBSOCKET_URL } from "../constants";
import { useEffect, useState, useCallback } from "react";
import { usePaging } from "./usePaging";

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
      } catch (e) {
        console.error("Error parsing WebSocket message:", e);
        setError("Failed to parse WebSocket message.");
      }
    }
  }, [lastJsonMessage]);

  const { dataList: pendingOrders } = usePaging<Order>(
    orders
      ?.filter(
        (order) => order.status === "preparing" || order.status === "sent",
      )
      .sort((a, b) => a.pickupDate.localeCompare(b.pickupDate)),
    8,
  );

  const { dataList: waitingOrders } = usePaging<Order>(
    orders
      ?.filter((order) => order.status === "waiting")
      .sort((b, a) => a.pickupDate.localeCompare(b.pickupDate)),
    8,
  );

  const handleStatusChange = useCallback(
    (id: number, newStatus: OrderStatus) => {
      if (!token) {
        setError("User token is missing.");
        return;
      }
      sendMessage(JSON.stringify({ requestType: "subscribe", token }));
      // sendMessage(
      //   JSON.stringify({
      //     requestType: "createOrder",
      //     token,
      //     orderId: id,
      //     status: newStatus,
      //   }),
      // );
    },
    [token, sendMessage],
  );

  const isLoading: boolean = readyState === ReadyState.CONNECTING;

  useEffect(() => {
    if (readyState === ReadyState.CLOSED) {
      setError("WebSocket connection closed.");
    }
  }, [readyState]);

  return {
    pendingOrders,
    waitingOrders,
    items,
    handleStatusChange,
    isLoading,
    error,
  };
};
