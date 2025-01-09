import axios from "axios";
import { MenuItem, Order, OrderStatus, PaymentMethod } from "../../types";
import { FETCH_URL } from "../../constants";
import { CartItem } from "../../store/CartStore";

type OrderApiReturn = {
  order: Order;
  error: boolean;
};

type MenuItemApiReturn = {
  menuItem: MenuItem;
  error: boolean;
};

type TimeSlotsApiReturn = {
  timeslots: string[];
  error: boolean;
};

export const createOrder = async (
  token: string | null,
  cartItems: CartItem[],
  selectedTime: string | null,
  paymentMethod: PaymentMethod[],
): Promise<OrderApiReturn> => {
  if (!token) throw new Error("Chyba při vytváření objednávky.");

  try {
    const { data } = await axios.post(FETCH_URL, {
      requestType: "createOrder",
      token: token,
      items: "[]",
      startTime: selectedTime?.split("-")[0],
      endTime: selectedTime?.split("-")[1],
      pickUpDate: selectedTime,
      paymentMethod: paymentMethod[0],
    });

    console.log(data);

    return {
      order: data.payload.data as Order,
      error: data.status === "success" ? false : true,
    };
  } catch {
    throw new Error("Chyba při vytváření objednávky.");
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
      error: data.status === "success" ? false : true,
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
      error: data.status === "success" ? false : true,
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
      error: data.status === "success" ? false : true,
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
      error: data.status === "success" ? false : true,
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
      error: data.status === "success" ? false : true,
    };
  } catch {
    throw new Error("Chyba při mazání položky menu.");
  }
};

export const getTimeslots = async (): Promise<TimeSlotsApiReturn> => {
  try {
    const { data } = await axios.post(FETCH_URL, {
      requestType: "getOrderTimeTable",
    });
    return {
      timeslots: data.payload.data as string[],
      error: data.status === "success" ? false : true,
    };
  } catch {
    throw new Error("Chyba při načítání časových slotů.");
  }
};
