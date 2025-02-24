import { useCallback, useEffect, useMemo, useState } from "react";
import { Order, OrderItem, OrderStatus } from "../types";
import { updateOrder } from "../components/utils/api";
import { formatDate, mapItemsWithOrders } from "../components/utils/utils";
import toast from "react-hot-toast";
import { toastMessages } from "../components/utils/toastMessages";

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

        if (error) {
          toast.error(toastMessages.updateOrder.error);
        } else {
          toast.success(toastMessages.updateOrder.success);
          setStatus(status);
        }

        return {
          order: payload || order,
          error: error,
        };
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
    if (order.pickupDate && order.startTime) {
      const now = new Date().getTime();
      const pickupDateTime = new Date(
        `${order.pickupDate}T${order.startTime}`,
      ).getTime();

      console.log(order.pickUpId + ", " + now, pickupDateTime);

      setDelayed(now > pickupDateTime);
    }
  }, [order]);

  const color = delayed ? "bg-red-400" : getColorByStatus(status);
  const statusText = getTextByStatus(status);
  const dateCreated = formatDate(order.dateCreated, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const pickUpDate = formatDate(order.pickupDate);
  const startTime = order.startTime;
  const endTime = order.endTime;

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
