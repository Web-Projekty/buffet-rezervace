/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";

type UseFetchReturn = {
  isLoading: boolean;
  error: string;
  setError: (error: string) => void;
  data: any;
};

type Values = {
  requestType: string;
  token: string;
};

const useFetch = (
  url: string,
  values: Values,
  initialValue: any = [],
): UseFetchReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<any>(initialValue);

  useEffect(() => {
    setIsLoading(true);

    async function fetchData() {
      try {
        const { data } = await axios.post(url, values);
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
