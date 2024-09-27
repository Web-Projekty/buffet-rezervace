import { Alergen, MenuItem, Order, User } from "./types";

export const dummyUser: User = {
  id: 1,
  name: "Oreki Houtarou",
  email: "john@doe.com",
  class: "4. H",
  isAdmin: true,
  orders: [
    {
      id: 1,
      date: "1727244375",
      status: "pickedup",
      user: {
        id: 1,
        name: "Oreki Houtarou",
        email: "john@doe.com",
        class: "4. H",
        isAdmin: true,
        orders: [],
      },
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
  ],
};

export const dummyUser2: User = {
  id: 2,
  name: "Cid Kagenou",
  email: "john@doe.com",
  class: "2. C",
  isAdmin: false,
  orders: [
    {
      id: 3,
      date: "1727244375",
      status: "pending",
      user: {
        id: 2,
        name: "Cid Kagenou",
        email: "john@doe.com",
        class: "2. C",
        isAdmin: false,
        orders: [],
      },
      items: [
        {
          id: 2,
          image:
            "https://www.pizzaplzen.cz/wp-content/uploads/2017/02/8-768x493.jpg",
          name: "Pizza",
          price: 129.9,
          description: "A delicious pizza with pepperoni",
          alergens: [],
        },
        {
          id: 3,
          image:
            "https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg",
          name: "Burger",
          price: 89.9,
          description: "A juicy burger with cheese",
          alergens: [],
        },
      ],
    },
  ],
};

export const dummyUser3: User = {
  id: 3,
  name: "Naruto Uzumaki",
  email: "john@doe.com",
  class: "3. B",
  isAdmin: false,
  orders: [
    {
      id: 4,
      date: "1727244375",
      status: "notpickedup",
      user: {
        id: 5,
        name: "Naruto Uzumaki",
        email: "john@doe.com",
        class: "3. B",
        isAdmin: false,
        orders: [],
      },
      items: [
        {
          id: 1,
          image:
            "https://www.pizzaplzen.cz/wp-content/uploads/2017/02/8-768x493.jpg",
          name: "Pizza",
          price: 129.9,
          description: "A delicious pizza with pepperoni",
          alergens: [],
        },
        {
          id: 2,
          image:
            "https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg",
          name: "Burger",
          price: 89.9,
          description: "A juicy burger with cheese",
          alergens: [],
        },
      ],
    },
  ],
};

export const dummyFood: MenuItem[] = [
  {
    id: 1,
    image: "https://www.pizzaplzen.cz/wp-content/uploads/2017/02/8-768x493.jpg",
    name: "Pizza",
    price: 129.9,
    description: "A delicious pizza with pepperoni",
    alergens: [
      { id: 1, name: "Gluten", description: "This product contains gluten" },
    ],
  },
  {
    id: 2,
    image:
      "https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg",
    name: "Burger",
    price: 89.9,
    description: "A juicy burger with cheese",
    alergens: [
      { id: 1, name: "Gluten", description: "This product contains gluten" },
    ],
  },
  {
    id: 3,
    name: "Fries",
    image:
      "https://images.unsplash.com/photo-1593507369837-9adcc0c0bdc6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 49.9,
    description: "Crispy fries with ketchup",
    alergens: [
      { id: 1, name: "Gluten", description: "This product contains gluten" },
    ],
  },
  {
    id: 4,
    name: "Cola Cola",
    image:
      "https://images.unsplash.com/photo-1592232583482-ec6367cfb786?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 34.9,
    description: "A refreshing coca cola",
    alergens: [
      { id: 1, name: "Gluten", description: "This product contains gluten" },
    ],
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Pizza",
    price: 129.9,
    description: "A delicious pizza with pepperoni",
    alergens: [
      { id: 1, name: "Gluten", description: "This product contains gluten" },
    ],
  },
  {
    id: 6,
    image:
      "https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg",
    name: "Burger",
    price: 89.9,
    description: "A juicy burger with cheese",
    alergens: [
      { id: 1, name: "Gluten", description: "This product contains gluten" },
    ],
  },
  {
    id: 7,
    name: "Fries",
    image:
      "https://images.unsplash.com/photo-1593507369837-9adcc0c0bdc6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 49.9,
    description: "Crispy fries with ketchup",
    alergens: [
      { id: 1, name: "Gluten", description: "This product contains gluten" },
    ],
  },
  {
    id: 8,
    name: "Cola Cola",
    image:
      "https://images.unsplash.com/photo-1592232583482-ec6367cfb786?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 34.9,
    description: "A refreshing coca cola",
    alergens: [
      { id: 1, name: "Gluten", description: "This product contains gluten" },
    ],
  },
  {
    id: 9,
    image: "https://www.pizzaplzen.cz/wp-content/uploads/2017/02/8-768x493.jpg",
    name: "Pizza",
    price: 129.9,
    description: "A delicious pizza with pepperoni",
    alergens: [
      { id: 1, name: "Gluten", description: "This product contains gluten" },
    ],
  },
  {
    id: 10,
    image:
      "https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg",
    name: "Burger",
    price: 89.9,
    description: "A juicy burger with cheese",
    alergens: [
      { id: 1, name: "Gluten", description: "This product contains gluten" },
    ],
  },
  {
    id: 11,
    name: "Fries",
    image:
      "https://images.unsplash.com/photo-1593507369837-9adcc0c0bdc6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 49.9,
    description: "Crispy fries with ketchup",
    alergens: [
      { id: 1, name: "Gluten", description: "This product contains gluten" },
    ],
  },
  {
    id: 12,
    name: "Cola Cola",
    image:
      "https://images.unsplash.com/photo-1592232583482-ec6367cfb786?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 34.9,
    description: "A refreshing coca cola",
    alergens: [
      { id: 1, name: "Gluten", description: "This product contains gluten" },
    ],
  },
];

export const dummyOrders: Order[] = [
  dummyUser.orders,
  dummyUser2.orders,
  dummyUser3.orders,
].flat();

export const alergens: Alergen[] = [
  {
    id: 1,
    name: "Gluten",
    description: "This product contains gluten",
  },
  {
    id: 2,
    name: "Lactose",
    description: "This product contains lactose",
  },
  {
    id: 3,
    name: "Nuts",
    description: "This product contains nuts",
  },
  {
    id: 4,
    name: "Soy",
    description: "This product contains soy",
  },
  {
    id: 5,
    name: "Eggs",
    description: "This product contains eggs",
  },
  {
    id: 6,
    name: "Fish",
    description: "This product contains fish",
  },
  {
    id: 7,
    name: "Shellfish",
    description: "This product contains shellfish",
  },
  {
    id: 8,
    name: "Celery",
    description: "This product contains celery",
  },
  {
    id: 9,
    name: "Mustard",
    description: "This product contains mustard",
  },
  {
    id: 10,
    name: "Sesame",
    description: "This product contains sesame",
  },
  {
    id: 11,
    name: "Sulphites",
    description: "This product contains sulphites",
  },
  {
    id: 12,
    name: "Peanuts",
    description: "This product contains peanuts",
  },
  {
    id: 13,
    name: "Milk",
    description: "This product contains milk",
  },
  {
    id: 14,
    name: "Sulphur dioxide",
    description: "This product contains sulphur dioxide",
  },
  {
    id: 15,
    name: "Lupin",
    description: "This product contains lupin",
  },
  {
    id: 16,
    name: "Molluscs",
    description: "This product contains molluscs",
  },
];
