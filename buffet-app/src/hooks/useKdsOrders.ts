import { Order, OrderItem } from "../types";
import { useUser } from "./useUser";
import { useEffect, useState, useMemo, useRef } from "react";
import { WebSocketService } from "../components/utils/webSockets";

export const useKdsOrders = () => {
  const { token } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocketService<{
    payload: {
      data: Order[];
      items: OrderItem[];
    };
    status?: "success" | "error";
    eventType?: "createOrder" | "updateOrder";
  }> | null>(null);

  const maxSentOrders = 6;
  const maxWaitingOrders = 10;

  useEffect(() => {
    wsRef.current = new WebSocketService("kds");

    wsRef.current.connect(
      // onMessage
      (message) => {
        if (message.status === "success") {
          setOrders(message.payload.data);
          setItems(message.payload.items);
        } else {
          if (message.eventType === "createOrder") {
            setOrders((prevOrders) => [...prevOrders, message.payload.data[0]]);
          }
        }
      },
      // onOpen
      () => {
        setIsConnected(true);
        if (token) {
          wsRef.current?.send({ requestType: "subscribe", token });
        }
      },
      // onClose
      () => {
        setIsConnected(false);
        setError("Připojení bylo přerušeno.");
      },
      // onError
      () => {
        setError("Chyba v komunikaci se serverem.");
      },
    );

    return () => {
      wsRef.current?.disconnect();
    };
  }, [token]);

  const pendingOrders = useMemo(
    () =>
      orders
        ? orders
            .filter(
              (order) =>
                order.status === "preparing" || order.status === "sent",
            )
            .sort((a, b) => a.pickupDate.localeCompare(b.pickupDate))
        : [],
    [orders],
  );

  const waitingOrders = useMemo(
    () =>
      orders
        ? orders
            .filter((order) => order.status === "waiting")
            .sort((b, a) => a.pickupDate.localeCompare(b.pickupDate))
        : [],
    [orders],
  );

  const delayedOrders = useMemo(
    () =>
      pendingOrders.filter((order) => {
        const now = new Date().getTime();
        const pickupDateTime = new Date(
          `${order.pickupDate}T${order.startTime}`,
        ).getTime();
        return now > pickupDateTime;
      }),
    [pendingOrders],
  );

  const upToDateOrders = useMemo(
    () => pendingOrders.filter((order) => delayedOrders.indexOf(order) === -1),
    [pendingOrders, delayedOrders],
  );

  const onStatusChange = (updatedOrder: Order) => {
    setOrders((prevOrders) => {
      const newOrders = prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order,
      );
      return [...newOrders];
    });
  };

  return {
    pendingOrders,
    waitingOrders,
    items,
    onStatusChange,
    isLoading: !isConnected,
    error,
    delayedOrders,
    upToDateOrders,
    maxSentOrders,
    maxWaitingOrders,
  };
};
