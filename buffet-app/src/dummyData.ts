import { Item, Order, User } from "./types";

const dummyUserOrders: Order[] = [
  {
    id: 1,
    date: "1727244375",
    status: "pickedup",
    user: null,
    items: [
      {
        id: 1,
        image:
          "https://www.pizzaplzen.cz/wp-content/uploads/2017/02/8-768x493.jpg",
        name: "Pizza",
        price: 129.9,
        description: "A delicious pizza with pepperoni",
      },
      {
        id: 2,
        image:
          "https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg",
        name: "Burger",
        price: 89.9,
        description: "A juicy burger with cheese",
      },
    ],
  },
  {
    id: 2,
    date: "1727244375",
    status: "pickedup",
    user: null,
    items: [
      {
        id: 1,
        image:
          "https://www.pizzaplzen.cz/wp-content/uploads/2017/02/8-768x493.jpg",
        name: "Pizza",
        price: 129.9,
        description: "A delicious pizza with pepperoni",
      },
      {
        id: 2,
        image:
          "https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg",
        name: "Burger",
        price: 89.9,
        description: "A juicy burger with cheese",
      },
      {
        id: 3,
        name: "Fries",
        image:
          "https://images.unsplash.com/photo-1593507369837-9adcc0c0bdc6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 49.9,
        description: "Crispy fries with ketchup",
      },
      {
        id: 4,
        name: "Cola Cola",
        image:
          "https://images.unsplash.com/photo-1592232583482-ec6367cfb786?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 34.9,
        description: "A refreshing coca cola",
      },
    ],
  },
];

export const dummyUser: User = {
  id: 1,
  name: "John Doe",
  email: "john@doe.com",
  class: "4. A",
  isAdmin: true,
  orders: dummyUserOrders,
};

export const dummyFood: Item[] = [
  {
    id: 1,
    image: "https://www.pizzaplzen.cz/wp-content/uploads/2017/02/8-768x493.jpg",
    name: "Pizza",
    price: 129.9,
    description: "A delicious pizza with pepperoni",
  },
  {
    id: 2,
    image:
      "https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg",
    name: "Burger",
    price: 89.9,
    description: "A juicy burger with cheese",
  },
  {
    id: 3,
    name: "Fries",
    image:
      "https://images.unsplash.com/photo-1593507369837-9adcc0c0bdc6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 49.9,
    description: "Crispy fries with ketchup",
  },
  {
    id: 4,
    name: "Cola Cola",
    image:
      "https://images.unsplash.com/photo-1592232583482-ec6367cfb786?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 34.9,
    description: "A refreshing coca cola",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Pizza",
    price: 129.9,
    description: "A delicious pizza with pepperoni",
  },
  {
    id: 6,
    image:
      "https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg",
    name: "Burger",
    price: 89.9,
    description: "A juicy burger with cheese",
  },
  {
    id: 7,
    name: "Fries",
    image:
      "https://images.unsplash.com/photo-1593507369837-9adcc0c0bdc6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 49.9,
    description: "Crispy fries with ketchup",
  },
  {
    id: 8,
    name: "Cola Cola",
    image:
      "https://images.unsplash.com/photo-1592232583482-ec6367cfb786?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 34.9,
    description: "A refreshing coca cola",
  },
  {
    id: 9,
    image: "https://www.pizzaplzen.cz/wp-content/uploads/2017/02/8-768x493.jpg",
    name: "Pizza",
    price: 129.9,
    description: "A delicious pizza with pepperoni",
  },
  {
    id: 10,
    image:
      "https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg",
    name: "Burger",
    price: 89.9,
    description: "A juicy burger with cheese",
  },
  {
    id: 11,
    name: "Fries",
    image:
      "https://images.unsplash.com/photo-1593507369837-9adcc0c0bdc6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 49.9,
    description: "Crispy fries with ketchup",
  },
  {
    id: 12,
    name: "Cola Cola",
    image:
      "https://images.unsplash.com/photo-1592232583482-ec6367cfb786?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 34.9,
    description: "A refreshing coca cola",
  },
];

export const dummyOrders: Order[] = [
  {
    id: 1,
    date: "1727244375",
    status: "pickedup",
    user: dummyUser,
    items: [
      {
        id: 1,
        image:
          "https://www.pizzaplzen.cz/wp-content/uploads/2017/02/8-768x493.jpg",
        name: "Pizza",
        price: 129.9,
        description: "A delicious pizza with pepperoni",
      },
      {
        id: 2,
        image:
          "https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg",
        name: "Burger",
        price: 89.9,
        description: "A juicy burger with cheese",
      },
    ],
  },
  {
    id: 2,
    date: "1727244375",
    status: "pickedup",
    user: dummyUser,
    items: [
      {
        id: 1,
        image:
          "https://www.pizzaplzen.cz/wp-content/uploads/2017/02/8-768x493.jpg",
        name: "Pizza",
        price: 129.9,
        description: "A delicious pizza with pepperoni",
      },
      {
        id: 2,
        image:
          "https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg",
        name: "Burger",
        price: 89.9,
        description: "A juicy burger with cheese",
      },
      {
        id: 3,
        name: "Fries",
        image:
          "https://images.unsplash.com/photo-1593507369837-9adcc0c0bdc6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 49.9,
        description: "Crispy fries with ketchup",
      },
      {
        id: 4,
        name: "Cola Cola",
        image:
          "https://images.unsplash.com/photo-1592232583482-ec6367cfb786?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 34.9,
        description: "A refreshing coca cola",
      },
    ],
  },
  {
    id: 3,
    date: "1727244375",
    status: "notpickedup",
    user: dummyUser,
    items: [
      {
        id: 1,
        image:
          "https://www.pizzaplzen.cz/wp-content/uploads/2017/02/8-768x493.jpg",
        name: "Pizza",
        price: 129.9,
        description: "A delicious pizza with pepperoni",
      },
      {
        id: 2,
        image:
          "https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg",
        name: "Burger",
        price: 89.9,
        description: "A juicy burger with cheese",
      },
      {
        id: 3,
        name: "Fries",
        image:
          "https://images.unsplash.com/photo-1593507369837-9adcc0c0bdc6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 49.9,
        description: "Crispy fries with ketchup",
      },
      {
        id: 4,
        name: "Cola Cola",
        image:
          "https://images.unsplash.com/photo-1592232583482-ec6367cfb786?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 34.9,
        description: "A refreshing coca cola",
      },
    ],
  },
  {
    id: 4,
    date: "1727244375",
    status: "notpickedup",
    user: dummyUser,
    items: [
      {
        id: 1,
        image:
          "https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg",
        name: "Burger",
        price: 89.9,
        description: "A juicy burger with cheese",
      },

      {
        id: 2,
        name: "Cola Cola",
        image:
          "https://images.unsplash.com/photo-1592232583482-ec6367cfb786?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 34.9,
        description: "A refreshing coca cola",
      },
    ],
  },
  {
    id: 5,
    date: "1727244375",
    status: "notpickedup",
    user: dummyUser,
    items: [
      {
        id: 1,
        image:
          "https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg",
        name: "Burger",
        price: 89.9,
        description: "A juicy burger with cheese",
      },

      {
        id: 2,
        name: "Cola Cola",
        image:
          "https://images.unsplash.com/photo-1592232583482-ec6367cfb786?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 34.9,
        description: "A refreshing coca cola",
      },
    ],
  },
  {
    id: 6,
    date: "1727244375",
    status: "notpickedup",
    user: null,
    items: [
      {
        id: 1,
        image:
          "https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg",
        name: "Burger",
        price: 89.9,
        description: "A juicy burger with cheese",
      },

      {
        id: 2,
        name: "Cola Cola",
        image:
          "https://images.unsplash.com/photo-1592232583482-ec6367cfb786?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 34.9,
        description: "A refreshing coca cola",
      },
    ],
  },
];
