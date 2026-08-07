import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { RequestData } from "../types/types";
import { FETCH_URL } from "../constants/constants";
import { useUser } from "./useUser";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type BackendPagingReturn<T> = {
  isLoading: boolean;
  error: string | undefined;
  currentPage: number;
  totalPagesCount: number;
  dataList: T | undefined;
  arrayOfPages: number[];
  handlePage: (page: number) => void;
  refetch: () => void;
};

const fetchPagedData = async (
  requestType: RequestData["requestType"],
  token: string | undefined,
  page: number,
  itemsCount: number,
) => {
  const response = await axios.post(FETCH_URL, {
    requestType,
    token,
    page,
    itemsCount,
  });

  return {
    data: response.data.payload,
    itemsCount: response.data.payload.itemsCount,
  };
};

export const useBackendPaging = <T>(
  requestType: RequestData["requestType"],
  itemsPerPage: number,
  useToken?: boolean,
  paramsName: string = "page",
  key: string = "pagedData",
): BackendPagingReturn<T> => {
  const [searchParams, setSearchParams] = useSearchParams("");
  const { token } = useUser();

  const currentPage: number = parseInt(searchParams.get(paramsName) || "1", 10);

  const { data, error, isLoading, refetch } = useQuery<{
    data: T;
    itemsCount: number;
  }>({
    queryKey: [key + currentPage],
    queryFn: () =>
      fetchPagedData(
        requestType,
        useToken ? (token ?? undefined) : undefined,
        currentPage,
        itemsPerPage,
      ),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const totalPagesCount: number = data?.itemsCount
    ? Math.ceil(data.itemsCount / itemsPerPage)
    : 0;

  const handlePage = (page: number): void => {
    searchParams.set(paramsName ? paramsName : "page", page.toString());
    setSearchParams(searchParams);
    refetch();
  };

  return {
    dataList: data?.data,
    arrayOfPages: Array.from(
      { length: totalPagesCount },
      (_, index) => index + 1,
    ),
    isLoading,
    error: error?.message,
    currentPage,
    totalPagesCount,
    handlePage,
    refetch,
  };
};
