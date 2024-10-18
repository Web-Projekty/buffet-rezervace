import useCart from "../../store/CartStore";
import CartItem from "./CartItem";

const Cart = () => {
  const { cartItems } = useCart();

  return (
    <div className="mb-[3rem] mt-[10rem] flex flex-col items-center justify-center">
      <h1>Your Cart</h1>
      <div className="grid grid-cols-3 gap-4">
        {cartItems.length === 0 && (
          <p className="text-white">Your cart is empty</p>
        )}
        {cartItems.map((item) => {
          return <CartItem key={item.id} item={item} />;
        })}
      </div>
      <div>
        <button>Close</button>
        <button>Continue</button>
      </div>
    </div>
  );
};

export default Cart;
