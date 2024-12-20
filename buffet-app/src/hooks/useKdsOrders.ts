import useWebSocket, { ReadyState } from "react-use-websocket";
import { Order } from "../types";
import { useUser } from "./useUser";
import { WEBSOCKET_URL } from "../constants";
import { useEffect, useState } from "react";
import { usePaging } from "./usePaging";

type UseKdsOrdersReturn = {
  pendingOrders: Order[];
  waitingOrders: Order[];
  handlePrepare: (order: Order) => void;
  handlePrepared: (order: Order) => void;
  handlePickedUp: (order: Order) => void;
  handleCancell: (order: Order) => void;
  handleStatusChange: (updatedOrder: Order) => void;
  isLoading: boolean;
  error: string | null;
};

export const useKdsOrders = (): UseKdsOrdersReturn => {
  const { token } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);

  const { sendMessage, lastJsonMessage, readyState } = useWebSocket<{
    payload: { data: Order[] };
  }>(WEBSOCKET_URL("kds"), {
    onOpen: () => {
      if (token) {
        sendMessage(JSON.stringify({ requestType: "subscribe", token }));
      }
    },
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (lastJsonMessage) {
      setOrders(lastJsonMessage.payload.data);
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

  const handleStatusChange = (updatedOrder: Order) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order,
      ),
    );
  };

  const handlePrepare = (order: Order) => {
    handleStatusChange({ ...order, status: "preparing" });
    sendMessage(
      JSON.stringify({
        requestType: "update",
        token,
        data: { ...order, status: "preparing" },
      }),
    );
  };

  const handlePrepared = (order: Order) => {
    const newOrder: Order = { ...order, status: "sent" };
    handleStatusChange(newOrder);
    sendMessage(
      JSON.stringify({
        requestType: "update",
        token,
        data: newOrder,
      }),
    );
  };

  const handlePickedUp = (order: Order) => {
    const newOrder: Order = { ...order, status: "done" };
    handleStatusChange(newOrder);
    sendMessage(
      JSON.stringify({
        requestType: "update",
        token,
        data: newOrder,
      }),
    );
  };

  const handleCancell = (order: Order) => {
    const newOrder: Order = { ...order, status: "cancelled" };
    handleStatusChange(newOrder);
    sendMessage(
      JSON.stringify({
        requestType: "update",
        token,
        data: newOrder,
      }),
    );
  };

  const isLoading: boolean = readyState === ReadyState.CONNECTING;

  const error: string | null =
    readyState === ReadyState.CLOSED ? "Kanál uzavřen" : null;

  return {
    pendingOrders,
    waitingOrders,
    handlePrepare,
    handlePrepared,
    handlePickedUp,
    handleCancell,
    handleStatusChange,
    isLoading,
    error,
  };
};
