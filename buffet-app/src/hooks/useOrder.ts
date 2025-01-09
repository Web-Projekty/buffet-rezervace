import { useCallback, useEffect, useState } from "react";
import { Order, OrderStatus } from "../types";
import { updateOrder } from "../components/utils/api";

export type UseStatusOrderReturn = {
  isOpen: boolean;
  toggleOpen: () => void;
  color: string;
  status: OrderStatus;
  statusText: string;
  handleStatus: (
    status: OrderStatus,
    token: string | null,
  ) => Promise<HandleStatusReturn>;
  dateCreated: string;
  pickUpDate: string;
  startTime: string;
  endTime: string;
  loading: boolean;
};

type HandleStatusReturn = {
  order: Order;
  error: boolean;
};

export const useOrder = (order: Order): UseStatusOrderReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>(getColorByStatus(order.status));
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [statusText, setStatusText] = useState<string>(
    getTextByStatus(order.status),
  );
  const [loading, setLoading] = useState<boolean>(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

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
          order: updatedOrder,
          error: error,
        };
        if (!error) setStatus(updatedOrder.status);
        return data;
      } catch (error) {
        console.error(error);
        return { order, error: true };
      } finally {
        setLoading(false);
      }
    },
    [order.id],
  );

  const handleDelayed = () => {
    setColor("bg-red-400");
  };

  const dateCreated = new Date(order.dateCreated).toLocaleString();

  const pickUpDate = new Date(order.pickupDate).toLocaleDateString();
  const startTime = order.startTime.substring(0, 5);
  const endTime = order.endTime.substring(0, 5);

  const checkDelayed = () => {
    const currentTime = new Date().getTime();
    const pickupTime = new Date(order.pickupDate).getTime();
    return currentTime > pickupTime;
  };

  useEffect(() => {
    setColor(checkDelayed() ? "bg-red-400" : getColorByStatus(status));
    setStatusText(getTextByStatus(status));

    if (!checkDelayed()) {
      const intervalId = setInterval(() => {
        handleDelayed();
      }, 1000);
      return () => clearInterval(intervalId);
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
  };
};

const getColorByStatus = (status: OrderStatus): string => {
  switch (status) {
    case "sent":
      return "bg-orange-400";
    case "waiting":
      return "bg-[#14ce9c]";
    case "done":
      return "bg-green-500";
    case "storno":
      return "bg-red-400";
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
