import { motion } from "framer-motion";
import { scaleUpAnimation } from "../../animations";
import { useNavigate } from "react-router-dom";
import useCart from "../../store/CartStore";
import Modal from "../Modal";
import CartItem from "./CartItem";
import Button from "../Button";
import EmptyCart from "./EmptyCart";

const CartModal = () => {
  const { isOpen, handleCloseCart, handleOpenCart, cartItems, isCartEmpty } =
    useCart();
  const navigate = useNavigate();

  const handleContinue = () => {
    handleOpenCart();
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
        className="relative flex h-[600px] w-[900px] flex-col items-center justify-between rounded-lg bg-slate-800 shadow-md shadow-black"
      >
        <h1 className="flex h-10 w-full items-center justify-center rounded-t-lg bg-primary text-center text-xl font-bold text-black">
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
        <div className="my-2 grid h-10 grid-cols-2 grid-rows-1 justify-between gap-10 text-white">
          <Button onClick={handleCloseCart}>Zavřít</Button>
          <Button onClick={handleContinue} disabled={isCartEmpty()}>
            Pokračovat
          </Button>
        </div>
      </motion.div>
    </Modal>
  );
};

export default CartModal;
