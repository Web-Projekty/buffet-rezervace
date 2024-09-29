import { useContext } from "react";
import { CartContext } from "../../store/CartContext";

const Cart = () => {
  const cartCtx = useContext(CartContext);
  return (
    <dialog className="z-50 bg-black">
      <h1>Your Cart</h1>
      <div className="grid grid-cols-3 gap-4">
        {cartCtx.cartItems.map((item) => {
          return (
            <div key={item.id} className="rounded-lg bg-white p-4 shadow-md">
              <img
                src={item.image}
                alt={item.name}
                className="h-48 w-full object-cover"
              />
              <h1 className="mt-2 text-xl font-bold">{item.name}</h1>
              <p className="text-gray-500">{item.description}</p>
              <p className="mt-2 font-bold text-gray-700">${item.price}</p>
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
