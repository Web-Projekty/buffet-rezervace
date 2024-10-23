/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";

type UseFetchReturn<T> = {
  isLoading: boolean;
  error: string;
  setError: (error: string) => void;
  data: T;
};

type RequestData = {
  requestType: string;
  token: string;
};

const useFetch = <T>(
  url: string,
  requestData: RequestData,
  initialValue: T,
): UseFetchReturn<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<T>(initialValue);

  useEffect(() => {
    setIsLoading(true);

    async function fetchData() {
      try {
        const { data } = await axios.post(url, requestData);
        setData(data);
        setIsLoading(false);
      } catch (e) {
        setError("Failed to fetch data.");
        setData(initialValue);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return { isLoading, error, setError, data };
};

export default useFetch;
