import toast, { ToastOptions } from "react-hot-toast";
import { CartItemToast, CartItemToastProps } from "./CustomToasts";

const defaultOptions: ToastOptions = {
  duration: 5000,
};

const showCartItemToast = ({ item, addToCart }: CartItemToastProps) => {
  if (!item) return;

  return toast(
    () => <CartItemToast item={item} addToCart={addToCart} />,
    defaultOptions,
  );
};

export default showCartItemToast;
