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

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleStatus = (status: OrderStatus) => {
    setStatus(status);
  };

  useEffect(() => {
    setColor(getColorByStatus(status));
    setStatusText(statusToText(status));
  }, [status]);

  return { isOpen, toggleOpen, color, status, statusText, handleStatus };
};
