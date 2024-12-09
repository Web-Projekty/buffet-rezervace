import { OrderStatus } from "../../types";

export const formatCurrency = (number: number): string => {
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
  }).format(number);
};

export const formatDate = (date: string): string => {
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString("cs-CZ");
};

export const formatUnixDate = (date: string): string => {
  const dateObject = new Date(parseInt(date));
  return dateObject.toLocaleDateString("cs-CZ");
};

export const formatToUnixDate = (date: string): string => {
  const dateObject = new Date(date);
  return Math.floor(dateObject.getTime() / 1000).toString();
};

export const matchValues = (text: string, text2: string): boolean => {
  return text === text2;
};

export const getColorByStatus = (status: OrderStatus): string => {
  return status === "sent"
    ? "bg-yellow-500"
    : status === "waiting"
      ? "bg-blue-500"
      : status === "done"
        ? "bg-green-500"
        : status === "storno"
          ? "bg-red-400"
          : "bg-red-400";
};

export const statusToText = (status: OrderStatus): string => {
  return status === "sent"
    ? "Čeká na zpracování"
    : status === "waiting"
      ? "Čeká na vyzvednutí"
      : status === "done"
        ? "Dokončeno"
        : status === "storno"
          ? "Zrušeno uživatelem"
          : "Zrušeno provozovatelem";
};
