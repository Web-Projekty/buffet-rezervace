/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFetch(url: string, values: any, initialValue: any = []) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<object>();
  const [data, setData] = useState<any>(initialValue);

  useEffect(() => {
    setIsLoading(true);

    async function fetchData() {
      try {
        const { data } = await axios.post(url, values);
        setData(data);
        setIsLoading(false);
      } catch (e) {
        setError({ message: "Failed to fetch data." });
        setData(initialValue);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [url, values, initialValue]);

  return { isLoading, error, data };
}
