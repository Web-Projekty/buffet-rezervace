import { useEffect, useState } from "react";
import { Order, OrderStatus } from "../types";
import { getColorByStatus, getTextByStatus } from "../components/utils/utils";

type UseStatusOrderReturn = {
  isOpen: boolean;
  toggleOpen: () => void;
  color: string;
  status: OrderStatus;
  statusText: string;
  handleStatus: (status: OrderStatus) => void;
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

  const handleStatus = (status: OrderStatus) => {
    setStatus(status);
  };

  const handleDelayed = () => {
    setColor("bg-red-400");
  };

  //console.log(new Date(order.pickupDate).toLocaleString());

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

  return { isOpen, toggleOpen, color, status, statusText, handleStatus };
};
