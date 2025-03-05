import axios from "axios";
import { Category, Date, MenuItem, Order, OrderStatus } from "../../types";
import { FETCH_URL } from "../../constants";
import { CartItem } from "../../store/CartStore";

type OrderApiReturn = {
  order: Order | null;
  error: boolean;
  paywallUrl: string;
};

type UpdateOrderApi = {
  eventType: string;
  payload: Order;
  error: boolean;
};

type MenuItemApi = {
  menuItem: MenuItem | null;
  error: boolean;
};

export type TimeSlotsApi = {
  timeslots: Date[];
  error: boolean;
};

export type MenuApi = {
  menu: MenuItem[];
  categoryList: Category[];
  itemsCount: number;
  status: "success" | "error";
};

export type OrdersApi = {
  orders: Order[];
  items: MenuItem[];
  itemsCount: number;
  status: "success" | "error";
};

export const getMenu = async (): Promise<MenuApi> => {
  try {
    const { data } = await axios.post(FETCH_URL, {
      requestType: "getMenu",
    });

    return {
      menu: data.payload.data as MenuItem[],
      categoryList: data.payload.categoryList as Category[],
      itemsCount: data.payload.itemsCount as number,
      status: data.status as "success" | "error",
    };
  } catch {
    throw new Error("Chyba při načítání menu.");
  }
};

export const getOrders = async (
  token: string | null,
  itemsCount: number | "all",
  page?: number | undefined,
): Promise<OrdersApi> => {
  if (!token) throw new Error("Chyba při načítání objednávek.");
  try {
    const { data } = await axios.post(FETCH_URL, {
      requestType: "getOrders",
      token: token,
      page: page ? page : undefined,
      itemsCount: itemsCount === "all" ? undefined : itemsCount,
    });

    return {
      orders: data.payload.data as Order[],
      items: data.payload.items as MenuItem[],
      itemsCount: data.payload.itemsCount as number,
      status: data.status,
    };
  } catch {
    throw new Error("Chyba při načítání objednávek.");
  }
};

export const createOrder = async (
  token: string | null,
  cartItems: {
    id: CartItem["id"];
    quantity: CartItem["quantity"];
    variants: number[];
  }[],
  startTime: Order["startTime"] | null,
  endTime: Order["endTime"] | null,
  date: Order["pickupDate"] | null,
  // paymentMethod: PaymentMethod[],
): Promise<OrderApiReturn> => {
  if (!token) throw new Error("Chyba při vytváření objednávky.");

  // console.log(cartItems);

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

    // console.log(data);

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
): Promise<UpdateOrderApi> => {
  if (!token || !orderId) throw new Error("Chyba při aktualizaci objednávky.");
  try {
    const { data } = await axios.post(FETCH_URL, {
      requestType: "updateOrder",
      token: token,
      orderId: orderId,
      status: status,
    });

    return {
      eventType: data.eventType,
      payload: data.payload as Order,
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
      paywallUrl: "",
    };
  } catch {
    throw new Error("Chyba při mazání objednávky.");
  }
};

export const createMenuItem = async (
  token: string,
  menuItem: Omit<MenuItem, "id">,
): Promise<MenuItemApi> => {
  try {
    const { data } = await axios.post(FETCH_URL, {
      requestType: "updateItem",
      token: token,
      ...menuItem,
    });
    // console.log(data);
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
): Promise<MenuItemApi> => {
  try {
    const { data } = await axios.post(FETCH_URL, {
      requestType: "updateItem",
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
): Promise<MenuItemApi> => {
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

export const getTimeSlots = async (): Promise<TimeSlotsApi> => {
  try {
    const { data } = await axios.post(FETCH_URL, {
      requestType: "getOrderTimeTable",
    });

    // console.log(data);

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

export const updateUserData = async (
  token: string | null,
  fullName: string,
  tel: string,
  email: string,
): Promise<{
  status: "success" | "failed";
  payload: { msg: string };
}> => {
  try {
    if (!token) throw new Error("Chybějící token.");
    const { data } = await axios.post(FETCH_URL, {
      requestType: "updateUser",
      token,
      fullName,
      email,
      tel: tel,
    });

    return data;
  } catch {
    return {
      status: "failed",
      payload: { msg: "Chyba při aktualizaci dat." },
    };
  }
};

export const getUserData = async (token: string) => {
  try {
    const { data } = await axios.post(FETCH_URL, {
      requestType: "getUser",
      token,
    });

    return data;
  } catch {
    return {
      status: "failed",
      payload: { msg: "Chyba při získávání dat." },
    };
  }
};

export const updateUserPassword = async (
  token: string | null,
  password: string,
  newPassword: string,
  newPasswordConfirm: string,
): Promise<{
  status: "success" | "failed";
  payload: { msg: string };
}> => {
  try {
    if (newPassword !== newPasswordConfirm) {
      return {
        status: "failed",
        payload: { msg: "Hesla se neshodují." },
      };
    }

    const { data } = await axios.post(FETCH_URL, {
      requestType: "updatePassword",
      token,
      password,
      newPassword,
    });

    return data;
  } catch {
    return {
      status: "failed",
      payload: { msg: "Chyba při změně hesla." },
    };
  }
};
