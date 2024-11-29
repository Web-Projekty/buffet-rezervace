import { useEffect, useState } from "react";
import { Order, OrderStatus } from "../types";
import { getColorByStatus } from "../utils";

type UseOrderReturn = {
  isOpen: boolean;
  toggleOpen: () => void;
  color: string;
  status: OrderStatus;
  handleStatus: (status: OrderStatus) => void;
};

const useOrder = (order: Order): UseOrderReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>("bg-white");
  const [status, setStatus] = useState<OrderStatus>("pending");

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleStatus = (status: OrderStatus) => {
    setStatus(status);
  };

  useEffect(() => {
    setColor(getColorByStatus(status));
  }, [order]);

  return { isOpen, toggleOpen, color, status, handleStatus };
};

export default useOrder;
