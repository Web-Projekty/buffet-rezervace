import { create } from "zustand";
import { MenuItem } from "../types";
import { cartLocalStorageKey, maxItems, maxItemsInCart } from "../constants";
import { getItem, removeItem, setItem } from "../components/utils/localStorage";

type CartItem = MenuItem & { quantity: number };

type CartItems = {
  isOpen: boolean;
  handleOpenCart: () => void;
  cartItems: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: number) => void;
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
  const cartItems = getItem(cartLocalStorageKey);
  return cartItems ? (cartItems as CartItem[]) : [];
};

const useCart = create<CartItems>((set, get) => ({
  cartItems: loadCartItems(),
  addToCart: (item: MenuItem) => {
    const hasReachedMaxCartQuantity = get().isCartFull();

    if (hasReachedMaxCartQuantity) {
      return;
    }

    const isAlreadyInCart = get().isItemInCart(item.id);

    if (isAlreadyInCart) {
      const hasReachedMaxItemQuantity = get().isItemMaxQuantity(item.id);
      if (hasReachedMaxItemQuantity) {
        return;
      }

      set((state) => ({
        cartItems: state.cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      }));
    } else {
      set((state) => ({
        cartItems: [...state.cartItems, { ...item, quantity: 1 }],
      }));
    }

    setItem(cartLocalStorageKey, get().cartItems);
  },
  removeFromCart: (id: number) => {
    const isAlreadyInCart = get().isItemInCart(id);

    if (!isAlreadyInCart) {
      return;
    }

    if (get().getItemQuantity(id) === 1) {
      set((state) => ({
        cartItems: state.cartItems.filter((cartItem) => cartItem.id !== id),
      }));
    } else {
      set((state) => ({
        cartItems: state.cartItems.map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        ),
      }));
    }
    setItem(cartLocalStorageKey, get().cartItems);
  },
  clearCart: () => {
    set({ cartItems: [] });
    removeItem(cartLocalStorageKey);
  },
  getCartTotal: () =>
    get().cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0,
    ),
  getCartQuantity: () =>
    get().cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0),
  isCartFull: () => get().getCartQuantity() >= maxItemsInCart,
  isCartEmpty: () => get().cartItems.length === 0,
  isItemInCart: (id: number) =>
    get().cartItems.some((cartItem) => cartItem.id === id),
  getItemQuantity: (id: number) => {
    const cartItem = get().cartItems.find((cartItem) => cartItem.id === id);
    return cartItem?.quantity || 0;
  },
  isItemMaxQuantity: (id: number) => get().getItemQuantity(id) >= maxItems,
  isOpen: false,
  handleOpenCart: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useCart;
