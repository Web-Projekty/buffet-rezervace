export type User = {
  id: number;
  username: string;
  fullName: string;
  email: string;
  class: string;
  isAdmin: boolean;
  orders: Order[];
};

export type Order = {
  id: number;
  status: "pending" | "pickedup" | "notpickedup";
  date: string;
  items: MenuItem[];
  user: User | null;
};

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  allergens: Allergen[];
};

export type Allergen = {
  id: number;
  name: string;
  description: string;
  image?: string;
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
