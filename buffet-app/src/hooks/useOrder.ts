import { useEffect, useState } from "react";
import { Order, OrderStatus } from "../types";
import { getColorByStatus, statusToText } from "../components/utils/utils";

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
    statusToText(order.status),
  );
  const [delayed, setDelayed] = useState<boolean>(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleStatus = (status: OrderStatus) => {
    setStatus(status);
  };

  const handleDelayed = () => {
    setDelayed(true);
    setColor("bg-red-500");
  };

  useEffect(() => {
    setColor(getColorByStatus(status));
    setStatusText(statusToText(status));
  }, [status]);

  useEffect(() => {
    if (status === "sent" && !delayed) {
      const intervalId = setInterval(() => {
        const currentTime = new Date().getTime();
        const pickupTime = new Date(order.pickupDate).getTime();
        console.log(currentTime, pickupTime);
        if (
          currentTime > pickupTime &&
          status === "sent" &&
          color !== "bg-red-500"
        ) {
          handleDelayed();
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [order.pickupDate, status, delayed]);

  return { isOpen, toggleOpen, color, status, statusText, handleStatus };
};
