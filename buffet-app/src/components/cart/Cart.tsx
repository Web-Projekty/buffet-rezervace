import { motion } from "framer-motion";
import useCart from "../../store/CartStore";
import { useNavigate } from "react-router-dom";
import { scaleUpAnimation } from "../../animations";
import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import { toastMessages } from "../utils/toastMessages";
import { useEffect } from "react";

type CartProps = {
  modal?: boolean;
  onClick?: () => void;
};

const Cart = ({ modal, onClick }: CartProps) => {
  const { handleCloseCart, cartItems, isCartEmpty, isOpen, updateVariants } =
    useCart();
  const navigate = useNavigate();

  const handleContinue = () => {
    handleCloseCart();
    navigate("/cart");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768 && isOpen) {
        handleCloseCart();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, handleCloseCart]);

  const areSelectedVariants = () => {
    return cartItems.every(
      (item) => item.variants.length > 0 && item.selectedVariants.length > 0,
    );
  };

  return (
    <motion.div
      {...scaleUpAnimation(0.3)}
      className={`relative m-auto flex ${modal ? "h-[800px]" : "h-[500px]"} w-[calc(100%-2rem)] flex-col items-center justify-between rounded-lg bg-slate-800 shadow-md shadow-black md:h-[600px] md:w-[900px]`}
    >
      <h1
        className={`flex h-16 w-full items-center justify-center rounded-t-lg ${modal ? "bg-primary" : "bg-slate-900 py-2"} text-center text-xl font-bold text-white`}
      >
        Váš košík
      </h1>

      <div
        className={`${isCartEmpty() ? "" : "flex flex-col"} gap-5 overflow-auto px-10 py-5`}
      >
        {isCartEmpty() && <EmptyCart />}
        {cartItems.map((item) => {
          return (
            <CartItem
              key={item.id}
              item={item}
              updateVariants={updateVariants}
            />
          );
        })}
      </div>
      <div className="flex h-16 w-full items-center justify-center gap-10 rounded-b-lg bg-slate-900 py-2 text-xl text-white">
        {modal && (
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
            if (!areSelectedVariants()) {
              toast.error(toastMessages.cart.variants);
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
