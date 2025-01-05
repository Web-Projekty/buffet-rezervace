export type User = {
  id: number;
  username: string;
  fullName: string;
  email: string;
  class: string;
  isAdmin: boolean;
  orders: Order[];
  phone: string;
  credits: string;
};

export type OrderStatus =
  | "sent"
  | "waiting"
  | "done"
  | "storno"
  | "cancelled"
  | "preparing";

export type Order = {
  id: number;
  userId: number;
  status: OrderStatus;
  date: string;
  pickupDate: string;
  items: [];
  pickUpId: string;
};

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  allergens: Allergen[];
  category: number;
  categoryName: string;
  variants: Variant[];
};

export type Variant = {
  name: string;
  quantity: number;
  price: number;
};

export type Allergen = {
  id: number;
  name: string;
  description: string;
  image?: string;
  icon?: string;
};

export type Category = {
  id: number;
  name: string;
  image: string;
  description: string;
};

export type MenuData = {
  categoryList: Category[];
  data: MenuItem[];
};

export type RequestData = {
  requestType: "login" | "verify" | "getMenu" | "getOrders";
  [key: string]: string | number | boolean | object | undefined;
};

export type PaymentMethod = {
  name: string;
  input: "checkbox" | "radio";
  image: PaymentMethodImage[];
};

type PaymentMethodImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};
