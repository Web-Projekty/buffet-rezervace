export type User = {
  id: number;
  name: string;
  email: string;
  class: string;
  isAdmin: boolean;
  orders: Order[];
};

export type Order = {
  id: number;
  status: "pending" | "pickedup" | "notpickedup";
  date: string;
  items: Item[];
  user: User | "this";
};

export type Item = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};
