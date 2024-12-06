import axios from "axios";
import { Order, OrderStatus } from "../../types";
import { FETCH_URL } from "../../constants";

type CreateOrderReturn = {
  order: Order;
  error: boolean;
};

export const createOrder = async (
  token: string,
): Promise<CreateOrderReturn> => {
  try {
    const { data } = await axios.post(FETCH_URL, {
      requestType: "makeOrderEvent",
      token: token,
    });

    return {
      order: data.payload.data as Order,
      error: data.status === "success" ? false : true,
    };
  } catch {
    throw new Error("Chyba při vytváření objednávky.");
  }
};

export const updateOrder = async (requestData: {
  token: string;
  [key: string]: string | OrderStatus;
}): Promise<Order> => {
  try {
    const { data } = await axios.post(FETCH_URL, {
      requestType: "updateOrderEvent",
      ...requestData,
    });
    return data.payload.data as Order;
  } catch {
    throw new Error("Chyba při aktualizaci objednávky.");
  }
};
