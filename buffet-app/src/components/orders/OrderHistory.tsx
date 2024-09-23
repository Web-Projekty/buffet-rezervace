import React from "react";
import Order from "./Order";

const dummyOrders = [
  {
    id: 1,
    date: "2021-01-01",
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
    id: 2,
    date: "2021-01-09",
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

const OrderHistory = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl">Your order history</h1>
      <ul className="flex flex-col gap-2">
        {dummyOrders.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
