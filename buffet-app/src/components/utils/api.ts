import axios from "axios";
import {
  Allergen,
  Category,
  Date,
  MenuItem,
  Order,
  OrderStatus,
} from "../../types";
import { FETCH_URL } from "../../constants";
import { CartItem } from "../../store/CartStore";
import {
  CloseTimeDay,
  TimeSlots,
} from "../dashboard/adminContent/AdminService";
import { PaymentForm } from "../dashboard/adminContent/AdminPayments";

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
    variants: CartItem["selectedVariants"];
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
    throw new Error("Chyba při vytváření objednávky.");
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
  token: string | null,
  menuItem: Omit<MenuItem, "id" | "categoryName" | "allergens"> & {
    allergens: Allergen["id"][];
  },
): Promise<MenuItemApi> => {
  console.log(menuItem.allergens);
  try {
    const { data } = await axios.post(FETCH_URL, {
      requestType: "createItem",
      token: token,
      name: menuItem.name,
      description: menuItem.description,
      price: menuItem.price,
      category: menuItem.category,
      //image: menuItem.image,
      allergens: menuItem.allergens,
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
  token: string | null,
  menuItem: Omit<MenuItem, "id" | "allergens" | "categoryName"> & {
    itemId: MenuItem["id"];
    allergens: Allergen["id"][];
  },
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

export const updateCategory = async (
  token: string | null,
  category: Omit<Category, "id"> & { categoryId: number },
): Promise<{
  category: Category;
  error: boolean;
}> => {
  try {
    const { data } = await axios.post(FETCH_URL, {
      requestType: "updateCategory",
      token: token,
      ...category,
    });

    return {
      category: data.payload.data as Category,
      error: data.status !== "success",
    };
  } catch {
    throw new Error("Chyba při aktualizaci kategorie.");
  }
};

export const createCategory = async (
  token: string | null,
  category: Omit<Category, "id">,
): Promise<{
  category: Category;
  error: boolean;
}> => {
  try {
    const { data } = await axios.post(FETCH_URL, {
      requestType: "createCategory",
      token,
      name: category.name,
      description: category.description,
    });

    return {
      category: data.payload.data as Category,
      error: data.status !== "success",
    };
  } catch {
    throw new Error("Chyba při vytváření kategorie.");
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
    throw new Error("Chyba při načítání časových slotů.");
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
    throw new Error("Chyba při aktualizaci uživatelských dat.");
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
    throw new Error("Chyba při načítání uživatelských dat.");
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
    throw new Error("Chyba při aktualizaci hesla.");
  }
};

export const verifyPassword = async (token: string, password: string) => {
  try {
    const { data } = await axios.post(FETCH_URL, {
      requestType: "verifyPassword",
      token,
      password,
    });

    return {
      validPassword: data.status === "success",
    };
  } catch {
    throw new Error("Chyba při ověřování hesla.");
  }
};

export const saveSystemSettings = async (
  token: string,
  ldap: {
    host: string;
    port: string;
    base: string;
    user: string;
    password: string;
  },
  mysql: boolean,
  emailServer: {
    host: string;
    port: string;
    user: string;
    password: string;
    senderAddress: string;
    senderName: string;
  },
) => {
  const { host, port, base, user, password } = ldap;
  const {
    host: emailHost,
    port: emailPort,
    user: emailUser,
    password: emailPassword,
    senderAddress,
    senderName,
  } = emailServer;

  try {
    const { data } = await axios.post(FETCH_URL, {
      requestType: "saveSystemSettings",
      token,
      ldap: {
        host,
        port,
        base,
        user,
        password,
      },
      mysql,
      emailServer: {
        host: emailHost,
        port: emailPort,
        user: emailUser,
        password: emailPassword,
        senderAddress,
        senderName,
      },
    });

    return data;
  } catch {
    throw new Error("Chyba při ukládání systémových nastavení.");
  }
};

export const saveOpenTime = async (
  token: string,
  closeTime: CloseTimeDay[],
) => {
  try {
    const { data } = await axios.post(FETCH_URL, {
      requestType: "saveOpenTime",
      token,
      closeTime,
    });

    return data;
  } catch {
    throw new Error("Chyba při ukládání otevírací doby.");
  }
};

export const saveTimeSlots = async (token: string, timeSlots: TimeSlots) => {
  try {
    const { data } = await axios.post(FETCH_URL, {
      requestType: "saveTimeSlots",
      token,
      timeSlots,
    });

    return data;
  } catch {
    throw new Error("Chyba při ukládání časových slotů.");
  }
};

export const savePaymentMethods = async (
  token: string,
  paymentSettings: PaymentForm,
) => {
  try {
    const { data } = await axios.post(FETCH_URL, {
      requestType: "savePaymentMethods",
      token,
      paymentSettings,
    });

    return data;
  } catch {
    throw new Error("Chyba při ukládání platebních metod.");
  }
};
