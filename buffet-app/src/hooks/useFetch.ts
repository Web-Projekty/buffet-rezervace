import { useEffect, useState } from "react";
import axios from "axios";

type UseFetchReturn<T> = {
  isLoading: boolean;
  error: string | null;
  setError: (error: string) => void;
  data: T | null;
  itemsCount: number;
};

export const useFetch = <T>(
  url: string,
  requestData: Record<string, unknown>,
  initialValue?: T | null,
  dependencies: unknown[] = [],
): UseFetchReturn<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(
    initialValue ? initialValue : null,
  );
  const [itemsCount, setItemsCount] = useState<number>(0);

  useEffect(() => {
    setIsLoading(true);

    // console.log("useFetch", url, requestData);

    async function fetchData() {
      try {
        const { data } = await axios.post(url, requestData);
        setData(data.payload);
        setItemsCount(data.payload.itemsCount as number);
        console.log("useFetch data", data);
      } catch (e) {
        console.log(e);
        setError("Chyba načítání dat ze serveru.");
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [url, ...dependencies]);

  return { isLoading, error, setError, data, itemsCount };
};
