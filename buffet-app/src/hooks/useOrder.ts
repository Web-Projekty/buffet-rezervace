import { useCallback, useEffect, useMemo, useState } from "react";
import { Order, OrderItem, OrderStatus } from "../types";
import { updateOrder } from "../components/utils/api";
import { mapItemsWithOrders } from "../components/utils/utils";

export type HandleStatusReturn = {
  order: Order;
  error: boolean;
};

export const useOrder = (order: Order, kds?: boolean, items?: OrderItem[]) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [loading, setLoading] = useState<boolean>(false);
  const [delayed, setDelayed] = useState<boolean>(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const mappedItems = useMemo(
    () => (items ? mapItemsWithOrders(order.items, items) : []),
    [items, order.items],
  );

  const handleStatus = useCallback(
    async (
      status: OrderStatus,
      token: string | null,
    ): Promise<HandleStatusReturn> => {
      setLoading(true);
      try {
        const { payload, error } = await updateOrder(token, order.id, status);

        console.log(payload);

        const data = {
          order: payload || order,
          error: error,
        };
        if (!error) setStatus(status);
        return data;
      } catch (error) {
        console.error(error);
        return { order, error: true };
      } finally {
        setLoading(false);
      }
    },
    [order],
  );

  const handleDelayed = useCallback(() => {
    const now = new Date();
    const pickupDateTime = new Date(`${order.pickupDate}T${order.startTime}`);
    setDelayed(now > pickupDateTime);
  }, [order.pickupDate, order.startTime]);

  const color = delayed ? "bg-red-400" : getColorByStatus(status);
  const statusText = getTextByStatus(status);
  const dateCreated = new Date(order.dateCreated).toLocaleString();
  const pickUpDate = new Date(order.pickupDate).toLocaleDateString();
  const startTime = order.startTime.substring(0, 5);
  const endTime = order.endTime.substring(0, 5);

  useEffect(() => {
    if (
      kds &&
      !delayed &&
      status !== "done" &&
      status !== "cancelled" &&
      status !== "storno"
    ) {
      const intervalId = setInterval(handleDelayed, 1000);
      return () => clearInterval(intervalId);
    }
  }, [status, delayed, kds, handleDelayed]);

  return {
    isOpen,
    toggleOpen,
    color,
    status,
    statusText,
    handleStatus,
    dateCreated,
    pickUpDate,
    startTime,
    endTime,
    loading,
    mappedItems,
  };
};

const getColorByStatus = (status: OrderStatus): string => {
  switch (status) {
    case "sent":
      return "bg-orange-400";
    case "waiting":
      return "bg-[#14ce9c]";
    case "preparing":
      return "bg-yellow-400";
    case "done":
      return "bg-blue-400";
    case "storno":
      return "bg-gray-400";
    case "cancelled":
      return "bg-red-400";
    default:
      return "bg-gray-400";
  }
};

const getTextByStatus = (status: OrderStatus): string => {
  switch (status) {
    case "sent":
      return "Čeká na zpracování";
    case "waiting":
      return "Čeká na vyzvednutí";
    case "preparing":
      return "Připravuje se";
    case "done":
      return "Dokončeno";
    case "storno":
      return "Zrušeno uživatelem";
    case "cancelled":
      return "Zrušeno provozovatelem";
    default:
      return "Neznámý stav";
  }
};
