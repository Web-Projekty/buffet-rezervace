import axios from "axios";
import { Date, MenuItem, Order, OrderStatus, PaymentMethod } from "../../types";
import { FETCH_URL } from "../../constants";

type OrderApiReturn = {
  order: Order | null;
  error: boolean;
  paywallUrl: string;
};

type MenuItemApiReturn = {
  menuItem: MenuItem | null;
  error: boolean;
};

type TimeSlotsApiReturn = {
  timeslots: Date[];
  error: boolean;
};

export const createOrder = async (
  token: string | null,
  cartItems: number[],
  startTime: string | null,
  endTime: string | null,
  date: string | null,
  paymentMethod: PaymentMethod[],
): Promise<OrderApiReturn> => {
  if (!token) throw new Error("Chyba při vytváření objednávky.");

  try {
    const { data } = await axios.post(FETCH_URL, {
      requestType: "createOrder",
      token: token,
      items: cartItems,
      startTime: startTime,
      endTime: endTime,
      pickUpDate: date,
      paymentMethod: "thePay",
    });

    console.log(data);

    return {
      order: data.payload.data as Order,
      error: data.status !== "success",
      paywallUrl: data.payload.url,
    };
  } catch {
    return {
      order: null,
      error: true,
      paywallUrl: "",
    };
  }
};

export const updateOrder = async (
  token: string | null,
  orderId: number | null,
  status: OrderStatus,
): Promise<OrderApiReturn> => {
  if (!token || !orderId) throw new Error("Chyba při aktualizaci objednávky.");
  try {
    const { data } = await axios.post(FETCH_URL, {
      requestType: "updateOrder",
      token: token,
      orderId: orderId,
      status: status,
    });
    return {
      order: data.payload.data as Order,
      error: data.status !== "success",
    };
  } catch {
    throw new Error("Chyba při aktualizaci objednávky.");
  }
};

export const deleteOrder = async (
  token: string,
  orderId: string,
): Promise<OrderApiReturn> => {
  try {
    const { data } = await axios.post(FETCH_URL, {
      requestType: "deleteOrderEvent",
      token: token,
      orderId: orderId,
    });
    return {
      order: data.payload.data as Order,
      error: data.status !== "success",
    };
  } catch {
    throw new Error("Chyba při mazání objednávky.");
  }
};

export const createMenuItem = async (
  token: string,
  menuItem: MenuItem,
): Promise<MenuItemApiReturn> => {
  try {
    const { data } = await axios.post(FETCH_URL, {
      requestType: "createMenuItemEvent",
      token: token,
      ...menuItem,
    });
    return {
      menuItem: data.payload.data as MenuItem,
      error: data.status !== "success",
    };
  } catch {
    throw new Error("Chyba při vytváření položky menu.");
  }
};

export const updateMenuItem = async (
  token: string,
  menuItem: MenuItem,
): Promise<MenuItemApiReturn> => {
  try {
    const { data } = await axios.post(FETCH_URL, {
      requestType: "updateMenuItemEvent",
      token: token,
      ...menuItem,
    });
    return {
      menuItem: data.payload.data as MenuItem,
      error: data.status !== "success",
    };
  } catch {
    throw new Error("Chyba při aktualizaci položky menu.");
  }
};

export const deleteMenuItem = async (
  token: string,
  menuItemId: number,
): Promise<MenuItemApiReturn> => {
  try {
    const { data } = await axios.post(FETCH_URL, {
      requestType: "deleteMenuItemEvent",
      token: token,
      menuItemId: menuItemId,
    });
    return {
      menuItem: data.payload.data as MenuItem,
      error: data.status !== "success",
    };
  } catch {
    throw new Error("Chyba při mazání položky menu.");
  }
};

export const getTimeSlots = async (): Promise<TimeSlotsApiReturn> => {
  try {
    const { data } = await axios.post(FETCH_URL, {
      requestType: "getOrderTimeTable",
    });

    console.log(data);

    const { status, payload } = data;

    return {
      timeslots: payload?.data || [],
      error: status !== "success",
    };
  } catch {
    return {
      timeslots: [],
      error: true,
    };
  }
};
