import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

type PagingReturn<T> = {
  currentPage: number;
  totalPagesCount: number;
  dataList: T[];
  dataListLength: number;
  arrayOfPages: number[];
  handlePage: (page: number) => void;
};

export function usePaging<T>(
  data: T[] | null = [],
  itemsPerPage: number,
  paramsName?: string,
): PagingReturn<T> {
  const [searchParams, setSearchParams] = useSearchParams("");

  const currentPage: number = parseInt(
    searchParams.get(paramsName ? paramsName : "page") || "1",
    10,
  );

  const dataList: T[] = data
    ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  const dataListLength: number = dataList.length;
  const totalPagesCount: number = data
    ? Math.ceil(data.length / itemsPerPage)
    : 1;

  const arrayOfPages: number[] = Array.from(
    { length: totalPagesCount },
    (_, index) => index + 1,
  );

  const setCurrentPage = (page: number): void => {
    setSearchParams({ [paramsName ? paramsName : "page"]: page.toString() });
  };

  const handlePage = (page: number): void => {
    setCurrentPage(page);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return {
    currentPage,
    totalPagesCount,
    dataList,
    dataListLength,
    arrayOfPages,
    handlePage,
  };
}
