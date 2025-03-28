import { CartItem } from "./store/CartStore";

export type User = {
  id: number;
  username: string;
  fullName: string;
  email: string;
  class: string;
  isAdmin: boolean;
  orders: Order[];
  tel: string;
  credits: string;
};

export type OrderStatus =
  | "sent"
  | "waiting"
  | "done"
  | "storno"
  | "cancelled"
  | "preparing";

export type OrderItems = {
  id: number;
  quantity: number;
  variants: Variant["id"][];
};

export type MappedOrderItem = {
  id: number;
  name: string | undefined;
  price: number | undefined;
  description: string | undefined;
  image: string | undefined;
  allergens: Allergen[];
  category: number;
  variants: Variant[];
  quantity: number;
  selectedVariants: CartItem["selectedVariants"];
};

export type OrderItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  allergens: Allergen[];
  category: number;
};

export type Order = {
  id: number;
  userId: number;
  status: OrderStatus;
  dateCreated: string;
  pickupDate: string;
  startTime: string;
  endTime: string;
  items: OrderItems[];
  pickUpId: string;
  //type: "thePay" | "cash";
  thePayDetailsUrl: string;
  totalAmount: number;
  //useCredits: boolean;
  //creditsAmount: number;
  paid: boolean;
};

export type OrdersData = {
  data: Order[];
  itemsCount: number;
  items: OrderItem[];
  variants: Variant[];
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
  id: number;
  name: string;
  addedPrice: number;
  isExclusive: boolean;
  itemId: OrderItem["id"];
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

export type RequestData = {
  requestType: "login" | "verify" | "getMenu" | "getOrders";
  [key: string]: string | number | boolean | object | undefined;
};

export type PaymentMethod = {
  name: string;
  input: "checkbox" | "radio";
  image: PaymentMethodImage[];
  enabled: boolean;
};

type PaymentMethodImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type Date = {
  date: string;
  available: boolean;
  hours: Hour[];
};

export type Hour = {
  label: string;
  available: boolean;
  minutes: Minute[];
};

export type Minute = {
  id: number;
  label: string;
  available: boolean;
};
