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

export const matchValues = (text: any, text2: any): boolean => {
  return text === text2;
};
