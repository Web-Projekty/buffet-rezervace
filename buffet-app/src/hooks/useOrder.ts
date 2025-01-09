import { useEffect, useState } from "react";
import { Order, OrderStatus } from "../types";
import { getColorByStatus, getTextByStatus } from "../components/utils/utils";
import { updateOrder } from "../components/utils/api";

export type UseStatusOrderReturn = {
  isOpen: boolean;
  toggleOpen: () => void;
  color: string;
  status: OrderStatus;
  statusText: string;
  handleStatus: (status: OrderStatus, token: string | null) => void;
  dateCreated: string;
  pickUpDate: string;
  startTime: string;
  endTime: string;
};

export const useOrder = (order: Order): UseStatusOrderReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>(getColorByStatus(order.status));
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [statusText, setStatusText] = useState<string>(
    getTextByStatus(order.status),
  );

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleStatus = async (status: OrderStatus, token: string | null) => {
    if (token) {
      try {
        const { order: newOrder, error } = await updateOrder(
          token,
          order.id,
          status,
        );
        setStatus(newOrder.status);
      } catch {
        setStatus(order.status);
      }
    }
  };

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
  };
};
