import { OrderStatus } from "../../types";

export const formatCurrency = (number: number): string => {
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
  }).format(number);
};

export const removeDiacritics = (text: string): string => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
};

export const extractToken = (header: string | null): string => {
  return header ? header.split(" ")[1] : "";
};

export const formatDate = (date: string): string => {
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString("cs-CZ");
};

export const onImageChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setImage: (image: string) => void,
) => {
  if (e.target.files && e.target.files[0]) {
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
    };
    reader.readAsDataURL(e.target.files[0]);
  }
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
    ? "bg-orange-400"
    : status === "waiting"
      ? "bg-[#14ce9c]"
      : status === "done"
        ? "bg-green-500"
        : status === "storno"
          ? "bg-red-400"
          : "bg-red-400";
};

export const getTextByStatus = (status: OrderStatus): string => {
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
