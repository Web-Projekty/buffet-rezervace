import toast, { ToastOptions } from "react-hot-toast";
import { CartItems } from "../../store/CartStore";
import { toastMessages } from "../utils/toastMessages";
import { MenuItem } from "../../types";

type CartItemToastProps = {
  item: MenuItem;
  addToCart: CartItems["addToCart"];
};

const defaultOptions: ToastOptions = {
  duration: 5000,
};

export const showCartItemToast = ({ item, addToCart }: CartItemToastProps) => {
  if (!item) return;
  return toast.custom(
    (t) => (
      <div className="relative flex items-center gap-2 rounded-lg bg-white px-2 py-1 shadow-lg">
        <h1>{toastMessages.cart.removed}</h1>

        <div className="flex flex-col justify-center">
          <button
            onClick={() => addToCart(item)}
            className="rounded-lg bg-primary p-2 font-bold text-white"
          >
            Přidat zpět
          </button>
        </div>
        <div className={`w-[${t.duration}] bg-red-500`}></div>
      </div>
    ),
    defaultOptions,
  );
};
