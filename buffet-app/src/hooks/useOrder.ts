import { useEffect, useState } from "react";
import { Order } from "../types";
import { getColorByStatus } from "../components/utils/utils";

type UseOrderReturn = {
  isOpen: boolean;
  toggleOpen: () => void;
  color: string;
};

const useOrder = (order: Order): UseOrderReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>("bg-white");

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setColor(getColorByStatus(order.status));
  }, [order]);

  return { isOpen, toggleOpen, color };
};

export default useOrder;
