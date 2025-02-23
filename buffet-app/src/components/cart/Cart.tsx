import { motion } from "framer-motion";
import useCart from "../../store/CartStore";
import { useNavigate } from "react-router-dom";
import { scaleUpAnimation } from "../../animations";
import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import { toastMessages } from "../utils/toastMessages";

type CartProps = {
  type?: "modal" | "menu";
  onClick?: () => void;
};

const Cart = ({ type = "modal", onClick }: CartProps) => {
  const { handleCloseCart, cartItems, isCartEmpty } = useCart();
  const navigate = useNavigate();

  const handleContinue = () => {
    handleCloseCart();
    navigate("/cart");
  };

  return (
    <motion.div
      {...scaleUpAnimation(0.3)}
      className={`relative m-auto flex ${type === "modal" ? "h-[800px]" : "h-[500px]"} w-[88%] flex-col items-center justify-between rounded-lg bg-slate-800 shadow-md shadow-black md:h-[600px] md:w-[900px]`}
    >
      <h1
        className={`flex h-16 w-full items-center justify-center rounded-t-lg ${type === "modal" ? "bg-primary" : "bg-slate-900 py-2"} text-center text-xl font-bold text-white`}
      >
        Váš košík
      </h1>

      <div
        className={`${isCartEmpty() ? "" : "flex flex-col"} gap-5 overflow-auto px-10 py-5`}
      >
        {isCartEmpty() && <EmptyCart />}
        {cartItems.map((item) => {
          return <CartItem key={item.id} item={item} />;
        })}
      </div>
      <div className="flex h-16 w-full items-center justify-center gap-10 rounded-b-lg bg-slate-900 py-2 text-xl text-white">
        {type === "modal" && (
          <Button className="w-32" onClick={handleCloseCart}>
            Zavřít
          </Button>
        )}
        <Button
          className={`w-32 ${isCartEmpty() ? "cursor-not-allowed hover:bg-interactiveColor" : ""}`}
          onClick={() => {
            if (isCartEmpty()) {
              toast.error(toastMessages.cart.empty);
              return;
            }
            handleContinue();
            if (onClick) onClick();
          }}
        >
          K pokladně
        </Button>
      </div>
    </motion.div>
  );
};

export default Cart;
