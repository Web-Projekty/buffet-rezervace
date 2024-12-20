import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type UseFilterReturn<T> = {
  handleFilter: (filter: string) => void;
  data: T[];
  filterValue: string;
};

export const useFilter = <T>(
  filterKey: keyof T,
  dataList: T[] | null = [],
): UseFilterReturn<T> => {
  const [searchParams, setSearchParams] = useSearchParams("");
  const [data, setData] = useState<T[]>(dataList ? dataList : []);

  const filterValue = searchParams.get(filterKey as string) || "";

  const handleFilter = (filter: string | null): void => {
    if (!filter) {
      setSearchParams("");
      setData(dataList ? dataList : []);
      return;
    }
    setSearchParams({ [filterKey as string]: filter });
    const filteredData = dataList
      ? dataList.filter((item) =>
          String(item[filterKey])
            .toLowerCase()
            .includes(filterValue.toLowerCase()),
        )
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
