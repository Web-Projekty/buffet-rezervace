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
  const [color, setColor] = useState<string>(getColorByStatus(order.status));
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [statusText, setStatusText] = useState<string>(
    getTextByStatus(order.status),
  );
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
        const { order: updatedOrder, error } = await updateOrder(
          token,
          order.id,
          status,
        );

        const data = {
          order: updatedOrder || order,
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

  const handleDelayed = () => {
    const checkDelayed = () => {
      const now = new Date();
      const pickupDateTime = new Date(`${order.pickupDate}T${order.startTime}`);
      return now > pickupDateTime;
    };

    if (checkDelayed()) {
      setDelayed(true);
      setColor("bg-red-400");
    } else {
      setColor(getColorByStatus(status));
    }
  };

  const dateCreated = useMemo(
    () => new Date(order.dateCreated).toLocaleString(),
    [order.dateCreated],
  );
  const pickUpDate = useMemo(
    () => new Date(order.pickupDate).toLocaleDateString(),
    [order.pickupDate],
  );
  const startTime = useMemo(
    () => order.startTime.substring(0, 5),
    [order.startTime],
  );
  const endTime = useMemo(() => order.endTime.substring(0, 5), [order.endTime]);

  useEffect(() => {
    setColor(delayed ? "bg-red-400" : getColorByStatus(status));
    setStatusText(getTextByStatus(status));
  }, [delayed, status, order.pickupDate]);

  useEffect(() => {
    if (kds) {
      if (
        !delayed &&
        status !== "done" &&
        status !== "cancelled" &&
        status !== "storno"
      ) {
        const intervalId = setInterval(() => {
          handleDelayed();
        }, 1000);
        return () => clearInterval(intervalId);
      }
    }
  }, [status, order.pickupDate]);

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
