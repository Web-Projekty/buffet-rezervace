import { useEffect, useState } from "react";
import { Category, MenuData, MenuItem } from "../types";
import { useFetch } from "./useFetch";
import { FETCH_URL, ITEMS_PER_PAGE } from "../constants";

type UseMenuReturn = {
  categories: Category[];
  menuItems: MenuItem[] | null;
  error: string | null;
  isLoading: boolean;
};

const useMenu = (): UseMenuReturn => {
  const [categories, setCategories] = useState<Category[]>([]);

  const { data, error, isLoading } = useFetch<MenuData>(FETCH_URL, {
    requestType: "getMenu",
    itemsCount: ITEMS_PER_PAGE + ITEMS_PER_PAGE,
    page: 1,
  });

  const menuItems: MenuItem[] | null = data ? data.data : null;

  useEffect(() => {
    if (data) {
      setCategories(data.categoryList.sort((a, b) => a.id - b.id));
    }
  }, [data]);

  return { menuItems, categories, error, isLoading };
};

export default useMenu;
