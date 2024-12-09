export const MAX_ITEMS: number = 5;

export const MAX_ITEMS_CART: number = 10;

export const ITEMS_PER_PAGE: number = 8;

export const ADMIN_ORDERS_PER_PAGE: number = 10;

export const ORDERS_PER_PAGE: number = 5;

export const CART_LOCAL_STORAGE_KEY: string = "cartItems";

export const FETCH_URL: string = "https://wlczak.vlastas.cc/backend/api";

export const WEBSOCKET_URL = (channel: string): string =>
  window.location.protocol === "https:"
    ? FETCH_URL.replace("https", "wss").replace("api", channel)
    : FETCH_URL.replace("http", "ws").replace("api", channel);
