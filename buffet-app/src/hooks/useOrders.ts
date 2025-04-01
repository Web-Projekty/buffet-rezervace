import { useUser } from "./useUser";
import { useQuery } from "@tanstack/react-query";
import { getOrders, OrdersApi } from "../components/utils/api";

const useOrders = (itemsCount: "all" | number, page?: number) => {
  const { token } = useUser();

  const {
    isPending: isLoading,
    error,
    data,
    refetch,
  } = useQuery<OrdersApi>({
    queryKey: ["orders"],
    queryFn: () => getOrders(token, itemsCount, page),
  });

  return {
    orders: data?.orders,
    latestOrder: data?.orders ? data.orders[0] : null,
    items: data?.items,
    error,
    isLoading,
    refetch,
    variants: data?.variants,
  };
};

export default useOrders;
