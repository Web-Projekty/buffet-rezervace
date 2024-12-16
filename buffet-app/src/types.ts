import { LucideIcon } from "lucide-react";

export type User = {
  id: number;
  username: string;
  fullName: string;
  email: string;
  class: string;
  isAdmin: boolean;
  orders: Order[];
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
  items: string;
  pickUpId: string;
};

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  allergens: Allergen[];
  category: "all" | "fastfood" | "drink" | "other";
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
  icon?: LucideIcon;
};

export type RequestData = {
  requestType:
    | "login"
    | "verify"
    | "isAdmin"
    | "getMenu"
    | "getOrders"
    | "getAllergens";
  [key: string]: string | number | boolean | object | undefined;
};
