import { useState } from "react";

type PagingReturn = {
  currentPage: number;
  totalPages: number;
  displayedOrders: any[];
  handleNextPage: () => void;
  handlePreviousPage: () => void;
};

export function usePaging(data: any[], itemsPerPage: number): PagingReturn {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages: number = Math.ceil(data.length / itemsPerPage);

  const displayedOrders: any[] = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleNextPage = (): void => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = (): void => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  return {
    currentPage,
    totalPages,
    displayedOrders,
    handleNextPage,
    handlePreviousPage,
  };
}
