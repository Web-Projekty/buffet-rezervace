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
    () =>
      pendingOrders.filter((order) => {
        const now = new Date().getTime();
        const pickupDateTime = new Date(
          `${order.pickupDate}T${order.startTime}`,
        ).getTime();
        return now < pickupDateTime;
      }),
    [pendingOrders],
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
    nextOrdersCount,
    items,
    onStatusChange,
    isLoading: !isConnected,
    error,
    delayedOrders,
    upToDateOrders,
  };
};
