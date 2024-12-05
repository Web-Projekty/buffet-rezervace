import axios from "axios";
import { Order } from "../../types";
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

export const updateOrder = async (
  token: string,
  order: Order,
): Promise<Order> => {
  try {
    const { data } = await axios.post(FETCH_URL, {
      requestType: "updateOrderEvent",
      order: order,
      token: token,
    });
    return data.payload.data as Order;
  } catch {
    throw new Error("Chyba při aktualizaci objednávky.");
  }
};
