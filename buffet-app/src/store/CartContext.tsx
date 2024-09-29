import { createContext, useEffect, useState } from "react";
import { MenuItem } from "../types";

type CartItem = MenuItem & { quantity: number };

type CartContext = {
  cartItems: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (item: MenuItem) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartQuantity: () => number;
  isItemInCart: (item: MenuItem) => boolean;
  getItemQuantity: (item: MenuItem) => number;
};

type CartProviderProps = {
  children: React.ReactNode;
};

export const CartContext = createContext<CartContext>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
  getCartQuantity: () => 0,
  isItemInCart: () => false,
  getItemQuantity: () => 0,
});

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems")!)
      : [],
  );

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

  const removeFromCart = (item: MenuItem): void => {
    const isAlreadyInCart = cartItems.find(
      (cartItem) => cartItem.id === item.id,
    );

    if (isAlreadyInCart?.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
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

  const isItemInCart = (item: MenuItem): boolean => {
    return cartItems.some((cartItem) => cartItem.id === item.id);
  };

  const getItemQuantity = (item: MenuItem): number => {
    const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);

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
