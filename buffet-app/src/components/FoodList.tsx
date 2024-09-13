import { formatCurrency } from "../utils";
import { useEffect, useState } from "react";
import axios from "axios";
import { LuBadgePlus } from "react-icons/lu";

type DummyFoodType = {
  id: number;
  image: string;
  name: string;
  price: number;
  description: string;
};

const dummyFood: DummyFoodType[] = [
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

const URL =
  "https://didactic-space-yodel-v5wq7qxjxj5hxjp4-80.app.github.dev/api";

const FoodList = () => {
  const [data, setData] = useState<boolean>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          URL,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="mb-[3rem] mt-[15rem] flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {dummyFood.map((food) => {
          return (
            <div
              key={food.id}
              className="relative flex w-[19rem] flex-col justify-around gap-5 rounded-lg border-b-2 bg-white p-4 shadow-sm shadow-gray-500"
            >
              <img
                src={food.image}
                alt={food.name}
                className="h-[15rem] w-[20rem] rounded-lg object-cover"
              />
              <div className="flex flex-col gap-3 rounded-lg bg-white p-2">
                <div className="flex items-center gap-5">
                  <h2 className="rounded-lg bg-white px-2 text-xl font-bold">
                    {food.name}
                  </h2>
                  <p className="rounded-lg bg-white px-2 text-lg">
                    {formatCurrency(food.price)}
                  </p>
                </div>
                <div>
                  <LuBadgePlus
                    size={48}
                    className="bg-white p-2 hover:cursor-pointer"
                  />
                </div>

                <p className="w-[240px] rounded-lg bg-white px-2">
                  {food.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FoodList;
