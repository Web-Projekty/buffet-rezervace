import { OrderStatus } from "../../types";

export const getColorByStatus = (status: OrderStatus): string => {
  return status === "pickedup"
    ? "bg-green-500"
    : status === "notpickedup"
      ? "bg-red-500"
      : "bg-orange-400";
};
