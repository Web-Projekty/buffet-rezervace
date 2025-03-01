import { ShoppingCartIcon, Undo } from "lucide-react";
import { CartItems } from "../../store/CartStore";
import { MenuItem } from "../../types";
import { toastMessages } from "../utils/toastMessages";

export type CartItemToastProps = {
  item: MenuItem;
  addToCart: CartItems["addToCart"];
};

export const CartItemToast = ({ item, addToCart }: CartItemToastProps) => (
  <div className="relative flex items-center gap-3">
    <ShoppingCartIcon size={24} />
    <div className="flex flex-col">
      <h1>{toastMessages.cart.removed}</h1>
      <p className="text-descriptionColor">Přidat zpět?</p>
    </div>

    <button
      onClick={() => addToCart(item)}
      className="relative rounded-lg bg-primary p-2 font-bold text-white"
    >
      <Undo />
    </button>
    <div className="absolute -bottom-3 left-0 h-1 w-full rounded-full bg-gray-200">
      <div className="animate-durationLine group-hover:pause-animation h-full rounded-full bg-descriptionColor"></div>
    </div>
  </div>
);
