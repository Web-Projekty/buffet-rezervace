import { motion } from "framer-motion";
import { scaleUpAnimation } from "../../animations";
import { useNavigate } from "react-router-dom";
import useCart from "../../store/CartStore";
import Modal from "../ui/Modal";
import CartItem from "./CartItem";
import Button from "../ui/Button";
import EmptyCart from "./EmptyCart";

const CartModal = () => {
  const { isOpen, handleCloseCart, cartItems, isCartEmpty } = useCart();
  const navigate = useNavigate();

  const handleContinue = () => {
    handleCloseCart();
    navigate("/cart");
  };

  return (
    <Modal
      isOpen={isOpen}
      darkBackground
      handleContainerClick={handleCloseCart}
    >
      <motion.div
        {...scaleUpAnimation(0.3)}
        className="relative m-auto flex h-[800px] w-[88%] flex-col items-center justify-between rounded-lg bg-slate-800 shadow-md shadow-black md:h-[600px] md:w-[900px]"
      >
        <h1 className="flex h-16 w-full items-center justify-center rounded-t-lg bg-primary text-center text-xl font-bold text-black">
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
        <div className="flex h-16 w-full items-center justify-center gap-10 bg-slate-900 text-white">
          <Button className="w-28" onClick={handleCloseCart}>
            Zavřít
          </Button>
          <Button
            className="w-28"
            onClick={handleContinue}
            disabled={isCartEmpty()}
          >
            K pokladně
          </Button>
        </div>
      </motion.div>
    </Modal>
  );
};

export default CartModal;
