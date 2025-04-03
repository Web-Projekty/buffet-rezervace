import { MenuItem, Order, OrderItem, Variant } from "../types";
import { useUser } from "./useUser";
import { useEffect, useState, useMemo, useRef } from "react";
import { WebSocketService } from "../components/utils/webSockets";

export const useKdsOrders = () => {
  const { token } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocketService<{
    payload: {
      data: Order[];
      items?: OrderItem[];
      itemsCount?: number;
      variants?: MenuItem["variants"];
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
        if (message.eventType === "createOrder") {
          const incomingOrder = message.payload.data[0];
          if (incomingOrder) {
            incomingOrder.items =
              typeof incomingOrder.items === "string"
                ? JSON.parse(incomingOrder.items)
                : incomingOrder.items;

            setOrders((prevOrders) => {
              const existingOrderIndex = prevOrders.findIndex(
                (order) => order.id === incomingOrder.id,
              );

              if (existingOrderIndex !== -1) {
                const existingOrder = prevOrders[existingOrderIndex];

                if (!existingOrder.paid && incomingOrder.paid) {
                  console.log(
                    `Order ${incomingOrder.id} payment status updated to paid`,
                  );

                  return [
                    ...prevOrders.slice(0, existingOrderIndex),
                    incomingOrder,
                    ...prevOrders.slice(existingOrderIndex + 1),
                  ];
                }

                console.log(
                  `Order ${incomingOrder.id} already exists, no payment update needed`,
                );
                return prevOrders;
              }

              // If it's a new order, add it to the list
              return [...prevOrders, incomingOrder];
            });
          }
        } else if (message.eventType === "updateOrder") {
          setOrders((prevOrders) => {
            if (!message.payload.data.length) return prevOrders;
            const index = prevOrders.findIndex(
              (order) => order.id === message.payload.data[0].id,
            );
            if (index === -1) return prevOrders;
            return [
              ...prevOrders.slice(0, index),
              message.payload.data[0],
              ...prevOrders.slice(index + 1),
            ];
          });
          console.log("Order updated:", message.payload.data);
        } else {
          setOrders(message.payload.data);
          setItems(message.payload.items ? message.payload.items : []);
          setVariants(message.payload.variants ? message.payload.variants : []);
          console.log("Set all new orders:", message.payload);
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
            .sort((a, b) => {
              if (a.status === "preparing" && b.status === "sent") return -1;
              if (a.status === "sent" && b.status === "preparing") return 1;

              return a.pickupDate.localeCompare(b.pickupDate);
            })
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

  return {
    pendingOrders,
    waitingOrders,
    items,
    isLoading: !isConnected,
    error,
    delayedOrders,
    upToDateOrders,
    maxSentOrders,
    maxWaitingOrders,
    variants,
  };
};
