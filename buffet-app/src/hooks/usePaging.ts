import { useState } from "react";
import { Item, Order } from "../types";

type PagingReturn = {
  currentPage: number;
  totalPagesCount: number;
  totalListCount: number;
  displayedList: any[];
  displayedListCount: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
};

export function usePaging(data: any[], itemsPerPage: number): PagingReturn {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPagesCount: number = Math.ceil(data.length / itemsPerPage);
  const totalListCount: number = data.length;

  const displayedList: Order[] | Item[] = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const displayedListCount: number = displayedList.length;

  const handleNextPage = (): void => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPagesCount));
  };

  const handlePreviousPage = (): void => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
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
