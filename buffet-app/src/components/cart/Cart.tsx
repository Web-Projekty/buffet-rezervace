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
];

const Cart = () => {
  return (
    <dialog>
      <h1>Your Cart</h1>
      <div className="grid grid-cols-3 gap-4">
        {dummyFood.map((food) => {
          return (
            <div key={food.id} className="rounded-lg bg-white p-4 shadow-md">
              <img
                src={food.image}
                alt={food.name}
                className="h-48 w-full object-cover"
              />
              <h1 className="mt-2 text-xl font-bold">{food.name}</h1>
              <p className="text-gray-500">{food.description}</p>
              <p className="mt-2 font-bold text-gray-700">${food.price}</p>
            </div>
          );
        })}
      </div>
      <div>
        <button>Close</button>
        <button>Continue</button>
      </div>
    </dialog>
  );
};

export default Cart;
