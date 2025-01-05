import coins from "./assets/images/coins.svg";
import wallet from "./assets/images/wallet.svg";
import creditCart from "./assets/images/creditCard.svg";
import thePay from "./assets/images/thePay.svg";
import { PaymentMethod } from "./types";

export const MAX_ITEMS: number = 5;

export const MAX_ITEMS_CART: number = 10;

export const ITEMS_PER_PAGE: number = 12;

export const ADMIN_ORDERS_PER_PAGE: number = 10;

export const ORDERS_PER_PAGE: number = 5;

export const CART_LOCAL_STORAGE_KEY: string = "cartItems";

export const FETCH_URL: string = "https://wlczak.vlastas.cc/backend/api";

export const WEBSOCKET_URL = (channel: string): string =>
  window.location.protocol === "https:"
    ? FETCH_URL.replace("https", "wss").replace("api", channel)
    : FETCH_URL.replace("http", "ws").replace("api", channel);

export const paymentMethods: PaymentMethod[] = [
  {
    name: "Předplacené kredity",
    input: "checkbox",
    image: [{ src: coins, alt: "Předplacené kredity", width: 50, height: 50 }],
  },
  {
    name: "Platba kartou, Google Pay, Apple Pay a další",
    input: "radio",
    image: [
      { src: thePay, alt: "The Pay (platební brána)", width: 50, height: 50 },
    ],
  },
  {
    name: "Platba na pokladně",
    input: "radio",
    image: [
      { src: creditCart, alt: "Kreditní/debetní karta", width: 50, height: 50 },
      { src: wallet, alt: "Hotovost", width: 50, height: 50 },
    ],
  },
];
