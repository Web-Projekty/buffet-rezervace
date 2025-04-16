import { create } from "zustand";
import { MenuItem, Variant } from "../types/types";
import {
  CART_LOCAL_STORAGE_KEY,
  MAX_ITEMS,
  MAX_ITEMS_CART,
} from "../constants/constants";
import { getItem, removeItem, setItem } from "../utils/localStorage";
import toast from "react-hot-toast";
import { toastMessages } from "../utils/toastMessages";
import { showCartItemToast } from "../components/ui/CustomToasts";

export type CartItem = MenuItem & {
  quantity: number;
  selectedVariants: Variant["id"][];
};

export type CartItems = {
  isOpen: boolean;
  handleOpenCart: () => void;
  handleCloseCart: () => void;
  handleToggleCart: () => void;
  cartItems: CartItem[];
  addToCart: (item: MenuItem, selectedVariants: Variant["id"][]) => void;
  removeFromCart: (item: MenuItem) => void;
  updateVariants: (
    id: CartItem["id"],
    updatedVariants: Variant["id"][],
  ) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartQuantity: () => number;
  isCartFull: () => boolean;
  isCartEmpty: () => boolean;
  isItemInCart: (id: number) => boolean;
  getItemQuantity: (id: number) => number;
  isItemMaxQuantity: (id: number) => boolean;
};

const loadCartItems = (): CartItem[] => {
  const cartItems = getItem(CART_LOCAL_STORAGE_KEY);
  return cartItems ? (cartItems as CartItem[]) : [];
};

const isItemInCart = (cartItems: CartItem[], id: number): boolean => {
  return cartItems.some((cartItem) => cartItem.id === id);
};

const getItemQuantity = (cartItems: CartItem[], id: number): number => {
  return cartItems.find((cartItem) => cartItem.id === id)?.quantity || 0;
};

const updateCartItemQuantity = (
  cartItems: CartItem[],
  id: number,
  quantity: number,
  selectedVariants: Variant["id"][] = [],
): CartItem[] => {
  return cartItems.map((cartItem) =>
    cartItem.id === id
      ? {
          ...cartItem,
          quantity: cartItem.quantity + quantity,
          selectedVariants,
        }
      : cartItem,
  );
};

const useCart = create<CartItems>((set, get) => ({
  cartItems: loadCartItems(),
  addToCart: (item, selectedVariants = []) => {
    const cartItems = get().cartItems;
    const quantity = getItemQuantity(cartItems, item.id);
    if (get().getCartQuantity() >= MAX_ITEMS_CART) {
      toast.error(toastMessages.cart.full);
      return;
    }
    if (quantity >= MAX_ITEMS) {
      toast.error(toastMessages.cart.fullItem);
      return;
    }

    const updatedItems = isItemInCart(cartItems, item.id)
      ? updateCartItemQuantity(cartItems, item.id, 1, selectedVariants)
      : [
          ...cartItems,
          { ...item, quantity: 1, selectedVariants: selectedVariants },
        ];

    set({ cartItems: updatedItems });
    setItem(CART_LOCAL_STORAGE_KEY, updatedItems);
    toast.success(toastMessages.cart.added);
  },
  removeFromCart: (item) => {
    const cartItems = get().cartItems;
    const { id } = item;
    if (!isItemInCart(cartItems, id)) return;

    const quantity = getItemQuantity(cartItems, id);
    const updatedItems =
      quantity === 1
        ? cartItems.filter((item) => item.id !== id)
        : updateCartItemQuantity(cartItems, id, -1);

    set({ cartItems: updatedItems });

    setItem(CART_LOCAL_STORAGE_KEY, get().cartItems);
    showCartItemToast({
      item,
      addToCart: get().addToCart,
    });
  },
  updateVariants: (id, updatedVariants) => {
    const cartItems = get().cartItems;
    const updatedItems = cartItems.map((cartItem) =>
      cartItem.id === id
        ? { ...cartItem, selectedVariants: updatedVariants }
        : cartItem,
    );

    set({ cartItems: updatedItems });
    setItem(CART_LOCAL_STORAGE_KEY, updatedItems);
  },
  clearCart: () => {
    set({ cartItems: [] });
    removeItem(CART_LOCAL_STORAGE_KEY);
  },
  getCartTotal: () =>
    get().cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0,
    ),
  getCartQuantity: () =>
    get().cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0),
  isCartFull: () => get().getCartQuantity() >= MAX_ITEMS_CART,
  isCartEmpty: () => get().cartItems.length === 0,
  isItemInCart: (id) => get().cartItems.some((cartItem) => cartItem.id === id),
  getItemQuantity: (id) => {
    const cartItem = get().cartItems.find((cartItem) => cartItem.id === id);
    return cartItem?.quantity || 0;
  },
  isItemMaxQuantity: (id) => get().getItemQuantity(id) >= MAX_ITEMS,
  isOpen: false,
  handleOpenCart: () => set({ isOpen: true }),
  handleCloseCart: () => set({ isOpen: false }),
  handleToggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useCart;
