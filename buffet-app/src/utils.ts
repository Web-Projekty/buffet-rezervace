export const formatCurrency = (number: number): string => {
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
  }).format(number);
};

export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat("cs-CZ", {
    hour: "numeric",
    minute: "numeric",
  }).format(date);
};

export const matchValues = (text: any, text2: any): boolean => {
  return text === text2;
};
