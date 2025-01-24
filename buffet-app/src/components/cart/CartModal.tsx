import useCart from "../../store/CartStore";
import Modal from "../ui/Modal";
import Cart from "./Cart";

const CartModal = () => {
  const { isOpen, handleCloseCart } = useCart();

  return (
    <Modal
      isOpen={isOpen}
      darkBackground
      handleContainerClick={handleCloseCart}
    >
      <Cart />
    </Modal>
  );
};

export default CartModal;
