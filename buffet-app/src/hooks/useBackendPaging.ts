import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { RequestData } from "../types";
import { useFetch } from "./useFetch";
import { FETCH_URL } from "../constants";
import { useUser } from "./useUser";

type BackendPagingReturn<T> = {
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPagesCount: number;
  dataList: T | null;
  arrayOfPages: number[];
  handlePage: (page: number) => void;
};

export const useBackendPaging = <T>(
  requestType: RequestData["requestType"],
  itemsPerPage: number,
  useToken?: boolean,
  paramsName: string = "page",
): BackendPagingReturn<T> => {
  const [searchParams, setSearchParams] = useSearchParams("");
  const { token } = useUser();

  const currentPage: number = parseInt(searchParams.get(paramsName) || "1", 10);

  const { data, error, isLoading, itemsCount } = useFetch<T>(
    FETCH_URL,
    {
      requestType,
      token: useToken ? token : undefined,
      page: currentPage,
      itemsCount: itemsPerPage,
    },
    null,
    [currentPage],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, itemsPerPage]);

  const totalPagesCount: number = itemsCount
    ? Math.ceil(itemsCount / itemsPerPage)
    : 0;

  const handlePage = (page: number): void => {
    searchParams.set(paramsName ? paramsName : "page", page.toString());
    setSearchParams(searchParams);
  };

  return {
    dataList: data,
    arrayOfPages: Array.from(
      { length: totalPagesCount },
      (_, index) => index + 1,
    ),
    isLoading,
    error,
    currentPage,
    totalPagesCount,
    handlePage,
  };
};
