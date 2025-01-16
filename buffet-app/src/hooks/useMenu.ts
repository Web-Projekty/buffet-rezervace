import { useMemo } from "react";
import { Category, MenuData, MenuItem } from "../types";
import { useFetch } from "./useFetch";
import { FETCH_URL } from "../constants";

type UseMenuReturn = {
  categories: Category[];
  menuItems: MenuItem[] | null;
  error: string | null;
  isLoading: boolean;
};

const useMenu = (): UseMenuReturn => {
  const { data, error, isLoading } = useFetch<MenuData>(FETCH_URL, {
    requestType: "getMenu",
  });

  const menuItems: MenuItem[] | null = data ? data.data : null;

  const categories: Category[] = useMemo(() => {
    return data ? [...data.categoryList].sort((a, b) => a.id - b.id) : [];
  }, [data]);

  return { menuItems, categories, error, isLoading };
};

export default useMenu;
