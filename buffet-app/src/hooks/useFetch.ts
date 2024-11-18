import { useEffect, useState } from "react";
import axios from "axios";

type UseFetchReturn<T> = {
  isLoading: boolean;
  error: string | null;
  setError: (error: string) => void;
  data: T | null;
};

const useFetch = <T>(
  url: string,
  requestData: Record<string, unknown>,
  initialValue?: T,
): UseFetchReturn<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(
    initialValue ? initialValue : null,
  );

  useEffect(() => {
    setIsLoading(true);

    async function fetchData() {
      try {
        const { data } = await axios.post(url, requestData);
        console.log(data.payload);
        setData(data.payload.menuItems as T);
      } catch (e) {
        console.log(e);
        setError("Chyba načítání dat ze serveru.");
        setData(data as T);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return { isLoading, error, setError, data };
};

export default useFetch;
