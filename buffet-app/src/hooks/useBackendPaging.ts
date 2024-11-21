import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { RequestData } from "../types";
import useFetch from "./useFetch";

type BackendPagingReturn<T> = {
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPagesCount: number;
  dataList: T[];
  dataListLength: number | undefined;
  arrayOfPages: number[];
  handlePage: (page: number) => void;
};

const useBackendPaging = <T>(
  requestData: RequestData["requestType"],
  itemsPerPage: number,
  paramsName: string = "page",
): BackendPagingReturn<T> => {
  const [searchParams, setSearchParams] = useSearchParams("");

  const currentPage: number = parseInt(searchParams.get(paramsName) || "1", 10);

  const { data, error, isLoading, itemsCount } = useFetch<T[]>(
    "https://wlczak.vlastas.cc/backend/api",
    { requestType: requestData, page: currentPage, itemsCount: itemsPerPage },
    [],
    [currentPage],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, itemsPerPage]);

  const totalPagesCount: number = itemsCount ? itemsCount / itemsPerPage : 0;

  const handlePage = (page: number): void => {
    setSearchParams({ [paramsName]: page.toString() });
  };

  return {
    dataList: data!,
    dataListLength: data?.length,
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

export default useBackendPaging;
