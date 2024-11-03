import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

type PagingReturn<T> = {
  currentPage: number;
  totalPagesCount: number;
  displayedList: T[];
  displayedListCount: number;
  listOfPages: number[];
  handlePage: (page: number) => void;
};

export function usePaging<T>(
  data: T[] = [],
  itemsPerPage: number,
  paramsName?: string,
): PagingReturn<T> {
  const [searchParams, setSearchParams] = useSearchParams("");

  const currentPage: number = parseInt(
    searchParams.get(paramsName ? paramsName : "page") || "1",
    10,
  );
  const totalPagesCount: number = Math.ceil(data.length / itemsPerPage);
  const listOfPages: number[] = Array.from(
    { length: totalPagesCount },
    (_, index) => index + 1,
  );

  const displayedList: T[] = data
    ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];
  const displayedListCount: number = displayedList.length;

  const setCurrentPage = (page: number): void => {
    setSearchParams({ page: page.toString() });
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
    displayedList,
    displayedListCount,
    listOfPages,
    handlePage,
  };
}
