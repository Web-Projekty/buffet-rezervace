import { create } from "zustand";
import { MenuItem } from "../types";
import { maxItems } from "../constants";

type CartItem = MenuItem & { quantity: number };

type cartItems = {
  isOpen: boolean;
  handleOpenCart: () => void;
  cartItems: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartQuantity: () => number;
  isItemInCart: (id: number) => boolean;
  getItemQuantity: (id: number) => number;
};

const loadCartItems = (): CartItem[] => {
  const cartItems = localStorage.getItem("cartItems");
  return cartItems ? JSON.parse(cartItems) : [];
};

const useCart = create<cartItems>((set, get) => ({
  cartItems: loadCartItems(),
  addToCart: (item: MenuItem) => {
    const isAlreadyInCart = get().isItemInCart(item.id);

    if (isAlreadyInCart) {
      if (get().getItemQuantity(item.id) >= maxItems) {
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

    localStorage.setItem("cartItems", JSON.stringify(get().cartItems));
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

    localStorage.setItem("cartItems", JSON.stringify(get().cartItems));
  },
  clearCart: () => {
    set({ cartItems: [] });
    localStorage.removeItem("cartItems");
  },
  getCartTotal: () =>
    get().cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0,
    ),
  getCartQuantity: () =>
    get().cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0),
  isItemInCart: (id: number) =>
    get().cartItems.some((cartItem) => cartItem.id === id),
  getItemQuantity: (id: number) => {
    const cartItem = get().cartItems.find((cartItem) => cartItem.id === id);
    return cartItem?.quantity || 0;
  },
  isOpen: false,
  handleOpenCart: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useCart;
