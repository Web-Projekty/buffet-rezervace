import { create } from "zustand";
import { MenuItem } from "../types";
import {
  CART_LOCAL_STORAGE_KEY,
  MAX_ITEMS,
  MAX_ITEMS_CART,
} from "../constants";
import { getItem, removeItem, setItem } from "../components/utils/localStorage";

export type CartItem = MenuItem & { quantity: number };

type CartItems = {
  isOpen: boolean;
  handleOpenCart: () => void;
  handleCloseCart: () => void;
  toggleCart: () => void;
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
): CartItem[] => {
  return cartItems.map((cartItem) =>
    cartItem.id === id
      ? { ...cartItem, quantity: cartItem.quantity + quantity }
      : cartItem,
  );
};

const useCart = create<CartItems>((set, get) => ({
  cartItems: loadCartItems(),
  addToCart: (item: MenuItem) => {
    const cartItems = get().cartItems;
    const quantity = getItemQuantity(cartItems, item.id);
    if (quantity >= MAX_ITEMS || get().getCartQuantity() >= MAX_ITEMS_CART)
      return;

    const updatedItems = isItemInCart(cartItems, item.id)
      ? updateCartItemQuantity(cartItems, item.id, 1)
      : [...cartItems, { ...item, quantity: 1 }];

    set({ cartItems: updatedItems });
    setItem(CART_LOCAL_STORAGE_KEY, updatedItems);
  },
  removeFromCart: (id: number) => {
    const cartItems = get().cartItems;
    if (!isItemInCart(cartItems, id)) return;

    const quantity = getItemQuantity(cartItems, id);
    const updatedItems =
      quantity === 1
        ? cartItems.filter((item) => item.id !== id)
        : updateCartItemQuantity(cartItems, id, -1);

    set({ cartItems: updatedItems });
    setItem(CART_LOCAL_STORAGE_KEY, updatedItems);

    setItem(CART_LOCAL_STORAGE_KEY, get().cartItems);
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
  isItemInCart: (id: number) =>
    get().cartItems.some((cartItem) => cartItem.id === id),
  getItemQuantity: (id: number) => {
    const cartItem = get().cartItems.find((cartItem) => cartItem.id === id);
    return cartItem?.quantity || 0;
  },
  isItemMaxQuantity: (id: number) => get().getItemQuantity(id) >= MAX_ITEMS,
  isOpen: false,
  handleOpenCart: () => set({ isOpen: true }),
  handleCloseCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useCart;
