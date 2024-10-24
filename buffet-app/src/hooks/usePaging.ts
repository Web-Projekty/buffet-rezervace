import { useEffect, useState } from "react";

type PagingReturn<T> = {
  currentPage: number;
  totalPagesCount: number;
  totalListCount: number;
  displayedList: T[];
  displayedListCount: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
};

export function usePaging<T>(
  data: T[] = [],
  itemsPerPage: number,
): PagingReturn<T> {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPagesCount: number = Math.ceil(data.length / itemsPerPage);
  const totalListCount: number = data.length;

  const displayedList: T[] = data
    ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];
  const displayedListCount: number = displayedList.length;

  const handleNextPage = (): void => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPagesCount));
  };

  const handlePreviousPage = (): void => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return {
    currentPage,
    totalPagesCount,
    totalListCount,
    displayedList,
    displayedListCount,
    handleNextPage,
    handlePreviousPage,
  };
}
