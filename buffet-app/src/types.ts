export type User = {
  id: number;
  name: string;
  email: string;
  class: string;
  isAdmin: boolean;
  // orders: Order[];
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
  alergens: Alergen[];
};

export type Alergen = {
  id: number;
  name: string;
  description: string;
};
