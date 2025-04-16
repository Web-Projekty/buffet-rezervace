import { useMemo } from "react";
import { Category, MenuItem } from "../types/types";
import { useQuery } from "@tanstack/react-query";
import { getMenu, MenuApi } from "../utils/api";

type UseMenuReturn = {
  categories: Category[];
  menuItems: MenuItem[] | null;
  error: string | undefined;
  isLoading: boolean;
  refetch: () => void;
};

const useMenu = (): UseMenuReturn => {
  const {
    isPending: isLoading,
    error,
    data,
    refetch,
  } = useQuery<MenuApi>({
    queryKey: ["menu"],
    queryFn: getMenu,
  });

  const menuItems: MenuItem[] | null = data?.menu ? data?.menu : null;

  const categories: Category[] = useMemo(() => {
    return data ? [...data.categoryList].sort((a, b) => a.id - b.id) : [];
  }, [data]);

  return { menuItems, categories, error: error?.message, isLoading, refetch };
};

export default useMenu;
