import { useContext } from "react";
import { PiShoppingCartSimple } from "react-icons/pi";
import { CartContext } from "../../store/CartContext";

const CartButton = () => {
  const cartCtx = useContext(CartContext);

  const handleOpenCart = () => {
    console.log("Opening cart...");
  };
  return (
    <div
      className="relative rounded-full bg-white p-2 hover:cursor-pointer"
      onClick={handleOpenCart}
    >
      <span className="absolute -right-3 -top-3 rounded-full bg-red-400 px-2 py-1 text-white">
        {cartCtx.getCartQuantity()}
      </span>
      <PiShoppingCartSimple size={36} />
    </div>
  );
};

export default CartButton;
