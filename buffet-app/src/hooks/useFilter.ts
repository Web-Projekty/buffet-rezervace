import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { removeDiacritics } from "../components/utils/utils";

export type UseFilterReturn<T> = {
  handleFilter: (filter: string) => void;
  data: T[];
  filterValue: string;
};

export const useFilter = <T>(
  filterKey: keyof T,
  filterName: string = "filter",
  dataList: T[] | null = [],
): UseFilterReturn<T> => {
  const [searchParams, setSearchParams] = useSearchParams("");
  const [data, setData] = useState<T[]>(dataList ? dataList : []);

  const filterValue = searchParams.get(filterName) || "";

  const handleFilter = (filter: string | null): void => {
    if (!filter) {
      setSearchParams("");
      setData(dataList ? dataList : []);
      return;
    }

    // Keep original filter text in URL
    setSearchParams({ [filterName]: removeDiacritics(filter) });

    // Normalize both filter and data values for comparison
    const normalizedFilter = removeDiacritics(filter);
    const filteredData = dataList
      ? dataList.filter((item) => {
          const normalizedItem = removeDiacritics(String(item[filterKey]));
          return normalizedItem.includes(normalizedFilter);
        })
      : [];

    setData(filteredData);
  };

  useEffect(() => {
    if (filterValue) {
      handleFilter(filterValue);
    } else {
      setData(dataList ? dataList : []);
    }
  }, [filterValue, dataList]);

  return { data, filterValue, handleFilter };
};
