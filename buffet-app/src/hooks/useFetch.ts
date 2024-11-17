import { useEffect, useState } from "react";
import axios from "axios";

type UseFetchReturn<T> = {
  isLoading: boolean;
  error: string;
  setError: (error: string) => void;
  data: T | null;
};

type RequestData = {
  requestType: string;
  token?: string | undefined;
};

const useFetch = <T>(
  url: string,
  requestData: RequestData,
  initialValue?: T,
): UseFetchReturn<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<T | null>(
    initialValue ? initialValue : null,
  );

  useEffect(() => {
    setIsLoading(true);

    async function fetchData() {
      try {
        const { data } = await axios.post(url, requestData);
        setData(data as T);
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
