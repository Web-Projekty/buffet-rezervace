import { useNavigate } from "react-router-dom";
import useCart from "../../store/CartStore";
import Button from "../Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";

const Cart = () => {
  const { cartItems, isCartEmpty } = useCart();
  const navigate = useNavigate();

  const handleSubmitOrder = () => {
    // TODO: process the order
    navigate("/success-order?id=" + 5);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-between text-white">
      <h1 className="text-xl">Potvrdit objednávku?</h1>
      <div
        className={`${isCartEmpty() ? "" : "grid grid-flow-row grid-cols-3"} gap-5 overflow-auto px-10 py-5`}
      >
        {isCartEmpty() && <EmptyCart />}
        {cartItems.map((item) => {
          return <CartItem key={item.id} item={item} />;
        })}
      </div>
      <div className="grid h-10 grid-cols-2 grid-rows-1 justify-between gap-10 text-white">
        <Button onClick={handleBack}>Zpět</Button>
        <Button disabled={isCartEmpty()} onClick={handleSubmitOrder}>
          Pokračovat
        </Button>
      </div>
    </div>
  );
};

export default Cart;
