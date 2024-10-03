import { createContext, useEffect, useState } from "react";
import { MenuItem } from "../types";

type CartItem = MenuItem & { quantity: number };

type CartContext = {
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

type CartProviderProps = {
  children: React.ReactNode;
};

export const CartContext = createContext<CartContext>({
  isOpen: false,
  handleOpenCart: (): void => {},
  cartItems: [],
  addToCart: (item: MenuItem): void => {},
  removeFromCart: (id: number): void => {},
  clearCart: (): void => {},
  getCartTotal: (): number => 0,
  getCartQuantity: (): number => 0,
  isItemInCart: (id: number): boolean => false,
  getItemQuantity: (id: number): number => 0,
});

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems")!)
      : [],
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenCart = (): void => {
    setIsOpen(!isOpen);
  };

  const addToCart = (item: MenuItem): void => {
    const isAlreadyInCart = cartItems.find(
      (cartItem) => cartItem.id === item.id,
    );

    if (isAlreadyInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number): void => {
    const isAlreadyInCart = cartItems.find((cartItem) => cartItem.id === id);

    if (isAlreadyInCart?.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        ),
      );
    }
  };

  const clearCart = (): void => {
    setCartItems([]);
  };

  const getCartTotal = (): number => {
    return cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0,
    );
  };

  const getCartQuantity = (): number => {
    return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
  };

  const isItemInCart = (id: number): boolean => {
    return cartItems.some((cartItem) => cartItem.id === id);
  };

  const getItemQuantity = (id: number): number => {
    const cartItem = cartItems.find((cartItem) => cartItem.id === id);

    return cartItem ? cartItem.quantity : 0;
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");

    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        handleOpenCart,
        isOpen,
        addToCart,
        removeFromCart,
        clearCart,
        getCartQuantity,
        getCartTotal,
        isItemInCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
