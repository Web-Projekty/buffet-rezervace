import { LuShoppingCart } from "react-icons/lu";

const dummyFood = [
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
    image: "https://cdn.britannica.com/34/206334-050-7637EB66/French-fries.jpg",
    price: 49.9,
    description: "Crispy fries with ketchup",
  },
  {
    id: 4,
    name: "Soda",
    image:
      "https://cdn.myshoptet.com/usr/www.japafoods.cz/user/shop/big/23294_sangaria-hajikete-melon-soda-drink-250ml.jpg?6644c727",
    price: 34.9,
    description: "A refreshing soda",
  },
  {
    id: 5,
    image: "https://www.pizzaplzen.cz/wp-content/uploads/2017/02/8-768x493.jpg",
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
    image: "https://cdn.britannica.com/34/206334-050-7637EB66/French-fries.jpg",
    price: 49.9,
    description: "Crispy fries with ketchup",
  },
  {
    id: 8,
    name: "Soda",
    image:
      "https://cdn.myshoptet.com/usr/www.japafoods.cz/user/shop/big/23294_sangaria-hajikete-melon-soda-drink-250ml.jpg?6644c727",
    price: 34.9,
    description: "A refreshing soda",
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
    image: "https://cdn.britannica.com/34/206334-050-7637EB66/French-fries.jpg",
    price: 49.9,
    description: "Crispy fries with ketchup",
  },
  {
    id: 12,
    name: "Soda",
    image:
      "https://cdn.myshoptet.com/usr/www.japafoods.cz/user/shop/big/23294_sangaria-hajikete-melon-soda-drink-250ml.jpg?6644c727",
    price: 34.9,
    description: "A refreshing soda",
  },
];

const FoodList = () => {
  return (
    <div className="mb-[3rem] mt-[15rem] flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {dummyFood.map((food) => {
          return (
            <div
              key={food.id}
              className="relative flex flex-col justify-around gap-5 rounded-lg border-b-2 bg-orange-200 p-4 shadow-sm shadow-gray-500"
            >
              <img
                src={food.image}
                alt={food.name}
                className="h-[15rem] w-[20rem] rounded-lg object-fill"
              />
              <div className="flex flex-col gap-3 rounded-lg bg-white p-2">
                <div className="flex items-center gap-5">
                  <h2 className="rounded-lg bg-white px-2 text-xl font-bold">
                    {food.name}
                  </h2>
                  <p className="rounded-lg bg-white px-2 text-lg">
                    {food.price} Kč
                  </p>
                </div>
                <LuShoppingCart
                  size={36}
                  className="absolute bottom-10 right-10 bg-white hover:cursor-pointer"
                />
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
