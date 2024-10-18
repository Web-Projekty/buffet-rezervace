import { motion } from "framer-motion";
import { scaleUpAnimation } from "../../animations";
import { useNavigate } from "react-router-dom";
import useCart from "../../store/CartStore";
import Modal from "../Modal";
import CartItem from "./CartItem";

const CartModal = () => {
  const { isOpen, handleOpenCart, cartItems, getCartQuantity } = useCart();
  const navigate = useNavigate();

  const handleContinue = () => {
    handleOpenCart();
    navigate("/cart");
  };

  const isCartEmpty = cartItems.length === 0;

  return (
    <Modal isOpen={isOpen} darkBackground>
      <motion.div
        {...scaleUpAnimation(0.3)}
        className="flex h-[500px] w-[800px] flex-col items-center justify-between rounded-lg bg-slate-800 shadow-md shadow-black"
      >
        <div className="flex h-10 w-full items-center justify-center rounded-t-lg bg-primary text-center text-xl text-black">
          <h1>Váš košík</h1>
        </div>

        <div
          className={`flex ${isCartEmpty ? "flex-col" : "flex-row"} flex-wrap justify-center gap-5 overflow-auto px-10 py-5`}
        >
          {isCartEmpty && (
            <div className="flex flex-row items-center justify-center gap-1 text-xl text-white">
              <p className="text-center text-white">Váš košík je prázdný.</p>
              <span className="text-2xl">😢</span>
            </div>
          )}
          {cartItems.map((item) => {
            return <CartItem key={item.id} item={item} />;
          })}
        </div>
        <div className="grid h-10 w-full grid-cols-2 grid-rows-1 gap-10 bg-slate-900 text-white">
          <button onClick={handleOpenCart} className="mb-2">
            Zavřít
          </button>
          <button
            disabled={getCartQuantity() === 0}
            onClick={handleContinue}
            className="mb-2"
          >
            Pokračovat
          </button>
        </div>
      </motion.div>
    </Modal>
  );
};

export default CartModal;
