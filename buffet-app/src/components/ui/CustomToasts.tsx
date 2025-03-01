import toast, { ToastOptions } from "react-hot-toast";
import { CartItemToast, CartItemToastProps } from "./CartRemoveToast";

const defaultOptions: ToastOptions = {
  duration: 5000,
  className: "group",
};

export const showCartItemToast = ({ item, addToCart }: CartItemToastProps) => {
  if (!item) return;

  return toast(
    () => <CartItemToast item={item} addToCart={addToCart} />,
    defaultOptions,
  );
};
