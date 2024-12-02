import { useEffect, useState } from "react";
import { Order, OrderStatus } from "../types";
import { getColorByStatus } from "../utils";

export const useOrder = (order: Order) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>(getColorByStatus(order.status));
  const [status, setStatus] = useState<OrderStatus>(order.status);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleStatus = (status: OrderStatus) => {
    setStatus(status);
  };

  useEffect(() => {
    setColor(getColorByStatus(status));
  }, [status]);

  return { isOpen, toggleOpen, color, status, handleStatus };
};
